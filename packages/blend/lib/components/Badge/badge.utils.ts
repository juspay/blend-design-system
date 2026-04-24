import { BadgeSize, BadgePosition } from './Badge.types'
import { BadgeTokensType } from './badge.tokens'

// Format the count to display, handling max overflow
export const formatCount = (count: number, maxCount: number = 99): string => {
    if (count > maxCount) {
        return `${maxCount}+`
    }
    return count.toString()
}

// Get position styles for the badge wrapper
export const getPositionStyles = (
    position: BadgePosition,
    size: BadgeSize,
    tokens: BadgeTokensType,
    customOffset?: [number, number],
    hasContent?: boolean,
    isCircular?: boolean
): {
    top?: string
    right?: string
    bottom?: string
    left?: string
    transform: string
} => {
    // For circular elements, position on the circumference (45 degrees)
    if (isCircular) {
        const circularOffset = '14%' // (100% - 70.71%) / 2 for circumference positioning
        const xOffset = customOffset ? `${customOffset[0]}px` : '0px'
        const yOffset = customOffset ? `${customOffset[1]}px` : '0px'

        switch (position) {
            case 'top-right':
                return {
                    top: circularOffset,
                    right: circularOffset,
                    transform: `translate(50%, -50%) translate(${xOffset}, -${yOffset})`,
                }
            case 'top-left':
                return {
                    top: circularOffset,
                    left: circularOffset,
                    transform: `translate(-50%, -50%) translate(-${xOffset}, -${yOffset})`,
                }
            case 'bottom-right':
                return {
                    bottom: circularOffset,
                    right: circularOffset,
                    transform: `translate(50%, 50%) translate(${xOffset}, ${yOffset})`,
                }
            case 'bottom-left':
                return {
                    bottom: circularOffset,
                    left: circularOffset,
                    transform: `translate(-50%, 50%) translate(-${xOffset}, ${yOffset})`,
                }
        }
    }

    const defaultOffset = !hasContent
        ? '0px'
        : String(tokens.position.offset[size])

    // [0] = x = horizontal → left/right, [1] = y = vertical → top/bottom
    const xOffset = customOffset ? `${customOffset[0]}px` : defaultOffset
    const yOffset = customOffset ? `${customOffset[1]}px` : defaultOffset

    switch (position) {
        case 'top-right':
            return {
                top: yOffset,
                right: xOffset,
                transform: 'translate(50%, -50%)',
            }
        case 'top-left':
            return {
                top: yOffset,
                left: xOffset,
                transform: 'translate(-50%, -50%)',
            }
        case 'bottom-right':
            return {
                bottom: yOffset,
                right: xOffset,
                transform: 'translate(50%, 50%)',
            }
        case 'bottom-left':
            return {
                bottom: yOffset,
                left: xOffset,
                transform: 'translate(-50%, 50%)',
            }
    }
}

// Get accessible label for the badge
export const getAccessibleLabel = (
    count: number | undefined,
    text: string | undefined,
    maxCount: number,
    showBadge: boolean
): string | undefined => {
    if (!showBadge) return undefined
    if (text) return text
    if (count !== undefined) {
        if (count > maxCount) {
            return `More than ${maxCount}`
        }
        return count.toString()
    }
    return 'Notification'
}
