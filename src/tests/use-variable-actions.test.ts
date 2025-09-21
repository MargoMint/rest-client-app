import { renderHook } from '@testing-library/react';
import { useVariableActions } from '@/hooks/use-variable-actions';
import { usePersistentVariables } from '@/hooks/use-persistent-variables';
import type { Variable } from '@/app/[locale]/variables/types';

jest.mock('@/hooks/use-persistent-variables');

describe('useVariableActions', () => {
  const mockSetVariables = jest.fn(
    (_updater: (prev: Variable[]) => Variable[]) => {},
  );

  const initialVariables: Variable[] = [
    { name: 'EXISTING', value: '123', description: '' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (usePersistentVariables as jest.Mock).mockReturnValue([
      initialVariables,
      mockSetVariables,
    ]);
  });

  test('returns initial variables', () => {
    const { result } = renderHook(() => useVariableActions('user-1'));
    expect(result.current.variables).toEqual(initialVariables);
  });

  test('does not add variable with empty name', () => {
    const { result } = renderHook(() => useVariableActions('user-1'));
    const newVar: Variable = { name: '   ', value: '456', description: '' };

    const success = result.current.add(newVar);
    expect(success).toBe(false);
    expect(mockSetVariables).not.toHaveBeenCalled();
  });

  test('does not add variable if name already exists', () => {
    const { result } = renderHook(() => useVariableActions('user-1'));
    const newVar: Variable = {
      name: 'EXISTING',
      value: '999',
      description: '',
    };

    const success = result.current.add(newVar);
    expect(success).toBe(false);
    expect(mockSetVariables).not.toHaveBeenCalled();
  });
});
