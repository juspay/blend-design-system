import type { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSidebarV3LightTokens } from './sidebarV3.light.tokens'
import { getSidebarV3DarkTokens } from './sidebarV3.dark.tokens'
import type { ResponsiveSidebarV3Tokens } from './sidebarV3.tokens.types'

export type {
    SidebarV3TokensType,
    ResponsiveSidebarV3Tokens,
} from './sidebarV3.tokens.types'

export const getSidebarV3Tokens = (
    foundation: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSidebarV3Tokens =>
    theme === Theme.DARK || theme === 'dark'
        ? getSidebarV3DarkTokens(foundation)
        : getSidebarV3LightTokens(foundation)
