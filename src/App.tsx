import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Index from './pages/Index';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path='/'
              element={<Index />}
            />

            <Route
              path='*'
              element={
                <Navigate
                  to='/'
                  replace
                />
              }
            />
            <Route
              path='/movie/:id'
              element={<MovieDetails />}
            />
            <Route
              path='/favorites'
              element={<FavoritesPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
