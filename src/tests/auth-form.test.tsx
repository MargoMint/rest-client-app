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

const mockSignInWithPassword = jest
  .fn()
  .mockResolvedValue({ data: {}, error: null });

jest.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signUp: jest.fn().mockResolvedValue({ data: {}, error: null }),
      signInWithPassword: mockSignInWithPassword,
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

describe('AuthForm (login mode)', () => {
  test('renders email and password fields', () => {
    render(<AuthForm mode="login" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('submits form with valid input', async () => {
    render(<AuthForm mode="login" />);
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'any-password');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.queryByText(/invalid email format/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  test('calls signInWithPassword with correct credentials', async () => {
    render(<AuthForm mode="login" />);
    const email = 'user@example.com';
    const password = 'securePassword123';

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
