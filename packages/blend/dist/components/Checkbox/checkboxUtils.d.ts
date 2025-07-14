import { CheckboxSize } from './types';
import { CheckboxTokensType } from './checkbox.token';
export declare const getCheckboxDataState: (checked: boolean | "indeterminate") => string;
export declare const extractPixelValue: (tokenValue: string | number | undefined) => number;
/**
 * Determines if the checkbox component is controlled based on the checked prop
 */
export declare const isControlledCheckbox: (checked: boolean | "indeterminate" | undefined) => boolean;
/**
 * Creates input props for controlled vs uncontrolled components
 */
export declare const createCheckboxInputProps: (checked: boolean | "indeterminate" | undefined, defaultChecked: boolean) => {
    checked: boolean | undefined;
    defaultChecked?: undefined;
} | {
    defaultChecked: boolean;
    checked?: undefined;
};
/**
 * Gets the current checked state for styling purposes
 */
export declare const getCurrentCheckedState: (checked: boolean | "indeterminate" | undefined, defaultChecked: boolean) => boolean | "indeterminate";
/**
 * Gets the icon color based on checkbox state
 */
export declare const getCheckboxIconColor: (tokens: CheckboxTokensType, currentChecked: boolean | "indeterminate", disabled: boolean) => string;
/**
 * Gets the text color based on checkbox state
 */
export declare const getCheckboxTextColor: (tokens: CheckboxTokensType, disabled: boolean, error: boolean) => string;
/**
 * Gets the subtext color based on checkbox state
 */
export declare const getCheckboxSubtextColor: (tokens: CheckboxTokensType, disabled: boolean, error: boolean) => string;
/**
 * Gets the text properties for checkbox labels
 */
export declare const getCheckboxTextProps: (tokens: CheckboxTokensType, size: CheckboxSize, disabled: boolean, error: boolean) => {
    fontSize: string;
    fontWeight: string;
    color: string;
};
/**
 * Gets the subtext properties for checkbox
 */
export declare const getCheckboxSubtextProps: (tokens: CheckboxTokensType, size: CheckboxSize, disabled: boolean, error: boolean) => {
    fontSize: string;
    color: string;
};
/**
 * Gets label styles for checkbox components
 */
export declare const getCheckboxLabelStyles: (disabled: boolean) => {
    cursor: "not-allowed" | "pointer";
    display: "flex";
    alignItems: "center";
    margin: number;
    padding: number;
};
/**
 * Gets accessibility attributes for checkbox
 */
export declare const getAccessibilityAttributes: (uniqueId: string, isIndeterminate: boolean) => {
    role: string;
    'aria-checked': string | undefined;
    'aria-labelledby': string;
    'aria-describedby': string;
};
