import styled, { css } from 'styled-components'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {
    CheckboxV2Size,
    CheckboxV2CheckedState,
    CheckboxV2InteractionState,
} from './checkboxV2.types'
import type { CheckboxV2TokensType } from './checkboxV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    checkboxRootAnimations,
    checkboxIndicatorAnimations,
} from './checkboxV2.animations'
// import { CheckboxV2Size } from '../CheckboxV2/checkboxV2.types'

const getInteractionState = (
    isDisabled: boolean,
    error?: boolean
): Exclude<CheckboxV2InteractionState, CheckboxV2InteractionState.HOVER> => {
    if (isDisabled) return CheckboxV2InteractionState.DISABLED
    if (error) return CheckboxV2InteractionState.ERROR
    return CheckboxV2InteractionState.DEFAULT
}

export const StyledCheckboxRoot = styled(CheckboxPrimitive.Root)<{
    size: CheckboxV2Size
    $isDisabled: boolean
    $checked: boolean | 'indeterminate'
    $error?: boolean
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    ${({ size, $isDisabled, $checked, $error }) => {
        const tokens = useResponsiveTokens<CheckboxV2TokensType>('CHECKBOXV2')
        const currentCheckedState: CheckboxV2CheckedState =
            $checked === 'indeterminate'
                ? CheckboxV2CheckedState.INDETERMINATE
                : $checked
                  ? CheckboxV2CheckedState.CHECKED
                  : CheckboxV2CheckedState.UNCHECKED

        const currentInteractionState = getInteractionState($isDisabled, $error)

        return css`
            ${checkboxRootAnimations}

            border-radius: ${tokens.checkbox.borderRadius[size]};
            background-color: ${tokens.checkbox.backgroundColor[
                currentCheckedState
            ]?.[currentInteractionState]};
            border-style: solid;
            border: ${tokens.checkbox.border[currentCheckedState]?.[
                currentInteractionState
            ]};
            width: ${tokens.checkbox.width[size]};
            height: ${tokens.checkbox.height[size]};
            margin: 0;
            padding: 0;
            flex-shrink: 0;

            &:focus-visible {
                outline: ${tokens.checkbox.outline};
                outline-offset: ${tokens.checkbox.outlineOffset};
                box-shadow: ${tokens.checkbox.boxShadow};
            }

            &:not([disabled]):hover {
                background-color: ${tokens.checkbox.backgroundColor[
                    currentCheckedState
                ]?.hover};
                border: ${tokens.checkbox.border[currentCheckedState]?.hover};
            }

            ${$isDisabled &&
            css`
                opacity: ${tokens.checkbox.opacity};
                cursor: not-allowed;
            `}

            ${!$isDisabled &&
            css`
                cursor: pointer;
            `}
        `
    }}
`

export const StyledCheckboxIndicator = styled(CheckboxPrimitive.Indicator)<{
    size: CheckboxV2Size
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    ${checkboxIndicatorAnimations}
`
