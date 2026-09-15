// Self-hosts Monaco's editor stylesheet so CodeEditor/CodeEditorV2 render
// styled with ZERO consumer setup — no `@juspay/blend-design-system/style.css`
// import required (#1744).
//
// CodeEditor self-hosts Monaco via `loader.config({ monaco })` (#1668) and its
// workers via monacoEnvironment (#1734), but its *styles* previously reached
// consumers only through the library's global `style.css`. Apps that import
// Blend components without that global stylesheet (e.g. juspay-portal) got an
// unstyled editor and had to import Monaco's CSS by hand.
//
// `?inline` returns the stylesheet's compiled text as a string instead of
// letting Vite extract it into `style.css`, so we inject it into a `<style>` on
// mount. Monaco's `min` build embeds its font/images as `data:` URIs (no
// external `url()`), so the injected text is fully self-contained — no asset
// paths to resolve. The version is pinned to the bundled `monaco-editor`, in
// lockstep with the workers and the editor module.
//
// This module is browser-only and is loaded lazily from the editor wrappers'
// mount effect, so it never runs during SSR.

// Import resolved by the '*.css?inline' ambient module (lib/types/assets.d.ts).
import editorStyles from 'monaco-editor/min/vs/editor/editor.main.css?inline'
import { version as MONACO_VERSION } from 'monaco-editor/package.json'

// The marker carries the bundled Monaco version so dedup is version-aware: two
// copies of Blend that bundle the SAME Monaco share one injected stylesheet,
// but copies bundling DIFFERENT Monaco versions each inject their own matching
// CSS instead of one silently inheriting the other's.
const STYLE_MARKER = 'data-blend-monaco'

let injected = false

/**
 * Injects Monaco's editor stylesheet into `document.head` once, so a
 * self-hosted editor is styled without the consumer importing any Blend
 * stylesheet. Idempotent across every editor instance and safe to call when a
 * previous mount (or another bundle of this package with the same Monaco
 * version) already injected it.
 *
 * Assumes a light-DOM consumer: it appends to `document.head`, so the styles do
 * not cross into a shadow root. A Shadow-DOM-scoped editor would need the CSS
 * injected into its own root (not handled here today).
 */
export const injectMonacoStyles = (): void => {
    if (injected || typeof document === 'undefined') return
    // A style for this Monaco version may already exist — from an earlier mount
    // in this bundle, or from another copy of the package on the page. Don't
    // duplicate ~260KB of CSS.
    if (document.querySelector(`style[${STYLE_MARKER}="${MONACO_VERSION}"]`)) {
        injected = true
        return
    }
    const style = document.createElement('style')
    style.setAttribute(STYLE_MARKER, MONACO_VERSION)
    style.textContent = editorStyles as string
    document.head.appendChild(style)
    injected = true
}
