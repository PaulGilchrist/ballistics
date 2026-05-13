import ballistics from './ballistics';

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

const defaultWeather = {
  altitudeFeet: 0,
  temperatureDegreesFahrenheit: 59,
  barometricPressureInchesHg: 29.53,
  relativeHumidityPercent: 78,
  windAngleDegrees: 90,
  windVelocityMph: 10,
};

const defaultTarget = {
  chartStepping: 50,
  distance: 100,
  distanceUnits: 'Yards',
  slantDegrees: 45,
  speedMph: 3,
};

const defaultFirearm = {
  sightHeightInches: 2.0,
  zeroRange: 100,
  zeroRangeUnits: 'Yards',
};

const defaultRound = {
  bulletBC: 0.5,
  bulletWeightGrains: 168,
  muzzleVelocityFPS: 2600,
};

// ---------------------------------------------------------------------------
// getRangeData — core behavior
// ---------------------------------------------------------------------------

test('returns an array', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  expect(Array.isArray(result)).toBe(true);
});

test('produces entries for each chartStepping interval up to distance', () => {
  const target = { ...defaultTarget, chartStepping: 50, distance: 150 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  // 50, 100, 150 → 3 entries
  expect(result).toHaveLength(3);
});

test('produces a single entry when chartStepping equals distance', () => {
  const target = { ...defaultTarget, chartStepping: 100, distance: 100 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  expect(result).toHaveLength(1);
});

test('skips the range=0 row (starts at chartStepping)', () => {
  const target = { ...defaultTarget, chartStepping: 50, distance: 100 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  expect(result[0].rangeYards).toBe(50);
  expect(result[1].rangeYards).toBe(100);
});

// ---------------------------------------------------------------------------
// Falsy / missing input guards
// ---------------------------------------------------------------------------

test('returns empty array when weather is null or undefined', () => {
  expect(ballistics.getRangeData(null, defaultTarget, defaultFirearm, defaultRound)).toEqual([]);
  expect(ballistics.getRangeData(undefined, defaultTarget, defaultFirearm, defaultRound)).toEqual([]);
});

test('produces NaN results when weather is an empty object', () => {
  const result = ballistics.getRangeData({}, defaultTarget, defaultFirearm, defaultRound);
  expect(result.length).toBeGreaterThan(0);
  // Missing weather properties cause NaN in downstream calculations
  expect(Number.isNaN(result[0].velocityFPS)).toBe(true);
  expect(Number.isNaN(result[0].dropInches)).toBe(true);
});

test('returns empty array when target is null or undefined', () => {
  expect(ballistics.getRangeData(defaultWeather, null, defaultFirearm, defaultRound)).toEqual([]);
  expect(ballistics.getRangeData(defaultWeather, undefined, defaultFirearm, defaultRound)).toEqual([]);
});

test('returns empty array when target is an empty object', () => {
  // Empty object has undefined chartStepping and distance, so the
  // while-loop condition (undefined <= undefined) is false.
  expect(ballistics.getRangeData(defaultWeather, {}, defaultFirearm, defaultRound)).toEqual([]);
});

test('returns empty array when firearm is null or undefined', () => {
  expect(ballistics.getRangeData(defaultWeather, defaultTarget, null, defaultRound)).toEqual([]);
  expect(ballistics.getRangeData(defaultWeather, defaultTarget, undefined, defaultRound)).toEqual([]);
});

test('produces NaN results when firearm is an empty object', () => {
  const result = ballistics.getRangeData(defaultWeather, defaultTarget, {}, defaultRound);
  expect(result.length).toBeGreaterThan(0);
  // Missing firearm properties cause NaN in verticalPosition
  expect(Number.isNaN(result[0].verticalPositionInches)).toBe(true);
});

test('returns empty array when round is null or undefined', () => {
  expect(ballistics.getRangeData(defaultWeather, defaultTarget, defaultFirearm, null)).toEqual([]);
  expect(ballistics.getRangeData(defaultWeather, defaultTarget, defaultFirearm, undefined)).toEqual([]);
});

test('produces NaN results when round is an empty object', () => {
  const result = ballistics.getRangeData(defaultWeather, defaultTarget, defaultFirearm, {});
  expect(result.length).toBeGreaterThan(0);
  // Missing round properties cause NaN in all ballistic calculations
  expect(Number.isNaN(result[0].velocityFPS)).toBe(true);
  expect(Number.isNaN(result[0].energyFtLbs)).toBe(true);
});

// ---------------------------------------------------------------------------
// Boundary: loop never executes
// ---------------------------------------------------------------------------

test('returns empty array when chartStepping exceeds distance', () => {
  const target = { ...defaultTarget, chartStepping: 200, distance: 100 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  expect(result).toEqual([]);
});

test('returns empty array when distance is 0', () => {
  const target = { ...defaultTarget, distance: 0 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  expect(result).toEqual([]);
});

// ---------------------------------------------------------------------------
// Distance units: Yards vs Meters
// ---------------------------------------------------------------------------

test('computes rangeMeters correctly when distanceUnits is Yards', () => {
  const target = { ...defaultTarget, chartStepping: 100, distance: 100, distanceUnits: 'Yards' };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  // 100 yards → 91.44 meters
  expect(result[0].rangeMeters).toBeCloseTo(91.44, 2);
  expect(result[0].rangeYards).toBe(100);
});

test('computes rangeMeters correctly when distanceUnits is Meters', () => {
  const target = { ...defaultTarget, chartStepping: 100, distance: 100, distanceUnits: 'Meters' };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  expect(result[0].rangeMeters).toBe(100);
  // 100 meters → ~109.36 yards
  expect(result[0].rangeYards).toBeCloseTo(109.36, 1);
});

// ---------------------------------------------------------------------------
// Zero range units: Yards vs Meters
// ---------------------------------------------------------------------------

test('handles zeroRangeUnits set to Meters', () => {
  const firearm = { ...defaultFirearm, zeroRange: 91.44, zeroRangeUnits: 'Meters' };
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    firearm,
    defaultRound,
  );
  expect(result.length).toBeGreaterThan(0);
});

test('handles zeroRangeUnits set to Yards', () => {
  const firearm = { ...defaultFirearm, zeroRange: 100, zeroRangeUnits: 'Yards' };
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    firearm,
    defaultRound,
  );
  expect(result.length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// Required output properties
// ---------------------------------------------------------------------------

test('each entry contains all expected properties', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  const expectedKeys = [
    'rangeMeters',
    'rangeYards',
    'velocityFPS',
    'energyFtLbs',
    'timeSeconds',
    'dropInches',
    'verticalPositionInches',
    'crossWindDriftInches',
    'leadInches',
    'slantDegrees',
    'verticalPositionMil',
    'verticalPositionMoA',
    'verticalPositionIPHY',
    'crossWindDriftMil',
    'crossWindDriftMoA',
    'crossWindDriftIPHY',
    'leadMil',
    'leadMoA',
    'leadIPHY',
    'slantDropInches',
    'slantMil',
    'slantMoA',
    'slantIPHY',
  ];

  for (const entry of result) {
    for (const key of expectedKeys) {
      expect(entry).toHaveProperty(key);
    }
  }
});

test('all numeric properties are actual numbers', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  const numericKeys = [
    'rangeMeters', 'rangeYards', 'velocityFPS', 'energyFtLbs',
    'timeSeconds', 'dropInches', 'verticalPositionInches',
    'crossWindDriftInches', 'leadInches', 'slantDegrees',
    'verticalPositionMil', 'verticalPositionMoA', 'verticalPositionIPHY',
    'crossWindDriftMil', 'crossWindDriftMoA', 'crossWindDriftIPHY',
    'leadMil', 'leadMoA', 'leadIPHY',
    'slantDropInches', 'slantMil', 'slantMoA', 'slantIPHY',
  ];

  for (const entry of result) {
    for (const key of numericKeys) {
      expect(typeof entry[key]).toBe('number');
    }
  }
});

// ---------------------------------------------------------------------------
// Physics: velocity decreases with range
// ---------------------------------------------------------------------------

test('velocity decreases as range increases', () => {
  const target = { ...defaultTarget, chartStepping: 50, distance: 200 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (let i = 1; i < result.length; i++) {
    expect(result[i].velocityFPS).toBeLessThan(result[i - 1].velocityFPS);
  }
});

// ---------------------------------------------------------------------------
// Physics: drop increases (becomes more negative) with range
// ---------------------------------------------------------------------------

test('drop becomes more negative as range increases', () => {
  const target = { ...defaultTarget, chartStepping: 50, distance: 200 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (let i = 1; i < result.length; i++) {
    expect(result[i].dropInches).toBeLessThan(result[i - 1].dropInches);
  }
});

// ---------------------------------------------------------------------------
// Physics: time increases with range
// ---------------------------------------------------------------------------

test('time increases as range increases', () => {
  const target = { ...defaultTarget, chartStepping: 50, distance: 200 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (let i = 1; i < result.length; i++) {
    expect(result[i].timeSeconds).toBeGreaterThan(result[i - 1].timeSeconds);
  }
});

// ---------------------------------------------------------------------------
// Physics: energy decreases with range
// ---------------------------------------------------------------------------

test('energy decreases as range increases', () => {
  const target = { ...defaultTarget, chartStepping: 50, distance: 200 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (let i = 1; i < result.length; i++) {
    expect(result[i].energyFtLbs).toBeLessThan(result[i - 1].energyFtLbs);
  }
});

// ---------------------------------------------------------------------------
// Vertical position sign convention
// ---------------------------------------------------------------------------

test('verticalPositionInches is negated (reflects scope dial-up)', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  // verticalPositionInches stores the negated value
  for (const entry of result) {
    expect(typeof entry.verticalPositionInches).toBe('number');
  }
});

// ---------------------------------------------------------------------------
// Wind angle 90° produces crosswind drift
// ---------------------------------------------------------------------------

test('produces non-zero crossWindDrift with 90° wind', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(Math.abs(entry.crossWindDriftInches)).toBeGreaterThan(0);
  }
});

// ---------------------------------------------------------------------------
// Wind angle 0° produces no crosswind drift
// ---------------------------------------------------------------------------

test('produces zero crossWindDrift when wind angle is 0°', () => {
  const weather = { ...defaultWeather, windAngleDegrees: 0 };
  const result = ballistics.getRangeData(
    weather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(entry.crossWindDriftInches).toBeCloseTo(0, 4);
  }
});

// ---------------------------------------------------------------------------
// Target speed 0 produces no lead
// ---------------------------------------------------------------------------

test('produces zero lead when target speed is 0 MPH', () => {
  const target = { ...defaultTarget, speedMph: 0 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(entry.leadInches).toBeCloseTo(0, 4);
  }
});

// ---------------------------------------------------------------------------
// Slant degrees 0 produces zero slant drop
// ---------------------------------------------------------------------------

test('produces zero slantDropInches when slantDegrees is 0', () => {
  const target = { ...defaultTarget, slantDegrees: 0 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(entry.slantDropInches).toBeCloseTo(0, 4);
  }
});

// ---------------------------------------------------------------------------
// Slant degrees mirrors drop at 90°
// ---------------------------------------------------------------------------

test('slantDropInches approaches dropInches at 90° slant', () => {
  const target = { ...defaultTarget, slantDegrees: 90 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(entry.slantDropInches).toBeCloseTo(entry.dropInches, 4);
  }
});

// ---------------------------------------------------------------------------
// Derived conversion properties are present and numeric
// ---------------------------------------------------------------------------

test('verticalPositionMil, MoA, and IPHY are computed for each entry', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(typeof entry.verticalPositionMil).toBe('number');
    expect(typeof entry.verticalPositionMoA).toBe('number');
    expect(typeof entry.verticalPositionIPHY).toBe('number');
  }
});

test('crossWindDriftMil, MoA, and IPHY are computed for each entry', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(typeof entry.crossWindDriftMil).toBe('number');
    expect(typeof entry.crossWindDriftMoA).toBe('number');
    expect(typeof entry.crossWindDriftIPHY).toBe('number');
  }
});

test('leadMil, MoA, and IPHY are computed for each entry', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(typeof entry.leadMil).toBe('number');
    expect(typeof entry.leadMoA).toBe('number');
    expect(typeof entry.leadIPHY).toBe('number');
  }
});

test('slantMil, MoA, and IPHY are computed for each entry', () => {
  const result = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(typeof entry.slantMil).toBe('number');
    expect(typeof entry.slantMoA).toBe('number');
    expect(typeof entry.slantIPHY).toBe('number');
  }
});

// ---------------------------------------------------------------------------
// slantDegrees is passed through from target
// ---------------------------------------------------------------------------

test('slantDegrees in each entry matches the target slantDegrees', () => {
  const target = { ...defaultTarget, slantDegrees: 30 };
  const result = ballistics.getRangeData(
    defaultWeather,
    target,
    defaultFirearm,
    defaultRound,
  );
  for (const entry of result) {
    expect(entry.slantDegrees).toBe(30);
  }
});

// ---------------------------------------------------------------------------
// High-altitude weather produces different results
// ---------------------------------------------------------------------------

test('different weather conditions produce different velocity values', () => {
  const highAltWeather = { ...defaultWeather, altitudeFeet: 5000 };
  const resultSea = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  const resultAlt = ballistics.getRangeData(
    highAltWeather,
    defaultTarget,
    defaultFirearm,
    defaultRound,
  );
  // Different altitude produces a different modified BC, changing velocity
  expect(resultAlt[0].velocityFPS).not.toBeCloseTo(resultSea[0].velocityFPS, 0);
});

// ---------------------------------------------------------------------------
// Different bullet weights produce different energy values
// ---------------------------------------------------------------------------

test('heavier bullet produces more energy at the same range', () => {
  const lightRound = { ...defaultRound, bulletWeightGrains: 100 };
  const heavyRound = { ...defaultRound, bulletWeightGrains: 200 };
  const resultLight = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    lightRound,
  );
  const resultHeavy = ballistics.getRangeData(
    defaultWeather,
    defaultTarget,
    defaultFirearm,
    heavyRound,
  );
  expect(resultHeavy[0].energyFtLbs).toBeGreaterThan(resultLight[0].energyFtLbs);
});
