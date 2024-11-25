import { httpClient } from './httpClient';

export interface Movie {
    title: string;
    release_date: string;
    vote_average: number;
    editors?: string[];
}

export const getMoviesByYear = async (year: number): Promise<Movie[]> => {
    try {
        const discoverResponse = await httpClient.get('/discover/movie', {
            params: {
                language: 'en-US',
                page: 1,
                primary_release_year: year,
                sort_by: 'popularity.desc',
            },
        });

        const movies = discoverResponse.data.results;

        const movieDetails = await Promise.all(
            movies.map(async (movie: any) => {
                const { id, title, release_date, vote_average } = movie;
                try {
                    const creditsResponse = await httpClient.get(`/movie/${id}/credits`);
                    const editors = creditsResponse.data.crew
                        .filter((member: any) => member.known_for_department === 'Editing')
                        .map((editor: any) => editor.name);

                    return { title, release_date, vote_average, editors };
                } catch {
                    return { title, release_date, vote_average };
                }
            })
        );

        return movieDetails;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies.');
    }
};
