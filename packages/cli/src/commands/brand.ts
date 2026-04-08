/**
 * brand command
 *
 * Apply a brand to the project — either from a preset, a hex color,
 * or interactive prompts.
 *
 * Usage:
 *   blend-token-studio brand                          # interactive
 *   blend-token-studio brand --preset hdfc            # preset
 *   blend-token-studio brand --primary "#E31837"      # custom color
 *   blend-token-studio brand --primary "#E31837" --radius sharp
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import prompts from 'prompts'
import ora from 'ora'
import { logger } from '../utils/logger'
import {
    resolveBrandTokens,
    generateColorScale,
    getPreset,
    listPresets,
    RADIUS_PRESETS,
    type BrandConfig,
    type RadiusPreset,
} from '@blend-design/token-engine'
import { generateBrandTokensCode } from '../generators/tokens-generator'
import type { BlendConfig } from '../generators/config-generator'

interface BrandOptions {
    preset?: string
    primary?: string
    radius?: string
}

export async function brandCommand(options: BrandOptions = {}): Promise<void> {
    const cwd = process.cwd()

    // Read blend.config.json
    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) {
        logger.error(
            'blend.config.json not found. Run `npx blend-token-studio init` first.'
        )
        return
    }

    const config: BlendConfig = JSON.parse(readFileSync(configPath, 'utf-8'))

    logger.header('Blend Token Studio — Brand')

    let brandConfig: BrandConfig

    if (options.preset) {
        // Preset mode
        const preset = getPreset(options.preset)
        if (!preset) {
            logger.error(
                `Unknown preset "${options.preset}". Available: ${listPresets()
                    .map((p) => p.name)
                    .join(', ')}`
            )
            return
        }
        brandConfig = { ...preset }
        logger.success(`Using preset: ${brandConfig.name}`)
    } else if (options.primary) {
        // Custom color mode
        const scale = generateColorScale(options.primary)
        const radiusPreset = (options.radius as RadiusPreset) || 'default'
        const radiusOverrides = RADIUS_PRESETS[radiusPreset] ?? {}

        brandConfig = {
            brandId: 'custom/brand',
            name: 'Custom Brand',
            version: '1.0.0',
            colors: { primary: scale },
            radius:
                Object.keys(radiusOverrides).length > 0
                    ? radiusOverrides
                    : undefined,
        }
        logger.success(`Custom brand from ${options.primary}`)
    } else {
        // Interactive mode
        const result = await runInteractivePrompt()
        if (!result) return
        brandConfig = result
    }

    // Resolve tokens
    const spinner = ora('Resolving tokens for all V2 components...').start()

    const lightTokens = resolveBrandTokens(brandConfig, 'light')
    const darkTokens = resolveBrandTokens(brandConfig, 'dark')

    spinner.succeed('Tokens resolved')

    // Write files
    const outputDir = join(cwd, config.output)

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

    // Update blend.config.json
    config.brand = brandConfig.brandId
    writeFileSync(configPath, JSON.stringify(config, null, 4) + '\n')

    logger.newline()
    logger.success(`Brand "${brandConfig.name}" applied!`)
    logger.detail(`Commit ${config.output}/brand.json to version control.`)
    logger.newline()
}

// ---------------------------------------------------------------------------
// Interactive prompt
// ---------------------------------------------------------------------------

async function runInteractivePrompt(): Promise<BrandConfig | null> {
    const presets = listPresets()

    const { choice } = await prompts({
        type: 'select',
        name: 'choice',
        message: 'Choose a brand preset or customize:',
        choices: [
            ...presets.map((p) => ({
                title: p.displayName,
                value: p.name,
                description: p.brandId,
            })),
            { title: 'Custom (enter hex color)', value: 'custom' },
        ],
    })

    if (!choice) return null

    if (choice !== 'custom') {
        return getPreset(choice) ?? null
    }

    // Custom flow
    const { primary } = await prompts({
        type: 'text',
        name: 'primary',
        message: 'Primary brand color (hex):',
        initial: '#2B7FFF',
        validate: (v: string) =>
            /^#[0-9A-Fa-f]{6}$/.test(v) ||
            'Enter a valid hex color (e.g. #E31837)',
    })

    if (!primary) return null

    const { radius } = await prompts({
        type: 'select',
        name: 'radius',
        message: 'Border radius style:',
        choices: [
            { title: 'Default (10px)', value: 'default' },
            { title: 'Sharp (4px)', value: 'sharp' },
            { title: 'Rounded (20px)', value: 'rounded' },
            { title: 'Pill (full)', value: 'pill' },
        ],
    })

    if (!radius) return null

    const { name } = await prompts({
        type: 'text',
        name: 'name',
        message: 'Brand name:',
        initial: 'My Brand',
    })

    const scale = generateColorScale(primary)
    const radiusOverrides = RADIUS_PRESETS[radius as RadiusPreset] ?? {}

    return {
        brandId: `custom/${name?.toLowerCase().replace(/\s+/g, '-') ?? 'brand'}`,
        name: name ?? 'My Brand',
        version: '1.0.0',
        colors: { primary: scale },
        radius:
            Object.keys(radiusOverrides).length > 0
                ? radiusOverrides
                : undefined,
    }
}
