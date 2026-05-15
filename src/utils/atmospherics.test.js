import atmospherics from './atmospherics';
import config from '../config';

// ---------------------------------------------------------------------------
// interpolateArray — core interpolation logic
// ---------------------------------------------------------------------------

test('returns the first element when arrayIndex is 0', () => {
  const arr = [10, 20, 30, 40, 50];
  expect(atmospherics.interpolateArray(arr, 0)).toBe(10);
});

test('returns the first element when arrayIndex is negative', () => {
  const arr = [10, 20, 30, 40, 50];
  expect(atmospherics.interpolateArray(arr, -1)).toBe(10);
  expect(atmospherics.interpolateArray(arr, -100)).toBe(10);
});

test('returns the last element when arrayIndex equals array.length', () => {
  const arr = [10, 20, 30, 40, 50];
  // arrayIndex >= maxIndex (4) returns arr[4] which is the last element
  expect(atmospherics.interpolateArray(arr, 5)).toBe(50);
});

test('returns the last element when arrayIndex exceeds array.length', () => {
  const arr = [10, 20, 30, 40, 50];
  expect(atmospherics.interpolateArray(arr, 6)).toBe(50);
  expect(atmospherics.interpolateArray(arr, 100)).toBe(50);
});

test('interpolates linearly between two adjacent elements', () => {
  const arr = [10, 20, 30, 40, 50];
  // index 1.5 → between arr[1]=20 and arr[2]=30
  expect(atmospherics.interpolateArray(arr, 1.5)).toBe(25);
});

test('interpolates with a small fractional part', () => {
  const arr = [10, 20, 30, 40, 50];
  // index 2.25 → arr[2] + 0.25 * (arr[3] - arr[2]) = 30 + 0.25*10 = 32.5
  expect(atmospherics.interpolateArray(arr, 2.25)).toBe(32.5);
});

test('returns the element at the integer index when fractional part is 0', () => {
  const arr = [10, 20, 30, 40, 50];
  // index 2 → floor(2)=2, decimal=0 → arr[2] + 0 = arr[2] = 30
  expect(atmospherics.interpolateArray(arr, 2)).toBe(30);
  expect(atmospherics.interpolateArray(arr, 3)).toBe(40);
});

test('handles a two-element array', () => {
  const arr = [10, 30];
  expect(atmospherics.interpolateArray(arr, 0)).toBe(10);
  expect(atmospherics.interpolateArray(arr, 0.5)).toBe(20);
  // index 1 >= maxIndex(1) so it returns arr[1] = 30
  expect(atmospherics.interpolateArray(arr, 1)).toBe(30);
  // index 1.5 >= maxIndex(1) so it also returns arr[1] = 30
  expect(atmospherics.interpolateArray(arr, 1.5)).toBe(30);
});

test('handles a single-element array', () => {
  const arr = [42];
  expect(atmospherics.interpolateArray(arr, 0)).toBe(42);
  // index 1 >= maxIndex(0) so it returns arr[0] = 42
  expect(atmospherics.interpolateArray(arr, 1)).toBe(42);
});

test('handles negative values in the array', () => {
  const arr = [-10, -5, 0, 5, 10];
  expect(atmospherics.interpolateArray(arr, 0)).toBe(-10);
  expect(atmospherics.interpolateArray(arr, 2)).toBe(0);
  expect(atmospherics.interpolateArray(arr, 2.5)).toBe(2.5);
});

test('handles NaN arrayIndex by falling through to the else branch', () => {
  const arr = [10, 20, 30];
  // NaN <= 0 is false, NaN >= 3 is false, so it enters the else branch
  // Math.floor(NaN) is NaN, arr[NaN] is undefined, arithmetic yields NaN
  expect(Number.isNaN(atmospherics.interpolateArray(arr, NaN))).toBe(true);
});

test('handles Infinity arrayIndex by clamping to last element (>= maxIndex)', () => {
  const arr = [10, 20, 30];
  expect(atmospherics.interpolateArray(arr, Infinity)).toBe(30);
});

// ---------------------------------------------------------------------------
// altitudeAdjustmentFactor
// ---------------------------------------------------------------------------

test('returns 1 at sea level (0 feet)', () => {
  expect(atmospherics.altitudeAdjustmentFactor(0)).toBe(1);
});

test('returns the correct factor at 1000 feet', () => {
  expect(atmospherics.altitudeAdjustmentFactor(1000)).toBe(1.031);
});

test('returns the correct factor at 5000 feet', () => {
  // index 5 → floor(5)=5, decimal=0 → arr[5] = 1.163
  expect(atmospherics.altitudeAdjustmentFactor(5000)).toBe(1.163);
});

test('interpolates for a fractional altitude (e.g., 5500 feet)', () => {
  const result = atmospherics.altitudeAdjustmentFactor(5500);
  // index 5.5 → between arr[5]=1.163 and arr[6]=1.199
  expect(result).toBeCloseTo(1.181, 4);
});

test('returns a factor greater than 1 for positive altitudes', () => {
  expect(atmospherics.altitudeAdjustmentFactor(3000)).toBeGreaterThan(1);
});

test('returns the last table value at 15000 feet (index 15 clamps to last element)', () => {
  // index 15 >= maxIndex(15) so it returns arr[15] = 1.573
  expect(atmospherics.altitudeAdjustmentFactor(15000)).toBe(1.573);
});

test('returns the last table value at 16000 feet (index exceeds table length)', () => {
  expect(atmospherics.altitudeAdjustmentFactor(16000)).toBe(1.573);
});

test('returns the last table value for altitudes beyond the table (e.g., 20000 feet)', () => {
  expect(atmospherics.altitudeAdjustmentFactor(20000)).toBe(1.573);
});

test('returns the first table value for negative altitudes', () => {
  expect(atmospherics.altitudeAdjustmentFactor(-500)).toBe(1);
});

test('returns a number type for valid altitudes', () => {
  expect(typeof atmospherics.altitudeAdjustmentFactor(5000)).toBe('number');
});

// ---------------------------------------------------------------------------
// barometricPressureAdjustmentFactor
// ---------------------------------------------------------------------------

test('returns 0 when barometricPressure equals the standard pressure at that altitude', () => {
  // At sea level, standard pressure is 29.53 inHg
  expect(atmospherics.barometricPressureAdjustmentFactor(0, 29.53)).toBeCloseTo(0, 6);
});

test('returns a positive value when barometricPressure is above standard', () => {
  const result = atmospherics.barometricPressureAdjustmentFactor(0, 30.0);
  expect(result).toBeGreaterThan(0);
});

test('returns a negative value when barometricPressure is below standard', () => {
  const result = atmospherics.barometricPressureAdjustmentFactor(0, 28.0);
  expect(result).toBeLessThan(0);
});

test('returns 0 when barometricPressure matches the interpolated standard at 4000 feet', () => {
  // index 4 → arr[4] = 25.45
  expect(atmospherics.barometricPressureAdjustmentFactor(4000, 25.45)).toBeCloseTo(0, 6);
});

test('computes the correct factor at 4000 feet with 26.0 inHg', () => {
  const result = atmospherics.barometricPressureAdjustmentFactor(4000, 26.0);
  // Standard at 4000 ft is 25.45
  expect(result).toBeCloseTo((26.0 - 25.45) / 25.45, 5);
});

test('handles negative altitudes by using the first table entry', () => {
  const result = atmospherics.barometricPressureAdjustmentFactor(-500, 29.53);
  expect(result).toBeCloseTo(0, 6);
});

test('returns NaN when barometricPressure is NaN', () => {
  expect(Number.isNaN(atmospherics.barometricPressureAdjustmentFactor(0, NaN))).toBe(true);
});

test('returns a number type for valid inputs', () => {
  expect(typeof atmospherics.barometricPressureAdjustmentFactor(0, 29.53)).toBe('number');
});

// ---------------------------------------------------------------------------
// relativeHumidityAdjustmentFactor
// ---------------------------------------------------------------------------

test('returns 0.995 when relativeHumidity is 0', () => {
  const result = atmospherics.relativeHumidityAdjustmentFactor(59, 29.53, 0);
  expect(result).toBeCloseTo(0.995, 5);
});

test('returns a value greater than 0.995 for positive relative humidity', () => {
  const result = atmospherics.relativeHumidityAdjustmentFactor(59, 29.53, 50);
  expect(result).toBeGreaterThan(0.995);
});

test('returns a value less than 0.995 for negative relative humidity', () => {
  const result = atmospherics.relativeHumidityAdjustmentFactor(59, 29.53, -50);
  expect(result).toBeLessThan(0.995);
});

test('returns a number type for valid inputs', () => {
  expect(typeof atmospherics.relativeHumidityAdjustmentFactor(59, 29.53, 78)).toBe('number');
});

test('handles 100% relative humidity', () => {
  const result = atmospherics.relativeHumidityAdjustmentFactor(59, 29.53, 100);
  expect(result).toBeGreaterThan(0.995);
  expect(result).toBeGreaterThan(1);
});

test('handles 0% relative humidity at different temperatures', () => {
  expect(atmospherics.relativeHumidityAdjustmentFactor(32, 29.53, 0)).toBeCloseTo(0.995, 5);
  expect(atmospherics.relativeHumidityAdjustmentFactor(70, 29.53, 0)).toBeCloseTo(0.995, 5);
});

test('clamps to last table value when temperature is beyond the vapor pressure table', () => {
  // Vapor pressure table last element is 3.64. 200°F → index 100 → clamps to last element.
  const result = atmospherics.relativeHumidityAdjustmentFactor(200, 29.53, 50);
  expect(result).toBeCloseTo(-0.747, 3);
});

test('returns NaN when barometricPressure is NaN', () => {
  expect(Number.isNaN(atmospherics.relativeHumidityAdjustmentFactor(59, NaN, 50))).toBe(true);
});

// ---------------------------------------------------------------------------
// speedOfSound
// ---------------------------------------------------------------------------

test('returns SPEED_OF_SOUND_AT_SEA_LEVEL at 0 feet altitude', () => {
  expect(atmospherics.speedOfSound(0)).toBeCloseTo(1120.27, 2);
});

test('returns a lower speed at higher altitudes', () => {
  expect(atmospherics.speedOfSound(5000)).toBeLessThan(atmospherics.speedOfSound(0));
});

test('returns a higher speed at negative altitudes', () => {
  expect(atmospherics.speedOfSound(-1000)).toBeGreaterThan(atmospherics.speedOfSound(0));
});

test('speed decreases monotonically with altitude', () => {
  const altitudes = [0, 1000, 3000, 5000, 8000, 10000];
  for (let i = 1; i < altitudes.length; i++) {
    expect(atmospherics.speedOfSound(altitudes[i])).toBeLessThan(
      atmospherics.speedOfSound(altitudes[i - 1]),
    );
  }
});

test('returns a number type', () => {
  expect(typeof atmospherics.speedOfSound(5000)).toBe('number');
});

// ---------------------------------------------------------------------------
// speedOfSoundFactor
// ---------------------------------------------------------------------------

test('returns 1 at sea level (0 feet)', () => {
  expect(atmospherics.speedOfSoundFactor(0)).toBeCloseTo(1, 9);
});

test('returns a factor less than 1 for positive altitudes', () => {
  expect(atmospherics.speedOfSoundFactor(5000)).toBeLessThan(1);
  expect(atmospherics.speedOfSoundFactor(5000)).toBeGreaterThan(0);
});

test('returns a factor greater than 1 for negative altitudes', () => {
  expect(atmospherics.speedOfSoundFactor(-1000)).toBeGreaterThan(1);
});

test('decreases as altitude increases', () => {
  expect(atmospherics.speedOfSoundFactor(10000)).toBeLessThan(atmospherics.speedOfSoundFactor(5000));
  expect(atmospherics.speedOfSoundFactor(5000)).toBeLessThan(atmospherics.speedOfSoundFactor(0));
});

test('uses the quadratic formula: 1 - a*h - b*h²', () => {
  const altitude = 5000;
  const expected = 1 - 0.00001126666 * altitude - 0.00000000006753074 * Math.pow(altitude, 2);
  expect(atmospherics.speedOfSoundFactor(altitude)).toBeCloseTo(expected, 9);
});

test('returns a number type', () => {
  expect(typeof atmospherics.speedOfSoundFactor(3000)).toBe('number');
});

// ---------------------------------------------------------------------------
// standardRelativeHumidity
// ---------------------------------------------------------------------------

test('returns a number for sea level altitude', () => {
  expect(typeof atmospherics.standardRelativeHumidity(0)).toBe('number');
});

test('returns a positive value at sea level', () => {
  expect(atmospherics.standardRelativeHumidity(0)).toBeGreaterThan(0);
});

test('returns a value at 5000 feet', () => {
  const result = atmospherics.standardRelativeHumidity(5000);
  expect(typeof result).toBe('number');
  expect(result).toBeGreaterThan(0);
});

test('produces different values for different altitudes', () => {
  const seaLevel = atmospherics.standardRelativeHumidity(0);
  const highAlt = atmospherics.standardRelativeHumidity(3000);
  expect(seaLevel).not.toBe(highAlt);
});

test('handles negative altitudes', () => {
  const result = atmospherics.standardRelativeHumidity(-500);
  expect(typeof result).toBe('number');
});

test('clamps to last table value at 16000 feet (beyond table bounds)', () => {
  // index 16 >= maxIndex(15) so it clamps to last element for both temp and pressure tables
  const result = atmospherics.standardRelativeHumidity(16000);
  expect(result).toBeCloseTo(4.45, 1);
});

// ---------------------------------------------------------------------------
// temperatureAdjustmentFactor
// ---------------------------------------------------------------------------

test('returns 0 when temperature equals the standard temperature at that altitude', () => {
  // Standard temperature at sea level is 59°F
  expect(atmospherics.temperatureAdjustmentFactor(0, 59)).toBeCloseTo(0, 6);
});

test('returns a positive value when temperature is above standard', () => {
  const result = atmospherics.temperatureAdjustmentFactor(0, 70);
  expect(result).toBeGreaterThan(0);
});

test('returns a negative value when temperature is below standard', () => {
  const result = atmospherics.temperatureAdjustmentFactor(0, 40);
  expect(result).toBeLessThan(0);
});

test('returns 0 when temperature matches the interpolated standard at 4000 feet', () => {
  // index 4 → arr[4] = 44.7
  expect(atmospherics.temperatureAdjustmentFactor(4000, 44.7)).toBeCloseTo(0, 6);
});

test('handles negative altitudes by using the first table entry', () => {
  const result = atmospherics.temperatureAdjustmentFactor(-500, 59);
  expect(result).toBeCloseTo(0, 6);
});

test('returns NaN when temperature is NaN', () => {
  expect(Number.isNaN(atmospherics.temperatureAdjustmentFactor(0, NaN))).toBe(true);
});

test('clamps to last table value at 16000 feet (beyond table bounds)', () => {
  // index 16 >= maxIndex(15) so it clamps to last element = 5.5°F
  const result = atmospherics.temperatureAdjustmentFactor(16000, 59);
  expect(result).toBeCloseTo(0.115, 3);
});

test('returns a number type for valid inputs', () => {
  expect(typeof atmospherics.temperatureAdjustmentFactor(0, 59)).toBe('number');
});

// ---------------------------------------------------------------------------
// weightDensityOfAir
// ---------------------------------------------------------------------------

test('returns WEIGHT_DENSITY_OF_AIR_AT_SEA_LEVEL at 0 feet', () => {
  expect(atmospherics.weightDensityOfAir(0)).toBeCloseTo(0.0751, 5);
});

test('returns a lower density at higher altitudes', () => {
  expect(atmospherics.weightDensityOfAir(5000)).toBeLessThan(atmospherics.weightDensityOfAir(0));
});

test('returns a higher density at negative altitudes', () => {
  expect(atmospherics.weightDensityOfAir(-1000)).toBeGreaterThan(atmospherics.weightDensityOfAir(0));
});

test('density decreases monotonically with altitude', () => {
  const altitudes = [0, 1000, 3000, 5000, 8000, 10000];
  for (let i = 1; i < altitudes.length; i++) {
    expect(atmospherics.weightDensityOfAir(altitudes[i])).toBeLessThan(
      atmospherics.weightDensityOfAir(altitudes[i - 1]),
    );
  }
});

test('uses the exponential formula: density * exp(-0.0000302149 * altitude)', () => {
  const altitude = 5000;
  const expected = 0.0751 * Math.exp(-0.0000302149 * altitude);
  expect(atmospherics.weightDensityOfAir(altitude)).toBeCloseTo(expected, 6);
});

test('returns a number type', () => {
  expect(typeof atmospherics.weightDensityOfAir(3000)).toBe('number');
});

test('density is significantly lower at very high altitudes', () => {
  expect(atmospherics.weightDensityOfAir(50000)).toBeGreaterThan(0);
  expect(atmospherics.weightDensityOfAir(50000)).toBeLessThan(0.02);
});
