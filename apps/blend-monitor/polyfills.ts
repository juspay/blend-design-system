// Polyfill CSS.supports for Highcharts compatibility during SSR
if (
    typeof globalThis !== 'undefined' &&
    typeof globalThis.CSS === 'undefined'
) {
    ;(
        globalThis as unknown as {
            CSS: { supports: (property: string, value?: string) => boolean }
        }
    ).CSS = {
        supports: () => true,
    }
}

// Also ensure it exists on global
if (
    typeof global !== 'undefined' &&
    typeof (global as { CSS?: unknown }).CSS === 'undefined'
) {
    ;(
        global as unknown as {
            CSS: { supports: (property: string, value?: string) => boolean }
        }
    ).CSS = {
        supports: () => true,
    }
}
