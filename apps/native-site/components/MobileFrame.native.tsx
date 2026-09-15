import type { ReactNode } from 'react'

// Native builds never mount this — PlatformPreview only frames content on
// web — but Metro still needs a platform-matching module to resolve
// `./MobileFrame` from a native bundle, so this stays a pure passthrough.
// `zoom`/`onFitZoomChange` are accepted (unused) purely so this file's
// signature stays call-compatible with the web implementation.
export default function MobileFrame({
    children,
}: {
    children: ReactNode
    zoom?: number
    onFitZoomChange?: (fitZoom: number) => void
}) {
    return <>{children}</>
}
