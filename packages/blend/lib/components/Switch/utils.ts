import React from "react";
import { SwitchSize, SwitchProps } from "./types";
import { FOUNDATION_THEME } from "../../tokens";
import { SwitchTokensType } from "./switch.token";

export const getSwitchDataState = (checked: boolean): string => {
  return checked ? "checked" : "unchecked";
};

export const extractPixelValue = (tokenValue: string): number => {
  const match = tokenValue.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 16;
};

export const getSpacingBySize = (
  size: SwitchSize,
): { marginLeft: string; marginTop: string } => {
  // Use foundation tokens for consistent spacing
  const sizeMap = {
    [SwitchSize.SMALL]: {
      marginLeft: String(FOUNDATION_THEME.unit[32]),
      marginTop: String(FOUNDATION_THEME.unit[4]),
    },
    [SwitchSize.MEDIUM]: {
      marginLeft: String(FOUNDATION_THEME.unit[36]),
      marginTop: String(FOUNDATION_THEME.unit[4]),
    },
  };

  return sizeMap[size];
};

/**
 * Determines if the switch component is controlled based on the checked prop
 */
export const isControlledSwitch = (checked: boolean | undefined): boolean => {
  return checked !== undefined;
};

/**
 * Creates a toggle handler for switch components
 */
export const createSwitchToggleHandler = (
  currentChecked: boolean,
  disabled: boolean,
  isControlled: boolean,
  setInternalChecked?: React.Dispatch<React.SetStateAction<boolean>>,
  onChange?: (checked: boolean) => void,
) => {
  return () => {
    if (disabled) return;

    const newChecked = !currentChecked;

    // Update internal state if uncontrolled
    if (!isControlled && setInternalChecked) {
      setInternalChecked(newChecked);
    }

    // Call onChange callback
    onChange?.(newChecked);
  };
};

/**
 * Gets the text color based on switch state
 */
export const getSwitchTextColor = (
  tokens: SwitchTokensType,
  disabled: boolean,
  error: boolean,
): string => {
  if (error) return String(tokens.content.label.color.error || "");
  if (disabled) return String(tokens.content.label.color.disabled || "");
  return String(tokens.content.label.color.default || "");
};

/**
 * Gets the subtext color based on switch state
 */
export const getSwitchSubtextColor = (
  tokens: SwitchTokensType,
  disabled: boolean,
  error: boolean,
): string => {
  if (disabled) return String(tokens.content.sublabel.color.disabled || "");
  if (error) return String(tokens.content.sublabel.color.error || "");
  return String(tokens.content.sublabel.color.default || "");
};

/**
 * Gets the text properties for switch labels
 */
export const getSwitchTextProps = (
  tokens: SwitchTokensType,
  size: SwitchSize,
  disabled: boolean,
  error: boolean,
): {
  fontSize: string;
  fontWeight: string;
  color: string;
} => ({
  fontSize: String(tokens.content.label.font[size]?.fontSize || ""),
  fontWeight: String(tokens.content.label.font[size]?.fontWeight || ""),
  color: getSwitchTextColor(tokens, disabled, error),
});

/**
 * Gets the subtext properties for switch
 */
export const getSwitchSubtextProps = (
  tokens: SwitchTokensType,
  size: SwitchSize,
  disabled: boolean,
  error: boolean,
): {
  fontSize: string;
  color: string;
} => ({
  fontSize: String(tokens.content.sublabel.font[size]?.fontSize || ""),
  color: getSwitchSubtextColor(tokens, disabled, error),
});

/**
 * Gets label styles for switch components
 */
export const getSwitchLabelStyles = (disabled: boolean) => ({
  cursor: disabled ? ("not-allowed" as const) : ("pointer" as const),
  display: "flex" as const,
  alignItems: "center" as const,
  margin: 0,
  padding: 0,
});

/**
 * Validates if a child element is a Switch component
 */
export const isSwitchElement = (
  child: React.ReactElement,
  SwitchComponent: React.ComponentType<SwitchProps>,
): child is React.ReactElement<SwitchProps> => {
  return child.type === SwitchComponent;
};

/**
 * Creates a group change handler for switch groups
 */
export const createSwitchGroupChangeHandler = (
  values: string[],
  isControlled: boolean,
  setInternalValues?: React.Dispatch<React.SetStateAction<string[]>>,
  onChange?: (values: string[]) => void,
) => {
  return (checked: boolean, childValue: string) => {
    let newValues: string[];

    if (checked) {
      newValues = [...values, childValue];
    } else {
      newValues = values.filter((v) => v !== childValue);
    }

    if (!isControlled && setInternalValues) {
      setInternalValues(newValues);
    }

    onChange?.(newValues);
  };
};
