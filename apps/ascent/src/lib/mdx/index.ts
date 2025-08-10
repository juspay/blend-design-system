// MDX component utilities
import React, { ComponentPropsWithoutRef } from 'react'

// Utility function to generate slugs
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .replace(/^-+|-+$/g, '')
}

// Create heading components with auto-generated IDs
export const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const Component = ({
        children,
        ...props
    }: ComponentPropsWithoutRef<'h1'>) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)

        const classNames = {
            1: 'text-2xl pt-12 font-bold',
            2: 'font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl',
            3: 'font-heading mt-8 scroll-m-32 text-xl font-medium tracking-tight',
            4: 'font-medium',
            5: 'font-medium text-sm',
            6: 'font-medium text-sm',
        }

        const HeadingTag = `h${level}` as
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'h6'

        return React.createElement(
            HeadingTag,
            { id, className: classNames[level], ...props },
            children
        )
    }

    Component.displayName = `Heading${level}`
    return Component
}

// Preview component factory
export const createPreviewComponents = () => {
    const previewComponents = [
        'Button',
        'Alert',
        'Tag',
        'ButtonGroup',
        'ButtonGroupV2',
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
        'Menu',
        'StatCard',
        'Chart',
    ]

    const components: Record<string, React.ComponentType> = {}

    previewComponents.forEach((name) => {
        components[`${name}Preview`] = () => {
            // Dynamic import would be better here, but for now we'll use a simple approach
            // For now, return a simple placeholder component
            const PreviewWrapper = () =>
                React.createElement(
                    'div',
                    {
                        className: 'p-4 border rounded-lg bg-gray-50',
                    },
                    `Preview for ${name}`
                )
            return React.createElement(PreviewWrapper, {
                component: `${name}Preview`,
            })
        }
    })

    return components
}
