import styled from 'styled-components'
import { Handle } from 'reactflow'
import type { WorkflowTokensType } from './workflow.tokens'
import { TRANSITIONS } from './constants'

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

export const getBoxShadow = (
    selected: boolean,
    selectedShadow: string | undefined,
    defaultShadow: string | undefined
): string | undefined => {
    return selected ? selectedShadow : defaultShadow
}

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

export const getEdgeStrokeWidth = (
    selected: boolean | undefined,
    selectedWidth: number | string | undefined,
    defaultWidth: number | string | undefined
): number | string | undefined => {
    return selected ? selectedWidth : defaultWidth
}
