import type { CSSObject } from 'styled-components'
import {
    MultiSelectMenuSize,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from './types'
import { FOUNDATION_THEME } from '../../tokens'
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

export type MultiSelectTokensType = {
    trigger: {
        height: {
            [key in MultiSelectMenuSize]: CSSObject['height']
        }
        paddingX: {
            [key in MultiSelectMenuSize]: CSSObject['padding']
        }
        paddingY: {
            [key in MultiSelectMenuSize]: CSSObject['padding']
        }
        borderRadius: {
            [key in MultiSelectMenuSize]: CSSObject['borderRadius']
        }
        boxShadow: {
            [key in MultiSelectVariant]: CSSObject['boxShadow']
        }
        backgroundColor: {
            container: {
                [key in TriggerStates]: CSSObject['backgroundColor']
            }
            'no-container': {
                [key in TriggerStates]: CSSObject['backgroundColor']
            }
        }
        outline: {
            [key in MultiSelectVariant]: {
                [key in TriggerStates]: CSSObject['outline']
            }
        }
        selectionTag: {
            container: {
                [key in MultiSelectSelectionTagType]: {
                    color: CSSObject['color']
                    backgroundColor: CSSObject['backgroundColor']
                    fontWeight: CSSObject['fontWeight']
                }
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

export type ResponsiveMultiSelectTokens = {
    [key in keyof BreakpointType]: MultiSelectTokensType
}

export const getMultiSelectTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMultiSelectTokens => {
    return {
        sm: {
            trigger: {
                height: {
                    sm: FOUNDATION_THEME.unit[32],
                    md: FOUNDATION_THEME.unit[36],
                    lg: FOUNDATION_THEME.unit[52],
                },
                paddingX: {
                    sm: FOUNDATION_THEME.unit[14],
                    md: FOUNDATION_THEME.unit[14],
                    lg: FOUNDATION_THEME.unit[12],
                },
                paddingY: {
                    sm: FOUNDATION_THEME.unit[7],
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
                            color: foundationToken.colors.gray[400],
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
                height: {
                    sm: FOUNDATION_THEME.unit[32],
                    md: FOUNDATION_THEME.unit[36],
                    lg: FOUNDATION_THEME.unit[52],
                },
                paddingX: {
                    sm: FOUNDATION_THEME.unit[14],
                    md: FOUNDATION_THEME.unit[14],
                    lg: FOUNDATION_THEME.unit[12],
                },
                paddingY: {
                    sm: FOUNDATION_THEME.unit[7],
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
                            color: foundationToken.colors.gray[400],
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
