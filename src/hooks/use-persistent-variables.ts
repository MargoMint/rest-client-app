import { Variable } from '@/app/[locale]/variables/types';
import { useEffect, useState } from 'react';

const STORAGE_PREFIX = 'variables:';

function getUserKey(userId: string) {
  return STORAGE_PREFIX + btoa(userId);
}

export function usePersistentVariables(userId: string) {
  const [variables, setVariables] = useState<Variable[]>(() => {
    try {
      const raw = localStorage.getItem(getUserKey(userId));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(getUserKey(userId), JSON.stringify(variables));
  }, [userId, variables]);

  return [variables, setVariables] as const;
}
