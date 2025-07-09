import styled from "styled-components";
import { ButtonType, ButtonSize, ButtonSubType } from "./types";
import {
  getBaseButtonStyles,
  getButtonSizeStyles,
  getButtonTypeStyles,
  getLoadingStyles,
} from "./buttonUtils";

// Styled button component
export const StyledButton = styled.button<{
  $buttonType: ButtonType;
  $size: ButtonSize;
  $subType: ButtonSubType;
  $hasLeadingIcon: boolean;
  $hasTrailingIcon: boolean;
  $isLoading: boolean;
}>`
  ${getBaseButtonStyles}
  ${({ $size, $subType }) => getButtonSizeStyles($size, $subType)}
  ${({ $buttonType, $subType }) => getButtonTypeStyles($buttonType, $subType)}
  ${({ $isLoading }) => getLoadingStyles($isLoading)}
`;

// Icon container styles
export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
