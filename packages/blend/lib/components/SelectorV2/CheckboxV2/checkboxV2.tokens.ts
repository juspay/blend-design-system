import { Theme } from '../../../context/theme.enum'

import { FoundationTokenType } from '../../../tokens/theme.token'
import { getCheckboxV2LightTokens } from './checkboxV2.light.tokens'
import { getCheckboxV2DarkTokens } from './checkboxV2.dark.tokens'
import type { ResponsiveCheckboxV2Tokens } from './checkboxV2.tokens.types'

export type {
    CheckboxV2TokensType,
    ResponsiveCheckboxV2Tokens,
} from './checkboxV2.tokens.types'

export const getCheckboxV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveCheckboxV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getCheckboxV2DarkTokens(foundationToken)
    }

    return getCheckboxV2LightTokens(foundationToken)
}
