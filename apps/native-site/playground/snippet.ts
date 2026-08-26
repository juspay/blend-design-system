import type { Control, Option } from './types'

/**
 * Renders the current playground props as the JSX you would write to get
 * them. Pure — no React, no react-native — so it is unit-tested directly.
 *
 * Only props that differ from the spec defaults are printed, which keeps the
 * block short as controls change and doubles as documentation of what the
 * defaults actually are. Props the component has no default for opt out with
 * `always: true` on their control, otherwise the snippet would render
 * nothing.
 */

const INDENT = '    '

/** Re-indents a rendered block, for `wrapSnippet`. */
export function indent(text: string, levels = 1): string {
    const pad = INDENT.repeat(levels)
    return text
        .split('\n')
        .map((line) => (line.length > 0 ? pad + line : line))
        .join('\n')
}

/** Escapes a string for a JSX attribute, switching to an expression when a quote or newline makes the attribute form illegal. */
function formatString(value: string): string {
    if (value.includes('"') || value.includes('\n')) {
        return `{${JSON.stringify(value)}}`
    }
    return `"${value}"`
}

/**
 * `null` means "omit this prop". `undefined` values are omitted because
 * passing them is the same as not passing them.
 */
function formatValue(value: unknown, code: string | undefined): string | null {
    if (code !== undefined) return `{${code}}`
    if (value === undefined || value === null) return null
    if (typeof value === 'string') return formatString(value)
    if (typeof value === 'boolean') return value ? '' : '{false}'
    if (typeof value === 'number') return `{${value}}`
    // Slots, actions and handlers have no readable literal form. The control
    // can supply one via `code`/`onCode`; without it, say so rather than
    // printing `[object Object]`.
    return '{/* ... */}'
}

function codeFor<P>(control: Control<P>, value: unknown): string | undefined {
    if (control.kind === 'select' || control.kind === 'segmented') {
        const options = control.options as readonly Option<unknown>[]
        return options.find((option) => Object.is(option.value, value))?.code
    }
    if (control.kind === 'toggle') {
        const on = control.on === undefined ? true : control.on
        return Object.is(value, on) ? control.onCode : undefined
    }
    return undefined
}

/**
 * Rewrites one prop line in a rendered block, for `wrapSnippet`. Returns the
 * block untouched when the prop is not present.
 */
export function replaceProp(
    jsx: string,
    key: string,
    formatted: string
): string {
    const lines = jsx.split('\n')
    const index = lines.findIndex((line) => line.trim().startsWith(`${key}=`))
    if (index === -1) return jsx

    const line = lines[index]
    const pad = line.slice(0, line.length - line.trimStart().length)
    lines[index] = `${pad}${key}=${formatted}`
    return lines.join('\n')
}

/** Inserts prop lines the stage supplies but no control drives. */
export function addProps(jsx: string, props: readonly string[]): string {
    const extra = props.map((prop) => `${INDENT}${prop}`).join('\n')
    if (jsx.endsWith(' />')) {
        return `${jsx.slice(0, -3)}\n${extra}\n/>`
    }
    return jsx.replace(/\n\/>$/, `\n${extra}\n/>`)
}

export function buildSnippet<P extends object>(
    componentName: string,
    props: P,
    defaults: P,
    controls: readonly Control<P>[],
    wrap?: (inner: string, props: P) => string
): string {
    const lines: string[] = []

    for (const control of controls) {
        if (control.hidden) continue
        const key = control.key as keyof P
        const value = props[key]

        // Defaults are scalars or module-level constants, so identity is the
        // right comparison — a slot object is the same object until a
        // control swaps it.
        if (!control.always && Object.is(value, defaults[key])) continue

        const formatted = formatValue(value, codeFor(control, value))
        if (formatted === null) continue

        lines.push(
            formatted === ''
                ? `${INDENT}${control.key}`
                : `${INDENT}${control.key}=${formatted}`
        )
    }

    const inner =
        lines.length === 0
            ? `<${componentName} />`
            : `<${componentName}\n${lines.join('\n')}\n/>`

    return wrap ? wrap(inner, props) : inner
}
