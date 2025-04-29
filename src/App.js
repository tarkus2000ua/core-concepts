import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import MovieListPage from './pages/movie-list-page/movie-list-page';
import MovieDetails, { movieLoader } from './components/movie-details/movie-details';
import SearchSection from './pages/movie-list-page/search-section';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage/>,
    children: [
      {
      element: <SearchSection />,
      index: true,
      },
      {
      path: ":movieid",
      element: <MovieDetails />,
      loader: movieLoader
      },
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
