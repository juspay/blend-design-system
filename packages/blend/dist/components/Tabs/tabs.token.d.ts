import { CSSObject } from 'styled-components'
import { ThemeType } from '../../tokens'
import { TabsVariant, TabsSize } from './types'
export type TabsState = 'default' | 'hover' | 'active' | 'disabled'
export type TabsTokensType = {
    gap: {
        [key in TabsVariant]: CSSObject['gap']
    }
    list: {
        padding: {
            [key in TabsVariant]: CSSObject['padding']
        }
        backgroundColor: {
            [key in TabsVariant]: CSSObject['backgroundColor']
        }
        borderRadius: {
            [key in TabsVariant]: CSSObject['borderRadius']
        }
        borderBottom: {
            [key in TabsVariant]: CSSObject['borderBottom']
        }
    }
    trigger: {
        height: {
            [key in TabsSize]: CSSObject['height']
        }
        padding: {
            [key in TabsSize]: CSSObject['padding']
        }
        fontSize: {
            [key in TabsSize]: CSSObject['fontSize']
        }
        iconGap: CSSObject['gap']
        fontWeight: {
            [key in TabsVariant]: {
                [key in TabsState]?: CSSObject['fontWeight']
            }
        }
        color: {
            [key in TabsVariant]: {
                [key in TabsState]?: CSSObject['color']
            }
        }
        backgroundColor: {
            [key in TabsVariant]: {
                [key in TabsState]?: CSSObject['backgroundColor']
            }
        }
        borderRadius: {
            [key in TabsVariant]: CSSObject['borderRadius']
        }
    }
    underline: {
        height: CSSObject['height']
        color: CSSObject['color']
    }
}
export declare const getTabsTokens: (
    foundationToken: ThemeType
) => TabsTokensType
declare const tabsTokens: TabsTokensType
export default tabsTokens
