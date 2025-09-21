import { getCurrentUser } from '@/lib/auth/get-current-user';
import VariablesPage from '@/app/[locale]/variables/page';

jest.mock('@/lib/auth/get-current-user');

const mockedGetCurrentUser = getCurrentUser as jest.MockedFunction<
  typeof getCurrentUser
>;

describe('VariablesPage', () => {
  test('returns the component with the user when logged in', async () => {
    const mockUser = {
      id: '123',
      app_metadata: {},
      user_metadata: {},
      aud: 'test',
      created_at: new Date().toISOString(),
    };

    mockedGetCurrentUser.mockResolvedValue(mockUser);

    const result = await VariablesPage();

    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });

  test('returns a component without a user when not logged in', async () => {
    mockedGetCurrentUser.mockResolvedValue(null);

    const result = await VariablesPage();

    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });
});
