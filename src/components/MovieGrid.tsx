import { useEffect, useRef } from 'react';
import { useMovieState } from '../hooks/useMovieState';
import MovieCard from './MovieCard';
import DropDownMenu from './DropDownMenu';

export default function MovieGrid() {
  const searchQuery = useMovieState((state) => state.searchQuery);
  const movies = useMovieState((state) => state.movies);
  const loadPages = useMovieState((state) => state.loadPages);
  const morePages = useMovieState((state) => state.morePages);

  const loadingRef = useRef(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;
        if (loadingRef.current) return;
        if (!morePages) return;

        loadingRef.current = true;

        await loadPages();

        loadingRef.current = false;
      },
      {
        rootMargin: '300px',
        threshold: 1,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [morePages]);

  return (
    <div className='container max-w-7xl mx-auto py-6 px-4'>
      {movies.results.length > 0 && (
        <div className='space-y-2'>
          <h2 className='text-2xl text-text-secondary'>
            Results for:
            <span className='font-bold uppercase'> {searchQuery}</span>
          </h2>

          <DropDownMenu />
        </div>
      )}
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 gap-y-16 py-6'>
        {movies.results
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        <div
          ref={observerRef}
          className='h-10'
        ></div>
      </div>
    </div>
  );
}
