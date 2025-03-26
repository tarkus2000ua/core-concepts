import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OptionSelect from './option-select';

describe('OptionSelect component', () => {
  const options = [
    {
      id: 1,
      value: 'ALL',
    },
    {
      id: 2,
      value: 'DOCUMENTARY',
    },
    {
      id: 3,
      value: 'COMEDY',
    },
    {
      id: 4,
      value: 'HORROR',
    },
    {
      id: 5,
      value: 'CRIME',
    },
  ];

  test('renders with initial selection passed in props', () => {
    render(<OptionSelect options={options} selection="COMEDY" />);
    const activeOption = screen.getByText('COMEDY');
    expect(activeOption).toHaveClass('active');
  });

  test('clicking on an option triggers onSelect with the correct value', () => {
    const onSelectMock = jest.fn();
    render(
      <OptionSelect
        options={options}
        selection="DOCUMENTARY"
        onSelect={onSelectMock}
      />
    );

    const optionToClick = screen.getByText('HORROR');
    fireEvent.click(optionToClick);

    expect(onSelectMock).toHaveBeenCalledWith('HORROR');
  });

  test('does not call onSelect if the same option is clicked again', () => {
    const onSelectMock = jest.fn();
    render(
      <OptionSelect
        options={options}
        selection="DOCUMENTARY"
        onSelect={onSelectMock}
      />
    );

    const activeOption = screen.getByText('DOCUMENTARY');
    fireEvent.click(activeOption);

    expect(onSelectMock).not.toHaveBeenCalled();
  });
});
