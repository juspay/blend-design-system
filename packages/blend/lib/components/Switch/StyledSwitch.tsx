import styled, { css } from 'styled-components'
import { SwitchSize } from './types'
import type { SwitchTokensType } from './switch.token'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

export const StyledSwitchRoot = styled.button<{
    size: SwitchSize
    $isDisabled: boolean
    $isChecked: boolean
    $error?: boolean
}>`
    ${({ size, $isDisabled, $isChecked }) => {
        const tokens = useResponsiveTokens<SwitchTokensType>('SWITCH')

        return css`
            position: relative;
            border-radius: ${tokens.switchContainer.borderRadius[size]};
            border: none;
            outline: none;
            cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
            transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);

            margin-top: ${tokens.switchContainer.thumb.marginTop};
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;

            width: ${tokens.switchContainer.width[size]};
            height: ${tokens.switchContainer.height[size]};

            background-color: ${$isDisabled
                ? $isChecked
                    ? tokens.switchContainer.backgroundColor.active.disabled
                    : tokens.switchContainer.backgroundColor.inactive.disabled
                : $isChecked
                  ? tokens.switchContainer.backgroundColor.active.default
                  : tokens.switchContainer.backgroundColor.inactive.default};

            /* Improved focus styles for better accessibility */
            &:focus-visible {
                outline: ${tokens.switchContainer.thumb.outline};
                outline-offset: ${tokens.switchContainer.thumb.outlineOffset};
                box-shadow: ${tokens.switchContainer.thumb.boxShadow};
            }

            ${$isDisabled &&
            css`
                opacity: 0.7;
            `}

            ${!$isDisabled &&
            css`
                &:hover {
                    opacity: 0.9;
                }
            `}
        `
    }}
`

export const StyledSwitchThumb = styled.div<{
    size: SwitchSize
    $isChecked: boolean
}>`
    ${({ size, $isChecked }) => {
        const tokens = useResponsiveTokens<SwitchTokensType>('SWITCH')

        return css`
            position: absolute;
            top: ${tokens.switchContainer.thumb.size[size].top};
            left: ${$isChecked
                ? `${tokens.switchContainer.thumb.size[size].left}`
                : '-1px'};
            border-radius: ${tokens.switchContainer.thumb.borderRadius[size]};
            background-color: ${tokens.switchContainer.thumb.backgroundColor};
            border: ${tokens.switchContainer.thumb.border.width} solid
                ${tokens.switchContainer.thumb.border.color};
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

            width: ${tokens.switchContainer.thumb.size[size].width};
            height: ${tokens.switchContainer.thumb.size[size].height};

            transform: translateX(
                ${$isChecked
                    ? tokens.switchContainer.thumb.size[size].offset.active
                    : tokens.switchContainer.thumb.size[size].offset.inactive}
            );
        `
    }}
`
