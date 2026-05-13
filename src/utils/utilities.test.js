import utilities from './utilities';

// ---------------------------------------------------------------------------
// abs — convert negative values for a property to absolute
// ---------------------------------------------------------------------------

test('converts negative values for a property to absolute', () => {
  const input = [
    { name: 'A', value: -10 },
    { name: 'B', value: 20 },
    { name: 'C', value: -5 },
  ];
  const result = utilities.abs(input, 'value');
  expect(result[0].value).toBe(10);
  expect(result[1].value).toBe(20);
  expect(result[2].value).toBe(5);
});

test('returns an array of the same length', () => {
  const input = [{ x: 1 }, { x: 2 }, { x: 3 }];
  const result = utilities.abs(input, 'x');
  expect(result).toHaveLength(3);
});

test('returns a new array (does not mutate original)', () => {
  const input = [{ v: -5 }];
  const result = utilities.abs(input, 'v');
  expect(result).not.toBe(input);
});

test('handles empty array', () => {
  const result = utilities.abs([], 'x');
  expect(result).toEqual([]);
});

// ---------------------------------------------------------------------------
// base64Decode
// ---------------------------------------------------------------------------

test('decodes a base64 string', () => {
  const encoded = Buffer.from('hello world').toString('base64');
  expect(utilities.base64Decode(encoded)).toBe('hello world');
});

test('decodes an empty string', () => {
  const encoded = Buffer.from('').toString('base64');
  expect(utilities.base64Decode(encoded)).toBe('');
});

test('returns a string', () => {
  const encoded = Buffer.from('test').toString('base64');
  expect(typeof utilities.base64Decode(encoded)).toBe('string');
});

// ---------------------------------------------------------------------------
// base64Encode
// ---------------------------------------------------------------------------

test('encodes a string to base64', () => {
  const result = utilities.base64Encode('hello world');
  expect(result).toBe(Buffer.from('hello world').toString('base64'));
});

test('encodes an empty string', () => {
  const result = utilities.base64Encode('');
  expect(result).toBe(Buffer.from('').toString('base64'));
});

test('returns a string', () => {
  expect(typeof utilities.base64Encode('test')).toBe('string');
});

test('round-trips encode then decode', () => {
  const original = 'ballistics data';
  const encoded = utilities.base64Encode(original);
  const decoded = utilities.base64Decode(encoded);
  expect(decoded).toBe(original);
});

// ---------------------------------------------------------------------------
// filter — filter objects by search string
// ---------------------------------------------------------------------------

test('filters objects where a property contains the search string', () => {
  const input = [
    { name: 'Alpha', type: 'rifle' },
    { name: 'Bravo', type: 'pistol' },
    { name: 'Charlie', type: 'rifle' },
  ];
  const result = utilities.filter(input, 'Alpha');
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Alpha');
});

test('filters case-insensitively', () => {
  const input = [{ name: 'Alpha' }, { name: 'Bravo' }];
  const result = utilities.filter(input, 'alpha');
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Alpha');
});

test('returns the original array when search string is null', () => {
  const input = [{ name: 'Alpha' }];
  const result = utilities.filter(input, null);
  expect(result).toBe(input);
});

test('returns the original array when search string is empty', () => {
  const input = [{ name: 'Alpha' }];
  const result = utilities.filter(input, '');
  expect(result).toBe(input);
});

test('returns the original array when input is null', () => {
  const result = utilities.filter(null, 'test');
  expect(result).toBeNull();
});

test('searches across multiple properties', () => {
  const input = [
    { name: 'Alpha', type: 'pistol' },
    { name: 'Bravo', type: 'rifle' },
  ];
  const result = utilities.filter(input, 'rifle');
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Bravo');
});

test('only checks string properties', () => {
  const input = [
    { name: 'Alpha', count: 5 },
    { name: 'Bravo', count: 10 },
  ];
  const result = utilities.filter(input, 'Alpha');
  expect(result).toHaveLength(1);
});

// ---------------------------------------------------------------------------
// guid — generate a GUID
// ---------------------------------------------------------------------------

test('returns a string', () => {
  expect(typeof utilities.guid()).toBe('string');
});

test('returns a valid GUID format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)', () => {
  const guid = utilities.guid();
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  expect(guid).toMatch(guidRegex);
});

test('generates unique GUIDs', () => {
  const g1 = utilities.guid();
  const g2 = utilities.guid();
  expect(g1).not.toBe(g2);
});

test('generates 36-character GUIDs', () => {
  expect(utilities.guid()).toHaveLength(36);
});

// ---------------------------------------------------------------------------
// isDate — check if a value is a date
// ---------------------------------------------------------------------------

test('returns true for a Date object', () => {
  expect(utilities.isDate(new Date())).toBe(true);
});

test('returns true for a date string in MM/DD/YYYY format', () => {
  expect(utilities.isDate('01/15/2024')).toBe(true);
});

test('returns true for a date string in DD.MM.YYYY format', () => {
  expect(utilities.isDate('15.01.2024')).toBe(true);
});

test('returns true for a date string with 12h time (pm)', () => {
  expect(utilities.isDate('01/15/2024 3:30pm')).toBe(true);
});

test('returns true for a date string with 12h time (am)', () => {
  expect(utilities.isDate('01/15/2024 9:00am')).toBe(true);
});

test('returns true for a date string with 12h time (12:00pm)', () => {
  expect(utilities.isDate('01/15/2024 12:00pm')).toBe(true);
});

test('returns false for a plain string', () => {
  expect(utilities.isDate('hello')).toBe(false);
});

test('returns false for a number', () => {
  expect(utilities.isDate(42)).toBe(false);
});

test('returns false for an object that is not a Date', () => {
  expect(utilities.isDate({ foo: 'bar' })).toBe(false);
});

test('returns false for an array', () => {
  expect(utilities.isDate([1, 2, 3])).toBe(false);
});

test('throws for null (null.replace is accessed)', () => {
  expect(() => utilities.isDate(null)).toThrow();
});

test('throws for undefined (undefined.replace is accessed)', () => {
  expect(() => utilities.isDate(undefined)).toThrow();
});

// ---------------------------------------------------------------------------
// jsonParseNumbers — parse JSON and convert numbers
// ---------------------------------------------------------------------------

test('converts string numbers to actual numbers', () => {
  const json = JSON.stringify({ a: '42', b: '3.14' });
  const result = utilities.jsonParseNumbers(json);
  expect(result.a).toBe(42);
  expect(result.b).toBeCloseTo(3.14);
});

test('leaves string non-numbers as strings', () => {
  const json = JSON.stringify({ a: 'hello', b: 'world' });
  const result = utilities.jsonParseNumbers(json);
  expect(result.a).toBe('hello');
  expect(result.b).toBe('world');
});

test('leaves actual numbers as numbers', () => {
  const json = JSON.stringify({ a: 42, b: 3.14 });
  const result = utilities.jsonParseNumbers(json);
  expect(result.a).toBe(42);
  expect(result.b).toBeCloseTo(3.14);
});

test('handles nested objects', () => {
  const json = JSON.stringify({ outer: { inner: '100' } });
  const result = utilities.jsonParseNumbers(json);
  expect(result.outer.inner).toBe(100);
});

test('handles arrays of numbers', () => {
  const json = JSON.stringify(['1', '2', '3']);
  const result = utilities.jsonParseNumbers(json);
  expect(result).toEqual([1, 2, 3]);
});

test('handles mixed arrays', () => {
  const json = JSON.stringify(['1', 'hello', '3']);
  const result = utilities.jsonParseNumbers(json);
  expect(result).toEqual([1, 'hello', 3]);
});

test('converts boolean true to number 1 (isNaN(true) is false)', () => {
  const json = JSON.stringify({ a: true, b: false });
  const result = utilities.jsonParseNumbers(json);
  expect(result.a).toBe(1);
  expect(result.b).toBe(0);
});

test('handles null values', () => {
  const json = JSON.stringify({ a: null });
  const result = utilities.jsonParseNumbers(json);
  expect(result.a).toBeNull();
});

test('handles complex nested structures', () => {
  const json = JSON.stringify({
    firearms: [
      { id: '1', name: 'Rifle', sightHeightInches: '2.0' }
    ],
    target: { distance: '1000' }
  });
  const result = utilities.jsonParseNumbers(json);
  expect(result.firearms[0].sightHeightInches).toBe(2.0);
  expect(result.target.distance).toBe(1000);
});

// ---------------------------------------------------------------------------
// sort — sort array of objects by property
// ---------------------------------------------------------------------------

test('sorts an array of objects by a numeric property ascending', () => {
  const input = [
    { name: 'C', value: 30 },
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
  ];
  utilities.sort(input, 'value');
  expect(input[0].name).toBe('A');
  expect(input[1].name).toBe('B');
  expect(input[2].name).toBe('C');
});

test('sorts an array of objects by a numeric property descending', () => {
  const input = [
    { name: 'C', value: 30 },
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
  ];
  utilities.sort(input, 'value', true);
  expect(input[0].name).toBe('C');
  expect(input[1].name).toBe('B');
  expect(input[2].name).toBe('A');
});

test('sorts an array of objects by a string property', () => {
  const input = [
    { name: 'Charlie' },
    { name: 'Alpha' },
    { name: 'Bravo' },
  ];
  utilities.sort(input, 'name');
  expect(input[0].name).toBe('Alpha');
  expect(input[1].name).toBe('Bravo');
  expect(input[2].name).toBe('Charlie');
});

test('handles null input array (returns undefined)', () => {
  const result = utilities.sort(null, 'value');
  expect(result).toBeUndefined();
});

test('handles undefined propertyName (no-op)', () => {
  const input = [{ a: 1 }];
  utilities.sort(input, undefined);
  expect(input).toHaveLength(1);
});

test('handles empty array (returns undefined)', () => {
  const result = utilities.sort([], 'value');
  expect(result).toBeUndefined();
});

test('sorts date strings correctly', () => {
  const input = [
    { name: 'C', date: '03/15/2024' },
    { name: 'A', date: '01/10/2024' },
    { name: 'B', date: '02/20/2024' },
  ];
  utilities.sort(input, 'date');
  expect(input[0].name).toBe('A');
  expect(input[1].name).toBe('B');
  expect(input[2].name).toBe('C');
});

test('handles equal values (returns 0)', () => {
  const input = [
    { name: 'A', value: 10 },
    { name: 'B', value: 10 },
  ];
  utilities.sort(input, 'value');
  expect(input).toHaveLength(2);
});

test('sorts strings alphabetically ascending', () => {
  const input = [
    { name: 'Zulu' },
    { name: 'Alpha' },
    { name: 'Bravo' },
  ];
  utilities.sort(input, 'name');
  expect(input[0].name).toBe('Alpha');
  expect(input[1].name).toBe('Bravo');
  expect(input[2].name).toBe('Zulu');
});

test('sorts strings alphabetically descending', () => {
  const input = [
    { name: 'Zulu' },
    { name: 'Alpha' },
    { name: 'Bravo' },
  ];
  utilities.sort(input, 'name', true);
  expect(input[0].name).toBe('Zulu');
  expect(input[1].name).toBe('Bravo');
  expect(input[2].name).toBe('Alpha');
});

// ---------------------------------------------------------------------------
// streamToString — convert a readable stream to a string
// ---------------------------------------------------------------------------

test('resolves with a string from a readable stream', async () => {
  const stream = new (require('stream').Readable)();
  stream.push('hello ');
  stream.push('world');
  stream.push(null);
  const result = await utilities.streamToString(stream);
  expect(result).toBe('hello world');
});

test('resolves with an empty string for an empty stream', async () => {
  const stream = new (require('stream').Readable)();
  stream.push(null);
  const result = await utilities.streamToString(stream);
  expect(result).toBe('');
});

test('returns a Promise', () => {
  const stream = new (require('stream').Readable)();
  stream.push('test');
  stream.push(null);
  const result = utilities.streamToString(stream);
  expect(result).toBeInstanceOf(Promise);
});

test('handles multiple chunks', async () => {
  const stream = new (require('stream').Readable)();
  stream.push('chunk1');
  stream.push('chunk2');
  stream.push('chunk3');
  stream.push(null);
  const result = await utilities.streamToString(stream);
  expect(result).toBe('chunk1chunk2chunk3');
});
