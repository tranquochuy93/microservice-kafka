// import dotenv from 'dotenv';
// dotenv.config({ path: '.env' });

require('dotenv').config({ path: '.env' });

let isTest = process.env.NODE_ENV === 'test';
export const env = {
    DATABASE: {
        CONNECT: process.env.DATABASE_CONNECT as any,
        HOST: process.env.DATABASE_HOST,
        PORT: Number(process.env.DATABASE_PORT),
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD,
        NAME: process.env.DATABASE_NAME,
    },
    ROOT_PATH: process.cwd() + (isTest ? '/src' : ''),
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRE: process.env.JWT_EXPIRE || '7d',
    }
};