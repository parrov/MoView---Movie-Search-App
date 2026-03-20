import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
