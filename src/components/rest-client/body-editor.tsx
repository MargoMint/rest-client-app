import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { monokaiDimmed } from '@uiw/codemirror-theme-monokai-dimmed';

function BodyEditor() {
  return (
    <div className="overflow-hidden rounded-md border">
      <CodeMirror
        height="300px"
        extensions={[json()]}
        placeholder="Enter request body here (JSON or text)"
        theme={monokaiDimmed}
      />
    </div>
  );
}

export default BodyEditor;
