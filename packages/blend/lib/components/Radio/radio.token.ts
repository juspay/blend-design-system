import type { CSSObject } from 'styled-components'
import { type ThemeType } from '../../tokens'
import { RadioSize } from './types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type RadioState = 'default' | 'hover' | 'disabled' | 'error'
export type RadioIndicatorState = 'active' | 'inactive'

export type RadioTokensType = Readonly<{
    gap: CSSObject['gap']
    group: {
        gap: CSSObject['gap']
    }
    indicator: {
        [key in RadioIndicatorState]: {
            backgroundColor: {
                [key in RadioState]: CSSObject['backgroundColor']
            }

            borderColor: {
                [key in RadioState]: CSSObject['borderColor']
            }
        }
    }
    activeIndicator: {
        active: {
            backgroundColor: {
                [key in Exclude<
                    RadioState,
                    'hover' | 'error'
                >]: CSSObject['backgroundColor']
            }
        }
    }
    content: {
        label: {
            gap: CSSObject['gap']
            color: {
                [key in RadioState]: CSSObject['color']
            }

            fontSize: { [key in RadioSize]: CSSObject['fontSize'] }
            fontWeight: { [key in RadioSize]: CSSObject['fontWeight'] }
        }
        sublabel: {
            color: {
                [key in RadioState]: CSSObject['color']
            }
            fontSize: { [key in RadioSize]: CSSObject['fontSize'] }
            fontWeight: { [key in RadioSize]: CSSObject['fontWeight'] }
        }
    }
    height: {
        [key in RadioSize]: CSSObject['height']
    }
    borderWidth: {
        [key in RadioIndicatorState]: {
            [key in RadioState]: number
        }
    }
    slot: {
        [key in RadioSize]: CSSObject['width']
    }
    required: {
        color: CSSObject['color']
    }
}>

export type ResponsiveRadioTokens = {
    [key in keyof BreakpointType]: RadioTokensType
}

export const getRadioTokens = (
    foundationToken: ThemeType
): ResponsiveRadioTokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],

            group: {
                gap: foundationToken.unit[12],
            },
            indicator: {
                inactive: {
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.red[600],
                    },
                    borderColor: {
                        default: foundationToken.colors.gray[300],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                },
                active: {
                    backgroundColor: {
                        default: foundationToken.colors.primary[100],
                        hover: foundationToken.colors.primary[100],
                        disabled: foundationToken.colors.gray[50],
                        error: foundationToken.colors.red[600],
                    },
                    borderColor: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[300],
                        error: foundationToken.colors.red[600],
                    },
                },
            },
            activeIndicator: {
                active: {
                    backgroundColor: {
                        default: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
            },
            content: {
                label: {
                    gap: foundationToken.unit[8],
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    fontSize: {
                        sm: `${foundationToken.font.size.body.md.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                    },
                },
                sublabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                    },
                },
            },
            height: {
                sm: foundationToken.unit[16],
                md: foundationToken.unit[20],
            },
            borderWidth: {
                inactive: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                    error: 1,
                },
                active: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                    error: 1,
                },
            },
            slot: {
                sm: foundationToken.unit[12],
                md: foundationToken.unit[12],
            },
            required: {
                color: foundationToken.colors.red[600],
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            group: {
                gap: foundationToken.unit[12],
            },
            indicator: {
                inactive: {
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.red[600],
                    },
                    borderColor: {
                        default: foundationToken.colors.gray[300],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                },
                active: {
                    backgroundColor: {
                        default: foundationToken.colors.primary[100],
                        hover: foundationToken.colors.primary[100],
                        disabled: foundationToken.colors.gray[50],
                        error: foundationToken.colors.red[600],
                    },
                    borderColor: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[300],
                        error: foundationToken.colors.red[600],
                    },
                },
            },
            activeIndicator: {
                active: {
                    backgroundColor: {
                        default: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
            },
            content: {
                label: {
                    gap: foundationToken.unit[8],
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[500],
                        md: foundationToken.font.weight[500],
                    },
                },
                sublabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                    fontSize: {
                        sm: `${foundationToken.font.size.body.sm.fontSize}px`,
                        md: `${foundationToken.font.size.body.md.fontSize}px`,
                    },
                    fontWeight: {
                        sm: foundationToken.font.weight[400],
                        md: foundationToken.font.weight[400],
                    },
                },
            },
            height: {
                sm: foundationToken.unit[14],
                md: foundationToken.unit[16],
            },
            borderWidth: {
                inactive: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                    error: 1,
                },
                active: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                    error: 1,
                },
            },
            slot: {
                sm: foundationToken.unit[12],
                md: foundationToken.unit[12],
            },
            required: {
                color: foundationToken.colors.red[600],
            },
        },
    }
}
