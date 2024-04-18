import { compare, hash } from 'bcryptjs';

export async function hashPassword(password: string) {
  return await password;
}

export async function verifyPassword(password: any, hashedPassword: any) {
  return await compare(password, hashedPassword);
}
