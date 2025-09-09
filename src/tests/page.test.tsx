import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  it('renders link to UI demo page', () => {
    render(<Home />);

    const linkElement = screen.getByText(/To UI demo page/i);
    expect(linkElement).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'To UI demo page' }),
    ).toHaveAttribute('href', '/ui-demo');
  });
});
