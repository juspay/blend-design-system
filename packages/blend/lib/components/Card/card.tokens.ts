//card.tokens.ts

import type { CSSObject } from 'styled-components'
import { CardHeaderVariant } from './types'
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
                marginBottom: CSSObject['marginBottom']
            }
        }
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
            marginBottom: CSSObject['marginBottom']
        }
        subtitle: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        actions: {
            gap: CSSObject['gap']
        }
    }
    content: {
        padding: CSSObject['padding']
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
                        marginBottom: foundationToken.unit[12],
                    },
                    bordered: {
                        padding: `0 0 ${foundationToken.unit[12]} 0`,
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                        backgroundColor: 'transparent',
                        marginBottom: foundationToken.unit[12],
                    },
                    elevated: {
                        padding: foundationToken.unit[16],
                        borderBottom: 'none',
                        backgroundColor: foundationToken.colors.gray[50],
                        marginBottom: foundationToken.unit[0],
                    },
                },
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[900],
                    marginBottom: foundationToken.unit[4],
                },
                subtitle: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[600],
                },
                actions: {
                    gap: foundationToken.unit[8],
                },
            },
            content: {
                padding: foundationToken.unit[0],
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
                        padding: `0 0 ${foundationToken.unit[16]} 0`,
                        borderBottom: 'none',
                        backgroundColor: 'transparent',
                        marginBottom: foundationToken.unit[16],
                    },
                    bordered: {
                        padding: `0 0 ${foundationToken.unit[16]} 0`,
                        borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                        backgroundColor: 'transparent',
                        marginBottom: foundationToken.unit[16],
                    },
                    elevated: {
                        padding: foundationToken.unit[20],
                        borderBottom: 'none',
                        backgroundColor: foundationToken.colors.gray[50],
                        marginBottom: foundationToken.unit[0],
                    },
                },
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[900],
                    marginBottom: foundationToken.unit[4],
                },
                subtitle: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[600],
                },
                actions: {
                    gap: foundationToken.unit[12],
                },
            },
            content: {
                padding: foundationToken.unit[0],
            },
        },
    }
}
