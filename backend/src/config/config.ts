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

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
  adminSecret: process.env.ADMIN_SECRET
};

export default config;