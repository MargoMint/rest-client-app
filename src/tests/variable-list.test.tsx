import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useVariableActions } from '@/hooks/use-variable-actions';
import VariableList from '@/components/variables/variables-list';
import { ToastContainer } from 'react-toastify';

jest.mock('@/hooks/use-variable-actions');

const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockRemove = jest.fn();

const mockVariables = [
  {
    name: 'API_KEY',
    value: '123',
    type: 'string',
    scope: 'global',
    description: 'Key',
  },
];

(useVariableActions as jest.Mock).mockReturnValue({
  variables: mockVariables,
  add: mockAdd,
  update: mockUpdate,
  remove: mockRemove,
});

function renderWithToast(component: React.ReactNode) {
  return render(
    <>
      {component}
      <ToastContainer />
    </>,
  );
}

describe('VariableList', () => {
  test('renders existing variables', () => {
    render(<VariableList userId="user-1" />);
    expect(screen.getByDisplayValue('API_KEY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  test('adds new variable and resets form', () => {
    mockAdd.mockReturnValue(true);
    render(<VariableList userId="user-1" />);

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'NEW_VAR' },
    });
    fireEvent.change(screen.getByPlaceholderText(/value/i), {
      target: { value: '456' },
    });

    fireEvent.click(screen.getByAltText('add'));

    expect(mockAdd).toHaveBeenCalledWith({
      name: 'NEW_VAR',
      value: '456',
      description: '',
    });

    expect(screen.getByPlaceholderText(/name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/value/i)).toHaveValue('');
  });

  test('shows toast on duplicate variable name', async () => {
    mockAdd.mockReturnValue(false);
    renderWithToast(<VariableList userId="user-1" />);

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'API_KEY' },
    });
    fireEvent.click(screen.getByAltText('add'));

    await waitFor(() => {
      expect(
        screen.getByText('Variable name is already used'),
      ).toBeInTheDocument();
    });
  });

  test('removes variable on delete click', () => {
    render(<VariableList userId="user-1" />);
    fireEvent.click(screen.getByAltText('delete'));
    expect(mockRemove).toHaveBeenCalledWith('API_KEY');
  });
});
