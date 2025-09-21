'use client';

import { CodegenLanguage } from 'postman-code-generators';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Props = {
  languages: CodegenLanguage[];
  language: string;
  onLanguageChange: (langKey: string) => void;
};

export default function LanguageCodeSelector({
  languages,
  language,
  onLanguageChange,
}: Props) {
  return (
    <div className="mb-3 flex gap-2">
      <Select value={language} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.key} value={lang.key}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
