import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

function MethodSelector() {
  return (
    <Select defaultValue="GET">
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
