import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSingleSelectV2Tokens } from './singleSelectV2.tokens'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from './singleSelectV2.types'

export const getSingleSelectV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSingleSelectV2Tokens => {
    const createBaseTokens = (): ResponsiveSingleSelectV2Tokens['sm'] => ({
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
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[32],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[32],
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[36],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[36],
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[40],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[40],
                },
            },
            padding: {
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        paddingInline: foundationToken.unit[14],
                        paddingBlock: foundationToken.unit[7],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        paddingInline: foundationToken.unit[14],
                        paddingBlock: foundationToken.unit[7],
                    },
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        paddingInline: foundationToken.unit[14],
                        paddingBlock: foundationToken.unit[8],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        paddingInline: foundationToken.unit[14],
                        paddingBlock: foundationToken.unit[8],
                    },
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        paddingInline: foundationToken.unit[12],
                        paddingBlock: foundationToken.unit[10],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        paddingInline: foundationToken.unit[12],
                        paddingBlock: foundationToken.unit[10],
                    },
                },
            },
            borderRadius: {
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
            },
            boxShadow: {
                [SingleSelectV2Variant.CONTAINER]: foundationToken.shadows.xs,
                [SingleSelectV2Variant.NO_CONTAINER]: 'none',
            },
            slot: {
                gap: foundationToken.unit[8],
                width: foundationToken.unit[20],
            },
            backgroundColor: {
                [SingleSelectV2Variant.CONTAINER]: {
                    open: foundationToken.colors.gray[800],
                    closed: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[800],
                    error: foundationToken.colors.red[900],
                },
                [SingleSelectV2Variant.NO_CONTAINER]: {
                    open: 'transparent',
                    closed: 'transparent',
                    hover: 'transparent',
                    focus: 'transparent',
                    error: 'transparent',
                },
            },
            outline: {
                [SingleSelectV2Variant.CONTAINER]: {
                    open: `1px solid ${foundationToken.colors.primary[500]}`,
                    closed: `1px solid ${foundationToken.colors.gray[700]}`,
                    hover: `1px solid ${foundationToken.colors.gray[600]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                    error: `1px solid ${foundationToken.colors.red[500]}`,
                },
                [SingleSelectV2Variant.NO_CONTAINER]: {
                    open: 'none',
                    closed: 'none',
                    hover: 'none',
                    focus: 'none',
                    error: 'none',
                },
            },
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
            content: {
                backgroundColor: foundationToken.colors.gray[800],
                border: `1px solid ${foundationToken.colors.gray[700]}`,
                borderRadius: foundationToken.unit[8],
                boxShadow: foundationToken.shadows.lg,
            },
            padding: {
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        paddingInline: foundationToken.unit[6],
                        paddingBlock: foundationToken.unit[6],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        paddingInline: foundationToken.unit[6],
                        paddingBlock: foundationToken.unit[6],
                    },
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        paddingInline: foundationToken.unit[6],
                        paddingBlock: foundationToken.unit[6],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        paddingInline: foundationToken.unit[6],
                        paddingBlock: foundationToken.unit[6],
                    },
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        paddingInline: foundationToken.unit[6],
                        paddingBlock: foundationToken.unit[6],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        paddingInline: foundationToken.unit[6],
                        paddingBlock: foundationToken.unit[6],
                    },
                },
            },
            groupLabel: {
                margin: `0 ${foundationToken.unit[8]}`,
                padding: `${foundationToken.unit[8]} ${foundationToken.unit[6]}`,
                fontSize: foundationToken.font.size.body.sm.fontSize,
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
            item: {
                padding: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
                margin: `${foundationToken.unit[0]} ${foundationToken.unit[4]}`,
                borderRadius: foundationToken.unit[8],
                gap: foundationToken.unit[4],
                backgroundColor: {
                    default: foundationToken.colors.gray[800],
                    hover: foundationToken.colors.gray[700],
                    active: foundationToken.colors.gray[600],
                    focus: foundationToken.colors.gray[700],
                    focusVisible: foundationToken.colors.gray[700],
                    disabled: foundationToken.colors.gray[800],
                    selected: foundationToken.colors.gray[700],
                },
                groupLabelText: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
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
                option: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[100],
                        active: foundationToken.colors.gray[100],
                        focus: foundationToken.colors.gray[100],
                        focusVisible: foundationToken.colors.gray[100],
                        disabled: foundationToken.colors.gray[600],
                        selected: foundationToken.colors.gray[100],
                    },
                },
                description: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
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
                separator: {
                    color: foundationToken.colors.gray[700],
                    height: 1,
                    margin: `${foundationToken.unit[6]} 0`,
                },
            },
            submenu: {
                trigger: {
                    padding: `${foundationToken.unit[8]} ${foundationToken.unit[6]}`,
                    margin: `0 ${foundationToken.unit[8]}`,
                    borderRadius: foundationToken.unit[4],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[700],
                        focus: foundationToken.colors.gray[700],
                    },
                },
                content: {
                    backgroundColor: foundationToken.colors.gray[800],
                    border: `1px solid ${foundationToken.colors.gray[700]}`,
                    borderRadius: foundationToken.unit[8],
                    padding: `${foundationToken.unit[8]} 0`,
                    boxShadow: foundationToken.shadows.lg,
                },
                optionText: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: foundationToken.colors.gray[200],
                },
                iconColor: foundationToken.colors.gray[500],
            },
        },

        mobilePanel: {
            header: {
                paddingInline: foundationToken.unit[16],
                paddingBlockEnd: foundationToken.unit[12],
                borderBottom: `1px solid ${foundationToken.colors.gray[700]}`,
            },
        },
    })

    const baseTokens = createBaseTokens()
    return { sm: baseTokens, lg: baseTokens }
}
