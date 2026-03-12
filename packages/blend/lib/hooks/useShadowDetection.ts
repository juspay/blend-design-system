import { useState, useEffect, useRef } from 'react'

export const useShadowDetection = () => {
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)
    const detectedRef = useRef(false)

    useEffect(() => {
        if (detectedRef.current) return
        detectedRef.current = true

        // Check if we're in a browser environment
        if (typeof document === 'undefined') return

        // Try to find the shadow root by checking the current document
        const checkForShadowRoot = () => {
            // Get the current script or any element to check its root
            const testElement =
                document.querySelector('[data-blend-shadow-check]') ||
                document.body ||
                document.documentElement

            if (testElement) {
                const root = testElement.getRootNode()
                if (root instanceof ShadowRoot) {
                    setShadowRoot(root)
                    return
                }
            }

            // Alternative: check if document has a host (means we're in shadow DOM)
            const doc = document as Document & { host?: Element }
            if (doc.host) {
                const hostRoot = doc.host.getRootNode()
                if (hostRoot instanceof ShadowRoot) {
                    setShadowRoot(hostRoot)
                }
            }
        }

        checkForShadowRoot()
    }, [])

    return shadowRoot
}

export default useShadowDetection
