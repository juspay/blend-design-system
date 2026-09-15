import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSliderLightTokens } from './slider.light.tokens'
import { getSliderDarkTokens } from './slider.dark.tokens'
import type { ResponsiveSliderTokens } from './slider.tokens.types'

export type {
    ResponsiveSliderTokens,
    SliderTokensType,
} from './slider.tokens.types'

export const getSliderTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSliderTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSliderDarkTokens(foundationToken)
    }

    return getSliderLightTokens(foundationToken)
}

export default getSliderTokens
