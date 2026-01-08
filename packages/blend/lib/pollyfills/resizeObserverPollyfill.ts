export function patchResizeObserver() {
    if (
        typeof window === 'undefined' ||
        typeof ResizeObserver === 'undefined'
    ) {
        return
    }

    const OriginalResizeObserver = window.ResizeObserver

    window.ResizeObserver = class PatchedResizeObserver extends (
        OriginalResizeObserver
    ) {
        constructor(callback: ResizeObserverCallback) {
            const wrappedCallback: ResizeObserverCallback = (
                entries,
                observer
            ) => {
                window.requestAnimationFrame(() => {
                    try {
                        callback(entries, observer)
                    } catch (e: unknown) {
                        if (
                            e instanceof Error &&
                            !e.message?.includes('ResizeObserver loop')
                        ) {
                            throw e
                        }
                    }
                })
            }
            super(wrappedCallback)
        }
    }
}
