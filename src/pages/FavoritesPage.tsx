import { HeartIcon } from '@heroicons/react/24/solid';
import MovieCard from '../components/MovieCard';
import { useMovieState } from '../hooks/useMovieState';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const favorites = useMovieState((state) => state.favorites);

  return (
    <div className='container max-w-7xl mx-auto py-6 px-4'>
      {favorites.length > 0 ? (
        <h2 className='text-2xl text-text-secondary'>Your Favorites Movies:</h2>
      ) : (
        <div className='flex flex-col items-center justify-center text-center py-12 gap-1'>
          <div className='bg-surface/40 p-6 rounded-full mb-4'>
            <HeartIcon className='size-10 text-text-secondary/40 ' />
          </div>

          <h2 className='text-2xl font-bold text-text-primary'>
            No favorite movies yet
          </h2>

          <p className='text-text-secondary max-w-sm'>
            Start exploring and add some to your list!
          </p>

          <Link
            to='/'
            className='mt-4 px-4 py-2 rounded-lg bg-primary-hover text-text-primary font-semibold hover:bg-primary transition'
          >
            Explore Movies
          </Link>
        </div>
      )}
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 gap-y-14 py-6'>
        {favorites
          .filter((favorite) => favorite.poster_path)
          .map((favorite) => (
            <MovieCard
              key={favorite.id}
              movie={favorite}
            />
          ))}
      </div>
    </div>
  );
}
