import styled from 'styled-components'
import { Handle } from 'reactflow'
import type { WorkflowTokensType } from './workflow.tokens'
import { TRANSITIONS } from './constants'

/**
 * WorkflowCanvas utility functions
 * Helper functions for common operations and style calculations
 */

/**
 * Creates a styled handle component with custom colors
 *
 * @param backgroundColor - Default background color
 * @param borderColor - Default border color
 * @param hoverBackgroundColor - Hover state background color
 * @param hoverBorderColor - Hover state border color
 * @returns Styled handle component
 *
 * @example
 * ```tsx
 * const GreenHandle = createStyledHandle(
 *   FOUNDATION_THEME.colors.green[500],
 *   FOUNDATION_THEME.colors.green[600],
 *   FOUNDATION_THEME.colors.green[600],
 *   FOUNDATION_THEME.colors.green[700]
 * )
 * ```
 */
export const createStyledHandle = (
    backgroundColor: string | undefined,
    borderColor: string | undefined,
    hoverBackgroundColor: string | undefined,
    hoverBorderColor: string | undefined
) => styled(Handle)<{ $tokens: WorkflowTokensType }>`
    background-color: ${backgroundColor || 'transparent'};
    border: 2px solid ${borderColor || 'transparent'};
    width: ${(props) => props.$tokens.handle.width};
    height: ${(props) => props.$tokens.handle.height};
    border-radius: 50%;
    transition: ${TRANSITIONS.DEFAULT};

    &:hover {
        background-color: ${hoverBackgroundColor ||
        backgroundColor ||
        'transparent'};
        border: 2px solid ${hoverBorderColor || borderColor || 'transparent'};
    }
`

/**
 * Creates a styled handle component using token-based styling
 *
 * @returns Styled handle component that uses tokens for all styling
 *
 * @example
 * ```tsx
 * const DefaultHandle = createTokenStyledHandle()
 * <DefaultHandle type="source" position={Position.Right} $tokens={tokens} />
 * ```
 */
export const createTokenStyledHandle = () => styled(Handle)<{
    $tokens: WorkflowTokensType
}>`
    background-color: ${(props) => props.$tokens.handle.backgroundColor};
    border: ${(props) => props.$tokens.handle.border};
    width: ${(props) => props.$tokens.handle.width};
    height: ${(props) => props.$tokens.handle.height};
    border-radius: 50%;
    transition: ${TRANSITIONS.DEFAULT};

    &:hover {
        background-color: ${(props) =>
            props.$tokens.handle.hover.backgroundColor};
        border: ${(props) => props.$tokens.handle.hover.border};
    }
`

/**
 * Creates a gradient wrapper component for nodes with gradient backgrounds
 *
 * @param gradientStart - Starting color of the gradient
 * @param gradientEnd - Ending color of the gradient
 * @param borderColor - Border color
 * @returns Styled div component with gradient background
 *
 * @example
 * ```tsx
 * const GreenGradient = createGradientWrapper(
 *   FOUNDATION_THEME.colors.green[50],
 *   FOUNDATION_THEME.colors.green[100],
 *   FOUNDATION_THEME.colors.green[300]
 * )
 * ```
 */
export const createGradientWrapper = (
    gradientStart: string | undefined,
    gradientEnd: string | undefined,
    borderColor: string | undefined
) => styled.div<{ $boxShadow: string | undefined }>`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    align-items: center;
    background: linear-gradient(
        135deg,
        ${gradientStart || '#fff'} 0%,
        ${gradientEnd || '#fff'} 100%
    );
    border: 1px solid ${borderColor || 'transparent'};
    box-shadow: ${(props) => props.$boxShadow || 'none'};
`

/**
 * Computes box shadow based on selection state
 *
 * @param selected - Whether the node/edge is selected
 * @param selectedShadow - Box shadow for selected state
 * @param defaultShadow - Box shadow for default state
 * @returns Appropriate box shadow value
 *
 * @example
 * ```tsx
 * const shadow = getBoxShadow(selected, tokens.node.selected.boxShadow, tokens.node.default.boxShadow)
 * ```
 */
export const getBoxShadow = (
    selected: boolean,
    selectedShadow: string | undefined,
    defaultShadow: string | undefined
): string | undefined => {
    return selected ? selectedShadow : defaultShadow
}

/**
 * Computes stroke color for edges based on state
 *
 * @param selected - Whether the edge is selected
 * @param animated - Whether the edge is animated
 * @param selectedStroke - Stroke color for selected state
 * @param animatedStroke - Stroke color for animated state
 * @param defaultStroke - Stroke color for default state
 * @returns Appropriate stroke color
 *
 * @example
 * ```tsx
 * const stroke = getEdgeStroke(selected, animated, tokens.edge.selected.stroke, tokens.edge.animated.stroke, tokens.edge.stroke)
 * ```
 */
export const getEdgeStroke = (
    selected: boolean | undefined,
    animated: boolean | undefined,
    selectedStroke: string | undefined,
    animatedStroke: string | undefined,
    defaultStroke: string | undefined
): string | undefined => {
    if (selected) return selectedStroke
    if (animated) return animatedStroke
    return defaultStroke
}

/**
 * Computes stroke width for edges based on selection state
 *
 * @param selected - Whether the edge is selected
 * @param selectedWidth - Stroke width for selected state
 * @param defaultWidth - Stroke width for default state
 * @returns Appropriate stroke width
 *
 * @example
 * ```tsx
 * const width = getEdgeStrokeWidth(selected, tokens.edge.selected.strokeWidth, tokens.edge.strokeWidth)
 * ```
 */
export const getEdgeStrokeWidth = (
    selected: boolean | undefined,
    selectedWidth: number | string | undefined,
    defaultWidth: number | string | undefined
): number | string | undefined => {
    return selected ? selectedWidth : defaultWidth
}
