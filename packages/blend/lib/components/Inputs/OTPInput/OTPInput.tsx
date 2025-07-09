import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Block from "../../Primitives/Block/Block";
import InputLabels from "../utils/InputLabels/InputLabels";
import InputFooter from "../utils/InputFooter/InputFooter";
import PrimitiveInput from "../../Primitives/PrimitiveInput/PrimitiveInput";

import { FOUNDATION_THEME } from "../../../tokens";
import { OTPProps } from "./types";
// import otpInputTokens from "./otpInput.tokens";
import { useComponentToken } from "../../../context/useComponentToken";
import { OTPInputTokensType } from "./otpInput.tokens";

const OTPInput = ({
  label,
  sublabel,
  disabled,
  helpIconHintText,
  name,
  required,
  error,
  errorMessage,
  hintText,
  value = "",
  onChange,
  form,
  ...rest
}: OTPProps) => {
  const otpInputTokens = useComponentToken("OTP_INPUT") as OTPInputTokensType;
  const length = 6;
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [, setActiveIndex] = useState<number>(-1);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (value) {
      const otpArray = value.split("").slice(0, length);
      const paddedOtp = [
        ...otpArray,
        ...new Array(length - otpArray.length).fill(""),
      ];
      setOtp(paddedOtp);
    }
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    if (disabled) return;

    const newVal = val.slice(-1);

    if (newVal && !/^\d$/.test(newVal)) return;

    const newOtp = [...otp];
    newOtp[index] = newVal;
    setOtp(newOtp);

    onChange?.(newOtp.join(""));

    if (newVal && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    const otpArray = pastedData.split("");
    const newOtp = [
      ...otpArray,
      ...new Array(length - otpArray.length).fill(""),
    ];
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    // Focus the next empty input or last input
    const nextIndex = Math.min(otpArray.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

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
      <Block
        display="flex"
        justifyContent="space-between"
        gap={otpInputTokens.input.gap}
        width={"100%"}
      >
        {otp.map((digit, index) => (
          <PrimitiveInput
            form={form}
            width={42}
            height={48}
            borderRadius={otpInputTokens.input.borderRadius}
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 20,
              color: FOUNDATION_THEME.colors.gray[800],
            }}
            ref={(el: HTMLInputElement) => {
              inputRefs.current[index] = el;
            }}
            key={index}
            // border={
            //   error
            //     ? `1px solid ${textInputTokens.input.border.color.error}`
            //     : `1px solid ${textInputTokens.input.border.color.default}`
            // }
            border={otpInputTokens.input.border[error ? "error" : "default"]}
            outline="none"
            // _hover={{
            //   border: `1px solid ${textInputTokens.input.border.color.hover}`,
            // }}
            _hover={{
              border: otpInputTokens.input.border.hover,
            }}
            color={
              otpInputTokens.input.color[disabled ? "disabled" : "default"]
            }
            // color={
            //   disabled
            //     ? textInputTokens.input.color.disabled
            //     : textInputTokens.input.color.default
            // }
            // _focus={{
            //   border: `1px solid ${textInputTokens.input.border.color.focus} !important`,
            //   outline: "none !important",
            // }}
            // disabled={disabled}
            // _disabled={{
            //   backgroundColor: textInputTokens.input.backgroundColor.disabled,
            //   border: `1px solid ${textInputTokens.input.border.color.disabled}`,
            //   cursor: "not-allowed",
            // }}
            _focus={{
              border: otpInputTokens.input.border.focus,
              outline: otpInputTokens.input.outline.focus,
            }}
            disabled={disabled}
            _disabled={{
              backgroundColor: otpInputTokens.input.backgroundColor.disabled,
              border: otpInputTokens.input.border.disabled,
              cursor: "not-allowed",
            }}
            // Handle input change
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(index, e)
            }
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(-1)}
            onPaste={index === 0 ? handlePaste : undefined}
            {...rest}
          />
        ))}
      </Block>
      <InputFooter
        hintText={hintText}
        error={error}
        errorMessage={errorMessage}
      />
    </Block>
  );
};

export default OTPInput;
