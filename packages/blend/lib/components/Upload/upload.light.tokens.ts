import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveUploadTokens } from './upload.tokens.types'

export const getUploadLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveUploadTokens => {
    return {
        sm: {
            // Header section
            header: {
                label: {
                    text: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: String(foundationToken.colors.gray[700]),
                    },
                    marginBottom: foundationToken.unit[8],
                    gap: foundationToken.unit[2],
                },
                required: {
                    text: {
                        color: String(foundationToken.colors.red[500]),
                    },
                    gap: foundationToken.unit[8],
                },
                subLabel: {
                    text: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: String(foundationToken.colors.gray[400]),
                    },
                    gap: foundationToken.unit[8],
                },
                helpIcon: {
                    width: foundationToken.unit[16],
                    color: String(foundationToken.colors.gray[400]),
                },
            },

            // Container (upload box)
            container: {
                border: {
                    idle: `1px dashed ${foundationToken.colors.gray[200]}`,
                    uploading: `1px dashed ${foundationToken.colors.gray[200]}`,
                    success: `1px dashed ${foundationToken.colors.gray[200]}`,
                    error: `1px dashed ${foundationToken.colors.red[200]}`,
                    dragActive: `1px dashed ${foundationToken.colors.primary[500]}`,
                },
                backgroundColor: {
                    idle: foundationToken.colors.gray[0],
                    uploading: foundationToken.colors.gray[0],
                    success: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                    dragActive: foundationToken.colors.primary[50],
                },
                borderRadius: foundationToken.border.radius[12],
                padding: `${foundationToken.unit[24]} ${foundationToken.unit[32]}`,
                content: {
                    slot: {
                        width: foundationToken.unit[32],
                        gap: foundationToken.unit[16],
                    },
                    text: {
                        title: {
                            color: String(foundationToken.colors.gray[700]), // hardcoded filename color for uploading state
                            fontSize:
                                foundationToken.font.size.body.lg.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                        },
                        subtitle: {
                            color: String(foundationToken.colors.gray[500]),
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        gap: foundationToken.unit[4],
                    },
                    actionable: {
                        gap: foundationToken.unit[20],
                        errorText: {
                            color: String(foundationToken.colors.red[500]),
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                },
            },
        },

        lg: {
            // Header section
            header: {
                label: {
                    text: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: String(foundationToken.colors.gray[700]),
                    },
                    marginBottom: foundationToken.unit[8],
                    gap: foundationToken.unit[2],
                },
                required: {
                    text: {
                        color: String(foundationToken.colors.red[500]),
                    },
                    gap: foundationToken.unit[8],
                },
                subLabel: {
                    text: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: String(foundationToken.colors.gray[400]),
                    },
                    gap: foundationToken.unit[8],
                },
                helpIcon: {
                    width: foundationToken.unit[16],
                    color: String(foundationToken.colors.gray[400]),
                },
            },

            // Container (upload box)
            container: {
                border: {
                    idle: `1px dashed ${foundationToken.colors.gray[200]}`,
                    uploading: `1px dashed ${foundationToken.colors.gray[200]}`,
                    success: `1px dashed ${foundationToken.colors.gray[200]}`,
                    error: `1px dashed ${foundationToken.colors.red[200]}`,
                    dragActive: `1px dashed ${foundationToken.colors.primary[500]}`,
                },
                backgroundColor: {
                    idle: foundationToken.colors.gray[0],
                    uploading: foundationToken.colors.gray[0],
                    success: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                    dragActive: foundationToken.colors.primary[50],
                },
                borderRadius: foundationToken.border.radius[12],
                padding: `${foundationToken.unit[32]} ${foundationToken.unit[40]}`,
                content: {
                    slot: {
                        width: foundationToken.unit[32],
                        gap: foundationToken.unit[20],
                    },
                    text: {
                        title: {
                            color: String(foundationToken.colors.gray[700]), // hardcoded filename color for uploading state
                            fontSize:
                                foundationToken.font.size.body.lg.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                        },
                        subtitle: {
                            color: String(foundationToken.colors.gray[500]),
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        gap: foundationToken.unit[4],
                    },
                    actionable: {
                        gap: foundationToken.unit[24],
                        errorText: {
                            color: String(foundationToken.colors.red[500]),
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                },
            },
        },
    }
}
