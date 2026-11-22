import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'
import { maskEmail } from '@/utils/crypto.js'

export interface UserRow {
    id: string
    googleId: string | null
    email: string
    displayName: string | null
    photoUrl: string | null
    role: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    lastLogin: Date | null
    deletedAt: Date | null
}

export interface MembershipRow {
    id: string
    organizationId: string
    userId: string
    role: string
    joinedAt: Date
}

export const findUserByEmail = async (
    email: string
): Promise<UserRow | null> => {
    const user = await prisma.user.findUnique({
        where: { email, deletedAt: null },
    })
    return user
        ? ({ ...(user as any), role: (user as any).systemRole } as UserRow)
        : null
}

export const findUserByGoogleId = async (
    googleId: string
): Promise<UserRow | null> => {
    const user = await prisma.user.findUnique({
        where: { googleId, deletedAt: null },
    })
    return user
        ? ({ ...(user as any), role: (user as any).systemRole } as UserRow)
        : null
}

export const findUserById = async (id: string): Promise<UserRow | null> => {
    const user = await prisma.user.findUnique({
        where: { id, deletedAt: null },
    })
    return user
        ? ({ ...(user as any), role: (user as any).systemRole } as UserRow)
        : null
}

export const findUserMembership = async (
    userId: string
): Promise<MembershipRow | null> => {
    const membership = await prisma.member.findFirst({
        where: { userId },
    })
    return membership
        ? ({
              ...(membership as any),
              role: (membership as any).orgRole,
          } as MembershipRow)
        : null
}

export const findUserMembershipInOrganization = async (
    userId: string,
    organizationId: string
): Promise<MembershipRow | null> => {
    const membership = await prisma.member.findUnique({
        where: {
            organizationId_userId: {
                organizationId,
                userId,
            },
        },
    })
    return membership
        ? ({
              ...(membership as any),
              role: (membership as any).orgRole,
          } as MembershipRow)
        : null
}

export const findUserMemberships = async (
    userId: string
): Promise<MembershipRow[]> => {
    const memberships = await prisma.member.findMany({
        where: { userId },
    })
    return memberships.map(
        (membership: any) =>
            ({ ...membership, role: membership.orgRole }) as MembershipRow
    )
}

export const createUser = async (data: {
    email: string
    displayName?: string
    photoUrl?: string
    googleId?: string
    role?: string
}): Promise<UserRow> => {
    const user = await prisma.user.create({
        data: {
            email: data.email,
            displayName: data.displayName || null,
            photoUrl: data.photoUrl || null,
            googleId: data.googleId || null,
            systemRole: (data.role as any) || 'viewer',
            isActive: true,
            lastLogin: new Date(),
        },
    })

    logger.info(
        { userId: user.id, email: maskEmail(user.email) },
        'User created'
    )
    return { ...(user as any), role: (user as any).systemRole } as UserRow
}

export const updateUserLogin = async (
    userId: string
): Promise<UserRow | null> => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { lastLogin: new Date() },
    })
    return user
        ? ({ ...(user as any), role: (user as any).systemRole } as UserRow)
        : null
}

export const updateUserProfile = async (
    userId: string,
    data: { displayName?: string; photoUrl?: string }
): Promise<UserRow | null> => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            displayName: data.displayName || undefined,
            photoUrl: data.photoUrl || undefined,
        },
    })
    return user
        ? ({ ...(user as any), role: (user as any).systemRole } as UserRow)
        : null
}

export const updateUserRole = async (
    userId: string,
    role: string
): Promise<UserRow | null> => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { systemRole: role as any },
    })
    return user
        ? ({ ...(user as any), role: (user as any).systemRole } as UserRow)
        : null
}

export const softDeleteUser = async (userId: string): Promise<boolean> => {
    await prisma.user.update({
        where: { id: userId },
        data: { deletedAt: new Date(), isActive: false },
    })
    logger.info({ userId }, 'User soft-deleted')
    return true
}

export const listUsers = async (
    options: { page?: number; limit?: number; organizationId?: string } = {}
): Promise<{ users: UserRow[]; total: number }> => {
    const page = options.page || 1
    const limit = Math.min(options.limit || 20, 100)
    const skip = (page - 1) * limit

    const where: any = { deletedAt: null }
    if (options.organizationId) {
        where.memberships = {
            some: { organizationId: options.organizationId },
        }
    }

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: limit,
            select: {
                id: true,
                email: true,
                displayName: true,
                photoUrl: true,
                systemRole: true,
                isActive: true,
                createdAt: true,
                lastLogin: true,
            },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({ where }),
    ])

    return {
        users: users.map(
            (user: any) => ({ ...user, role: user.systemRole }) as UserRow
        ),
        total,
    }
}

export const storeRefreshToken = async (
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    familyId: string
) => {
    return prisma.refreshToken.create({
        data: { userId, tokenHash, expiresAt, familyId },
    })
}

export const findRefreshToken = async (tokenHash: string) => {
    return prisma.refreshToken.findUnique({ where: { tokenHash } })
}

// Soft-revokes (tombstones) the token instead of deleting it: a later
// presentation of the same token is a replay and revokes the family.
export const revokeRefreshToken = async (tokenHash: string) => {
    return prisma.refreshToken.updateMany({
        where: { tokenHash, revokedAt: null },
        data: { revokedAt: new Date() },
    })
}

export const revokeAllUserRefreshTokens = async (userId: string) => {
    return prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
    })
}

// Revokes every live member of a rotation family. Used when a revoked
// (already-rotated) token is presented again — proof the token leaked.
export const revokeRefreshTokenFamily = async (familyId: string) => {
    return prisma.refreshToken.updateMany({
        where: { familyId, revokedAt: null },
        data: { revokedAt: new Date() },
    })
}

export const cleanupExpiredTokens = async () => {
    return prisma.refreshToken.deleteMany({
        where: { expiresAt: { lt: new Date() } },
    })
}
