/**
 * API Client for Blend Token Studio
 *
 * Handles communication between the CLI and the Studio API.
 * Supports authentication via Studio API tokens (JWT).
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

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            })

            const raw = (await response.json()) as any

            if (!response.ok) {
                return {
                    success: false,
                    error: (
                        raw as { error?: { code: string; message: string } }
                    ).error || {
                        code: 'UNKNOWN_ERROR',
                        message:
                            raw?.message ||
                            raw?.error?.message ||
                            `HTTP ${response.status}: ${response.statusText}`,
                    },
                }
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
            return {
                success: false,
                error: {
                    code: 'NETWORK_ERROR',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Network request failed',
                },
            }
        }
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
        return this.request<Branch>(
            'GET',
            `/branches/${encodeURIComponent(branchId)}`
        )
    }

    async createBranch(input: CreateBranchInput): Promise<ApiResponse<Branch>> {
        return this.request<Branch>('POST', '/branches', input)
    }

    async updateBranch(
        branchId: string,
        config: BrandConfig
    ): Promise<ApiResponse<Branch>> {
        return this.request<Branch>(
            'PATCH',
            `/branches/${encodeURIComponent(branchId)}`,
            {
                brandConfig: config,
            }
        )
    }

    async deleteBranch(branchId: string): Promise<ApiResponse<void>> {
        return this.request<void>(
            'DELETE',
            `/branches/${encodeURIComponent(branchId)}`
        )
    }

    async forkBranch(
        branchId: string,
        name: string,
        slug?: string
    ): Promise<ApiResponse<Branch>> {
        return this.request<Branch>(
            'POST',
            `/branches/${encodeURIComponent(branchId)}/fork`,
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
        return this.request<Version>(
            'POST',
            `/branches/${encodeURIComponent(branchId)}/publish`,
            input
        )
    }

    async listVersions(branchId: string): Promise<ApiResponse<Version[]>> {
        return this.request<Version[]>(
            'GET',
            `/branches/${encodeURIComponent(branchId)}/versions`
        )
    }

    async getVersion(
        branchId: string,
        version: string
    ): Promise<ApiResponse<Version>> {
        return this.request<Version>(
            'GET',
            `/branches/${encodeURIComponent(branchId)}/versions/${encodeURIComponent(version)}`
        )
    }

    async resolveTokens(
        branchId: string,
        theme: 'light' | 'dark',
        version?: string
    ): Promise<ApiResponse<ResolvedTokensResponse>> {
        const params = new URLSearchParams({ theme })
        if (version) {
            params.set('version', version)
        }
        return this.request<ResolvedTokensResponse>(
            'POST',
            `/branches/${encodeURIComponent(branchId)}/resolve?${params.toString()}`
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
        const params = version ? `?version=${encodeURIComponent(version)}` : ''
        return this.request<{
            branch: Branch
            version: Version | null
            brandConfig: BrandConfig
        }>('GET', `/branches/${encodeURIComponent(branchId)}/pull${params}`)
    }
}

export const apiClient = new ApiClient()
