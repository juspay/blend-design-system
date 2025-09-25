import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'
import { ProgressBarSize, ProgressBarVariant, ProgressBarType } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type ProgressBarState = 'default'

/**
 * ProgressBar Tokens following the pattern: [target].CSSProp.[size].[variant].[subType].[state]
 *
 * Structure:
 * - target: container | fill | empty | circular | label (defines what element the token applies to)
 * - CSSProp: height | backgroundColor | borderRadius | width | stroke | strokeWidth | fontSize | fontWeight | color | transition
 * - size: sm | md | lg (for size-dependent properties)
 * - variant: solid | segmented | circular (progress bar variant)
 * - subType: default | fill | empty | background (progress bar sub-type)
 * - state: default (interaction state - can be extended for hover, active, disabled)
 *
 * Size-independent properties: backgroundColor, borderRadius, stroke, fontSize, fontWeight, color
 * Size-dependent properties: height, width, strokeWidth
 */
export type ProgressBarTokensType = {
    gap: CSSObject['gap']
    // Pattern: container.height.[size].[variant].[subType].[state]
    container: {
        height: {
            [key in ProgressBarSize]: {
                [key in ProgressBarVariant]: {
                    default: {
                        default: CSSObject['height']
                    }
                }
            }
        }
        borderRadius: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['borderRadius']
                }
            }
        }
        overflow: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['overflow']
                }
            }
        }
    }
    // Pattern: fill.backgroundColor.[variant].[subType].[state]
    fill: {
        backgroundColor: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['backgroundColor']
                }
            }
        }
        borderRadius: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['borderRadius']
                }
            }
        }
        transition: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['transition']
                }
            }
        }
    }
    // Pattern: empty.backgroundColor.[variant].[subType].[state]
    empty: {
        backgroundColor: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['backgroundColor']
                }
            }
        }
        backgroundImage: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['backgroundImage']
                }
            }
        }
        backgroundSize: {
            [key in ProgressBarVariant]: {
                default: {
                    default: CSSObject['backgroundSize']
                }
            }
        }
    }
    // Pattern: circular.width.[size].[variant].[subType].[state]
    circular: {
        width: {
            [key in ProgressBarSize]: {
                [key in ProgressBarType]: {
                    default: {
                        default: CSSObject['width']
                    }
                }
            }
        }
        height: {
            [key in ProgressBarSize]: {
                [key in ProgressBarType]: {
                    default: {
                        default: CSSObject['height']
                    }
                }
            }
        }
        strokeWidth: {
            [key in ProgressBarSize]: {
                [key in ProgressBarType]: {
                    default: {
                        default: number
                    }
                }
            }
        }
        stroke: {
            [key in ProgressBarType]: {
                fill: {
                    default: CSSObject['stroke']
                }
                background: {
                    default: CSSObject['stroke']
                }
            }
        }
        strokeLinecap: {
            [key in ProgressBarType]: {
                default: {
                    default: CSSObject['strokeLinecap']
                }
            }
        }
        strokeDasharray: {
            [key in ProgressBarType]: {
                default: {
                    default: string
                }
            }
        }
        transition: {
            [key in ProgressBarType]: {
                default: {
                    default: CSSObject['transition']
                }
            }
        }
    }
    // Pattern: label.fontSize.[size] (size-dependent)
    label: {
        fontSize: {
            [key in ProgressBarSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in ProgressBarSize]: CSSObject['fontWeight']
        }
        color: {
            [key in ProgressBarSize]: CSSObject['color']
        }
    }
}

export type ResponsiveProgressBarTokens = {
    [key in keyof BreakpointType]: ProgressBarTokensType
}

// Legacy type for backward compatibility
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

// New tokens following the specified pattern
export const getProgressBarTokens = (
    foundationToken: FoundationTokenType
): ResponsiveProgressBarTokens => {
    return {
        sm: {
            gap: FOUNDATION_THEME.unit[8],
            container: {
                height: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarVariant.SOLID]: {
                            default: {
                                default: foundationToken.unit[12],
                            },
                        },
                        [ProgressBarVariant.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[12],
                            },
                        },
                        [ProgressBarVariant.CIRCULAR]: {
                            default: {
                                default: foundationToken.unit[12],
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarVariant.SOLID]: {
                            default: {
                                default: foundationToken.unit[20],
                            },
                        },
                        [ProgressBarVariant.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[20],
                            },
                        },
                        [ProgressBarVariant.CIRCULAR]: {
                            default: {
                                default: foundationToken.unit[20],
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarVariant.SOLID]: {
                            default: {
                                default: foundationToken.unit[24],
                            },
                        },
                        [ProgressBarVariant.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[24],
                            },
                        },
                        [ProgressBarVariant.CIRCULAR]: {
                            default: {
                                default: foundationToken.unit[24],
                            },
                        },
                    },
                },
                borderRadius: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: '0px',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                },
                overflow: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'hidden',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: 'hidden',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'visible',
                        },
                    },
                },
            },
            fill: {
                backgroundColor: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: foundationToken.colors.primary[500],
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: foundationToken.colors.primary[500],
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: foundationToken.colors.primary[500],
                        },
                    },
                },
                borderRadius: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: String(foundationToken.border.radius[2]),
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                },
                transition: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'width 0.3s ease-in-out',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: 'width 0.3s ease-in-out',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'stroke-dashoffset 0.3s ease-in-out',
                        },
                    },
                },
            },
            empty: {
                backgroundColor: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: 'transparent',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                },
                backgroundImage: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'none',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: `repeating-linear-gradient(
                                to right,
                                ${String(foundationToken.colors.gray[100])},
                                ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                                transparent ${foundationToken.unit[2]},
                                transparent ${foundationToken.unit[8]}
                            )`,
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'none',
                        },
                    },
                },
                backgroundSize: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'auto',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: `${foundationToken.unit[10]} 100%`,
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'auto',
                        },
                    },
                },
            },
            circular: {
                width: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                    },
                },
                height: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                    },
                },
                strokeWidth: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: 3,
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: 3,
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: 4,
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: 4,
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: 6,
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: 6,
                            },
                        },
                    },
                },
                stroke: {
                    [ProgressBarType.SOLID]: {
                        fill: {
                            default: foundationToken.colors.primary[500],
                        },
                        background: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        fill: {
                            default: foundationToken.colors.primary[500],
                        },
                        background: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                },
                strokeLinecap: {
                    [ProgressBarType.SOLID]: {
                        default: {
                            default: 'round',
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        default: {
                            default: 'butt',
                        },
                    },
                },
                strokeDasharray: {
                    [ProgressBarType.SOLID]: {
                        default: {
                            default: 'none',
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        default: {
                            default: '8 4',
                        },
                    },
                },
                transition: {
                    [ProgressBarType.SOLID]: {
                        default: {
                            default: 'stroke-dashoffset 0.3s ease-in-out',
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        default: {
                            default: 'stroke-dashoffset 0.3s ease-in-out',
                        },
                    },
                },
            },
            label: {
                fontSize: {
                    [ProgressBarSize.SMALL]:
                        foundationToken.font.size.body.md.fontSize,
                    [ProgressBarSize.MEDIUM]:
                        foundationToken.font.size.body.md.fontSize,
                    [ProgressBarSize.LARGE]:
                        foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    [ProgressBarSize.SMALL]: foundationToken.font.weight[500],
                    [ProgressBarSize.MEDIUM]: foundationToken.font.weight[500],
                    [ProgressBarSize.LARGE]: foundationToken.font.weight[500],
                },
                color: {
                    [ProgressBarSize.SMALL]: foundationToken.colors.gray[600],
                    [ProgressBarSize.MEDIUM]: foundationToken.colors.gray[600],
                    [ProgressBarSize.LARGE]: foundationToken.colors.gray[600],
                },
            },
        },
        lg: {
            gap: FOUNDATION_THEME.unit[8],
            container: {
                height: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarVariant.SOLID]: {
                            default: {
                                default: foundationToken.unit[12],
                            },
                        },
                        [ProgressBarVariant.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[12],
                            },
                        },
                        [ProgressBarVariant.CIRCULAR]: {
                            default: {
                                default: foundationToken.unit[12],
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarVariant.SOLID]: {
                            default: {
                                default: foundationToken.unit[20],
                            },
                        },
                        [ProgressBarVariant.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[20],
                            },
                        },
                        [ProgressBarVariant.CIRCULAR]: {
                            default: {
                                default: foundationToken.unit[20],
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarVariant.SOLID]: {
                            default: {
                                default: foundationToken.unit[24],
                            },
                        },
                        [ProgressBarVariant.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[24],
                            },
                        },
                        [ProgressBarVariant.CIRCULAR]: {
                            default: {
                                default: foundationToken.unit[24],
                            },
                        },
                    },
                },
                borderRadius: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: '0px',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                },
                overflow: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'hidden',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: 'hidden',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'visible',
                        },
                    },
                },
            },
            fill: {
                backgroundColor: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: foundationToken.colors.primary[500],
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: foundationToken.colors.primary[500],
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: foundationToken.colors.primary[500],
                        },
                    },
                },
                borderRadius: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: String(foundationToken.border.radius[2]),
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: String(foundationToken.border.radius[8]),
                        },
                    },
                },
                transition: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'width 0.3s ease-in-out',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: 'width 0.3s ease-in-out',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'stroke-dashoffset 0.3s ease-in-out',
                        },
                    },
                },
            },
            empty: {
                backgroundColor: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: 'transparent',
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                },
                backgroundImage: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'none',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: `repeating-linear-gradient(
                                to right,
                                ${String(foundationToken.colors.gray[100])},
                                ${String(foundationToken.colors.gray[100])} ${foundationToken.unit[2]},
                                transparent ${foundationToken.unit[2]},
                                transparent ${foundationToken.unit[8]}
                            )`,
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'none',
                        },
                    },
                },
                backgroundSize: {
                    [ProgressBarVariant.SOLID]: {
                        default: {
                            default: 'auto',
                        },
                    },
                    [ProgressBarVariant.SEGMENTED]: {
                        default: {
                            default: `${foundationToken.unit[10]} 100%`,
                        },
                    },
                    [ProgressBarVariant.CIRCULAR]: {
                        default: {
                            default: 'auto',
                        },
                    },
                },
            },
            circular: {
                width: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                    },
                },
                height: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[40],
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[60],
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: foundationToken.unit[80],
                            },
                        },
                    },
                },
                strokeWidth: {
                    [ProgressBarSize.SMALL]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: 3,
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: 3,
                            },
                        },
                    },
                    [ProgressBarSize.MEDIUM]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: 4,
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: 4,
                            },
                        },
                    },
                    [ProgressBarSize.LARGE]: {
                        [ProgressBarType.SOLID]: {
                            default: {
                                default: 6,
                            },
                        },
                        [ProgressBarType.SEGMENTED]: {
                            default: {
                                default: 6,
                            },
                        },
                    },
                },
                stroke: {
                    [ProgressBarType.SOLID]: {
                        fill: {
                            default: foundationToken.colors.primary[500],
                        },
                        background: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        fill: {
                            default: foundationToken.colors.primary[500],
                        },
                        background: {
                            default: foundationToken.colors.gray[150],
                        },
                    },
                },
                strokeLinecap: {
                    [ProgressBarType.SOLID]: {
                        default: {
                            default: 'round',
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        default: {
                            default: 'butt',
                        },
                    },
                },
                strokeDasharray: {
                    [ProgressBarType.SOLID]: {
                        default: {
                            default: 'none',
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        default: {
                            default: '8 4',
                        },
                    },
                },
                transition: {
                    [ProgressBarType.SOLID]: {
                        default: {
                            default: 'stroke-dashoffset 0.3s ease-in-out',
                        },
                    },
                    [ProgressBarType.SEGMENTED]: {
                        default: {
                            default: 'stroke-dashoffset 0.3s ease-in-out',
                        },
                    },
                },
            },
            label: {
                fontSize: {
                    [ProgressBarSize.SMALL]:
                        foundationToken.font.size.body.md.fontSize,
                    [ProgressBarSize.MEDIUM]:
                        foundationToken.font.size.body.md.fontSize,
                    [ProgressBarSize.LARGE]:
                        foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    [ProgressBarSize.SMALL]: foundationToken.font.weight[500],
                    [ProgressBarSize.MEDIUM]: foundationToken.font.weight[500],
                    [ProgressBarSize.LARGE]: foundationToken.font.weight[500],
                },
                color: {
                    [ProgressBarSize.SMALL]: foundationToken.colors.gray[600],
                    [ProgressBarSize.MEDIUM]: foundationToken.colors.gray[600],
                    [ProgressBarSize.LARGE]: foundationToken.colors.gray[600],
                },
            },
        },
    }
}
