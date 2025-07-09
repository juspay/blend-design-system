import { CheckboxSize } from "./types";
import { CheckboxTokensType } from "./checkbox.token";

export const getCheckboxDataState = (
  checked: boolean | "indeterminate",
): string => {
  if (checked === "indeterminate") return "indeterminate";
  return checked ? "checked" : "unchecked";
};

export const extractPixelValue = (
  tokenValue: string | number | undefined,
): number => {
  if (typeof tokenValue === "number") return tokenValue;
  if (typeof tokenValue === "string") {
    if (tokenValue.endsWith("px")) {
      return parseInt(tokenValue.replace("px", ""), 10);
    } else if (tokenValue.endsWith("rem")) {
      return parseInt(tokenValue.replace("rem", ""), 10) * 16; // Assuming 1rem = 16px
    } else if (tokenValue.endsWith("em")) {
      return parseInt(tokenValue.replace("em", ""), 10) * 16; // Assuming 1em = 16px for base
    }
    // Attempt to parse as a number if no unit, or if it's just a number string
    const parsedAsNumber = parseInt(tokenValue, 10);
    if (!isNaN(parsedAsNumber)) {
      return parsedAsNumber;
    }
  }
  return 0; // fallback for undefined or unparsable
};

/**
 * Determines if the checkbox component is controlled based on the checked prop
 */
export const isControlledCheckbox = (
  checked: boolean | "indeterminate" | undefined,
): boolean => {
  return checked !== undefined;
};

/**
 * Creates input props for controlled vs uncontrolled components
 */
export const createCheckboxInputProps = (
  checked: boolean | "indeterminate" | undefined,
  defaultChecked: boolean,
) => {
  return isControlledCheckbox(checked)
    ? { checked: checked === "indeterminate" ? false : checked }
    : { defaultChecked: defaultChecked };
};

/**
 * Gets the current checked state for styling purposes
 */
export const getCurrentCheckedState = (
  checked: boolean | "indeterminate" | undefined,
  defaultChecked: boolean,
): boolean | "indeterminate" => {
  return isControlledCheckbox(checked) ? checked! : defaultChecked;
};

/**
 * Gets the icon color based on checkbox state
 */
export const getCheckboxIconColor = (
  tokens: CheckboxTokensType,
  currentChecked: boolean | "indeterminate",
  disabled: boolean,
): string => {
  if (disabled) {
    return currentChecked === "indeterminate"
      ? String(tokens.icon.color.indeterminate?.disabled || "")
      : String(tokens.icon.color.checked?.disabled || "");
  }
  return currentChecked === "indeterminate"
    ? String(tokens.icon.color.indeterminate?.default || "")
    : String(tokens.icon.color.checked?.default || "");
};

/**
 * Gets the text color based on checkbox state
 */
export const getCheckboxTextColor = (
  tokens: CheckboxTokensType,
  disabled: boolean,
  error: boolean,
): string => {
  if (disabled) return String(tokens.content.label.color.disabled || "");
  if (error) return String(tokens.content.label.color.error || "");
  return String(tokens.content.label.color.default || "");
};

/**
 * Gets the subtext color based on checkbox state
 */
export const getCheckboxSubtextColor = (
  tokens: CheckboxTokensType,
  disabled: boolean,
  error: boolean,
): string => {
  if (disabled) return String(tokens.content.subtext.color.disabled || "");
  if (error) return String(tokens.content.subtext.color.error || "");
  return String(tokens.content.subtext.color.default || "");
};

/**
 * Gets the text properties for checkbox labels
 */
export const getCheckboxTextProps = (
  tokens: CheckboxTokensType,
  size: CheckboxSize,
  disabled: boolean,
  error: boolean,
): {
  fontSize: string;
  fontWeight: string;
  color: string;
} => ({
  fontSize: String(tokens.content.label.font[size]?.fontSize || ""),
  fontWeight: String(tokens.content.label.font[size]?.fontWeight || ""),
  color: getCheckboxTextColor(tokens, disabled, error),
});

/**
 * Gets the subtext properties for checkbox
 */
export const getCheckboxSubtextProps = (
  tokens: CheckboxTokensType,
  size: CheckboxSize,
  disabled: boolean,
  error: boolean,
): {
  fontSize: string;
  color: string;
} => ({
  fontSize: String(tokens.content.subtext.font[size]?.fontSize || ""),
  color: getCheckboxSubtextColor(tokens, disabled, error),
});

/**
 * Gets label styles for checkbox components
 */
export const getCheckboxLabelStyles = (disabled: boolean) => ({
  cursor: disabled ? ("not-allowed" as const) : ("pointer" as const),
  display: "flex" as const,
  alignItems: "center" as const,
  margin: 0,
  padding: 0,
});

/**
 * Gets accessibility attributes for checkbox
 */
export const getAccessibilityAttributes = (
  uniqueId: string,
  isIndeterminate: boolean,
) => {
  return {
    role: "checkbox",
    "aria-checked": isIndeterminate ? "mixed" : undefined,
    "aria-labelledby": `${uniqueId}-label`,
    "aria-describedby": `${uniqueId}-description`,
  };
};

// getIconSize is now handled by tokens.indicator.iconSize
// getSpacingBySize is now handled by tokens.subtext.spacing and tokens.slotGap
// getFocusRingStyles is now handled by tokens.root.focus
