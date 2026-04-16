import { FoundationTokenType } from '../../../tokens/theme.token'
import { InputStateV2 } from '../inputV2.types'
import { ResponsiveChatInputV2TokensType } from './ChatInputV2.tokens'

export const getChatInputV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveChatInputV2TokensType => {
    return {
        sm: {
            container: {
                attachedFilesContainer: {
                    gap: foundationToken.unit[5],
                    overflowMenu: {
                        gap: foundationToken.unit[5],
                        backgroundColor: {
                            [InputStateV2.DEFAULT]:
                                foundationToken.colors.gray[25],
                            [InputStateV2.HOVER]:
                                foundationToken.colors.gray[25],
                            [InputStateV2.FOCUS]:
                                foundationToken.colors.gray[0],
                            [InputStateV2.ERROR]:
                                foundationToken.colors.gray[0],
                            [InputStateV2.DISABLED]:
                                foundationToken.colors.gray[0],
                        },
                        borderRadius: foundationToken.unit[12],
                        padding: foundationToken.unit[5],
                        top: foundationToken.unit[30],
                        right: 0,
                    },
                },
                backgroundColor: {
                    [InputStateV2.DEFAULT]: foundationToken.colors.gray[25],
                    [InputStateV2.HOVER]: foundationToken.colors.gray[25],
                    [InputStateV2.FOCUS]: foundationToken.colors.gray[0],
                    [InputStateV2.ERROR]: foundationToken.colors.gray[0],
                    [InputStateV2.DISABLED]: foundationToken.colors.gray[0],
                },
                borderRadius: foundationToken.unit[100],
                border: {
                    [InputStateV2.DEFAULT]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.HOVER]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.FOCUS]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.ERROR]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.DISABLED]: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                gap: foundationToken.unit[8],
                paddingTop: foundationToken.unit[5],
                paddingRight: foundationToken.unit[5],
                paddingBottom: foundationToken.unit[5],
                paddingLeft: foundationToken.unit[5],
                attachmentContainer: {
                    gap: foundationToken.unit[8],
                    width: foundationToken.unit[100],
                },
                slot: {
                    backgroundColor: foundationToken.colors.gray[0],
                    borderRadius: foundationToken.unit[100],
                    border: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                inputContainer: {
                    outline: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: 'none',
                        [InputStateV2.FOCUS]: `inset 0 0 0 3px ${foundationToken.colors.primary[500]}`,
                        [InputStateV2.ERROR]: 'none',
                        [InputStateV2.DISABLED]: 'none',
                    },
                    gap: foundationToken.unit[8],
                    borderRadius: foundationToken.unit[100],
                    paddingTop: foundationToken.unit[16],
                    paddingRight: foundationToken.unit[12],
                    paddingBottom: foundationToken.unit[16],
                    paddingLeft: foundationToken.unit[12],
                    border: `1px solid ${foundationToken.colors.gray[200]}`,
                    boxShadow: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.FOCUS]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.ERROR]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.DISABLED]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                    },
                    backgroundColor: foundationToken.colors.gray[0],
                    input: {
                        placeholder: foundationToken.colors.gray[400],
                        color: foundationToken.colors.gray[700],
                        paddingTop: foundationToken.unit[14],
                        paddingRight: foundationToken.unit[16],
                        paddingLeft: foundationToken.unit[16],
                        minHeight: foundationToken.unit[48],
                        maxHeight: foundationToken.unit[150],
                    },
                    slotContainer: {
                        paddingRight: foundationToken.unit[16],
                        paddingBottom: foundationToken.unit[14],
                        paddingLeft: foundationToken.unit[16],
                    },
                    topQueriesContainer: {
                        marginRight: foundationToken.unit[16],
                        marginLeft: foundationToken.unit[16],
                        paddingTop: foundationToken.unit[14],
                        paddingRight: foundationToken.unit[16],
                        paddingBottom: foundationToken.unit[14],
                        paddingLeft: foundationToken.unit[16],
                        borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                        header: {
                            color: foundationToken.colors.gray[400],
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            paddingTop: foundationToken.unit[6],
                            paddingRight: foundationToken.unit[6],
                            paddingBottom: foundationToken.unit[6],
                            paddingLeft: foundationToken.unit[6],
                            backgroundColor: foundationToken.colors.gray[0],
                        },
                        item: {
                            backgroundColor: {
                                default: 'transparent',
                                hover: foundationToken.colors.gray[50],
                                focus: foundationToken.colors.gray[100],
                                disabled: 'transparent',
                                error: 'transparent',
                            },
                            color: {
                                default: foundationToken.colors.gray[600],
                                hover: foundationToken.colors.gray[700],
                                focus: foundationToken.colors.gray[700],
                                disabled: foundationToken.colors.gray[400],
                                error: foundationToken.colors.red[400],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: '500',
                            paddingTop: foundationToken.unit[16],
                            paddingRight: foundationToken.unit[16],
                            paddingBottom: foundationToken.unit[16],
                            paddingLeft: foundationToken.unit[16],
                            border: 'none',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            opacity: {
                                default: '1',
                                disabled: '0.5',
                                error: '0.5',
                                focus: '1',
                                hover: '1',
                            },
                        },
                    },
                },
            },
        },

        lg: {
            container: {
                attachedFilesContainer: {
                    gap: foundationToken.unit[5],
                    overflowMenu: {
                        gap: foundationToken.unit[5],
                        backgroundColor: {
                            [InputStateV2.DEFAULT]:
                                foundationToken.colors.gray[0],
                            [InputStateV2.HOVER]:
                                foundationToken.colors.gray[25],
                            [InputStateV2.FOCUS]:
                                foundationToken.colors.gray[0],
                            [InputStateV2.ERROR]:
                                foundationToken.colors.gray[0],
                            [InputStateV2.DISABLED]:
                                foundationToken.colors.gray[0],
                        },
                        borderRadius: foundationToken.unit[12],
                        padding: foundationToken.unit[5],
                        top: foundationToken.unit[30],
                        right: 0,
                    },
                },
                backgroundColor: {
                    [InputStateV2.DEFAULT]: foundationToken.colors.gray[100],
                    [InputStateV2.HOVER]: foundationToken.colors.gray[25],
                    [InputStateV2.FOCUS]: foundationToken.colors.gray[0],
                    [InputStateV2.ERROR]: foundationToken.colors.gray[0],
                    [InputStateV2.DISABLED]: foundationToken.colors.gray[0],
                },
                borderRadius: foundationToken.unit[12],
                border: {
                    [InputStateV2.DEFAULT]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.HOVER]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.FOCUS]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.ERROR]: `1px solid ${foundationToken.colors.gray[200]}`,
                    [InputStateV2.DISABLED]: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                gap: foundationToken.unit[4],
                paddingTop: foundationToken.unit[4],
                paddingRight: foundationToken.unit[4],
                paddingBottom: foundationToken.unit[4],
                paddingLeft: foundationToken.unit[4],
                attachmentContainer: {
                    gap: foundationToken.unit[8],
                    width: foundationToken.unit[100],
                },
                slot: {
                    backgroundColor: foundationToken.colors.gray[0],
                    borderRadius: foundationToken.unit[100],
                    border: `1px solid ${foundationToken.colors.gray[200]}`,
                },
                inputContainer: {
                    outline: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: 'none',
                        [InputStateV2.FOCUS]: `1px solid ${foundationToken.colors.primary[500]}`,
                        [InputStateV2.ERROR]: 'none',
                        [InputStateV2.DISABLED]: 'none',
                    },
                    gap: foundationToken.unit[8],
                    borderRadius: foundationToken.unit[8],
                    boxShadow: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.FOCUS]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.ERROR]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.DISABLED]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                    },
                    paddingTop: foundationToken.unit[14],
                    paddingRight: foundationToken.unit[16],
                    paddingBottom: foundationToken.unit[14],
                    paddingLeft: foundationToken.unit[16],
                    border: `1px solid ${foundationToken.colors.gray[200]}`,
                    backgroundColor: foundationToken.colors.gray[0],
                    input: {
                        placeholder: foundationToken.colors.gray[400],
                        color: foundationToken.colors.gray[700],
                        paddingTop: foundationToken.unit[14],
                        paddingRight: foundationToken.unit[16],
                        paddingLeft: foundationToken.unit[16],
                        minHeight: foundationToken.unit[48],
                        maxHeight: foundationToken.unit[150],
                    },
                    slotContainer: {
                        paddingRight: foundationToken.unit[16],
                        paddingBottom: foundationToken.unit[14],
                        paddingLeft: foundationToken.unit[16],
                    },
                    topQueriesContainer: {
                        marginRight: foundationToken.unit[16],
                        marginLeft: foundationToken.unit[16],
                        paddingTop: foundationToken.unit[14],
                        paddingRight: foundationToken.unit[16],
                        paddingBottom: foundationToken.unit[14],
                        paddingLeft: foundationToken.unit[16],
                        borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                        header: {
                            color: foundationToken.colors.gray[400],
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            paddingTop: foundationToken.unit[6],
                            paddingRight: foundationToken.unit[16],
                            paddingBottom: foundationToken.unit[6],
                            paddingLeft: foundationToken.unit[16],
                            backgroundColor: foundationToken.colors.gray[0],
                        },
                        item: {
                            backgroundColor: {
                                default: 'transparent',
                                hover: foundationToken.colors.gray[50],
                                focus: foundationToken.colors.gray[100],
                                disabled: 'transparent',
                                error: 'transparent',
                            },
                            color: {
                                default: foundationToken.colors.gray[600],
                                hover: foundationToken.colors.gray[700],
                                focus: foundationToken.colors.gray[700],
                                disabled: foundationToken.colors.gray[400],
                                error: foundationToken.colors.red[400],
                            },
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: '500',
                            paddingTop: foundationToken.unit[6],
                            paddingRight: foundationToken.unit[16],
                            paddingBottom: foundationToken.unit[6],
                            paddingLeft: foundationToken.unit[16],
                            border: 'none',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            opacity: {
                                default: '1',
                                disabled: '0.5',
                                error: '0.5',
                                focus: '1',
                                hover: '1',
                            },
                        },
                    },
                },
            },
        },
    }
}
