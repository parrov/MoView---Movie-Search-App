import { useEffect, useState } from 'react';
import { FilmIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobile, setMobile] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // ajusta el valor
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

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Favorites', to: '/favorites' },
  ];

  return (
    <header
      className={`sticky top-0 z-100 border-b border-background-secondary transition-colors duration-300 ${
        scrolled
          ? 'bg-background-secondary/90 backdrop-blur-sm shadow-xl/20 border-0'
          : 'bg-transparent'
      }`}
    >
      <div className='container max-w-7xl mx-auto flex items-center justify-between p-4'>
        <Link
          to='/'
          onClick={scrollToTop}
        >
          <div className='flex items-center gap-2'>
            <FilmIcon className='h-8 w-8 text-primary' />
            <p className='text-text-primary font-heading font-bold text-xl'>
              MoView
            </p>
          </div>
        </Link>

        <nav className='hidden md:flex items-center gap-6 text-text-primary font-body text-lg'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className='hover:text-primary hover:border-primary transition-colors duration-300 p-1 outline-none'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className='md:hidden flex items-center justify-center p-2 rounded-lg bg-background-secondary hover:bg-surface transition cursor-pointer duration-200'
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? (
            <XMarkIcon className='h-6 w-6 text-text-primary' />
          ) : (
            <Bars3Icon className='h-6 w-6 text-text-primary' />
          )}
        </button>
      </div>

      <div
        className={`md:hidden origin-top transform transition-all duration-300 ${
          mobile ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        } bg-surface border-t border-background-secondary`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onClick={() => setMobile(false)}
            className='block px-6 py-3 text-text-primary hover:bg-background-secondary transition'
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
