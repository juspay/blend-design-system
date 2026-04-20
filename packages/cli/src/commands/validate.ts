/**
 * validate command
 *
 * Validate the current brand.json for correctness.
 *
 * Usage:
 *   blend-token-studio validate
 *   blend-token-studio validate --format json --ci
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import pc from 'picocolors'
import { logger } from '../utils/logger'
import {
    isCiMode,
    parseCliFormat,
    printJsonEnvelope,
    reportCommandFailure,
} from '../utils/cli-output'
import { validateBrandConfig } from '@blend-design/token-engine/server'

interface ValidateOptions {
    format?: string
    json?: boolean
    ci?: boolean
}

export async function validateCommand(
    options: ValidateOptions = {}
): Promise<void> {
    const format = parseCliFormat(options)
    const cwd = process.cwd()

    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) {
        const message =
            'blend.config.json not found. Run `npx blend-token-studio init` first.'
        reportCommandFailure({
            format,
            command: 'validate',
            message,
            ci: options.ci,
            logPretty: (m) => logger.error(m),
        })
        process.exitCode = 1
        return
    }

    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    const brandPath = join(cwd, config.output, 'brand.json')

    if (!existsSync(brandPath)) {
        if (format === 'pretty') {
            logger.info('No brand.json found — nothing to validate.')
        }
        if (format === 'json') {
            printJsonEnvelope({
                success: true,
                command: 'validate',
                data: {
                    valid: true,
                    skipped: true,
                    errors: [],
                    warnings: [],
                },
            })
        }
        return
    }

    if (format === 'pretty') {
        logger.header('Validate brand.json')
    }

    let brandConfig: unknown
    try {
        brandConfig = JSON.parse(readFileSync(brandPath, 'utf-8'))
    } catch {
        const message = 'brand.json is not valid JSON.'
        reportCommandFailure({
            format,
            command: 'validate',
            message,
            ci: options.ci,
            logPretty: (m) => logger.error(m),
        })
        process.exitCode = 1
        return
    }

    const result = validateBrandConfig(brandConfig)

    if (format === 'pretty' && result.errors.length > 0) {
        logger.newline()
        for (const error of result.errors) {
            const path = error.path ? pc.bold(error.path) + ': ' : ''
            console.log(`  ${pc.red('✗')} ${path}${error.message}`)
        }
    }

    if (format === 'pretty' && result.warnings.length > 0) {
        logger.newline()
        for (const warning of result.warnings) {
            const path = warning.path ? pc.bold(warning.path) + ': ' : ''
            console.log(`  ${pc.yellow('!')} ${path}${warning.message}`)
        }
    }

    if (format === 'pretty') {
        logger.newline()
    }

    if (format === 'json') {
        printJsonEnvelope({
            success: result.valid,
            command: 'validate',
            data: {
                valid: result.valid,
                errors: result.errors,
                warnings: result.warnings,
            },
            ...(result.valid
                ? {}
                : {
                      error: {
                          message: 'brand.json validation failed',
                      },
                  }),
        })
    }

    if (format === 'pretty') {
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

    if (!result.valid) {
        process.exitCode = 1
        if (isCiMode(options.ci)) {
            throw new Error('brand.json validation failed')
        }
    }
}
