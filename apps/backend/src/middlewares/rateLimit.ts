import { ipKeyGenerator, rateLimit, type Options } from 'express-rate-limit'
import type { Request } from 'express'

/**
 * Generate rate limit key based on authenticated user or IP address.
 * This prevents authenticated users from bypassing limits by changing IPs.
 */
const keyGenerator = (req: Request): string => {
    // Use user ID if authenticated, fallback to IP
    const userId = req.user?.id
    if (userId) {
        return `user:${userId}`
    }

    // Use library helper for IPv6-safe normalization (required in v8+).
    return ipKeyGenerator(req.ip ?? '')
}

/**
 * Base configuration shared across all rate limiters
 */
const baseConfig: Partial<Options> = {
    standardHeaders: 'draft-8', // IETF standard headers
    legacyHeaders: false, // Disable deprecated X-RateLimit-* headers
    keyGenerator,
    // Trust proxy to get real client IP behind load balancers
    validate: { trustProxy: false },
}

/**
 * General API Limiter
 * - 100 requests per 15 minutes
 * - For standard CRUD operations (GET, safe operations)
 *
 * Industry standard: Most REST APIs (GitHub, Stripe, etc.) use 100 req/15min
 * for general authenticated endpoints.
 */
export const apiLimiter = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // 100 requests per window
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.',
        },
    },
})

/**
 * Strict Limiter
 * - 30 requests per 15 minutes
 * - For sensitive operations: approve, reject, merge, delete, update
 *
 * Used for operations that modify state or have significant side effects.
 * Prevents abuse of critical business logic endpoints.
 */
export const strictLimiter = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 30, // 30 requests per window
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests for this operation. Please slow down.',
        },
    },
})

/**
 * Write Limiter
 * - 50 requests per 15 minutes
 * - For write operations: POST, PUT, PATCH (non-sensitive)
 *
 * Balance between allowing productive work and preventing abuse.
 */
export const writeLimiter = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50, // 50 requests per window
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many write requests. Please try again later.',
        },
    },
})

/**
 * Auth Limiter
 * - 5 requests per 15 minutes
 * - For authentication endpoints: login, register, password reset
 *
 * Critical for preventing brute-force attacks on credentials.
 * Industry standard: OWASP recommends 5 attempts max.
 */
export const authLimiter = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // 5 requests per window
    skipSuccessfulRequests: true, // Don't count successful logins
    message: {
        success: false,
        error: {
            code: 'AUTH_RATE_LIMIT_EXCEEDED',
            message:
                'Too many authentication attempts. Please try again later.',
        },
    },
})

/**
 * Admin Limiter
 * - 60 requests per 15 minutes
 * - For admin-only operations
 *
 * Higher limit for admin tasks while still preventing accidental abuse.
 */
export const adminLimiter = rateLimit({
    ...baseConfig,
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 60, // 60 requests per window
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Admin operation rate limit exceeded.',
        },
    },
})
