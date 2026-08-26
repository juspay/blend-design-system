/**
 * blend-native — React Native components for Blend Design System.
 *
 * Consumes Blend's token system via the React-free
 * `@juspay/blend-design-system/node` entry and translates CSS-string token
 * values into RN style objects.
 *
 * No `styled-components`, no DOM, no `window.addEventListener`.
 *
 * ---
 *
 * This barrel is the package's **public API**, and everything named here is a
 * semver commitment. Low-level internals — the CSS-string parsers, the surface
 * resolver, the token registry, the grouped-control helpers — are deliberately
 * NOT exported: they exist to serve the primitives, their shapes will change as
 * more components land, and `Block` / `Pressable` already expose everything a
 * consumer needs to build a token-driven surface of their own.
 */

// ---- Components ---------------------------------------------------------
export { Alert } from './components/Alert'
export { Button } from './components/Button'
export { IconButton } from './components/Button'
export { LinkButton } from './components/Button'
export { Tag } from './components/Tag'
export { TextInput } from './components/TextInput'
export type {
    TextInputNativeProps,
    TextInputSlot,
} from './components/TextInput'
export { Skeleton } from './components/Skeleton'
export type { SkeletonNativeProps } from './components/Skeleton'

export type {
    AlertNativeProps,
    AlertSlot,
    AlertAction,
    AlertActions,
    AlertCloseButton,
} from './components/Alert'
export type {
    ButtonNativeProps,
    IconButtonNativeProps,
    LinkButtonNativeProps,
} from './components/Button'
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

/** Pass `theme={SYSTEM_THEME}` (or `theme="system"`) to follow the OS. */
export { SYSTEM_THEME } from './theme/systemTheme'
export type { NativeThemeSetting } from './theme/systemTheme'
export type {
    NativeFontRole,
    NativeFontFamilies,
    NativeFontFamilyOption,
} from './theme/fonts'

export { useNativeTokens } from './theme/useNativeTokens'
export { useNativeBreakpoint } from './theme/useNativeBreakpoint'
export type { NativeBreakpoint } from './theme/useNativeBreakpoint'
export type {
    NativeTokenSlot,
    NativeComponentTokenOverrides,
} from './theme/nativeTokenRegistry'

// ---- Primitives ---------------------------------------------------------
// Exported so consumers can compose token-driven surfaces of their own.
export { Block } from './primitives/Block'
export { Pressable } from './primitives/Pressable'
export { Text } from './primitives/Text'
export { Slot } from './primitives/Slot'
export { Separator } from './primitives/Separator'
export { PrimitiveInput } from './primitives/PrimitiveInput'
export type { PrimitiveInputProps } from './primitives/PrimitiveInput'

export type { BlockProps } from './primitives/Block'
export type { PrimitivePressableProps } from './primitives/Pressable'
export type { BlendTextProps } from './primitives/Text'
export type { SlotProps } from './primitives/Slot'
export type { SeparatorProps } from './primitives/Separator'
// The shared base both `Block` and `Pressable` accept — needed to type a
// wrapper around either.
export type { SurfaceStyleProps } from './adapters/surfaceStyle'
export type { RNSize } from './adapters/cssStringAdapter'

/**
 * The minimum tap target `Pressable` enforces via `hitSlop`, in points.
 * Exposed so consumers can reason about it; pass `minTouchTarget={0}` to opt
 * a control out.
 */
export { MIN_TOUCH_TARGET } from './primitives/touchTarget'

// ---- Overlay & motion ---------------------------------------------------
// `Portal` renders content into the provider's overlay layer (above the
// app), and `useReduceMotion` mirrors web's prefers-reduced-motion. The
// positioning engine and motion presets stay internal until the overlay
// components stabilise their shapes.
export { Portal } from './overlay/portal'
export type { PortalProps } from './overlay/portal'
export { useReduceMotion } from './motion/useReduceMotion'

// The gesture-driven sheet foundation — DrawerV2 and the phone modes of
// Select/Menu/Modal compose it; also public for consumer-built sheets.
export { BottomSheet } from './overlay/sheet/BottomSheet'
export type { BottomSheetProps } from './overlay/sheet/BottomSheet'

// The toast host: the provider mounts the outlet, this pair drives it.
// SnackbarV2 will layer token styling on top when it lands.
export { showToast, dismissToast } from './overlay/toast/toastStore'
export type { ToastOptions } from './overlay/toast/toastStore'

/** Position of a control within a button or tag group. */
export type { GroupPosition } from './components/shared/group'

// ---- Enums --------------------------------------------------------------
// Re-exported with cleaner native names (no "V2" suffix). The underlying
// values are the same string constants, so they are interchangeable with the
// web enums at runtime.
/**
 * Announce a status message to assistive tech. Exposed for consumers building
 * their own status surfaces; `Alert` uses it internally.
 */
export { useLiveRegionAnnounce } from './a11y/useLiveRegion'

export {
    AlertV2Type as AlertType,
    AlertV2SubType as AlertSubType,
    AlertV2ActionPosition as AlertActionPosition,
    ButtonV2Type as ButtonType,
    ButtonV2Size as ButtonSize,
    ButtonV2SubType as ButtonSubType,
    ButtonV2State as ButtonState,
    InputSizeV2 as InputSize,
    InputStateV2 as InputState,
    TagV2Type as TagType,
    TagV2Size as TagSize,
    TagV2SubType as TagSubType,
    TagV2Color as TagColor,
    Theme,
} from '@juspay/blend-design-system/node'
