'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const PreviewSkeleton = () => (
    <div className="w-full min-h-80 animate-pulse bg-muted rounded-2xl my-10" />
)

// Helper to add loading skeleton to all dynamic imports
const dyn = (importFn: () => Promise<any>) =>
    dynamic(importFn, { ssr: false, loading: PreviewSkeleton })

// Map of preview component names to their dynamic imports
const previewComponents = {
    ButtonPreview: dyn(() => import('./Previews/ButtonPreview')),
    AlertPreview: dyn(() => import('./Previews/AlertPreview')),
    TagPreview: dyn(() => import('./Previews/TagPreview')),
    ButtonGroupPreview: dyn(() => import('./Previews/ButtonGroupPreview')),
    TabsPreview: dyn(() => import('./Previews/TabsPreview')),
    SplitTagPreview: dyn(() => import('./Previews/SplitTagPreview')),
    ModalPreview: dyn(() => import('./Previews/ModalPreview')),
    TooltipPreview: dyn(() => import('./Previews/TooltipPreview')),
    AccordionPreview: dyn(() => import('./Previews/AccordionPreview')),
    SnackbarPreview: dyn(() => import('./Previews/SnackbarPreview')),
    PopoverPreview: dyn(() => import('./Previews/PopoverPreview')),
    CheckboxPreview: dyn(() => import('./Previews/CheckboxPreview')),
    RadioPreview: dyn(() => import('./Previews/RadioPreview')),
    SwitchPreview: dyn(() => import('./Previews/SwitchPreview')),
    SingleSelectPreview: dyn(() => import('./Previews/SingleSelectPreview')),
    MultiSelectPreview: dyn(() => import('./Previews/MultiSelectPreview')),
    MenuPreview: dyn(() => import('./Previews/MenuPreview')),
    StatCardPreview: dyn(() => import('./Previews/StatCardPreview')),
    ChartPreview: dyn(() => import('./Previews/ChartPreview')),
    AvatarPreview: dyn(() => import('./Previews/AvatarPreview')),
    AvatarGroupPreview: dyn(() => import('./Previews/AvatarGroupPreview')),
    BreadcrumbPreview: dyn(() => import('./Previews/BreadcrumbPreview')),
    DataTablePreview: dyn(() => import('./Previews/DataTablePreview')),
    DrawerPreview: dyn(() => import('./Previews/DrawerPreview')),
    ProgressBarPreview: dyn(() => import('./Previews/ProgressBarPreview')),
    SidebarPreview: dyn(() => import('./Previews/SidebarPreview')),
    SliderPreview: dyn(() => import('./Previews/SliderPreview')),
    TextInputPreview: dyn(() => import('./Previews/TextInputPreview')),
    DropdownInputPreview: dyn(() => import('./Previews/DropdownInputPreview')),
    MultiValueInputPreview: dyn(
        () => import('./Previews/MultiValueInputPreview')
    ),
    NumberInputPreview: dyn(() => import('./Previews/NumberInputPreview')),
    OTPInputPreview: dyn(() => import('./Previews/OTPInputPreview')),
    SearchInputPreview: dyn(() => import('./Previews/SearchInputPreview')),
    TextareaPreview: dyn(() => import('./Previews/TextareaPreview')),
    UnitInputPreview: dyn(() => import('./Previews/UnitInputPreview')),
    DateRangePickerPreview: dyn(
        () => import('./Previews/DateRangePickerPreview')
    ),
    CodeBlockPreview: dyn(() => import('./Previews/CodeBlockPreview')),
    CardPreview: dyn(() => import('./Previews/CardPreview')),
    TopbarPreview: dyn(() => import('./Previews/TopbarPreview')),
    UploadPreview: dyn(() => import('./Previews/UploadPreview')),
    KeyValuePairPreview: dyn(() => import('./Previews/KeyValuePairPreview')),
    StepperPreview: dyn(() => import('./Previews/StepperPreview')),
    ChatInputPreview: dyn(() => import('./Previews/ChatInputPreview')),
    // V2 Previews
    AccordionV2Preview: dyn(() => import('./Previews/AccordionV2Preview')),
    AlertV2Preview: dyn(() => import('./Previews/AlertV2Preview')),
    BadgePreview: dyn(() => import('./Previews/BadgePreview')),
    AvatarV2Preview: dyn(() => import('./Previews/AvatarV2Preview')),
    BreadcrumbV2Preview: dyn(() => import('./Previews/BreadcrumbV2Preview')),
    ChartsV2Preview: dyn(() => import('./Previews/ChartsV2Preview')),
    CodeEditorV2Preview: dyn(() => import('./Previews/CodeEditorV2Preview')),
    DrawerV2Preview: dyn(() => import('./Previews/DrawerV2Preview')),
    KeyValuePairV2Preview: dyn(
        () => import('./Previews/KeyValuePairV2Preview')
    ),
    MenuV2Preview: dyn(() => import('./Previews/MenuV2Preview')),
    MultiSelectV2Preview: dyn(() => import('./Previews/MultiSelectV2Preview')),
    PopoverV2Preview: dyn(() => import('./Previews/PopoverV2Preview')),
    ProgressBarV2Preview: dyn(() => import('./Previews/ProgressBarV2Preview')),
    SidebarV2Preview: dyn(() => import('./Previews/SidebarV2Preview')),
    SingleSelectV2Preview: dyn(
        () => import('./Previews/SingleSelectV2Preview')
    ),
    SnackbarV2Preview: dyn(() => import('./Previews/SnackbarV2Preview')),
    StatCardV2Preview: dyn(() => import('./Previews/StatCardV2Preview')),
    StepperV2Preview: dyn(() => import('./Previews/StepperV2Preview')),
    TabsV2Preview: dyn(() => import('./Previews/TabsV2Preview')),
    TagV2Preview: dyn(() => import('./Previews/TagV2Preview')),
    TagGroupV2Preview: dyn(() => import('./Previews/TagGroupV2Preview')),
    TooltipV2Preview: dyn(() => import('./Previews/TooltipV2Preview')),
    TextInputV2Preview: dyn(() => import('./Previews/TextInputV2Preview')),
    TextAreaV2Preview: dyn(() => import('./Previews/TextAreaV2Preview')),
    NumberInputV2Preview: dyn(() => import('./Previews/NumberInputV2Preview')),
    SearchInputV2Preview: dyn(() => import('./Previews/SearchInputV2Preview')),
    ChatInputV2Preview: dyn(() => import('./Previews/ChatInputV2Preview')),
    OTPInputV2Preview: dyn(() => import('./Previews/OTPInputV2Preview')),
    MultiValueInputV2Preview: dyn(
        () => import('./Previews/MultiValueInputV2Preview')
    ),
    ButtonV2Preview: dyn(() => import('./Previews/ButtonV2Preview')),
    ButtonGroupV2Preview: dyn(() => import('./Previews/ButtonGroupV2Preview')),
    CardV2Preview: dyn(() => import('./Previews/CardV2Preview')),
    CheckboxV2Preview: dyn(() => import('./Previews/CheckboxV2Preview')),
    RadioV2Preview: dyn(() => import('./Previews/RadioV2Preview')),
    SwitchV2Preview: dyn(() => import('./Previews/SwitchV2Preview')),
    TimelinePreview: dyn(() => import('./Previews/TimelinePreview')),
    TopbarV2Preview: dyn(() => import('./Previews/TopbarV2Preview')),
}

interface PreviewWrapperProps {
    component: keyof typeof previewComponents
}

export default function PreviewWrapper({ component }: PreviewWrapperProps) {
    const Component = previewComponents[component]

    if (!Component) {
        return <div>Preview component not found: {component}</div>
    }

    return <Component />
}
