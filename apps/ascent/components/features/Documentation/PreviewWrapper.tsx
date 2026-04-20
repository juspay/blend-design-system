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
    UploadPreview: dyn(() => import('./Previews/UploadPreview')),
    KeyValuePairPreview: dyn(() => import('./Previews/KeyValuePairPreview')),
    StepperPreview: dyn(() => import('./Previews/StepperPreview')),
    ChatInputPreview: dyn(() => import('./Previews/ChatInputPreview')),
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
