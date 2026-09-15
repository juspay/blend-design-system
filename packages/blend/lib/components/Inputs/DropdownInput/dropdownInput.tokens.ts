import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getDropdownInputLightTokens } from './dropdownInput.light.tokens'
import { getDropdownInputDarkTokens } from './dropdownInput.dark.tokens'
import type { ResponsiveDropdownInputTokens } from './dropdownInput.tokens.types'

export type {
    DropdownInputTokensType,
    ResponsiveDropdownInputTokens,
} from './dropdownInput.tokens.types'

export const getDropdownInputTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveDropdownInputTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getDropdownInputDarkTokens(foundationToken)
    }

    return getDropdownInputLightTokens(foundationToken)
}
