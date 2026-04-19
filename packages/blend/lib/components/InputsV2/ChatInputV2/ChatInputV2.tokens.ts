import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../../tokens/theme.token'
import { InputStateV2 } from '../inputV2.types'
import { Theme } from '../../../context/theme.enum'
import { getChatInputV2DarkTokens } from './ChatInputV2.dark.tokens'
import { getChatInputV2LightTokens } from './ChatInputV2.light.tokens'

export type ChatInputV2TokensType = {
    container: {
        backgroundColor: {
            [key in InputStateV2]: CSSObject['backgroundColor']
        }
        borderRadius: CSSObject['borderRadius']
        border: {
            [key in InputStateV2]: CSSObject['border']
        }
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        slot: {
            backgroundColor: CSSObject['backgroundColor']
            borderRadius: CSSObject['borderRadius']
            border: CSSObject['border']
        }
        attachedFilesContainer: {
            gap: CSSObject['gap']
            overflowMenu: {
                gap: CSSObject['gap']
                backgroundColor: {
                    [key in InputStateV2]: CSSObject['backgroundColor']
                }
                borderRadius: CSSObject['borderRadius']
                padding: CSSObject['padding']
                top: CSSObject['top']
                right: CSSObject['right']
                maxHeight: CSSObject['maxHeight']
            }
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        tagContainer: {
            gap: CSSObject['gap']
            borderRadius: CSSObject['borderRadius']
            padding: CSSObject['padding']
            border: CSSObject['border']
            backgroundColor: CSSObject['backgroundColor']
            text: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
        }
        inputContainer: {
            outline: {
                [key in InputStateV2]: CSSObject['outline']
            }
            boxShadow: { [key in InputStateV2]: CSSObject['boxShadow'] }
            gap: CSSObject['gap']
            borderRadius: CSSObject['borderRadius']
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            border: CSSObject['border']
            backgroundColor: CSSObject['backgroundColor']
            input: {
                color: CSSObject['color']
                placeholder: CSSObject['placeholder']
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingLeft: CSSObject['paddingLeft']
                minHeight: CSSObject['minHeight']
                maxHeight: CSSObject['maxHeight']
            }
            slotContainer: {
                paddingRight: CSSObject['paddingRight']
                paddingBottom: CSSObject['paddingBottom']
                paddingLeft: CSSObject['paddingLeft']
            }
            topQueriesContainer: {
                marginRight: CSSObject['marginRight']
                marginLeft: CSSObject['marginLeft']
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingBottom: CSSObject['paddingBottom']
                paddingLeft: CSSObject['paddingLeft']
                borderTop: CSSObject['borderTop']
                header: {
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    textTransform: CSSObject['textTransform']
                    paddingTop: CSSObject['paddingTop']
                    paddingRight: CSSObject['paddingRight']
                    paddingBottom: CSSObject['paddingBottom']
                    paddingLeft: CSSObject['paddingLeft']
                    backgroundColor: CSSObject['backgroundColor']
                }
                item: {
                    backgroundColor: {
                        [key in InputStateV2]: CSSObject['outline']
                    }
                    color: { [key in InputStateV2]: CSSObject['color'] }
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    paddingTop: CSSObject['paddingTop']
                    paddingRight: CSSObject['paddingRight']
                    paddingBottom: CSSObject['paddingBottom']
                    paddingLeft: CSSObject['paddingLeft']
                    border: CSSObject['border']
                    transition: CSSObject['transition']
                    cursor: CSSObject['cursor']
                    opacity: { [key in InputStateV2]: CSSObject['opacity'] }
                }
            }
        }
    }
}

export type ResponsiveChatInputV2TokensType = {
    [key in keyof BreakpointType]: ChatInputV2TokensType
}

export const getChatInputV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveChatInputV2TokensType => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getChatInputV2DarkTokens(foundationToken)
    }
    return getChatInputV2LightTokens(foundationToken)
}

export default getChatInputV2Tokens
