/**
 * Firestore Branch Service
 *
 * Handles all CRUD operations for branches, versions, and snapshots.
 * Used by the API routes to interact with Firestore.
 */

import { getAdminFirestore, initializeAdmin } from './firebase-admin'
import type {
    Branch,
    CreateBranchInput,
    UpdateBranchInput,
    Version,
    CreateVersionInput,
    Snapshot,
    CreateSnapshotInput,
    BranchListOptions,
    BranchListResult,
    BranchDiff,
} from '@blend-design/token-engine/server'
import {
    type BrandConfig,
    validateBrandConfig,
} from '@blend-design/token-engine/server'

const BRANCHES_COLLECTION = 'branches'
const VERSIONS_SUBCOLLECTION = 'versions'
const SNAPSHOTS_SUBCOLLECTION = 'snapshots'

function getDb() {
    initializeAdmin()
    return getAdminFirestore()
}

function branchDoc(branchId: string) {
    return getDb().collection(BRANCHES_COLLECTION).doc(branchId)
}

function versionsCollection(branchId: string) {
    return branchDoc(branchId).collection(VERSIONS_SUBCOLLECTION)
}

function snapshotsCollection(branchId: string) {
    return branchDoc(branchId).collection(SNAPSHOTS_SUBCOLLECTION)
}

function firestoreTimestamp(
    date: Date | null | undefined
): FirebaseFirestore.Timestamp | null {
    if (!date) return null
    return FirebaseFirestore.Timestamp.fromDate(date)
}

function fromFirestoreTimestamp(
    ts: FirebaseFirestore.Timestamp | null | undefined
): Date | null {
    if (!ts) return null
    return ts.toDate()
}

function branchFromFirestore(
    doc: FirebaseFirestore.DocumentSnapshot
): Branch | null {
    if (!doc.exists) return null

    const data = doc.data()!
    return {
        id: doc.id,
        brandId: data.brandId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        status: data.status,
        visibility: data.visibility,
        brandConfig: data.brandConfig,
        parentBranch: data.parentBranch || null,
        forkedFrom: data.forkedFrom || null,
        owner: data.owner,
        meta: data.meta || {},
        tags: data.tags || [],
        clientName: data.clientName,
        projectName: data.projectName,
        latestVersion: data.latestVersion || null,
        publishedCount: data.publishedCount || 0,
        snapshotCount: data.snapshotCount || 0,
        createdBy: data.createdBy,
        createdAt: fromFirestoreTimestamp(data.createdAt) || new Date(),
        updatedAt: fromFirestoreTimestamp(data.updatedAt) || new Date(),
        lastEditedBy: data.lastEditedBy,
        lastPublishedAt: fromFirestoreTimestamp(data.lastPublishedAt),
        lastPublishedBy: data.lastPublishedBy || null,
        isLocked: data.isLocked || false,
        lockedBy: data.lockedBy || null,
        lockedAt: fromFirestoreTimestamp(data.lockedAt),
        lockReason: data.lockReason,
    }
}

function versionFromFirestore(
    doc: FirebaseFirestore.DocumentSnapshot
): Version | null {
    if (!doc.exists) return null

    const data = doc.data()!
    return {
        id: doc.id,
        branchId: data.branchId,
        version: data.version,
        brandConfig: data.brandConfig,
        changelog: data.changelog,
        isBreaking: data.isBreaking || false,
        isPrerelease: data.isPrerelease || false,
        publishedBy: data.publishedBy,
        publishedByName: data.publishedByName,
        publishedAt: fromFirestoreTimestamp(data.publishedAt) || new Date(),
        downloadCount: data.downloadCount || 0,
        lastDownloadedAt: fromFirestoreTimestamp(data.lastDownloadedAt),
        parentVersion: data.parentVersion || null,
    }
}

export async function getBranch(branchId: string): Promise<Branch | null> {
    const doc = await branchDoc(branchId).get()
    return branchFromFirestore(doc)
}

export async function listBranches(
    options: BranchListOptions
): Promise<BranchListResult> {
    const db = getDb()
    let query: FirebaseFirestore.Query = db.collection(BRANCHES_COLLECTION)

    const {
        filters,
        sortBy = 'updatedAt',
        sortOrder = 'desc',
        limit = 50,
        cursor,
    } = options

    if (filters?.status) {
        query = query.where('status', '==', filters.status)
    }
    if (filters?.visibility) {
        query = query.where('visibility', '==', filters.visibility)
    }
    if (filters?.owner) {
        query = query.where('owner.uid', '==', filters.owner)
    }
    if (filters?.clientName) {
        query = query.where('clientName', '==', filters.clientName)
    }

    query = query.orderBy(sortBy, sortOrder)
    query = query.limit(limit + 1)

    if (cursor) {
        const cursorDoc = await branchDoc(cursor).get()
        if (cursorDoc.exists) {
            query = query.startAfter(cursorDoc)
        }
    }

    const snapshot = await query.get()
    const branches = snapshot.docs
        .map(branchFromFirestore)
        .filter((b): b is Branch => b !== null)

    if (filters?.search) {
        const searchLower = filters.search.toLowerCase()
        const filtered = branches.filter(
            (b) =>
                b.name.toLowerCase().includes(searchLower) ||
                b.brandId.toLowerCase().includes(searchLower) ||
                b.description?.toLowerCase().includes(searchLower)
        )
        return {
            branches: filtered.slice(0, limit),
            total: filtered.length,
            hasMore: false,
        }
    }

    const hasMore = branches.length > limit
    const resultBranches = hasMore ? branches.slice(0, limit) : branches

    return {
        branches: resultBranches,
        total: resultBranches.length,
        hasMore,
        nextCursor: hasMore
            ? resultBranches[resultBranches.length - 1]?.id
            : undefined,
    }
}

export async function createBranch(
    input: CreateBranchInput,
    user: {
        uid: string
        email: string
        displayName?: string
        photoURL?: string
    }
): Promise<Branch> {
    const brandId = input.brandId
    const slug = input.slug || brandId.split('/')[1] || 'main'

    const defaultBrandConfig: BrandConfig = {
        brandId,
        name: input.name,
        version: '1.0.0',
    }

    const brandConfig: BrandConfig = input.brandConfig
        ? { ...defaultBrandConfig, ...input.brandConfig }
        : defaultBrandConfig

    const validation = validateBrandConfig(brandConfig)
    if (!validation.valid) {
        throw new Error(
            `Invalid brand config: ${validation.errors.map((e) => e.message).join(', ')}`
        )
    }

    const existingBranch = await getBranch(brandId)
    if (existingBranch) {
        throw new Error(`Branch ${brandId} already exists`)
    }

    const now = new Date()
    const branchData: Omit<Branch, 'id'> = {
        brandId,
        name: input.name,
        slug,
        description: input.description,
        status: 'draft',
        visibility: input.visibility || 'team',
        brandConfig,
        parentBranch: input.parentBranch || null,
        forkedFrom: input.forkFrom || null,
        owner: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        },
        meta: {},
        tags: input.tags || [],
        clientName: input.clientName,
        projectName: input.projectName,
        latestVersion: null,
        publishedCount: 0,
        snapshotCount: 0,
        createdBy: user.uid,
        createdAt: now,
        updatedAt: now,
        lastEditedBy: user.uid,
        lastPublishedAt: null,
        lastPublishedBy: null,
        isLocked: false,
        lockedBy: null,
        lockedAt: null,
    }

    await branchDoc(brandId).set({
        ...branchData,
        createdAt: firestoreTimestamp(now),
        updatedAt: firestoreTimestamp(now),
        lastPublishedAt: null,
        lockedAt: null,
    })

    return { id: brandId, ...branchData }
}

export async function updateBranch(
    branchId: string,
    input: UpdateBranchInput,
    user: { uid: string; email: string; displayName?: string }
): Promise<Branch> {
    const existing = await getBranch(branchId)
    if (!existing) {
        throw new Error(`Branch ${branchId} not found`)
    }

    if (existing.isLocked && existing.lockedBy !== user.uid) {
        throw new Error(`Branch is locked by ${existing.lockedBy}`)
    }

    if (input.brandConfig) {
        const validation = validateBrandConfig(input.brandConfig)
        if (!validation.valid) {
            throw new Error(
                `Invalid brand config: ${validation.errors.map((e) => e.message).join(', ')}`
            )
        }
    }

    const now = new Date()
    const updates: Record<string, unknown> = {
        updatedAt: firestoreTimestamp(now),
        lastEditedBy: user.uid,
        'meta.lastEditedByName': user.displayName,
        'meta.lastEditedByEmail': user.email,
    }

    if (input.name) updates.name = input.name
    if (input.description !== undefined) updates.description = input.description
    if (input.visibility) updates.visibility = input.visibility
    if (input.brandConfig) updates.brandConfig = input.brandConfig
    if (input.tags) updates.tags = input.tags
    if (input.clientName !== undefined) updates.clientName = input.clientName
    if (input.projectName !== undefined) updates.projectName = input.projectName

    await branchDoc(branchId).update(updates)

    const updated = await getBranch(branchId)
    if (!updated) {
        throw new Error('Failed to fetch updated branch')
    }

    return updated
}

export async function deleteBranch(
    branchId: string,
    user: { uid: string }
): Promise<void> {
    const existing = await getBranch(branchId)
    if (!existing) {
        throw new Error(`Branch ${branchId} not found`)
    }

    if (existing.owner.uid !== user.uid) {
        throw new Error('Only the branch owner can delete it')
    }

    const versionsSnapshot = await versionsCollection(branchId).limit(1).get()
    if (!versionsSnapshot.empty) {
        await branchDoc(branchId).update({ status: 'archived' })
        return
    }

    await branchDoc(branchId).delete()
}

export async function forkBranch(
    branchId: string,
    name: string,
    slug: string | undefined,
    user: {
        uid: string
        email: string
        displayName?: string
        photoURL?: string
    }
): Promise<Branch> {
    const source = await getBranch(branchId)
    if (!source) {
        throw new Error(`Branch ${branchId} not found`)
    }

    const newBrandId = slug
        ? `${user.email.split('@')[0].toLowerCase()}/${slug}`
        : `${user.email.split('@')[0].toLowerCase()}/${source.slug}-fork`

    const newBranch = await createBranch(
        {
            brandId: newBrandId,
            name,
            slug,
            brandConfig: source.brandConfig,
            forkFrom: {
                branchId,
                name: source.name,
                version: source.latestVersion || undefined,
            },
        },
        user
    )

    return newBranch
}

export async function publishVersion(
    branchId: string,
    input: CreateVersionInput,
    user: { uid: string; email: string; displayName?: string }
): Promise<Version> {
    const branch = await getBranch(branchId)
    if (!branch) {
        throw new Error(`Branch ${branchId} not found`)
    }

    const existingVersion = await versionsCollection(branchId)
        .doc(input.version.replace(/\./g, '_'))
        .get()
    if (existingVersion.exists) {
        throw new Error(`Version ${input.version} already exists`)
    }

    const now = new Date()
    const versionId = input.version.replace(/\./g, '_')

    const versionData: Omit<Version, 'id'> = {
        branchId,
        version: input.version,
        brandConfig: input.brandConfig,
        changelog: input.changelog,
        isBreaking: input.isBreaking || false,
        isPrerelease: input.isPrerelease || false,
        publishedBy: user.uid,
        publishedByName: user.displayName,
        publishedAt: now,
        downloadCount: 0,
        lastDownloadedAt: null,
        parentVersion: input.parentVersion || branch.latestVersion,
    }

    await versionsCollection(branchId)
        .doc(versionId)
        .set({
            ...versionData,
            publishedAt: firestoreTimestamp(now),
            lastDownloadedAt: null,
        })

    await branchDoc(branchId).update({
        status: 'published',
        latestVersion: input.version,
        publishedCount: FirebaseFirestore.FieldValue.increment(1),
        lastPublishedAt: firestoreTimestamp(now),
        lastPublishedBy: user.uid,
        updatedAt: firestoreTimestamp(now),
    })

    return { id: versionId, ...versionData }
}

export async function listVersions(branchId: string): Promise<Version[]> {
    const snapshot = await versionsCollection(branchId)
        .orderBy('publishedAt', 'desc')
        .get()
    return snapshot.docs
        .map(versionFromFirestore)
        .filter((v): v is Version => v !== null)
}

export async function getVersion(
    branchId: string,
    version: string
): Promise<Version | null> {
    const versionId = version.replace(/\./g, '_')
    const doc = await versionsCollection(branchId).doc(versionId).get()
    return versionFromFirestore(doc)
}

export async function createSnapshot(
    branchId: string,
    input: CreateSnapshotInput,
    user: { uid: string; email: string; displayName?: string }
): Promise<Snapshot> {
    const now = new Date()
    const snapshotId = now.getTime().toString()

    const snapshotData: Snapshot = {
        id: snapshotId,
        branchId,
        brandConfig: input.brandConfig,
        savedBy: user.uid,
        savedByName: user.displayName,
        savedAt: now,
        label: input.label,
        isAutoSave: input.isAutoSave ?? true,
    }

    await snapshotsCollection(branchId)
        .doc(snapshotId)
        .set({
            ...snapshotData,
            savedAt: firestoreTimestamp(now),
        })

    await branchDoc(branchId).update({
        snapshotCount: FirebaseFirestore.FieldValue.increment(1),
        updatedAt: firestoreTimestamp(now),
    })

    return snapshotData
}

export async function getBranchDiff(
    branchId: string,
    baseVersion: string | null,
    targetVersion: string
): Promise<BranchDiff> {
    const branch = await getBranch(branchId)
    if (!branch) {
        throw new Error(`Branch ${branchId} not found`)
    }

    let baseConfig: BrandConfig | null = null
    if (baseVersion) {
        const baseVer = await getVersion(branchId, baseVersion)
        baseConfig = baseVer?.brandConfig || null
    }

    let targetConfig: BrandConfig
    if (targetVersion === 'current' || targetVersion === 'draft') {
        targetConfig = branch.brandConfig
    } else {
        const targetVer = await getVersion(branchId, targetVersion)
        if (!targetVer) {
            throw new Error(`Version ${targetVersion} not found`)
        }
        targetConfig = targetVer.brandConfig
    }

    const diffs: BranchDiff['diffs'] = []

    const colorGroups = [
        'primary',
        'gray',
        'red',
        'green',
        'yellow',
        'orange',
        'purple',
    ] as const
    for (const group of colorGroups) {
        const baseColors = baseConfig?.colors?.[group] || {}
        const targetColors = targetConfig.colors?.[group] || {}
        const allShades = new Set([
            ...Object.keys(baseColors),
            ...Object.keys(targetColors),
        ])

        for (const shade of allShades) {
            const oldVal = baseColors[shade]
            const newVal = targetColors[shade]

            if (oldVal !== newVal) {
                diffs.push({
                    path: `colors.${group}.${shade}`,
                    oldValue: oldVal || null,
                    newValue: newVal || '',
                    type: !oldVal ? 'added' : !newVal ? 'removed' : 'changed',
                })
            }
        }
    }

    return {
        branchId,
        baseVersion,
        targetVersion,
        baseConfig,
        targetConfig,
        diffs,
    }
}
