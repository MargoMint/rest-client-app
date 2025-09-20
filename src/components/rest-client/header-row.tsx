import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface HeaderRowProps {
  id: string;
  headerKey: string;
  headerValue: string;
  onChange: (id: string, key: string, value: string) => void;
  onDelete: () => void;
}

function HeaderRow({
  id,
  headerKey,
  headerValue,
  onChange,
  onDelete,
}: HeaderRowProps) {
  const t = useTranslations('restClient');
  return (
    <div className="flex gap-3">
      <Input
        type="text"
        placeholder={t('headerKey')}
        value={headerKey}
        onChange={(e) => onChange(id, e.target.value, headerValue)}
      />
      <Input
        type="text"
        placeholder={t('headerValue')}
        value={headerValue}
        onChange={(e) => onChange(id, headerKey, e.target.value)}
      />
      <Button variant="link" className="px-3" type="button" onClick={onDelete}>
        <Image src="/delete.png" alt="delete" width={40} height={40} priority />
      </Button>
    </div>
  );
}

export default HeaderRow;
