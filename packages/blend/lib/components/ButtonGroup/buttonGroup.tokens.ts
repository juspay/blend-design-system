import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getButtonGroupDarkTokens } from './buttonGroup.dark.tokens'
import { getButtonGroupLightTokens } from './buttonGroup.light.tokens'
import type { ResponsiveButtonGroupTokens } from './buttonGroup.tokens.types'

export type {
    ButtonGroupTokensType,
    ResponsiveButtonGroupTokens,
} from './buttonGroup.tokens.types'

export const getButtonGroupTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveButtonGroupTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getButtonGroupDarkTokens(foundationToken)
    }

    return getButtonGroupLightTokens(foundationToken)
}
