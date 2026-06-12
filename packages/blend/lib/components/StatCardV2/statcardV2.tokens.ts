import { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { Theme } from '../../context/theme.enum'
import { getStatCardV2LightTokens } from './statcardV2.light.tokens'
import { getStatCardV2DarkTokens } from './statcardV2.dark.tokens'
import { StatCardV2ChangeType, StatCardV2Variant } from './statcardV2.types'

export type StatCardV2TokensType = {
    height: CSSObject['height']
    width: CSSObject['width']
    maxWidth: CSSObject['maxWidth']
    minWidth: CSSObject['minWidth']
    paddingTop: CSSObject['paddingTop']
    paddingBottom: CSSObject['paddingBottom']
    paddingLeft: CSSObject['paddingLeft']
    paddingRight: CSSObject['paddingRight']
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    backgroundColor: CSSObject['backgroundColor']
    boxShadow: CSSObject['boxShadow']
    topContainer: {
        gap: CSSObject['gap']
        dataContainer: {
            gap: CSSObject['gap']
            titleContainer: {
                gap: CSSObject['gap']
                title: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    color: CSSObject['color']
                    lineHeight: CSSObject['lineHeight']
                }
                helpIcon: {
                    width: CSSObject['width']
                    height: CSSObject['height']
                    color: {
                        default: CSSObject['color']
                        hover: CSSObject['color']
                    }
                }
            }
            statsContainer: {
                gap: CSSObject['gap']
                value: {
                    [key in StatCardV2Variant]: {
                        fontSize: CSSObject['fontSize']
                        fontWeight: CSSObject['fontWeight']
                        color: CSSObject['color']
                        lineHeight: CSSObject['lineHeight']
                    }
                }
                changeContainer: {
                    gap: CSSObject['gap']
                    change: {
                        fontSize: CSSObject['fontSize']
                        fontWeight: CSSObject['fontWeight']
                        color: {
                            [key in StatCardV2ChangeType]: CSSObject['color']
                        }
                        lineHeight: CSSObject['lineHeight']
                    }
                    arrow: {
                        width: CSSObject['width']
                        height: CSSObject['height']
                        color: {
                            [key in StatCardV2ChangeType]: CSSObject['color']
                        }
                    }
                }
            }
            subtitle: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
                lineHeight: CSSObject['lineHeight']
            }
        }
    }
}

export type ResponsiveStatCardV2Tokens = {
    [key in keyof BreakpointType]: StatCardV2TokensType
}

export const getStatCardV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveStatCardV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getStatCardV2DarkTokens(foundationToken)
    }

    return getStatCardV2LightTokens(foundationToken)
}
