import { createContext, useContext } from 'react'

export type MenuSelectionStyle = 'checkmark' | 'highlight'
export type MenuSelectionMode = 'single' | 'multiple'

export type MenuSelectionContextValue = {
    selectionStyle?: MenuSelectionStyle
    selectionMode?: MenuSelectionMode
    closeOnSelect: boolean
}

export type MenuSelectionResolution = {
    isSelectable: boolean
    isSelected: boolean
    selectionStyle?: MenuSelectionStyle
    selectionMode?: MenuSelectionMode
    selectionRole?: 'menuitemradio' | 'menuitemcheckbox'
}

export const resolveMenuSelection = ({
    selected,
    groupSelectionStyle,
    groupSelectionMode,
    menuSelectionStyle,
    menuSelectionMode,
}: {
    selected?: boolean
    groupSelectionStyle?: MenuSelectionStyle
    groupSelectionMode?: MenuSelectionMode
    menuSelectionStyle?: MenuSelectionStyle
    menuSelectionMode?: MenuSelectionMode
}): MenuSelectionResolution => {
    const isSelectable = typeof selected === 'boolean'
    const isSelected = selected === true
    const selectionStyle = isSelectable
        ? (groupSelectionStyle ?? menuSelectionStyle ?? 'checkmark')
        : undefined
    const selectionMode = isSelectable
        ? (groupSelectionMode ?? menuSelectionMode ?? 'single')
        : undefined

    return {
        isSelectable,
        isSelected,
        selectionStyle,
        selectionMode,
        selectionRole:
            selectionMode === 'single'
                ? 'menuitemradio'
                : selectionMode === 'multiple'
                  ? 'menuitemcheckbox'
                  : undefined,
    }
}

const MenuSelectionContext = createContext<MenuSelectionContextValue>({
    closeOnSelect: true,
})

export const MenuSelectionProvider = MenuSelectionContext.Provider

export const useMenuSelection = (): MenuSelectionContextValue =>
    useContext(MenuSelectionContext)
