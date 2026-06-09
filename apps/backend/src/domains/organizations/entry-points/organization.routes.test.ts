import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ForbiddenError } from '@/errors/AppError.js'
import { createHttpTestApp } from '@/test/helpers/http-test-app.factory.js'

const currentUser = {
    id: '11111111-1111-4111-8111-111111111111',
    email: 'viewer@blend.dev',
    role: 'viewer',
    displayName: 'Viewer User',
    authMethod: 'jwt' as const,
}

vi.mock('@/middlewares/auth.js', () => ({
    authenticate: (req: any, _res: any, next: any) => {
        req.user = currentUser
        next()
    },
    requireRole:
        (...allowedRoles: string[]) =>
        (req: any, _res: any, next: any) => {
            if (allowedRoles.includes(req.user?.role)) {
                next()
                return
            }

            next(new ForbiddenError('Required role'))
        },
}))

vi.mock('../data-access/organization.repository.js', () => ({
    getOrganizationById: vi.fn(),
    listOrganizations: vi.fn(),
    createOrganization: vi.fn(),
    updateOrganization: vi.fn(),
    getMemberOrganizations: vi.fn(),
    addMember: vi.fn(),
    removeMember: vi.fn(),
    updateMemberRole: vi.fn(),
    listMembers: vi.fn(),
}))

vi.mock('@/domains/audit/data-access/auditlog.repository.js', () => ({
    createAuditLog: vi.fn(),
    listAuditLogs: vi.fn(),
}))

vi.mock('@/domains/organizations/domain/org-permissions.service.js', () => ({
    requireOrganizationMember: vi.fn(),
    requireOrganizationRole: vi.fn(),
}))

import organizationRouter from './organization.routes.js'
import * as orgRepo from '../data-access/organization.repository.js'
import * as orgPermissions from '@/domains/organizations/domain/org-permissions.service.js'

const mockedOrgRepo = vi.mocked(orgRepo)
const mockedOrgPermissions = vi.mocked(orgPermissions)

describe('organization.routes authorization', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        currentUser.id = '11111111-1111-4111-8111-111111111111'
        currentUser.email = 'viewer@blend.dev'
        currentUser.role = 'viewer'
        currentUser.displayName = 'Viewer User'
    })

    it('requires organization membership before returning organization details', async () => {
        mockedOrgRepo.getOrganizationById.mockResolvedValue({
            id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
            name: 'Blend',
        } as any)
        mockedOrgPermissions.requireOrganizationMember.mockRejectedValue(
            new ForbiddenError(
                'You must be a member of this organization to perform this action'
            )
        )

        const app = createHttpTestApp(
            '/api/v1/organizations',
            organizationRouter
        )

        const response = await request(app)
            .get('/api/v1/organizations/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa')
            .expect(403)

        expect(response.body.error.code).toBe('FORBIDDEN')
        expect(
            mockedOrgPermissions.requireOrganizationMember
        ).toHaveBeenCalledWith(
            'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
            currentUser.id
        )
    })

    it('allows an organization admin to add a member', async () => {
        mockedOrgPermissions.requireOrganizationRole.mockResolvedValue({
            organizationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
            userId: currentUser.id,
            role: 'admin',
        } as any)
        mockedOrgRepo.addMember.mockResolvedValue({
            id: 'member-1',
            role: 'viewer',
        } as any)

        const app = createHttpTestApp(
            '/api/v1/organizations',
            organizationRouter
        )

        const response = await request(app)
            .post(
                '/api/v1/organizations/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/members'
            )
            .send({
                userId: '22222222-2222-4222-8222-222222222222',
                role: 'viewer',
            })
            .expect(201)

        expect(response.body.data.member.id).toBe('member-1')
        expect(
            mockedOrgPermissions.requireOrganizationRole
        ).toHaveBeenCalledWith(
            'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
            currentUser.id,
            ['admin'],
            'Only organization admins can perform this action'
        )
    })

    it('allows a system admin to read members without an org membership lookup', async () => {
        currentUser.role = 'admin'
        mockedOrgRepo.listMembers.mockResolvedValue([])

        const app = createHttpTestApp(
            '/api/v1/organizations',
            organizationRouter
        )

        await request(app)
            .get(
                '/api/v1/organizations/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/members'
            )
            .expect(200)

        expect(
            mockedOrgPermissions.requireOrganizationMember
        ).not.toHaveBeenCalled()
    })
})
