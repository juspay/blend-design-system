import { BadgeSize, BadgePosition, BadgeTokensType } from './Badge.types'

/**
 * Format the count to display, handling max overflow
 */
export const formatCount = (count: number, maxCount: number = 99): string => {
    if (count > maxCount) {
        return `${maxCount}+`
    }
    return count.toString()
}

/**
 * Get position styles for the badge wrapper
 */
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
    // sin(45°) = cos(45°) ≈ 0.707, so offset from center is ~70.7%
    // We use 85% to position slightly outside for better visual overlap
    if (isCircular) {
        const circularOffset = '14%' // (100% - 70.71%) / 2 for circumference positioning
        const edgeOffset = customOffset ? `${customOffset[0]}px` : '0px'

        switch (position) {
            case 'top-right':
                return {
                    top: circularOffset,
                    right: circularOffset,
                    transform: `translate(50%, -50%) translate(${edgeOffset}, -${edgeOffset})`,
                }
            case 'top-left':
                return {
                    top: circularOffset,
                    left: circularOffset,
                    transform: `translate(-50%, -50%) translate(-${edgeOffset}, -${edgeOffset})`,
                }
            case 'bottom-right':
                return {
                    bottom: circularOffset,
                    right: circularOffset,
                    transform: `translate(50%, 50%) translate(${edgeOffset}, ${edgeOffset})`,
                }
            case 'bottom-left':
                return {
                    bottom: circularOffset,
                    left: circularOffset,
                    transform: `translate(-50%, 50%) translate(-${edgeOffset}, ${edgeOffset})`,
                }
        }
    }

    // For dots (no content), use '0px' offset so they extend outside after transform
    // (transform shifts by 50%, so 0px - half_width = negative = outside)
    // For pills (has content), use token offset which positions them correctly
    const offset = customOffset
        ? `${customOffset[0]}px`
        : !hasContent
          ? '0px'
          : String(tokens.position.offset[size])

    const secondaryOffset = customOffset
        ? `${customOffset[1]}px`
        : !hasContent
          ? '0px'
          : String(tokens.position.offset[size])

    switch (position) {
        case 'top-right':
            return {
                top: offset,
                right: secondaryOffset,
                transform: 'translate(50%, -50%)',
            }
        case 'top-left':
            return {
                top: offset,
                left: secondaryOffset,
                transform: 'translate(-50%, -50%)',
            }
        case 'bottom-right':
            return {
                bottom: offset,
                right: secondaryOffset,
                transform: 'translate(50%, 50%)',
            }
        case 'bottom-left':
            return {
                bottom: offset,
                left: secondaryOffset,
                transform: 'translate(-50%, 50%)',
            }
    }
}

/**
 * Get accessible label for the badge
 */
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
