import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '@/components/auth-form';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signUp: jest.fn().mockResolvedValue({ data: {}, error: null }),
      signInWithPassword: jest
        .fn()
        .mockResolvedValue({ data: {}, error: null }),
    },
  }),
}));

describe('AuthForm (register mode)', () => {
  test('renders email and password fields', () => {
    render(<AuthForm mode="register" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('shows validation errors on invalid input', async () => {
    render(<AuthForm mode="register" />);
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/password/i), 'short');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/invalid email format/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/minimum 8 characters/i),
    ).toBeInTheDocument();
  });

  test('submits form with valid input', async () => {
    render(<AuthForm mode="register" />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Valid1@Password');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.queryByText(/invalid email format/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/minimum 8 characters/i)).not.toBeInTheDocument();
  });
});
