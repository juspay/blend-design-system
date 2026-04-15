import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../../tokens/theme.token'

export type ChatInputV2TokensType = {
    container: {
        backgroundColor: CSSObject['backgroundColor']
        borderRadius: CSSObject['borderRadius']
        border: CSSObject['border']
        gap: CSSObject['gap']
        padding: CSSObject['padding']
        attachmentContainer: {
            gap: CSSObject['gap']
            width: CSSObject['width']
        }
    }
}
