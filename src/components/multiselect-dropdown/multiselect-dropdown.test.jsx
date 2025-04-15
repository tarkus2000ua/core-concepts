import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiselectDropdown from './multiselect-dropdown';
import { useState } from 'react';

describe('MultiselectDropdown', () => {
  const mockOptions = [
    { id: 1, value: 'Action' },
    { id: 2, value: 'Comedy' },
    { id: 3, value: 'Drama' }
  ];

  test('renders with default placeholder', () => {
    render(<MultiselectDropdown options={mockOptions} />);
    expect(screen.getByText('Select Genre')).toBeInTheDocument();
  });

  test('displays selected items as text', () => {
    render(
      <MultiselectDropdown 
        options={mockOptions} 
        selection={['Action', 'Drama']} 
      />
    );
    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
  });

  test('toggles dropdown on button click', async () => {
    render(<MultiselectDropdown options={mockOptions} />);
    const button = screen.getByRole('button');
    
    // Closed by default
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    
    // Open on click
    await userEvent.click(button);
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    // Close on click
    await userEvent.click(button);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('selects and deselects items', async () => {
    const mockOnSelect = jest.fn();
  
    const Wrapper = () => {
      const [selection, setSelection] = useState([]);
      return (
        <MultiselectDropdown
          options={[
            { id: 1, value: 'Action' },
            { id: 2, value: 'Comedy' },
          ]}
          selection={selection}
          onSelect={(newSelection) => {
            setSelection(newSelection);
            mockOnSelect(newSelection);
          }}
        />
      );
    };
  
    render(<Wrapper />);
  
    // Open the dropdown
    await userEvent.click(screen.getByRole('button'));
  
    // Scope to the dropdown menu
    const dropdownList = screen.getByRole('list'); // ul element
    const comedyItem = within(dropdownList).getByText('Comedy');
  
    // Click Comedy to select
    await userEvent.click(comedyItem);
    expect(mockOnSelect).toHaveBeenLastCalledWith(['Comedy']);
  
    // Click Comedy again to deselect
    await userEvent.click(comedyItem);
    expect(mockOnSelect).toHaveBeenLastCalledWith([]);
    expect(mockOnSelect).toHaveBeenLastCalledWith([]);
  });
  

  test('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <MultiselectDropdown options={mockOptions} />
        <div data-testid="outside">Outside element</div>
      </div>
    );
    
    // Open dropdown
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('list')).toBeInTheDocument();
    
    // Click outside
    await userEvent.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('syncs with external selection changes', async () => {
    const { rerender } = render(
      <MultiselectDropdown 
        options={mockOptions} 
        selection={[]} 
      />
    );
    
    expect(screen.getByText('Select Genre')).toBeInTheDocument();
    
    rerender(
      <MultiselectDropdown 
        options={mockOptions} 
        selection={['Drama']} 
      />
    );
    
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });


});