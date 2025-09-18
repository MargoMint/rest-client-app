import Typography from '../typography';
import { useTranslations } from 'next-intl';

interface ResponseSectionProps {
  status: number | null;
  data: unknown;
}
function ResponseSection({ status, data }: ResponseSectionProps) {
  const t = useTranslations('rest-client');

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="caption" className="text-[var(--primary)]">
        {t('responseStatus')}: {status ?? '—'}
      </Typography>
      <Typography variant="caption">
        <pre className="overflow-x-auto rounded-md bg-[var(--gray-100)] p-3">
          {data ? JSON.stringify(data, null, 2) : t('noResponse')}
        </pre>
      </Typography>
    </div>
  );
}

export default ResponseSection;
