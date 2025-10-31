import type { CSSObject } from 'styled-components'
import { SelectMenuSize, SelectMenuVariant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

type TriggerStates = 'open' | 'closed' | 'hover' | 'focus' | 'error'

export type SingleSelectItemStates =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'
    | 'selected'

export type SingleSelectTokensType = {
    gap: CSSObject['gap']
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
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in SingleSelectItemStates]: CSSObject['color']
        }
    }
    errorMessage: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    required: {
        color: CSSObject['color']
    }

    trigger: {
        height: {
            [key in SelectMenuSize]: {
                [key in SelectMenuVariant]: CSSObject['height'] // won't depend on variant
            }
        }
        padding: {
            [key in SelectMenuSize]: {
                [key in SelectMenuVariant]: {
                    // won't depend on variant
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }

        borderRadius: {
            [key in SelectMenuSize]: {
                [key in SelectMenuVariant]: CSSObject['borderRadius'] // won't depend on variant
            }
        }
        boxShadow: {
            [key in SelectMenuVariant]: CSSObject['boxShadow']
        }
        backgroundColor: {
            [key in SelectMenuVariant]: {
                [key in TriggerStates]: CSSObject['backgroundColor']
            }
        }
        outline: {
            //this acts as a border for the trigger in default state
            [key in SelectMenuVariant]: {
                [key in TriggerStates]: CSSObject['outline']
            }
        }
        placeholder: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        selectedValue: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
    }
    menu: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        padding: {
            [key in SelectMenuSize]: {
                [key in SelectMenuVariant]: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }
        item: {
            padding: CSSObject['padding']
            margin: CSSObject['margin']
            borderRadius: CSSObject['borderRadius']
            gap: CSSObject['gap']
            backgroundColor: {
                [key in SingleSelectItemStates]: CSSObject['backgroundColor']
            }
            optionsLabel: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectItemStates]: CSSObject['color']
                }
            }
            option: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectItemStates]: CSSObject['color']
                }
            }
            description: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in SingleSelectItemStates]: CSSObject['color']
                }
            }
            seperator: {
                color: CSSObject['color']
                height: CSSObject['height']
                margin: CSSObject['margin']
            }
        }
    }
    drawer: {
        //needs to be removed
        header: {
            paddingX: CSSObject['padding']
            paddingBottom: CSSObject['padding']
            borderBottom: CSSObject['borderBottom']
        }
    }
}

export type ResponsiveSingleSelectTokens = {
    [key in keyof BreakpointType]: SingleSelectTokensType
}

export const getSingleSelectTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSingleSelectTokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[700],
                    active: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    focusVisible: foundationToken.colors.gray[700],
                    disabled: foundationToken.colors.gray[400],
                    selected: foundationToken.colors.gray[700],
                },
            },
            subLabel: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[400],
                    active: foundationToken.colors.gray[400],
                    focus: foundationToken.colors.gray[400],
                    focusVisible: foundationToken.colors.gray[400],
                    disabled: foundationToken.colors.gray[300],
                    selected: foundationToken.colors.gray[400],
                },
            },
            hintText: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[500],
                    hover: foundationToken.colors.gray[500],
                    active: foundationToken.colors.gray[500],
                    focus: foundationToken.colors.gray[500],
                    focusVisible: foundationToken.colors.gray[500],
                    disabled: foundationToken.colors.gray[400],
                    selected: foundationToken.colors.gray[500],
                },
            },
            errorMessage: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: foundationToken.colors.red[600],
            },
            required: {
                color: foundationToken.colors.red[600],
            },
            trigger: {
                height: {
                    sm: {
                        container: foundationToken.unit[36],
                        'no-container': foundationToken.unit[36],
                    },
                    md: {
                        container: foundationToken.unit[40],
                        'no-container': foundationToken.unit[40],
                    },
                    lg: {
                        container: foundationToken.unit[52],
                        'no-container': foundationToken.unit[52],
                    },
                },
                padding: {
                    sm: {
                        container: {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[7],
                        },
                        'no-container': {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[7],
                        },
                    },
                    md: {
                        container: {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[8],
                        },
                        'no-container': {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[8],
                        },
                    },
                    lg: {
                        container: {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[10],
                        },
                        'no-container': {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[10],
                        },
                    },
                },
                borderRadius: {
                    sm: {
                        container: foundationToken.unit[10],
                        'no-container': foundationToken.unit[10],
                    },
                    md: {
                        container: foundationToken.unit[10],
                        'no-container': foundationToken.unit[10],
                    },
                    lg: {
                        container: foundationToken.unit[10],
                        'no-container': foundationToken.unit[10],
                    },
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
                        error: foundationToken.colors.gray[0],
                    },
                    'no-container': {
                        open: 'transparent',
                        closed: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        focus: foundationToken.colors.gray[50],
                        error: 'transparent',
                    },
                },
                outline: {
                    container: {
                        open: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        closed: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        hover: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        focus: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        error: `1px solid ${foundationToken.colors.red[600]} !important`,
                    },
                    'no-container': {
                        open: undefined,
                        closed: undefined,
                        hover: undefined,
                        focus: undefined,
                        error: undefined,
                    },
                },
                placeholder: {
                    color: foundationToken.colors.gray[400],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
                selectedValue: {
                    color: foundationToken.colors.gray[800],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
            },
            menu: {
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    sm: {
                        container: {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                        'no-container': {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                    },
                    md: {
                        container: {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                        'no-container': {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                    },
                    lg: {
                        container: {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                        'no-container': {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                    },
                },
                border: foundationToken.colors.gray[200],
                // outline: foundationToken.colors.gray[200],
                borderRadius: foundationToken.unit[8],
                item: {
                    padding: foundationToken.unit[8],
                    margin: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    borderRadius: foundationToken.unit[8],
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
                    optionsLabel: {
                        fontSize: 12,
                        fontWeight: 400,
                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            focusVisible: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[400],
                            selected: foundationToken.colors.gray[400],
                        },
                    },
                    option: {
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
                    description: {
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
                    seperator: {
                        color: foundationToken.colors.gray[200],
                        height: 1,
                        margin: `${foundationToken.unit[6]} 0`,
                    },
                },
            },
            drawer: {
                header: {
                    paddingX: foundationToken.unit[8],
                    paddingBottom: foundationToken.unit[8],
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                },
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            label: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: {
                    default: foundationToken.colors.gray[700],
                    hover: foundationToken.colors.gray[700],
                    active: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    focusVisible: foundationToken.colors.gray[700],
                    disabled: foundationToken.colors.gray[400],
                    selected: foundationToken.colors.gray[700],
                },
            },
            subLabel: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[400],
                    active: foundationToken.colors.gray[400],
                    focus: foundationToken.colors.gray[400],
                    focusVisible: foundationToken.colors.gray[400],
                    disabled: foundationToken.colors.gray[300],
                    selected: foundationToken.colors.gray[400],
                },
            },
            hintText: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[500],
                    hover: foundationToken.colors.gray[500],
                    active: foundationToken.colors.gray[500],
                    focus: foundationToken.colors.gray[500],
                    focusVisible: foundationToken.colors.gray[500],
                    disabled: foundationToken.colors.gray[400],
                    selected: foundationToken.colors.gray[500],
                },
            },
            errorMessage: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
                color: foundationToken.colors.red[600],
            },
            required: {
                color: foundationToken.colors.red[600],
            },
            trigger: {
                height: {
                    sm: {
                        container: foundationToken.unit[36],
                        'no-container': foundationToken.unit[36],
                    },
                    md: {
                        container: foundationToken.unit[40],
                        'no-container': foundationToken.unit[36],
                    },
                    lg: {
                        container: foundationToken.unit[44],
                        'no-container': foundationToken.unit[44],
                    },
                },
                padding: {
                    sm: {
                        container: {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[7],
                        },
                        'no-container': {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[7],
                        },
                    },
                    md: {
                        container: {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[8],
                        },
                        'no-container': {
                            x: foundationToken.unit[14],
                            y: foundationToken.unit[8],
                        },
                    },
                    lg: {
                        container: {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[10],
                        },
                        'no-container': {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[10],
                        },
                    },
                },

                borderRadius: {
                    sm: {
                        container: foundationToken.unit[10],
                        'no-container': foundationToken.unit[10],
                    },
                    md: {
                        container: foundationToken.unit[10],
                        'no-container': foundationToken.unit[10],
                    },
                    lg: {
                        container: foundationToken.unit[10],
                        'no-container': foundationToken.unit[10],
                    },
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
                        error: foundationToken.colors.gray[0],
                    },
                    'no-container': {
                        open: 'transparent',
                        closed: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        focus: foundationToken.colors.gray[50],
                        error: 'transparent',
                    },
                },
                outline: {
                    container: {
                        open: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        closed: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        hover: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        focus: `1px solid ${foundationToken.colors.gray[200]} !important`,
                        error: `1px solid ${foundationToken.colors.red[600]} !important`,
                    },
                    'no-container': {
                        open: undefined,
                        closed: undefined,
                        hover: undefined,
                        focus: undefined,
                        error: undefined,
                    },
                },
                placeholder: {
                    color: foundationToken.colors.gray[400],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
                selectedValue: {
                    color: foundationToken.colors.gray[800],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
            },
            menu: {
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    sm: {
                        container: {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                        'no-container': {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                    },
                    md: {
                        container: {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                        'no-container': {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                    },
                    lg: {
                        container: {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                        'no-container': {
                            x: foundationToken.unit[6],
                            y: foundationToken.unit[6],
                        },
                    },
                },
                border: foundationToken.colors.gray[200],
                borderRadius: foundationToken.unit[8],
                item: {
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                    margin: `${foundationToken.unit[0]} ${foundationToken.unit[4]}`,
                    borderRadius: foundationToken.unit[8],
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
                    optionsLabel: {
                        fontSize: 12,
                        fontWeight: 400,
                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[400],
                            focus: foundationToken.colors.gray[400],
                            focusVisible: foundationToken.colors.gray[400],
                            disabled: foundationToken.colors.gray[400],
                            selected: foundationToken.colors.gray[400],
                        },
                    },
                    option: {
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
                    description: {
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
                    seperator: {
                        color: foundationToken.colors.gray[200],
                        height: 1,
                        margin: `${foundationToken.unit[6]} 0`,
                    },
                },
            },
            drawer: {
                header: {
                    paddingX: foundationToken.unit[8],
                    paddingBottom: foundationToken.unit[8],
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                },
            },
        },
    }
}
