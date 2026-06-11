import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getPopoverV2LightToken } from './popoverV2.light.tokens'
import { getPopoverV2DarkToken } from './popoverV2.dark.tokens'
import type { ResponsivePopoverV2Tokens } from './popoverV2.tokens.types'

export type {
    PopoverV2TokenType,
    ResponsivePopoverV2Tokens,
} from './popoverV2.tokens.types'

export const getPopoverV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsivePopoverV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getPopoverV2DarkToken(foundationToken)
    }

    return getPopoverV2LightToken(foundationToken)
}
