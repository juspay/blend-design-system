import React, { forwardRef, useState } from "react";
import { SwitchGroupProps } from "./types";
import {
  isSwitchElement,
  createSwitchGroupChangeHandler,
  getSwitchTextProps,
} from "./utils";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { Switch } from "./Switch";
import { useComponentToken } from "../../context/useComponentToken";
import { SwitchTokensType } from "./switch.token";
import { SwitchSize } from "./types";

const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(
  (
    {
      id,
      label,
      name,
      defaultValue = [],
      value: controlledValue,
      children,
      onChange,
      disabled = false,
    },
    ref,
  ) => {
    const tokens = useComponentToken("SWITCH") as SwitchTokensType;
    const [internalValues, setInternalValues] =
      useState<string[]>(defaultValue);

    const isControlled = controlledValue !== undefined;
    const values = isControlled ? controlledValue : internalValues;

    const handleGroupChange = createSwitchGroupChangeHandler(
      values,
      isControlled,
      setInternalValues,
      onChange,
    );

    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (isSwitchElement(child, Switch)) {
        const childValue = child.props.value;

        if (!childValue) return child;

        return React.cloneElement(child, {
          checked: values.includes(childValue),
          onChange: (checked: boolean) => {
            handleGroupChange(checked, childValue);

            // Call original onChange if it exists
            child.props.onChange?.(checked);
          },
          name: name,
          disabled: disabled || child.props.disabled,
        });
      }

      return child;
    });

    return (
      <Block
        ref={ref}
        role="group"
        id={id}
        display="flex"
        flexDirection="column"
        gap={tokens.gap}
      >
        {label && <GroupLabel tokens={tokens}>{label}</GroupLabel>}
        <Block display="flex" flexDirection="column" gap={tokens.gap}>
          {enhancedChildren}
        </Block>
      </Block>
    );
  },
);

/**
 * Extracted group label component for better maintainability
 */
const GroupLabel: React.FC<{
  children: React.ReactNode;
  tokens: SwitchTokensType;
}> = ({ children, tokens }) => {
  const textProps = getSwitchTextProps(tokens, SwitchSize.MEDIUM, false, false);

  return (
    <PrimitiveText
      as="label"
      fontSize={textProps.fontSize}
      fontWeight={textProps.fontWeight}
      color={textProps.color}
      style={{ marginBottom: tokens.gap }}
    >
      {children}
    </PrimitiveText>
  );
};

SwitchGroup.displayName = "SwitchGroup";

export default SwitchGroup;
