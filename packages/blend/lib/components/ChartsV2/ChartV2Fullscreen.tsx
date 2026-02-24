import { ReactNode, useCallback, useEffect, useState } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChartV2TokensType } from './chartV2.tokens'
import useScrollLock from '../../hooks/useScrollLock'

type ChartV2FullscreenControls = {
    isFullscreen: boolean
    enterFullscreen: () => void
    exitFullscreen: () => void
}

export interface ChartV2FullscreenProps {
    children: (controls: ChartV2FullscreenControls) => ReactNode
}

const ChartV2Fullscreen = ({ children }: ChartV2FullscreenProps) => {
    const tokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
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

            const isLargeScreen = window.innerWidth >= 1024
            if (isLargeScreen) {
                setIsFullscreen(true)
                return
            }

            const userAgent = navigator.userAgent
            const isIOS = /iPad|iPhone|iPod/.test(userAgent)

            if (isIOS || !document.documentElement.requestFullscreen) {
                setIsFullscreen(true)

                if (screen.orientation && 'lock' in screen.orientation) {
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await (screen.orientation as any).lock('landscape')
                    } catch (err) {
                        console.log('Orientation lock not supported:', err)
                    }
                }

                setTimeout(() => {
                    window.scrollTo(0, 1)
                }, 100)

                return
            }

            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen()

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (screen.orientation && (screen.orientation as any).lock) {
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await (screen.orientation as any).lock('landscape')
                    } catch (err) {
                        console.log('Orientation lock not supported:', err)
                    }
                }

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

            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock()
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
            if (!document.fullscreenElement) {
                setIsFullscreen(false)
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock()
                }
            }
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

    const controls: ChartV2FullscreenControls = {
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
    }

    if (!isFullscreen) {
        return <>{children(controls)}</>
    }

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

export default ChartV2Fullscreen

ChartV2Fullscreen.displayName = 'ChartV2Fullscreen'
