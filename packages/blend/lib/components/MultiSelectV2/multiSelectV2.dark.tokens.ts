import type { FoundationTokenType } from '../../tokens/theme.token'
import {
    MultiSelectV2SelectionTagType,
    MultiSelectV2Size,
    MultiSelectV2Variant,
} from './types'
import type { ResponsiveMultiSelectV2Tokens } from './multiSelectV2.tokens'

export const getMultiSelectV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMultiSelectV2Tokens => {
    const createBaseTokens = (): ResponsiveMultiSelectV2Tokens['sm'] => ({
        gap: foundationToken.unit[8],
        label: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[500],
            color: {
                default: foundationToken.colors.gray[200],
                hover: foundationToken.colors.gray[200],
                active: foundationToken.colors.gray[200],
                focus: foundationToken.colors.gray[200],
                focusVisible: foundationToken.colors.gray[200],
                disabled: foundationToken.colors.gray[600],
                selected: foundationToken.colors.gray[200],
            },
        },
        subLabel: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[400],
            color: {
                default: foundationToken.colors.gray[400],
                hover: foundationToken.colors.gray[400],
                active: foundationToken.colors.gray[400],
                focus: foundationToken.colors.gray[400],
                focusVisible: foundationToken.colors.gray[400],
                disabled: foundationToken.colors.gray[600],
                selected: foundationToken.colors.gray[400],
            },
        },
        hintText: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[400],
            color: {
                default: foundationToken.colors.gray[400],
                hover: foundationToken.colors.gray[400],
                active: foundationToken.colors.gray[400],
                focus: foundationToken.colors.gray[400],
                focusVisible: foundationToken.colors.gray[400],
                disabled: foundationToken.colors.gray[600],
                selected: foundationToken.colors.gray[400],
            },
        },
        errorMessage: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[500],
            color: foundationToken.colors.red[400],
        },
        required: { color: foundationToken.colors.red[400] },

        trigger: {
            height: {
                [MultiSelectV2Size.SMALL]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[32],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[32],
                },
                [MultiSelectV2Size.MEDIUM]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[36],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[36],
                },
                [MultiSelectV2Size.LARGE]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[40],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[40],
                },
            },
            padding: {
                [MultiSelectV2Size.SMALL]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[14],
                        y: foundationToken.unit[7],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[14],
                        y: foundationToken.unit[7],
                    },
                },
                [MultiSelectV2Size.MEDIUM]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[14],
                        y: foundationToken.unit[8],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[14],
                        y: foundationToken.unit[8],
                    },
                },
                [MultiSelectV2Size.LARGE]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[10],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[10],
                    },
                },
            },
            borderRadius: {
                [MultiSelectV2Size.SMALL]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [MultiSelectV2Size.MEDIUM]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [MultiSelectV2Size.LARGE]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
            },
            boxShadow: {
                [MultiSelectV2Variant.CONTAINER]: foundationToken.shadows.xs,
                [MultiSelectV2Variant.NO_CONTAINER]: 'none',
            },
            backgroundColor: {
                [MultiSelectV2Variant.CONTAINER]: {
                    open: foundationToken.colors.gray[800],
                    closed: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[800],
                    error: foundationToken.colors.red[900],
                },
                [MultiSelectV2Variant.NO_CONTAINER]: {
                    open: 'transparent',
                    closed: 'transparent',
                    hover: 'transparent',
                    focus: 'transparent',
                    error: 'transparent',
                },
            },
            outline: {
                [MultiSelectV2Variant.CONTAINER]: {
                    open: `1px solid ${foundationToken.colors.primary[500]}`,
                    closed: `1px solid ${foundationToken.colors.gray[700]}`,
                    hover: `1px solid ${foundationToken.colors.gray[600]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                },
                [MultiSelectV2Variant.NO_CONTAINER]: {
                    open: 'none',
                    closed: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                },
            },
            slot: { gap: foundationToken.unit[8] },
            selectionTag: {
                [MultiSelectV2Variant.CONTAINER]: {
                    [MultiSelectV2SelectionTagType.COUNT]: {
                        color: foundationToken.colors.gray[300],
                        backgroundColor: foundationToken.colors.gray[700],
                        fontWeight: foundationToken.font.weight[500],
                    },
                    [MultiSelectV2SelectionTagType.TEXT]: {
                        color: foundationToken.colors.gray[400],
                        backgroundColor: 'transparent',
                        fontWeight: foundationToken.font.weight[500],
                    },
                },
                [MultiSelectV2Variant.NO_CONTAINER]: {
                    [MultiSelectV2SelectionTagType.COUNT]: {
                        color: foundationToken.colors.gray[300],
                        backgroundColor: foundationToken.colors.gray[700],
                        fontWeight: foundationToken.font.weight[500],
                    },
                    [MultiSelectV2SelectionTagType.TEXT]: {
                        color: foundationToken.colors.gray[400],
                        backgroundColor: 'transparent',
                        fontWeight: foundationToken.font.weight[500],
                    },
                },
                marginLeft: foundationToken.unit[8],
                borderRadius: foundationToken.unit[6],
                paddingCount: `0 ${foundationToken.unit[6]}`,
                paddingText: '0',
            },
            chevron: { gap: foundationToken.unit[4] },
            placeholder: {
                color: foundationToken.colors.gray[500],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
            },
            selectedValue: {
                color: foundationToken.colors.gray[100],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
            },
        },

        menu: {
            backgroundColor: foundationToken.colors.gray[800],
            border: `1px solid ${foundationToken.colors.gray[700]}`,
            borderRadius: foundationToken.unit[8],
            padding: {
                [MultiSelectV2Size.SMALL]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                },
                [MultiSelectV2Size.MEDIUM]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                },
                [MultiSelectV2Size.LARGE]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                },
            },
            minWidth: 250,
            scroll: {
                height: 80,
                maxHeight: 320,
            },
            header: {
                backgroundColor: foundationToken.colors.gray[800],
                borderBottom: `1px solid ${foundationToken.colors.gray[700]}`,
                selectAllRowPaddingLeft: foundationToken.unit[4],
                selectAllRowPaddingRight: foundationToken.unit[4],
            },
            selectAll: {
                padding: foundationToken.unit[8],
                borderRadius: foundationToken.unit[4],
            },
            list: {
                padding: foundationToken.unit[6],
                paddingTop: foundationToken.unit[6],
            },
            actions: {
                padding: foundationToken.unit[16],
                gap: foundationToken.unit[8],
                backgroundColor: foundationToken.colors.gray[800],
                borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
            },
            item: {
                padding: foundationToken.unit[4],
                margin: foundationToken.unit[4],
                borderRadius: foundationToken.unit[10],
                gap: foundationToken.unit[4],
                backgroundColor: {
                    default: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[700],
                    active: foundationToken.colors.gray[600],
                    focus: foundationToken.colors.gray[700],
                    focusVisible: foundationToken.colors.gray[700],
                    disabled: 'transparent',
                    selected: foundationToken.colors.gray[700],
                },
                optionsLabel: {
                    fontSize: 12,
                    fontWeight: foundationToken.font.weight[400],
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        active: foundationToken.colors.gray[400],
                        focus: foundationToken.colors.gray[400],
                        focusVisible: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[600],
                        selected: foundationToken.colors.gray[400],
                    },
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                },
                option: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[200],
                        active: foundationToken.colors.gray[200],
                        focus: foundationToken.colors.gray[200],
                        focusVisible: foundationToken.colors.gray[200],
                        disabled: foundationToken.colors.gray[600],
                        selected: foundationToken.colors.gray[200],
                    },
                },
                description: {
                    fontSize: foundationToken.font.size.body.xs.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        active: foundationToken.colors.gray[400],
                        focus: foundationToken.colors.gray[400],
                        focusVisible: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[600],
                        selected: foundationToken.colors.gray[400],
                    },
                },
                seperator: {
                    color: foundationToken.colors.gray[700],
                    height: '1px',
                    margin: `${foundationToken.unit[6]} 0`,
                },
            },
        },

        subMenu: {
            trigger: {
                padding: `${foundationToken.unit[8]} ${foundationToken.unit[6]}`,
                margin: `0 ${foundationToken.unit[6]}`,
                borderRadius: foundationToken.unit[4],
            },
            content: {
                borderRadius: foundationToken.unit[8],
                padding: `${foundationToken.unit[8]} 0`,
            },
        },

        drawer: {
            header: {
                paddingX: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[12],
                borderBottom: `1px solid ${foundationToken.colors.gray[700]}`,
            },
            search: {
                paddingX: foundationToken.unit[16],
                marginTop: foundationToken.unit[8],
                marginBottom: foundationToken.unit[4],
            },
            content: {
                gap: foundationToken.unit[4],
            },
        },
    })

    const baseTokens = createBaseTokens()
    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
