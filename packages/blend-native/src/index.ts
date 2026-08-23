/**
 * @juspay/blend-native — React Native components for Blend Design System.
 *
 * Consumes Blend's token system via the React-free
 * `@juspay/blend-design-system/node` entry and translates CSS-string token
 * values into RN style objects (see `./adapters`).
 *
 * No `styled-components`, no DOM, no `window.addEventListener`.
 */

// ---- Components ---------------------------------------------------------
export { Button } from './components/Button'
export { Tag } from './components/Tag'

export type { ButtonNativeProps } from './components/Button'
export type { TagNativeProps, TagSlot } from './components/Tag'

// ---- Theming ------------------------------------------------------------
export {
    BlendNativeProvider,
    BlendNativeThemeContext,
    DEFAULT_NATIVE_THEME,
} from './theme/BlendNativeProvider'
export type {
    BlendNativeProviderProps,
    BlendNativeThemeValue,
} from './theme/BlendNativeProvider'

export { useNativeTokens } from './theme/useNativeTokens'
export {
    useNativeBreakpoint,
    resolveBreakpoint,
} from './theme/useNativeBreakpoint'
export type { NativeBreakpoint } from './theme/useNativeBreakpoint'
export {
    NATIVE_TOKEN_REGISTRY,
    NATIVE_TOKEN_SLOTS,
    isNativeTokenSlot,
} from './theme/nativeTokenRegistry'
export type {
    NativeTokenSlot,
    NativeComponentTokenOverrides,
} from './theme/nativeTokenRegistry'

// ---- Primitives ---------------------------------------------------------
// Exported so consumers can compose token-driven surfaces of their own.
export { Block } from './primitives/Block'
export { Pressable } from './primitives/Pressable'
export { Text } from './primitives/Text'
export { Slot, tintSlot } from './primitives/Slot'
export { MIN_TOUCH_TARGET, resolveHitSlop } from './primitives/touchTarget'
export type { HitSlop } from './primitives/touchTarget'

// ---- Adapters -----------------------------------------------------------
export {
    parseDimension,
    parseSize,
    parseBorder,
    parseBorderRadius,
    parseBoxShadow,
    parseBackground,
} from './adapters/cssStringAdapter'
export type { ParsedBackground, RNSize } from './adapters/cssStringAdapter'
export { resolveSurfaceStyle, resolveBackground } from './adapters/surfaceStyle'
export {
    getGroupedBorderRadius,
    getGroupedBorderWidths,
} from './components/shared/group'
export type { GroupPosition } from './components/shared/group'
export type { SurfaceStyleProps } from './adapters/surfaceStyle'

// ---- Enums --------------------------------------------------------------
// Re-exported with cleaner native names (no "V2" suffix). The underlying
// values are the same string constants, so they are interchangeable with the
// web enums at runtime.
export {
    ButtonV2Type as ButtonType,
    ButtonV2Size as ButtonSize,
    ButtonV2SubType as ButtonSubType,
    ButtonV2State as ButtonState,
    TagV2Type as TagType,
    TagV2Size as TagSize,
    TagV2SubType as TagSubType,
    TagV2Color as TagColor,
    Theme,
} from '@juspay/blend-design-system/node'
