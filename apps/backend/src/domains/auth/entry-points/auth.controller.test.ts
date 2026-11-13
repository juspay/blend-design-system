import { describe, expect, it, vi } from 'vitest'

vi.mock('@/domains/audit/data-access/auditlog.repository.js')
vi.mock('../data-access/auth.repository.js')

import { refreshAccessToken } from './auth.controller.js'
import {
    generateAccessToken,
    generateRefreshToken,
} from '../domain/auth.service.js'
import * as authRepository from '../data-access/auth.repository.js'

const mockedAuthRepository = vi.mocked(authRepository)

const futureDate = () => new Date(Date.now() + 24 * 60 * 60 * 1000)

const makeRes = () => {
    const res = {
        json: vi.fn(),
        cookie: vi.fn().mockReturnThis(),
        clearCookie: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
    }
    return res as any
}

const seedStoredToken = () => {
    mockedAuthRepository.findRefreshToken.mockResolvedValue({
        id: 'rt-1',
        userId: 'user-1',
        tokenHash: 'hash',
        expiresAt: futureDate(),
        revokedAt: null,
    } as any)
    mockedAuthRepository.revokeRefreshToken.mockResolvedValue(undefined as any)
    mockedAuthRepository.storeRefreshToken.mockResolvedValue(undefined as any)
}

describe('refreshAccessToken', () => {
    it('returns rotated tokens in the body when the refresh token is presented in the body (CLI flow)', async () => {
        const refreshToken = generateRefreshToken({
            userId: 'user-1',
            email: 'user@blend.dev',
            role: 'viewer',
        })
        seedStoredToken()

        const res = makeRes()
        await refreshAccessToken(
            { cookies: {}, body: { refreshToken } } as any,
            res
        )

        const body = res.json.mock.calls[0][0]
        expect(body.data.refreshToken).toEqual(expect.any(String))
        expect(body.data.accessToken).toEqual(expect.any(String))
        expect(body.data.refreshExpiresAt).toEqual(expect.any(Number))
        // CLI has no cookie jar — cookies are not rotated on this path.
        expect(res.cookie).not.toHaveBeenCalled()
    })

    it('never returns token values in the body for cookie-authenticated (browser) refreshes', async () => {
        const refreshToken = generateRefreshToken({
            userId: 'user-1',
            email: 'user@blend.dev',
            role: 'viewer',
        })
        seedStoredToken()

        const res = makeRes()
        await refreshAccessToken(
            { cookies: { refreshToken }, body: {} } as any,
            res
        )

        const body = res.json.mock.calls[0][0]
        expect(body.data).not.toHaveProperty('accessToken')
        expect(body.data).not.toHaveProperty('refreshToken')
        expect(body.data).toHaveProperty('expiresAt')
        expect(body.data).toHaveProperty('refreshExpiresAt')

        // Both httpOnly cookies are rotated with fresh token values.
        expect(res.cookie).toHaveBeenCalledTimes(2)
        const [refreshName, refreshValue] = res.cookie.mock.calls[0]
        const [accessName, accessValue] = res.cookie.mock.calls[1]
        expect(refreshName).toBe('refreshToken')
        expect(refreshValue).toEqual(expect.any(String))
        expect(accessName).toBe('accessToken')
        expect(accessValue).toEqual(expect.any(String))
    })

    it('rejects non-refresh tokens presented for rotation', async () => {
        const accessToken = generateAccessToken({
            userId: 'user-1',
            email: 'user@blend.dev',
            role: 'viewer',
        })
        seedStoredToken()

        await expect(
            refreshAccessToken(
                { cookies: {}, body: { refreshToken: accessToken } } as any,
                makeRes()
            )
        ).rejects.toMatchObject({ code: 'UNAUTHORIZED' })

        expect(mockedAuthRepository.revokeRefreshToken).toHaveBeenCalled()
    })

    it('rejects refreshes without a body or cookie token', async () => {
        await expect(
            refreshAccessToken({ cookies: {}, body: {} } as any, makeRes())
        ).rejects.toMatchObject({ code: 'UNAUTHORIZED' })

        expect(mockedAuthRepository.findRefreshToken).not.toHaveBeenCalled()
    })
})
