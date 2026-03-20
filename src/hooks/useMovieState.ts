import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  getMovieDetails,
  getMovieTrailer,
  searchMovie,
} from '../services/movieApi';
import type {
  FavoriteMovie,
  MovieDetails,
  Movies,
  TrendingMovies,
} from '../types/types';

type MovieState = {
  isLoading: boolean;
  error: boolean;
  errorMessage: string | null;
  searchQuery: string;
  movies: Movies;
  page: number;
  morePages: boolean;
  trendingMovies: TrendingMovies;
  movieDetails: MovieDetails | null;
  movieTrailer: string | null;
  favorites: FavoriteMovie[];
  sortOrder: 'asc' | 'desc';
  setMovieSearch: (search: string) => Promise<void>;
  getDetails: (id: number) => Promise<void>;
  getMovieTrailer: (id: number) => Promise<void>;
  addMovieToFavorite: (movie: FavoriteMovie) => void;
  loadPages: () => Promise<void>;
  sortMoviesByTitle: () => void;
};

export const useMovieState = create<MovieState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoading: false,
        error: false,
        errorMessage: null,
        searchQuery: '',
        movies: {
          results: [],
        },
        page: 1,
        morePages: true,
        trendingMovies: {
          results: [],
        },
        movieDetails: null,
        movieTrailer: null,
        favorites: [],
        sortOrder: 'asc',
        setMovieSearch: async (search) => {
          set({
            isLoading: true,
            error: false,
            errorMessage: null,
            page: 1,
            morePages: true,
          });
          try {
            const searchResults = await searchMovie(search, 1);
            set({
              searchQuery: search,
              movies: searchResults,
              isLoading: false,
            });
          } catch (error) {
            set({
              isLoading: false,
              error: true,
              errorMessage: (error as Error).message,
            });
          }
        },
        getDetails: async (id: number) => {
          set({ isLoading: true, error: false, errorMessage: null });

          try {
            const movieDetailsResults = await getMovieDetails(id);
            set({
              movieDetails: movieDetailsResults,
              isLoading: false,
            });
          } catch (error) {
            set({
              isLoading: false,
              error: true,
              errorMessage: (error as Error).message,
            });
          }
        },
        getMovieTrailer: async (id: number) => {
          set({ movieTrailer: null });
          const trailers = await getMovieTrailer(id);
          set({ movieTrailer: trailers });
        },
        addMovieToFavorite: (movie) => {
          if (get().favorites.some((favorite) => favorite.id === movie.id)) {
            set((state) => ({
              favorites: state.favorites.filter(
                (favorite) => favorite.id !== movie.id,
              ),
            }));
          } else {
            set((state) => ({
              favorites: [...state.favorites, movie],
            }));
          }
        },
        loadPages: async () => {
          const { searchQuery, movies, page, morePages, isLoading, sortOrder } =
            get();

          if (!morePages || isLoading) return;

          set({ isLoading: true });

          try {
            const nextPage = page + 1;
            const moreMovies = await searchMovie(searchQuery, nextPage);
            const combined = [...movies.results, ...moreMovies.results].sort(
              (a, b) =>
                sortOrder === 'asc'
                  ? a.title.localeCompare(b.title)
                  : b.title.localeCompare(a.title),
            );

            set({
              movies: { results: combined },
              page: nextPage,
              morePages: moreMovies.results.length > 0,
              isLoading: false,
            });
          } catch (error) {
            set({
              isLoading: false,
              error: true,
              errorMessage: (error as Error).message,
            });
          }
        },
        sortMoviesByTitle: () => {
          set((state) => {
            const newOrder: 'asc' | 'desc' =
              state.sortOrder === 'asc' ? 'desc' : 'asc';

            const sorted = [...state.movies.results].sort((a, b) =>
              newOrder === 'asc'
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title),
            );

            return {
              movies: { results: sorted },
              sortOrder: newOrder,
            };
          });
        },
      }),
      {
        name: 'favorites-storage',
        partialize: (state) => ({
          favorites: state.favorites,
        }),
      },
    ),
  ),
);
