'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MethodSelector from '@/components/rest-client/method-selector';
import UrlInput from '@/components/rest-client/url-input';
import HeadersEditor from '@/components/rest-client/headers-editor';
import BodyEditor from '@/components/rest-client/body-editor';
import ResponseSection from '@/components/rest-client/response-section';
import CodeGenerator from '@/components/rest-client/code-generator';
import { useRouter, usePathname } from 'next/navigation';

function RestClientLayout() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<unknown>(null);

  const [headers, setHeaders] = useState<Record<string, string>>({
    'Content-Type': 'application/json',
  });
  const [body, setBody] = useState<string>('');

  const router = useRouter();
  const pathname = usePathname();

  const handleSend = async () => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (method !== 'GET' && method !== 'DELETE' && body) {
        options.body = body;
      }

      const response = await fetch(url, options);
      const data = await response.json();

      setStatus(response.status);
      setResponseData(data);

      router.push(
        `${pathname}?method=${method}&url=${encodeURIComponent(url)}`,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus(null);
        setResponseData({ error: error.message });
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex flex-col gap-2 rounded-md p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <MethodSelector value={method} onChange={setMethod} />
          <UrlInput value={url} onChange={setUrl} />
          <Button type="button" variant="default" onClick={handleSend}>
            Send
          </Button>
        </div>
        <Tabs defaultValue="headers-editor">
          <TabsList className="w-fit bg-transparent p-0">
            <TabsTrigger value="headers-editor" className="text-[var(--dark)]">
              Header
            </TabsTrigger>
            <TabsTrigger value="body-editor" className="text-[var(--dark)]">
              Body
            </TabsTrigger>
          </TabsList>
          <TabsContent value="headers-editor">
            <HeadersEditor value={headers} onChange={setHeaders} />
          </TabsContent>
          <TabsContent value="body-editor">
            <BodyEditor value={body} onChange={setBody} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col gap-2 rounded-md p-3 shadow-sm">
        <ResponseSection status={status} data={responseData} />
        <CodeGenerator />
      </div>
    </div>
  );
}

export default RestClientLayout;
