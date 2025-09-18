import HeaderRow from './header-row';
import { Button } from '../ui/button';
import Image from 'next/image';
import { addHeader, updateHeader, deleteHeader } from '@/utils/headers';
import { useTranslations } from 'next-intl';

interface HeadersEditorProps {
  value: Record<string, string>;
  onChange: (headers: Record<string, string>) => void;
}

function HeadersEditor({ value, onChange }: HeadersEditorProps) {
  const t = useTranslations('rest-client');

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(value).map(([key, val]) => (
        <HeaderRow
          key={key}
          headerKey={key}
          headerValue={val}
          onChange={(newKey, newVal) =>
            onChange(updateHeader(value, key, newKey, newVal))
          }
          onDelete={() => onChange(deleteHeader(value, key))}
        />
      ))}
      <Button
        variant="outline"
        className="flex w-fit items-center gap-2 px-3"
        type="button"
        onClick={() => onChange(addHeader(value))}
        asChild
      >
        <Image src="/add.png" alt="add" width={12} height={12} priority />
        {t('addHeader')}
      </Button>
    </div>
  );
}

export default HeadersEditor;
