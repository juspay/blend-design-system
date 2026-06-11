import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getAccordionV2DarkTokens } from './accordionV2.dark.tokens'
import { getAccordionV2LightTokens } from './accordionV2.light.tokens'
import type { ResponsiveAccordionV2Tokens } from './accordionV2.tokens.types'

export type {
    AccordionV2State,
    AccordionV2TokensType,
    ResponsiveAccordionV2Tokens,
} from './accordionV2.tokens.types'

export const getAccordionV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveAccordionV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getAccordionV2DarkTokens(foundationToken)
    }

    return getAccordionV2LightTokens(foundationToken)
}
