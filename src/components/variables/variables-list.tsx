'use client';

import { useState } from 'react';
import { Variable } from '@/app/[locale]/variables/types';
import { VariableHeader } from './variable-header';
import { VariableRow } from './variable-row';
import { VariableEditor } from './variable-editor';

type Props = {
  initialVariables?: Variable[];
};

export default function VariableList({ initialVariables = [] }: Props) {
  const [variables, setVariables] = useState<Variable[]>(initialVariables);
  const [newVariable, setNewVariable] = useState<Variable>({
    name: '',
    value: '',
    type: 'string',
    scope: 'global',
    description: '',
  });

  const update = (i: number, patch: Partial<Variable>) =>
    setVariables((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, ...patch } : v)),
    );

  const remove = (i: number) =>
    setVariables((prev) => prev.filter((_, idx) => idx !== i));

  const add = () => {
    if (!newVariable.name.trim()) return;
    setVariables((prev) => [...prev, newVariable]);
    setNewVariable({ name: '', value: '', type: 'string', scope: 'global' });
  };

  return (
    <div className="space-y-2">
      <VariableHeader />

      {variables.map((v, i) => (
        <VariableRow
          key={i}
          variable={v}
          index={i}
          update={update}
          remove={remove}
        />
      ))}
      <VariableEditor
        variable={newVariable}
        setVariable={setNewVariable}
        onAdd={add}
      />
    </div>
  );
}
