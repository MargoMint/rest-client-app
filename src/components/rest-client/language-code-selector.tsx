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
  variant: string;
  onLanguageChange: (langKey: string) => void;
  onVariantChange: (variantKey: string) => void;
};

export default function LanguageCodeSelector({
  languages,
  language,
  variant,
  onLanguageChange,
  onVariantChange,
}: Props) {
  const currentLang = languages.find((l) => l.key === language);

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

      {currentLang?.variants && currentLang.variants.length > 1 && (
        <Select value={variant} onValueChange={onVariantChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            {currentLang?.variants.map((v) => (
              <SelectItem key={v.key} value={v.key}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
