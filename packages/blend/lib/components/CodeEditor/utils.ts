import type { CodeEditorVariant } from './types'

/**
 * Determines if line numbers should be shown
 */
export const shouldShowLineNumbers = (
    showLineNumbers: boolean | undefined,
    variant: CodeEditorVariant
): boolean => {
    if (showLineNumbers !== undefined) {
        return showLineNumbers
    }
    return variant === 'default'
}

/**
 * Calculates container styles with min/max height
 */
export const getContainerStyles = (
    minHeight?: string | number,
    maxHeight?: string | number
): React.CSSProperties => {
    return {
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    }
}
