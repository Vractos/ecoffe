import dotenv from 'dotenv';
import { Pool } from 'pg'
import { PrismaClient } from '../generated/client';

dotenv.config();

interface Config {
  PORT: number;
  DATABASE_URL: string;
  NODE_ENV: string;
  CLIENT_URL: string;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};

// TODO: Only initialize a db client if it will be used
export const prismaClient = new PrismaClient();

export const sqlPool = new Pool({
 host: process.env.POSTGRES_HOST,
 port: parseInt(process.env.POSTGRES_PORT || '5432'),
 user: process.env.POSTGRES_USER,
 password: process.env.POSTGRES_PASSWORD,
 database: process.env.POSTGRES_DB_NAME
})

if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export default config;