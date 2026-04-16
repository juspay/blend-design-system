/**
 * Request Validation Middleware
 *
 * Uses Zod schemas to validate request body, params, and query.
 * Returns standardized 400 errors with details on validation failures.
 *
 * Usage:
 *   router.post('/', validate(createBranchSchema), handler)
 */

import type { Request, Response, NextFunction } from 'express'
import { z, type ZodSchema } from 'zod'

interface ValidationSchemas {
    body?: ZodSchema
    params?: ZodSchema
    query?: ZodSchema
}

/**
 * Middleware factory that validates request data against Zod schemas.
 * Validated data is written back to `req.body`, `req.params`, `req.query`
 * so downstream handlers receive clean, typed data.
 */
export function validate(schemas: ValidationSchemas) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const errors: Array<{ field: string; message: string }> = []

        if (schemas.body) {
            const result = schemas.body.safeParse(req.body)
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    errors.push({
                        field: `body.${issue.path.join('.')}`,
                        message: issue.message,
                    })
                })
            } else {
                req.body = result.data
            }
        }

        if (schemas.params) {
            const result = schemas.params.safeParse(req.params)
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    errors.push({
                        field: `params.${issue.path.join('.')}`,
                        message: issue.message,
                    })
                })
            }
        }

        if (schemas.query) {
            const result = schemas.query.safeParse(req.query)
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    errors.push({
                        field: `query.${issue.path.join('.')}`,
                        message: issue.message,
                    })
                })
            } else {
                req.query = result.data
            }
        }

        if (errors.length > 0) {
            res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Request validation failed',
                    details: errors,
                },
            })
            return
        }

        next()
    }
}

// ---------------------------------------------------------------------------
// Reusable Schemas
// ---------------------------------------------------------------------------

/** UUID string validator. */
export const uuidParam = z.object({
    id: z.string().uuid('Invalid UUID format'),
})

/** Pagination query validator. */
export const paginationQuery = z.object({
    limit: z
        .string()
        .optional()
        .transform((v) => (v ? Math.min(parseInt(v, 10) || 20, 100) : 20)),
    cursor: z.string().uuid().optional(),
    page: z
        .string()
        .optional()
        .transform((v) => (v ? parseInt(v, 10) || 1 : 1)),
})

// ---------------------------------------------------------------------------
// Organization Schemas
// ---------------------------------------------------------------------------

export const createOrgSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(255, 'Name must be 255 characters or fewer'),
    slug: z
        .string()
        .min(1, 'Slug is required')
        .max(100, 'Slug must be 100 characters or fewer')
        .regex(
            /^[a-z0-9-]+$/,
            'Slug must be lowercase alphanumeric with hyphens only'
        ),
})

export const updateOrgSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    slug: z
        .string()
        .min(1)
        .max(100)
        .regex(/^[a-z0-9-]+$/)
        .optional(),
})

export const addMemberSchema = z.object({
    userId: z.string().uuid('Invalid user ID'),
    role: z.enum(['viewer', 'editor', 'admin']).optional().default('viewer'),
})

export const updateMemberRoleSchema = z.object({
    role: z.enum(['viewer', 'editor', 'admin']),
})

// ---------------------------------------------------------------------------
// Branch Schemas
// ---------------------------------------------------------------------------

export const createBranchSchema = z.object({
    brandId: z
        .string()
        .min(1, 'Brand ID is required')
        .max(255)
        .regex(
            /^[a-z0-9][a-z0-9_/-]*$/,
            'Brand ID must be lowercase alphanumeric with hyphens, underscores, or slashes'
        ),
    name: z.string().min(1, 'Name is required').max(255),
    slug: z.string().min(1).max(100).optional(),
    description: z.string().max(1000).optional(),
    visibility: z
        .enum(['private', 'team', 'public'])
        .optional()
        .default('private'),
    brandConfig: z.record(z.unknown()).optional(),
    organizationId: z.string().uuid().optional(),
    clientName: z.string().max(255).optional(),
    projectName: z.string().max(255).optional(),
    tags: z.array(z.string()).optional(),
})

export const updateBranchSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().max(1000).optional(),
    brandConfig: z.record(z.unknown()).optional(),
    visibility: z.enum(['private', 'team', 'public']).optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
})

export const publishBranchSchema = z.object({
    version: z
        .string()
        .regex(
            /^\d+\.\d+\.\d+/,
            'Version must follow semver format (e.g. 1.0.0)'
        )
        .optional(),
    changelog: z.string().max(5000).optional(),
    isBreaking: z.boolean().optional().default(false),
    isPrerelease: z.boolean().optional().default(false),
})

export const resolveTokensSchema = z.object({
    theme: z.enum(['light', 'dark']).optional().default('light'),
})

export const createSnapshotSchema = z.object({
    brandConfig: z.record(z.unknown()).optional(),
    label: z.string().max(255).optional(),
    isAutoSave: z.boolean().optional().default(false),
})

// ---------------------------------------------------------------------------
// User Schemas
// ---------------------------------------------------------------------------

export const updateUserSchema = z.object({
    displayName: z.string().max(255).optional(),
    photoUrl: z.string().url().optional(),
    role: z.enum(['viewer', 'editor', 'admin']).optional(),
})

// ---------------------------------------------------------------------------
// Tag Schemas
// ---------------------------------------------------------------------------

export const createTagSchema = z.object({
    name: z
        .string()
        .min(1, 'Tag name is required')
        .max(100, 'Tag name must be 100 characters or fewer')
        .regex(
            /^[a-z0-9-]+$/,
            'Tag name must be lowercase alphanumeric with hyphens only'
        ),
})

// ---------------------------------------------------------------------------
// API Key Schemas
// ---------------------------------------------------------------------------

export const createApiKeySchema = z.object({
    name: z
        .string()
        .min(1, 'API key name is required')
        .max(255, 'Name must be 255 characters or fewer'),
    organizationId: z.string().uuid('Invalid organization ID'),
    expiresAt: z.string().datetime('Invalid date format').optional(),
})

// ---------------------------------------------------------------------------
// Fork Branch Schema
// ---------------------------------------------------------------------------

export const forkBranchSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    slug: z.string().min(1).max(100).optional(),
})
