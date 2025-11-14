import { ReactNode } from 'react'

export enum ChevronAnimationDirection {
    DOWN = 'down',
    RIGHT = 'right',
    UP = 'up',
    LEFT = 'left',
}

export enum ChevronAnimationVariant {
    ROTATE_180 = 'rotate-180',
    ROTATE_90 = 'rotate-90',
    ROTATE_270 = 'rotate-270',
}

export enum ChevronAnimationSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export interface ChevronAnimationProps {
    children: ReactNode
    isOpen?: boolean
    direction?: ChevronAnimationDirection
    variant?: ChevronAnimationVariant
    size?: ChevronAnimationSize
    color?: string
    className?: string
    animationDuration?: number
    disabled?: boolean
}
