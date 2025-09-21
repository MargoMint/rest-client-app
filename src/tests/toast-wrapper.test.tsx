import { render, screen, act } from '@testing-library/react';
import { toast } from 'react-toastify';
import ToastWrapper from '@/components/ui/toast-wrapper';

describe('ToastWrapper', () => {
  test('renders ToastContainer with correct attributes', () => {
    render(<ToastWrapper />);
    const container = screen.getByLabelText(/Notifications/i);
    expect(container).toBeInTheDocument();
  });

  test('displays a toast when triggered', async () => {
    render(<ToastWrapper />);
    act(() => {
      toast('Hello World');
    });
    expect(await screen.findByText('Hello World')).toBeInTheDocument();
  });
});
