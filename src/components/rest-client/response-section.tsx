'use client';

import Typography from '../typography';
import { useTranslations } from 'next-intl';
import {
  FetchResult,
  SuccessResult,
  HttpErrorResult,
  NetworkErrorResult,
} from '@/lib/fetchWithErrors';
import React from 'react';

interface ResponseSectionProps {
  result: FetchResult | null;
}

type ResultMap = {
  success: SuccessResult<unknown>;
  'http-error': HttpErrorResult;
  'network-error': NetworkErrorResult;
};

export default function ResponseSection({ result }: ResponseSectionProps) {
  const t = useTranslations('restClient');

  const renderData = (data: unknown): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const renderStatus = () => {
    if (!result) return '—';
    if ('status' in result && result.status != null) return result.status;
    if (result.type === 'network-error') return 'N/A';
    return '—';
  };

  const renderVariants: {
    [K in keyof ResultMap]: (r: ResultMap[K]) => React.ReactNode;
  } = {
    success: (r) => (
      <pre
        className="rounded bg-green-100 p-4 text-sm text-green-800"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {typeof r.data === 'string' ? r.data : JSON.stringify(r.data, null, 2)}
      </pre>
    ),

    'http-error': (r) => (
      <div className="rounded bg-red-100 p-4">
        <Typography variant="h3" className="font-bold text-red-600">
          HTTP {r.status}: {r.message}
        </Typography>
        <pre
          className="mt-2 text-sm text-red-800"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {renderData(r.body)}
        </pre>
      </div>
    ),

    'network-error': (r) => (
      <Typography variant="body" className="text-yellow-600">
        {t('networkError')}: {r.message}
      </Typography>
    ),
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

          {result.type === 'success'
            ? renderVariants.success(result)
            : result.type === 'http-error'
              ? renderVariants['http-error'](result)
              : result.type === 'network-error'
                ? renderVariants['network-error'](result)
                : null}
        </>
      )}
    </div>
  );
}
