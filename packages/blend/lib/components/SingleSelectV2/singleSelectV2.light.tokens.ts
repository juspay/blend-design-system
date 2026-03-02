/**
 * SingleSelectV2 Light Theme Tokens
 *
 * TODO: Populate this file with actual token values from the original SingleSelect implementation
 * or from the theme configuration. This file should follow the same pattern as ButtonV2 light tokens.
 *
 * The structure should match SingleSelectV2TokensType and provide values for all breakpoints (sm, md, lg, xl).
 *
 * Reference:
 * - packages/blend/lib/components/ButtonV2/buttonV2.light.tokens.ts
 * - packages/blend/lib/components/SingleSelect/singleSelect.tokens.ts (original implementation)
 */

import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveSingleSelectV2Tokens } from './singleSelectV2.tokens'
import { SingleSelectV2Size, SingleSelectV2Variant } from './types'

export const getSingleSelectV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSingleSelectV2Tokens => {
    // Create a base token structure for one breakpoint
    // This needs to be expanded to include all breakpoints (sm, md, lg, xl)
    const createBaseTokens = () => ({
        gap: foundationToken.unit[8],
        label: {
            fontSize: foundationToken.font.fontSize[14],
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
            fontSize: foundationToken.font.fontSize[12],
            fontWeight: foundationToken.font.weight[400],
            color: {
                default: foundationToken.colors.gray[500],
                hover: foundationToken.colors.gray[500],
                active: foundationToken.colors.gray[500],
                focus: foundationToken.colors.gray[500],
                focusVisible: foundationToken.colors.gray[500],
                disabled: foundationToken.colors.gray[300],
                selected: foundationToken.colors.gray[500],
            },
        },
        hintText: {
            fontSize: foundationToken.font.fontSize[12],
            fontWeight: foundationToken.font.weight[400],
            color: {
                default: foundationToken.colors.gray[500],
                hover: foundationToken.colors.gray[500],
                active: foundationToken.colors.gray[500],
                focus: foundationToken.colors.gray[500],
                focusVisible: foundationToken.colors.gray[500],
                disabled: foundationToken.colors.gray[300],
                selected: foundationToken.colors.gray[500],
            },
        },
        errorMessage: {
            fontSize: foundationToken.font.fontSize[12],
            fontWeight: foundationToken.font.weight[400],
            color: foundationToken.colors.red[600],
        },
        required: {
            color: foundationToken.colors.red[600],
        },
        trigger: {
            height: {
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[32],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[32],
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[40],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[40],
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]: foundationToken.unit[48],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.unit[48],
                },
            },
            padding: {
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[8],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[8],
                    },
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[12],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[16],
                        y: foundationToken.unit[12],
                    },
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[20],
                        y: foundationToken.unit[16],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[20],
                        y: foundationToken.unit[16],
                    },
                },
            },
            borderRadius: {
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]:
                        foundationToken.border.radius[8],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.border.radius[8],
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]:
                        foundationToken.border.radius[8],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.border.radius[8],
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]:
                        foundationToken.border.radius[10],
                    [SingleSelectV2Variant.NO_CONTAINER]:
                        foundationToken.border.radius[10],
                },
            },
            boxShadow: {
                [SingleSelectV2Variant.CONTAINER]: foundationToken.shadows.sm,
                [SingleSelectV2Variant.NO_CONTAINER]: 'none',
            },
            backgroundColor: {
                [SingleSelectV2Variant.CONTAINER]: {
                    open: foundationToken.colors.gray[0],
                    closed: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    focus: foundationToken.colors.gray[0],
                    error: foundationToken.colors.red[50],
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
                    closed: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[300]}`,
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
                color: foundationToken.colors.gray[400],
                fontSize: foundationToken.font.fontSize[14],
                fontWeight: foundationToken.font.weight[400],
            },
            selectedValue: {
                color: foundationToken.colors.gray[900],
                fontSize: foundationToken.font.fontSize[14],
                fontWeight: foundationToken.font.weight[500],
            },
        },
        popover: {
            backgroundColor: foundationToken.colors.gray[0],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            padding: {
                [SingleSelectV2Size.SMALL]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[8],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[8],
                    },
                },
                [SingleSelectV2Size.MEDIUM]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[8],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[8],
                    },
                },
                [SingleSelectV2Size.LARGE]: {
                    [SingleSelectV2Variant.CONTAINER]: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[8],
                    },
                    [SingleSelectV2Variant.NO_CONTAINER]: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[8],
                    },
                },
            },
            item: {
                padding: foundationToken.unit[8],
                margin: `0 ${foundationToken.unit[8]}`,
                borderRadius: foundationToken.border.radius[4],
                gap: foundationToken.unit[8],
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[100],
                    focus: foundationToken.colors.gray[50],
                    focusVisible: foundationToken.colors.gray[50],
                    disabled: 'transparent',
                    selected: foundationToken.colors.primary[50],
                },
                optionsLabel: {
                    fontSize: foundationToken.font.fontSize[12],
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
                option: {
                    fontSize: foundationToken.font.fontSize[14],
                    fontWeight: foundationToken.font.weight[400],
                    color: {
                        default: foundationToken.colors.gray[700],
                        hover: foundationToken.colors.gray[900],
                        active: foundationToken.colors.gray[900],
                        focus: foundationToken.colors.gray[900],
                        focusVisible: foundationToken.colors.gray[900],
                        disabled: foundationToken.colors.gray[300],
                        selected: foundationToken.colors.primary[600],
                    },
                },
                description: {
                    fontSize: foundationToken.font.fontSize[12],
                    fontWeight: foundationToken.font.weight[400],
                    color: {
                        default: foundationToken.colors.gray[500],
                        hover: foundationToken.colors.gray[500],
                        active: foundationToken.colors.gray[500],
                        focus: foundationToken.colors.gray[500],
                        focusVisible: foundationToken.colors.gray[500],
                        disabled: foundationToken.colors.gray[300],
                        selected: foundationToken.colors.gray[500],
                    },
                },
                separator: {
                    color: foundationToken.colors.gray[200],
                    height: '1px',
                    margin: `${foundationToken.unit[8]} 0`,
                },
            },
        },
        mobilePanel: {
            header: {
                paddingX: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[12],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
            },
        },
    })

    // Return tokens for all breakpoints
    // TODO: Adjust values per breakpoint if needed
    const baseTokens = createBaseTokens()
    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
