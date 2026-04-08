/**
 * Firestore Data Model for Blend Token Studio
 *
 * Collections:
 * - branches/{branchId} - Brand branches (draft/published)
 * - branches/{branchId}/versions/{versionId} - Published versions (immutable)
 * - branches/{branchId}/snapshots/{snapshotId} - Auto-saved drafts
 *
 * This model supports:
 * - Multi-tenant branching (hdfc/retail, hdfc/corporate)
 * - Version history with immutable snapshots
 * - Auto-save drafts before publish
 * - Fork/merge workflows
 * - Access control at branch level
 */

import type { BrandConfig } from './types'

export type BranchStatus = 'draft' | 'published' | 'archived'

export type BranchVisibility = 'private' | 'team' | 'public'

export interface BranchPermissions {
    canRead: boolean
    canWrite: boolean
    canPublish: boolean
    canDelete: boolean
    canFork: boolean
}

export interface BranchOwner {
    uid: string
    email: string
    displayName?: string
    photoURL?: string
}

export interface BranchMeta {
    createdByName?: string
    createdByEmail?: string
    lastEditedByName?: string
    lastEditedByEmail?: string
    tags?: string[]
    description?: string
    clientName?: string
    projectName?: string
}

export interface BranchReference {
    branchId: string
    name: string
    version?: string
}

export interface Branch {
    id: string
    brandId: string
    name: string
    slug: string
    description?: string
    status: BranchStatus
    visibility: BranchVisibility

    brandConfig: BrandConfig

    parentBranch: BranchReference | null
    forkedFrom: BranchReference | null

    owner: BranchOwner
    meta: BranchMeta

    tags: string[]
    clientName?: string
    projectName?: string

    latestVersion: string | null
    publishedCount: number
    snapshotCount: number

    createdBy: string
    createdAt: Date
    updatedAt: Date
    lastEditedBy: string
    lastPublishedAt: Date | null
    lastPublishedBy: string | null

    isLocked: boolean
    lockedBy: string | null
    lockedAt: Date | null
    lockReason?: string
}

export interface CreateBranchInput {
    brandId: string
    name: string
    slug?: string
    description?: string
    visibility?: BranchVisibility
    parentBranch?: BranchReference
    forkFrom?: BranchReference
    brandConfig?: Partial<BrandConfig>
    tags?: string[]
    clientName?: string
    projectName?: string
}

export interface UpdateBranchInput {
    name?: string
    description?: string
    visibility?: BranchVisibility
    brandConfig?: BrandConfig
    tags?: string[]
    clientName?: string
    projectName?: string
}

export interface Version {
    id: string
    branchId: string
    version: string
    brandConfig: BrandConfig

    changelog?: string
    isBreaking: boolean
    isPrerelease: boolean

    publishedBy: string
    publishedByName?: string
    publishedAt: Date

    downloadCount: number
    lastDownloadedAt: Date | null

    parentVersion: string | null
}

export interface CreateVersionInput {
    branchId: string
    version: string
    brandConfig: BrandConfig
    changelog?: string
    isBreaking?: boolean
    isPrerelease?: boolean
    parentVersion?: string
}

export interface Snapshot {
    id: string
    branchId: string
    brandConfig: BrandConfig

    savedBy: string
    savedByName?: string
    savedAt: Date

    label?: string
    isAutoSave: boolean
}

export interface CreateSnapshotInput {
    branchId: string
    brandConfig: BrandConfig
    label?: string
    isAutoSave?: boolean
}

export interface BranchListFilters {
    status?: BranchStatus
    visibility?: BranchVisibility
    owner?: string
    tags?: string[]
    search?: string
    clientName?: string
}

export interface BranchListOptions {
    filters?: BranchListFilters
    sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'lastPublishedAt'
    sortOrder?: 'asc' | 'desc'
    limit?: number
    cursor?: string
}

export interface BranchListResult {
    branches: Branch[]
    total: number
    hasMore: boolean
    nextCursor?: string
}

export interface BranchDiff {
    branchId: string
    baseVersion: string | null
    targetVersion: string
    baseConfig: BrandConfig | null
    targetConfig: BrandConfig
    diffs: Array<{
        path: string
        oldValue: string | null
        newValue: string
        type: 'added' | 'changed' | 'removed'
    }>
}

export interface ResolvedTokensResponse {
    branchId: string
    version: string | null
    theme: 'light' | 'dark'
    componentTokens: Record<string, unknown>
    resolvedAt: Date
    brandConfig: BrandConfig
}

export const BRANCH_ID_PATTERN =
    /^[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*$/
export const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[a-z0-9]+)?(?:\+[a-z0-9]+)?$/

export function generateBranchId(owner: string, slug: string): string {
    const normalizedOwner = owner.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    return `${normalizedOwner}/${normalizedSlug}`
}

export function parseBranchId(
    branchId: string
): { owner: string; slug: string } | null {
    if (!BRANCH_ID_PATTERN.test(branchId)) return null
    const [owner, slug] = branchId.split('/')
    return { owner, slug }
}

export function validateBranchId(branchId: string): {
    valid: boolean
    error?: string
} {
    if (!branchId) {
        return { valid: false, error: 'Branch ID is required' }
    }
    if (!BRANCH_ID_PATTERN.test(branchId)) {
        return {
            valid: false,
            error: 'Branch ID must be in format: owner/slug (lowercase, alphanumeric, hyphens)',
        }
    }
    return { valid: true }
}

export function validateVersion(version: string): {
    valid: boolean
    error?: string
} {
    if (!version) {
        return { valid: false, error: 'Version is required' }
    }
    if (!VERSION_PATTERN.test(version)) {
        return {
            valid: false,
            error: 'Version must be semver format: X.Y.Z with optional prerelease',
        }
    }
    return { valid: true }
}

export function incrementVersion(
    version: string,
    type: 'major' | 'minor' | 'patch'
): string {
    const [major, minor, patch] = version.split('.').map(Number)
    switch (type) {
        case 'major':
            return `${major + 1}.0.0`
        case 'minor':
            return `${major}.${minor + 1}.0`
        case 'patch':
            return `${major}.${minor}.${patch + 1}`
    }
}
