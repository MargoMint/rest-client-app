import LoginPage from '@/app/[locale]/login/page';
import Home from '@/app/[locale]/page';
import RegisterPage from '@/app/[locale]/register/page';
import RestClientPage from '@/app/[locale]/rest-client/page';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';

const mockUsePathname = jest.fn();

jest.mock('@/lib/auth/get-current-user', () => ({
  getCurrentUser: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('@/components/rest-client/rest-client-layout', () => ({
  __esModule: true,
  default: () => <div>RestClientLayout Mock</div>,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname() {
    return mockUsePathname();
  },
}));

describe('Home', () => {
  beforeEach(() => {
    mockUsePathname.mockImplementation(() => '/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Hero section', async () => {
    const Component = await Home();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /About the project/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /About the course/i }),
    ).toBeInTheDocument();
  });

  test('renders Team section', async () => {
    const Component = await Home();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(/Our team/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Get to know us/i }),
    ).toBeInTheDocument();
  });

  test('renders team members with GitHub and LinkedIn links', async () => {
    const Component = await Home();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>,
    );
    const linkedinLinks = screen.getAllByRole('link', { name: /LinkedIn -/i });
    expect(linkedinLinks.length).toBeGreaterThan(0);
    linkedinLinks.forEach((link) =>
      expect(link).toHaveAttribute('href', expect.stringContaining('https://')),
    );

    const githubLinks = screen.getAllByRole('link', { name: /GitHub -/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    githubLinks.forEach((link) =>
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining('https://github.com'),
      ),
    );
  });

  test('renders team members images', async () => {
    const Component = await Home();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>,
    );
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});

describe('LoginPage', () => {
  test('renders login form and heading', async () => {
    const Component = await LoginPage();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /welcome/i }),
    ).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /sign in/i });
    const submitButton = buttons.find(
      (btn) => btn.getAttribute('type') === 'submit',
    );
    expect(submitButton).toBeInTheDocument();
  });
});

describe('RegisterPage', () => {
  test('renders registration form and heading', async () => {
    const Component = await RegisterPage();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /create|welcome/i }),
    ).toBeInTheDocument();

    const buttons = screen.getAllByRole('button', { name: /sign up/i });
    const submitButton = buttons.find(
      (btn) => btn.getAttribute('type') === 'submit',
    );
    expect(submitButton).toBeInTheDocument();
  });
});

describe('RestClientPage', () => {
  test('renders AppWrapper with RestClientLayout inside', async () => {
    const Component = await RestClientPage();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>,
    );
    expect(screen.getByText(/RestClientLayout Mock/i)).toBeInTheDocument();
  });
});
