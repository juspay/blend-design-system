import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { version as MONACO_VERSION } from 'monaco-editor/package.json'

// Self-hosting Monaco's editor stylesheet (#1744): injectMonacoStyles() must
// put the stylesheet into the DOM exactly once, so a CodeEditor renders styled
// with no global Blend stylesheet import — and never duplicate ~260KB of CSS
// across multiple editor mounts or another copy of the package that bundles the
// same Monaco version.
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

    it('does not duplicate when a same-version marker already exists (another package copy)', async () => {
        const existing = document.createElement('style')
        existing.setAttribute('data-blend-monaco', MONACO_VERSION)
        existing.textContent = '/* injected by another bundle */'
        document.head.appendChild(existing)

        const { injectMonacoStyles } =
            await import('../../../lib/components/shared/monacoStyles')
        injectMonacoStyles()

        const styles = document.head.querySelectorAll(MARKER)
        expect(styles).toHaveLength(1)
        expect(styles[0]).toBe(existing)
    })

    it('injects its own stylesheet alongside a different Monaco version', async () => {
        const other = document.createElement('style')
        other.setAttribute('data-blend-monaco', '0.0.0-different')
        other.textContent = '/* a different bundled Monaco version */'
        document.head.appendChild(other)

        const { injectMonacoStyles } =
            await import('../../../lib/components/shared/monacoStyles')
        injectMonacoStyles()

        // The mismatched version must not satisfy dedup — our version gets its
        // own stylesheet so the editor is not left inheriting foreign CSS.
        expect(document.head.querySelectorAll(MARKER)).toHaveLength(2)
        expect(
            document.head.querySelector(
                `style[data-blend-monaco="${MONACO_VERSION}"]`
            )?.textContent
        ).toContain('.monaco-editor')
    })
})
