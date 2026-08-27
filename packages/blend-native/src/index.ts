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
export { Accordion, AccordionItem } from './components/Accordion'
export type {
    AccordionNativeProps,
    AccordionItemNativeProps,
} from './components/Accordion'
export { Alert } from './components/Alert'
export { Avatar } from './components/Avatar'
export type { AvatarNativeProps, AvatarStatus } from './components/Avatar'
export { Button } from './components/Button'
export { ButtonGroup } from './components/Button'
export { IconButton } from './components/Button'
export { LinkButton } from './components/Button'
export { Card } from './components/Card'
export { Checkbox } from './components/Checkbox'
export type { CheckboxNativeProps } from './components/Checkbox'
export type { CardNativeProps } from './components/Card'
export { KeyValuePair } from './components/KeyValuePair'
export type {
    KeyValuePairNativeProps,
    KeyValuePairOrientation,
    KeyValuePairTextOverflow,
} from './components/KeyValuePair'
export { Tag } from './components/Tag'
export { TagGroup } from './components/Tag'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
export type {
    TabsNativeProps,
    TabsListNativeProps,
    TabsTriggerNativeProps,
    TabsContentNativeProps,
} from './components/Tabs'
export { TextArea } from './components/TextArea'
export type { TextAreaNativeProps } from './components/TextArea'
export { TextInput } from './components/TextInput'
export type {
    TextInputNativeProps,
    TextInputSlot,
} from './components/TextInput'
export { Switch } from './components/Switch'
export type { SwitchNativeProps } from './components/Switch'
export { SearchInput } from './components/SearchInput'
export type { SearchInputNativeProps } from './components/SearchInput'
export { Skeleton } from './components/Skeleton'
export type { SkeletonNativeProps } from './components/Skeleton'
export { NumberInput } from './components/NumberInput'
export type { NumberInputNativeProps } from './components/NumberInput'
export { Radio } from './components/Radio'
export type { RadioNativeProps } from './components/Radio'
export { ProgressBar } from './components/ProgressBar'
export type { ProgressBarNativeProps } from './components/ProgressBar'
export { Spinner } from './components/Spinner'
export type { SpinnerNativeProps } from './components/Spinner'

// Value unions for the props above. Exported so a consumer can type a
// `variant`/`size` prop of their own, and so tooling can enumerate the
// options; they are string unions on the web side, not enums, so there is
// no runtime object to re-export.
export type {
    SkeletonVariant,
    SkeletonShape,
    SpinnerSize,
    SpinnerColor,
} from '@juspay/blend-design-system/node'

export type {
    AlertNativeProps,
    AlertSlot,
    AlertAction,
    AlertActions,
    AlertCloseButton,
} from './components/Alert'
export type {
    ButtonNativeProps,
    ButtonGroupNativeProps,
    IconButtonNativeProps,
    LinkButtonNativeProps,
} from './components/Button'
export type {
    TagNativeProps,
    TagGroupNativeProps,
    TagSlot,
} from './components/Tag'

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

// The toast host: the provider mounts the outlet, this pair drives it;
// `addSnackbar` layers the SNACKBARV2 token styling on top.
export { showToast, dismissToast } from './overlay/toast/toastStore'
export type { ToastOptions } from './overlay/toast/toastStore'
export { addSnackbar, dismissSnackbar } from './components/Snackbar'
export type { SnackbarOptions, SnackbarAction } from './components/Snackbar'

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
    AccordionV2Type as AccordionType,
    AccordionV2ChevronPosition as AccordionChevronPosition,
    AlertV2Type as AlertType,
    AvatarV2Size as AvatarSize,
    AvatarV2Shape as AvatarShape,
    AvatarV2Status as AvatarStatusType,
    AvatarV2StatusPosition as AvatarStatusPosition,
    AlertV2SubType as AlertSubType,
    AlertV2ActionPosition as AlertActionPosition,
    ButtonV2Type as ButtonType,
    ButtonV2Size as ButtonSize,
    ButtonV2SubType as ButtonSubType,
    ButtonV2State as ButtonState,
    CardV2Variant as CardVariant,
    CardV2Orientation as CardOrientation,
    CardV2Padding as CardPadding,
    SelectorV2Size as SelectorSize,
    TabsV2Variant as TabsVariant,
    TabsV2Size as TabsSize,
    CheckboxV2CheckedState as CheckboxCheckedState,
    InputSizeV2 as InputSize,
    KeyValuePairV2Size as KeyValuePairSize,
    InputStateV2 as InputState,
    NumberInputV2Direction as NumberInputDirection,
    ProgressBarV2Size as ProgressBarSize,
    SnackbarV2Variant as SnackbarVariant,
    ProgressBarV2Variant as ProgressBarVariant,
    ProgressBarV2Appearance as ProgressBarAppearance,
    TagV2Type as TagType,
    TagV2Size as TagSize,
    TagV2SubType as TagSubType,
    TagV2Color as TagColor,
    Theme,
} from '@juspay/blend-design-system/node'
