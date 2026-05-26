import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export type WcagEnforcementPolicy = 'none' | 'warn' | 'block'
export type AllowedApproversPolicy = 'admins' | 'admins-and-editors' | 'custom'

type PrismaAllowedApproversPolicy = 'admins' | 'admins_and_editors' | 'custom'

type OrganizationUpdateData = {
    name?: string
    slug?: string
    defaultBranchId?: string | null
    blendVersion?: string | null
    wcagEnforcement?: WcagEnforcementPolicy
    requireApprovalForMerge?: boolean
    requireApprovalForPublish?: boolean
    allowedApprovers?: PrismaAllowedApproversPolicy
    minApprovals?: number
    allowAdminBypass?: boolean
}

export interface OrganizationRow {
    id: string
    name: string
    slug: string
    defaultBranchId: string | null
    blendVersion: string | null
    wcagEnforcement: WcagEnforcementPolicy
    requireApprovalForMerge: boolean
    requireApprovalForPublish: boolean
    allowedApprovers: AllowedApproversPolicy
    minApprovals: number
    allowAdminBypass: boolean
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

const toDomainAllowedApprovers = (
    value: string | null | undefined
): AllowedApproversPolicy => {
    if (value === 'admins-and-editors' || value === 'admins_and_editors') {
        return 'admins-and-editors'
    }
    if (value === 'custom') return 'custom'
    return 'admins'
}

const toPrismaAllowedApprovers = (
    value: AllowedApproversPolicy | undefined
): PrismaAllowedApproversPolicy | undefined => {
    if (!value) return undefined
    if (value === 'admins-and-editors') return 'admins_and_editors'
    return value
}

const toDomainWcagEnforcement = (
    value: string | null | undefined
): WcagEnforcementPolicy => {
    if (value === 'none' || value === 'block') return value
    return 'warn'
}

const mapOrganizationRow = (organization: unknown): OrganizationRow => {
    const row = organization as OrganizationRow & {
        allowedApprovers?: string | null
        wcagEnforcement?: string | null
    }

    return {
        ...row,
        wcagEnforcement: toDomainWcagEnforcement(row.wcagEnforcement),
        allowedApprovers: toDomainAllowedApprovers(row.allowedApprovers),
    }
}

export const createOrganization = async (data: {
    name: string
    slug: string
}): Promise<OrganizationRow> => {
    const org = await prisma.organization.create({
        data: { name: data.name, slug: data.slug },
    })
    logger.info({ orgId: org.id, slug: data.slug }, 'Organization created')
    return mapOrganizationRow(org)
}

export const getOrganizationById = async (
    id: string
): Promise<OrganizationRow | null> => {
    const org = await prisma.organization.findUnique({ where: { id } })
    return org ? mapOrganizationRow(org) : null
}

export const getOrganizationBySlug = async (
    slug: string
): Promise<OrganizationRow | null> => {
    const org = await prisma.organization.findUnique({ where: { slug } })
    return org ? mapOrganizationRow(org) : null
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
        organizations: organizations.map(mapOrganizationRow),
        nextCursor,
    }
}

export const updateOrganization = async (
    id: string,
    data: {
        name?: string
        slug?: string
        defaultBranchId?: string | null
        blendVersion?: string | null
        wcagEnforcement?: WcagEnforcementPolicy
        requireApprovalForMerge?: boolean
        requireApprovalForPublish?: boolean
        allowedApprovers?: AllowedApproversPolicy
        minApprovals?: number
        allowAdminBypass?: boolean
    }
): Promise<OrganizationRow | null> => {
    const updateData: OrganizationUpdateData = {
        ...data,
        allowedApprovers: toPrismaAllowedApprovers(data.allowedApprovers),
    }

    const org = await prisma.organization.update({
        where: { id },
        data: updateData,
    })
    return org ? mapOrganizationRow(org) : null
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
            orgRole: (data.role as any) || 'viewer',
        },
    })
    logger.info(
        { orgId: data.organizationId, userId: data.userId },
        'Member added to organization'
    )
    return { ...(member as any), role: (member as any).orgRole } as MemberRow
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
        data: { orgRole: role as any },
    })
    return member
        ? ({ ...(member as any), role: (member as any).orgRole } as MemberRow)
        : null
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
    return members.map(
        (member: any) => ({ ...member, role: member.orgRole }) as MemberRow
    )
}

export const getMemberOrganizations = async (
    userId: string
): Promise<OrganizationRow[]> => {
    const memberships = await prisma.member.findMany({
        where: { userId },
        include: { organization: true },
    })
    return memberships.map((m: any) => mapOrganizationRow(m.organization))
}
