import { cloneElement, isValidElement } from 'react'
import type { SearchInputV2TokensType } from './SearchInputV2.tokens'

export const applyIconStyles = (
    icon: React.ReactNode,
    tokens: SearchInputV2TokensType,
    disabled: boolean,
    error: boolean
): React.ReactNode => {
    if (!isValidElement(icon)) {
        return icon
    }

    const getIconColor = () => {
        if (disabled) return tokens.icon.color.disabled
        if (error) return tokens.icon.color.error
        return tokens.icon.color.default
    }

    return cloneElement(
        icon as React.ReactElement<{ style?: React.CSSProperties }>,
        {
            style: {
                ...((icon.props as { style?: React.CSSProperties }).style ||
                    {}),
                color: getIconColor(),
                width: tokens.icon.width,
                height: tokens.icon.width,
            },
        }
    )
}

export const toPixels = (value: string | number | undefined): number => {
    if (typeof value === 'number') {
        return value
    }

    if (typeof value === 'string') {
        // Remove 'px' and convert to number
        const numericValue = parseFloat(value.replace('px', ''))
        return isNaN(numericValue) ? 0 : numericValue
    }

    return 0
}
