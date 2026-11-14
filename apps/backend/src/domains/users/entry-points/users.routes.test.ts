import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ForbiddenError } from '@/errors/AppError.js'
import { createHttpTestApp } from '@/test/helpers/http-test-app.factory.js'
import { maskEmail, maskDisplayName } from '@/utils/crypto.js'

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

vi.mock('../data-access/user.repository.js', () => ({
    listUsers: vi.fn(),
    findUserById: vi.fn(),
    updateUserProfile: vi.fn(),
    updateUserRole: vi.fn(),
    softDeleteUser: vi.fn(),
}))

vi.mock('@/domains/audit/data-access/auditlog.repository.js', () => ({
    createAuditLog: vi.fn(),
    listAuditLogs: vi.fn(),
}))

import userRouter from './users.routes.js'
import * as userRepo from '../data-access/user.repository.js'

const mockedUserRepo = vi.mocked(userRepo)

const otherUser = {
    id: '22222222-2222-4222-8222-222222222222',
    googleId: 'google-oauth-123',
    email: 'other.user@blend.dev',
    displayName: 'Other User',
    photoUrl: null,
    role: 'editor',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
}

const app = createHttpTestApp('/users', userRouter)

describe('users.routes detail projection (rescan round-2, CWE-200)', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        currentUser.role = 'viewer'
        mockedUserRepo.findUserById.mockResolvedValue(
            structuredClone(otherUser) as any
        )
    })

    it('returns the full record only for the user themselves', async () => {
        currentUser.role = 'viewer'
        mockedUserRepo.findUserById.mockResolvedValue({
            ...structuredClone(otherUser),
            id: currentUser.id,
            email: currentUser.email,
        } as any)

        const res = await request(app).get(`/users/${currentUser.id}`)

        expect(res.status).toBe(200)
        expect(res.body.data.user).toEqual(
            expect.objectContaining({
                id: currentUser.id,
                email: currentUser.email,
            })
        )
        expect(res.body.data.user).toHaveProperty('googleId')
    })

    it('returns a masked projection without googleId for admins viewing other users', async () => {
        currentUser.role = 'admin'

        const res = await request(app).get(`/users/${otherUser.id}`)

        expect(res.status).toBe(200)
        expect(mockedUserRepo.findUserById).toHaveBeenCalledWith(otherUser.id)

        const user = res.body.data.user
        expect(user.id).toBe(otherUser.id)
        expect(user.role).toBe('editor')
        expect(user.email).toBe(maskEmail(otherUser.email))
        expect(user.email).not.toBe(otherUser.email)
        expect(user.displayName).toBe(
            maskDisplayName(otherUser.displayName ?? null)
        )
        expect(user).not.toHaveProperty('googleId')
        expect(user).not.toHaveProperty('lastLogin')
        expect(user).not.toHaveProperty('createdAt')
    })

    it('forbids non-admin viewers from reading other users', async () => {
        currentUser.role = 'viewer'

        const res = await request(app).get(`/users/${otherUser.id}`)

        expect(res.status).toBe(403)
        expect(mockedUserRepo.findUserById).not.toHaveBeenCalled()
    })
})
