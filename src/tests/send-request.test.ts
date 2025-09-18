import sendRequest from '@/utils/send-request';

describe('sendRequest', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('should merge headers correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => ({ ok: true }),
    });

    await sendRequest(
      'https://test.com',
      'GET',
      { Accept: 'application/xml' },
      '',
    );

    expect(fetch).toHaveBeenCalledWith('https://test.com', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/xml',
      },
    });
  });

  test('should make a GET request without body', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => ({ message: 'ok' }),
    });

    const result = await sendRequest('https://test.com', 'GET', {}, '');

    expect(fetch).toHaveBeenCalledWith('https://test.com', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(result).toEqual({ status: 200, data: { message: 'ok' } });
  });

  test('should include body for PUT request', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => ({ updated: true }),
    });

    const result = await sendRequest('https://test.com', 'PUT', {}, '{"id":1}');

    expect(fetch).toHaveBeenCalledWith('https://test.com', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: '{"id":1}',
    });
    expect(result).toEqual({ status: 200, data: { updated: true } });
  });
});
