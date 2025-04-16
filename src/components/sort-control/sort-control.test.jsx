import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortControl from './sort-control';

describe('SortControl Component', () => {
  const mockOptions = [
    { id: 1, name: 'Release Date', value: 'release_date' },
    { id: 2, name: 'Title', value: 'title' },
  ];
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default selection', () => {
    render(<SortControl options={mockOptions} />);
    
    expect(screen.getByText('SORT BY')).toBeInTheDocument();
    expect(screen.getByText('Release Date')).toBeInTheDocument();
  });

  test('renders with provided selection', () => {
    render(<SortControl options={mockOptions} selection="title" />);
    
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  test('opens dropdown when button is clicked', async () => {
    render(<SortControl options={mockOptions} />);
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('calls onSelect when an option is selected', async () => {
    render(<SortControl options={mockOptions} onSelect={mockOnSelect} />);
    
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByText('Title'));
    
    expect(mockOnSelect).toHaveBeenCalledWith('title');
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <SortControl options={mockOptions} />
        <div data-testid="outside-element">Outside</div>
      </div>
    );
    
    // Open dropdown
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    // Click outside
    await userEvent.click(screen.getByTestId('outside-element'));
    
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('does not call onSelect when same option is selected', async () => {
    render(<SortControl options={mockOptions} selection="release_date" onSelect={mockOnSelect} />);
    
    // Open dropdown
    await userEvent.click(screen.getByRole('button'));
    
    // Get the dropdown option specifically (not the button text)
    const optionItems = screen.getAllByRole('listitem');
    const releaseDateOption = optionItems.find(item => 
      item.textContent === 'Release Date'
    );
    
    await userEvent.click(releaseDateOption);
    
    expect(mockOnSelect).not.toHaveBeenCalled();
  });
});