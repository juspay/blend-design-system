import { describe, it, expect } from 'vitest'
import { normalizeArgvForPullVersion } from '../utils/normalize-pull-argv'

describe('normalizeArgvForPullVersion', () => {
    it('rewrites --version after pull to --branch-version', () => {
        const out = normalizeArgvForPullVersion([
            'node',
            'blend-studio',
            'pull',
            'juspay/default',
            '--version',
            '1.0.3',
        ])
        expect(out).toEqual([
            'node',
            'blend-studio',
            'pull',
            'juspay/default',
            '--branch-version',
            '1.0.3',
        ])
    })

    it('rewrites --version= form', () => {
        const out = normalizeArgvForPullVersion([
            'blend-studio',
            'pull',
            'a/b',
            '--version=2.0.0',
        ])
        expect(out).toEqual([
            'blend-studio',
            'pull',
            'a/b',
            '--branch-version=2.0.0',
        ])
    })

    it('does not rewrite --version before pull (global)', () => {
        const argv = ['blend-studio', '--version', 'pull', 'x']
        expect(normalizeArgvForPullVersion(argv)).toEqual(argv)
    })

    it('does not rewrite when pull is absent', () => {
        const argv = ['blend-studio', 'list', '--version']
        expect(normalizeArgvForPullVersion(argv)).toEqual(argv)
    })
})
