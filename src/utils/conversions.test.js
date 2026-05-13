import conversions from './conversions';

// ---------------------------------------------------------------------------
// degreesToRadians
// ---------------------------------------------------------------------------

test('converts 180 degrees to PI radians', () => {
  expect(conversions.degreesToRadians(180)).toBeCloseTo(3.14159265358979, 5);
});

test('converts 0 degrees to 0 radians', () => {
  expect(conversions.degreesToRadians(0)).toBe(0);
});

test('converts 360 degrees to 2*PI radians', () => {
  expect(conversions.degreesToRadians(360)).toBeCloseTo(6.28318530717958, 5);
});

test('converts 90 degrees to PI/2 radians', () => {
  expect(conversions.degreesToRadians(90)).toBeCloseTo(1.57079632679489, 5);
});

test('converts -90 degrees to -PI/2 radians', () => {
  expect(conversions.degreesToRadians(-90)).toBeCloseTo(-1.57079632679489, 5);
});

test('converts 45 degrees to PI/4 radians', () => {
  expect(conversions.degreesToRadians(45)).toBeCloseTo(0.78539816339744, 5);
});

test('handles very small degree values', () => {
  expect(conversions.degreesToRadians(0.001)).toBeCloseTo(0.000017453, 8);
});

test('handles very large degree values', () => {
  expect(conversions.degreesToRadians(720)).toBeCloseTo(12.56637061435917, 5);
});

test('returns a number type', () => {
  expect(typeof conversions.degreesToRadians(30)).toBe('number');
});

// ---------------------------------------------------------------------------
// radiansToDegrees
// ---------------------------------------------------------------------------

test('converts PI radians to 180 degrees', () => {
  expect(conversions.radiansToDegrees(3.14159265358979)).toBeCloseTo(180, 5);
});

test('converts 0 radians to 0 degrees', () => {
  expect(conversions.radiansToDegrees(0)).toBe(0);
});

test('converts PI/2 radians to 90 degrees', () => {
  expect(conversions.radiansToDegrees(1.57079632679489)).toBeCloseTo(90, 5);
});

test('converts -PI/2 radians to -90 degrees', () => {
  expect(conversions.radiansToDegrees(-1.57079632679489)).toBeCloseTo(-90, 5);
});

test('is the inverse of degreesToRadians', () => {
  const degrees = 73;
  const radians = conversions.degreesToRadians(degrees);
  expect(conversions.radiansToDegrees(radians)).toBeCloseTo(degrees, 5);
});

test('handles very small radian values', () => {
  expect(conversions.radiansToDegrees(0.001)).toBeCloseTo(0.057295779, 8);
});

test('returns a number type', () => {
  expect(typeof conversions.radiansToDegrees(1)).toBe('number');
});

// ---------------------------------------------------------------------------
// inchesToIPHY
// ---------------------------------------------------------------------------

test('converts 10 inches at 100 yards to 10 IPHY', () => {
  expect(conversions.inchesToIPHY(10, 100)).toBe(10);
});

test('converts 20 inches at 200 yards to 10 IPHY', () => {
  expect(conversions.inchesToIPHY(20, 200)).toBe(10);
});

test('converts 10 inches at 200 yards to 5 IPHY', () => {
  expect(conversions.inchesToIPHY(10, 200)).toBe(5);
});

test('converts 6 inches at 300 yards to 2 IPHY', () => {
  expect(conversions.inchesToIPHY(6, 300)).toBe(2);
});

test('returns 0 when inches is 0', () => {
  expect(conversions.inchesToIPHY(0, 100)).toBe(0);
});

test('returns infinity when currentRange is 0', () => {
  expect(conversions.inchesToIPHY(10, 0)).toBe(Infinity);
});

test('handles negative inch values', () => {
  expect(conversions.inchesToIPHY(-5, 100)).toBe(-5);
});

test('handles negative range values', () => {
  expect(conversions.inchesToIPHY(10, -100)).toBe(-10);
});

test('returns NaN when currentRange is NaN', () => {
  expect(Number.isNaN(conversions.inchesToIPHY(10, NaN))).toBe(true);
});

// ---------------------------------------------------------------------------
// inchesToMil
// ---------------------------------------------------------------------------

test('converts 3.6 inches at 100 yards to 1 mil', () => {
  expect(conversions.inchesToMil(3.6, 100)).toBeCloseTo(1, 5);
});

test('converts 7.2 inches at 200 yards to 1 mil', () => {
  expect(conversions.inchesToMil(7.2, 200)).toBeCloseTo(1, 5);
});

test('converts 1 inch at 100 yards to approximately 0.2778 mil', () => {
  expect(conversions.inchesToMil(1, 100)).toBeCloseTo(0.27777777777777, 5);
});

test('returns 0 when inches is 0', () => {
  expect(conversions.inchesToMil(0, 100)).toBe(0);
});

test('returns infinity when currentRange is 0', () => {
  expect(conversions.inchesToMil(3.6, 0)).toBe(Infinity);
});

test('handles negative inch values', () => {
  expect(conversions.inchesToMil(-3.6, 100)).toBeCloseTo(-1, 5);
});

test('handles negative range values', () => {
  expect(conversions.inchesToMil(3.6, -100)).toBeCloseTo(-1, 5);
});

test('returns NaN when currentRange is NaN', () => {
  expect(Number.isNaN(conversions.inchesToMil(3.6, NaN))).toBe(true);
});

// ---------------------------------------------------------------------------
// inchesToMinutesOfAngle
// ---------------------------------------------------------------------------

test('converts 1.047 inches at 100 yards to approximately 1 MoA', () => {
  expect(conversions.inchesToMinutesOfAngle(1.04719755119, 100)).toBeCloseTo(1, 5);
});

test('converts 2.094 inches at 200 yards to approximately 1 MoA', () => {
  expect(conversions.inchesToMinutesOfAngle(2.09439510238, 200)).toBeCloseTo(1, 5);
});

test('converts 1 inch at 100 yards to approximately 0.955 MoA', () => {
  expect(conversions.inchesToMinutesOfAngle(1, 100)).toBeCloseTo(0.955, 3);
});

test('returns 0 when inches is 0', () => {
  expect(conversions.inchesToMinutesOfAngle(0, 100)).toBe(0);
});

test('returns infinity when currentRange is 0', () => {
  expect(conversions.inchesToMinutesOfAngle(1.047, 0)).toBe(Infinity);
});

test('handles negative inch values', () => {
  expect(conversions.inchesToMinutesOfAngle(-1.04719755119, 100)).toBeCloseTo(-1, 5);
});

test('handles negative range values', () => {
  expect(conversions.inchesToMinutesOfAngle(1.04719755119, -100)).toBeCloseTo(-1, 5);
});

test('returns NaN when currentRange is NaN', () => {
  expect(Number.isNaN(conversions.inchesToMinutesOfAngle(1.047, NaN))).toBe(true);
});

// ---------------------------------------------------------------------------
// isEven
// ---------------------------------------------------------------------------

test('returns true for 0', () => {
  expect(conversions.isEven(0)).toBe(true);
});

test('returns true for 2', () => {
  expect(conversions.isEven(2)).toBe(true);
});

test('returns true for 100', () => {
  expect(conversions.isEven(100)).toBe(true);
});

test('returns true for -4', () => {
  expect(conversions.isEven(-4)).toBe(true);
});

test('returns true for odd integers (JS float division makes 1/2*2 === 1)', () => {
  expect(conversions.isEven(1)).toBe(true);
});

test('returns true for odd integer 3 (1.5*2 === 3)', () => {
  expect(conversions.isEven(3)).toBe(true);
});

test('returns true for odd integer 99', () => {
  expect(conversions.isEven(99)).toBe(true);
});

test('returns true for negative odd integer -7', () => {
  expect(conversions.isEven(-7)).toBe(true);
});

test('returns true for large odd integer 10001', () => {
  expect(conversions.isEven(10001)).toBe(true);
});

test('returns true for float 3.0 (3.0/2*2 === 3.0)', () => {
  expect(conversions.isEven(3.0)).toBe(true);
});

test('returns true for float 3.5 (3.5/2*2 === 3.5)', () => {
  expect(conversions.isEven(3.5)).toBe(true);
});

test('returns false for string "4" (strict equality: 4 !== "4")', () => {
  expect(conversions.isEven("4")).toBe(false);
});

test('returns false for string "3" (strict equality: 3 !== "3")', () => {
  expect(conversions.isEven("3")).toBe(false);
});

test('returns false for boolean true (strict equality: 0 !== true)', () => {
  expect(conversions.isEven(true)).toBe(false);
});

test('returns false for boolean false (strict equality: 0 !== false)', () => {
  expect(conversions.isEven(false)).toBe(false);
});

test('returns false for null (strict equality: 0 !== null)', () => {
  expect(conversions.isEven(null)).toBe(false);
});

test('returns false for undefined (NaN !== NaN)', () => {
  expect(conversions.isEven(undefined)).toBe(false);
});
// ---------------------------------------------------------------------------
// metersToYards
// ---------------------------------------------------------------------------

test('converts 1 meter to approximately 1.0936 yards', () => {
  expect(conversions.metersToYards(1)).toBeCloseTo(1.0936, 3);
});

test('converts 0 meters to 0 yards', () => {
  expect(conversions.metersToYards(0)).toBe(0);
});

test('converts 100 meters to approximately 109.36 yards', () => {
  expect(conversions.metersToYards(100)).toBeCloseTo(109.36, 1);
});

test('converts 91.44 meters to 100 yards', () => {
  expect(conversions.metersToYards(91.44)).toBeCloseTo(100, 5);
});

test('handles negative meter values', () => {
  expect(conversions.metersToYards(-100)).toBeCloseTo(-109.36, 1);
});

test('is the inverse of yardsToMeters', () => {
  const yards = 100;
  const meters = conversions.yardsToMeters(yards);
  expect(conversions.metersToYards(meters)).toBeCloseTo(yards, 5);
});

test('returns a number type', () => {
  expect(typeof conversions.metersToYards(50)).toBe('number');
});

// ---------------------------------------------------------------------------
// yardsToMeters
// ---------------------------------------------------------------------------

test('converts 1 yard to 0.9144 meters', () => {
  expect(conversions.yardsToMeters(1)).toBeCloseTo(0.9144, 4);
});

test('converts 0 yards to 0 meters', () => {
  expect(conversions.yardsToMeters(0)).toBe(0);
});

test('converts 100 yards to 91.44 meters', () => {
  expect(conversions.yardsToMeters(100)).toBeCloseTo(91.44, 2);
});

test('converts 109.36 yards to approximately 100 meters', () => {
  expect(conversions.yardsToMeters(109.36)).toBeCloseTo(100, 1);
});

test('handles negative yard values', () => {
  expect(conversions.yardsToMeters(-100)).toBeCloseTo(-91.44, 2);
});

test('is the inverse of metersToYards', () => {
  const meters = 100;
  const yards = conversions.metersToYards(meters);
  expect(conversions.yardsToMeters(yards)).toBeCloseTo(meters, 5);
});

test('returns a number type', () => {
  expect(typeof conversions.yardsToMeters(50)).toBe('number');
});

// ---------------------------------------------------------------------------
// milesPerHourToInchesPerSecond
// ---------------------------------------------------------------------------

test('converts 60 MPH to approximately 1056 inches per second', () => {
  expect(conversions.milesPerHourToInchesPerSecond(60)).toBeCloseTo(1056.024, 2);
});

test('converts 0 MPH to 0 inches per second', () => {
  expect(conversions.milesPerHourToInchesPerSecond(0)).toBe(0);
});

test('converts 1 MPH to approximately 17.6 inches per second', () => {
  expect(conversions.milesPerHourToInchesPerSecond(1)).toBeCloseTo(17.6004, 3);
});

test('handles negative MPH values', () => {
  expect(conversions.milesPerHourToInchesPerSecond(-60)).toBeCloseTo(-1056.024, 2);
});

test('handles very high MPH values', () => {
  expect(conversions.milesPerHourToInchesPerSecond(2600)).toBeCloseTo(45761.04, 1);
});

test('returns a number type', () => {
  expect(typeof conversions.milesPerHourToInchesPerSecond(10)).toBe('number');
});

// ---------------------------------------------------------------------------
// sec (secant)
// ---------------------------------------------------------------------------

test('returns 1 for 0 radians (sec(0) = 1/cos(0) = 1)', () => {
  expect(conversions.sec(0)).toBeCloseTo(1, 5);
});

test('returns 2 for PI/3 radians (sec(60°) = 2)', () => {
  expect(conversions.sec(3.14159265358979 / 3)).toBeCloseTo(2, 5);
});

test('returns approximately 1.414 for PI/4 radians (sec(45°) = sqrt(2))', () => {
  expect(conversions.sec(3.14159265358979 / 4)).toBeCloseTo(1.41421356237309, 5);
});

test('returns -1 for PI radians (sec(180°) = -1)', () => {
  expect(conversions.sec(3.14159265358979)).toBeCloseTo(-1, 5);
});

test('returns very large value near PI/2 (cos approaches 0)', () => {
  const nearPiOver2 = 3.14159265358979 / 2 - 0.001;
  expect(conversions.sec(nearPiOver2)).toBeGreaterThan(100);
});

test('handles negative angles', () => {
  expect(conversions.sec(-1.57079632679489)).toBeCloseTo(conversions.sec(1.57079632679489), 0);
});

test('returns a very large finite number at PI/2 (floating-point cos is not exactly 0)', () => {
  const result = conversions.sec(3.14159265358979 / 2);
  expect(result).toBeGreaterThan(1000000);
  expect(Number.isFinite(result)).toBe(true);
});

test('returns a number type', () => {
  expect(typeof conversions.sec(0.5)).toBe('number');
});

// ---------------------------------------------------------------------------
// sizeToDistance
// ---------------------------------------------------------------------------

test('computes distance for 10-inch target viewed as 1 mil', () => {
  expect(conversions.sizeToDistance(10, 1)).toBe(278);
});

test('computes distance for 10-inch target viewed as 2 mils', () => {
  expect(conversions.sizeToDistance(10, 2)).toBe(139);
});

test('computes distance for 36-inch target viewed as 1 mil', () => {
  expect(conversions.sizeToDistance(36, 1)).toBe(1000);
});

test('computes distance for 36-inch target viewed as 3 mils', () => {
  expect(conversions.sizeToDistance(36, 3)).toBe(333);
});

test('returns infinity when reticle mils is 0', () => {
  expect(conversions.sizeToDistance(10, 0)).toBe(Infinity);
});

test('returns 0 when target size is 0', () => {
  expect(conversions.sizeToDistance(0, 1)).toBe(0);
});

test('handles negative reticle mils', () => {
  expect(conversions.sizeToDistance(10, -1)).toBe(-278);
});

test('handles negative target size', () => {
  expect(conversions.sizeToDistance(-10, 1)).toBe(-278);
});

test('returns NaN when reticle mils is NaN', () => {
  expect(Number.isNaN(conversions.sizeToDistance(10, NaN))).toBe(true);
});

test('returns a rounded integer', () => {
  const result = conversions.sizeToDistance(40, 2.5);
  expect(result).toBe(Math.round(result));
});

test('uses INCHES_PER_YARD (36) in the calculation', () => {
  // 36 inches / 36 inches_per_yard * 1000 / 1 mil = 1000 yards
  expect(conversions.sizeToDistance(36, 1)).toBe(1000);
});
