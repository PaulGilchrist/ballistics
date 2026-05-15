import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormField from './FormField';

const mockRegister = vi.fn((name, options) => {
  if (!options) return {};
  const result = {};
  if (options.defaultValue !== undefined) {
    result.defaultValue = options.defaultValue;
  }
  return result;
});

test('renders the form-group container', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  expect(container.querySelector('.form-group')).toBeInTheDocument();
});

test('renders the label with correct text', () => {
  render(
    <FormField name="test" label="Test Label" register={mockRegister} />,
  );
  expect(screen.getByText('Test Label')).toBeInTheDocument();
});

test('renders the label with correct htmlFor attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  const label = container.querySelector('label');
  expect(label).toHaveAttribute('for', 'test');
});

test('renders the label with tooltip attributes', () => {
  const { container } = render(
    <FormField name="test" label="Test" tooltip="Help text" register={mockRegister} />,
  );
  const label = container.querySelector('label');
  expect(label).toHaveAttribute('data-toggle', 'tooltip');
  expect(label).toHaveAttribute('title', 'Help text');
});

test('renders the input-group container', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  expect(container.querySelector('.input-group.margin-bottom-sm')).toBeInTheDocument();
});

test('renders a text input by default', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'text');
});

test('renders an input with the specified type', () => {
  const { container } = render(
    <FormField name="test" label="Test" type="number" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('type', 'number');
});

test('renders the input with the correct name attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('name', 'test');
});

test('renders the input with the correct id attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('id', 'test');
});

test('renders the input with the correct placeholder', () => {
  render(
    <FormField name="test" label="Test" placeholder="Enter value" register={mockRegister} />,
  );
  expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
});

test('renders the input with the correct defaultValue', () => {
  const { container } = render(
    <FormField name="test" label="Test" defaultValue="42" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveValue('42');
});

test('renders the input with the required attribute when required is true', () => {
  const { container } = render(
    <FormField name="test" label="Test" required register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('required');
});

test('hides the required attribute when required is false', () => {
  const { container } = render(
    <FormField name="test" label="Test" required={false} register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).not.toHaveAttribute('required');
});

test('renders the input with the step attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" type="number" step="0.5" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('step', '0.5');
});

test('renders the input with the min attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" type="number" min="0" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('min', '0');
});

test('renders the input with the max attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" type="number" max="100" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveAttribute('max', '100');
});

test('calls onBlur when the input loses focus', async () => {
  const onBlur = vi.fn();
  const user = userEvent.setup();
  const { container } = render(
    <FormField name="test" label="Test" onBlur={onBlur} register={mockRegister} />,
  );
  const input = container.querySelector('input');
  await user.click(input);
  await user.tab();
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test('renders a select when type is select', () => {
  const { container } = render(
    <FormField name="test" label="Test" type="select" register={mockRegister} />,
  );
  expect(container.querySelector('select')).toBeInTheDocument();
});

test('renders a select when options are provided', () => {
  const { container } = render(
    <FormField name="test" label="Test" options={['A', 'B', 'C']} register={mockRegister} />,
  );
  expect(container.querySelector('select')).toBeInTheDocument();
});

test('renders options within the select', () => {
  const { container } = render(
    <FormField name="test" label="Test" options={['A', 'B', 'C']} register={mockRegister} />,
  );
  const select = container.querySelector('select');
  const options = select.querySelectorAll('option');
  expect(options.length).toBe(3);
  expect(options[0].textContent).toBe('A');
  expect(options[1].textContent).toBe('B');
  expect(options[2].textContent).toBe('C');
});

test('renders the select with the correct name attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" options={['A', 'B']} register={mockRegister} />,
  );
  const select = container.querySelector('select');
  expect(select).toHaveAttribute('name', 'test');
});

test('renders the select with the correct id attribute', () => {
  const { container } = render(
    <FormField name="test" label="Test" options={['A', 'B']} register={mockRegister} />,
  );
  const select = container.querySelector('select');
  expect(select).toHaveAttribute('id', 'test');
});

test('renders the select with the correct defaultValue', () => {
  const { container } = render(
    <FormField name="test" label="Test" options={['A', 'B', 'C']} defaultValue="B" register={mockRegister} />,
  );
  const select = container.querySelector('select');
  expect(select).toHaveValue('B');
});

test('renders the select with form-control class', () => {
  const { container } = render(
    <FormField name="test" label="Test" options={['A', 'B']} register={mockRegister} />,
  );
  const select = container.querySelector('select');
  expect(select).toHaveClass('form-control');
});

test('renders the input with form-control class', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  const input = container.querySelector('input');
  expect(input).toHaveClass('form-control');
});

test('renders the icon when provided', () => {
  const { container } = render(
    <FormField name="test" label="Test" icon="fa fa-star" register={mockRegister} />,
  );
  expect(container.querySelector('.input-group-text')).toBeInTheDocument();
  expect(container.querySelector('.input-group-text i')).toHaveClass('fa', 'fa-star');
});

test('hides the icon when icon is not provided', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  expect(container.querySelector('.input-group-text')).toBeNull();
});

test('renders the rightElement when provided', () => {
  const { container } = render(
    <FormField
      name="test"
      label="Test"
      rightElement={<span className="right-el">%</span>}
      register={mockRegister}
    />,
  );
  expect(container.querySelector('.right-el')).toBeInTheDocument();
  expect(screen.getByText('%')).toBeInTheDocument();
});

test('hides the rightElement when not provided', () => {
  const { container } = render(
    <FormField name="test" label="Test" register={mockRegister} />,
  );
  expect(container.querySelector('.right-el')).toBeNull();
});

test('shows the error message when errors contains a message for the field', () => {
  const { container } = render(
    <FormField
      name="test"
      label="Test"
      errors={{ test: { message: 'Field is required' } }}
      register={mockRegister}
    />,
  );
  expect(container.querySelector('.alert.alert-danger')).toBeInTheDocument();
  expect(screen.getByText('Field is required')).toBeInTheDocument();
});

test('hides the error message when errors is null', () => {
  const { container } = render(
    <FormField name="test" label="Test" errors={null} register={mockRegister} />,
  );
  expect(container.querySelector('.alert.alert-danger')).toBeNull();
});

test('hides the error message when errors does not contain the field name', () => {
  const { container } = render(
    <FormField
      name="test"
      label="Test"
      errors={{ other: { message: 'Other error' } }}
      register={mockRegister}
    />,
  );
  expect(container.querySelector('.alert.alert-danger')).toBeNull();
});

test('hides the error message when errors[name] exists but has no message', () => {
  const { container } = render(
    <FormField
      name="test"
      label="Test"
      errors={{ test: {} }}
      register={mockRegister}
    />,
  );
  expect(container.querySelector('.alert.alert-danger')).toBeNull();
});

test('hides the error message when errors[name].message is an empty string', () => {
  const { container } = render(
    <FormField
      name="test"
      label="Test"
      errors={{ test: { message: '' } }}
      register={mockRegister}
    />,
  );
  expect(container.querySelector('.alert.alert-danger')).toBeNull();
});

test('calls register with the field name and rules for text input', () => {
  const rules = { required: true, minLength: 3 };
  mockRegister.mockClear();
  render(
    <FormField name="test" label="Test" rules={rules} register={mockRegister} />,
  );
  expect(mockRegister).toHaveBeenCalledWith('test', expect.objectContaining({ required: true, minLength: 3 }));
});

test('calls register with the field name and rules for select input', () => {
  const rules = { required: true };
  mockRegister.mockClear();
  render(
    <FormField name="test" label="Test" options={['A', 'B']} rules={rules} register={mockRegister} />,
  );
  expect(mockRegister).toHaveBeenCalledWith('test', expect.objectContaining({ required: true }));
});

test('passes defaultValue to register for text input', () => {
  mockRegister.mockClear();
  render(
    <FormField name="test" label="Test" defaultValue="42" register={mockRegister} />,
  );
  expect(mockRegister).toHaveBeenCalledWith('test', expect.objectContaining({ defaultValue: '42' }));
});

test('passes defaultValue to register for select input', () => {
  mockRegister.mockClear();
  render(
    <FormField name="test" label="Test" options={['A', 'B']} defaultValue="B" register={mockRegister} />,
  );
  expect(mockRegister).toHaveBeenCalledWith('test', expect.objectContaining({ defaultValue: 'B' }));
});

test('converts numeric defaultValue to string for number inputs', () => {
  mockRegister.mockClear();
  render(
    <FormField name="test" label="Test" type="number" defaultValue={1000} register={mockRegister} />,
  );
  expect(mockRegister).toHaveBeenCalledWith('test', expect.objectContaining({ defaultValue: '1000' }));
});

test('renders with minimal props (only name and register)', () => {
  const { container } = render(
    <FormField name="test" register={mockRegister} />,
  );
  expect(container.querySelector('.form-group')).toBeInTheDocument();
  expect(container.querySelector('input')).toBeInTheDocument();
});

test('handles empty options array', () => {
  const { container } = render(
    <FormField name="test" label="Test" options={[]} register={mockRegister} />,
  );
  const select = container.querySelector('select');
  expect(select).toBeInTheDocument();
  expect(select.querySelectorAll('option').length).toBe(0);
});

test('renders select when both type is select and options are provided', () => {
  const { container } = render(
    <FormField name="test" label="Test" type="select" options={['X', 'Y']} register={mockRegister} />,
  );
  const select = container.querySelector('select');
  expect(select).toBeInTheDocument();
  expect(select.querySelectorAll('option').length).toBe(2);
});
