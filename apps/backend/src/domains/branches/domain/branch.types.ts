export interface BrandConfig {
    brandId: string
    name: string
    version: string
    colors?: {
        primary?: Record<string, string>
        gray?: Record<string, string>
        red?: Record<string, string>
        green?: Record<string, string>
        yellow?: Record<string, string>
        orange?: Record<string, string>
        purple?: Record<string, string>
    }
    radius?: Record<string, string>
    shadows?: Record<string, string>
    font?: {
        family?: string
        weight?: Record<string, number>
    }
}

export interface Branch {
    id: string
    brandId: string
    name: string
    parentBranch: string | null
    status: 'draft' | 'published'
    brandConfig: BrandConfig
    createdBy: string
    createdAt: Date
    updatedAt: Date
    publishedVersions: number
}

export interface BranchVersion {
    id: string
    version: string
    brandConfig: BrandConfig
    publishedBy: string
    publishedAt: Date
    notes: string
}

export interface BranchSnapshot {
    id: string
    brandConfig: BrandConfig
    savedAt: Date
    savedBy: string
}

export interface CreateBranchDTO {
    name: string
    parentBranch?: string
    brandConfig?: Partial<BrandConfig>
}

export interface UpdateBranchDTO {
    name?: string
    brandConfig?: Partial<BrandConfig>
}

export interface PublishBranchDTO {
    version: string
    notes?: string
}

export interface ResolvedTokensResponse {
    success: boolean
    data: {
        branchId: string
        theme: string
        componentTokens: unknown
    }
}
