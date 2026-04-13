import pino from 'pino'
import { isDevelopment } from '@/config/index.js'

export const logger = pino({
    level: isDevelopment ? 'debug' : 'info',
    ...(isDevelopment && {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    }),
})
