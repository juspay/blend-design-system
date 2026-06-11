import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../../breakpoints/breakPoints'
import { InputStateV2 } from '../inputV2.types'

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
        }
        tagContainer: {
            gap: CSSObject['gap']
            borderRadius: CSSObject['borderRadius']
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
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
                placeholder: CSSObject['color']
                paddingTop: CSSObject['paddingTop']
                paddingRight: CSSObject['paddingRight']
                paddingLeft: CSSObject['paddingLeft']
                minHeight: CSSObject['minHeight']
                maxHeight: CSSObject['maxHeight']
            }
            actionContainer: {
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
                        [key in InputStateV2]: CSSObject['backgroundColor']
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
