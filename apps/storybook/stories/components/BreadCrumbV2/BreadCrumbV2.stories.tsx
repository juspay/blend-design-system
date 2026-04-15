import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo, useState } from 'react'
import { fn } from '@storybook/test'
import {
    ChevronRight,
    Database,
    FileText,
    Folder,
    Globe,
    Home,
    MoreHorizontal,
    Settings,
} from 'lucide-react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import BreadcrumbV2 from '../../../../../packages/blend/lib/components/BreadcrumbV2/BreadcrumbV2'
import type { BreadcrumbV2ItemType } from '../../../../../packages/blend/lib/components/BreadcrumbV2/breadcrumbV2.types'

const meta: Meta<typeof BreadcrumbV2> = {
    title: 'Components/BreadcrumbV2',
    component: BreadcrumbV2,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('navigation'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Composable breadcrumb component that accepts items array or wraps Item, Page, and optional Icon children.',
        docs: {
            description: {
                component: `

**Accessibility:** The current page link uses \`aria-current="page"\` (implemented as \`aria-current={isActive ? 'page' : undefined}\` on \`BreadcrumbV2.Item\` → \`PrimitiveLink\`). The last \`items\` entry is marked active automatically; set \`isActive\` on \`Item\` when composing children.
`,
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BreadcrumbV2>

const SAMPLE_ITEMS: BreadcrumbV2ItemType[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Cameras', href: '/products/electronics/cameras' },
]

const sectionClasses = 'py-5 px-6 rounded-xl border border-solid max-w-[720px]'
const labelClasses =
    'text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3'

export const Default: Story = {
    render: () => <BreadcrumbV2 items={SAMPLE_ITEMS} />,
}

/** Constrain width so the trail wraps or shows overflow behavior in narrow layouts. */
export const Visual_NarrowContainer: Story = {
    name: 'Visual · Narrow container',
    render: () => (
        <div className={`${sectionClasses} w-[320px]`}>
            <div className={labelClasses}>320px wide</div>
            <BreadcrumbV2 items={SAMPLE_ITEMS} />
        </div>
    ),
}

export const WithOverflowMenu: Story = {
    name: 'Visual · Overflow (7+ items)',
    render: () => (
        <div className={sectionClasses}>
            <div className={labelClasses}>Ellipsis + last three segments</div>
            <BreadcrumbV2
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Level 1', href: '/1' },
                    { label: 'Level 2', href: '/2' },
                    { label: 'Level 3', href: '/3' },
                    { label: 'Level 4', href: '/4' },
                    { label: 'Level 5', href: '/5' },
                    { label: 'Level 6', href: '/6' },
                ]}
            />
        </div>
    ),
}

export const Visual_WithLeadingIcons: Story = {
    name: 'Visual · Items with left slots',
    render: () => (
        <div className={sectionClasses}>
            <div className={labelClasses}>Icon via items prop</div>
            <BreadcrumbV2
                items={[
                    {
                        label: 'Home',
                        href: '/',
                        leftSlot: <Home size={16} aria-hidden />,
                    },
                    {
                        label: 'Products',
                        href: '/products',
                        leftSlot: <Folder size={16} aria-hidden />,
                    },
                    {
                        label: 'Electronics',
                        href: '/products/electronics',
                        leftSlot: <Database size={16} aria-hidden />,
                    },
                    {
                        label: 'Cameras',
                        href: '/products/electronics/cameras',
                        leftSlot: <Globe size={16} aria-hidden />,
                    },
                ]}
            />
        </div>
    ),
}

export const Visual_SingleCurrentPage: Story = {
    name: 'Visual · Single item (current page)',
    render: () => (
        <div className={sectionClasses}>
            <div className={labelClasses}>One crumb — active</div>
            <BreadcrumbV2
                items={[{ label: 'Dashboard', href: '/dashboard' }]}
            />
        </div>
    ),
}

export const Visual_Composable: Story = {
    name: 'Visual · Composable API',
    render: () => (
        <div className={sectionClasses}>
            <div className={labelClasses}>
                BreadcrumbV2.Item · Icon · Page · Icon
            </div>
            <BreadcrumbV2>
                <BreadcrumbV2.Item href="/">
                    <BreadcrumbV2.Icon>
                        <Home size={16} aria-hidden />
                    </BreadcrumbV2.Icon>
                    <BreadcrumbV2.Page>Home</BreadcrumbV2.Page>
                    <BreadcrumbV2.Icon>
                        <ChevronRight size={14} aria-hidden />
                    </BreadcrumbV2.Icon>
                </BreadcrumbV2.Item>
                <BreadcrumbV2.Item href="/docs">
                    <BreadcrumbV2.Page>Docs</BreadcrumbV2.Page>
                    <BreadcrumbV2.Icon>
                        <ChevronRight size={14} aria-hidden />
                    </BreadcrumbV2.Icon>
                </BreadcrumbV2.Item>
                <BreadcrumbV2.Item isActive>
                    <BreadcrumbV2.Page>Components</BreadcrumbV2.Page>
                </BreadcrumbV2.Item>
            </BreadcrumbV2>
        </div>
    ),
}

export const Visual_ComposableOverflow: Story = {
    name: 'Visual · Composable overflow',
    render: () => (
        <div className={sectionClasses}>
            <div className={labelClasses}>5+ Item children → ellipsis</div>
            <BreadcrumbV2>
                {[0, 1, 2, 3, 4].map((i) => (
                    <BreadcrumbV2.Item key={i} href={`/l${i}`}>
                        <BreadcrumbV2.Page>Level {i}</BreadcrumbV2.Page>
                    </BreadcrumbV2.Item>
                ))}
            </BreadcrumbV2>
        </div>
    ),
}

export const Visual_Showcase: Story = {
    name: 'Visual · Showcase (all variants)',
    parameters: {
        layout: 'fullscreen',
    },
    render: () => (
        <div className="flex flex-col gap-6 p-6 max-w-[800px]">
            <h2 className="m-0 text-xl">BreadcrumbV2 — visual</h2>

            <div className={sectionClasses}>
                <div className={labelClasses}>Default trail</div>
                <BreadcrumbV2 items={SAMPLE_ITEMS} />
            </div>

            <div className={sectionClasses}>
                <div className={labelClasses}>With icons + right slot</div>
                <BreadcrumbV2
                    items={[
                        {
                            label: 'Workspace',
                            href: '/w',
                            leftSlot: <Home size={16} aria-hidden />,
                            rightSlot: <MoreHorizontal size={14} aria-hidden />,
                        },
                        {
                            label: 'Settings',
                            href: '/w/settings',
                            leftSlot: <Settings size={16} aria-hidden />,
                        },
                        {
                            label: 'API keys',
                            href: '/w/settings/keys',
                            leftSlot: <FileText size={16} aria-hidden />,
                        },
                    ]}
                />
            </div>

            <div className={`${sectionClasses} w-[360px]`}>
                <div className={labelClasses}>Overflow</div>
                <BreadcrumbV2
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'A', href: '/a' },
                        { label: 'B', href: '/b' },
                        { label: 'C', href: '/c' },
                        { label: 'D', href: '/d' },
                        { label: 'E', href: '/e' },
                    ]}
                />
            </div>
        </div>
    ),
}

function InteractiveRoutingDemo() {
    const segments = useMemo(
        () => [
            { label: 'Home', href: '/' },
            { label: 'Catalog', href: '/catalog' },
            { label: 'Devices', href: '/catalog/devices' },
            { label: 'Detail', href: '/catalog/devices/42' },
        ],
        []
    )

    const [depth, setDepth] = useState(segments.length)

    const items: BreadcrumbV2ItemType[] = useMemo(() => {
        const visible = segments.slice(0, depth)
        return visible.map((seg, index) => ({
            ...seg,
            onClick:
                index < visible.length - 1
                    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault()
                          fn()(seg.label, seg.href)
                          setDepth(index + 1)
                      }
                    : undefined,
        }))
    }, [depth, segments])

    return (
        <div className={`${sectionClasses} max-w-[640px]`}>
            <div className={labelClasses}>
                Interactive · SPA-style navigation
            </div>
            <p className="m-0 mb-4 text-sm text-gray-600">
                Click any link except the current page. Depth:{' '}
                <strong>{depth}</strong> / {segments.length}
            </p>
            <div className="flex gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => setDepth((d) => Math.max(1, d - 1))}
                >
                    Shorter trail
                </button>
                <button
                    type="button"
                    onClick={() =>
                        setDepth((d) => Math.min(segments.length, d + 1))
                    }
                >
                    Longer trail
                </button>
                <button type="button" onClick={() => setDepth(segments.length)}>
                    Reset
                </button>
            </div>
            <BreadcrumbV2 items={items} />
        </div>
    )
}

export const Interactive_ClientRouting: Story = {
    name: 'Interactive · Client routing',
    render: () => <InteractiveRoutingDemo />,
}

function InteractiveComposableDemo() {
    const [last, setLast] = useState<string>('—')

    return (
        <div className={`${sectionClasses} max-w-[560px]`}>
            <div className={labelClasses}>
                Interactive · Composable Item onClick
            </div>
            <p style={{ margin: '0 0 16px', fontSize: 14 }}>
                Last action: <strong>{last}</strong>
            </p>
            <BreadcrumbV2>
                <BreadcrumbV2.Item
                    href="/story/a"
                    onClick={(e) => {
                        e.preventDefault()
                        setLast('Home clicked')
                        fn()('Home')
                    }}
                >
                    <BreadcrumbV2.Page>Home</BreadcrumbV2.Page>
                </BreadcrumbV2.Item>
                <BreadcrumbV2.Item
                    href="/story/b"
                    onClick={(e) => {
                        e.preventDefault()
                        setLast('Section clicked')
                        fn()('Section')
                    }}
                >
                    <BreadcrumbV2.Page>Section</BreadcrumbV2.Page>
                </BreadcrumbV2.Item>
                <BreadcrumbV2.Item isActive>
                    <BreadcrumbV2.Page>Current</BreadcrumbV2.Page>
                </BreadcrumbV2.Item>
            </BreadcrumbV2>
        </div>
    )
}

export const Interactive_ComposableClicks: Story = {
    name: 'Interactive · Composable clicks',
    render: () => <InteractiveComposableDemo />,
}
