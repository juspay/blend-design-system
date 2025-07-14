import { default as React } from 'react'
import { RadioSize, RadioProps } from './types'
import { RadioTokensType } from './radio.token'
export declare const getRadioDataState: (checked: boolean) => string
export declare const extractPixelValue: (tokenValue: string) => number
export declare const getSpacingBySize: (size: RadioSize) => {
    marginLeft: string
    marginTop: string
}
export declare const isControlledRadio: (
    checked: boolean | undefined
) => boolean
export declare const createRadioInputProps: (
    checked: boolean | undefined,
    defaultChecked: boolean
) =>
    | {
          checked: boolean | undefined
          defaultChecked?: undefined
      }
    | {
          defaultChecked: boolean
          checked?: undefined
      }
export declare const getCurrentCheckedState: (
    checked: boolean | undefined,
    defaultChecked: boolean
) => boolean
export declare const createRadioChangeHandler: (
    disabled: boolean,
    onChange?: (checked: boolean) => void
) => (e: React.ChangeEvent<HTMLInputElement>) => void
export declare const isRadioElement: (
    child: React.ReactElement,
    RadioComponent: React.ComponentType<RadioProps>
) => child is React.ReactElement<RadioProps>
export declare const shouldRadioBeChecked: (
    groupValue: string | undefined,
    groupDefaultValue: string | undefined,
    radioValue: string
) => boolean
export declare const createGroupChangeHandler: (
    onChange?: (value: string) => void
) => (isChecked: boolean, childValue: string) => void
export declare const isValidRadioValue: (value: unknown) => value is string
/**
 * Gets the text color based on radio state
 */
export declare const getRadioTextColor: (
    radioTokens: RadioTokensType,
    isDisabled: boolean,
    error: boolean,
    isSubtext?: boolean
) => string
/**
 * Gets the text properties for radio labels and subtext
 */
export declare const getRadioTextProps: (
    radioTokens: RadioTokensType,
    size: RadioSize,
    isDisabled: boolean,
    error: boolean,
    isSubtext?: boolean
) => {
    fontSize: string
    fontWeight: string
    color: string
}
/**
 * Gets label styles for radio components
 */
export declare const getRadioLabelStyles: (
    radioTokens: RadioTokensType,
    isDisabled: boolean
) => {
    display: 'inline-flex'
    alignItems: 'center'
    padding: number
    margin: number
    minHeight: string
    cursor: 'not-allowed' | 'pointer'
    lineHeight: number
}
