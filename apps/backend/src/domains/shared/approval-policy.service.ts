export type OrgRole = 'admin' | 'editor' | 'viewer'

export type AllowedApprovers = 'admins' | 'admins-and-editors' | 'custom'

export interface OrgApprovalSettings {
    defaultBranchId: string | null
    requireApprovalForMerge: boolean
    requireApprovalForPublish: boolean
    allowedApprovers: string
    minApprovals: number
    allowAdminBypass: boolean
}

export interface BranchProtectionSettings {
    id: string
    createdBy: string
    isProtected: boolean
    protectionRequireApproval: boolean | null
    protectionMinApprovals: number | null
    protectionAllowedApprovers: string | null
}

export interface EffectiveApprovalPolicy {
    requireApproval: boolean
    minApprovals: number
    allowedApprovers: AllowedApprovers
    allowAdminBypass: boolean
    customApproverIds: string[]
}

const parseCustomApproverIds = (value: string | null): string[] => {
    if (!value) return []
    return value
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
}

const normalizeAllowedApprovers = (value: string): AllowedApprovers => {
    if (value === 'admins-and-editors') return 'admins-and-editors'
    if (value === 'custom') return 'custom'
    return 'admins'
}

const normalizeMinApprovals = (value: number | null | undefined): number => {
    if (typeof value !== 'number' || Number.isNaN(value)) return 1
    return Math.max(1, Math.floor(value))
}

export const resolveMergeApprovalPolicy = (
    branch: BranchProtectionSettings,
    org: OrgApprovalSettings | null
): EffectiveApprovalPolicy => {
    const initialRequireApproval = org
        ? org.requireApprovalForMerge
        : branch.isProtected

    const policy: EffectiveApprovalPolicy = {
        requireApproval: initialRequireApproval,
        minApprovals: normalizeMinApprovals(org?.minApprovals),
        allowedApprovers: normalizeAllowedApprovers(org?.allowedApprovers || 'admins'),
        allowAdminBypass: org ? org.allowAdminBypass : true,
        customApproverIds: [],
    }

    if (branch.protectionRequireApproval !== null) {
        policy.requireApproval = branch.protectionRequireApproval
    }
    if (branch.protectionMinApprovals !== null) {
        policy.minApprovals = normalizeMinApprovals(branch.protectionMinApprovals)
    }
    if (branch.protectionAllowedApprovers) {
        const customIds = parseCustomApproverIds(branch.protectionAllowedApprovers)
        if (customIds.length > 0) {
            policy.allowedApprovers = 'custom'
            policy.customApproverIds = customIds
        }
    }

    return policy
}

export const resolvePublishApprovalPolicy = (
    branch: BranchProtectionSettings,
    org: OrgApprovalSettings | null
): EffectiveApprovalPolicy => {
    const initialRequireApproval = org
        ? org.requireApprovalForPublish
        : branch.isProtected

    const policy: EffectiveApprovalPolicy = {
        requireApproval: initialRequireApproval,
        minApprovals: normalizeMinApprovals(org?.minApprovals),
        allowedApprovers: normalizeAllowedApprovers(org?.allowedApprovers || 'admins'),
        allowAdminBypass: org ? org.allowAdminBypass : true,
        customApproverIds: [],
    }

    if (branch.protectionRequireApproval !== null) {
        policy.requireApproval = branch.protectionRequireApproval
    }
    if (branch.protectionMinApprovals !== null) {
        policy.minApprovals = normalizeMinApprovals(branch.protectionMinApprovals)
    }
    if (branch.protectionAllowedApprovers) {
        const customIds = parseCustomApproverIds(branch.protectionAllowedApprovers)
        if (customIds.length > 0) {
            policy.allowedApprovers = 'custom'
            policy.customApproverIds = customIds
        }
    }

    return policy
}

export const canRoleApprove = (
    policy: EffectiveApprovalPolicy,
    userRole: OrgRole,
    userId: string
): boolean => {
    if (policy.allowedApprovers === 'custom') {
        return policy.customApproverIds.includes(userId)
    }
    if (policy.allowedApprovers === 'admins-and-editors') {
        return userRole === 'admin' || userRole === 'editor'
    }
    return userRole === 'admin'
}

export const canBypassApproval = (
    policy: EffectiveApprovalPolicy,
    userRole: OrgRole
): boolean => {
    return userRole === 'admin' && policy.allowAdminBypass
}

export const canDirectlyUpdateBranch = (
    branch: BranchProtectionSettings,
    org: OrgApprovalSettings | null,
    userId: string,
    userRole: OrgRole
): boolean => {
    const isDefaultBranch = Boolean(org?.defaultBranchId && org.defaultBranchId === branch.id)
    const bypassEnabled = org?.allowAdminBypass ?? true

    if (isDefaultBranch) {
        return userRole === 'admin' && bypassEnabled
    }

    if (branch.isProtected) {
        return userRole === 'admin' && bypassEnabled
    }

    return branch.createdBy === userId || userRole === 'admin'
}

export const hasReachedApprovalThreshold = (
    approvalCount: number,
    policy: EffectiveApprovalPolicy
): boolean => {
    return approvalCount >= policy.minApprovals
}
