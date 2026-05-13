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
        const stored = localStorage.getItem(STORAGE_KEY)
        this.role = (stored as MockRole) || 'owner'
    }

    getRole(): MockRole {
        return this.role
    }

    setRole(role: MockRole): void {
        this.role = role
        localStorage.setItem(STORAGE_KEY, role)
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
