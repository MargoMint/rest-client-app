import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlobalError from '@/app/[locale]/error';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('GlobalError', () => {
  const error = new Error('Test error');
  const reset = jest.fn();

  beforeAll(() => {
    console.error = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders error message', () => {
    render(<GlobalError error={error} reset={reset} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('calls console.error with the error', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(<GlobalError error={error} reset={reset} />);
    expect(consoleSpy).toHaveBeenCalledWith('Application error:', error);
    consoleSpy.mockRestore();
  });

  test('calls reset when button is clicked', async () => {
    render(<GlobalError error={error} reset={reset} />);
    const button = screen.getByText('tryAgain');
    await userEvent.click(button);
    expect(reset).toHaveBeenCalled();
  });

  test('renders mainMessage if error.message is empty', () => {
    const emptyError = new Error('');
    render(<GlobalError error={emptyError} reset={reset} />);
    expect(screen.getByText('mainMessage')).toBeInTheDocument();
  });
});
