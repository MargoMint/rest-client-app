import { EnvVar } from './env-vars';

export function getEnv(name: EnvVar): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}
