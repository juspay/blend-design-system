import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { Theme } from '../../context/theme.enum'
import type { SelectV2ItemStates } from '../SelectV2/selectV2.tokenStates'
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'
import { getMenuV2LightTokens } from './menuV2.light.tokens'
import { getMenuV2DarkTokens } from './menuV2.dark.tokens'

export type { SelectV2ItemStates as MenuV2ItemStates } from '../SelectV2/selectV2.tokenStates'

type StateToken<T> = Record<SelectV2ItemStates, T>

export type MenuV2TokensType = {
    content: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        zIndex: CSSObject['zIndex']
        minWidth: CSSObject['minWidth']
        maxWidth: CSSObject['maxWidth']
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
    }
    item: {
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        marginTop: CSSObject['marginTop']
        marginRight: CSSObject['marginRight']
        marginBottom: CSSObject['marginBottom']
        marginLeft: CSSObject['marginLeft']
        borderRadius: CSSObject['borderRadius']
        gap: CSSObject['gap']
        backgroundColor: {
            [MenuV2ItemVariant.DEFAULT]: {
                enabled: StateToken<CSSObject['backgroundColor']>
                disabled: StateToken<CSSObject['backgroundColor']>
            }
            [MenuV2ItemVariant.ACTION]: {
                [MenuV2ItemActionType.PRIMARY]: {
                    enabled: StateToken<CSSObject['backgroundColor']>
                    disabled: StateToken<CSSObject['backgroundColor']>
                }
                [MenuV2ItemActionType.DANGER]: {
                    enabled: StateToken<CSSObject['backgroundColor']>
                    disabled: StateToken<CSSObject['backgroundColor']>
                }
            }
        }
        optionsLabel: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            marginTop: CSSObject['marginTop']
            marginRight: CSSObject['marginRight']
            marginBottom: CSSObject['marginBottom']
            marginLeft: CSSObject['marginLeft']
        }
        option: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: {
                [MenuV2ItemVariant.DEFAULT]: {
                    enabled: StateToken<CSSObject['color']>
                    disabled: StateToken<CSSObject['color']>
                }
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: StateToken<CSSObject['color']>
                        disabled: StateToken<CSSObject['color']>
                    }
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: StateToken<CSSObject['color']>
                        disabled: StateToken<CSSObject['color']>
                    }
                }
            }
        }
        description: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: {
                [MenuV2ItemVariant.DEFAULT]: {
                    enabled: StateToken<CSSObject['color']>
                    disabled: StateToken<CSSObject['color']>
                }
                [MenuV2ItemVariant.ACTION]: {
                    [MenuV2ItemActionType.PRIMARY]: {
                        enabled: StateToken<CSSObject['color']>
                        disabled: StateToken<CSSObject['color']>
                    }
                    [MenuV2ItemActionType.DANGER]: {
                        enabled: StateToken<CSSObject['color']>
                        disabled: StateToken<CSSObject['color']>
                    }
                }
            }
        }
        separator: {
            color: CSSObject['color']
            height: CSSObject['height']
            marginTop: CSSObject['marginTop']
            marginRight: CSSObject['marginRight']
            marginBottom: CSSObject['marginBottom']
            marginLeft: CSSObject['marginLeft']
        }
    }
}

export type ResponsiveMenuV2TokensType = {
    [key in keyof BreakpointType]: MenuV2TokensType
}

export const getMenuV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveMenuV2TokensType => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getMenuV2DarkTokens(foundationToken)
    }
    return getMenuV2LightTokens(foundationToken)
}
