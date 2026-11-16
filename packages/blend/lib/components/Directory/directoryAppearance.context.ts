import { createContext, useContext } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { DirectoryTokenType } from './directory.tokens.types'

export const DirectoryAppearanceContext =
    createContext<DirectoryTokenType | null>(null)

export const useDirectoryAppearance = () => {
    const defaultTokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    return useContext(DirectoryAppearanceContext) ?? defaultTokens
}
