import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export interface PublishRequestApprovalRow {
    id: string
    publishRequestId: string
    userId: string
    userName: string
    userRole: string
    approvedAt: Date
}

export interface PublishRequestRow {
    id: string
    organizationId: string | null
    branchId: string
    branchName: string
    version: string
    changelog: string | null
    isBreaking: boolean
    isPrerelease: boolean
    status: 'pending' | 'approved' | 'rejected' | 'published' | 'cancelled'
    requestedBy: string
    requestedByName: string
    reviewComment: string | null
    publishedVersionId: string | null
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    approvals: PublishRequestApprovalRow[]
}

const includeApprovals = {
    approvals: {
        orderBy: {
            approvedAt: 'asc' as const,
        },
    },
}

export const createPublishRequest = async (data: {
    organizationId: string | null
    branchId: string
    branchName: string
    version: string
    changelog?: string
    isBreaking?: boolean
    isPrerelease?: boolean
    requestedBy: string
    requestedByName: string
}): Promise<PublishRequestRow> => {
    const request = await prisma.publishRequest.create({
        data: {
            organizationId: data.organizationId,
            branchId: data.branchId,
            branchName: data.branchName,
            version: data.version,
            changelog: data.changelog || null,
            isBreaking: data.isBreaking || false,
            isPrerelease: data.isPrerelease || false,
            requestedBy: data.requestedBy,
            requestedByName: data.requestedByName,
        },
        include: includeApprovals,
    })

    logger.info(
        {
            publishRequestId: request.id,
            branchId: data.branchId,
            organizationId: data.organizationId,
        },
        'Publish request created'
    )

    return request as unknown as PublishRequestRow
}

export const getPublishRequestById = async (
    id: string
): Promise<PublishRequestRow | null> => {
    const request = await prisma.publishRequest.findUnique({
        where: { id },
        include: includeApprovals,
    })

    return request as unknown as PublishRequestRow | null
}

export const listPublishRequests = async (
    options: {
        organizationId?: string
        branchId?: string
        status?: 'pending' | 'approved' | 'rejected' | 'published' | 'cancelled'
        requestedBy?: string
        limit?: number
        cursor?: string
    } = {}
): Promise<{ publishRequests: PublishRequestRow[]; nextCursor?: string }> => {
    const limit = options.limit || 20
    const where: Record<string, unknown> = {}

    if (options.organizationId) where.organizationId = options.organizationId
    if (options.branchId) where.branchId = options.branchId
    if (options.status) where.status = options.status
    if (options.requestedBy) where.requestedBy = options.requestedBy
    if (options.cursor) where.id = { lt: options.cursor }

    const publishRequests = await prisma.publishRequest.findMany({
        where: where as any,
        include: includeApprovals,
        orderBy: { createdAt: 'desc' },
        take: limit + 1,
    })

    let nextCursor: string | undefined
    if (publishRequests.length > limit) {
        nextCursor = publishRequests[limit - 1].id
        publishRequests.pop()
    }

    return {
        publishRequests: publishRequests as unknown as PublishRequestRow[],
        nextCursor,
    }
}

export const addPublishRequestApproval = async (
    publishRequestId: string,
    data: {
        userId: string
        userName: string
        userRole: string
    }
): Promise<PublishRequestApprovalRow> => {
    const approval = await prisma.publishRequestApproval.create({
        data: {
            publishRequestId,
            userId: data.userId,
            userName: data.userName,
            userRole: data.userRole,
        },
    })

    logger.info(
        {
            publishRequestId,
            userId: data.userId,
        },
        'Publish request approval recorded'
    )

    return approval as unknown as PublishRequestApprovalRow
}

export const updatePublishRequestStatus = async (
    id: string,
    data: {
        status: 'pending' | 'approved' | 'rejected' | 'published' | 'cancelled'
        reviewComment?: string
        publishedVersionId?: string
        reviewedAt?: Date
        publishedAt?: Date
    }
): Promise<PublishRequestRow | null> => {
    const updateData: Record<string, unknown> = {
        status: data.status,
    }

    if (data.reviewComment !== undefined) {
        updateData.reviewComment = data.reviewComment
    }
    if (data.publishedVersionId) {
        updateData.publishedVersionId = data.publishedVersionId
    }
    if (data.publishedAt) {
        updateData.publishedAt = data.publishedAt
    }

    const request = await prisma.publishRequest.update({
        where: { id },
        data: updateData as any,
        include: includeApprovals,
    })

    logger.info(
        {
            publishRequestId: id,
            status: data.status,
        },
        'Publish request status updated'
    )

    return request as unknown as PublishRequestRow
}

// Atomic execution claim for publish requests (rescan round-2, CWE-367):
// conditional status transition, version creation and branch counters all
// happen inside one transaction. Returns null when the request was
// concurrently transitioned (e.g. cancelled) between the read and the write,
// so a racing execute/cancel pair can never produce a double publish.
export const applyPublish = async (
    id: string,
    expectedStatus: PublishRequestRow['status'],
    branchId: string,
    versionData: {
        version: string
        tokenConfig: unknown
        changelog?: string | null
        isBreaking?: boolean
        isPrerelease?: boolean
        publishedBy: string
        publishedByName: string
    }
): Promise<{
    publishRequest: PublishRequestRow
    version: unknown
} | null> => {
    const result = await prisma.$transaction(async (tx: any) => {
        const claimed = await tx.publishRequest.updateMany({
            where: { id, status: expectedStatus },
            data: { status: 'published', publishedAt: new Date() },
        })
        if (claimed.count === 0) {
            return null
        }

        const version = await tx.branchVersion.create({
            data: {
                branchId,
                version: versionData.version,
                tokenConfig: versionData.tokenConfig as any,
                changelog: versionData.changelog || null,
                isBreaking: versionData.isBreaking || false,
                isPrerelease: versionData.isPrerelease || false,
                publishedBy: versionData.publishedBy,
                publishedByName: versionData.publishedByName,
            },
        })

        await tx.branch.update({
            where: { id: branchId },
            data: {
                status: 'published',
                publishedVersions: { increment: 1 },
                latestVersion: versionData.version,
            },
        })

        const publishRequest = await tx.publishRequest.update({
            where: { id },
            data: { publishedVersionId: version.id },
            include: includeApprovals,
        })

        return { publishRequest, version }
    })

    if (result) {
        logger.info(
            { publishRequestId: id, version: versionData.version },
            'Publish request executed'
        )
    }
    return result as {
        publishRequest: PublishRequestRow
        version: unknown
    } | null
}
