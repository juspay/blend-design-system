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
 * Why not an ESLint rule yet: RFC 0008 defers `no-literal-strings` to the lint
 * ratchet PR, once every family it would cover has actually been migrated.
 * Until then this is the audit tool for each migration PR -- it is NOT wired
 * into CI and does not gate anything.
 *
 *   node scripts/find-untranslated.mjs lib/components/DataTable
 *
 * Hits are a starting point, not a verdict. Expect to dismiss `data-*` values,
 * CSS keywords and format patterns; see RFC 0008 for which literals are
 * deliberately not localized.
 */
import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import ts from 'typescript'

/** Attributes whose string value is read or announced by a user. */
const DISPLAY_ATTRS = new Set([
    'aria-label',
    'aria-description',
    'aria-placeholder',
    'aria-valuetext',
    'alt',
    'title',
    'placeholder',
    'text',
    'label',
    'subLabel',
    'content',
    'hintText',
    'errorText',
    'description',
    'emptyStateText',
    'helpIconText',
    'tooltip',
    'ariaLabel',
    'headerText',
    'buttonText',
])

/** Two consecutive letters: enough to separate prose from `px`, `%` and ids. */
const PROSE = /[A-Za-z]{2,}/

const walk = (dir) =>
    readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) {
            return entry === 'accessibility' ? [] : walk(full)
        }
        return /\.tsx?$/.test(entry) ? [full] : []
    })

const roots = process.argv.slice(2)
if (roots.length === 0) {
    console.error('usage: node scripts/find-untranslated.mjs <dir> [dir...]')
    process.exit(2)
}

const files = roots.flatMap((root) =>
    statSync(root).isDirectory() ? walk(root) : [root]
)

const hits = []

for (const file of files) {
    const sf = ts.createSourceFile(
        file,
        readFileSync(file, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
    )
    const line = (node) =>
        sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1
    const report = (node, kind, text) =>
        hits.push(`${file}:${line(node)}  [${kind}] ${JSON.stringify(text)}`)

    const literalText = (expr) => {
        if (
            ts.isStringLiteral(expr) ||
            ts.isNoSubstitutionTemplateLiteral(expr)
        ) {
            return expr.text
        }
        if (ts.isTemplateExpression(expr)) {
            return (
                expr.head.text +
                expr.templateSpans.map((span) => span.literal.text).join('')
            )
        }
        return undefined
    }

    const visit = (node) => {
        if (ts.isJsxText(node) && PROSE.test(node.text.trim())) {
            report(node, 'jsx-text', node.text.trim())
        }

        if (ts.isJsxExpression(node) && node.expression) {
            const expr = node.expression
            const direct = literalText(expr)
            if (direct !== undefined && PROSE.test(direct)) {
                report(node, 'jsx-expression', direct)
            }
            if (ts.isConditionalExpression(expr)) {
                for (const branch of [expr.whenTrue, expr.whenFalse]) {
                    const text = literalText(branch)
                    if (text !== undefined && PROSE.test(text)) {
                        report(node, 'jsx-ternary', text)
                    }
                }
            }
        }

        if (ts.isJsxAttribute(node) && node.initializer) {
            const name = node.name.getText(sf)
            if (DISPLAY_ATTRS.has(name)) {
                const init = node.initializer
                const candidates = []
                if (ts.isStringLiteral(init)) candidates.push(init.text)
                else if (ts.isJsxExpression(init) && init.expression) {
                    const expr = init.expression
                    const direct = literalText(expr)
                    if (direct !== undefined) candidates.push(direct)
                    if (ts.isConditionalExpression(expr)) {
                        for (const branch of [expr.whenTrue, expr.whenFalse]) {
                            const text = literalText(branch)
                            if (text !== undefined) candidates.push(text)
                        }
                    }
                }
                for (const text of candidates) {
                    if (PROSE.test(text)) {
                        report(
                            node,
                            'attribute',
                            `${name}=${JSON.stringify(text)}`
                        )
                    }
                }
            }
        }

        ts.forEachChild(node, visit)
    }

    visit(sf)
}

console.log(hits.length ? hits.join('\n') : '(no candidates)')
console.log(`\n${hits.length} candidate(s) across ${files.length} file(s)`)
