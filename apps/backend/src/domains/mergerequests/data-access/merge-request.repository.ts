import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export interface MergeRequestRow {
    id: string
    organizationId: string
    sourceBranchId: string
    sourceBranchName: string
    targetBranchId: string
    targetBranchName: string
    title: string
    description: string | null
    status: string
    diff: any
    lockViolations: any
    requestedBy: string
    reviewedBy: string | null
    reviewedAt: Date | null
    reviewComment: string | null
    mergedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

export const createMergeRequest = async (data: {
    organizationId: string
    sourceBranchId: string
    sourceBranchName: string
    targetBranchId: string
    targetBranchName: string
    title: string
    description?: string
    diff: any
    lockViolations?: any
    requestedBy: string
}): Promise<MergeRequestRow> => {
    const mr = await prisma.mergeRequest.create({
        data: {
            organizationId: data.organizationId,
            sourceBranchId: data.sourceBranchId,
            sourceBranchName: data.sourceBranchName,
            targetBranchId: data.targetBranchId,
            targetBranchName: data.targetBranchName,
            title: data.title,
            description: data.description || null,
            diff: data.diff,
            lockViolations: data.lockViolations || null,
            requestedBy: data.requestedBy,
        },
    })
    logger.info(
        { mrId: mr.id, orgId: data.organizationId },
        'Merge request created'
    )
    return mr as unknown as MergeRequestRow
}

export const getMergeRequest = async (
    id: string
): Promise<MergeRequestRow | null> => {
    const mr = await prisma.mergeRequest.findUnique({ where: { id } })
    return mr as unknown as MergeRequestRow | null
}

export const listMergeRequests = async (
    options: {
        organizationId?: string
        status?: string
        requestedBy?: string
        limit?: number
        cursor?: string
    } = {}
): Promise<{ mergeRequests: MergeRequestRow[]; nextCursor?: string }> => {
    const limit = options.limit || 20
    const where: any = {}

    if (options.organizationId) where.organizationId = options.organizationId
    if (options.status) where.status = options.status
    if (options.requestedBy) where.requestedBy = options.requestedBy
    if (options.cursor) where.id = { lt: options.cursor }

    const mergeRequests = await prisma.mergeRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit + 1,
    })

    let nextCursor: string | undefined
    if (mergeRequests.length > limit) {
        nextCursor = mergeRequests[limit - 1].id
        mergeRequests.pop()
    }

    return {
        mergeRequests: mergeRequests as unknown as MergeRequestRow[],
        nextCursor,
    }
}

export const updateMergeRequestStatus = async (
    id: string,
    data: {
        status: string
        reviewedBy?: string
        reviewComment?: string
    }
): Promise<MergeRequestRow | null> => {
    const updateData: any = { status: data.status }

    if (data.reviewedBy) updateData.reviewedBy = data.reviewedBy
    if (data.reviewComment !== undefined)
        updateData.reviewComment = data.reviewComment

    if (data.status === 'approved' || data.status === 'rejected') {
        updateData.reviewedAt = new Date()
    }

    if (data.status === 'merged') {
        updateData.mergedAt = new Date()
        updateData.reviewedAt = new Date()
    }

    const mr = await prisma.mergeRequest.update({
        where: { id },
        data: updateData,
    })

    logger.info(
        { mrId: id, status: data.status },
        'Merge request status updated'
    )
    return mr as unknown as MergeRequestRow | null
}

export const cancelMergeRequest = async (
    id: string
): Promise<MergeRequestRow | null> => {
    const mr = await prisma.mergeRequest.update({
        where: { id },
        data: { status: 'cancelled' },
    })
    logger.info({ mrId: id }, 'Merge request cancelled')
    return mr as unknown as MergeRequestRow | null
}
