import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type ChartState = 'default' | 'hover' | 'active'
export type ChartHeight = 'default' | 'fullscreen' | 'small'
export type ChartTokensType = {
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    header: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        backgroundColor: CSSObject['backgroundColor']
        borderBottom: CSSObject['borderBottom']
        borderRadius: CSSObject['borderRadius']
        slots: {
            gap: CSSObject['gap']
        }
    }
    content: {
        legend: {
            gap: CSSObject['gap']
            item: {
                gap: CSSObject['gap']
                color: {
                    [key in ChartState]: CSSObject['color']
                }
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
        }
        padding: {
            top: CSSObject['padding']
            right: CSSObject['padding']
            bottom: CSSObject['padding']
            left: CSSObject['padding']
        }
        gap: CSSObject['gap']
        backgroundColor: CSSObject['backgroundColor']
    }
}

export type ResponsiveChartTokens = {
    [key in keyof BreakpointType]: ChartTokensType
}

export const getChartTokens = (
    foundationToken: FoundationTokenType
): ResponsiveChartTokens => {
    return {
        sm: {
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            header: {
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[8],
                },
                backgroundColor: foundationToken.colors.gray[25],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[8],
                slots: {
                    gap: foundationToken.unit[12],
                },
            },
            content: {
                legend: {
                    gap: foundationToken.unit[16],
                    item: {
                        gap: foundationToken.unit[8],
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[800],
                        },
                        fontSize: 12,
                        fontWeight: 500,
                    },
                },
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    top: foundationToken.unit[0],
                    right: foundationToken.unit[12],
                    bottom: foundationToken.unit[8],
                    left: foundationToken.unit[12],
                },
                gap: foundationToken.unit[16],
            },
        },
        lg: {
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            header: {
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[8],
                },

                backgroundColor: foundationToken.colors.gray[25],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[8],
                slots: {
                    gap: foundationToken.unit[12],
                },
            },
            content: {
                legend: {
                    gap: foundationToken.unit[16],
                    item: {
                        gap: foundationToken.unit[8],
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[800],
                        },
                        fontSize: 12,
                        fontWeight: 500,
                    },
                },
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    top: foundationToken.unit[20],
                    right: foundationToken.unit[16],
                    bottom: foundationToken.unit[16],
                    left: foundationToken.unit[16],
                },
                gap: foundationToken.unit[16],
            },
        },
    }
}
