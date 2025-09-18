import { usePersistentVariables } from './use-persistent-variables';
import { Variable } from '@/app/[locale]/variables/types';

export function useVariableActions(userId: string) {
  const [variables, setVariables] = usePersistentVariables(userId);

  const add = (newVariable: Variable): boolean => {
    const trimmedName = newVariable.name.trim();
    if (!trimmedName) return false;

    const nameExists = variables.some((v) => v.name === trimmedName);
    if (nameExists) return false;

    setVariables((prev) => [...prev, { ...newVariable, name: trimmedName }]);
    return true;
  };

  const update = (name: string, patch: Partial<Variable>) => {
    setVariables((prev) =>
      prev.map((v) => (v.name === name ? { ...v, ...patch } : v)),
    );
  };

  const remove = (name: string) => {
    setVariables((prev) => prev.filter((v) => v.name !== name));
  };

  return {
    variables,
    add,
    update,
    remove,
    setVariables,
  };
}
