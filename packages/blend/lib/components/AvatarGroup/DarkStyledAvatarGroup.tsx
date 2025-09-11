import styled from 'styled-components'
import { foundationToken } from '../../foundationToken'
import type {
    StyledAvatarGroupContainerProps,
    StyledAvatarWrapperProps,
    StyledOverflowCounterProps,
} from './types'
import avatarGroupTokens from './avatarGroup.tokens'

/* Container */
/* Dark Theme Styled Components */
export const DarkStyledAvatarGroupContainer = styled.div<StyledAvatarGroupContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const DarkStyledAvatarWrapper = styled.div<StyledAvatarWrapperProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: -${(props) => avatarGroupTokens.container.spacing[props.$size]};
    z-index: ${(props) =>
        avatarGroupTokens.darkThemeavatar.stacking.zIndex +
        (props.$total - props.$index)};

    /* First avatar doesn't need negative margin */
    ${(props) => props.$index === 0 && `margin-left: 0;`}

    /* Border ring around avatar: dark border for dark theme */
  & > div {
        border: 2px solid ${foundationToken.colors.gray[700]};
    }

    /* Selected avatar ring */
    ${(props) =>
        props.$isSelected &&
        `
    & > div {
      box-shadow: 0 0 0 2px ${foundationToken.colors.primary[500]};
      outline: 2px solid ${foundationToken.colors.gray[900]};
    }
  `}

    &:focus-visible {
        outline: 2px solid ${foundationToken.colors.primary[500]};
        outline-offset: 2px;
    }
`

export const DarkStyledOverflowCounter = styled.button<StyledOverflowCounterProps>`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: -${(props) => avatarGroupTokens.container.spacing[props.$size]};

    width: ${(props) =>
        avatarGroupTokens.overflowCounter.sizes[props.$size].width};
    height: ${(props) =>
        avatarGroupTokens.overflowCounter.sizes[props.$size].height};
    font-size: ${(props) =>
        avatarGroupTokens.overflowCounter.sizes[props.$size].fontSize};
    font-weight: ${foundationToken.fontWeight[500]};

    color: ${avatarGroupTokens.overflowCounter.text.color};
    background-color: ${(props) =>
        props.$isOpen
            ? avatarGroupTokens.overflowCounter.background.active
            : avatarGroupTokens.overflowCounter.background.default};

    border-radius: ${(props) =>
        avatarGroupTokens.overflowCounter.shapes[props.$shape].borderRadius};
    border: 2px solid ${foundationToken.colors.gray[700]}; /* DARK border */

    transition:
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    z-index: ${avatarGroupTokens.darkThemeavatar.stacking.zIndex};

    &:hover {
        background-color: ${avatarGroupTokens.overflowCounter.background.hover};
    }

    &:focus-visible {
        outline: 2px solid ${foundationToken.colors.primary[500]};
        outline-offset: 2px;
    }

    ${(props) =>
        props.$isOpen &&
        `
    box-shadow: 0 0 0 2px ${foundationToken.colors.primary[500]};
    outline: 2px solid ${foundationToken.colors.gray[900]};
  `}
`

export const DarkStyledMenuContainer = styled.div`
    position: fixed;
    z-index: ${avatarGroupTokens.menu.zIndex};
    margin-top: ${avatarGroupTokens.menu.spacing};
    background-color: ${foundationToken.colors.gray[900]};
    color: ${foundationToken.colors.gray[50]};
    border-radius: 4px;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.3),
        0 2px 4px -1px rgba(0, 0, 0, 0.2);
`

export const DarkVisuallyHidden = styled.span`
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
