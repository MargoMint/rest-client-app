import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { monokaiDimmed } from '@uiw/codemirror-theme-monokai-dimmed';
import { useTranslations } from 'next-intl';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function BodyEditor({ value, onChange }: BodyEditorProps) {
  const t = useTranslations('rest-client');

  return (
    <div className="overflow-hidden rounded-md border">
      <CodeMirror
        value={value}
        height="300px"
        extensions={[json()]}
        placeholder={t('enterBody')}
        onChange={(val) => onChange(val)}
        theme={monokaiDimmed}
      />
    </div>
  );
}

export default BodyEditor;
