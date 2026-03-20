import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/solid';
import { useMovieState } from '../hooks/useMovieState';

export default function FiltersDropdown() {
  const [open, setOpen] = useState(false);

  const sortMoviesByTitle = useMovieState((state) => state.sortMoviesByTitle);
  const sortOrder = useMovieState((state) => state.sortOrder);

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className='flex items-center gap-1 px-4 py-2 bg-surface rounded-lg hover:bg-surface/90 transition cursor-pointer text-xs text-text-secondary'
      >
        <FunnelIcon className='h-3 w-3' />
        Filters
      </button>

      {open && (
        <div
          className='absolute left-0 mt-2 w-38 bg-surface rounded-xl shadow-lg border border-text-secondary/5 p-2 space-y-1 z-50 text-text-secondary *:cursor-pointer *:hover:bg-background-secondary/40 text-xs'
          onMouseLeave={() => setOpen(false)}
        >
          <button
            onClick={sortMoviesByTitle}
            className='w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition'
          >
            Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>

          {/* <button className='w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition'>
            Highest Rating
          </button>

          <button className='w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition'>
            Newest
          </button> */}
        </div>
      )}
    </div>
  );
}
