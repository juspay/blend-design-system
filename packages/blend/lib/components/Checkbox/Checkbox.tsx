import React from "react";
import { Check, Minus } from "lucide-react";
import { CheckboxProps, CheckboxSize } from "./types";
import {
  getCheckboxDataState,
  extractPixelValue,
  createCheckboxInputProps,
  getCurrentCheckedState,
  getCheckboxIconColor,
  getCheckboxTextProps,
  getCheckboxSubtextProps,
  getCheckboxLabelStyles,
} from "./checkboxUtils";
import { StyledCheckboxRoot, StyledCheckboxIndicator } from "./StyledCheckbox";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import { useComponentToken } from "../../context/useComponentToken";
import { CheckboxTokensType } from "./checkbox.token";

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      id,
      value,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      error = false,
      size = CheckboxSize.MEDIUM,
      children,
      subtext,
      slot,
    },
    ref,
  ) => {
    const tokens = useComponentToken("CHECKBOX") as CheckboxTokensType;
    const generatedId = React.useId();
    const uniqueId = id || generatedId;

    const inputProps = createCheckboxInputProps(checked, defaultChecked);
    const currentChecked = getCurrentCheckedState(checked, defaultChecked);

    return (
      <Block display="flex" alignItems="flex-start" gap={tokens.gap}>
        <StyledCheckboxRoot
          ref={ref}
          id={uniqueId}
          {...inputProps}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          value={value}
          data-state={getCheckboxDataState(currentChecked || false)}
          data-error={error}
          size={size}
          $isDisabled={disabled}
          $checked={currentChecked || false}
          $error={error}
        >
          <CheckboxIndicator
            checked={currentChecked}
            size={size}
            tokens={tokens}
            disabled={disabled}
          />
        </StyledCheckboxRoot>

        <Block display="flex" flexDirection="column" gap={tokens.content.gap}>
          <Block display="flex" alignItems="center">
            <CheckboxContent
              uniqueId={uniqueId}
              disabled={disabled}
              error={error}
              required={required}
              size={size}
              children={children}
              tokens={tokens}
            />

            {slot && (
              <Block as="span" marginLeft={tokens.slotGap}>
                {slot}
              </Block>
            )}
          </Block>

          {subtext && (
            <CheckboxSubtext
              size={size}
              disabled={disabled}
              error={error}
              tokens={tokens}
            >
              {subtext}
            </CheckboxSubtext>
          )}
        </Block>
      </Block>
    );
  },
);

const CheckboxIndicator: React.FC<{
  checked: boolean | "indeterminate";
  size: CheckboxSize;
  tokens: CheckboxTokensType;
  disabled: boolean;
}> = ({ checked, size, tokens, disabled }) => (
  <StyledCheckboxIndicator
    forceMount={checked === "indeterminate" ? true : undefined}
    size={size}
  >
    {checked && (
      <Block
        as="span"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        {checked === "indeterminate" ? (
          <Minus
            size={extractPixelValue(tokens.icon.size[size].width)}
            color={getCheckboxIconColor(tokens, checked, disabled)}
            strokeWidth={tokens.icon.size[size].strokeWidth}
          />
        ) : (
          <Check
            size={extractPixelValue(tokens.icon.size[size].width)}
            color={getCheckboxIconColor(tokens, checked, disabled)}
            strokeWidth={tokens.icon.size[size].strokeWidth}
          />
        )}
      </Block>
    )}
  </StyledCheckboxIndicator>
);

const CheckboxContent: React.FC<{
  uniqueId: string;
  disabled: boolean;
  error: boolean;
  required: boolean;
  size: CheckboxSize;
  children?: React.ReactNode;
  tokens: CheckboxTokensType;
}> = ({ uniqueId, disabled, error, required, size, children, tokens }) => {
  if (!children) return null;

  const labelStyles = getCheckboxLabelStyles(disabled);
  const textProps = getCheckboxTextProps(tokens, size, disabled, error);

  return (
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

const CheckboxSubtext: React.FC<{
  size: CheckboxSize;
  disabled: boolean;
  error: boolean;
  tokens: CheckboxTokensType;
  children: React.ReactNode;
}> = ({ size, disabled, error, tokens, children }) => {
  const subtextProps = getCheckboxSubtextProps(tokens, size, disabled, error);

  return (
    <Block>
      <PrimitiveText
        as="span"
        color={subtextProps.color}
        fontSize={subtextProps.fontSize}
      >
        {children}
      </PrimitiveText>
    </Block>
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
