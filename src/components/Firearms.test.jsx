import { render, fireEvent } from '@testing-library/react';
import Firearms from './Firearms';

const mockFirearms = [
  { id: 1, name: 'Glock 19' },
  { id: 2, name: 'AR-15' },
  { id: 3, name: 'Remington 700' },
];

test('renders the title "Select Firearm"', () => {
  const { getByText } = render(
    <Firearms firearms={mockFirearms} onAdd={() => {}} onSelect={() => {}} />
  );
  expect(getByText('Select Firearm')).toBeInTheDocument();
});

test('renders the "Add Firearm" button', () => {
  const { getByText } = render(
    <Firearms firearms={mockFirearms} onAdd={() => {}} onSelect={() => {}} />
  );
  expect(getByText('Add Firearm')).toBeInTheDocument();
});

test('renders each firearm name in the list', () => {
  const { getAllByRole } = render(
    <Firearms firearms={mockFirearms} onAdd={() => {}} onSelect={() => {}} />
  );
  const listItems = getAllByRole('listitem');
  expect(listItems).toHaveLength(3);
  expect(listItems[0]).toHaveTextContent('Glock 19');
  expect(listItems[1]).toHaveTextContent('AR-15');
  expect(listItems[2]).toHaveTextContent('Remington 700');
});

test('calls onSelect with the clicked firearm', () => {
  const handleSelect = vi.fn();
  const { getByText } = render(
    <Firearms firearms={mockFirearms} onAdd={() => {}} onSelect={handleSelect} />
  );
  fireEvent.click(getByText('Glock 19'));
  expect(handleSelect).toHaveBeenCalledWith(mockFirearms[0]);
});

test('calls onAdd when the add button is clicked', () => {
  const handleAdd = vi.fn();
  const { getByText } = render(
    <Firearms firearms={mockFirearms} onAdd={handleAdd} onSelect={() => {}} />
  );
  fireEvent.click(getByText('Add Firearm'));
  expect(handleAdd).toHaveBeenCalledTimes(1);
});

test('renders nothing when firearms is null', () => {
  const { container } = render(
    <Firearms firearms={null} onAdd={() => {}} onSelect={() => {}} />
  );
  expect(container.firstChild).toBeNull();
});

test('renders nothing when firearms is undefined', () => {
  const { container } = render(<Firearms onAdd={() => {}} onSelect={() => {}} />);
  expect(container.firstChild).toBeNull();
});

test('renders title and button with an empty firearms array', () => {
  const { getByText, queryAllByRole } = render(
    <Firearms firearms={[]} onAdd={() => {}} onSelect={() => {}} />
  );
  expect(getByText('Select Firearm')).toBeInTheDocument();
  expect(getByText('Add Firearm')).toBeInTheDocument();
  expect(queryAllByRole('listitem')).toHaveLength(0);
});
