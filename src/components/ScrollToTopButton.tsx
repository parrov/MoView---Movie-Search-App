import { ArrowUpIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-6 right-6 z-50 bg-background-secondary text-text-primary p-4 rounded-full shadow-xl/40 hover:scale-105 transition-all duration-300 cursor-pointer'
    >
      <ArrowUpIcon className='size-5' />
    </button>
  );
}
