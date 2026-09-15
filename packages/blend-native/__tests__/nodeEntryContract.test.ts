import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

/**
 * The web→native export contract.
 *
 * Every symbol this package imports from `@juspay/blend-design-system/node`
 * must exist in the **built** entry (`dist/node.js`) — that is what the
 * workspace link serves at runtime, and what published consumers get. A
 * factory exported from `lib/node.ts` but not rebuilt, or dropped from the
 * entry, surfaces in an app as an unrelated runtime `undefined` (the failure
 * mode CLAUDE.md warns about). This test turns it into a CI failure with the
 * missing name spelled out.
 *
 * The used-symbol list is derived by scanning `src/`, not hand-maintained —
 * registering a new component's factory automatically extends the contract.
 */

const SRC = resolve(__dirname, '../src')
const SPECIFIER = '@juspay/blend-design-system/node'

function walk(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name)
        if (statSync(path).isDirectory()) return walk(path)
        return /\.tsx?$/.test(name) ? [path] : []
    })
}

/**
 * Value names imported from the node entry across `src/`. Type-only imports
 * (`import type {...}` blocks and `type X` specifiers) are erased at compile
 * time and cannot produce a runtime `undefined`, so they are skipped.
 */
function collectValueImports(): Map<string, string[]> {
    const usedBy = new Map<string, string[]>()
    for (const file of walk(SRC)) {
        const source = readFileSync(file, 'utf8')
        const imports = source.matchAll(
            /import\s+(type\s+)?\{([^}]*)\}\s*from\s*'([^']+)'/g
        )
        for (const [, typeOnly, names, spec] of imports) {
            if (spec !== SPECIFIER || typeOnly) continue
            for (const entry of names.split(',')) {
                const trimmed = entry.trim()
                if (!trimmed || trimmed.startsWith('type ')) continue
                // `Foo as Bar` — the contract is about the source name `Foo`.
                const name = trimmed.split(/\s+as\s+/)[0].trim()
                const files = usedBy.get(name) ?? []
                files.push(file.slice(SRC.length + 1))
                usedBy.set(name, files)
            }
        }
    }
    return usedBy
}

describe('node entry contract', () => {
    it('imports the node entry somewhere (scanner sanity check)', () => {
        expect(collectValueImports().size).toBeGreaterThan(0)
    })

    it('every value used from the node entry exists in the built entry', async () => {
        let node: Record<string, unknown>
        try {
            node = await import(SPECIFIER)
        } catch (error) {
            throw new Error(
                `Could not load ${SPECIFIER} — the workspace link serves ` +
                    `built dist/, so run \`pnpm build:blend\` first.\n${String(error)}`
            )
        }

        const missing: string[] = []
        for (const [name, files] of collectValueImports()) {
            if (node[name] === undefined) {
                missing.push(`${name} (used by ${files.join(', ')})`)
            }
        }

        expect(
            missing,
            `Missing from the built ${SPECIFIER} entry — export it from ` +
                `packages/blend/lib/node.ts and run \`pnpm build:blend\`:\n  ` +
                missing.join('\n  ')
        ).toEqual([])
    })
})
