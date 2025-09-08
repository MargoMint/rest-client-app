import Link from 'next/link';
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
import Toast from './Toast';

function UiDemoPage() {
  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex items-center gap-6">
        <span className="w-32">Buttons:</span>
        <div className="flex items-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="disabled">Disabled</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="w-32">Select:</span>
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
        <span className="w-32">Input + Button:</span>
        <div className="flex max-w-sm items-center gap-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit" variant="outline">
            Send
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="w-32">Tabs:</span>
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
        <span className="w-32">Toasts:</span>
        <Toast />
      </div>
    </div>
  );
}

export default UiDemoPage;
