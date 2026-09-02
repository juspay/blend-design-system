import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Self-hosting Monaco's editor stylesheet (#1744): injectMonacoStyles() must
// put the stylesheet into the DOM exactly once, so a CodeEditor renders styled
// with no global Blend stylesheet import — and never duplicate ~260KB of CSS
// across multiple editor mounts or a second copy of the package.
const MARKER = 'style[data-blend-monaco]'

describe('injectMonacoStyles (#1744)', () => {
    beforeEach(() => {
        vi.resetModules()
        document.head.querySelectorAll(MARKER).forEach((el) => el.remove())
    })

    afterEach(() => {
        document.head.querySelectorAll(MARKER).forEach((el) => el.remove())
    })

    it('injects the editor stylesheet into document.head with content', async () => {
        const { injectMonacoStyles } =
            await import('../../../lib/components/shared/monacoStyles')
        expect(document.head.querySelector(MARKER)).toBeNull()

        injectMonacoStyles()

        const style = document.head.querySelector(MARKER)
        expect(style).not.toBeNull()
        expect(style?.tagName).toBe('STYLE')
        // The `?inline` import must resolve to real CSS text, not an empty
        // string — otherwise the editor ships unstyled.
        expect((style?.textContent ?? '').length).toBeGreaterThan(0)
        expect(style?.textContent).toContain('.monaco-editor')
    })

    it('is idempotent across repeated calls (one <style> only)', async () => {
        const { injectMonacoStyles } =
            await import('../../../lib/components/shared/monacoStyles')
        injectMonacoStyles()
        injectMonacoStyles()
        injectMonacoStyles()
        expect(document.head.querySelectorAll(MARKER)).toHaveLength(1)
    })

    it('does not duplicate when a marker style already exists (e.g. a second package copy)', async () => {
        const existing = document.createElement('style')
        existing.setAttribute('data-blend-monaco', '')
        existing.textContent = '/* injected by another bundle */'
        document.head.appendChild(existing)

        const { injectMonacoStyles } =
            await import('../../../lib/components/shared/monacoStyles')
        injectMonacoStyles()

        const styles = document.head.querySelectorAll(MARKER)
        expect(styles).toHaveLength(1)
        expect(styles[0]).toBe(existing)
    })
})
