//card.tokens.ts

import type { CSSObject } from 'styled-components'
import { CardVariant, CardAlignment } from './types'
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

    // Header box styling (gray 25 background)
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
            marginLeft: CSSObject['marginLeft']
        }
        subHeader: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
            marginTop: CSSObject['marginTop']
        }
    }

    // Body content styling
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

    // Spacing configuration
    spacing: {
        headerToSubHeader: CSSObject['marginTop']
        subHeaderToBody: CSSObject['marginTop']
        bodySlot1ToTitle: CSSObject['marginTop']
        titleToContent: CSSObject['marginTop']
        contentToBodySlot2: CSSObject['marginTop']
        bodySlot2ToAction: CSSObject['marginTop']
        actionInline: CSSObject['marginTop']
        actionRegular: CSSObject['marginTop']
        headerSlotSpacing: CSSObject['gap']
    }

    // Alignment variants
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
                    marginLeft: foundationToken.unit[8],
                },
                subHeader: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[500],
                    marginTop: foundationToken.unit[2],
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
                headerToSubHeader: foundationToken.unit[4],
                subHeaderToBody: foundationToken.unit[16],
                bodySlot1ToTitle: foundationToken.unit[14],
                titleToContent: foundationToken.unit[6],
                contentToBodySlot2: foundationToken.unit[14],
                bodySlot2ToAction: foundationToken.unit[14],
                actionInline: foundationToken.unit[14],
                actionRegular: foundationToken.unit[24],
                headerSlotSpacing: foundationToken.unit[8],
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
                    marginLeft: foundationToken.unit[8],
                },
                subHeader: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[500],
                    marginTop: foundationToken.unit[2],
                },
            },

            body: {
                padding: foundationToken.unit[20],
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
                headerToSubHeader: foundationToken.unit[4],
                subHeaderToBody: foundationToken.unit[16],
                bodySlot1ToTitle: foundationToken.unit[14],
                titleToContent: foundationToken.unit[6],
                contentToBodySlot2: foundationToken.unit[14],
                bodySlot2ToAction: foundationToken.unit[14],
                actionInline: foundationToken.unit[14],
                actionRegular: foundationToken.unit[24],
                headerSlotSpacing: foundationToken.unit[8],
            },

            alignment: {
                vertical: {
                    padding: foundationToken.unit[16],
                    gap: foundationToken.unit[0],
                    // minHeight: '284px',
                },
                horizontal: {
                    padding: foundationToken.unit[20],
                    gap: foundationToken.unit[20],
                },
            },
        },
    }
}
