'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Toast from './toast';
import Typography from '@/components/typography';
import { fetchWithErrors, FetchResult } from '@/lib/fetchWithErrors';

type ApiResponse = { message: string } | Record<string, unknown>;

function UiDemoPage() {
  const [result, setResult] = useState<FetchResult<ApiResponse> | null>(null);

  const handleFetch = async (mode: string) => {
    setResult(null);
    const res = await fetchWithErrors<ApiResponse>(`/api/test?mode=${mode}`);
    setResult(res);
  };

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex items-center gap-6">
        <Typography variant="body" className="w-32">
          Buttons:
        </Typography>
        <div className="flex items-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="disabled">Disabled</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Typography variant="body" className="w-32">
          Select:
        </Typography>
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-6">
        <Typography variant="body" className="w-32">
          Input + Button:
        </Typography>
        <div className="flex max-w-sm items-center gap-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit" variant="outline">
            Send
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Typography variant="body" className="w-32">
          Tabs:
        </Typography>
        <Tabs>
          <TabsList>
            <TabsTrigger value="rest-client" asChild>
              <Link href="/client">REST Client</Link>
            </TabsTrigger>
            <TabsTrigger value="history" asChild>
              <Link href="/history">History</Link>
            </TabsTrigger>
            <TabsTrigger value="variables" asChild>
              <Link href="/variables">Variables</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-start gap-6">
        <Typography variant="body" className="w-32">
          Toasts:
        </Typography>
        <Toast />
      </div>

      <div className="flex flex-col gap-4">
        <Typography variant="body" className="w-32">
          API Test:
        </Typography>
        <div className="flex gap-2">
          <Button onClick={() => handleFetch('ok')}>200 OK</Button>
          <Button onClick={() => handleFetch('404')}>404</Button>
          <Button onClick={() => handleFetch('500')}>500</Button>
          <Button onClick={() => handleFetch('network')}>Network</Button>
        </div>

        {result?.type === 'http-error' && (
          <div className="rounded bg-red-100 p-4">
            <Typography variant="h3" className="font-bold text-red-600">
              HTTP {result.status}: {result.message}
            </Typography>
            <pre className="mt-2 text-sm">
              {JSON.stringify(result.body, null, 2)}
            </pre>
          </div>
        )}

        {result?.type === 'success' && (
          <pre className="rounded bg-green-100 p-4 text-sm">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        )}

        {result?.type === 'network-error' && (
          <Typography variant="body" className="text-yellow-600">
            Network error occurred. Please check your connection.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default UiDemoPage;
