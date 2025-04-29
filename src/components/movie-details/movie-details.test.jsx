import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import MovieDetails from './movie-details';

const mockMovie = {
  title: 'The Shawshank Redemption',
  poster_path: '/shawshank.jpg',
  vote_average: 9.3,
  genres: ['Drama'],
  release_date: '1994-09-23',
  runtime: 142,
  overview: 'Two imprisoned men bond over a number of years...',
};

const renderWithRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: '/movies/:id',
        element: <MovieDetails />,
        loader: () => mockMovie,
      },
    ],
    {
      initialEntries: ['/movies/123'],
      initialIndex: 0,
    }
  );

  return render(<RouterProvider router={router} />);
};

describe('MovieDetails Component', () => {
  test('renders all movie details correctly', () => {
    renderWithRouter();

    // Verify poster image
    const imgElement = screen.getByAltText('poster');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockMovie.poster_path);

    // Verify text content
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.vote_average.toString())).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genres.join(', '))).toBeInTheDocument();
    
    // Verify year extraction
    const expectedYear = new Date(mockMovie.release_date).getFullYear();
    expect(screen.getByText(expectedYear.toString())).toBeInTheDocument();
    
    // Verify overview
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  test('displays correct runtime format (142 minutes → 2h 22min)', () => {
    renderWithRouter();
    expect(screen.getByTestId('runtime')).toHaveTextContent('2h 22min');
  });

  test('handles missing poster gracefully', () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: undefined
    };

    const router = createMemoryRouter(
      [
        {
          path: '/movies/:id',
          element: <MovieDetails />,
          loader: () => movieWithoutPoster,
        },
      ],
      {
        initialEntries: ['/movies/123'],
      }
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByAltText('poster')).toHaveAttribute('src', ''); 
  });
});