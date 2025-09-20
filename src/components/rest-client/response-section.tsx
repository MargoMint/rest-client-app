'use client';

import Typography from '../typography';
import { useTranslations } from 'next-intl';
import { FetchResult } from '@/lib/fetchWithErrors';

interface ResponseSectionProps {
  result: FetchResult | null;
}

export default function ResponseSection({ result }: ResponseSectionProps) {
  const t = useTranslations('restClient');

  const renderData = (data: unknown) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const renderStatus = () => {
    if (!result) return '—';
    if (
      'status' in result &&
      result.status !== undefined &&
      result.status !== null
    ) {
      return result.status;
    }
    if (result.type === 'network-error') return 'N/A';
    return '—';
  };

  return (
    <div data-testid="response-section" className="flex flex-col gap-2">
      {!result ? (
        <Typography variant="caption" className="text-gray-500">
          {t('noResponse')}
        </Typography>
      ) : (
        <>
          <Typography variant="caption" className="text-[var(--primary)]">
            {t('responseStatus')}: {renderStatus()}
          </Typography>

          {(() => {
            switch (result.type) {
              case 'success':
                return (
                  <pre className="rounded bg-green-100 p-4 text-sm text-green-800">
                    {renderData(result.data)}
                  </pre>
                );

              case 'http-error':
                return (
                  <div className="rounded bg-red-100 p-4">
                    <Typography variant="h3" className="font-bold text-red-600">
                      HTTP {result.status}: {result.message}
                    </Typography>
                    <pre className="mt-2 text-sm text-red-800">
                      {renderData(result.body)}
                    </pre>
                  </div>
                );

              case 'network-error':
                return (
                  <Typography variant="body" className="text-yellow-600">
                    {t('networkError')}: {result.message}
                  </Typography>
                );

              default:
                return null;
            }
          })()}
        </>
      )}
    </div>
  );
}
