import styled from "styled-components";
import {
  StyledAvatarContainerProps,
  StyledAvatarIndicatorProps,
} from "./types";
import avatarTokens from "./token";
import { foundationToken } from "../../foundationToken";

export const StyledAvatarContainer = styled.div<StyledAvatarContainerProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $hasImage }) =>
    $hasImage ? "transparent" : avatarTokens.container.background.default};
  border: 1px solid
    ${({ $hasImage }) =>
      $hasImage
        ? avatarTokens.container.border.withImage
        : avatarTokens.container.border.withoutImage};

  width: ${({ $size }) => avatarTokens.sizes[$size].width};
  height: ${({ $size }) => avatarTokens.sizes[$size].height};
  border-radius: ${({ $shape }) => avatarTokens.shapes[$shape].borderRadius};

  font-size: ${({ $size }) => avatarTokens.sizes[$size].fontSize};
  font-weight: ${({ $size }) => avatarTokens.sizes[$size].fontWeight};
`;

export const StyledAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const StyledAvatarFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${avatarTokens.text.color.default};
  user-select: none;
  border-radius: inherit;
  overflow: hidden;
`;

export const StyledAvatarIndicator = styled.span<StyledAvatarIndicatorProps>`
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: ${({ $size }) => avatarTokens.sizes[$size].indicatorSize};
  height: ${({ $size }) => avatarTokens.sizes[$size].indicatorSize};
  background-color: ${avatarTokens.indicator.background.default};
  border-radius: ${avatarTokens.shapes.circular.borderRadius};
  border: ${({ $size }) => avatarTokens.sizes[$size].indicatorRingWidth} solid
    ${avatarTokens.indicator.ring.color};
  transform: translate(30%, -30%);
  z-index: 1;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
`;

export const StyledAvatarWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const StyledAvatarLeadingSlot = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${foundationToken.spacing[8]};
  color: ${foundationToken.colors.gray[700]};
`;

export const StyledAvatarTrailingSlot = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${foundationToken.spacing[8]};
  color: ${foundationToken.colors.gray[700]};
`;
