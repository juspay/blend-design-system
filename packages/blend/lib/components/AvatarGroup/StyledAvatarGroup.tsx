import styled from 'styled-components'
import { foundationToken } from '../../foundationToken'
import type {
    StyledAvatarGroupContainerProps,
    StyledAvatarWrapperProps,
    StyledOverflowCounterProps,
} from './types'
import type { AvatarGroupTokensType } from './avatarGroup.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

export const StyledAvatarGroupContainer = styled.div<StyledAvatarGroupContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const StyledAvatarWrapper = styled.div<StyledAvatarWrapperProps>`
    ${(props) => {
        const tokens =
            useResponsiveTokens<AvatarGroupTokensType>('AVATAR_GROUP')

        return `
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-left: ${props.$index === 0 ? '0' : `-${tokens.container.spacing[props.$size]}`};
            z-index: ${tokens.avatar.stacking.zIndex + (props.$total - props.$index)};

            /* Border ring around avatar */
            & > div {
                border: ${tokens.avatar.border.width} solid ${tokens.avatar.border.color};
            }

            ${
                props.$isSelected
                    ? `
                & > div {
                    box-shadow: 0 0 0 ${tokens.avatar.selected.ringWidth} ${tokens.avatar.selected.ringColor};
                    outline: ${tokens.avatar.selected.ringOffset} solid ${foundationToken.colors.gray[0]};
                }
            `
                    : ''
            }

            &:focus-visible {
                outline: 2px solid ${foundationToken.colors.primary[500]};
                outline-offset: 2px;
            }
        `
    }}
`

export const StyledOverflowCounter = styled.button<StyledOverflowCounterProps>`
    ${(props) => {
        const tokens =
            useResponsiveTokens<AvatarGroupTokensType>('AVATAR_GROUP')

        return `
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-left: -${tokens.container.spacing[props.$size]};

            width: ${tokens.overflowCounter.size[props.$size].width};
            height: ${tokens.overflowCounter.size[props.$size].height};
            font-size: ${tokens.overflowCounter.size[props.$size].fontSize};
            font-weight: ${foundationToken.fontWeight[500]};

            color: ${tokens.overflowCounter.text.color};
            background-color: ${
                props.$isOpen
                    ? tokens.overflowCounter.background.active
                    : tokens.overflowCounter.background.default
            };

            border-radius: ${tokens.overflowCounter.borderRadius[props.$shape]};
            border: ${tokens.overflowCounter.border.width} solid ${tokens.overflowCounter.border.color};

            transition: background-color 0.2s ease, box-shadow 0.2s ease;
            z-index: ${tokens.avatar.stacking.zIndex};

            &:hover {
                background-color: ${tokens.overflowCounter.background.hover};
            }

            &:focus-visible {
                outline: 2px solid ${foundationToken.colors.primary[500]};
                outline-offset: 2px;
            }

            ${
                props.$isOpen
                    ? `
                box-shadow: 0 0 0 ${tokens.avatar.selected.ringWidth} ${tokens.avatar.selected.ringColor};
                outline: ${tokens.avatar.selected.ringOffset} solid ${foundationToken.colors.gray[0]};
            `
                    : ''
            }
        `
    }}
`

export const StyledMenuContainer = styled.div`
    ${() => {
        const tokens =
            useResponsiveTokens<AvatarGroupTokensType>('AVATAR_GROUP')

        return `
            position: fixed;
            z-index: ${tokens.menu.zIndex};
            margin-top: ${tokens.menu.spacing};
        `
    }}
`

export const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
`
