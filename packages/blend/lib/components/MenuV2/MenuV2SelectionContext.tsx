import { createContext, useContext } from 'react'
import type { MenuV2SelectionMode, MenuV2SelectionStyle } from './menuV2.types'

export type MenuV2SelectionContextValue = {
    selectionStyle?: MenuV2SelectionStyle
    selectionMode?: MenuV2SelectionMode
    closeOnSelect: boolean
}

const MenuV2SelectionContext = createContext<MenuV2SelectionContextValue>({
    closeOnSelect: true,
})

export const MenuV2SelectionProvider = MenuV2SelectionContext.Provider

export const useMenuV2Selection = (): MenuV2SelectionContextValue =>
    useContext(MenuV2SelectionContext)
