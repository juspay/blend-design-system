// ─────────────────────────────────────────────────────────────────────────────
// Token Repository - Manages token metadata in database
// ─────────────────────────────────────────────────────────────────────────────

import { prisma } from '@/config/database'
import type { StoredToken, TokenUploadMetadata } from '../domain/token.types'

interface CreateTokenInput {
    branchId: string
    filePath: string
    fileName: string
    fileSize: number
    uploadedBy: string
    uploadedByName: string
    description?: string
}

export class TokenRepository {
    /**
     * Create a new token record in the database
     */
    async create(input: CreateTokenInput): Promise<StoredToken> {
        const result = await prisma.tokenUpload.create({
            data: {
                id: crypto.randomUUID(),
                branchId: input.branchId,
                filePath: input.filePath,
                fileName: input.fileName,
                fileSize: input.fileSize,
                uploadedBy: input.uploadedBy,
                uploadedByName: input.uploadedByName,
                description: input.description,
                status: 'pending',
            },
        })

        return this.mapToDomain(result)
    }

    /**
     * Find token by ID
     */
    async findById(id: string): Promise<StoredToken | null> {
        const result = await prisma.tokenUpload.findUnique({
            where: { id },
        })

        if (!result) return null
        return this.mapToDomain(result)
    }

    /**
     * Find all tokens for a branch
     */
    async findByBranchId(branchId: string): Promise<StoredToken[]> {
        const results = await prisma.tokenUpload.findMany({
            where: { branchId },
            orderBy: { createdAt: 'desc' },
        })

        return results.map((r) => this.mapToDomain(r))
    }

    /**
     * Update token status
     */
    async updateStatus(
        id: string,
        status: 'pending' | 'valid' | 'invalid',
        parsedConfig?: Record<string, unknown>
    ): Promise<StoredToken> {
        const result = await prisma.tokenUpload.update({
            where: { id },
            data: {
                status,
                parsedConfig: parsedConfig || undefined,
                updatedAt: new Date(),
            },
        })

        return this.mapToDomain(result)
    }

    /**
     * Delete a token
     */
    async delete(id: string): Promise<void> {
        await prisma.tokenUpload.delete({
            where: { id },
        })
    }

    private mapToDomain(raw: any): StoredToken {
        return {
            id: raw.id,
            branchId: raw.branchId,
            filePath: raw.filePath,
            metadata: {
                branchId: raw.branchId,
                uploadedBy: raw.uploadedBy,
                uploadedByName: raw.uploadedByName,
                uploadedAt: raw.createdAt,
                fileName: raw.fileName,
                fileSize: raw.fileSize,
                description: raw.description || undefined,
            },
            parsedConfig: raw.parsedConfig || undefined,
            status: raw.status,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }
    }
}

export const tokenRepository = new TokenRepository()
