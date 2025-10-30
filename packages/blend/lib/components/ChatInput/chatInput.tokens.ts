import { type BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'

/**
 * ChatInput Tokens following the pattern: [target].property.[state]
 *
 * Structure:
 * - container: Main chat input container
 * - textarea: Text input area
 * - filesContainer: File attachment display area
 * - bottomActions: Action buttons container
 * - overflowTag: "+X more" files button
 * - topQueries: Top queries section with header and items
 */
export type ChatInputTokensType = Readonly<{
    container: {
        backgroundColor: {
            default: string
            hover: string
            disabled: string
        }
        border: string
        borderRadius: string
        padding: string
        gap: string
        minHeight: string
        transition: string
    }

    textarea: {
        backgroundColor: string
        color: string
        fontSize: string
        lineHeight: string
        padding: string
        border: string
        borderRadius: string
        placeholder: {
            color: string
        }
        resize: string
        fontFamily: string
        minHeight: string
        overflowY: string
    }

    filesContainer: {
        gap: string
        padding: string
        maxHeight: string
        overflowY: string
    }

    bottomActions: {
        padding: string
        gap: string
        justifyContent: string
        marginTop: string
    }

    overflowTag: {
        backgroundColor: {
            default: string
            hover: string
            active: string
        }
        color: {
            default: string
            hover: string
            active: string
        }
        border: string
        borderRadius: string
        padding: string
        fontSize: string
        fontWeight: string
        gap: string
        transition: string
        cursor: string
    }

    topQueries: {
        container: {
            borderTop: string
            marginTop: string
            paddingTop: string
        }
        header: {
            color: string
            fontSize: string
            fontWeight: string
            padding: string
            margin: string
            textTransform: string
            backgroundColor: string
            flexShrink: string
        }
        scrollContainer: {
            overflowY: string
            maxHeightOffset: number
        }
        item: {
            backgroundColor: {
                default: string
                hover: string
                active: string
                disabled: string
            }
            color: {
                default: string
                hover: string
                active: string
                disabled: string
            }
            fontSize: string
            fontWeight: string
            padding: string
            border: string
            transition: string
            cursor: string
            opacity: {
                default: string
                disabled: string
            }
        }
    }
}>

export type ResponsiveChatInputTokensType = {
    [key in keyof BreakpointType]: ChatInputTokensType
}

export const getChatInputTokens = (
    foundationToken: FoundationTokenType
): ResponsiveChatInputTokensType => {
    return {
        sm: {
            container: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0] || '#ffffff',
                    hover: foundationToken.colors.gray[25] || '#f9fafb',
                    disabled: foundationToken.colors.gray[0] || '#ffffff',
                },
                border: `1px solid ${foundationToken.colors.gray[200] || '#e5e7eb'}`,
                borderRadius: `${foundationToken.unit?.[12] || 12}px`,
                padding: `${foundationToken.unit?.[12] || 12}px ${foundationToken.unit?.[12] || 12}px ${foundationToken.unit?.[8] || 8}px ${foundationToken.unit?.[12] || 12}px`,
                gap: `${foundationToken.unit?.[8] || 8}px`,
                minHeight: '52px',
                transition: 'background-color 0.2s ease',
            },

            textarea: {
                backgroundColor: 'transparent',
                color: foundationToken.colors.gray[900] || '#111827',
                fontSize: '16px',
                lineHeight: '1.5',
                padding: `${foundationToken.unit?.[0] || 0}px`,
                border: 'none',
                borderRadius: `${foundationToken.unit?.[0] || 0}px`,
                placeholder: {
                    color: foundationToken.colors.gray[400] || '#9ca3af',
                },
                resize: 'none',
                fontFamily: 'inherit',
                minHeight: '24px',
                overflowY: 'auto',
            },

            filesContainer: {
                gap: `${foundationToken.unit?.[8] || 8}px`,
                padding: `${foundationToken.unit?.[0] || 0}px ${foundationToken.unit?.[0] || 0}px ${foundationToken.unit?.[8] || 8}px ${foundationToken.unit?.[0] || 0}px`,
                maxHeight: '140px',
                overflowY: 'auto',
            },

            bottomActions: {
                padding: `${foundationToken.unit?.[0] || 0}px`,
                gap: `${foundationToken.unit?.[16] || 16}px`,
                justifyContent: 'space-between',
                marginTop: `${foundationToken.unit?.[16] || 16}px`,
            },

            overflowTag: {
                backgroundColor: {
                    default: foundationToken.colors.gray[100] || '#f3f4f6',
                    hover: foundationToken.colors.gray[200] || '#e5e7eb',
                    active: foundationToken.colors.gray[300] || '#d1d5db',
                },
                color: {
                    default: foundationToken.colors.gray[600] || '#4b5563',
                    hover: foundationToken.colors.gray[700] || '#374151',
                    active: foundationToken.colors.gray[700] || '#374151',
                },
                border: `1px solid ${foundationToken.colors.gray[200] || '#e5e7eb'}`,
                borderRadius: `${foundationToken.unit?.[4] || 4}px`,
                padding: `${foundationToken.unit?.[6] || 6}px ${foundationToken.unit?.[10] || 10}px`,
                fontSize: '14px',
                fontWeight: '500',
                gap: `${foundationToken.unit?.[4] || 4}px`,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            },

            topQueries: {
                container: {
                    borderTop: `1px solid ${foundationToken.colors.gray[200] || '#e5e7eb'}`,
                    marginTop: `${foundationToken.unit?.[16] || 16}px`,
                    paddingTop: `${foundationToken.unit?.[0] || 0}px`,
                },
                header: {
                    color: foundationToken.colors.gray[400] || '#9ca3af',
                    fontSize: `${foundationToken.font?.size?.body?.sm?.fontSize || '12'}px`,
                    fontWeight: '400',
                    padding: `${foundationToken.unit?.[16] || 16}px ${foundationToken.unit?.[8] || 8}px ${foundationToken.unit?.[6] || 6}px ${foundationToken.unit?.[8] || 8}px`,
                    margin: `${foundationToken.unit?.[0] || 0}px`,
                    textTransform: 'uppercase',
                    backgroundColor:
                        foundationToken.colors.gray[0] || '#ffffff',
                    flexShrink: '0',
                },
                scrollContainer: {
                    overflowY: 'auto',
                    maxHeightOffset: 40,
                },
                item: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50] || '#f9fafb',
                        active: foundationToken.colors.gray[100] || '#f3f4f6',
                        disabled: 'transparent',
                    },
                    color: {
                        default: foundationToken.colors.gray[600] || '#4b5563',
                        hover: foundationToken.colors.gray[700] || '#374151',
                        active: foundationToken.colors.gray[700] || '#374151',
                        disabled: foundationToken.colors.gray[400] || '#9ca3af',
                    },
                    fontSize: `${foundationToken.font?.size?.body?.md?.fontSize || '14'}px`,
                    fontWeight: '500',
                    padding: `${foundationToken.unit?.[6] || 6}px ${foundationToken.unit?.[8] || 8}px`,
                    border: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    opacity: {
                        default: '1',
                        disabled: '0.5',
                    },
                },
            },
        },

        lg: {
            container: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0] || '#ffffff',
                    hover: foundationToken.colors.gray[25] || '#f9fafb',
                    disabled: foundationToken.colors.gray[0] || '#ffffff',
                },
                border: `1px solid ${foundationToken.colors.gray[200] || '#e5e7eb'}`,
                borderRadius: `${foundationToken.unit?.[12] || 12}px`,
                padding: `${foundationToken.unit?.[12] || 12}px ${foundationToken.unit?.[12] || 12}px ${foundationToken.unit?.[8] || 8}px ${foundationToken.unit?.[12] || 12}px`,
                gap: `${foundationToken.unit?.[8] || 8}px`,
                minHeight: '52px',
                transition: 'background-color 0.2s ease',
            },

            textarea: {
                backgroundColor: 'transparent',
                color: foundationToken.colors.gray[900] || '#111827',
                fontSize: '16px',
                lineHeight: '1.5',
                padding: `${foundationToken.unit?.[0] || 0}px`,
                border: 'none',
                borderRadius: `${foundationToken.unit?.[0] || 0}px`,
                placeholder: {
                    color: foundationToken.colors.gray[400] || '#9ca3af',
                },
                resize: 'none',
                fontFamily: 'inherit',
                minHeight: '24px',
                overflowY: 'auto',
            },

            filesContainer: {
                gap: `${foundationToken.unit?.[8] || 8}px`,
                padding: `${foundationToken.unit?.[0] || 0}px ${foundationToken.unit?.[0] || 0}px ${foundationToken.unit?.[8] || 8}px ${foundationToken.unit?.[0] || 0}px`,
                maxHeight: '140px',
                overflowY: 'auto',
            },

            bottomActions: {
                padding: `${foundationToken.unit?.[0] || 0}px`,
                gap: `${foundationToken.unit?.[16] || 16}px`,
                justifyContent: 'space-between',
                marginTop: `${foundationToken.unit?.[16] || 16}px`,
            },

            overflowTag: {
                backgroundColor: {
                    default: foundationToken.colors.gray[100] || '#f3f4f6',
                    hover: foundationToken.colors.gray[200] || '#e5e7eb',
                    active: foundationToken.colors.gray[300] || '#d1d5db',
                },
                color: {
                    default: foundationToken.colors.gray[600] || '#4b5563',
                    hover: foundationToken.colors.gray[700] || '#374151',
                    active: foundationToken.colors.gray[700] || '#374151',
                },
                border: `1px solid ${foundationToken.colors.gray[200] || '#e5e7eb'}`,
                borderRadius: `${foundationToken.unit?.[4] || 4}px`,
                padding: `${foundationToken.unit?.[6] || 6}px ${foundationToken.unit?.[10] || 10}px`,
                fontSize: '14px',
                fontWeight: '500',
                gap: `${foundationToken.unit?.[4] || 4}px`,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            },

            topQueries: {
                container: {
                    borderTop: `1px solid ${foundationToken.colors.gray[200] || '#e5e7eb'}`,
                    marginTop: `${foundationToken.unit?.[16] || 16}px`,
                    paddingTop: `${foundationToken.unit?.[0] || 0}px`,
                },
                header: {
                    color: foundationToken.colors.gray[400] || '#9ca3af',
                    fontSize: `${foundationToken.font?.size?.body?.sm?.fontSize || '12'}px`,
                    fontWeight: '400',
                    padding: `${foundationToken.unit?.[16] || 16}px ${foundationToken.unit?.[8] || 8}px ${foundationToken.unit?.[6] || 6}px ${foundationToken.unit?.[8] || 8}px`,
                    margin: `${foundationToken.unit?.[0] || 0}px`,
                    textTransform: 'uppercase',
                    backgroundColor:
                        foundationToken.colors.gray[0] || '#ffffff',
                    flexShrink: '0',
                },
                scrollContainer: {
                    overflowY: 'auto',
                    maxHeightOffset: 40,
                },
                item: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50] || '#f9fafb',
                        active: foundationToken.colors.gray[100] || '#f3f4f6',
                        disabled: 'transparent',
                    },
                    color: {
                        default: foundationToken.colors.gray[600] || '#4b5563',
                        hover: foundationToken.colors.gray[700] || '#374151',
                        active: foundationToken.colors.gray[700] || '#374151',
                        disabled: foundationToken.colors.gray[400] || '#9ca3af',
                    },
                    fontSize: `${foundationToken.font?.size?.body?.md?.fontSize || '14'}px`,
                    fontWeight: '500',
                    padding: `${foundationToken.unit?.[6] || 6}px ${foundationToken.unit?.[8] || 8}px`,
                    border: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    opacity: {
                        default: '1',
                        disabled: '0.5',
                    },
                },
            },
        },
    }
}

export default getChatInputTokens
