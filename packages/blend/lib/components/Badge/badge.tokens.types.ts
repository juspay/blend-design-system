import type { CSSObject } from 'styled-components'
import { BadgeSize, BadgeColor } from './Badge.types'
import { BreakpointType } from '../../breakpoints/breakPoints'

//Tokens Pattern: component.[target].CSSProp.[size].[variant/type].[subVariant/subType].[state].value

export type BadgeTokensType = Readonly<{
    dot: {
        width: {
            [key in BadgeSize]: CSSObject['width']
        }
        height: {
            [key in BadgeSize]: CSSObject['height']
        }
        borderRadius: CSSObject['borderRadius']
    }
    pill: {
        minWidth: {
            [key in BadgeSize]: CSSObject['minWidth']
        }
        height: {
            [key in BadgeSize]: CSSObject['height']
        }
        paddingLeft: {
            [key in BadgeSize]: CSSObject['paddingLeft']
        }
        paddingRight: {
            [key in BadgeSize]: CSSObject['paddingRight']
        }
        borderRadius: {
            [key in BadgeSize]: CSSObject['borderRadius']
        }
    }
    backgroundColor: {
        [key in BadgeColor]: CSSObject['backgroundColor']
    }
    text: {
        color: CSSObject['color']
        fontSize: {
            [key in BadgeSize]: CSSObject['fontSize']
        }
        fontWeight: CSSObject['fontWeight']
        lineHeight: {
            [key in BadgeSize]: CSSObject['lineHeight']
        }
    }
    position: {
        offset: {
            [key in BadgeSize]: CSSObject['top']
        }
    }
}>

export type ResponsiveBadgeTokens = {
    [key in keyof BreakpointType]: BadgeTokensType
}
