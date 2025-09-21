'use client';

import Typography from '../typography';
import { useEffect, useState } from 'react';
import codegen, {
  CodegenLanguage,
  CodegenOption,
} from 'postman-code-generators';
import sdk from 'postman-collection';
import { Variable } from '@/app/[locale]/variables/types';
import { HeaderItem } from '@/utils/headers';
import { resolveVariables } from '@/lib/variables/resolve-variables';
import LanguageCodeSelector from './language-code-selector';

type Props = {
  url: string;
  method: string;
  headers: HeaderItem[];
  body: string;
  variables: Variable[];
};

function CodeGenerator({ url, method, headers, body, variables }: Props) {
  const [languages, setLanguages] = useState<CodegenLanguage[]>([]);
  const [language, setLanguage] = useState('');
  const [variant, setVariant] = useState('');
  const [options, setOptions] = useState<CodegenOption[]>([]);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const langs = codegen.getLanguageList();
    setLanguages(langs);
    if (langs.length) {
      const firstLang = langs[0];
      setLanguage(firstLang.key);
      setVariant(firstLang.variants[0]?.key ?? '');
    }
  }, []);

  useEffect(() => {
    if (!language || !variant) return;
    codegen.getOptions(language, variant, (err, opts) => {
      if (!err) setOptions(opts);
    });
  }, [language, variant]);

  useEffect(() => {
    if (!url || !method) {
      setError('Not enough data to generate code');
      setCode('');
      return;
    }
    setError('');

    const resolvedUrl = resolveVariables(url, variables);
    const resolvedHeaders = headers
      .filter((h) => h.key.trim())
      .map(({ key, value }) => ({
        key,
        value: resolveVariables(value, variables),
      }));
    const resolvedBody = resolveVariables(body, variables);

    const request = new sdk.Request({
      url: resolvedUrl,
      method,
      header: resolvedHeaders,
      body: resolvedBody ? { mode: 'raw', raw: resolvedBody } : undefined,
    });

    const opts: Record<string, unknown> = options.reduce(
      (acc, opt) => {
        acc[opt.id] = opt.default;
        return acc;
      },
      {} as Record<string, unknown>,
    );

    codegen.convert(language, variant, request, opts, (err, snippet) => {
      if (err) {
        setError('Error generating code');
        setCode('');
        return;
      }
      setCode(snippet);
    });
  }, [url, method, headers, body, variables, language, variant, options]);

  return (
    <div className="mt-4 rounded border p-3">
      <Typography variant="caption">TODO: Code Generator</Typography>;
      <h3 className="mb-2 font-semibold">Generated code</h3>
      <LanguageCodeSelector
        languages={languages}
        language={language}
        variant={variant}
        onLanguageChange={(langKey) => {
          const lang = languages.find((l) => l.key === langKey);
          if (lang) {
            setLanguage(lang.key);
            setVariant(lang.variants[0].key);
          }
        }}
        onVariantChange={setVariant}
      />
      {error && <p className="text-red-500">{error}</p>}
      {!error && (
        <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm">
          {code}
        </pre>
      )}
    </div>
  );
}

export default CodeGenerator;
