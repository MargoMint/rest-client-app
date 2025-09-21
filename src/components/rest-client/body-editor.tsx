import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { monokaiDimmed } from '@uiw/codemirror-theme-monokai-dimmed';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Mode } from './rest-client-layout';
import { variableCompletion } from '@/lib/variables.ts/variable-completion';
import { Variable } from '@/app/[locale]/variables/types';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  variables: Variable[];
}

function BodyEditor({
  value,
  onChange,
  mode,
  onModeChange,
  variables,
}: BodyEditorProps) {
  const t = useTranslations('restClient');

  const handlePrettify = () => {
    if (mode === 'json' && value.trim()) {
      const pretty = JSON.stringify(JSON.parse(value), null, 2);
      onChange(pretty);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end gap-2">
        {mode === 'json' && (
          <Button
            type="button"
            variant="link"
            onClick={handlePrettify}
            className="px-2"
          >
            <span title={t('titleForText')}>
              <Image
                src="/code-format.png"
                alt="code-format"
                width={25}
                height={25}
                priority
              />
            </span>
          </Button>
        )}

        <Select value={mode} onValueChange={onModeChange}>
          <SelectTrigger className="w-[120px] bg-neutral-800 text-neutral-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json" className="uppercase">
              JSON
            </SelectItem>
            <SelectItem value="text">{t('selectText')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-hidden rounded-md border">
        <CodeMirror
          value={value}
          height="300px"
          extensions={
            mode === 'json' ? [json(), variableCompletion(variables)] : []
          }
          placeholder={t('enterBody')}
          onChange={(val) => onChange(val)}
          theme={monokaiDimmed}
        />
      </div>
    </div>
  );
}

export default BodyEditor;
