import type { FoundationTokenType } from '../../tokens/theme.token'
import { getSidebarV2DarkTokens } from '../SidebarV2/sidebarV2.dark.tokens'
import type { SidebarV2TokensType } from '../SidebarV2/sidebarV2.tokens.types'
import type {
    ResponsiveSidebarV3Tokens,
    SidebarV3TokensType,
} from './sidebarV3.tokens.types'

export const getSidebarV3DarkTokens = (
    foundation: FoundationTokenType
): ResponsiveSidebarV3Tokens => {
    const base = getSidebarV2DarkTokens(foundation)
    const create = (tokens: SidebarV2TokensType): SidebarV3TokensType => ({
        container: {
            ...tokens.container,
            backgroundColor: foundation.colors.gray[900],
        },
        leftPanel: tokens.leftPanel,
        header: {
            ...tokens.header,
            backgroundColor: foundation.colors.gray[900],
        },
        directory: tokens.directory,
        footer: {
            ...tokens.footer,
            backgroundColor: foundation.colors.gray[900],
        },
        primarySidebar: tokens.primarySidebar,
        secondarySidebar: tokens.secondarySidebar,
        frame: {
            stripHeight: foundation.unit[48],
            stripPaddingInline: foundation.unit[16],
            stripBackgroundColor: foundation.colors.gray[950],
            stripColor: foundation.colors.gray[0],
            surfaceRadius: foundation.border.radius[16],
            surfaceBackgroundColor: foundation.colors.gray[900],
            surfaceColor: foundation.colors.gray[100],
        },
        search: {
            padding: `${foundation.unit[0]} ${foundation.unit[8]} ${foundation.unit[8]}`,
        },
        navigation: {
            hoverBackgroundColor: foundation.colors.gray[800],
            selectedBackgroundColor: foundation.colors.primary[900],
            selectedColor: foundation.colors.primary[200],
            separatorColor: foundation.colors.gray[700],
            separatorWidth: foundation.border.width[1],
            separatorOffset: foundation.unit[12],
            guideColor: foundation.colors.gray[700],
            guideOffset: foundation.unit[6],
            motionDuration: '150ms',
            feedbackDuration: '200ms',
            feedbackEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
    })
    return { sm: create(base.sm), lg: create(base.lg) }
}
