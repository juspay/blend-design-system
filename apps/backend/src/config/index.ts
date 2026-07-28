import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
    PORT: z.string().default('8080'),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),

    DATABASE_URL: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URI: z
        .string()
        .default('http://localhost:3001/api/v1/auth/google/callback'),

    JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
    /** Short-lived token minted for CLI paste from Studio (default 10 minutes). */
    JWT_CLI_EXPORT_EXPIRES_IN: z.string().default('10m'),

    FRONTEND_URL: z.string().default('http://localhost:5173'),
    STUDIO_URL: z.string().default(''),
    /** Google Fonts Developer API key (optional; enables /api/google-fonts). */
    GOOGLE_FONTS_API_KEY: z.string().optional(),
})

const isValidUrl = (value: string): boolean => {
    try {
        new URL(value)
        return true
    } catch {
        return false
    }
}

const hasNonStandardHttpsPort = (value: string): boolean => {
    const parsed = new URL(value)
    return (
        parsed.protocol === 'https:' &&
        parsed.port !== '' &&
        parsed.port !== '443'
    )
}

const parsedEnv = envSchema
    .superRefine((data, ctx) => {
        if (!isValidUrl(data.GOOGLE_REDIRECT_URI)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['GOOGLE_REDIRECT_URI'],
                message: 'GOOGLE_REDIRECT_URI must be a valid absolute URL',
            })
        }

        if (data.NODE_ENV === 'production') {
            const frontendUrls = data.FRONTEND_URL.split(',').map((url) =>
                url.trim()
            )

            for (const frontendUrl of frontendUrls) {
                if (!isValidUrl(frontendUrl)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['FRONTEND_URL'],
                        message:
                            'FRONTEND_URL must contain valid absolute URLs in production',
                    })
                } else if (hasNonStandardHttpsPort(frontendUrl)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        path: ['FRONTEND_URL'],
                        message:
                            'FRONTEND_URL must not use non-443 HTTPS ports in production',
                    })
                }
            }
        }
    })
    .safeParse(process.env)

if (!parsedEnv.success) {
    console.error('Environment validation failed:', parsedEnv.error.errors)
    process.exit(1)
}

export const env = parsedEnv.data

export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
