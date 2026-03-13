import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveMenuV2TokensType } from './menuV2.tokens'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'

const createBaseTokens = (
    f: FoundationTokenType
): ResponsiveMenuV2TokensType['sm'] => ({
    content: {
        backgroundColor: f.colors.gray[900],
        border: `1px solid ${f.colors.gray[700]}`,
        borderRadius: f.unit[8],
        boxShadow: f.shadows.md,
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
                    default: f.colors.gray[900],
                    hover: f.colors.gray[800],
                    active: f.colors.gray[800],
                    focus: f.colors.gray[800],
                    focusVisible: f.colors.gray[800],
                    disabled: f.colors.gray[900],
                    selected: f.colors.gray[900],
                },
                disabled: {
                    default: f.colors.gray[900],
                    hover: f.colors.gray[900],
                    active: f.colors.gray[900],
                    focus: f.colors.gray[900],
                    focusVisible: f.colors.gray[900],
                    disabled: f.colors.gray[900],
                    selected: f.colors.gray[900],
                },
            },
            [MenuV2ItemVariant.ACTION]: {
                [MenuV2ItemActionType.PRIMARY]: {
                    enabled: {
                        default: f.colors.primary[950],
                        hover: f.colors.primary[900],
                        active: f.colors.primary[900],
                        focus: f.colors.primary[900],
                        focusVisible: f.colors.primary[900],
                        disabled: f.colors.gray[900],
                        selected: f.colors.primary[950],
                    },
                    disabled: {
                        default: f.colors.gray[900],
                        hover: f.colors.gray[900],
                        active: f.colors.gray[900],
                        focus: f.colors.gray[900],
                        focusVisible: f.colors.gray[900],
                        disabled: f.colors.gray[900],
                        selected: f.colors.gray[900],
                    },
                },
                [MenuV2ItemActionType.DANGER]: {
                    enabled: {
                        default: f.colors.red[950],
                        hover: f.colors.red[900],
                        active: f.colors.red[900],
                        focus: f.colors.red[900],
                        focusVisible: f.colors.red[900],
                        disabled: f.colors.gray[900],
                        selected: f.colors.red[950],
                    },
                    disabled: {
                        default: f.colors.gray[900],
                        hover: f.colors.gray[900],
                        active: f.colors.gray[900],
                        focus: f.colors.gray[900],
                        focusVisible: f.colors.gray[900],
                        disabled: f.colors.gray[900],
                        selected: f.colors.gray[900],
                    },
                },
            },
        },
        optionsLabel: {
            fontSize: 12,
            fontWeight: 400,
            color: f.colors.gray[500],
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
                        default: f.colors.gray[200],
                        hover: f.colors.gray[200],
                        active: f.colors.gray[200],
                        focus: f.colors.gray[200],
                        focusVisible: f.colors.gray[200],
                        disabled: f.colors.gray[500],
                        selected: f.colors.gray[200],
                    },
                    disabled: {
                        default: f.colors.gray[500],
                        hover: f.colors.gray[500],
                        active: f.colors.gray[500],
                        focus: f.colors.gray[500],
                        focusVisible: f.colors.gray[500],
                        disabled: f.colors.gray[500],
                        selected: f.colors.gray[500],
                    },
                },
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: {
                            default: f.colors.primary[300],
                            hover: f.colors.primary[300],
                            active: f.colors.primary[300],
                            focus: f.colors.primary[300],
                            focusVisible: f.colors.primary[300],
                            disabled: f.colors.gray[500],
                            selected: f.colors.primary[300],
                        },
                        disabled: {
                            default: f.colors.primary[600],
                            hover: f.colors.primary[600],
                            active: f.colors.primary[600],
                            focus: f.colors.primary[600],
                            focusVisible: f.colors.primary[600],
                            disabled: f.colors.primary[600],
                            selected: f.colors.primary[600],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: f.colors.red[400],
                            hover: f.colors.red[400],
                            active: f.colors.red[400],
                            focus: f.colors.red[400],
                            focusVisible: f.colors.red[400],
                            disabled: f.colors.red[600],
                            selected: f.colors.red[400],
                        },
                        disabled: {
                            default: f.colors.red[600],
                            hover: f.colors.red[600],
                            active: f.colors.red[600],
                            focus: f.colors.red[600],
                            focusVisible: f.colors.red[600],
                            disabled: f.colors.red[600],
                            selected: f.colors.red[600],
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
                        disabled: f.colors.gray[500],
                        selected: f.colors.gray[400],
                    },
                    disabled: {
                        default: f.colors.gray[500],
                        hover: f.colors.gray[500],
                        active: f.colors.gray[500],
                        focus: f.colors.gray[500],
                        focusVisible: f.colors.gray[500],
                        disabled: f.colors.gray[500],
                        selected: f.colors.gray[500],
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
                            disabled: f.colors.gray[500],
                            selected: f.colors.primary[400],
                        },
                        disabled: {
                            default: f.colors.primary[500],
                            hover: f.colors.primary[500],
                            active: f.colors.primary[500],
                            focus: f.colors.primary[500],
                            focusVisible: f.colors.primary[500],
                            disabled: f.colors.primary[500],
                            selected: f.colors.primary[500],
                        },
                    },
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: {
                            default: f.colors.red[400],
                            hover: f.colors.red[400],
                            active: f.colors.red[400],
                            focus: f.colors.red[400],
                            focusVisible: f.colors.red[400],
                            disabled: f.colors.red[500],
                            selected: f.colors.red[400],
                        },
                        disabled: {
                            default: f.colors.red[500],
                            hover: f.colors.red[500],
                            active: f.colors.red[500],
                            focus: f.colors.red[500],
                            focusVisible: f.colors.red[500],
                            disabled: f.colors.red[500],
                            selected: f.colors.red[500],
                        },
                    },
                },
            },
        },
        separator: {
            color: f.colors.gray[700],
            height: 1,
            marginTop: f.unit[6],
            marginRight: f.unit[0],
            marginBottom: f.unit[6],
            marginLeft: f.unit[0],
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
