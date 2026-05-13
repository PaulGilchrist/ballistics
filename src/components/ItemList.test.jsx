import { render, fireEvent } from '@testing-library/react';
import ItemList from './ItemList';

const mockItems = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
  { id: 3, name: 'Gamma' },
];

test('renders the title when provided', () => {
  const { getByText } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(getByText('My List')).toBeInTheDocument();
});

test('renders the add button with the addItemLabel', () => {
  const { getByText } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(getByText('Add')).toBeInTheDocument();
});

test('renders each item name in the list', () => {
  const { getAllByRole } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  const listItems = getAllByRole('listitem');
  expect(listItems).toHaveLength(3);
  expect(listItems[0]).toHaveTextContent('Alpha');
  expect(listItems[1]).toHaveTextContent('Beta');
  expect(listItems[2]).toHaveTextContent('Gamma');
});

test('calls onSelect with the clicked item', () => {
  const handleSelect = vi.fn();
  const { getByText } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={handleSelect} title="My List" addItemLabel="Add" />
  );
  fireEvent.click(getByText('Alpha'));
  expect(handleSelect).toHaveBeenCalledWith(mockItems[0]);
});

test('calls onAdd when the add button is clicked', () => {
  const handleAdd = vi.fn();
  const { getByText } = render(
    <ItemList items={mockItems} onAdd={handleAdd} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  fireEvent.click(getByText('Add'));
  expect(handleAdd).toHaveBeenCalledTimes(1);
});

test('renders nothing when items is null', () => {
  const { container } = render(
    <ItemList items={null} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.firstChild).toBeNull();
});

test('renders nothing when items is undefined', () => {
  const { container } = render(
    <ItemList onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.firstChild).toBeNull();
});

test('renders nothing when items is false', () => {
  const { container } = render(
    <ItemList items={false} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.firstChild).toBeNull();
});

test('renders the structure with an empty items array', () => {
  const { container, getByText } = render(
    <ItemList items={[]} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.querySelector('.bal-form')).toBeInTheDocument();
  expect(container.querySelector('.card')).toBeInTheDocument();
  expect(getByText('My List')).toBeInTheDocument();
  expect(getByText('Add')).toBeInTheDocument();
});

test('renders no list items when items array is empty', () => {
  const { queryAllByRole } = render(
    <ItemList items={[]} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(queryAllByRole('listitem')).toHaveLength(0);
});

test('renders the container with the bal-form class', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.querySelector('.bal-form')).toBeInTheDocument();
});

test('renders the card wrapper with the card class', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.querySelector('.card')).toBeInTheDocument();
});

test('renders the heading with correct classes', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  const heading = container.querySelector('.card-heading');
  expect(heading).toHaveClass('d-flex');
  expect(heading).toHaveClass('p-2');
});

test('renders the body with the card-body class', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.querySelector('.card-body')).toBeInTheDocument();
});

test('renders the footer with the card-footer class', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.querySelector('.card-footer')).toBeInTheDocument();
});

test('renders the add button with correct classes', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  const button = container.querySelector('button');
  expect(button).toHaveClass('btn');
  expect(button).toHaveClass('btn-default');
});

test('renders the plus icon span with Font Awesome classes', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  const icon = container.querySelector('.fa-plus');
  expect(icon).toHaveClass('fa');
});

test('renders the list with the list-inline class', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  expect(container.querySelector('.list-inline')).toBeInTheDocument();
});

test('renders each list item with the card class', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  const listItems = container.querySelectorAll('li.card');
  expect(listItems).toHaveLength(3);
});

test('renders each item name inside a well div', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  const wells = container.querySelectorAll('.well');
  expect(wells).toHaveLength(3);
  expect(wells[0]).toHaveTextContent('Alpha');
});

test('uses item.id as the key for each list item', () => {
  const { container } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={() => {}} title="My List" addItemLabel="Add" />
  );
  const listItems = container.querySelectorAll('li');
  expect(listItems).toHaveLength(3);
});

test('calls onSelect with the correct item for each list entry', () => {
  const handleSelect = vi.fn();
  const { getAllByRole } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={handleSelect} title="My List" addItemLabel="Add" />
  );
  const listItems = getAllByRole('listitem');
  fireEvent.click(listItems[1]);
  expect(handleSelect).toHaveBeenCalledWith(mockItems[1]);
  fireEvent.click(listItems[2]);
  expect(handleSelect).toHaveBeenCalledWith(mockItems[2]);
});

test('calls onSelect with each item when all are clicked', () => {
  const handleSelect = vi.fn();
  const { getAllByRole } = render(
    <ItemList items={mockItems} onAdd={() => {}} onSelect={handleSelect} title="My List" addItemLabel="Add" />
  );
  const listItems = getAllByRole('listitem');
  listItems.forEach((item) => fireEvent.click(item));
  expect(handleSelect).toHaveBeenCalledTimes(3);
});

test('renders a single item correctly', () => {
  const singleItem = [{ id: 42, name: 'Solo' }];
  const { getAllByRole, getByText } = render(
    <ItemList items={singleItem} onAdd={() => {}} onSelect={() => {}} title="Solo List" addItemLabel="Add" />
  );
  expect(getAllByRole('listitem')).toHaveLength(1);
  expect(getByText('Solo')).toBeInTheDocument();
});

test('renders a large list with many items', () => {
  const manyItems = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Item ${i}` }));
  const { getAllByRole } = render(
    <ItemList items={manyItems} onAdd={() => {}} onSelect={() => {}} title="Big List" addItemLabel="Add" />
  );
  expect(getAllByRole('listitem')).toHaveLength(20);
});
