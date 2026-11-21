#!/usr/bin/env node
/**
 * Reports user-visible English literals that are not yet routed through the
 * message catalog, for the families named on the command line.
 *
 * Why a script and not a grep: a grep over `aria-label="…"` and `{'…'}` misses
 * bare JSXText, which is how `Start` / `End` above the DateRangePicker's date
 * inputs, the mobile drawer's whole column header row and five Upload strings
 * survived the first two passes of the i18n migration. This walks the TS AST
 * instead, so the shape of the literal does not matter.
 *
 * This lists EVERY candidate, including ones already recorded in the
 * baseline. The build gate is `check-i18n.mjs`, which uses the same scanner
 * (`scripts/lib/i18nScan.mjs`) but fails only on candidates beyond the
 * committed baseline.
 *
 *   node scripts/find-untranslated.mjs lib/components/DataTable
 *
 * Hits are a starting point, not a verdict. Expect to dismiss `data-*` values,
 * CSS keywords and format patterns; see RFC 0008 for which literals are
 * deliberately not localized.
 */
import { statSync } from 'fs'
import { scanFiles, walk } from './lib/i18nScan.mjs'

const roots = process.argv.slice(2)
if (roots.length === 0) {
    console.error('usage: node scripts/find-untranslated.mjs <dir> [dir...]')
    process.exit(2)
}

const files = roots.flatMap((root) =>
    statSync(root).isDirectory() ? walk(root) : [root]
)

const hits = scanFiles(files).map(
    ({ file, line, kind, text }) =>
        `${file}:${line}  [${kind}] ${JSON.stringify(text)}`
)

console.log(hits.length ? hits.join('\n') : '(no candidates)')
console.log(`\n${hits.length} candidate(s) across ${files.length} file(s)`)
