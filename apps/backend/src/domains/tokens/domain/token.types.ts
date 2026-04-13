// ─────────────────────────────────────────────────────────────────────────────
// Token Upload Domain Types
// ─────────────────────────────────────────────────────────────────────────────

import type { BrandConfig } from '@blend-design/token-engine'

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
    brandConfig?: BrandConfig
    validationErrors?: string[]
}

export interface StoredToken {
    id: string
    branchId: string
    filePath: string
    metadata: TokenUploadMetadata
    parsedConfig?: BrandConfig
    status: 'pending' | 'valid' | 'invalid'
    createdAt: Date
    updatedAt: Date
}

export interface TokenValidationError {
    path: string
    message: string
    severity: 'error' | 'warning'
}

export interface TokenUploadInput {
    branchId: string
    fileBuffer: Buffer
    fileName: string
    description?: string
    uploadedBy: string
    uploadedByName: string
}
