//card.tokens.ts

import type { CSSObject } from 'styled-components'
import { CardHeaderVariant, CardSlotVariant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type CardState = 'default' | 'hover'

export type CardTokenType = {
    maxWidth: CSSObject['maxWidth']
    border: {
        [key in CardState]?: CSSObject['border']
    }
    borderRadius: CSSObject['borderRadius']
    backgroundColor: {
        [key in CardState]?: CSSObject['backgroundColor']
    }
    boxShadow: CSSObject['boxShadow']
    padding: CSSObject['padding']
    gap: CSSObject['gap']
    header: {
        variants: {
            [key in CardHeaderVariant]: {
                padding: CSSObject['padding']
                borderBottom: CSSObject['borderBottom']
                backgroundColor: CSSObject['backgroundColor']
            }
        }
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        subtitle: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        actions: {
            gap: CSSObject['gap']
        }
        label: {
            marginLeft: CSSObject['marginLeft']
        }
    }
    content: {
        padding: CSSObject['padding']
    }
    slot: {
        variants: {
            [key in CardSlotVariant]: {
                padding: CSSObject['padding']
                gap: CSSObject['gap']
                height: CSSObject['height']
                borderRadius: CSSObject['borderRadius']
                overflow: CSSObject['overflow']
            }
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
            border: {
                default: `1px solid ${foundationToken.colors.gray[200]}`,
                hover: `1px solid ${foundationToken.colors.gray[300]}`,
            },
            borderRadius: foundationToken.border.radius[12],
            backgroundColor: {
                default: foundationToken.colors.gray[0],
                hover: foundationToken.colors.gray[25],
            },
            boxShadow: foundationToken.shadows.sm,
            padding: foundationToken.unit[16],
            gap: foundationToken.unit[16],
            header: {
                variants: {
                    default: {
                        padding: `0 0 ${foundationToken.unit[12]} 0`,
                        borderBottom: 'none',
                        backgroundColor: 'transparent',
                    },
                    bordered: {
                        padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                        backgroundColor: foundationToken.colors.gray[25],
                    },
                    bordered_with_label: {
                        padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                        backgroundColor: foundationToken.colors.gray[25],
                    },
                },
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[900],
                },
                subtitle: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[600],
                },
                actions: {
                    gap: foundationToken.unit[8],
                },
                label: {
                    marginLeft: foundationToken.unit[8],
                },
            },
            content: {
                padding: foundationToken.unit[0],
            },
            slot: {
                variants: {
                    top: {
                        padding: foundationToken.unit[0],
                        gap: foundationToken.unit[0],
                        height: '50%',
                        borderRadius: `${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]} 0 0`,
                        overflow: 'hidden',
                    },
                    top_with_padding: {
                        padding: foundationToken.unit[16],
                        gap: foundationToken.unit[0],
                        height: '50%',
                        borderRadius: `${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]} 0 0`,
                        overflow: 'hidden',
                    },
                    left: {
                        padding: foundationToken.unit[0],
                        gap: foundationToken.unit[16],
                        height: 'auto',
                        borderRadius: foundationToken.unit[0],
                        overflow: 'visible',
                    },
                },
            },
        },
        lg: {
            maxWidth: 'auto',
            border: {
                default: `1px solid ${foundationToken.colors.gray[200]}`,
                hover: `1px solid ${foundationToken.colors.gray[300]}`,
            },
            borderRadius: foundationToken.border.radius[12],
            backgroundColor: {
                default: foundationToken.colors.gray[0],
                hover: foundationToken.colors.gray[25],
            },
            boxShadow: foundationToken.shadows.sm,
            padding: foundationToken.unit[20],
            gap: foundationToken.unit[20],
            header: {
                variants: {
                    default: {
                        padding: `0 0 ${foundationToken.unit[12]} 0`,
                        borderBottom: 'none',
                        backgroundColor: 'transparent',
                    },
                    bordered: {
                        padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                        backgroundColor: foundationToken.colors.gray[25],
                    },
                    bordered_with_label: {
                        padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                        backgroundColor: foundationToken.colors.gray[25],
                    },
                },
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[900],
                },
                subtitle: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[600],
                },
                actions: {
                    gap: foundationToken.unit[12],
                },
                label: {
                    marginLeft: foundationToken.unit[12],
                },
            },
            content: {
                padding: foundationToken.unit[0],
            },
            slot: {
                variants: {
                    top: {
                        padding: foundationToken.unit[0],
                        gap: foundationToken.unit[0],
                        height: '50%',
                        borderRadius: `${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]} 0 0`,
                        overflow: 'hidden',
                    },
                    top_with_padding: {
                        padding: foundationToken.unit[20],
                        gap: foundationToken.unit[0],
                        height: '50%',
                        borderRadius: `${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]} 0 0`,
                        overflow: 'hidden',
                    },
                    left: {
                        padding: foundationToken.unit[0],
                        gap: foundationToken.unit[20],
                        height: 'auto',
                        borderRadius: foundationToken.unit[0],
                        overflow: 'visible',
                    },
                },
            },
        },
    }
}
