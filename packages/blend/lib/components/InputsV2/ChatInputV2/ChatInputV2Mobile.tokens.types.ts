import type { CSSObject } from 'styled-components'
import { InputStateV2 } from '../inputV2.types'

export type Dimensions = {
    width: CSSObject['width']
    height: CSSObject['height']
    minHeight: CSSObject['minHeight']
    maxHeight: CSSObject['maxHeight']
    minWidth: CSSObject['minWidth']
    maxWidth: CSSObject['maxWidth']
}
export type ChatInputV2MobileTokensType = {
    gap: CSSObject['gap']
    attachmentButtonDimensions: {
        width: CSSObject['width']
        height: CSSObject['height']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        backgroundColor: { [key in InputStateV2]: CSSObject['backgroundColor'] }
        color: CSSObject['color']
    }
    inputContainer: {
        border: { [key in InputStateV2]: CSSObject['border'] }
        borderRadius: { [key in InputStateV2]: CSSObject['borderRadius'] }
        boxShadow: { [key in InputStateV2]: CSSObject['boxShadow'] }
        paddingLeft: CSSObject['paddingLeft']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        lineHeight: CSSObject['lineHeight']
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
        placeholder: {
            color: CSSObject['color']
        }
        backgroundColor: CSSObject['backgroundColor']
    } & Dimensions
    secondaryAction: {
        width: CSSObject['width']
        height: CSSObject['height']
        borderRadius: CSSObject['borderRadius']
        right: CSSObject['right']
        bottom: CSSObject['bottom']
        backgroundColor: { [key in InputStateV2]: CSSObject['backgroundColor'] }
        color: CSSObject['color']
    }
}
