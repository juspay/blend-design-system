import { firestoreCollections } from '@/config/firebase.js'
import { FieldValue } from 'firebase-admin/firestore'
import { logger } from '@/utils/logger.js'
import type {
    Branch,
    BranchVersion,
    BranchSnapshot,
} from '../domain/branch.types.js'

export const createBranch = async (
    branch: Omit<Branch, 'id'>
): Promise<Branch> => {
    const docRef = firestoreCollections.branches().doc()
    const newBranch: Branch = {
        ...branch,
        id: docRef.id,
    }

    await docRef.set({
        ...newBranch,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    logger.info({ branchId: newBranch.id }, 'Branch created')
    return newBranch
}

export const getBranchById = async (
    branchId: string
): Promise<Branch | null> => {
    logger.debug({ branchId }, 'Getting branch by ID')

    const docRef = firestoreCollections.branch(branchId)
    logger.debug({ path: docRef.path }, 'Document reference path')

    const doc = await docRef.get()

    logger.debug({ exists: doc.exists, branchId }, 'Branch lookup result')

    if (!doc.exists) return null

    return {
        id: doc.id,
        ...doc.data(),
    } as Branch
}

export const listBranches = async (
    options: {
        limit?: number
        cursor?: string
        createdBy?: string
    } = {}
): Promise<{ branches: Branch[]; nextCursor?: string }> => {
    let query = firestoreCollections
        .branches()
        .orderBy('createdAt', 'desc')
        .limit(options.limit || 20)

    if (options.cursor) {
        const cursorDoc = await firestoreCollections
            .branch(options.cursor)
            .get()
        if (cursorDoc.exists) {
            query = query.startAfter(cursorDoc)
        }
    }

    if (options.createdBy) {
        query = query.where('createdBy', '==', options.createdBy)
    }

    const snapshot = await query.get()
    const branches = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Branch[]

    const nextCursor =
        branches.length === (options.limit || 20)
            ? branches[branches.length - 1].id
            : undefined

    return { branches, nextCursor }
}

export const updateBranch = async (
    branchId: string,
    updates: Partial<Omit<Branch, 'id' | 'createdAt'>>
): Promise<Branch | null> => {
    const docRef = firestoreCollections.branch(branchId)
    const doc = await docRef.get()

    if (!doc.exists) return null

    await docRef.update({
        ...updates,
        updatedAt: new Date(),
    })

    return getBranchById(branchId)
}

export const deleteBranch = async (branchId: string): Promise<boolean> => {
    await firestoreCollections.branch(branchId).delete()
    logger.info({ branchId }, 'Branch deleted')
    return true
}

export const forkBranch = async (
    sourceBranchId: string,
    newName: string,
    createdBy: string
): Promise<Branch | null> => {
    const sourceBranch = await getBranchById(sourceBranchId)
    if (!sourceBranch) return null

    return createBranch({
        brandId: `${sourceBranch.brandId}-fork-${Date.now()}`,
        name: newName,
        parentBranch: sourceBranchId,
        status: 'draft',
        brandConfig: sourceBranch.brandConfig,
        createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedVersions: 0,
    })
}

export const createVersion = async (
    branchId: string,
    version: Omit<BranchVersion, 'id'>
): Promise<BranchVersion> => {
    const docRef = firestoreCollections.versions(branchId).doc()
    const newVersion: BranchVersion = {
        ...version,
        id: docRef.id,
    }

    await docRef.set(newVersion)

    await firestoreCollections.branch(branchId).update({
        status: 'published',
        publishedVersions: FieldValue.increment(1),
        updatedAt: new Date(),
    })

    logger.info({ branchId, version: version.version }, 'Branch published')
    return newVersion
}

export const listVersions = async (
    branchId: string,
    limit: number = 20
): Promise<BranchVersion[]> => {
    const snapshot = await firestoreCollections
        .versions(branchId)
        .orderBy('publishedAt', 'desc')
        .limit(limit)
        .get()

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as BranchVersion[]
}

export const getVersion = async (
    branchId: string,
    versionId: string
): Promise<BranchVersion | null> => {
    const doc = await firestoreCollections
        .versions(branchId)
        .doc(versionId)
        .get()

    if (!doc.exists) return null

    return {
        id: doc.id,
        ...doc.data(),
    } as BranchVersion
}

export const createSnapshot = async (
    branchId: string,
    snapshot: Omit<BranchSnapshot, 'id'>
): Promise<BranchSnapshot> => {
    const docRef = firestoreCollections.snapshots(branchId).doc()
    const newSnapshot: BranchSnapshot = {
        ...snapshot,
        id: docRef.id,
    }

    await docRef.set(newSnapshot)
    return newSnapshot
}

export const getLatestSnapshot = async (
    branchId: string
): Promise<BranchSnapshot | null> => {
    const snapshot = await firestoreCollections
        .snapshots(branchId)
        .orderBy('savedAt', 'desc')
        .limit(1)
        .get()

    if (snapshot.empty) return null

    const doc = snapshot.docs[0]
    return {
        id: doc.id,
        ...doc.data(),
    } as BranchSnapshot
}
