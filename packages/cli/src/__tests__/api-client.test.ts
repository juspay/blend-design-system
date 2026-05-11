/**
 * Tests for API client — authentication, sanitization, retry logic.
 */
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'

async function createApiClient(apiUrl?: string) {
    // Re-evaluate module constants (AUTH_FILE based on homedir) after HOME changes.
    vi.resetModules()
    const mod = await import('../utils/api-client')
    return new mod.ApiClient(apiUrl)
}

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

    it('creates instance with default API URL', async () => {
        const client = await createApiClient()
        expect(client).toBeTruthy()
    })

    it('creates instance with custom API URL', async () => {
        const client = await createApiClient('https://custom.api.com')
        expect(client).toBeTruthy()
    })

    it('is not authenticated by default (no auth file)', async () => {
        const client = await createApiClient('https://test.example.com')
        expect(client.isAuthenticated()).toBe(false)
    })

    it('getAuthEmail returns null when not authenticated', async () => {
        const client = await createApiClient('https://test.example.com')
        expect(client.getAuthEmail()).toBeNull()
    })

    it('clearAuth does not throw when no auth exists', async () => {
        const client = await createApiClient('https://test.example.com')
        expect(() => client.clearAuth()).not.toThrow()
    })
})
