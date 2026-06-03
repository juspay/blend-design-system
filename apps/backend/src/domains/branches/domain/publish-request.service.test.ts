import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
    approvePublishRequest,
    executePublishRequest,
} from './publish-request.service.js'

import * as publishRequestRepository from '@/domains/branches/data-access/publish-request.repository.js'
import * as branchRepository from '@/domains/branches/data-access/branch.repository.js'
import * as organizationRepository from '@/domains/organizations/data-access/organization.repository.js'
import * as userRepository from '@/domains/users/data-access/user.repository.js'
import * as auditLogRepository from '@/domains/audit/data-access/auditlog.repository.js'

vi.mock('@/domains/branches/data-access/publish-request.repository.js')
vi.mock('@/domains/branches/data-access/branch.repository.js')
vi.mock('@/domains/organizations/data-access/organization.repository.js')
vi.mock('@/domains/users/data-access/user.repository.js')
vi.mock('@/domains/audit/data-access/auditlog.repository.js')

const mockedPublishRequestRepository = vi.mocked(publishRequestRepository)
const mockedBranchRepository = vi.mocked(branchRepository)
const mockedOrganizationRepository = vi.mocked(organizationRepository)
const mockedUserRepository = vi.mocked(userRepository)
const mockedAuditLogRepository = vi.mocked(auditLogRepository)

describe('publish-request.service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('blocks self approval for publish requests', async () => {
        mockedPublishRequestRepository.getPublishRequestById.mockResolvedValue({
            id: 'pr-1',
            organizationId: 'org-1',
            branchId: 'branch-1',
            branchName: 'Main',
            requestedBy: 'user-1',
            status: 'pending' as const,
            version: '1.0.0',
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
            approvePublishRequest('pr-1', 'ok', 'user-1', 'user@blend.dev')
        ).rejects.toMatchObject({
            code: 'FORBIDDEN',
            message: 'You cannot approve your own publish request',
        })
    })

    it('records approval and marks publish request approved', async () => {
        mockedPublishRequestRepository.getPublishRequestById
            .mockResolvedValueOnce({
                id: 'pr-1',
                organizationId: 'org-1',
                branchId: 'branch-1',
                branchName: 'Main',
                requestedBy: 'requester-1',
                status: 'pending' as const,
                version: '1.0.0',
                approvals: [],
            } as any)
            .mockResolvedValueOnce({
                id: 'pr-1',
                organizationId: 'org-1',
                branchId: 'branch-1',
                branchName: 'Main',
                requestedBy: 'requester-1',
                status: 'pending' as const,
                version: '1.0.0',
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
            id: 'branch-1',
            createdBy: 'owner-1',
            isProtected: true,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            protectionApproverIds: [],
        } as any)

        mockedOrganizationRepository.getOrganizationById.mockResolvedValue({
            id: 'org-1',
            defaultBranchId: 'branch-1',
            requireApprovalForMerge: true,
            requireApprovalForPublish: true,
            allowedApprovers: 'admins',
            minApprovals: 1,
            allowAdminBypass: false,
        } as any)

        mockedUserRepository.findUserById.mockResolvedValue({
            id: 'approver-1',
            email: 'approver@blend.dev',
            displayName: 'Approver User',
        } as any)

        mockedPublishRequestRepository.addPublishRequestApproval.mockResolvedValue(
            {
                id: 'approval-1',
            } as any
        )

        mockedPublishRequestRepository.updatePublishRequestStatus.mockResolvedValue(
            {
                id: 'pr-1',
                status: 'approved' as const,
                approvals: [{ id: 'approval-1' }],
            } as any
        )

        const result = await approvePublishRequest(
            'pr-1',
            'approve',
            'approver-1',
            'approver@blend.dev'
        )

        expect(
            mockedPublishRequestRepository.addPublishRequestApproval
        ).toHaveBeenCalledTimes(1)
        expect(
            mockedPublishRequestRepository.updatePublishRequestStatus
        ).toHaveBeenCalledWith(
            'pr-1',
            expect.objectContaining({ status: 'approved' })
        )
        expect(mockedAuditLogRepository.createAuditLog).toHaveBeenCalledTimes(1)
        expect(result).toEqual(expect.objectContaining({ status: 'approved' }))
    })

    it('executes publish with admin bypass when policy allows', async () => {
        mockedPublishRequestRepository.getPublishRequestById.mockResolvedValue({
            id: 'pr-1',
            organizationId: 'org-1',
            branchId: 'branch-1',
            branchName: 'Main',
            requestedBy: 'requester-1',
            requestedByName: 'Requester User',
            status: 'pending' as const,
            version: '1.0.0',
            changelog: 'release',
            isBreaking: false,
            isPrerelease: false,
            approvals: [],
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

        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            createdBy: 'owner-1',
            tokenConfig: { colors: {} },
            isProtected: true,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            protectionApproverIds: [],
        } as any)

        mockedOrganizationRepository.getOrganizationById.mockResolvedValue({
            id: 'org-1',
            defaultBranchId: 'branch-1',
            requireApprovalForMerge: true,
            requireApprovalForPublish: true,
            allowedApprovers: 'admins',
            minApprovals: 2,
            allowAdminBypass: true,
        } as any)

        mockedBranchRepository.createVersion.mockResolvedValue({
            id: 'version-1',
            branchId: 'branch-1',
            version: '1.0.0',
        } as any)

        mockedPublishRequestRepository.updatePublishRequestStatus.mockResolvedValue(
            {
                id: 'pr-1',
                status: 'published' as const,
            } as any
        )

        const result = await executePublishRequest(
            'pr-1',
            'admin-1',
            'Admin User',
            'admin@blend.dev'
        )

        expect(mockedBranchRepository.createVersion).toHaveBeenCalledTimes(1)
        expect(
            mockedPublishRequestRepository.updatePublishRequestStatus
        ).toHaveBeenCalledWith(
            'pr-1',
            expect.objectContaining({ status: 'published' })
        )
        expect(mockedAuditLogRepository.createAuditLog).toHaveBeenCalledTimes(1)
        expect(result.publishRequest).toEqual(
            expect.objectContaining({ status: 'published' })
        )
    })

    it('rejects execute publish when not approved and bypass disabled', async () => {
        mockedPublishRequestRepository.getPublishRequestById.mockResolvedValue({
            id: 'pr-1',
            organizationId: 'org-1',
            branchId: 'branch-1',
            branchName: 'Main',
            requestedBy: 'requester-1',
            requestedByName: 'Requester User',
            status: 'pending' as const,
            version: '1.0.0',
            changelog: 'release',
            isBreaking: false,
            isPrerelease: false,
            approvals: [],
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

        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            createdBy: 'owner-1',
            tokenConfig: { colors: {} },
            isProtected: true,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            protectionApproverIds: [],
        } as any)

        mockedOrganizationRepository.getOrganizationById.mockResolvedValue({
            id: 'org-1',
            defaultBranchId: 'branch-1',
            requireApprovalForMerge: true,
            requireApprovalForPublish: true,
            allowedApprovers: 'admins',
            minApprovals: 1,
            allowAdminBypass: false,
        } as any)

        await expect(
            executePublishRequest(
                'pr-1',
                'admin-1',
                'Admin User',
                'admin@blend.dev'
            )
        ).rejects.toMatchObject({
            code: 'VALIDATION_ERROR',
            message: 'This publish request requires at least 1 approvals',
        })
    })
})
