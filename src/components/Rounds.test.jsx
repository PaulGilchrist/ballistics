import { render, screen, fireEvent } from '@testing-library/react';
import Rounds from './Rounds';

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

const mockRounds = [
  { id: 1, name: '5.56 NATO' },
  { id: 2, name: '.308 Win' },
  { id: 3, name: '.223 Rem' },
];

const mockOnAdd = () => {};
const mockOnSelect = () => {};

const defaultProps = {
  rounds: mockRounds,
  onAdd: mockOnAdd,
  onSelect: mockOnSelect,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Rounds', () => {
  test('renders the form container with correct class', () => {
    render(<Rounds {...defaultProps} />);
    expect(document.querySelector('.bal-form')).toBeInTheDocument();
  });

  test('renders the card element', () => {
    render(<Rounds {...defaultProps} />);
    expect(document.querySelector('.card')).toBeInTheDocument();
  });

  test('displays the title "Select Round"', () => {
    render(<Rounds {...defaultProps} />);
    expect(screen.getByText('Select Round')).toBeInTheDocument();
  });

  test('renders one list item per round', () => {
    render(<Rounds {...defaultProps} />);
    const items = document.querySelectorAll('li.card');
    expect(items.length).toBe(mockRounds.length);
  });

  test('displays each round name in the list', () => {
    render(<Rounds {...defaultProps} />);
    expect(screen.getByText('5.56 NATO')).toBeInTheDocument();
    expect(screen.getByText('.308 Win')).toBeInTheDocument();
    expect(screen.getByText('.223 Rem')).toBeInTheDocument();
  });

  test('renders the add button with label "Add Round"', () => {
    render(<Rounds {...defaultProps} />);
    expect(screen.getByText('Add Round')).toBeInTheDocument();
  });

  test('renders the add button with correct classes', () => {
    render(<Rounds {...defaultProps} />);
    const button = screen.getByText('Add Round').closest('button');
    expect(button).toHaveClass('btn', 'btn-default');
  });

  test('calls onSelect with the clicked round', () => {
    const onSelect = vi.fn();
    render(<Rounds {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('5.56 NATO'));
    expect(onSelect).toHaveBeenCalledWith(mockRounds[0]);
  });

  test('calls onAdd when the add button is clicked', () => {
    const onAdd = vi.fn();
    render(<Rounds {...defaultProps} onAdd={onAdd} />);
    fireEvent.click(screen.getByText('Add Round'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  test('renders no list items when rounds is an empty array', () => {
    render(<Rounds {...defaultProps} rounds={[]} />);
    const items = document.querySelectorAll('li.card');
    expect(items.length).toBe(0);
  });

  test('renders null when rounds is null', () => {
    const { container } = render(<Rounds {...defaultProps} rounds={null} />);
    expect(container.innerHTML).toBe('');
  });

  test('renders null when rounds is undefined', () => {
    const { container } = render(<Rounds {...defaultProps} rounds={undefined} />);
    expect(container.innerHTML).toBe('');
  });

  test('renders null when rounds prop is missing entirely', () => {
    const { container } = render(<Rounds onAdd={mockOnAdd} onSelect={mockOnSelect} />);
    expect(container.innerHTML).toBe('');
  });

  test('renders the add button even when rounds is empty', () => {
    render(<Rounds {...defaultProps} rounds={[]} />);
    expect(screen.getByText('Add Round')).toBeInTheDocument();
  });

  test('renders the title even when rounds is empty', () => {
    render(<Rounds {...defaultProps} rounds={[]} />);
    expect(screen.getByText('Select Round')).toBeInTheDocument();
  });
});
