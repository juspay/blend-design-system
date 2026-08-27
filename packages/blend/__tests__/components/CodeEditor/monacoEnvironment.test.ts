import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { configureMonacoEnvironment } from '../../../lib/components/shared/monacoEnvironment'

type GlobalWithMonaco = typeof globalThis & {
    MonacoEnvironment?: { getWorker?: unknown }
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

    it('does not override a consumer that already configured MonacoEnvironment', () => {
        const consumerGetWorker = () => ({}) as unknown as Worker
        globalScope.MonacoEnvironment = { getWorker: consumerGetWorker }
        configureMonacoEnvironment()
        expect(globalScope.MonacoEnvironment?.getWorker).toBe(consumerGetWorker)
    })
})
