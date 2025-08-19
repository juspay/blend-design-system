import React from 'react'
import { ICON_PATHS, LAYOUT_CONFIG } from './config'

/**
 * Blog-specific icon components
 */

interface IconProps {
    size?: number
    className?: string
    'aria-hidden'?: boolean
}

const createIcon = (
    displayName: string,
    renderPaths: (props: IconProps) => React.ReactElement[]
) => {
    const IconComponent: React.FC<IconProps> = ({
        size = LAYOUT_CONFIG.ICON_SIZE,
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

export const DocumentIcon = createIcon('DocumentIcon', () => [
    React.createElement('path', {
        key: 'path1',
        d: ICON_PATHS.DOCUMENT.PATH_1,
    }),
    React.createElement('polyline', {
        key: 'polyline1',
        points: ICON_PATHS.DOCUMENT.PATH_2,
    }),
    React.createElement('line', {
        key: 'line1',
        ...ICON_PATHS.DOCUMENT.LINE_1,
    }),
    React.createElement('line', {
        key: 'line2',
        ...ICON_PATHS.DOCUMENT.LINE_2,
    }),
    React.createElement('polyline', {
        key: 'polyline2',
        points: ICON_PATHS.DOCUMENT.POLYLINE,
    }),
])

export const ChangelogIcon = createIcon('ChangelogIcon', () => [
    React.createElement('path', {
        key: 'path1',
        d: ICON_PATHS.CHANGELOG.PATH_1,
    }),
    React.createElement('path', {
        key: 'path2',
        d: ICON_PATHS.CHANGELOG.PATH_2,
    }),
])

export const StorybookIcon = createIcon('StorybookIcon', () => [
    React.createElement('path', {
        key: 'path1',
        d: ICON_PATHS.STORYBOOK.PATH_1,
    }),
    React.createElement('path', {
        key: 'path2',
        d: ICON_PATHS.STORYBOOK.PATH_2,
    }),
    React.createElement('path', {
        key: 'path3',
        d: ICON_PATHS.STORYBOOK.PATH_3,
    }),
])

// Export all icons for easy importing
export const BlogIcons = {
    DocumentIcon,
    ChangelogIcon,
    StorybookIcon,
} as const

export type BlogIconName = keyof typeof BlogIcons
