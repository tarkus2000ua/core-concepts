// MovieTile.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieTile from './movie-tile';

describe('MovieTile Component', () => {
  const mockMovie = {
    poster_path: 'https://example.com/poster.jpg',
    title: 'The Shawshank Redemption',
    release_date: '1993-09-14',
    genres: ['Drama', 'Crime'],
  };

  const mockOnTileClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all movie information correctly', () => {
    render(<MovieTile movie={mockMovie} onTileClick={mockOnTileClick} />);
    
    // Check poster image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockMovie.poster_path);
    expect(image).toHaveClass('poster');
    
    // Check title and year
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    const expectedYear = new Date(mockMovie.release_date).getFullYear();
    expect(screen.getByText(expectedYear.toString())).toBeInTheDocument();
    
    // Check genres
    const genresElement = screen.getByTitle(mockMovie.genres.join(', '));
    expect(genresElement).toHaveTextContent(mockMovie.genres.join(', '));
  });

  it('calls onTileClick when movie tile is clicked', async () => {
    render(<MovieTile movie={mockMovie} onTileClick={mockOnTileClick} />);
    const tile = screen.getByRole('img').parentElement;
    
    await userEvent.click(tile); // Click the movie tile
    expect(mockOnTileClick).toHaveBeenCalledWith(mockMovie);
  });

  it('opens and closes the context menu', async () => {
    render(<MovieTile movie={mockMovie} onTileClick={mockOnTileClick} />);
    
    // Menu should not be visible initially
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    
    // Click menu handle to open menu
    const menuHandle = screen.getByRole('button', { name: 'menu-button' }); 
    await userEvent.click(menuHandle);
    
    // Menu should now be visible with options
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    
    // Click close button
    await userEvent.click(screen.getByText('×'));
    
    // Menu should be closed again
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('does not propagate click event when menu is clicked', async () => {
    render(<MovieTile movie={mockMovie} onTileClick={mockOnTileClick} />);
    
    // Open the menu
    await userEvent.click(screen.getByRole('button', { name: 'menu-button' }));
    
    // Click on a menu item
    await userEvent.click(screen.getByText('Edit'));
    
    // onTileClick should not have been called
    expect(mockOnTileClick).not.toHaveBeenCalled();
  });

});