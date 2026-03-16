import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveMenuV2TokensType } from './menuV2.tokens'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'

const createBaseTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMenuV2TokensType['sm'] => ({
    content: {
        backgroundColor: foundationToken.colors.gray[0],
        border: `1px solid ${foundationToken.colors.gray[200]}`,
        borderRadius: foundationToken.unit[8],
        boxShadow: foundationToken.shadows.sm,
        zIndex: foundationToken.zIndex[101],
        minWidth: 200,
        maxWidth: 280,
        paddingTop: foundationToken.unit[6],
        paddingRight: foundationToken.unit[6],
        paddingBottom: foundationToken.unit[6],
        paddingLeft: foundationToken.unit[6],
    },
    item: {
        paddingTop: foundationToken.unit[8],
        paddingRight: foundationToken.unit[8],
        paddingBottom: foundationToken.unit[8],
        paddingLeft: foundationToken.unit[8],
        marginTop: foundationToken.unit[0],
        marginRight: foundationToken.unit[4],
        marginBottom: foundationToken.unit[0],
        marginLeft: foundationToken.unit[4],
        borderRadius: foundationToken.unit[4],
        gap: foundationToken.unit[4],
        backgroundColor: {
            [MenuV2ItemVariant.DEFAULT]: {
                enabled: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[50],
                    focus: foundationToken.colors.gray[50],
                    focusVisible: foundationToken.colors.gray[50],
                    disabled: foundationToken.colors.gray[0],
                    selected: foundationToken.colors.gray[0],
                },
                disabled: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[0],
                    active: foundationToken.colors.gray[0],
                    focus: foundationToken.colors.gray[0],
                    focusVisible: foundationToken.colors.gray[0],
                    disabled: foundationToken.colors.gray[0],
                    selected: foundationToken.colors.gray[0],
                },
            },
            [MenuV2ItemVariant.ACTION]: {
                [MenuV2ItemActionType.PRIMARY]: {
                    enabled: {
                        default: foundationToken.colors.primary[50],
                        hover: foundationToken.colors.primary[100],
                        active: foundationToken.colors.primary[50],
                        focus: foundationToken.colors.primary[100],
                        focusVisible: foundationToken.colors.primary[100],
                        disabled: foundationToken.colors.gray[0],
                        selected: foundationToken.colors.primary[50],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        focus: foundationToken.colors.gray[0],
                        focusVisible: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                        selected: foundationToken.colors.gray[0],
                    },
                },
                [MenuV2ItemActionType.DANGER]: {
                    enabled: {
                        default: foundationToken.colors.red[50],
                        hover: foundationToken.colors.red[100],
                        active: foundationToken.colors.red[100],
                        focus: foundationToken.colors.red[100],
                        focusVisible: foundationToken.colors.red[100],
                        disabled: foundationToken.colors.gray[0],
                        selected: foundationToken.colors.red[50],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        focus: foundationToken.colors.gray[0],
                        focusVisible: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                        selected: foundationToken.colors.gray[0],
                    },
                },
            },
        },
        optionsLabel: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            fontWeight: foundationToken.font.weight[400],
            lineHeight: foundationToken.font.lineHeight[12],
            color: foundationToken.colors.gray[400],
            paddingTop: foundationToken.unit[6],
            paddingRight: foundationToken.unit[8],
            paddingBottom: foundationToken.unit[6],
            paddingLeft: foundationToken.unit[8],
            marginTop: foundationToken.unit[0],
            marginRight: foundationToken.unit[6],
            marginBottom: foundationToken.unit[0],
            marginLeft: foundationToken.unit[6],
        },
        option: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[500],
            lineHeight: foundationToken.font.lineHeight[14],
            color: {
                [MenuV2ItemVariant.DEFAULT]: {
                    enabled: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[600],
                        active: foundationToken.colors.gray[600],
                        focus: foundationToken.colors.gray[600],
                        focusVisible: foundationToken.colors.gray[600],
                        disabled: foundationToken.colors.gray[400],
                        selected: foundationToken.colors.gray[600],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        active: foundationToken.colors.gray[400],
                        focus: foundationToken.colors.gray[400],
                        focusVisible: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[400],
                        selected: foundationToken.colors.gray[400],
                    },
                },
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: {
                            default: foundationToken.colors.primary[600],
                            hover: foundationToken.colors.primary[600],
                            active: foundationToken.colors.primary[600],
                            focus: foundationToken.colors.primary[600],
                            focusVisible: foundationToken.colors.primary[600],
                            disabled: foundationToken.colors.gray[400],
                            selected: foundationToken.colors.primary[600],
                        },
                        disabled: {
                            default: foundationToken.colors.primary[400],
                            hover: foundationToken.colors.primary[400],
                            active: foundationToken.colors.primary[400],
                            focus: foundationToken.colors.primary[400],
                            focusVisible: foundationToken.colors.primary[400],
                            disabled: foundationToken.colors.primary[400],
                            selected: foundationToken.colors.primary[400],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: foundationToken.colors.red[600],
                            hover: foundationToken.colors.red[600],
                            active: foundationToken.colors.red[600],
                            focus: foundationToken.colors.red[600],
                            focusVisible: foundationToken.colors.red[600],
                            disabled: foundationToken.colors.red[400],
                            selected: foundationToken.colors.red[600],
                        },
                        disabled: {
                            default: foundationToken.colors.red[400],
                            hover: foundationToken.colors.red[400],
                            active: foundationToken.colors.red[400],
                            focus: foundationToken.colors.red[400],
                            focusVisible: foundationToken.colors.red[400],
                            disabled: foundationToken.colors.red[400],
                            selected: foundationToken.colors.red[400],
                        },
                    },
                },
            },
        },
        description: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            fontWeight: foundationToken.font.weight[400],
            lineHeight: foundationToken.font.lineHeight[12],
            color: {
                [MenuV2ItemVariant.DEFAULT]: {
                    enabled: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        active: foundationToken.colors.gray[400],
                        focus: foundationToken.colors.gray[400],
                        focusVisible: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[400],
                        selected: foundationToken.colors.gray[400],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[400],
                        hover: foundationToken.colors.gray[400],
                        active: foundationToken.colors.gray[400],
                        focus: foundationToken.colors.gray[400],
                        focusVisible: foundationToken.colors.gray[400],
                        disabled: foundationToken.colors.gray[400],
                        selected: foundationToken.colors.gray[400],
                    },
                },
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: {
                            default: foundationToken.colors.primary[400],
                            hover: foundationToken.colors.primary[400],
                            active: foundationToken.colors.primary[400],
                            focus: foundationToken.colors.primary[400],
                            focusVisible: foundationToken.colors.primary[400],
                            disabled: foundationToken.colors.gray[400],
                            selected: foundationToken.colors.primary[400],
                        },
                        disabled: {
                            default: foundationToken.colors.primary[400],
                            hover: foundationToken.colors.primary[400],
                            active: foundationToken.colors.primary[400],
                            focus: foundationToken.colors.primary[400],
                            focusVisible: foundationToken.colors.primary[400],
                            disabled: foundationToken.colors.primary[400],
                            selected: foundationToken.colors.primary[400],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: foundationToken.colors.red[400],
                            hover: foundationToken.colors.red[400],
                            active: foundationToken.colors.red[400],
                            focus: foundationToken.colors.red[400],
                            focusVisible: foundationToken.colors.red[400],
                            disabled: foundationToken.colors.red[400],
                            selected: foundationToken.colors.red[400],
                        },
                        disabled: {
                            default: foundationToken.colors.red[400],
                            hover: foundationToken.colors.red[400],
                            active: foundationToken.colors.red[400],
                            focus: foundationToken.colors.red[400],
                            focusVisible: foundationToken.colors.red[400],
                            disabled: foundationToken.colors.red[400],
                            selected: foundationToken.colors.red[400],
                        },
                    },
                },
            },
        },
        separator: {
            color: foundationToken.colors.gray[200],
            height: foundationToken.unit[1],
            marginTop: foundationToken.unit[6],
            marginRight: foundationToken.unit[0],
            marginBottom: foundationToken.unit[6],
            marginLeft: foundationToken.unit[0],
        },
    },
})

export const getMenuV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMenuV2TokensType => {
    const base = createBaseTokens(foundationToken)
    return {
        sm: base,
        lg: base,
    }
}
