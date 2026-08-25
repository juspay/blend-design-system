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
export { getAlertV2Tokens } from './components/AlertV2/alertV2.tokens'
export type {
    AlertV2TokensType,
    ResponsiveAlertV2Tokens,
} from './components/AlertV2/alertV2.tokens'
export { getAvatarV2Tokens } from './components/AvatarV2/avatarV2.tokens'
export { getBreadcrumbV2Tokens } from './components/BreadcrumbV2/breadcrumbV2.tokens'
export { getChartV2Tokens } from './components/ChartsV2/chartV2.tokens'
export { getCheckboxV2Tokens } from './components/SelectorV2/CheckboxV2/checkboxV2.tokens'
export { getCodeEditorV2Tokens } from './components/CodeEditorV2/codeEditorV2.tokens'
export { getKeyValuePairV2Tokens } from './components/KeyValuePairV2/keyValuePairV2.tokens'
export { getMenuV2Tokens } from './components/MenuV2/menuV2.tokens'
export { getModalV2Tokens } from './components/ModalV2/modalV2.tokens'
export { getMultiSelectV2Tokens } from './components/MultiSelectV2/multiSelectV2.tokens'
export { getPopoverV2Tokens } from './components/PopoverV2/popoverV2.token'
export { getProgressBarV2Tokens } from './components/ProgressBarV2/progressBarV2.tokens'
export { getSpinnerTokens } from './components/Spinner/spinner.tokens'
export { getEmptyStateTokens } from './components/EmptyState/emptyState.tokens'
export { getRadioV2Tokens } from './components/SelectorV2/RadioV2/radioV2.tokens'
export { getSingleSelectV2Tokens } from './components/SingleSelectV2/singleSelectV2.tokens'
export { getSwitchV2Tokens } from './components/SelectorV2/SwitchV2/switchV2.tokens'
export { getSnackbarV2Tokens } from './components/SnackbarV2/snackbarV2.tokens'
export { getStatCardV2Tokens } from './components/StatCardV2/statcardV2.tokens'
export { getTabsV2Tokens } from './components/TabsV2/tabsV2.tokens'
export { getTagV2Tokens } from './components/TagV2/tagV2.tokens'
export type {
    TagV2TokensType,
    ResponsiveTagV2Tokens,
} from './components/TagV2/tagV2.tokens'
export { getTextInputV2Tokens } from './components/InputsV2/TextInputV2/TextInputV2.tokens'
export { getUploadV2Tokens } from './components/InputsV2/UploadV2/UploadV2.tokens'

export { getTimelineTokens } from './components/Timeline/timeline.token'
export { getTopbarTokens } from './components/Topbar/topbar.tokens'
export { getSidebarTokens } from './components/Sidebar/sidebar.tokens'
export { getMobileNavigationTokens } from './components/Sidebar/SidebarMobile/mobile.tokens'
export { getTooltipV2Tokens } from './components/TooltipV2/tooltipV2.tokens'
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

export {
    TagV2Type,
    TagV2Size,
    TagV2SubType,
    TagV2Color,
    TagV2PaddingDirection,
} from './components/TagV2/TagV2.types'
