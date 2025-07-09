import Block from "../../Primitives/Block/Block";
import PrimitiveInput from "../../Primitives/PrimitiveInput/PrimitiveInput";
import { useRef, useState, useEffect } from "react";
import InputLabels from "../utils/InputLabels/InputLabels";
import InputFooter from "../utils/InputFooter/InputFooter";
import { TextInputSize, TextInputProps } from "./types";
import { useComponentToken } from "../../../context/useComponentToken";
import { TextInputTokensType } from "./textInput.tokens";

const toPixels = (value: string | number | undefined): number => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    // Remove 'px' and convert to number
    const numericValue = parseFloat(value.replace("px", ""));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  return 0;
};

const TextInput = ({
  size = TextInputSize.MEDIUM,
  leftSlot,
  rightSlot,
  error = false,
  errorMessage,
  hintText,
  helpIconHintText,
  disabled = false,
  label,
  placeholder = "Enter",
  sublabel,
  value,
  onChange,
  name,
  required = false,
  ...rest
}: TextInputProps) => {
  const textInputTokens = useComponentToken(
    "TEXT_INPUT",
  ) as TextInputTokensType;
  const leftSlotRef = useRef<HTMLDivElement>(null);
  const rightSlotRef = useRef<HTMLDivElement>(null);

  const [leftSlotWidth, setLeftSlotWidth] = useState(0);
  const [rightSlotWidth, setRightSlotWidth] = useState(0);

  useEffect(() => {
    if (leftSlotRef.current) {
      setLeftSlotWidth(leftSlotRef.current.offsetWidth);
    } else {
      setLeftSlotWidth(0);
    }
    if (rightSlotRef.current) {
      setRightSlotWidth(rightSlotRef.current.offsetWidth);
    } else {
      setRightSlotWidth(0);
    }
  }, [leftSlot, rightSlot]);

  const paddingX = toPixels(textInputTokens.input.paddingX[size]);
  const paddingY = toPixels(textInputTokens.input.paddingY[size]);
  const GAP = toPixels(textInputTokens.input.gap);

  const paddingInlineStart = leftSlot
    ? paddingX + leftSlotWidth + GAP
    : paddingX;
  const paddingInlineEnd = rightSlot
    ? paddingX + rightSlotWidth + GAP
    : paddingX;
  return (
    <Block display="flex" flexDirection="column" gap={8} width={"100%"}>
      <InputLabels
        label={label}
        sublabel={sublabel}
        helpIconHintText={helpIconHintText}
        disabled={disabled}
        name={name}
        required={required}
      />
      <Block position="relative" width={"100%"}>
        {leftSlot && (
          <Block
            ref={leftSlotRef}
            position="absolute"
            top={paddingY}
            left={paddingX}
            bottom={paddingY}
            contentCentered
          >
            {leftSlot}
          </Block>
        )}

        <PrimitiveInput
          required={required}
          value={value}
          type="text"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          width={"100%"}
          disabled={disabled}
          //styling props
          paddingInlineStart={paddingInlineStart}
          paddingInlineEnd={paddingInlineEnd}
          paddingTop={paddingY}
          paddingBottom={paddingY}
          borderRadius={textInputTokens.input.borderRadius}
          boxShadow={textInputTokens.input.boxShadow}
          border={textInputTokens.input.border[error ? "error" : "default"]}
          outline="none"
          _hover={{
            border: textInputTokens.input.border.hover,
          }}
          color={textInputTokens.input.color[disabled ? "disabled" : "default"]}
          _focus={{
            border: textInputTokens.input.border.focus,
            outline: textInputTokens.input.outline.focus,
          }}
          _disabled={{
            backgroundColor: textInputTokens.input.backgroundColor.disabled,
            border: textInputTokens.input.border.disabled,
            cursor: "not-allowed",
          }}
          {...rest}
        />
        {rightSlot && (
          <Block
            ref={rightSlotRef}
            position="absolute"
            top={paddingY}
            right={paddingX}
            bottom={paddingY}
            contentCentered
          >
            {rightSlot}
          </Block>
        )}
      </Block>
      <InputFooter
        error={error}
        errorMessage={errorMessage}
        hintText={hintText}
        disabled={disabled}
      />
    </Block>
  );
};

export default TextInput;
