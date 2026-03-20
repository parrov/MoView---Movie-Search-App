import {
  ChevronRightIcon,
  HeartIcon,
  StarIcon,
} from '@heroicons/react/16/solid';
import { imgUrl } from '../services/movieApi';
import type { Movies } from '../types/types';
import { Link } from 'react-router-dom';
import { useMovieState } from '../hooks/useMovieState';

type MovieCardProps = {
  movie: Movies['results'][0];
};

export default function MovieCard({ movie }: MovieCardProps) {
  const addMovieToFavorite = useMovieState((state) => state.addMovieToFavorite);
  const favorites = useMovieState((state) => state.favorites);

  return (
    <div className='group bg-surface rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'>
      <div className='relative'>
        <button
          onClick={() => addMovieToFavorite(movie)}
          className='absolute top-2 left-2 bg-background-secondary/40 text-text-secondary/70 p-2 rounded-full backdrop-blur-sm cursor-pointer'
        >
          <HeartIcon
            className={`size-5 transition-colors ${favorites.some((favorite) => favorite.id === movie.id) ? 'text-rating' : ''}`}
          />
        </button>

        <Link to={`/movie/${movie.id}`}>
          <img
            src={
              movie.poster_path
                ? `${imgUrl}${movie.poster_path}`
                : '/placeholder.png'
            }
            alt={`${movie.title} poster`}
            className='w-full h-90 object-center'
          />
        </Link>

        <div className='absolute top-3 right-2 bg-background-secondary/40 text-rating text-xs px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1'>
          <StarIcon className='size-3' />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className='p-4 space-y-1'>
        <p className='text-text-secondary text-xs font-semibold'>
          {movie.release_date.split('-')[0]}
        </p>
        <h3 className='text-text-primary font-bold text-xl line-clamp-1'>
          {movie.title}
        </h3>

        <p className='text-text-secondary text-xs line-clamp-2'>
          {movie.overview}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className='font-semibold text-text-secondary text-xs flex items-center py-2 px-3 bg-white/10 rounded-lg mt-4 cursor-pointer transition-colors duration-300 hover:bg-white/5 hover:text-text-primary w-30'
        >
          See details <ChevronRightIcon className='size-5' />
        </Link>
      </div>
    </div>
  );
}
