import { readFile } from 'fs/promises'
import { parse, simpleTraverse } from '@typescript-eslint/typescript-estree'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import type {
    FileUsageResult,
    FileContext,
    RawUsage,
    PropUsage,
} from './base.js'

// ─── Import map ───────────────────────────────────────────────────────────────

/**
 * Tracks what Blend components are imported and under what local names.
 *
 * For: import { Button, Alert as A } from '@juspay/blend-design-system'
 * Result: { "Button" → "Button", "A" → "Alert" }
 *
 * For: import * as Blend from '@juspay/blend-design-system'
 * Result: namespace "Blend" added, so "Blend.Button" → "Button"
 */
class ImportMap {
    private direct = new Map<string, string>() // localName → blendName
    private namespaces = new Map<string, string>() // namespaceName → packageName

    set(localName: string, blendName: string) {
        this.direct.set(localName, blendName)
    }

    setNamespace(localName: string) {
        this.namespaces.set(localName, '*')
    }

    resolve(localName: string): string | null {
        return this.direct.get(localName) ?? null
    }

    resolveNamespace(ns: string, member: string): string | null {
        return this.namespaces.has(ns) ? member : null
    }

    get size(): number {
        return this.direct.size + this.namespaces.size
    }
}

// ─── Adapter detection ────────────────────────────────────────────────────────

const ADAPTER_SIGNALS = [
    'isBlendEnabled',
    'blendEnabledC',
    'BlendContext',
    'useBlend',
    'BLEND_ENABLED',
]

// ─── Main scanner ─────────────────────────────────────────────────────────────

export async function scanTypeScriptFile(
    filePath: string,
    _packageRegistry: unknown,
    packageName: string
): Promise<FileUsageResult> {
    let source: string
    try {
        source = await readFile(filePath, 'utf-8')
    } catch {
        return makeEmptyResult(filePath, true)
    }

    // Quick pre-check — if the file doesn't mention the package at all, skip AST
    if (!source.includes(packageName)) {
        return makeEmptyResult(filePath, false)
    }

    let ast: TSESTree.Program
    try {
        ast = parse(source, {
            jsx: true,
            range: false,
            loc: true,
            comment: false,
        })
    } catch {
        return makeEmptyResult(filePath, true)
    }

    // Pass 1: Build import map
    const importMap = extractImports(ast, packageName)
    if (importMap.size === 0) {
        return makeEmptyResult(filePath, false)
    }

    // Pass 2: Walk JSX tree
    const usages: RawUsage[] = []

    simpleTraverse(ast, {
        enter(node) {
            if (node.type !== 'JSXOpeningElement') return

            const jsxNode = node as TSESTree.JSXOpeningElement
            const { localName, blendName } = resolveJSXName(
                jsxNode.name,
                importMap
            )
            if (!blendName) return

            const hasSpreadProps = jsxNode.attributes.some(
                (a) => a.type === 'JSXSpreadAttribute'
            )

            const props = extractJSXProps(jsxNode.attributes)

            usages.push({
                blendName,
                localName,
                props,
                hasSpreadProps,
                lineNumber: jsxNode.loc?.start.line ?? 0,
                isDynamic: false,
            })
        },
    })

    // Also detect React.createElement(Component, props) calls
    simpleTraverse(ast, {
        enter(node) {
            if (node.type !== 'CallExpression') return
            const call = node as TSESTree.CallExpression

            // React.createElement(Button, ...) or createElement(Button, ...)
            if (!isCreateElementCall(call)) return

            const firstArg = call.arguments[0]
            if (!firstArg) return

            let blendName: string | null = null
            let localName = ''

            if (firstArg.type === 'Identifier') {
                localName = firstArg.name
                blendName = importMap.resolve(localName)
            } else if (firstArg.type === 'MemberExpression') {
                const text = getMemberText(firstArg)
                const [ns, member] = text.split('.')
                blendName = member
                    ? importMap.resolveNamespace(ns, member)
                    : null
                localName = text
            }

            if (!blendName) return

            usages.push({
                blendName,
                localName,
                props: [], // props from createElement are runtime objects — can't static analyze
                hasSpreadProps: true,
                lineNumber: call.loc?.start.line ?? 0,
                isDynamic: true,
            })
        },
    })

    const context = classifyFile(source, usages)

    return {
        filePath,
        language: 'typescript',
        usages,
        context,
        parseError: false,
    }
}

// ─── Pass 1: Import extraction ────────────────────────────────────────────────

function extractImports(ast: TSESTree.Program, packageName: string): ImportMap {
    const map = new ImportMap()
    const pkgBase = packageName.replace(/\/$/, '')

    for (const node of ast.body) {
        // ES module imports
        if (node.type === 'ImportDeclaration') {
            const src = node.source.value as string
            const isBlend = src === pkgBase || src.startsWith(`${pkgBase}/`)
            if (!isBlend) continue

            // Derive component name from sub-path: "@juspay/.../Button" → "Button"
            const subPathPart = src.includes('/')
                ? (src.split('/').pop() ?? null)
                : null

            for (const spec of node.specifiers) {
                if (spec.type === 'ImportSpecifier') {
                    const imported =
                        spec.imported.type === 'Identifier'
                            ? spec.imported.name
                            : (spec.imported as TSESTree.StringLiteral).value
                    map.set(spec.local.name, imported)
                } else if (spec.type === 'ImportDefaultSpecifier') {
                    map.set(spec.local.name, subPathPart ?? spec.local.name)
                } else if (spec.type === 'ImportNamespaceSpecifier') {
                    map.setNamespace(spec.local.name)
                }
            }
        }

        // CommonJS: const { Button } = require('@juspay/blend-design-system')
        if (node.type === 'VariableDeclaration') {
            for (const decl of node.declarations) {
                if (!decl.init || decl.init.type !== 'CallExpression') continue
                const call = decl.init as TSESTree.CallExpression
                if (!isRequireCall(call, pkgBase)) continue

                if (decl.id.type === 'ObjectPattern') {
                    for (const prop of decl.id.properties) {
                        if (
                            prop.type === 'Property' &&
                            prop.key.type === 'Identifier' &&
                            prop.value.type === 'Identifier'
                        ) {
                            map.set(prop.value.name, prop.key.name)
                        }
                    }
                }
            }
        }
    }

    return map
}

// ─── Pass 2: JSX name resolution ──────────────────────────────────────────────

function resolveJSXName(
    name: TSESTree.JSXTagNameExpression,
    importMap: ImportMap
): { localName: string; blendName: string | null } {
    if (name.type === 'JSXIdentifier') {
        const localName = name.name
        return { localName, blendName: importMap.resolve(localName) }
    }

    if (name.type === 'JSXMemberExpression') {
        // Blend.Button or NS.Sub.Component — build full chain for localName
        const ns = getJSXMemberRoot(name)
        const member = name.property.name
        const fullChain = getJSXMemberChain(name)
        return {
            localName: fullChain,
            blendName: importMap.resolveNamespace(ns, member),
        }
    }

    return { localName: '', blendName: null }
}

function getJSXMemberRoot(expr: TSESTree.JSXMemberExpression): string {
    if (expr.object.type === 'JSXIdentifier') return expr.object.name
    if (expr.object.type === 'JSXMemberExpression')
        return getJSXMemberRoot(expr.object)
    return ''
}

function getJSXMemberChain(expr: TSESTree.JSXMemberExpression): string {
    const objectPart =
        expr.object.type === 'JSXIdentifier'
            ? expr.object.name
            : expr.object.type === 'JSXMemberExpression'
              ? getJSXMemberChain(expr.object)
              : ''
    return `${objectPart}.${expr.property.name}`
}

// ─── Prop extraction ──────────────────────────────────────────────────────────

function extractJSXProps(
    attrs: TSESTree.JSXOpeningElement['attributes']
): PropUsage[] {
    const props: PropUsage[] = []

    for (const attr of attrs) {
        if (attr.type === 'JSXSpreadAttribute') continue

        const name =
            attr.name.type === 'JSXIdentifier'
                ? attr.name.name
                : `${(attr.name.namespace as TSESTree.JSXIdentifier).name}:${attr.name.name.name}`

        const val = attr.value

        if (!val) {
            // `isLoading` with no value = true
            props.push({ name, value: 'true', valueType: 'bool_shorthand' })
            continue
        }

        if (val.type === 'Literal') {
            props.push({
                name,
                value: String(val.value),
                valueType: 'string_literal',
            })
            continue
        }

        if (val.type === 'JSXExpressionContainer') {
            const expr = val.expression

            if (expr.type === 'JSXEmptyExpression') continue

            if (expr.type === 'Literal') {
                props.push({
                    name,
                    value: String(expr.value),
                    valueType: 'string_literal',
                })
                continue
            }

            if (expr.type === 'MemberExpression') {
                props.push({
                    name,
                    value: getMemberText(expr),
                    valueType: 'member_expression',
                })
                continue
            }

            if (expr.type === 'Identifier') {
                props.push({ name, value: expr.name, valueType: 'expression' })
                continue
            }

            props.push({ name, value: null, valueType: 'expression' })
        }
    }

    return props
}

// ─── File classification ──────────────────────────────────────────────────────

function classifyFile(source: string, usages: RawUsage[]): FileContext {
    const hasUsages = usages.length > 0
    const isAdapter = ADAPTER_SIGNALS.some((s) => source.includes(s))
    // A wrapper exports a component (has forwardRef, memo, or a named export of JSX)
    const exportsMake =
        /export\s+(default\s+function|const\s+\w+\s*=\s*(?:React\.memo|React\.forwardRef|\())/i.test(
            source
        )

    return {
        isAdapter,
        isWrapper: exportsMake && hasUsages && !isAdapter,
        isDirect: hasUsages && !isAdapter,
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isCreateElementCall(call: TSESTree.CallExpression): boolean {
    const callee = call.callee
    if (callee.type === 'MemberExpression') {
        const obj = callee.object
        const prop = callee.property
        return (
            obj.type === 'Identifier' &&
            (obj.name === 'React' || obj.name === 'react') &&
            prop.type === 'Identifier' &&
            prop.name === 'createElement'
        )
    }
    if (callee.type === 'Identifier') {
        return callee.name === 'createElement'
    }
    return false
}

function isRequireCall(
    call: TSESTree.CallExpression,
    packageName: string
): boolean {
    if (call.callee.type !== 'Identifier' || call.callee.name !== 'require')
        return false
    const firstArg = call.arguments[0]
    return (
        firstArg?.type === 'Literal' &&
        typeof firstArg.value === 'string' &&
        (firstArg.value === packageName ||
            firstArg.value.startsWith(`${packageName}/`))
    )
}

function getMemberText(expr: TSESTree.MemberExpression): string {
    const obj = expr.object.type === 'Identifier' ? expr.object.name : '?'
    const prop = expr.property.type === 'Identifier' ? expr.property.name : '?'
    return `${obj}.${prop}`
}

function makeEmptyResult(
    filePath: string,
    parseError: boolean
): FileUsageResult {
    return {
        filePath,
        language: 'typescript',
        usages: [],
        context: { isAdapter: false, isWrapper: false, isDirect: false },
        parseError,
    }
}
