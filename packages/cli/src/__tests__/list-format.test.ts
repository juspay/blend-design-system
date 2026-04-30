import { describe, it, expect } from 'vitest'
import {
    formatBranchDisplayLines,
    formatDateRelative,
    type ListBranchRow,
} from '../commands/list'

describe('list formatting', () => {
    it('formats date relative deterministically', () => {
        const now = new Date('2026-01-02T00:00:00.000Z')
        expect(formatDateRelative('2026-01-02T00:00:00.000Z', now)).toBe(
            '0m ago'
        )
        expect(formatDateRelative('2026-01-01T00:00:00.000Z', now)).toBe(
            'yesterday'
        )
        expect(formatDateRelative('2025-12-27T00:00:00.000Z', now)).toBe(
            '6d ago'
        )
    })

    it('shows name and id in the same line', () => {
        const now = new Date('2026-01-02T00:00:00.000Z')

        const branches: ListBranchRow[] = [
            {
                brandId: 'juspay/default',
                name: 'Blend Default',
                status: 'published',
                latestVersion: '1.2.3',
                updatedAt: '2026-01-01T00:00:00.000Z',
            },
        ]

        const lines = formatBranchDisplayLines(branches, {
            useColors: false,
            now,
        })

        expect(lines[0]).toBe('  Blend Default')
        expect(lines[1]).toBe('  ID: juspay/default')
        expect(lines[2]).toBe('  [published] v1.2.3')
        expect(lines[3]).toBe('  Updated: yesterday')
        expect(lines[4]).toBe('')
    })
})
