import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveChartV2Tokens } from './chartV2.tokens'

export const getChartV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveChartV2Tokens => {
    return {
        sm: {
            border: `1px solid ${foundationToken.colors.gray[150]}`,
            backgroundColor: foundationToken.colors.gray[0],
            borderRadius: foundationToken.border.radius[12],
            boxShadow: foundationToken.shadows.sm,
            header: {
                padding: {
                    top: foundationToken.unit[8],
                    right: foundationToken.unit[16],
                    bottom: foundationToken.unit[8],
                    left: foundationToken.unit[16],
                },
                backgroundColor: foundationToken.colors.gray[25],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            legends: {
                gap: foundationToken.unit[16],
                legendItem: {
                    gap: foundationToken.unit[8],
                    shape: {
                        width: foundationToken.unit[12],
                        height: foundationToken.unit[12],
                        borderRadius: foundationToken.border.radius[12],
                    },
                    text: {
                        gap: foundationToken.unit[4],
                        name: {
                            fontSize: foundationToken.font.fontSize[12],
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[18],
                            color: foundationToken.colors.gray[700],
                        },
                        value: {
                            fontSize: foundationToken.font.fontSize[12],
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[18],
                            color: foundationToken.colors.gray[500],
                        },
                        separator: {
                            color: foundationToken.colors.gray[500],
                            width: foundationToken.unit[1],
                            height: foundationToken.unit[9],
                        },
                    },
                },
            },
            chart: {
                backgroundColor: 'transparent',
                xAxis: {
                    title: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    labels: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    line: {
                        width: 1,
                        color: foundationToken.colors.gray[150],
                    },
                    gridLine: {
                        width: 0,
                        color: foundationToken.colors.gray[150],
                    },
                },
                yAxis: {
                    title: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    labels: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    line: {
                        width: 0,
                        color: foundationToken.colors.gray[150],
                    },
                    gridLine: {
                        width: 1,
                        color: foundationToken.colors.gray[150],
                    },
                },
            },
        },
        lg: {
            border: `1px solid ${foundationToken.colors.gray[150]}`,
            backgroundColor: foundationToken.colors.gray[0],
            borderRadius: foundationToken.border.radius[12],
            boxShadow: foundationToken.shadows.sm,
            header: {
                padding: {
                    top: foundationToken.unit[8],
                    right: foundationToken.unit[16],
                    bottom: foundationToken.unit[8],
                    left: foundationToken.unit[16],
                },
                backgroundColor: foundationToken.colors.gray[25],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            legends: {
                gap: foundationToken.unit[16],
                legendItem: {
                    gap: foundationToken.unit[8],
                    shape: {
                        width: foundationToken.unit[12],
                        height: foundationToken.unit[12],
                        borderRadius: foundationToken.border.radius[12],
                    },
                    text: {
                        gap: foundationToken.unit[4],
                        name: {
                            fontSize: foundationToken.font.fontSize[12],
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[18],
                            color: foundationToken.colors.gray[700],
                        },
                        value: {
                            fontSize: foundationToken.font.fontSize[12],
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[18],
                            color: foundationToken.colors.gray[500],
                        },
                        separator: {
                            color: foundationToken.colors.gray[500],
                            width: foundationToken.unit[1],
                            height: foundationToken.unit[9],
                        },
                    },
                },
            },
            chart: {
                backgroundColor: 'transparent',
                xAxis: {
                    title: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    labels: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    line: {
                        width: 1,
                        color: foundationToken.colors.gray[150],
                    },
                    gridLine: {
                        width: 0,
                        color: foundationToken.colors.gray[150],
                    },
                },
                yAxis: {
                    title: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    labels: {
                        fontSize: foundationToken.font.fontSize[12],
                        color: foundationToken.colors.gray[400],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                    },
                    line: {
                        width: 0,
                        color: foundationToken.colors.gray[150],
                    },
                    gridLine: {
                        width: 1,
                        color: foundationToken.colors.gray[150],
                    },
                },
            },
        },
    }
}
