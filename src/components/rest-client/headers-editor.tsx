import HeaderRow from './header-row';
import { Button } from '../ui/button';
import Image from 'next/image';
import {
  addHeaderItem,
  updateHeaderItem,
  deleteHeaderItem,
  HeaderItem,
} from '@/utils/headers';
import { useTranslations } from 'next-intl';
import { Variable } from '@/app/[locale]/variables/types';

interface HeadersEditorProps {
  value: HeaderItem[];
  onChange: (headers: HeaderItem[]) => void;
  variables: Variable[];
}

function HeadersEditor({ value, onChange, variables }: HeadersEditorProps) {
  const t = useTranslations('restClient');

  return (
    <div className="flex flex-col gap-4">
      {value.map((item) => (
        <HeaderRow
          key={item.id}
          id={item.id}
          headerKey={item.key}
          headerValue={item.value}
          onChange={(id, newKey, newVal) =>
            onChange(updateHeaderItem(value, id, newKey, newVal))
          }
          onDelete={() => onChange(deleteHeaderItem(value, item.id))}
          variables={variables}
        />
      ))}
      <Button
        variant="outline"
        type="button"
        onClick={() => onChange(addHeaderItem(value))}
        className="w-fit px-3"
      >
        <div className="flex items-center gap-2">
          <Image src="/add.png" alt="add" width={12} height={12} priority />
          {t('addHeader')}
        </div>
      </Button>
    </div>
  );
}

export default HeadersEditor;
