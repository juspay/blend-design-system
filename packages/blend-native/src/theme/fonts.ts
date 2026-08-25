import { FOUNDATION_THEME } from '@juspay/blend-design-system/node'

/**
 * Font-family policy.
 *
 * Web never applies Blend's font tokens — components inherit whatever face the
 * host document loads (`fontFamily: 'inherit'` in the primitives), and the
 * consuming app supplies InterDisplay via `@font-face`. React Native has no
 * inheritance and no `@font-face`, so the provider is the inheritance
 * mechanism: it resolves one family per role and `Text` applies it.
 *
 * Defaults come from the foundation tokens (`font.family`), so out of the box
 * native asks for the same faces the design system names. A consumer that has
 * not loaded those fonts sees the platform fallback (plus a dev warning on
 * iOS) — load them with `expo-font` or native assets, or opt out:
 *
 * - `fontFamily="system"` — platform fonts everywhere, no families applied.
 * - `fontFamily={{ mono: 'JetBrainsMono' }}` — override one role, keep the
 *   token defaults for the rest.
 * - `fontFamily={{ body: null }}` — disable one role only.
 *
 * Kept as a leaf module with no `react-native` value import so it stays
 * testable under plain vitest — the same constraint as `theme/breakpoint.ts`.
 */

export type NativeFontRole = 'display' | 'body' | 'heading' | 'mono'

/** One resolved family per role; `null` means "leave the platform font". */
export type NativeFontFamilies = Record<NativeFontRole, string | null>

/** What `BlendNativeProvider` accepts for its `fontFamily` prop. */
export type NativeFontFamilyOption =
    | 'system'
    | Partial<Record<NativeFontRole, string | null>>

const ROLES: NativeFontRole[] = ['display', 'body', 'heading', 'mono']

/**
 * Resolve the provider's `fontFamily` option against the active foundation
 * tokens. Pure; called once per provider render.
 */
export function resolveFontFamilies(
    foundationTokens: typeof FOUNDATION_THEME = FOUNDATION_THEME,
    option?: NativeFontFamilyOption
): NativeFontFamilies {
    const resolved = {} as NativeFontFamilies

    for (const role of ROLES) {
        if (option === 'system') {
            resolved[role] = null
            continue
        }
        const override = option?.[role]
        if (override !== undefined) {
            resolved[role] = override
            continue
        }
        const token = foundationTokens.font?.family?.[role]
        resolved[role] = token !== undefined ? String(token) : null
    }

    return resolved
}
