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

import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
import type { BrandConfig } from '@blend-design/token-engine'
import type {
    Branch,
    BranchListOptions,
    BranchListResult,
    CreateBranchInput,
    CreateVersionInput,
    ResolvedTokensResponse,
    Version,
} from '@blend-design/token-engine'

const DEFAULT_API_URL = 'https://studio.blend.juspay.design'
const CONFIG_DIR = join(homedir(), '.blend-token-studio')
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
        this.apiUrl =
            apiUrl || process.env.BLEND_STUDIO_API_URL || DEFAULT_API_URL
        this.loadAuth()
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
                if (data.expiresAt > Date.now()) {
                    this.authData = data
                }
            }
        } catch {
            this.authData = null
        }
    }

    private saveAuth(data: AuthData): void {
        const { mkdirSync } = require('node:fs')
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
        return this.authData !== null && this.authData.expiresAt > Date.now()
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

                const raw = (await response.json()) as any

                if (!response.ok) {
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
