import { ReactNode, useCallback, useEffect, useState } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ChartV3TokensType } from './chartV3.tokens'
import useScrollLock from '../../hooks/useScrollLock'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'

type ChartV3FullscreenControls = {
    isFullscreen: boolean
    enterFullscreen: () => void
    exitFullscreen: () => void
}

export interface ChartV3FullscreenProps {
    children: (controls: ChartV3FullscreenControls) => ReactNode
}

const ChartV3Fullscreen = ({ children }: ChartV3FullscreenProps) => {
    const tokens = useResponsiveTokens<ChartV3TokensType>('CHARTSV3')
    const [isFullscreen, setIsFullscreen] = useState(false)

    useScrollLock(isFullscreen)

    const enterFullscreen = useCallback(async () => {
        try {
            if (
                typeof window === 'undefined' ||
                typeof document === 'undefined'
            ) {
                setIsFullscreen(true)
                return
            }

            const isLargeScreen = window.innerWidth >= BREAKPOINTS.lg
            if (isLargeScreen) {
                setIsFullscreen(true)
                return
            }

            const userAgent = navigator.userAgent
            const isIOS = /iPad|iPhone|iPod/.test(userAgent)

            if (isIOS || !document.documentElement.requestFullscreen) {
                setIsFullscreen(true)
                return
            }

            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen()
                setIsFullscreen(true)
            }
        } catch (err) {
            console.error('Error entering fullscreen:', err)
            setIsFullscreen(true)
        }
    }, [])

    const exitFullscreen = useCallback(async () => {
        try {
            if (typeof document !== 'undefined' && document.fullscreenElement) {
                await document.exitFullscreen()
            }
            setIsFullscreen(false)
        } catch (err) {
            console.error('Error exiting fullscreen:', err)
            setIsFullscreen(false)
        }
    }, [])

    useEffect(() => {
        if (typeof document === 'undefined') return

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) setIsFullscreen(false)
        }

        const events = [
            'fullscreenchange',
            'webkitfullscreenchange',
            'mozfullscreenchange',
        ] as const

        events.forEach((event) =>
            document.addEventListener(event, handleFullscreenChange)
        )

        return () => {
            events.forEach((event) =>
                document.removeEventListener(event, handleFullscreenChange)
            )
        }
    }, [])

    const controls: ChartV3FullscreenControls = {
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
    }

    if (!isFullscreen) return <>{children(controls)}</>

    return (
        <Block
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            zIndex={9999}
            display="flex"
            flexDirection="column"
            backgroundColor={tokens.backgroundColor}
        >
            {children(controls)}
        </Block>
    )
}

export default ChartV3Fullscreen

ChartV3Fullscreen.displayName = 'ChartV3Fullscreen'
