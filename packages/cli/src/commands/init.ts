/**
 * init command
 *
 * Scaffolds a Blend Token Studio project:
 * 1. Detects project type (Next.js / Vite / CRA)
 * 2. Checks & installs missing dependencies
 * 3. Creates blend.config.json
 * 4. Creates src/blend/provider.tsx
 * 5. Creates src/blend/tokens.ts
 *
 * Inspired by `npx shadcn@latest init` — one command, zero config.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { logger } from '../utils/logger'
import { detectProject, getInstallCommand } from '../utils/detect-project'
import { generateProviderCode } from '../generators/provider-generator'
import { generateDefaultTokensCode } from '../generators/tokens-generator'
import {
    generateConfig,
    generateConfigCode,
} from '../generators/config-generator'

interface InitOptions {
    defaults?: boolean
    force?: boolean
}

export async function initCommand(options: InitOptions = {}): Promise<void> {
    const cwd = process.cwd()

    logger.header('Blend Token Studio — Init')

    // 1. Detect project
    const project = detectProject(cwd)
    logger.success(`Detected: ${project.type} (${project.packageManager})`)

    if (project.typescript) {
        logger.detail('TypeScript enabled')
    }

    // 2. Check for blend.config.json
    const configPath = join(cwd, 'blend.config.json')
    if (existsSync(configPath) && !options.force) {
        logger.warn(
            'blend.config.json already exists. Use --force to overwrite.'
        )
        return
    }

    // 3. Check & install dependencies
    const missingDeps: string[] = []
    if (!project.hasBlend) missingDeps.push('@juspay/blend-design-system')
    if (!project.hasStyledComponents) missingDeps.push('styled-components')

    if (missingDeps.length > 0) {
        const installCmd = getInstallCommand(
            project.packageManager,
            missingDeps
        )
        logger.info(`Installing: ${missingDeps.join(', ')}`)
        logger.detail(installCmd)

        try {
            execSync(installCmd, { cwd, stdio: 'pipe' })
            logger.success('Dependencies installed')
        } catch {
            logger.error(
                `Failed to install dependencies. Run manually:\n  ${installCmd}`
            )
            return
        }
    } else {
        logger.success('Dependencies already installed')
    }

    // 4. Create blend.config.json
    const config = generateConfig()
    writeFileSync(configPath, generateConfigCode(config))
    logger.fileWritten('blend.config.json')

    // 5. Create output directory
    const outputDir = join(cwd, config.output)
    mkdirSync(outputDir, { recursive: true })

    // 6. Generate provider.tsx
    const providerPath = join(outputDir, 'provider.tsx')
    if (!existsSync(providerPath) || options.force) {
        const isNextJs = project.type === 'nextjs'
        writeFileSync(providerPath, generateProviderCode(isNextJs))
        logger.fileWritten(`${config.output}/provider.tsx`)
    } else {
        logger.fileSkipped(`${config.output}/provider.tsx`)
    }

    // 7. Generate tokens.ts (default — empty, Blend defaults)
    const tokensPath = join(outputDir, 'tokens.ts')
    writeFileSync(tokensPath, generateDefaultTokensCode())
    logger.fileWritten(`${config.output}/tokens.ts`)

    // 8. Print next steps
    logger.newline()
    logger.header('Next steps')
    logger.newline()
    console.log('  1. Wrap your app with BlendProvider:')
    logger.newline()
    console.log(
        `     import { BlendProvider } from './${config.output.replace('src/', '')}/provider'`
    )
    logger.newline()
    console.log('     <BlendProvider>')
    console.log('         <App />')
    console.log('     </BlendProvider>')
    logger.newline()
    console.log('  2. Apply a brand:')
    logger.newline()
    console.log('     npx blend-token-studio brand')
    logger.newline()
}
