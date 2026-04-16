/**
 * validate command
 *
 * Validate the current brand.json for correctness.
 *
 * Usage:
 *   blend-token-studio validate
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import pc from 'picocolors'
import { logger } from '../utils/logger'
import { validateBrandConfig } from '@blend-design/token-engine/server'

export async function validateCommand(): Promise<void> {
    const cwd = process.cwd()

    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) {
        logger.error(
            'blend.config.json not found. Run `npx blend-token-studio init` first.'
        )
        return
    }

    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    const brandPath = join(cwd, config.output, 'brand.json')

    if (!existsSync(brandPath)) {
        logger.info('No brand.json found — nothing to validate.')
        return
    }

    logger.header('Validate brand.json')

    let brandConfig: unknown
    try {
        brandConfig = JSON.parse(readFileSync(brandPath, 'utf-8'))
    } catch {
        logger.error('brand.json is not valid JSON.')
        return
    }

    const result = validateBrandConfig(brandConfig)

    if (result.errors.length > 0) {
        logger.newline()
        for (const error of result.errors) {
            const path = error.path ? pc.bold(error.path) + ': ' : ''
            console.log(`  ${pc.red('✗')} ${path}${error.message}`)
        }
    }

    if (result.warnings.length > 0) {
        logger.newline()
        for (const warning of result.warnings) {
            const path = warning.path ? pc.bold(warning.path) + ': ' : ''
            console.log(`  ${pc.yellow('!')} ${path}${warning.message}`)
        }
    }

    logger.newline()

    if (result.valid) {
        logger.success(
            `brand.json is valid. ${result.warnings.length} warning${result.warnings.length === 1 ? '' : 's'}.`
        )
    } else {
        logger.error(
            `brand.json has ${result.errors.length} error${result.errors.length === 1 ? '' : 's'}.`
        )
    }

    logger.newline()
}
