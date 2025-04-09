import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from './dialog';

// Mock createPortal to render directly in the test environment
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node) => node,
}));

describe('Dialog Component', () => {
  const mockTitle = 'Test Dialog';
  const mockChildren = <div>Dialog Content</div>;
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockOnClose.mockClear();
  });

  test('renders dialog with title and content', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );
  
    // Verify title and content
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    
    // Verify close button using its accessible name
    expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
  });

  test('adds scroll lock to body on mount and removes on unmount', () => {
    const { unmount } = render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    expect(document.body.classList.contains('body-scroll-lock')).toBe(true);

    unmount();

    expect(document.body.classList.contains('body-scroll-lock')).toBe(false);
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );
  
    // Find the close button by its aria-label
    const closeButton = screen.getByRole('button', { name: /close dialog/i });
    userEvent.click(closeButton);
  
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking outside the dialog (on overlay)', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    const overlay = screen.getByRole('dialog').parentElement;
    userEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the dialog content', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );

    const dialogContent = screen.getByText('Dialog Content');
    userEvent.click(dialogContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('closes dialog when pressing Escape key', () => {
    render(
      <Dialog title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Dialog>
    );
  
    // Verify dialog is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  
    // Press Escape key
    userEvent.keyboard('{Escape}');
  
    // Verify onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});