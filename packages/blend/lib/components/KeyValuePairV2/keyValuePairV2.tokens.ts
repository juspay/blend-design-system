import type { CSSObject } from 'styled-components'
import { KeyValuePairV2Size } from './keyValuePairV2.types'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getKeyValuePairV2LightTokens } from './keyValuePairV2.light.tokens'
import { getKeyValuePairV2DarkTokens } from './keyValuePairV2.dark.tokens'

export type KeyValuePairV2TokensType = {
    gap: {
        [key in 'vertical' | 'horizontal']: CSSObject['gap']
    }
    key: {
        color: CSSObject['color']
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        gap: CSSObject['gap']
    }
    value: {
        color: CSSObject['color']
        fontSize: {
            [key in KeyValuePairV2Size]: CSSObject['fontSize']
        }
        fontWeight: CSSObject['fontWeight']
        gap: CSSObject['gap']
        slot: {
            color: CSSObject['color']
        }
    }
}

export type ResponsiveKeyValuePairV2Tokens = {
    [key in keyof BreakpointType]: KeyValuePairV2TokensType
}

export const getKeyValuePairV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveKeyValuePairV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getKeyValuePairV2DarkTokens(foundationToken)
    }

    return getKeyValuePairV2LightTokens(foundationToken)
}
