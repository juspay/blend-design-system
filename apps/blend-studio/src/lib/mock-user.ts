/**
 * Mock User & Role System
 *
 * Provides a switchable mock user for demo/testing mode.
 * Stores the current mock role in localStorage so it persists across refreshes.
 *
 * Usage:
 *   import { mockUserStore } from '@/lib/mock-user'
 *   const user = mockUserStore.getUser()
 *   mockUserStore.setRole('viewer')
 */

import { IS_DEMO_BUILD } from '@/lib/feature-flags'

export type MockRole = 'owner' | 'admin' | 'editor' | 'viewer'

export interface MockUser {
    id: string
    email: string
    displayName: string
    photoUrl: string | null
    role: MockRole
    organizations: { organizationId: string; role: MockRole }[]
}

const STORAGE_KEY = 'blend_mock_role'
const MOCK_ORG_ID = 'mock-org-001'

const ROLE_PROFILES: Record<MockRole, { name: string; email: string }> = {
    owner: { name: 'Vinit Khandal (Owner)', email: 'vinit@juspay.in' },
    admin: { name: 'Admin User', email: 'admin@juspay.in' },
    editor: { name: 'Editor User', email: 'editor@juspay.in' },
    viewer: { name: 'Viewer User', email: 'viewer@juspay.in' },
}

class MockUserStore {
    private role: MockRole

    constructor() {
        // Only demo builds may read/write the persisted mock role
        // (audit #15, CWE-602). In every other build the store is inert,
        // never touches localStorage, and defaults to the
        // least-privileged role.
        const stored = IS_DEMO_BUILD ? localStorage.getItem(STORAGE_KEY) : null
        this.role =
            stored && stored in ROLE_PROFILES
                ? (stored as MockRole)
                : IS_DEMO_BUILD
                  ? 'owner'
                  : 'viewer'
    }

    getRole(): MockRole {
        return this.role
    }

    setRole(role: MockRole): void {
        this.role = role
        if (IS_DEMO_BUILD) {
            localStorage.setItem(STORAGE_KEY, role)
        }
        window.dispatchEvent(
            new CustomEvent('mockRoleChanged', { detail: role })
        )
    }

    getUser(): MockUser {
        const profile = ROLE_PROFILES[this.role]
        return {
            id: `mock-user-${this.role}`,
            email: profile.email,
            displayName: profile.name,
            photoUrl: null,
            role: this.role,
            organizations: [
                {
                    organizationId: MOCK_ORG_ID,
                    role: this.role,
                },
            ],
        }
    }

    getOrgId(): string {
        return MOCK_ORG_ID
    }
}

export const mockUserStore = new MockUserStore()
