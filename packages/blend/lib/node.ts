/**
 * Node-safe entrypoint for non-UI consumers (CLI / token-engine).
 *
 * This entry intentionally avoids importing any CSS or runtime UI code.
 * Consumers that need styles should import `@juspay/blend-design-system/style.css`.
 */

export { Theme } from './context/theme.enum'

export { default as FOUNDATION_THEME } from './tokens/theme.token'
export type { FoundationTokenType } from './tokens/theme.token'

// Breakpoint shape and thresholds — needed by native consumers to index
// responsive tokens and to resolve the active breakpoint themselves.
export type { BreakpointType } from './breakpoints/breakPoints'
export { BREAKPOINTS } from './breakpoints/breakPoints'

// Deep-merge for component token overrides. Native (`@juspay/blend-native`)
// resolves tokens outside React and must apply overrides with exactly the
// same semantics as `ThemeProvider` does on web. Imported from the leaf
// module, not `initComponentTokens`, which barrel-imports React components.
export { mergeTokenTree } from './context/mergeTokenTree'

export { getButtonV2Tokens } from './components/ButtonV2/buttonV2.tokens'
export type {
    ButtonV2TokensType,
    ResponsiveButtonV2Tokens,
} from './components/ButtonV2/buttonV2.tokens'
export { getAccordionV2Tokens } from './components/AccordionV2/accordionV2.tokens'
export type {
    AccordionV2TokensType,
    ResponsiveAccordionV2Tokens,
    AccordionV2State,
} from './components/AccordionV2/accordionV2.tokens.types'
export { getAlertV2Tokens } from './components/AlertV2/alertV2.tokens'
export type {
    AlertV2TokensType,
    ResponsiveAlertV2Tokens,
} from './components/AlertV2/alertV2.tokens'
export { getAvatarV2Tokens } from './components/AvatarV2/avatarV2.tokens'
export type {
    AvatarV2TokensType,
    ResponsiveAvatarV2Tokens,
} from './components/AvatarV2/avatarV2.tokens'
// Pure string/hash helpers shared with the native Avatar — exporting them
// beats duplicating the fallback-color palette. No React, no DOM at runtime.
export {
    getInitialsFromText,
    getColorFromText,
    DEFAULT_FALLBACK_COLOR,
} from './components/AvatarV2/avatarV2.utils'
export { getBreadcrumbV2Tokens } from './components/BreadcrumbV2/breadcrumbV2.tokens'
export { getCardV2Tokens } from './components/CardV2/cardV2.tokens'
export type {
    CardV2TokensType,
    ResponsiveCardV2Tokens,
} from './components/CardV2/cardV2.tokens'
export { getChartV2Tokens } from './components/ChartsV2/chartV2.tokens'
export { getCheckboxV2Tokens } from './components/SelectorV2/CheckboxV2/checkboxV2.tokens'
export type {
    CheckboxV2TokensType,
    ResponsiveCheckboxV2Tokens,
} from './components/SelectorV2/CheckboxV2/checkboxV2.tokens.types'
export { getCodeEditorV2Tokens } from './components/CodeEditorV2/codeEditorV2.tokens'
export { getKeyValuePairV2Tokens } from './components/KeyValuePairV2/keyValuePairV2.tokens'
export type {
    KeyValuePairV2TokensType,
    ResponsiveKeyValuePairV2Tokens,
} from './components/KeyValuePairV2/keyValuePairV2.tokens.types'
export { getMenuV2Tokens } from './components/MenuV2/menuV2.tokens'
export type {
    MenuV2TokensType,
    ResponsiveMenuV2TokensType,
} from './components/MenuV2/menuV2.tokens.types'
export {
    MenuV2Alignment,
    MenuV2Side,
    MenuV2ItemVariant,
    MenuV2ItemActionType,
} from './components/MenuV2/menuV2.types'
export type {
    MenuV2ItemType,
    MenuV2GroupType,
    MenuV2ItemLabel,
    MenuV2Props,
} from './components/MenuV2/menuV2.types'
export type { MenuV2SearchSortFn } from './components/MenuV2/menuV2.types'
export type { MenuV2FlatRow } from './components/MenuV2/menuV2.utils'
export {
    defaultSearchSortFn,
    filterMenuV2Groups,
    flattenMenuV2Groups,
} from './components/MenuV2/menuV2.utils'

export { getModalV2Tokens } from './components/ModalV2/modalV2.tokens'
export type { ModalV2TokensType } from './components/ModalV2/modalV2.tokens.types'
export type { ModalBaseProps } from './components/ModalV2/modalV2.base.types'

export { getMultiSelectV2Tokens } from './components/MultiSelectV2/multiSelectV2.tokens'
export type {
    MultiSelectV2TokensType,
    ResponsiveMultiSelectV2Tokens,
} from './components/MultiSelectV2/multiSelectV2.tokens.types'
export { MultiSelectV2SelectionTagType } from './components/MultiSelectV2/multiSelectV2.types'
export type {
    MultiSelectV2ItemType,
    MultiSelectV2GroupType,
    MultiSelectV2Props,
} from './components/MultiSelectV2/multiSelectV2.types'
export { getPopoverV2Tokens } from './components/PopoverV2/popoverV2.token'
export type { PopoverV2TokenType } from './components/PopoverV2/popoverV2.tokens.types'
export {
    PopoverV2Size,
    PopoverV2Side,
    PopoverV2Align,
} from './components/PopoverV2/popoverV2.base.types'
export type { PopoverBaseProps } from './components/PopoverV2/popoverV2.base.types'
export { getProgressBarV2Tokens } from './components/ProgressBarV2/progressBarV2.tokens'
export type {
    ProgressBarV2TokenType,
    ResponsiveProgressBarV2Tokens,
} from './components/ProgressBarV2/progressBarV2.tokens.types'
export { getSpinnerTokens } from './components/Spinner/spinner.tokens'
export type {
    SpinnerTokensType,
    ResponsiveSpinnerTokens,
    SpinnerSize,
    SpinnerColor,
} from './components/Spinner/spinner.tokens.types'
export { getEmptyStateTokens } from './components/EmptyState/emptyState.tokens'
export { getRadioV2Tokens } from './components/SelectorV2/RadioV2/radioV2.tokens'
export type {
    RadioV2TokensType,
    ResponsiveRadioV2Tokens,
    RadioV2IndicatorState,
} from './components/SelectorV2/RadioV2/radioV2.tokens.types'
export { getSingleSelectV2Tokens } from './components/SingleSelectV2/singleSelectV2.tokens'
export type {
    SingleSelectV2TokensType,
    ResponsiveSingleSelectV2Tokens,
    SingleSelectV2MenuItemTokensType,
} from './components/SingleSelectV2/singleSelectV2.tokens.types'
export type {
    SingleSelectV2ItemType,
    SingleSelectV2GroupType,
    SingleSelectV2Props,
    SelectV2MenuDimensions,
    SelectV2TriggerDimensions,
    SelectV2MenuPosition,
    SelectV2ErrorState,
    SelectV2SearchConfig,
} from './components/SingleSelectV2/singleSelectV2.types'
export { getSwitchV2Tokens } from './components/SelectorV2/SwitchV2/switchV2.tokens'
export type {
    SwitchV2TokensType,
    ResponsiveSwitchV2Tokens,
    SwitchV2Variant,
} from './components/SelectorV2/SwitchV2/switchV2.tokens.types'
export { getSnackbarV2Tokens } from './components/SnackbarV2/snackbarV2.tokens'
export type {
    SnackbarV2TokensType,
    ResponsiveSnackbarV2Tokens,
} from './components/SnackbarV2/snackbarV2.tokens.types'
export { getStatCardV2Tokens } from './components/StatCardV2/statcardV2.tokens'
export { getTabsV2Tokens } from './components/TabsV2/tabsV2.tokens'
export type {
    TabsV2TokensType,
    ResponsiveTabsV2Tokens,
} from './components/TabsV2/tabsV2.tokens.types'
export { getTagV2Tokens } from './components/TagV2/tagV2.tokens'
export type {
    TagV2TokensType,
    ResponsiveTagV2Tokens,
} from './components/TagV2/tagV2.tokens'
export { getTextAreaV2Tokens } from './components/InputsV2/TextAreaV2/TextAreaV2.tokens'
export type {
    TextAreaV2TokensType,
    ResponsiveTextAreaV2Tokens,
} from './components/InputsV2/TextAreaV2/TextAreaV2.tokens.types'
export { getNumberInputV2Tokens } from './components/InputsV2/NumberInputV2/numberInputV2.tokens'
export type {
    NumberInputV2TokensType,
    ResponsiveNumberInputV2Tokens,
} from './components/InputsV2/NumberInputV2/numberInputV2.tokens.types'
export { getSearchInputV2Tokens } from './components/InputsV2/SearchInputV2/SearchInputV2.tokens'
export type {
    SearchInputV2TokensType,
    ResponsiveSearchInputV2Tokens,
} from './components/InputsV2/SearchInputV2/SearchInputV2.tokens.types'
export { getOTPInputV2Tokens } from './components/InputsV2/OTPInputV2/OTPInputV2.tokens'
export type {
    OTPInputV2TokensType,
    ResponsiveOTPInputV2Tokens,
} from './components/InputsV2/OTPInputV2/OTPInputV2.tokens.types'
export type {
    InputLabelsV2Tokens,
    InputFooterV2Tokens,
    FloatingLabelsV2Tokens,
} from './components/InputsV2/inputV2.tokens'
export { getTextInputV2Tokens } from './components/InputsV2/TextInputV2/TextInputV2.tokens'
export type {
    TextInputV2TokensType,
    ResponsiveTextInputV2Tokens,
} from './components/InputsV2/TextInputV2/TextInputV2.tokens.types'
export { getUploadV2Tokens } from './components/InputsV2/UploadV2/UploadV2.tokens'

export { getSkeletonTokens } from './components/Skeleton/skeleton.tokens'
export type {
    SkeletonTokensType,
    ResponsiveSkeletonTokens,
    SkeletonVariant,
    SkeletonShape,
} from './components/Skeleton/skeleton.tokens.types'
export { getTimelineTokens } from './components/Timeline/timeline.token'
export { getTopbarTokens } from './components/Topbar/topbar.tokens'
export { getSidebarTokens } from './components/Sidebar/sidebar.tokens'
export { getMobileNavigationTokens } from './components/Sidebar/SidebarMobile/mobile.tokens'
export { getTooltipV2Tokens } from './components/TooltipV2/tooltipV2.tokens'
export type { TooltipV2TokensType } from './components/TooltipV2/tooltipV2.tokens.types'
export {
    TooltipV2Side,
    TooltipV2Align,
    TooltipV2Size,
    TooltipV2SlotDirection,
} from './components/TooltipV2/tooltipV2.types'
export type { TooltipBaseProps } from './components/TooltipV2/tooltipV2.types'
export { getTimePickerTokens } from './components/TimePicker/timePicker.tokens'
export { getCalendarToken } from './components/DateRangePicker/dateRangePicker.tokens'

// Component enums and base prop types — needed by react-native consumers
// (`@juspay/blend-native`) that re-use the web token system via this entry.
// These are pure string constants / type-only exports, so they add zero
// runtime weight and no new dependencies.
export {
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2State,
    PaddingDirection,
} from './components/ButtonV2/buttonV2.types'
export type { ButtonBaseProps } from './components/ButtonV2/buttonV2.types'

export {
    AlertV2Type,
    AlertV2SubType,
    AlertV2ActionPosition,
    AlertV2PaddingDirection,
} from './components/AlertV2/alertV2.types'
export type { AlertBaseProps } from './components/AlertV2/alertV2.types'

export {
    TagV2Type,
    TagV2Size,
    TagV2SubType,
    TagV2Color,
    TagV2PaddingDirection,
} from './components/TagV2/TagV2.types'
export type { TagBaseProps } from './components/TagV2/TagV2.types'

export { InputSizeV2, InputStateV2 } from './components/InputsV2/inputV2.types'
export type { TextInputBaseProps } from './components/InputsV2/TextInputV2/TextInputV2.types'

export {
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition,
} from './components/AvatarV2/avatarV2.types'

export {
    ProgressBarV2Size,
    ProgressBarV2Variant,
    ProgressBarV2Appearance,
} from './components/ProgressBarV2/progressBarV2.tokens.types'

// KeyValuePairV2StateType is deliberately NOT exported: it is a numeric enum
// (vertical = 0, horizontal = 1); native models orientation as the
// 'vertical' | 'horizontal' string union its token keys already use.
export { KeyValuePairV2Size } from './components/KeyValuePairV2/keyValuePairV2.types'

export {
    CardV2Variant,
    CardV2Orientation,
    CardV2Padding,
} from './components/CardV2/cardV2.types'

// SnackbarV2Position is deliberately NOT exported: the native snackbar is a
// bottom-only stack (documented divergence).
export { SnackbarV2Variant } from './components/SnackbarV2/snackbarV2.types'

export {
    SelectorV2Size,
    SelectorV2InteractionState,
} from './components/SelectorV2/selectorV2.types'
export { CheckboxV2CheckedState } from './components/SelectorV2/CheckboxV2/checkboxV2.tokens.types'
export type { CheckboxBaseProps } from './components/SelectorV2/CheckboxV2/checkboxV2.types'
export type { RadioBaseProps } from './components/SelectorV2/RadioV2/radioV2.types'
export type { SwitchBaseProps } from './components/SelectorV2/SwitchV2/switchV2.types'

export { TabsV2Variant, TabsV2Size } from './components/TabsV2/tabsV2.types'
export type {
    TabsBaseProps,
    TabsV2State,
} from './components/TabsV2/tabsV2.types'

export {
    AccordionV2Type,
    AccordionV2ChevronPosition,
} from './components/AccordionV2/accordionV2.types'
export type {
    AccordionBaseProps,
    AccordionItemBaseProps,
} from './components/AccordionV2/accordionV2.types'

export { NumberInputV2Direction } from './components/InputsV2/NumberInputV2/numberInputV2.types'
export type { NumberInputBaseProps } from './components/InputsV2/NumberInputV2/numberInputV2.types'
export type { TextAreaBaseProps } from './components/InputsV2/TextAreaV2/TextAreaV2.types'
export type { SearchInputBaseProps } from './components/InputsV2/SearchInputV2/SearchInputV2.types'
export type { OTPInputBaseProps } from './components/InputsV2/OTPInputV2/OTPInputV2.types'

// SelectV2 shared enums and base types — shared by SingleSelectV2 and
// MultiSelectV2. Native re-uses the same enums (re-exported with cleaner
// names without the "V2" suffix from its own barrel).
export {
    SelectV2Alignment,
    SelectV2Variant,
    SelectV2Size,
    SelectV2Side,
} from './components/SelectV2/selectV2.shared.types'
export type {
    SelectV2BaseItemType,
    SelectV2FlattenedItemBase,
    SelectV2SkeletonProps,
} from './components/SelectV2/selectV2.shared.types'
export type {
    SelectV2ItemStates,
    SelectV2TriggerStates,
} from './components/SelectV2/selectV2.tokenStates'

// Pure selection math for multi-select — no React, no DOM. Shared between
// web and native so the cap/scope semantics cannot drift.
export {
    getNextSelectionAfterToggle,
    getNextSelectionForScope,
    isBlockedByMaxSelections,
    clampScopeToMaxSelections,
    emitLegacyScopeChanges,
} from './components/shared/multiSelectSelection'
