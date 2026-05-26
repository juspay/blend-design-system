import { describe, expect, it } from 'vitest'
import {
    canBypassApproval,
    canDirectlyUpdateBranch,
    canRoleApprove,
    hasReachedApprovalThreshold,
    resolveMergeApprovalPolicy,
    resolvePublishApprovalPolicy,
    type OrgApprovalSettings,
    type BranchProtectionSettings,
} from './approval-policy.service.js'

const baseOrgSettings: OrgApprovalSettings = {
    defaultBranchId: 'main-branch',
    requireApprovalForMerge: true,
    requireApprovalForPublish: true,
    allowedApprovers: 'admins',
    minApprovals: 2,
    allowAdminBypass: false,
}

const baseBranchSettings: BranchProtectionSettings = {
    id: 'feature-1',
    createdBy: 'creator-1',
    isProtected: false,
    protectionRequireApproval: null,
    protectionMinApprovals: null,
    protectionApproverIds: [],
}

describe('approval policy resolution', () => {
    it('uses org merge settings by default', () => {
        const policy = resolveMergeApprovalPolicy(
            baseBranchSettings,
            baseOrgSettings
        )
        expect(policy.requireApproval).toBe(true)
        expect(policy.minApprovals).toBe(2)
        expect(policy.allowedApprovers).toBe('admins')
        expect(policy.allowAdminBypass).toBe(false)
    })

    it('applies branch-level overrides over org settings', () => {
        const policy = resolveMergeApprovalPolicy(
            {
                ...baseBranchSettings,
                isProtected: true,
                protectionRequireApproval: false,
                protectionMinApprovals: 1,
                protectionApproverIds: ['user-a', 'user-b'],
            },
            baseOrgSettings
        )

        expect(policy.requireApproval).toBe(false)
        expect(policy.minApprovals).toBe(1)
        expect(policy.allowedApprovers).toBe('custom')
        expect(policy.customApproverIds).toEqual(['user-a', 'user-b'])
    })

    it('uses protected branch defaults for publish without org', () => {
        const policy = resolvePublishApprovalPolicy(
            {
                ...baseBranchSettings,
                isProtected: true,
            },
            null
        )

        expect(policy.requireApproval).toBe(true)
        expect(policy.minApprovals).toBe(1)
        expect(policy.allowedApprovers).toBe('admins')
        expect(policy.allowAdminBypass).toBe(true)
    })

    it('falls back to admins when allowed approvers has unknown value', () => {
        const policy = resolveMergeApprovalPolicy(baseBranchSettings, {
            ...baseOrgSettings,
            allowedApprovers:
                'something-unsupported' as unknown as typeof baseOrgSettings.allowedApprovers,
        })

        expect(policy.allowedApprovers).toBe('admins')
    })

    it('normalizes invalid min approvals to one', () => {
        const policy = resolveMergeApprovalPolicy(baseBranchSettings, {
            ...baseOrgSettings,
            minApprovals: 0,
        })

        expect(policy.minApprovals).toBe(1)
    })

    it('ignores empty custom approver list and keeps org mode', () => {
        const policy = resolveMergeApprovalPolicy(
            {
                ...baseBranchSettings,
                protectionApproverIds: [],
            },
            {
                ...baseOrgSettings,
                allowedApprovers: 'admins-and-editors',
            }
        )

        expect(policy.allowedApprovers).toBe('admins-and-editors')
        expect(policy.customApproverIds).toEqual([])
    })
})

describe('approval decision helpers', () => {
    it('evaluates approver roles based on policy', () => {
        const adminsOnly = resolveMergeApprovalPolicy(
            baseBranchSettings,
            baseOrgSettings
        )
        expect(canRoleApprove(adminsOnly, 'admin', 'u1')).toBe(true)
        expect(canRoleApprove(adminsOnly, 'editor', 'u1')).toBe(false)

        const editorsAllowed = resolveMergeApprovalPolicy(baseBranchSettings, {
            ...baseOrgSettings,
            allowedApprovers: 'admins-and-editors',
        })
        expect(canRoleApprove(editorsAllowed, 'editor', 'u2')).toBe(true)

        const custom = resolveMergeApprovalPolicy(
            {
                ...baseBranchSettings,
                protectionApproverIds: ['allowed-user'],
            },
            baseOrgSettings
        )
        expect(canRoleApprove(custom, 'viewer', 'allowed-user')).toBe(true)
        expect(canRoleApprove(custom, 'admin', 'other-user')).toBe(false)
    })

    it('evaluates bypass and threshold', () => {
        const policy = resolveMergeApprovalPolicy(baseBranchSettings, {
            ...baseOrgSettings,
            allowAdminBypass: true,
        })

        expect(canBypassApproval(policy, 'admin')).toBe(true)
        expect(canBypassApproval(policy, 'editor')).toBe(false)
        expect(hasReachedApprovalThreshold(2, policy)).toBe(true)
        expect(hasReachedApprovalThreshold(1, policy)).toBe(false)
    })

    it('does not allow bypass when policy disables admin bypass', () => {
        const policy = resolvePublishApprovalPolicy(baseBranchSettings, {
            ...baseOrgSettings,
            allowAdminBypass: false,
        })

        expect(canBypassApproval(policy, 'admin')).toBe(false)
    })

    it('handles custom approvers list', () => {
        const policy = resolvePublishApprovalPolicy(
            {
                ...baseBranchSettings,
                protectionApproverIds: ['user-1', 'user-2'],
            },
            baseOrgSettings
        )

        expect(policy.allowedApprovers).toBe('custom')
        expect(canRoleApprove(policy, 'viewer', 'user-1')).toBe(true)
        expect(canRoleApprove(policy, 'viewer', 'user-2')).toBe(true)
    })
})

describe('direct branch update policy', () => {
    it('requires admin and bypass for default branch direct update', () => {
        const branch = { ...baseBranchSettings, id: 'main-branch' }
        expect(
            canDirectlyUpdateBranch(
                branch,
                baseOrgSettings,
                'creator-1',
                'admin'
            )
        ).toBe(false)

        expect(
            canDirectlyUpdateBranch(
                branch,
                { ...baseOrgSettings, allowAdminBypass: true },
                'creator-1',
                'admin'
            )
        ).toBe(true)
    })

    it('allows creator updates on non-protected non-default branch', () => {
        expect(
            canDirectlyUpdateBranch(
                baseBranchSettings,
                { ...baseOrgSettings, defaultBranchId: 'different-main' },
                'creator-1',
                'viewer'
            )
        ).toBe(true)
    })

    it('blocks protected branch update without admin bypass', () => {
        const protectedBranch = {
            ...baseBranchSettings,
            isProtected: true,
        }

        expect(
            canDirectlyUpdateBranch(
                protectedBranch,
                baseOrgSettings,
                'creator-1',
                'admin'
            )
        ).toBe(false)
    })

    it('allows admin direct update on protected branch with bypass', () => {
        const protectedBranch = {
            ...baseBranchSettings,
            isProtected: true,
        }

        expect(
            canDirectlyUpdateBranch(
                protectedBranch,
                { ...baseOrgSettings, allowAdminBypass: true },
                'admin-1',
                'admin'
            )
        ).toBe(true)
    })

    it('uses fallback behavior for personal branches without org', () => {
        expect(
            canDirectlyUpdateBranch(
                baseBranchSettings,
                null,
                'creator-1',
                'viewer'
            )
        ).toBe(true)

        expect(
            canDirectlyUpdateBranch(
                baseBranchSettings,
                null,
                'other-user',
                'viewer'
            )
        ).toBe(false)
    })
})
