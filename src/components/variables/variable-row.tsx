import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Variable } from '@/app/[locale]/variables/types';
import { VariableSelect } from './variable-select';

type Props = {
  variable: Variable;
  index: number;
  update: (i: number, patch: Partial<Variable>) => void;
  remove: (i: number) => void;
};

export function VariableRow({ variable, index, update, remove }: Props) {
  return (
    <div className="grid grid-cols-5 items-center gap-4">
      <Input
        value={variable.name}
        onChange={(e) => update(index, { name: e.target.value })}
      />
      <Input
        value={String(variable.value)}
        onChange={(e) => update(index, { value: e.target.value })}
      />
      <VariableSelect
        value={variable.type}
        onChange={(val) => update(index, { type: val as Variable['type'] })}
        options={['string', 'number', 'boolean']}
      />
      <VariableSelect
        value={variable.scope}
        onChange={(val) => update(index, { scope: val as Variable['scope'] })}
        options={['global', 'session', 'request']}
      />
      <Button variant="link" className="px-3" onClick={() => remove(index)}>
        Delete
      </Button>
    </div>
  );
}
