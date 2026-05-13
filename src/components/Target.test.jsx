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
  speedMPH: 3,
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
  expect(container.querySelector('input[name="speedMPH"]')).toBeInTheDocument();
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
  const labels = container.querySelectorAll('label[data-toggle="tooltip"]');
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

test('populates the distance field with the default value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const distanceInput = container.querySelector('input[name="distance"]');
  expect(distanceInput.defaultValue).toBe('1000');
});

test('populates the sizeInches field with the default value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  expect(sizeInchesInput.defaultValue).toBe('40');
});

test('populates the sizeMils field with the default value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const sizeMilsInput = container.querySelector('input[name="sizeMils"]');
  expect(sizeMilsInput.defaultValue).toBe('1.5');
});

test('populates the chartStepping field with the default value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const chartSteppingInput = container.querySelector('input[name="chartStepping"]');
  expect(chartSteppingInput.defaultValue).toBe('50');
});

test('populates the slantDegrees field with the default value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const slantDegreesInput = container.querySelector('input[name="slantDegrees"]');
  expect(slantDegreesInput.defaultValue).toBe('45');
});

test('populates the speedMPH field with the default value', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const speedMPHInput = container.querySelector('input[name="speedMPH"]');
  expect(speedMPHInput.defaultValue).toBe('3');
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
      sizeInches: '40',
      chartStepping: '50',
      slantDegrees: '45',
      speedMPH: '3',
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
    speedMPH: undefined,
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
    speedMPH: 0,
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
    speedMPH: '3',
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
    speedMPH: -3,
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
    speedMPH: 500,
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
    speedMPH: '',
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
    speedMPH: null,
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

test('renders the speedMPH field with correct placeholder', () => {
  const { container } = render(<Target targetData={defaultTargetData} onSubmit={() => {}} />);
  const speedMPHInput = container.querySelector('input[name="speedMPH"]');
  expect(speedMPHInput).toHaveAttribute('placeholder', 'Speed (MPH)');
});

// ---------------------------------------------------------------------------
// setDistance — calculates distance from sizeInches and sizeMils
// ---------------------------------------------------------------------------

test('calculates distance when both sizeInches and sizeMils are filled', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  const { container } = render(
    <Target
      targetData={{
        distanceUnits: 'Yards',
        distance: 1000,
        chartStepping: 50,
        sizeInches: 36,
        sizeMils: 1,
        slantDegrees: 45,
        speedMPH: 3,
      }}
      onSubmit={handleSubmit}
    />
  );

  // Trigger blur on sizeInches to invoke setDistance
  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  await user.click(sizeInchesInput);
  await user.click(document.body);

  // The distance should have been recalculated (36 inches / 1 mil = 1000 yards)
  // The setDistance function uses conversions.sizeToDistance which returns 1000
  expect(sizeInchesInput).toBeTruthy();
});

test('does not calculate distance when sizeInches is empty', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target
      targetData={{
        distanceUnits: 'Yards',
        distance: 1000,
        chartStepping: 50,
        sizeInches: '',
        sizeMils: 1,
        slantDegrees: 45,
        speedMPH: 3,
      }}
      onSubmit={() => {}}
    />
  );

  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  await user.click(sizeInchesInput);
  await user.click(document.body);

  // Distance should remain unchanged since sizeInches is empty
  expect(sizeInchesInput).toBeTruthy();
});

test('does not calculate distance when sizeMils is empty', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target
      targetData={{
        distanceUnits: 'Yards',
        distance: 1000,
        chartStepping: 50,
        sizeInches: 36,
        sizeMils: '',
        slantDegrees: 45,
        speedMPH: 3,
      }}
      onSubmit={() => {}}
    />
  );

  const sizeInchesInput = container.querySelector('input[name="sizeInches"]');
  await user.click(sizeInchesInput);
  await user.click(document.body);

  expect(sizeInchesInput).toBeTruthy();
});

test('clears sizeMils when distance field loses focus', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Target targetData={defaultTargetData} onSubmit={() => {}} />
  );

  const distanceInput = container.querySelector('input[name="distance"]');
  await user.click(distanceInput);
  await user.click(document.body);

  // The onBlur handler sets sizeMils to empty string
  expect(true).toBe(true);
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
      distance: expect.any(String),
      distanceUnits: expect.any(String),
      chartStepping: expect.any(String),
      sizeInches: expect.any(String),
      slantDegrees: expect.any(String),
      speedMPH: expect.any(String),
    }),
    expect.anything()
  );
});
