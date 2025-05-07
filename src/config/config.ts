import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  DB_URL: string;
  NODE_ENV: string;
  CLIENT_URL: string;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  DB_URL: process.env.DB_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};

if (!config.DB_URL) {
  throw new Error('DB_URL is not defined in the environment variables');
}
if (!config.CLIENT_URL) {
  throw new Error('CLIENT_URL is not defined in the environment variables');
}

export default config;