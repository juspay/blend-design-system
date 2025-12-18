import styled, { css } from 'styled-components'
import { SwitchSize } from './types'
import type { SwitchTokensType } from './switch.token'

import {
    switchRootAnimations,
    switchThumbAnimations,
} from './switch.animations'

export const StyledSwitchRoot = styled.button<{
    size: SwitchSize
    $isDisabled: boolean
    $isChecked: boolean
    $error?: boolean
    $tokens: SwitchTokensType
}>`
    ${({ size, $isDisabled, $isChecked, $tokens }) => {
        const tokens = $tokens
        return css`
            ${switchRootAnimations}

            position: relative;
            border-radius: ${tokens.switchContainer.borderRadius[size]};
            border: none;
            outline: none;
            cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;

            width: ${tokens.switchContainer.width[size]};
            min-width: ${tokens.switchContainer.width[size]};
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
    $tokens: SwitchTokensType
}>`
    ${({ size, $isChecked, $tokens }) => {
        const tokens = $tokens
        return css`
            ${switchThumbAnimations}

            position: absolute;
            top: ${tokens.switchContainer.thumb.size[size].top};
            left: ${$isChecked
                ? `${tokens.switchContainer.thumb.size[size].left}`
                : '-1px'};
            border-radius: ${tokens.switchContainer.thumb.borderRadius[size]};
            background-color: ${tokens.switchContainer.thumb.backgroundColor};
            border: ${tokens.switchContainer.thumb.border.width} solid
                ${tokens.switchContainer.thumb.border.color};

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

/**
 * Slot wrapper (right-side icon next to label)
 * Ensures any oversized slot content (e.g. <img />) fits inside 14x14.
 */
export const StyledSwitchSlot = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    flex: 0 0 14px;
    overflow: hidden;
    line-height: 0;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }

    & > svg {
        width: 100%;
        height: 100%;
        display: block;
    }

    & > * {
        max-width: 100%;
        max-height: 100%;
    }
`
