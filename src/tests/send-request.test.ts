import sendRequest from '@/utils/send-request';
import { HttpStatus } from '@/constants/http-status';

describe('sendRequest', () => {
  const TEST_URL = 'https://test.com';

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('should merge headers correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: HttpStatus.OK,
      json: async () => ({ ok: true }),
    });

    await sendRequest(TEST_URL, 'GET', { Accept: 'application/xml' }, '');

    expect(fetch).toHaveBeenCalledWith(TEST_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/xml',
      },
    });
  });

  test('should make a GET request without body', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: HttpStatus.OK,
      json: async () => ({ message: 'ok' }),
    });

    const result = await sendRequest(TEST_URL, 'GET', {}, '');

    expect(fetch).toHaveBeenCalledWith(TEST_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toEqual({ status: HttpStatus.OK, data: { message: 'ok' } });
  });

  test('should include body for PUT request', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: HttpStatus.OK,
      json: async () => ({ updated: true }),
    });

    const result = await sendRequest(TEST_URL, 'PUT', {}, '{"id":1}');

    expect(fetch).toHaveBeenCalledWith(TEST_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: '{"id":1}',
    });
    expect(result).toEqual({ status: HttpStatus.OK, data: { updated: true } });
  });
});
