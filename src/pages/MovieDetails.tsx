import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SelectedMovieDetails from '../components/SelectedMovieDetails';
import { useMovieState } from '../hooks/useMovieState';
import Spinner from '../components/Spinner';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getDetails = useMovieState((state) => state.getDetails);
  const movieDetails = useMovieState((state) => state.movieDetails);
  const getMovieTrailer = useMovieState((state) => state.getMovieTrailer);
  const movieTrailer = useMovieState((state) => state.movieTrailer);
  const isLoading = useMovieState((state) => state.isLoading);
  const error = useMovieState((state) => state.error);

  useEffect(() => {
    if (!id) return;
    const movieId = Number(id);
    if (isNaN(movieId)) {
      navigate('/', { replace: true });
      return;
    }
    getDetails(movieId);
    getMovieTrailer(movieId);
  }, [id, getDetails, navigate]);

  if (isLoading) {
    return (
      <div className='absolute inset-0 flex justify-center items-center bg-surface/5 backdrop-blur-sm z-10'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <h1>Movie not found</h1>
      </div>
    );
  }

  return (
    <div className='relative h-screen'>
      <div className='container mx-auto mt-6'>
        <SelectedMovieDetails
          movie={movieDetails}
          trailer={movieTrailer}
        />
      </div>
    </div>
  );
}
