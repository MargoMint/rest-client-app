declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';

  export type CodegenVariant = {
    key: string;
    label: string;
  };

  export type CodegenLanguage = {
    key: string;
    label: string;
    syntax_mode: string;
    variants: CodegenVariant[];
  };

  export type CodegenOption = {
    id: string;
    name: string;
    type: string;
    default: string | number | boolean | string[] | number[] | boolean[] | null;
  };

  export function getLanguageList(): CodegenLanguage[];

  export function getOptions(
    language: string,
    variant: string,
    callback: (err: Error | null, options: CodegenOption[]) => void,
  ): void;

  export function convert(
    language: string,
    variant: string,
    request: Request,
    options: Record<string, unknown>,
    callback: (err: Error | null, snippet: string) => void,
  ): void;
}
