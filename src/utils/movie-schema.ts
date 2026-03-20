import z from 'zod';

export const MoviesResponseSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      overview: z.string(),
      poster_path: z.string().nullable(),
      title: z.string(),
      release_date: z.string(),
      vote_average: z.number(),
    }),
  ),
});

export const TrendingMovieResponseSchema = z.object({
  results: z.array(
    z.object({
      title: z.string(),
      release_date: z.string(),
      vote_average: z.number(),
    }),
  ),
});

export const MovieDetailsResponseSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  homepage: z.string().nullable(),
  id: z.number(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number(),
  title: z.string(),
  vote_average: z.number(),
});

export const MovieTrailerResponseSchema = z.object({
  results: z.array(
    z.object({
      key: z.string(),
      site: z.string(),
      type: z.string(),
    }),
  ),
});
