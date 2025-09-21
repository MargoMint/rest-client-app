import sendRequest from '@/utils/send-request';
import { HttpStatus } from '@/constants/http-status';

describe('sendRequest', () => {
  const TEST_URL = 'https://test.com';

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should send custom headers correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: HttpStatus.OK,
      headers: { get: jest.fn(() => 'application/json') },
      json: async () => ({ ok: true }),
      text: async () => '',
    });

    const headers = {
      Accept: 'application/xml',
      Authorization: 'Bearer token',
    };
    await sendRequest(TEST_URL, 'GET', headers, '');

    expect(fetch).toHaveBeenCalledWith(TEST_URL, {
      method: 'GET',
      headers,
      body: undefined,
    });
  });

  test('should make a GET request without body', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: HttpStatus.OK,
      headers: { get: jest.fn(() => 'application/json') },
      json: async () => ({ message: 'ok' }),
      text: async () => '',
    });

    const result = await sendRequest(TEST_URL, 'GET', {}, '');

    expect(fetch).toHaveBeenCalledWith(TEST_URL, {
      method: 'GET',
      headers: {},
      body: undefined,
    });
    expect(result).toEqual({ status: HttpStatus.OK, data: { message: 'ok' } });
  });

  test('should include body for PUT request', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: HttpStatus.OK,
      headers: { get: jest.fn(() => 'application/json') },
      json: async () => ({ updated: true }),
      text: async () => '',
    });

    const body = '{"id":1}';
    const result = await sendRequest(TEST_URL, 'PUT', {}, body);

    expect(fetch).toHaveBeenCalledWith(TEST_URL, {
      method: 'PUT',
      headers: {},
      body,
    });
    expect(result).toEqual({ status: HttpStatus.OK, data: { updated: true } });
  });
});
