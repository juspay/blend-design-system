/**
 * WorkflowCanvas constants
 * Internal implementation constants that should NOT be customized via tokens
 *
 * These are technical implementation details required for ReactFlow integration.
 * User-customizable values (spacing, sizes, etc.) have been moved to
 * workflow.tokens.ts where they can be themed and customized per breakpoint.
 */

/**
 * ReactFlow-specific CSS class names
 * These are required by ReactFlow library and should not be changed
 */
export const REACTFLOW_CLASSES = {
    /** Prevents dragging on this element (ReactFlow class) */
    NO_DRAG: 'nodrag',
    /** Prevents panning on this element (ReactFlow class) */
    NO_PAN: 'nopan',
    /** Combined no-drag and no-pan classes */
    NO_DRAG_PAN: 'nodrag nopan',
} as const

/**
 * CSS transform constants
 * Standard CSS transform values for internal positioning logic
 */
export const TRANSFORMS = {
    /** Center transform for absolute positioned elements */
    CENTER: 'translate(-50%, -50%)',
} as const

/**
 * Animation and transition constants
 * Standard transition and animation values for consistent behavior
 */
export const TRANSITIONS = {
    /** Default transition for smooth animations */
    DEFAULT: 'all 0.2s ease-in-out',
    /** Zoom animation duration in ms */
    ZOOM_DURATION: 200,
    /** Fit view animation duration in ms */
    FIT_VIEW_DURATION: 200,
    /** Fit view padding ratio */
    FIT_VIEW_PADDING: 0.2,
} as const
