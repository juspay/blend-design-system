import { useCallback, useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'

const backdropStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    color: '#ffffff',
    backgroundColor: '#1a1a1d',
    overflow: 'hidden',
}

// `.screen` (from marvel-devices.css) is a plain block box. Our RN tree
// underneath relies on `flex: 1` chaining all the way down to the
// `ScrollView` for its own internal scrolling to kick in — that only works
// if this bridging node is itself a flex container; without `display:
// 'flex'` here, SafeAreaView's `flex: 1` is inert, everything grows to its
// full content height, and `.screen`'s `overflow: hidden` just clips it
// instead of the content scrolling.
const screenStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}

export default function MobileFrame({
    children,
    zoom,
    onFitZoomChange,
}: {
    children: ReactNode
    zoom: number
    onFitZoomChange: (fitZoom: number) => void
}) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const frameRef = useRef<HTMLDivElement | null>(null)

    const reportFitZoom = useCallback(() => {
        const container = containerRef.current
        const frame = frameRef.current
        if (!container || !frame) return

        const { clientWidth, clientHeight } = container
        // offsetWidth/Height reflect the untransformed layout box, so this
        // stays accurate even while a `transform: scale()` is applied.
        const { offsetWidth: naturalWidth, offsetHeight: naturalHeight } = frame
        if (!naturalWidth || !naturalHeight) return

        onFitZoomChange(
            Math.min(
                clientWidth / naturalWidth,
                clientHeight / naturalHeight,
                1
            )
        )
    }, [onFitZoomChange])

    useEffect(() => {
        const container = containerRef.current
        const frame = frameRef.current
        if (!container || !frame) return

        reportFitZoom()
        const observer = new ResizeObserver(reportFitZoom)
        observer.observe(container)
        observer.observe(frame)
        return () => observer.disconnect()
    }, [reportFitZoom])

    return (
        <div ref={containerRef} style={backdropStyle}>
            <div
                ref={frameRef}
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center',
                }}
            >
                <DeviceFrameset device="iPhone X">
                    <div style={screenStyle}>{children}</div>
                </DeviceFrameset>
            </div>
        </div>
    )
}
