import RestClientLayout from '@/components/rest-client/rest-client-layout';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from './test-utils/render-with-intl';

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => {
  return {
    useRouter: () => mockRouter,
    usePathname: () => '/rest-client',
  };
});

describe('RestClientLayout', () => {
  beforeAll(() => {
    HTMLElement.prototype.hasPointerCapture = () => false;
    HTMLElement.prototype.scrollIntoView = () => {};
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('renders basic UI elements', () => {
    renderWithIntl(<RestClientLayout />);

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter request url/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /header/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /body/i })).toBeInTheDocument();
    expect(screen.getByText(/response status/i)).toBeInTheDocument();
  });

  test('allows typing in URL input', async () => {
    renderWithIntl(<RestClientLayout />);
    const input = screen.getByPlaceholderText(/enter request url/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'https://api.example.com');

    expect(input).toHaveValue('https://api.example.com');
  });

  test('allows selecting HTTP method', async () => {
    renderWithIntl(<RestClientLayout />);
    const combobox = screen.getByRole('combobox');
    await userEvent.click(combobox);
    const option = await screen.findByText('POST');
    await userEvent.click(option);
    expect(screen.getByText('POST')).toBeInTheDocument();
  });

  test('shows "No response yet" before request', () => {
    renderWithIntl(<RestClientLayout />);
    expect(screen.getByText(/no response yet/i)).toBeInTheDocument();
  });

  test('updates response after successful fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => ({ message: 'ok' }),
    });

    renderWithIntl(<RestClientLayout />);
    const input = screen.getByPlaceholderText(/enter request url/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await userEvent.type(input, 'https://api.example.com');
    await userEvent.click(sendButton);

    expect(await screen.findByText(/200/)).toBeInTheDocument();
    expect(await screen.findByText(/ok/)).toBeInTheDocument();

    const encodedUrl = btoa('https://api.example.com').replace(/=+$/, '');
    expect(mockRouter.push).toHaveBeenCalledWith(
      `/rest-client?method=GET&url=${encodedUrl}&body=&Content-Type=application%2Fjson`,
    );
  });
});
