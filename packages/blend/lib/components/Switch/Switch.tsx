import React, { useState } from "react";
import { SwitchProps, SwitchSize } from "./types";
import {
  getSwitchDataState,
  isControlledSwitch,
  createSwitchToggleHandler,
  getSwitchTextProps,
  getSwitchSubtextProps,
  getSwitchLabelStyles,
} from "./utils";
import { StyledSwitchRoot, StyledSwitchThumb } from "./StyledSwitch";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { useComponentToken } from "../../context/useComponentToken";
import { SwitchTokensType } from "./switch.token";

export const Switch = ({
  id,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  error = false,
  size = SwitchSize.MEDIUM,
  label,
  subtext,
  slot,
  name,
  value,
}: SwitchProps) => {
  const tokens = useComponentToken("SWITCH") as SwitchTokensType;
  const generatedId = React.useId();
  const uniqueId = id || generatedId;

  const isControlled = isControlledSwitch(checked);
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = createSwitchToggleHandler(
    currentChecked || false,
    disabled,
    isControlled,
    setInternalChecked,
    onChange,
  );

  return (
    <Block display="flex" gap={tokens.gap}>
      <StyledSwitchRoot
        type="button"
        role="switch"
        id={uniqueId}
        aria-checked={currentChecked}
        disabled={disabled}
        onClick={handleToggle}
        data-state={getSwitchDataState(currentChecked || false)}
        size={size}
        $isDisabled={disabled}
        $isChecked={currentChecked || false}
        $error={error}
        value={value}
        name={name}
      >
        <StyledSwitchThumb size={size} $isChecked={currentChecked || false} />
      </StyledSwitchRoot>
      <Block display="flex" flexDirection="column" gap={tokens.contentGap}>
        <Block display="flex" alignItems="center">
          <SwitchContent
            uniqueId={uniqueId}
            disabled={disabled}
            error={error}
            required={required}
            size={size}
            label={label}
            tokens={tokens}
          />

          {slot && (
            <Block as="span" marginLeft={tokens.slot.spacing}>
              {slot}
            </Block>
          )}
        </Block>

        {subtext && (
          <SwitchSubtext
            size={size}
            disabled={disabled}
            error={error}
            tokens={tokens}
          >
            {subtext}
          </SwitchSubtext>
        )}
      </Block>
    </Block>
  );
};

const SwitchContent: React.FC<{
  uniqueId: string;
  disabled: boolean;
  error: boolean;
  required: boolean;
  size: SwitchSize;
  label?: React.ReactNode;
  tokens: SwitchTokensType;
}> = ({ uniqueId, disabled, error, required, size, label, tokens }) => {
  if (!label) return null;

  const labelStyles = getSwitchLabelStyles(disabled);
  const textProps = getSwitchTextProps(tokens, size, disabled, error);

  return (
    <label htmlFor={uniqueId} style={labelStyles}>
      <PrimitiveText
        as="span"
        fontSize={textProps.fontSize}
        fontWeight={textProps.fontWeight}
        color={textProps.color}
      >
        {label}
        {required && (
          <PrimitiveText
            as="span"
            color={tokens.required.color}
            style={{ marginLeft: tokens.required.spacing }}
          >
            *
          </PrimitiveText>
        )}
      </PrimitiveText>
    </label>
  );
};

const SwitchSubtext: React.FC<{
  size: SwitchSize;
  disabled: boolean;
  error: boolean;
  tokens: SwitchTokensType;
  children: React.ReactNode;
}> = ({ size, disabled, error, tokens, children }) => {
  const subtextProps = getSwitchSubtextProps(tokens, size, disabled, error);

  return (
    <PrimitiveText
      as="span"
      color={subtextProps.color}
      fontSize={subtextProps.fontSize}
    >
      {children}
    </PrimitiveText>
  );
};

Switch.displayName = "Switch";
