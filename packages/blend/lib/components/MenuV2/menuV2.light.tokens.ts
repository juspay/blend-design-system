import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveMenuV2TokensType } from './menuV2.tokens'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'

const createBaseTokens = (
    f: FoundationTokenType
): ResponsiveMenuV2TokensType['sm'] => ({
    content: {
        backgroundColor: f.colors.gray[0],
        border: `1px solid ${f.colors.gray[200]}`,
        borderRadius: f.unit[8],
        boxShadow: f.shadows.sm,
        zIndex: 101,
        minWidth: 200,
        maxWidth: 280,
        paddingTop: f.unit[6],
        paddingRight: f.unit[6],
        paddingBottom: f.unit[6],
        paddingLeft: f.unit[6],
    },
    item: {
        paddingTop: f.unit[8],
        paddingRight: f.unit[8],
        paddingBottom: f.unit[8],
        paddingLeft: f.unit[8],
        marginTop: f.unit[0],
        marginRight: f.unit[4],
        marginBottom: f.unit[0],
        marginLeft: f.unit[4],
        borderRadius: f.unit[4],
        gap: 4,
        backgroundColor: {
            [MenuV2ItemVariant.DEFAULT]: {
                enabled: {
                    default: f.colors.gray[0],
                    hover: f.colors.gray[50],
                    active: f.colors.gray[50],
                    focus: f.colors.gray[50],
                    focusVisible: f.colors.gray[50],
                    disabled: f.colors.gray[0],
                    selected: f.colors.gray[0],
                },
                disabled: {
                    default: f.colors.gray[0],
                    hover: f.colors.gray[0],
                    active: f.colors.gray[0],
                    focus: f.colors.gray[0],
                    focusVisible: f.colors.gray[0],
                    disabled: f.colors.gray[0],
                    selected: f.colors.gray[0],
                },
            },
            [MenuV2ItemVariant.ACTION]: {
                [MenuV2ItemActionType.PRIMARY]: {
                    enabled: {
                        default: f.colors.primary[50],
                        hover: f.colors.primary[100],
                        active: f.colors.primary[50],
                        focus: f.colors.primary[100],
                        focusVisible: f.colors.primary[100],
                        disabled: f.colors.gray[0],
                        selected: f.colors.primary[50],
                    },
                    disabled: {
                        default: f.colors.gray[0],
                        hover: f.colors.gray[0],
                        active: f.colors.gray[0],
                        focus: f.colors.gray[0],
                        focusVisible: f.colors.gray[0],
                        disabled: f.colors.gray[0],
                        selected: f.colors.gray[0],
                    },
                },
                [MenuV2ItemActionType.DANGER]: {
                    enabled: {
                        default: f.colors.red[50],
                        hover: f.colors.red[100],
                        active: f.colors.red[100],
                        focus: f.colors.red[100],
                        focusVisible: f.colors.red[100],
                        disabled: f.colors.gray[0],
                        selected: f.colors.red[50],
                    },
                    disabled: {
                        default: f.colors.gray[0],
                        hover: f.colors.gray[0],
                        active: f.colors.gray[0],
                        focus: f.colors.gray[0],
                        focusVisible: f.colors.gray[0],
                        disabled: f.colors.gray[0],
                        selected: f.colors.gray[0],
                    },
                },
            },
        },
        optionsLabel: {
            fontSize: 12,
            fontWeight: 400,
            color: f.colors.gray[400],
            paddingTop: f.unit[6],
            paddingRight: f.unit[8],
            paddingBottom: f.unit[6],
            paddingLeft: f.unit[8],
            marginTop: f.unit[0],
            marginRight: f.unit[6],
            marginBottom: f.unit[0],
            marginLeft: f.unit[6],
        },
        option: {
            fontSize: 14,
            fontWeight: 500,
            color: {
                [MenuV2ItemVariant.DEFAULT]: {
                    enabled: {
                        default: f.colors.gray[600],
                        hover: f.colors.gray[600],
                        active: f.colors.gray[600],
                        focus: f.colors.gray[600],
                        focusVisible: f.colors.gray[600],
                        disabled: f.colors.gray[400],
                        selected: f.colors.gray[600],
                    },
                    disabled: {
                        default: f.colors.gray[400],
                        hover: f.colors.gray[400],
                        active: f.colors.gray[400],
                        focus: f.colors.gray[400],
                        focusVisible: f.colors.gray[400],
                        disabled: f.colors.gray[400],
                        selected: f.colors.gray[400],
                    },
                },
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: {
                            default: f.colors.primary[600],
                            hover: f.colors.primary[600],
                            active: f.colors.primary[600],
                            focus: f.colors.primary[600],
                            focusVisible: f.colors.primary[600],
                            disabled: f.colors.gray[400],
                            selected: f.colors.primary[600],
                        },
                        disabled: {
                            default: f.colors.primary[400],
                            hover: f.colors.primary[400],
                            active: f.colors.primary[400],
                            focus: f.colors.primary[400],
                            focusVisible: f.colors.primary[400],
                            disabled: f.colors.primary[400],
                            selected: f.colors.primary[400],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: f.colors.red[600],
                            hover: f.colors.red[600],
                            active: f.colors.red[600],
                            focus: f.colors.red[600],
                            focusVisible: f.colors.red[600],
                            disabled: f.colors.red[400],
                            selected: f.colors.red[600],
                        },
                        disabled: {
                            default: f.colors.red[400],
                            hover: f.colors.red[400],
                            active: f.colors.red[400],
                            focus: f.colors.red[400],
                            focusVisible: f.colors.red[400],
                            disabled: f.colors.red[400],
                            selected: f.colors.red[400],
                        },
                    },
                },
            },
        },
        description: {
            fontSize: 12,
            fontWeight: 400,
            color: {
                [MenuV2ItemVariant.DEFAULT]: {
                    enabled: {
                        default: f.colors.gray[400],
                        hover: f.colors.gray[400],
                        active: f.colors.gray[400],
                        focus: f.colors.gray[400],
                        focusVisible: f.colors.gray[400],
                        disabled: f.colors.gray[400],
                        selected: f.colors.gray[400],
                    },
                    disabled: {
                        default: f.colors.gray[400],
                        hover: f.colors.gray[400],
                        active: f.colors.gray[400],
                        focus: f.colors.gray[400],
                        focusVisible: f.colors.gray[400],
                        disabled: f.colors.gray[400],
                        selected: f.colors.gray[400],
                    },
                },
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: {
                            default: f.colors.primary[400],
                            hover: f.colors.primary[400],
                            active: f.colors.primary[400],
                            focus: f.colors.primary[400],
                            focusVisible: f.colors.primary[400],
                            disabled: f.colors.gray[400],
                            selected: f.colors.primary[400],
                        },
                        disabled: {
                            default: f.colors.primary[400],
                            hover: f.colors.primary[400],
                            active: f.colors.primary[400],
                            focus: f.colors.primary[400],
                            focusVisible: f.colors.primary[400],
                            disabled: f.colors.primary[400],
                            selected: f.colors.primary[400],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: f.colors.red[400],
                            hover: f.colors.red[400],
                            active: f.colors.red[400],
                            focus: f.colors.red[400],
                            focusVisible: f.colors.red[400],
                            disabled: f.colors.red[400],
                            selected: f.colors.red[400],
                        },
                        disabled: {
                            default: f.colors.red[400],
                            hover: f.colors.red[400],
                            active: f.colors.red[400],
                            focus: f.colors.red[400],
                            focusVisible: f.colors.red[400],
                            disabled: f.colors.red[400],
                            selected: f.colors.red[400],
                        },
                    },
                },
            },
        },
        separator: {
            color: f.colors.gray[200],
            height: 1,
            marginTop: f.unit[6],
            marginRight: f.unit[0],
            marginBottom: f.unit[6],
            marginLeft: f.unit[0],
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
