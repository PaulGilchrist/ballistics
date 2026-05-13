import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Firearm from './Firearm';

const mockFirearm = {
  id: 'firearm-1',
  name: 'Glock 19',
  sightHeightInches: 1.75,
  zeroRange: 100,
  zeroRangeUnits: 'Yards',
  reticleUnits: 'Mil',
  turretUnits: 'Mil',
  elevationTurretGradients: '10',
  windageTurretGradients: '10',
};

const mockAddFirearm = {
  id: 'Add',
  name: '',
  sightHeightInches: 2.0,
  zeroRange: 100,
  zeroRangeUnits: 'Yards',
  reticleUnits: 'Mil',
  turretUnits: 'Mil',
  elevationTurretGradients: '10',
  windageTurretGradients: '10',
};

test('renders the firearm card with heading', () => {
  render(<Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Firearm - Glock 19')).toBeInTheDocument();
});

test('renders the form element', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('renders the outer container with correct class', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const balForm = container.querySelector('.bal-form');
  expect(balForm).toBeInTheDocument();
});

test('renders the card with correct structure', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const card = container.querySelector('.card');
  expect(card).toBeInTheDocument();
  expect(card.querySelector('.card-heading')).toBeInTheDocument();
  expect(card.querySelector('.card-body')).toBeInTheDocument();
  expect(card.querySelector('.card-footer')).toBeInTheDocument();
});

test('shows "Add Firearm" heading when id is "Add"', () => {
  render(
    <Firearm
      firearm={mockAddFirearm}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByText('Add Firearm')).toBeInTheDocument();
});

test('shows "Firearm - {name}" heading when id is not "Add"', () => {
  render(
    <Firearm
      firearm={mockFirearm}
      onClose={() => {}}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  expect(screen.getByText('Firearm - Glock 19')).toBeInTheDocument();
});

test('renders the Name form field', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
});

test('renders the Sight Height form field', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByPlaceholderText('Sight Height (inches)')).toBeInTheDocument();
});

test('renders the Zero Range form field', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByPlaceholderText('Zero Range')).toBeInTheDocument();
});

test('renders the Reticle Units field', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByText('Reticle Units')).toBeInTheDocument();
});

test('renders the Elevation Turret field', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByText('Elevation Turret (clicks per unit)')).toBeInTheDocument();
});

test('renders the Windage Turret field', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByText('Windage Turret (clicks per unit)')).toBeInTheDocument();
});

test('renders the hidden id input with correct value', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const hiddenInput = container.querySelector('input[hidden][name="id"]');
  expect(hiddenInput).toHaveValue('firearm-1');
});

test('renders form fields with default values from firearm data', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(container.querySelector('input[name="name"]')).toHaveValue('Glock 19');
  expect(container.querySelector('input[name="sightHeightInches"]')).toHaveValue('1.75');
  expect(container.querySelector('input[name="zeroRange"]')).toHaveValue('100');
});

test('renders the zero range units select dropdown', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="zeroRangeUnits"]');
  expect(select).toBeInTheDocument();
});

test('renders the turret units select dropdowns for elevation and windage', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const turretSelects = container.querySelectorAll('select[name="turretUnits"]');
  expect(turretSelects.length).toBe(2);
});

test('renders the reticle units select dropdown', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="reticleUnits"]');
  expect(select).toBeInTheDocument();
});

test('renders the elevation turret gradients select dropdown', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="elevationTurretGradients"]');
  expect(select).toBeInTheDocument();
});

test('renders the windage turret gradients select dropdown', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="windageTurretGradients"]');
  expect(select).toBeInTheDocument();
});

test('renders Save, Close, and Delete buttons', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByText(/Save/)).toBeInTheDocument();
  expect(screen.getByText(/Close/)).toBeInTheDocument();
  expect(screen.getByText(/Delete/)).toBeInTheDocument();
});

test('renders the submit button with correct type and classes', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const button = screen.getByRole('button', { name: /Save/i });
  expect(button).toHaveAttribute('type', 'submit');
  expect(button).toHaveClass('btn', 'btn-success');
});

test('renders the Close button with correct classes', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const button = screen.getByText(/Close/);
  expect(button).toHaveClass('btn', 'btn-warning');
});

test('renders the Delete button with correct classes', () => {
  render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const button = screen.getByText(/Delete/);
  expect(button).toHaveClass('btn', 'btn-danger');
});

test('calls onClose when Close button is clicked', async () => {
  const onClose = vi.fn();
  const user = userEvent.setup();
  render(
    <Firearm
      firearm={mockFirearm}
      onClose={onClose}
      onDelete={() => {}}
      onSubmit={() => {}}
    />,
  );
  await user.click(screen.getByText(/Close/));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('calls onDelete with the firearm when Delete button is clicked', async () => {
  const onDelete = vi.fn();
  const user = userEvent.setup();
  render(
    <Firearm
      firearm={mockFirearm}
      onClose={() => {}}
      onDelete={onDelete}
      onSubmit={() => {}}
    />,
  );
  await user.click(screen.getByText(/Delete/));
  expect(onDelete).toHaveBeenCalledWith(mockFirearm);
});

test('calls onSubmit when form is submitted', async () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  render(
    <Firearm
      firearm={mockFirearm}
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
      id: 'firearm-1',
      name: 'Glock 19',
    }),
    expect.anything(),
  );
});

test('returns null when firearm is null', () => {
  const { container } = render(
    <Firearm firearm={null} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(container.innerHTML).toBe('');
});

test('returns null when firearm is undefined', () => {
  const { container } = render(
    <Firearm onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(container.innerHTML).toBe('');
});

test('renders field icons for text input fields', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const iconSpans = container.querySelectorAll('.input-group-text i');
  expect(iconSpans.length).toBe(6);
});

test('renders field labels with tooltip attributes', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const labels = container.querySelectorAll('label[data-toggle="tooltip"]');
  expect(labels.length).toBe(6);
});

test('renders the zero range units dropdown with correct options', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="zeroRangeUnits"]');
  const options = select.querySelectorAll('option');
  expect(options.length).toBe(2);
  expect(options[0].textContent).toBe('Yards');
  expect(options[1].textContent).toBe('Meters');
});

test('renders the turret units dropdown with correct options', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="turretUnits"]');
  const options = select.querySelectorAll('option');
  expect(options.length).toBe(3);
  expect(options[0].textContent).toBe('Mil');
  expect(options[1].textContent).toBe('MoA');
  expect(options[2].textContent).toBe('IPHY');
});

test('renders the reticle units dropdown with correct options', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="reticleUnits"]');
  const options = select.querySelectorAll('option');
  expect(options.length).toBe(3);
  expect(options[0].textContent).toBe('Mil');
  expect(options[1].textContent).toBe('MoA');
  expect(options[2].textContent).toBe('IPHY');
});

test('renders the turret gradients dropdown with correct options', () => {
  const { container } = render(
    <Firearm firearm={mockFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  const select = container.querySelector('select[name="elevationTurretGradients"]');
  const options = select.querySelectorAll('option');
  expect(options.length).toBe(5);
  expect(options[0].textContent).toBe('1');
  expect(options[1].textContent).toBe('2');
  expect(options[2].textContent).toBe('4');
  expect(options[3].textContent).toBe('5');
  expect(options[4].textContent).toBe('10');
});

test('handles firearm data with empty string values', () => {
  const emptyFirearm = {
    id: 'firearm-2',
    name: '',
    sightHeightInches: '',
    zeroRange: '',
    zeroRangeUnits: '',
    reticleUnits: '',
    turretUnits: '',
    elevationTurretGradients: '',
    windageTurretGradients: '',
  };
  const { container } = render(
    <Firearm firearm={emptyFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(container.querySelector('.card-heading').textContent).toContain('Firearm - ');
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles firearm data with different unit selections', () => {
  const differentUnitsFirearm = {
    id: 'firearm-3',
    name: 'Remington 700',
    sightHeightInches: 2.5,
    zeroRange: 200,
    zeroRangeUnits: 'Meters',
    reticleUnits: 'MoA',
    turretUnits: 'MoA',
    elevationTurretGradients: '4',
    windageTurretGradients: '4',
  };
  const { container } = render(
    <Firearm firearm={differentUnitsFirearm} onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />,
  );
  expect(screen.getByText('Firearm - Remington 700')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
  expect(container.querySelector('select[name="zeroRangeUnits"]')).toBeInTheDocument();
  expect(container.querySelector('select[name="reticleUnits"]')).toBeInTheDocument();
  expect(container.querySelector('select[name="elevationTurretGradients"]')).toBeInTheDocument();
  expect(container.querySelector('select[name="windageTurretGradients"]')).toBeInTheDocument();
});
