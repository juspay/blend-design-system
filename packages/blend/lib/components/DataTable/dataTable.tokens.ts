import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

type BasicCSSProps = {
    padding?: CSSObject['padding']
    width?: CSSObject['width']
    height?: CSSObject['height']
    display?: CSSObject['display']
    flexDirection?: CSSObject['flexDirection']
    position?: CSSObject['position']
}

type BulkActionsType = {
    top: CSSObject['top']
    left: CSSObject['left']
    transform: CSSObject['transform']
    zIndex: CSSObject['zIndex']
    backgroundColor: CSSObject['backgroundColor']
    color: CSSObject['color']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    boxShadow: CSSObject['boxShadow']
    display: CSSObject['display']
    alignItems: CSSObject['alignItems']
    gap: CSSObject['gap']
    minWidth?: CSSObject['minWidth']
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    border: CSSObject['border']
    selectText: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        flex?: CSSObject['flex']
        color: CSSObject['color']
    }
    height: CSSObject['height']
}

type HeaderType = {
    display: CSSObject['display']
    justifyContent: CSSObject['justifyContent']
    alignItems: CSSObject['alignItems']
    marginBottom: CSSObject['marginBottom']
    gap: CSSObject['gap']
    maxWidth: CSSObject['maxWidth']
    overflowX: CSSObject['overflowX']
    title: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    description: {
        fontSize: CSSObject['fontSize']
        color: CSSObject['color']
        lineHeight: CSSObject['lineHeight']
        maxWidth: CSSObject['maxWidth']
    }
    headerSlot1: {
        maxHeight: CSSObject['maxHeight']
        flexShrink: CSSObject['flexShrink']
    }
    headerSlot2: {
        maxHeight: CSSObject['maxHeight']
        flexShrink: CSSObject['flexShrink']
    }
    headerSlot3: {
        maxHeight: CSSObject['maxHeight']
        flexShrink: CSSObject['flexShrink']
    }
    titleRow: {
        gap: CSSObject['gap']
        marginBottom: CSSObject['marginBottom']
        justifyContent: CSSObject['justifyContent']
        alignItems: CSSObject['alignItems']
    }
    descriptionRow: {
        marginTop: CSSObject['marginTop']
    }
    actionIcons: {
        gap: CSSObject['gap']
        searchIcon: {
            width: CSSObject['width']
            height: CSSObject['height']
        }
        filterIcon: {
            width: CSSObject['width']
            height: CSSObject['height']
        }
        columnManagerIcon: {
            width: CSSObject['width']
            height: CSSObject['height']
        }
    }
}

export type TableTokenType = BasicCSSProps & {
    header: HeaderType
    dataTable: {
        borderRadius: CSSObject['borderRadius']
        border: CSSObject['border']
        maxHeight: CSSObject['maxHeight']
        minHeight?: CSSObject['minHeight']
        bulkActions: BulkActionsType
        table: {
            width: CSSObject['width']
            tableLayout: CSSObject['tableLayout']
            borderCollapse: CSSObject['borderCollapse']
            borderSpacing: CSSObject['borderSpacing']
            position: CSSObject['position']
            minWidth: CSSObject['minWidth']
            header: {
                backgroundColor: CSSObject['backgroundColor']
                borderBottom: CSSObject['borderBottom']
                height: CSSObject['height']
                row: {
                    height: CSSObject['height']
                    '&:hover': {
                        backgroundColor: CSSObject['backgroundColor']
                    }
                }
                cell: {
                    padding: CSSObject['padding']
                    textAlign: CSSObject['textAlign']
                    fontWeight: CSSObject['fontWeight']
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    width?: CSSObject['width']
                }
                sortable: {
                    cursor: CSSObject['cursor']
                    userSelect: CSSObject['userSelect']
                }
                filter: {
                    backgroundColor: CSSObject['backgroundColor']
                    borderRadius: CSSObject['borderRadius']
                    border: CSSObject['border']
                    cursor: CSSObject['cursor']
                    textColor: CSSObject['color']
                    maxHeight: CSSObject['maxHeight']
                    overflowY: CSSObject['overflowY']
                    gap: CSSObject['gap']
                    sortOption: {
                        padding: CSSObject['padding']
                        borderRadius: CSSObject['borderRadius']
                        hoverBackground: CSSObject['backgroundColor']
                        iconColor: CSSObject['color']
                        textColor: CSSObject['color']
                        fontSize: CSSObject['fontSize']
                        fontWeight: CSSObject['fontWeight']
                    }
                    selectedBackground: CSSObject['backgroundColor']
                    hoverBackground: CSSObject['backgroundColor']
                    selectedTextColor: CSSObject['color']
                    normalTextColor: CSSObject['color']
                    selectedFontWeight: CSSObject['fontWeight']
                    normalFontWeight: CSSObject['fontWeight']
                    itemPadding: CSSObject['padding']
                    itemGap: CSSObject['gap']
                    itemBorderRadius: CSSObject['borderRadius']
                    itemFontSize: CSSObject['fontSize']
                    groupLabelFontSize: CSSObject['fontSize']
                    groupLabelFontWeight: CSSObject['fontWeight']
                    groupLabelColor: CSSObject['color']
                    groupLabelPadding: CSSObject['padding']
                    groupLabelTextTransform: CSSObject['textTransform']
                    separatorHeight: CSSObject['height']
                    separatorColor: CSSObject['color']
                }
            }
            body: {
                backgroundColor: CSSObject['backgroundColor']
                borderTop: CSSObject['borderTop']
                row: {
                    height: CSSObject['height']
                    '&:hover': {
                        backgroundColor: CSSObject['backgroundColor']
                        cursor: CSSObject['cursor']
                    }
                    backgroundColor: CSSObject['backgroundColor']
                }
                cell: {
                    padding: CSSObject['padding']
                    fontWeight: CSSObject['fontWeight']
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    borderTop: CSSObject['borderTop']
                    expandable: {
                        padding: CSSObject['padding']
                        borderTop: CSSObject['borderTop']
                        expandButton: {
                            display: CSSObject['display']
                            alignItems: CSSObject['alignItems']
                            justifyContent: CSSObject['justifyContent']
                            width: CSSObject['width']
                            height: CSSObject['height']
                            borderRadius: CSSObject['borderRadius']
                            backgroundColor: CSSObject['backgroundColor']
                            cursor: CSSObject['cursor']
                            transition: CSSObject['transition']
                            color: CSSObject['color']
                            border: CSSObject['border']
                            '&:hover': {
                                backgroundColor: CSSObject['backgroundColor']
                                color: CSSObject['color']
                            }
                        }
                    }
                }
            }
            footer: {
                display: CSSObject['display']
                justifyContent: CSSObject['justifyContent']
                alignItems: CSSObject['alignItems']
                padding: CSSObject['padding']
                borderTop: CSSObject['borderTop']
                height: CSSObject['height']
                position: CSSObject['position']
                bottom: CSSObject['bottom']
                backgroundColor: CSSObject['backgroundColor']
                zIndex: CSSObject['zIndex']
                flexShrink: CSSObject['flexShrink']
                pagination: {
                    pageText: {
                        fontSize: CSSObject['fontSize']
                        color: CSSObject['color']
                    }
                    pageSizeSelector: {
                        gap: CSSObject['gap']
                        padding: CSSObject['padding']
                        borderRadius: CSSObject['borderRadius']
                        display: CSSObject['display']
                        alignItems: CSSObject['alignItems']
                        backgroundColor: CSSObject['backgroundColor']
                        border: CSSObject['border']
                        background: CSSObject['background']
                        cursor: CSSObject['cursor']
                        color: CSSObject['color']
                        fontSize: CSSObject['fontSize']
                        hoverColor: CSSObject['color']
                    }
                    pageNavigation: {
                        gap: CSSObject['gap']
                    }
                }
            }
        }
    }
}

export type ResponsiveTableTokens = {
    [key in keyof BreakpointType]: TableTokenType
}

export const getTableToken = (
    foundationToken: FoundationTokenType
): ResponsiveTableTokens => {
    return {
        sm: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            header: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: foundationToken.unit[16],
                gap: foundationToken.unit[20],
                maxWidth: '100%',
                overflowX: 'hidden',
                title: {
                    fontSize: foundationToken.font.size.heading.sm.fontSize,
                    fontWeight: 600,
                    color: foundationToken.colors.gray[800],
                },
                description: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    color: foundationToken.colors.gray[500],
                    lineHeight: foundationToken.unit[18],
                    maxWidth: '100%',
                },
                headerSlot1: {
                    maxHeight: foundationToken.unit[36],
                    flexShrink: 0,
                },
                headerSlot2: {
                    maxHeight: foundationToken.unit[36],
                    flexShrink: 0,
                },
                headerSlot3: {
                    maxHeight: foundationToken.unit[36],
                    flexShrink: 0,
                },
                titleRow: {
                    gap: foundationToken.unit[8],
                    marginBottom: foundationToken.unit[12],
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                descriptionRow: {
                    marginTop: foundationToken.unit[12],
                },
                actionIcons: {
                    gap: foundationToken.unit[8],
                    searchIcon: {
                        width: foundationToken.unit[20],
                        height: foundationToken.unit[20],
                    },
                    filterIcon: {
                        width: foundationToken.unit[20],
                        height: foundationToken.unit[20],
                    },
                    columnManagerIcon: {
                        width: foundationToken.unit[14],
                        height: foundationToken.unit[14],
                    },
                },
            },
            dataTable: {
                borderRadius: foundationToken.border.radius[8],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                maxHeight: 'calc(100vh - 280px)',
                bulkActions: {
                    top: '70%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    backgroundColor: foundationToken.colors.gray[0],
                    color: foundationToken.colors.gray[700],
                    borderRadius: foundationToken.border.radius[12],
                    padding: `${foundationToken.unit[8] as string} ${foundationToken.unit[16] as string} ${foundationToken.unit[8] as string} ${foundationToken.unit[8] as string}`,
                    height: foundationToken.unit[56],
                    boxShadow: foundationToken.shadows.lg,
                    display: 'flex',
                    alignItems: 'center',
                    gap: foundationToken.unit[10],
                    minWidth: '220px',
                    width: 'auto',
                    maxWidth: 'calc(100vw - 32px)',
                    border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    selectText: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        flex: 1,
                        color: foundationToken.colors.gray[500],
                    },
                },
                table: {
                    width: '100%',
                    tableLayout: 'auto',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                    position: 'relative',
                    minWidth: 'calc(100vw - 280px)',
                    header: {
                        backgroundColor: foundationToken.colors.gray[25],
                        borderBottom: `1px solid ${foundationToken.colors.gray[150]}`,
                        height: foundationToken.unit[40],
                        row: {
                            height: foundationToken.unit[56],
                            '&:hover': {
                                backgroundColor:
                                    foundationToken.colors.gray[50],
                            },
                        },
                        cell: {
                            padding: `${foundationToken.unit[4]} ${foundationToken.unit[16]}`,
                            textAlign: 'left',
                            fontWeight: foundationToken.font.weight[600],
                            color: foundationToken.colors.gray[400],
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            width: foundationToken.unit[40],
                        },
                        sortable: {
                            cursor: 'pointer',
                            userSelect: 'none',
                        },
                        filter: {
                            backgroundColor: foundationToken.colors.gray[25],
                            borderRadius: foundationToken.border.radius[4],
                            border: `1px solid ${foundationToken.colors.gray[150]}`,
                            cursor: 'pointer',
                            textColor: foundationToken.colors.gray[600],
                            maxHeight: '200px',
                            overflowY: 'auto',
                            gap: foundationToken.unit[4],
                            sortOption: {
                                padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                                borderRadius: foundationToken.border.radius[4],
                                hoverBackground:
                                    foundationToken.colors.gray[50],
                                iconColor: foundationToken.colors.gray[900],
                                textColor: foundationToken.colors.gray[600],
                                fontSize:
                                    foundationToken.font.size.body.md.fontSize,
                                fontWeight: foundationToken.font.weight[400],
                            },
                            // Non-primary selected states (using gray colors)
                            selectedBackground:
                                foundationToken.colors.gray[100],
                            hoverBackground: foundationToken.colors.gray[50],
                            selectedTextColor: foundationToken.colors.gray[800],
                            normalTextColor: foundationToken.colors.gray[700],
                            selectedFontWeight:
                                foundationToken.font.weight[600],
                            normalFontWeight: foundationToken.font.weight[400],
                            itemPadding: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                            itemGap: foundationToken.unit[8],
                            itemBorderRadius: foundationToken.border.radius[4],
                            itemFontSize:
                                foundationToken.font.size.body.md.fontSize,
                            groupLabelFontSize:
                                foundationToken.font.size.body.xs.fontSize,
                            groupLabelFontWeight:
                                foundationToken.font.weight[600],
                            groupLabelColor: foundationToken.colors.gray[400],
                            groupLabelPadding: `${foundationToken.unit[4]} 0`,
                            groupLabelTextTransform: 'uppercase',
                            separatorHeight: '1px',
                            separatorColor: foundationToken.colors.gray[200],
                        },
                    },
                    body: {
                        backgroundColor: foundationToken.colors.gray[25],
                        borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                        row: {
                            height: foundationToken.unit[56],
                            '&:hover': {
                                backgroundColor:
                                    foundationToken.colors.gray[50],
                                cursor: 'pointer',
                            },
                            backgroundColor: foundationToken.colors.gray[25],
                        },
                        cell: {
                            padding: `${foundationToken.unit[4]} ${foundationToken.unit[16]}`,
                            fontWeight: foundationToken.font.weight[500],
                            color: foundationToken.colors.gray[700],
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                            expandable: {
                                padding: foundationToken.unit[16],
                                borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                                expandButton: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: foundationToken.unit[32],
                                    height: foundationToken.unit[32],
                                    borderRadius:
                                        foundationToken.border.radius[4],
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    color: foundationToken.colors.gray[500],
                                    border: 'none',
                                    '&:hover': {
                                        backgroundColor:
                                            foundationToken.colors.gray[100],
                                        color: foundationToken.colors.gray[700],
                                    },
                                },
                            },
                        },
                    },
                    footer: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: `${foundationToken.unit[6]} ${foundationToken.unit[16]}`,
                        borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                        height: foundationToken.unit[48],
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: foundationToken.colors.gray[25],
                        zIndex: 50,
                        flexShrink: 0,
                        pagination: {
                            pageText: {
                                fontSize:
                                    foundationToken.font.size.body.md.fontSize,
                                color: foundationToken.colors.gray[600],
                            },
                            pageSizeSelector: {
                                gap: foundationToken.unit[4],
                                padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
                                borderRadius: foundationToken.border.radius[2],
                                backgroundColor:
                                    foundationToken.colors.gray[25],
                                display: 'flex',
                                alignItems: 'center',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                color: foundationToken.colors.gray[600],
                                fontSize:
                                    foundationToken.font.size.body.md.fontSize,
                                hoverColor: foundationToken.colors.gray[50],
                            },
                            pageNavigation: {
                                gap: foundationToken.unit[12],
                            },
                        },
                    },
                },
            },
        },
        lg: {
            width: '100%',
            height: 'calc(100vh - 280px)',
            display: 'flex',
            flexDirection: 'column',
            padding: foundationToken.unit[2],
            position: 'relative',
            header: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: foundationToken.unit[16],
                gap: foundationToken.unit[20],
                maxWidth: '100%',
                overflowX: 'hidden',
                title: {
                    fontSize: foundationToken.font.size.heading.md.fontSize,
                    fontWeight: 600,
                    color: foundationToken.colors.gray[800],
                },
                description: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    color: foundationToken.colors.gray[500],
                    lineHeight: foundationToken.unit[20],
                    maxWidth: '70%',
                },
                headerSlot1: {
                    maxHeight: foundationToken.unit[36],
                    flexShrink: 0,
                },
                headerSlot2: {
                    maxHeight: foundationToken.unit[36],
                    flexShrink: 0,
                },
                headerSlot3: {
                    maxHeight: foundationToken.unit[36],
                    flexShrink: 0,
                },
                titleRow: {
                    gap: foundationToken.unit[8],
                    marginBottom: foundationToken.unit[12],
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                descriptionRow: {
                    marginTop: foundationToken.unit[12],
                },
                actionIcons: {
                    gap: foundationToken.unit[8],
                    searchIcon: {
                        width: foundationToken.unit[20],
                        height: foundationToken.unit[20],
                    },
                    filterIcon: {
                        width: foundationToken.unit[20],
                        height: foundationToken.unit[20],
                    },
                    columnManagerIcon: {
                        width: foundationToken.unit[16],
                        height: foundationToken.unit[16],
                    },
                },
            },
            dataTable: {
                borderRadius: foundationToken.border.radius[8],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                maxHeight: 'calc(100vh - 280px)',
                bulkActions: {
                    top: '80%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    backgroundColor: foundationToken.colors.gray[0],
                    color: foundationToken.colors.gray[700],
                    borderRadius: foundationToken.border.radius[12],
                    padding: `${foundationToken.unit[10]} ${foundationToken.unit[16]}`,
                    height: foundationToken.unit[56],
                    boxShadow: foundationToken.shadows.lg,
                    display: 'flex',
                    alignItems: 'center',
                    gap: foundationToken.unit[12],
                    minWidth: '320px',
                    border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    selectText: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        flex: 1,
                        color: foundationToken.colors.gray[500],
                    },
                },
                table: {
                    width: '100%',
                    tableLayout: 'auto',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                    position: 'relative',
                    minWidth: 'calc(100vw - 280px)',
                    header: {
                        backgroundColor: foundationToken.colors.gray[25],
                        borderBottom: `1px solid ${foundationToken.colors.gray[150]}`,
                        height: foundationToken.unit[40],
                        row: {
                            height: foundationToken.unit[56],
                            '&:hover': {
                                backgroundColor:
                                    foundationToken.colors.gray[50],
                            },
                        },
                        cell: {
                            padding: `${foundationToken.unit[4]} ${foundationToken.unit[16]}`,
                            textAlign: 'left',
                            fontWeight: foundationToken.font.weight[600],
                            color: foundationToken.colors.gray[400],
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            width: foundationToken.unit[40],
                        },
                        sortable: {
                            cursor: 'pointer',
                            userSelect: 'none',
                        },
                        filter: {
                            backgroundColor: foundationToken.colors.gray[25],
                            borderRadius: foundationToken.border.radius[4],
                            border: `1px solid ${foundationToken.colors.gray[150]}`,
                            cursor: 'pointer',
                            textColor: foundationToken.colors.gray[600],
                            maxHeight: '200px',
                            overflowY: 'auto',
                            gap: foundationToken.unit[4],
                            sortOption: {
                                padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                                borderRadius: foundationToken.border.radius[4],
                                hoverBackground:
                                    foundationToken.colors.gray[50],
                                iconColor: foundationToken.colors.gray[900],
                                textColor: foundationToken.colors.gray[600],
                                fontSize:
                                    foundationToken.font.size.body.md.fontSize,
                                fontWeight: foundationToken.font.weight[400],
                            },
                            // Non-primary selected states (using gray colors)
                            selectedBackground:
                                foundationToken.colors.gray[100],
                            hoverBackground: foundationToken.colors.gray[50],
                            selectedTextColor: foundationToken.colors.gray[800],
                            normalTextColor: foundationToken.colors.gray[700],
                            selectedFontWeight:
                                foundationToken.font.weight[600],
                            normalFontWeight: foundationToken.font.weight[400],
                            itemPadding: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                            itemGap: foundationToken.unit[8],
                            itemBorderRadius: foundationToken.border.radius[4],
                            itemFontSize:
                                foundationToken.font.size.body.md.fontSize,
                            groupLabelFontSize:
                                foundationToken.font.size.body.xs.fontSize,
                            groupLabelFontWeight:
                                foundationToken.font.weight[600],
                            groupLabelColor: foundationToken.colors.gray[400],
                            groupLabelPadding: `${foundationToken.unit[4]} 0`,
                            groupLabelTextTransform: 'uppercase',
                            separatorHeight: '1px',
                            separatorColor: foundationToken.colors.gray[200],
                        },
                    },
                    body: {
                        backgroundColor: foundationToken.colors.gray[25],
                        borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                        row: {
                            height: foundationToken.unit[56],
                            '&:hover': {
                                backgroundColor:
                                    foundationToken.colors.gray[50],
                                cursor: 'pointer',
                            },
                            backgroundColor: foundationToken.colors.gray[25],
                        },
                        cell: {
                            padding: `${foundationToken.unit[4]} ${foundationToken.unit[16]}`,
                            fontWeight: foundationToken.font.weight[500],
                            color: foundationToken.colors.gray[700],
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                            expandable: {
                                padding: foundationToken.unit[16],
                                borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                                expandButton: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: foundationToken.unit[32],
                                    height: foundationToken.unit[32],
                                    borderRadius:
                                        foundationToken.border.radius[4],
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    color: foundationToken.colors.gray[500],
                                    border: 'none',
                                    '&:hover': {
                                        backgroundColor:
                                            foundationToken.colors.gray[100],
                                        color: foundationToken.colors.gray[700],
                                    },
                                },
                            },
                        },
                    },
                    footer: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: `${foundationToken.unit[6]} ${foundationToken.unit[16]}`,
                        borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
                        height: foundationToken.unit[48],
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: foundationToken.colors.gray[25],
                        zIndex: 50,
                        flexShrink: 0,
                        pagination: {
                            pageText: {
                                fontSize:
                                    foundationToken.font.size.body.md.fontSize,
                                color: foundationToken.colors.gray[600],
                            },
                            pageSizeSelector: {
                                gap: foundationToken.unit[4],
                                padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
                                borderRadius: foundationToken.border.radius[2],
                                backgroundColor:
                                    foundationToken.colors.gray[25],
                                display: 'flex',
                                alignItems: 'center',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                color: foundationToken.colors.gray[600],
                                fontSize:
                                    foundationToken.font.size.body.md.fontSize,
                                hoverColor: foundationToken.colors.gray[50],
                            },
                            pageNavigation: {
                                gap: foundationToken.unit[4],
                            },
                        },
                    },
                },
            },
        },
    }
}
