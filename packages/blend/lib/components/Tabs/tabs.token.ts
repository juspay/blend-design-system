import type { CSSObject } from 'styled-components'
import { type ThemeType } from '../../tokens'
import { TabsVariant, TabsSize } from './types'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type TabsState = 'default' | 'hover' | 'active' | 'disabled'

export type TabsTokensType = {
    gap: {
        [key in TabsSize]: {
            [key in TabsVariant]: CSSObject['gap']
        }
    }

    list: {
        padding: {
            [key in TabsVariant]: CSSObject['padding']
        }
        backgroundColor: {
            [key in TabsVariant]: CSSObject['backgroundColor']
        }
        borderRadius: {
            [key in TabsVariant]: CSSObject['borderRadius']
        }
        borderBottom: {
            [key in TabsVariant]: CSSObject['borderBottom']
        }
    }

    trigger: {
        height: {
            [key in TabsSize]: CSSObject['height']
        }
        padding: {
            [key in TabsVariant]: {
                [key in TabsSize]: CSSObject['padding']
            }
        }
        fontSize: {
            [key in TabsSize]: CSSObject['fontSize']
        }

        iconGap: CSSObject['gap']

        fontWeight: {
            [key in TabsVariant]: {
                [key in TabsState]?: CSSObject['fontWeight']
            }
        }
        color: {
            [key in TabsVariant]: {
                [key in TabsState]?: CSSObject['color']
            }
        }
        backgroundColor: {
            [key in TabsVariant]: {
                [key in TabsState]?: CSSObject['backgroundColor']
            }
        }
        borderRadius: {
            [key in TabsVariant]: CSSObject['borderRadius']
        }
        border: {
            [key in TabsVariant]: CSSObject['border']
        }
    }

    underline: {
        height: CSSObject['height']
        color: CSSObject['color']
    }
}

export type ResponsiveTabsTokens = {
    [key in keyof BreakpointType]: TabsTokensType
}

export const getTabsTokens = (
    foundationToken: ThemeType
): ResponsiveTabsTokens => {
    return {
        sm: {
            gap: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: foundationToken.unit[12],
                    [TabsVariant.BOXED]: foundationToken.unit[12],
                    [TabsVariant.FLOATING]: foundationToken.unit[12],
                    [TabsVariant.PILLS]: foundationToken.unit[8],
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: foundationToken.unit[12],
                    [TabsVariant.BOXED]: foundationToken.unit[12],
                    [TabsVariant.FLOATING]: foundationToken.unit[12],
                    [TabsVariant.PILLS]: foundationToken.unit[8],
                },
            },

            list: {
                padding: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[8]} 0 0 0`,
                    [TabsVariant.BOXED]: foundationToken.unit[4],
                    [TabsVariant.FLOATING]: foundationToken.unit[4],
                    [TabsVariant.PILLS]: foundationToken.unit[4],
                },
                backgroundColor: {
                    [TabsVariant.UNDERLINE]: 'transparent',
                    [TabsVariant.BOXED]: foundationToken.colors.gray[50],
                    [TabsVariant.FLOATING]: 'transparent',
                    [TabsVariant.PILLS]: 'transparent',
                },
                borderRadius: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: '0',
                    [TabsVariant.PILLS]: '0',
                },
                borderBottom: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    [TabsVariant.BOXED]: 'none',
                    [TabsVariant.FLOATING]: 'none',
                    [TabsVariant.PILLS]: 'none',
                },
            },

            trigger: {
                height: {
                    [TabsSize.MD]: foundationToken.unit[36],
                    [TabsSize.LG]: foundationToken.unit[40],
                },
                padding: {
                    [TabsVariant.UNDERLINE]: {
                        [TabsSize.MD]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[6]}`,
                        [TabsSize.LG]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[6]}`,
                    },
                    [TabsVariant.BOXED]: {
                        [TabsSize.MD]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                        [TabsSize.LG]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                    },
                    [TabsVariant.FLOATING]: {
                        [TabsSize.MD]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                        [TabsSize.LG]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                    },
                    [TabsVariant.PILLS]: {
                        [TabsSize.MD]: `${foundationToken.unit[4]} ${foundationToken.unit[12]}`,
                        [TabsSize.LG]: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                    },
                },
                fontSize: {
                    [TabsSize.MD]: foundationToken.font.size.body.md.fontSize,
                    [TabsSize.LG]: foundationToken.font.size.body.md.fontSize,
                },

                iconGap: foundationToken.unit[8],

                fontWeight: {
                    [TabsVariant.UNDERLINE]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                },
                color: {
                    [TabsVariant.UNDERLINE]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[500],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[500],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                },
                backgroundColor: {
                    [TabsVariant.UNDERLINE]: {
                        default: 'transparent',
                        hover: 'transparent',
                        active: 'transparent',
                    },
                    [TabsVariant.BOXED]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                    },
                    [TabsVariant.FLOATING]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                    },
                    [TabsVariant.PILLS]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                    },
                },
                borderRadius: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: foundationToken.border.radius[8],
                    [TabsVariant.PILLS]: foundationToken.border.radius[28],
                },
                border: {
                    [TabsVariant.UNDERLINE]: 'none',
                    [TabsVariant.BOXED]: 'none',
                    [TabsVariant.FLOATING]: 'none',
                    [TabsVariant.PILLS]: `1px solid ${foundationToken.colors.gray[200]}`,
                },
            },

            underline: {
                height: foundationToken.border.width[2],
                color: foundationToken.colors.gray[700],
            },
        },
        lg: {
            gap: {
                [TabsSize.MD]: {
                    [TabsVariant.UNDERLINE]: foundationToken.unit[12],
                    [TabsVariant.BOXED]: foundationToken.unit[12],
                    [TabsVariant.FLOATING]: foundationToken.unit[12],
                    [TabsVariant.PILLS]: foundationToken.unit[12],
                },
                [TabsSize.LG]: {
                    [TabsVariant.UNDERLINE]: foundationToken.unit[12],
                    [TabsVariant.BOXED]: foundationToken.unit[12],
                    [TabsVariant.FLOATING]: foundationToken.unit[12],
                    [TabsVariant.PILLS]: foundationToken.unit[12],
                },
            },

            list: {
                padding: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.unit[8]} 0 0 0`,
                    [TabsVariant.BOXED]: foundationToken.unit[4],
                    [TabsVariant.FLOATING]: foundationToken.unit[4],
                    [TabsVariant.PILLS]: foundationToken.unit[4],
                },
                backgroundColor: {
                    [TabsVariant.UNDERLINE]: 'transparent',
                    [TabsVariant.BOXED]: foundationToken.colors.gray[50],
                    [TabsVariant.FLOATING]: 'transparent',
                    [TabsVariant.PILLS]: 'transparent',
                },
                borderRadius: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: '0',
                    [TabsVariant.PILLS]: '0',
                },
                borderBottom: {
                    [TabsVariant.UNDERLINE]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    [TabsVariant.BOXED]: 'none',
                    [TabsVariant.FLOATING]: 'none',
                    [TabsVariant.PILLS]: 'none',
                },
            },

            trigger: {
                height: {
                    [TabsSize.MD]: foundationToken.unit[36],
                    [TabsSize.LG]: foundationToken.unit[40],
                },
                padding: {
                    [TabsVariant.UNDERLINE]: {
                        [TabsSize.MD]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                        [TabsSize.LG]: `${foundationToken.unit[2]}  ${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                    },
                    [TabsVariant.BOXED]: {
                        [TabsSize.MD]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                        [TabsSize.LG]: `${foundationToken.unit[10]} ${foundationToken.unit[12]}`,
                    },
                    [TabsVariant.FLOATING]: {
                        [TabsSize.MD]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                        [TabsSize.LG]: `${foundationToken.unit[10]} ${foundationToken.unit[12]}`,
                    },
                    [TabsVariant.PILLS]: {
                        [TabsSize.MD]: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                        [TabsSize.LG]: `${foundationToken.unit[10]} ${foundationToken.unit[12]}`,
                    },
                },
                fontSize: {
                    [TabsSize.MD]: foundationToken.font.size.body.md.fontSize,
                    [TabsSize.LG]: foundationToken.font.size.body.md.fontSize,
                },

                iconGap: foundationToken.unit[8],

                fontWeight: {
                    [TabsVariant.UNDERLINE]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.font.weight[500],
                        active: foundationToken.font.weight[500],
                    },
                },
                color: {
                    [TabsVariant.UNDERLINE]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[500],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    [TabsVariant.BOXED]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[500],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    [TabsVariant.FLOATING]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    [TabsVariant.PILLS]: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                },
                backgroundColor: {
                    [TabsVariant.UNDERLINE]: {
                        default: 'transparent',
                        hover: 'transparent',
                        active: 'transparent',
                    },
                    [TabsVariant.BOXED]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                    },
                    [TabsVariant.FLOATING]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                    },
                    [TabsVariant.PILLS]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                    },
                },
                borderRadius: {
                    [TabsVariant.UNDERLINE]: '0',
                    [TabsVariant.BOXED]: foundationToken.border.radius[8],
                    [TabsVariant.FLOATING]: foundationToken.border.radius[8],
                    [TabsVariant.PILLS]: foundationToken.border.radius[28],
                },
                border: {
                    [TabsVariant.UNDERLINE]: 'none',
                    [TabsVariant.BOXED]: 'none',
                    [TabsVariant.FLOATING]: 'none',
                    [TabsVariant.PILLS]: `1px solid ${foundationToken.colors.gray[200]}`,
                },
            },

            underline: {
                height: foundationToken.border.width[2],
                color: foundationToken.colors.gray[700],
            },
        },
    }
}
