import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveDirectoryTokens } from './directory.tokens.types'

export const getDirectoryDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveDirectoryTokens => {
    return {
        sm: {
            gap: foundationToken.unit[24],
            paddingX: foundationToken.unit[8],
            paddingY: foundationToken.unit[8],

            section: {
                gap: foundationToken.unit[4],

                header: {
                    padding: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[2],
                    },
                    label: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        color: foundationToken.colors.gray[500],
                        fontWeight: 500,
                    },
                    chevron: {
                        width: foundationToken.unit[16],
                        color: foundationToken.colors.gray[500],
                    },
                },

                itemList: {
                    gap: foundationToken.unit[8],

                    item: {
                        padding: {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[6],
                        },
                        iconOnlyPadding: {
                            paddingTop: foundationToken.unit[8],
                            paddingBottom: foundationToken.unit[8],
                            paddingLeft: foundationToken.unit[10],
                            paddingRight: foundationToken.unit[10],
                        },
                        gap: foundationToken.unit[12],
                        borderRadius: foundationToken.border.radius[4],
                        fontWeight: 500,
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        transition: 'background-color 0.2s, color 0.2s',

                        backgroundColor: {
                            default: 'transparent',
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[700],
                            // the fill is what marks the selection itself, so
                            // the path tiers stay unfilled and differ by text
                            activePath: 'transparent',
                            muted: 'transparent',
                        },

                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[50],
                            // 14.71:1 on gray[950] — clearly on-path, still
                            // below the selected row which carries a fill
                            activePath: foundationToken.colors.gray[200],
                            // 4.17:1 on gray[950]. Under the 4.5:1 AA floor —
                            // see the note in DirectoryProps.highlightActivePath.
                            // Muted rows lift to `hover` on hover/focus-visible.
                            muted: foundationToken.colors.gray[500],
                        },

                        icon: {
                            width: foundationToken.unit[20],
                        },

                        chevron: {
                            width: foundationToken.unit[16],
                            color: foundationToken.colors.gray[400],
                        },
                    },

                    nested: {
                        paddingLeft: foundationToken.unit[24],
                        marginTop: foundationToken.unit[8],

                        border: {
                            width: foundationToken.unit[1],
                            color: foundationToken.colors.gray[700],
                            leftOffset: foundationToken.unit[16],
                        },
                        connector: {
                            itemInset: foundationToken.unit[8],
                            itemPaddingLeft: foundationToken.unit[8],
                            elbowTop: foundationToken.unit[5],
                            elbowHeight: foundationToken.unit[10],
                            elbowWidthOffset: foundationToken.unit[6],
                        },
                    },
                },
            },
        },

        lg: {
            gap: foundationToken.unit[24],
            paddingX: foundationToken.unit[12],
            paddingY: foundationToken.unit[12],

            section: {
                gap: foundationToken.unit[4],

                header: {
                    padding: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[2],
                    },
                    label: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        color: foundationToken.colors.gray[500],
                        fontWeight: 600,
                    },
                    chevron: {
                        width: foundationToken.unit[16],
                        color: foundationToken.colors.gray[500],
                    },
                },

                itemList: {
                    gap: foundationToken.unit[8],

                    item: {
                        padding: {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[6],
                        },
                        iconOnlyPadding: {
                            paddingTop: foundationToken.unit[8],
                            paddingBottom: foundationToken.unit[8],
                            paddingLeft: foundationToken.unit[10],
                            paddingRight: foundationToken.unit[10],
                        },
                        gap: foundationToken.unit[10],
                        borderRadius: foundationToken.border.radius[4],
                        fontWeight: 500,
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        transition: 'background-color 0.2s, color 0.2s',

                        backgroundColor: {
                            default: 'transparent',
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[700],
                            // the fill is what marks the selection itself, so
                            // the path tiers stay unfilled and differ by text
                            activePath: 'transparent',
                            muted: 'transparent',
                        },

                        color: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[50],
                            // 14.71:1 on gray[950] — clearly on-path, still
                            // below the selected row which carries a fill
                            activePath: foundationToken.colors.gray[200],
                            // 4.17:1 on gray[950]. Under the 4.5:1 AA floor —
                            // see the note in DirectoryProps.highlightActivePath.
                            // Muted rows lift to `hover` on hover/focus-visible.
                            muted: foundationToken.colors.gray[500],
                        },

                        icon: {
                            width: foundationToken.unit[14],
                        },

                        chevron: {
                            width: foundationToken.unit[16],
                            color: foundationToken.colors.gray[400],
                        },
                    },

                    nested: {
                        paddingLeft: foundationToken.unit[24],
                        marginTop: foundationToken.unit[8],

                        border: {
                            width: foundationToken.unit[1],
                            color: foundationToken.colors.gray[700],
                            leftOffset: foundationToken.unit[16],
                        },
                        connector: {
                            itemInset: foundationToken.unit[8],
                            itemPaddingLeft: foundationToken.unit[8],
                            elbowTop: foundationToken.unit[5],
                            elbowHeight: foundationToken.unit[10],
                            elbowWidthOffset: foundationToken.unit[6],
                        },
                    },
                },
            },
        },
    }
}
