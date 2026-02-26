/**
 * Centralized icon system
 * Reusable icon components to eliminate inline SVG duplication
 */

import React from 'react'

export interface IconProps {
    size?: number
    className?: string
    'aria-hidden'?: boolean
}

const createIcon = (
    displayName: string,
    renderPaths: (props: IconProps) => React.ReactElement[]
) => {
    const IconComponent: React.FC<IconProps> = ({
        size = 18,
        className,
        'aria-hidden': ariaHidden = true,
        ...props
    }) => {
        return React.createElement(
            'svg',
            {
                width: size,
                height: size,
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                className,
                'aria-hidden': ariaHidden,
                ...props,
            },
            ...renderPaths({ size, className, 'aria-hidden': ariaHidden })
        )
    }

    IconComponent.displayName = displayName
    return IconComponent
}

// Document/Docs icon
export const DocumentIcon = createIcon('DocumentIcon', () => [
    React.createElement('path', {
        key: 'path1',
        d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
    }),
    React.createElement('polyline', {
        key: 'polyline1',
        points: '14,2 14,8 20,8',
    }),
    React.createElement('line', {
        key: 'line1',
        x1: '16',
        y1: '13',
        x2: '8',
        y2: '13',
    }),
    React.createElement('line', {
        key: 'line2',
        x1: '16',
        y1: '17',
        x2: '8',
        y2: '17',
    }),
    React.createElement('polyline', {
        key: 'polyline2',
        points: '10,9 9,9 8,9',
    }),
])

// Blog/Edit icon
export const BlogIcon = createIcon('BlogIcon', () => [
    React.createElement('path', {
        key: 'path1',
        d: 'M12 20h9',
    }),
    React.createElement('path', {
        key: 'path2',
        d: 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
    }),
])

// Changelog icon
export const ChangelogIcon = createIcon('ChangelogIcon', () => [
    React.createElement('path', {
        key: 'path1',
        d: 'M3 3v18h18',
    }),
    React.createElement('path', {
        key: 'path2',
        d: 'M7 12l3 3 7-7',
    }),
])

// Storybook icon
export const StorybookIcon = createIcon('StorybookIcon', () => [
    React.createElement('path', {
        key: 'path1',
        d: 'M12 2L2 7l10 5 10-5-10-5z',
    }),
    React.createElement('path', {
        key: 'path2',
        d: 'M2 17l10 5 10-5',
    }),
    React.createElement('path', {
        key: 'path3',
        d: 'M2 12l10 5 10-5',
    }),
])

// Export all icons for easy importing
export const Icons = {
    DocumentIcon,
    BlogIcon,
    ChangelogIcon,
    StorybookIcon,
} as const

export type IconName = keyof typeof Icons

// Helper function to get icon by name
export function getIcon(name: IconName): React.FC<IconProps> {
    return Icons[name]
}
