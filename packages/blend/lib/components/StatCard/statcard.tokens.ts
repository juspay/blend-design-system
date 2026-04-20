//statcard.tokens.ts

import type { CSSObject } from 'styled-components'
import { ChangeType, StatCardVariant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type StatCardState = 'default' | 'hover'

export type StatCardTokenType = {
    height: CSSObject['height']
    maxWidth: CSSObject['maxWidth']
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    backgroundColor: CSSObject['backgroundColor']
    boxShadow: CSSObject['boxShadow']
    padding: {
        x: CSSObject['padding']
        y: CSSObject['padding']
    }
    textContainer: {
        gap: CSSObject['gap']
        header: {
            gap: CSSObject['gap']
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            titleIcon: {
                width: CSSObject['width']
            }

            helpIcon: {
                width: CSSObject['width']
                color: { [key in StatCardState]: CSSObject['color'] }
            }
        }

        stats: {
            gap: CSSObject['gap']
            title: {
                gap: CSSObject['gap']
                value: {
                    [key in StatCardVariant]: {
                        fontSize: CSSObject['fontSize']
                        fontWeight: CSSObject['fontWeight']
                        color: CSSObject['color']
                    }
                }
                change: {
                    margin: CSSObject['margin'] //todo: check if this is needed
                    arrow: {
                        width: CSSObject['width']
                    }
                    text: {
                        fontSize: CSSObject['fontSize']
                        fontWeight: CSSObject['fontWeight']
                        color: {
                            [key in ChangeType]: CSSObject['color']
                        }
                    }
                }
            }
            subtitle: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }
    }

    chart: {
        height: CSSObject['height']
        colors: {
            line: {
                increase: CSSObject['color']
                decrease: CSSObject['color']
            }
            area: {
                increase: CSSObject['color']
                decrease: CSSObject['color']
            }
            gradient: {
                end: CSSObject['color']
                startOpacity: number
                endOpacity: number
            }
        }
        line: {
            strokeWidth: CSSObject['strokeWidth']
            activeDot: {
                width: CSSObject['width']
                fill: CSSObject['fill']
            }
        }
        bar: {
            borderTopRightRadius: CSSObject['borderTopRightRadius']
            borderTopLeftRadius: CSSObject['borderTopLeftRadius']
            borderBottomRightRadius: CSSObject['borderBottomRightRadius']
            borderBottomLeftRadius: CSSObject['borderBottomLeftRadius']
            fill: { [key in StatCardState]: CSSObject['fill'] }
        }
        progressBar: {
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            background: {
                fill: CSSObject['backgroundColor']
                empty: CSSObject['backgroundColor']
                pattern: {
                    color: CSSObject['color']
                    size: CSSObject['backgroundSize']
                }
            }
            label: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }
        tooltip: {
            backgroundColor: CSSObject['backgroundColor']
            padding: {
                x: CSSObject['padding']
                y: CSSObject['padding']
            }
            borderRadius: CSSObject['borderRadius']
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
    }
}

export type ResponsiveStatCardTokens = {
    [key in keyof BreakpointType]: StatCardTokenType
}

export const getStatCardToken = (
    foundationToken: FoundationTokenType
): ResponsiveStatCardTokens => {
    return {
        sm: {
            maxWidth: foundationToken.unit[200],
            height: 'auto',
            border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,

            borderRadius: foundationToken.border.radius[12],
            backgroundColor: foundationToken.colors.gray[0],

            boxShadow: foundationToken.shadows.xs,
            padding: {
                x: foundationToken.unit[12],
                y: foundationToken.unit[12],
            },
            textContainer: {
                gap: foundationToken.unit[0],

                header: {
                    gap: foundationToken.unit[8],
                    titleIcon: {
                        width: foundationToken.unit[20],
                    },
                    title: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[400],
                    },
                    helpIcon: {
                        width: foundationToken.unit[14],
                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                        },
                    },
                },

                stats: {
                    gap: foundationToken.unit[6],
                    title: {
                        gap: foundationToken.unit[8],
                        value: {
                            [StatCardVariant.NUMBER]: {
                                fontSize:
                                    foundationToken.font.size.heading.lg
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                            [StatCardVariant.LINE]: {
                                fontSize:
                                    foundationToken.font.size.heading.sm
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                            [StatCardVariant.BAR]: {
                                fontSize:
                                    foundationToken.font.size.heading.sm
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                            [StatCardVariant.PROGRESS_BAR]: {
                                fontSize:
                                    foundationToken.font.size.heading.sm
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                        },
                        change: {
                            margin: `${String(foundationToken.unit[0])} ${String(foundationToken.unit[0])} ${String(foundationToken.unit[0])} ${String(foundationToken.unit[8])}`,
                            arrow: {
                                width: foundationToken.unit[14],
                            },
                            text: {
                                color: {
                                    increase: foundationToken.colors.green[600],
                                    decrease: foundationToken.colors.red[600],
                                },
                                fontSize:
                                    foundationToken.font.size.body.xs.fontSize,
                                fontWeight: foundationToken.font.weight[600],
                            },
                        },
                    },

                    subtitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[400],
                    },
                },
            },

            // Chart section (all chart types)
            chart: {
                height: foundationToken.unit[50],
                colors: {
                    line: {
                        increase: foundationToken.colors.green[500],
                        decrease: foundationToken.colors.red[500],
                    },
                    area: {
                        increase: foundationToken.colors.green[500],
                        decrease: foundationToken.colors.red[500],
                    },
                    gradient: {
                        end: foundationToken.colors.gray[0],
                        startOpacity: 0.2,
                        endOpacity: 0.5,
                    },
                },
                line: {
                    strokeWidth: foundationToken.unit[1.5],
                    activeDot: {
                        width: foundationToken.border.radius[4],
                        fill: foundationToken.colors.gray[0],
                    },
                },
                bar: {
                    borderTopRightRadius: foundationToken.border.radius[2],
                    borderTopLeftRadius: foundationToken.border.radius[2],
                    borderBottomRightRadius: foundationToken.border.radius[0],
                    borderBottomLeftRadius: foundationToken.border.radius[0],
                    fill: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[100],
                    },
                },
                progressBar: {
                    height: foundationToken.unit[20],
                    borderRadius: foundationToken.border.radius[4],
                    gap: foundationToken.unit[16],
                    background: {
                        fill: foundationToken.colors.primary[500],
                        empty: foundationToken.colors.gray[0],
                        pattern: {
                            color: foundationToken.colors.gray[200],
                            size: `${foundationToken.unit[10]} ${foundationToken.unit[10]}`,
                        },
                    },
                    label: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[700],
                    },
                },
                tooltip: {
                    backgroundColor: foundationToken.colors.gray[900],
                    padding: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[4],
                    },
                    borderRadius: foundationToken.border.radius[4],

                    color: foundationToken.colors.gray[0],
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
            },
        },
        lg: {
            maxWidth: foundationToken.unit[350],
            height: 'auto',
            border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,

            borderRadius: foundationToken.border.radius[12],
            backgroundColor: foundationToken.colors.gray[0],

            boxShadow: foundationToken.shadows.xs,
            padding: {
                x: foundationToken.unit[16],
                y: foundationToken.unit[16],
            },

            textContainer: {
                gap: foundationToken.unit[6],

                header: {
                    gap: foundationToken.unit[8],
                    titleIcon: {
                        width: foundationToken.unit[20],
                    },
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[400],
                    },
                    helpIcon: {
                        width: foundationToken.unit[14],
                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                        },
                    },
                },

                stats: {
                    gap: foundationToken.unit[6],
                    title: {
                        gap: foundationToken.unit[8],
                        value: {
                            [StatCardVariant.NUMBER]: {
                                fontSize:
                                    foundationToken.font.size.heading.xl
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                            [StatCardVariant.LINE]: {
                                fontSize:
                                    foundationToken.font.size.heading.lg
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                            [StatCardVariant.BAR]: {
                                fontSize:
                                    foundationToken.font.size.heading.lg
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                            [StatCardVariant.PROGRESS_BAR]: {
                                fontSize:
                                    foundationToken.font.size.heading.lg
                                        .fontSize,
                                fontWeight: foundationToken.font.weight[600],
                                color: foundationToken.colors.gray[800],
                            },
                        },
                        change: {
                            margin: `${String(foundationToken.unit[0])} ${String(foundationToken.unit[0])} ${String(foundationToken.unit[0])} ${String(foundationToken.unit[8])}`,
                            arrow: {
                                width: foundationToken.unit[14],
                            },
                            text: {
                                color: {
                                    increase: foundationToken.colors.green[600],
                                    decrease: foundationToken.colors.red[600],
                                },
                                fontSize:
                                    foundationToken.font.size.body.sm.fontSize,
                                fontWeight: foundationToken.font.weight[600],
                            },
                        },
                    },
                    subtitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[400],
                    },
                },
            },

            // Chart section (all chart types)
            chart: {
                height: foundationToken.unit[50],
                colors: {
                    line: {
                        increase: foundationToken.colors.green[500],
                        decrease: foundationToken.colors.red[500],
                    },
                    area: {
                        increase: foundationToken.colors.green[500],
                        decrease: foundationToken.colors.red[500],
                    },
                    gradient: {
                        end: foundationToken.colors.gray[0],
                        startOpacity: 0.2,
                        endOpacity: 0.5,
                    },
                },
                line: {
                    strokeWidth: foundationToken.unit[1.5],
                    activeDot: {
                        width: foundationToken.border.radius[4],
                        fill: foundationToken.colors.gray[0],
                    },
                },
                bar: {
                    borderTopRightRadius: foundationToken.border.radius[2],
                    borderTopLeftRadius: foundationToken.border.radius[2],
                    borderBottomRightRadius: foundationToken.border.radius[2],
                    borderBottomLeftRadius: foundationToken.border.radius[2],

                    fill: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[100],
                    },
                },
                progressBar: {
                    height: foundationToken.unit[20],
                    borderRadius: foundationToken.border.radius[4],
                    gap: foundationToken.unit[16],
                    background: {
                        fill: foundationToken.colors.primary[500],
                        empty: foundationToken.colors.gray[0],
                        pattern: {
                            color: foundationToken.colors.gray[200],
                            size: `${foundationToken.unit[10]} ${foundationToken.unit[10]}`,
                        },
                    },
                    label: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[700],
                    },
                },
                tooltip: {
                    backgroundColor: foundationToken.colors.gray[900],
                    padding: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[4],
                    },
                    borderRadius: foundationToken.border.radius[4],

                    color: foundationToken.colors.gray[0],
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
            },
        },
    }
}
