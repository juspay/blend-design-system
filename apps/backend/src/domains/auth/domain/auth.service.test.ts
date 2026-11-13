import { describe, expect, it } from 'vitest'
import jwt from 'jsonwebtoken'
import {
    generateAccessToken,
    generateRefreshToken,
    generateCliExportToken,
    verifyJwtToken,
} from './auth.service.js'
import { env } from '@/config/index.js'

const b64url = (value: unknown): string =>
    Buffer.from(JSON.stringify(value)).toString('base64url')

describe('auth.service jwt hardening', () => {
    it('round-trips service-issued access tokens', () => {
        const token = generateAccessToken({
            userId: 'user-1',
            email: 'user@blend.dev',
            role: 'viewer',
        })

        const decoded = verifyJwtToken(token)

        expect(decoded.type).toBe('access')
        expect(decoded.userId).toBe('user-1')
    })

    it('round-trips service-issued refresh tokens', () => {
        const token = generateRefreshToken({
            userId: 'user-1',
            email: 'user@blend.dev',
            role: 'viewer',
        })

        expect(verifyJwtToken(token).type).toBe('refresh')
    })

    it('round-trips service-issued cli_export tokens', () => {
        const token = generateCliExportToken({
            userId: 'user-1',
            email: 'user@blend.dev',
            role: 'viewer',
        })

        expect(verifyJwtToken(token).type).toBe('cli_export')
    })

    it('rejects alg=none tokens regardless of their payload', () => {
        const forged = `${b64url({ alg: 'none', typ: 'JWT' })}.${b64url({
            type: 'access',
            userId: 'user-1',
            email: 'attacker@blend.dev',
            role: 'superadmin',
            exp: Math.floor(Date.now() / 1000) + 999999,
        })}.`

        expect(() => verifyJwtToken(forged)).toThrow()
    })

    it('rejects HS256 tokens signed with a different secret', () => {
        const forged = jwt.sign(
            { type: 'access', userId: 'user-1', role: 'superadmin' },
            'attacker-controlled-secret-that-is-at-least-32-chars',
            { algorithm: 'HS256' }
        )

        expect(() => verifyJwtToken(forged)).toThrow()
    })

    it('signs with the HS256 algorithm', () => {
        const token = generateAccessToken({
            userId: 'user-1',
            email: 'user@blend.dev',
            role: 'viewer',
        })

        const header = JSON.parse(
            Buffer.from(token.split('.')[0], 'base64url').toString()
        )

        expect(header.alg).toBe('HS256')
        expect(env.JWT_SECRET).toBeTruthy()
    })
})
