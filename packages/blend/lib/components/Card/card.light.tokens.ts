import type { FoundationTokenType } from '../../tokens/theme.token'
import { CardVariant } from './types'
import type { ResponsiveCardTokens } from './card.tokens.types'

export const getCardLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCardTokens => {
    return {
        sm: {
            // Base properties (shared)
            maxWidth: 'auto',
            borderRadius: foundationToken.border.radius[12],
            border: `1px solid ${foundationToken.colors.gray[200]}`,

            boxShadow: foundationToken.shadows.sm,
            backgroundColor: foundationToken.colors.gray[0],
            padding: {
                [CardVariant.DEFAULT]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.ALIGNED]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.CUSTOM]: undefined,
            },

            // Header section
            header: {
                [CardVariant.DEFAULT]: {
                    backgroundColor: foundationToken.colors.gray[25],
                    padding: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[12],
                    },
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                [CardVariant.ALIGNED]: undefined,
                [CardVariant.CUSTOM]: undefined,
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[800],
                        gap: foundationToken.unit[8],
                    },
                    subTitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[500],
                    },
                    gap: foundationToken.unit[2], // Gap between title and subtitle
                },
            },

            // Body section
            body: {
                padding: {
                    [CardVariant.DEFAULT]: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[16],
                    },
                    [CardVariant.ALIGNED]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[16],
                    [CardVariant.ALIGNED]: foundationToken.unit[16],
                    [CardVariant.CUSTOM]: foundationToken.unit[16],
                },
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[800],
                    },
                    content: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        color: foundationToken.colors.gray[500],
                        fontWeight: foundationToken.font.weight[400],
                    },
                    gap: foundationToken.unit[6],
                },
                actions: {
                    gap: foundationToken.unit[14], // Base gap for actions (14px)
                    centerAlignGap: foundationToken.unit[24], // Gap for center-aligned cards (24px)
                },
                alignment: {
                    [CardVariant.ALIGNED]: {
                        cardSlot: {
                            vertical: {
                                marginBottom: foundationToken.unit[16],
                                minHeight: '142px',
                            },
                            horizontal: {
                                marginRight: foundationToken.unit[16],
                                width: foundationToken.unit[92],
                                height: foundationToken.unit[92],
                                // flexShrink: 0,
                            },
                        },
                        // centerAlign: {
                        //     textAlign: 'center',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        // },
                        // content: {
                        //     flex: '1',
                        // },
                    },
                    [CardVariant.DEFAULT]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
            },
        },

        lg: {
            // Base properties (shared)
            maxWidth: 'auto',
            borderRadius: foundationToken.border.radius[12],
            border: `1px solid ${foundationToken.colors.gray[200]}`,

            boxShadow: foundationToken.shadows.sm,
            backgroundColor: foundationToken.colors.gray[0],
            padding: {
                [CardVariant.DEFAULT]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.ALIGNED]: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                [CardVariant.CUSTOM]: undefined,
            },

            // Header section
            header: {
                [CardVariant.DEFAULT]: {
                    backgroundColor: foundationToken.colors.gray[25],
                    padding: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[12],
                    },
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                [CardVariant.ALIGNED]: undefined,
                [CardVariant.CUSTOM]: undefined,
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[800],
                        gap: foundationToken.unit[8],
                    },
                    subTitle: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[500],
                    },
                    gap: foundationToken.unit[2], // Gap between title and subtitle
                },
            },

            // Body section
            body: {
                padding: {
                    [CardVariant.DEFAULT]: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[16],
                    },
                    [CardVariant.ALIGNED]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
                gap: {
                    [CardVariant.DEFAULT]: foundationToken.unit[16],
                    [CardVariant.ALIGNED]: foundationToken.unit[16],
                    [CardVariant.CUSTOM]: foundationToken.unit[16],
                },
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: foundationToken.colors.gray[800],
                    },
                    content: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        color: foundationToken.colors.gray[500],
                        fontWeight: foundationToken.font.weight[400],
                    },
                    gap: foundationToken.unit[6],
                },
                actions: {
                    gap: foundationToken.unit[14], // Base gap for actions (14px)
                    centerAlignGap: foundationToken.unit[24], // Gap for center-aligned cards (24px)
                },
                alignment: {
                    [CardVariant.ALIGNED]: {
                        cardSlot: {
                            vertical: {
                                marginBottom: foundationToken.unit[16],
                                minHeight: '142px',
                            },
                            horizontal: {
                                marginRight: foundationToken.unit[16],
                                width: foundationToken.unit[92],
                                height: foundationToken.unit[92],
                                // flexShrink: 0,
                            },
                        },
                        // centerAlign: {
                        //     textAlign: 'center',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        // },
                        // content: {
                        //     flex: '1',
                        // },
                    },
                    [CardVariant.DEFAULT]: undefined,
                    [CardVariant.CUSTOM]: undefined,
                },
            },
        },
    }
}
