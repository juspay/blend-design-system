/**
 * push command
 *
 * Upload local brand.json to Blend Token Studio.
 *
 * Usage:
 *   blend-token-studio push                        # push to current branch (from studio.json)
 *   blend-token-studio push my-brand/default       # push to specific branch
 *   blend-token-studio push my-brand/default --new # create branch if not exists
 *   blend-token-studio push --publish              # push and publish a version
 *   blend-token-studio push --publish --minor      # push and publish with version bump
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import ora from 'ora'
import prompts from 'prompts'
import { logger } from '../utils/logger'
import {
    isCiMode,
    parseCliFormat,
    reportCommandFailure,
    reportCommandSuccess,
} from '../utils/cli-output'
import { apiClient } from '../utils/api-client'
import type { BrandConfig } from '@juspay/blend-design-system/tokens/server'
import {
    validateBrandConfig,
    incrementVersion,
} from '@juspay/blend-design-system/tokens/server'

interface PushOptions {
    publish?: boolean
    major?: boolean
    minor?: boolean
    patch?: boolean
    changelog?: string
    new?: boolean
    format?: string
    json?: boolean
    ci?: boolean
}

interface StudioMeta {
    branchId: string
    branchName: string
    version: string | null
    pulledAt: string
    apiUrl: string
}

export async function pushCommand(
    branchId?: string,
    options: PushOptions = {}
): Promise<void> {
    const format = parseCliFormat(options)
    const cwd = process.cwd()

    if (!apiClient.isAuthenticated()) {
        const message =
            'Not authenticated. Run `npx blend-token-studio login` first.'
        reportCommandFailure({
            format,
            command: 'push',
            message,
            ci: options.ci,
            logPretty: (m) => logger.error(m),
        })
        return
    }

    const outputDir = findOutputDir(cwd)
    if (!outputDir) {
        const message =
            'blend.config.json not found. Run `npx blend-token-studio init` first.'
        reportCommandFailure({
            format,
            command: 'push',
            message,
            ci: options.ci,
            logPretty: (m) => logger.error(m),
        })
        return
    }

    const brandPath = join(outputDir, 'brand.json')
    if (!existsSync(brandPath)) {
        const message =
            'brand.json not found. Run `npx blend-token-studio brand` first.'
        reportCommandFailure({
            format,
            command: 'push',
            message,
            ci: options.ci,
            logPretty: (m) => logger.error(m),
        })
        return
    }

    const brandConfig: BrandConfig = JSON.parse(
        readFileSync(brandPath, 'utf-8')
    )

    const validation = validateBrandConfig(brandConfig)
    if (!validation.valid) {
        const message = 'Brand config validation failed'
        if (format === 'pretty') {
            logger.error(`${message}:`)
            validation.errors.forEach((e) =>
                logger.error(`  ${e.path}: ${e.message}`)
            )
        }
        reportCommandFailure({
            format,
            command: 'push',
            message,
            ci: options.ci,
        })
        process.exitCode = 1
        return
    }

    let targetBranchId = branchId

    if (!targetBranchId) {
        const studioMetaPath = join(outputDir, 'studio.json')
        if (existsSync(studioMetaPath)) {
            const meta: StudioMeta = JSON.parse(
                readFileSync(studioMetaPath, 'utf-8')
            )
            targetBranchId = meta.branchId
        }
    }

    if (!targetBranchId) {
        targetBranchId = brandConfig.brandId
    }

    if (!targetBranchId) {
        const message =
            'No branch ID specified. Provide a branch ID or run `pull` first.'
        reportCommandFailure({
            format,
            command: 'push',
            message,
            ci: options.ci,
            logPretty: (m) => logger.error(m),
        })
        return
    }

    if (format === 'pretty') {
        logger.header('Blend Token Studio — Push')
    }

    let spinner =
        format === 'pretty'
            ? ora(`Checking branch ${targetBranchId}...`).start()
            : null

    const existingResponse = await apiClient.getBranch(targetBranchId)

    if (!existingResponse.success) {
        if (options.new) {
            if (spinner) spinner.text = `Creating branch ${targetBranchId}...`
            const createResponse = await apiClient.createBranch({
                brandId: brandConfig.brandId,
                name: brandConfig.name,
                brandConfig,
            })

            if (!createResponse.success) {
                if (spinner) spinner.fail('Failed to create branch')
                const message = createResponse.error?.message || 'Unknown error'
                reportCommandFailure({
                    format,
                    command: 'push',
                    message,
                    ci: options.ci,
                    logPretty: (m) => logger.error(m),
                })
                return
            }

            if (spinner) spinner.succeed(`Created branch: ${targetBranchId}`)
        } else {
            if (spinner) spinner.fail(`Branch ${targetBranchId} not found`)
            const message = `Branch ${targetBranchId} not found`
            reportCommandFailure({
                format,
                command: 'push',
                message,
                ci: options.ci,
                logPretty: (m) => {
                    logger.error(m)
                    logger.detail('Use --new to create a new branch')
                },
            })
            return
        }
    } else {
        if (spinner) spinner.text = `Pushing to ${targetBranchId}...`
        const updateResponse = await apiClient.updateBranch(
            targetBranchId,
            brandConfig
        )

        if (!updateResponse.success) {
            if (spinner) spinner.fail('Failed to push brand config')
            const message = updateResponse.error?.message || 'Unknown error'
            reportCommandFailure({
                format,
                command: 'push',
                message,
                ci: options.ci,
                logPretty: (m) => logger.error(m),
            })
            return
        }

        if (spinner) spinner.succeed(`Pushed to ${targetBranchId}`)
    }

    let publishedVersion: string | undefined

    if (options.publish) {
        const branchResponse = await apiClient.getBranch(targetBranchId)
        if (!branchResponse.success || !branchResponse.data) {
            const message = 'Failed to fetch branch for publishing'
            reportCommandFailure({
                format,
                command: 'push',
                message,
                ci: options.ci,
                logPretty: (m) => logger.error(m),
            })
            return
        }

        const currentVersion = branchResponse.data.latestVersion || '0.0.0'
        let newVersion: string

        if (options.major) {
            newVersion = incrementVersion(currentVersion, 'major')
        } else if (options.minor) {
            newVersion = incrementVersion(currentVersion, 'minor')
        } else if (options.patch) {
            newVersion = incrementVersion(currentVersion, 'patch')
        } else if (isCiMode(options.ci)) {
            newVersion = incrementVersion(currentVersion, 'patch')
        } else {
            const { version } = await prompts({
                type: 'text',
                name: 'version',
                message: `Current version: ${currentVersion}. New version:`,
                initial: incrementVersion(currentVersion, 'patch'),
            })

            if (!version) return
            newVersion = version
        }

        let changelog = options.changelog
        if (changelog === undefined && !isCiMode(options.ci)) {
            const { input } = await prompts({
                type: 'text',
                name: 'input',
                message: 'Changelog (optional):',
            })
            changelog = input || undefined
        } else if (changelog === undefined && isCiMode(options.ci)) {
            changelog = ''
        }

        spinner =
            format === 'pretty'
                ? ora(`Publishing version ${newVersion}...`).start()
                : null

        const publishResponse = await apiClient.publishVersion(targetBranchId, {
            branchId: targetBranchId,
            version: newVersion,
            brandConfig,
            changelog,
            parentVersion: currentVersion,
        })

        if (!publishResponse.success) {
            if (spinner) spinner.fail('Failed to publish version')
            const message = publishResponse.error?.message || 'Unknown error'
            reportCommandFailure({
                format,
                command: 'push',
                message,
                ci: options.ci,
                logPretty: (m) => logger.error(m),
            })
            return
        }

        if (spinner) spinner.succeed(`Published version ${newVersion}`)
        publishedVersion = newVersion
    }

    if (format === 'pretty') {
        logger.newline()
        logger.success('Push complete!')
        logger.newline()
    }

    reportCommandSuccess(format, 'push', {
        branchId: targetBranchId,
        published: Boolean(options.publish),
        publishedVersion: publishedVersion ?? null,
    })
}

function findOutputDir(cwd: string): string | null {
    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) return null

    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    return join(cwd, config.output || 'src/blend')
}
