import type { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getOTPInputV2DarkTokens } from './OTPInputV2.dark.tokens'
import { getOTPInputV2LightTokens } from './OTPInputV2.light.tokens'
import type { ResponsiveOTPInputV2Tokens } from './OTPInputV2.tokens.types'

export type {
    OTPInputV2TokensType,
    ResponsiveOTPInputV2Tokens,
} from './OTPInputV2.tokens.types'

export const getOTPInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveOTPInputV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getOTPInputV2DarkTokens(foundationToken)
    }
    return getOTPInputV2LightTokens(foundationToken)
}
