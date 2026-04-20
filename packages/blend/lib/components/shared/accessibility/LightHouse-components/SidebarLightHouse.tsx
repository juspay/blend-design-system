import Sidebar from '../../../Sidebar/Sidebar'
import {
    Home,
    Users,
    Settings,
    FileText,
    BarChart3,
    CreditCard,
    Package,
    ShoppingCart,
    Building,
    DollarSign,
    Cpu,
    Search,
    Bell,
    LogOut,
} from 'lucide-react'
import Button from '../../../Button/Button'
import { ButtonType, ButtonSize } from '../../../Button/types'
import { Avatar, AvatarSize, AvatarShape } from '../../../Avatar'
import type { DirectoryData } from '../../../Directory/types'

const SidebarLightHouse = () => {
    const navigationData: DirectoryData[] = [
        {
            label: 'Main',
            items: [
                {
                    label: 'Dashboard',
                    leftSlot: <Home size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Analytics',
                    leftSlot: <BarChart3 size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Reports',
                    leftSlot: <FileText size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
            ],
        },
        {
            label: 'Commerce',
            items: [
                {
                    label: 'Products',
                    leftSlot: <Package size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Orders',
                    leftSlot: <ShoppingCart size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Customers',
                    leftSlot: <Users size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
            ],
        },
        {
            label: 'Settings',
            items: [
                {
                    label: 'General',
                    leftSlot: <Settings size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Billing',
                    leftSlot: <CreditCard size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
            ],
        },
    ]

    return (
        <div className="flex flex-col gap-4">
            {/* Basic Sidebar */}
            <div style={{ height: '600px', display: 'flex' }}>
                <Sidebar
                    data={navigationData}
                    topbar={<div>Topbar Content</div>}
                    isExpanded={true}
                >
                    <div style={{ padding: '32px' }}>
                        <h1>Dashboard</h1>
                        <p>Main content area</p>
                    </div>
                </Sidebar>
            </div>

            {/* Sidebar with Left Panel */}
            <div style={{ height: '600px', display: 'flex' }}>
                <Sidebar
                    data={navigationData}
                    topbar={<div>Topbar Content</div>}
                    leftPanel={{
                        items: [
                            {
                                label: 'Retail Corp',
                                icon: (
                                    <Building
                                        size={16}
                                        color="#3b82f6"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                            {
                                label: 'Tech Inc',
                                icon: (
                                    <Cpu
                                        size={16}
                                        color="#8b5cf6"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                            {
                                label: 'Finance Ltd',
                                icon: (
                                    <DollarSign
                                        size={16}
                                        color="#10b981"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                        ],
                        selected: 'Retail Corp',
                        onSelect: () => {},
                    }}
                    isExpanded={true}
                >
                    <div style={{ padding: '32px' }}>
                        <h1>Dashboard</h1>
                        <p>Main content area with tenant panel</p>
                    </div>
                </Sidebar>
            </div>

            {/* Sidebar with Footer */}
            <div style={{ height: '600px', display: 'flex' }}>
                <Sidebar
                    data={navigationData}
                    topbar={<div>Topbar Content</div>}
                    footer={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                            }}
                        >
                            <Avatar
                                src="https://i.pravatar.cc/150?img=1"
                                alt="User profile"
                                size={AvatarSize.SM}
                                shape={AvatarShape.CIRCULAR}
                            />
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}
                                >
                                    John Doe
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: '#6b7280',
                                    }}
                                >
                                    john@example.com
                                </div>
                            </div>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<LogOut aria-hidden="true" />}
                                aria-label="Log out"
                            />
                        </div>
                    }
                    isExpanded={true}
                >
                    <div style={{ padding: '32px' }}>
                        <h1>Dashboard</h1>
                        <p>Main content area with footer</p>
                    </div>
                </Sidebar>
            </div>

            {/* Sidebar with Full Features */}
            <div style={{ height: '600px', display: 'flex' }}>
                <Sidebar
                    data={navigationData}
                    topbar={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                width: '100%',
                            }}
                            role="search"
                            aria-label="Global search"
                        >
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: '8px',
                                }}
                            >
                                <Search
                                    size={16}
                                    color="#6b7280"
                                    aria-hidden="true"
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    aria-label="Search input"
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        backgroundColor: 'transparent',
                                        width: '100%',
                                    }}
                                />
                            </div>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<Bell aria-hidden="true" />}
                                aria-label="Notifications"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/150?img=1"
                                alt="User profile"
                                size={AvatarSize.SM}
                                shape={AvatarShape.ROUNDED}
                            />
                        </div>
                    }
                    leftPanel={{
                        items: [
                            {
                                label: 'Retail Corp',
                                icon: (
                                    <Building
                                        size={16}
                                        color="#3b82f6"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                            {
                                label: 'Tech Inc',
                                icon: (
                                    <Cpu
                                        size={16}
                                        color="#8b5cf6"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                            {
                                label: 'Finance Ltd',
                                icon: (
                                    <DollarSign
                                        size={16}
                                        color="#10b981"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                        ],
                        selected: 'Retail Corp',
                        onSelect: () => {},
                    }}
                    footer={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                            }}
                        >
                            <Avatar
                                src="https://i.pravatar.cc/150?img=1"
                                alt="John Doe profile"
                                size={AvatarSize.SM}
                                shape={AvatarShape.CIRCULAR}
                            />
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}
                                >
                                    John Doe
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: '#6b7280',
                                    }}
                                >
                                    john@example.com
                                </div>
                            </div>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<LogOut aria-hidden="true" />}
                                aria-label="Log out"
                            />
                        </div>
                    }
                    isExpanded={true}
                >
                    <div style={{ padding: '32px' }}>
                        <h1>Dashboard</h1>
                        <p>Main content area with all features</p>
                    </div>
                </Sidebar>
            </div>

            {/* Collapsed Sidebar */}
            <div style={{ height: '600px', display: 'flex' }}>
                <Sidebar
                    data={navigationData}
                    topbar={<div>Topbar Content</div>}
                    isExpanded={false}
                >
                    <div style={{ padding: '32px' }}>
                        <h1>Dashboard</h1>
                        <p>Main content area with collapsed sidebar</p>
                    </div>
                </Sidebar>
            </div>

            {/* Panel Only Mode */}
            <div style={{ height: '600px', display: 'flex' }}>
                <Sidebar
                    data={navigationData}
                    topbar={<div>Topbar Content</div>}
                    leftPanel={{
                        items: [
                            {
                                label: 'Retail Corp',
                                icon: (
                                    <Building
                                        size={16}
                                        color="#3b82f6"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                            {
                                label: 'Tech Inc',
                                icon: (
                                    <Cpu
                                        size={16}
                                        color="#8b5cf6"
                                        aria-hidden="true"
                                    />
                                ),
                            },
                        ],
                        selected: 'Retail Corp',
                        onSelect: () => {},
                    }}
                    panelOnlyMode={true}
                >
                    <div style={{ padding: '32px' }}>
                        <h1>Dashboard</h1>
                        <p>Main content area with panel only mode</p>
                    </div>
                </Sidebar>
            </div>
        </div>
    )
}

export default SidebarLightHouse
