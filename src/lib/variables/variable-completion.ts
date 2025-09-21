import { Variable } from '@/app/[locale]/variables/types';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';

export function variableCompletion(variables: Variable[]) {
  return autocompletion({
    override: [
      (ctx: CompletionContext) => {
        const word = ctx.matchBefore(/{{\w*$/);
        if (!word) return null;

        return {
          from: word.from,
          options: variables.map((variable) => ({
            label: `{{${variable.name}}}`,
            type: 'variable',
            apply: `{{${variable.name}`,
          })),
        };
      },
    ],
  });
}
