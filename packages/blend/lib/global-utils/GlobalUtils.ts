import React, { type ReactNode } from 'react'

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

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const getTruncatedText = (text: string, limit?: number) => {
    const shouldTruncate =
        typeof limit === 'number' && limit > 0 && text.length > limit

    if (!shouldTruncate) {
        return {
            truncatedValue: text,
            fullValue: text,
            isTruncated: false,
        }
    }

    return {
        truncatedValue: `${text.slice(0, limit)}...`,
        fullValue: text,
        isTruncated: true,
    }
}

export const formatTextWithLineBreaks = (
    content: ReactNode | string
): ReactNode => {
    if (typeof content === 'string' && content.includes('\n')) {
        return content
            .split('\n')
            .map((line, index, array) =>
                React.createElement(
                    'span',
                    { key: index },
                    line,
                    index < array.length - 1 && React.createElement('br')
                )
            )
    }
    return content
}

export const addPxToValue = (value?: number | string): string => {
    if (typeof value === 'number') {
        return `${value}px`
    }

    if (typeof value === 'string') {
        return value
    }

    return ''
}

export const flattenChildren = (
    children: React.ReactNode
): React.ReactElement<unknown>[] => {
    return React.Children.toArray(children).flatMap((child) => {
        if (React.isValidElement(child) && child.type === React.Fragment) {
            const fragmentProps = child.props as { children?: React.ReactNode }
            if (fragmentProps.children != null) {
                return flattenChildren(fragmentProps.children)
            }
        }
        return [child as React.ReactElement<unknown>]
    })
}
