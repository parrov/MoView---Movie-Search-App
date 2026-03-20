import { Link, useNavigate } from 'react-router-dom';
import { formatRuntime, getStarRating } from '../helpers/helpers';
import { imgUrl } from '../services/movieApi';
import type { MovieDetails } from '../types/types';
import {
  ArrowUturnLeftIcon,
  ClockIcon,
  LinkIcon,
  PlayIcon,
  StarIcon,
} from '@heroicons/react/16/solid';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useMovieState } from '../hooks/useMovieState';

type MovieDetailsProps = {
  movie: MovieDetails;
  trailer: string | null;
};

export default function SelectedMovieDetails({
  movie,
  trailer,
}: MovieDetailsProps) {
  const navigate = useNavigate();

  const addMovieToFavorite = useMovieState((state) => state.addMovieToFavorite);
  const favorites = useMovieState((state) => state.favorites);

  if (!movie) return null;

  return (
    <div className='max-w-7xl mx-auto px-4'>
      <button
        onClick={() => navigate(-1)}
        className='my-6 flex items-center text-sm text-text-secondary gap-2 uppercase font-semibold cursor-pointer'
      >
        <ArrowUturnLeftIcon className='size-6' /> previous page
      </button>
      <div className='relative  flex items-center overflow-hidden rounded-2xl'>
        <img
          src={`${imgUrl}${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          className='absolute inset-0 w-full h-full object-cover scale-110'
        />

        <div className='absolute inset-0 bg-linear-to-l from-black/60 via-black to-surface '></div>

        <div className='bg-linear-to-r from-surface to-surface/25 backdrop-blur-xs rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-[300px_1fr] w-full md:max-h-[60vh]'>
          <div className='h-105 md:h-full'>
            <img
              src={`${imgUrl}${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className='w-full h-full object-cover'
            />
          </div>

          {/* // Content */}
          <div className='p-6 flex flex-col gap-4'>
            <div>
              <h1 className='font-heading text-3xl font-bold text-text-primary'>
                {movie.title}
                <span className='text-text-secondary text-lg ml-2'>
                  - {movie.release_date?.split('-')[0]}
                </span>
              </h1>

              <div className='py-2 border-b border-text-secondary/20'>
                <p className='text-sm text-text-secondary mt-1 flex gap-1 items-center'>
                  <ClockIcon className='size-4' />{' '}
                  {formatRuntime(movie.runtime)}
                </p>

                {/* Rating */}
                <div className='flex items-center gap-3'>
                  <div className='text-rating text-lg flex items-center gap-1'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < getStarRating(movie.vote_average) ? (
                          <StarIcon className='size-4' />
                        ) : (
                          '☆'
                        )}
                      </span>
                    ))}
                  </div>

                  <span className='text-text-secondary text-sm'>
                    {movie.vote_average?.toFixed(1)}/10
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className='font-heading text-sm tracking-wider text-text-secondary mb-2 uppercase'>
                Summary
              </h3>

              <p className='text-sm leading-relaxed text-text-secondary text-justify'>
                {movie.overview}
              </p>
            </div>

            <div className='flex items-center gap-3 pt-3'>
              <Link
                to={`https://www.youtube.com/watch?v=${trailer}`}
                aria-disabled={!trailer}
                onClick={(e) => {
                  if (!trailer) e.preventDefault();
                }}
                target='_blank'
                rel='noopener noreferrer'
                className={`flex items-center gap-2 bg-primary  px-5 py-2 rounded-lg font-medium ${!trailer ? 'cursor-default opacity-50 hover:bg-primary' : 'hover:bg-primary-hover'}`}
              >
                <PlayIcon className='size-4' /> Watch Trailer
              </Link>

              <Link
                to={`${movie?.homepage}`}
                aria-disabled={!movie?.homepage}
                onClick={(e) => {
                  if (!movie?.homepage) e.preventDefault();
                }}
                target='_blank'
                rel='noopener noreferrer'
                className={`w-10 h-10 flex items-center justify-center rounded-lg bg-surface hover:bg-background-secondary transition text-text-secondary ${!movie?.homepage ? 'cursor-auto opacity-50' : ''}`}
              >
                <LinkIcon className='size-5' />
              </Link>

              {/* Add to favorite */}
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-lg bg-surface hover:bg-background-secondary transition text-text-secondary cursor-pointer`}
                onClick={() => addMovieToFavorite(movie)}
              >
                <HeartIcon
                  className={`size-5 transition-colors ${favorites.some((favorite) => favorite.id === movie.id) ? 'text-rating' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
