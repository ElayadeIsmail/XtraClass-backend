import { randomBytes } from 'crypto';
export const generatePassword = (): string => {
  return randomBytes(5).toString('base64').replace('=', '');
};
