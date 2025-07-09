import React, { forwardRef } from "react";
import { RadioGroupProps } from "./types";
import {
  isRadioElement,
  shouldRadioBeChecked,
  createGroupChangeHandler,
  isValidRadioValue,
  getRadioTextProps,
} from "./utils";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import Radio from "./Radio";
import { RadioTokensType } from "./radio.token";
import { useComponentToken } from "../../context/useComponentToken";
import { RadioSize } from "./types";

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, label, name, value, defaultValue, onChange, disabled }, ref) => {
    const radioTokens = useComponentToken("RADIO") as RadioTokensType;
    const handleGroupChange = createGroupChangeHandler(onChange);

    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child) || !isRadioElement(child, Radio)) {
        return null;
      }

      const childValue = child.props.value;
      if (!isValidRadioValue(childValue)) {
        console.warn("RadioGroup: Radio child must have a string value prop");
        return null;
      }

      const isChecked = shouldRadioBeChecked(value, defaultValue, childValue);

      return React.cloneElement(child, {
        name,
        checked: isChecked,
        onChange: (checked: boolean) => {
          if (checked) {
            handleGroupChange(checked, childValue);
          }
        },
        disabled: disabled || child.props.disabled,
      });
    });

    return (
      <Block
        ref={ref}
        display="flex"
        flexDirection="column"
        gap={radioTokens.groupGap}
      >
        {label && <GroupLabel radioTokens={radioTokens}>{label}</GroupLabel>}
        <Block display="flex" flexDirection="column" gap={radioTokens.groupGap}>
          {enhancedChildren}
        </Block>
      </Block>
    );
  },
);

const GroupLabel: React.FC<{
  children: React.ReactNode;
  radioTokens: RadioTokensType;
}> = ({ children, radioTokens }) => {
  const textProps = getRadioTextProps(
    radioTokens,
    RadioSize.MEDIUM,
    false,
    false,
  );

  return (
    <PrimitiveText
      as="label"
      fontSize={textProps.fontSize}
      fontWeight={textProps.fontWeight}
      color={textProps.color}
      style={{ marginBottom: radioTokens.groupGap }}
    >
      {children}
    </PrimitiveText>
  );
};

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
