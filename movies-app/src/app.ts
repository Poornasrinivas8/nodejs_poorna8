import express from 'express';
import { getMovies } from './controllers/moviesController';

const app = express();
const PORT = 3000;

app.get('/movies', getMovies);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
