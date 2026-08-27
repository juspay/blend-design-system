import type { ReactNode } from 'react'

/**
 * The playground harness contract.
 *
 * Adding a component to the demo app is a spec file, not a screen: declare
 * the props you want to be adjustable and how to render them, and the
 * harness supplies the stage, the control panel, the live JSX snippet and
 * the reset button.
 *
 * Nothing in this module imports `react-native`, so it is unit-testable in
 * plain vitest alongside `snippet.ts`.
 */

/** Panel section a control belongs to. Rendered in this order. */
export const CONTROL_GROUPS = ['Appearance', 'Content', 'State'] as const

export type ControlGroup = (typeof CONTROL_GROUPS)[number]

export type Option<V> = {
    label: string
    value: V
    /**
     * Source text for the JSX snippet, when the runtime value does not read
     * well on its own — `TagColor.SUCCESS` rather than `"success"`.
     */
    code?: string
}

type Common = {
    label: string
    /** Defaults to `Appearance`. */
    group?: ControlGroup
    /**
     * Print this prop in the snippet even when it still equals the spec
     * default. Use it for props the component has no default for (`text`,
     * `heading`, `keyString`) — omitting those would produce a snippet that
     * renders nothing.
     */
    always?: boolean
    /**
     * Drive the preview but stay out of the snippet. For playground-only
     * props such as a family selector, which choose *which* component the
     * stage renders and are stripped before it sees them — printing them
     * would produce JSX that does not compile.
     */
    hidden?: boolean
}

/**
 * A control, tied to one prop of `P`. Distributing over the keys is what
 * makes `options` type-check against the prop it drives: a `TagColor` option
 * list cannot be attached to `size`.
 */
export type Control<P> = {
    [K in keyof P & string]:
        | (Common & {
              /** One value, chosen from a bottom sheet. */
              kind: 'select'
              key: K
              options: readonly Option<P[K]>[]
          })
        | (Common & {
              /**
               * Several values from the same sheet, for a prop that takes a
               * list. The options are typed against the element, not the
               * array.
               */
              kind: 'multiselect'
              key: K
              // `NonNullable` first: an optional prop's type includes
              // `undefined`, and an indexed access does not distribute over
              // that union, so the infer would collapse to `never`.
              options: readonly Option<
                  NonNullable<P[K]> extends readonly (infer E)[] ? E : never
              >[]
          })
        | (Common & {
              kind: 'toggle'
              key: K
              /** Written when on. Defaults to `true`. */
              on?: P[K]
              /** Written when off. Defaults to `false`. */
              off?: P[K]
              /** Snippet source for the on-value, when it is not a scalar. */
              onCode?: string
          })
        | (Common & {
              kind: 'text'
              key: K
              placeholder?: string
          })
}[keyof P & string]

/** Passed to `render` so overlay specs can drive their own visibility. */
export type RenderContext = {
    open: boolean
    setOpen: (open: boolean) => void
}

export type ComponentSpec<P extends object> = {
    /** Component name, used as the nav label and in the JSX snippet. */
    name: string
    /** One-line description shown under the stage. */
    summary: string
    /**
     * `inline` renders the component into the stage. `overlay` renders a
     * trigger instead, for components that present over the screen —
     * `render` then drives itself from `ctx.open`.
     */
    mode: 'inline' | 'overlay'
    /** Starting props. Also the baseline the snippet diffs against. */
    defaults: P
    controls: readonly Control<P>[]
    render: (props: P, ctx: RenderContext) => ReactNode
    /** Label for the overlay trigger. Ignored when `mode` is `inline`. */
    triggerLabel?: string
    /**
     * Wrap the generated JSX, for specs whose stage renders more than the one
     * element — a tag group around its tags, say. Receives the inner block
     * already rendered; `indent` in `snippet.ts` handles the reflow.
     */
    wrapSnippet?: (inner: string, props: P) => string
}

/**
 * A spec with its props type erased, so a heterogeneous list of them can be
 * held in one array. The harness only ever reads props it got out of the
 * same spec, so the erasure is sound.
 */
export type AnySpec = ComponentSpec<Record<string, unknown>>

export function asAnySpec<P extends object>(spec: ComponentSpec<P>): AnySpec {
    return spec as unknown as AnySpec
}

/**
 * `NO_FILL` -> `No fill`, `wrap-clamp` -> `Wrap clamp`, `sm` -> `Sm`.
 *
 * A value that is already a proper name is left alone: enum keys are
 * SCREAMING_SNAKE and want flattening, but union values such as `TagGroup`
 * and `IconButton` are component names, and lowercasing them produces
 * "Taggroup" and "Iconbutton".
 */
export function humanize(value: string): string {
    // Separator or all-caps means an enum key (`NO_FILL`, `SUCCESS`, `MD`).
    // Mixed case starting uppercase means a name, and is kept verbatim.
    if (/[_-]/.test(value) || value === value.toUpperCase()) {
        const spaced = value.replace(/[_-]+/g, ' ').toLowerCase()
        return spaced.charAt(0).toUpperCase() + spaced.slice(1)
    }
    if (/^[A-Z]/.test(value)) return value
    return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * Build options from an enum object, so a variant added to the library shows
 * up in the controls on its own instead of waiting for someone to remember
 * a hardcoded list.
 *
 * `enumName` is only used for the snippet, which reads better as
 * `TagColor.SUCCESS` than as the `"success"` the value actually is.
 */
export function enumOptions<E extends Record<string, string>>(
    enumObject: E,
    enumName: string
): readonly Option<E[keyof E]>[] {
    return Object.entries(enumObject).map(([key, value]) => ({
        label: humanize(key),
        value: value as E[keyof E],
        code: `${enumName}.${key}`,
    }))
}

/**
 * Build options from a string union, which has no runtime object to
 * enumerate. The `[T] extends [L[number]]` guard makes the call fail to
 * compile if the union gains a member that is not listed — the closest we
 * can get to the automatic behaviour `enumOptions` has for real enums.
 */
export const unionOptions =
    <T extends string>() =>
    <L extends readonly T[]>(
        list: L & ([T] extends [L[number]] ? unknown : never)
    ): readonly Option<T>[] =>
        list.map((value) => ({ label: humanize(value), value }))

/**
 * The two values a toggle writes.
 *
 * `off: undefined` and an omitted `off` are deliberately different: the
 * first means "clear the prop", the second means "write `false`". Collapsing
 * them puts `leftSlot={false}` into the props a component receives and into
 * the generated JSX, where it does not type-check.
 *
 * Lives here rather than inline in `ControlPanel` so it can be tested
 * without rendering.
 */
export function toggleValues(control: { on?: unknown; off?: unknown }): {
    on: unknown
    off: unknown
} {
    return {
        on: 'on' in control ? control.on : true,
        off: 'off' in control ? control.off : false,
    }
}

/** Numeric presets, for props with no natural enumeration. */
export function numberOptions(
    values: readonly number[],
    suffix = ''
): readonly Option<number>[] {
    return values.map((value) => ({
        label: `${value}${suffix}`,
        value,
        code: String(value),
    }))
}
