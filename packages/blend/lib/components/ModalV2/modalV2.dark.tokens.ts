import { type FoundationTokenType } from '../../tokens/theme.token'
import { type ResponsiveModalV2Tokens } from './modalV2.tokens'

export const getModalV2DarkToken = (
    foundationToken: FoundationTokenType
): ResponsiveModalV2Tokens => {
    return {
        sm: {
            backgroundColor: foundationToken.colors.gray[700],
            paddingTop: foundationToken.unit[16],
            paddingRight: foundationToken.unit[16],
            paddingBottom: foundationToken.unit[16],
            paddingLeft: foundationToken.unit[16],
            boxShadow: foundationToken.shadows.xs,
            borderRadius: foundationToken.border.radius[16],
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                offset: foundationToken.unit[16],
            },
            dividerColor: foundationToken.colors.gray[200],
            skeleton: {
                header: {
                    gap: foundationToken.unit[16],
                    paddingTop: foundationToken.unit[20],
                    paddingRight: foundationToken.unit[20],
                    paddingBottom: foundationToken.unit[20],
                    paddingLeft: foundationToken.unit[20],
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                    width: '60%',
                    height: 24,
                    borderRadius: foundationToken.border.radius[4],
                },
                body: {
                    gap: foundationToken.unit[12],
                    width: '100%',
                    height: 300,
                    borderRadius: foundationToken.border.radius[4],
                },
            },
            header: {
                slot: {
                    gap: foundationToken.unit[8],
                },
                gap: foundationToken.unit[16],
                paddingTop: foundationToken.unit[16],
                paddingRight: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[16],
                paddingLeft: foundationToken.unit[16],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[700],
                borderTopLeftRadius: foundationToken.border.radius[16],
                borderTopRightRadius: foundationToken.border.radius[16],
                text: {
                    title: {
                        color: foundationToken.colors.gray[0],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        lineHeight: foundationToken.font.lineHeight[20],
                    },
                    subtitle: {
                        color: foundationToken.colors.gray[100],
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        lineHeight: foundationToken.font.lineHeight[20],
                    },
                },
            },

            body: {
                paddingTop: foundationToken.unit[16],
                paddingRight: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[16],
                paddingLeft: foundationToken.unit[16],
                backgroundColor: foundationToken.colors.gray[700],
            },

            footer: {
                paddingTop: foundationToken.unit[16],
                paddingRight: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[16],
                paddingLeft: foundationToken.unit[16],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[700],
                gap: foundationToken.unit[12],
            },
            closeButton: {
                color: foundationToken.colors.gray[100],
                width: foundationToken.unit[16],
                height: foundationToken.unit[16],
            },
        },
        lg: {
            backgroundColor: foundationToken.colors.gray[700],
            paddingTop: foundationToken.unit[16],
            paddingRight: foundationToken.unit[16],
            paddingBottom: foundationToken.unit[16],
            paddingLeft: foundationToken.unit[16],
            boxShadow: foundationToken.shadows.lg,
            borderRadius: foundationToken.border.radius[16],
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                offset: foundationToken.unit[16],
            },
            dividerColor: foundationToken.colors.gray[200],
            skeleton: {
                header: {
                    gap: foundationToken.unit[16],
                    paddingTop: foundationToken.unit[20],
                    paddingRight: foundationToken.unit[20],
                    paddingBottom: foundationToken.unit[20],
                    paddingLeft: foundationToken.unit[20],
                    borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                    width: '60%',
                    height: 24,
                    borderRadius: foundationToken.border.radius[4],
                },
                body: {
                    gap: foundationToken.unit[12],
                    width: '100%',
                    height: 300,
                    borderRadius: foundationToken.border.radius[4],
                },
            },
            header: {
                gap: foundationToken.unit[16],
                paddingTop: foundationToken.unit[20],
                paddingRight: foundationToken.unit[20],
                paddingBottom: foundationToken.unit[20],
                paddingLeft: foundationToken.unit[20],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[700],
                borderTopLeftRadius: foundationToken.border.radius[16],
                borderTopRightRadius: foundationToken.border.radius[16],
                slot: {
                    gap: foundationToken.unit[8],
                },
                text: {
                    title: {
                        color: foundationToken.colors.gray[0],
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        lineHeight: foundationToken.font.lineHeight[20],
                    },
                    subtitle: {
                        color: foundationToken.colors.gray[100],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        lineHeight: foundationToken.font.lineHeight[20],
                    },
                },
            },

            body: {
                paddingTop: foundationToken.unit[20],
                paddingRight: foundationToken.unit[20],
                paddingBottom: foundationToken.unit[20],
                paddingLeft: foundationToken.unit[20],
                backgroundColor: foundationToken.colors.gray[700],
            },

            footer: {
                paddingTop: foundationToken.unit[20],
                paddingRight: foundationToken.unit[20],
                paddingBottom: foundationToken.unit[20],
                paddingLeft: foundationToken.unit[20],
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                backgroundColor: foundationToken.colors.gray[700],
                gap: foundationToken.unit[16],
            },
            closeButton: {
                color: foundationToken.colors.gray[100],
                width: foundationToken.unit[16],
                height: foundationToken.unit[16],
            },
        },
    }
}
