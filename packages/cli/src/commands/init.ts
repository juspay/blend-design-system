/**
 * init command
 *
 * Scaffolds a Blend Token Studio project:
 * 1. Detects project type (Next.js / Vite / CRA)
 * 2. Checks & installs missing dependencies
 * 3. Creates blend.config.json with schema reference
 * 4. Creates src/blend/provider.tsx
 * 5. Creates src/blend/tokens.ts
 *
 * Inspired by `npx shadcn@latest init` — one command, zero config.
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import prompts, { type PromptObject } from 'prompts'
import { logger } from '../utils/logger'
import { detectProject, getInstallCommand } from '../utils/detect-project'
import { generateProviderCode } from '../generators/provider-generator'
import { generateDefaultTokensCode } from '../generators/tokens-generator'
import {
    generateConfig,
    generateConfigCode,
    type BlendConfig,
    type GenerateConfigOptions,
} from '../generators/config-generator'
import {
    DEFAULT_STUDIO_DEPLOYMENT,
    type BlendStudioDeployment,
    parseEnvFlag,
} from '../constants/studio'

interface InitOptions {
    defaults?: boolean
    force?: boolean
    output?: string
    theme?: 'light' | 'dark'
    /** CLI: --env staging | prod | production */
    env?: string
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

    // 2. Check for existing config
    const configPath = join(cwd, 'blend.config.json')
    if (existsSync(configPath) && !options.force) {
        logger.warn(
            'blend.config.json already exists. Use --force to overwrite.'
        )
        return
    }

    // 3. Studio deployment: --env wins; else prompt (interactive); else default staging
    let deployment: BlendStudioDeployment = DEFAULT_STUDIO_DEPLOYMENT
    if (options.env) {
        const parsed = parseEnvFlag(options.env)
        if (!parsed) {
            logger.error('Invalid --env. Use staging, prod, or production.')
            return
        }
        deployment = parsed
    }

    // 4. Interactive config (unless --defaults)
    const configOptions: GenerateConfigOptions = {
        output: options.output,
        theme: options.theme,
    }

    if (!options.defaults) {
        const promptsList: PromptObject[] = [
            {
                type: 'text',
                name: 'output',
                message: 'Output directory:',
                initial: 'src/blend',
            },
        ]

        if (!options.env) {
            promptsList.push({
                type: 'select',
                name: 'studioDeployment',
                message: 'Blend Studio environment:',
                choices: [
                    {
                        title: 'Staging (recommended for testing)',
                        value: 'staging',
                    },
                    {
                        title: 'Production (when API is live)',
                        value: 'production',
                    },
                ],
                initial: 0,
            })
        }

        promptsList.push(
            {
                type: 'select',
                name: 'theme',
                message: 'Default theme:',
                choices: [
                    { title: 'Light', value: 'light' },
                    { title: 'Dark', value: 'dark' },
                ],
                initial: 0,
            },
            {
                type: 'confirm',
                name: 'cssVariables',
                message: 'Generate CSS variables file?',
                initial: false,
            }
        )

        const answers = await prompts(promptsList)

        if (!options.env && answers.studioDeployment) {
            deployment = answers.studioDeployment as BlendStudioDeployment
        }
        if (answers.output) configOptions.output = answers.output
        if (answers.theme) configOptions.theme = answers.theme
        if (answers.cssVariables) {
            configOptions.generate = {
                typescript: true,
                cssVariables: true,
                reactNative: false,
            }
        }
    }

    configOptions.deployment = deployment

    // 5. Check & install dependencies
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

    // 6. Create blend.config.json
    const config = generateConfig(configOptions)
    writeFileSync(configPath, generateConfigCode(config))
    logger.fileWritten('blend.config.json')
    logger.detail(`Studio deployment: ${deployment} → ${config.studio?.apiUrl}`)

    // 7. Create output directory
    const outputDir = join(cwd, config.output)
    mkdirSync(outputDir, { recursive: true })

    // 8. Generate provider.tsx
    const providerPath = join(outputDir, 'provider.tsx')
    if (!existsSync(providerPath) || options.force) {
        const isNextJs = project.type === 'nextjs'
        writeFileSync(providerPath, generateProviderCode(isNextJs))
        logger.fileWritten(`${config.output}/provider.tsx`)
    } else {
        logger.fileSkipped(`${config.output}/provider.tsx`)
    }

    // 9. Generate tokens.ts (default — empty, Blend defaults)
    const tokensPath = join(outputDir, 'tokens.ts')
    writeFileSync(tokensPath, generateDefaultTokensCode())
    logger.fileWritten(`${config.output}/tokens.ts`)

    // 10. Generate CSS variables if requested
    if (config.generate?.cssVariables) {
        const cssPath = join(outputDir, 'tokens.css')
        writeFileSync(cssPath, generateDefaultCssVariables())
        logger.fileWritten(`${config.output}/tokens.css`)
    }

    // 11. Create .gitignore entry suggestion
    const gitignorePath = join(cwd, '.gitignore')
    if (existsSync(gitignorePath)) {
        const gitignore = readFileSync(gitignorePath, 'utf-8')
        if (!gitignore.includes('.blend-token-studio')) {
            logger.newline()
            logger.info('Consider adding to .gitignore:')
            logger.detail('.blend-token-studio/')
        }
    }

    // 12. Print next steps
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
    console.log('     Or use a preset:')
    logger.newline()
    console.log('     npx blend-token-studio brand --preset hdfc')
    logger.newline()

    if (config.studio?.apiUrl) {
        console.log('  3. Connect to Blend Token Studio:')
        logger.newline()
        console.log('     npx blend-token-studio login')
        console.log('     npx blend-token-studio pull hdfc/retail')
        logger.newline()
    }
}

function generateDefaultCssVariables(): string {
    return `/**
 * Blend Design System CSS Variables
 * Auto-generated by Blend Token Studio
 *
 * Usage: Import this file in your global CSS or JS entry point.
 * The tokens.ts file is the primary source — this is for non-JS contexts.
 */

:root {
  /* Colors - Primary */
  --color-primary-50: #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #2B7FFF;
  --color-primary-600: #0561E2;
  --color-primary-700: #004DB8;
  --color-primary-800: #003D94;
  --color-primary-900: #00327A;
  --color-primary-950: #001F52;

  /* Border Radius */
  --radius-6: 6px;
  --radius-8: 8px;
  --radius-10: 10px;
  --radius-12: 12px;
  --radius-16: 16px;
  --radius-20: 20px;
}

[data-theme="dark"] {
  /* Dark theme overrides go here */
}
`
}
