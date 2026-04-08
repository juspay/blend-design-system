import { patchResizeObserver } from './pollyfills/resizeObserverPollyfill'

patchResizeObserver()

export * from './components/Button'
export * from './components/ButtonGroup'
export * from './components/Tabs'
export * from './components/SplitTag'
export * from './components/Alert'
export * from './components/Tags'
export * from './components/Breadcrumb'
export * from './components/Avatar'
export * from './components/AvatarGroup'
export * from './components/Modal'
export * from './components/Tooltip'
export * from './components/Accordion'
export * from './components/Snackbar'
export * from './components/Popover'
export * from './components/Checkbox'
export * from './components/Radio'
export * from './components/Switch'
export * from './components/Snackbar'
export * from './components/Charts'
export * from './components/DateRangePicker'
export * from './components/StatCard'
export * from './components/Card'
export * from './components/Inputs'
export * from './components/Menu'
export * from './components/DataTable'
export * from './components/Sidebar'
export * from './components/Directory'
export * from './components/MultiSelect'
export * from './components/SingleSelect'
export * from './components/Slider'
export * from './components/ProgressBar'
export * from './components/Drawer'
export * from './components/Stepper'
export * from './components/Skeleton'
export * from './components/KeyValuePair'
export * from './components/VirtualList'
export * from './components/Upload'
export * from './components/ChatInput'
export * from './components/CodeBlock'
export * from './components/CodeEditor'

export * from './components/ButtonGroup'
export * from './components/Button'

export * from './context'
export * from './tokens'

//V2 Components

export * from './components/ChartsV2'
export * from './components/Timeline'
export * from './components/AlertV2'
export * from './components/PopoverV2'

// ---------------------------------------------------------------------------
// Token Factory Exports (for Token Studio engine)
// ---------------------------------------------------------------------------
// These functions are the bridge between foundation tokens and component tokens.
// The token engine calls them with a brand-modified FoundationTokenType to produce
// branded component tokens for every V2 component.

export { getButtonV2Tokens } from './components/ButtonV2/buttonV2.tokens'
export { getAccordionV2Tokens } from './components/AccordionV2/accordionV2.tokens'
export { getAlertV2Tokens } from './components/AlertV2/alertV2.tokens'
export { getAvatarV2Tokens } from './components/AvatarV2/avatarV2.tokens'
export { getBreadcrumbV2Tokens } from './components/BreadcrumbV2/breadcrumbV2.tokens'
export { getChartV2Tokens } from './components/ChartsV2/chartV2.tokens'
export { getCheckboxV2Tokens } from './components/SelectorV2/CheckboxV2/checkboxV2.tokens'
export { getCodeEditorV2Tokens } from './components/CodeEditorV2/codeEditorV2.tokens'
export { getKeyValuePairV2Tokens } from './components/KeyValuePairV2/keyValuePairV2.tokens'
export { getMenuV2Tokens } from './components/MenuV2/menuV2.tokens'
export { getMultiSelectV2Tokens } from './components/MultiSelectV2/multiSelectV2.tokens'
export { getPopoverV2Tokens } from './components/PopoverV2/popoverV2.token'
export { getProgressBarV2Tokens } from './components/ProgressBarV2/progressBarV2.tokens'
export { getRadioV2Tokens } from './components/SelectorV2/RadioV2/radioV2.tokens'
export { getSingleSelectV2Tokens } from './components/SingleSelectV2/singleSelectV2.tokens'
export { getSwitchV2Tokens } from './components/SelectorV2/SwitchV2/switchV2.tokens'
export { getSnackbarV2Tokens } from './components/SnackbarV2/snackbarV2.tokens'
export { getStatCardV2Tokens } from './components/StatCardV2/statcardV2.tokens'
export { getTabsV2Tokens } from './components/TabsV2/tabsV2.tokens'
export { getTagV2Tokens } from './components/TagV2/tagV2.tokens'
export { getTextInputV2Tokens } from './components/InputsV2/TextInputV2/TextInputV2.tokens'
export { getTimelineTokens } from './components/Timeline/timeline.token'
export { getTooltipV2Tokens } from './components/TooltipV2/tooltipV2.tokens'

// Foundation token type export (for token engine)
export type { FoundationTokenType } from './tokens/theme.token'
