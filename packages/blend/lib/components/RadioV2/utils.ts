import { RadioV2TokensType } from './radioV2.tokens'
import { RadioV2Props, RadioV2Size } from './radioV2.types'

export const isRadioElement = (
    child: React.ReactElement,
    RadioComponent: React.ComponentType<RadioV2Props>
): child is React.ReactElement<RadioV2Props> => {
    return child.type === RadioComponent
}

export const isValidRadioValue = (value: unknown): value is string => {
    return typeof value === 'string'
}

export const getRadioTextColor = (
    radioTokens: RadioV2TokensType,
    isDisabled: boolean,
    error: boolean,
    isSubtext: boolean = false
): string => {
    const state = isDisabled ? 'disabled' : error ? 'error' : 'default'
    const color = isSubtext
        ? radioTokens.content.subLabel.color[state]
        : radioTokens.content.label.color[state]
    return String(color || '')
}
export const getRadioTextProps = (
    radioTokens: RadioV2TokensType,
    size: RadioV2Size,
    isDisabled: boolean,
    error: boolean,
    isSubtext: boolean = false
): {
    fontSize: string
    fontWeight: string
    color: string
} => {
    const fontSizeConfig = isSubtext
        ? radioTokens.content.subLabel.fontSize[size]
        : radioTokens.content.label.fontSize[size]
    const fontWeightConfig = isSubtext
        ? radioTokens.content.subLabel.fontWeight[size]
        : radioTokens.content.label.fontWeight[size]

    return {
        fontSize: String(fontSizeConfig || ''),
        fontWeight: String(fontWeightConfig || ''),
        color: getRadioTextColor(radioTokens, isDisabled, error, isSubtext),
    }
}
