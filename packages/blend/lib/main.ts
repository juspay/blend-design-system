import { patchResizeObserver } from './pollyfills/resizeObserverPollyfill'

patchResizeObserver()

// ---------------------------------------------------------------------------
// Core exports
// ---------------------------------------------------------------------------
export * from './context'
export * from './tokens'
export { FOUNDATION_THEME } from './tokens'
export type { FoundationTokenType } from './tokens/theme.token'
export { Theme } from './context'

// ---------------------------------------------------------------------------
// V1 components
// ---------------------------------------------------------------------------
export * from './components/Accordion'
export * from './components/Alert'
export * from './components/Avatar'
export * from './components/AvatarGroup'
export * from './components/Badge'
export * from './components/Breadcrumb'
export * from './components/Button'
export * from './components/ButtonGroup'
export * from './components/Card'
export * from './components/Charts'
export * from './components/ChatInput'
export * from './components/Checkbox'
export * from './components/CodeBlock'
export * from './components/CodeEditor'
export * from './components/DataTable'
export * from './components/DateRangePicker'
export * from './components/Directory'
export * from './components/Drawer'
export * from './components/Inputs'
export * from './components/KeyValuePair'
export * from './components/Menu'
export * from './components/Modal'
export * from './components/MultiSelect'
export * from './components/Popover'
export * from './components/ProgressBar'
export * from './components/Radio'
export * from './components/Sidebar'
export * from './components/Skeleton'
export * from './components/SingleSelect'
export * from './components/Slider'
export * from './components/Snackbar'
export * from './components/SplitTag'
export * from './components/StatCard'
export * from './components/Stepper'
export * from './components/Switch'
export * from './components/Tabs'
export * from './components/Tags'
export * from './components/Tooltip'
export * from './components/Upload'
export * from './components/VirtualList'

// ---------------------------------------------------------------------------
// V2 components (namespaced to avoid conflicts with V1)
// ---------------------------------------------------------------------------
export * from './components/ButtonV2'
export * from './components/AlertV2'
export * from './components/TagV2'
export * from './components/SelectorV2/CheckboxV2'
export * from './components/SelectorV2/RadioV2'
export * from './components/SelectorV2/SwitchV2'
export * from './components/BreadcrumbV2'
export * from './components/AvatarV2'
export * from './components/TooltipV2'
export * from './components/ProgressBarV2'
export * from './components/StatCardV2'
export * from './components/CardV2'
export * from './components/AccordionV2'
export * from './components/InputsV2/TextInputV2'
export * from './components/InputsV2/TextAreaV2'
export * from './components/DrawerV2'
export * from './components/TabsV2'
export * from './components/ChartsV2'
export * from './components/ChartsV3'
export * from './components/ButtonV2/ButtonGroupV2'
export * from './components/common/TruncatedTextWithTooltipV2'
export * from './components/PopoverV2'
export * from './components/ModalV2'
export * from './components/SidebarV2'
export * from './components/StepperV2'
export * from './components/TagGroupV2'
export * from './components/Timeline'
export * from './components/TopbarV2'
export * from './components/SelectV2'
export * from './components/InputsV2/MultiValueInputV2'
export * from './components/InputsV2/NumberInputV2'
export * from './components/InputsV2/OTPInputV2'
export * from './components/InputsV2/SearchInputV2'
export { UploadV2 } from './components/InputsV2/UploadV2'
export {
    UploadState as UploadV2State,
    UploadDragState as UploadV2DragState,
    UploadErrorReason,
} from './components/InputsV2/UploadV2'
export type {
    UploadV2Props,
    UploadFileV2,
    UploadErrorReasonValue,
    UploadV2TokensType,
    ResponsiveUploadV2Tokens,
} from './components/InputsV2/UploadV2'
export * from './components/SnackbarV2'
export * from './components/CodeEditorV2'
export * from './components/KeyValuePairV2'
export * from './components/MenuV2'
export * from './components/MultiSelectV2'
export * from './components/SingleSelectV2'
export * from './components/InputsV2/ChatInputV2'
