import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export interface MergeRequestApprovalRow {
    id: string
    mergeRequestId: string
    userId: string
    userName: string
    userRole: string
    approvedAt: Date
}

export interface MergeRequestRow {
    id: string
    organizationId: string | null
    sourceBranchId: string
    sourceBranchName: string
    targetBranchId: string
    targetBranchName: string
    title: string
    description: string | null
    status: 'pending' | 'approved' | 'rejected' | 'merged' | 'cancelled'
    diff: unknown
    lockViolations: unknown
    requestedBy: string
    reviewedBy: string | null
    reviewedAt: Date | null
    reviewComment: string | null
    mergedAt: Date | null
    createdAt: Date
    updatedAt: Date
    approvals: MergeRequestApprovalRow[]
}

const includeApprovals = {
    approvals: {
        orderBy: {
            approvedAt: 'asc' as const,
        },
    },
}

export const createMergeRequest = async (data: {
    organizationId: string | null
    sourceBranchId: string
    sourceBranchName: string
    targetBranchId: string
    targetBranchName: string
    title: string
    description?: string
    diff: unknown
    lockViolations?: unknown
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
            diff: data.diff as any,
            lockViolations: (data.lockViolations ?? null) as any,
            requestedBy: data.requestedBy,
        },
        include: includeApprovals,
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
    const mr = await prisma.mergeRequest.findUnique({
        where: { id },
        include: includeApprovals,
    })
    return mr as unknown as MergeRequestRow | null
}

export const listMergeRequests = async (
    options: {
        organizationId?: string
        status?: 'pending' | 'approved' | 'rejected' | 'merged' | 'cancelled'
        requestedBy?: string
        sourceBranchId?: string
        targetBranchId?: string
        limit?: number
        cursor?: string
    } = {}
): Promise<{ mergeRequests: MergeRequestRow[]; nextCursor?: string }> => {
    const limit = options.limit || 20
    const where: Record<string, unknown> = {}

    if (options.organizationId) where.organizationId = options.organizationId
    if (options.status) where.status = options.status
    if (options.requestedBy) where.requestedBy = options.requestedBy
    if (options.sourceBranchId) where.sourceBranchId = options.sourceBranchId
    if (options.targetBranchId) where.targetBranchId = options.targetBranchId
    if (options.cursor) where.id = { lt: options.cursor }

    const mergeRequests = await prisma.mergeRequest.findMany({
        where: where as any,
        include: includeApprovals,
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

export const addMergeRequestApproval = async (
    mergeRequestId: string,
    data: {
        userId: string
        userName: string
        userRole: string
    }
): Promise<MergeRequestApprovalRow> => {
    const approval = await prisma.mergeRequestApproval.create({
        data: {
            mergeRequestId,
            userId: data.userId,
            userName: data.userName,
            userRole: data.userRole,
        },
    })

    logger.info(
        {
            mergeRequestId,
            userId: data.userId,
        },
        'Merge request approval recorded'
    )

    return approval as unknown as MergeRequestApprovalRow
}

export const updateMergeRequestStatus = async (
    id: string,
    data: {
        status: 'pending' | 'approved' | 'rejected' | 'merged' | 'cancelled'
        reviewedBy?: string
        reviewComment?: string
    }
): Promise<MergeRequestRow | null> => {
    const updateData: Record<string, unknown> = { status: data.status }

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
        data: updateData as any,
        include: includeApprovals,
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
        include: includeApprovals,
    })
    logger.info({ mrId: id }, 'Merge request cancelled')
    return mr as unknown as MergeRequestRow | null
}
