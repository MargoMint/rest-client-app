import HeaderRow from './header-row';
import { Button } from '../ui/button';
import Image from 'next/image';

function HeadersEditor() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderRow />
      <Button
        variant="outline"
        className="flex w-fit items-center gap-2 px-3"
        asChild
      >
        <Image src="/add.png" alt="add" width={12} height={12} priority />
        Add Header
      </Button>
    </div>
  );
}

export default HeadersEditor;
