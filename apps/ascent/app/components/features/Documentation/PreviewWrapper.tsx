'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// Map of preview component names to their dynamic imports
const previewComponents = {
    ButtonPreview: dynamic(() => import('./Previews/ButtonPreview'), {
        ssr: false,
    }),
    AlertPreview: dynamic(() => import('./Previews/AlertPreview'), {
        ssr: false,
    }),
    TagPreview: dynamic(() => import('./Previews/TagPreview'), { ssr: false }),
    ButtonGroupV2Preview: dynamic(
        () => import('./Previews/ButtonGroupV2Preview'),
        { ssr: false }
    ),
    TabsPreview: dynamic(() => import('./Previews/TabsPreview'), {
        ssr: false,
    }),
    SplitTagPreview: dynamic(() => import('./Previews/SplitTagPreview'), {
        ssr: false,
    }),
    ModalPreview: dynamic(() => import('./Previews/ModalPreview'), {
        ssr: false,
    }),
    TooltipPreview: dynamic(() => import('./Previews/TooltipPreview'), {
        ssr: false,
    }),
    AccordionPreview: dynamic(() => import('./Previews/AccordionPreview'), {
        ssr: false,
    }),
    SnackbarPreview: dynamic(() => import('./Previews/SnackbarPreview'), {
        ssr: false,
    }),
    PopoverPreview: dynamic(() => import('./Previews/PopoverPreview'), {
        ssr: false,
    }),
    CheckboxPreview: dynamic(() => import('./Previews/CheckboxPreview'), {
        ssr: false,
    }),
    RadioPreview: dynamic(() => import('./Previews/RadioPreview'), {
        ssr: false,
    }),
    SwitchPreview: dynamic(() => import('./Previews/SwitchPreview'), {
        ssr: false,
    }),
    SingleSelectPreview: dynamic(
        () => import('./Previews/SingleSelectPreview'),
        { ssr: false }
    ),
    MultiSelectPreview: dynamic(() => import('./Previews/MultiSelectPreview'), {
        ssr: false,
    }),
    MenuPreview: dynamic(() => import('./Previews/MenuPreview'), {
        ssr: false,
    }),
    StatCardPreview: dynamic(() => import('./Previews/StatCardPreview'), {
        ssr: false,
    }),
    ChartPreview: dynamic(() => import('./Previews/ChartPreview'), {
        ssr: false,
    }),
    AvatarPreview: dynamic(() => import('./Previews/AvatarPreview'), {
        ssr: false,
    }),
    AvatarGroupPreview: dynamic(() => import('./Previews/AvatarGroupPreview'), {
        ssr: false,
    }),
    BreadcrumbPreview: dynamic(() => import('./Previews/BreadcrumbPreview'), {
        ssr: false,
    }),
    DataTablePreview: dynamic(() => import('./Previews/DataTablePreview'), {
        ssr: false,
    }),
    ButtonGroupPreview: dynamic(() => import('./Previews/ButtonGroupPreview'), {
        ssr: false,
    }),
    DrawerPreview: dynamic(() => import('./Previews/DrawerPreview'), {
        ssr: false,
    }),
    ProgressBarPreview: dynamic(() => import('./Previews/ProgressBarPreview'), {
        ssr: false,
    }),
    SidebarPreview: dynamic(() => import('./Previews/SidebarPreview'), {
        ssr: false,
    }),
    SliderPreview: dynamic(() => import('./Previews/SliderPreview'), {
        ssr: false,
    }),
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
