import { CSSObject } from 'styled-components'
import { FoundationTokenType } from '../../../tokens/theme.token'
import { MultiValueInputSize, MultiValueInputState } from './types'
export type MultiValueInputTokensType = {
    input: {
        gap: CSSObject['gap']
        borderRadius?: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        paddingX: {
            [key in MultiValueInputSize]: CSSObject['padding']
        }
        paddingY: {
            [key in MultiValueInputSize]: CSSObject['padding']
        }
        border: {
            [key in MultiValueInputState]: CSSObject['border']
        }
        color: {
            [key in MultiValueInputState]: CSSObject['color']
        }
        outline: {
            [key in MultiValueInputState]: CSSObject['outline']
        }
        backgroundColor: {
            [key in MultiValueInputState]: CSSObject['backgroundColor']
        }
    }
}
declare const multiValueInputTokens: Readonly<MultiValueInputTokensType>
export declare const getMultiValueInputTokens: (
    foundationTheme: FoundationTokenType
) => MultiValueInputTokensType
export default multiValueInputTokens
