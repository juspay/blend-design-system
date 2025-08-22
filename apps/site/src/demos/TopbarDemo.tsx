import { useState } from 'react'
import {
    Bell,
    Search,
    Settings,
    User,
    MoreVertical,
    Home,
    ShoppingCart,
    TrendingUp,
} from 'lucide-react'
import { Topbar } from '../../../../packages/blend/lib/components/Topbar'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { TextInput } from '../../../../packages/blend/lib/main'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { SelectMenuVariant } from '../../../../packages/blend/lib/components/Select/types'

const TopbarDemo = () => {
    const [search, setSearch] = useState('')
    const [, setCurrentPage] = useState('Dashboard')

    const ActionButton = ({
        children,
        onClick,
    }: {
        children: React.ReactNode
        onClick?: () => void
    }) => (
        <button
            className="flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer p-2 transition-colors duration-150 min-w-[40px] h-[40px] hover:bg-gray-100 active:bg-gray-200"
            onClick={onClick}
        >
            {children}
        </button>
    )

    const renderMobileExamples = () => (
        <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
                <Text variant="heading.sm" fontWeight={600}>
                    Mobile Topbar Examples
                </Text>
                <Text
                    variant="body.sm"
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Responsive topbar components optimized for mobile screens
                </Text>
            </div>
            <div className="space-y-0.5">
                <div className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                            Mobile Layout with Dropdown
                        </div>
                        <div className="w-full max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                title="Dashboard"
                                sidebarTopSlot={
                                    <SingleSelect
                                        placeholder="Select Merchant"
                                        variant={SelectMenuVariant.NO_CONTAINER}
                                        items={[
                                            {
                                                items: [
                                                    {
                                                        label: 'Default',
                                                        value: 'default',
                                                        slot1: (
                                                            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                                                <span className="text-white text-xs font-bold">
                                                                    D
                                                                </span>
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        label: 'Marketplace',
                                                        value: 'marketplace',
                                                        slot1: (
                                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                                <span className="text-white text-xs font-bold">
                                                                    M
                                                                </span>
                                                            </div>
                                                        ),
                                                    },
                                                ],
                                            },
                                        ]}
                                        selected={'default'}
                                        onSelect={(value) =>
                                            console.log('Selected:', value)
                                        }
                                    />
                                }
                                rightActions={
                                    <div className="flex gap-1">
                                        <ActionButton>
                                            <Bell
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[600]
                                                }
                                                size={20}
                                            />
                                        </ActionButton>
                                        <ActionButton>
                                            <TrendingUp
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .green[600]
                                                }
                                                size={20}
                                            />
                                        </ActionButton>
                                        <ActionButton>
                                            <div className="w-6 h-6 bg-gray-300 rounded-full" />
                                        </ActionButton>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                            With Back Button
                        </div>
                        <div className="w-full max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                title="Product Details"
                                showBackButton={true}
                                onBackClick={() => setCurrentPage('Dashboard')}
                                rightActions={
                                    <ActionButton>
                                        <ShoppingCart
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                            size={20}
                                        />
                                    </ActionButton>
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                            Custom Content
                        </div>
                        <div className="w-full max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                leftAction={
                                    <ActionButton>
                                        <Home
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                            size={20}
                                        />
                                    </ActionButton>
                                }
                                rightActions={
                                    <ActionButton>
                                        <User
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                            size={20}
                                        />
                                    </ActionButton>
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <Text variant="body.md" fontWeight={600}>
                                        Welcome, John
                                    </Text>
                                    <div className="bg-blue-500 rounded-xl px-2 py-0.5">
                                        <Text
                                            variant="body.xs"
                                            color="white"
                                            fontWeight={500}
                                        >
                                            Pro
                                        </Text>
                                    </div>
                                </div>
                            </Topbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderWebExamples = () => (
        <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
                <Text variant="heading.sm" fontWeight={600}>
                    Web Topbar Examples
                </Text>
                <Text
                    variant="body.sm"
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Desktop topbar with search, actions, and expanded
                    functionality
                </Text>
            </div>
            <div className="space-y-0.5">
                <div className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                            With Search & Actions
                        </div>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                isExpanded={true}
                                showToggleButton={false}
                                topbar={
                                    <div className="flex items-center justify-between w-full">
                                        <div className="w-96">
                                            <TextInput
                                                placeholder="Search anything..."
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                leftSlot={
                                                    <Search
                                                        style={{
                                                            width: '16px',
                                                            height: '16px',
                                                        }}
                                                        color={
                                                            FOUNDATION_THEME
                                                                .colors
                                                                .gray[400]
                                                        }
                                                    />
                                                }
                                                rightSlot={
                                                    <span className="text-sm text-gray-300">
                                                        ⌘ + K
                                                    </span>
                                                }
                                            />
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                size={ButtonSize.SMALL}
                                                text="Export"
                                            />
                                            <ActionButton>
                                                <Bell
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[600]
                                                    }
                                                    size={16}
                                                />
                                            </ActionButton>
                                            <ActionButton>
                                                <Settings
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[600]
                                                    }
                                                    size={16}
                                                />
                                            </ActionButton>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                            With Sidebar Toggle
                        </div>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                isExpanded={false}
                                showToggleButton={true}
                                onToggleExpansion={() =>
                                    console.log('Toggle sidebar')
                                }
                                topbar={
                                    <div className="flex items-center justify-between w-full">
                                        <Text
                                            variant="heading.md"
                                            fontWeight={600}
                                        >
                                            Analytics Dashboard
                                        </Text>
                                        <div className="flex gap-2 items-center">
                                            <Button
                                                buttonType={ButtonType.PRIMARY}
                                                size={ButtonSize.SMALL}
                                                text="Create Report"
                                            />
                                            <ActionButton>
                                                <MoreVertical
                                                    color={
                                                        FOUNDATION_THEME.colors
                                                            .gray[600]
                                                    }
                                                    size={16}
                                                />
                                            </ActionButton>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Example 3: Minimal Web Topbar */}
                <div className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                            Minimal Layout
                        </div>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                isExpanded={true}
                                showToggleButton={false}
                                topbar={
                                    <div className="flex items-center justify-center w-full">
                                        <Text
                                            variant="heading.lg"
                                            fontWeight={600}
                                        >
                                            Simple Web Header
                                        </Text>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // Responsive Example
    const renderResponsiveExample = () => (
        <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
                <Text variant="heading.sm" fontWeight={600}>
                    Responsive Topbar (Auto-adapts)
                </Text>
                <Text
                    variant="body.sm"
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Automatically switches between mobile and web layouts based
                    on screen size
                </Text>
            </div>
            <div className="p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">
                    Resize your browser to see the responsive behavior
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <Topbar
                        // Web props
                        isExpanded={true}
                        showToggleButton={false}
                        sidebarTopSlot={
                            <SingleSelect
                                placeholder="Select Merchant"
                                variant={SelectMenuVariant.NO_CONTAINER}
                                items={[
                                    {
                                        items: [
                                            {
                                                label: 'Default',
                                                value: 'default',
                                                slot1: (
                                                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">
                                                            D
                                                        </span>
                                                    </div>
                                                ),
                                            },
                                        ],
                                    },
                                ]}
                                selected={'default'}
                                onSelect={(value) =>
                                    console.log('Selected:', value)
                                }
                            />
                        }
                        topbar={
                            <div className="flex items-center justify-between w-full">
                                <div className="w-72">
                                    <TextInput
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        leftSlot={
                                            <Search
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                }}
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[400]
                                                }
                                            />
                                        }
                                    />
                                </div>
                                <Text variant="body.md" fontWeight={600}>
                                    Responsive Header
                                </Text>
                            </div>
                        }
                        // Mobile props
                        title="Responsive Header"
                        rightActions={
                            <div className="flex gap-1">
                                <ActionButton>
                                    <Bell
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                        size={20}
                                    />
                                </ActionButton>
                                <ActionButton>
                                    <TrendingUp
                                        color={
                                            FOUNDATION_THEME.colors.green[600]
                                        }
                                        size={20}
                                    />
                                </ActionButton>
                                <ActionButton>
                                    <div className="w-6 h-6 bg-gray-300 rounded-full" />
                                </ActionButton>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <Text variant="heading.lg" fontWeight={700}>
                    Topbar Component Demo
                </Text>
                <Text
                    variant="body.lg"
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Flexible topbar component that adapts to both mobile and web
                    layouts
                </Text>
            </div>

            {renderMobileExamples()}
            {renderWebExamples()}
            {renderResponsiveExample()}

            <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
                <Text variant="heading.sm" fontWeight={600}>
                    Usage Guidelines
                </Text>
                <div className="mt-4 space-y-3">
                    <Text variant="body.md">
                        <strong>Mobile Mode:</strong> Automatically activated on
                        screens smaller than 1024px. Features centered title,
                        left/right action buttons, and simplified layout.
                    </Text>
                    <Text variant="body.md">
                        <strong>Web Mode:</strong> Full-featured topbar with
                        sidebar integration, search functionality, and expanded
                        action areas.
                    </Text>
                    <Text variant="body.md">
                        <strong>Responsive:</strong> The component automatically
                        switches between mobile and web layouts based on screen
                        size, using the appropriate props for each mode.
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default TopbarDemo
