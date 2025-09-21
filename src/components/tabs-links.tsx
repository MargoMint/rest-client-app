'use client';

import { Link } from '@/i18n/navigation';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useTranslations } from 'next-intl';

function TabsLinks() {
  const t = useTranslations('tabsWrapper');

  return (
    <div className="flex flex-col items-center gap-4 pb-4">
      <Tabs className="mt-4">
        <TabsList>
          <Link href="/rest-client">
            <TabsTrigger value="rest-client">{t('client')}</TabsTrigger>
          </Link>
          <Link href="/history">
            <TabsTrigger value="history">{t('history')}</TabsTrigger>
          </Link>
          <Link href="/variables">
            <TabsTrigger value="variables">{t('variables')}</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
export default TabsLinks;
