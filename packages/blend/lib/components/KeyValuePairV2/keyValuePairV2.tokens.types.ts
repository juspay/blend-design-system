import type { CSSObject } from 'styled-components'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { KeyValuePairV2Size } from './keyValuePairV2.types'

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
    }
}

export type ResponsiveKeyValuePairV2Tokens = {
    [key in keyof BreakpointType]: KeyValuePairV2TokensType
}
