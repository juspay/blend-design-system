/**
 * AST scanner for user-visible English literals in component source.
 *
 * Shared by `find-untranslated.mjs` (the per-PR audit, which lists every
 * candidate) and `check-i18n.mjs` (the build gate, which fails only on
 * candidates beyond a committed baseline).
 *
 * It walks the TypeScript AST rather than grepping, so the shape of the
 * literal does not matter. Shapes covered, each found the hard way during the
 * migration (RFC 0008):
 *
 *   jsx-text        <Text>Top Queries</Text>
 *   jsx-expression  {'Loading editor...'} and {cond ? 'A' : 'B'}
 *   attribute       aria-label="Close", placeholder={'Search'} and ternaries
 *   fallback        aria-label={title || 'Modal dialog'} (also `??`)
 *   property        { 'aria-label': 'Popover dialog' }
 *   default         ({ searchPlaceholder = 'Search' }) => …
 *   text-content    announcement.textContent = 'Drawer opened'
 *
 * And three formatting shapes, so the formatting rules are enforced too:
 *
 *   intl-constructor  new Intl.NumberFormat(…) -- components must go through
 *                     the cached presets in `lib/i18n/format/formatterCache`
 *   host-locale       value.toLocaleString() with no locale argument, which
 *                     formats by the viewer's machine, not the provider
 *   locale-literal    a hardcoded tag such as 'en-US' or 'en-IN' -- use
 *                     DEFAULT_LOCALE or the provider locale
 *
 * Not covered, by design: plain string returns from helpers and module
 * constants. Those need human judgement (many are data, ids or the English
 * defaults of pure helpers) and are left to the audit + review.
 *
 * A literal on a line containing `i18n-ignore`, or directly below a line
 * that does, is skipped: that is how a deliberate exemption is recorded.
 */
import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import ts from 'typescript'

/** Attributes and props whose string value is read or announced by a user. */
export const DISPLAY_ATTRS = new Set([
    'aria-label',
    'aria-description',
    'aria-placeholder',
    'aria-valuetext',
    'aria-roledescription',
    'alt',
    'title',
    'placeholder',
    'searchPlaceholder',
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
    'header',
    'heading',
    'headerText',
    'buttonText',
    'cancelText',
    'confirmText',
    'selectAllText',
    'clearAllText',
    'customValueLabel',
    'addButtonTooltip',
    'dropdownTooltip',
])

/** Two consecutive letters: enough to separate prose from `px`, `%` and ids. */
const PROSE = /[A-Za-z]{2,}/

/**
 * Literals that are almost never prose: a single lowercase token
 * (`'flex-start'`, `'selected'`, `'enabled'`), CSS-looking values and
 * Highcharts/Tailwind class soup. Real UI copy is capitalised or has spaces.
 */
const NOT_PROSE = [
    /^[a-z0-9]+([-_.:/][a-z0-9]+)*$/,
    /(^|\s)-?\d+(\.\d+)?(px|rem|em|%|ms|s|vh|vw|deg)\b/,
    /rgba?\(|hsla?\(|var\(--|calc\(|cubic-bezier\(|url\(/,
    /^\s*[.#@][^{}]*\{[^}]*:[^}]*\}/, // CSS rule blocks in template strings
]

export const isProse = (text) =>
    PROSE.test(text) && !NOT_PROSE.some((re) => re.test(text.trim()))

export const walk = (dir) =>
    readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) {
            return entry === 'accessibility' ? [] : walk(full)
        }
        return /\.tsx?$/.test(entry) && !/\.d\.ts$/.test(entry) ? [full] : []
    })

/** The literal text of a string or template expression, else undefined. */
const literalText = (expr) => {
    if (ts.isParenthesizedExpression(expr)) return literalText(expr.expression)
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
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

/** Literal leaves of `a ? 'x' : 'y'` and `a || 'x'` / `a ?? 'x'`. */
const branchTexts = (expr) => {
    if (ts.isParenthesizedExpression(expr)) return branchTexts(expr.expression)
    const direct = literalText(expr)
    if (direct !== undefined) return [direct]
    if (ts.isConditionalExpression(expr)) {
        return [...branchTexts(expr.whenTrue), ...branchTexts(expr.whenFalse)]
    }
    if (
        ts.isBinaryExpression(expr) &&
        (expr.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
            expr.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
    ) {
        return branchTexts(expr.right)
    }
    return []
}

/**
 * Scan files and return `{ file, line, kind, text }` hits. `file` is the path
 * as given, so callers control whether it is relative.
 */
export const scanFiles = (files) => {
    const hits = []

    for (const file of files) {
        const source = readFileSync(file, 'utf8')
        const sourceLines = source.split('\n')
        const sf = ts.createSourceFile(
            file,
            source,
            ts.ScriptTarget.Latest,
            true,
            // Kind by extension, not TSX for everything: a `.ts` file parsed
            // as TSX mis-reads a generic `<T>` as a JSX element.
            /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS
        )
        const lineOf = (node) =>
            sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1
        const ignored = (line) =>
            /i18n-ignore/.test(sourceLines[line - 1] ?? '') ||
            /i18n-ignore/.test(sourceLines[line - 2] ?? '')
        const report = (node, kind, text) => {
            const line = lineOf(node)
            if (!ignored(line)) hits.push({ file, line, kind, text })
        }

        const visit = (node) => {
            if (ts.isJsxText(node) && isProse(node.text.trim())) {
                report(node, 'jsx-text', node.text.trim())
            }

            if (
                ts.isJsxExpression(node) &&
                node.expression &&
                !ts.isJsxAttribute(node.parent)
            ) {
                for (const text of branchTexts(node.expression)) {
                    if (isProse(text)) report(node, 'jsx-expression', text)
                }
            }

            if (ts.isJsxAttribute(node) && node.initializer) {
                const name = node.name.getText(sf)
                if (DISPLAY_ATTRS.has(name)) {
                    const init = node.initializer
                    const texts = ts.isStringLiteral(init)
                        ? [init.text]
                        : ts.isJsxExpression(init) && init.expression
                          ? branchTexts(init.expression)
                          : []
                    for (const text of texts) {
                        if (isProse(text)) {
                            report(
                                node,
                                'attribute',
                                `${name}=${JSON.stringify(text)}`
                            )
                        }
                    }
                }
            }

            if (ts.isPropertyAssignment(node)) {
                const key = ts.isStringLiteral(node.name)
                    ? node.name.text
                    : ts.isIdentifier(node.name)
                      ? node.name.text
                      : undefined
                if (key && DISPLAY_ATTRS.has(key) && key.includes('-')) {
                    for (const text of branchTexts(node.initializer)) {
                        if (isProse(text)) {
                            report(
                                node,
                                'property',
                                `${key}=${JSON.stringify(text)}`
                            )
                        }
                    }
                }
            }

            if (
                ts.isBindingElement(node) &&
                node.initializer &&
                ts.isObjectBindingPattern(node.parent)
            ) {
                const name = (node.propertyName ?? node.name).getText(sf)
                const text = literalText(node.initializer)
                if (
                    DISPLAY_ATTRS.has(name) &&
                    text !== undefined &&
                    isProse(text)
                ) {
                    report(node, 'default', `${name}=${JSON.stringify(text)}`)
                }
            }

            if (
                ts.isBinaryExpression(node) &&
                node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
                ts.isPropertyAccessExpression(node.left) &&
                node.left.name.text === 'textContent'
            ) {
                for (const text of branchTexts(node.right)) {
                    if (isProse(text)) report(node, 'text-content', text)
                }
            }

            if (
                ts.isNewExpression(node) &&
                ts.isPropertyAccessExpression(node.expression) &&
                ts.isIdentifier(node.expression.expression) &&
                node.expression.expression.text === 'Intl'
            ) {
                report(
                    node,
                    'intl-constructor',
                    `new Intl.${node.expression.name.text}`
                )
            }

            if (
                ts.isCallExpression(node) &&
                ts.isPropertyAccessExpression(node.expression) &&
                /^toLocale(Date|Time)?String$/.test(
                    node.expression.name.text
                ) &&
                node.arguments.length === 0
            ) {
                report(node, 'host-locale', `${node.expression.name.text}()`)
            }

            if (
                (ts.isStringLiteral(node) ||
                    ts.isNoSubstitutionTemplateLiteral(node)) &&
                /^[a-z]{2,3}-[A-Z]{2}$/.test(node.text) &&
                !ts.isImportDeclaration(node.parent) &&
                !ts.isLiteralTypeNode(node.parent)
            ) {
                report(node, 'locale-literal', node.text)
            }

            ts.forEachChild(node, visit)
        }

        visit(sf)
    }

    return hits
}
