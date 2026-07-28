import { ForbiddenError } from '@/errors/AppError.js'
import * as userRepo from '@/domains/users/data-access/user.repository.js'

export type OrgRole = 'admin' | 'editor' | 'viewer'

export const requireOrganizationMember = async (
    organizationId: string,
    userId: string
) => {
    const membership = await userRepo.findUserMembershipInOrganization(
        userId,
        organizationId
    )
    if (!membership) {
        throw new ForbiddenError(
            'You must be a member of this organization to perform this action'
        )
    }
    return membership
}

export const requireOrganizationRole = async (
    organizationId: string,
    userId: string,
    allowedRoles: OrgRole[],
    forbiddenMessage: string
) => {
    const membership = await requireOrganizationMember(organizationId, userId)
    if (!allowedRoles.includes(membership.role as OrgRole)) {
        throw new ForbiddenError(forbiddenMessage)
    }
    return membership
}

export const getOrganizationRole = async (
    organizationId: string | null,
    userId: string,
    fallbackRole: OrgRole = 'viewer'
): Promise<OrgRole> => {
    if (!organizationId) {
        return fallbackRole
    }

    const membership = await userRepo.findUserMembershipInOrganization(
        userId,
        organizationId
    )
    return (membership?.role as OrgRole | undefined) || fallbackRole
}
