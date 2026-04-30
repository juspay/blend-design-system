/**
 * Tests for API client — authentication, sanitization, retry logic.
 */
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import { ApiClient } from '../utils/api-client'

describe('ApiClient', () => {
    const originalHome = process.env.HOME
    let tempHome = ''

    beforeEach(() => {
        tempHome = mkdtempSync(join(tmpdir(), 'blend-cli-test-home-'))
        process.env.HOME = tempHome
        delete process.env.BLEND_STUDIO_API_TOKEN
    })

    afterEach(() => {
        if (originalHome) {
            process.env.HOME = originalHome
        } else {
            delete process.env.HOME
        }
        rmSync(tempHome, { recursive: true, force: true })
    })

    it('creates instance with default API URL', () => {
        const client = new ApiClient()
        expect(client).toBeTruthy()
    })

    it('creates instance with custom API URL', () => {
        const client = new ApiClient('https://custom.api.com')
        expect(client).toBeTruthy()
    })

    it('is not authenticated by default (no auth file)', () => {
        const client = new ApiClient('https://test.example.com')
        expect(client.isAuthenticated()).toBe(false)
    })

    it('getAuthEmail returns null when not authenticated', () => {
        const client = new ApiClient('https://test.example.com')
        expect(client.getAuthEmail()).toBeNull()
    })

    it('clearAuth does not throw when no auth exists', () => {
        const client = new ApiClient('https://test.example.com')
        expect(() => client.clearAuth()).not.toThrow()
    })
})
