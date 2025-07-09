import styled from "styled-components";
import {
  StyledAvatarGroupContainerProps,
  StyledAvatarWrapperProps,
  StyledOverflowCounterProps,
} from "./types";
import avatarGroupTokens from "./token";
import { foundationToken } from "../../foundationToken";

export const StyledAvatarGroupContainer = styled.div<StyledAvatarGroupContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledAvatarWrapper = styled.div<StyledAvatarWrapperProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: -${(props) => avatarGroupTokens.container.spacing[props.$size]};
  z-index: ${(props) =>
    avatarGroupTokens.avatar.stacking.zIndex + (props.$total - props.$index)};

  /* First avatar doesn't need negative margin */
  ${(props) =>
    props.$index === 0 &&
    `
    margin-left: 0;
  `}

  /* Border ring around avatar */
  & > div {
    border: ${avatarGroupTokens.avatar.border.width} solid
      ${avatarGroupTokens.avatar.border.color};
  }

  ${(props) =>
    props.$isSelected &&
    `
    & > div {
      box-shadow: 0 0 0 ${avatarGroupTokens.avatar.selected.ringWidth} ${avatarGroupTokens.avatar.selected.ringColor};
      outline: ${avatarGroupTokens.avatar.selected.ringOffset} solid ${foundationToken.colors.gray[0]};
    }
  `}

  &:focus-visible {
    outline: 2px solid ${foundationToken.colors.primary[500]};
    outline-offset: 2px;
  }
`;

export const StyledOverflowCounter = styled.button<StyledOverflowCounterProps>`
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
  border: ${avatarGroupTokens.overflowCounter.border.width} solid
    ${avatarGroupTokens.overflowCounter.border.color};

  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
  z-index: ${avatarGroupTokens.avatar.stacking.zIndex};

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
    box-shadow: 0 0 0 ${avatarGroupTokens.avatar.selected.ringWidth} ${avatarGroupTokens.avatar.selected.ringColor};
    outline: ${avatarGroupTokens.avatar.selected.ringOffset} solid ${foundationToken.colors.gray[0]};
  `}
`;

export const StyledMenuContainer = styled.div`
  position: fixed;
  z-index: ${avatarGroupTokens.menu.zIndex};
  margin-top: ${avatarGroupTokens.menu.spacing};
`;

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
`;
