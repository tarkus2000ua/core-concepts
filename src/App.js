import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import MovieListPage from './pages/movie-list-page/movie-list-page';
import MovieDetails, {
  movieLoader,
} from './components/movie-details/movie-details';
import SearchSection from './pages/movie-list-page/search-section';
import MovieDialog from './pages/movie-dialog/movie-dialog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MovieListPage />,
    children: [
      {
        index: true,
        element: <SearchSection />,
      },
      {
        path: 'new',
        element: <SearchSection />,
        children: [
          {
            index: true,
            element: <MovieDialog />,
          },
        ],
      },
      {
        path: ':movieid',
        loader: movieLoader,
        element: <MovieDetails />,
        children: [
          {
            path: 'edit',
            element: <MovieDialog mode="edit" />,
          }
        ]
      }
    ],
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
