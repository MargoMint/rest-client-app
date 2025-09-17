import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Variable } from '@/app/[locale]/variables/types';
import Image from 'next/image';
import { useState } from 'react';
// import { VariableSelect } from './variable-select';

type Props = {
  variable: Variable;
  index: number;
  update: (i: number, patch: Partial<Variable>) => void;
  remove: (i: number) => void;
};

export function VariableRow({ variable, index, update, remove }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="grid grid-cols-[repeat(3,1fr)_0.5fr] items-center gap-4">
      <Input
        value={variable.name}
        onChange={(e) => update(index, { name: e.target.value })}
        className="font-semibold placeholder:font-normal"
        disabled={!isEditing}
      />
      <Input
        value={String(variable.value)}
        onChange={(e) => update(index, { value: e.target.value })}
        className="font-semibold placeholder:font-normal"
        disabled={!isEditing}
      />
      {/* <VariableSelect
        value={variable.type}
        onChange={(val) => update(index, { type: val as Variable['type'] })}
        options={['string', 'number', 'boolean']}
      />
      <VariableSelect
        value={variable.scope}
        onChange={(val) => update(index, { scope: val as Variable['scope'] })}
        options={['global', 'session', 'request']}
      /> */}
      <Input
        value={variable.description ?? ''}
        onChange={(e) => update(index, { description: e.target.value })}
        placeholder="Description"
        className="font-semibold placeholder:font-normal"
        disabled={!isEditing}
      />
      <div>
        {isEditing ? (
          <Button
            variant="link"
            className="px-3"
            onClick={() => setIsEditing(false)}
          >
            <Image src="/save.png" alt="save" width={24} height={24} priority />
          </Button>
        ) : (
          <Button
            variant="link"
            className="px-3"
            onClick={() => setIsEditing(true)}
          >
            <Image src="/edit.png" alt="edit" width={24} height={24} priority />
          </Button>
        )}
        <Button variant="link" className="px-3" onClick={() => remove(index)}>
          <Image
            src="/delete.png"
            alt="delete"
            width={24}
            height={24}
            priority
          />
        </Button>
      </div>
    </div>
  );
}
