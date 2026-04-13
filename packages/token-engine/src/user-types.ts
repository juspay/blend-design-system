/**
 * Data Model for Blend Token Studio
 *
 * DATA SPLIT:
 * ===========
 * PostgreSQL:
 *   - Users, Teams, Memberships
 *   - Roles, Permissions
 *   - Authentication
 *   - Fuzzy search
 *
 * Firestore:
 *   - Brand configs (JSON blobs)
 *   - Branches (see studio-types.ts)
 *   - Versions
 *   - Snapshots
 *
 * This file contains types NOT in studio-types.ts:
 *   - Team roles & permissions
 *   - User preferences (localStorage)
 *   - Onboarding state (localStorage)
 */

// ---------------------------------------------------------------------------
// Team Roles (stored in PostgreSQL, used for Firestore rules)
// ---------------------------------------------------------------------------

export type TeamRole = 'owner' | 'admin' | 'editor' | 'viewer'

export const TEAM_ROLE_PERMISSIONS: Record<TeamRole, TeamPermissions> = {
    owner: {
        canManageTeam: true,
        canDeleteTeam: true,
        canManageMembers: true,
        canInviteMembers: true,
        canCreateBranches: true,
        canEditBranches: true,
        canPublishBranches: true,
        canDeleteBranches: true,
        canViewBranches: true,
    },
    admin: {
        canManageTeam: true,
        canDeleteTeam: false,
        canManageMembers: true,
        canInviteMembers: true,
        canCreateBranches: true,
        canEditBranches: true,
        canPublishBranches: true,
        canDeleteBranches: true,
        canViewBranches: true,
    },
    editor: {
        canManageTeam: false,
        canDeleteTeam: false,
        canManageMembers: false,
        canInviteMembers: false,
        canCreateBranches: true,
        canEditBranches: true,
        canPublishBranches: true,
        canDeleteBranches: false,
        canViewBranches: true,
    },
    viewer: {
        canManageTeam: false,
        canDeleteTeam: false,
        canManageMembers: false,
        canInviteMembers: false,
        canCreateBranches: false,
        canEditBranches: false,
        canPublishBranches: false,
        canDeleteBranches: false,
        canViewBranches: true,
    },
}

export interface TeamPermissions {
    canManageTeam: boolean
    canDeleteTeam: boolean
    canManageMembers: boolean
    canInviteMembers: boolean
    canCreateBranches: boolean
    canEditBranches: boolean
    canPublishBranches: boolean
    canDeleteBranches: boolean
    canViewBranches: boolean
}

// ---------------------------------------------------------------------------
// User Preferences (localStorage only - NOT in database)
// ---------------------------------------------------------------------------

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system'
    defaultTheme: 'light' | 'dark'
    emailNotifications: boolean
    branchCreatedNotifications: boolean
    branchPublishedNotifications: boolean
    teamInviteNotifications: boolean
}

export interface OnboardingState {
    hasCompletedOnboarding: boolean
    completedAt: string | null
    skippedAt: string | null
}

export function getDefaultPreferences(): UserPreferences {
    return {
        theme: 'system',
        defaultTheme: 'light',
        emailNotifications: true,
        branchCreatedNotifications: true,
        branchPublishedNotifications: true,
        teamInviteNotifications: true,
    }
}

export function getDefaultOnboardingState(): OnboardingState {
    return {
        hasCompletedOnboarding: false,
        completedAt: null,
        skippedAt: null,
    }
}

// Storage keys for localStorage
export const STORAGE_KEYS = {
    ONBOARDING: 'blend_studio_onboarding',
    PREFERENCES: 'blend_studio_preferences',
    RECENT_BRANCHES: 'blend_studio_recent_branches',
} as const

// ---------------------------------------------------------------------------
// Firestore Collection Paths
// ---------------------------------------------------------------------------

export const BRANCH_COLLECTION = 'branches'
export const VERSION_SUBCOLLECTION = 'versions'
export const SNAPSHOT_SUBCOLLECTION = 'snapshots'

export function versionsPath(branchId: string): string {
    return `${BRANCH_COLLECTION}/${branchId}/${VERSION_SUBCOLLECTION}`
}

export function snapshotsPath(branchId: string): string {
    return `${BRANCH_COLLECTION}/${branchId}/${SNAPSHOT_SUBCOLLECTION}`
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function canUserPerformAction(
    role: TeamRole,
    action: keyof TeamPermissions
): boolean {
    return TEAM_ROLE_PERMISSIONS[role][action]
}
