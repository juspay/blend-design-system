import React from "react";
import { RadioProps, RadioSize } from "./types";
import {
  getRadioDataState,
  createRadioInputProps,
  getCurrentCheckedState,
  createRadioChangeHandler,
  getRadioTextProps,
  getRadioLabelStyles,
} from "./utils";
import { StyledRadioInput } from "./StyledRadio";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { RadioTokensType } from "./radio.token";
import { useComponentToken } from "../../context/useComponentToken";

export const Radio = ({
  id,
  value,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  error = false,
  size = RadioSize.MEDIUM,
  children,
  subtext,
  slot,
  name,
}: RadioProps) => {
  const radioTokens = useComponentToken("RADIO") as RadioTokensType;
  const generatedId = React.useId();
  const uniqueId = id || generatedId;

  const inputProps = createRadioInputProps(checked, defaultChecked);
  const currentChecked = getCurrentCheckedState(checked, defaultChecked);
  const handleChange = createRadioChangeHandler(disabled, onChange);

  return (
    <Block display="flex" flexDirection="column" gap={radioTokens.gap}>
      <Block
        display="flex"
        alignItems={subtext ? "flex-start" : "center"}
        gap={radioTokens.slotGap}
      >
        <StyledRadioInput
          type="radio"
          id={uniqueId}
          name={name}
          value={value}
          {...inputProps}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          data-state={getRadioDataState(currentChecked)}
          size={size}
          $isDisabled={disabled}
          $isChecked={currentChecked}
          $error={error}
        />

        <RadioContent
          uniqueId={uniqueId}
          disabled={disabled}
          error={error}
          required={required}
          size={size}
          children={children}
          subtext={subtext}
          radioTokens={radioTokens}
          slot={slot}
        />
      </Block>
    </Block>
  );
};

const RadioContent: React.FC<{
  uniqueId: string;
  disabled: boolean;
  error: boolean;
  required: boolean;
  size: RadioSize;
  children?: React.ReactNode;
  subtext?: React.ReactNode;
  radioTokens: RadioTokensType;
  slot?: React.ReactNode;
}> = ({
  uniqueId,
  disabled,
  error,
  required,
  size,
  children,
  subtext,
  radioTokens,
  slot,
}) => {
  const labelStyles = getRadioLabelStyles(radioTokens, disabled);
  const textProps = getRadioTextProps(radioTokens, size, disabled, error);
  const subtextProps = getRadioTextProps(
    radioTokens,
    size,
    disabled,
    error,
    true,
  );

  return (
    <Block display="flex" flexDirection="column" gap={radioTokens.gap}>
      {children && (
        <Block display="flex" alignItems="center" gap={radioTokens.slotGap}>
          <label htmlFor={uniqueId} style={labelStyles}>
            <PrimitiveText
              as="span"
              fontSize={textProps.fontSize}
              fontWeight={textProps.fontWeight}
              color={textProps.color}
            >
              {children}
              {required && (
                <PrimitiveText
                  as="span"
                  fontSize={textProps.fontSize}
                  fontWeight={textProps.fontWeight}
                  color={textProps.color}
                  style={{ marginLeft: radioTokens.slotGap }}
                >
                  *
                </PrimitiveText>
              )}
            </PrimitiveText>
          </label>
          {slot && (
            <Block as="span" width={radioTokens.slot.size[size]}>
              {slot}
            </Block>
          )}
        </Block>
      )}
      {subtext && (
        <PrimitiveText
          as="span"
          fontSize={subtextProps.fontSize}
          fontWeight={subtextProps.fontWeight}
          color={subtextProps.color}
        >
          {subtext}
        </PrimitiveText>
      )}
    </Block>
  );
};

Radio.displayName = "Radio";

export default Radio;
