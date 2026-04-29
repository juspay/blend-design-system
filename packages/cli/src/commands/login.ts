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
        const email = apiClient.getAuthEmail()
        logger.info(`Already logged in as ${email}`)
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

  Tip: BLEND_STUDIO_API_URL overrides blend.config.json if you need to point the CLI elsewhere.

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
        const payload = JSON.parse(
            Buffer.from(parts[1], 'base64').toString('utf-8')
        )

        const email = payload.email
        const uid = payload.user_id || payload.sub || payload.userId
        const expiresAt = payload.exp * 1000

        if (!email || !uid) {
            logger.error('Token does not contain required claims')
            return
        }

        if (expiresAt < Date.now()) {
            logger.error(
                'Token has expired. Please get a fresh token from the dashboard.'
            )
            return
        }

        // Option 2: Exchange the short-lived Studio CLI token for a
        // long-lived CLI session (access token + refresh token).
        const exchange = await apiClient.exchangeCliExportTokenForSession(token)

        const nextAccessExpiresAt =
            exchange.accessExpiresAt ?? exchange.expiresAt ?? expiresAt

        const expiresInSeconds =
            typeof exchange.accessExpiresInSeconds === 'number'
                ? exchange.accessExpiresInSeconds
                : Math.max(
                      0,
                      Math.floor((nextAccessExpiresAt - Date.now()) / 1000)
                  )

        await apiClient.login(
            exchange.accessToken ?? token,
            exchange.refreshToken ?? '',
            expiresInSeconds,
            email,
            uid
        )

        logger.success(`Logged in as ${email}`)
        logger.detail(
            'Access token expires at: ' +
                new Date(nextAccessExpiresAt).toLocaleString()
        )
    } catch (error) {
        logger.error('Failed to parse token')
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

    const email = apiClient.getAuthEmail()

    if (existsSync(AUTH_FILE)) {
        const data = JSON.parse(readFileSync(AUTH_FILE, 'utf-8'))
        const expiresAt = new Date(data.expiresAt)

        console.log(`Logged in as: ${email}`)
        console.log(`Token expires: ${expiresAt.toLocaleString()}`)

        if (data.expiresAt < Date.now()) {
            console.log('\x1b[33mWarning: Token has expired\x1b[0m')
        }
    } else {
        console.log(`Logged in as: ${email}`)
    }
}
