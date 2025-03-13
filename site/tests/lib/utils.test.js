import { kebabCase, pathDate } from '../../src/lib/utils';
jest.unmock('moment');

// --- Tests for kebabCase ---
describe('kebabCase', () => {
  it('replaces a single space with a hyphen and converts to lowercase', () => {
    expect(kebabCase('Hello World')).toBe('hello-world');
  });

  it('replaces all occurrences of a space', () => {
    // "Hello World Test" becomes "hello-world-test"
    expect(kebabCase('Hello World Test')).toBe('hello-world-test');
  });

  it('replaces correctly when a string has hyphen in it already', () => {
    // "Hello-World Test" becomes "hello-world-test"
    expect(kebabCase('Hello-World Test')).toBe('hello-world-test');
  });

  it('replaces correctly when a string has multiple spaces in a row', () => {
    // "Hello   World" becomes "hello-world"
    expect(kebabCase('Hello   World')).toBe('hello-world');
  });

  it('returns an empty string when input is empty', () => {
    expect(kebabCase('')).toBe('');
  });

  it('returns an empty string when input is undefined', () => {
    expect(kebabCase(undefined)).toBe('');
  });

  it('returns an empty string when input is null', () => {
    expect(kebabCase(null)).toBe('');
  });
});

// --- Tests for pathDate ---
describe('pathDate', () => {
  it('returns null when date is undefined', () => {
    expect(pathDate(undefined)).toBeNull();
  });

  it('formats a valid ISO date string as "YYYY/MM/DD"', () => {
    // Use a fixed date string
    const date = "2021-08-05T00:00:00.000Z";
    // moment(date).format('YYYY/MM/DD') should be "2021/08/05"
    expect(pathDate(date)).toBe("2021/08/05");
  });
});

