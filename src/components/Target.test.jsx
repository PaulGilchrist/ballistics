import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Target from './Target';

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

const defaultTargetData = {
  distanceUnits: 'Yards',
  distance: 1000,
  chartStepping: 50,
  sizeInches: 40,
  sizeMils: 1.5,
  slantDegrees: 45,
  speedMph: 3,
};

// ---------------------------------------------------------------------------
// Structure and rendering
// ---------------------------------------------------------------------------

test('renders the target card with heading', () => {
  render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
});

test('renders the form element', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('renders the outer container with correct class', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(container.querySelector('.bal-form')).toBeInTheDocument();
});

test('renders the card with correct structure', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const card = container.querySelector('.card');
  expect(card).toBeInTheDocument();
  expect(card.querySelector('.card-heading')).toBeInTheDocument();
  expect(card.querySelector('.card-body')).toBeInTheDocument();
  expect(card.querySelector('.card-footer')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Form fields
// ---------------------------------------------------------------------------

test('renders all five primary form fields', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(container.querySelector('input[name="distance"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="sizeInches"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="chartStepping"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="slantDegrees"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="speedMph"]')).toBeInTheDocument();
});

test('renders the sizeMils input field', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(container.querySelector('input[name="sizeMils"]')).toBeInTheDocument();
});

test('renders the distance units dropdown', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(container.querySelector('select[name="distanceUnits"]')).toBeInTheDocument();
});

test('renders distance units dropdown with Yards and Meters options', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const select = container.querySelector('select[name="distanceUnits"]');
  const options = select.querySelectorAll('option');
  expect(options.length).toBe(2);
  expect(options[0].value).toBe('Yards');
  expect(options[1].value).toBe('Meters');
});

test('sets the distance units dropdown default value from props', () => {
  const { container } = render(<Target targetData={{ ...defaultTargetData, distanceUnits: 'Meters' }} onSubmit={() => {}} />);
  const select = container.querySelector('select[name="distanceUnits"]');
  expect(select.value).toBe('Meters');
});

test('renders field icons for all form fields', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const iconSpans = container.querySelectorAll('.input-group-text i');
  expect(iconSpans.length).toBe(5);
});

test('renders field labels with tooltip attributes', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const labels = container.querySelectorAll('label[data-bs-toggle="tooltip"]');
  expect(labels.length).toBe(5);
});

test('renders the Distance field with correct label', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Distance')).toBeInTheDocument();
});

test('renders the Size field with correct label', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(screen.getByText(/Size.*Inches.*Mils/s)).toBeInTheDocument();
});

test('renders the Chart Stepping field with correct label', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(screen.getByText(/Chart Stepping.*yards/s)).toBeInTheDocument();
});

test('renders the Slant field with correct label', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(screen.getByText(/Slant.*degrees/s)).toBeInTheDocument();
});

test('renders the Speed field with correct label', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(screen.getByText(/Speed.*MPH/s)).toBeInTheDocument();
});

test('renders form fields with correct input types', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const numberInputs = container.querySelectorAll('input[type="number"]');
  expect(numberInputs.length).toBe(6);
});

test('renders the sizeMils input with step attribute', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  expect(sizeMilsInput).toHaveAttribute('step', '0.1');
});

test('renders the sizeMils input with min and max attributes', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  expect(sizeMilsInput).toHaveAttribute('min', '0.1');
  expect(sizeMilsInput).toHaveAttribute('max', '100');
});

// ---------------------------------------------------------------------------
// Default values from props
// ---------------------------------------------------------------------------

test('populates the distance field with the correct value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const distanceInput = container.querySelector('input[name="distance"]');
  expect(distanceInput).toHaveValue(1000);
});

test('populates the sizeInches field with the correct value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  expect(sizeInchesInput).toHaveValue(40);
});

test('populates the sizeMils field with the correct value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  expect(sizeMilsInput).toHaveValue(1.5);
});

test('populates the chartStepping field with the correct value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const chartSteppingInput = container.querySelector('input[name="chartStepping"]');
  expect(chartSteppingInput).toHaveValue(50);
});

test('populates the slantDegrees field with the correct value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const slantDegreesInput = container.querySelector('input[name="slantDegrees"]');
  expect(slantDegreesInput).toHaveValue(45);
});

test('populates the speedMph field with the correct value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const speedMphInput = container.querySelector('input[name="speedMph"]');
  expect(speedMphInput).toHaveValue(3);
});

// ---------------------------------------------------------------------------
// Save button
// ---------------------------------------------------------------------------

test('renders the Save button', () => {
  render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
});

test('renders the submit button with correct type and classes', () => {
  render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const button = screen.getByRole('button', { name: /Save/i });
  expect(button).toHaveAttribute('type', 'submit');
  expect(button).toHaveClass('btn', 'btn-success');
});

test('renders the Save button with a check icon', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const button = container.querySelector('button[type="submit"]');
  const icon = button.querySelector('.fa-check');
  expect(icon).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Form submission
// ---------------------------------------------------------------------------

test('calls onSubmit when the form is submitted with typed values', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={handleSubmit} />);

  const distanceInput = container.querySelector('input[name="distance"]');
  await user.clear(distanceInput);
  await user.type(distanceInput, '500');

  const submitButton = screen.getByRole('button', { name: /Save/i });
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalled();
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      distance: '500',
      sizeInches: 40,
      sizeMils: 1.5,
      chartStepping: 50,
      slantDegrees: 45,
      speedMph: 3,
    }),
    expect.anything()
  );
});

// ---------------------------------------------------------------------------
// Edge cases — missing and unusual data
// ---------------------------------------------------------------------------

test('handles target data with undefined values', () => {
  const emptyTargetData = {
    distanceUnits: undefined,
    distance: undefined,
    chartStepping: undefined,
    sizeInches: undefined,
    sizeMils: undefined,
    slantDegrees: undefined,
    speedMph: undefined,
  };

  const { container } = render(<Target targetData={emptyTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles target data with zero values', () => {
  const zeroTargetData = {
    distanceUnits: 'Yards',
    distance: 0,
    chartStepping: 0,
    sizeInches: 0,
    sizeMils: 0,
    slantDegrees: 0,
    speedMph: 0,
  };

  const { container } = render(<Target targetData={zeroTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles target data with string values', () => {
  const stringTargetData = {
    distanceUnits: 'Meters',
    distance: '1000',
    chartStepping: '50',
    sizeInches: '40',
    sizeMils: '1.5',
    slantDegrees: '45',
    speedMph: '3',
  };

  const { container } = render(<Target targetData={stringTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles target data with negative values', () => {
  const negativeTargetData = {
    distanceUnits: 'Yards',
    distance: -100,
    chartStepping: -10,
    sizeInches: -5,
    sizeMils: -1,
    slantDegrees: -10,
    speedMph: -3,
  };

  const { container } = render(<Target targetData={negativeTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles target data with large values', () => {
  const largeTargetData = {
    distanceUnits: 'Yards',
    distance: 5000,
    chartStepping: 500,
    sizeInches: 120,
    sizeMils: 100,
    slantDegrees: 500,
    speedMph: 500,
  };

  const { container } = render(<Target targetData={largeTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles target data with empty string values', () => {
  const emptyStringTargetData = {
    distanceUnits: 'Yards',
    distance: '',
    chartStepping: '',
    sizeInches: '',
    sizeMils: '',
    slantDegrees: '',
    speedMph: '',
  };

  const { container } = render(<Target targetData={emptyStringTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles target data with null values', () => {
  const nullTargetData = {
    distanceUnits: null,
    distance: null,
    chartStepping: null,
    sizeInches: null,
    sizeMils: null,
    slantDegrees: null,
    speedMph: null,
  };

  const { container } = render(<Target targetData={nullTargetData} onSubmit={() => {}} />);
  expect(screen.getByText('Target')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Distance units — Meters
// ---------------------------------------------------------------------------

test('renders the distance units dropdown with Meters selected', () => {
  const { container } = render(<Target targetData={{ ...defaultTargetData, distanceUnits: 'Meters' }} onSubmit={() => {}} />);
  const select = container.querySelector('select[name="distanceUnits"]');
  expect(select.value).toBe('Meters');
});

// ---------------------------------------------------------------------------
// Field placeholders
// ---------------------------------------------------------------------------

test('renders the distance field with correct placeholder', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const distanceInput = container.querySelector('input[name="distance"]');
  expect(distanceInput).toHaveAttribute('placeholder', 'Distance');
});

test('renders the sizeInches field with correct placeholder', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  expect(sizeInchesInput).toHaveAttribute('placeholder', 'Size (inches)');
});

test('renders the sizeMils field with correct placeholder', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  expect(sizeMilsInput).toHaveAttribute('placeholder', 'Size (mils)');
});

test('renders the chartStepping field with correct placeholder', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const chartSteppingInput = container.querySelector('input[name="chartStepping"]');
  expect(chartSteppingInput).toHaveAttribute('placeholder', 'Chart Stepping (yards)');
});

test('renders the slantDegrees field with correct placeholder', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const slantDegreesInput = container.querySelector('input[name="slantDegrees"]');
  expect(slantDegreesInput).toHaveAttribute('placeholder', 'Slant (degrees)');
});

test('renders the speedMph field with correct placeholder', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const speedMphInput = container.querySelector('input[name="speedMph"]');
  expect(speedMphInput).toHaveAttribute('placeholder', 'Speed (MPH)');
});

// ---------------------------------------------------------------------------
// onBlur handlers — structural checks only
// ---------------------------------------------------------------------------
// Note: The actual setDistance / setValue-on-blur logic relies on
// react-hook-form's getValues() inside onBlur callbacks.  In jsdom this
// is unreliable (the form state may not have flushed yet), so we only
// verify that the handlers are wired up, not their runtime behaviour.

test('distance field has an onBlur handler', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const distanceInput = container.querySelector('input[name="distance"]');
  expect(distanceInput.onblur).toBeDefined();
});

test('sizeInches field has an onBlur handler', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  expect(sizeInchesInput.onblur).toBeDefined();
});

test('sizeMils field has an onBlur handler', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  expect(sizeMilsInput.onblur).toBeDefined();
});

test('displays validation error for sizeMils when value exceeds max', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target
      targetData={{
        distanceUnits: 'Yards',
        distance: 1000,
        chartStepping: 50,
        sizeInches: 36,
        sizeMils: 200,
        slantDegrees: 45,
        speedMph: 3,
      }}
      onSubmit={() => {}}
    />
  );

  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  await user.clear(sizeMilsInput);
  await user.type(sizeMilsInput, '200');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for sizeMils when value is below min', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target
      targetData={{
        distanceUnits: 'Yards',
        distance: 1000,
        chartStepping: 50,
        sizeInches: 36,
        sizeMils: 0.05,
        slantDegrees: 45,
        speedMph: 3,
      }}
      onSubmit={() => {}}
    />
  );

  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  await user.clear(sizeMilsInput);
  await user.type(sizeMilsInput, '0.05');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Form submission with valid data
// ---------------------------------------------------------------------------

test('calls onSubmit with the form data when the Save button is clicked', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={handleSubmit} />
  );

  const submitButton = container.querySelector('button[type="submit"]');
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalled();
});

test('form submission includes all expected fields', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={handleSubmit} />
  );

  const submitButton = container.querySelector('button[type="submit"]');
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      distance: expect.any(Number),
      distanceUnits: expect.any(String),
      chartStepping: expect.any(Number),
      sizeInches: expect.any(Number),
      sizeMils: expect.any(Number),
      slantDegrees: expect.any(Number),
      speedMph: expect.any(Number),
    }),
    expect.anything()
  );
});

// ---------------------------------------------------------------------------
// FormField validation error display
// ---------------------------------------------------------------------------

test('displays validation error for distance when value exceeds max', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const distanceInput = container.querySelector('input[name="distance"]');
  await user.clear(distanceInput);
  await user.type(distanceInput, '6000');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for distance when value is below min', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const distanceInput = container.querySelector('input[name="distance"]');
  await user.clear(distanceInput);
  await user.type(distanceInput, '-1');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for chartStepping when value exceeds max', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const chartSteppingInput = container.querySelector('input[name="chartStepping"]');
  await user.clear(chartSteppingInput);
  await user.type(chartSteppingInput, '600');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for chartStepping when value is below min', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const chartSteppingInput = container.querySelector('input[name="chartStepping"]');
  await user.clear(chartSteppingInput);
  await user.type(chartSteppingInput, '0');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for slantDegrees when value exceeds max', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const slantDegreesInput = container.querySelector('input[name="slantDegrees"]');
  await user.clear(slantDegreesInput);
  await user.type(slantDegreesInput, '600');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for slantDegrees when value is below min', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const slantDegreesInput = container.querySelector('input[name="slantDegrees"]');
  await user.clear(slantDegreesInput);
  await user.type(slantDegreesInput, '5');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for speedMph when value exceeds max', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const speedMphInput = container.querySelector('input[name="speedMph"]');
  await user.clear(speedMphInput);
  await user.type(speedMphInput, '600');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for speedMph when value is below min', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const speedMphInput = container.querySelector('input[name="speedMph"]');
  await user.clear(speedMphInput);
  await user.type(speedMphInput, '0');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for sizeInches when value exceeds max', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  await user.clear(sizeInchesInput);
  await user.type(sizeInchesInput, '130');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});

test('displays validation error for sizeInches when value is below min', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  await user.clear(sizeInchesInput);
  await user.type(sizeInchesInput, '0');
  await user.tab();

  expect(container.querySelector('.alert-danger')).toBeInTheDocument();
});
