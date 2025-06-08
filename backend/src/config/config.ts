import dotenv from 'dotenv';
import { JwtPayload } from '../models/interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

dotenv.config();

interface Config {
  port: number;
  dbName:string;
  dbUser:string;
  dbPass: string;
  dbHost: string;
  jwtSecret: string;
  adminSecret: string;
}
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
const config: Config = {
  port: Number(process.env.PORT) || 5000,
  dbName: getEnvVar("DB_NAME"),
  dbUser: getEnvVar("DB_USER"),
  dbPass: getEnvVar("DB_PASS"),
  dbHost: getEnvVar("DB_HOST"),
  jwtSecret: getEnvVar("JWT_SECRET"),
  adminSecret: getEnvVar("ADMIN_SECRET")
};

export default config;