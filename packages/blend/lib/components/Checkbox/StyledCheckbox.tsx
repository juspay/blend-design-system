import styled, { css } from 'styled-components'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {
    CheckboxSize,
    CheckboxCheckedState,
    CheckboxInteractionState,
} from './types'
import type { CheckboxTokensType } from './checkbox.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const getInteractionState = (
    isDisabled: boolean,
    error?: boolean
): Exclude<CheckboxInteractionState, CheckboxInteractionState.HOVER> => {
    if (isDisabled) return CheckboxInteractionState.DISABLED
    if (error) return CheckboxInteractionState.ERROR
    return CheckboxInteractionState.DEFAULT
}

export const StyledCheckboxRoot = styled(CheckboxPrimitive.Root)<{
    size: CheckboxSize
    $isDisabled: boolean
    $checked: boolean | 'indeterminate'
    $error?: boolean
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    ${({ size, $isDisabled, $checked, $error }) => {
        const tokens = useResponsiveTokens<CheckboxTokensType>('CHECKBOX')
        const currentCheckedState: CheckboxCheckedState =
            $checked === 'indeterminate'
                ? CheckboxCheckedState.INDETERMINATE
                : $checked
                  ? CheckboxCheckedState.CHECKED
                  : CheckboxCheckedState.UNCHECKED

        const currentInteractionState = getInteractionState($isDisabled, $error)

        return css`
            border-radius: ${tokens.indicator.borderRadius[size]};
            background-color: ${tokens.indicator.backgroundColor[
                currentCheckedState
            ]?.[currentInteractionState]};
            border-style: solid;
            border: ${tokens.indicator.border[currentCheckedState]?.[
                currentInteractionState
            ]};
            width: ${tokens.indicator.width[size]};
            height: ${tokens.indicator.height[size]};
            margin: 0;
            padding: 0;
            flex-shrink: 0;
            transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

            &:focus-visible {
                outline: ${tokens.indicator.outline};
                outline-offset: ${tokens.indicator.outlineOffset};
                box-shadow: ${tokens.indicator.boxShadow};
            }

            &:not([disabled]):hover {
                background-color: ${tokens.indicator.backgroundColor[
                    currentCheckedState
                ]?.hover};
                border: ${tokens.indicator.border[currentCheckedState]?.hover};
            }

            ${$isDisabled &&
            css`
                opacity: 0.7; // Or use token: tokens.opacity.disabled or similar if available
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
    size: CheckboxSize
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    ${() => {
        return css`
            &[data-state='checked'],
            &[data-state='indeterminate'] {
                animation: scale-in 150ms cubic-bezier(0.4, 0, 0.2, 1);
            }

            &[data-state='unchecked'] {
                animation: scale-out 150ms cubic-bezier(0.4, 0, 0.2, 1);
            }
        `
    }}

    @keyframes scale-in {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes scale-out {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0.8);
            opacity: 0;
        }
    }
`
