import styled, { css } from 'styled-components'
import { RadioSize } from './types'
import type { RadioTokensType } from './radio.token'

import { radioAnimations } from './radio.animations'

export const StyledRadioInput = styled.input<{
    size: RadioSize
    $isDisabled: boolean
    $isChecked: boolean
    $error?: boolean
    $tokens: RadioTokensType
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

    ${({ size, $isChecked, $isDisabled, $tokens }) => {
        const state = $isDisabled ? 'disabled' : 'default'
        const indicatorState = $isChecked ? 'active' : 'inactive'

        return css`
            ${radioAnimations}

            background-color: ${$tokens.indicator[indicatorState]
                .backgroundColor[state]};
            border: ${$tokens.borderWidth[indicatorState][state]}px solid
                ${$tokens.indicator[indicatorState].borderColor[state]};
            width: ${$tokens.height[size]};
            height: ${$tokens.height[size]};

            &::after {
                content: '';
                width: 50%;
                height: 50%;
                border-radius: 50%;
                background-color: ${$isChecked
                    ? $tokens.activeIndicator.active.backgroundColor[state]
                    : 'transparent'};
                transform: ${$isChecked ? 'scale(1)' : 'scale(0)'};
                transition:
                    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
                    background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
            }
            &:focus-visible {
                outline: 2px solid
                    ${$tokens.indicator[indicatorState].borderColor[state]};
                outline-offset: 2px;
                /* WCAG 2.4.7 Focus Visible (AA): Focus indicator must be visible
                 * WCAG 1.4.11 Non-text Contrast (AA): Focus outline must have contrast ratio ≥3:1 against adjacent colors
                 * Manual verification recommended for all states */
            }

            &:not(:disabled):hover {
                background-color: ${$tokens.indicator[indicatorState]
                    .backgroundColor.hover};
                border-color: ${$tokens.indicator[indicatorState].borderColor
                    .hover};
            }

            cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
        `
    }}
`
