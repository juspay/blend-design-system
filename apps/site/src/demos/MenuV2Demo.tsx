import { useState, useMemo } from 'react'
import { MenuV2 } from '../../../../packages/blend/lib/components/MenuV2'
import type {
    MenuV2GroupType,
    MenuV2ItemType,
} from '../../../../packages/blend/lib/components/MenuV2/menuV2.types'
import {
    MenuV2ItemVariant,
    MenuV2ItemActionType,
    MenuV2Alignment,
    MenuV2Side,
} from '../../../../packages/blend/lib/components/MenuV2/menuV2.types'
import { Button } from '../../../../packages/blend/lib/components/Button'
import { ButtonType } from '../../../../packages/blend/lib/components/Button/types'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import {
    User,
    Settings,
    LogOut,
    Plus,
    MapPin,
    Star,
    Shield,
    Search,
} from 'lucide-react'

const basicItems: MenuV2GroupType[] = [
    {
        items: [
            {
                label: {
                    text: 'Profile',
                    leftSlot: <User size={16} />,
                },
                onClick: () => console.log('Profile clicked'),
            },
            {
                label: {
                    text: 'Settings',
                    leftSlot: <Settings size={16} />,
                },
                onClick: () => console.log('Settings clicked'),
            },
            {
                label: {
                    text: 'Sign Out',
                    leftSlot: <LogOut size={16} />,
                },
                variant: MenuV2ItemVariant.ACTION,
                actionType: MenuV2ItemActionType.DANGER,
                onClick: () => console.log('Sign out clicked'),
            },
        ],
    },
]

const groupedItems: MenuV2GroupType[] = [
    {
        label: 'Actions',
        showSeparator: true,
        items: [
            {
                label: {
                    text: 'Create New',
                    leftSlot: <Plus size={16} />,
                },
                subLabel: 'Start a new project',
                variant: MenuV2ItemVariant.ACTION,
                actionType: MenuV2ItemActionType.PRIMARY,
                onClick: () => console.log('Create new clicked'),
            },
        ],
    },
    {
        label: 'Locations',
        showSeparator: true,
        items: [
            {
                label: {
                    text: 'United States',
                    leftSlot: <MapPin size={16} />,
                },
                subMenu: [
                    {
                        label: {
                            text: 'California',
                            leftSlot: <MapPin size={16} />,
                        },
                        onClick: () => console.log('California'),
                    },
                    {
                        label: {
                            text: 'New York',
                            leftSlot: <MapPin size={16} />,
                        },
                        onClick: () => console.log('New York'),
                    },
                    {
                        label: {
                            text: 'Texas',
                            leftSlot: <MapPin size={16} />,
                        },
                        onClick: () => console.log('Texas'),
                    },
                ],
            },
            {
                label: {
                    text: 'Europe',
                    leftSlot: <MapPin size={16} />,
                },
                subMenu: [
                    {
                        label: {
                            text: 'United Kingdom',
                            leftSlot: <MapPin size={16} />,
                        },
                        onClick: () => console.log('UK'),
                    },
                    {
                        label: {
                            text: 'Germany',
                            leftSlot: <MapPin size={16} />,
                        },
                        onClick: () => console.log('Germany'),
                    },
                ],
            },
        ],
    },
]

const manyItems: MenuV2GroupType[] = [
    {
        label: 'Popular',
        showSeparator: true,
        items: [
            {
                label: {
                    text: 'Most Popular',
                    leftSlot: <Star size={16} />,
                },
                onClick: () => {},
            },
            {
                label: {
                    text: 'Trending',
                    leftSlot: <Star size={16} />,
                },
                onClick: () => {},
            },
        ],
    },
    {
        label: 'Security',
        items: [
            {
                label: {
                    text: 'Enterprise',
                    leftSlot: <Shield size={16} />,
                },
                subLabel: 'Full feature set',
                onClick: () => {},
            },
        ],
    },
]

const rankedSearchItems: MenuV2GroupType[] = [
    {
        label: 'Results',
        items: [
            {
                label: {
                    text: 'Advanced Search Tools',
                    leftSlot: <Search size={16} />,
                },
                onClick: () => console.log('Advanced Search Tools clicked'),
            },
            {
                label: {
                    text: 'Search',
                    leftSlot: <Search size={16} />,
                },
                onClick: () => console.log('Search clicked'),
            },
            {
                label: {
                    text: 'Search Settings',
                    leftSlot: <Settings size={16} />,
                },
                onClick: () => console.log('Search Settings clicked'),
            },
            {
                label: {
                    text: 'Deep Search',
                    leftSlot: <Search size={16} />,
                },
                onClick: () => console.log('Deep Search clicked'),
            },
        ],
    },
]

const submenuSearchItems: MenuV2GroupType[] = [
    {
        label: 'Locations',
        showSeparator: true,
        items: [
            {
                label: {
                    text: 'United States',
                    leftSlot: <MapPin size={16} />,
                },
                enableSubMenuSearch: true,
                subMenuSearchPlaceholder: 'Search states...',
                subMenu: [
                    {
                        label: { text: 'California' },
                        onClick: () => console.log('California'),
                    },
                    {
                        label: { text: 'New York' },
                        onClick: () => console.log('New York'),
                    },
                    {
                        label: { text: 'Texas' },
                        onClick: () => console.log('Texas'),
                    },
                    {
                        label: { text: 'Washington' },
                        onClick: () => console.log('Washington'),
                    },
                ],
            },
        ],
    },
]

// Edge-case demo data ----------------------------------------------------

const subLabelRankItems: MenuV2GroupType[] = [
    {
        label: 'Mixed matches',
        items: [
            {
                label: { text: 'Advanced Tools' },
                subLabel: 'Search',
                onClick: () => {},
            },
            {
                label: { text: 'Search' },
                subLabel: 'Quick find',
                onClick: () => {},
            },
            {
                label: { text: 'Deep Search' },
                subLabel: 'Full-text index',
                onClick: () => {},
            },
        ],
    },
]

const disabledInSearchItems: MenuV2GroupType[] = [
    {
        label: 'Actions',
        items: [
            {
                label: { text: 'Search' },
                onClick: () => {},
            },
            {
                label: { text: 'Search Archives (disabled)' },
                disabled: true,
                onClick: () => {},
            },
            {
                label: { text: 'Recent' },
                onClick: () => {},
            },
        ],
    },
]

const edgeCaseItems: MenuV2GroupType[] = [
    {
        label: 'Edge cases',
        items: [
            {
                label: { text: 'Apple' },
                onClick: () => {},
            },
            {
                label: { text: 'Banana' },
                onClick: () => {},
            },
            {
                label: { text: 'Apricot' },
                onClick: () => {},
            },
            {
                label: { text: 'Avocado' },
                onClick: () => {},
            },
        ],
    },
]

const submenuEnterItems: MenuV2GroupType[] = [
    {
        label: 'Locations',
        items: [
            {
                label: { text: 'United States' },
                enableSubMenuSearch: true,
                subMenuSearchPlaceholder: 'Search states...',
                onSubMenuSearchEnter: (query, results) => {
                    console.log(
                        `Sub-menu Enter: query="${query}", results=[${results
                            .map((r) => r.label.text)
                            .join(', ')}]`
                    )
                },
                subMenu: [
                    { label: { text: 'California' } },
                    { label: { text: 'New York' } },
                    { label: { text: 'Texas' } },
                ],
            },
        ],
    },
]
function generateLargeMenu(count: number): MenuV2GroupType[] {
    const items: MenuV2ItemType[] = Array.from({ length: count }, (_, i) => ({
        id: `item-${i}`,
        label: {
            text: `Menu Item ${i + 1}`,
            leftSlot: <Star size={16} />,
        },
        slot: <Star size={16} />,
        onClick: () => console.log(`Item ${i + 1} clicked`),
    }))

    return [
        {
            label: 'Large Dataset',
            items,
        },
    ]
}

const MenuV2Demo = () => {
    const [lastAction, setLastAction] = useState<string>('')
    const [lastEnter, setLastEnter] = useState<string>('')

    // Playground state
    const [triggerLabel, setTriggerLabel] = useState('Open menu')
    const [enableSearch, setEnableSearch] = useState(false)
    const [asModal, setAsModal] = useState(false)
    const [maxHeight, setMaxHeight] = useState('320')
    const [minWidth, setMinWidth] = useState('240')
    const [maxWidth, setMaxWidth] = useState('320')
    const [alignment, setAlignment] = useState<MenuV2Alignment>(
        MenuV2Alignment.CENTER
    )
    const [side, setSide] = useState<MenuV2Side>(MenuV2Side.BOTTOM)
    const [enableVirtualScrolling, setEnableVirtualScrolling] = useState(false)
    const [useCustomSort, setUseCustomSort] = useState(false)
    const largeItems = useMemo(() => generateLargeMenu(500), [])

    // Reverse-alphabetical custom sort, overrides the default ranking
    const customSortFn = useMemo(
        () => (items: MenuV2ItemType[]) =>
            [...items].sort((a, b) => b.label.text.localeCompare(a.label.text)),
        []
    )

    // Identity sort: returns items unchanged (simulates "keep my order")
    const identitySortFn = useMemo(() => (items: MenuV2ItemType[]) => items, [])

    // Last-enter trackers for the edge-case demos
    const [edgeEnter, setEdgeEnter] = useState<string>('none')
    const [subLabelEnter, setSubLabelEnter] = useState<string>('none')
    const [emptyEnter, setEmptyEnter] = useState<string>('none')
    const [whitespaceEnter, setWhitespaceEnter] = useState<string>('none')
    const [topMatchEnter, setTopMatchEnter] = useState<string>('none')

    const withLog = (items: MenuV2GroupType[]): MenuV2GroupType[] =>
        items.map((group) => ({
            ...group,
            items: group.items.map((item) => ({
                ...item,
                onClick: item.onClick
                    ? () => {
                          item.onClick?.()
                          setLastAction(item.label.text)
                      }
                    : undefined,
                subMenu: item.subMenu?.map((sub: MenuV2ItemType) => ({
                    ...sub,
                    onClick: sub.onClick
                        ? () => {
                              sub.onClick?.()
                              setLastAction(
                                  `${item.label.text} → ${sub.label.text}`
                              )
                          }
                        : undefined,
                })),
            })),
        }))

    return (
        <div className="p-8 space-y-10">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">MenuV2 Component</h1>
                <p className="text-gray-600">
                    Standalone menu built with tokens, Radix dropdown, and no
                    dependency on original Menu. Supports groups, search,
                    submenus, and action variants.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Playground</h2>
                <p className="text-gray-600">
                    Adjust props and see how <code>MenuV2</code> behaves with
                    search, modal mode, sizing, and positioning.
                </p>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Trigger label"
                            value={triggerLabel}
                            onChange={(e) => setTriggerLabel(e.target.value)}
                            placeholder="Enter trigger text"
                        />
                        <TextInput
                            label="Max height (px)"
                            value={maxHeight}
                            onChange={(e) => setMaxHeight(e.target.value)}
                            placeholder="e.g. 320"
                        />
                        <TextInput
                            label="Min width (px)"
                            value={minWidth}
                            onChange={(e) => setMinWidth(e.target.value)}
                            placeholder="e.g. 240"
                        />
                        <TextInput
                            label="Max width (px)"
                            value={maxWidth}
                            onChange={(e) => setMaxWidth(e.target.value)}
                            placeholder="e.g. 320"
                        />
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Alignment
                            </label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                value={alignment}
                                onChange={(e) =>
                                    setAlignment(
                                        e.target.value as MenuV2Alignment
                                    )
                                }
                            >
                                <option value={MenuV2Alignment.START}>
                                    Start
                                </option>
                                <option value={MenuV2Alignment.CENTER}>
                                    Center
                                </option>
                                <option value={MenuV2Alignment.END}>End</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Side
                            </label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                value={side}
                                onChange={(e) =>
                                    setSide(e.target.value as MenuV2Side)
                                }
                            >
                                <option value={MenuV2Side.TOP}>Top</option>
                                <option value={MenuV2Side.BOTTOM}>
                                    Bottom
                                </option>
                                <option value={MenuV2Side.LEFT}>Left</option>
                                <option value={MenuV2Side.RIGHT}>Right</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Enable search"
                            checked={enableSearch}
                            onChange={() => setEnableSearch(!enableSearch)}
                        />
                        <Switch
                            label="Modal"
                            checked={asModal}
                            onChange={() => setAsModal(!asModal)}
                        />
                        <Switch
                            label="Enable virtual scrolling"
                            checked={enableVirtualScrolling}
                            onChange={() =>
                                setEnableVirtualScrolling((prev) => !prev)
                            }
                        />
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50 p-8">
                    <div className="w-full max-w-md">
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text={triggerLabel || 'Open menu'}
                                />
                            }
                            items={
                                enableVirtualScrolling
                                    ? withLog(largeItems)
                                    : withLog(groupedItems)
                            }
                            enableSearch={enableSearch}
                            searchPlaceholder="Search options..."
                            asModal={asModal}
                            dimensions={{
                                maxHeight: maxHeight.trim()
                                    ? Number.parseInt(maxHeight, 10) ||
                                      undefined
                                    : undefined,
                                minWidth: minWidth.trim()
                                    ? Number.parseInt(minWidth, 10) || undefined
                                    : undefined,
                                maxWidth: maxWidth.trim()
                                    ? Number.parseInt(maxWidth, 10) || undefined
                                    : undefined,
                            }}
                            alignment={alignment}
                            side={side}
                            enableVirtualScrolling={enableVirtualScrolling}
                            virtualScrolling={
                                enableVirtualScrolling
                                    ? { itemHeight: 40, overscan: 4 }
                                    : undefined
                            }
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Presets</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Basic</h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open menu"
                                ></Button>
                            }
                            items={withLog(basicItems)}
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">With search</h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open menu (search)"
                                ></Button>
                            }
                            items={withLog(manyItems)}
                            enableSearch
                            searchPlaceholder="Search options..."
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            Groups and submenu
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open menu (groups + submenu)"
                                ></Button>
                            }
                            items={
                                enableVirtualScrolling
                                    ? withLog(largeItems)
                                    : withLog(groupedItems)
                            }
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                    Search ranking &amp; Enter callback
                </h2>
                <p className="text-gray-600">
                    By default, search results are ranked{' '}
                    <strong>exact → prefix → substring</strong>. Toggle the
                    custom sort to override the default ranking, and type a
                    query then press <kbd>Enter</kbd> to fire{' '}
                    <code>onEnter</code>.
                </p>

                <div className="flex items-center gap-6 flex-wrap">
                    <Switch
                        label="Use custom reverse-alpha sort"
                        checked={useCustomSort}
                        onChange={() => setUseCustomSort(!useCustomSort)}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Ranked search</h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open ranked search"
                                />
                            }
                            items={withLog(rankedSearchItems)}
                            enableSearch
                            searchPlaceholder="Type 'search'..."
                            searchSortFn={
                                useCustomSort ? customSortFn : undefined
                            }
                            onEnter={(query, filteredGroups) => {
                                const top = filteredGroups[0]?.items[0]
                                setLastEnter(
                                    top
                                        ? `"${query}" → "${top.label.text}"`
                                        : `"${query}" → no results`
                                )
                            }}
                        />
                        <p className="text-xs text-gray-500">
                            Try <code>search</code>. Default ranks the exact
                            “Search” item first; with custom sort on, results
                            are reverse-alphabetical.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            Sub-menu search ranking
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open submenu search"
                                />
                            }
                            items={withLog(submenuSearchItems)}
                        />
                        <p className="text-xs text-gray-500">
                            Hover <strong>United States</strong> and type in the
                            sub-menu search. Results are ranked the same way.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                    Search &amp; Enter edge cases
                </h2>
                <p className="text-gray-600">
                    Each card below exercises a specific edge case of the search
                    ranking and <code>onEnter</code> callback.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* 1. SubLabel-only exact match ranks above label substring */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            1. subLabel exact beats label substring
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (subLabel ranking)"
                                />
                            }
                            items={withLog(subLabelRankItems)}
                            enableSearch
                            searchPlaceholder="Type 'search'..."
                            onEnter={(query, filteredGroups) => {
                                const top = filteredGroups[0]?.items[0]
                                setSubLabelEnter(
                                    top
                                        ? `"${query}" → "${top.label.text}" (sub: "${top.subLabel}")`
                                        : `"${query}" → no results`
                                )
                            }}
                        />
                        <p className="text-xs text-gray-500">
                            Item “Advanced Tools” has subLabel “Search” (exact).
                            It should rank above “Deep Search” (label
                            substring). Type <code>search</code>.
                        </p>
                    </div>

                    {/* 2. No matches at all */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            2. no matches → Enter with empty results
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (no matches)"
                                />
                            }
                            items={withLog(edgeCaseItems)}
                            enableSearch
                            searchPlaceholder="Type 'xyz'..."
                            onEnter={(query, filteredGroups) => {
                                setEmptyEnter(
                                    `"${query}" → ${filteredGroups.length} groups, ${filteredGroups.reduce(
                                        (n, g) => n + g.items.length,
                                        0
                                    )} items`
                                )
                            }}
                        />
                        <p className="text-xs text-gray-500">
                            Type <code>xyz</code> (matches nothing). Pressing
                            Enter still fires <code>onEnter</code> with an empty
                            result set.
                        </p>
                    </div>

                    {/* 3. Disabled items still appear in search */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            3. disabled items still match
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (disabled in search)"
                                />
                            }
                            items={withLog(disabledInSearchItems)}
                            enableSearch
                            searchPlaceholder="Type 'search'..."
                        />
                        <p className="text-xs text-gray-500">
                            The disabled “Search Archives” item still appears
                            for <code>search</code> — filtering is by match, not
                            by disabled state.
                        </p>
                    </div>

                    {/* 4. Case-insensitive ranking */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            4. case-insensitive ranking
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (case-insensitive)"
                                />
                            }
                            items={withLog(rankedSearchItems)}
                            enableSearch
                            searchPlaceholder="Try 'SEARCH' vs 'search'..."
                        />
                        <p className="text-xs text-gray-500">
                            <code>SEARCH</code> and <code>search</code> produce
                            identical ranking — comparison is lowercased.
                        </p>
                    </div>

                    {/* 5. Whitespace-only query is a no-op */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            5. whitespace-only query → no-op
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (whitespace query)"
                                />
                            }
                            items={withLog(edgeCaseItems)}
                            enableSearch
                            searchPlaceholder="Type only spaces..."
                            onEnter={(query, filteredGroups) => {
                                setWhitespaceEnter(
                                    `"${query}" → ${filteredGroups.reduce(
                                        (n, g) => n + g.items.length,
                                        0
                                    )} items (unchanged)`
                                )
                            }}
                        />
                        <p className="text-xs text-gray-500">
                            Typing only spaces is treated as an empty query —
                            all items remain, in their original order.
                        </p>
                    </div>

                    {/* 6. Custom identity sort keeps declaration order */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            6. identity sort overrides ranking
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (identity sort)"
                                />
                            }
                            items={withLog(rankedSearchItems)}
                            enableSearch
                            searchPlaceholder="Type 'search'..."
                            searchSortFn={identitySortFn}
                        />
                        <p className="text-xs text-gray-500">
                            A custom <code>searchSortFn</code> that returns
                            items unchanged — declaration order survives, even
                            though matches are filtered.
                        </p>
                    </div>

                    {/* 7. Empty search text Enter */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            7. Enter on empty query
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (empty Enter)"
                                />
                            }
                            items={withLog(edgeCaseItems)}
                            enableSearch
                            searchPlaceholder="Press Enter without typing..."
                            onEnter={(query, filteredGroups) => {
                                setEdgeEnter(
                                    `"${query}" → ${filteredGroups.reduce(
                                        (n, g) => n + g.items.length,
                                        0
                                    )} items`
                                )
                            }}
                        />
                        <p className="text-xs text-gray-500">
                            Press Enter without typing. <code>onEnter</code>{' '}
                            fires with the full, unfiltered item list.
                        </p>
                    </div>

                    {/* 8. Sub-menu search Enter callback */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            8. sub-menu search Enter
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (sub-menu Enter)"
                                />
                            }
                            items={withLog(submenuEnterItems)}
                        />
                        <p className="text-xs text-gray-500">
                            Hover <strong>United States</strong>, type{' '}
                            <code>cal</code> in the sub-menu search, press
                            Enter. <code>onSubMenuSearchEnter</code> fires with
                            the sub-results (see console).
                        </p>
                    </div>

                    {/* 9. Partial query + Enter → open the first match */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                            9. partial type + Enter → first match
                        </h3>
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text="Open (partial Enter)"
                                />
                            }
                            items={withLog(rankedSearchItems)}
                            enableSearch
                            searchPlaceholder="Type 'se' then press Enter..."
                            onEnter={(query, filteredGroups) => {
                                const top = filteredGroups[0]?.items[0]
                                if (top) {
                                    setTopMatchEnter(
                                        `"${query}" → opened "${top.label.text}"`
                                    )
                                    top.onClick?.()
                                } else {
                                    setTopMatchEnter(`"${query}" → no match`)
                                }
                            }}
                        />
                        <p className="text-xs text-gray-500">
                            Type a partial query like <code>se</code> and press
                            Enter without arrowing down. The handler reads the
                            top-ranked result from <code>filteredGroups</code>{' '}
                            and triggers its <code>onClick</code> directly —
                            command-palette style.
                        </p>
                    </div>
                </div>
            </section>

            {lastAction && (
                <p className="text-sm text-gray-500">
                    Last action: <strong>{lastAction}</strong>
                </p>
            )}
            {lastEnter && (
                <p className="text-sm text-gray-500">
                    Last Enter: <strong>{lastEnter}</strong>
                </p>
            )}
            <div className="text-xs text-gray-500 space-y-1">
                <p>
                    Edge 1 subLabel Enter: <strong>{subLabelEnter}</strong>
                </p>
                <p>
                    Edge 2 no-match Enter: <strong>{emptyEnter}</strong>
                </p>
                <p>
                    Edge 5 whitespace Enter: <strong>{whitespaceEnter}</strong>
                </p>
                <p>
                    Edge 7 empty-query Enter: <strong>{edgeEnter}</strong>
                </p>
                <p>
                    Edge 9 partial-type Enter: <strong>{topMatchEnter}</strong>
                </p>
            </div>
        </div>
    )
}

export default MenuV2Demo
