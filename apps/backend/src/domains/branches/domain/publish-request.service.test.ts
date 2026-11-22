import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
    approvePublishRequest,
    executePublishRequest,
    listPublishRequests,
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

        mockedPublishRequestRepository.applyPublish.mockResolvedValue({
            publishRequest: {
                id: 'pr-1',
                status: 'published' as const,
            },
            version: {
                id: 'version-1',
                branchId: 'branch-1',
                version: '1.0.0',
            },
        } as any)

        const result = await executePublishRequest(
            'pr-1',
            'admin-1',
            'Admin User',
            'admin@blend.dev'
        )

        expect(
            mockedPublishRequestRepository.applyPublish
        ).toHaveBeenCalledWith(
            'pr-1',
            'pending',
            'branch-1',
            expect.objectContaining({ version: '1.0.0' })
        )
        expect(mockedAuditLogRepository.createAuditLog).toHaveBeenCalledTimes(1)
        expect(result.publishRequest).toEqual(
            expect.objectContaining({ status: 'published' })
        )
    })

    it('aborts the publish when a concurrent transition already claimed the request', async () => {
        mockedPublishRequestRepository.getPublishRequestById.mockResolvedValue({
            id: 'pr-1',
            organizationId: 'org-1',
            branchId: 'branch-1',
            branchName: 'Main',
            requestedBy: 'requester-1',
            requestedByName: 'Requester User',
            status: 'approved' as const,
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
            allowAdminBypass: true,
        } as any)

        // Conditional claim lost the race (e.g. a cancel landed first).
        mockedPublishRequestRepository.applyPublish.mockResolvedValue(null)

        await expect(
            executePublishRequest(
                'pr-1',
                'admin-1',
                'Admin User',
                'admin@blend.dev'
            )
        ).rejects.toMatchObject({
            code: 'VALIDATION_ERROR',
            message: 'This publish request is no longer executable',
        })

        expect(mockedAuditLogRepository.createAuditLog).not.toHaveBeenCalled()
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

    it('does not count the requester own approval toward the approval threshold', async () => {
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
            // Legacy self-approval plus one genuine approval: only one
            // counts toward minApprovals=2.
            approvals: [
                {
                    id: 'app-0',
                    publishRequestId: 'pr-1',
                    userId: 'requester-1',
                    userName: 'Requester',
                    userRole: 'editor',
                    approvedAt: new Date(),
                },
                {
                    id: 'app-1',
                    publishRequestId: 'pr-1',
                    userId: 'reviewer-1',
                    userName: 'Reviewer',
                    userRole: 'admin',
                    approvedAt: new Date(),
                },
            ],
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
            message: 'This publish request requires at least 2 approvals',
        })
    })

    describe.each(['rejected', 'cancelled', 'published'] as const)(
        'executePublishRequest with a %s request',
        (status) => {
            it('blocks execution even when admin bypass is allowed', async () => {
                mockedPublishRequestRepository.getPublishRequestById.mockResolvedValue(
                    {
                        id: 'pr-1',
                        organizationId: 'org-1',
                        branchId: 'branch-1',
                        branchName: 'Main',
                        requestedBy: 'requester-1',
                        requestedByName: 'Requester User',
                        status,
                        version: '1.0.0',
                        changelog: 'release',
                        isBreaking: false,
                        isPrerelease: false,
                        approvals: [],
                    } as any
                )

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

                mockedOrganizationRepository.getOrganizationById.mockResolvedValue(
                    {
                        id: 'org-1',
                        defaultBranchId: 'branch-1',
                        requireApprovalForMerge: true,
                        requireApprovalForPublish: true,
                        allowedApprovers: 'admins',
                        minApprovals: 2,
                        allowAdminBypass: true,
                    } as any
                )

                await expect(
                    executePublishRequest(
                        'pr-1',
                        'admin-1',
                        'Admin User',
                        'admin@blend.dev'
                    )
                ).rejects.toMatchObject({
                    code: 'VALIDATION_ERROR',
                    message: `Publish requests with status '${status}' cannot be executed`,
                })

                expect(
                    mockedBranchRepository.createVersion
                ).not.toHaveBeenCalled()
                expect(
                    mockedPublishRequestRepository.updatePublishRequestStatus
                ).not.toHaveBeenCalled()
            })
        }
    )
})

describe('listPublishRequests scoping', () => {
    it('rejects unscoped listings', async () => {
        await expect(listPublishRequests({}, 'user-1')).rejects.toMatchObject({
            code: 'VALIDATION_ERROR',
        })

        await expect(
            listPublishRequests({ status: 'pending' }, 'user-1')
        ).rejects.toMatchObject({ code: 'VALIDATION_ERROR' })

        expect(
            mockedPublishRequestRepository.listPublishRequests
        ).not.toHaveBeenCalled()
    })

    it('rejects listing another user without organization scope', async () => {
        await expect(
            listPublishRequests({ requestedBy: 'user-2' }, 'user-1')
        ).rejects.toMatchObject({ code: 'FORBIDDEN' })
    })

    it('allows listing own requests without organization scope', async () => {
        mockedPublishRequestRepository.listPublishRequests.mockResolvedValue({
            publishRequests: [],
            nextCursor: undefined,
        })

        await listPublishRequests({ requestedBy: 'user-1' }, 'user-1')

        expect(
            mockedPublishRequestRepository.listPublishRequests
        ).toHaveBeenCalledWith({ requestedBy: 'user-1' })
    })

    it('denies branch-only listings for personal branches the requester does not own', async () => {
        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            organizationId: null,
            createdBy: 'owner-1',
        } as any)

        await expect(
            listPublishRequests({ branchId: 'branch-1' }, 'user-1')
        ).rejects.toMatchObject({ code: 'FORBIDDEN' })
    })

    it('requires organization membership for branch-only listings', async () => {
        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            organizationId: 'org-1',
            createdBy: 'owner-1',
        } as any)
        mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
            null
        )

        await expect(
            listPublishRequests({ branchId: 'branch-1' }, 'user-1')
        ).rejects.toMatchObject({ code: 'FORBIDDEN' })
    })

    it('allows branch-only listings for organization members', async () => {
        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            organizationId: 'org-1',
            createdBy: 'owner-1',
        } as any)
        mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
            {
                id: 'member-1',
                organizationId: 'org-1',
                userId: 'user-1',
                role: 'viewer',
                joinedAt: new Date(),
            }
        )
        mockedPublishRequestRepository.listPublishRequests.mockResolvedValue({
            publishRequests: [],
            nextCursor: undefined,
        })

        await listPublishRequests({ branchId: 'branch-1' }, 'user-1')

        expect(
            mockedPublishRequestRepository.listPublishRequests
        ).toHaveBeenCalledWith({ branchId: 'branch-1' })
    })
})
