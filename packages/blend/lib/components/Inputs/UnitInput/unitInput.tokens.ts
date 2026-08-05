import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getUnitInputLightTokens } from './unitInput.light.tokens'
import { getUnitInputDarkTokens } from './unitInput.dark.tokens'
import type { ResponsiveUnitInputTokens } from './unitInput.tokens.types'

export type {
    UnitInputTokensType,
    ResponsiveUnitInputTokens,
} from './unitInput.tokens.types'

export const getUnitInputTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveUnitInputTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getUnitInputDarkTokens(foundationToken)
    }

    return getUnitInputLightTokens(foundationToken)
}
