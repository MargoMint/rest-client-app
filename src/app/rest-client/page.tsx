'use client';

import AppWrapper from '@/components/app-wrapper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MethodSelector from '@/components/rest-client/method-selector';
import UrlInput from '@/components/rest-client/url-input';
import HeadersEditor from '@/components/rest-client/headers-editor';
import BodyEditor from '@/components/rest-client/body-editor';
import ResponseSection from '@/components/rest-client/response-section';
import CodeGenerator from '@/components/rest-client/code-generator';

function RestClientLayout() {
  return (
    <AppWrapper>
      <div className="flex flex-col gap-10 p-4">
        <div className="flex flex-col gap-2 rounded-md p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <MethodSelector />
            <UrlInput />
            <Button type="submit" variant="default">
              Send
            </Button>
          </div>

          <Tabs defaultValue="headers-editor">
            <TabsList className="w-fit bg-transparent p-0">
              <TabsTrigger
                value="headers-editor"
                className="text-[var(--dark)]"
              >
                Header
              </TabsTrigger>
              <TabsTrigger value="body-editor" className="text-[var(--dark)]">
                Body
              </TabsTrigger>
            </TabsList>
            <TabsContent value="headers-editor">
              <HeadersEditor />
            </TabsContent>
            <TabsContent value="body-editor">
              <BodyEditor />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-2 rounded-md p-3 shadow-sm">
          <ResponseSection />
          <CodeGenerator />
        </div>
      </div>
    </AppWrapper>
  );
}

export default RestClientLayout;
