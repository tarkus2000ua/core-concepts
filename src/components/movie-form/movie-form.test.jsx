import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from './movie-form';

// Mock the MultiselectDropdown component at the top level
jest.mock('../multiselect-dropdown/multiselect-dropdown', () => {
    return function MockMultiselectDropdown({ options, selection, onSelect }) {
      return (
        <div data-testid="mock-multiselect">
          {options.map(option => (
            <button 
              key={option.id}
              onClick={() => onSelect(option.value)}
              data-selected={selection.includes(option.value)}
            >
              {option.value}
            </button>
          ))}
        </div>
      );
    };
  });

describe('MovieForm', () => {
  const mockMovie = {
    title: 'Test Movie',
    releaseDate: '2023-01-01',
    posterUrl: 'https://example.com/poster.jpg',
    rating: 8.5,
    genres: ['Action', 'Comedy'],
    runtime: 120,
    description: 'Test description',
  };

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders form with default values when no movie provided', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    // Check that inputs are either empty string or null/undefined
    const runtimeInput = screen.getByPlaceholderText('minutes');
    expect(runtimeInput.value === '' || runtimeInput.value === null).toBeTruthy();
    
    // For other inputs that should definitely be empty string
    expect(screen.getByPlaceholderText('Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('https://')).toHaveValue('');
    expect(screen.getByPlaceholderText('Movie description')).toHaveValue('');
  });

  test('renders form with movie data when provided', () => {
    render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Title')).toHaveValue(mockMovie.title);
    expect(screen.getByDisplayValue(mockMovie.releaseDate)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://')).toHaveValue(
      mockMovie.posterUrl
    );
    expect(
      screen.getByDisplayValue(mockMovie.rating.toString())
    ).toBeInTheDocument();
    expect(Number(screen.getByPlaceholderText('minutes').value)).toBe(mockMovie.runtime);
    expect(screen.getByPlaceholderText('Movie description')).toHaveValue(
      mockMovie.description
    );
  });

  test('submits form data correctly', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);

    // Fill out form
    userEvent.type(screen.getByPlaceholderText('Title'), 'New Movie');
    userEvent.type(
      screen.getByPlaceholderText('https://'),
      'https://new-poster.jpg'
    );
    userEvent.type(screen.getByPlaceholderText('minutes'), '90');
    userEvent.type(
      screen.getByPlaceholderText('Movie description'),
      'New description'
    );

    // Submit form
    userEvent.click(screen.getByText('SUBMIT'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Movie',
      poster_path: 'https://new-poster.jpg',
      runtime: '90',
      description: 'New description',
      genres: [],
      releaseDate: '',
      rating: '',
    });
  });

  test('handles date input correctly', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByTestId('date-input');
    
    userEvent.type(dateInput, '2023-05-15');
    expect(dateInput).toHaveValue('2023-05-15');
  });

  test('resets form correctly', () => {
    render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

    // Change some values
    userEvent.type(screen.getByPlaceholderText('Title'), 'Changed Title');
    userEvent.type(
      screen.getByDisplayValue(mockMovie.rating.toString()),
      '7.5'
    );

    // Reset form
    userEvent.click(screen.getByText('RESET'));

    // Verify values are back to original
    expect(screen.getByPlaceholderText('Title')).toHaveValue(mockMovie.title);
    expect(
      screen.getByDisplayValue(mockMovie.rating.toString())
    ).toBeInTheDocument();
  });

  test('handles genre selection through MultiselectDropdown', () => {
    render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);
    
    // Find and click genre options
    const actionButton = screen.getByText('Action');
    const comedyButton = screen.getByText('Comedy');
    
    userEvent.click(actionButton);
    userEvent.click(comedyButton);
    
    // Submit form
    userEvent.click(screen.getByText('SUBMIT'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      genres: ['Action', 'Comedy']
    }));
  });

  test('shows date placeholder when no date selected', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByTestId('date-input');
    
    // Verify placeholder
    expect(screen.getByText('Select Date')).toBeInTheDocument();
    
    // Change date
    userEvent.type(dateInput, '2023-01-01');
    
    // Verify placeholder gone
    expect(screen.queryByText('Select Date')).not.toBeInTheDocument();
  });
});
