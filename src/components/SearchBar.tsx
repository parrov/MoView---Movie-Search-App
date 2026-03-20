import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useMovieState } from '../hooks/useMovieState';
import { useState } from 'react';

export default function SearchBar() {
  const setMovieSearch = useMovieState((state) => state.setMovieSearch);
  const loadPages = useMovieState((state) => state.loadPages);

  const [search, setSearch] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim() === '') {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);
    setMovieSearch(search);
    loadPages();
  };

  return (
    <div className='text-text-primary text-center border-b border-background-secondary py-22 px-4'>
      <div className='container mx-auto'>
        <h1 className='text-5xl font-heading font-bold mb-6'>
          Discover everything about your favorites movies
        </h1>
        <p className='text-text-secondary text-2xl'>
          Search and explore millions of movies.
        </p>

        <div className='w-full flex justify-center mt-8'>
          <form
            className={`flex w-full max-w-3xl rounded-lg overflow-hidden border  bg-white/5 backdrop-blur ${isEmpty ? 'border-primary' : 'border-surface'}`}
            onSubmit={handleSubmit}
          >
            <div className='flex items-center flex-1 px-4 gap-3'>
              <label htmlFor='search'>
                <MagnifyingGlassIcon className='text-text-secondary size-6' />
              </label>
              <input
                type='text'
                id='search'
                onChange={handleChange}
                placeholder='Search for movies...'
                className='w-full bg-transparent py-4 text-text-secondary placeholder-text-secondary focus:outline-none'
              />
            </div>

            <input
              type='submit'
              className='bg-primary-hover hover:bg-primary px-8 text-text-primary font-semibold transition cursor-pointer'
              value='Search'
            />
          </form>
        </div>
        {isEmpty && (
          <p className='text-primary text-sm mt-2'>
            Please enter a search term.
          </p>
        )}
      </div>
    </div>
  );
}
