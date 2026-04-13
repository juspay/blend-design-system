// ─────────────────────────────────────────────────────────────────────────────
// Token Upload Service - Handles business logic for token uploads
// ─────────────────────────────────────────────────────────────────────────────

import { promises as fs } from 'fs'
import path from 'path'
import {
    validateBrandConfig,
    type BrandConfig,
} from '@blend-design/token-engine'
import { tokenRepository } from '../data-access/token.repository'
import type {
    TokenUploadInput,
    TokenUploadResult,
    TokenValidationError,
} from './token.types'
import { AppError } from '@/errors/AppError'

const UPLOADS_DIR = process.env.TOKEN_UPLOADS_DIR || './uploads/tokens'

export class TokenService {
    /**
     * Upload and validate a token JSON file
     */
    async upload(input: TokenUploadInput): Promise<TokenUploadResult> {
        // Validate file type
        if (!input.fileName.endsWith('.json')) {
            throw new AppError(
                'INVALID_FILE_TYPE',
                'Only JSON files are supported'
            )
        }

        // Parse JSON
        let parsed: unknown
        try {
            parsed = JSON.parse(input.fileBuffer.toString('utf-8'))
        } catch (err) {
            throw new AppError('INVALID_JSON', 'Failed to parse JSON file')
        }

        // Validate as BrandConfig
        const validation = validateBrandConfig(parsed)
        if (!validation.valid) {
            throw new AppError(
                'VALIDATION_FAILED',
                `Token validation failed: ${validation.errors.join(', ')}`
            )
        }

        const brandConfig = parsed as BrandConfig

        // Ensure upload directory exists
        await this.ensureUploadDir()

        // Generate unique filename
        const timestamp = Date.now()
        const safeFileName = input.fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `${input.branchId}_${timestamp}_${safeFileName}`
        const filePath = path.join(UPLOADS_DIR, fileName)

        // Write file to disk
        await fs.writeFile(filePath, input.fileBuffer)

        // Save metadata to database
        const stored = await tokenRepository.create({
            branchId: input.branchId,
            filePath,
            fileName: input.fileName,
            fileSize: input.fileBuffer.length,
            uploadedBy: input.uploadedBy,
            uploadedByName: input.uploadedByName,
            description: input.description,
        })

        // Update status to valid
        await tokenRepository.updateStatus(stored.id, 'valid', brandConfig)

        return {
            success: true,
            id: stored.id,
            message: 'Token file uploaded successfully',
            brandConfig,
        }
    }

    /**
     * Get all tokens for a branch
     */
    async listByBranch(branchId: string) {
        return tokenRepository.findByBranchId(branchId)
    }

    /**
     * Get a specific token by ID
     */
    async getById(id: string) {
        return tokenRepository.findById(id)
    }

    /**
     * Delete a token
     */
    async delete(id: string, userId: string): Promise<void> {
        const token = await tokenRepository.findById(id)
        if (!token) {
            throw new AppError('NOT_FOUND', 'Token not found')
        }

        // Delete file from disk
        try {
            await fs.unlink(token.filePath)
        } catch (err) {
            // File might not exist, that's okay
            console.warn(`Failed to delete file ${token.filePath}:`, err)
        }

        // Delete from database
        await tokenRepository.delete(id)
    }

    /**
     * Read token file content
     */
    async readFile(id: string): Promise<Buffer> {
        const token = await tokenRepository.findById(id)
        if (!token) {
            throw new AppError('NOT_FOUND', 'Token not found')
        }

        try {
            return await fs.readFile(token.filePath)
        } catch (err) {
            throw new AppError('FILE_NOT_FOUND', 'Token file not found on disk')
        }
    }

    private async ensureUploadDir(): Promise<void> {
        try {
            await fs.access(UPLOADS_DIR)
        } catch {
            await fs.mkdir(UPLOADS_DIR, { recursive: true })
        }
    }
}

export const tokenService = new TokenService()
