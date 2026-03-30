import { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getSidebarV2DarkTokens } from './sidebarV2.dark.tokens'
import { getSidebarV2LightTokens } from './sidebarV2.light.tokens'

export type SidebarV2ItemInteractionStates = 'default' | 'hover' | 'active'

export type SidebarV2TokensType = {
    backgroundColor: CSSObject['backgroundColor']
    primarySidebar: {
        width: CSSObject['width']
        borderRight: CSSObject['borderRight']
        backgroundColor: CSSObject['backgroundColor']
        padding: {
            top: CSSObject['padding']
            bottom: CSSObject['padding']
            left: CSSObject['padding']
            right: CSSObject['padding']
        }
    }
    secondarySidebar: {
        width: CSSObject['width']
        borderRight: CSSObject['borderRight']
        backgroundColor: CSSObject['backgroundColor']
        gap: CSSObject['gap']
        padding: {
            top: CSSObject['padding']
            bottom: CSSObject['padding']
            left: CSSObject['padding']
            right: CSSObject['padding']
        }
        item: {
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            border: {
                [key in SidebarV2ItemInteractionStates]: CSSObject['border']
            }
            backgroundColor: {
                [key in SidebarV2ItemInteractionStates]: CSSObject['backgroundColor']
            }
        }
    }
}

export type ResponsiveSidebarV2Tokens = {
    [key in keyof BreakpointType]: SidebarV2TokensType
}

export const getSidebarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSidebarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSidebarV2DarkTokens(foundationToken)
    }
    return getSidebarV2LightTokens(foundationToken)
}
