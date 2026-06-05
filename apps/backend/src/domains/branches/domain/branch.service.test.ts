import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
    updateBranchProtection,
    getBranchApprovalSettings,
} from './branch.service.js'

import * as branchRepository from '../data-access/branch.repository.js'
import * as organizationRepository from '@/domains/organizations/data-access/organization.repository.js'
import * as userRepository from '@/domains/users/data-access/user.repository.js'
import * as auditLogRepository from '@/domains/audit/data-access/auditlog.repository.js'

vi.mock('../data-access/branch.repository.js')
vi.mock('@/domains/organizations/data-access/organization.repository.js')
vi.mock('@/domains/users/data-access/user.repository.js')
vi.mock('@/domains/audit/data-access/auditlog.repository.js')

const mockedBranchRepository = vi.mocked(branchRepository)
const mockedOrganizationRepository = vi.mocked(organizationRepository)
const mockedUserRepository = vi.mocked(userRepository)
const mockedAuditLogRepository = vi.mocked(auditLogRepository)

describe('branch.service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('allows admin to update branch protection and logs audit event', async () => {
        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            organizationId: 'org-1',
            createdBy: 'owner-1',
            isProtected: false,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            protectionApproverIds: [],
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

        mockedBranchRepository.updateBranch.mockResolvedValue({
            id: 'branch-1',
            organizationId: 'org-1',
            createdBy: 'owner-1',
            isProtected: true,
            protectionRequireApproval: true,
            protectionMinApprovals: 2,
            protectionApproverIds: [],
        } as any)

        mockedBranchRepository.setProtectionApproverIds.mockResolvedValue()

        const updated = await updateBranchProtection(
            'branch-1',
            {
                isProtected: true,
                requireApproval: true,
                minApprovals: 2,
            },
            'admin-1',
            'admin@blend.dev'
        )

        expect(mockedBranchRepository.updateBranch).toHaveBeenCalledWith(
            'branch-1',
            expect.objectContaining({
                isProtected: true,
                protectionRequireApproval: true,
                protectionMinApprovals: 2,
            })
        )
        expect(mockedAuditLogRepository.createAuditLog).toHaveBeenCalledTimes(1)
        expect(updated).toEqual(expect.objectContaining({ isProtected: true }))
    })

    it('blocks non-admin user from updating branch protection', async () => {
        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            organizationId: 'org-1',
            createdBy: 'owner-1',
            isProtected: false,
            protectionRequireApproval: null,
            protectionMinApprovals: null,
            protectionApproverIds: [],
        } as any)

        mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
            {
                id: 'member-1',
                organizationId: 'org-1',
                userId: 'editor-1',
                role: 'editor',
                joinedAt: new Date(),
            }
        )

        await expect(
            updateBranchProtection(
                'branch-1',
                {
                    isProtected: true,
                    requireApproval: true,
                    minApprovals: 2,
                },
                'editor-1',
                'editor@blend.dev'
            )
        ).rejects.toMatchObject({
            code: 'FORBIDDEN',
            message: 'Only admins can update branch protection settings',
        })
    })

    it('returns effective branch approval settings for merge context', async () => {
        mockedBranchRepository.getBranchById.mockResolvedValue({
            id: 'branch-1',
            organizationId: 'org-1',
            createdBy: 'owner-1',
            isProtected: true,
            protectionRequireApproval: true,
            protectionMinApprovals: 2,
            protectionApproverIds: [],
        } as any)

        mockedOrganizationRepository.getOrganizationById.mockResolvedValue({
            id: 'org-1',
            defaultBranchId: 'branch-1',
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

        const settings = await getBranchApprovalSettings(
            'branch-1',
            'admin-1',
            'merge'
        )

        expect(settings.context).toBe('merge')
        expect(settings.currentUser.role).toBe('admin')
        expect(settings.effectivePolicy.requireApproval).toBe(true)
        expect(settings.effectivePolicy.minApprovals).toBe(2)
        expect(settings.isDefaultBranch).toBe(true)
    })
})
