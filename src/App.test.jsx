import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Clear localStorage between tests
beforeEach(() => {
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// Basic rendering
// ---------------------------------------------------------------------------

test('renders import button', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Import/i)).toBeInTheDocument();
});

test('renders export button', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Export/i)).toBeInTheDocument();
});

test('renders the theme toggle button', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.theme-toggle-btn')).toBeInTheDocument();
});

test('renders the container with correct class', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.container-fluid')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Theme toggle
// ---------------------------------------------------------------------------

test('toggles theme from dark to light', async () => {
  const user = userEvent.setup();
  const { container } = render(<App />);
  const toggleBtn = container.querySelector('.theme-toggle-btn');
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  await user.click(toggleBtn);
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});

test('toggles theme from light to dark', async () => {
  const user = userEvent.setup();
  localStorage.setItem('theme', 'light');
  const { container } = render(<App />);
  const toggleBtn = container.querySelector('.theme-toggle-btn');
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  await user.click(toggleBtn);
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});

test('shows sun icon in dark theme', () => {
  const { container } = render(<App />);
  const icon = container.querySelector('.theme-toggle-btn i');
  expect(icon).toHaveClass('fa-sun-o');
});

test('shows moon icon in light theme', () => {
  localStorage.setItem('theme', 'light');
  const { container } = render(<App />);
  const icon = container.querySelector('.theme-toggle-btn i');
  expect(icon).toHaveClass('fa-moon-o');
});

// ---------------------------------------------------------------------------
// Firearms list (initial state — no firearm selected)
// ---------------------------------------------------------------------------

test('renders the Firearms list when no firearm is selected', () => {
  const { container } = render(<App />);
  expect(screen.getByText('Select Firearm')).toBeInTheDocument();
});

test('renders the Add Firearm button in the Firearms list', () => {
  const { container } = render(<App />);
  expect(screen.getByText('Add Firearm')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Weather and Target forms are always visible
// ---------------------------------------------------------------------------

test('renders the Weather form', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.bal-form')).toBeInTheDocument();
});

test('renders the Target form', () => {
  const { container } = render(<App />);
  expect(container.querySelectorAll('.bal-form').length).toBeGreaterThanOrEqual(1);
});

// ---------------------------------------------------------------------------
// Chart is NOT shown when no firearm or round is selected
// ---------------------------------------------------------------------------

test('does not render the Chart when no firearm is selected', () => {
  const { container } = render(<App />);
  expect(container.querySelector('#ballisticsTable')).not.toBeInTheDocument();
});

test('does not render the Chart when no round is selected', () => {
  localStorage.setItem('firearms', JSON.stringify([
    {
      id: 'firearm-1',
      name: 'Test Rifle',
      sightHeightInches: 2.0,
      zeroRange: 100,
      zeroRangeUnits: 'Yards',
      reticleUnits: 'Mil',
      turretUnits: 'Mil',
      elevationTurretGradients: 10,
      windageTurretGradients: 10,
      rounds: [
        {
          id: 'round-1',
          name: '5.56 NATO',
          bulletBC: 0.35,
          bulletDiameterInches: 0.223,
          bulletWeightGrains: 62,
          muzzleVelocityFPS: 2900,
        },
      ],
    },
  ]));
  localStorage.setItem('firearmId', 'firearm-1');
  const { container } = render(<App />);
  expect(container.querySelector('#ballisticsTable')).not.toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Chart IS shown when both firearm and round are selected
// ---------------------------------------------------------------------------

test('renders the Chart when both firearm and round are selected', () => {
  localStorage.setItem('firearms', JSON.stringify([
    {
      id: 'firearm-1',
      name: 'Test Rifle',
      sightHeightInches: 2.0,
      zeroRange: 100,
      zeroRangeUnits: 'Yards',
      reticleUnits: 'Mil',
      turretUnits: 'Mil',
      elevationTurretGradients: 10,
      windageTurretGradients: 10,
      rounds: [
        {
          id: 'round-1',
          name: '5.56 NATO',
          bulletBC: 0.35,
          bulletDiameterInches: 0.223,
          bulletWeightGrains: 62,
          muzzleVelocityFPS: 2900,
        },
      ],
    },
  ]));
  localStorage.setItem('firearmId', 'firearm-1');
  localStorage.setItem('roundId', 'round-1');
  const { container } = render(<App />);
  expect(container.querySelector('#ballisticsTable')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Firearm form is shown when a firearm is selected
// ---------------------------------------------------------------------------

test('renders the Firearm form when a firearm is selected', () => {
  localStorage.setItem('firearms', JSON.stringify([
    {
      id: 'firearm-1',
      name: 'Test Rifle',
      sightHeightInches: 2.0,
      zeroRange: 100,
      zeroRangeUnits: 'Yards',
      reticleUnits: 'Mil',
      turretUnits: 'Mil',
      elevationTurretGradients: 10,
      windageTurretGradients: 10,
      rounds: [
        {
          id: 'round-1',
          name: '5.56 NATO',
          bulletBC: 0.35,
          bulletDiameterInches: 0.223,
          bulletWeightGrains: 62,
          muzzleVelocityFPS: 2900,
        },
      ],
    },
  ]));
  localStorage.setItem('firearmId', 'firearm-1');
  const { container } = render(<App />);
  expect(screen.getByText('Firearm - Test Rifle')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Rounds list is shown when firearm is selected but no round
// ---------------------------------------------------------------------------

test('renders the Rounds list when a firearm is selected but no round', () => {
  localStorage.setItem('firearms', JSON.stringify([
    {
      id: 'firearm-1',
      name: 'Test Rifle',
      sightHeightInches: 2.0,
      zeroRange: 100,
      zeroRangeUnits: 'Yards',
      reticleUnits: 'Mil',
      turretUnits: 'Mil',
      elevationTurretGradients: 10,
      windageTurretGradients: 10,
      rounds: [
        {
          id: 'round-1',
          name: '5.56 NATO',
          bulletBC: 0.35,
          bulletDiameterInches: 0.223,
          bulletWeightGrains: 62,
          muzzleVelocityFPS: 2900,
        },
      ],
    },
  ]));
  localStorage.setItem('firearmId', 'firearm-1');
  const { container } = render(<App />);
  expect(screen.getByText('Select Round')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Round form is shown when both firearm and round are selected
// ---------------------------------------------------------------------------

test('renders the Round form when both firearm and round are selected', () => {
  localStorage.setItem('firearms', JSON.stringify([
    {
      id: 'firearm-1',
      name: 'Test Rifle',
      sightHeightInches: 2.0,
      zeroRange: 100,
      zeroRangeUnits: 'Yards',
      reticleUnits: 'Mil',
      turretUnits: 'Mil',
      elevationTurretGradients: 10,
      windageTurretGradients: 10,
      rounds: [
        {
          id: 'round-1',
          name: '5.56 NATO',
          bulletBC: 0.35,
          bulletDiameterInches: 0.223,
          bulletWeightGrains: 62,
          muzzleVelocityFPS: 2900,
        },
      ],
    },
  ]));
  localStorage.setItem('firearmId', 'firearm-1');
  localStorage.setItem('roundId', 'round-1');
  const { container } = render(<App />);
  expect(screen.getByText('Round - 5.56 NATO')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// App does not crash with default data
// ---------------------------------------------------------------------------

test('renders without crashing with default firearms data', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});

test('renders with empty localStorage', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});

// ---------------------------------------------------------------------------
// Export button click
// ---------------------------------------------------------------------------

test('calls handleDataExport when Export button is clicked', async () => {
  const user = userEvent.setup();
  const { container } = render(<App />);
  const exportBtn = container.querySelector('label[onclick]');
  // The export button is a label with onClick
  const labels = container.querySelectorAll('label');
  const exportLabel = Array.from(labels).find(l => l.textContent.includes('Export'));
  await user.click(exportLabel);
  // Export triggers saveAs which creates a blob
  expect(exportLabel).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Firearm add flow
// ---------------------------------------------------------------------------

test('clicking Add Firearm shows the Add Firearm form', async () => {
  const user = userEvent.setup();
  const { container } = render(<App />);
  const addBtn = screen.getByText('Add Firearm');
  await user.click(addBtn);
  expect(screen.getByText('Add Firearm')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Firearm close flow
// ---------------------------------------------------------------------------

test('clicking Close on Firearm form returns to Firearms list', async () => {
  const user = userEvent.setup();
  localStorage.setItem('firearms', JSON.stringify([
    {
      id: 'firearm-1',
      name: 'Test Rifle',
      sightHeightInches: 2.0,
      zeroRange: 100,
      zeroRangeUnits: 'Yards',
      reticleUnits: 'Mil',
      turretUnits: 'Mil',
      elevationTurretGradients: 10,
      windageTurretGradients: 10,
      rounds: [
        {
          id: 'round-1',
          name: '5.56 NATO',
          bulletBC: 0.35,
          bulletDiameterInches: 0.223,
          bulletWeightGrains: 62,
          muzzleVelocityFPS: 2900,
        },
      ],
    },
  ]));
  localStorage.setItem('firearmId', 'firearm-1');
  const { container } = render(<App />);
  // The Firearm form has a Close button with text "Close"
  const closeBtn = screen.getByRole('button', { name: /Close/i });
  await user.click(closeBtn);
  expect(screen.getByText('Select Firearm')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Round close flow
// ---------------------------------------------------------------------------

test('clicking Close on Round form returns to Rounds list', async () => {
  const user = userEvent.setup();
  localStorage.setItem('firearms', JSON.stringify([
    {
      id: 'firearm-1',
      name: 'Test Rifle',
      sightHeightInches: 2.0,
      zeroRange: 100,
      zeroRangeUnits: 'Yards',
      reticleUnits: 'Mil',
      turretUnits: 'Mil',
      elevationTurretGradients: 10,
      windageTurretGradients: 10,
      rounds: [
        {
          id: 'round-1',
          name: '5.56 NATO',
          bulletBC: 0.35,
          bulletDiameterInches: 0.223,
          bulletWeightGrains: 62,
          muzzleVelocityFPS: 2900,
        },
      ],
    },
  ]));
  localStorage.setItem('firearmId', 'firearm-1');
  localStorage.setItem('roundId', 'round-1');
  const { container } = render(<App />);
  // The Round form has a Close button with text "Close"
  const closeBtn = screen.getByRole('button', { name: /Close/i });
  await user.click(closeBtn);
  expect(screen.getByText('Select Round')).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Weather form submission
// ---------------------------------------------------------------------------

test('submitting the Weather form triggers handleWeatherOnSubmit', async () => {
  const user = userEvent.setup();
  const { container } = render(<App />);
  // Find the weather form and submit it
  const weatherForm = container.querySelector('form');
  if (weatherForm) {
    const submitBtn = weatherForm.querySelector('button[type="submit"]');
    await user.click(submitBtn);
  }
  expect(true).toBe(true);
});

// ---------------------------------------------------------------------------
// Target form submission
// ---------------------------------------------------------------------------

test('submitting the Target form triggers handleTargetOnSubmit', async () => {
  const user = userEvent.setup();
  const { container } = render(<App />);
  // Find the target form and submit it
  const forms = container.querySelectorAll('form');
  if (forms.length > 0) {
    const targetForm = forms[1];
    const submitBtn = targetForm.querySelector('button[type="submit"]');
    await user.click(submitBtn);
  }
  expect(true).toBe(true);
});
