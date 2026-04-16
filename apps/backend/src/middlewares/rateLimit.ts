/**
 * Rate Limiting Middleware
 *
 * In-memory sliding-window rate limiter. For production at scale,
 * replace with Redis-backed solution (e.g. `rate-limit-redis`).
 *
 * Usage:
 *   app.use('/api', rateLimit({ windowMs: 60_000, max: 100 }))
 *   app.use('/api/auth', rateLimit({ windowMs: 60_000, max: 10 }))
 */

import type { Request, Response, NextFunction } from 'express'

interface RateLimitOptions {
    /** Time window in milliseconds. Default: 60 seconds. */
    windowMs?: number
    /** Maximum requests per window per IP. Default: 100. */
    max?: number
    /** Response message when rate limited. */
    message?: string
}

interface RequestRecord {
    count: number
    resetAt: number
}

export function rateLimit(options: RateLimitOptions = {}) {
    const windowMs = options.windowMs ?? 60_000
    const max = options.max ?? 100
    const message =
        options.message ?? 'Too many requests, please try again later'

    const store = new Map<string, RequestRecord>()

    // Cleanup expired entries every 5 minutes
    const cleanupInterval = setInterval(() => {
        const now = Date.now()
        for (const [key, record] of store) {
            if (record.resetAt <= now) {
                store.delete(key)
            }
        }
    }, 5 * 60_000)

    // Allow the timer to not prevent Node from exiting
    if (cleanupInterval.unref) {
        cleanupInterval.unref()
    }

    return (req: Request, res: Response, next: NextFunction): void => {
        const key = req.ip || req.socket.remoteAddress || 'unknown'
        const now = Date.now()
        const record = store.get(key)

        if (!record || record.resetAt <= now) {
            // First request in this window or window has expired
            store.set(key, { count: 1, resetAt: now + windowMs })
            res.setHeader('X-RateLimit-Limit', max)
            res.setHeader('X-RateLimit-Remaining', max - 1)
            res.setHeader(
                'X-RateLimit-Reset',
                Math.ceil((now + windowMs) / 1000)
            )
            next()
            return
        }

        record.count++

        if (record.count > max) {
            res.setHeader('X-RateLimit-Limit', max)
            res.setHeader('X-RateLimit-Remaining', 0)
            res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetAt / 1000))
            res.setHeader(
                'Retry-After',
                Math.ceil((record.resetAt - now) / 1000)
            )
            res.status(429).json({
                success: false,
                error: {
                    code: 'RATE_LIMITED',
                    message,
                },
            })
            return
        }

        res.setHeader('X-RateLimit-Limit', max)
        res.setHeader('X-RateLimit-Remaining', max - record.count)
        res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetAt / 1000))
        next()
    }
}
