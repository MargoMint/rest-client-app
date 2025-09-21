import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useVariableActions } from '@/hooks/use-variable-actions';
import VariableList from '@/components/variables/variables-list';
import { ToastContainer } from 'react-toastify';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import VariableListWrapper from '@/components/variables/variableList-wrapper';
import { VariableRow } from '@/components/variables/variable-row';
import { resolveVariables } from '@/lib/variables/resolve-variables';

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
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariableList userId="user-1" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByDisplayValue('API_KEY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  test('adds new variable and resets form', () => {
    mockAdd.mockReturnValue(true);
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariableList userId="user-1" />
      </NextIntlClientProvider>,
    );

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
    renderWithToast(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariableList userId="user-1" />
      </NextIntlClientProvider>,
    );

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
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariableList userId="user-1" />
      </NextIntlClientProvider>,
    );
    fireEvent.click(screen.getByAltText('delete'));
    expect(mockRemove).toHaveBeenCalledWith('API_KEY');
  });
});

describe('VariableListWrapper', () => {
  test('renders VariableList inside wrapper', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariableListWrapper userId="user-2" />
      </NextIntlClientProvider>,
    );

    expect(await screen.findByPlaceholderText(/name/i)).toBeInTheDocument();
  });
});

describe('VariableRow', () => {
  const variable = {
    name: 'TOKEN',
    value: 'abc',
    type: 'string',
    scope: 'global',
    description: 'desc',
  };

  test('toggles editing mode and updates fields', () => {
    const mockUpdate = jest.fn();
    const mockRemove = jest.fn();
    render(
      <VariableRow
        variable={variable}
        update={mockUpdate}
        remove={mockRemove}
      />,
    );
    expect(screen.getByDisplayValue('TOKEN')).toBeDisabled();

    fireEvent.click(screen.getByAltText('edit'));
    const nameInput = screen.getByDisplayValue('TOKEN');
    expect(nameInput).not.toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'NEW_TOKEN' } });
    expect(mockUpdate).toHaveBeenCalledWith('TOKEN', { name: 'NEW_TOKEN' });

    fireEvent.click(screen.getByAltText('save'));
    expect(nameInput).toBeDisabled();

    fireEvent.click(screen.getByAltText('delete'));
    expect(mockRemove).toHaveBeenCalledWith('TOKEN');
  });
});

describe('resolveVariables', () => {
  const vars = [
    {
      name: 'NAME',
      value: 'User',
      type: 'string',
      scope: 'global',
      description: '',
    },
    {
      name: 'AGE',
      value: '100',
      type: 'string',
      scope: 'global',
      description: '',
    },
  ];

  test('replaces single variable', () => {
    expect(resolveVariables('Hello {{NAME}}', vars)).toBe('Hello User');
  });

  test('replaces multiple variables', () => {
    expect(resolveVariables('Hi {{NAME}}, age {{AGE}}', vars)).toBe(
      'Hi User, age 100',
    );
  });

  test('returns empty string for unknown variable', () => {
    expect(resolveVariables('Unknown {{FOO}}', vars)).toBe('Unknown ');
  });
});
