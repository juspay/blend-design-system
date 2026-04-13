// Token Upload Domain Types

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
    filePath: string
    metadata: TokenUploadMetadata
    parsedConfig?: Record<string, unknown>
    status: 'pending' | 'valid' | 'invalid'
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
