/**
 * Centralized configuration for the Ballistics application.
 *
 * All constants, defaults, magic numbers, and lookup tables are defined here
 * to reduce duplication across components and utility modules.
 *
 * Import usage:
 *   import config from './config';
 *   config.PHYSICS.GRAVITY_FPS;
 *   config.DEFAULTS.WEATHER.ALTITUDE_FEET;
 */

const config = {
  // ---------------------------------------------------------------------------
  // 1. PHYSICS — Physical constants used in ballistics calculations
  // ---------------------------------------------------------------------------
  PHYSICS: {
    // Acceleration due to gravity (feet per second squared).
    // Source: drag.js
    GRAVITY_FPS: 32.176,

    // Speed of sound at sea level (feet per second).
    // Source: atmospherics.js
    SPEED_OF_SOUND_AT_SEA_LEVEL: 1120.27,

    // Weight density of air at sea level (pounds per cubic foot).
    // Source: atmospherics.js
    WEIGHT_DENSITY_OF_AIR_AT_SEA_LEVEL: 0.0751,

    // Assumed powder gas exit velocity (feet per second) for recoil calculations.
    // Source: drag.js rifleRecoilVelocity
    POWDER_VELOCITY_FPS: 4000,

    // Grains per pound, used in energy, recoil, and sectional density formulas.
    // Source: drag.js energy, rifleRecoilVelocity, sectionalDensity
    BULLET_WEIGHT_GRAINS_PER_POUND: 7000,

    // Inches per yard, used in verticalPosition (range * 36).
    // Source: drag.js verticalPosition
    INCHES_PER_YARD: 36,

    // Feet per yard, used in crossWindDrift, range, velocityFromRange.
    // Source: drag.js crossWindDrift, range, velocityFromRange
    FEET_PER_YARD: 3,

    // Inches per foot, used in clicksToReachMaximumPointblankRangeZero.
    // Source: drag.js clicksToReachMaximumPointblankRangeZero
    INCHES_PER_FOOT: 12,

    // Absolute zero in Fahrenheit, used in temperature adjustment factor.
    // Source: atmospherics.js temperatureAdjustmentFactor
    ABSOLUTE_ZERO_FAHRENHEIT: 459.6,
  },

  // ---------------------------------------------------------------------------
  // 2. CONVERSIONS — Unit conversion constants
  // ---------------------------------------------------------------------------
  CONVERSIONS: {
    // One Minute of Angle in inches at 100 yards.
    // Source: conversions.js minuteOfAngle
    MOA_INCHES_AT_100_YARDS: 1.04719755119,

    // One Milliradian in inches at 100 yards.
    // Source: conversions.js mil
    MIL_INCHES_AT_100_YARDS: 3.6,

    // Mathematical constant pi.
    // Source: conversions.js pi
    PI: 3.14159265358979,

    // Meters per yard for yards-to-meters conversion.
    // Source: conversions.js yardsToMeters
    METERS_PER_YARD: 0.9144,

    // Reciprocal of METERS_PER_YARD for meters-to-yards conversion.
    YARDS_PER_METER: 1 / 0.9144,

    // Multiplier to convert MPH to inches per second.
    // Source: conversions.js milesPerHourToInchesPerSecond
    MPH_TO_INCHES_PER_SECOND: 17.6004,
  },

  // ---------------------------------------------------------------------------
  // 3. ATMOSPHERIC_TABLES — Lookup tables for atmospheric interpolation
  // ---------------------------------------------------------------------------
  ATMOSPHERIC_TABLES: {
    // Altitude adjustment factor indexed by altitude (feet / 1000).
    // Source: atmospherics.js altitudeAdjustmentFactorTable
    ALTITUDE_ADJUSTMENT_FACTOR_TABLE: [
      1, 1.031, 1.062, 1.095, 1.128, 1.163, 1.199, 1.236, 1.273, 1.313,
      1.353, 1.394, 1.437, 1.481, 1.527, 1.573,
    ],

    // Standard barometric pressure (inches Hg) indexed by altitude (feet / 1000).
    // Source: atmospherics.js barometricPressureTable
    BAROMETRIC_PRESSURE_TABLE: [
      29.53, 28.45, 27.41, 26.41, 25.45, 24.52, 23.62, 22.75, 21.91, 21.11,
      20.33, 19.58, 18.85, 18.16, 17.48, 16.83,
    ],

    // Bullet drop factor indexed by currentVelocity/muzzleVelocity (* 100).
    // Source: atmospherics.js dropTable
    DROP_TABLE: [
      113, 114, 115, 115.5, 116, 117, 118, 118.5, 119, 120, 121, 121.5, 122,
      123, 124, 124.5, 125, 126, 127, 127.5, 128, 129, 130, 130.5, 131, 131,
      133, 133.5, 134, 135, 136, 136.5, 137, 138, 139, 140.5, 142, 143, 144,
      144.5, 145, 146.5, 148, 149, 150, 151, 152, 153, 154, 155, 156, 156.5,
      157, 158.5, 160, 160.5, 161, 161.5, 162, 163, 164, 165, 166, 166.5, 167,
      168, 169, 169.5, 170, 171, 172, 173, 174, 174.5, 175, 175.5, 176, 177,
      178, 179, 180, 180.5, 181, 181.5, 182, 183, 184, 184.5, 185, 185.5, 186,
      196.5, 187, 188.5, 190, 190.5, 191, 191.5, 192, 192.5, 193,
    ],

    // Standard temperature (degrees F) indexed by altitude (feet / 1000).
    // Source: atmospherics.js temperatureTable
    TEMPERATURE_TABLE: [
      59, 55.4, 51.9, 48.3, 44.7, 41.2, 37.6, 34.1, 30.5, 26.9,
      23.4, 19.8, 16.2, 12.7, 9.1, 5.5,
    ],

    // Vapor pressure of water (inches Hg) indexed by temperature (degrees F / 2).
    // Source: atmospherics.js vaporPressureOfWaterTable
    VAPOR_PRESSURE_OF_WATER_TABLE: [
      0.04, 0.04, 0.05, 0.05, 0.06, 0.06, 0.07, 0.08, 0.08, 0.09, 0.1, 0.11,
      0.12, 0.14, 0.15, 0.16, 0.18, 0.2, 0.21, 0.23, 0.25, 0.27, 0.29, 0.31,
      0.34, 0.36, 0.39, 0.42, 0.45, 0.49, 0.52, 0.56, 0.6, 0.64, 0.69, 0.74,
      0.79, 0.85, 0.9, 0.97, 1.03, 1.1, 1.18, 1.25, 1.34, 1.42, 1.51, 1.61,
      1.71, 1.82, 1.93, 2.05, 2.18, 2.31, 2.45, 2.6, 2.75, 2.91, 3.08, 3.26,
      3.45, 3.64,
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. DEFAULTS — Default values for state initialization
  // ---------------------------------------------------------------------------
  DEFAULTS: {
    // Default weather conditions (from App.jsx weather defaults).
    WEATHER: {
      ALTITUDE_FEET: 0,
      TEMPERATURE_DEGREES_FAHRENHEIT: 59,
      BAROMETRIC_PRESSURE_INCHES_HG: 29.53,
      RELATIVE_HUMIDITY_PERCENT: 78,
      WIND_VELOCITY_MPH: 10,
      WIND_ANGLE_DEGREES: 90,
      LATITUDE_DEGREES: 45,
    },

    // Default target parameters (from App.jsx target defaults).
    TARGET: {
      CHART_STEPPING: 50,
      DISTANCE: 1000,
      DISTANCE_UNITS: 'Yards',
      SIZE_INCHES: 28,
      SLANT_DEGREES: 45,
      SPEED_MPH: 3,
    },

    // Default firearm settings (from App.jsx getFirearm 'Add' branch).
    FIREARM: {
      SIGHT_HEIGHT_INCHES: 2.0,
      RIFLING_TWIST_INCHES: 10,
      ZERO_RANGE: 100,
      ZERO_RANGE_UNITS: 'Yards',
      RETICLE_UNITS: 'Mil',
      TURRET_UNITS: 'Mil',
      ELEVATION_TURRET_GRADIENTS: 10,
      WINDAGE_TURRET_GRADIENTS: 10,
    },
  },

  // ---------------------------------------------------------------------------
  // 5. VALIDATION_LIMITS — Min/max constraints for form fields
  // ---------------------------------------------------------------------------
  VALIDATION_LIMITS: {
    // Weather form field constraints (from Weather.jsx).
    WEATHER: {
      ALTITUDE_FEET: { min: 0, max: 50000 },
      TEMPERATURE_DEGREES_FAHRENHEIT: { min: 0, max: 200 },
      BAROMETRIC_PRESSURE_INCHES_HG: { min: 0, max: 100 },
      RELATIVE_HUMIDITY_PERCENT: { min: 0, max: 100 },
      WIND_VELOCITY_MPH: { min: 0, max: 200 },
      WIND_ANGLE_DEGREES: { min: 0, max: 90 },
      LATITUDE_DEGREES: { min: -90, max: 90 },
    },

    // Target form field constraints (from Target.jsx).
    TARGET: {
      DISTANCE: { min: 0, max: 5000 },
      SIZE_INCHES: { min: 1, max: 120 },
      SIZE_MILS: { min: 0.1, max: 100 },
      CHART_STEPPING: { min: 1, max: 500 },
      SLANT_DEGREES: { min: 10, max: 500 },
      SPEED_MPH: { min: 1, max: 500 },
    },

    // Firearm form field constraints (from Firearm.jsx).
    FIREARM: {
      NAME: { minLength: 3, maxLength: 50 },
      SIGHT_HEIGHT_INCHES: { min: 0.25, max: 5 },
      RIFLING_TWIST_INCHES: { min: 6, max: 20 },
      ZERO_RANGE: { min: 10, max: 3000 },
    },

    // Round form field constraints (from Round.jsx).
    ROUND: {
      NAME: { minLength: 3, maxLength: 50 },
      BULLET_DIAMETER_INCHES: { min: 0.010, max: 1 },
      BULLET_WEIGHT_GRAINS: { min: 10, max: 1000 },
      MUZZLE_VELOCITY_FPS: { min: 100, max: 5000 },
      BULLET_BC: { min: 0.010, max: 1 },
    },
  },

  // ---------------------------------------------------------------------------
  // 6. OPTIONS — Dropdown options used in forms
  // ---------------------------------------------------------------------------
  OPTIONS: {
    // Distance unit choices (from Target.jsx, Firearm.jsx).
    DISTANCE_UNITS: ['Yards', 'Meters'],

    // Reticle unit choices (from Firearm.jsx).
    RETICLE_UNITS: ['Mil', 'MoA', 'IPHY'],

    // Turret unit choices (from Firearm.jsx).
    TURRET_UNITS: ['Mil', 'MoA', 'IPHY'],

    // Turret gradient (clicks per unit) choices (from Firearm.jsx).
    TURRET_GRADIENTS: ['1', '2', '4', '5', '10'],
  },

  // ---------------------------------------------------------------------------
  // 7. TOAST_OPTIONS — camelCase toast options for direct use with react-toastify
  // ---------------------------------------------------------------------------
  TOAST_OPTIONS: {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },

  // ---------------------------------------------------------------------------
  // 8. CHART — Chart/graph dimensions
  // ---------------------------------------------------------------------------
  CHART: {
    // Height of the range chart graph in pixels (from App.jsx).
    GRAPH_HEIGHT: 300,

    // Width of the range chart graph in pixels (from App.jsx).
    GRAPH_WIDTH: 300,
  },
};

export default config;
