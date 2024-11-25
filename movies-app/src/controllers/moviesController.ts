import express, { Request, Response } from 'express';
import { getMoviesByYear } from '../services/movieService';

export const getMovies =async (req: Request, res: Response): Promise<void> => {
    const { year } = req.query;

    if (!year || isNaN(Number(year))) {
     res.status(400).json({ error: 'Invalid year parameter' });
    }

    try {
        const movies = await getMoviesByYear(Number(year));
        res.json(movies);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
