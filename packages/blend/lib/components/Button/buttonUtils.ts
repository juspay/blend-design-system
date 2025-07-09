import { ButtonType, ButtonSize, ButtonSubType } from "./types";
import buttonTokens from "./token";
import { css } from "styled-components";
import { foundationToken } from "../../foundationToken";

// Size configurations for button and icons
export const buttonSizes = {
  [ButtonSize.SMALL]: {
    padding: `${foundationToken.spacing[6]} ${foundationToken.spacing[12]}`,
    fontSize: foundationToken.fontSize.bodyMD,
    height: "32px",
    iconSize: "16px",
  },
  [ButtonSize.MEDIUM]: {
    padding: `${foundationToken.spacing[8]} ${foundationToken.spacing[16]}`,
    fontSize: foundationToken.fontSize.bodyMD,
    height: "40px",
    iconSize: "18px",
  },
  [ButtonSize.LARGE]: {
    padding: `${foundationToken.spacing[10]} ${foundationToken.spacing[16]}`,
    fontSize: foundationToken.fontSize.bodyLG,
    height: "48px",
    iconSize: "20px",
  },
};

// Get button size styles
export const getButtonSizeStyles = (
  size: ButtonSize,
  subType: ButtonSubType,
) => {
  if (
    subType === ButtonSubType.ICON_ONLY ||
    subType === ButtonSubType.PLAIN_ICON
  ) {
    return css`
      width: ${buttonSizes[size].height};
      height: ${buttonSizes[size].height};
      padding: 0;
    `;
  }

  return css`
    height: ${buttonSizes[size].height};
    padding: ${buttonSizes[size].padding};
    font-size: ${buttonSizes[size].fontSize};
  `;
};

// Get button type key
export const getButtonTypeKey = (
  type: ButtonType,
): "primary" | "secondary" | "danger" | "success" => {
  switch (type) {
    case ButtonType.PRIMARY:
      return "primary";
    case ButtonType.SECONDARY:
      return "secondary";
    case ButtonType.DANGER:
      return "danger";
    case ButtonType.SUCCESS:
      return "success";
    default:
      return "primary";
  }
};

// Get button type styles
export const getButtonTypeStyles = (
  buttonType: ButtonType,
  subType: ButtonSubType,
) => {
  const typeKey = getButtonTypeKey(buttonType);

  if (subType === ButtonSubType.LINK) {
    return css`
      background-color: transparent;
      color: ${buttonTokens.link[typeKey]};
      border: none;
      padding-left: 0;
      padding-right: 0;

      &:hover:not(:disabled) {
        text-decoration: underline;
      }

      &:active:not(:disabled) {
        color: ${buttonTokens.link.active?.[typeKey] ||
        buttonTokens.link[typeKey]};
      }

      &:focus-visible:not(:disabled) {
        outline: 2px solid
          ${buttonTokens.outline?.[typeKey] ||
          foundationToken.colors.primary[300]};
        outline-offset: 2px;
      }

      &:disabled {
        color: ${buttonTokens.text[typeKey].disabled};
        opacity: ${buttonTokens.opacity.disabled};
        cursor: not-allowed;
      }
    `;
  }

  if (subType === ButtonSubType.PLAIN_ICON) {
    return css`
      background-color: ${buttonTokens.plainIcon.background};
      color: ${buttonTokens.text[typeKey].default};
      border: none;

      &:hover:not(:disabled) {
        background-color: ${buttonTokens.background.plainIcon.hover};
      }

      &:active:not(:disabled) {
        background-color: ${buttonTokens.background.plainIcon.active};
      }

      &:focus-visible:not(:disabled) {
        outline: 2px solid ${buttonTokens.outline?.[typeKey]};
        outline-offset: 2px;
      }

      &:disabled {
        color: ${buttonTokens.text[typeKey].disabled};
        opacity: ${buttonTokens.opacity.disabled};
        cursor: not-allowed;
      }
    `;
  }

  const borderWidth =
    typeKey === "primary"
      ? foundationToken.borderWidth[1.5]
      : typeKey === "danger"
        ? foundationToken.borderWidth[1.5]
        : typeKey === "success"
          ? foundationToken.borderWidth[1.5]
          : foundationToken.borderWidth[1];

  // Check if this button type uses gradient
  const hasGradient =
    typeKey === "primary" || typeKey === "danger" || typeKey === "success";

  return css`
    background: ${buttonTokens.background[typeKey].default};
    color: ${buttonTokens.text[typeKey].default};
    border: ${borderWidth} solid ${buttonTokens.border[typeKey].default};

    /* For gradient buttons, set a background-color matching the gradient to prevent flashing */
    ${hasGradient &&
    `
      background-color: ${buttonTokens.background[typeKey].hover};
    `}

    &:hover:not(:disabled) {
      background: ${buttonTokens.background[typeKey].hover};
      border-color: ${buttonTokens.border[typeKey].hover ||
      buttonTokens.border[typeKey].default};
    }

    &:active:not(:disabled) {
      background: ${buttonTokens.background[typeKey].active};
      border: ${borderWidth} solid
        ${typeKey === "danger"
          ? "transparent"
          : buttonTokens.border[typeKey].active ||
            buttonTokens.border[typeKey].hover ||
            buttonTokens.border[typeKey].default};
      box-shadow: ${buttonTokens.boxShadow[typeKey].active};
      transform: translateY(1px);
    }

    &:focus-visible:not(:disabled) {
      box-shadow: ${buttonTokens.boxShadow[typeKey].focused};
      outline: none;
    }

    &:disabled {
      background: ${buttonTokens.background[typeKey].disabled};
      border: none;
      color: ${buttonTokens.text[typeKey].disabled};
      opacity: ${buttonTokens.opacity.disabled};
      cursor: not-allowed;
    }
  `;
};

// Get loading styles
export const getLoadingStyles = (isLoading: boolean) => {
  if (!isLoading) return css``;

  return css`
    color: transparent;
    pointer-events: none;

    &::after {
      content: "";
      position: absolute;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 2px solid currentColor;
      border-top-color: transparent;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
};

// Get base button styles
export const getBaseButtonStyles = () => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${foundationToken.spacing[6]};
  border-radius: ${foundationToken.borderRadius[10]};
  font-size: ${foundationToken.fontSize.bodyMD};
  font-style: normal;
  font-weight: ${foundationToken.fontWeight[600]};
  line-height: ${foundationToken.lineHeight[20]};
  letter-spacing: 0;
  transition: all ${buttonTokens.transition.duration}
    ${buttonTokens.transition.timing};
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  position: relative;
`;
