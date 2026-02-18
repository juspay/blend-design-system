import styled, { css } from 'styled-components'
import { RadioV2Size } from './radioV2.types'
import type { RadioV2TokensType } from './radioV2.tokens'

import { radioV2Animations } from './radioV2.animation'

export const StyledRadioV2Root = styled.input<{
    size: RadioV2Size
    $isDisabled: boolean
    $isChecked: boolean
    $error?: boolean
    $tokens: RadioV2TokensType
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
            ${radioV2Animations}

            background-color: ${$tokens.radio.indicator[indicatorState]
                .backgroundColor[state]};
            border: ${$tokens.radio.borderWidth[indicatorState][state]}px solid
                ${$tokens.radio.indicator[indicatorState].borderColor[state]};
            width: ${$tokens.radio.height[size]};
            height: ${$tokens.radio.height[size]};

            &::after {
                content: '';
                width: 50%;
                height: 50%;
                border-radius: 50%;
                background-color: ${$isChecked
                    ? $tokens.radio.activeIndicator.active.backgroundColor[
                          state
                      ]
                    : 'transparent'};
                transform: ${$isChecked ? 'scale(1)' : 'scale(0)'};
                transition:
                    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
                    background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
            }
            &:focus-visible {
                outline: ${$tokens.radio.borderWidth[indicatorState][state]}px
                    solid
                    ${$tokens.radio.indicator[indicatorState].borderColor[
                        state
                    ]};
                outline-offset: 2px;
                /* WCAG 2.4.7 Focus Visible (AA): Focus indicator must be visible
                 * WCAG 1.4.11 Non-text Contrast (AA): Focus outline must have contrast ratio ≥3:1 against adjacent colors
                 * Manual verification recommended for all states */
            }

            &:not(:disabled):hover {
                background-color: ${$tokens.radio.indicator[indicatorState]
                    .backgroundColor.hover};
                border-color: ${$tokens.radio.indicator[indicatorState]
                    .borderColor.hover};
            }

            cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
        `
    }}
`
