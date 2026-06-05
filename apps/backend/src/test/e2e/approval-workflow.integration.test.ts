import { beforeEach, describe, expect, it } from 'vitest'

import {
    createMergeRequest,
    approveMergeRequest,
    mergeMergeRequest,
} from '@/domains/mergerequests/domain/merge-request.service.js'
import {
    approvePublishRequest,
    executePublishRequest,
} from '@/domains/branches/domain/publish-request.service.js'
import { publishBranch } from '@/domains/branches/domain/branch.service.js'
import { prisma } from '@/config/database.js'

const organizationId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
const adminUserId = '11111111-1111-4111-8111-111111111111'
const editorUserId = '22222222-2222-4222-8222-222222222222'

const defaultBranchId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
const featureBranchId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'

const baseBrandConfig = {
    brandId: 'acme/default',
    name: 'Acme Brand',
    version: '1.0.0',
    colors: {
        primary: {
            '500': '#2563EB',
        },
    },
}

describe('approval workflow integration', () => {
    beforeEach(async () => {
        const organization = await prisma.organization.create({
            data: {
                id: organizationId,
                name: 'Acme Design',
                slug: 'acme-design',
                requireApprovalForMerge: true,
                requireApprovalForPublish: true,
                allowedApprovers: 'admins',
                minApprovals: 1,
                allowAdminBypass: false,
            },
        })

        await prisma.user.createMany({
            data: [
                {
                    id: adminUserId,
                    email: 'admin@blend.dev',
                    displayName: 'Admin User',
                    systemRole: 'admin',
                    isActive: true,
                },
                {
                    id: editorUserId,
                    email: 'editor@blend.dev',
                    displayName: 'Editor User',
                    systemRole: 'editor',
                    isActive: true,
                },
            ],
        })

        await prisma.member.createMany({
            data: [
                {
                    organizationId: organization.id,
                    userId: adminUserId,
                    orgRole: 'admin',
                },
                {
                    organizationId: organization.id,
                    userId: editorUserId,
                    orgRole: 'editor',
                },
            ],
        })

        await prisma.branch.createMany({
            data: [
                {
                    id: defaultBranchId,
                    organizationId,
                    branchSlug: 'acme/default',
                    name: 'Default Branch',
                    status: 'published',
                    visibility: 'team',
                    tokenConfig: baseBrandConfig as any,
                    createdBy: adminUserId,
                    createdByName: 'Admin User',
                    isProtected: true,
                    protectionRequireApproval: true,
                    protectionMinApprovals: 1,
                },
                {
                    id: featureBranchId,
                    organizationId,
                    branchSlug: 'acme/feature',
                    name: 'Feature Branch',
                    status: 'draft',
                    visibility: 'team',
                    tokenConfig: {
                        ...baseBrandConfig,
                        colors: {
                            primary: {
                                '500': '#DC2626',
                            },
                        },
                    } as any,
                    createdBy: editorUserId,
                    createdByName: 'Editor User',
                    parentBranchId: defaultBranchId,
                    isProtected: true,
                    protectionRequireApproval: true,
                    protectionMinApprovals: 1,
                },
            ],
        })

        await prisma.organization.update({
            where: { id: organizationId },
            data: { defaultBranchId },
        })
    })

    it('completes merge workflow create -> approve -> merge', async () => {
        const mergeRequest = await createMergeRequest(
            organizationId,
            featureBranchId,
            defaultBranchId,
            'Promote feature changes',
            'Ready for merge',
            editorUserId,
            'editor@blend.dev'
        )

        expect(mergeRequest.status).toBe('pending')

        const approvedMergeRequest = await approveMergeRequest(
            mergeRequest.id,
            'Approved by admin',
            adminUserId,
            'admin@blend.dev'
        )

        expect(approvedMergeRequest?.status).toBe('approved')

        const mergedMergeRequest = await mergeMergeRequest(
            mergeRequest.id,
            adminUserId,
            'admin@blend.dev'
        )

        expect(mergedMergeRequest?.status).toBe('merged')

        const targetBranch = await prisma.branch.findUnique({
            where: { id: defaultBranchId },
        })
        expect(targetBranch?.tokenConfig).toBeTruthy()
    })

    it('completes publish workflow request -> approve -> execute', async () => {
        const publishResult = await publishBranch(
            featureBranchId,
            {
                version: '1.1.0',
                changelog: 'Feature release',
                isBreaking: false,
                isPrerelease: false,
            },
            editorUserId,
            'Editor User',
            'editor@blend.dev'
        )

        expect(publishResult.mode).toBe('approval_required')
        if (publishResult.mode !== 'approval_required') {
            throw new Error('Expected approval_required publish mode')
        }

        const publishRequestId = publishResult.publishRequest.id

        const approvedPublishRequest = await approvePublishRequest(
            publishRequestId,
            'Approved for publish',
            adminUserId,
            'admin@blend.dev'
        )
        expect(approvedPublishRequest?.status).toBe('approved')

        const executionResult = await executePublishRequest(
            publishRequestId,
            adminUserId,
            'Admin User',
            'admin@blend.dev'
        )

        expect(executionResult.publishRequest?.status).toBe('published')
        expect(executionResult.version.version).toBe('1.1.0')

        const persistedPublishRequest = await prisma.publishRequest.findUnique({
            where: { id: publishRequestId },
        })
        expect(persistedPublishRequest?.status).toBe('published')
    })
})
