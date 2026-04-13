import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
    PORT: z.string().default('3001'),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),

    DATABASE_URL: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URI: z
        .string()
        .default('http://localhost:3001/auth/google/callback'),

    JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),

    FRONTEND_URL: z.string().default('http://localhost:5173'),

    FIREBASE_PROJECT_ID: z.string().optional(),
    FIREBASE_CLIENT_EMAIL: z.string().optional(),
    FIREBASE_PRIVATE_KEY: z.string().optional(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
    console.error('Environment validation failed:', parsedEnv.error.errors)
    process.exit(1)
}

export const env = parsedEnv.data

export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
