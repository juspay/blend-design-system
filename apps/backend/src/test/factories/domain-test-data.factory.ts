export interface AuthenticatedUserContext {
    id: string
    email: string
    role: 'admin' | 'editor' | 'viewer'
    displayName: string
    organizationId?: string
    authMethod: 'jwt' | 'api_key'
}

export interface TestOrganizationSeed {
    id: string
    name: string
    slug: string
    defaultBranchId: string | null
    requireApprovalForMerge: boolean
    requireApprovalForPublish: boolean
    allowedApprovers: 'admins' | 'admins-and-editors' | 'custom'
    minApprovals: number
    allowAdminBypass: boolean
}

export interface TestBranchSeed {
    id: string
    organizationId: string | null
    branchSlug: string
    name: string
    createdBy: string
    createdByName: string
    isProtected?: boolean
}

export const createAuthenticatedUserContext = (
    overrides: Partial<AuthenticatedUserContext> = {}
): AuthenticatedUserContext => ({
    id: '11111111-1111-4111-8111-111111111111',
    email: 'user.one@blend.dev',
    role: 'admin',
    displayName: 'User One',
    organizationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    authMethod: 'jwt',
    ...overrides,
})

export const createTestOrganizationSeed = (
    overrides: Partial<TestOrganizationSeed> = {}
): TestOrganizationSeed => ({
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    name: 'Acme Design',
    slug: 'acme-design',
    defaultBranchId: null,
    requireApprovalForMerge: true,
    requireApprovalForPublish: true,
    allowedApprovers: 'admins',
    minApprovals: 1,
    allowAdminBypass: false,
    ...overrides,
})

export const createTestBranchSeed = (
    overrides: Partial<TestBranchSeed> = {}
): TestBranchSeed => ({
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    organizationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    branchSlug: 'acme/default',
    name: 'Default Branch',
    createdBy: '11111111-1111-4111-8111-111111111111',
    createdByName: 'User One',
    isProtected: false,
    ...overrides,
})
