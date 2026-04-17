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

export * from './context'
export * from './tokens'

//V2 Components - Namespaced to avoid conflicts with V1
export {
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2State,
} from './components/ButtonV2'
export {
    AlertV2,
    AlertV2Type,
    AlertV2SubType,
    AlertV2ActionPosition,
} from './components/AlertV2'
export { TagV2, TagV2Color, TagV2Size, TagV2Type } from './components/TagV2'
export {
    CheckboxV2,
    type CheckboxV2Props,
} from './components/SelectorV2/CheckboxV2'
export { RadioV2, type RadioV2Props } from './components/SelectorV2/RadioV2'
export { SwitchV2, type SwitchV2Props } from './components/SelectorV2/SwitchV2'
export { BreadcrumbV2 } from './components/BreadcrumbV2'
export {
    AvatarV2,
    AvatarV2Size,
    type AvatarV2Props,
} from './components/AvatarV2'
export { TooltipV2, type TooltipV2Props } from './components/TooltipV2'
export {
    ProgressBarV2,
    type ProgressBarV2Props,
} from './components/ProgressBarV2'
export {
    StatCardV2,
    StatCardV2ChangeType,
    StatCardV2ArrowDirection,
    type StatCardV2Props,
} from './components/StatCardV2'
export { AccordionV2, AccordionV2Item } from './components/AccordionV2'
export {
    TextInputV2,
    type TextInputV2Props,
} from './components/InputsV2/TextInputV2'
export {
    DrawerV2,
    DrawerV2Body,
    DrawerV2Close,
    DrawerV2Content,
    DrawerV2Description,
    DrawerV2Footer,
    DrawerV2Header,
    DrawerV2NestedRoot,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
    DrawerV2Trigger,
    type DrawerV2RootProps,
    type DrawerV2RootRef,
    type DrawerV2TriggerProps,
    type DrawerV2TriggerRef,
    type DrawerV2ContentProps,
    type DrawerV2ContentRef,
    type DrawerV2OverlayProps,
    type DrawerV2OverlayRef,
    type DrawerV2PortalProps,
    type DrawerV2PortalRef,
    type DrawerV2TitleProps,
    type DrawerV2TitleRef,
    type DrawerV2DescriptionProps,
    type DrawerV2DescriptionRef,
    type DrawerV2CloseProps,
    type DrawerV2CloseRef,
    type DrawerV2HeaderProps,
    type DrawerV2HeaderRef,
    type DrawerV2BodyProps,
    type DrawerV2BodyRef,
    type DrawerV2FooterProps,
    type DrawerV2FooterRef,
    type DrawerV2NestedRootProps,
    type DrawerV2NestedRootRef,
} from './components/DrawerV2'
export {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
    TabsV2Variant,
    TabsV2Size,
} from './components/TabsV2'

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
export { getTopbarTokens } from './components/Topbar/topbar.tokens'
export { getSidebarTokens } from './components/Sidebar/sidebar.tokens'
export { getMobileNavigationTokens } from './components/Sidebar/SidebarMobile/mobile.tokens'

// Foundation token type export (for token engine)
export { default as FOUNDATION_THEME } from './tokens/theme.token'
export type { FoundationTokenType } from './tokens/theme.token'
export { Theme } from './context/theme.enum'
