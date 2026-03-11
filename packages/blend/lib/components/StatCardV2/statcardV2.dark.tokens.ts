import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveStatCardV2Tokens } from './StatCardV2.tokens'
import { StatCardV2Variant } from './statcardV2.types'

export const getStatCardV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveStatCardV2Tokens => {
    return {
        sm: {
            height: 'auto',
            width: 'auto',
            maxWidth: '340px',
            minWidth: '200px',
            paddingTop: foundationToken.unit[16],
            paddingBottom: foundationToken.unit[16],
            paddingLeft: foundationToken.unit[16],
            paddingRight: foundationToken.unit[16],
            border: `1px solid ${foundationToken.colors.gray[800]}`,
            borderRadius: foundationToken.border.radius[12],
            backgroundColor: foundationToken.colors.gray[900],
            boxShadow: foundationToken.shadows.xs,
            topContainer: {
                gap: foundationToken.unit[8],
                dataContainer: {
                    gap: foundationToken.unit[6],
                    titleContainer: {
                        gap: foundationToken.unit[8],
                        title: {
                            fontSize: foundationToken.font.fontSize[14],
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[20],
                            color: foundationToken.colors.gray[100],
                        },
                        helpIcon: {
                            width: foundationToken.unit[14],
                            height: foundationToken.unit[14],
                            color: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[300],
                            },
                        },
                    },
                    statsContainer: {
                        gap: foundationToken.unit[6],
                        value: {
                            [StatCardV2Variant.CHART]: {
                                fontSize: foundationToken.font.fontSize[24],
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[0],
                                lineHeight: foundationToken.font.lineHeight[32],
                            },
                            [StatCardV2Variant.PROGRESS_BAR]: {
                                fontSize: foundationToken.font.fontSize[24],
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[0],
                                lineHeight: foundationToken.font.lineHeight[32],
                            },
                            [StatCardV2Variant.NUMBER]: {
                                fontSize: foundationToken.font.fontSize[32],
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[0],
                                lineHeight: foundationToken.font.lineHeight[38],
                            },
                        },

                        changeContainer: {
                            gap: foundationToken.unit[6],
                            change: {
                                fontSize: foundationToken.font.fontSize[12],
                                fontWeight: foundationToken.font.weight[600],
                                color: {
                                    increase: foundationToken.colors.green[500],
                                    decrease: foundationToken.colors.red[500],
                                },
                                lineHeight: foundationToken.font.lineHeight[18],
                            },
                            arrow: {
                                width: foundationToken.unit[12],
                                height: foundationToken.unit[12],
                                color: {
                                    increase: foundationToken.colors.green[500],
                                    decrease: foundationToken.colors.red[500],
                                },
                            },
                        },
                    },
                    subtitle: {
                        fontSize: foundationToken.font.fontSize[12],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                        color: foundationToken.colors.gray[300],
                    },
                },
            },
        },
        lg: {
            height: 'auto',
            width: 'auto',
            maxWidth: '340px',
            minWidth: '200px',
            paddingTop: foundationToken.unit[16],
            paddingBottom: foundationToken.unit[16],
            paddingLeft: foundationToken.unit[16],
            paddingRight: foundationToken.unit[16],
            border: `1px solid ${foundationToken.colors.gray[800]}`,
            borderRadius: foundationToken.border.radius[12],
            backgroundColor: foundationToken.colors.gray[900],
            boxShadow: foundationToken.shadows.xs,
            topContainer: {
                gap: foundationToken.unit[8],
                dataContainer: {
                    gap: foundationToken.unit[6],
                    titleContainer: {
                        gap: foundationToken.unit[8],
                        title: {
                            fontSize: foundationToken.font.fontSize[14],
                            fontWeight: foundationToken.font.weight[500],
                            lineHeight: foundationToken.font.lineHeight[20],
                            color: foundationToken.colors.gray[100],
                        },
                        helpIcon: {
                            width: foundationToken.unit[14],
                            height: foundationToken.unit[14],
                            color: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[300],
                            },
                        },
                    },
                    statsContainer: {
                        gap: foundationToken.unit[6],
                        value: {
                            [StatCardV2Variant.CHART]: {
                                fontSize: foundationToken.font.fontSize[24],
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[0],
                                lineHeight: foundationToken.font.lineHeight[32],
                            },
                            [StatCardV2Variant.PROGRESS_BAR]: {
                                fontSize: foundationToken.font.fontSize[24],
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[0],
                                lineHeight: foundationToken.font.lineHeight[32],
                            },
                            [StatCardV2Variant.NUMBER]: {
                                fontSize: foundationToken.font.fontSize[32],
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[0],
                                lineHeight: foundationToken.font.lineHeight[38],
                            },
                        },

                        changeContainer: {
                            gap: foundationToken.unit[6],
                            change: {
                                fontSize: foundationToken.font.fontSize[12],
                                fontWeight: foundationToken.font.weight[600],
                                color: {
                                    increase: foundationToken.colors.green[500],
                                    decrease: foundationToken.colors.red[500],
                                },
                                lineHeight: foundationToken.font.lineHeight[18],
                            },
                            arrow: {
                                width: foundationToken.unit[12],
                                height: foundationToken.unit[12],
                                color: {
                                    increase: foundationToken.colors.green[500],
                                    decrease: foundationToken.colors.red[500],
                                },
                            },
                        },
                    },
                    subtitle: {
                        fontSize: foundationToken.font.fontSize[12],
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[18],
                        color: foundationToken.colors.gray[300],
                    },
                },
            },
        },
    }
}
