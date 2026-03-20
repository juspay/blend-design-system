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
        docs: {
            description: {
                component: `
Breadcrumb navigation with **items** API, **composable** \`Item / Page / StartIcon / EndIcon\`, optional overflow ellipsis, and skeleton loading.

Use **Interactive** stories to try client-side routing; use **Visual** stories for layout and Chromatic snapshots.
`,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        items: {
            control: 'object',
            description: 'Array of breadcrumb segments',
        },
        skeleton: { control: 'object' },
    },
}

export default meta
type Story = StoryObj<typeof BreadcrumbV2>

const SAMPLE_ITEMS: BreadcrumbV2ItemType[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Cameras', href: '/products/electronics/cameras' },
]

const sectionStyle: React.CSSProperties = {
    padding: '20px 24px',
    borderRadius: 12,
    border: '1px solid var(--sb-border-color, #e5e7eb)',
    background: 'var(--sb-background-color, #fafafa)',
    maxWidth: 720,
}

const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: 'var(--sb-text-secondary, #6b7280)',
    marginBottom: 12,
}

export const Default: Story = {
    render: (args) => <BreadcrumbV2 {...args} />,
    args: {
        items: SAMPLE_ITEMS,
    },
}

/** Constrain width so the trail wraps or shows overflow behavior in narrow layouts. */
export const Visual_NarrowContainer: Story = {
    name: 'Visual · Narrow container',
    render: (args) => (
        <div style={{ width: 320, ...sectionStyle }}>
            <div style={labelStyle}>320px wide</div>
            <BreadcrumbV2 {...args} />
        </div>
    ),
    args: {
        items: SAMPLE_ITEMS,
    },
}

export const WithOverflowMenu: Story = {
    name: 'Visual · Overflow (7+ items)',
    render: (args) => (
        <div style={sectionStyle}>
            <div style={labelStyle}>Ellipsis + last three segments</div>
            <BreadcrumbV2 {...args} />
        </div>
    ),
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Level 1', href: '/1' },
            { label: 'Level 2', href: '/2' },
            { label: 'Level 3', href: '/3' },
            { label: 'Level 4', href: '/4' },
            { label: 'Level 5', href: '/5' },
            { label: 'Level 6', href: '/6' },
        ],
    },
}

export const Visual_WithLeadingIcons: Story = {
    name: 'Visual · Items with left slots',
    render: () => (
        <div style={sectionStyle}>
            <div style={labelStyle}>leftSlot icons</div>
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
        <div style={sectionStyle}>
            <div style={labelStyle}>One crumb — active</div>
            <BreadcrumbV2
                items={[{ label: 'Dashboard', href: '/dashboard' }]}
            />
        </div>
    ),
}

export const Visual_Composable: Story = {
    name: 'Visual · Composable API',
    render: () => (
        <div style={sectionStyle}>
            <div style={labelStyle}>
                BreadcrumbV2.Item · StartIcon · Page · EndIcon
            </div>
            <BreadcrumbV2>
                <BreadcrumbV2.Item href="/">
                    <BreadcrumbV2.StartIcon>
                        <Home size={16} aria-hidden />
                    </BreadcrumbV2.StartIcon>
                    <BreadcrumbV2.Page>Home</BreadcrumbV2.Page>
                    <BreadcrumbV2.EndIcon>
                        <ChevronRight size={14} aria-hidden />
                    </BreadcrumbV2.EndIcon>
                </BreadcrumbV2.Item>
                <BreadcrumbV2.Item href="/docs">
                    <BreadcrumbV2.Page>Docs</BreadcrumbV2.Page>
                    <BreadcrumbV2.EndIcon>
                        <ChevronRight size={14} aria-hidden />
                    </BreadcrumbV2.EndIcon>
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
        <div style={sectionStyle}>
            <div style={labelStyle}>5+ Item children → ellipsis</div>
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                padding: 24,
                maxWidth: 800,
            }}
        >
            <h2 style={{ margin: 0, fontSize: 20 }}>BreadcrumbV2 — visual</h2>

            <div style={sectionStyle}>
                <div style={labelStyle}>Default trail</div>
                <BreadcrumbV2 items={SAMPLE_ITEMS} />
            </div>

            <div style={sectionStyle}>
                <div style={labelStyle}>With icons + right slot</div>
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

            <div style={{ width: 360, ...sectionStyle }}>
                <div style={labelStyle}>Overflow (items API)</div>
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

            <div style={sectionStyle}>
                <div style={labelStyle}>Skeleton</div>
                <BreadcrumbV2
                    items={SAMPLE_ITEMS}
                    skeleton={{ show: true, variant: 'pulse' }}
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
                          fn('navigate')(seg.label, seg.href)
                          setDepth(index + 1)
                      }
                    : undefined,
        }))
    }, [depth, segments])

    return (
        <div style={{ ...sectionStyle, maxWidth: 640 }}>
            <div style={labelStyle}>Interactive · SPA-style navigation</div>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#4b5563' }}>
                Click any link except the current page. Depth:{' '}
                <strong>{depth}</strong> / {segments.length}
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
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
        <div style={{ ...sectionStyle, maxWidth: 560 }}>
            <div style={labelStyle}>Interactive · Composable Item onClick</div>
            <p style={{ margin: '0 0 16px', fontSize: 14 }}>
                Last action: <strong>{last}</strong>
            </p>
            <BreadcrumbV2>
                <BreadcrumbV2.Item
                    href="/story/a"
                    onClick={(e) => {
                        e.preventDefault()
                        setLast('Home clicked')
                        fn('itemClick')('Home')
                    }}
                >
                    <BreadcrumbV2.Page>Home</BreadcrumbV2.Page>
                </BreadcrumbV2.Item>
                <BreadcrumbV2.Item
                    href="/story/b"
                    onClick={(e) => {
                        e.preventDefault()
                        setLast('Section clicked')
                        fn('itemClick')('Section')
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

export const Skeleton: Story = {
    name: 'Visual · Skeleton',
    render: () => (
        <div style={sectionStyle}>
            <div style={labelStyle}>Loading state</div>
            <BreadcrumbV2
                items={SAMPLE_ITEMS}
                skeleton={{ show: true, variant: 'pulse' }}
            />
        </div>
    ),
}
