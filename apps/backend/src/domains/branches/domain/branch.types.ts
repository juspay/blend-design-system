export type BranchStatus = 'draft' | 'published' | 'archived'
export type BranchVisibility = 'private' | 'team' | 'public'

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
    componentOverrides?: Record<string, unknown>
    darkModeOverrides?: {
        colors?: Record<string, unknown>
        radius?: Record<string, string>
        shadows?: Record<string, string>
        font?: {
            family?: string
            weight?: Record<string, number>
        }
    }
}

export interface Branch {
    id: string
    organizationId: string | null
    branchSlug: string
    name: string
    description: string | null
    parentBranchId: string | null
    status: BranchStatus
    visibility: BranchVisibility
    tokenConfig: BrandConfig
    publishedVersions: number
    latestVersion: string | null
    isProtected: boolean
    protectionRequireApproval: boolean | null
    protectionMinApprovals: number | null
    protectionApproverIds: string[]
    createdBy: string
    createdByName: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    tags?: TagRow[]
}

export interface BranchVersion {
    id: string
    branchId: string
    version: string
    tokenConfig: BrandConfig
    changelog: string | null
    isBreaking: boolean
    isPrerelease: boolean
    publishedBy: string
    publishedByName: string
    publishedAt: Date
}

export interface BranchSnapshot {
    id: string
    branchId: string
    tokenConfig: BrandConfig
    label: string | null
    isAutoSave: boolean
    savedBy: string
    savedByName: string
    savedAt: Date
}

export interface TagRow {
    id: string
    name: string
}

export interface CreateBranchDTO {
    name: string
    branchSlug: string
    description?: string
    parentBranchId?: string
    tokenConfig?: Partial<BrandConfig>
    visibility?: BranchVisibility
    tags?: string[]
    organizationId?: string
}

export interface UpdateBranchDTO {
    name?: string
    description?: string
    tokenConfig?: Partial<BrandConfig>
    status?: BranchStatus
    visibility?: BranchVisibility
}

export interface UpdateBranchProtectionDTO {
    isProtected?: boolean
    requireApproval?: boolean
    minApprovals?: number
    allowedApproverIds?: string[] | null
}

export interface PublishBranchDTO {
    version: string
    changelog?: string
    isBreaking?: boolean
    isPrerelease?: boolean
}

export type PublishBranchResult =
    | {
          mode: 'published'
          version: BranchVersion
      }
    | {
          mode: 'approval_required'
          publishRequest: {
              id: string
              status:
                  | 'pending'
                  | 'approved'
                  | 'rejected'
                  | 'published'
                  | 'cancelled'
          }
      }

export interface ResolvedTokensResponse {
    success: boolean
    data: {
        branchId: string
        theme: string
        componentTokens: unknown
    }
}
