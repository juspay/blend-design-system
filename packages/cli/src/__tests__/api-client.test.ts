/**
 * Tests for API client — authentication, sanitization, retry logic.
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'

async function createApiClient(apiUrl?: string) {
    // Re-evaluate module constants (AUTH_FILE based on homedir) after HOME changes.
    vi.resetModules()
    const mod = await import('../utils/api-client')
    return new mod.ApiClient(apiUrl)
}

async function importProjectApiUrl() {
    vi.resetModules()
    return import('../utils/project-api-url')
}

function withProjectConfig(apiUrl?: string): string {
    const dir = mkdtempSync(join(tmpdir(), 'blend-cli-project-'))
    if (apiUrl !== undefined) {
        writeFileSync(
            join(dir, 'blend.config.json'),
            JSON.stringify({ studio: { apiUrl } })
        )
    }
    return dir
}

const fakeEnvToken = (payload: Record<string, unknown>): string =>
    `header.${Buffer.from(JSON.stringify(payload)).toString('base64')}.signature`

describe('ApiClient', () => {
    const originalHome = process.env.HOME
    let tempHome = ''

    beforeEach(() => {
        tempHome = mkdtempSync(join(tmpdir(), 'blend-cli-test-home-'))
        process.env.HOME = tempHome
        delete process.env.BLEND_STUDIO_API_TOKEN
        delete process.env.BLEND_STUDIO_API_URL
        delete process.env.BLEND_TRUST_PROJECT_API_URL
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

    it('does not derive identity or expiry from an unverified token payload', async () => {
        process.env.BLEND_STUDIO_API_TOKEN = fakeEnvToken({
            email: 'attacker@example.com',
            sub: 'attacker-uid',
            exp: 9999999999,
        })

        const client = await createApiClient('https://test.example.com')

        expect(client.isAuthenticated()).toBe(true)
        expect(client.getAuthEmail()).toBe('')
    })

    it('verifies identity with the server and caches only the server response', async () => {
        process.env.BLEND_STUDIO_API_TOKEN = fakeEnvToken({
            email: 'attacker@example.com',
        })

        const fetchMock = vi.fn(
            async (_url: string) =>
                new Response(
                    JSON.stringify({
                        success: true,
                        data: {
                            user: { id: 'real-uid', email: 'real@example.com' },
                        },
                    }),
                    { status: 200 }
                )
        )
        vi.stubGlobal('fetch', fetchMock)

        try {
            const client = await createApiClient('https://test.example.com')
            await client.verifyAuthWithServer()
            await client.verifyAuthWithServer()

            expect(client.getAuthEmail()).toBe('real@example.com')
            expect(fetchMock).toHaveBeenCalledTimes(1)
            expect(String(fetchMock.mock.calls[0][0])).toBe(
                'https://test.example.com/api/auth/me'
            )
        } finally {
            vi.unstubAllGlobals()
        }
    })

    it('refuses to send credentials to an unrecognized host from blend.config.json', async () => {
        const projectDir = withProjectConfig('https://attacker.example.com')
        const previousCwd = process.cwd()
        process.chdir(projectDir)

        try {
            const client = await createApiClient()
            const response = await client.listBranches()

            expect(response.success).toBe(false)
            expect(response.error?.code).toBe('UNTRUSTED_API_URL')
            expect(response.error?.message).toContain(
                'https://attacker.example.com'
            )
        } finally {
            process.chdir(previousCwd)
            rmSync(projectDir, { recursive: true, force: true })
        }
    })
})

describe('resolveStudioApiUrlForProject', () => {
    beforeEach(() => {
        delete process.env.BLEND_STUDIO_API_URL
        delete process.env.BLEND_TRUST_PROJECT_API_URL
    })

    it('allows official Studio hosts from blend.config.json', async () => {
        const dir = withProjectConfig(
            'https://blend-backend-staging-2oyuucbkoa-uc.a.run.app'
        )
        try {
            const { resolveStudioApiUrlForProject } =
                await importProjectApiUrl()
            expect(resolveStudioApiUrlForProject(dir)).toBe(
                'https://blend-backend-staging-2oyuucbkoa-uc.a.run.app'
            )
        } finally {
            rmSync(dir, { recursive: true, force: true })
        }
    })

    it('throws for an unrecognized host from blend.config.json', async () => {
        const dir = withProjectConfig('https://attacker.example.com')
        try {
            const {
                resolveStudioApiUrlForProject,
                UntrustedProjectApiUrlError,
            } = await importProjectApiUrl()
            expect(() => resolveStudioApiUrlForProject(dir)).toThrow(
                UntrustedProjectApiUrlError
            )
        } finally {
            rmSync(dir, { recursive: true, force: true })
        }
    })

    it('honors BLEND_TRUST_PROJECT_API_URL=1 for self-hosted servers', async () => {
        process.env.BLEND_TRUST_PROJECT_API_URL = '1'
        const dir = withProjectConfig('https://self-hosted.example.com')
        try {
            const { resolveStudioApiUrlForProject } =
                await importProjectApiUrl()
            expect(resolveStudioApiUrlForProject(dir)).toBe(
                'https://self-hosted.example.com'
            )
        } finally {
            delete process.env.BLEND_TRUST_PROJECT_API_URL
            rmSync(dir, { recursive: true, force: true })
        }
    })

    it('prefers BLEND_STUDIO_API_URL over blend.config.json', async () => {
        process.env.BLEND_STUDIO_API_URL = 'https://env.example.com'
        const dir = withProjectConfig('https://attacker.example.com')
        try {
            const { resolveStudioApiUrlForProject } =
                await importProjectApiUrl()
            expect(resolveStudioApiUrlForProject(dir)).toBe(
                'https://env.example.com'
            )
        } finally {
            delete process.env.BLEND_STUDIO_API_URL
            rmSync(dir, { recursive: true, force: true })
        }
    })

    it('falls back to the default deployment without env or config', async () => {
        const dir = withProjectConfig(undefined)
        try {
            const { resolveStudioApiUrlForProject } =
                await importProjectApiUrl()
            expect(resolveStudioApiUrlForProject(dir)).toBe(
                'https://blend-backend-staging-2oyuucbkoa-uc.a.run.app'
            )
        } finally {
            rmSync(dir, { recursive: true, force: true })
        }
    })
})
