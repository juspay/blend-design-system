/**
 * pull command
 *
 * Fetch a brand config from Blend Token Studio and generate local tokens.
 *
 * Usage:
 *   blend-studio pull hdfc/retail              # latest version
 *   blend-studio pull hdfc/retail --version 1.2.0
 *   blend-studio pull hdfc/retail --theme dark
 *
 * If blend.config.json is missing, a minimal file is created (not in --ci; use --skip-init to require an existing file).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import ora from 'ora'
import { logger } from '../utils/logger'
import { resolveStudioApiUrl } from '../constants/studio'
import {
    parseCliFormat,
    reportCommandFailure,
    reportCommandSuccess,
} from '../utils/cli-output'
import { apiClient, syncApiClientToProject } from '../utils/api-client'
import type { BrandConfig } from '@juspay/blend-design-system/tokens/server'
import { generateBrandTokensCode } from '../generators/tokens-generator'
import { generateBrandTokensRescriptCode } from '../generators/tokens-rescript-generator'
import {
    generateConfig,
    generateConfigCode,
    type BlendConfig,
} from '../generators/config-generator'
import type { GenerateLanguage } from './generate'

interface PullOptions {
    version?: string
    theme?: 'light' | 'dark'
    output?: string
    ci?: boolean
    format?: 'pretty' | 'json'
    skipInit?: boolean
    language?: string
}

export async function pullCommand(
    branchId: string,
    options: PullOptions = {}
): Promise<void> {
    const cwd = process.cwd()
    syncApiClientToProject(cwd)
    const format = parseCliFormat(options)

    const configPath = join(cwd, 'blend.config.json')
    const allowAutoInit = !options.skipInit && !options.ci

    if (!existsSync(configPath)) {
        if (!allowAutoInit) {
            const message = options.ci
                ? 'blend.config.json not found. Add one to the repo or run init before pull in CI.'
                : 'blend.config.json not found. Run `npx blend-studio init` first, or omit --skip-init to create a minimal config.'
            reportCommandFailure({
                format,
                command: 'pull',
                message,
                ci: options.ci,
                logPretty: (m) => logger.error(m),
            })
            return
        }

        const defaultConfig = generateConfig({
            brand: branchId,
            theme: options.theme ?? 'light',
        })
        writeFileSync(configPath, generateConfigCode(defaultConfig))
        if (format === 'pretty') {
            logger.info(
                'Created blend.config.json with defaults for this pull. Run `init` for a full scaffold (provider, deps) if you need it.'
            )
        }
    }

    const config: BlendConfig = JSON.parse(readFileSync(configPath, 'utf-8'))

    if (!apiClient.isAuthenticated()) {
        const message = 'Not authenticated. Run `npx blend-studio login` first.'
        reportCommandFailure({
            format,
            command: 'pull',
            message,
            ci: options.ci,
            logPretty: (m) => {
                logger.error(m)
                logger.detail(
                    'Or set BLEND_STUDIO_API_TOKEN environment variable.'
                )
            },
        })
        return
    }

    if (format === 'pretty') {
        logger.header('Blend Token Studio — Pull')
    }

    const spinner =
        format === 'pretty'
            ? ora(`Fetching branch ${branchId}...`).start()
            : null

    const response = await apiClient.pullBranch(branchId, options.version)

    if (!response.success || !response.data) {
        const message = response.error?.message || 'Unknown error'
        const authIssue =
            response.error?.code === 'UNAUTHORIZED' ||
            /token not found|not authenticated|unauthorized|expired|sign in again/i.test(
                message
            )
        if (spinner) {
            spinner.fail('Failed to fetch branch')
        }
        reportCommandFailure({
            format,
            command: 'pull',
            message,
            ci: options.ci,
            logPretty: (m) => {
                logger.error(m)
                if (authIssue) {
                    logger.detail(
                        'Session expired or token missing. Run `npx blend-studio login` again.'
                    )
                    logger.detail(
                        'Or set BLEND_STUDIO_API_TOKEN for non-interactive flows.'
                    )
                }
            },
        })
        return
    }

    const { branch, version, brandConfig } = response.data

    if (spinner) {
        spinner.succeed(
            `Fetched: ${branch.name}${version ? ` v${version.version}` : ' (latest)'}`
        )
    }

    const resolveSpinner =
        format === 'pretty'
            ? ora('Resolving tokens for all V2 components...').start()
            : null

    const { resolveBrandTokens } =
        await import('@juspay/blend-design-system/tokens')
    const lightTokens = resolveBrandTokens(brandConfig, 'light')
    const darkTokens = resolveBrandTokens(brandConfig, 'dark')

    if (resolveSpinner) {
        resolveSpinner.succeed('Tokens resolved')
    }

    const outputDir = join(cwd, options.output || config.output)
    mkdirSync(outputDir, { recursive: true })

    // Determine output language
    const langRaw = (options.language ?? 'typescript').toLowerCase()
    const isRescript = langRaw === 'rescript' || langRaw === 're'

    let tokensPath: string
    if (isRescript) {
        tokensPath = join(outputDir, 'BlendTokens.res')
        writeFileSync(
            tokensPath,
            generateBrandTokensRescriptCode(
                brandConfig,
                lightTokens as unknown as Record<string, unknown>,
                darkTokens as unknown as Record<string, unknown>
            )
        )
    } else {
        tokensPath = join(outputDir, 'tokens.ts')
        writeFileSync(
            tokensPath,
            generateBrandTokensCode(
                brandConfig,
                lightTokens as unknown as Record<string, unknown>,
                darkTokens as unknown as Record<string, unknown>
            )
        )
    }
    if (format === 'pretty') {
        const relPath = isRescript
            ? `${config.output}/BlendTokens.res`
            : `${config.output}/tokens.ts`
        logger.fileWritten(relPath)
    }

    const brandPath = join(outputDir, 'brand.json')
    writeFileSync(brandPath, JSON.stringify(brandConfig, null, 4) + '\n')
    if (format === 'pretty') {
        logger.fileWritten(`${config.output}/brand.json`)
    }

    const studioMeta = {
        branchId: branch.id,
        branchName: branch.name,
        version: version?.version || null,
        pulledAt: new Date().toISOString(),
        apiUrl: resolveStudioApiUrl(config.studio?.apiUrl),
    }

    const studioMetaPath = join(outputDir, 'studio.json')
    writeFileSync(studioMetaPath, JSON.stringify(studioMeta, null, 4) + '\n')
    if (format === 'pretty') {
        logger.fileWritten(`${config.output}/studio.json`)
    }

    config.brand = branchId
    writeFileSync(configPath, JSON.stringify(config, null, 4) + '\n')

    if (format === 'pretty') {
        logger.newline()
        logger.success(`Brand "${branch.name}" pulled successfully!`)
        if (version) {
            logger.detail(`Version: ${version.version}`)
        }
        logger.detail(`Commit ${config.output}/brand.json to version control.`)
        logger.newline()
    }

    reportCommandSuccess(format, 'pull', {
        branchId: branch.id,
        branchName: branch.name,
        version: version?.version ?? null,
        outputDir,
        files: [tokensPath, brandPath, studioMetaPath],
    })
}
