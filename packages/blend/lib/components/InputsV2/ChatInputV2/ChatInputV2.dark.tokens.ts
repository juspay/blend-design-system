import { FoundationTokenType } from '../../../tokens/theme.token'
import { InputStateV2 } from '../inputV2.types'
import { ResponsiveChatInputV2TokensType } from './ChatInputV2.tokens'

const focusRing = (foundationToken: FoundationTokenType) =>
    `inset 0 0 0 3px ${foundationToken.colors.primary[500]}`

/** Dark theme: surfaces and borders aligned with TextInputV2 dark (gray[900] field, gray[700–800] chrome). */
export const getChatInputV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveChatInputV2TokensType => {
    const borderChrome = `1px solid ${foundationToken.colors.gray[700]}`
    const borderField = `1px solid ${foundationToken.colors.gray[800]}`
    const borderTopQueries = `1px solid ${foundationToken.colors.gray[800]}`

    return {
        sm: {
            container: {
                attachedFilesContainer: {
                    gap: foundationToken.unit[5],
                    overflowMenu: {
                        gap: foundationToken.unit[5],
                        backgroundColor: {
                            [InputStateV2.DEFAULT]:
                                foundationToken.colors.gray[800],
                            [InputStateV2.HOVER]:
                                foundationToken.colors.gray[800],
                            [InputStateV2.FOCUS]:
                                foundationToken.colors.gray[900],
                            [InputStateV2.ERROR]:
                                foundationToken.colors.gray[900],
                            [InputStateV2.DISABLED]:
                                foundationToken.colors.gray[900],
                        },
                        borderRadius: foundationToken.unit[12],
                        padding: foundationToken.unit[5],
                        top: foundationToken.unit[30],
                        right: 0,
                        maxHeight: '200px',
                    },
                },
                backgroundColor: {
                    [InputStateV2.DEFAULT]: foundationToken.colors.gray[800],
                    [InputStateV2.HOVER]: foundationToken.colors.gray[800],
                    [InputStateV2.FOCUS]: foundationToken.colors.gray[900],
                    [InputStateV2.ERROR]: foundationToken.colors.gray[900],
                    [InputStateV2.DISABLED]: foundationToken.colors.gray[900],
                },
                borderRadius: foundationToken.unit[100],
                border: {
                    [InputStateV2.DEFAULT]: borderChrome,
                    [InputStateV2.HOVER]: borderChrome,
                    [InputStateV2.FOCUS]: borderChrome,
                    [InputStateV2.ERROR]: borderChrome,
                    [InputStateV2.DISABLED]: borderChrome,
                },
                gap: foundationToken.unit[8],
                paddingTop: foundationToken.unit[5],
                paddingRight: foundationToken.unit[5],
                paddingBottom: foundationToken.unit[5],
                paddingLeft: foundationToken.unit[5],

                slot: {
                    backgroundColor: foundationToken.colors.gray[900],
                    borderRadius: foundationToken.unit[100],
                    border: borderChrome,
                },
                inputContainer: {
                    outline: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: 'none',
                        [InputStateV2.FOCUS]: focusRing(foundationToken),
                        [InputStateV2.ERROR]: 'none',
                        [InputStateV2.DISABLED]: 'none',
                    },
                    gap: foundationToken.unit[8],
                    borderRadius: foundationToken.unit[100],
                    paddingTop: foundationToken.unit[16],
                    paddingRight: foundationToken.unit[12],
                    paddingBottom: foundationToken.unit[16],
                    paddingLeft: foundationToken.unit[12],
                    border: borderField,
                    boxShadow: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.FOCUS]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.ERROR]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.DISABLED]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                    },
                    backgroundColor: foundationToken.colors.gray[900],
                    input: {
                        placeholder: foundationToken.colors.gray[200],
                        color: foundationToken.colors.gray[100],
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
                        borderTop: borderTopQueries,
                        header: {
                            color: foundationToken.colors.gray[400],
                            fontSize: foundationToken.unit[12],
                            fontWeight: '400',
                            textTransform: 'uppercase',
                            paddingTop: foundationToken.unit[6],
                            paddingRight: foundationToken.unit[6],
                            paddingBottom: foundationToken.unit[6],
                            paddingLeft: foundationToken.unit[6],
                            backgroundColor: foundationToken.colors.gray[900],
                        },
                        item: {
                            backgroundColor: {
                                [InputStateV2.DEFAULT]: 'transparent',
                                [InputStateV2.HOVER]:
                                    foundationToken.colors.gray[800],
                                [InputStateV2.FOCUS]:
                                    foundationToken.colors.gray[700],
                                [InputStateV2.DISABLED]: 'transparent',
                                [InputStateV2.ERROR]: 'transparent',
                            },
                            color: {
                                [InputStateV2.DEFAULT]:
                                    foundationToken.colors.gray[300],
                                [InputStateV2.HOVER]:
                                    foundationToken.colors.gray[100],
                                [InputStateV2.FOCUS]:
                                    foundationToken.colors.gray[100],
                                [InputStateV2.DISABLED]:
                                    foundationToken.colors.gray[500],
                                [InputStateV2.ERROR]:
                                    foundationToken.colors.red[400],
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
                                [InputStateV2.DEFAULT]: '1',
                                [InputStateV2.HOVER]: '1',
                                [InputStateV2.FOCUS]: '1',
                                [InputStateV2.DISABLED]: '0.5',
                                [InputStateV2.ERROR]: '0.5',
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
                                foundationToken.colors.gray[900],
                            [InputStateV2.HOVER]:
                                foundationToken.colors.gray[800],
                            [InputStateV2.FOCUS]:
                                foundationToken.colors.gray[900],
                            [InputStateV2.ERROR]:
                                foundationToken.colors.gray[900],
                            [InputStateV2.DISABLED]:
                                foundationToken.colors.gray[900],
                        },
                        borderRadius: foundationToken.unit[12],
                        padding: foundationToken.unit[5],
                        top: foundationToken.unit[30],
                        right: 0,
                        maxHeight: '200px',
                    },
                },
                backgroundColor: {
                    [InputStateV2.DEFAULT]: foundationToken.colors.gray[800],
                    [InputStateV2.HOVER]: foundationToken.colors.gray[800],
                    [InputStateV2.FOCUS]: foundationToken.colors.gray[900],
                    [InputStateV2.ERROR]: foundationToken.colors.gray[900],
                    [InputStateV2.DISABLED]: foundationToken.colors.gray[900],
                },
                borderRadius: foundationToken.unit[12],
                border: {
                    [InputStateV2.DEFAULT]: borderChrome,
                    [InputStateV2.HOVER]: borderChrome,
                    [InputStateV2.FOCUS]: borderChrome,
                    [InputStateV2.ERROR]: borderChrome,
                    [InputStateV2.DISABLED]: borderChrome,
                },
                gap: foundationToken.unit[4],
                paddingTop: foundationToken.unit[4],
                paddingRight: foundationToken.unit[4],
                paddingBottom: foundationToken.unit[4],
                paddingLeft: foundationToken.unit[4],

                slot: {
                    backgroundColor: foundationToken.colors.gray[900],
                    borderRadius: foundationToken.unit[100],
                    border: borderChrome,
                },
                inputContainer: {
                    outline: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: 'none',
                        [InputStateV2.FOCUS]: focusRing(foundationToken),
                        [InputStateV2.ERROR]: 'none',
                        [InputStateV2.DISABLED]: 'none',
                    },
                    boxShadow: {
                        [InputStateV2.DEFAULT]: 'none',
                        [InputStateV2.HOVER]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.FOCUS]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.ERROR]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                        [InputStateV2.DISABLED]: `0 2px 8px 0 ${foundationToken.colors.primary[50]}, 0 0 0 3px ${foundationToken.colors.primary[50]}`,
                    },
                    gap: foundationToken.unit[8],
                    borderRadius: foundationToken.unit[8],
                    paddingTop: foundationToken.unit[14],
                    paddingRight: foundationToken.unit[16],
                    paddingBottom: foundationToken.unit[14],
                    paddingLeft: foundationToken.unit[16],
                    border: borderField,
                    backgroundColor: foundationToken.colors.gray[900],
                    input: {
                        placeholder: foundationToken.colors.gray[400],
                        color: foundationToken.colors.gray[100],
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
                        borderTop: borderTopQueries,
                        header: {
                            color: foundationToken.colors.gray[400],
                            fontSize: foundationToken.unit[12],
                            fontWeight: '400',
                            textTransform: 'uppercase',
                            paddingTop: foundationToken.unit[6],
                            paddingRight: foundationToken.unit[16],
                            paddingBottom: foundationToken.unit[6],
                            paddingLeft: foundationToken.unit[16],
                            backgroundColor: foundationToken.colors.gray[900],
                        },
                        item: {
                            backgroundColor: {
                                [InputStateV2.DEFAULT]: 'transparent',
                                [InputStateV2.HOVER]:
                                    foundationToken.colors.gray[800],
                                [InputStateV2.FOCUS]:
                                    foundationToken.colors.gray[700],
                                [InputStateV2.DISABLED]: 'transparent',
                                [InputStateV2.ERROR]: 'transparent',
                            },
                            color: {
                                [InputStateV2.DEFAULT]:
                                    foundationToken.colors.gray[300],
                                [InputStateV2.HOVER]:
                                    foundationToken.colors.gray[100],
                                [InputStateV2.FOCUS]:
                                    foundationToken.colors.gray[100],
                                [InputStateV2.DISABLED]:
                                    foundationToken.colors.gray[500],
                                [InputStateV2.ERROR]:
                                    foundationToken.colors.red[400],
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
                                [InputStateV2.DEFAULT]: '1',
                                [InputStateV2.HOVER]: '1',
                                [InputStateV2.FOCUS]: '1',
                                [InputStateV2.DISABLED]: '0.5',
                                [InputStateV2.ERROR]: '0.5',
                            },
                        },
                    },
                },
            },
        },
    }
}
