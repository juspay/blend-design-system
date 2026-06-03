import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createHttpTestApp } from '@/test/helpers/http-test-app.factory.js'

const authenticatedUser = {
    id: '11111111-1111-4111-8111-111111111111',
    email: 'admin@blend.dev',
    role: 'admin',
    displayName: 'Admin User',
    organizationId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    authMethod: 'jwt' as const,
}

vi.mock('@/middlewares/auth.js', () => ({
    authenticate: (req: any, _res: any, next: any) => {
        req.user = authenticatedUser
        next()
    },
}))

vi.mock('@/middlewares/rateLimit.js', () => ({
    strictLimiter: (_req: any, _res: any, next: any) => next(),
}))

vi.mock('@/domains/branches/domain/publish-request.service.js', () => ({
    listPublishRequests: vi.fn(),
    getPublishRequest: vi.fn(),
    approvePublishRequest: vi.fn(),
    rejectPublishRequest: vi.fn(),
    executePublishRequest: vi.fn(),
    cancelPublishRequest: vi.fn(),
}))

import publishRequestRouter from './publish-request.routes.js'
import * as publishRequestService from '@/domains/branches/domain/publish-request.service.js'

const mockedPublishRequestService = vi.mocked(publishRequestService)

describe('publish-request.routes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('lists publish requests for authenticated user', async () => {
        mockedPublishRequestService.listPublishRequests.mockResolvedValue({
            publishRequests: [{ id: 'pr-1', status: 'pending' }],
            nextCursor: undefined,
        } as any)

        const app = createHttpTestApp(
            '/api/publish-requests',
            publishRequestRouter
        )

        const response = await request(app)
            .get('/api/publish-requests')
            .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.publishRequests).toHaveLength(1)
        expect(
            mockedPublishRequestService.listPublishRequests
        ).toHaveBeenCalledTimes(1)
    })

    it('validates review payload max length', async () => {
        const app = createHttpTestApp(
            '/api/publish-requests',
            publishRequestRouter
        )
        const overLimitComment = 'x'.repeat(5001)

        const response = await request(app)
            .post('/api/publish-requests/pr-1/approve')
            .send({ reviewComment: overLimitComment })
            .expect(400)

        expect(response.body.success).toBe(false)
        expect(response.body.error.code).toBe('VALIDATION_ERROR')
        expect(
            mockedPublishRequestService.approvePublishRequest
        ).not.toHaveBeenCalled()
    })

    it('approves publish request and returns updated request', async () => {
        mockedPublishRequestService.approvePublishRequest.mockResolvedValue({
            id: 'pr-1',
            status: 'approved',
        } as any)

        const app = createHttpTestApp(
            '/api/publish-requests',
            publishRequestRouter
        )

        const response = await request(app)
            .post('/api/publish-requests/pr-1/approve')
            .send({ reviewComment: 'approved' })
            .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.publishRequest.status).toBe('approved')
        expect(
            mockedPublishRequestService.approvePublishRequest
        ).toHaveBeenCalledWith(
            'pr-1',
            'approved',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })

    it('executes publish request and returns version payload', async () => {
        mockedPublishRequestService.executePublishRequest.mockResolvedValue({
            publishRequest: { id: 'pr-1', status: 'published' },
            version: { id: 'version-1', version: '1.0.0' },
        } as any)

        const app = createHttpTestApp(
            '/api/publish-requests',
            publishRequestRouter
        )

        const response = await request(app)
            .post('/api/publish-requests/pr-1/publish')
            .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.publishRequest.status).toBe('published')
        expect(response.body.data.version.version).toBe('1.0.0')
        expect(
            mockedPublishRequestService.executePublishRequest
        ).toHaveBeenCalledWith(
            'pr-1',
            authenticatedUser.id,
            authenticatedUser.displayName,
            authenticatedUser.email
        )
    })

    it('gets publish request by id', async () => {
        mockedPublishRequestService.getPublishRequest.mockResolvedValue({
            id: 'pr-1',
            status: 'pending',
        } as any)

        const app = createHttpTestApp(
            '/api/publish-requests',
            publishRequestRouter
        )
        const response = await request(app)
            .get('/api/publish-requests/pr-1')
            .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.publishRequest.id).toBe('pr-1')
        expect(
            mockedPublishRequestService.getPublishRequest
        ).toHaveBeenCalledWith('pr-1', authenticatedUser.id)
    })

    it('rejects publish request', async () => {
        mockedPublishRequestService.rejectPublishRequest.mockResolvedValue({
            id: 'pr-1',
            status: 'rejected',
        } as any)

        const app = createHttpTestApp(
            '/api/publish-requests',
            publishRequestRouter
        )
        const response = await request(app)
            .post('/api/publish-requests/pr-1/reject')
            .send({ reviewComment: 'Not ready' })
            .expect(200)

        expect(response.body.data.publishRequest.status).toBe('rejected')
        expect(
            mockedPublishRequestService.rejectPublishRequest
        ).toHaveBeenCalledWith(
            'pr-1',
            'Not ready',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })

    it('cancels publish request', async () => {
        mockedPublishRequestService.cancelPublishRequest.mockResolvedValue({
            id: 'pr-1',
            status: 'cancelled',
        } as any)

        const app = createHttpTestApp(
            '/api/publish-requests',
            publishRequestRouter
        )
        const response = await request(app)
            .post('/api/publish-requests/pr-1/cancel')
            .expect(200)

        expect(response.body.data.publishRequest.status).toBe('cancelled')
        expect(
            mockedPublishRequestService.cancelPublishRequest
        ).toHaveBeenCalledWith(
            'pr-1',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })
})
