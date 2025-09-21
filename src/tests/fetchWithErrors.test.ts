import { fetchWithErrors } from '@/lib/fetchWithErrors';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: { error: jest.fn() },
}));

describe('fetchWithErrors', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should return success data when fetch is ok', async () => {
    const mockData = { foo: 'bar' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    const result = await fetchWithErrors<typeof mockData>(
      'https://example.com',
    );

    expect(result).toEqual({ type: 'success', data: mockData });
    expect(fetch).toHaveBeenCalledWith('https://example.com', undefined);
  });

  test('should return http-error when fetch responds with error status', async () => {
    const mockBody = { error: 'bad request' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve(mockBody),
      } as Response),
    );

    const result = await fetchWithErrors('https://example.com');

    expect(result).toEqual({
      type: 'http-error',
      status: 400,
      message: 'Bad Request',
      body: mockBody,
    });
  });

  test('should return network-error when fetch throws', async () => {
    const error = new Error('Failed to fetch');
    global.fetch = jest.fn(() => Promise.reject(error));

    const result = await fetchWithErrors('https://example.com');

    expect(result).toEqual({
      type: 'network-error',
      message: 'Failed to fetch',
    });
    expect(toast.error).toHaveBeenCalledWith(
      'Network or CORS error: Failed to fetch',
    );
  });
});
