import React from 'react'
import { describe, expect, it, vi } from 'vitest'
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
    const waitForAnimationFrame = () =>
        new Promise<void>((resolve) => {
            window.requestAnimationFrame(() => resolve())
        })

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

    it('keys expansion by item id when provided, so duplicate sibling labels stay independent', async () => {
        const onExpandedItemsChange = vi.fn()
        const duplicateLabelData: DirectoryData[] = [
            {
                label: 'Merchants',
                isCollapsible: false,
                items: [
                    {
                        id: 'mid_001',
                        label: 'sanavi S',
                        items: [{ id: 'sub_1', label: 'Store 1' }],
                    },
                    {
                        id: 'mid_002',
                        label: 'sanavi S',
                        items: [{ id: 'sub_2', label: 'Store 2' }],
                    },
                ],
            },
        ]
        const { user } = render(
            <Directory
                directoryData={duplicateLabelData}
                enableVirtualization
                virtualization={{
                    threshold: 0,
                    rowHeight: 32,
                    viewportHeight: 320,
                    overscan: 2,
                }}
                expandedItems={[]}
                onExpandedItemsChange={onExpandedItemsChange}
            />
        )

        const [firstDuplicate] = screen.getAllByRole('button', {
            name: 'sanavi S',
        })
        await user.click(firstDuplicate)

        // the id — not the shared label — identifies the expanded item
        expect(onExpandedItemsChange).toHaveBeenCalledWith(['mid_001'])
    })

    it('uses id-based paths in the non-virtualized renderer too', async () => {
        const onExpandedItemsChange = vi.fn()
        const onActiveItemChange = vi.fn()
        const duplicateLabelData: DirectoryData[] = [
            {
                label: 'Merchants',
                isCollapsible: false,
                items: [
                    {
                        id: 'mid_001',
                        label: 'sanavi S',
                        items: [{ id: 'sub_1', label: 'Store 1' }],
                    },
                    {
                        id: 'mid_002',
                        label: 'sanavi S',
                        items: [{ id: 'sub_2', label: 'Store 2' }],
                    },
                ],
            },
        ]
        const { user } = render(
            <Directory
                directoryData={duplicateLabelData}
                onExpandedItemsChange={onExpandedItemsChange}
                onActiveItemChange={onActiveItemChange}
            />
        )

        const [firstDuplicate] = screen.getAllByRole('button', {
            name: 'sanavi S',
        })
        await user.click(firstDuplicate)

        // same id-based identity as the virtualized renderer
        expect(onExpandedItemsChange).toHaveBeenCalledWith(['mid_001'])
        expect(
            screen.getByRole('button', { name: 'Store 1' })
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: 'Store 2' })
        ).not.toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Store 1' }))
        expect(onActiveItemChange).toHaveBeenCalledWith('mid_001/sub_1')
    })

    it('opens nested items in a MenuV2 flyout in icon-only mode', async () => {
        const onNestedItemClick = vi.fn()
        const { user } = render(
            <Directory
                iconOnlyMode
                directoryData={[
                    {
                        label: 'Organizations',
                        items: [
                            {
                                label: 'Acme Commerce Group',
                                leftSlot: <span>AC</span>,
                                items: [
                                    {
                                        label: 'Helix Network',
                                        items: [
                                            {
                                                label: 'Orbit Pharma',
                                                onClick: onNestedItemClick,
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Leaf item',
                                        onClick: onNestedItemClick,
                                    },
                                ],
                            },
                        ],
                    },
                ]}
            />
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Acme Commerce Group menu',
            })
        )

        const nestedItem = await screen.findByText('Leaf item')
        await user.click(nestedItem)

        expect(onNestedItemClick).toHaveBeenCalledTimes(1)
    })

    it('does not co-select id-having duplicates via a bare-label activeItem', () => {
        const duplicateLabelData: DirectoryData[] = [
            {
                label: 'Merchants',
                isCollapsible: false,
                items: [
                    { id: 'mid_001', label: 'sanavi S' },
                    { id: 'mid_002', label: 'sanavi S' },
                    { label: 'Legacy Store' },
                ],
            },
        ]
        const { unmount } = render(
            <Directory
                directoryData={duplicateLabelData}
                activeItem="sanavi S"
            />
        )

        for (const duplicate of screen.getAllByRole('button', {
            name: 'sanavi S',
        })) {
            expect(duplicate).toHaveAttribute('data-status', 'not selected')
        }
        unmount()

        // id-less items keep the backward-compat bare-label matching
        render(
            <Directory
                directoryData={duplicateLabelData}
                activeItem="Legacy Store"
            />
        )
        expect(
            screen.getByRole('button', { name: 'Legacy Store' })
        ).toHaveAttribute('data-status', 'selected')
    })

    it('does not refire onEndReached when re-rendered with fresh data references', () => {
        const onEndReached = vi.fn()
        const buildData = (): DirectoryData[] => [
            {
                label: 'Merchants',
                isCollapsible: false,
                items: [{ label: 'Store 1' }, { label: 'Store 2' }],
            },
        ]
        // jsdom reports zero dimensions, so the viewport counts as "at the
        // end" — the hook fires once on bind and must stay disarmed across
        // re-renders that only change the data array's reference identity
        const { rerender } = render(
            <Directory
                directoryData={buildData()}
                onEndReached={onEndReached}
            />
        )
        expect(onEndReached).toHaveBeenCalledTimes(1)

        rerender(
            <Directory
                directoryData={buildData()}
                onEndReached={onEndReached}
            />
        )
        rerender(
            <Directory
                directoryData={buildData()}
                onEndReached={onEndReached}
            />
        )
        expect(onEndReached).toHaveBeenCalledTimes(1)

        // an actual content change re-arms and fires again
        rerender(
            <Directory
                directoryData={[
                    {
                        label: 'Merchants',
                        isCollapsible: false,
                        items: [
                            { label: 'Store 1' },
                            { label: 'Store 2' },
                            { label: 'Store 3' },
                        ],
                    },
                ]}
                onEndReached={onEndReached}
            />
        )
        expect(onEndReached).toHaveBeenCalledTimes(2)
    })

    it('honors controlled expansion props without virtualization', async () => {
        const onExpandedItemsChange = vi.fn()
        const onItemExpand = vi.fn()
        const { user } = render(
            <Directory
                directoryData={directoryData}
                expandedItems={[]}
                onExpandedItemsChange={onExpandedItemsChange}
                onItemExpand={onItemExpand}
            />
        )

        await user.click(screen.getByRole('button', { name: /acme/i }))

        expect(onExpandedItemsChange).toHaveBeenCalledWith([
            'Acme Commerce Group',
        ])
        expect(onItemExpand).toHaveBeenCalledWith(
            expect.objectContaining({ label: 'Acme Commerce Group' }),
            'Acme Commerce Group'
        )
    })

    it('fires onClick for parent rows when toggling expansion', async () => {
        const onParentClick = vi.fn()
        const parentClickData: DirectoryData[] = [
            {
                label: 'Organizations',
                isCollapsible: false,
                items: [
                    {
                        label: 'Acme Commerce Group',
                        onClick: onParentClick,
                        items: [{ label: 'Helix Network' }],
                    },
                ],
            },
        ]
        const { user } = render(<Directory directoryData={parentClickData} />)

        await user.click(screen.getByRole('button', { name: /acme/i }))

        expect(onParentClick).toHaveBeenCalledTimes(1)
        expect(
            screen.getByRole('button', { name: /helix network/i })
        ).toBeInTheDocument()
    })

    it('selects parent rows on click when enableParentSelection is set', async () => {
        const onActiveItemChange = vi.fn()
        const { user } = render(
            <Directory
                directoryData={directoryData}
                enableParentSelection
                onActiveItemChange={onActiveItemChange}
            />
        )

        const parent = screen.getByRole('button', { name: /acme/i })
        await user.click(parent)

        expect(onActiveItemChange).toHaveBeenCalledWith('Acme Commerce Group')
        expect(parent).toHaveAttribute('data-status', 'selected')

        // selection moves to the leaf, then back to the parent on collapse
        await user.click(screen.getByRole('button', { name: /helix network/i }))
        expect(onActiveItemChange).toHaveBeenLastCalledWith(
            'Acme Commerce Group/Helix Network'
        )
        expect(parent).toHaveAttribute('data-status', 'not selected')

        await user.click(parent)
        expect(onActiveItemChange).toHaveBeenLastCalledWith(
            'Acme Commerce Group'
        )
        expect(parent).toHaveAttribute('data-status', 'selected')
    })

    it('keeps parent rows unselectable by default', async () => {
        const { user } = render(<Directory directoryData={directoryData} />)

        const parent = screen.getByRole('button', { name: /acme/i })
        await user.click(parent)

        expect(parent).toHaveAttribute('data-status', 'not selected')
    })

    it('supports controlled expanded items in virtualized mode', async () => {
        const onExpandedItemsChange = vi.fn()
        const { user } = render(
            <Directory
                directoryData={directoryData}
                enableVirtualization
                virtualization={{
                    threshold: 0,
                    rowHeight: 32,
                    viewportHeight: 96,
                    overscan: 1,
                }}
                expandedItems={[]}
                onExpandedItemsChange={onExpandedItemsChange}
            />
        )

        await user.click(screen.getByRole('button', { name: /acme/i }))

        expect(onExpandedItemsChange).toHaveBeenCalledWith([
            'Acme Commerce Group',
        ])
    })

    it('only mounts visible rows for large virtualized trees', () => {
        const largeDirectoryData: DirectoryData[] = [
            {
                label: 'Large tree',
                isCollapsible: false,
                items: [
                    {
                        label: 'Merchant Directory',
                        items: Array.from({ length: 10000 }, (_, index) => ({
                            label: `Merchant ${index + 1}`,
                        })),
                    },
                ],
            },
        ]

        render(
            <Directory
                directoryData={largeDirectoryData}
                defaultExpandedItems={['Merchant Directory']}
                enableVirtualization
                virtualization={{
                    threshold: 0,
                    rowHeight: 32,
                    viewportHeight: 96,
                    overscan: 1,
                }}
            />
        )

        expect(
            screen.getByRole('button', { name: /merchant directory/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /merchant 1/i })
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: /merchant 1000/i })
        ).not.toBeInTheDocument()
    })

    it('supports keyboard navigation between visible rows in virtualized mode', async () => {
        const { user } = render(
            <Directory
                directoryData={directoryData}
                defaultExpandedItems={['Acme Commerce Group']}
                enableVirtualization
                virtualization={{
                    threshold: 0,
                    rowHeight: 32,
                    viewportHeight: 128,
                    overscan: 1,
                }}
            />
        )

        screen.getByRole('button', { name: /acme/i }).focus()
        await user.keyboard('{ArrowDown}')

        expect(
            screen.getByRole('button', { name: /helix network/i })
        ).toHaveFocus()

        await user.keyboard('{ArrowDown}')

        expect(
            screen.getByRole('button', { name: /orbit pharma/i })
        ).toHaveFocus()

        await user.keyboard('{ArrowUp}')

        expect(
            screen.getByRole('button', { name: /helix network/i })
        ).toHaveFocus()

        await waitForAnimationFrame()
    })
})

describe('Directory active-path highlighting', () => {
    const hierarchyData: DirectoryData[] = [
        {
            label: 'Entities',
            isCollapsible: false,
            items: [
                {
                    label: 'Acme Commerce Group',
                    items: [
                        {
                            label: 'Helix Network',
                            items: [
                                { label: 'Orbit Pharma' },
                                { label: 'Orion Pharma' },
                            ],
                        },
                        { label: 'Quanta Network' },
                    ],
                },
                { label: 'Nimbus Ventures' },
            ],
        },
    ]

    const expanded = [
        'Acme Commerce Group',
        'Acme Commerce Group/Helix Network',
    ]
    const deepSelection = 'Acme Commerce Group/Helix Network/Orion Pharma'

    const pathStateOf = (name: RegExp) =>
        screen.getByRole('button', { name }).getAttribute('data-path-state')

    it.each([
        ['non-virtualized', false],
        ['virtualized', true],
    ])(
        'marks ancestors as activePath and everything else as muted (%s)',
        (_label, enableVirtualization) => {
            render(
                <Directory
                    directoryData={hierarchyData}
                    defaultExpandedItems={expanded}
                    activeItem={deepSelection}
                    highlightActivePath
                    enableVirtualization={enableVirtualization}
                    virtualization={{
                        threshold: 0,
                        rowHeight: 32,
                        viewportHeight: 512,
                        overscan: 4,
                    }}
                />
            )

            expect(pathStateOf(/acme commerce group/i)).toBe('activePath')
            expect(pathStateOf(/helix network/i)).toBe('activePath')
            expect(pathStateOf(/orion pharma/i)).toBe('active')
            expect(pathStateOf(/orbit pharma/i)).toBe('muted')
            expect(pathStateOf(/quanta network/i)).toBe('muted')
            expect(pathStateOf(/nimbus ventures/i)).toBe('muted')
        }
    )

    it('leaves every row in the default tier when the flag is off', () => {
        render(
            <Directory
                directoryData={hierarchyData}
                defaultExpandedItems={expanded}
                activeItem={deepSelection}
            />
        )

        expect(pathStateOf(/acme commerce group/i)).toBe('default')
        expect(pathStateOf(/helix network/i)).toBe('default')
        expect(pathStateOf(/orbit pharma/i)).toBe('default')
        expect(pathStateOf(/nimbus ventures/i)).toBe('default')
        // the selection itself is unaffected by the flag
        expect(pathStateOf(/orion pharma/i)).toBe('active')
    })

    it('does not dim anything while nothing is selected', () => {
        render(
            <Directory
                directoryData={hierarchyData}
                defaultExpandedItems={expanded}
                highlightActivePath
            />
        )

        for (const name of [
            /acme commerce group/i,
            /helix network/i,
            /orbit pharma/i,
            /orion pharma/i,
            /nimbus ventures/i,
        ]) {
            expect(pathStateOf(name)).toBe('default')
        }
    })

    it('degrades to selected-only highlighting for a bare-label activeItem', () => {
        // a bare label is not a path, so no row can be resolved as its ancestor
        render(
            <Directory
                directoryData={hierarchyData}
                defaultExpandedItems={expanded}
                activeItem="Nimbus Ventures"
                highlightActivePath
            />
        )

        expect(pathStateOf(/nimbus ventures/i)).toBe('active')
        expect(pathStateOf(/acme commerce group/i)).toBe('muted')
        expect(pathStateOf(/helix network/i)).toBe('muted')
    })

    it('does not treat a sibling with a shared name prefix as an ancestor', () => {
        // "Helix" must not match "Helix Network/..." — the separator matters
        const prefixData: DirectoryData[] = [
            {
                label: 'Entities',
                isCollapsible: false,
                items: [
                    { id: 'helix', label: 'Helix' },
                    {
                        id: 'helix-network',
                        label: 'Helix Network',
                        items: [{ id: 'orion', label: 'Orion Pharma' }],
                    },
                ],
            },
        ]

        render(
            <Directory
                directoryData={prefixData}
                defaultExpandedItems={['helix-network']}
                activeItem="helix-network/orion"
                highlightActivePath
            />
        )

        expect(pathStateOf(/^helix$/i)).toBe('muted')
        expect(pathStateOf(/^helix network$/i)).toBe('activePath')
        expect(pathStateOf(/orion pharma/i)).toBe('active')
    })
})
