#!/usr/bin/env node
/**
 * Build gate: no NEW hardcoded user-visible English in `lib/components`.
 *
 *   node scripts/check-i18n.mjs            check against the baseline
 *   node scripts/check-i18n.mjs --update   rewrite the baseline
 *
 * Why a ratchet and not an ESLint `no-literal-strings` rule at 'error':
 * components still being migrated hold English literals today, so a plain
 * rule would fail the build until every family has merged. The baseline
 * records those known literals (counted per file and text, with no line
 * numbers, so unrelated edits do not churn it), and the gate fails only when
 * a file gains a literal beyond its recorded count.
 *
 * Migrating a string makes its baseline entry stale. Stale entries are
 * reported but never fail, so migration PRs do not have to touch the
 * baseline; prune them with `--update` whenever convenient.
 *
 * To fix a failure, route the string through the component's catalog
 * fragment (`useMessages`, see RFC 0008). If the literal is deliberately not
 * user-facing copy (a data value, an English default of a pure helper, a
 * developer-facing message), mark it with an `// i18n-ignore` comment on the
 * line or the line above.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import { scanFiles, walk } from './lib/i18nScan.mjs'

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASELINE = join(pkgRoot, 'scripts', 'i18n-baseline.json')
const ROOT = join(pkgRoot, 'lib', 'components')

const files = walk(ROOT)
const counts = new Map()
for (const hit of scanFiles(files)) {
    const file = relative(pkgRoot, hit.file).split('\\').join('/')
    const key = `${file} | [${hit.kind}] ${hit.text}`
    const entry = counts.get(key) ?? { count: 0, lines: [] }
    entry.count += 1
    entry.lines.push(hit.line)
    counts.set(key, entry)
}

if (process.argv.includes('--update')) {
    const sorted = Object.fromEntries(
        [...counts.entries()]
            .sort(([a], [b]) => (a < b ? -1 : 1))
            .map(([key, { count }]) => [key, count])
    )
    writeFileSync(BASELINE, JSON.stringify(sorted, null, 4) + '\n')
    console.log(
        `i18n baseline updated: ${counts.size} known literal(s) recorded.`
    )
    process.exit(0)
}

const baseline = existsSync(BASELINE)
    ? JSON.parse(readFileSync(BASELINE, 'utf8'))
    : {}

const added = []
for (const [key, { count, lines }] of counts) {
    const allowed = baseline[key] ?? 0
    if (count > allowed) {
        const [file, rest] = key.split(' | ')
        added.push(`  ${file}:${lines.join(',')}  ${rest}`)
    }
}

const stale = Object.entries(baseline).filter(
    ([key, count]) => (counts.get(key)?.count ?? 0) < count
).length

if (stale > 0) {
    console.log(
        `i18n: ${stale} baseline entr${stale === 1 ? 'y is' : 'ies are'} no longer present ` +
            '(already migrated). Run `pnpm i18n:baseline` to prune.'
    )
}

if (added.length > 0) {
    console.error(
        `\n✖ ${added.length} new hardcoded user-visible string(s) in lib/components:\n\n` +
            added.join('\n') +
            '\n\nRoute them through the component’s message catalog ' +
            '(useMessages, RFC 0008), or mark a deliberate non-UI literal ' +
            'with an `// i18n-ignore` comment.\n'
    )
    process.exit(1)
}

console.log('✔ No new hardcoded user-visible strings.')
