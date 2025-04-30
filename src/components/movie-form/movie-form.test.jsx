import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from './movie-form';

// Mock the MultiselectDropdown component
jest.mock('../multiselect-dropdown/multiselect-dropdown', () => {
  return function MockMultiselectDropdown({ options, selection = [], onSelect }) {
    return (
      <div data-testid="mock-multiselect">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => {
              const newSelection = selection.includes(option.value)
                ? selection.filter(g => g !== option.value)
                : [...selection, option.value];
              onSelect(newSelection);
            }}
            data-selected={selection.includes(option.value).toString()}
            data-testid={`genre-${option.value.toLowerCase()}`}
          >
            {option.value}
          </button>
        ))}
        <input 
          type="hidden" 
          data-testid="genre-hidden-input" 
          value={selection} 
          onChange={() => {}}
        />
      </div>
    );
  };
});

describe('MovieForm', () => {
  const mockMovie = {
    title: 'Test Movie',
    release_date: '2023-01-01',
    poster_path: 'https://example.com/poster.jpg',
    vote_average: 8.5,
    genres: ['Action', 'Comedy'],
    runtime: 120,
    overview: 'Test description',
  };

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders form with default values when no movie provided', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByPlaceholderText('Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('https://')).toHaveValue('');
    expect(screen.getByPlaceholderText('minutes')).toHaveValue(null);
    expect(screen.getByPlaceholderText('Movie description')).toHaveValue('');
    expect(screen.getByTestId('date-input')).toHaveValue('');
  });

  test('renders form with movie data when provided', () => {
    render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Title')).toHaveValue(mockMovie.title);
    expect(screen.getByTestId('date-input')).toHaveValue(mockMovie.release_date);
    expect(screen.getByPlaceholderText('https://')).toHaveValue(mockMovie.poster_path);
    expect(screen.getByDisplayValue(mockMovie.vote_average.toString())).toBeInTheDocument();
    expect(screen.getByPlaceholderText('minutes')).toHaveValue(mockMovie.runtime.toString());
    expect(screen.getByPlaceholderText('Movie description')).toHaveValue(mockMovie.overview);
  });

  test('submits form data correctly', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);

    // Fill out form
    userEvent.type(screen.getByPlaceholderText('Title'), 'New Movie');
    userEvent.type(screen.getByPlaceholderText('https://'), 'https://new-poster.jpg');
    userEvent.type(screen.getByPlaceholderText('minutes'), '90');
    userEvent.type(screen.getByPlaceholderText('Movie description'), 'New description');
    userEvent.type(screen.getByTestId('date-input'), '2023-05-15');
    userEvent.type(screen.getByDisplayValue(''), '7.5'); // vote_average

    // Select genres
    userEvent.click(screen.getByTestId('genre-action'));
    userEvent.click(screen.getByTestId('genre-drama'));

    // Submit form
    userEvent.click(screen.getByText('SUBMIT'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Movie',
      poster_path: 'https://new-poster.jpg',
      runtime: 90,
      overview: 'New description',
      genres: ['Action', 'Drama'],
      release_date: '2023-05-15',
      vote_average: 7.5,
    });
  });

  test('handles date input correctly', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByTestId('date-input');
    userEvent.type(dateInput, '2023-05-15');
    expect(dateInput).toHaveValue('2023-05-15');
  });

  test('resets form correctly', async () => {
    render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

    // Get form inputs
    const titleInput = screen.getByPlaceholderText('Title');
    const ratingInput = screen.getByDisplayValue(mockMovie.vote_average.toString());
    const runtimeInput = screen.getByPlaceholderText('minutes');
    
    // Change values
    userEvent.clear(titleInput);
    userEvent.type(titleInput, 'Changed Title');
    
    userEvent.clear(ratingInput);
    userEvent.type(ratingInput, '7.5');
    
    userEvent.clear(runtimeInput);
    userEvent.type(runtimeInput, '150');

    // Reset form
    userEvent.click(screen.getByText('RESET'));

    // Wait for reset to complete
    await waitFor(() => {
      expect(titleInput).toHaveValue(mockMovie.title);
      expect(ratingInput).toHaveValue(mockMovie.vote_average.toString());
      expect(runtimeInput).toHaveValue(mockMovie.runtime.toString());
    });
  });

  test('handles genre selection through MultiselectDropdown', async () => {
    render(<MovieForm onSubmit={(data) => {
      console.log('Form submitted with:', data);
      mockOnSubmit(data);
    }} />);
  
    console.log('Before selection - genres:', screen.getByTestId('genre-hidden-input').value);
    
    userEvent.click(screen.getByTestId('genre-action'));
    userEvent.click(screen.getByTestId('genre-comedy'));
    
    console.log('After selection - genres:', screen.getByTestId('genre-hidden-input').value);
  
    userEvent.click(screen.getByText('SUBMIT'));
  
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      console.log('Submission received:', mockOnSubmit.mock.calls[0][0]);
    });
  });

  test('shows date placeholder when no date selected', () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByText('Select Date')).toBeInTheDocument();
    
    userEvent.type(screen.getByTestId('date-input'), '2023-01-01');
    
    expect(screen.queryByText('Select Date')).not.toBeInTheDocument();
  });

  test('shows validation errors when required fields are empty', async () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);
  
    // Submit form without filling anything
    userEvent.click(screen.getByText('SUBMIT'));
  
    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
      expect(screen.getByText('Release date is required')).toBeInTheDocument();
      expect(screen.getByText('Runtime is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
      expect(screen.getByText('At least one genre is required')).toBeInTheDocument();
    });
  });
});