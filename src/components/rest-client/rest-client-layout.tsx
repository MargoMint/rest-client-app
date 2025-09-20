'use client';

import { useState } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MethodSelector from '@/components/rest-client/method-selector';
import UrlInput from '@/components/rest-client/url-input';
import HeadersEditor from '@/components/rest-client/headers-editor';
import BodyEditor from '@/components/rest-client/body-editor';
import ResponseSection from '@/components/rest-client/response-section';
import CodeGenerator from '@/components/rest-client/code-generator';
import { useTranslations } from 'next-intl';
import { fetchWithErrors, FetchResult } from '@/lib/fetchWithErrors';
import { HeaderItem, addHeaderItem } from '@/utils/headers';
import { usePersistentVariables } from '@/hooks/use-persistent-variables';
import { resolveVariables } from '@/lib/variables.ts/resolve-variables';

type Props = {
  userId?: string;
};

function RestClientLayout({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<FetchResult | null>(null);

  const [headers, setHeaders] = useState<HeaderItem[]>(addHeaderItem([]));

  const [body, setBody] = useState<string>('');
  const [bodyMode, setBodyMode] = useState<'json' | 'text'>('json');

  const buttonTranslations = useTranslations('buttons');
  const textTranslations = useTranslations('restClient');

  const [variables] = usePersistentVariables(userId ?? '');
  const resolvedUrl = resolveVariables(url, variables);

  const handleSend = async () => {
    const res: FetchResult = await fetchWithErrors(url, { method });
    setResult(res);

    if (res.type === 'success') {
      const encodedUrl = btoa(url).replace(/=+$/, '');
      router.push({
        pathname,
        query: { method, url: encodedUrl, body: '' },
      });
    }
  };

  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex flex-col gap-2 rounded-md p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <MethodSelector value={method} onChange={setMethod} />
          <UrlInput value={url} onChange={setUrl} variables={variables} />
          <Button type="button" variant="default" onClick={handleSend}>
            {buttonTranslations('send')}
          </Button>
        </div>
        <Tabs defaultValue="headers-editor">
          <TabsList className="w-fit bg-transparent p-0">
            <TabsTrigger value="headers-editor" className="text-[var(--dark)]">
              {textTranslations('headers')}
            </TabsTrigger>
            <TabsTrigger value="body-editor" className="text-[var(--dark)]">
              {textTranslations('body')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="headers-editor">
            <HeadersEditor value={headers} onChange={setHeaders} />
          </TabsContent>
          <TabsContent value="body-editor">
            <BodyEditor
              value={body}
              onChange={setBody}
              mode={bodyMode}
              onModeChange={setBodyMode}
              variables={variables}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col gap-2 rounded-md p-3 shadow-sm">
        <ResponseSection result={result} />
        <CodeGenerator />
      </div>
    </div>
  );
}

export default RestClientLayout;
