import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];
interface MethodSelectorProps {
  value: string;
  onChange: (method: string) => void;
}
function MethodSelector({ value, onChange }: MethodSelectorProps) {
  return (
    <Select defaultValue="GET" value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {methods.map((method) => (
          <SelectItem key={method} value={method} className="uppercase">
            {method}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default MethodSelector;
