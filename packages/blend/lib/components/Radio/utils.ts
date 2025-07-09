import React from "react";
import { RadioSize, RadioProps } from "./types";
import { FOUNDATION_THEME } from "../../tokens";
import { RadioTokensType } from "./radio.token";

export const getRadioDataState = (checked: boolean): string => {
  return checked ? "checked" : "unchecked";
};

export const extractPixelValue = (tokenValue: string): number => {
  const match = tokenValue.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 16;
};

export const getSpacingBySize = (
  size: RadioSize,
): { marginLeft: string; marginTop: string } => {
  const sizeMap = {
    [RadioSize.SMALL]: {
      marginLeft: String(FOUNDATION_THEME.unit[20]),
      marginTop: String(FOUNDATION_THEME.unit[4]),
    },
    [RadioSize.MEDIUM]: {
      marginLeft: String(FOUNDATION_THEME.unit[24]),
      marginTop: String(FOUNDATION_THEME.unit[4]),
    },
  };

  return sizeMap[size];
};

export const isControlledRadio = (checked: boolean | undefined): boolean => {
  return checked !== undefined;
};

export const createRadioInputProps = (
  checked: boolean | undefined,
  defaultChecked: boolean,
) => {
  return isControlledRadio(checked)
    ? { checked: checked }
    : { defaultChecked: defaultChecked };
};

export const getCurrentCheckedState = (
  checked: boolean | undefined,
  defaultChecked: boolean,
): boolean => {
  return isControlledRadio(checked) ? checked! : defaultChecked;
};

export const createRadioChangeHandler = (
  disabled: boolean,
  onChange?: (checked: boolean) => void,
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked);
  };
};

export const isRadioElement = (
  child: React.ReactElement,
  RadioComponent: React.ComponentType<RadioProps>,
): child is React.ReactElement<RadioProps> => {
  return child.type === RadioComponent;
};

export const shouldRadioBeChecked = (
  groupValue: string | undefined,
  groupDefaultValue: string | undefined,
  radioValue: string,
): boolean => {
  const isGroupControlled = groupValue !== undefined;
  return isGroupControlled
    ? groupValue === radioValue
    : groupDefaultValue === radioValue;
};

export const createGroupChangeHandler = (
  onChange?: (value: string) => void,
) => {
  return (isChecked: boolean, childValue: string) => {
    if (isChecked && onChange) {
      onChange(childValue);
    }
  };
};

export const isValidRadioValue = (value: unknown): value is string => {
  return typeof value === "string";
};

/**
 * Gets the text color based on radio state
 */
export const getRadioTextColor = (
  radioTokens: RadioTokensType,
  isDisabled: boolean,
  error: boolean,
  isSubtext: boolean = false,
): string => {
  const state = isDisabled ? "disabled" : error ? "error" : "default";
  const color = isSubtext
    ? radioTokens.content.sublabel.color[state]
    : radioTokens.content.label.color[state];
  return String(color || "");
};

/**
 * Gets the text properties for radio labels and subtext
 */
export const getRadioTextProps = (
  radioTokens: RadioTokensType,
  size: RadioSize,
  isDisabled: boolean,
  error: boolean,
  isSubtext: boolean = false,
): {
  fontSize: string;
  fontWeight: string;
  color: string;
} => {
  const fontConfig = isSubtext
    ? radioTokens.content.sublabel.font[size]
    : radioTokens.content.label.font[size];

  return {
    fontSize: String(fontConfig?.fontSize || ""),
    fontWeight: String(fontConfig?.fontWeight || ""),
    color: getRadioTextColor(radioTokens, isDisabled, error, isSubtext),
  };
};

/**
 * Gets label styles for radio components
 */
export const getRadioLabelStyles = (
  radioTokens: RadioTokensType,
  isDisabled: boolean,
): {
  display: "inline-flex";
  alignItems: "center";
  padding: number;
  margin: number;
  minHeight: string;
  cursor: "not-allowed" | "pointer";
  lineHeight: number;
} => ({
  display: "inline-flex" as const,
  alignItems: "center" as const,
  padding: 0,
  margin: 0,
  minHeight: String(radioTokens.height.md || ""),
  cursor: isDisabled ? ("not-allowed" as const) : ("pointer" as const),
  lineHeight: 1,
});
