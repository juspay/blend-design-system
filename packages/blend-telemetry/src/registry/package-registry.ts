import { readFile } from 'fs/promises'
import { resolve, join } from 'path'
import fg from 'fast-glob'
import type { BindingRegistry } from './binding-registry.js'

export interface PackageRegistry {
    /** Package name e.g. "@juspay/blend-design-system" */
    packageName: string
    /** Version actually installed in node_modules */
    version: string
    /** Version declared in the project's package.json (may differ from installed) */
    declaredVersion: string | null
    /** True when installed version differs from what package.json declares */
    versionMismatch: boolean
    /** All component names exported from the package */
    components: string[]
    /** Source of component list: 'node_modules' | 'binding-registry' | 'exports-map' */
    source: 'node_modules' | 'binding-registry' | 'exports-map'
}

export async function buildPackageRegistry(
    projectRoot: string,
    packageName: string,
    bindingRegistry: BindingRegistry
): Promise<PackageRegistry> {
    // Read declared version from root package.json or common monorepo layouts
    const declaredVersion = await readDeclaredVersion(projectRoot, packageName)

    // Find the node_modules installation — search root first, then common monorepo
    // layouts up to two levels deep (e.g. frontend/, packages/app/, apps/web/)
    const nodeModulesRoot = await findNodeModulesRoot(projectRoot, packageName)

    if (nodeModulesRoot) {
        try {
            const pkgPath = resolve(
                nodeModulesRoot,
                'node_modules',
                packageName,
                'package.json'
            )
            const pkg = JSON.parse(await readFile(pkgPath, 'utf-8')) as Record<
                string,
                unknown
            >
            const version = (pkg['version'] as string) ?? 'unknown'
            const versionMismatch =
                declaredVersion !== null && declaredVersion !== version

            const components = extractFromExportsMap(pkg)
            if (components.length > 0) {
                return {
                    packageName,
                    version,
                    declaredVersion,
                    versionMismatch,
                    components,
                    source: 'exports-map',
                }
            }

            const typesComponents = await extractFromTypeDeclarations(
                nodeModulesRoot,
                packageName,
                pkg
            )
            if (typesComponents.length > 0) {
                return {
                    packageName,
                    version,
                    declaredVersion,
                    versionMismatch,
                    components: typesComponents,
                    source: 'node_modules',
                }
            }

            return {
                packageName,
                version,
                declaredVersion,
                versionMismatch,
                components: deriveFromBindingRegistry(bindingRegistry),
                source: 'binding-registry',
            }
        } catch {
            // fall through
        }
    }

    // node_modules not available — use binding registry as source of truth
    return {
        packageName,
        version: 'unknown',
        declaredVersion,
        versionMismatch: declaredVersion !== null,
        components: deriveFromBindingRegistry(bindingRegistry),
        source: 'binding-registry',
    }
}

/**
 * Find the directory containing node_modules/<packageName>.
 * Checks root first, then common monorepo layouts up to two levels deep
 * (e.g. frontend/, packages/app/, apps/web/).
 */
async function findNodeModulesRoot(
    projectRoot: string,
    packageName: string
): Promise<string | null> {
    // Check root
    try {
        await readFile(
            resolve(projectRoot, 'node_modules', packageName, 'package.json'),
            'utf-8'
        )
        return projectRoot
    } catch {
        /* continue */
    }

    // Check one and two levels deep using explicit patterns for common monorepo
    // layouts — avoids an unbounded ** glob while covering the vast majority of
    // real-world structures: frontend/, packages/app/, apps/web/, etc.
    try {
        const candidates = await fg(
            [
                '*/node_modules',
                'packages/*/node_modules',
                'apps/*/node_modules',
            ],
            {
                cwd: projectRoot,
                onlyDirectories: true,
                ignore: ['**/node_modules/node_modules'],
            }
        )
        for (const candidate of candidates) {
            const dir = join(
                projectRoot,
                candidate.replace(/\/node_modules$/, '')
            )
            try {
                await readFile(
                    resolve(dir, 'node_modules', packageName, 'package.json'),
                    'utf-8'
                )
                return dir
            } catch {
                /* continue */
            }
        }
    } catch {
        /* ignore */
    }

    return null
}

async function readDeclaredVersion(
    projectRoot: string,
    packageName: string
): Promise<string | null> {
    // Check root package.json first, then common monorepo layouts up to two
    // levels deep — covers frontend/, packages/app/, apps/web/, etc.
    const candidates = [resolve(projectRoot, 'package.json')]

    try {
        const nested = await fg(
            [
                '*/package.json',
                'packages/*/package.json',
                'apps/*/package.json',
            ],
            {
                cwd: projectRoot,
                ignore: ['**/node_modules/**'],
                absolute: true,
            }
        )
        candidates.push(...nested)
    } catch {
        /* ignore */
    }

    for (const pkgPath of candidates) {
        try {
            const pkg = JSON.parse(await readFile(pkgPath, 'utf-8')) as Record<
                string,
                unknown
            >
            const allDeps = {
                ...((pkg['dependencies'] as Record<string, string>) ?? {}),
                ...((pkg['devDependencies'] as Record<string, string>) ?? {}),
            }
            if (packageName in allDeps) return allDeps[packageName] ?? null
        } catch {
            /* continue */
        }
    }

    return null
}

function extractFromExportsMap(pkg: Record<string, unknown>): string[] {
    const exports = pkg['exports'] as Record<string, unknown> | undefined
    if (!exports) return []

    const components: string[] = []
    for (const key of Object.keys(exports)) {
        // Skip "." (root) and hidden/utility exports
        if (
            key === '.' ||
            key.startsWith('./dist') ||
            key.startsWith('./styles')
        )
            continue
        // "./Button" → "Button"
        const name = key.replace('./', '')
        if (name && /^[A-Z]/.test(name)) {
            components.push(name)
        }
    }
    return components
}

async function extractFromTypeDeclarations(
    projectRoot: string,
    packageName: string,
    pkg: Record<string, unknown>
): Promise<string[]> {
    try {
        const typesField =
            (pkg['types'] as string) ??
            (pkg['typings'] as string) ??
            'index.d.ts'
        const dtsPath = resolve(
            projectRoot,
            'node_modules',
            packageName,
            typesField
        )
        const dts = await readFile(dtsPath, 'utf-8')

        const components = new Set<string>()

        // Pattern 1: export declare const/function/class/interface/type Button
        const declareRe =
            /export\s+(?:declare\s+)?(?:const|function|class|interface|type)\s+([A-Z]\w*)/g
        for (const [, name] of dts.matchAll(declareRe)) {
            components.add(name)
        }

        // Pattern 2: export { Button, Tag as Tag2, ... }
        const namedExportRe = /export\s*\{([^}]+)\}/g
        for (const [, exportList] of dts.matchAll(namedExportRe)) {
            for (const item of exportList.split(',')) {
                const name =
                    item
                        .trim()
                        .split(/\s+as\s+/)
                        .pop()
                        ?.trim() ?? ''
                if (name && /^[A-Z]/.test(name)) components.add(name)
            }
        }

        // Pattern 3: export * from './components/Button'  (barrel re-exports)
        // If the path points to a namespace folder (e.g. ./components/Inputs which contains
        // TextInput, OTPInput…), follow one level deeper instead of adding the folder name.
        // importPath is relative to the .d.ts file's directory, so resolve from there.
        const { dirname: dtsDirname } = await import('path')
        const dtsDir = dtsDirname(dtsPath)
        const starRe = /export\s*\*\s*from\s*['"]([^'"]+)['"]/g
        for (const [, importPath] of dts.matchAll(starRe)) {
            const segment = importPath.split('/').pop() ?? ''
            if (!/^[A-Z]/.test(segment)) continue

            // Check if this resolves to a namespace folder (has its own index.d.ts with sub-exports)
            const subComponents = await tryFollowNamespace(dtsDir, importPath)
            if (subComponents.length > 0) {
                subComponents.forEach((c) => components.add(c))
            } else {
                components.add(segment)
            }
        }

        return [...components].filter(
            (n) => !n.endsWith('Props') && !n.endsWith('Type')
        )
    } catch {
        return []
    }
}

/**
 * If importPath points to a namespace directory (e.g. ./components/Inputs which contains
 * TextInput, OTPInput…), read its index.d.ts and return the sub-component names.
 * Returns [] if it's a regular single-component file.
 */
async function tryFollowNamespace(
    baseDir: string,
    importPath: string
): Promise<string[]> {
    // Resolve possible locations: <importPath>/index.d.ts (namespace folder)
    // importPath is relative to baseDir (the directory of the .d.ts file that re-exports it)
    const indexDts = resolve(baseDir, importPath, 'index.d.ts')
    try {
        const content = await readFile(indexDts, 'utf-8')
        const names: string[] = []
        // Extract names from nested barrel re-exports: export * from './TextInput'
        const re = /export\s*\*\s*from\s*['"]([^'"]+)['"]/g
        for (const [, p] of content.matchAll(re)) {
            const name = p.split('/').pop() ?? ''
            if (/^[A-Z]/.test(name)) names.push(name)
        }
        // Also extract named exports directly in the index
        const namedRe = /export\s*\{([^}]+)\}/g
        for (const [, exportList] of content.matchAll(namedRe)) {
            for (const item of exportList.split(',')) {
                const name =
                    item
                        .trim()
                        .split(/\s+as\s+/)
                        .pop()
                        ?.trim() ?? ''
                if (name && /^[A-Z]/.test(name)) names.push(name)
            }
        }
        const unique = [...new Set(names)]
        const folderName = importPath.split('/').pop() ?? ''
        // Expand as namespace if it has exports AND none of them match the folder name.
        // e.g. Tags   → [Tag]                      → namespace (expand: Tag ≠ Tags)
        //      Inputs → [TextInput, OTPInput, ...]  → namespace (expand)
        //      Button → [Button, ...]               → direct component (don't expand)
        if (unique.length > 0 && !unique.includes(folderName)) return unique
    } catch {
        /* not a namespace folder */
    }
    return []
}

function deriveFromBindingRegistry(registry: BindingRegistry): string[] {
    return [...registry.byBlendName.keys()]
}
