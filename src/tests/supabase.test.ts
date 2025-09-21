import { createClient } from '@/utils/supabase/client';
import { updateSession } from '@/utils/supabase/middleware';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => ({ mock: 'browser-client' })),
  createServerClient: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(),
  },
}));

const originalEnv = process.env;

function createMockRequest(): NextRequest {
  return {
    cookies: {
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
    },
  } as unknown as NextRequest;
}

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();

  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'test-key',
  };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('createClient', () => {
  test('should create a browser client with correct parameters', () => {
    const client = createClient();
    expect(client).toBeDefined();
    expect(typeof client).toBe('object');
    expect(client).toEqual({ mock: 'browser-client' });
  });
});

describe('updateSession', () => {
  beforeEach(() => {
    (NextResponse.next as jest.Mock).mockReturnValue({
      cookies: { set: jest.fn() },
    });
  });

  test('should create server client and return response', async () => {
    const mockRequest = createMockRequest();

    const mockSupabaseClient = {
      auth: { getUser: jest.fn().mockResolvedValue({}) },
    };
    (createServerClient as jest.Mock).mockReturnValue(mockSupabaseClient);

    const response = await updateSession(mockRequest);

    expect(createServerClient).toHaveBeenCalled();
    expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
    expect(response).toBeDefined();
  });
});

describe('createSupabaseServerClient', () => {
  test('should create server client with cookie store', async () => {
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

    (createServerClient as jest.Mock).mockReturnValue('mock-server-client');

    const client = await createSupabaseServerClient();

    expect(createServerClient).toHaveBeenCalled();
    expect(client).toBe('mock-server-client');
  });

  test('should handle cookie setting errors gracefully', async () => {
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn().mockImplementation(() => {
        throw new Error('Test error');
      }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

    (createServerClient as jest.Mock).mockImplementation(
      (_url, _key, options) => {
        options.cookies.setAll([{ name: 'bad', value: 'value' }]);
        return 'safe-client';
      },
    );

    await expect(createSupabaseServerClient()).resolves.toBe('safe-client');
  });
});

describe('updateSession - setAll cookies', () => {
  test('should call request.cookies.set and response.cookies.set when setAll is called', async () => {
    const mockRequest = createMockRequest();

    const mockResponseCookiesSet = jest.fn();
    (NextResponse.next as jest.Mock).mockReturnValue({
      cookies: { set: mockResponseCookiesSet },
    });

    const mockSupabaseClient = {
      auth: { getUser: jest.fn().mockResolvedValue({}) },
    };
    (createServerClient as jest.Mock).mockImplementation(
      (_url, _key, { cookies }) => {
        cookies.setAll([
          { name: 'test', value: '123', options: { path: '/' } },
        ]);
        return mockSupabaseClient;
      },
    );

    await updateSession(mockRequest);

    expect(mockRequest.cookies.set).toHaveBeenCalledWith('test', '123');
    expect(mockResponseCookiesSet).toHaveBeenCalledWith('test', '123', {
      path: '/',
    });
  });

  test('should handle multiple cookies in setAll', async () => {
    const mockRequest = createMockRequest();

    const mockSupabaseClient = {
      auth: { getUser: jest.fn().mockResolvedValue({}) },
    };
    (createServerClient as jest.Mock).mockImplementation(
      (_url, _key, { cookies }) => {
        cookies.setAll([
          { name: 'a', value: '1', options: {} },
          { name: 'b', value: '2', options: {} },
        ]);
        return mockSupabaseClient;
      },
    );

    await updateSession(mockRequest);

    expect(mockRequest.cookies.set).toHaveBeenCalledTimes(2);
    expect(mockRequest.cookies.set).toHaveBeenCalledWith('a', '1');
    expect(mockRequest.cookies.set).toHaveBeenCalledWith('b', '2');
  });
});
