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
import { apiClient } from '../utils/api-client'
import type { BrandConfig } from '@blend-design/token-engine'
import {
    validateBrandConfig,
    incrementVersion,
} from '@blend-design/token-engine/server'

interface PushOptions {
    publish?: boolean
    major?: boolean
    minor?: boolean
    patch?: boolean
    changelog?: string
    new?: boolean
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
    const cwd = process.cwd()

    if (!apiClient.isAuthenticated()) {
        logger.error(
            'Not authenticated. Run `npx blend-token-studio login` first.'
        )
        return
    }

    const outputDir = findOutputDir(cwd)
    if (!outputDir) {
        logger.error(
            'blend.config.json not found. Run `npx blend-token-studio init` first.'
        )
        return
    }

    const brandPath = join(outputDir, 'brand.json')
    if (!existsSync(brandPath)) {
        logger.error(
            'brand.json not found. Run `npx blend-token-studio brand` first.'
        )
        return
    }

    const brandConfig: BrandConfig = JSON.parse(
        readFileSync(brandPath, 'utf-8')
    )

    const validation = validateBrandConfig(brandConfig)
    if (!validation.valid) {
        logger.error('Brand config validation failed:')
        validation.errors.forEach((e) =>
            logger.error(`  ${e.path}: ${e.message}`)
        )
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
        logger.error(
            'No branch ID specified. Provide a branch ID or run `pull` first.'
        )
        return
    }

    logger.header('Blend Token Studio — Push')

    let spinner = ora(`Checking branch ${targetBranchId}...`).start()

    const existingResponse = await apiClient.getBranch(targetBranchId)

    if (!existingResponse.success) {
        if (options.new) {
            spinner.text = `Creating branch ${targetBranchId}...`
            const createResponse = await apiClient.createBranch({
                brandId: brandConfig.brandId,
                name: brandConfig.name,
                brandConfig,
            })

            if (!createResponse.success) {
                spinner.fail('Failed to create branch')
                logger.error(createResponse.error?.message || 'Unknown error')
                return
            }

            spinner.succeed(`Created branch: ${targetBranchId}`)
        } else {
            spinner.fail(`Branch ${targetBranchId} not found`)
            logger.detail('Use --new to create a new branch')
            return
        }
    } else {
        spinner.text = `Pushing to ${targetBranchId}...`
        const updateResponse = await apiClient.updateBranch(
            targetBranchId,
            brandConfig
        )

        if (!updateResponse.success) {
            spinner.fail('Failed to push brand config')
            logger.error(updateResponse.error?.message || 'Unknown error')
            return
        }

        spinner.succeed(`Pushed to ${targetBranchId}`)
    }

    if (options.publish) {
        const branchResponse = await apiClient.getBranch(targetBranchId)
        if (!branchResponse.success || !branchResponse.data) {
            logger.error('Failed to fetch branch for publishing')
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
        if (!changelog) {
            const { input } = await prompts({
                type: 'text',
                name: 'input',
                message: 'Changelog (optional):',
            })
            changelog = input || undefined
        }

        spinner = ora(`Publishing version ${newVersion}...`).start()

        const publishResponse = await apiClient.publishVersion(targetBranchId, {
            branchId: targetBranchId,
            version: newVersion,
            brandConfig,
            changelog,
            parentVersion: currentVersion,
        })

        if (!publishResponse.success) {
            spinner.fail('Failed to publish version')
            logger.error(publishResponse.error?.message || 'Unknown error')
            return
        }

        spinner.succeed(`Published version ${newVersion}`)
    }

    logger.newline()
    logger.success('Push complete!')
    logger.newline()
}

function findOutputDir(cwd: string): string | null {
    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) return null

    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    return join(cwd, config.output || 'src/blend')
}
