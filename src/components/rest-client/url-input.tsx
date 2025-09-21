import { useState } from 'react';
import { Variable } from '@/app/[locale]/variables/types';
import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';

interface UrlInputProps {
  value: string;
  onChange: (url: string) => void;
  variables: Variable[];
}

function UrlInput({ value, onChange, variables }: UrlInputProps) {
  const t = useTranslations('restClient');
  const [showList, setShowList] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eValue = e.target.value;
    onChange(eValue);
    setShowList(eValue.endsWith('{{'));
  };

  const insertVariable = (name: string) => {
    const replaced = value.replace(/{{$/, `{{${name}}}`);
    onChange(replaced);
    setShowList(false);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder={t('enterUrl')}
        value={value}
        onChange={handleChange}
      />
      {showList && (
        <ul className="bg-background absolute z-10 mt-1 w-full rounded border text-sm shadow">
          {variables.map((variable) => (
            <li
              key={variable.name}
              className="hover:bg-muted cursor-pointer px-2 py-1"
              onMouseDown={() => insertVariable(variable.name)}
            >
              <code>{`{{${variable.name}}}`}</code>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UrlInput;
