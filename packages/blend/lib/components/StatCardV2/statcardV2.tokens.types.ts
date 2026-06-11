import { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'

export enum StatCardV2Variant {
    CHART = 'chart',
    PROGRESS_BAR = 'progress',
    NUMBER = 'number',
}

export enum StatCardV2ChangeType {
    INCREASE = 'increase',
    DECREASE = 'decrease',
}

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
