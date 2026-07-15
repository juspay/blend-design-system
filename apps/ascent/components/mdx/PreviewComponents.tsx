import React from 'react'
import { PreviewWrapper } from '@/components/features/Documentation'

// Preview factory function - eliminates code duplication
const createPreview = (componentName: string) => () => (
    <PreviewWrapper component={componentName as any} />
)

// Component names for preview generation
const PREVIEW_COMPONENT_NAMES = [
    'Button',
    'Alert',
    'Tag',
    'ButtonGroup',
    'Tabs',
    'SplitTag',
    'Modal',
    'Tooltip',
    'Accordion',
    'Snackbar',
    'Popover',
    'Checkbox',
    'Radio',
    'Switch',
    'SingleSelect',
    'MultiSelect',
    'Menu',
    'StatCard',
    'Chart',
    'Avatar',
    'AvatarGroup',
    'Breadcrumb',
    'DataTable',
    'Drawer',
    'ProgressBar',
    'Sidebar',
    'Slider',
    'TextInput',
    'DropdownInput',
    'MultiValueInput',
    'NumberInput',
    'OTPInput',
    'SearchInput',
    'Textarea',
    'UnitInput',
    'DateRangePicker',
    'CodeBlock',
    'Card',
    'Topbar',
    'Upload',
    'KeyValuePair',
    'Stepper',
    'ChatInput',
    // V2 Components
    'AccordionV2',
    'AlertV2',
    'AvatarV2',
    'Badge',
    'BreadcrumbV2',
    'ChartsV2',
    'CodeEditorV2',
    'DrawerV2',
    'KeyValuePairV2',
    'MenuV2',
    'MultiSelectV2',
    'PopoverV2',
    'ProgressBarV2',
    'SidebarV2',
    'SingleSelectV2',
    'SnackbarV2',
    'StatCardV2',
    'StepperV2',
    'TabsV2',
    'TagV2',
    'TagGroupV2',
    'TooltipV2',
    'TextInputV2',
    'TextAreaV2',
    'NumberInputV2',
    'SearchInputV2',
    'ChatInputV2',
    'OTPInputV2',
    'MultiValueInputV2',
    'ButtonV2',
    'ButtonGroupV2',
    'CardV2',
    'SelectV2',
    'CheckboxV2',
    'RadioV2',
    'SwitchV2',
    'Timeline',
    'TopbarV2',
] as const

// Generate all preview components programmatically
export const PreviewComponents = PREVIEW_COMPONENT_NAMES.reduce(
    (acc, name) => ({
        ...acc,
        [`${name}Preview`]: createPreview(`${name}Preview`),
    }),
    {} as Record<string, React.ComponentType>
)

// Export individual components for backwards compatibility
export const ButtonPreview = PreviewComponents.ButtonPreview
export const AlertPreview = PreviewComponents.AlertPreview
export const TagPreview = PreviewComponents.TagPreview
export const ButtonGroupPreview = PreviewComponents.ButtonGroupPreview
export const TabsPreview = PreviewComponents.TabsPreview
export const SplitTagPreview = PreviewComponents.SplitTagPreview
export const ModalPreview = PreviewComponents.ModalPreview
export const TooltipPreview = PreviewComponents.TooltipPreview
export const AccordionPreview = PreviewComponents.AccordionPreview
export const SnackbarPreview = PreviewComponents.SnackbarPreview
export const PopoverPreview = PreviewComponents.PopoverPreview
export const CheckboxPreview = PreviewComponents.CheckboxPreview
export const RadioPreview = PreviewComponents.RadioPreview
export const SwitchPreview = PreviewComponents.SwitchPreview
export const SingleSelectPreview = PreviewComponents.SingleSelectPreview
export const MultiSelectPreview = PreviewComponents.MultiSelectPreview
export const MenuPreview = PreviewComponents.MenuPreview
export const StatCardPreview = PreviewComponents.StatCardPreview
export const ChartPreview = PreviewComponents.ChartPreview
export const AvatarPreview = PreviewComponents.AvatarPreview
export const AvatarGroupPreview = PreviewComponents.AvatarGroupPreview
export const BreadcrumbPreview = PreviewComponents.BreadcrumbPreview
export const DataTablePreview = PreviewComponents.DataTablePreview
export const DrawerPreview = PreviewComponents.DrawerPreview
export const ProgressBarPreview = PreviewComponents.ProgressBarPreview
export const SidebarPreview = PreviewComponents.SidebarPreview
export const SliderPreview = PreviewComponents.SliderPreview
export const TextInputPreview = PreviewComponents.TextInputPreview
export const DropdownInputPreview = PreviewComponents.DropdownInputPreview
export const MultiValueInputPreview = PreviewComponents.MultiValueInputPreview
export const NumberInputPreview = PreviewComponents.NumberInputPreview
export const OTPInputPreview = PreviewComponents.OTPInputPreview
export const SearchInputPreview = PreviewComponents.SearchInputPreview
export const TextareaPreview = PreviewComponents.TextareaPreview
export const UnitInputPreview = PreviewComponents.UnitInputPreview
export const DateRangePickerPreview = PreviewComponents.DateRangePickerPreview
export const CodeBlockPreview = PreviewComponents.CodeBlockPreview
export const CardPreview = PreviewComponents.CardPreview
export const UploadPreview = PreviewComponents.UploadPreview
export const KeyValuePairPreview = PreviewComponents.KeyValuePairPreview
export const StepperPreview = PreviewComponents.StepperPreview
export const ChatInputPreview = PreviewComponents.ChatInputPreview
export const ButtonV2Preview = PreviewComponents.ButtonV2Preview
export const CheckboxV2Preview = PreviewComponents.CheckboxV2Preview
export const RadioV2Preview = PreviewComponents.RadioV2Preview
export const SwitchV2Preview = PreviewComponents.SwitchV2Preview
