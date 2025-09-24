import type { CSSObject } from 'styled-components'
import { MenuItemActionType, MenuItemVariant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'

export type MenuItemStates =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'

export type MenuTokensType = {
    boxShadow: CSSObject['boxShadow']
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
        backgroundColor: {
            [MenuItemVariant.DEFAULT]: {
                enabled: {
                    [key in MenuItemStates]: CSSObject['backgroundColor']
                }
                disabled: {
                    [key in MenuItemStates]: CSSObject['backgroundColor']
                }
            }
            [MenuItemVariant.ACTION]: {
                [key in MenuItemActionType]: {
                    enabled: {
                        [key in MenuItemStates]: CSSObject['backgroundColor']
                    }
                    disabled: {
                        [key in MenuItemStates]: CSSObject['backgroundColor']
                    }
                }
            }
        }
        // cursor: CSSObject['cursor']
        gap: CSSObject['gap']
        label: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: {
                [MenuItemVariant.DEFAULT]: {
                    enabled: {
                        [key in MenuItemStates]: CSSObject['color']
                    }
                    disabled: {
                        [key in MenuItemStates]: CSSObject['color']
                    }
                }
                [MenuItemVariant.ACTION]: {
                    [key in MenuItemActionType]: {
                        enabled: {
                            [key in MenuItemStates]: CSSObject['color']
                        }
                        disabled: {
                            [key in MenuItemStates]: CSSObject['color']
                        }
                    }
                }
            }
        }
        subLabel: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: {
                [MenuItemVariant.DEFAULT]: {
                    enabled: {
                        [key in MenuItemStates]: CSSObject['color']
                    }
                    disabled: {
                        [key in MenuItemStates]: CSSObject['color']
                    }
                }
                [MenuItemVariant.ACTION]: {
                    [key in MenuItemActionType]: {
                        enabled: {
                            [key in MenuItemStates]: CSSObject['color']
                        }
                        disabled: {
                            [key in MenuItemStates]: CSSObject['color']
                        }
                    }
                }
            }
        }
    }
    seperator: {
        color: CSSObject['color']
        height: CSSObject['height']
        margin: CSSObject['margin']
    }
}

export type ResponsiveMenuTokensType = {
    [key in keyof BreakpointType]: MenuTokensType
}

export const getMenuTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMenuTokensType => {
    return {
        sm: {
            boxShadow: foundationToken.shadows.md,
            backgroundColor: foundationToken.colors.gray[0],
            paddingTop: foundationToken.unit[6],
            paddingBottom: foundationToken.unit[6],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            outline: 'none',
            borderRadius: foundationToken.unit[8],
            item: {
                padding: `${foundationToken.unit[8]} ${foundationToken.unit[8]}`,
                margin: `${foundationToken.unit[0]} ${foundationToken.unit[4]}`,
                borderRadius: foundationToken.unit[4],
                // cursor: 'pointer',
                backgroundColor: {
                    default: {
                        enabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[50],
                            active: foundationToken.colors.gray[50],
                            focus: foundationToken.colors.gray[50],
                            focusVisible: foundationToken.colors.gray[50],
                            disabled: foundationToken.colors.gray[0],
                        },
                        disabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            focus: foundationToken.colors.gray[0],
                            focusVisible: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },
                    action: {
                        primary: {
                            enabled: {
                                default: foundationToken.colors.primary[0],
                                hover: foundationToken.colors.primary[50],
                                active: foundationToken.colors.primary[50],
                                focus: foundationToken.colors.primary[50],
                                focusVisible:
                                    foundationToken.colors.primary[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                        danger: {
                            enabled: {
                                default: foundationToken.colors.red[0],
                                hover: foundationToken.colors.red[50],
                                active: foundationToken.colors.red[50],
                                focus: foundationToken.colors.red[50],
                                focusVisible: foundationToken.colors.red[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                    },
                },
                gap: 4,
                label: {
                    fontSize: 14,
                    fontWeight: 500,
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[600],
                                hover: foundationToken.colors.gray[600],
                                active: foundationToken.colors.gray[600],
                                focus: foundationToken.colors.gray[600],
                                focusVisible: foundationToken.colors.gray[600],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[600],
                                    hover: foundationToken.colors.primary[600],
                                    active: foundationToken.colors.primary[600],
                                    focus: foundationToken.colors.primary[600],
                                    focusVisible:
                                        foundationToken.colors.primary[600],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[600],
                                    hover: foundationToken.colors.red[600],
                                    active: foundationToken.colors.red[600],
                                    focus: foundationToken.colors.red[600],
                                    focusVisible:
                                        foundationToken.colors.red[600],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
                subLabel: {
                    fontSize: 12,
                    fontWeight: 400,
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
            },
            seperator: {
                color: foundationToken.colors.gray[200],
                height: 1,
                margin: `${foundationToken.unit[6]} 0`,
            },
        },
        lg: {
            boxShadow: foundationToken.shadows.md,
            backgroundColor: foundationToken.colors.gray[0],
            paddingTop: foundationToken.unit[6],
            paddingBottom: foundationToken.unit[6],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            outline: 'none',
            borderRadius: foundationToken.unit[8],
            item: {
                padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                margin: `${foundationToken.unit[0]} ${foundationToken.unit[4]}`,
                borderRadius: foundationToken.unit[4],
                // cursor: 'pointer',
                backgroundColor: {
                    default: {
                        enabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[50],
                            active: foundationToken.colors.gray[50],
                            focus: foundationToken.colors.gray[50],
                            focusVisible: foundationToken.colors.gray[50],
                            disabled: foundationToken.colors.gray[0],
                        },
                        disabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            focus: foundationToken.colors.gray[0],
                            focusVisible: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },
                    action: {
                        primary: {
                            enabled: {
                                default: foundationToken.colors.primary[0],
                                hover: foundationToken.colors.primary[50],
                                active: foundationToken.colors.primary[50],
                                focus: foundationToken.colors.primary[50],
                                focusVisible:
                                    foundationToken.colors.primary[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                        danger: {
                            enabled: {
                                default: foundationToken.colors.red[0],
                                hover: foundationToken.colors.red[50],
                                active: foundationToken.colors.red[50],
                                focus: foundationToken.colors.red[50],
                                focusVisible: foundationToken.colors.red[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                    },
                },
                gap: 4,
                label: {
                    fontSize: 14,
                    fontWeight: 500,
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[600],
                                hover: foundationToken.colors.gray[600],
                                active: foundationToken.colors.gray[600],
                                focus: foundationToken.colors.gray[600],
                                focusVisible: foundationToken.colors.gray[600],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[600],
                                    hover: foundationToken.colors.primary[600],
                                    active: foundationToken.colors.primary[600],
                                    focus: foundationToken.colors.primary[600],
                                    focusVisible:
                                        foundationToken.colors.primary[600],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[600],
                                    hover: foundationToken.colors.red[600],
                                    active: foundationToken.colors.red[600],
                                    focus: foundationToken.colors.red[600],
                                    focusVisible:
                                        foundationToken.colors.red[600],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
                subLabel: {
                    fontSize: 12,
                    fontWeight: 400,
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
            },
            seperator: {
                color: foundationToken.colors.gray[200],
                height: 1,
                margin: `${foundationToken.unit[6]} 0`,
            },
        },
    }
}
