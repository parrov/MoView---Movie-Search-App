import axios from 'axios';
import {
  MovieDetailsResponseSchema,
  MoviesResponseSchema,
  MovieTrailerResponseSchema,
} from '../utils/movie-schema';

export const imgUrl = 'https://image.tmdb.org/t/p/w500';
export const backdropUrl = 'https://image.tmdb.org/t/p/original';
const APIKey = import.meta.env.VITE_API_KEY;
const cache = new Map<string, any>();
const detailsCache = new Map<number, any>();
const pendingRequests = new Map<string, Promise<any>>();
let searchController: AbortController | null = null;

export async function searchMovie(search: string, page = 1) {
  const cacheKey = `${search}-${page}`;

  if (searchController) {
    searchController.abort();
  }

  searchController = new AbortController();

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const url = `https://api.themoviedb.org/3/search/movie`;
  const request = axios(url, {
    params: {
      query: search,
      language: 'en-US',
      page,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${APIKey}`,
    },
    signal: searchController.signal,
  })
    .then(({ data }) => {
      const result = MoviesResponseSchema.safeParse(data);

      if (!result.success) {
        throw new Error('Failed to search results');
      }

      cache.set(cacheKey, result.data);
      pendingRequests.delete(cacheKey);

      return result.data;
    })
    .catch((error) => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, request);

  return request;
}

export async function getMovieDetails(id: number) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  if (detailsCache.has(id)) {
    return detailsCache.get(id);
  }

  try {
    const { data } = await axios(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIKey}`,
      },
    });

    const result = MovieDetailsResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error('Failed to search results');
    }

    detailsCache.set(id, result.data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get movie details');
  }
}

export async function getMovieTrailer(id: number) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    const { data } = await axios(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${APIKey}`,
      },
    });

    const result = MovieTrailerResponseSchema.safeParse(data);

    if (!result.success) {
      console.log('Failed to search results', data);
      return null;
    }

    const trailer = result.data.results.find(
      (result) => result.type === 'Trailer' && result.site === 'YouTube',
    );

    if (!trailer) {
      return null;
    }

    return trailer.key;
  } catch (error) {
    console.log('Failed to get movie trailer', error);
    return null;
  }
}
