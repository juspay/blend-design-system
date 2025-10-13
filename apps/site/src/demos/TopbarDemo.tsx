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
    Building2,
    Store,
} from 'lucide-react'
import {
    Topbar,
    type MerchantInfo,
} from '../../../../packages/blend/lib/components/Topbar'
import { type LeftPanelInfo } from '../../../../packages/blend/lib/components/Sidebar/types'
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
    const [selectedTenant, setSelectedTenant] = useState('company-a')
    const [selectedMerchant, setSelectedMerchant] = useState('juspay')

    // Sample tenant data for mobile topbar
    const leftPanelData: LeftPanelInfo = {
        items: [
            {
                label: 'Company A',
                value: 'company-a',
                icon: (
                    <Building2
                        size={20}
                        color={FOUNDATION_THEME.colors.primary[600]}
                    />
                ),
            },
            {
                label: 'Company B',
                value: 'company-b',
                icon: (
                    <Building2
                        size={20}
                        color={FOUNDATION_THEME.colors.green[600]}
                    />
                ),
            },
            {
                label: 'Enterprise Corp',
                value: 'enterprise-corp',
                icon: (
                    <Building2
                        size={20}
                        color={FOUNDATION_THEME.colors.purple[600]}
                    />
                ),
            },
        ],
        selected: selectedTenant,
        onSelect: (value: string) => {
            setSelectedTenant(value)
            console.log('Selected tenant:', value)
        },
    }

    // Sample merchant data for mobile topbar
    const merchantInfo: MerchantInfo = {
        items: [
            {
                label: 'juspay',
                value: 'juspay',
                icon: (
                    <User size={16} color={FOUNDATION_THEME.colors.gray[600]} />
                ),
            },
            {
                label: 'zeptomarketplace',
                value: 'zeptomarketplace',
                icon: (
                    <Store
                        size={16}
                        color={FOUNDATION_THEME.colors.orange[600]}
                    />
                ),
            },
            {
                label: 'bigbasket',
                value: 'bigbasket',
                icon: (
                    <ShoppingCart
                        size={16}
                        color={FOUNDATION_THEME.colors.green[600]}
                    />
                ),
            },
        ],
        selected: selectedMerchant,
        onSelect: (value: string) => {
            setSelectedMerchant(value)
            console.log('Selected merchant:', value)
        },
    }

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
                    Responsive topbar with tenant and merchant selection for
                    mobile screens
                </Text>
            </div>
            <div className="space-y-0.5">
                <div className="border-b border-gray-100 last:border-b-0">
                    <div className="p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                            Mobile Layout with Tenant & Merchant Selection
                        </div>
                        <div className="w-full max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                title="Dashboard"
                                leftPanel={leftPanelData}
                                merchantInfo={merchantInfo}
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
                        <div className="mt-2 text-xs text-gray-500">
                            Tap the tenant icon to switch organizations. Select
                            merchants from the dropdown.
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
                            Only Merchant Selection (No Tenants)
                        </div>
                        <div className="w-full max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden">
                            <Topbar
                                title="Analytics"
                                merchantInfo={merchantInfo}
                                rightActions={
                                    <div className="flex gap-1">
                                        <ActionButton>
                                            <Settings
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[600]
                                                }
                                                size={20}
                                            />
                                        </ActionButton>
                                        <ActionButton>
                                            <div className="w-6 h-6 bg-blue-500 rounded-full" />
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
                    on screen size. Features tenant/merchant selection on
                    mobile.
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
                                        items: merchantInfo.items.map(
                                            (merchant) => ({
                                                label: merchant.label,
                                                value: merchant.value,
                                                slot1: merchant.icon,
                                            })
                                        ),
                                    },
                                ]}
                                selected={merchantInfo.selected}
                                onSelect={merchantInfo.onSelect}
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
                        leftPanel={leftPanelData}
                        merchantInfo={merchantInfo}
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
                    layouts with tenant and merchant selection
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
                        screens smaller than 1024px. Features tenant icon
                        selector, merchant dropdown, and right action buttons.
                    </Text>
                    <Text variant="body.md">
                        <strong>Web Mode:</strong> Full-featured topbar with
                        sidebar integration, search functionality, and expanded
                        action areas.
                    </Text>
                    <Text variant="body.md">
                        <strong>Tenant Selection:</strong> On mobile, tenants
                        appear as clickable icons. On desktop, they remain in
                        the sidebar.
                    </Text>
                    <Text variant="body.md">
                        <strong>Merchant Selection:</strong> Consistent dropdown
                        behavior across both mobile and web with proper check
                        icons.
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default TopbarDemo
