import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSingleSelectV2Tokens } from './singleSelectV2.tokens'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from './singleSelectV2.types'

export const getSingleSelectV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSingleSelectV2Tokens => {
    const createBaseTokens = (): ResponsiveSingleSelectV2Tokens['sm'] => ({
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
                disabled: foundationToken.colors.gray[400],
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
        required: { color: foundationToken.colors.red[600] },

        trigger: {
            height: {
                [SingleSelectV2Size.SM]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[32],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[32],
                },
                [SingleSelectV2Size.MD]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[36],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[36],
                },
                [SingleSelectV2Size.LG]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[40],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[40],
                },
            },
            padding: {
                [SingleSelectV2Size.SM]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[7],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[7],
                        left: foundationToken.unit[14],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[7],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[7],
                        left: foundationToken.unit[14],
                    },
                },
                [SingleSelectV2Size.MD]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[14],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[14],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[14],
                    },
                },
                [SingleSelectV2Size.LG]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                },
            },
            borderRadius: {
                [SingleSelectV2Size.SM]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [SingleSelectV2Size.MD]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[10],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[10],
                },
                [SingleSelectV2Size.LG]: {
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
                    open: foundationToken.colors.gray[25],
                    closed: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    focus: foundationToken.colors.gray[50],
                    error: foundationToken.colors.gray[0],
                },
                [SingleSelectV2Variant.NO_CONTAINER]: {
                    open: 'transparent',
                    closed: 'transparent',
                    hover: foundationToken.colors.gray[50],
                    focus: foundationToken.colors.gray[50],
                    error: 'transparent',
                },
            },
            outline: {
                [SingleSelectV2Variant.CONTAINER]: {
                    open: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    closed: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    hover: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    focus: `1px solid ${foundationToken.colors.gray[200]} !important`,
                    error: `1px solid ${foundationToken.colors.red[600]} !important`,
                },
                [SingleSelectV2Variant.NO_CONTAINER]: {
                    open: undefined,
                    closed: undefined,
                    hover: undefined,
                    focus: undefined,
                    error: undefined,
                },
            },
            placeholder: {
                color: foundationToken.colors.gray[400],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
            },
            selectedValue: {
                color: foundationToken.colors.gray[700],
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[500],
            },
        },

        menu: {
            content: {
                backgroundColor: foundationToken.colors.gray[0],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.unit[8],
                boxShadow: foundationToken.shadows.sm,
            },
            padding: {
                [SingleSelectV2Size.SM]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[6],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[6],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[6],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[6],
                    },
                },
                [SingleSelectV2Size.MD]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[6],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[6],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[6],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[6],
                    },
                },
                [SingleSelectV2Size.LG]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[6],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[6],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[6],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[6],
                    },
                },
            },
            groupLabel: {
                margin: `0 ${foundationToken.unit[8]}`,
                paddingTop: foundationToken.unit[8],
                paddingRight: foundationToken.unit[6],
                paddingBottom: foundationToken.unit[8],
                paddingLeft: foundationToken.unit[6],
                fontSize: foundationToken.font.size.body.sm.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[400],
                    active: foundationToken.colors.gray[400],
                    focus: foundationToken.colors.gray[400],
                    focusVisible: foundationToken.colors.gray[400],
                    disabled: foundationToken.colors.gray[400],
                    selected: foundationToken.colors.gray[400],
                },
            },
            item: {
                paddingTop: foundationToken.unit[6],
                paddingRight: foundationToken.unit[8],
                paddingBottom: foundationToken.unit[6],
                paddingLeft: foundationToken.unit[8],
                margin: `${foundationToken.unit[0]} ${foundationToken.unit[4]}`,
                borderRadius: foundationToken.unit[8],
                gap: foundationToken.unit[4],
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[100],
                    focus: foundationToken.colors.gray[100],
                    focusVisible: foundationToken.colors.gray[100],
                    disabled: foundationToken.colors.gray[50],
                    selected: foundationToken.colors.gray[50],
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
                        disabled: foundationToken.colors.gray[400],
                        selected: foundationToken.colors.gray[400],
                    },
                },
                option: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[700],
                        focus: foundationToken.colors.gray[700],
                        focusVisible: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                        selected: foundationToken.colors.gray[700],
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
                        disabled: foundationToken.colors.gray[100],
                        selected: foundationToken.colors.gray[400],
                    },
                },
                separator: {
                    color: foundationToken.colors.gray[200],
                    height: 1,
                    margin: `${foundationToken.unit[6]} 0`,
                },
            },
            submenu: {
                trigger: {
                    paddingTop: foundationToken.unit[8],
                    paddingRight: foundationToken.unit[6],
                    paddingBottom: foundationToken.unit[8],
                    paddingLeft: foundationToken.unit[6],
                    margin: `0 ${foundationToken.unit[8]}`,
                    borderRadius: foundationToken.unit[4],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        focus: foundationToken.colors.gray[50],
                    },
                },
                content: {
                    backgroundColor: foundationToken.colors.gray[0],
                    border: `1px solid ${foundationToken.colors.gray[200]}`,
                    borderRadius: foundationToken.unit[8],
                    paddingTop: foundationToken.unit[6],
                    paddingRight: foundationToken.unit[6],
                    paddingBottom: foundationToken.unit[6],
                    paddingLeft: foundationToken.unit[6],
                    boxShadow: foundationToken.shadows.lg,
                },
                optionText: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: foundationToken.colors.gray[600],
                },
                iconColor: foundationToken.colors.gray[400],
            },
        },

        mobilePanel: {
            header: {
                paddingTop: foundationToken.unit[0],
                paddingRight: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[16],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
            },
        },
    })

    const baseTokens = createBaseTokens()
    return { sm: baseTokens, lg: baseTokens }
}
