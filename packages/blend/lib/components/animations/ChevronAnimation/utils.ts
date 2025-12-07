import {
    ChevronAnimationSize,
    ChevronAnimationVariant,
    ChevronAnimationDirection,
} from './types'

export const getChevronTransform = (
    direction: ChevronAnimationDirection,
    variant: ChevronAnimationVariant,
    isOpen: boolean
): string => {
    if (!isOpen) return 'rotate(0deg)'

    switch (variant) {
        case ChevronAnimationVariant.ROTATE_180:
            return 'rotate(180deg)'
        case ChevronAnimationVariant.ROTATE_90:
            return direction === ChevronAnimationDirection.RIGHT
                ? 'rotate(90deg)'
                : 'rotate(-90deg)'
        case ChevronAnimationVariant.ROTATE_270:
            return direction === ChevronAnimationDirection.RIGHT
                ? 'rotate(270deg)'
                : 'rotate(-270deg)'
        default:
            return 'rotate(0deg)'
    }
}

export const getChevronSize = (size: ChevronAnimationSize): string => {
    switch (size) {
        case ChevronAnimationSize.SMALL:
            return '12px'
        case ChevronAnimationSize.MEDIUM:
            return '16px'
        case ChevronAnimationSize.LARGE:
            return '20px'
        default:
            return '16px'
    }
}
