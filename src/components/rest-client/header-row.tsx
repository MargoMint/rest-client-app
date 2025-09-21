import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Variable } from '@/app/[locale]/variables/types';
import { useState } from 'react';

interface HeaderRowProps {
  id: string;
  headerKey: string;
  headerValue: string;
  onChange: (id: string, key: string, value: string) => void;
  onDelete: () => void;
  variables: Variable[];
}

function HeaderRow({
  id,
  headerKey,
  headerValue,
  onChange,
  onDelete,
  variables,
}: HeaderRowProps) {
  const t = useTranslations('restClient');
  const [showList, setShowList] = useState(false);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(id, headerKey, val);
    setShowList(val.endsWith('{{'));
  };

  const insertVariable = (name: string) => {
    const replaced = headerValue.replace(/{{$/, `{{${name}}}`);
    onChange(id, headerKey, replaced);
    setShowList(false);
  };
  return (
    <div className="relative flex gap-3">
      <Input
        type="text"
        placeholder={t('headerKey')}
        value={headerKey}
        onChange={(e) => onChange(id, e.target.value, headerValue)}
      />
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={t('headerValue')}
          value={headerValue}
          onChange={handleValueChange}
        />
        {showList && (
          <ul className="bg-background absolute z-10 mt-1 w-full rounded border text-sm shadow">
            {variables.map((v) => (
              <li
                key={v.name}
                className="hover:bg-muted cursor-pointer px-2 py-1"
                onMouseDown={() => insertVariable(v.name)}
              >
                <code>{`{{${v.name}}}`}</code>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button variant="link" className="px-3" type="button" onClick={onDelete}>
        <Image src="/delete.png" alt="delete" width={40} height={40} priority />
      </Button>
    </div>
  );
}

export default HeaderRow;
