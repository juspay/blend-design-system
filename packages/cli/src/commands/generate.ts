/**
 * generate command
 *
 * Offline token generation — takes a local brand.json file
 * and produces the tokens.ts output without connecting to the API.
 *
 * Usage:
 *   blend-token-studio generate ./my-brand.json --output ./src/blend
 */

import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import ora from 'ora'
import { logger } from '../utils/logger'
import {
    resolveBrandTokens,
    validateBrandConfig,
    type BrandConfig,
} from '@blend-design/token-engine'
import { generateBrandTokensCode } from '../generators/tokens-generator'

interface GenerateOptions {
    output?: string
}

export async function generateCommand(
    inputPath: string,
    options: GenerateOptions = {}
): Promise<void> {
    const cwd = process.cwd()
    const fullPath = resolve(cwd, inputPath)

    logger.header('Blend Token Studio — Generate')

    // 1. Read input file
    if (!existsSync(fullPath)) {
        logger.error(`File not found: ${inputPath}`)
        return
    }

    let brandConfig: BrandConfig
    try {
        brandConfig = JSON.parse(readFileSync(fullPath, 'utf-8'))
    } catch {
        logger.error(`Failed to parse ${inputPath} as JSON.`)
        return
    }

    // 2. Validate
    const validation = validateBrandConfig(brandConfig)
    if (!validation.valid) {
        logger.error('Invalid brand config:')
        for (const err of validation.errors) {
            logger.detail(`${err.path}: ${err.message}`)
        }
        return
    }

    logger.success(`Brand: ${brandConfig.name} (${brandConfig.brandId})`)

    // 3. Resolve
    const spinner = ora('Resolving tokens...').start()

    const lightTokens = resolveBrandTokens(brandConfig, 'light')
    const darkTokens = resolveBrandTokens(brandConfig, 'dark')

    spinner.succeed('Tokens resolved')

    // 4. Write output
    const outputDir = resolve(cwd, options.output ?? 'src/blend')
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
    logger.fileWritten(tokensPath)

    const brandPath = join(outputDir, 'brand.json')
    writeFileSync(brandPath, JSON.stringify(brandConfig, null, 4) + '\n')
    logger.fileWritten(brandPath)

    logger.newline()
    logger.success('Done!')
    logger.newline()
}
