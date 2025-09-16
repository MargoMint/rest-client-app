'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Variable } from '@/app/[locale]/variables/types';

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
      {/* Заголовок */}
      <div className="text-muted-foreground grid grid-cols-5 gap-4 px-1 font-medium">
        <div>Name</div>
        <div>Value</div>
        <div>Type</div>
        <div>Scope</div>
        <div>Actions</div>
      </div>

      {/* Список переменных */}
      {variables.map((v, i) => (
        <div key={i} className="grid grid-cols-5 items-center gap-4">
          <Input
            value={v.name}
            onChange={(e) => update(i, { name: e.target.value })}
          />
          <Input
            value={String(v.value)}
            onChange={(e) => update(i, { value: e.target.value })}
          />
          <Select
            value={v.type}
            onValueChange={(val) =>
              update(i, { type: val as Variable['type'] })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={v.scope}
            onValueChange={(val) =>
              update(i, { scope: val as Variable['scope'] })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="session">Session</SelectItem>
              <SelectItem value="request">Request</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="link" className="px-3" onClick={() => remove(i)}>
            Delete
          </Button>
        </div>
      ))}

      {/* Добавление новой переменной */}
      <div className="grid grid-cols-5 items-center gap-4 border-t pt-2">
        <Input
          value={newVariable.name}
          onChange={(e) =>
            setNewVariable((v) => ({ ...v, name: e.target.value }))
          }
          placeholder="Name"
        />
        <Input
          value={newVariable.value}
          onChange={(e) =>
            setNewVariable((v) => ({ ...v, value: e.target.value }))
          }
          placeholder="Value"
        />
        <Select
          value={newVariable.type}
          onValueChange={(val) =>
            setNewVariable((v) => ({ ...v, type: val as Variable['type'] }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={newVariable.scope}
          onValueChange={(val) =>
            setNewVariable((v) => ({ ...v, scope: val as Variable['scope'] }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global</SelectItem>
            <SelectItem value="session">Session</SelectItem>
            <SelectItem value="request">Request</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" onClick={add}>
          Add
        </Button>
      </div>
    </div>
  );
}
