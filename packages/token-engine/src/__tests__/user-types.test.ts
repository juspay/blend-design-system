/**
 * Tests for org/team RBAC features — permissions, roles, and helpers.
 */
import { describe, it, expect } from 'vitest'
import {
    TEAM_ROLE_PERMISSIONS,
    canUserPerformAction,
    getDefaultPreferences,
    getDefaultOnboardingState,
    versionsPath,
    snapshotsPath,
    type TeamRole,
} from '../user-types'

// ---------------------------------------------------------------------------
// Role Permissions
// ---------------------------------------------------------------------------

describe('TEAM_ROLE_PERMISSIONS', () => {
    it('owner has all permissions', () => {
        const perms = TEAM_ROLE_PERMISSIONS.owner
        expect(perms.canManageTeam).toBe(true)
        expect(perms.canDeleteTeam).toBe(true)
        expect(perms.canManageMembers).toBe(true)
        expect(perms.canCreateBranches).toBe(true)
        expect(perms.canEditBranches).toBe(true)
        expect(perms.canPublishBranches).toBe(true)
        expect(perms.canDeleteBranches).toBe(true)
        expect(perms.canApproveMerge).toBe(true)
        expect(perms.canLockTokens).toBe(true)
        expect(perms.canMergeToDefault).toBe(true)
        expect(perms.canCreateMergeRequest).toBe(true)
        expect(perms.canManageOrgSettings).toBe(true)
    })

    it('admin has most permissions but cannot delete team', () => {
        const perms = TEAM_ROLE_PERMISSIONS.admin
        expect(perms.canManageTeam).toBe(true)
        expect(perms.canDeleteTeam).toBe(false)
        expect(perms.canApproveMerge).toBe(true)
        expect(perms.canLockTokens).toBe(true)
        expect(perms.canMergeToDefault).toBe(true)
        expect(perms.canManageOrgSettings).toBe(true)
    })

    it('editor can create branches and merge requests but not approve', () => {
        const perms = TEAM_ROLE_PERMISSIONS.editor
        expect(perms.canCreateBranches).toBe(true)
        expect(perms.canEditBranches).toBe(true)
        expect(perms.canPublishBranches).toBe(true)
        expect(perms.canCreateMergeRequest).toBe(true)
        // Cannot approve/merge/lock
        expect(perms.canApproveMerge).toBe(false)
        expect(perms.canMergeToDefault).toBe(false)
        expect(perms.canLockTokens).toBe(false)
        expect(perms.canManageOrgSettings).toBe(false)
        expect(perms.canDeleteBranches).toBe(false)
        expect(perms.canManageTeam).toBe(false)
    })

    it('viewer can only view branches', () => {
        const perms = TEAM_ROLE_PERMISSIONS.viewer
        expect(perms.canViewBranches).toBe(true)
        // All other permissions should be false
        expect(perms.canCreateBranches).toBe(false)
        expect(perms.canEditBranches).toBe(false)
        expect(perms.canPublishBranches).toBe(false)
        expect(perms.canDeleteBranches).toBe(false)
        expect(perms.canApproveMerge).toBe(false)
        expect(perms.canLockTokens).toBe(false)
        expect(perms.canMergeToDefault).toBe(false)
        expect(perms.canCreateMergeRequest).toBe(false)
        expect(perms.canManageOrgSettings).toBe(false)
        expect(perms.canManageTeam).toBe(false)
        expect(perms.canManageMembers).toBe(false)
        expect(perms.canInviteMembers).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// canUserPerformAction
// ---------------------------------------------------------------------------

describe('canUserPerformAction', () => {
    it('returns true for allowed actions', () => {
        expect(canUserPerformAction('owner', 'canDeleteTeam')).toBe(true)
        expect(canUserPerformAction('admin', 'canApproveMerge')).toBe(true)
        expect(canUserPerformAction('editor', 'canCreateBranches')).toBe(true)
        expect(canUserPerformAction('viewer', 'canViewBranches')).toBe(true)
    })

    it('returns false for denied actions', () => {
        expect(canUserPerformAction('viewer', 'canCreateBranches')).toBe(false)
        expect(canUserPerformAction('editor', 'canApproveMerge')).toBe(false)
        expect(canUserPerformAction('admin', 'canDeleteTeam')).toBe(false)
    })

    it('works for all roles', () => {
        const roles: TeamRole[] = ['owner', 'admin', 'editor', 'viewer']
        for (const role of roles) {
            const result = canUserPerformAction(role, 'canViewBranches')
            expect(typeof result).toBe('boolean')
        }
    })
})

// ---------------------------------------------------------------------------
// Merge Request RBAC scenarios
// ---------------------------------------------------------------------------

describe('merge request RBAC scenarios', () => {
    it('editor can create merge request but cannot self-approve', () => {
        expect(canUserPerformAction('editor', 'canCreateMergeRequest')).toBe(
            true
        )
        expect(canUserPerformAction('editor', 'canApproveMerge')).toBe(false)
        expect(canUserPerformAction('editor', 'canMergeToDefault')).toBe(false)
    })

    it('admin can create, approve, and merge', () => {
        expect(canUserPerformAction('admin', 'canCreateMergeRequest')).toBe(
            true
        )
        expect(canUserPerformAction('admin', 'canApproveMerge')).toBe(true)
        expect(canUserPerformAction('admin', 'canMergeToDefault')).toBe(true)
    })

    it('viewer cannot create merge requests', () => {
        expect(canUserPerformAction('viewer', 'canCreateMergeRequest')).toBe(
            false
        )
    })
})

// ---------------------------------------------------------------------------
// Token Locking RBAC scenarios
// ---------------------------------------------------------------------------

describe('token locking RBAC scenarios', () => {
    it('only owner and admin can lock tokens', () => {
        expect(canUserPerformAction('owner', 'canLockTokens')).toBe(true)
        expect(canUserPerformAction('admin', 'canLockTokens')).toBe(true)
        expect(canUserPerformAction('editor', 'canLockTokens')).toBe(false)
        expect(canUserPerformAction('viewer', 'canLockTokens')).toBe(false)
    })

    it('only owner and admin can manage org settings', () => {
        expect(canUserPerformAction('owner', 'canManageOrgSettings')).toBe(true)
        expect(canUserPerformAction('admin', 'canManageOrgSettings')).toBe(true)
        expect(canUserPerformAction('editor', 'canManageOrgSettings')).toBe(
            false
        )
    })
})

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

describe('utility functions', () => {
    it('getDefaultPreferences returns correct defaults', () => {
        const prefs = getDefaultPreferences()
        expect(prefs.theme).toBe('system')
        expect(prefs.defaultTheme).toBe('light')
        expect(prefs.emailNotifications).toBe(true)
    })

    it('getDefaultOnboardingState returns incomplete state', () => {
        const state = getDefaultOnboardingState()
        expect(state.hasCompletedOnboarding).toBe(false)
        expect(state.completedAt).toBeNull()
        expect(state.skippedAt).toBeNull()
    })

    it('versionsPath returns correct Firestore path', () => {
        expect(versionsPath('branch-123')).toBe('branches/branch-123/versions')
    })

    it('snapshotsPath returns correct Firestore path', () => {
        expect(snapshotsPath('branch-123')).toBe(
            'branches/branch-123/snapshots'
        )
    })
})
