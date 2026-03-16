import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveMenuV2TokensType } from './menuV2.tokens'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'



export const getMenuV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMenuV2TokensType => {
    return {
        sm: {   backgroundColor: foundationToken.colors.gray[900],
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
        
            search: {
                width: foundationToken.unit[16],
            },
        
            group: {
                label: {
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
                            default: foundationToken.colors.gray[900],
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[800],
                            focus: foundationToken.colors.gray[800],
                            focusVisible: foundationToken.colors.gray[800],
                            disabled: foundationToken.colors.gray[900],
                            selected: foundationToken.colors.gray[900],
                        },
                        [MenuV2ItemVariant.ACTION]: {
                            [MenuV2ItemActionType.PRIMARY]: {
                                default: foundationToken.colors.primary[950],
                                hover: foundationToken.colors.primary[900],
                                active: foundationToken.colors.primary[900],
                                focus: foundationToken.colors.primary[900],
                                focusVisible: foundationToken.colors.primary[900],
                                disabled: foundationToken.colors.gray[900],
                                selected: foundationToken.colors.primary[950],
                            },
                            [MenuV2ItemActionType.DANGER]: {
                                default: foundationToken.colors.red[950],
                                hover: foundationToken.colors.red[900],
                                active: foundationToken.colors.red[900],
                                focus: foundationToken.colors.red[900],
                                focusVisible: foundationToken.colors.red[900],
                                disabled: foundationToken.colors.gray[900],
                                selected: foundationToken.colors.red[950],
                            },
                        },
                    },
        
                    text: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[14],
                        color: {
                            [MenuV2ItemVariant.DEFAULT]: {
                                default: foundationToken.colors.gray[200],
                                hover: foundationToken.colors.gray[200],
                                active: foundationToken.colors.gray[200],
                                focus: foundationToken.colors.gray[200],
                                focusVisible: foundationToken.colors.gray[200],
                                disabled: foundationToken.colors.gray[500],
                                selected: foundationToken.colors.gray[200],
                            },
                            [MenuV2ItemVariant.ACTION]: {
                                [MenuV2ItemActionType.PRIMARY]: {
                                    default: foundationToken.colors.primary[300],
                                    hover: foundationToken.colors.primary[300],
                                    active: foundationToken.colors.primary[300],
                                    focus: foundationToken.colors.primary[300],
                                    focusVisible: foundationToken.colors.primary[300],
                                    disabled: foundationToken.colors.gray[500],
                                    selected: foundationToken.colors.primary[300],
                                },
                                [MenuV2ItemActionType.DANGER]: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible: foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[600],
                                    selected: foundationToken.colors.red[400],
                                },
                            },
                        },
        
                        subtText: {
                            fontSize: foundationToken.font.size.body.sm.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                            lineHeight: foundationToken.font.lineHeight[12],
                            color: {
                                [MenuV2ItemVariant.DEFAULT]: {
                                    default: foundationToken.colors.gray[400],
                                    hover: foundationToken.colors.gray[400],
                                    active: foundationToken.colors.gray[400],
                                    focus: foundationToken.colors.gray[400],
                                    focusVisible: foundationToken.colors.gray[400],
                                    disabled: foundationToken.colors.gray[500],
                                    selected: foundationToken.colors.gray[400],
                                },
                                [MenuV2ItemVariant.ACTION]: {
                                    [MenuV2ItemActionType.PRIMARY]: {
                                        default: foundationToken.colors.primary[400],
                                        hover: foundationToken.colors.primary[400],
                                        active: foundationToken.colors.primary[400],
                                        focus: foundationToken.colors.primary[400],
                                        focusVisible:
                                            foundationToken.colors.primary[400],
                                        disabled: foundationToken.colors.gray[500],
                                        selected: foundationToken.colors.primary[400],
                                    },
                                    [MenuV2ItemActionType.DANGER]: {
                                        default: foundationToken.colors.red[400],
                                        hover: foundationToken.colors.red[400],
                                        active: foundationToken.colors.red[400],
                                        focus: foundationToken.colors.red[400],
                                        focusVisible: foundationToken.colors.red[400],
                                        disabled: foundationToken.colors.red[500],
                                        selected: foundationToken.colors.red[400],
                                    },
                                },
                            },
                        },
        
                        leftSlot: {
                            maxWidth: foundationToken.unit[16],
                            maxHeight: foundationToken.unit[16],
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
            },},
        lg: {   backgroundColor: foundationToken.colors.gray[900],
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
        
            search: {
                width: foundationToken.unit[16],
            },
        
            group: {
                label: {
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
                            default: foundationToken.colors.gray[900],
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[800],
                            focus: foundationToken.colors.gray[800],
                            focusVisible: foundationToken.colors.gray[800],
                            disabled: foundationToken.colors.gray[900],
                            selected: foundationToken.colors.gray[900],
                        },
                        [MenuV2ItemVariant.ACTION]: {
                            [MenuV2ItemActionType.PRIMARY]: {
                                default: foundationToken.colors.primary[950],
                                hover: foundationToken.colors.primary[900],
                                active: foundationToken.colors.primary[900],
                                focus: foundationToken.colors.primary[900],
                                focusVisible: foundationToken.colors.primary[900],
                                disabled: foundationToken.colors.gray[900],
                                selected: foundationToken.colors.primary[950],
                            },
                            [MenuV2ItemActionType.DANGER]: {
                                default: foundationToken.colors.red[950],
                                hover: foundationToken.colors.red[900],
                                active: foundationToken.colors.red[900],
                                focus: foundationToken.colors.red[900],
                                focusVisible: foundationToken.colors.red[900],
                                disabled: foundationToken.colors.gray[900],
                                selected: foundationToken.colors.red[950],
                            },
                        },
                    },
        
                    text: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        lineHeight: foundationToken.font.lineHeight[14],
                        color: {
                            [MenuV2ItemVariant.DEFAULT]: {
                                default: foundationToken.colors.gray[200],
                                hover: foundationToken.colors.gray[200],
                                active: foundationToken.colors.gray[200],
                                focus: foundationToken.colors.gray[200],
                                focusVisible: foundationToken.colors.gray[200],
                                disabled: foundationToken.colors.gray[500],
                                selected: foundationToken.colors.gray[200],
                            },
                            [MenuV2ItemVariant.ACTION]: {
                                [MenuV2ItemActionType.PRIMARY]: {
                                    default: foundationToken.colors.primary[300],
                                    hover: foundationToken.colors.primary[300],
                                    active: foundationToken.colors.primary[300],
                                    focus: foundationToken.colors.primary[300],
                                    focusVisible: foundationToken.colors.primary[300],
                                    disabled: foundationToken.colors.gray[500],
                                    selected: foundationToken.colors.primary[300],
                                },
                                [MenuV2ItemActionType.DANGER]: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible: foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[600],
                                    selected: foundationToken.colors.red[400],
                                },
                            },
                        },
        
                        subtText: {
                            fontSize: foundationToken.font.size.body.sm.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                            lineHeight: foundationToken.font.lineHeight[12],
                            color: {
                                [MenuV2ItemVariant.DEFAULT]: {
                                    default: foundationToken.colors.gray[400],
                                    hover: foundationToken.colors.gray[400],
                                    active: foundationToken.colors.gray[400],
                                    focus: foundationToken.colors.gray[400],
                                    focusVisible: foundationToken.colors.gray[400],
                                    disabled: foundationToken.colors.gray[500],
                                    selected: foundationToken.colors.gray[400],
                                },
                                [MenuV2ItemVariant.ACTION]: {
                                    [MenuV2ItemActionType.PRIMARY]: {
                                        default: foundationToken.colors.primary[400],
                                        hover: foundationToken.colors.primary[400],
                                        active: foundationToken.colors.primary[400],
                                        focus: foundationToken.colors.primary[400],
                                        focusVisible:
                                            foundationToken.colors.primary[400],
                                        disabled: foundationToken.colors.gray[500],
                                        selected: foundationToken.colors.primary[400],
                                    },
                                    [MenuV2ItemActionType.DANGER]: {
                                        default: foundationToken.colors.red[400],
                                        hover: foundationToken.colors.red[400],
                                        active: foundationToken.colors.red[400],
                                        focus: foundationToken.colors.red[400],
                                        focusVisible: foundationToken.colors.red[400],
                                        disabled: foundationToken.colors.red[500],
                                        selected: foundationToken.colors.red[400],
                                    },
                                },
                            },
                        },
        
                        leftSlot: {
                            maxWidth: foundationToken.unit[16],
                            maxHeight: foundationToken.unit[16],
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
            },},
    }
}
