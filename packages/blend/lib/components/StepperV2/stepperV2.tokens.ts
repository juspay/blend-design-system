import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getStepperV2DarkTokens } from './stepperV2.dark.tokens'
import { getStepperV2LightTokens } from './stepperV2.light.tokens'
import type { ResponsiveStepperV2Tokens } from './stepperV2.tokens.types'

export type {
    StepperV2TokensType,
    ResponsiveStepperV2Tokens,
} from './stepperV2.tokens.types'

export const getStepperV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveStepperV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getStepperV2DarkTokens(foundationToken)
    }

    return getStepperV2LightTokens(foundationToken)
}
