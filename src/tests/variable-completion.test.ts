import { variableCompletion } from '@/lib/variables/variable-completion';
import {
  autocompletion,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import { Variable } from '@/app/[locale]/variables/types';

jest.mock('@codemirror/autocomplete', () => ({
  autocompletion: jest.fn((opts) => opts),
}));

describe('variableCompletion', () => {
  const variables: Variable[] = [
    { name: 'firstName', value: 'ExampleFirstName', description: 'First name' },
    { name: 'lastName', value: 'ExampleLastName', description: 'Last name' },
  ];

  type OverrideFunction = (ctx: CompletionContext) => CompletionResult | null;

  test('should call autocompletion with override function', () => {
    const result = variableCompletion(variables) as ReturnType<
      typeof autocompletion
    > & {
      override: OverrideFunction[];
    };

    expect(result.override).toHaveLength(1);
    expect(typeof result.override[0]).toBe('function');
  });

  test('should return null if no match before cursor', () => {
    const ctx: CompletionContext = {
      matchBefore: jest.fn().mockReturnValue(null),
    } as unknown as CompletionContext;

    const result = variableCompletion(variables) as ReturnType<
      typeof autocompletion
    > & {
      override: OverrideFunction[];
    };
    const overrideFn = result.override[0];

    const completion = overrideFn(ctx);

    expect(completion).toBeNull();
    expect(ctx.matchBefore).toHaveBeenCalledWith(/{{\w*$/);
  });

  test('should return options when matchBefore finds a variable start', () => {
    const ctx: CompletionContext = {
      matchBefore: jest.fn().mockReturnValue({ from: 5 }),
    } as unknown as CompletionContext;

    const result = variableCompletion(variables) as ReturnType<
      typeof autocompletion
    > & {
      override: OverrideFunction[];
    };
    const overrideFn = result.override[0];

    const completion = overrideFn(ctx);

    expect(completion).toEqual({
      from: 5,
      options: [
        { label: '{{firstName}}', type: 'variable', apply: '{{firstName}}' },
        { label: '{{lastName}}', type: 'variable', apply: '{{lastName}}' },
      ],
    });
  });
});
