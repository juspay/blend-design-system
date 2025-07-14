import { CSSObject } from 'styled-components'
import { UnitInputSize } from './types'
import { FoundationTokenType } from '../../../tokens/theme.token'
declare enum UnitInputState {
    DEFAULT = 'default',
    HOVER = 'hover',
    FOCUS = 'focus',
    ERROR = 'error',
    DISABLED = 'disabled',
}
export type UnitInputTokensType = {
    input: {
        gap: CSSObject['gap']
        borderRadius?: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        paddingX: {
            [key in UnitInputSize]: CSSObject['padding']
        }
        paddingY: {
            [key in UnitInputSize]: CSSObject['padding']
        }
        border: {
            [key in UnitInputState]: CSSObject['border']
        }
        color: {
            [key in UnitInputState]: CSSObject['color']
        }
        outline: {
            [key in UnitInputState]: CSSObject['outline']
        }
        backgroundColor: {
            [key in UnitInputState]: CSSObject['backgroundColor']
        }
    }
}
declare const unitInputTokens: UnitInputTokensType
export declare const getUnitInputTokens: (
    foundationTheme: FoundationTokenType
) => UnitInputTokensType
export default unitInputTokens
