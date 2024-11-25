import { expect } from 'chai';
import { getMoviesByYear } from '../services/movieService';

describe('getMoviesByYear', () => {
    it('should return a list of movies with editors if available', async () => {
        const movies = await getMoviesByYear(2019);
        expect(movies).to.be.an('array');
        expect(movies[0]).to.have.property('title');
        expect(movies[0]).to.have.property('release_date');
        expect(movies[0]).to.have.property('vote_average');
    });

    it('should return movies even if editor data is unavailable', async () => {
        const movies = await getMoviesByYear(2020);
        expect(movies).to.be.an('array');
        expect(movies[0]).to.have.property('title');
        expect(movies[0]).not.to.have.property('editors'); // Optional
    });
});
