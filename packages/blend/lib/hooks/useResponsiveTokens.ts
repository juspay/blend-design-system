import { useContext } from 'react'
import ThemeContext, type { ComponentTokenType } from '../context/ThemeContext'
import { useBreakpoints } from './useBreakPoints'
import { useComponentToken } from '../context/useComponentToken'
import type { BreakpointType } from '../breakpoints/breakPoints'

export const useResponsiveTokens = <T>(component: keyof ComponentTokenType) => {
    const { breakpoints } = useContext(ThemeContext)
    const { breakPointLabel } = useBreakpoints(breakpoints)

    const componentTokens = useComponentToken(component) as Record<
        keyof BreakpointType,
        T
    >

    const responsiveComponentTokens =
        componentTokens[breakPointLabel as keyof BreakpointType]

    return responsiveComponentTokens
}
