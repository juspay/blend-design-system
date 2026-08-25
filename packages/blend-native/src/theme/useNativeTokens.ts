import { useContext, useMemo } from 'react'
import {
    FOUNDATION_THEME,
    Theme,
    mergeTokenTree,
    type BreakpointType,
} from '@juspay/blend-design-system/node'
import { BlendNativeThemeContext } from './BlendNativeProvider'
import {
    NATIVE_TOKEN_REGISTRY,
    NATIVE_TOKEN_SLOTS,
    isNativeTokenSlot,
    type NativeTokenSlot,
    type TokenFactory,
} from './nativeTokenRegistry'
import { useNativeBreakpoint } from './useNativeBreakpoint'

/**
 * Resolve one component's tokens, flattened for the active breakpoint and
 * with any provider overrides deep-merged in.
 *
 * The native counterpart of web's `useResponsiveTokens('BUTTONV2')`, and
 * deliberately the same call shape so component code reads the same on both
 * platforms.
 *
 * Note `mergeTokenTree` is imported from the web package rather than
 * reimplemented — override semantics (plain objects merge key-by-key,
 * everything else replaces, `undefined` is skipped) must not drift between
 * web and native.
 */

/** Resolution cache, keyed the way web's `initTokens` keys its own. */
const resolutionCache = new WeakMap<
    object,
    Map<string, Record<keyof BreakpointType, unknown>>
>()

function resolveResponsive(
    slot: NativeTokenSlot,
    foundationTokens: typeof FOUNDATION_THEME,
    theme: Theme | string,
    overrides: unknown
): Record<keyof BreakpointType, unknown> {
    let byKey = resolutionCache.get(foundationTokens)
    if (!byKey) {
        byKey = new Map()
        resolutionCache.set(foundationTokens, byKey)
    }

    // Overrides participate in the key by identity — they are expected to be
    // a stable object from the consumer, exactly as on web.
    const hasOverride = overrides !== undefined
    const cacheKey = `${slot}::${String(theme)}::${hasOverride ? 'o' : '-'}`

    if (!hasOverride) {
        const cached = byKey.get(cacheKey)
        if (cached) return cached
    }

    const factory = NATIVE_TOKEN_REGISTRY[slot] as TokenFactory<unknown>
    const responsive = factory(foundationTokens, theme)
    const resolved = (
        hasOverride ? mergeTokenTree(responsive, overrides) : responsive
    ) as Record<keyof BreakpointType, unknown>

    if (!hasOverride) byKey.set(cacheKey, resolved)
    return resolved
}

export function useNativeTokens<T>(slot: NativeTokenSlot): T {
    const { theme, componentTokens, foundationTokens } = useContext(
        BlendNativeThemeContext
    )
    const breakpoint = useNativeBreakpoint()

    if (!isNativeTokenSlot(slot)) {
        throw new Error(
            `[blend-native] Unknown component token slot "${slot}". ` +
                `Known slots: ${NATIVE_TOKEN_SLOTS.join(', ')}. ` +
                `Register new components in src/theme/nativeTokenRegistry.ts.`
        )
    }

    const overrides = componentTokens?.[slot]

    return useMemo(() => {
        const responsive = resolveResponsive(
            slot,
            foundationTokens,
            theme,
            overrides
        )
        return responsive[breakpoint] as T
    }, [slot, foundationTokens, theme, overrides, breakpoint])
}

export default useNativeTokens
