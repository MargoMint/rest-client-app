import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';

interface HeaderRowProps {
  headerKey: string;
  headerValue: string;
  onChange: (key: string, value: string) => void;
  onDelete: () => void;
}

function HeaderRow({
  headerKey,
  headerValue,
  onChange,
  onDelete,
}: HeaderRowProps) {
  return (
    <div className="flex gap-3">
      <Input
        type="text"
        placeholder="Header Key"
        value={headerKey}
        onChange={(e) => onChange(e.target.value, headerValue)}
      />
      <Input
        type="text"
        placeholder="Header Value"
        value={headerValue}
        onChange={(e) => onChange(headerKey, e.target.value)}
      />
      <Button variant="link" className="px-3" type="button" onClick={onDelete}>
        <Image src="/delete.png" alt="delete" width={40} height={40} priority />
      </Button>
    </div>
  );
}

export default HeaderRow;
