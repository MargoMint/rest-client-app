import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Variable } from '@/app/[locale]/variables/types';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  variable: Variable;
  update: (id: string, patch: Partial<Variable>) => void;
  remove: (id: string) => void;
};

export function VariableRow({ variable, update, remove }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="grid grid-cols-[repeat(3,1fr)_0.5fr] items-center gap-4">
      <Input
        value={variable.name}
        onChange={(e) => update(variable.name, { name: e.target.value })}
        className="font-semibold placeholder:font-normal"
        disabled={!isEditing}
      />
      <Input
        value={variable.value}
        onChange={(e) => update(variable.name, { value: e.target.value })}
        className="font-semibold placeholder:font-normal"
        disabled={!isEditing}
      />
      <Input
        value={variable.description ?? ''}
        onChange={(e) => update(variable.name, { description: e.target.value })}
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
        <Button
          variant="link"
          className="px-3"
          onClick={() => remove(variable.name)}
        >
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
