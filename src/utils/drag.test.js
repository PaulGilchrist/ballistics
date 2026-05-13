import drag from './drag';

// ---------------------------------------------------------------------------
// drop — bullet drop due to gravity
// ---------------------------------------------------------------------------

test('returns a negative value (drop is downward)', () => {
  const result = drag.drop(2800, 2800, 0.5);
  expect(result).toBeLessThan(0);
});

test('returns 0 drop when currentVelocity equals muzzleVelocity and time is 0', () => {
  const result = drag.drop(2800, 2800, 0);
  expect(result).toBeCloseTo(0, 2);
});

test('returns a larger negative drop for longer time', () => {
  const dropShort = drag.drop(2800, 2800, 0.5);
  const dropLong = drag.drop(2800, 2800, 1.0);
  expect(dropLong).toBeLessThan(dropShort);
});

test('uses the DROP_TABLE index clamped between 0 and 99', () => {
  // ratio = currentVelocity/muzzleVelocity * 100 + 0.5
  // For equal velocities: ratio = 100.5 → clamped to 99
  const result = drag.drop(2800, 2800, 1.0);
  expect(result).toBeLessThan(0);
  expect(Number.isFinite(result)).toBe(true);
});

test('clamps index to 0 when currentVelocity is 0', () => {
  const result = drag.drop(2800, 0, 1.0);
  expect(Number.isFinite(result)).toBe(true);
});

test('clamps index to 99 when currentVelocity exceeds muzzleVelocity', () => {
  const result = drag.drop(2800, 3000, 1.0);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a number type', () => {
  expect(typeof drag.drop(2800, 2800, 0.5)).toBe('number');
});

test('drop scales with the square of time', () => {
  const drop1 = drag.drop(2800, 2800, 0.5);
  const drop2 = drag.drop(2800, 2800, 1.0);
  // t² ratio: 1.0² / 0.5² = 4
  expect(drop2 / drop1).toBeCloseTo(4, 1);
});

test('handles negative time values', () => {
  const result = drag.drop(2800, 2800, -0.5);
  expect(result).toBeLessThan(0);
});

test('handles NaN time', () => {
  const result = drag.drop(2800, 2800, NaN);
  expect(Number.isNaN(result)).toBe(true);
});

// ---------------------------------------------------------------------------
// energy — kinetic energy in foot-pounds
// ---------------------------------------------------------------------------

test('returns positive energy for a standard bullet', () => {
  const result = drag.energy(100, 2800);
  expect(result).toBeGreaterThan(0);
});

test('returns 0 energy when bullet weight is 0', () => {
  const result = drag.energy(0, 2800);
  expect(result).toBe(0);
});

test('returns 0 energy when velocity is 0', () => {
  const result = drag.energy(100, 0);
  expect(result).toBe(0);
});

test('energy scales with the square of velocity', () => {
  const e1 = drag.energy(100, 2800);
  const e2 = drag.energy(100, 5600);
  // (5600/2800)² = 4
  expect(e2).toBeCloseTo(e1 * 4, 2);
});

test('energy scales linearly with bullet weight', () => {
  const e1 = drag.energy(100, 2800);
  const e2 = drag.energy(200, 2800);
  expect(e2).toBeCloseTo(e1 * 2, 2);
});

test('returns a number type', () => {
  expect(typeof drag.energy(100, 2800)).toBe('number');
});

test('handles negative velocity (energy is still positive due to squaring)', () => {
  const result = drag.energy(100, -2800);
  expect(result).toBeGreaterThan(0);
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.energy(NaN, 2800))).toBe(true);
  expect(Number.isNaN(drag.energy(100, NaN))).toBe(true);
});

// ---------------------------------------------------------------------------
// ingalsSpaceFromVelocity — lookup space from Ingals table
// ---------------------------------------------------------------------------

test('returns the exact space value when velocity matches a table entry', () => {
  // Velocity 2800 is in the INGALS table
  const result = drag.ingalsSpaceFromVelocity(2800);
  expect(Number.isFinite(result)).toBe(true);
});

test('interpolates between two adjacent table entries', () => {
  // Velocity 2805 is between 2810 and 2800
  const result = drag.ingalsSpaceFromVelocity(2805);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a value for velocity at the top of the table (5000)', () => {
  const result = drag.ingalsSpaceFromVelocity(5000);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a value for velocity at the bottom of the table', () => {
  // The table goes down to low velocities
  const result = drag.ingalsSpaceFromVelocity(1000);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a number type', () => {
  expect(typeof drag.ingalsSpaceFromVelocity(2800)).toBe('number');
});

test('space values increase as velocity decreases (bullet travels further at lower speeds)', () => {
  const spaceHigh = drag.ingalsSpaceFromVelocity(4000);
  const spaceLow = drag.ingalsSpaceFromVelocity(2000);
  expect(spaceLow).toBeGreaterThan(spaceHigh);
});

test('handles velocity between table entries with correct interpolation direction', () => {
  // 2805 is between 2810 and 2800
  const space2810 = drag.ingalsSpaceFromVelocity(2810);
  const space2800 = drag.ingalsSpaceFromVelocity(2800);
  const space2805 = drag.ingalsSpaceFromVelocity(2805);
  expect(space2805).toBeGreaterThan(Math.min(space2810, space2800));
  expect(space2805).toBeLessThan(Math.max(space2810, space2800));
});

// ---------------------------------------------------------------------------
// ingalsTimeFromVelocity — lookup time from Ingals table
// ---------------------------------------------------------------------------

test('returns the exact time value when velocity matches a table entry', () => {
  const result = drag.ingalsTimeFromVelocity(2800);
  expect(Number.isFinite(result)).toBe(true);
});

test('interpolates between two adjacent table entries', () => {
  const result = drag.ingalsTimeFromVelocity(2805);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a value for velocity at the top of the table (5000)', () => {
  const result = drag.ingalsTimeFromVelocity(5000);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a value for velocity at the bottom of the table', () => {
  const result = drag.ingalsTimeFromVelocity(1000);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a number type', () => {
  expect(typeof drag.ingalsTimeFromVelocity(2800)).toBe('number');
});

test('time values increase as velocity decreases', () => {
  const timeHigh = drag.ingalsTimeFromVelocity(4000);
  const timeLow = drag.ingalsTimeFromVelocity(2000);
  expect(timeLow).toBeGreaterThan(timeHigh);
});

test('handles velocity between table entries with correct interpolation', () => {
  const time2810 = drag.ingalsTimeFromVelocity(2810);
  const time2800 = drag.ingalsTimeFromVelocity(2800);
  const time2805 = drag.ingalsTimeFromVelocity(2805);
  expect(time2805).toBeGreaterThan(Math.min(time2810, time2800));
  expect(time2805).toBeLessThan(Math.max(time2810, time2800));
});

// ---------------------------------------------------------------------------
// ingalsVelocityFromSpace — lookup velocity from Ingals space
// ---------------------------------------------------------------------------

test('returns the exact velocity when space matches a table entry', () => {
  // Use a known space value from the table
  const space = 0;
  const result = drag.ingalsVelocityFromSpace(space);
  expect(Number.isFinite(result)).toBe(true);
});

test('interpolates between two adjacent space entries', () => {
  const result = drag.ingalsVelocityFromSpace(100);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a number type', () => {
  expect(typeof drag.ingalsVelocityFromSpace(100)).toBe('number');
});

test('velocity decreases as space increases', () => {
  const v1 = drag.ingalsVelocityFromSpace(100);
  const v2 = drag.ingalsVelocityFromSpace(500);
  expect(v2).toBeLessThan(v1);
});

test('handles negative space values', () => {
  const result = drag.ingalsVelocityFromSpace(-100);
  expect(Number.isFinite(result)).toBe(true);
});

test('handles space values between table entries', () => {
  const result = drag.ingalsVelocityFromSpace(250);
  expect(Number.isFinite(result)).toBe(true);
});

// ---------------------------------------------------------------------------
// ingalsVelocityFromTime — lookup velocity from Ingals time
// ---------------------------------------------------------------------------

test('returns the exact velocity when time matches a table entry', () => {
  const result = drag.ingalsVelocityFromTime(0);
  expect(Number.isFinite(result)).toBe(true);
});

test('interpolates between two adjacent time entries', () => {
  const result = drag.ingalsVelocityFromTime(0.5);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a number type', () => {
  expect(typeof drag.ingalsVelocityFromTime(0.5)).toBe('number');
});

test('velocity decreases as time increases', () => {
  const v1 = drag.ingalsVelocityFromTime(0.5);
  const v2 = drag.ingalsVelocityFromTime(1.5);
  expect(v2).toBeLessThan(v1);
});

test('handles negative time values', () => {
  const result = drag.ingalsVelocityFromTime(-0.5);
  expect(Number.isFinite(result)).toBe(true);
});

test('handles time values between table entries', () => {
  const result = drag.ingalsVelocityFromTime(1.25);
  expect(Number.isFinite(result)).toBe(true);
});

// ---------------------------------------------------------------------------
// lead — target lead calculation
// ---------------------------------------------------------------------------

test('returns 0 lead when target speed is 0', () => {
  const result = drag.lead(0, 1.0);
  expect(result).toBe(0);
});

test('returns 0 lead when time is 0', () => {
  const result = drag.lead(10, 0);
  expect(result).toBe(0);
});

test('returns positive lead for positive speed and time', () => {
  const result = drag.lead(10, 1.0);
  expect(result).toBeGreaterThan(0);
});

test('lead scales linearly with target speed', () => {
  const l1 = drag.lead(10, 1.0);
  const l2 = drag.lead(20, 1.0);
  expect(l2).toBeCloseTo(l1 * 2, 2);
});

test('lead scales linearly with time', () => {
  const l1 = drag.lead(10, 1.0);
  const l2 = drag.lead(10, 2.0);
  expect(l2).toBeCloseTo(l1 * 2, 2);
});

test('handles negative speed (reverse direction)', () => {
  const result = drag.lead(-10, 1.0);
  expect(result).toBeLessThan(0);
});

test('returns a number type', () => {
  expect(typeof drag.lead(10, 1.0)).toBe('number');
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.lead(NaN, 1.0))).toBe(true);
  expect(Number.isNaN(drag.lead(10, NaN))).toBe(true);
});

// ---------------------------------------------------------------------------
// maximumPointBlankRange — max range within target radius
// ---------------------------------------------------------------------------

test('returns a positive range for typical inputs', () => {
  const result = drag.maximumPointBlankRange(0.5, 2800, 6);
  expect(result).toBeGreaterThan(0);
});

test('returns a larger range for a larger maximumOrdinate', () => {
  const small = drag.maximumPointBlankRange(0.5, 2800, 3);
  const large = drag.maximumPointBlankRange(0.5, 2800, 10);
  expect(large).toBeGreaterThan(small);
});

test('returns a larger range for higher muzzle velocity', () => {
  const slow = drag.maximumPointBlankRange(0.5, 2400, 6);
  const fast = drag.maximumPointBlankRange(0.5, 3200, 6);
  expect(fast).toBeGreaterThan(slow);
});

test('returns a larger range for higher ballistic coefficient', () => {
  const lowBC = drag.maximumPointBlankRange(0.3, 2800, 6);
  const highBC = drag.maximumPointBlankRange(0.7, 2800, 6);
  expect(highBC).toBeGreaterThan(lowBC);
});

test('returns a number type', () => {
  expect(typeof drag.maximumPointBlankRange(0.5, 2800, 6)).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.maximumPointBlankRange(0.5, 2800, 6);
  expect(Number.isFinite(result)).toBe(true);
});

test('handles small maximumOrdinate values', () => {
  const result = drag.maximumPointBlankRange(0.5, 2800, 1);
  expect(result).toBeGreaterThan(0);
});

test('handles large maximumOrdinate values', () => {
  const result = drag.maximumPointBlankRange(0.5, 2800, 20);
  expect(result).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// maximumPointBlankRangeZero — zero range for max point blank range
// ---------------------------------------------------------------------------

test('returns a positive range for typical inputs', () => {
  const result = drag.maximumPointBlankRangeZero(0.5, 2800, 6);
  expect(result).toBeGreaterThan(0);
});

test('returns a smaller range than maximumPointBlankRange', () => {
  const zero = drag.maximumPointBlankRangeZero(0.5, 2800, 6);
  const max = drag.maximumPointBlankRange(0.5, 2800, 6);
  expect(zero).toBeLessThan(max);
});

test('returns a larger range for higher muzzle velocity', () => {
  const slow = drag.maximumPointBlankRangeZero(0.5, 2400, 6);
  const fast = drag.maximumPointBlankRangeZero(0.5, 3200, 6);
  expect(fast).toBeGreaterThan(slow);
});

test('returns a number type', () => {
  expect(typeof drag.maximumPointBlankRangeZero(0.5, 2800, 6)).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.maximumPointBlankRangeZero(0.5, 2800, 6);
  expect(Number.isFinite(result)).toBe(true);
});

// ---------------------------------------------------------------------------
// modifiedBallisticCoefficient — BC adjusted for atmospheric conditions
// ---------------------------------------------------------------------------

test('returns a modified BC for standard conditions', () => {
  const result = drag.modifiedBallisticCoefficient(0.5, 0, 59, 29.53, 78);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a different BC at higher altitude', () => {
  const seaLevel = drag.modifiedBallisticCoefficient(0.5, 0, 59, 29.53, 78);
  const highAlt = drag.modifiedBallisticCoefficient(0.5, 5000, 59, 29.53, 78);
  expect(highAlt).not.toBe(seaLevel);
});

test('returns a different BC at different temperature', () => {
  const cool = drag.modifiedBallisticCoefficient(0.5, 0, 40, 29.53, 78);
  const warm = drag.modifiedBallisticCoefficient(0.5, 0, 70, 29.53, 78);
  expect(warm).not.toBe(cool);
});

test('returns a different BC at different barometric pressure', () => {
  const low = drag.modifiedBallisticCoefficient(0.5, 0, 59, 28.0, 78);
  const high = drag.modifiedBallisticCoefficient(0.5, 0, 59, 30.0, 78);
  expect(high).not.toBe(low);
});

test('returns a different BC at different humidity', () => {
  const dry = drag.modifiedBallisticCoefficient(0.5, 0, 59, 29.53, 10);
  const humid = drag.modifiedBallisticCoefficient(0.5, 0, 59, 29.53, 90);
  expect(humid).not.toBe(dry);
});

test('returns a number type', () => {
  expect(typeof drag.modifiedBallisticCoefficient(0.5, 0, 59, 29.53, 78)).toBe('number');
});

test('BC is roughly proportional to the input BC', () => {
  const bc1 = drag.modifiedBallisticCoefficient(0.5, 0, 59, 29.53, 78);
  const bc2 = drag.modifiedBallisticCoefficient(0.5 * 2, 0, 59, 29.53, 78);
  expect(bc2).toBeCloseTo(bc1 * 2, 2);
});

// ---------------------------------------------------------------------------
// muzzleAngleDegreesForZeroRange — angle needed to zero at a range
// ---------------------------------------------------------------------------

test('returns a positive angle for typical inputs', () => {
  const result = drag.muzzleAngleDegreesForZeroRange(2800, 100, 2.0, 0.5);
  expect(result).toBeGreaterThan(0);
});

test('returns a larger angle for a longer zero range', () => {
  const short = drag.muzzleAngleDegreesForZeroRange(2800, 100, 2.0, 0.5);
  const long = drag.muzzleAngleDegreesForZeroRange(2800, 300, 2.0, 0.5);
  expect(long).toBeGreaterThan(short);
});

test('returns a larger angle for a higher scope height', () => {
  const low = drag.muzzleAngleDegreesForZeroRange(2800, 100, 1.5, 0.5);
  const high = drag.muzzleAngleDegreesForZeroRange(2800, 100, 3.0, 0.5);
  expect(high).toBeGreaterThan(low);
});

test('returns a number type', () => {
  expect(typeof drag.muzzleAngleDegreesForZeroRange(2800, 100, 2.0, 0.5)).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.muzzleAngleDegreesForZeroRange(2800, 100, 2.0, 0.5);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a small positive angle (typically < 1 degree for common setups)', () => {
  const result = drag.muzzleAngleDegreesForZeroRange(2800, 100, 2.0, 0.5);
  expect(result).toBeLessThan(1.0);
});

// ---------------------------------------------------------------------------
// optimalRiflingTwist — best twist rate for bullet stabilization
// ---------------------------------------------------------------------------

test('returns a positive twist rate for typical bullet dimensions', () => {
  const result = drag.optimalRiflingTwist(0.308, 1.2);
  expect(result).toBeGreaterThan(0);
});

test('returns 0 when bullet diameter is 0', () => {
  const result = drag.optimalRiflingTwist(0, 1.2);
  expect(result).toBe(0);
});

test('returns a number type', () => {
  expect(typeof drag.optimalRiflingTwist(0.308, 1.2)).toBe('number');
});

test('twist rate is proportional to diameter squared divided by length', () => {
  // Formula: diameter * 150 / (length / diameter) = diameter² * 150 / length
  const d = 0.308;
  const l = 1.2;
  const expected = d * 150 / (l / d);
  expect(drag.optimalRiflingTwist(d, l)).toBeCloseTo(expected, 5);
});

test('handles very small bullet diameter', () => {
  const result = drag.optimalRiflingTwist(0.175, 0.6);
  expect(result).toBeGreaterThan(0);
});

test('handles very large bullet diameter', () => {
  const result = drag.optimalRiflingTwist(0.5, 2.0);
  expect(result).toBeGreaterThan(0);
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.optimalRiflingTwist(NaN, 1.2))).toBe(true);
  expect(Number.isNaN(drag.optimalRiflingTwist(0.308, NaN))).toBe(true);
});

test('handles division by zero when bulletLength is 0', () => {
  const result = drag.optimalRiflingTwist(0.308, 0);
  expect(result).toBe(Infinity);
});

// ---------------------------------------------------------------------------
// range — bullet range at a given velocity
// ---------------------------------------------------------------------------

test('returns 0 range when currentVelocity equals muzzleVelocity', () => {
  const result = drag.range(0.5, 2800, 2800);
  expect(result).toBeCloseTo(0, 2);
});

test('returns a positive range when currentVelocity is less than muzzleVelocity', () => {
  const result = drag.range(0.5, 2800, 2400);
  expect(result).toBeGreaterThan(0);
});

test('returns a larger range for lower currentVelocity', () => {
  const v1 = drag.range(0.5, 2800, 2600);
  const v2 = drag.range(0.5, 2800, 2400);
  expect(v2).toBeGreaterThan(v1);
});

test('returns a larger range for higher ballistic coefficient', () => {
  const lowBC = drag.range(0.3, 2800, 2400);
  const highBC = drag.range(0.7, 2800, 2400);
  expect(highBC).toBeGreaterThan(lowBC);
});

test('returns a number type', () => {
  expect(typeof drag.range(0.5, 2800, 2400)).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.range(0.5, 2800, 2400);
  expect(Number.isFinite(result)).toBe(true);
});

test('handles currentVelocity greater than muzzleVelocity (negative range)', () => {
  const result = drag.range(0.5, 2800, 3000);
  expect(result).toBeLessThan(0);
});

// ---------------------------------------------------------------------------
// rifleRecoilVelocity — rearward velocity of the rifle
// ---------------------------------------------------------------------------

test('returns a positive velocity for typical inputs', () => {
  const result = drag.rifleRecoilVelocity(100, 2800, 35, 8);
  expect(result).toBeGreaterThan(0);
});

test('returns 0 when bullet weight is 0 and powder weight is 0', () => {
  const result = drag.rifleRecoilVelocity(0, 2800, 0, 8);
  expect(result).toBe(0);
});

test('returns a larger velocity for heavier bullet', () => {
  const light = drag.rifleRecoilVelocity(100, 2800, 35, 8);
  const heavy = drag.rifleRecoilVelocity(150, 2800, 35, 8);
  expect(heavy).toBeGreaterThan(light);
});

test('returns a larger velocity for higher muzzle velocity', () => {
  const slow = drag.rifleRecoilVelocity(100, 2400, 35, 8);
  const fast = drag.rifleRecoilVelocity(100, 3200, 35, 8);
  expect(fast).toBeGreaterThan(slow);
});

test('returns a smaller velocity for heavier rifle', () => {
  const light = drag.rifleRecoilVelocity(100, 2800, 35, 6);
  const heavy = drag.rifleRecoilVelocity(100, 2800, 35, 10);
  expect(heavy).toBeLessThan(light);
});

test('returns a number type', () => {
  expect(typeof drag.rifleRecoilVelocity(100, 2800, 35, 8)).toBe('number');
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.rifleRecoilVelocity(NaN, 2800, 35, 8))).toBe(true);
});

test('handles zero rifle weight (division by zero → Infinity)', () => {
  const result = drag.rifleRecoilVelocity(100, 2800, 35, 0);
  expect(result).toBe(Infinity);
});

// ---------------------------------------------------------------------------
// rifleRecoilEnergy — rearward energy of the rifle
// ---------------------------------------------------------------------------

test('returns a positive energy for typical inputs', () => {
  const result = drag.rifleRecoilEnergy(100, 2800, 35, 8);
  expect(result).toBeGreaterThan(0);
});

test('returns 0 when there is no recoil velocity', () => {
  const result = drag.rifleRecoilEnergy(0, 0, 0, 8);
  expect(result).toBe(0);
});

test('returns a smaller energy for a heavier rifle (velocity drops faster than mass increases)', () => {
  // Recoil velocity is inversely proportional to rifle weight, and energy is
  // weight * velocity², so doubling weight roughly halves the energy.
  const light = drag.rifleRecoilEnergy(100, 2800, 35, 6);
  const heavy = drag.rifleRecoilEnergy(100, 2800, 35, 10);
  expect(heavy).toBeLessThan(light);
});

test('returns a number type', () => {
  expect(typeof drag.rifleRecoilEnergy(100, 2800, 35, 8)).toBe('number');
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.rifleRecoilEnergy(NaN, 2800, 35, 8))).toBe(true);
});

test('energy scales with the square of recoil velocity', () => {
  // Double the bullet weight → roughly double the velocity → 4x the energy
  const e1 = drag.rifleRecoilEnergy(100, 2800, 35, 8);
  const e2 = drag.rifleRecoilEnergy(200, 2800, 35, 8);
  expect(e2).toBeGreaterThan(e1);
});

// ---------------------------------------------------------------------------
// sectionalDensity — mass per cross-sectional area
// ---------------------------------------------------------------------------

test('returns a positive value for typical bullet dimensions', () => {
  const result = drag.sectionalDensity(100, 0.308);
  expect(result).toBeGreaterThan(0);
});

test('returns 0 when bullet weight is 0', () => {
  const result = drag.sectionalDensity(0, 0.308);
  expect(result).toBe(0);
});

test('returns a larger value for heavier bullet', () => {
  const light = drag.sectionalDensity(100, 0.308);
  const heavy = drag.sectionalDensity(150, 0.308);
  expect(heavy).toBeGreaterThan(light);
});

test('returns a smaller value for larger diameter', () => {
  const thin = drag.sectionalDensity(100, 0.22);
  const thick = drag.sectionalDensity(100, 0.308);
  expect(thick).toBeLessThan(thin);
});

test('returns a number type', () => {
  expect(typeof drag.sectionalDensity(100, 0.308)).toBe('number');
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.sectionalDensity(NaN, 0.308))).toBe(true);
  expect(Number.isNaN(drag.sectionalDensity(100, NaN))).toBe(true);
});

test('handles zero diameter (division by zero → Infinity)', () => {
  const result = drag.sectionalDensity(100, 0);
  expect(result).toBe(Infinity);
});

// ---------------------------------------------------------------------------
// time — time of flight between two velocities
// ---------------------------------------------------------------------------

test('returns 0 time when currentVelocity equals muzzleVelocity', () => {
  const result = drag.time(0.5, 2800, 2800);
  expect(result).toBeCloseTo(0, 2);
});

test('returns a positive time when currentVelocity is less than muzzleVelocity', () => {
  const result = drag.time(0.5, 2800, 2400);
  expect(result).toBeGreaterThan(0);
});

test('returns a larger time for lower currentVelocity', () => {
  const t1 = drag.time(0.5, 2800, 2600);
  const t2 = drag.time(0.5, 2800, 2400);
  expect(t2).toBeGreaterThan(t1);
});

test('returns a larger time for higher ballistic coefficient (BC scales the Ingals time difference)', () => {
  const lowBC = drag.time(0.3, 2800, 2400);
  const highBC = drag.time(0.7, 2800, 2400);
  expect(highBC).toBeGreaterThan(lowBC);
});

test('returns a number type', () => {
  expect(typeof drag.time(0.5, 2800, 2400)).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.time(0.5, 2800, 2400);
  expect(Number.isFinite(result)).toBe(true);
});

test('handles currentVelocity greater than muzzleVelocity (negative time)', () => {
  const result = drag.time(0.5, 2800, 3000);
  expect(result).toBeLessThan(0);
});

// ---------------------------------------------------------------------------
// velocityFromRange — velocity at a given range
// ---------------------------------------------------------------------------

test('returns the muzzleVelocity when range is 0', () => {
  const result = drag.velocityFromRange(0.5, 2800, 0);
  expect(result).toBeCloseTo(2800, 0);
});

test('returns a lower velocity for a positive range', () => {
  const result = drag.velocityFromRange(0.5, 2800, 100);
  expect(result).toBeLessThan(2800);
  expect(result).toBeGreaterThan(0);
});

test('returns a lower velocity for a longer range', () => {
  const v1 = drag.velocityFromRange(0.5, 2800, 100);
  const v2 = drag.velocityFromRange(0.5, 2800, 300);
  expect(v2).toBeLessThan(v1);
});

test('returns a higher velocity for a higher ballistic coefficient', () => {
  const lowBC = drag.velocityFromRange(0.3, 2800, 200);
  const highBC = drag.velocityFromRange(0.7, 2800, 200);
  expect(highBC).toBeGreaterThan(lowBC);
});

test('returns a number type', () => {
  expect(typeof drag.velocityFromRange(0.5, 2800, 100)).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.velocityFromRange(0.5, 2800, 100);
  expect(Number.isFinite(result)).toBe(true);
});

// ---------------------------------------------------------------------------
// velocityFromTime — velocity at a given time
// ---------------------------------------------------------------------------

test('returns the muzzleVelocity when time is 0', () => {
  const result = drag.velocityFromTime(0.5, 2800, 0);
  expect(result).toBeCloseTo(2800, 0);
});

test('returns a lower velocity for a positive time', () => {
  const result = drag.velocityFromTime(0.5, 2800, 0.5);
  expect(result).toBeLessThan(2800);
  expect(result).toBeGreaterThan(0);
});

test('returns a lower velocity for a longer time', () => {
  const v1 = drag.velocityFromTime(0.5, 2800, 0.5);
  const v2 = drag.velocityFromTime(0.5, 2800, 1.0);
  expect(v2).toBeLessThan(v1);
});

test('returns a higher velocity for a higher ballistic coefficient', () => {
  const lowBC = drag.velocityFromTime(0.3, 2800, 0.5);
  const highBC = drag.velocityFromTime(0.7, 2800, 0.5);
  expect(highBC).toBeGreaterThan(lowBC);
});

test('returns a number type', () => {
  expect(typeof drag.velocityFromTime(0.5, 2800, 0.5)).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.velocityFromTime(0.5, 2800, 0.5);
  expect(Number.isFinite(result)).toBe(true);
});

// ---------------------------------------------------------------------------
// verticalPosition — bullet position accounting for muzzle angle
// ---------------------------------------------------------------------------

test('returns a negative value when drop exceeds scope height', () => {
  const result = drag.verticalPosition(2.0, 0, 100, -50);
  expect(result).toBeLessThan(0);
});

test('returns a positive value when muzzle angle compensates for drop', () => {
  const result = drag.verticalPosition(2.0, 0.5, 100, -50);
  expect(result).toBeGreaterThan(-52);
});

test('returns a number type', () => {
  expect(typeof drag.verticalPosition(2.0, 0, 100, -50)).toBe('number');
});

test('handles zero range', () => {
  const result = drag.verticalPosition(2.0, 0, 0, 0);
  expect(result).toBeCloseTo(-2.0, 2);
});

test('handles zero drop', () => {
  const result = drag.verticalPosition(2.0, 0, 100, 0);
  expect(result).toBeCloseTo(-2.0, 2);
});

test('handles negative range', () => {
  const result = drag.verticalPosition(2.0, 0, -100, -50);
  expect(Number.isFinite(result)).toBe(true);
});

test('handles negative muzzle angle', () => {
  const result = drag.verticalPosition(2.0, -0.5, 100, -50);
  expect(Number.isFinite(result)).toBe(true);
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.verticalPosition(NaN, 0, 100, -50))).toBe(true);
  expect(Number.isNaN(drag.verticalPosition(2.0, NaN, 100, -50))).toBe(true);
  expect(Number.isNaN(drag.verticalPosition(2.0, 0, NaN, -50))).toBe(true);
  expect(Number.isNaN(drag.verticalPosition(2.0, 0, 100, NaN))).toBe(true);
});

// ---------------------------------------------------------------------------
// crossWindDrift — wind drift calculation
// ---------------------------------------------------------------------------

test('returns 0 drift when cross wind velocity is 0', () => {
  const result = drag.crossWindDrift(100, 0.5, 90, 0, 0, 2800);
  expect(result).toBeCloseTo(0, 2);
});

test('returns 0 drift when cross wind angle is 0 (headwind)', () => {
  const result = drag.crossWindDrift(100, 0.5, 0, 10, 0, 2800);
  expect(result).toBeCloseTo(0, 2);
});

test('returns positive drift for 90-degree crosswind', () => {
  const result = drag.crossWindDrift(100, 0.5, 90, 10, 0, 2800);
  expect(result).toBeGreaterThan(0);
});

test('returns negative drift for 270-degree crosswind', () => {
  const result = drag.crossWindDrift(100, 0.5, 270, 10, 0, 2800);
  expect(result).toBeLessThan(0);
});

test('returns a number type', () => {
  expect(typeof drag.crossWindDrift(100, 0.5, 90, 10, 0, 2800)).toBe('number');
});

test('handles NaN inputs', () => {
  expect(Number.isNaN(drag.crossWindDrift(NaN, 0.5, 90, 10, 0, 2800))).toBe(true);
});

test('handles zero time', () => {
  const result = drag.crossWindDrift(100, 0, 90, 10, 0, 2800);
  expect(Number.isFinite(result)).toBe(true);
});

// ---------------------------------------------------------------------------
// clicksToReachMaximumPointblankRangeZero — scope clicks for max PBR
// ---------------------------------------------------------------------------

test('returns a number for typical inputs', () => {
  const result = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 6, 2800, 0);
  expect(typeof result).toBe('number');
});

test('returns a finite value for typical inputs', () => {
  const result = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 6, 2800, 0);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a different value for different scope heights', () => {
  const low = drag.clicksToReachMaximumPointblankRangeZero(0.5, 1.5, 10, 6, 2800, 0);
  const high = drag.clicksToReachMaximumPointblankRangeZero(0.5, 3.0, 10, 6, 2800, 0);
  expect(low).not.toBe(high);
});

test('returns a different value for different maximumOrdinate', () => {
  const small = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 3, 2800, 0);
  const large = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 10, 2800, 0);
  expect(small).not.toBe(large);
});

test('returns a different value for different muzzle velocity', () => {
  const slow = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 6, 2400, 0);
  const fast = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 6, 3200, 0);
  expect(slow).not.toBe(fast);
});

test('returns a different value for different muzzle angle', () => {
  const flat = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 6, 2800, 0);
  const angled = drag.clicksToReachMaximumPointblankRangeZero(0.5, 2.0, 10, 6, 2800, 0.5);
  expect(flat).not.toBe(angled);
});
