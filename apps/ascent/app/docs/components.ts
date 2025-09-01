/**
 * Component metadata registry
 * Centralized component information for the docs page
 */

import React from 'react'

export interface ComponentMetadata {
    slug: string
    title: string
    description: string
    icon: React.ReactElement
    color: string
}

// Component icons using React.createElement for consistency
const createIcon = (
    paths: string[],
    additionalElements?: React.ReactElement[]
) => {
    const pathElements = paths.map((path, index) =>
        React.createElement('path', { key: `path-${index}`, d: path })
    )

    const allElements = additionalElements
        ? [...pathElements, ...additionalElements]
        : pathElements

    return React.createElement(
        'svg',
        {
            width: '20',
            height: '20',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
        },
        ...allElements
    )
}

// Component registry with clean, maintainable structure
export const COMPONENT_REGISTRY: ComponentMetadata[] = [
    {
        slug: 'button',
        title: 'Button',
        description:
            'The Button component is a fundamental UI element used for user interactions.',
        icon: createIcon(
            [],
            [
                React.createElement('rect', {
                    key: 'rect',
                    x: '3',
                    y: '8',
                    width: '18',
                    height: '8',
                    rx: '2',
                }),
            ]
        ),
        color: 'from-blue-500 to-blue-600',
    },
    {
        slug: 'button-group',
        title: 'Button Group V2',
        description:
            'The ButtonGroupV2 component is a container that groups multiple Button components together with flexible layout options and automatic positioning.',
        icon: createIcon(
            [],
            [
                React.createElement('rect', {
                    key: 'rect1',
                    x: '2',
                    y: '8',
                    width: '6',
                    height: '8',
                    rx: '1',
                }),
                React.createElement('rect', {
                    key: 'rect2',
                    x: '9',
                    y: '8',
                    width: '6',
                    height: '8',
                    rx: '1',
                }),
                React.createElement('rect', {
                    key: 'rect3',
                    x: '16',
                    y: '8',
                    width: '6',
                    height: '8',
                    rx: '1',
                }),
            ]
        ),
        color: 'from-purple-500 to-purple-600',
    },
    {
        slug: 'alert',
        title: 'Alert',
        description:
            'The Alert component is a versatile notification element used to display important messages to users with multiple variants, styles, and interactive options.',
        icon: createIcon([
            'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z',
            'M12 9v4',
            'm12 17 .01 0',
        ]),
        color: 'from-orange-500 to-red-500',
    },
    {
        slug: 'tag',
        title: 'Tag',
        description:
            'The Tag component is a versatile UI element used for displaying labels, categories, and status indicators with multiple variants, colors, and interactive options.',
        icon: createIcon([
            'M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z',
            'M7 7h.01',
        ]),
        color: 'from-green-500 to-emerald-600',
    },
    {
        slug: 'split-tag',
        title: 'Split Tag',
        description:
            'The SplitTag component is a specialized tag variant that can be split into multiple sections, useful for displaying complex labels or status indicators.',
        icon: createIcon([
            'M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z',
            'M7 7h.01',
            'M12 2v19',
        ]),
        color: 'from-teal-500 to-cyan-600',
    },
    {
        slug: 'tabs',
        title: 'Tabs',
        description:
            'The Tabs component provides a way to organize content into multiple sections that can be switched between, with support for different styles and configurations.',
        icon: createIcon(
            ['M9 3v18', 'M15 3v18'],
            [
                React.createElement('rect', {
                    key: 'rect',
                    x: '3',
                    y: '3',
                    width: '18',
                    height: '18',
                    rx: '2',
                }),
            ]
        ),
        color: 'from-indigo-500 to-blue-600',
    },
    {
        slug: 'breadcrumb',
        title: 'Breadcrumb',
        description:
            "The Breadcrumb component provides navigation context by showing the current page's location within a site hierarchy, helping users understand where they are and navigate back.",
        icon: createIcon(
            ['m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'm6 9 6-6 6 6'],
            [
                React.createElement('polyline', {
                    key: 'polyline',
                    points: '9,22 9,12 15,12 15,22',
                }),
            ]
        ),
        color: 'from-amber-500 to-orange-600',
    },
    {
        slug: 'accordion',
        title: 'Accordion',
        description:
            'The Accordion component creates collapsible content sections that can expand and collapse, helping to organize information hierarchically and save screen space.',
        icon: createIcon(
            ['M9 9h6', 'M9 15h6', 'M12 9v6'],
            [
                React.createElement('rect', {
                    key: 'rect',
                    x: '3',
                    y: '3',
                    width: '18',
                    height: '18',
                    rx: '2',
                }),
            ]
        ),
        color: 'from-pink-500 to-rose-600',
    },
    {
        slug: 'avatar',
        title: 'Avatar',
        description:
            'The Avatar component displays user profile images, initials, or fallback icons with various sizes and styling options for user identification and personalization.',
        icon: createIcon(
            [],
            [
                React.createElement('circle', {
                    key: 'circle',
                    cx: '12',
                    cy: '12',
                    r: '10',
                }),
                React.createElement('path', {
                    key: 'path',
                    d: 'm15 9-6 6-3-3',
                }),
            ]
        ),
        color: 'from-violet-500 to-purple-600',
    },
    {
        slug: 'avatar-group',
        title: 'Avatar Group',
        description:
            'The AvatarGroup component displays multiple user profile images in a compact, stacked layout with overflow handling and optional selection functionality.',
        icon: createIcon(
            [],
            [
                React.createElement('circle', {
                    key: 'circle1',
                    cx: '9',
                    cy: '11',
                    r: '4',
                }),
                React.createElement('circle', {
                    key: 'circle2',
                    cx: '15',
                    cy: '11',
                    r: '4',
                }),
                React.createElement('path', {
                    key: 'path',
                    d: 'm6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2',
                }),
            ]
        ),
        color: 'from-indigo-500 to-blue-600',
    },
]

/**
 * Get component metadata by slug
 */
export function getComponentBySlug(
    slug: string
): ComponentMetadata | undefined {
    return COMPONENT_REGISTRY.find((component) => component.slug === slug)
}

/**
 * Get all component slugs
 */
export function getAllComponentSlugs(): string[] {
    return COMPONENT_REGISTRY.map((component) => component.slug)
}

/**
 * Get components by category (future enhancement)
 */
export function getComponentsByCategory(
    _category: string
): ComponentMetadata[] {
    // Future: Add category field to ComponentMetadata
    return COMPONENT_REGISTRY
}

/**
 * Search components by title or description
 */
export function searchComponents(query: string): ComponentMetadata[] {
    const searchTerm = query.toLowerCase()
    return COMPONENT_REGISTRY.filter(
        (component) =>
            component.title.toLowerCase().includes(searchTerm) ||
            component.description.toLowerCase().includes(searchTerm)
    )
}
