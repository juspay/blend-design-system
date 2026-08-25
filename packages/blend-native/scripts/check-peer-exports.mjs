#!/usr/bin/env node
/**
 * Release gate: does the declared peer floor actually export what we import?
 *
 * `@juspay/blend-native` consumes the web token system through
 * `@juspay/blend-design-system/node`, and declares which versions it works
 * with as a peer range. Nothing else checks that claim: the workspace build
 * always has the newest exports, so CI stays green while the *published*
 * version a consumer installs may predate them — and the failure surfaces
 * in their app as an unrelated runtime `undefined`.
 *
 * That is not hypothetical. At the time this script was written, blend-native
 * declared `>=0.0.37` while the published 0.0.37 and 0.0.38-beta.1 were both
 * missing 17 of the 23 values it imports (BREAKPOINTS, mergeTokenTree, every
 * component enum, ...). Publishing against that range would have shipped a
 * package that crashed on first render for every consumer.
 *
 * So: resolve the floor version out of the peer range, fetch that exact
 * version from the registry, and assert every value import resolves. Run it
 * before publishing (the publish workflow does).
 *
 * Usage:
 *   node scripts/check-peer-exports.mjs            # check the declared floor
 *   node scripts/check-peer-exports.mjs 0.0.38-beta.2   # check a specific version
 */

import { execFileSync } from 'node:child_process'
import {
    mkdtempSync,
    readFileSync,
    readdirSync,
    statSync,
    rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const PKG_ROOT = resolve(HERE, '..')
const SRC = join(PKG_ROOT, 'src')
const DEP = '@juspay/blend-design-system'
const SPECIFIER = `${DEP}/node`

/** Value names imported from the node entry across src/ (types are erased). */
function collectValueImports() {
    const used = new Map()
    const walk = (dir) =>
        readdirSync(dir).flatMap((name) => {
            const path = join(dir, name)
            return statSync(path).isDirectory()
                ? walk(path)
                : /\.tsx?$/.test(name)
                  ? [path]
                  : []
        })

    for (const file of walk(SRC)) {
        const source = readFileSync(file, 'utf8')
        for (const [, typeOnly, names, spec] of source.matchAll(
            /import\s+(type\s+)?\{([^}]*)\}\s*from\s*'([^']+)'/g
        )) {
            if (spec !== SPECIFIER || typeOnly) continue
            for (const entry of names.split(',')) {
                const trimmed = entry.trim()
                if (!trimmed || trimmed.startsWith('type ')) continue
                const name = trimmed.split(/\s+as\s+/)[0].trim()
                const files = used.get(name) ?? []
                files.push(file.slice(SRC.length + 1))
                used.set(name, files)
            }
        }
    }
    return used
}

/** The lowest version the declared peer range admits. */
function resolveFloor() {
    const pkg = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'))
    const range = pkg.peerDependencies?.[DEP]
    if (!range) {
        throw new Error(`No peer dependency on ${DEP} declared.`)
    }
    const match = range.match(/(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)/)
    if (!match) {
        throw new Error(
            `Cannot resolve a floor version from peer range "${range}".`
        )
    }
    return { range, version: match[1] }
}

const { range, version } = (() => {
    const explicit = process.argv[2]
    if (explicit) return { range: `(explicit) ${explicit}`, version: explicit }
    return resolveFloor()
})()

console.log(`Peer range:      ${range}`)
console.log(`Checking against ${DEP}@${version} from the registry\n`)

const work = mkdtempSync(join(tmpdir(), 'blend-peer-'))
try {
    execFileSync('npm', ['pack', `${DEP}@${version}`, '--silent'], {
        cwd: work,
        stdio: ['ignore', 'ignore', 'inherit'],
    })
    const tarball = readdirSync(work).find((f) => f.endsWith('.tgz'))
    if (!tarball) throw new Error(`npm pack produced no tarball for ${version}`)
    execFileSync('tar', ['-xzf', tarball], { cwd: work })

    const nodeEntry = join(work, 'package', 'dist', 'node.js')
    const published = await import(pathToFileURL(nodeEntry).href)

    const used = collectValueImports()
    const missing = []
    for (const [name, files] of used) {
        if (published[name] === undefined) {
            missing.push({ name, files })
        }
    }

    if (missing.length > 0) {
        console.error(
            `✖ ${missing.length} of ${used.size} imported values are missing ` +
                `from the published ${DEP}@${version}:\n`
        )
        for (const { name, files } of missing) {
            console.error(`  ${name}  — used by ${files.join(', ')}`)
        }
        console.error(
            `\nPublishing against this peer floor would crash consumers at runtime.` +
                `\nFix: publish a ${DEP} version whose lib/node.ts exports these,` +
                `\nthen raise the peer range in packages/blend-native/package.json.`
        )
        process.exit(1)
    }

    console.log(
        `✔ all ${used.size} imported values resolve in ${DEP}@${version}`
    )
} finally {
    rmSync(work, { recursive: true, force: true })
}
