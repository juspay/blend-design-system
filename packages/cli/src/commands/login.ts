/**
 * login command
 *
 * Authenticate with Blend Token Studio.
 *
 * Usage:
 *   blend-studio login                    # interactive login
 *   blend-studio login --token <token>    # login with Studio token (JWT)
 *   blend-studio logout                   # clear authentication
 */

import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import prompts from 'prompts'
import { logger } from '../utils/logger'
import { apiClient, syncApiClientToProject } from '../utils/api-client'

interface LoginOptions {
    token?: string
}

const AUTH_FILE = join(homedir(), '.blend-studio', 'auth.json')

export async function loginCommand(options: LoginOptions = {}): Promise<void> {
    syncApiClientToProject(process.cwd())
    logger.header('Blend Token Studio — Login')

    if (apiClient.isAuthenticated()) {
        await apiClient.verifyAuthWithServer()
        const email = apiClient.getAuthEmail()
        logger.info(
            email ? `Already logged in as ${email}` : 'Already authenticated'
        )
        const { proceed } = await prompts({
            type: 'confirm',
            name: 'proceed',
            message: 'Login with a different account?',
            initial: false,
        })

        if (!proceed) {
            return
        }

        apiClient.clearAuth()
    }

    if (options.token) {
        await loginWithToken(options.token)
        return
    }

    console.log(`
  To authenticate, use a Studio access token (JWT).

  Option 1 — from the Studio web app (recommended)
    1. Open Blend Token Studio in your browser (same environment as this project’s blend.config.json).
    2. Sign in with Google.
    3. User menu (top right) → "CLI token" — a short-lived token (default 10 minutes) is minted for you.
    4. Run from your project folder before it expires:
         npx blend-studio login --token <paste>
       Generate a new token from the menu anytime.

  Option 2 — CI / scripts
    export BLEND_STUDIO_API_TOKEN=<your-token>

  Tip: BLEND_STUDIO_API_URL overrides blend.config.json. Unofficial hosts in
       blend.config.json require BLEND_TRUST_PROJECT_API_URL=1 (self-hosted servers).

`)

    const { token } = await prompts({
        type: 'password',
        name: 'token',
        message: 'Paste your Studio API token:',
    })

    if (!token) {
        logger.error('No token provided')
        return
    }

    await loginWithToken(token)
}

async function loginWithToken(token: string): Promise<void> {
    const parts = token.split('.')
    if (parts.length !== 3) {
        logger.error('Invalid token format. Expected a JWT.')
        return
    }

    try {
        // The server verifies the token signature and mints the CLI session;
        // identity comes from /auth/me, never from the unsigned JWT payload.
        const exchange = await apiClient.exchangeCliExportTokenForSession(token)

        const identity = await apiClient.fetchCurrentUser(
            exchange.accessToken ?? token
        )

        let expiresInSeconds = 0
        if (typeof exchange.accessExpiresInSeconds === 'number') {
            expiresInSeconds = exchange.accessExpiresInSeconds
        } else if (typeof exchange.accessExpiresAt === 'number') {
            expiresInSeconds = Math.max(
                0,
                Math.floor((exchange.accessExpiresAt - Date.now()) / 1000)
            )
        } else if (typeof exchange.expiresAt === 'number') {
            expiresInSeconds = Math.max(
                0,
                Math.floor((exchange.expiresAt - Date.now()) / 1000)
            )
        }

        const nextAccessExpiresAt =
            exchange.accessExpiresAt ?? exchange.expiresAt ?? null

        await apiClient.login(
            exchange.accessToken ?? token,
            exchange.refreshToken ?? '',
            expiresInSeconds,
            identity?.email ?? '',
            identity?.id ?? ''
        )

        logger.success(
            identity ? `Logged in as ${identity.email}` : 'Logged in'
        )
        logger.detail(
            'Access token expires at: ' +
                (nextAccessExpiresAt
                    ? new Date(nextAccessExpiresAt).toLocaleString()
                    : 'unknown')
        )
    } catch (error) {
        logger.error('Login failed')
        logger.detail(error instanceof Error ? error.message : 'Unknown error')
    }
}

export async function logoutCommand(): Promise<void> {
    syncApiClientToProject(process.cwd())
    logger.header('Blend Token Studio — Logout')

    if (!apiClient.isAuthenticated()) {
        logger.info('Not logged in')
        return
    }

    const email = apiClient.getAuthEmail()
    apiClient.clearAuth()

    logger.success(`Logged out from ${email}`)
}

export async function whoamiCommand(): Promise<void> {
    syncApiClientToProject(process.cwd())
    if (!apiClient.isAuthenticated()) {
        logger.info('Not logged in')
        logger.detail('Run `npx blend-studio login` to authenticate')
        return
    }

    await apiClient.verifyAuthWithServer()
    const email = apiClient.getAuthEmail()
    const identityLabel = email || '(API token)'

    if (existsSync(AUTH_FILE)) {
        const data = JSON.parse(readFileSync(AUTH_FILE, 'utf-8'))
        const expiresAt = new Date(data.expiresAt)

        console.log(`Logged in as: ${identityLabel}`)
        console.log(`Token expires: ${expiresAt.toLocaleString()}`)

        if (data.expiresAt < Date.now()) {
            console.log('\x1b[33mWarning: Token has expired\x1b[0m')
        }
    } else {
        console.log(`Logged in as: ${identityLabel}`)
    }
}
