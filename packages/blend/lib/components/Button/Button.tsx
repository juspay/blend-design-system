"use client";

import { forwardRef } from "react";
import {
  ButtonType,
  ButtonSize,
  ButtonSubType,
  type ButtonProps,
} from "./types";
import { StyledButton, IconContainer } from "./StyledButton";
import { buttonSizes } from "./buttonUtils";

// Button component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = ButtonType.PRIMARY,
      size = ButtonSize.MEDIUM,
      subType = ButtonSubType.DEFAULT,
      text,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      isLoading = false,
      isDisabled = false,
      ariaLabel,
      ariaExpanded,
      ariaControls,
      ariaPressed,
      ariaHasPopup,
      ...props
    },
    ref,
  ) => {
    const hasLeadingIcon = !!LeadingIcon;
    const hasTrailingIcon = !!TrailingIcon;
    const isIconOnly =
      subType === ButtonSubType.ICON_ONLY ||
      subType === ButtonSubType.PLAIN_ICON;

    return (
      <StyledButton
        ref={ref}
        $buttonType={buttonType}
        $size={size}
        $subType={subType}
        $hasLeadingIcon={hasLeadingIcon}
        $hasTrailingIcon={hasTrailingIcon}
        $isLoading={isLoading}
        disabled={isDisabled || isLoading}
        aria-label={ariaLabel || (isIconOnly ? text : undefined)}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-pressed={ariaPressed}
        aria-haspopup={ariaHasPopup}
        {...props}
      >
        {isLoading ? null : (
          <>
            {hasLeadingIcon && (
              <IconContainer>
                <LeadingIcon size={buttonSizes[size].iconSize} />
              </IconContainer>
            )}
            {!isIconOnly && text}
            {hasTrailingIcon && (
              <IconContainer>
                <TrailingIcon size={buttonSizes[size].iconSize} />
              </IconContainer>
            )}
          </>
        )}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
