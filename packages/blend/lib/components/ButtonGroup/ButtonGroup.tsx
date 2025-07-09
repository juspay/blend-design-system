"use client";

import * as React from "react";
import { ButtonProps, ButtonSize } from "../Button/types";
import { ButtonGroupProps, ButtonGroupMode } from "./types";
import {
  getButtonPosition,
  findPrimaryButtonIndex,
  getTransformedButtonType,
} from "./buttonGroupUtils";
import {
  StyledButtonGroupContainer,
  StyledButtonWrapper,
} from "./StyledButtonGroup";

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      size = ButtonSize.MEDIUM,
      isStacked = true,
      mode = ButtonGroupMode.SINGLE_PRIMARY,
      children,
      ...props
    },
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children).filter(
      React.isValidElement,
    ) as React.ReactElement[];
    const totalChildren = childrenArray.length;

    const primaryButtonIndex =
      mode === ButtonGroupMode.SINGLE_PRIMARY
        ? findPrimaryButtonIndex(childrenArray)
        : -1;

    return (
      <StyledButtonGroupContainer
        ref={ref}
        $isStacked={isStacked}
        $size={size}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          const childProps = child.props as Partial<ButtonProps>;

          const finalButtonType = getTransformedButtonType(
            childProps.buttonType,
            mode,
            index,
            primaryButtonIndex,
          );

          const position = getButtonPosition(index, totalChildren);

          const buttonElement = React.cloneElement(child, {
            ...childProps,
            buttonType: finalButtonType,
            size: size,
          } as React.HTMLAttributes<HTMLElement>);

          if (isStacked) {
            return (
              <StyledButtonWrapper $position={position} $isStacked={isStacked}>
                {buttonElement}
              </StyledButtonWrapper>
            );
          }

          return buttonElement;
        })}
      </StyledButtonGroupContainer>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
