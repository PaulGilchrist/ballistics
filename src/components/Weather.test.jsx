import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Weather from './Weather';

const defaultWeatherData = {
  altitudeFeet: 5000,
  temperatureDegreesFahrenheit: 72,
  barometricPressureInchesHg: 29.92,
  relativeHumidityPercent: 65,
  windVelocityMph: 10,
  windAngleDegrees: 90,
};

test('renders the weather card with heading', () => {
  render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  expect(screen.getByText('Weather')).toBeInTheDocument();
});

test('renders the form element', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('renders all six weather form fields', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  expect(container.querySelector('input[name="altitudeFeet"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="temperatureDegreesFahrenheit"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="barometricPressureInchesHg"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="relativeHumidityPercent"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="windVelocityMph"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="windAngleDegrees"]')).toBeInTheDocument();
});

test('renders the Save button', () => {
  render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
});

test('renders field icons', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  const iconSpans = container.querySelectorAll('.input-group-text i');
  expect(iconSpans.length).toBe(6);
});

test('renders field labels with tooltip attributes', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  const labels = container.querySelectorAll('label[data-toggle="tooltip"]');
  expect(labels.length).toBe(6);
});

test('renders the submit button with correct type and classes', () => {
  render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  const button = screen.getByRole('button', { name: /Save/i });
  expect(button).toHaveAttribute('type', 'submit');
  expect(button).toHaveClass('btn', 'btn-success');
});

test('renders the card with correct structure', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  const card = container.querySelector('.card.weather');
  expect(card).toBeInTheDocument();
  expect(card.querySelector('.card-heading')).toBeInTheDocument();
  expect(card.querySelector('.card-body')).toBeInTheDocument();
  expect(card.querySelector('.card-footer')).toBeInTheDocument();
});

test('calls onSubmit when the form is submitted with typed values', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={handleSubmit} />);

  const altitudeInput = container.querySelector('input[name="altitudeFeet"]');
  await user.clear(altitudeInput);
  await user.type(altitudeInput, '1000');

  const submitButton = screen.getByRole('button', { name: /Save/i });
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalled();
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      altitudeFeet: '1000',
      temperatureDegreesFahrenheit: '72',
      barometricPressureInchesHg: '29.92',
      relativeHumidityPercent: '65',
      windVelocityMph: '10',
      windAngleDegrees: '90',
    }),
    expect.anything()
  );
});

test('handles weather data with undefined values', () => {
  const emptyWeatherData = {
    altitudeFeet: undefined,
    temperatureDegreesFahrenheit: undefined,
    barometricPressureInchesHg: undefined,
    relativeHumidityPercent: undefined,
    windVelocityMph: undefined,
    windAngleDegrees: undefined,
  };

  const { container } = render(<Weather weatherData={emptyWeatherData} onSubmit={() => {}} />);
  expect(screen.getByText('Weather')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles weather data with zero values', () => {
  const zeroWeatherData = {
    altitudeFeet: 0,
    temperatureDegreesFahrenheit: 0,
    barometricPressureInchesHg: 0,
    relativeHumidityPercent: 0,
    windVelocityMph: 0,
    windAngleDegrees: 0,
  };

  const { container } = render(<Weather weatherData={zeroWeatherData} onSubmit={() => {}} />);
  expect(screen.getByText('Weather')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles weather data with string values', () => {
  const stringWeatherData = {
    altitudeFeet: '5000',
    temperatureDegreesFahrenheit: '72',
    barometricPressureInchesHg: '29.92',
    relativeHumidityPercent: '65',
    windVelocityMph: '10',
    windAngleDegrees: '90',
  };

  const { container } = render(<Weather weatherData={stringWeatherData} onSubmit={() => {}} />);
  expect(screen.getByText('Weather')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles weather data with negative values', () => {
  const negativeWeatherData = {
    altitudeFeet: -100,
    temperatureDegreesFahrenheit: -10,
    barometricPressureInchesHg: -5,
    relativeHumidityPercent: -10,
    windVelocityMph: -5,
    windAngleDegrees: -10,
  };

  const { container } = render(<Weather weatherData={negativeWeatherData} onSubmit={() => {}} />);
  expect(screen.getByText('Weather')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('handles weather data with large values', () => {
  const largeWeatherData = {
    altitudeFeet: 50000,
    temperatureDegreesFahrenheit: 200,
    barometricPressureInchesHg: 100,
    relativeHumidityPercent: 100,
    windVelocityMph: 200,
    windAngleDegrees: 90,
  };

  const { container } = render(<Weather weatherData={largeWeatherData} onSubmit={() => {}} />);
  expect(screen.getByText('Weather')).toBeInTheDocument();
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('renders the outer container with correct class', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  const balForm = container.querySelector('.bal-form');
  expect(balForm).toBeInTheDocument();
});

test('renders form fields with correct input types', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  const inputs = container.querySelectorAll('input[type="number"]');
  expect(inputs.length).toBe(6);
});

test('renders the barometric pressure field with step attribute', () => {
  const { container } = render(<Weather weatherData={defaultWeatherData} onSubmit={() => {}} />);
  const pressureInput = container.querySelector('input[name="barometricPressureInchesHg"]');
  expect(pressureInput).toHaveAttribute('step', '0.01');
});
