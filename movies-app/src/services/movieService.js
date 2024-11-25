"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesByYear = void 0;
const httpClient_1 = require("./httpClient");
const getMoviesByYear = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discoverResponse = yield httpClient_1.httpClient.get('/discover/movie', {
            params: {
                language: 'en-US',
                page: 1,
                primary_release_year: year,
                sort_by: 'popularity.desc',
            },
        });
        const movies = discoverResponse.data.results;
        const movieDetails = yield Promise.all(movies.map((movie) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, title, release_date, vote_average } = movie;
            try {
                const creditsResponse = yield httpClient_1.httpClient.get(`/movie/${id}/credits`);
                const editors = creditsResponse.data.crew
                    .filter((member) => member.known_for_department === 'Editing')
                    .map((editor) => editor.name);
                return { title, release_date, vote_average, editors };
            }
            catch (_a) {
                return { title, release_date, vote_average };
            }
        })));
        return movieDetails;
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies.');
    }
});
exports.getMoviesByYear = getMoviesByYear;
