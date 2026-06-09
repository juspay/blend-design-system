/**
 * Maps Postgres/API branch rows to the Studio Branch shape expected by the UI.
 */

import type {
    Branch,
    BrandConfig,
    BranchStatus,
    BranchVisibility,
} from '@juspay/blend-design-system/tokens'
import { parseBranchId } from '@juspay/blend-design-system/tokens'

interface BackendTagRow {
    id: string
    name: string
    createdAt?: string
}

/** Raw branch object returned by @blend-design/justbackend. */
export interface BackendBranchRow {
    id: string
    organizationId?: string | null
    branchSlug: string
    name: string
    description?: string | null
    parentBranchId?: string | null
    status: BranchStatus
    visibility: BranchVisibility
    tokenConfig: BrandConfig
    publishedVersions?: number
    latestVersion?: string | null
    createdBy: string
    createdByName?: string
    createdAt: string | Date
    updatedAt: string | Date
    tags?: BackendTagRow[]
}

function toDate(value: string | Date): Date {
    return value instanceof Date ? value : new Date(value)
}

function resolveBrandParts(
    branchSlug: string,
    tokenConfig: BrandConfig
): { brandId: string; slug: string } {
    const fromSlug = parseBranchId(branchSlug)
    if (fromSlug) {
        return { brandId: fromSlug.owner, slug: fromSlug.slug }
    }

    const configBrandId = tokenConfig.brandId
    if (configBrandId) {
        const fromConfig = parseBranchId(configBrandId)
        if (fromConfig) {
            return { brandId: fromConfig.owner, slug: fromConfig.slug }
        }
        return { brandId: configBrandId, slug: branchSlug }
    }

    return { brandId: branchSlug, slug: branchSlug }
}

export function mapBackendBranchToStudioBranch(row: BackendBranchRow): Branch {
    const { brandId, slug } = resolveBrandParts(row.branchSlug, row.tokenConfig)
    const createdAt = toDate(row.createdAt)
    const updatedAt = toDate(row.updatedAt)

    return {
        id: row.id,
        brandId,
        name: row.name,
        slug,
        description: row.description ?? undefined,
        status: row.status,
        visibility: row.visibility,
        brandConfig: row.tokenConfig,
        parentBranch: null,
        forkedFrom: null,
        owner: {
            uid: row.createdBy,
            email: '',
            displayName: row.createdByName,
        },
        meta: {
            createdByName: row.createdByName,
        },
        tags: (row.tags ?? []).map((tag) => tag.name),
        latestVersion: row.latestVersion ?? null,
        publishedCount: row.publishedVersions ?? 0,
        snapshotCount: 0,
        createdBy: row.createdBy,
        createdAt,
        updatedAt,
        lastEditedBy: row.createdBy,
        lastPublishedAt: null,
        lastPublishedBy: null,
        isLocked: false,
        lockedBy: null,
        lockedAt: null,
        organizationId: row.organizationId ?? undefined,
    }
}
