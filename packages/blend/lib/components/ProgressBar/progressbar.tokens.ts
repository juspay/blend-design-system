import { BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'
import { ProgressBarSize, ProgressBarVariant, ProgressBarType } from './types'
import type { CSSObject } from 'styled-components'

/**
 * ProgressBar Tokens following the pattern: [target].CSSProp.[size].[variant].[type]
 *
 * Structure:
 * - target: container | linear | circular | label (defines what element the token applies to)
 * - CSSProp: overflow | borderRadius | height | backgroundColor | stroke | etc.
 * - size: small | medium | large (only for size-dependent properties)
 * - variant: solid | segmented (for linear progress bars)
 * - type: solid | segmented (for circular progress bars)
 *
 * Size-independent properties: overflow, backgroundColor, backgroundImage, stroke, color
 * Size-dependent properties: height, size, strokeWidth
 */
export type ProgressBarTokenType = {
    // Pattern: linear.height.[size]
    // Pattern: linear.fill.backgroundColor.[variant]
    // Pattern: linear.fill.borderRadius.[variant]
    // Pattern: linear.empty.backgroundColor.[variant]
    linear: {
        height: {
            [key in ProgressBarSize]: CSSObject['height']
        }
        fill: {
            backgroundColor: {
                [key in Exclude<
                    ProgressBarVariant,
                    'circular'
                >]: CSSObject['backgroundColor']
            }
            borderRadius: {
                [key in Exclude<
                    ProgressBarVariant,
                    'circular'
                >]: CSSObject['borderRadius']
            }
        }
        empty: {
            backgroundColor: {
                [key in Exclude<
                    ProgressBarVariant,
                    'circular'
                >]: CSSObject['backgroundColor']
            }
            backgroundImage: {
                segmented: CSSObject['backgroundImage']
            }
            backgroundSize: {
                segmented: CSSObject['backgroundSize']
            }
        }
        borderRadius: {
            [key in Exclude<
                ProgressBarVariant,
                'circular'
            >]: CSSObject['borderRadius']
        }
    }
    // Pattern: circular.size.[size]
    // Pattern: circular.strokeWidth.[size]
    // Pattern: circular.stroke.[type]
    // Pattern: circular.background.[type]
    circular: {
        size: {
            [key in ProgressBarSize]: CSSObject['width']
        }
        strokeWidth: {
            [key in ProgressBarSize]: number
        }
        stroke: {
            [key in ProgressBarType]: CSSObject['stroke']
        }
        background: {
            [key in ProgressBarType]: CSSObject['stroke']
        }
        dashArray: {
            [key in ProgressBarType]: string
        }
        dashOffset: {
            [key in ProgressBarType]: string
        }
    }
    // Pattern: label.fontSize | label.fontWeight | label.color
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
            // Pattern: linear.height.[size]
            // Pattern: linear.fill.backgroundColor.[variant]
            // Pattern: linear.fill.borderRadius.[variant]
            // Pattern: linear.empty.backgroundColor.[variant]
            linear: {
                height: {
                    [ProgressBarSize.SMALL]: foundationToken.unit[12],
                    [ProgressBarSize.MEDIUM]: foundationToken.unit[20],
                    [ProgressBarSize.LARGE]: foundationToken.unit[24],
                },
                fill: {
                    backgroundColor: {
                        [ProgressBarVariant.SOLID]: String(
                            foundationToken.colors.primary[500]
                        ),
                        [ProgressBarVariant.SEGMENTED]: String(
                            foundationToken.colors.primary[500]
                        ),
                    },
                    borderRadius: {
                        [ProgressBarVariant.SOLID]: String(
                            foundationToken.border.radius[8]
                        ),
                        [ProgressBarVariant.SEGMENTED]: String(
                            foundationToken.border.radius[2]
                        ),
                    },
                },
                empty: {
                    backgroundColor: {
                        [ProgressBarVariant.SOLID]: String(
                            foundationToken.colors.gray[150]
                        ),
                        [ProgressBarVariant.SEGMENTED]: 'transparent',
                    },
                    backgroundImage: {
                        segmented: `repeating-linear-gradient(
                    to right,
                    ${String(foundationToken.colors.gray[100])},
                    ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[8]}
                )`,
                    },
                    backgroundSize: {
                        segmented: `${foundationToken.unit[10]} 100%`,
                    },
                },
                borderRadius: {
                    [ProgressBarVariant.SOLID]: String(
                        foundationToken.border.radius[8]
                    ),
                    [ProgressBarVariant.SEGMENTED]: '0px',
                },
            },
            // Pattern: circular.size.[size]
            // Pattern: circular.strokeWidth.[size]
            // Pattern: circular.stroke.[type]
            // Pattern: circular.background.[type]
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
                stroke: {
                    [ProgressBarType.SOLID]: String(
                        foundationToken.colors.primary[500]
                    ),
                    [ProgressBarType.SEGMENTED]: String(
                        foundationToken.colors.primary[500]
                    ),
                },
                background: {
                    [ProgressBarType.SOLID]: String(
                        foundationToken.colors.gray[150]
                    ),
                    [ProgressBarType.SEGMENTED]: String(
                        foundationToken.colors.gray[150]
                    ),
                },
                dashArray: {
                    [ProgressBarType.SOLID]: '',
                    [ProgressBarType.SEGMENTED]: '4 2',
                },
                dashOffset: {
                    [ProgressBarType.SOLID]: '0',
                    [ProgressBarType.SEGMENTED]: '0',
                },
            },
            // Pattern: label.fontSize | label.fontWeight | label.color
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: String(foundationToken.colors.gray[600]),
            },
            transition: 'width 0.3s ease-in-out',
        },
        lg: {
            // Pattern: linear.height.[size]
            // Pattern: linear.fill.backgroundColor.[variant]
            // Pattern: linear.fill.borderRadius.[variant]
            // Pattern: linear.empty.backgroundColor.[variant]
            linear: {
                height: {
                    [ProgressBarSize.SMALL]: foundationToken.unit[12],
                    [ProgressBarSize.MEDIUM]: foundationToken.unit[20],
                    [ProgressBarSize.LARGE]: foundationToken.unit[24],
                },
                fill: {
                    backgroundColor: {
                        [ProgressBarVariant.SOLID]: String(
                            foundationToken.colors.primary[500]
                        ),
                        [ProgressBarVariant.SEGMENTED]: String(
                            foundationToken.colors.primary[500]
                        ),
                    },
                    borderRadius: {
                        [ProgressBarVariant.SOLID]: String(
                            foundationToken.border.radius[8]
                        ),
                        [ProgressBarVariant.SEGMENTED]: String(
                            foundationToken.border.radius[2]
                        ),
                    },
                },
                empty: {
                    backgroundColor: {
                        [ProgressBarVariant.SOLID]: String(
                            foundationToken.colors.gray[150]
                        ),
                        [ProgressBarVariant.SEGMENTED]: 'transparent',
                    },
                    backgroundImage: {
                        segmented: `repeating-linear-gradient(
                    to right,
                    ${String(foundationToken.colors.gray[100])},
                    ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[2]},
                    transparent ${foundationToken.unit[8]}
                )`,
                    },
                    backgroundSize: {
                        segmented: `${foundationToken.unit[10]} 100%`,
                    },
                },
                borderRadius: {
                    [ProgressBarVariant.SOLID]: String(
                        foundationToken.border.radius[8]
                    ),
                    [ProgressBarVariant.SEGMENTED]: '0px',
                },
            },
            // Pattern: circular.size.[size]
            // Pattern: circular.strokeWidth.[size]
            // Pattern: circular.stroke.[type]
            // Pattern: circular.background.[type]
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
                stroke: {
                    [ProgressBarType.SOLID]: String(
                        foundationToken.colors.primary[500]
                    ),
                    [ProgressBarType.SEGMENTED]: String(
                        foundationToken.colors.primary[500]
                    ),
                },
                background: {
                    [ProgressBarType.SOLID]: String(
                        foundationToken.colors.gray[150]
                    ),
                    [ProgressBarType.SEGMENTED]: String(
                        foundationToken.colors.gray[150]
                    ),
                },
                dashArray: {
                    [ProgressBarType.SOLID]: '',
                    [ProgressBarType.SEGMENTED]: '4 2',
                },
                dashOffset: {
                    [ProgressBarType.SOLID]: '0',
                    [ProgressBarType.SEGMENTED]: '0',
                },
            },
            // Pattern: label.fontSize | label.fontWeight | label.color
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: String(foundationToken.colors.gray[600]),
            },
            transition: 'width 0.3s ease-in-out',
        },
    }
}
