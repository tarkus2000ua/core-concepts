import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './movie-details';

describe('MovieDetails Component', () => {
  const mockMovie = {
    title: 'The Shawshank Redemption',
    poster_path: 'https://example.com/shawshank.jpg',
    vote_average: 9.3,
    genres: ['Drama'],
    release_date: '1993-09-14',
    runtime: 142,
    overview: 'Two imprisoned men bond over a number of years...',
  };

  test('renders movie details correctly', () => {
    render(<MovieDetails movie={mockMovie} />);

    // Check if all main elements are rendered
    expect(screen.getByAltText('poster')).toBeInTheDocument();
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(
      screen.getByText(mockMovie.vote_average.toString())
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genres.join(', '))).toBeInTheDocument();
    const expectedYear = new Date(mockMovie.release_date).getFullYear();
    expect(screen.getByText(expectedYear.toString())).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  test('displays correct runtime format', () => {
    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByTestId('runtime')).toHaveTextContent('2h 22min');
  });

  test('displays correct poster URL', () => {
    render(<MovieDetails movie={mockMovie} />);

    const imgElement = screen.getByAltText('poster');
    expect(imgElement).toHaveAttribute('src', mockMovie.poster_path);
  });
});
