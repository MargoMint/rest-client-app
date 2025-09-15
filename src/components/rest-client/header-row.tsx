import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';

function HeaderRow() {
  return (
    <div className="flex gap-3">
      <Input type="text" placeholder="Header Key" />
      <Input type="text" placeholder="Header Value" />
      <Button variant="link" className="px-3">
        <Image src="/delete.png" alt="delete" width={45} height={45} priority />
      </Button>
    </div>
  );
}

export default HeaderRow;
