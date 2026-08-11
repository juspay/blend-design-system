import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import { getTableLightTokens } from './table.light.tokens'
import { getTableDarkTokens } from './table.dark.tokens'

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
    overflowY: CSSObject['overflowY']
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
            color: CSSObject['color']
        }
        columnManagerTrigger?: {
            backgroundColor: CSSObject['backgroundColor']
            opacity: CSSObject['disabledOpacity']
            focusVisible: {
                outline: CSSObject['outline']
                outlineOffset: CSSObject['outlineOffset']
                borderRadius: CSSObject['borderRadius']
                boxShadow: CSSObject['boxShadow']
            }
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
                    backgroundColor?: CSSObject['backgroundColor']
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

                    dateLabel: {
                        fontSize: CSSObject['fontSize']
                        color: CSSObject['color']
                    }
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
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveTableTokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getTableDarkTokens(foundationToken)
    }

    return getTableLightTokens(foundationToken)
}

export default getTableToken
