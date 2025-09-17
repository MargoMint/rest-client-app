import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Variable } from '@/app/[locale]/variables/types';
import { VariableSelect } from './variable-select';

type Props = {
  variable: Variable;
  setVariable: (v: Variable) => void;
  onAdd: () => void;
};

export function VariableEditor({ variable, setVariable, onAdd }: Props) {
  return (
    <div className="grid grid-cols-5 items-center gap-4 border-t pt-2">
      <Input
        value={variable.name}
        onChange={(e) => setVariable({ ...variable, name: e.target.value })}
        placeholder="Name"
      />
      <Input
        value={variable.value}
        onChange={(e) => setVariable({ ...variable, value: e.target.value })}
        placeholder="Value"
      />
      <VariableSelect
        value={variable.type}
        onChange={(val) =>
          setVariable({ ...variable, type: val as Variable['type'] })
        }
        options={['string', 'number', 'boolean']}
        placeholder="Type"
      />
      <VariableSelect
        value={variable.scope}
        onChange={(val) =>
          setVariable({ ...variable, scope: val as Variable['scope'] })
        }
        options={['global', 'session', 'request']}
        placeholder="Scope"
      />
      <Button size="sm" onClick={onAdd}>
        Add
      </Button>
    </div>
  );
}
