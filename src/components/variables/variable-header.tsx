import { useTranslations } from 'next-intl';
import Typography from '../typography';

const columHeaders = ['name', 'value', 'description', 'actions'];

export function VariableHeader() {
  const t = useTranslations('VariableHeader');

  return (
    <div className="grid grid-cols-[repeat(3,1fr)_0.5fr] gap-4 border-b px-1 pb-2">
      {columHeaders.map((label) => (
        <Typography
          variant="body"
          className="text-[var(--primary)]"
          key={label}
        >
          {t(label)}
        </Typography>
      ))}
    </div>
  );
}
