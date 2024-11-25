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
const chai_1 = require("chai");
const movieService_1 = require("../services/movieService");
describe('getMoviesByYear', () => {
    it('should return a list of movies with editors if available', () => __awaiter(void 0, void 0, void 0, function* () {
        const movies = yield (0, movieService_1.getMoviesByYear)(2019);
        (0, chai_1.expect)(movies).to.be.an('array');
        (0, chai_1.expect)(movies[0]).to.have.property('title');
        (0, chai_1.expect)(movies[0]).to.have.property('release_date');
        (0, chai_1.expect)(movies[0]).to.have.property('vote_average');
    }));
    it('should return movies even if editor data is unavailable', () => __awaiter(void 0, void 0, void 0, function* () {
        const movies = yield (0, movieService_1.getMoviesByYear)(2020);
        (0, chai_1.expect)(movies).to.be.an('array');
        (0, chai_1.expect)(movies[0]).to.have.property('title');
        (0, chai_1.expect)(movies[0]).not.to.have.property('editors'); // Optional
    }));
});
