import type { CSSObject } from 'styled-components'
import { CardAlignment } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type CardState = 'default' | 'hover'

export type CardTokenType = {
    maxWidth: CSSObject['maxWidth']
    borderRadius: CSSObject['borderRadius']
    boxShadow: CSSObject['boxShadow']
    padding: CSSObject['padding']
    border: CSSObject['border']
    backgroundColor: CSSObject['backgroundColor']

    header: {
        backgroundColor: CSSObject['backgroundColor']
        padding: CSSObject['padding']
        borderBottom: CSSObject['borderBottom']
        borderRadius: CSSObject['borderRadius']
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        tag: {
            gap: CSSObject['gap']
        }
        subHeader: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }

    body: {
        padding: CSSObject['padding']
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        content: {
            fontSize: CSSObject['fontSize']
            color: CSSObject['color']
        }
    }

    spacing: {
        header: {
            subHeader: {
                marginTop: CSSObject['marginTop']
            }
        }
        body: {
            slot1: {
                marginTop: CSSObject['marginTop']
            }
            title: {
                marginTop: CSSObject['marginTop']
            }
            content: {
                marginTop: CSSObject['marginTop']
            }
            slot2: {
                marginTop: CSSObject['marginTop']
            }
        }
        action: {
            inline: {
                marginTop: CSSObject['marginTop']
            }
            regular: {
                marginTop: CSSObject['marginTop']
            }
        }
        headerSlot: {
            gap: CSSObject['gap']
        }
    }

    alignment: {
        [key in CardAlignment]: {
            padding: CSSObject['padding']
            gap: CSSObject['gap']
            minHeight?: CSSObject['minHeight']
        }
    }
}

export type ResponsiveCardTokens = {
    [key in keyof BreakpointType]: CardTokenType
}

export const getCardTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCardTokens => {
    return {
        sm: {
            maxWidth: 'auto',
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[12],
            backgroundColor: foundationToken.colors.gray[0],
            boxShadow: foundationToken.shadows.sm,
            padding: foundationToken.unit[16],

            header: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: `${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]} 0 0`,
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[800],
                },
                tag: {
                    gap: foundationToken.unit[8],
                },
                subHeader: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[500],
                },
            },

            body: {
                padding: foundationToken.unit[16],
                title: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: foundationToken.colors.gray[800],
                },
                content: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    color: foundationToken.colors.gray[500],
                },
            },

            spacing: {
                header: {
                    subHeader: {
                        marginTop: foundationToken.unit[2],
                    },
                },
                body: {
                    slot1: {
                        marginTop: foundationToken.unit[16],
                    },
                    title: {
                        marginTop: foundationToken.unit[14],
                    },
                    content: {
                        marginTop: foundationToken.unit[6],
                    },
                    slot2: {
                        marginTop: foundationToken.unit[14],
                    },
                },
                action: {
                    inline: {
                        marginTop: foundationToken.unit[14],
                    },
                    regular: {
                        marginTop: foundationToken.unit[24],
                    },
                },
                headerSlot: {
                    gap: foundationToken.unit[8],
                },
            },

            alignment: {
                vertical: {
                    padding: foundationToken.unit[16],
                    gap: foundationToken.unit[0],
                },
                horizontal: {
                    padding: foundationToken.unit[16],
                    gap: foundationToken.unit[16],
                },
            },
        },
        lg: {
            maxWidth: 'auto',
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[12],
            backgroundColor: foundationToken.colors.gray[0],
            boxShadow: foundationToken.shadows.sm,
            padding: foundationToken.unit[16],

            header: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: `${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]} 0 0`,
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[800],
                },
                tag: {
                    gap: foundationToken.unit[8],
                },
                subHeader: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[500],
                },
            },

            body: {
                padding: foundationToken.unit[16],
                title: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: foundationToken.colors.gray[800],
                },
                content: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    color: foundationToken.colors.gray[500],
                },
            },

            spacing: {
                header: {
                    subHeader: {
                        marginTop: foundationToken.unit[2],
                    },
                },
                body: {
                    slot1: {
                        marginTop: foundationToken.unit[16],
                    },
                    title: {
                        marginTop: foundationToken.unit[14],
                    },
                    content: {
                        marginTop: foundationToken.unit[6],
                    },
                    slot2: {
                        marginTop: foundationToken.unit[14],
                    },
                },
                action: {
                    inline: {
                        marginTop: foundationToken.unit[14],
                    },
                    regular: {
                        marginTop: foundationToken.unit[24],
                    },
                },
                headerSlot: {
                    gap: foundationToken.unit[8],
                },
            },

            alignment: {
                vertical: {
                    padding: foundationToken.unit[16],
                    gap: foundationToken.unit[0],
                },
                horizontal: {
                    padding: foundationToken.unit[20],
                    gap: foundationToken.unit[20],
                },
            },
        },
    }
}
