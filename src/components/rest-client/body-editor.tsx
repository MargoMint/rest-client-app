import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { monokaiDimmed } from '@uiw/codemirror-theme-monokai-dimmed';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function BodyEditor({ value, onChange }: BodyEditorProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <CodeMirror
        value={value}
        height="300px"
        extensions={[json()]}
        placeholder="Enter request body here (JSON or text)"
        onChange={(val) => onChange(val)}
        theme={monokaiDimmed}
      />
    </div>
  );
}

export default BodyEditor;
