import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSidebarV2DarkTokens } from './sidebarV2.dark.tokens'
import { getSidebarV2LightTokens } from './sidebarV2.light.tokens'
import type { ResponsiveSidebarV2Tokens } from './sidebarV2.tokens.types'

export type {
    SidebarV2ItemInteractionStates,
    SidebarV2TokensType,
    ResponsiveSidebarV2Tokens,
} from './sidebarV2.tokens.types'

export const getSidebarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSidebarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSidebarV2DarkTokens(foundationToken)
    }
    return getSidebarV2LightTokens(foundationToken)
}
