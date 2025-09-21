import { getCurrentUser } from '@/lib/auth/get-current-user';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import type { User } from '@supabase/supabase-js';

jest.mock('@/utils/supabase/server');

describe('getCurrentUser', () => {
  const mockUser: User = {
    id: 'user-1',
    app_metadata: {},
    aud: 'authenticated',
    created_at: '2025-01-01T00:00:00Z',
    email: 'test@example.com',
    role: 'authenticated',
    updated_at: '2025-01-01T00:00:00Z',
    user_metadata: {},
  };

  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (createSupabaseServerClient as jest.Mock).mockResolvedValue({
      auth: { getUser: mockGetUser },
    });
  });

  test('returns user when present', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser } });

    const result = await getCurrentUser();
    expect(result).toEqual(mockUser);
    expect(mockGetUser).toHaveBeenCalled();
  });

  test('returns null when no user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await getCurrentUser();
    expect(result).toBeNull();
    expect(mockGetUser).toHaveBeenCalled();
  });

  test('throws if supabase client fails', async () => {
    (createSupabaseServerClient as jest.Mock).mockRejectedValue(
      new Error('fail'),
    );

    await expect(getCurrentUser()).rejects.toThrow('fail');
  });
});
