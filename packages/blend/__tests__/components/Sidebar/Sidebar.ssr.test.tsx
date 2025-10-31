import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import Sidebar from '../../../lib/components/Sidebar/Sidebar'
import type { DirectoryData } from '../../../lib/components/Directory/types'

describe('Sidebar SSR safety', () => {
    it('renders on the server without throwing reference errors', () => {
        const directoryData: DirectoryData[] = [
            {
                label: 'Main',
                items: [
                    {
                        label: 'Dashboard',
                        href: '#',
                    },
                ],
            },
        ]

        expect(() =>
            renderToString(
                <Sidebar data={directoryData} topbar={<div>Topbar</div>}>
                    <div>Content</div>
                </Sidebar>
            )
        ).not.toThrow()
    })
})
