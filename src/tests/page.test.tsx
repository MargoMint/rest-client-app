import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/utils/supabase/get-current-user', () => ({
  getCurrentUser: jest.fn(() => Promise.resolve(null)),
}));

describe('Home', () => {
  test('renders Hero section', async () => {
    render(await Home());

    expect(
      screen.getByRole('heading', { name: /About the project/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /About the course/i }),
    ).toBeInTheDocument();
  });

  test('renders Team section', async () => {
    render(await Home());

    expect(screen.getByText(/Our team/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Get to know us/i }),
    ).toBeInTheDocument();
  });

  test('renders team members with GitHub and LinkedIn links', async () => {
    render(await Home());

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
    render(await Home());

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});
