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
exports.getMovies = void 0;
const movieService_1 = require("../services/movieService");
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.query;
    if (!year || isNaN(Number(year))) {
        return res.status(400).json({ error: 'Invalid year parameter' });
    }
    try {
        const movies = yield (0, movieService_1.getMoviesByYear)(Number(year));
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMovies = getMovies;
