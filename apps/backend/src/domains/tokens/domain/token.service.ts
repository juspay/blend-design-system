// Token Upload Service - Handles business logic for token uploads

import { promises as fs } from 'fs'
import path from 'path'
import { firestoreCollections } from '@/config/firebase.js'
import { logger } from '@/utils/logger.js'
import { NotFoundError, ValidationError } from '@/errors/AppError.js'
import type {
    TokenUploadInput,
    TokenUploadResult,
    StoredToken,
} from './token.types.js'

const UPLOADS_DIR = process.env.TOKEN_UPLOADS_DIR || './uploads/tokens'

// Simple JSON validation (we don't have token-engine yet)
function validateJson(data: unknown): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data || typeof data !== 'object') {
        errors.push('Must be a valid object')
        return { valid: false, errors }
    }

    const obj = data as Record<string, unknown>

    // Basic validation - check for required fields
    if (!obj.brandId || typeof obj.brandId !== 'string') {
        errors.push('Missing or invalid brandId')
    }

    if (!obj.name || typeof obj.name !== 'string') {
        errors.push('Missing or invalid name')
    }

    // Colors validation
    if (obj.colors && typeof obj.colors === 'object') {
        const colors = obj.colors as Record<string, unknown>
        if (colors.primary && typeof colors.primary === 'object') {
            // Valid
        } else {
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
    // Validate file type
    if (!input.fileName.endsWith('.json')) {
        throw new ValidationError('Only JSON files are supported')
    }

    // Parse JSON
    let parsed: unknown
    try {
        parsed = JSON.parse(input.fileBuffer.toString('utf-8'))
    } catch {
        throw new ValidationError('Failed to parse JSON file')
    }

    // Validate as BrandConfig
    const validation = validateJson(parsed)
    if (!validation.valid) {
        throw new ValidationError(
            `Token validation failed: ${validation.errors.join(', ')}`
        )
    }

    const brandConfig = parsed as Record<string, unknown>

    // Ensure upload directory exists
    try {
        await fs.access(UPLOADS_DIR)
    } catch {
        await fs.mkdir(UPLOADS_DIR, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const safeFileName = input.fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${input.branchId}_${timestamp}_${safeFileName}`
    const filePath = path.join(UPLOADS_DIR, fileName)

    // Write file to disk
    await fs.writeFile(filePath, input.fileBuffer)

    // Save metadata to Firestore
    const docRef = firestoreCollections
        .branch(input.branchId)
        .collection('tokens')
        .doc()
    const tokenData = {
        id: docRef.id,
        branchId: input.branchId,
        filePath,
        fileName: input.fileName,
        fileSize: input.fileBuffer.length,
        uploadedBy: input.uploadedBy,
        uploadedByName: input.uploadedByName,
        description: input.description || null,
        parsedConfig: brandConfig,
        status: 'valid',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await docRef.set(tokenData)

    logger.info(
        {
            tokenId: docRef.id,
            branchId: input.branchId,
            fileName: input.fileName,
        },
        'Token uploaded successfully'
    )

    return {
        success: true,
        id: docRef.id,
        message: 'Token file uploaded successfully',
        brandConfig: brandConfig as any,
    }
}

export const listTokensByBranch = async (
    branchId: string
): Promise<StoredToken[]> => {
    const snapshot = await firestoreCollections
        .branch(branchId)
        .collection('tokens')
        .orderBy('createdAt', 'desc')
        .get()

    return snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
            id: doc.id,
            branchId: data.branchId,
            filePath: data.filePath,
            metadata: {
                branchId: data.branchId,
                uploadedBy: data.uploadedBy,
                uploadedByName: data.uploadedByName,
                uploadedAt: data.createdAt?.toDate() || new Date(),
                fileName: data.fileName,
                fileSize: data.fileSize,
                description: data.description || undefined,
            },
            parsedConfig: data.parsedConfig,
            status: data.status,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
        }
    })
}

export const getTokenById = async (
    branchId: string,
    tokenId: string
): Promise<StoredToken | null> => {
    const doc = await firestoreCollections
        .branch(branchId)
        .collection('tokens')
        .doc(tokenId)
        .get()

    if (!doc.exists) return null

    const data = doc.data()!
    return {
        id: doc.id,
        branchId: data.branchId,
        filePath: data.filePath,
        metadata: {
            branchId: data.branchId,
            uploadedBy: data.uploadedBy,
            uploadedByName: data.uploadedByName,
            uploadedAt: data.createdAt?.toDate() || new Date(),
            fileName: data.fileName,
            fileSize: data.fileSize,
            description: data.description || undefined,
        },
        parsedConfig: data.parsedConfig,
        status: data.status,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
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

    // Delete file from disk
    try {
        await fs.unlink(token.filePath)
    } catch (err) {
        logger.warn(
            { filePath: token.filePath, error: err },
            'Failed to delete token file from disk'
        )
    }

    // Delete from Firestore
    await firestoreCollections
        .branch(branchId)
        .collection('tokens')
        .doc(tokenId)
        .delete()

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

    try {
        return await fs.readFile(token.filePath)
    } catch {
        throw new NotFoundError('Token file')
    }
}
