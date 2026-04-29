/**
 * diff command
 *
 * Show what the current brand config overrides from Blend defaults.
 *
 * Usage:
 *   blend-studio diff
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import pc from 'picocolors'
import { logger } from '../utils/logger'
import type { BrandConfig } from '@juspay/blend-design-system/tokens/server'
import {
    diffBrandConfigs,
    PRESET_BLEND_DEFAULT,
} from '@juspay/blend-design-system/tokens/server'

export async function diffCommand(): Promise<void> {
    const cwd = process.cwd()

    // Find brand.json
    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) {
        logger.error(
            'blend.config.json not found. Run `npx blend-studio init` first.'
        )
        return
    }

    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    const brandPath = join(cwd, config.output, 'brand.json')

    if (!existsSync(brandPath)) {
        logger.info(
            'No brand.json found — using Blend defaults (no overrides).'
        )
        return
    }

    const brandConfig: BrandConfig = JSON.parse(
        readFileSync(brandPath, 'utf-8')
    )

    logger.header(`Diff: ${brandConfig.name} vs Blend Defaults`)

    const diffs = diffBrandConfigs(PRESET_BLEND_DEFAULT, brandConfig)

    if (diffs.length === 0) {
        logger.success('No overrides — using Blend defaults.')
        return
    }

    logger.newline()

    for (const diff of diffs) {
        const path = pc.bold(diff.path.padEnd(28))
        const oldVal = pc.red(diff.oldValue.padEnd(16))
        const newVal = pc.green(diff.newValue)
        console.log(`  ${path} ${oldVal} → ${newVal}`)
    }

    logger.newline()
    logger.info(
        `${diffs.length} override${diffs.length === 1 ? '' : 's'} from Blend defaults.`
    )
    logger.newline()
}
