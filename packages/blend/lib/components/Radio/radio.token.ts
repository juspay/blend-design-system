import { CSSObject } from 'styled-components'
import { FOUNDATION_THEME, ThemeType } from '../../tokens'
import { RadioSize } from './types'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type RadioState = 'default' | 'hover' | 'disabled' | 'error'
export type RadioIndicatorState = 'active' | 'inactive'

export type RadioTokensType = Readonly<{
    gap: CSSObject['gap']
    slotGap: CSSObject['gap']
    groupGap: CSSObject['gap']
    indicator: {
        [key in RadioIndicatorState]: {
            background: {
                [key in Exclude<
                    RadioState,
                    'error'
                >]: CSSObject['backgroundColor']
            }
            border: {
                [key in Exclude<RadioState, 'error'>]: CSSObject['borderColor']
            }
        }
    }
    activeIndicator: {
        active: {
            background: {
                [key in Exclude<
                    RadioState,
                    'hover' | 'error'
                >]: CSSObject['backgroundColor']
            }
        }
    }
    content: {
        label: {
            color: {
                [key in RadioState]: CSSObject['color']
            }
            font: {
                [key in RadioSize]: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
            }
        }
        sublabel: {
            color: {
                [key in RadioState]: CSSObject['color']
            }
            font: {
                [key in RadioSize]: {
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
            }
        }
    }
    height: {
        [key in RadioSize]: CSSObject['height']
    }
    borderWidth: {
        [key in RadioIndicatorState]: {
            [key in Exclude<RadioState, 'error'>]: number
        }
    }
    slot: {
        size: {
            [key in RadioSize]: CSSObject['width']
        }
    }
    required: {
        color: CSSObject['color']
        spacing: CSSObject['marginLeft']
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
            gap: foundationToken.unit[4],
            slotGap: foundationToken.unit[8],
            groupGap: foundationToken.unit[12],
            indicator: {
                inactive: {
                    background: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                    },
                    border: {
                        default: foundationToken.colors.gray[300],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                    },
                },
                active: {
                    background: {
                        default: foundationToken.colors.primary[100],
                        hover: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[50],
                    },
                    border: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[500],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
            },
            activeIndicator: {
                active: {
                    background: {
                        default: foundationToken.colors.primary[500],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
            },
            content: {
                label: {
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                    },
                },
                sublabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
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
                },
                active: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                },
            },
            slot: {
                size: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                },
            },
            required: {
                color: foundationToken.colors.red[600],
                spacing: foundationToken.unit[2],
            },
        },
        lg: {
            gap: foundationToken.unit[4],
            slotGap: foundationToken.unit[8],
            groupGap: foundationToken.unit[12],
            indicator: {
                inactive: {
                    background: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                    },
                    border: {
                        default: foundationToken.colors.gray[300],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                    },
                },
                active: {
                    background: {
                        default: foundationToken.colors.primary[100],
                        hover: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[50],
                    },
                    border: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[500],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
            },
            activeIndicator: {
                active: {
                    background: {
                        default: foundationToken.colors.primary[500],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
            },
            content: {
                label: {
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[500],
                        },
                    },
                },
                sublabel: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[600],
                    },
                    font: {
                        sm: {
                            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        md: {
                            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
                            fontWeight: foundationToken.font.weight[400],
                        },
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
                },
                active: {
                    default: 1,
                    hover: 1,
                    disabled: 1,
                },
            },
            slot: {
                size: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[12],
                },
            },
            required: {
                color: foundationToken.colors.red[600],
                spacing: foundationToken.unit[2],
            },
        },
    }
}

const radioTokens: ResponsiveRadioTokens = getRadioTokens(FOUNDATION_THEME)

export default radioTokens
