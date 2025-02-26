"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("./controllers/moviesController");
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/movies', moviesController_1.getMovies);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
