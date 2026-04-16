/**
 * pull command
 *
 * Fetch a brand config from Blend Token Studio and generate local tokens.
 *
 * Usage:
 *   blend-token-studio pull hdfc/retail              # latest version
 *   blend-token-studio pull hdfc/retail --version 1.2.0
 *   blend-token-studio pull hdfc/retail --theme dark
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import ora from 'ora'
import { logger } from '../utils/logger'
import { apiClient } from '../utils/api-client'
import type { BrandConfig } from '@blend-design/token-engine'
import { generateBrandTokensCode } from '../generators/tokens-generator'
import type { BlendConfig } from '../generators/config-generator'

interface PullOptions {
    version?: string
    theme?: 'light' | 'dark'
    output?: string
}

export async function pullCommand(
    branchId: string,
    options: PullOptions = {}
): Promise<void> {
    const cwd = process.cwd()

    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) {
        logger.error(
            'blend.config.json not found. Run `npx blend-token-studio init` first.'
        )
        return
    }

    const config: BlendConfig = JSON.parse(readFileSync(configPath, 'utf-8'))

    if (!apiClient.isAuthenticated()) {
        logger.error(
            'Not authenticated. Run `npx blend-token-studio login` first.'
        )
        logger.detail('Or set BLEND_STUDIO_API_TOKEN environment variable.')
        return
    }

    logger.header('Blend Token Studio — Pull')

    const spinner = ora(`Fetching branch ${branchId}...`).start()

    const response = await apiClient.pullBranch(branchId, options.version)

    if (!response.success || !response.data) {
        spinner.fail('Failed to fetch branch')
        logger.error(response.error?.message || 'Unknown error')
        return
    }

    const { branch, version, brandConfig } = response.data

    spinner.succeed(
        `Fetched: ${branch.name}${version ? ` v${version.version}` : ' (latest)'}`
    )

    const resolveSpinner = ora(
        'Resolving tokens for all V2 components...'
    ).start()

    const { resolveBrandTokens } = await import('@blend-design/token-engine')
    const lightTokens = resolveBrandTokens(brandConfig, 'light')
    const darkTokens = resolveBrandTokens(brandConfig, 'dark')

    resolveSpinner.succeed('Tokens resolved')

    const outputDir = join(cwd, options.output || config.output)
    mkdirSync(outputDir, { recursive: true })

    const tokensPath = join(outputDir, 'tokens.ts')
    writeFileSync(
        tokensPath,
        generateBrandTokensCode(
            brandConfig,
            lightTokens as unknown as Record<string, unknown>,
            darkTokens as unknown as Record<string, unknown>
        )
    )
    logger.fileWritten(`${config.output}/tokens.ts`)

    const brandPath = join(outputDir, 'brand.json')
    writeFileSync(brandPath, JSON.stringify(brandConfig, null, 4) + '\n')
    logger.fileWritten(`${config.output}/brand.json`)

    const studioMeta = {
        branchId: branch.id,
        branchName: branch.name,
        version: version?.version || null,
        pulledAt: new Date().toISOString(),
        apiUrl:
            process.env.BLEND_STUDIO_API_URL ||
            'https://studio.blend.juspay.design',
    }

    const studioMetaPath = join(outputDir, 'studio.json')
    writeFileSync(studioMetaPath, JSON.stringify(studioMeta, null, 4) + '\n')
    logger.fileWritten(`${config.output}/studio.json`)

    config.brand = branchId
    writeFileSync(configPath, JSON.stringify(config, null, 4) + '\n')

    logger.newline()
    logger.success(`Brand "${branch.name}" pulled successfully!`)
    if (version) {
        logger.detail(`Version: ${version.version}`)
    }
    logger.detail(`Commit ${config.output}/brand.json to version control.`)
    logger.newline()
}
