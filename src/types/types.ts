import z from 'zod';
import type {
  MovieDetailsResponseSchema,
  MoviesResponseSchema,
  TrendingMovieResponseSchema,
} from '../utils/movie-schema';

export type Movies = z.infer<typeof MoviesResponseSchema>;
export type TrendingMovies = z.infer<typeof TrendingMovieResponseSchema>;
export type MovieDetails = z.infer<typeof MovieDetailsResponseSchema>;

export type FavoriteMovie = {
  id: number;
  overview: string;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
};
