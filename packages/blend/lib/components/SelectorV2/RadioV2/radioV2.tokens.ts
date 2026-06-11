import { Theme } from '../../../context/theme.enum'

import { FoundationTokenType } from '../../../tokens/theme.token'
import { getRadioV2LightTokens } from './radioV2.light.tokens'
import { getRadioV2DarkTokens } from './radioV2.dark.tokens'
import type { ResponsiveRadioV2Tokens } from './radioV2.tokens.types'

export type {
    RadioV2TokensType,
    ResponsiveRadioV2Tokens,
} from './radioV2.tokens.types'

export const getRadioV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveRadioV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getRadioV2DarkTokens(foundationToken)
    }

    return getRadioV2LightTokens(foundationToken)
}
