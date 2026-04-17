import type { CSSObject } from 'styled-components'
import { FoundationTokenType } from '../../../tokens/theme.token'
import { InputStateV2 } from '../inputV2.types'
import { Theme } from '../../../context/theme.enum'
import { getChatInputV2MobileDarkTokens } from './ChatInputV2Mobile.dark.tokens'
import { getChatInputV2MobileLightTokens } from './ChatInputV2Mobile.light.tokens'

export type dimentions = {
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
    } & dimentions
    slot2: {
        width: CSSObject['width']
        height: CSSObject['height']
        borderRadius: CSSObject['borderRadius']
        right: CSSObject['right']
        bottom: CSSObject['bottom']
        backgroundColor: { [key in InputStateV2]: CSSObject['backgroundColor'] }
        color: CSSObject['color']
    }
}

export const getChatInputV2MobileTokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ChatInputV2MobileTokensType => {
    console.log('theme', theme)
    if (theme === Theme.DARK || theme === 'dark') {
        return getChatInputV2MobileDarkTokens(foundationToken)
    }
    return getChatInputV2MobileLightTokens(foundationToken)
}

export default getChatInputV2MobileTokens
