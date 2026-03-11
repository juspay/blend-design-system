import type { FoundationTokenType } from '../../tokens/theme.token'
import {
    MultiSelectV2SelectionTagType,
    MultiSelectV2Size,
    MultiSelectV2Variant,
} from './multiSelectV2.types'
import type { ResponsiveMultiSelectV2Tokens } from './multiSelectV2.tokens'

export const getMultiSelectV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMultiSelectV2Tokens => {
    const createBaseTokens = (): ResponsiveMultiSelectV2Tokens['sm'] => ({
        gap: foundationToken.unit[8],
        label: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[500],
            color: {
                default: foundationToken.colors.gray[700],
                hover: foundationToken.colors.gray[700],
                active: foundationToken.colors.gray[700],
                focus: foundationToken.colors.gray[700],
                focusVisible: foundationToken.colors.gray[700],
                disabled: foundationToken.colors.gray[300],
                selected: foundationToken.colors.gray[700],
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
                disabled: foundationToken.colors.gray[300],
                selected: foundationToken.colors.gray[400],
            },
        },
        hintText: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[400],
            color: {
                default: foundationToken.colors.gray[500],
                hover: foundationToken.colors.gray[500],
                active: foundationToken.colors.gray[500],
                focus: foundationToken.colors.gray[500],
                focusVisible: foundationToken.colors.gray[500],
                disabled: foundationToken.colors.gray[400],
                selected: foundationToken.colors.gray[500],
            },
        },
        errorMessage: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[500],
            color: foundationToken.colors.red[600],
        },
        required: {
            color: foundationToken.colors.red[600],
        },

        trigger: {
            height: {
                [MultiSelectV2Size.SM]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[32],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[32],
                },
                [MultiSelectV2Size.MD]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[36],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[36],
                },
                [MultiSelectV2Size.LG]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[40],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[40],
                },
            },
            padding: {
                [MultiSelectV2Size.SM]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[7],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[7],
                        left: foundationToken.unit[14],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[7],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[7],
                        left: foundationToken.unit[14],
                    },
                },
                [MultiSelectV2Size.MD]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[14],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[14],
                    },
                },
                [MultiSelectV2Size.LG]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                },
            },
            borderRadius: {
                [MultiSelectV2Size.SM]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [MultiSelectV2Size.MD]: {
                    [MultiSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [MultiSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [MultiSelectV2Size.LG]: {
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
                    open: foundationToken.colors.gray[25],
                    closed: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    focus: foundationToken.colors.gray[50],
                    error: foundationToken.colors.red[50],
                },
                [MultiSelectV2Variant.NO_CONTAINER]: {
                    open: 'transparent',
                    closed: 'transparent',
                    hover: foundationToken.colors.gray[50],
                    focus: foundationToken.colors.gray[50],
                    error: 'transparent',
                },
            },
            outline: {
                [MultiSelectV2Variant.CONTAINER]: {
                    open: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    closed: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    hover: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    focus: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    error: `1px solid ${foundationToken.colors.red[600]} !important`,
                },
                [MultiSelectV2Variant.NO_CONTAINER]: {
                    open: 'none',
                    closed: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                },
            },
            slot: {
                gap: foundationToken.unit[8],
                width: foundationToken.unit[20],
            },
            selectionTag: {
                [MultiSelectV2Variant.CONTAINER]: {
                    [MultiSelectV2SelectionTagType.COUNT]: {
                        color: foundationToken.colors.gray[0],
                        backgroundColor: foundationToken.colors.primary[600],
                        fontWeight: foundationToken.font.weight[500],
                    },
                    [MultiSelectV2SelectionTagType.TEXT]: {
                        color: foundationToken.colors.gray[600],
                        backgroundColor: 'transparent',
                        fontWeight: foundationToken.font.weight[500],
                    },
                },
                [MultiSelectV2Variant.NO_CONTAINER]: {
                    [MultiSelectV2SelectionTagType.COUNT]: {
                        color: foundationToken.colors.gray[0],
                        backgroundColor: foundationToken.colors.primary[600],
                        fontWeight: foundationToken.font.weight[500],
                    },
                    [MultiSelectV2SelectionTagType.TEXT]: {
                        color: foundationToken.colors.gray[600],
                        backgroundColor: 'transparent',
                        fontWeight: foundationToken.font.weight[500],
                    },
                },
                marginLeft: foundationToken.unit[8],
                borderRadius: foundationToken.unit[4],
                paddingCount: `0 ${foundationToken.unit[6]}`,
                paddingText: '0',
            },
            chevron: {
                gap: foundationToken.unit[4],
                width: 20,
                height: 20,
                iconSize: 16,
            },
            clearButton: {
                backgroundColor: {
                    open: foundationToken.colors.gray[0],
                    closed: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[25],
                    focus: foundationToken.colors.gray[25],
                    error: foundationToken.colors.gray[0],
                },
                outline: {
                    open: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    closed: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    hover: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    focus: `1px solid ${foundationToken.colors.gray[400]} !important`,
                    error: `1px solid ${foundationToken.colors.red[600]} !important`,
                },
                color: foundationToken.colors.gray[400],
                width: foundationToken.unit[16],
            },
            floatingLabel: {
                paddingTop: '0.375rem',
            },
            placeholder: {
                color: foundationToken.colors.gray[400],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
            },
            selectedValue: {
                color: foundationToken.colors.gray[700],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
            },
        },

        menu: {
            backgroundColor: foundationToken.colors.gray[0],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.unit[8],
            padding: {
                [MultiSelectV2Size.SM]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                },
                [MultiSelectV2Size.MD]: {
                    [MultiSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                    [MultiSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[6],
                    },
                },
                [MultiSelectV2Size.LG]: {
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
                backgroundColor: foundationToken.colors.gray[0],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
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
                backgroundColor: foundationToken.colors.gray[0],
                borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
            },
            item: {
                padding: foundationToken.unit[4],
                margin: foundationToken.unit[4],
                borderRadius: foundationToken.unit[10],
                gap: foundationToken.unit[4],
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[100],
                    focus: foundationToken.colors.gray[50],
                    focusVisible: foundationToken.colors.gray[50],
                    disabled: 'transparent',
                    selected: foundationToken.colors.gray[50],
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
                        disabled: foundationToken.colors.gray[300],
                        selected: foundationToken.colors.gray[400],
                    },
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                },
                option: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[600],
                        active: foundationToken.colors.gray[600],
                        focus: foundationToken.colors.gray[600],
                        focusVisible: foundationToken.colors.gray[600],
                        disabled: foundationToken.colors.gray[300],
                        selected: foundationToken.colors.gray[600],
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
                        disabled: foundationToken.colors.gray[300],
                        selected: foundationToken.colors.gray[400],
                    },
                },
                seperator: {
                    color: foundationToken.colors.gray[200],
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
                paddingLeft: foundationToken.unit[16],
                paddingRight: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[12],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
            },
            search: {
                paddingLeft: foundationToken.unit[16],
                paddingRight: foundationToken.unit[16],
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
