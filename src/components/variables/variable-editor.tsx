import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Variable } from '@/app/[locale]/variables/types';
// import { VariableSelect } from './variable-select';
import Image from 'next/image';

type Props = {
  variable: Variable;
  setVariable: (v: Variable) => void;
  onAdd: () => void;
};

export function VariableEditor({ variable, setVariable, onAdd }: Props) {
  return (
    <div className="grid grid-cols-[repeat(3,1fr)_0.5fr] gap-4">
      <Input
        value={variable.name}
        onChange={(e) => setVariable({ ...variable, name: e.target.value })}
        placeholder="Name"
        className="font-semibold placeholder:font-normal"
      />
      <Input
        value={variable.value}
        onChange={(e) => setVariable({ ...variable, value: e.target.value })}
        placeholder="Value"
        className="font-semibold placeholder:font-normal"
      />
      {/* <VariableSelect
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
      /> */}
      <Input
        value={variable.description ?? ''}
        onChange={(e) =>
          setVariable({ ...variable, description: e.target.value })
        }
        placeholder="Description"
        className="font-semibold placeholder:font-normal"
      />
      <div>
        <Button variant="link" className="px-3" onClick={onAdd}>
          <Image src="/add.png" alt="add" width={18} height={18} priority />
        </Button>
      </div>
    </div>
  );
}
