/**
 * list command
 *
 * List available branches from Blend Token Studio.
 *
 * Usage:
 *   blend-token-studio list                    # list all branches
 *   blend-token-studio list --status published # filter by status
 *   blend-token-studio list --search hdfc      # search by name
 *   blend-token-studio list --json             # output as JSON (envelope)
 */

import ora from 'ora'
import { logger } from '../utils/logger'
import {
    parseCliFormat,
    reportCommandFailure,
    reportCommandSuccess,
} from '../utils/cli-output'
import { apiClient, syncApiClientToProject } from '../utils/api-client'
import type {
    BranchListOptions,
    BranchStatus,
    BranchVisibility,
} from '@juspay/blend-design-system/tokens/server'

interface ListOptions {
    status?: BranchStatus
    visibility?: BranchVisibility
    search?: string
    json?: boolean
    format?: string
    ci?: boolean
    limit?: number
}

export async function listCommand(options: ListOptions = {}): Promise<void> {
    syncApiClientToProject(process.cwd())
    const format = parseCliFormat(options)

    if (!apiClient.isAuthenticated()) {
        const message =
            'Not authenticated. Run `npx blend-token-studio login` first.'
        reportCommandFailure({
            format,
            command: 'list',
            message,
            ci: options.ci,
            logPretty: (m) => logger.error(m),
        })
        return
    }

    if (format === 'pretty') {
        logger.header('Blend Token Studio — Branches')
    }

    const spinner =
        format === 'pretty' ? ora('Fetching branches...').start() : null

    const listOptions: BranchListOptions = {
        filters: {
            status: options.status,
            visibility: options.visibility,
            search: options.search,
        },
        sortBy: 'updatedAt',
        sortOrder: 'desc',
        limit: options.limit || 50,
    }

    const response = await apiClient.listBranches(listOptions)

    if (!response.success || !response.data) {
        if (spinner) spinner.fail('Failed to fetch branches')
        const message = response.error?.message || 'Unknown error'
        const authIssue =
            response.error?.code === 'UNAUTHORIZED' ||
            /token not found|not authenticated|unauthorized|expired|sign in again/i.test(
                message
            )
        reportCommandFailure({
            format,
            command: 'list',
            message,
            ci: options.ci,
            logPretty: (m) => {
                logger.error(m)
                if (authIssue) {
                    logger.detail(
                        'Session expired or token missing. Run `npx blend-token-studio login` again.'
                    )
                    logger.detail(
                        'Or set BLEND_STUDIO_API_TOKEN for non-interactive flows.'
                    )
                }
            },
        })
        return
    }

    const { branches, total, hasMore } = response.data

    if (spinner) {
        spinner.succeed(`Found ${total} branch${total !== 1 ? 'es' : ''}`)
    }

    reportCommandSuccess(format, 'list', {
        branches,
        total,
        hasMore,
    })

    if (format === 'json') {
        return
    }

    if (branches.length === 0) {
        logger.info('No branches found.')
        logger.detail(
            'Create one with: blend-token-studio push <branch-id> --new'
        )
        return
    }

    logger.newline()

    const statusColors: Record<string, string> = {
        draft: '\x1b[33m',
        published: '\x1b[32m',
        archived: '\x1b[90m',
    }
    const reset = '\x1b[0m'

    for (const branch of branches) {
        const statusColor = statusColors[branch.status] || ''
        const statusBadge = `${statusColor}[${branch.status}]${reset}`
        const versionBadge = branch.latestVersion
            ? ` v${branch.latestVersion}`
            : ''

        console.log(`  ${branch.brandId.padEnd(30)} ${branch.name}`)
        console.log(`  ${' '.repeat(30)} ${statusBadge}${versionBadge}`)
        console.log(
            `  ${' '.repeat(30)} Updated: ${formatDate(branch.updatedAt)}`
        )
        logger.newline()
    }

    if (hasMore) {
        logger.info('More branches available. Use --limit to show more.')
    }

    logger.newline()
    logger.detail('Pull a branch: npx blend-token-studio pull <branch-id>')
}

function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60))
            return `${minutes}m ago`
        }
        return `${hours}h ago`
    }
    if (days === 1) return 'yesterday'
    if (days < 7) return `${days}d ago`
    return d.toLocaleDateString()
}
