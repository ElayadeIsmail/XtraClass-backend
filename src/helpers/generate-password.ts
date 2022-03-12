import { randomBytes } from 'crypto';
export const generatePassword = (): string => {
  return randomBytes(4).toString('hex');
};
