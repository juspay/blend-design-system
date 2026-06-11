import { Theme } from '../../../context/theme.enum'

import { FoundationTokenType } from '../../../tokens/theme.token'
import { getSwitchV2LightTokens } from './switchV2.light.tokens'
import { getSwitchV2DarkTokens } from './switchV2.dark.tokens'
import type { ResponsiveSwitchV2Tokens } from './switchV2.tokens.types'

export type {
    SwitchV2TokensType,
    ResponsiveSwitchV2Tokens,
} from './switchV2.tokens.types'

export const getSwitchV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSwitchV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSwitchV2DarkTokens(foundationToken)
    }

    return getSwitchV2LightTokens(foundationToken)
}
