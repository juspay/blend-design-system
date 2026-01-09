import type { CSSProperties } from 'react'

/**
 * CSS styles for visually hidden content
 * Content is hidden visually but remains accessible to screen readers
 */
export const visuallyHiddenStyles: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
}

/**
 * CSS class string for visually hidden content
 * Can be used with className prop
 */
export const visuallyHiddenClassName = 'sr-only'
