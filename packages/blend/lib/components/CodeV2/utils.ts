import { CodeV2Variant } from './types'

export const createCopyToClipboard = (
    code: string,
    setIsCopied: (copied: boolean) => void
) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return () => {
        navigator.clipboard.writeText(code)
        setIsCopied(true)

        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            setIsCopied(false)
            timeoutId = null
        }, 2000)
    }
}

export const shouldShowLineNumbers = (
    showLineNumbers: boolean | undefined,
    variant: CodeV2Variant
): boolean => {
    if (showLineNumbers !== undefined) {
        return showLineNumbers
    }
    return variant === CodeV2Variant.DEFAULT
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
