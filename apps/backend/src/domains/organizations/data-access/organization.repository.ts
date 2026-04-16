import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export interface OrganizationRow {
    id: string
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
}

export interface MemberRow {
    id: string
    organizationId: string
    userId: string
    role: string
    joinedAt: Date
}

export const createOrganization = async (data: {
    name: string
    slug: string
}): Promise<OrganizationRow> => {
    const org = await prisma.organization.create({
        data: { name: data.name, slug: data.slug },
    })
    logger.info({ orgId: org.id, slug: data.slug }, 'Organization created')
    return org as unknown as OrganizationRow
}

export const getOrganizationById = async (
    id: string
): Promise<OrganizationRow | null> => {
    const org = await prisma.organization.findUnique({ where: { id } })
    return org as unknown as OrganizationRow | null
}

export const getOrganizationBySlug = async (
    slug: string
): Promise<OrganizationRow | null> => {
    const org = await prisma.organization.findUnique({ where: { slug } })
    return org as unknown as OrganizationRow | null
}

export const listOrganizations = async (
    options: { limit?: number; cursor?: string } = {}
): Promise<{ organizations: OrganizationRow[]; nextCursor?: string }> => {
    const limit = options.limit || 20
    const where: any = {}
    if (options.cursor) where.id = { lt: options.cursor }

    const organizations = await prisma.organization.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit + 1,
    })

    let nextCursor: string | undefined
    if (organizations.length > limit) {
        nextCursor = organizations[limit - 1].id
        organizations.pop()
    }

    return {
        organizations: organizations as unknown as OrganizationRow[],
        nextCursor,
    }
}

export const updateOrganization = async (
    id: string,
    data: { name?: string; slug?: string }
): Promise<OrganizationRow | null> => {
    const org = await prisma.organization.update({
        where: { id },
        data,
    })
    return org as unknown as OrganizationRow | null
}

export const addMember = async (data: {
    organizationId: string
    userId: string
    role?: string
}): Promise<MemberRow> => {
    const member = await prisma.member.upsert({
        where: {
            organizationId_userId: {
                organizationId: data.organizationId,
                userId: data.userId,
            },
        },
        update: {},
        create: {
            organizationId: data.organizationId,
            userId: data.userId,
            role: (data.role as any) || 'viewer',
        },
    })
    logger.info(
        { orgId: data.organizationId, userId: data.userId },
        'Member added to organization'
    )
    return member as unknown as MemberRow
}

export const removeMember = async (
    organizationId: string,
    userId: string
): Promise<void> => {
    await prisma.member.deleteMany({
        where: { organizationId, userId },
    })
    logger.info({ orgId: organizationId, userId }, 'Member removed')
}

export const updateMemberRole = async (
    organizationId: string,
    userId: string,
    role: string
): Promise<MemberRow | null> => {
    const member = await prisma.member.update({
        where: {
            organizationId_userId: { organizationId, userId },
        },
        data: { role: role as any },
    })
    return member as unknown as MemberRow | null
}

export const listMembers = async (
    organizationId: string
): Promise<MemberRow[]> => {
    const members = await prisma.member.findMany({
        where: { organizationId },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    displayName: true,
                    photoUrl: true,
                },
            },
        },
    })
    return members as unknown as MemberRow[]
}

export const getMemberOrganizations = async (
    userId: string
): Promise<OrganizationRow[]> => {
    const memberships = await prisma.member.findMany({
        where: { userId },
        include: { organization: true },
    })
    return memberships.map(
        (m: any) => m.organization
    ) as unknown as OrganizationRow[]
}
