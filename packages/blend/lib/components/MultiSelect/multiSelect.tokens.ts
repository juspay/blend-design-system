import type { CSSObject } from 'styled-components'
import {
    MultiSelectMenuSize,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

type TriggerStates = 'open' | 'closed' | 'hover' | 'focus' | 'error'

export type MultiSelectItemStates =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'
    | 'selected'

export type MultiSelectTokensType = {
    gap: CSSObject['gap']
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in MultiSelectItemStates]: CSSObject['color']
        }
    }
    subLabel: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in MultiSelectItemStates]: CSSObject['color']
        }
    }
    hintText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: {
            [key in MultiSelectItemStates]: CSSObject['color']
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
            [key in MultiSelectMenuSize]: {
                [key in MultiSelectVariant]: CSSObject['height']
            }
        }
        padding: {
            [key in MultiSelectMenuSize]: {
                [key in MultiSelectVariant]: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }

        borderRadius: {
            [key in MultiSelectMenuSize]: {
                [key in MultiSelectVariant]: CSSObject['borderRadius']
            }
        }
        boxShadow: {
            [key in MultiSelectVariant]: CSSObject['boxShadow']
        }
        backgroundColor: {
            [key in MultiSelectVariant]: {
                [key in TriggerStates]: CSSObject['backgroundColor']
            }
        }
        outline: {
            [key in MultiSelectVariant]: {
                [key in TriggerStates]: CSSObject['outline']
            }
        }
        selectionTag: {
            [key in MultiSelectVariant]: {
                [key in MultiSelectSelectionTagType]: {
                    color: CSSObject['color']
                    backgroundColor: CSSObject['backgroundColor']
                    fontWeight: CSSObject['fontWeight']
                }
            }
        }
        placeholder: {
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
            [key in MultiSelectMenuSize]: {
                [key in MultiSelectVariant]: {
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
                [key in MultiSelectItemStates]: CSSObject['backgroundColor']
            }
            optionsLabel: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in MultiSelectItemStates]: CSSObject['color']
                }
            }
            option: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in MultiSelectItemStates]: CSSObject['color']
                }
            }
            description: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in MultiSelectItemStates]: CSSObject['color']
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
        header: {
            paddingX: CSSObject['padding']
            paddingBottom: CSSObject['padding']
            borderBottom: CSSObject['borderBottom']
        }
        search: {
            paddingX: CSSObject['padding']
            marginTop: CSSObject['margin']
            marginBottom: CSSObject['margin']
        }
        content: {
            gap: CSSObject['gap']
        }
    }
}

export type ResponsiveMultiSelectTokens = {
    [key in keyof BreakpointType]: MultiSelectTokensType
}

export const getMultiSelectTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMultiSelectTokens => {
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
                selectionTag: {
                    container: {
                        text: {
                            color: foundationToken.colors.gray[600],
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                        },
                        count: {
                            color: foundationToken.colors.gray[0],
                            backgroundColor:
                                foundationToken.colors.primary[600],
                            fontWeight: 500,
                        },
                    },
                    'no-container': {
                        text: {
                            color: foundationToken.colors.gray[600],
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                        },
                        count: {
                            color: foundationToken.colors.gray[0],
                            backgroundColor:
                                foundationToken.colors.primary[600],
                            fontWeight: 500,
                        },
                    },
                },
                placeholder: {
                    color: foundationToken.colors.gray[400],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
            },
            menu: {
                // boxShadow: foundationToken.shadows.sm,
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    sm: {
                        container: {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                        'no-container': {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                    },
                    md: {
                        container: {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                        'no-container': {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                    },
                    lg: {
                        container: {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                        'no-container': {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                    },
                },
                border: foundationToken.colors.gray[200],
                borderRadius: foundationToken.unit[10],
                item: {
                    padding: foundationToken.unit[4],
                    margin: foundationToken.unit[4],
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
                    paddingX: foundationToken.unit[20],
                    paddingBottom: foundationToken.unit[12],
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                search: {
                    paddingX: foundationToken.unit[20],
                    marginTop: foundationToken.unit[8],
                    marginBottom: foundationToken.unit[4],
                },
                content: {
                    gap: foundationToken.unit[4],
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
                        'no-container': foundationToken.unit[40],
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
                selectionTag: {
                    container: {
                        text: {
                            color: foundationToken.colors.gray[600],
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                        },
                        count: {
                            color: foundationToken.colors.gray[0],
                            backgroundColor:
                                foundationToken.colors.primary[600],
                            fontWeight: 500,
                        },
                    },
                    'no-container': {
                        text: {
                            color: foundationToken.colors.gray[600],
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                        },
                        count: {
                            color: foundationToken.colors.gray[0],
                            backgroundColor:
                                foundationToken.colors.primary[600],
                            fontWeight: 500,
                        },
                    },
                },
                placeholder: {
                    color: foundationToken.colors.gray[400],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
            },
            menu: {
                // boxShadow: foundationToken.shadows.sm,
                backgroundColor: foundationToken.colors.gray[0],
                padding: {
                    sm: {
                        container: {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                        'no-container': {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                    },
                    md: {
                        container: {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                        'no-container': {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                    },
                    lg: {
                        container: {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                        'no-container': {
                            x: foundationToken.unit[4],
                            y: foundationToken.unit[4],
                        },
                    },
                },
                border: foundationToken.colors.gray[200],
                borderRadius: foundationToken.unit[10],
                item: {
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                    margin: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
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
                    paddingX: foundationToken.unit[20],
                    paddingBottom: foundationToken.unit[12],
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                search: {
                    paddingX: foundationToken.unit[20],
                    marginTop: foundationToken.unit[8],
                    marginBottom: foundationToken.unit[4],
                },
                content: {
                    gap: foundationToken.unit[4],
                },
            },
        },
    }
}
