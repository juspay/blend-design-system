import type { CSSObject } from 'styled-components'
import {
    AlertV2Type,
    AlertV2SubType,
    AlertV2ActionPosition,
} from './alertV2.types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { PaddingDirectionEnums } from '../../../global-types/GlobalTypes'
import { Theme } from '../../context/theme.enum'
import { getAlertV2DarkTokens } from './alertV2.dark.tokens'
import { getAlertV2LightTokens } from './alertV2.light.tokens'

//Tokens Pattern: component.[target].CSSProp.[size].[variant/type].[subVariant/subType].[state].value
export type AlertV2TokensType = {
    width: CSSObject['width']
    maxWidth: CSSObject['maxWidth']
    minWidth: CSSObject['minWidth']
    border: {
        [key in AlertV2Type]: {
            [key in AlertV2SubType]: CSSObject['color']
        }
    }
    borderRadius: CSSObject['borderRadius']
    backgroundColor: {
        [key in AlertV2Type]: {
            [key in AlertV2SubType]: CSSObject['color']
        }
    }
    padding: {
        [key in PaddingDirectionEnums]: CSSObject['padding']
    }
    gap: { [key in AlertV2ActionPosition]: CSSObject['gap'] }
    slot: {
        height: CSSObject['height']
        width: CSSObject['width']
    }
    mainContainer: {
        gap: CSSObject['gap']
        content: {
            gap: { [key in AlertV2ActionPosition]: CSSObject['gap'] }
            textContainer: {
                gap: CSSObject['gap']
                heading: {
                    color: { [key in AlertV2Type]: CSSObject['color'] }
                    fontWeight: CSSObject['fontWeight']
                    fontSize: CSSObject['fontSize']
                    lineHeight: CSSObject['lineHeight']
                }
                description: {
                    color: { [key in AlertV2Type]: CSSObject['color'] }
                    fontWeight: CSSObject['fontWeight']
                    fontSize: CSSObject['fontSize']
                    lineHeight: CSSObject['lineHeight']
                }
            }
            actionContainer: {
                gap: CSSObject['gap']
                primaryAction: {
                    color: { [key in AlertV2Type]: CSSObject['color'] }
                    fontWeight: CSSObject['fontWeight']
                    fontSize: CSSObject['fontSize']
                    lineHeight: CSSObject['lineHeight']
                }
                secondaryAction: {
                    color: { [key in AlertV2Type]: CSSObject['color'] }
                    fontWeight: CSSObject['fontWeight']
                    fontSize: CSSObject['fontSize']
                    lineHeight: CSSObject['lineHeight']
                }
            }
        }

        closeButton: {
            color: { [key in AlertV2Type]: CSSObject['color'] }
            height: CSSObject['height']
            width: CSSObject['width']
        }
    }
}

export type ResponsiveAlertV2Tokens = {
    [key in keyof BreakpointType]: AlertV2TokensType
}

export const getAlertV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveAlertV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getAlertV2DarkTokens(foundationToken)
    }

    return getAlertV2LightTokens(foundationToken)
}
