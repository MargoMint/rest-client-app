import buildRestClientRoute from '@/utils/build-rest-client-route';
import { base64url } from '@/utils/base64';
import { HttpHeaders } from '@/utils/headers';

jest.mock('@/utils/base64', () => ({
  base64url: jest.fn((str: string) => `encoded(${str})`),
}));

describe('buildRestClientRoute', () => {
  const pathname = '/api/rest';
  const method = 'POST';
  const url = 'https://example.com/data';
  const body = '{"key":"value"}';
  const headers: HttpHeaders = {
    Authorization: 'Bearer token',
    'Content-Type': 'application/json',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns correct route with encoded URL, body and headers', () => {
    const route = buildRestClientRoute(pathname, method, url, body, headers);

    expect(route).toContain(pathname);
    expect(route).toContain(`method=${method}`);
    expect(route).toContain(`url=encoded(${url})`);
    expect(route).toContain(`body=encoded(${body})`);

    const params = new URLSearchParams(route.split('?')[1]);
    expect(params.get('Authorization')).toBe('Bearer token');
    expect(params.get('Content-Type')).toBe('application/json');
  });

  test('handles empty body correctly', () => {
    const route = buildRestClientRoute(pathname, method, url, '', headers);

    expect(route).toContain('body=');
    expect(route).not.toContain('encoded()');
  });

  test('calls base64url with URL and body', () => {
    buildRestClientRoute(pathname, method, url, body, headers);

    expect(base64url).toHaveBeenCalledWith(url);
    expect(base64url).toHaveBeenCalledWith(body);
  });
});
