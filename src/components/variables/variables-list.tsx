'use client';

import { useState } from 'react';
import { VariableHeader } from './variable-header';
import { VariableRow } from './variable-row';
import { VariableEditor } from './variable-editor';
import { useVariableActions } from '@/hooks/use-variable-actions';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

type Props = {
  userId?: string;
};

function VariableList({ userId }: Props) {
  const t = useTranslations('VariableList');
  const { variables, add, update, remove } = useVariableActions(userId ?? '');
  const [newVariable, setNewVariable] = useState({
    name: '',
    value: '',
    description: '',
  });

  const handleAdd = () => {
    const success = add(newVariable);
    if (success) {
      setNewVariable({
        name: '',
        value: '',
        description: '',
      });
    } else {
      toast.error(t('duplicateName'));
    }
  };

  return (
    <div className="space-y-2">
      <VariableHeader />

      {variables.map((v) => (
        <VariableRow
          key={v.name}
          variable={v}
          update={update}
          remove={remove}
        />
      ))}
      <VariableEditor
        variable={newVariable}
        setVariable={setNewVariable}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default VariableList;
