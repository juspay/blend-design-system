import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
    approveMergeRequest,
    mergeMergeRequest,
} from './merge-request.service.js'

import * as mergeRequestRepository from '../data-access/merge-request.repository.js'
import * as branchRepository from '@/domains/branches/data-access/branch.repository.js'
import * as organizationRepository from '@/domains/organizations/data-access/organization.repository.js'
import * as userRepository from '@/domains/users/data-access/user.repository.js'
import * as lockService from '@/domains/locks/domain/lock.service.js'
import * as auditLogRepository from '@/domains/audit/data-access/auditlog.repository.js'

vi.mock('../data-access/merge-request.repository.js')
vi.mock('@/domains/branches/data-access/branch.repository.js')
vi.mock('@/domains/organizations/data-access/organization.repository.js')
vi.mock('@/domains/users/data-access/user.repository.js')
vi.mock('@/domains/locks/domain/lock.service.js')
vi.mock('@/domains/audit/data-access/auditlog.repository.js')

const mockedMergeRequestRepository = vi.mocked(mergeRequestRepository)
const mockedBranchRepository = vi.mocked(branchRepository)
const mockedOrganizationRepository = vi.mocked(organizationRepository)
const mockedUserRepository = vi.mocked(userRepository)
const mockedLockService = vi.mocked(lockService)
const mockedAuditLogRepository = vi.mocked(auditLogRepository)

describe('merge-request.service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('blocks self approval for merge requests', async () => {
        mockedMergeRequestRepository.getMergeRequest.mockResolvedValue({
            id: 'mr-1',
            organizationId: 'org-1',
            sourceBranchId: 'source-1',
            targetBranchId: 'target-1',
            requestedBy: 'user-1',
            status: 'pending' as const,
            approvals: [],
        } as any)

        mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
            {
                id: 'member-1',
                organizationId: 'org-1',
                userId: 'user-1',
                role: 'admin',
                joinedAt: new Date(),
            }
        )

        await expect(
            approveMergeRequest(
                'mr-1',
                'looks good',
                'user-1',
                'user@blend.dev'
            )
        ).rejects.toMatchObject({
            code: 'FORBIDDEN',
            message: 'You cannot approve your own merge request',
        })
    })

    it('records approval and sets approved status when threshold reached', async () => {
        mockedMergeRequestRepository.getMergeRequest
            .mockResolvedValueOnce({
                id: 'mr-1',
                organizationId: 'org-1',
                sourceBranchId: 'source-1',
                targetBranchId: 'target-1',
                requestedBy: 'requester-1',
                status: 'pending' as const,
                approvals: [],
            } as any)
            .mockResolvedValueOnce({
                id: 'mr-1',
                organizationId: 'org-1',
                sourceBranchId: 'source-1',
                targetBranchId: 'target-1',
                requestedBy: 'requester-1',
                status: 'pending' as const,
                approvals: [{ id: 'approval-1' }],
            } as any)

        mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
            {
                id: 'member-1',
                organizationId: 'org-1',
                userId: 'approver-1',
                role: 'admin',
                joinedAt: new Date(),
            }
        )

        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'target-1',
            createdBy: 'owner-1',
            isProtected: true,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            protectionApproverIds: [],
            tokenConfig: {},
        } as any)

        mockedOrganizationRepository.getOrganizationById.mockResolvedValue({
            id: 'org-1',
            defaultBranchId: 'target-1',
            requireApprovalForMerge: true,
            requireApprovalForPublish: false,
            allowedApprovers: 'admins',
            minApprovals: 1,
            allowAdminBypass: false,
        } as any)

        mockedUserRepository.findUserById.mockResolvedValue({
            id: 'approver-1',
            email: 'approver@blend.dev',
            displayName: 'Approver User',
        } as any)

        mockedMergeRequestRepository.addMergeRequestApproval.mockResolvedValue({
            id: 'approval-1',
        } as any)

        mockedMergeRequestRepository.updateMergeRequestStatus.mockResolvedValue(
            {
                id: 'mr-1',
                status: 'approved' as const,
                approvals: [{ id: 'approval-1' }],
            } as any
        )

        const result = await approveMergeRequest(
            'mr-1',
            'approved',
            'approver-1',
            'approver@blend.dev'
        )

        expect(
            mockedMergeRequestRepository.addMergeRequestApproval
        ).toHaveBeenCalledTimes(1)
        expect(
            mockedMergeRequestRepository.updateMergeRequestStatus
        ).toHaveBeenCalledWith(
            'mr-1',
            expect.objectContaining({
                status: 'approved',
                reviewedBy: 'approver-1',
            })
        )
        expect(mockedAuditLogRepository.createAuditLog).toHaveBeenCalledTimes(1)
        expect(result).toEqual(expect.objectContaining({ status: 'approved' }))
    })

    it('allows admin bypass merge when configured', async () => {
        mockedMergeRequestRepository.getMergeRequest.mockResolvedValue({
            id: 'mr-1',
            organizationId: 'org-1',
            sourceBranchId: 'source-1',
            targetBranchId: 'target-1',
            requestedBy: 'requester-1',
            status: 'pending' as const,
            approvals: [],
        } as any)

        mockedBranchRepository.getBranchById
            .mockResolvedValueOnce({
                id: 'source-1',
                tokenConfig: { colors: {} },
            } as any)
            .mockResolvedValueOnce({
                id: 'target-1',
                createdBy: 'owner-1',
                tokenConfig: { colors: {} },
                isProtected: true,
                protectionRequireApproval: null,
                protectionMinApprovals: null,
                protectionApproverIds: [],
            } as any)

        mockedOrganizationRepository.getOrganizationById.mockResolvedValue({
            id: 'org-1',
            defaultBranchId: 'target-1',
            requireApprovalForMerge: true,
            requireApprovalForPublish: false,
            allowedApprovers: 'admins',
            minApprovals: 2,
            allowAdminBypass: true,
        } as any)

        mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
            {
                id: 'member-1',
                organizationId: 'org-1',
                userId: 'admin-1',
                role: 'admin',
                joinedAt: new Date(),
            }
        )

        mockedLockService.validateBranchAgainstLocks.mockResolvedValue([])
        mockedBranchRepository.updateBranch.mockResolvedValue({
            id: 'target-1',
        } as any)
        mockedMergeRequestRepository.updateMergeRequestStatus.mockResolvedValue(
            {
                id: 'mr-1',
                status: 'merged' as const,
            } as any
        )

        const merged = await mergeMergeRequest(
            'mr-1',
            'admin-1',
            'admin@blend.dev'
        )

        expect(mockedBranchRepository.updateBranch).toHaveBeenCalledTimes(1)
        expect(
            mockedMergeRequestRepository.updateMergeRequestStatus
        ).toHaveBeenCalledWith(
            'mr-1',
            expect.objectContaining({ status: 'merged', reviewedBy: 'admin-1' })
        )
        expect(mockedAuditLogRepository.createAuditLog).toHaveBeenCalledTimes(1)
        expect(merged).toEqual(expect.objectContaining({ status: 'merged' }))
    })

    it('prevents merge when approvals are required and bypass disabled', async () => {
        mockedMergeRequestRepository.getMergeRequest.mockResolvedValue({
            id: 'mr-1',
            organizationId: 'org-1',
            sourceBranchId: 'source-1',
            targetBranchId: 'target-1',
            requestedBy: 'requester-1',
            status: 'approved' as const,
            approvals: [],
        } as any)

        mockedBranchRepository.getBranchById
            .mockResolvedValueOnce({
                id: 'source-1',
                tokenConfig: { colors: {} },
            } as any)
            .mockResolvedValueOnce({
                id: 'target-1',
                createdBy: 'owner-1',
                tokenConfig: { colors: {} },
                isProtected: true,
                protectionRequireApproval: null,
                protectionMinApprovals: null,
                protectionApproverIds: [],
            } as any)

        mockedOrganizationRepository.getOrganizationById.mockResolvedValue({
            id: 'org-1',
            defaultBranchId: 'target-1',
            requireApprovalForMerge: true,
            requireApprovalForPublish: false,
            allowedApprovers: 'admins',
            minApprovals: 1,
            allowAdminBypass: false,
        } as any)

        mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
            {
                id: 'member-1',
                organizationId: 'org-1',
                userId: 'admin-1',
                role: 'admin',
                joinedAt: new Date(),
            }
        )

        await expect(
            mergeMergeRequest('mr-1', 'admin-1', 'admin@blend.dev')
        ).rejects.toMatchObject({
            code: 'VALIDATION_ERROR',
            message: 'This merge request requires at least 1 approvals',
        })
    })
})
