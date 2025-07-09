import { Weight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UnitInputSize, UnitInputProps, UnitPosition } from "./types";
import { FOUNDATION_THEME } from "../../../tokens";
import Text from "../../Text/Text";
import Block from "../../Primitives/Block/Block";
import InputLabels from "../utils/InputLabels/InputLabels";
import PrimitiveInput from "../../Primitives/PrimitiveInput/PrimitiveInput";
import InputFooter from "../utils/InputFooter/InputFooter";
import { UnitInputTokensType } from "./unitInput.tokens";
import { useComponentToken } from "../../../context/useComponentToken";

const UnitInput = ({
  value,
  onChange,
  min,
  max,
  step,
  error = true,
  errorMessage,
  required,
  disabled,
  size = UnitInputSize.MEDIUM,
  placeholder,
  sublabel,
  helpIconHintText,
  label = "Number Input",
  hintText,
  leftSlot,
  rightSlot = <Weight size={16} color={FOUNDATION_THEME.colors.gray[400]} />,
  unit,
  unitPosition = UnitPosition.RIGHT,
  name,
  ...rest
}: UnitInputProps) => {
  const unitInputTokens = useComponentToken(
    "UNIT_INPUT",
  ) as UnitInputTokensType;
  const paddingX = unitInputTokens.input.paddingX[size];
  const paddingY = unitInputTokens.input.paddingY[size];

  const leftSlotRef = useRef<HTMLDivElement>(null);
  const rightSlotRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  const [leftSlotWidth, setLeftSlotWidth] = useState(0);
  const [rightSlotWidth, setRightSlotWidth] = useState(0);
  const [unitWidth, setUnitWidth] = useState(0);

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
    if (unitRef.current) {
      setUnitWidth(unitRef.current.offsetWidth);
    } else {
      setUnitWidth(0);
    }
  }, [leftSlot, rightSlot, unit]);

  const paddingInlineStart =
    !leftSlot && unitPosition !== UnitPosition.LEFT
      ? paddingY
      : (unitPosition === UnitPosition.LEFT ? unitWidth + 8 : 8) +
        (leftSlot ? leftSlotWidth + 8 : 0);

  const paddingInlineEnd =
    !rightSlot && unitPosition !== UnitPosition.RIGHT
      ? paddingY
      : (unitPosition === UnitPosition.RIGHT ? unitWidth + 8 : 0) +
        (rightSlot ? rightSlotWidth + 8 : 0);

  const RightUnitSlot = () => {
    return (
      <Block
        ref={unitRef}
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        paddingX={12}
        margin={1}
        contentCentered
        backgroundColor={FOUNDATION_THEME.colors.gray[50]}
        borderLeft={unitInputTokens.input.border.default}
        borderRadius={`0px ${unitInputTokens.input.borderRadius} ${unitInputTokens.input.borderRadius} 0px`}
      >
        <Text
          variant="body.md"
          color={unitInputTokens.input.color[disabled ? "disabled" : "default"]}
        >
          {unit}
        </Text>
      </Block>
    );
  };

  const LeftUnitSlot = () => {
    return (
      <Block
        ref={unitRef}
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        paddingX={12}
        margin={1}
        contentCentered
        backgroundColor={FOUNDATION_THEME.colors.gray[50]}
        borderRight={unitInputTokens.input.border.default}
        borderRadius={`${unitInputTokens.input.borderRadius} 0px 0px ${unitInputTokens.input.borderRadius}`}
      >
        <Text
          variant="body.md"
          color={unitInputTokens.input.color[disabled ? "disabled" : "default"]}
        >
          {unit}
        </Text>
      </Block>
    );
  };

  return (
    <Block display="flex" flexDirection="column" gap={8} width="100%">
      <InputLabels
        label={label}
        sublabel={sublabel}
        helpIconHintText={helpIconHintText}
        disabled={disabled}
        name={name}
        required={required}
      />
      <Block position="relative" width={"100%"} display="flex" borderRadius={8}>
        {leftSlot && (
          <Block
            ref={leftSlotRef}
            position="absolute"
            top={paddingY}
            left={unitPosition === UnitPosition.LEFT ? unitWidth + 8 : paddingX}
            bottom={paddingY}
            contentCentered
          >
            {leftSlot}
          </Block>
        )}
        {rightSlot && (
          <Block
            ref={rightSlotRef}
            position="absolute"
            top={paddingY}
            right={
              unitPosition === UnitPosition.RIGHT ? unitWidth + 8 : paddingX
            }
            bottom={paddingY}
            contentCentered
          >
            {rightSlot}
          </Block>
        )}

        {unitPosition === UnitPosition.RIGHT && <RightUnitSlot />}
        {unitPosition === UnitPosition.LEFT && <LeftUnitSlot />}
        <PrimitiveInput
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          step={step}
          min={min}
          max={max}
          paddingInlineStart={paddingInlineStart}
          paddingInlineEnd={paddingInlineEnd}
          paddingTop={paddingY}
          paddingBottom={paddingY}
          required={required}
          borderRadius={unitInputTokens.input.borderRadius}
          boxShadow={unitInputTokens.input.boxShadow}
          border={unitInputTokens.input.border[error ? "error" : "default"]}
          outline="none"
          width={"100%"}
          _hover={{
            border: unitInputTokens.input.border.hover,
          }}
          color={unitInputTokens.input.color[disabled ? "disabled" : "default"]}
          _focusVisible={{
            border: unitInputTokens.input.border.focus,
            outline: "none !important",
          }}
          _focus={{
            border: unitInputTokens.input.border.focus,
            outline: "none !important",
          }}
          disabled={disabled}
          _disabled={{
            backgroundColor: unitInputTokens.input.backgroundColor.disabled,
            border: unitInputTokens.input.border.disabled,
            cursor: "not-allowed",
          }}
          {...rest}
        />
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

export default UnitInput;
