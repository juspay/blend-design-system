import { Theme } from '../../context/theme.enum'

import { CSSObject } from 'styled-components'
import { SwitchV2Size, SwitchV2State, SwitchV2Variant } from './switchV2.types'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { getSwitchV2LightTokens } from './switchV2.light.tokens'
import { getSwitchV2DarkTokens } from './switchV2.dark.tokens'

export type SwitchV2TokensType = {
    gap: CSSObject['gap']
    switch: {
        height: {
            [key in SwitchV2Size]: CSSObject['height']
        }
        width: {
            [key in SwitchV2Size]: CSSObject['width']
        }
        backgroundColor: {
            [key in SwitchV2Variant]: {
                [key in SwitchV2State]: CSSObject['backgroundColor']
            }
        }
        thumb: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            width: {
                [key in SwitchV2Size]: CSSObject['width']
            }
            height: {
                [key in SwitchV2Size]: CSSObject['height']
            }
            outline: CSSObject['outline']
        }
    }
    content: {
        label: {
            gap: CSSObject['gap']
            color: {
                [key in SwitchV2State]: CSSObject['color']
            }
            fontSize: { [key in SwitchV2Size]: CSSObject['fontSize'] }
            fontWeight: { [key in SwitchV2Size]: CSSObject['fontWeight'] }
            lineHeight: { [key in SwitchV2Size]: CSSObject['lineHeight'] }
            slot: {
                maxHeight: {
                    [key in SwitchV2Size]: CSSObject['maxHeight']
                }
            }
        }
        subLabel: {
            color: {
                [key in SwitchV2State]: CSSObject['color']
            }
            fontSize: { [key in SwitchV2Size]: CSSObject['fontSize'] }
            fontWeight: { [key in SwitchV2Size]: CSSObject['fontWeight'] }
            lineHeight: { [key in SwitchV2Size]: CSSObject['lineHeight'] }
        }
        required: {
            color: CSSObject['color']
        }
    }
}

export type ResponsiveSwitchV2Tokens = {
    [key in keyof BreakpointType]: SwitchV2TokensType
}

export const getSwitchV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveSwitchV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getSwitchV2DarkTokens(foundationToken)
    }

    return getSwitchV2LightTokens(foundationToken)
}
