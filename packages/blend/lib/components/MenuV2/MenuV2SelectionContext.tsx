import { createContext, useContext } from 'react'
import type { MenuV2SelectionStyle } from './menuV2.types'

export type MenuV2SelectionContextValue = {
    selectionStyle?: MenuV2SelectionStyle
    closeOnSelect: boolean
}

const MenuV2SelectionContext = createContext<MenuV2SelectionContextValue>({
    closeOnSelect: true,
})

export const MenuV2SelectionProvider = MenuV2SelectionContext.Provider

export const useMenuV2Selection = (): MenuV2SelectionContextValue =>
    useContext(MenuV2SelectionContext)

export const resolveSelectionStyle = (
    groupStyle: MenuV2SelectionStyle | undefined,
    menuStyle: MenuV2SelectionStyle | undefined
): MenuV2SelectionStyle | undefined => groupStyle ?? menuStyle
