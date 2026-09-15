import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveModalTokens } from './modal.tokens.types'

export const getModalLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveModalTokens => {
    return {
        sm: {
            // Container properties
            boxShadow: foundationToken.shadows.xs,
            borderRadius: foundationToken.border.radius[12],
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            // Header properties
            header: {
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                // borderRadius: foundationToken.border.radius[12],
                backgroundColor: foundationToken.colors.gray[0],

                text: {
                    title: {
                        color: foundationToken.colors.gray[700],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                    },
                    subtitle: {
                        color: foundationToken.colors.gray[600],
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                    },
                },
            },

            // Body properties
            body: {
                padding: foundationToken.unit[16],
                backgroundColor: foundationToken.colors.gray[0],
            },

            // Footer properties
            footer: {
                padding: foundationToken.unit[16],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[0],
                gap: foundationToken.unit[12],
            },
            closeButton: {
                color: foundationToken.colors.gray[500], // default color
            },
        },
        lg: {
            // Container properties
            boxShadow: foundationToken.shadows.lg,
            borderRadius: foundationToken.border.radius[16],
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            // Header properties
            header: {
                padding: {
                    x: foundationToken.unit[20],
                    y: foundationToken.unit[20],
                },
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[0],

                text: {
                    title: {
                        color: foundationToken.colors.gray[700],
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                    },
                    subtitle: {
                        color: foundationToken.colors.gray[600],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                    },
                },
            },

            // Body properties
            body: {
                padding: foundationToken.unit[20],
                backgroundColor: foundationToken.colors.gray[0],
            },

            // Footer properties
            footer: {
                padding: foundationToken.unit[20],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[0],
                gap: foundationToken.unit[16],
            },
            closeButton: {
                color: foundationToken.colors.gray[500], // default color
            },
        },
    }
}
