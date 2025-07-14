import { default as React } from 'react'
import { SwitchSize, SwitchProps } from './types'
import { SwitchTokensType } from './switch.token'
export declare const getSwitchDataState: (checked: boolean) => string
export declare const extractPixelValue: (tokenValue: string) => number
export declare const getSpacingBySize: (size: SwitchSize) => {
    marginLeft: string
    marginTop: string
}
/**
 * Determines if the switch component is controlled based on the checked prop
 */
export declare const isControlledSwitch: (
    checked: boolean | undefined
) => boolean
/**
 * Creates a toggle handler for switch components
 */
export declare const createSwitchToggleHandler: (
    currentChecked: boolean,
    disabled: boolean,
    isControlled: boolean,
    setInternalChecked?: React.Dispatch<React.SetStateAction<boolean>>,
    onChange?: (checked: boolean) => void
) => () => void
/**
 * Gets the text color based on switch state
 */
export declare const getSwitchTextColor: (
    tokens: SwitchTokensType,
    disabled: boolean,
    error: boolean
) => string
/**
 * Gets the subtext color based on switch state
 */
export declare const getSwitchSubtextColor: (
    tokens: SwitchTokensType,
    disabled: boolean,
    error: boolean
) => string
/**
 * Gets the text properties for switch labels
 */
export declare const getSwitchTextProps: (
    tokens: SwitchTokensType,
    size: SwitchSize,
    disabled: boolean,
    error: boolean
) => {
    fontSize: string
    fontWeight: string
    color: string
}
/**
 * Gets the subtext properties for switch
 */
export declare const getSwitchSubtextProps: (
    tokens: SwitchTokensType,
    size: SwitchSize,
    disabled: boolean,
    error: boolean
) => {
    fontSize: string
    color: string
}
/**
 * Gets label styles for switch components
 */
export declare const getSwitchLabelStyles: (disabled: boolean) => {
    cursor: 'not-allowed' | 'pointer'
    display: 'flex'
    alignItems: 'center'
    margin: number
    padding: number
}
/**
 * Validates if a child element is a Switch component
 */
export declare const isSwitchElement: (
    child: React.ReactElement,
    SwitchComponent: React.ComponentType<SwitchProps>
) => child is React.ReactElement<SwitchProps>
/**
 * Creates a group change handler for switch groups
 */
export declare const createSwitchGroupChangeHandler: (
    values: string[],
    isControlled: boolean,
    setInternalValues?: React.Dispatch<React.SetStateAction<string[]>>,
    onChange?: (values: string[]) => void
) => (checked: boolean, childValue: string) => void
