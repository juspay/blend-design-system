import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { configureMonacoEnvironment } from '../../../lib/components/shared/monacoEnvironment'

type GlobalWithMonaco = typeof globalThis & {
    MonacoEnvironment?: {
        getWorker?: unknown
        getWorkerUrl?: unknown
        globalAPI?: boolean
    }
}

const globalScope = globalThis as GlobalWithMonaco

describe('configureMonacoEnvironment (#1734)', () => {
    let previous: GlobalWithMonaco['MonacoEnvironment']

    beforeEach(() => {
        previous = globalScope.MonacoEnvironment
        delete globalScope.MonacoEnvironment
    })

    afterEach(() => {
        globalScope.MonacoEnvironment = previous
    })

    it('defines MonacoEnvironment.getWorker so a self-hosted Monaco can spawn workers', () => {
        expect(globalScope.MonacoEnvironment).toBeUndefined()
        configureMonacoEnvironment()
        expect(typeof globalScope.MonacoEnvironment?.getWorker).toBe('function')
    })

    it('does not override a consumer that already wired getWorker', () => {
        const consumerGetWorker = () => ({}) as unknown as Worker
        globalScope.MonacoEnvironment = { getWorker: consumerGetWorker }
        configureMonacoEnvironment()
        expect(globalScope.MonacoEnvironment?.getWorker).toBe(consumerGetWorker)
    })

    it('defers to a consumer that wired getWorkerUrl instead of getWorker', () => {
        const getWorkerUrl = () => 'worker.js'
        globalScope.MonacoEnvironment = { getWorkerUrl }
        configureMonacoEnvironment()
        expect(globalScope.MonacoEnvironment?.getWorker).toBeUndefined()
        expect(globalScope.MonacoEnvironment?.getWorkerUrl).toBe(getWorkerUrl)
    })

    it('installs getWorker on a partial config with no provider, keeping sibling keys', () => {
        globalScope.MonacoEnvironment = {
            globalAPI: true,
        } as GlobalWithMonaco['MonacoEnvironment']
        configureMonacoEnvironment()
        expect(typeof globalScope.MonacoEnvironment?.getWorker).toBe('function')
        expect(
            (globalScope.MonacoEnvironment as { globalAPI?: boolean }).globalAPI
        ).toBe(true)
    })

    it('installs getWorker on an empty MonacoEnvironment object', () => {
        globalScope.MonacoEnvironment = {}
        configureMonacoEnvironment()
        expect(typeof globalScope.MonacoEnvironment?.getWorker).toBe('function')
    })
})
