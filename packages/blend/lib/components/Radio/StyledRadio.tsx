import styled, { css } from 'styled-components'
import { RadioSize } from './types'
import type { RadioTokensType } from './radio.token'

import { radioAnimations } from './radio.animations'

export const StyledRadioInput = styled.input<{
    size: RadioSize
    $isDisabled: boolean
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

    ${({ size, $isDisabled, $tokens }) => {
        const state = $isDisabled ? 'disabled' : 'default'
        const inactiveIndicator = $tokens.indicator.inactive
        const activeIndicator = $tokens.indicator.active

        return css`
            ${radioAnimations}

            background-color: ${inactiveIndicator.backgroundColor[state]};
            border: ${$tokens.borderWidth.inactive[state]}px solid
                ${inactiveIndicator.borderColor[state]};
            width: ${$tokens.height[size]};
            height: ${$tokens.height[size]};

            &::after {
                content: '';
                width: 50%;
                height: 50%;
                border-radius: 50%;
                background-color: transparent;
                transform: scale(0);
                transition:
                    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
                    background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
            }

            &:checked {
                background-color: ${activeIndicator.backgroundColor[state]};
                border: ${$tokens.borderWidth.active[state]}px solid
                    ${activeIndicator.borderColor[state]};

                &::after {
                    background-color: ${$tokens.activeIndicator.active
                        .backgroundColor[state]};
                    transform: scale(1);
                }
            }

            &:focus-visible {
                outline: 2px solid ${inactiveIndicator.borderColor[state]};
                outline-offset: 2px;
                /* WCAG 2.4.7 Focus Visible (AA): Focus indicator must be visible
                 * WCAG 1.4.11 Non-text Contrast (AA): Focus outline must have contrast ratio ≥3:1 against adjacent colors
                 * Manual verification recommended for all states */
            }

            &:checked:focus-visible {
                outline-color: ${activeIndicator.borderColor[state]};
            }

            &:not(:disabled):hover {
                background-color: ${inactiveIndicator.backgroundColor.hover};
                border-color: ${inactiveIndicator.borderColor.hover};
            }

            &:checked:not(:disabled):hover {
                background-color: ${activeIndicator.backgroundColor.hover};
                border-color: ${activeIndicator.borderColor.hover};
            }

            cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
        `
    }}
`
