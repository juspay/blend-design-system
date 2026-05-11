/**
 * Project Detection
 *
 * Detects the project type, framework, and package manager
 * by inspecting package.json and filesystem.
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface ProjectInfo {
    /** Project type: nextjs, vite, cra, rescript, unknown */
    type: 'nextjs' | 'vite' | 'cra' | 'rescript' | 'unknown'

    /** Package manager: pnpm, yarn, npm */
    packageManager: 'pnpm' | 'yarn' | 'npm'

    /** Whether TypeScript is used */
    typescript: boolean

    /** Whether ReScript is used */
    rescript: boolean

    /** Whether blend is already installed */
    hasBlend: boolean

    /** Whether styled-components is installed */
    hasStyledComponents: boolean

    /** Source directory (src/ or app/) */
    srcDir: string
}

export function detectProject(cwd: string): ProjectInfo {
    const pkgPath = join(cwd, 'package.json')

    if (!existsSync(pkgPath)) {
        return {
            type: 'unknown',
            packageManager: 'npm',
            typescript: false,
            rescript: false,
            hasBlend: false,
            hasStyledComponents: false,
            srcDir: 'src',
        }
    }

    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

    // Detect ReScript (check for bsconfig.json or rescript.json or rescript dep)
    const hasRescript =
        existsSync(join(cwd, 'rescript.json')) ||
        existsSync(join(cwd, 'bsconfig.json')) ||
        !!allDeps['rescript'] ||
        !!allDeps['@rescript/core']

    // Detect framework
    let type: ProjectInfo['type'] = 'unknown'
    if (hasRescript) type = 'rescript'
    else if (allDeps['next']) type = 'nextjs'
    else if (allDeps['vite']) type = 'vite'
    else if (allDeps['react-scripts']) type = 'cra'

    // Detect package manager
    let packageManager: ProjectInfo['packageManager'] = 'npm'
    if (existsSync(join(cwd, 'pnpm-lock.yaml'))) packageManager = 'pnpm'
    else if (existsSync(join(cwd, 'yarn.lock'))) packageManager = 'yarn'

    // Detect TypeScript
    const typescript = existsSync(join(cwd, 'tsconfig.json'))

    // Detect existing dependencies
    const hasBlend = !!allDeps['@juspay/blend-design-system']
    const hasStyledComponents = !!allDeps['styled-components']

    // Detect source directory
    let srcDir = 'src'
    if (type === 'nextjs' && existsSync(join(cwd, 'app'))) {
        srcDir = 'src' // Next.js with src/ is the common pattern
    }

    return {
        type,
        packageManager,
        typescript,
        rescript: hasRescript,
        hasBlend,
        hasStyledComponents,
        srcDir,
    }
}

/**
 * Build the install command for missing dependencies.
 */
export function getInstallCommand(
    packageManager: ProjectInfo['packageManager'],
    deps: string[]
): string {
    if (deps.length === 0) return ''

    const depsStr = deps.join(' ')

    switch (packageManager) {
        case 'pnpm':
            return `pnpm add ${depsStr}`
        case 'yarn':
            return `yarn add ${depsStr}`
        case 'npm':
            return `npm install ${depsStr}`
    }
}
