import bcrypt from "bcrypt";

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const verifyPassword = (pwd: string, hash: string) => bcrypt.compare(pwd, hash);