import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
    updateBranchProtection,
    getBranchApprovalSettings,
    getBranchForUser,
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

    describe('getBranchForUser', () => {
        const branch = {
            id: 'branch-1',
            organizationId: 'org-1',
            createdBy: 'owner-1',
            visibility: 'private',
        }

        it("hides another organization's branch as not found", async () => {
            mockedBranchRepository.getBranchById.mockResolvedValue(
                branch as any
            )
            mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
                null
            )

            await expect(
                getBranchForUser('branch-1', 'outsider-1')
            ).rejects.toThrow('Branch')
        })

        it('allows organization members, the creator and public branches', async () => {
            mockedBranchRepository.getBranchById.mockResolvedValue(
                branch as any
            )
            mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
                { organizationId: 'org-1', userId: 'member-1' } as any
            )
            await expect(
                getBranchForUser('branch-1', 'member-1')
            ).resolves.toMatchObject({ id: 'branch-1' })

            mockedUserRepository.findUserMembershipInOrganization.mockResolvedValue(
                null
            )
            await expect(
                getBranchForUser('branch-1', 'owner-1')
            ).resolves.toMatchObject({ id: 'branch-1' })

            mockedBranchRepository.getBranchById.mockResolvedValue({
                ...branch,
                visibility: 'public',
            } as any)
            await expect(
                getBranchForUser('branch-1', 'outsider-1')
            ).resolves.toMatchObject({ id: 'branch-1' })
        })
    })

    describe('updateBranchProtection approver validation', () => {
        const seedProtectedBranch = () => {
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
                protectionMinApprovals: 1,
                protectionApproverIds: [],
            } as any)
        }

        it('rejects approver IDs that do not resolve to an active user', async () => {
            seedProtectedBranch()
            mockedUserRepository.findUserById.mockResolvedValue(null)

            await expect(
                updateBranchProtection(
                    'branch-1',
                    { isProtected: true, allowedApproverIds: ['ghost-1'] },
                    'admin-1',
                    'admin@blend.dev'
                )
            ).rejects.toMatchObject({
                code: 'VALIDATION_ERROR',
                message: 'Approver ghost-1 is not an active user',
            })

            expect(mockedBranchRepository.updateBranch).not.toHaveBeenCalled()
            expect(
                mockedBranchRepository.setProtectionApproverIds
            ).not.toHaveBeenCalled()
        })

        it('rejects approver IDs from outside the organization', async () => {
            seedProtectedBranch()
            mockedUserRepository.findUserById.mockResolvedValue({
                id: 'outsider-1',
                email: 'outsider@blend.dev',
                isActive: true,
            } as any)

            // First membership lookup: the calling admin (allowed).
            // Second: the approver candidate (not a member).
            mockedUserRepository.findUserMembershipInOrganization
                .mockResolvedValueOnce({
                    id: 'member-1',
                    organizationId: 'org-1',
                    userId: 'admin-1',
                    role: 'admin',
                    joinedAt: new Date(),
                })
                .mockResolvedValueOnce(null)

            await expect(
                updateBranchProtection(
                    'branch-1',
                    { isProtected: true, allowedApproverIds: ['outsider-1'] },
                    'admin-1',
                    'admin@blend.dev'
                )
            ).rejects.toMatchObject({
                code: 'VALIDATION_ERROR',
                message:
                    'Approver outsider-1 is not a member of this organization',
            })

            expect(mockedBranchRepository.updateBranch).not.toHaveBeenCalled()
        })

        it('accepts and dedupes approvers that are active organization members', async () => {
            seedProtectedBranch()
            mockedUserRepository.findUserById.mockResolvedValue({
                id: 'member-2',
                email: 'member2@blend.dev',
                isActive: true,
            } as any)

            await updateBranchProtection(
                'branch-1',
                {
                    isProtected: true,
                    allowedApproverIds: ['member-2', 'member-2'],
                },
                'admin-1',
                'admin@blend.dev'
            )

            expect(
                mockedBranchRepository.setProtectionApproverIds
            ).toHaveBeenCalledWith('branch-1', ['member-2'])
        })

        it('restricts personal-branch approvers to the owner', async () => {
            mockedBranchRepository.getBranchById.mockResolvedValue({
                id: 'branch-1',
                organizationId: null,
                createdBy: 'owner-1',
                isProtected: false,
                protectionRequireApproval: null,
                protectionMinApprovals: null,
                protectionApproverIds: [],
            } as any)

            mockedUserRepository.findUserById.mockResolvedValue({
                id: 'stranger-1',
                email: 'stranger@blend.dev',
                isActive: true,
            } as any)

            await expect(
                updateBranchProtection(
                    'branch-1',
                    { isProtected: true, allowedApproverIds: ['stranger-1'] },
                    'owner-1',
                    'owner@blend.dev'
                )
            ).rejects.toMatchObject({
                code: 'VALIDATION_ERROR',
                message:
                    'Only the branch owner can approve changes on a personal branch',
            })

            expect(mockedBranchRepository.updateBranch).not.toHaveBeenCalled()
        })
    })
})
