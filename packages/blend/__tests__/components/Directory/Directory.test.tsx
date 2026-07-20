import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test-utils'
import Directory from '../../../lib/components/Directory/Directory'
import type { DirectoryData } from '../../../lib/components/Directory/types'

const directoryData: DirectoryData[] = [
    {
        label: 'Organizations',
        isCollapsible: false,
        items: [
            {
                label: 'Acme Commerce Group',
                items: [{ label: 'Helix Network' }, { label: 'Orbit Pharma' }],
            },
        ],
    },
]

describe('Directory', () => {
    it('renders hierarchy connector attributes only when enabled', async () => {
        const { user, unmount } = render(
            <Directory directoryData={directoryData} />
        )

        await user.click(screen.getByRole('button', { name: /acme/i }))

        expect(
            document.querySelectorAll('[data-directory-hierarchy-line="true"]')
        ).toHaveLength(0)
        expect(
            document.querySelectorAll('[data-directory-hierarchy-item="true"]')
        ).toHaveLength(0)

        unmount()

        const { user: userWithLines } = render(
            <Directory directoryData={directoryData} showHierarchyLines />
        )

        await userWithLines.click(screen.getByRole('button', { name: /acme/i }))

        expect(
            document.querySelectorAll('[data-directory-hierarchy-line="true"]')
        ).toHaveLength(1)
        expect(
            document.querySelectorAll('[data-directory-hierarchy-item="true"]')
        ).toHaveLength(2)
    })
})
