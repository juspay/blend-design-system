import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { ProgressBarSize } from './types'
import type { CSSObject } from 'styled-components'

export type ProgressBarTokenType = {
    container: {
        borderRadius: string
        overflow: string
    }
    height: {
        [ProgressBarSize.SMALL]: CSSObject['height']
        [ProgressBarSize.MEDIUM]: CSSObject['height']
        [ProgressBarSize.LARGE]: CSSObject['height']
    }
    fill: {
        solid: {
            backgroundColor: CSSObject['backgroundColor']
            borderRadius: CSSObject['borderRadius']
        }
        segmented: {
            backgroundColor: CSSObject['backgroundColor']
            borderRadius: CSSObject['borderRadius']
        }
    }
    empty: {
        solid: {
            backgroundColor: CSSObject['backgroundColor']
        }
        segmented: {
            backgroundColor: CSSObject['backgroundColor']
            backgroundImage: CSSObject['backgroundImage']
            backgroundSize: CSSObject['backgroundSize']
        }
    }
    circular: {
        size: {
            [ProgressBarSize.SMALL]: CSSObject['width']
            [ProgressBarSize.MEDIUM]: CSSObject['width']
            [ProgressBarSize.LARGE]: CSSObject['width']
        }
        strokeWidth: {
            [ProgressBarSize.SMALL]: number
            [ProgressBarSize.MEDIUM]: number
            [ProgressBarSize.LARGE]: number
        }
        solid: {
            stroke: CSSObject['stroke']
            background: CSSObject['stroke']
        }
        segmented: {
            stroke: CSSObject['stroke']
            background: CSSObject['stroke']
            dashArray: string
            dashOffset: string
        }
    }
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    transition: string
}

export type ResponsiveProgressBarTokens = {
    [key in keyof BreakpointType]: ProgressBarTokenType
}

export const getProgressBarTokens = (
    foundationToken: FoundationTokenType
): ResponsiveProgressBarTokens => {
    return {
        sm: {
            container: {
                borderRadius: String(foundationToken.border.radius[8]),
                overflow: 'hidden',
            },
            height: {
                [ProgressBarSize.SMALL]: foundationToken.unit[12],
                [ProgressBarSize.MEDIUM]: foundationToken.unit[20],
                [ProgressBarSize.LARGE]: foundationToken.unit[24],
            },
            fill: {
                solid: {
                    backgroundColor: String(
                        foundationToken.colors.primary[500]
                    ),
                    borderRadius: String(foundationToken.border.radius[8]),
                },
                segmented: {
                    backgroundColor: String(
                        foundationToken.colors.primary[500]
                    ),
                    borderRadius: String(foundationToken.border.radius[2]),
                },
            },
            empty: {
                solid: {
                    backgroundColor: String(foundationToken.colors.gray[150]),
                },
                segmented: {
                    backgroundColor: 'transparent',
                    backgroundImage: `repeating-linear-gradient(
                    to right,
                    ${String(foundationToken.colors.gray[100])},
                    ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[8]}
                )`,
                    backgroundSize: `${foundationToken.unit[10]} 100%`,
                },
            },
            circular: {
                size: {
                    [ProgressBarSize.SMALL]: foundationToken.unit[40],
                    [ProgressBarSize.MEDIUM]: foundationToken.unit[60],
                    [ProgressBarSize.LARGE]: foundationToken.unit[80],
                },
                strokeWidth: {
                    [ProgressBarSize.SMALL]: 3,
                    [ProgressBarSize.MEDIUM]: 4,
                    [ProgressBarSize.LARGE]: 6,
                },
                solid: {
                    stroke: String(foundationToken.colors.primary[500]),
                    background: String(foundationToken.colors.gray[150]),
                },
                segmented: {
                    stroke: String(foundationToken.colors.primary[500]),
                    background: String(foundationToken.colors.gray[150]),
                    dashArray: '4 2',
                    dashOffset: '0',
                },
            },
            label: {
                fontSize: String(foundationToken.font.size.body.md.fontSize),
                fontWeight: foundationToken.font.weight[500],
                color: String(foundationToken.colors.gray[600]),
            },
            transition: 'width 0.3s ease-in-out',
        },
        lg: {
            container: {
                borderRadius: String(foundationToken.border.radius[8]),
                overflow: 'hidden',
            },
            height: {
                [ProgressBarSize.SMALL]: foundationToken.unit[12],
                [ProgressBarSize.MEDIUM]: foundationToken.unit[20],
                [ProgressBarSize.LARGE]: foundationToken.unit[24],
            },
            fill: {
                solid: {
                    backgroundColor: String(
                        foundationToken.colors.primary[500]
                    ),
                    borderRadius: String(foundationToken.border.radius[8]),
                },
                segmented: {
                    backgroundColor: String(
                        foundationToken.colors.primary[500]
                    ),
                    borderRadius: String(foundationToken.border.radius[2]),
                },
            },
            empty: {
                solid: {
                    backgroundColor: String(foundationToken.colors.gray[150]),
                },
                segmented: {
                    backgroundColor: 'transparent',
                    backgroundImage: `repeating-linear-gradient(
                    to right,
                    ${String(foundationToken.colors.gray[100])},
                    ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[8]}
                )`,
                    backgroundSize: `${foundationToken.unit[10]} 100%`,
                },
            },
            circular: {
                size: {
                    [ProgressBarSize.SMALL]: foundationToken.unit[40],
                    [ProgressBarSize.MEDIUM]: foundationToken.unit[60],
                    [ProgressBarSize.LARGE]: foundationToken.unit[80],
                },
                strokeWidth: {
                    [ProgressBarSize.SMALL]: 3,
                    [ProgressBarSize.MEDIUM]: 4,
                    [ProgressBarSize.LARGE]: 6,
                },
                solid: {
                    stroke: String(foundationToken.colors.primary[500]),
                    background: String(foundationToken.colors.gray[150]),
                },
                segmented: {
                    stroke: String(foundationToken.colors.primary[500]),
                    background: String(foundationToken.colors.gray[150]),
                    dashArray: '4 2',
                    dashOffset: '0',
                },
            },
            label: {
                fontSize: String(foundationToken.font.size.body.md.fontSize),
                fontWeight: foundationToken.font.weight[500],
                color: String(foundationToken.colors.gray[600]),
            },
            transition: 'width 0.3s ease-in-out',
        },
    }
}
