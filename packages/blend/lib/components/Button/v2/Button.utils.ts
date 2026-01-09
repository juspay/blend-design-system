import type { MouseEvent } from 'react'
import type {
    ButtonProps,
    ButtonGroupPosition,
    ButtonSubType,
} from './Button.types'

export function getBorderRadius(
    baseRadius: string,
    groupPosition?: ButtonGroupPosition
): string {
    if (!groupPosition) return baseRadius

    const radiusMap: Record<ButtonGroupPosition, string> = {
        left: `${baseRadius} 0 0 ${baseRadius}`,
        right: `0 ${baseRadius} ${baseRadius} 0`,
        center: '0',
    }

    return radiusMap[groupPosition]
}

export function getButtonWidth(
    fullWidth?: boolean,
    width?: string | number
): string {
    if (fullWidth) return '100%'
    if (width) return typeof width === 'number' ? `${width}px` : width
    return 'fit-content'
}

export function validateButtonProps(props: ButtonProps): void {
    if (process.env.NODE_ENV !== 'production') {
        if (
            props.subType === 'iconOnly' &&
            !props.children &&
            !props['aria-label'] &&
            !props['aria-labelledby']
        ) {
            console.warn(
                '[Button] Icon-only buttons should have an aria-label for accessibility'
            )
        }

        if (props.loading && props.disabled) {
            console.warn(
                '[Button] "loading" and "disabled" should not be used together'
            )
        }
    }
}

export function isInteractionBlocked(
    loading?: boolean,
    disabled?: boolean,
    isSkeleton?: boolean
): boolean {
    return Boolean(loading || disabled || isSkeleton)
}

export function createClickHandler(
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    isBlocked?: boolean
) {
    return (event: MouseEvent<HTMLButtonElement>) => {
        if (isBlocked) {
            event.preventDefault()
            return
        }
        onClick?.(event)
    }
}

export function getButtonStatus(
    loading?: boolean,
    disabled?: boolean
): 'loading' | 'disabled' | 'enabled' {
    if (loading) return 'loading'
    if (disabled) return 'disabled'
    return 'enabled'
}

export function getTabIndex(disabled?: boolean, tabIndex?: number): number {
    if (disabled) return -1
    if (tabIndex !== undefined) return Math.max(-1, Math.min(0, tabIndex))
    return 0
}

export function shouldShowSkeleton(showSkeleton?: boolean): boolean {
    return Boolean(showSkeleton)
}

export function getButtonHeight(subType?: ButtonSubType): string {
    return subType === 'inline' ? 'auto' : 'fit-content'
}
