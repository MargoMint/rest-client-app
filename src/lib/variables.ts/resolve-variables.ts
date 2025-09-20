import { Variable } from '@/app/[locale]/variables/types';

export function resolveVariables(input: string, variables: Variable[]): string {
  return input.replace(/{{(.*?)}}/g, (_, key) => {
    const match = variables.find((variable) => variable.name === key.trim());
    return match?.value ?? '';
  });
}
