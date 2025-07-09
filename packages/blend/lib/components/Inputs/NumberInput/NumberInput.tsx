import { FOUNDATION_THEME } from "../../../tokens";
import Block from "../../Primitives/Block/Block";
import PrimitiveInput from "../../Primitives/PrimitiveInput/PrimitiveInput";
import PrimitiveButton from "../../Primitives/PrimitiveButton/PrimitiveButton";
import InputLabels from "../utils/InputLabels/InputLabels";
import InputFooter from "../utils/InputFooter/InputFooter";
import { NumberInputProps } from "./types";
import { NumberInputSize } from "./types";
import { useComponentToken } from "../../../context/useComponentToken";
import { NumberInputTokensType } from "./numberInput.tokens";

const NumberInput = ({
  value,
  onChange,
  min,
  max,
  step,
  error = true,
  errorMessage,
  required,
  disabled,
  size = NumberInputSize.MEDIUM,
  placeholder,
  sublabel,
  helpIconHintText,
  label = "Number Input",
  hintText,
  name,
  ...rest
}: NumberInputProps) => {
  const numberInputTokens = useComponentToken(
    "NUMBER_INPUT",
  ) as NumberInputTokensType;
  const paddingX = numberInputTokens.input.paddingX[size];
  const paddingY = numberInputTokens.input.paddingY[size];

  return (
    <Block display="flex" flexDirection="column" gap={8} width="100%">
      <InputLabels
        label={label}
        sublabel={sublabel}
        disabled={disabled}
        helpIconHintText={helpIconHintText}
        name={name}
        required={required}
      />
      <Block position="relative" width={"100%"} display="flex" borderRadius={8}>
        <PrimitiveInput
          name={name}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          step={step}
          min={min}
          max={max}
          required={required}
          paddingX={paddingX}
          paddingY={paddingY}
          borderRadius={numberInputTokens.input.borderRadius}
          boxShadow={numberInputTokens.input.boxShadow}
          border={numberInputTokens.input.border[error ? "error" : "default"]}
          outline="none"
          width={"100%"}
          _hover={{
            border: numberInputTokens.input.border.hover,
          }}
          color={
            numberInputTokens.input.color[disabled ? "disabled" : "default"]
          }
          _focus={{
            border: numberInputTokens.input.border.focus,
            outline: numberInputTokens.input.outline.focus,
          }}
          disabled={disabled}
          _disabled={{
            backgroundColor: numberInputTokens.input.backgroundColor.disabled,
            border: numberInputTokens.input.border.disabled,
            cursor: "not-allowed",
          }}
          {...rest}
        />
        <Block
          display="flex"
          flexDirection="column"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          margin={1}
        >
          <Block
            display="flex"
            flexDirection="column"
            gap={1}
            as="span"
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            zIndex={1}
            borderLeft={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
          ></Block>
          <PrimitiveButton
            onClick={() =>
              onChange({
                target: { value: String(value + (step ?? 1)) },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
            flexGrow={1}
            width={"24px"}
            height={"50%"}
            contentCentered
            borderRadius={`0 ${numberInputTokens.input.borderRadius} 0 0`}
            disabled={disabled || (typeof max === "number" && value >= max)}
            _focus={{
              backgroundColor: FOUNDATION_THEME.colors.gray[100],
            }}
            _hover={{
              backgroundColor: FOUNDATION_THEME.colors.gray[100],
            }}
          >
            <TriangleSVG direction="up" />
          </PrimitiveButton>
          <PrimitiveButton
            onClick={() =>
              onChange({
                target: { value: String(value - (step ?? 1)) },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
            flexGrow={1}
            width={"24px"}
            height={"50%"}
            contentCentered
            borderRadius={`0 0px ${numberInputTokens.input.borderRadius} 0`}
            _focus={{
              backgroundColor: FOUNDATION_THEME.colors.gray[100],
            }}
            _hover={{
              backgroundColor: FOUNDATION_THEME.colors.gray[100],
            }}
            disabled={disabled || (typeof min === "number" && value <= min)}
          >
            <TriangleSVG direction="down" />
          </PrimitiveButton>
        </Block>
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

const TriangleSVG = ({ direction }: { direction: "up" | "down" }) => {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "up" ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M5.19369 4.25489C6.29087 3.37174 7.26951 2.34261 8.10412 1.19449C8.20686 1.05498 8.26202 0.879398 8.24784 0.693089C8.21641 0.28007 7.85611 -0.0292686 7.4431 0.00216258C5.48387 0.151262 3.51614 0.151262 1.55692 0.00216222C1.1439 -0.029269 0.783599 0.280069 0.752168 0.693089C0.737989 0.879395 0.793151 1.05498 0.895889 1.19448C1.7305 2.34261 2.70914 3.37174 3.80632 4.25489C4.21232 4.5817 4.78769 4.5817 5.19369 4.25489Z"
        fill="#222530"
      />
    </svg>
  );
};

export default NumberInput;
