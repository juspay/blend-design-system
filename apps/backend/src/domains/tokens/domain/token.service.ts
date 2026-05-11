import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'
import { NotFoundError, ValidationError } from '@/errors/AppError.js'

export interface TokenUploadMetadata {
    branchId: string
    uploadedBy: string
    uploadedByName: string
    uploadedAt: Date
    fileName: string
    fileSize: number
    description?: string
}

export interface TokenUploadResult {
    success: boolean
    id: string
    message?: string
    brandConfig?: Record<string, unknown>
    validationErrors?: string[]
}

export interface StoredToken {
    id: string
    branchId: string
    metadata: TokenUploadMetadata
    parsedConfig?: Record<string, unknown>
    status: 'pending' | 'processing' | 'valid' | 'invalid'
    createdAt: Date
    updatedAt: Date
}

export interface TokenUploadInput {
    branchId: string
    fileBuffer: Buffer
    fileName: string
    description?: string
    uploadedBy: string
    uploadedByName: string
}

function validateJson(data: unknown): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data || typeof data !== 'object') {
        errors.push('Must be a valid object')
        return { valid: false, errors }
    }

    const obj = data as Record<string, unknown>

    if (!obj.brandId || typeof obj.brandId !== 'string') {
        errors.push('Missing or invalid brandId')
    }

    if (!obj.name || typeof obj.name !== 'string') {
        errors.push('Missing or invalid name')
    }

    if (obj.colors && typeof obj.colors === 'object') {
        const colors = obj.colors as Record<string, unknown>
        if (!colors.primary || typeof colors.primary !== 'object') {
            errors.push('Missing colors.primary configuration')
        }
    } else {
        errors.push('Missing colors configuration')
    }

    return { valid: errors.length === 0, errors }
}

export const uploadToken = async (
    input: TokenUploadInput
): Promise<TokenUploadResult> => {
    if (!input.fileName.endsWith('.json')) {
        throw new ValidationError('Only JSON files are supported')
    }

    let parsed: unknown
    try {
        parsed = JSON.parse(input.fileBuffer.toString('utf-8'))
    } catch {
        throw new ValidationError('Failed to parse JSON file')
    }

    const validation = validateJson(parsed)
    if (!validation.valid) {
        throw new ValidationError(
            `Token validation failed: ${validation.errors.join(', ')}`
        )
    }

    const brandConfig = parsed as Record<string, unknown>

    const upload = await prisma.tokenUpload.create({
        data: {
            branchId: input.branchId,
            fileName: input.fileName,
            fileSize: input.fileBuffer.length,
            description: input.description || null,
            parsedConfig: brandConfig as any,
            status: 'valid',
            uploadedBy: input.uploadedBy,
            uploadedByName: input.uploadedByName,
        },
    })

    logger.info(
        {
            tokenId: upload.id,
            branchId: input.branchId,
            fileName: input.fileName,
        },
        'Token uploaded successfully'
    )

    return {
        success: true,
        id: upload.id,
        message: 'Token file uploaded successfully',
        brandConfig: brandConfig as any,
    }
}

export const listTokensByBranch = async (
    branchId: string
): Promise<StoredToken[]> => {
    const uploads = await prisma.tokenUpload.findMany({
        where: { branchId },
        orderBy: { createdAt: 'desc' },
    })

    return uploads.map((u: any) => ({
        id: u.id,
        branchId: u.branchId,
        metadata: {
            branchId: u.branchId,
            uploadedBy: u.uploadedBy,
            uploadedByName: u.uploadedByName,
            uploadedAt: u.createdAt,
            fileName: u.fileName,
            fileSize: u.fileSize,
            description: u.description || undefined,
        },
        parsedConfig: u.parsedConfig as Record<string, unknown> | undefined,
        status: u.status as 'pending' | 'processing' | 'valid' | 'invalid',
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    }))
}

export const getTokenById = async (
    branchId: string,
    tokenId: string
): Promise<StoredToken | null> => {
    const upload = await prisma.tokenUpload.findFirst({
        where: { id: tokenId, branchId },
    })

    if (!upload) return null

    return {
        id: upload.id,
        branchId: upload.branchId,
        metadata: {
            branchId: upload.branchId,
            uploadedBy: upload.uploadedBy,
            uploadedByName: upload.uploadedByName,
            uploadedAt: upload.createdAt,
            fileName: upload.fileName,
            fileSize: upload.fileSize,
            description: upload.description || undefined,
        },
        parsedConfig: upload.parsedConfig as
            | Record<string, unknown>
            | undefined,
        status: upload.status as 'pending' | 'processing' | 'valid' | 'invalid',
        createdAt: upload.createdAt,
        updatedAt: upload.updatedAt,
    }
}

export const deleteToken = async (
    branchId: string,
    tokenId: string
): Promise<void> => {
    const token = await getTokenById(branchId, tokenId)
    if (!token) {
        throw new NotFoundError('Token')
    }

    await prisma.tokenUpload.delete({ where: { id: tokenId } })

    logger.info({ tokenId, branchId }, 'Token deleted')
}

export const readTokenFile = async (
    branchId: string,
    tokenId: string
): Promise<Buffer> => {
    const token = await getTokenById(branchId, tokenId)
    if (!token) {
        throw new NotFoundError('Token')
    }

    const config = token.parsedConfig
    if (!config) {
        throw new NotFoundError('Token file content')
    }

    return Buffer.from(JSON.stringify(config, null, 2))
}
