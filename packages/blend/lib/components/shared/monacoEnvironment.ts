// Wires Monaco's language-service web workers to the copy of `monaco-editor`
// bundled in this package. CodeEditor/CodeEditorV2 self-host Monaco (see #1668)
// via `loader.config({ monaco })`; a self-hosted Monaco spawns a worker per
// language and requires `globalThis.MonacoEnvironment.getWorker`, which the
// package never set — so `json`/`css`/`html`/`typescript` modes threw
// "MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker" (#1734).
//
// `new Worker(new URL('…', import.meta.url), { type: 'module' })` makes the
// bundler compile each worker (with its deps) into this package's dist and
// reference it *relative to the module*, so the URLs resolve wherever a
// consumer serves the package's assets — no Monaco/worker setup, version-skew
// or CDN dependency on the consumer side.
//
// This module is browser-only and is loaded lazily from the editor wrappers'
// mount effect, so it never runs during SSR.

type MonacoEnvironmentLike = {
    getWorker?: (workerId: string, label: string) => Worker
}

const createWorker = (label: string): Worker => {
    switch (label) {
        case 'json':
            return new Worker(
                new URL(
                    'monaco-editor/esm/vs/language/json/json.worker.js',
                    import.meta.url
                ),
                { type: 'module' }
            )
        case 'css':
        case 'scss':
        case 'less':
            return new Worker(
                new URL(
                    'monaco-editor/esm/vs/language/css/css.worker.js',
                    import.meta.url
                ),
                { type: 'module' }
            )
        case 'html':
        case 'handlebars':
        case 'razor':
            return new Worker(
                new URL(
                    'monaco-editor/esm/vs/language/html/html.worker.js',
                    import.meta.url
                ),
                { type: 'module' }
            )
        case 'typescript':
        case 'javascript':
            return new Worker(
                new URL(
                    'monaco-editor/esm/vs/language/typescript/ts.worker.js',
                    import.meta.url
                ),
                { type: 'module' }
            )
        default:
            return new Worker(
                new URL(
                    'monaco-editor/esm/vs/editor/editor.worker.js',
                    import.meta.url
                ),
                { type: 'module' }
            )
    }
}

/**
 * Sets `globalThis.MonacoEnvironment.getWorker` to spawn the bundled workers,
 * once, and only if a consumer hasn't already configured it (e.g. via
 * `monaco-editor-webpack-plugin`) — in which case the consumer's setup wins.
 */
export const configureMonacoEnvironment = (): void => {
    if (typeof globalThis === 'undefined') return
    const globalScope = globalThis as typeof globalThis & {
        MonacoEnvironment?: MonacoEnvironmentLike
    }
    if (globalScope.MonacoEnvironment) return
    globalScope.MonacoEnvironment = {
        getWorker: (_workerId: string, label: string): Worker =>
            createWorker(label),
    }
}
