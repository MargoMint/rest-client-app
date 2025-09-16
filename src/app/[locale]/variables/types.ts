export type VariableScope = 'global' | 'session' | 'request';

export type VariableType = 'string' | 'number' | 'boolean';

export type Variable = {
  id?: string;
  name: string;
  value: string;
  type: VariableType;
  scope: VariableScope;
  description?: string;
};
