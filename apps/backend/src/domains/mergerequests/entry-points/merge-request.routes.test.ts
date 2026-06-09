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

vi.mock('../domain/merge-request.service.js', () => ({
    listMergeRequests: vi.fn(),
    getMergeRequest: vi.fn(),
    createMergeRequest: vi.fn(),
    approveMergeRequest: vi.fn(),
    rejectMergeRequest: vi.fn(),
    mergeMergeRequest: vi.fn(),
    cancelMergeRequest: vi.fn(),
}))

import mergeRequestRouter from './merge-request.routes.js'
import * as mergeRequestService from '../domain/merge-request.service.js'

const mockedMergeRequestService = vi.mocked(mergeRequestService)

describe('merge-request.routes', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns merge request list for authenticated user', async () => {
        mockedMergeRequestService.listMergeRequests.mockResolvedValue({
            mergeRequests: [{ id: 'mr-1', title: 'Merge feature' }],
            nextCursor: undefined,
        } as any)

        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)

        const response = await request(app)
            .get('/api/merge-requests')
            .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.mergeRequests).toHaveLength(1)
        expect(
            mockedMergeRequestService.listMergeRequests
        ).toHaveBeenCalledTimes(1)
    })

    it('validates create payload and returns 400 on invalid source branch id', async () => {
        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)

        const response = await request(app)
            .post('/api/merge-requests')
            .send({
                sourceBranchId: 'invalid-id',
                targetBranchId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
                title: 'Feature merge',
            })
            .expect(400)

        expect(response.body.success).toBe(false)
        expect(response.body.error.code).toBe('VALIDATION_ERROR')
        expect(
            mockedMergeRequestService.createMergeRequest
        ).not.toHaveBeenCalled()
    })

    it('creates merge request when payload is valid', async () => {
        mockedMergeRequestService.createMergeRequest.mockResolvedValue({
            id: 'mr-1',
            status: 'pending',
        } as any)

        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)

        const response = await request(app)
            .post('/api/merge-requests')
            .send({
                sourceBranchId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
                targetBranchId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
                title: 'Feature merge',
                description: 'Merge my feature branch',
            })
            .expect(201)

        expect(response.body.success).toBe(true)
        expect(response.body.data.mergeRequest.id).toBe('mr-1')
        expect(
            mockedMergeRequestService.createMergeRequest
        ).toHaveBeenCalledWith(
            authenticatedUser.organizationId,
            'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
            'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
            'Feature merge',
            'Merge my feature branch',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })

    it('approves merge request and returns updated entity', async () => {
        mockedMergeRequestService.approveMergeRequest.mockResolvedValue({
            id: 'mr-1',
            status: 'approved',
        } as any)

        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)

        const response = await request(app)
            .post('/api/merge-requests/mr-1/approve')
            .send({ reviewComment: 'Looks good' })
            .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.mergeRequest.status).toBe('approved')
        expect(
            mockedMergeRequestService.approveMergeRequest
        ).toHaveBeenCalledWith(
            'mr-1',
            'Looks good',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })

    it('gets merge request by id', async () => {
        mockedMergeRequestService.getMergeRequest.mockResolvedValue({
            id: 'mr-1',
            status: 'pending',
        } as any)

        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)
        const response = await request(app)
            .get('/api/merge-requests/mr-1')
            .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.mergeRequest.id).toBe('mr-1')
        expect(mockedMergeRequestService.getMergeRequest).toHaveBeenCalledWith(
            'mr-1',
            authenticatedUser.id
        )
    })

    it('rejects merge request', async () => {
        mockedMergeRequestService.rejectMergeRequest.mockResolvedValue({
            id: 'mr-1',
            status: 'rejected',
        } as any)

        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)
        const response = await request(app)
            .post('/api/merge-requests/mr-1/reject')
            .send({ reviewComment: 'Needs changes' })
            .expect(200)

        expect(response.body.data.mergeRequest.status).toBe('rejected')
        expect(
            mockedMergeRequestService.rejectMergeRequest
        ).toHaveBeenCalledWith(
            'mr-1',
            'Needs changes',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })

    it('merges approved merge request', async () => {
        mockedMergeRequestService.mergeMergeRequest.mockResolvedValue({
            id: 'mr-1',
            status: 'merged',
        } as any)

        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)
        const response = await request(app)
            .post('/api/merge-requests/mr-1/merge')
            .expect(200)

        expect(response.body.data.mergeRequest.status).toBe('merged')
        expect(
            mockedMergeRequestService.mergeMergeRequest
        ).toHaveBeenCalledWith(
            'mr-1',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })

    it('cancels merge request', async () => {
        mockedMergeRequestService.cancelMergeRequest.mockResolvedValue({
            id: 'mr-1',
            status: 'cancelled',
        } as any)

        const app = createHttpTestApp('/api/merge-requests', mergeRequestRouter)
        const response = await request(app)
            .post('/api/merge-requests/mr-1/cancel')
            .expect(200)

        expect(response.body.data.mergeRequest.status).toBe('cancelled')
        expect(
            mockedMergeRequestService.cancelMergeRequest
        ).toHaveBeenCalledWith(
            'mr-1',
            authenticatedUser.id,
            authenticatedUser.email
        )
    })
})
