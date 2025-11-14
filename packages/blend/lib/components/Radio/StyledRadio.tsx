import styled, { css } from 'styled-components'
import { RadioSize } from './types'
import type { RadioTokensType } from './radio.token'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { radioAnimations } from './radio.animations'

export const StyledRadioInput = styled.input<{
    size: RadioSize
    $isDisabled: boolean
    $isChecked: boolean
    $error?: boolean
}>`
    appearance: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    flex-shrink: 0;

    ${({ size, $isChecked, $isDisabled }) => {
        const radioTokens = useResponsiveTokens<RadioTokensType>('RADIO')

        const state = $isDisabled ? 'disabled' : 'default'
        const indicatorState = $isChecked ? 'active' : 'inactive'

        return css`
            ${radioAnimations}

            background-color: ${radioTokens.indicator[indicatorState]
                .backgroundColor[state]};
            border: ${radioTokens.borderWidth[indicatorState][state]}px solid
                ${radioTokens.indicator[indicatorState].borderColor[state]};
            width: ${radioTokens.height[size]};
            height: ${radioTokens.height[size]};

            &::after {
                content: '';
                width: 50%;
                height: 50%;
                border-radius: 50%;
                background-color: ${$isChecked
                    ? radioTokens.activeIndicator.active.backgroundColor[state]
                    : 'transparent'};
                transform: ${$isChecked ? 'scale(1)' : 'scale(0)'};
                transition:
                    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
                    background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
            }

            &:focus-visible {
                outline: 2px solid
                    ${radioTokens.indicator[indicatorState].borderColor[state]};
                outline-offset: 2px;
            }

            &:not(:disabled):hover {
                background-color: ${radioTokens.indicator[indicatorState]
                    .backgroundColor.hover};
                border-color: ${radioTokens.indicator[indicatorState]
                    .borderColor.hover};
            }

            cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
        `
    }}
`
