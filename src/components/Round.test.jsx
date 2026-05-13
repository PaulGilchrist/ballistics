import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Round from './Round';

const mockRound = {
  id: 'round-1',
  name: '5.56 NATO',
  bulletBC: 0.35,
  bulletDiameterInches: 0.223,
  bulletWeightGrains: 62,
  muzzleVelocityFPS: 2900,
};

const mockAddRound = {
  id: 'Add',
  name: '',
  bulletBC: 0.35,
  bulletDiameterInches: 0.223,
  bulletWeightGrains: 62,
  muzzleVelocityFPS: 2900,
};

test('throws when round is null', () => {
  expect(() => {
    render(
      <Round round={null} onClose={() => {}} onDelete={() => {}} onSubmit={() => {}} />,
    );
  }).toThrow();
});

test('throws when round is undefined', () => {
  expect(() => {
    render(
      <Round onClose={() => {}} onDelete={() => {}} onSubmit={() => {}} />,
    );
  }).toThrow();
});

test('shows "Add Round" heading when id is "Add"', () => {
  render(
    <Round
      round={mockAddRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByText('Add Round')).toBeInTheDocument();
});

test('shows "Round - {name}" heading when id is not "Add"', () => {
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByText('Round - 5.56 NATO')).toBeInTheDocument();
});

test('renders the Name form field', () => {
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
});

test('renders the Bullet Diameter form field', () => {
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByPlaceholderText('Bullet Diameter (inches)')).toBeInTheDocument();
});

test('renders the Bullet Weight form field', () => {
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByPlaceholderText('Bullet Weight (grains)')).toBeInTheDocument();
});

test('renders the Muzzle Velocity form field', () => {
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByPlaceholderText('Muzzle Velocity (FPS)')).toBeInTheDocument();
});

test('renders the Bullet Ballistic Coefficient form field', () => {
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByPlaceholderText('Bullet Ballistic Coefficient')).toBeInTheDocument();
});

test('renders the hidden id input with correct value', () => {
  const { container } = render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  const hiddenInput = container.querySelector('input[hidden][name="id"]');
  expect(hiddenInput).toHaveValue('round-1');
});

test('renders Save, Close, and Delete buttons', () => {
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByText(/Save/)).toBeInTheDocument();
  expect(screen.getByText(/Close/)).toBeInTheDocument();
  expect(screen.getByText(/Delete/)).toBeInTheDocument();
});

test('calls onClose when Close button is clicked', async () => {
  const onClose = vi.fn();
  const user = userEvent.setup();
  render(
    <Round
      round={mockRound}
      onClose={onClose}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  await user.click(screen.getByText(/Close/));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('calls onDelete with the round when Delete button is clicked', async () => {
  const onDelete = vi.fn();
  const user = userEvent.setup();
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={onDelete}
      onSubmit={() => {}}
    />,
  );
  await user.click(screen.getByText(/Delete/));
  expect(onDelete).toHaveBeenCalledWith(mockRound);
});

test('calls onSubmit when form is submitted', async () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={onSubmit}
    />,
  );
  await user.click(screen.getByText(/Save/));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({
      id: 'round-1',
      name: '5.56 NATO',
    }),
    expect.anything(),
  );
});

test('renders form fields with default values from round data', () => {
  const { container } = render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(container.querySelector('input[name="name"]')).toHaveValue('5.56 NATO');
  expect(container.querySelector('input[name="bulletDiameterInches"]')).toHaveValue(0.223);
  expect(container.querySelector('input[name="bulletWeightGrains"]')).toHaveValue(62);
  expect(container.querySelector('input[name="muzzleVelocityFPS"]')).toHaveValue(2900);
  expect(container.querySelector('input[name="bulletBC"]')).toHaveValue(0.35);
});

test('renders form fields with empty values when round data is empty', () => {
  const emptyRound = {
    id: 'round-2',
    name: '',
    bulletBC: '',
    bulletDiameterInches: '',
    bulletWeightGrains: '',
    muzzleVelocityFPS: '',
  };
  const { container } = render(
    <Round
      round={emptyRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(container.querySelector('input[name="name"]')).toHaveValue('');
  // Number inputs with empty defaultValue render as null in jsdom
  expect(container.querySelector('input[name="bulletDiameterInches"]')).toHaveValue(null);
  expect(container.querySelector('input[name="bulletWeightGrains"]')).toHaveValue(null);
  expect(container.querySelector('input[name="muzzleVelocityFPS"]')).toHaveValue(null);
  expect(container.querySelector('input[name="bulletBC"]')).toHaveValue(null);
});

test('renders the form element', () => {
  const { container } = render(
    <Round
      round={mockRound}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(container.querySelector('form')).toBeInTheDocument();
});
