import { base64url, unbase64url } from '@/utils/base64';

describe('base64url', () => {
  test('encode the string in base64url', () => {
    expect(base64url('test')).toBe('dGVzdA');
    expect(base64url('hello world')).toBe('aGVsbG8gd29ybGQ');
  });

  test('replace "+" with "-" and "/" with "_"', () => {
    const originalString = '\u00fb\u00ff';
    const encodedString = base64url(originalString);
    expect(encodedString).not.toContain('+');
    expect(encodedString).not.toContain('/');
  });
});

describe('unbase64url', () => {
  test('decode base64url back to string', () => {
    expect(unbase64url('dGVzdA')).toBe('test');
    expect(unbase64url('aGVsbG8gd29ybGQ')).toBe('hello world');
  });

  test('correctly restore replaced characters', () => {
    const originalString = '\u00fb\u00ff';
    const encodedString = base64url(originalString);
    const decodedString = unbase64url(encodedString);
    expect(decodedString).toBe(originalString);
  });
});
