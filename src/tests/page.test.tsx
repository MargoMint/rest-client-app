import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders hello world text', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /hello world!/i }),
    ).toBeInTheDocument();
  });
});
