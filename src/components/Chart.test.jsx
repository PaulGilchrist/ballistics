import { render, screen, fireEvent } from '@testing-library/react';
import Chart from './Chart';

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

const mockFirearm = {
  name: 'Test Rifle',
  reticleUnits: 'Mil',
  turretUnits: 'Mil',
};

const mockRound = {
  name: '5.56 NATO',
};

const mockTargetData = {
  distanceUnits: 'Yards',
  slantDegrees: 30,
  speedMPH: 5,
};

const mockWeatherData = {
  altitudeFeet: 1000,
  windVelocityMPH: 10,
  windAngleDegrees: 90,
};

const mockRangeData = [
  {
    rangeYards: 100,
    rangeMeters: 91.44,
    velocityFPS: 2800,
    energyFtLbs: 1200,
    timeSeconds: 0.115,
    dropInches: -1.5,
    verticalPositionInches: 0.5,
    verticalPositionMil: 0.05,
    verticalPositionMoA: 0.5,
    verticalPositionIPHY: 0.0,
    crossWindDriftInches: 2.0,
    crossWindDriftMil: 0.1,
    crossWindDriftMoA: 0.2,
    crossWindDriftIPHY: 0.0,
    leadInches: 3.0,
    leadMil: 0.1,
    leadMoA: 0.3,
    leadIPHY: 0.0,
    slantDropInches: 1.0,
    slantMil: 0.05,
    slantMoA: 0.1,
    slantIPHY: 0.0,
  },
  {
    rangeYards: 200,
    rangeMeters: 182.88,
    velocityFPS: 2600,
    energyFtLbs: 1050,
    timeSeconds: 0.235,
    dropInches: -6.0,
    verticalPositionInches: -1.0,
    verticalPositionMil: -0.1,
    verticalPositionMoA: -0.2,
    verticalPositionIPHY: 0.0,
    crossWindDriftInches: 5.0,
    crossWindDriftMil: 0.3,
    crossWindDriftMoA: 0.5,
    crossWindDriftIPHY: 0.0,
    leadInches: 6.0,
    leadMil: 0.2,
    leadMoA: 0.6,
    leadIPHY: 0.0,
    slantDropInches: 2.0,
    slantMil: 0.1,
    slantMoA: 0.2,
    slantIPHY: 0.0,
  },
];

const mockOnExport = () => {};
const mockOnPrint = () => {};

const defaultProps = {
  firearm: mockFirearm,
  rangeData: mockRangeData,
  round: mockRound,
  targetData: mockTargetData,
  weatherData: mockWeatherData,
  onExportChart: mockOnExport,
  onPrintChart: mockOnPrint,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Chart', () => {
  test('renders the chart container with correct class', () => {
    render(<Chart {...defaultProps} />);
    expect(document.querySelector('.bal-chart')).toBeInTheDocument();
  });

  test('renders the card element with id chart', () => {
    render(<Chart {...defaultProps} />);
    expect(document.getElementById('chart')).toBeInTheDocument();
  });

  test('displays firearm name in the heading', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Range Chart - Firearm \(Test Rifle\)/i)).toBeInTheDocument();
  });

  test('displays round name in the heading', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Round \(5\.56 NATO\)/i)).toBeInTheDocument();
  });

  test('renders Export button', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  test('renders Print button', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText('Print')).toBeInTheDocument();
  });

  test('calls onExportChart when Export button is clicked', () => {
    const onExport = vi.fn();
    render(<Chart {...defaultProps} onExportChart={onExport} />);
    fireEvent.click(screen.getByText('Export'));
    expect(onExport).toHaveBeenCalledTimes(1);
  });

  test('calls onPrintChart when Print button is clicked', () => {
    const onPrint = vi.fn();
    render(<Chart {...defaultProps} onPrintChart={onPrint} />);
    fireEvent.click(screen.getByText('Print'));
    expect(onPrint).toHaveBeenCalledTimes(1);
  });

  test('renders the ballistics table', () => {
    render(<Chart {...defaultProps} />);
    expect(document.getElementById('ballisticsTable')).toBeInTheDocument();
  });

  test('renders a table header row with column headers', () => {
    render(<Chart {...defaultProps} />);
    const thead = document.querySelector('#ballisticsTable thead');
    expect(thead).toBeInTheDocument();
    expect(thead.querySelectorAll('th').length).toBeGreaterThan(0);
  });

  test('renders a Range column header with yards unit', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Range.*\(yards\)/s)).toBeInTheDocument();
  });

  test('renders a Range column header with meters unit when distanceUnits is Meters', () => {
    render(
      <Chart
        {...defaultProps}
        targetData={{ ...mockTargetData, distanceUnits: 'Meters' }}
      />
    );
    expect(screen.getByText(/Range.*\(meters\)/s)).toBeInTheDocument();
  });

  test('displays range in yards when distanceUnits is Yards', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('displays range in meters when distanceUnits is Meters', () => {
    render(
      <Chart
        {...defaultProps}
        targetData={{ ...mockTargetData, distanceUnits: 'Meters' }}
      />
    );
    expect(screen.getByText('91.44')).toBeInTheDocument();
  });

  test('renders a Velocity column header', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Velocity.*\(FPS\)/s)).toBeInTheDocument();
  });

  test('displays velocity values rounded to 0 decimals', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText('2800')).toBeInTheDocument();
    expect(screen.getByText('2600')).toBeInTheDocument();
  });

  test('renders an Energy column header', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Energy.*\(FtLbs\)/s)).toBeInTheDocument();
  });

  test('renders a Time column header', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Time.*\(sec\)/s)).toBeInTheDocument();
  });

  test('displays time values rounded to 3 decimals', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText('0.115')).toBeInTheDocument();
    expect(screen.getByText('0.235')).toBeInTheDocument();
  });

  test('renders a Drop column header', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Drop.*\(inch\)/s)).toBeInTheDocument();
  });

  test('displays drop values as negated inches', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText('1.5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  test('renders Elevation (inch) column header', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText(/Elevation.*\(inch\)/s)).toBeInTheDocument();
  });

  test('renders Wind column header with wind velocity and angle', () => {
    render(<Chart {...defaultProps} />);
    const headers = screen.getAllByText(/Wind.*10 MPH.*90 deg.*\(inch\)/s);
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });

  test('renders Lead column header with target speed', () => {
    render(<Chart {...defaultProps} />);
    const headers = screen.getAllByText(/Lead.*5 MPH.*\(inch\)/s);
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });

  test('renders Slant column header with slant degrees', () => {
    render(<Chart {...defaultProps} />);
    const headers = screen.getAllByText(/Slant.*30 deg.*\(inch\)/s);
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });

  test('renders the legend for transsonic and subsonic flight', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByText('Orange text denotes transsonic flight')).toBeInTheDocument();
    expect(screen.getByText('Red text denotes subsonic flight')).toBeInTheDocument();
  });

  test('renders one table row per range data entry', () => {
    render(<Chart {...defaultProps} />);
    const rows = document.querySelectorAll('#ballisticsTable tbody tr');
    expect(rows.length).toBe(mockRangeData.length);
  });

  test('renders no table rows when rangeData is empty', () => {
    render(<Chart {...defaultProps} rangeData={[]} />);
    const rows = document.querySelectorAll('#ballisticsTable tbody tr');
    expect(rows.length).toBe(0);
  });

  test('applies text-danger class for subsonic velocity rows', () => {
    const subsonicData = [
      {
        rangeYards: 800,
        rangeMeters: 731.52,
        velocityFPS: 900,
        energyFtLbs: 800,
        timeSeconds: 0.700,
        dropInches: -50,
        verticalPositionInches: -10,
        verticalPositionMil: -1.0,
        verticalPositionMoA: -1.0,
        verticalPositionIPHY: 0.0,
        crossWindDriftInches: 20,
        crossWindDriftMil: 1.0,
        crossWindDriftMoA: 1.0,
        crossWindDriftIPHY: 0.0,
        leadInches: 15,
        leadMil: 0.5,
        leadMoA: 1.0,
        leadIPHY: 0.0,
        slantDropInches: 10,
        slantMil: 0.5,
        slantMoA: 0.5,
        slantIPHY: 0.0,
      },
    ];
    render(<Chart {...defaultProps} rangeData={subsonicData} />);
    const rows = document.querySelectorAll('#ballisticsTable tbody tr');
    expect(rows[0]).toHaveClass('text-danger');
  });

  test('applies text-warning class for transonic velocity rows', () => {
    const transonicData = [
      {
        rangeYards: 600,
        rangeMeters: 548.64,
        velocityFPS: 1200,
        energyFtLbs: 950,
        timeSeconds: 0.500,
        dropInches: -30,
        verticalPositionInches: -5,
        verticalPositionMil: -0.5,
        verticalPositionMoA: -0.5,
        verticalPositionIPHY: 0.0,
        crossWindDriftInches: 12,
        crossWindDriftMil: 0.5,
        crossWindDriftMoA: 0.5,
        crossWindDriftIPHY: 0.0,
        leadInches: 10,
        leadMil: 0.3,
        leadMoA: 0.5,
        leadIPHY: 0.0,
        slantDropInches: 5,
        slantMil: 0.2,
        slantMoA: 0.3,
        slantIPHY: 0.0,
      },
    ];
    render(<Chart {...defaultProps} rangeData={transonicData} />);
    const rows = document.querySelectorAll('#ballisticsTable tbody tr');
    expect(rows[0]).toHaveClass('text-warning');
  });

  test('applies no color class for supersonic velocity rows', () => {
    const supersonicData = [
      {
        rangeYards: 100,
        rangeMeters: 91.44,
        velocityFPS: 2800,
        energyFtLbs: 1200,
        timeSeconds: 0.115,
        dropInches: -1.5,
        verticalPositionInches: 0.5,
        verticalPositionMil: 0.05,
        verticalPositionMoA: 0.5,
        verticalPositionIPHY: 0.0,
        crossWindDriftInches: 2.0,
        crossWindDriftMil: 0.1,
        crossWindDriftMoA: 0.2,
        crossWindDriftIPHY: 0.0,
        leadInches: 3.0,
        leadMil: 0.1,
        leadMoA: 0.3,
        leadIPHY: 0.0,
        slantDropInches: 1.0,
        slantMil: 0.05,
        slantMoA: 0.1,
        slantIPHY: 0.0,
      },
    ];
    render(<Chart {...defaultProps} rangeData={supersonicData} />);
    const rows = document.querySelectorAll('#ballisticsTable tbody tr');
    expect(rows[0]).not.toHaveClass('text-danger');
    expect(rows[0]).not.toHaveClass('text-warning');
  });

  test('shows Mil variant columns when turretUnits is Mil', () => {
    render(
      <Chart
        {...defaultProps}
        firearm={{ ...mockFirearm, turretUnits: 'Mil', reticleUnits: 'Mil' }}
      />
    );
    expect(screen.getByText(/Elevation.*\(Mil\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Wind.*\(Mil\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Lead.*\(Mil\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Slant.*\(Mil\)/s)).toBeInTheDocument();
  });

  test('shows MoA variant columns when turretUnits is MoA', () => {
    render(
      <Chart
        {...defaultProps}
        firearm={{ ...mockFirearm, turretUnits: 'MoA', reticleUnits: 'MoA' }}
      />
    );
    expect(screen.getByText(/Elevation.*\(MoA\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Wind.*\(MoA\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Lead.*\(MoA\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Slant.*\(MoA\)/s)).toBeInTheDocument();
  });

  test('shows IPHY variant columns when turretUnits is IPHY', () => {
    render(
      <Chart
        {...defaultProps}
        firearm={{ ...mockFirearm, turretUnits: 'IPHY', reticleUnits: 'IPHY' }}
      />
    );
    expect(screen.getByText(/Elevation.*\(IPHY\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Wind.*\(IPHY\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Lead.*\(IPHY\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Slant.*\(IPHY\)/s)).toBeInTheDocument();
  });

  test('shows Mil variant columns when reticleUnits is Mil (even if turret differs)', () => {
    render(
      <Chart
        {...defaultProps}
        firearm={{ ...mockFirearm, turretUnits: 'MoA', reticleUnits: 'Mil' }}
      />
    );
    expect(screen.getByText(/Elevation.*\(Mil\)/s)).toBeInTheDocument();
  });

  test('shows both Mil and MoA when reticle and turret differ', () => {
    render(
      <Chart
        {...defaultProps}
        firearm={{ ...mockFirearm, turretUnits: 'Mil', reticleUnits: 'MoA' }}
      />
    );
    expect(screen.getByText(/Elevation.*\(Mil\)/s)).toBeInTheDocument();
    expect(screen.getByText(/Elevation.*\(MoA\)/s)).toBeInTheDocument();
  });

  test('hides Mil variant columns when neither turret nor reticle uses Mil', () => {
    render(
      <Chart
        {...defaultProps}
        firearm={{ ...mockFirearm, turretUnits: 'MoA', reticleUnits: 'IPHY' }}
      />
    );
    expect(screen.queryByText(/Elevation.*\(Mil\)/s)).not.toBeInTheDocument();
  });

  test('reflects different wind velocity in Wind headers', () => {
    render(
      <Chart
        {...defaultProps}
        weatherData={{ ...mockWeatherData, windVelocityMPH: 15 }}
      />
    );
    const headers = screen.getAllByText(/Wind.*15 MPH/s);
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });

  test('reflects different wind angle in Wind headers', () => {
    render(
      <Chart
        {...defaultProps}
        weatherData={{ ...mockWeatherData, windAngleDegrees: 45 }}
      />
    );
    const headers = screen.getAllByText(/Wind.*45 deg/s);
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });

  test('reflects different target speed in Lead headers', () => {
    render(
      <Chart
        {...defaultProps}
        targetData={{ ...mockTargetData, speedMPH: 10 }}
      />
    );
    const headers = screen.getAllByText(/Lead.*10 MPH/s);
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });

  test('reflects different slant degrees in Slant headers', () => {
    render(
      <Chart
        {...defaultProps}
        targetData={{ ...mockTargetData, slantDegrees: 60 }}
      />
    );
    const headers = screen.getAllByText(/Slant.*60 deg/s);
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });

  test('renders table with correct Bootstrap classes', () => {
    render(<Chart {...defaultProps} />);
    const table = document.getElementById('ballisticsTable');
    expect(table).toHaveClass('table');
    expect(table).toHaveClass('table-condensed');
    expect(table).toHaveClass('table-striped');
    expect(table).toHaveClass('table-hover');
    expect(table).toHaveClass('font-size-small');
  });

  test('renders tbody with table-group-divider class', () => {
    render(<Chart {...defaultProps} />);
    const tbody = document.querySelector('#ballisticsTable tbody');
    expect(tbody).toHaveClass('table-group-divider');
  });
});
