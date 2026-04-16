/**
 * preview command
 *
 * Opens the Blend Studio preview in your browser.
 * Requires the Studio dev server to be running.
 *
 * Usage:
 *   blend-token-studio preview
 *   blend-token-studio preview --port 3000
 */

import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import open from 'open'
import { logger } from '../utils/logger'

interface PreviewOptions {
    port?: number
    open?: boolean
}

export async function previewCommand(
    options: PreviewOptions = {}
): Promise<void> {
    const cwd = process.cwd()
    const port = options.port || 3000

    // Check if brand.json exists
    const configPath = join(cwd, 'blend.config.json')
    if (!existsSync(configPath)) {
        logger.error(
            'blend.config.json not found. Run `blend-token-studio init` first.'
        )
        process.exit(1)
    }

    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    const brandPath = join(cwd, config.output || 'src/blend', 'brand.json')

    if (!existsSync(brandPath)) {
        logger.error(
            'brand.json not found. Run `blend-token-studio brand` first.'
        )
        process.exit(1)
    }

    const brandConfig = JSON.parse(readFileSync(brandPath, 'utf-8'))

    // Construct preview URL
    const previewUrl = `http://localhost:${port}/studio/preview/local`

    logger.header('Opening Preview')
    logger.success(`Brand: ${brandConfig.name} (${brandConfig.brandId})`)
    logger.info(`Opening ${previewUrl}...`)

    if (options.open === false) {
        logger.info(`Preview URL: ${previewUrl}`)
        return
    }

    try {
        await open(previewUrl)
        logger.success('Preview opened in browser')
    } catch (err) {
        logger.error('Failed to open browser')
        logger.info(`Please open manually: ${previewUrl}`)
        logger.info('Note: Ensure the Studio dev server is running (pnpm dev)')
    }
}
