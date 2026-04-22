import type { ReactElement } from 'react'
import type { CSSObject } from 'styled-components'

export enum BadgeColor {
    ALERT = 'alert',
    NEUTRAL = 'neutral',
    WARNING = 'warning',
    PRIMARY = 'primary',
    SUCCESS = 'success',
}

export enum BadgeSize {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export type BadgePosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'

type BaseBadgeProps = {
    /**
     * The count to display in the badge (for pill variant)
     */
    count?: number
    /**
     * Maximum count before showing "99+"
     * @default 99
     */
    maxCount?: number
    /**
     * Size of the badge
     * @default BadgeSize.MD
     */
    size?: BadgeSize
    /**
     * Color variant of the badge
     * @default BadgeColor.ALERT
     */
    color?: BadgeColor
    /**
     * Custom text to display (overrides count)
     */
    text?: string
    /**
     * Whether to show the badge
     * @default true
     */
    showBadge?: boolean
    /**
     * Whether to show zero count.
     * When false (default), badge is hidden when count is 0.
     * When true, shows "0" in the badge.
     * @default false
     */
    showZero?: boolean
} & Omit<
    React.HTMLAttributes<HTMLSpanElement>,
    'size' | 'className' | 'style' | 'children'
>

type StandaloneBadgeProps = BaseBadgeProps & {
    /**
     * No children renders a standalone badge
     */
    children?: undefined
}

type PositionedBadgeProps = BaseBadgeProps & {
    /**
     * Children element to wrap with badge positioning
     * Badge will be positioned relative to this element
     */
    children: ReactElement
    /**
     * Position of badge when children is provided
     * @default 'top-right'
     */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    /**
     * Optional offset for positioning (in pixels)
     * Overrides the default offset from tokens
     */
    offset?: [number, number]
    /**
     * Whether the wrapped child element is circular (e.g., avatar)
     * When true, badge is positioned on the circumference rather than the corner
     * @default false
     */
    isCircular?: boolean
}

export type BadgeProps = StandaloneBadgeProps | PositionedBadgeProps

export type BadgeTokensType = Readonly<{
    dot: {
        width: {
            [key in BadgeSize]: CSSObject['width']
        }
        height: {
            [key in BadgeSize]: CSSObject['height']
        }
    }
    pill: {
        minWidth: {
            [key in BadgeSize]: CSSObject['minWidth']
        }
        height: {
            [key in BadgeSize]: CSSObject['height']
        }
        paddingX: {
            [key in BadgeSize]: CSSObject['paddingLeft']
        }
        borderRadius: {
            [key in BadgeSize]: CSSObject['borderRadius']
        }
    }
    backgroundColor: {
        [key in BadgeColor]: CSSObject['backgroundColor']
    }
    text: {
        color: CSSObject['color']
        fontSize: {
            [key in BadgeSize]: CSSObject['fontSize']
        }
        fontWeight: CSSObject['fontWeight']
        lineHeight: {
            [key in BadgeSize]: CSSObject['lineHeight']
        }
    }
    position: {
        offset: {
            [key in BadgeSize]: CSSObject['top']
        }
    }
}>

export type ResponsiveBadgeTokens = {
    sm: BadgeTokensType
    lg: BadgeTokensType
}
