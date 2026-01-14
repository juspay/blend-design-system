import { PaddingDirection } from '../../../global-types/GlobalTypes'
import type { CSSObject } from 'styled-components'
import { TagV2Color, TagV2Size, TagV2Type, TagV2SubType } from './TagV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getTagV2DarkTokens } from './tagV2.dark.tokens'
import { getTagV2LightTokens } from './tagV2.light.tokens'

//Tokens Pattern: component.[target].CSSProp.[size].[variant/type].[subVariant/subType].[state].value

export type TagV2TokensType = Readonly<{
    border: {
        [key in TagV2Type]: {
            [key in TagV2Color]: CSSObject['border']
        }
    }
    borderRadius: {
        [key in TagV2Size]: {
            [key in TagV2SubType]: CSSObject['borderRadius']
        }
    }
    backgroundColor: {
        [key in TagV2Type]: {
            [key in TagV2Color]: CSSObject['backgroundColor']
        }
    }
    height: {
        [key in TagV2Size]: CSSObject['height']
    }
    padding: {
        [key in PaddingDirection]: {
            [key in TagV2Size]: CSSObject['padding']
        }
    }
    gap: CSSObject['gap']

    text: {
        color: {
            [key in TagV2Type]: {
                [key in TagV2Color]: CSSObject['color']
            }
        }
        fontSize: {
            [key in TagV2Size]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in TagV2Size]: CSSObject['fontWeight']
        }
        lineHeight: {
            [key in TagV2Size]: CSSObject['lineHeight']
        }
    }
}>

export type ResponsiveTagV2Tokens = {
    [key in keyof BreakpointType]: TagV2TokensType
}

export const getTagV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTagV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTagV2DarkTokens(foundationToken)
    }

    return getTagV2LightTokens(foundationToken)
}
