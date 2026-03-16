import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveMenuV2TokensType } from './menuV2.tokens'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'

const createBaseTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMenuV2TokensType['sm'] => ({
    content: {
        backgroundColor: foundationToken.colors.gray[900],
        border: `1px solid ${foundationToken.colors.gray[700]}`,
        borderRadius: foundationToken.unit[8],
        boxShadow: foundationToken.shadows.md,
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
                    default: foundationToken.colors.gray[900],
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[800],
                    focus: foundationToken.colors.gray[800],
                    focusVisible: foundationToken.colors.gray[800],
                    disabled: foundationToken.colors.gray[900],
                    selected: foundationToken.colors.gray[900],
                },
                disabled: {
                    default: foundationToken.colors.gray[900],
                    hover: foundationToken.colors.gray[900],
                    active: foundationToken.colors.gray[900],
                    focus: foundationToken.colors.gray[900],
                    focusVisible: foundationToken.colors.gray[900],
                    disabled: foundationToken.colors.gray[900],
                    selected: foundationToken.colors.gray[900],
                },
            },
            [MenuV2ItemVariant.ACTION]: {
                [MenuV2ItemActionType.PRIMARY]: {
                    enabled: {
                        default: foundationToken.colors.primary[950],
                        hover: foundationToken.colors.primary[900],
                        active: foundationToken.colors.primary[900],
                        focus: foundationToken.colors.primary[900],
                        focusVisible: foundationToken.colors.primary[900],
                        disabled: foundationToken.colors.gray[900],
                        selected: foundationToken.colors.primary[950],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[900],
                        hover: foundationToken.colors.gray[900],
                        active: foundationToken.colors.gray[900],
                        focus: foundationToken.colors.gray[900],
                        focusVisible: foundationToken.colors.gray[900],
                        disabled: foundationToken.colors.gray[900],
                        selected: foundationToken.colors.gray[900],
                    },
                },
                [MenuV2ItemActionType.DANGER]: {
                    enabled: {
                        default: foundationToken.colors.red[950],
                        hover: foundationToken.colors.red[900],
                        active: foundationToken.colors.red[900],
                        focus: foundationToken.colors.red[900],
                        focusVisible: foundationToken.colors.red[900],
                        disabled: foundationToken.colors.gray[900],
                        selected: foundationToken.colors.red[950],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[900],
                        hover: foundationToken.colors.gray[900],
                        active: foundationToken.colors.gray[900],
                        focus: foundationToken.colors.gray[900],
                        focusVisible: foundationToken.colors.gray[900],
                        disabled: foundationToken.colors.gray[900],
                        selected: foundationToken.colors.gray[900],
                    },
                },
            },
        },
        optionsLabel: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            fontWeight: foundationToken.font.weight[400],
            lineHeight: foundationToken.font.lineHeight[12],
            color: foundationToken.colors.gray[500],
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
                        default: foundationToken.colors.gray[200],
                        hover: foundationToken.colors.gray[200],
                        active: foundationToken.colors.gray[200],
                        focus: foundationToken.colors.gray[200],
                        focusVisible: foundationToken.colors.gray[200],
                        disabled: foundationToken.colors.gray[500],
                        selected: foundationToken.colors.gray[200],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[500],
                        active: foundationToken.colors.gray[500],
                        focus: foundationToken.colors.gray[500],
                        focusVisible: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[500],
                        selected: foundationToken.colors.gray[500],
                    },
                },
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: {
                            default: foundationToken.colors.primary[300],
                            hover: foundationToken.colors.primary[300],
                            active: foundationToken.colors.primary[300],
                            focus: foundationToken.colors.primary[300],
                            focusVisible: foundationToken.colors.primary[300],
                            disabled: foundationToken.colors.gray[500],
                            selected: foundationToken.colors.primary[300],
                        },
                        disabled: {
                            default: foundationToken.colors.primary[600],
                            hover: foundationToken.colors.primary[600],
                            active: foundationToken.colors.primary[600],
                            focus: foundationToken.colors.primary[600],
                            focusVisible: foundationToken.colors.primary[600],
                            disabled: foundationToken.colors.primary[600],
                            selected: foundationToken.colors.primary[600],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: foundationToken.colors.red[400],
                            hover: foundationToken.colors.red[400],
                            active: foundationToken.colors.red[400],
                            focus: foundationToken.colors.red[400],
                            focusVisible: foundationToken.colors.red[400],
                            disabled: foundationToken.colors.red[600],
                            selected: foundationToken.colors.red[400],
                        },
                        disabled: {
                            default: foundationToken.colors.red[600],
                            hover: foundationToken.colors.red[600],
                            active: foundationToken.colors.red[600],
                            focus: foundationToken.colors.red[600],
                            focusVisible: foundationToken.colors.red[600],
                            disabled: foundationToken.colors.red[600],
                            selected: foundationToken.colors.red[600],
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
                        disabled: foundationToken.colors.gray[500],
                        selected: foundationToken.colors.gray[400],
                    },
                    disabled: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[500],
                        active: foundationToken.colors.gray[500],
                        focus: foundationToken.colors.gray[500],
                        focusVisible: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[500],
                        selected: foundationToken.colors.gray[500],
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
                            disabled: foundationToken.colors.gray[500],
                            selected: foundationToken.colors.primary[400],
                        },
                        disabled: {
                            default: foundationToken.colors.primary[500],
                            hover: foundationToken.colors.primary[500],
                            active: foundationToken.colors.primary[500],
                            focus: foundationToken.colors.primary[500],
                            focusVisible: foundationToken.colors.primary[500],
                            disabled: foundationToken.colors.primary[500],
                            selected: foundationToken.colors.primary[500],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: foundationToken.colors.red[400],
                            hover: foundationToken.colors.red[400],
                            active: foundationToken.colors.red[400],
                            focus: foundationToken.colors.red[400],
                            focusVisible: foundationToken.colors.red[400],
                            disabled: foundationToken.colors.red[500],
                            selected: foundationToken.colors.red[400],
                        },
                        disabled: {
                            default: foundationToken.colors.red[500],
                            hover: foundationToken.colors.red[500],
                            active: foundationToken.colors.red[500],
                            focus: foundationToken.colors.red[500],
                            focusVisible: foundationToken.colors.red[500],
                            disabled: foundationToken.colors.red[500],
                            selected: foundationToken.colors.red[500],
                        },
                    },
                },
            },
        },
        separator: {
            color: foundationToken.colors.gray[700],
            height: foundationToken.unit[1],
            marginTop: foundationToken.unit[6],
            marginRight: foundationToken.unit[0],
            marginBottom: foundationToken.unit[6],
            marginLeft: foundationToken.unit[0],
        },
    },
})

export const getMenuV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMenuV2TokensType => {
    const base = createBaseTokens(foundationToken)
    return {
        sm: base,
        lg: base,
    }
}
