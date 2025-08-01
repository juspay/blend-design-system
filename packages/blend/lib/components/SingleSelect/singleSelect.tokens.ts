import type { CSSObject } from 'styled-components'
import { SelectMenuSize, SelectMenuVariant } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

type TriggerStates = 'open' | 'closed' | 'hover' | 'focus'

export type SingleSelectItemStates =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'
    | 'selected'

export type SingleSelectTokensType = {
    trigger: {
        height: CSSObject['height']
        paddingX: {
            [key in SelectMenuSize]: CSSObject['padding']
        }
        paddingY: {
            [key in SelectMenuSize]: CSSObject['padding']
        }
        borderRadius: {
            [key in SelectMenuSize]: CSSObject['borderRadius']
        }
        boxShadow: {
            [key in SelectMenuVariant]: CSSObject['boxShadow']
        }
        backgroundColor: {
            container: {
                [key in TriggerStates]: CSSObject['backgroundColor']
            }
        }
        outline: {
            [key in SelectMenuVariant]: {
                [key in TriggerStates]: CSSObject['outline']
            }
        }
    }
    dropdown: {
        shadow: CSSObject['boxShadow']
        backgroundColor: CSSObject['backgroundColor']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        border: CSSObject['border']
        outline: CSSObject['outline']
        borderRadius: CSSObject['borderRadius']
        item: {
            padding: CSSObject['padding']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            backgroundColor: {
                [key in SingleSelectItemStates]: CSSObject['backgroundColor']
            }
            label: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectItemStates]: CSSObject['color']
                }
            }
            subLabel: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectItemStates]: CSSObject['color']
                }
            }
        }
        seperator: {
            color: CSSObject['color']
            height: CSSObject['height']
            margin: CSSObject['margin']
        }
    }
}

export type ResponsiveSingleSelectTokens = {
    [key in keyof BreakpointType]: SingleSelectTokensType
}

export const singleSelectTokens: SingleSelectTokensType = {
    trigger: {
        height: FOUNDATION_THEME.unit[52],
        paddingX: {
            sm: FOUNDATION_THEME.unit[14],
            md: FOUNDATION_THEME.unit[14],
            lg: FOUNDATION_THEME.unit[14],
        },
        paddingY: {
            sm: FOUNDATION_THEME.unit[6],
            md: FOUNDATION_THEME.unit[8],
            lg: FOUNDATION_THEME.unit[10],
        },
        borderRadius: {
            sm: FOUNDATION_THEME.unit[10],
            md: FOUNDATION_THEME.unit[10],
            lg: FOUNDATION_THEME.unit[10],
        },
        boxShadow: {
            container: FOUNDATION_THEME.shadows.sm,
            'no-container': 'none',
        },
        backgroundColor: {
            container: {
                open: FOUNDATION_THEME.colors.gray[25],
                closed: FOUNDATION_THEME.colors.gray[0],
                hover: FOUNDATION_THEME.colors.gray[50],
                focus: FOUNDATION_THEME.colors.gray[50],
            },
        },
        outline: {
            container: {
                open: `1px solid ${FOUNDATION_THEME.colors.gray[200]} !important`,
                closed: `1px solid ${FOUNDATION_THEME.colors.gray[200]} !important`,
                hover: `1px solid ${FOUNDATION_THEME.colors.gray[200]} !important`,
                focus: `1px solid ${FOUNDATION_THEME.colors.gray[200]} !important`,
            },
            'no-container': {
                open: undefined,
                closed: undefined,
                hover: undefined,
                focus: undefined,
            },
        },
    },
    dropdown: {
        shadow: FOUNDATION_THEME.shadows.sm,
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        paddingTop: FOUNDATION_THEME.unit[4],
        paddingBottom: FOUNDATION_THEME.unit[4],
        border: FOUNDATION_THEME.colors.gray[200],
        outline: FOUNDATION_THEME.colors.gray[200],
        borderRadius: FOUNDATION_THEME.unit[10],
        item: {
            padding: FOUNDATION_THEME.unit[4],
            margin: FOUNDATION_THEME.unit[4],
            borderRadius: FOUNDATION_THEME.unit[10],
            gap: FOUNDATION_THEME.unit[4],
            backgroundColor: {
                default: FOUNDATION_THEME.colors.gray[0],
                hover: FOUNDATION_THEME.colors.gray[50],
                active: FOUNDATION_THEME.colors.gray[100],
                focus: FOUNDATION_THEME.colors.gray[100],
                focusVisible: FOUNDATION_THEME.colors.gray[100],
                disabled: FOUNDATION_THEME.colors.gray[50],
                selected: FOUNDATION_THEME.colors.gray[50],
            },
            label: {
                fontSize: 14,
                fontWeight: 500,
                color: {
                    default: FOUNDATION_THEME.colors.gray[600],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    active: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    focusVisible: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    selected: FOUNDATION_THEME.colors.gray[700],
                },
            },
            subLabel: {
                fontSize: 12,
                fontWeight: 400,
                color: {
                    default: FOUNDATION_THEME.colors.gray[600],
                    hover: FOUNDATION_THEME.colors.gray[700],
                    active: FOUNDATION_THEME.colors.gray[700],
                    focus: FOUNDATION_THEME.colors.gray[700],
                    focusVisible: FOUNDATION_THEME.colors.gray[700],
                    disabled: FOUNDATION_THEME.colors.gray[400],
                    selected: FOUNDATION_THEME.colors.gray[700],
                },
            },
        },
        seperator: {
            color: FOUNDATION_THEME.colors.gray[200],
            height: 1,
            margin: `${FOUNDATION_THEME.unit[6]} 0`,
        },
    },
}

export const getSingleSelectTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSingleSelectTokens => {
    return {
        sm: {
            trigger: {
                height: FOUNDATION_THEME.unit[52],
                paddingX: {
                    sm: FOUNDATION_THEME.unit[14],
                    md: FOUNDATION_THEME.unit[14],
                    lg: FOUNDATION_THEME.unit[12],
                },
                paddingY: {
                    sm: FOUNDATION_THEME.unit[6],
                    md: FOUNDATION_THEME.unit[8],
                    lg: FOUNDATION_THEME.unit[12],
                },
                borderRadius: {
                    sm: foundationToken.unit[10],
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                boxShadow: {
                    container: foundationToken.shadows.xs,
                    'no-container': 'none',
                },
                backgroundColor: {
                    container: {
                        open: foundationToken.colors.gray[25],
                        closed: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        focus: foundationToken.colors.gray[50],
                    },
                },
                outline: {
                    container: {
                        open: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        closed: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        hover: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        focus: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    },
                    'no-container': {
                        open: undefined,
                        closed: undefined,
                        hover: undefined,
                        focus: undefined,
                    },
                },
            },
            dropdown: {
                shadow: foundationToken.shadows.sm,
                backgroundColor: foundationToken.colors.gray[0],
                paddingTop: foundationToken.unit[4],
                paddingBottom: foundationToken.unit[4],
                border: foundationToken.colors.gray[200],
                outline: foundationToken.colors.gray[200],
                borderRadius: foundationToken.unit[10],
                item: {
                    padding: `${foundationToken.unit[8]} ${foundationToken.unit[8]}`,
                    margin: `${foundationToken.unit[0]} ${foundationToken.unit[4]}`,
                    borderRadius: foundationToken.unit[10],
                    gap: foundationToken.unit[4],
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                        focus: foundationToken.colors.gray[100],
                        focusVisible: foundationToken.colors.gray[100],
                        disabled: foundationToken.colors.gray[50],
                        selected: foundationToken.colors.gray[50],
                    },
                    label: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[700],
                            focus: foundationToken.colors.gray[700],
                            focusVisible: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                            selected: foundationToken.colors.gray[700],
                        },
                    },
                    subLabel: {
                        fontSize: 12,
                        fontWeight: 400,
                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            focusVisible: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[100],
                            selected: foundationToken.colors.gray[400],
                        },
                    },
                },
                seperator: {
                    color: foundationToken.colors.gray[200],
                    height: 1,
                    margin: `${foundationToken.unit[6]} 0`,
                },
            },
        },
        lg: {
            trigger: {
                height: FOUNDATION_THEME.unit[52],
                paddingX: {
                    sm: FOUNDATION_THEME.unit[14],
                    md: FOUNDATION_THEME.unit[14],
                    lg: FOUNDATION_THEME.unit[14],
                },
                paddingY: {
                    sm: FOUNDATION_THEME.unit[6],
                    md: FOUNDATION_THEME.unit[8],
                    lg: FOUNDATION_THEME.unit[10],
                },
                borderRadius: {
                    sm: foundationToken.unit[10],
                    md: foundationToken.unit[10],
                    lg: foundationToken.unit[10],
                },
                boxShadow: {
                    container: foundationToken.shadows.xs,
                    'no-container': 'none',
                },
                backgroundColor: {
                    container: {
                        open: foundationToken.colors.gray[25],
                        closed: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        focus: foundationToken.colors.gray[50],
                    },
                },
                outline: {
                    container: {
                        open: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        closed: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        hover: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        focus: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    },
                    'no-container': {
                        open: undefined,
                        closed: undefined,
                        hover: undefined,
                        focus: undefined,
                    },
                },
            },
            dropdown: {
                shadow: foundationToken.shadows.sm,
                backgroundColor: foundationToken.colors.gray[0],
                paddingTop: foundationToken.unit[4],
                paddingBottom: foundationToken.unit[4],
                border: foundationToken.colors.gray[200],
                outline: foundationToken.colors.gray[200],
                borderRadius: foundationToken.unit[10],
                item: {
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                    margin: `${foundationToken.unit[0]} ${foundationToken.unit[4]}`,
                    borderRadius: foundationToken.unit[10],
                    gap: foundationToken.unit[4],
                    backgroundColor: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                        focus: foundationToken.colors.gray[100],
                        focusVisible: foundationToken.colors.gray[100],
                        disabled: foundationToken.colors.gray[50],
                        selected: foundationToken.colors.gray[50],
                    },
                    label: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[700],
                            active: foundationToken.colors.gray[700],
                            focus: foundationToken.colors.gray[700],
                            focusVisible: foundationToken.colors.gray[700],
                            disabled: foundationToken.colors.gray[400],
                            selected: foundationToken.colors.gray[700],
                        },
                    },
                    subLabel: {
                        fontSize: 12,
                        fontWeight: 400,
                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            focusVisible: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[100],
                            selected: foundationToken.colors.gray[400],
                        },
                    },
                },
                seperator: {
                    color: foundationToken.colors.gray[200],
                    height: 1,
                    margin: `${foundationToken.unit[6]} 0`,
                },
            },
        },
    }
}
