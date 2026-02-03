import type { CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'
import type { ThemeType } from '../../tokens'
import {
    CheckboxSize,
    CheckboxInteractionState,
    CheckboxCheckedState,
} from './types'
import type { BreakpointType } from '../../breakpoints/breakPoints'

// Token Structure: component.[target].CSSProp.[size].[variant].[subType].[state].value

export type CheckboxTokensType = {
    gap: CSSObject['gap']
    slot: {
        marginLeft: CSSObject['marginLeft']
    }

    indicator: {
        width: { [key in CheckboxSize]: CSSObject['width'] }
        height: { [key in CheckboxSize]: CSSObject['height'] }

        backgroundColor: {
            [key in CheckboxCheckedState]?: {
                [key in CheckboxInteractionState]?: CSSObject['backgroundColor']
            }
        }

        borderRadius: { [key in CheckboxSize]: CSSObject['borderRadius'] }

        border: {
            [key in CheckboxCheckedState]?: {
                [key in CheckboxInteractionState]?: CSSObject['border']
            }
        }

        outline: CSSObject['outline']
        outlineOffset: CSSObject['outlineOffset']
        boxShadow: CSSObject['boxShadow']
        icon: {
            color: {
                [key in CheckboxCheckedState]?: {
                    [key in Extract<
                        CheckboxInteractionState,
                        'default' | 'disabled'
                    >]?: CSSObject['color']
                }
            }
            width: { [key in CheckboxSize]: CSSObject['width'] }
            height: { [key in CheckboxSize]: CSSObject['height'] }
            strokeWidth: { [key in CheckboxSize]: CSSObject['strokeWidth'] }
        }
    }
    text: {
        lineHeight: { [key in CheckboxSize]: CSSObject['lineHeight'] }
    }

    content: {
        gap: CSSObject['gap']
        label: {
            color: {
                [key in CheckboxInteractionState]: CSSObject['color']
            }
            fontSize: { [key in CheckboxSize]: CSSObject['fontSize'] }
            fontWeight: { [key in CheckboxSize]: CSSObject['fontWeight'] }
        }
        subtext: {
            color: {
                [key in CheckboxInteractionState]: CSSObject['color']
            }
            fontSize: { [key in CheckboxSize]: CSSObject['fontSize'] }
            fontWeight: { [key in CheckboxSize]: CSSObject['fontWeight'] }
        }
    }

    required: {
        color: CSSObject['color']
    }
}

export type ResponsiveCheckboxTokens = {
    [key in keyof BreakpointType]: CheckboxTokensType
}

export const getCheckboxTokens = (
    foundationToken: ThemeType
): ResponsiveCheckboxTokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            slot: {
                marginLeft: foundationToken.unit[6],
            },

            indicator: {
                width: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                },
                height: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                },
                backgroundColor: {
                    unchecked: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    checked: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                    indeterminate: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                },

                borderRadius: {
                    sm: foundationToken.border.radius[4],
                    md: foundationToken.border.radius[4],
                },
                border: {
                    unchecked: {
                        default: `1px solid ${foundationToken.colors.gray[300]}`,
                        hover: `1px solid ${foundationToken.colors.gray[400]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    checked: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    indeterminate: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                },

                outline: `1px solid ${foundationToken.colors.primary[200]}`,
                outlineOffset: foundationToken.unit[2],
                boxShadow: `0 0 0 2px ${foundationToken.colors.primary[100]}`,

                icon: {
                    color: {
                        checked: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        indeterminate: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },
                    width: {
                        sm: foundationToken.unit[12],
                        md: foundationToken.unit[14],
                    },
                    height: {
                        sm: foundationToken.unit[12],
                        md: foundationToken.unit[14],
                    },
                    strokeWidth: {
                        sm: 2.5,
                        md: 2.5,
                    },
                },
            },

            content: {
                gap: foundationToken.unit[0],
                label: {
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
                subtext: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                        hover: foundationToken.colors.gray[400],
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

            required: {
                color: foundationToken.colors.red[600],
            },
            text: {
                lineHeight: {
                    sm: foundationToken.font.lineHeight[16],
                    md: foundationToken.font.lineHeight[16],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            slot: {
                marginLeft: foundationToken.unit[6],
            },

            indicator: {
                width: {
                    sm: foundationToken.unit[14],
                    md: foundationToken.unit[16],
                },

                height: {
                    sm: foundationToken.unit[14],
                    md: foundationToken.unit[16],
                },

                backgroundColor: {
                    unchecked: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[150],
                        disabled: foundationToken.colors.gray[100],
                        error: foundationToken.colors.gray[0],
                    },
                    checked: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                    indeterminate: {
                        default: foundationToken.colors.primary[500],
                        hover: foundationToken.colors.primary[600],
                        disabled: foundationToken.colors.primary[200],
                        error: foundationToken.colors.primary[500],
                    },
                },
                borderRadius: {
                    sm: foundationToken.border.radius[4],
                    md: foundationToken.border.radius[4],
                },
                border: {
                    unchecked: {
                        default: `1px solid ${foundationToken.colors.gray[300]}`,
                        hover: `1px solid ${foundationToken.colors.gray[400]}`,
                        disabled: `1px solid ${foundationToken.colors.gray[200]}`,
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    checked: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                    indeterminate: {
                        default: 'transparent',
                        hover: 'transparent',
                        disabled: 'transparent',
                        error: `1px solid ${foundationToken.colors.red[500]}`,
                    },
                },
                outline: `1px solid ${foundationToken.colors.primary[200]}`,
                outlineOffset: foundationToken.unit[2],
                boxShadow: `0 0 0 2px ${foundationToken.colors.primary[100]}`,
                icon: {
                    color: {
                        checked: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                        indeterminate: {
                            default: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },

                    width: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[12],
                    },
                    height: {
                        sm: foundationToken.unit[10],
                        md: foundationToken.unit[12],
                    },
                    strokeWidth: {
                        sm: 2.5,
                        md: 2.5,
                    },
                },
            },
            text: {
                lineHeight: {
                    sm: foundationToken.font.lineHeight[16],
                    md: foundationToken.font.lineHeight[16],
                },
            },
            content: {
                gap: foundationToken.unit[0],
                label: {
                    color: {
                        default: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[300],
                        error: foundationToken.colors.red[600],
                        hover: foundationToken.colors.gray[700],
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
                subtext: {
                    color: {
                        default: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[200],
                        error: foundationToken.colors.red[500],
                        hover: foundationToken.colors.gray[400],
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

            required: {
                color: foundationToken.colors.red[600],
            },
        },
    }
}

const checkboxTokens: ResponsiveCheckboxTokens =
    getCheckboxTokens(FOUNDATION_THEME)

export default checkboxTokens
