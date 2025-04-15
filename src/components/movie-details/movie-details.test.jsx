import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './movie-details';

describe('MovieDetails Component', () => {
  const mockMovie = {
    title: 'The Shawshank Redemption',
    poster_path: 'https://example.com/shawshank.jpg',
    rating: 9.3,
    genres: ['Drama'],
    year: 1994,
    runtime: 142,
    description: 'Two imprisoned men bond over a number of years...'
  };

  test('renders movie details correctly', () => {
    render(<MovieDetails movie={mockMovie} />);
    
    // Check if all main elements are rendered
    expect(screen.getByAltText('poster')).toBeInTheDocument();
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(mockMovie.genres.join(', '))).toBeInTheDocument();
    expect(screen.getByText(mockMovie.year.toString())).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
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