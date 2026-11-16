import type { ReactNode } from 'react'
import type { DirectoryTokenType } from './directory.tokens.types'
import { DirectoryAppearanceContext } from './directoryAppearance.context'

export const DirectoryAppearanceProvider = ({
    children,
    tokens,
}: {
    children: ReactNode
    tokens: DirectoryTokenType
}) => (
    <DirectoryAppearanceContext.Provider value={tokens}>
        {children}
    </DirectoryAppearanceContext.Provider>
)
