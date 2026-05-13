/**
 * API Client for Blend Token Studio
 *
 * Handles communication between the CLI and the Studio API.
 * Supports authentication via Studio API tokens (JWT).
 *
 * Features:
 *   - Automatic retry with exponential backoff for transient failures
 *   - Input sanitization for branch IDs and paths
 *   - Graceful error handling with descriptive messages
 *   - Request timeout support
 */

import {
    existsSync,
    mkdirSync,
    readFileSync,
    unlinkSync,
    writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
import type { BrandConfig } from '@juspay/blend-design-system/tokens/server'
import { normalizeStudioApiUrl } from '../constants/studio'
import { resolveStudioApiUrlForProject } from './project-api-url'
import type {
    Branch,
    BranchListOptions,
    BranchListResult,
    CreateBranchInput,
    CreateVersionInput,
    ResolvedTokensResponse,
    Version,
} from '@juspay/blend-design-system/tokens/server'

const CONFIG_DIR = join(homedir(), '.blend-studio')
const AUTH_FILE = join(CONFIG_DIR, 'auth.json')

// ---------------------------------------------------------------------------
// Retry & Timeout Constants
// ---------------------------------------------------------------------------

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY_MS = 500
const REQUEST_TIMEOUT_MS = 30_000

/** HTTP status codes that are safe to retry. */
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504])

// ---------------------------------------------------------------------------
// Input Sanitization
// ---------------------------------------------------------------------------

/**
 * Sanitize a branch ID to prevent path-traversal attacks.
 * Allows only alphanumeric, hyphens, underscores, slashes, and dots.
 */
function sanitizeBranchId(branchId: string): string {
    // Remove path traversal sequences
    const cleaned = branchId
        .replace(/\.\./g, '')
        .replace(/[^a-zA-Z0-9\-_./]/g, '')
        .replace(/\/+/g, '/')
    if (!cleaned) {
        throw new Error(`Invalid branch ID: "${branchId}"`)
    }
    return cleaned
}

/**
 * Sleep for a given number of milliseconds.
 */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

interface AuthData {
    idToken: string
    refreshToken: string
    expiresAt: number
    email: string
    uid: string
}

interface CliTokenExchangeResult {
    token: string
    tokenType: 'cli_export' | string
    expiresAt: number | null
    expiresInSeconds: number | null

    accessToken: string
    accessExpiresAt: number | null
    accessExpiresInSeconds: number | null

    refreshToken: string
    refreshExpiresAt: number | null
    refreshExpiresInSeconds: number | null
}

interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: {
        code: string
        message: string
        details?: Record<string, unknown>
    }
}

export class ApiClient {
    private apiUrl: string
    private authData: AuthData | null = null

    constructor(apiUrl?: string) {
        if (apiUrl != null && apiUrl !== '') {
            this.apiUrl = normalizeStudioApiUrl(apiUrl)
        } else {
            this.apiUrl = resolveStudioApiUrlForProject(process.cwd())
        }
        this.loadAuth()
    }

    /**
     * Point API calls at the Studio URL for the current project (blend.config.json + env).
     * Call at the start of commands that talk to the network.
     */
    syncToProject(cwd: string = process.cwd()): void {
        this.apiUrl = resolveStudioApiUrlForProject(cwd)
    }

    private loadAuth(): void {
        try {
            // Highest precedence: explicit env var for CI/local dev.
            const envToken = process.env.BLEND_STUDIO_API_TOKEN
            if (envToken) {
                const parts = envToken.split('.')
                if (parts.length === 3) {
                    const payload = JSON.parse(
                        Buffer.from(parts[1], 'base64').toString('utf-8')
                    )
                    const email = payload.email
                    const uid = payload.user_id || payload.sub || payload.userId
                    const expiresAt =
                        typeof payload.exp === 'number'
                            ? payload.exp * 1000
                            : Date.now() + 60 * 60 * 1000

                    if (email && uid && expiresAt > Date.now()) {
                        this.authData = {
                            idToken: envToken,
                            refreshToken: '',
                            expiresAt,
                            email,
                            uid,
                        }
                        return
                    }
                }
            }

            if (existsSync(AUTH_FILE)) {
                const data = JSON.parse(readFileSync(AUTH_FILE, 'utf-8'))
                // If we have a refresh token, keep authData even if the access token expired.
                // This allows Option 2 auto-refresh without requiring re-login.
                if (
                    data.expiresAt > Date.now() ||
                    (typeof data.refreshToken === 'string' &&
                        data.refreshToken.trim().length > 0)
                ) {
                    this.authData = data
                }
            }
        } catch {
            this.authData = null
        }
    }

    private saveAuth(data: AuthData): void {
        mkdirSync(CONFIG_DIR, { recursive: true })
        writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2))
        this.authData = data
    }

    clearAuth(): void {
        try {
            if (existsSync(AUTH_FILE)) {
                unlinkSync(AUTH_FILE)
            }
        } catch {}
        this.authData = null
    }

    isAuthenticated(): boolean {
        if (!this.authData) return false
        // Option 2: if we have a refresh token, we can auto-refresh expired sessions.
        return (
            this.authData.expiresAt > Date.now() ||
            this.authData.refreshToken.trim().length > 0
        )
    }

    getAuthEmail(): string | null {
        return this.authData?.email ?? null
    }

    async login(
        idToken: string,
        refreshToken: string,
        expiresIn: number,
        email: string,
        uid: string
    ): Promise<void> {
        const authData: AuthData = {
            idToken,
            refreshToken,
            expiresAt: Date.now() + expiresIn * 1000,
            email,
            uid,
        }
        this.saveAuth(authData)
    }

    async exchangeCliExportTokenForSession(
        studioCliToken: string
    ): Promise<CliTokenExchangeResult> {
        const url = `${this.apiUrl}/api/auth/cli-token`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${studioCliToken}`,
                'Content-Type': 'application/json',
            },
        })

        const rawText = await response.text()
        let raw: unknown
        try {
            raw = JSON.parse(rawText) as unknown
        } catch {
            throw new Error(
                `Unexpected response from Studio API (${response.status}). Expected JSON but got HTML/text.`
            )
        }

        const parsed = raw as ApiResponse<CliTokenExchangeResult>
        if (!response.ok || parsed.success !== true || !parsed.data) {
            const message =
                parsed.error?.message ||
                `Failed to exchange CLI token (HTTP ${response.status})`
            throw new Error(message)
        }

        return parsed.data
    }

    private async refreshCliSession(): Promise<void> {
        if (!this.authData?.refreshToken) {
            throw new Error('No refresh token available')
        }

        const url = `${this.apiUrl}/api/auth/refresh`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: this.authData.refreshToken }),
        })

        const rawText = await response.text()
        let raw: unknown
        try {
            raw = JSON.parse(rawText) as unknown
        } catch {
            throw new Error(
                `Unexpected response from Studio API (${response.status}). Expected JSON but got HTML/text.`
            )
        }

        const parsed = raw as ApiResponse<{
            accessToken: string
            refreshToken: string
            expiresAt: number | null
            expiresInSeconds: number | null
            refreshExpiresAt: number | null
        }>

        if (!response.ok || parsed.success !== true || !parsed.data) {
            const message =
                parsed.error?.message ||
                `Failed to refresh session (HTTP ${response.status})`
            throw new Error(message)
        }

        const accessToken = parsed.data.accessToken
        const refreshToken = parsed.data.refreshToken

        const expiresAt =
            typeof parsed.data.expiresAt === 'number' && parsed.data.expiresAt
                ? parsed.data.expiresAt
                : this.authData.expiresAt

        // If backend returned expiresInSeconds (remaining), use it for robustness.
        const expiresInSeconds =
            typeof parsed.data.expiresInSeconds === 'number'
                ? parsed.data.expiresInSeconds
                : null

        const nextExpiresAt =
            typeof expiresInSeconds === 'number'
                ? Date.now() + expiresInSeconds * 1000
                : expiresAt

        // Persist for next command runs.
        this.saveAuth({
            idToken: accessToken,
            refreshToken,
            expiresAt: nextExpiresAt,
            email: this.authData.email,
            uid: this.authData.uid,
        })
    }

    private async request<T>(
        method: string,
        path: string,
        body?: unknown
    ): Promise<ApiResponse<T>> {
        const url = `${this.apiUrl}/api${path}`

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }

        if (this.authData) {
            headers['Authorization'] = `Bearer ${this.authData.idToken}`
        }

        let lastError: ApiResponse<T> | null = null

        let hasRefreshed = false

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                // Add timeout via AbortController
                const controller = new AbortController()
                const timeoutId = setTimeout(
                    () => controller.abort(),
                    REQUEST_TIMEOUT_MS
                )

                const response = await fetch(url, {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : undefined,
                    signal: controller.signal,
                })

                clearTimeout(timeoutId)

                const rawText = await response.text()
                let raw: any
                try {
                    raw = JSON.parse(rawText)
                } catch {
                    raw = null
                }

                if (!response.ok) {
                    // Option 2 auto-refresh on expired/invalid access tokens.
                    if (
                        response.status === 401 &&
                        this.authData?.refreshToken &&
                        !hasRefreshed
                    ) {
                        hasRefreshed = true
                        await this.refreshCliSession()
                        attempt -= 1
                        continue
                    }

                    const errorResponse: ApiResponse<T> = {
                        success: false,
                        error: (
                            raw as {
                                error?: { code: string; message: string }
                            }
                        ).error || {
                            code: 'UNKNOWN_ERROR',
                            message:
                                raw?.message ||
                                raw?.error?.message ||
                                `HTTP ${response.status}: ${response.statusText}`,
                        },
                    }

                    // Retry on transient errors
                    if (
                        RETRYABLE_STATUS_CODES.has(response.status) &&
                        attempt < MAX_RETRIES
                    ) {
                        lastError = errorResponse
                        const delay =
                            INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt)
                        await sleep(delay)
                        continue
                    }

                    return errorResponse
                }

                // Support both response shapes:
                // - "studio backend": { success: true, data: <T> }
                // - "raw backend": <T>
                const data =
                    raw?.success === true && raw?.data !== undefined
                        ? raw.data
                        : raw

                return {
                    success: true,
                    data: data as T,
                }
            } catch (error) {
                const isTimeout =
                    error instanceof Error && error.name === 'AbortError'
                const networkError: ApiResponse<T> = {
                    success: false,
                    error: {
                        code: isTimeout ? 'TIMEOUT_ERROR' : 'NETWORK_ERROR',
                        message: isTimeout
                            ? `Request timed out after ${REQUEST_TIMEOUT_MS}ms`
                            : error instanceof Error
                              ? error.message
                              : 'Network request failed',
                    },
                }

                // Retry on network errors (transient)
                if (attempt < MAX_RETRIES) {
                    lastError = networkError
                    const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt)
                    await sleep(delay)
                    continue
                }

                return networkError
            }
        }

        // Should not reach here, but return last error as safety net
        return (
            lastError || {
                success: false,
                error: {
                    code: 'UNKNOWN_ERROR',
                    message: 'Request failed after all retries',
                },
            }
        )
    }

    async listBranches(
        options?: BranchListOptions
    ): Promise<ApiResponse<BranchListResult>> {
        const params = new URLSearchParams()

        if (options?.filters?.status) {
            params.set('status', options.filters.status)
        }
        if (options?.filters?.visibility) {
            params.set('visibility', options.filters.visibility)
        }
        if (options?.filters?.search) {
            params.set('search', options.filters.search)
        }
        if (options?.sortBy) {
            params.set('sortBy', options.sortBy)
        }
        if (options?.sortOrder) {
            params.set('sortOrder', options.sortOrder)
        }
        if (options?.limit) {
            params.set('limit', String(options.limit))
        }
        if (options?.cursor) {
            params.set('cursor', options.cursor)
        }

        const query = params.toString()
        return this.request<BranchListResult>(
            'GET',
            `/branches${query ? `?${query}` : ''}`
        )
    }

    async getBranch(branchId: string): Promise<ApiResponse<Branch>> {
        const safeBranchId = sanitizeBranchId(branchId)
        return this.request<Branch>(
            'GET',
            `/branches/${encodeURIComponent(safeBranchId)}`
        )
    }

    async createBranch(input: CreateBranchInput): Promise<ApiResponse<Branch>> {
        return this.request<Branch>('POST', '/branches', input)
    }

    async updateBranch(
        branchId: string,
        config: BrandConfig
    ): Promise<ApiResponse<Branch>> {
        const safeBranchId = sanitizeBranchId(branchId)
        return this.request<Branch>(
            'PATCH',
            `/branches/${encodeURIComponent(safeBranchId)}`,
            {
                brandConfig: config,
            }
        )
    }

    async deleteBranch(branchId: string): Promise<ApiResponse<void>> {
        const safeBranchId = sanitizeBranchId(branchId)
        return this.request<void>(
            'DELETE',
            `/branches/${encodeURIComponent(safeBranchId)}`
        )
    }

    async forkBranch(
        branchId: string,
        name: string,
        slug?: string
    ): Promise<ApiResponse<Branch>> {
        const safeBranchId = sanitizeBranchId(branchId)
        return this.request<Branch>(
            'POST',
            `/branches/${encodeURIComponent(safeBranchId)}/fork`,
            {
                name,
                slug,
            }
        )
    }

    async publishVersion(
        branchId: string,
        input: CreateVersionInput
    ): Promise<ApiResponse<Version>> {
        const safeBranchId = sanitizeBranchId(branchId)
        return this.request<Version>(
            'POST',
            `/branches/${encodeURIComponent(safeBranchId)}/publish`,
            input
        )
    }

    async listVersions(branchId: string): Promise<ApiResponse<Version[]>> {
        const safeBranchId = sanitizeBranchId(branchId)
        return this.request<Version[]>(
            'GET',
            `/branches/${encodeURIComponent(safeBranchId)}/versions`
        )
    }

    async getVersion(
        branchId: string,
        version: string
    ): Promise<ApiResponse<Version>> {
        const safeBranchId = sanitizeBranchId(branchId)
        return this.request<Version>(
            'GET',
            `/branches/${encodeURIComponent(safeBranchId)}/versions/${encodeURIComponent(version)}`
        )
    }

    async resolveTokens(
        branchId: string,
        theme: 'light' | 'dark',
        version?: string
    ): Promise<ApiResponse<ResolvedTokensResponse>> {
        const safeBranchId = sanitizeBranchId(branchId)
        const params = new URLSearchParams({ theme })
        if (version) {
            params.set('version', version)
        }
        return this.request<ResolvedTokensResponse>(
            'POST',
            `/branches/${encodeURIComponent(safeBranchId)}/resolve?${params.toString()}`
        )
    }

    async pullBranch(
        branchId: string,
        version?: string
    ): Promise<
        ApiResponse<{
            branch: Branch
            version: Version | null
            brandConfig: BrandConfig
        }>
    > {
        const safeBranchId = sanitizeBranchId(branchId)
        const params = version ? `?version=${encodeURIComponent(version)}` : ''
        return this.request<{
            branch: Branch
            version: Version | null
            brandConfig: BrandConfig
        }>('GET', `/branches/${encodeURIComponent(safeBranchId)}/pull${params}`)
    }
}

export const apiClient = new ApiClient()

export function syncApiClientToProject(cwd: string = process.cwd()): void {
    apiClient.syncToProject(cwd)
}
