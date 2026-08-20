import React from 'react'
import ComponentCard from './ComponentCard'
import { PageBreadcrumb } from '@/components/Navigation'
import {
    FormInputPreview,
    SelectionPreview,
    ActionsPreview,
    NavigationPreview,
    FeedbackPreview,
    LayoutPreview,
    DataPreview,
    DisplayPreview,
    OthersPreview,
} from './previews'

const componentCategories = [
    {
        title: 'Form Input',
        href: '/docs/components/textinput',
        preview: <FormInputPreview />,
    },
    {
        title: 'Selection',
        href: '/docs/components/checkbox',
        preview: <SelectionPreview />,
    },
    {
        title: 'Actions',
        href: '/docs/components/button',
        preview: <ActionsPreview />,
    },
    {
        title: 'Navigation',
        href: '/docs/components/breadcrumb',
        preview: <NavigationPreview />,
    },
    {
        title: 'Feedback',
        href: '/docs/components/alert',
        preview: <FeedbackPreview />,
    },
    {
        title: 'Layout',
        href: '/docs/components/card',
        preview: <LayoutPreview />,
    },
    {
        title: 'Data',
        href: '/docs/components/charts',
        preview: <DataPreview />,
    },
    {
        title: 'Display',
        href: '/docs/components/avatar',
        preview: <DisplayPreview />,
    },
    {
        title: 'Others',
        href: '/docs/components/tooltip',
        preview: <OthersPreview />,
    },
]

const ComponentsGrid = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/docs/components' },
    ]

    return (
        <div className="min-h-screen w-full">
            <PageBreadcrumb items={breadcrumbItems} />

            {/* Header - matching ChangelogHeader style */}
            <div className="py-8 md:py-11 px-4 sm:px-6 border-b border-border">
                <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-manrope font-medium text-primary">
                    Components
                </h1>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {componentCategories.map((category, index) => {
                    // Determine border classes based on position
                    const isLastInRowSm = index % 2 === 1
                    const isLastInRowLg = index % 4 === 3
                    const isInLastRow = index >= 8

                    return (
                        <ComponentCard
                            key={category.title}
                            title={category.title}
                            href={category.href}
                            preview={category.preview}
                            className={`
                                border-r border-b border-border
                                ${isLastInRowSm ? 'sm:border-r-0' : 'sm:border-r'}
                                ${isLastInRowLg ? 'lg:border-r-0' : 'lg:border-r'}
                                ${isInLastRow ? 'border-b' : ''}
                            `}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ComponentsGrid
