import Block from "../../Primitives/Block/Block";
import PrimitiveTextarea from "../../Primitives/PrimitiveTextArea";
import InputLabels from "../utils/InputLabels/InputLabels";
import InputFooter from "../utils/InputFooter/InputFooter";
import { TextAreaProps } from "./types";
import { useComponentToken } from "../../../context/useComponentToken";
import { TextAreaTokensType } from "./textarea.token";

const TextArea = ({
  value,
  placeholder,
  disabled,
  autoFocus,
  onChange,
  onFocus,
  onBlur,
  rows = 3,
  cols,
  label,
  sublabel,
  hintText,
  helpIconHintText,
  required,
  error,
  errorMessage,
  wrap,
  resize = "none",
  ...rest
}: TextAreaProps) => {
  const textAreaTokens = useComponentToken("TEXT_AREA") as TextAreaTokensType;
  return (
    <Block display="flex" flexDirection="column" gap={8} width="100%">
      <InputLabels
        label={label}
        sublabel={sublabel}
        disabled={disabled}
        helpIconHintText={helpIconHintText}
        required={required}
      />
      <PrimitiveTextarea
        width={"100%"}
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        rows={rows}
        required={required}
        cols={cols}
        wrap={wrap}
        borderRadius={textAreaTokens.borderRadius}
        resize={resize}
        paddingX={textAreaTokens.paddingX}
        paddingY={textAreaTokens.paddingY}
        boxShadow={textAreaTokens.boxShadow}
        fontFamily={textAreaTokens.fontFamily}
        border={textAreaTokens.border[error ? "error" : "default"]}
        outline={textAreaTokens.outline[error ? "error" : "default"]}
        _hover={{
          border: textAreaTokens.border.hover,
        }}
        color={textAreaTokens.color[disabled ? "disabled" : "default"]}
        _focus={{
          border: textAreaTokens.border.focus,
          outline: textAreaTokens.outline.focus,
        }}
        disabled={disabled}
        _disabled={{
          backgroundColor: textAreaTokens.backgroundColor.disabled,
          border: textAreaTokens.border.disabled,
          cursor: "not-allowed",
        }}
        {...rest}
      />
      <InputFooter
        error={error}
        errorMessage={errorMessage}
        hintText={hintText}
        disabled={disabled}
      />
    </Block>
  );
};

export default TextArea;
