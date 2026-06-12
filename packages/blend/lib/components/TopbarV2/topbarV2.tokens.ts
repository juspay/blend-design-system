import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getTopbarV2DarkTokens } from './topbarV2.dark.tokens'
import { getTopbarV2LightTokens } from './topbarV2.light.tokens'

export type TopbarV2State = 'default' | 'hover' | 'active'

export type TopbarV2TokenType = {
    zIndex: CSSObject['zIndex']
    height: CSSObject['height']
    borderBottom: CSSObject['borderBottom']
    backgroundColor: CSSObject['backgroundColor']
    backdropFilter: CSSObject['backdropFilter']
    padding: CSSObject['padding']
    gap: CSSObject['gap']
    separator: {
        width: CSSObject['width']
        color: CSSObject['color']
    }
    toggleButton: {
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
        backgroundColor: {
            [key in TopbarV2State]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition']
        icon: { size: CSSObject['width']; color: CSSObject['color'] }
    }
    actionButton: {
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
        minWidth: CSSObject['minWidth']
        height: CSSObject['height']
        backgroundColor: {
            [key in TopbarV2State]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition']
        icon: { size: CSSObject['width']; color: CSSObject['color'] }
    }
    tenantIconButton: {
        borderRadius: CSSObject['borderRadius']
        minHeight: CSSObject['minHeight']
        backgroundColor: {
            [key in TopbarV2State]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition']
    }
    merchantSelectTrigger: {
        gap: CSSObject['gap']
        icon: { size: CSSObject['width']; color: CSSObject['color'] }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }
    leftSection: {
        gap: CSSObject['gap']
        maxHeight: CSSObject['maxHeight']
        divider: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }
    rightSection: { gap: CSSObject['gap'] }
    sidebarSection: { gap: CSSObject['gap'] }
}

export type ResponsiveTopbarV2Tokens = {
    [key in keyof BreakpointType]: TopbarV2TokenType
}

export const getTopbarV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTopbarV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTopbarV2DarkTokens(foundationToken)
    }
    return getTopbarV2LightTokens(foundationToken)
}
