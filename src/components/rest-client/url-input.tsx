import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';

interface UrlInputProps {
  value: string;
  onChange: (url: string) => void;
}
function UrlInput({ value, onChange }: UrlInputProps) {
  const t = useTranslations('rest-client');

  return (
    <Input
      type="text"
      placeholder={t('enterUrl')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default UrlInput;
