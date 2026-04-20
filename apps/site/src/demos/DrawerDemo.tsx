'use client'

import { useState } from 'react'

import {
    Drawer,
    DrawerTrigger,
    DrawerBody,
    DrawerPortal,
    DrawerDescription,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
    StatusDrawer,
    MultiSelectDrawer,
    SingleSelectDrawer,
    NestedMultiSelectDrawer,
    NestedSingleSelectDrawer,
} from '../../../../packages/blend/lib/components/Drawer'
import {
    Button,
    ButtonType,
} from '../../../../packages/blend/lib/components/Button'
import ResponsiveSelectDemo from './ResponsiveSelectDemo'
import {
    MultiSelect,
    MultiSelectVariant,
    MultiSelectSelectionTagType,
    MultiSelectMenuSize,
    MultiSelectMenuGroupType,
} from '../../../../packages/blend/lib/components/MultiSelect'
import { Tooltip } from '../../../../packages/blend/lib/components/Tooltip'
import { Popover } from '../../../../packages/blend/lib/components/Popover'
import {
    SelectMenuGroupType,
    SingleSelect,
} from '../../../../packages/blend/lib/components/SingleSelect'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { Code, Database, Search, Server, User, X } from 'lucide-react'
import { Modal, SearchInput } from '../../../../packages/blend/lib/main'
const simpleItems: SelectMenuGroupType[] = [
    {
        items: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
            { label: 'Option 5', value: 'option5' },
            { label: 'Option 6', value: 'option6' },
            { label: 'Option 7', value: 'option7' },
            { label: 'Option 8', value: 'option8' },
            { label: 'Option 9', value: 'option9' },
            { label: 'Option 10', value: 'option10' },
            { label: 'Option 11', value: 'option11' },
            { label: 'Option 12', value: 'option12' },
            { label: 'Option 13', value: 'option13' },
            { label: 'Option 14', value: 'option14' },
            { label: 'Option 15', value: 'option15' },
            { label: 'Option 16', value: 'option16' },
            { label: 'Option 17', value: 'option17' },
            { label: 'Option 18', value: 'option18' },
            { label: 'Option 19', value: 'option19' },
            { label: 'Option 20', value: 'option20' },
        ],
    },
]

const skillItems: MultiSelectMenuGroupType[] = [
    {
        groupLabel: 'Frontend',
        showSeparator: true,
        items: [
            { label: 'React', value: 'react', slot1: <Code size={16} /> },
            { label: 'Vue.js', value: 'vue', slot1: <Code size={16} /> },
            {
                label: 'Angular',
                value: 'angular',
                slot1: <Code size={16} />,
            },
            { label: 'Svelte', value: 'svelte', slot1: <Code size={16} /> },
            {
                label: 'Next.js',
                value: 'nextjs',
                slot1: <Code size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Backend',
        showSeparator: true,
        items: [
            {
                label: 'Node.js',
                value: 'nodejs',
                slot1: <Server size={16} />,
            },
            {
                label: 'Python',
                value: 'python',
                slot1: <Server size={16} />,
            },
            { label: 'Java', value: 'java', slot1: <Server size={16} /> },
            { label: 'C#', value: 'csharp', slot1: <Server size={16} /> },
            { label: 'Go', value: 'go', slot1: <Server size={16} /> },
        ],
    },
    {
        groupLabel: 'Database',
        items: [
            {
                label: 'PostgreSQL',
                value: 'postgresql',
                slot1: <Database size={16} />,
            },
            {
                label: 'MySQL',
                value: 'mysql',
                slot1: <Database size={16} />,
            },
            {
                label: 'MongoDB',
                value: 'mongodb',
                slot1: <Database size={16} />,
            },
            {
                label: 'Redis',
                value: 'redis',
                slot1: <Database size={16} />,
            },
        ],
    },
]

export const BasicDrawerExample = () => {
    const [searchValue, setSearchValue] = useState('')

    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent hasSnapPoints={true}>
                    <DrawerHeader>
                        <DrawerTitle>Drawer for React.</DrawerTitle>
                        <DrawerDescription>
                            This component can be used as a Dialog replacement
                            on mobile and tablet devices.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <SearchInput
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search..."
                            leftSlot={<Search size={16} />}
                        />
                        <p>
                            This component can be used as a Dialog replacement
                            on mobile and tablet devices. You can read about why
                            and how it was built{' '}
                            <a
                                target="_blank"
                                href="https://emilkowal.ski/ui/building-a-drawer-component"
                                style={{ textDecoration: 'underline' }}
                            >
                                here
                            </a>
                            .
                        </p>
                        <p>
                            This one specifically is the most simplest setup you
                            can have, just a simple drawer with a trigger.
                        </p>
                    </DrawerBody>
                    <DrawerFooter direction="bottom">
                        <DrawerClose>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#f3f4f6',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </DrawerClose>
                        <DrawerClose>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Submit
                            </button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Nested Drawer Example
export const NestedDrawerExample = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Nested Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent offSet="12px">
                    <DrawerHeader>
                        <DrawerTitle>Nested Drawers.</DrawerTitle>
                        <DrawerDescription>
                            Nesting drawers creates a Sonner-like stacking
                            effect.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            Nesting drawers creates a{' '}
                            <a
                                href="https://sonner.emilkowal.ski/"
                                target="_blank"
                                style={{ textDecoration: 'underline' }}
                            >
                                Sonner-like
                            </a>{' '}
                            stacking effect.
                        </p>
                        <p>
                            You can nest as many drawers as you want. All you
                            need to do is add a nested drawer component.
                        </p>

                        <Drawer nested>
                            <DrawerTrigger>
                                <button
                                    style={{
                                        marginTop: '16px',
                                        width: '100%',
                                        backgroundColor: '#1f2937',
                                        padding: '10px 14px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: 'white',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Open Second Drawer
                                </button>
                            </DrawerTrigger>
                            <DrawerPortal>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>
                                            This drawer is nested.
                                        </DrawerTitle>
                                        <DrawerDescription>
                                            If you pull this drawer down a bit,
                                            it'll scale the drawer underneath it
                                            as well.
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerBody>
                                        <p>
                                            If you pull this drawer down a bit,
                                            it'll scale the drawer underneath it
                                            as well.
                                        </p>
                                    </DrawerBody>
                                </DrawerContent>
                            </DrawerPortal>
                        </Drawer>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export const SideDrawerExample = () => {
    const [basicIconSelected, setBasicIconSelected] = useState('')
    const [basicSimpleSelected, setBasicSimpleSelected] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Helper function to handle multi-select changes
    const handleMultiSelectChange =
        (
            _: string[],
            setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
        ) =>
        (value: string) => {
            if (value === '') {
                setSelectedValues([])
            } else {
                setSelectedValues((prev) =>
                    prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                )
            }
        }

    return (
        <Drawer direction="right" dismissible={isModalOpen ? false : true}>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Right Drawer (Structured)
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction="right"
                    width="500px"
                    // offSet="20px"
                >
                    <DrawerHeader>
                        <DrawerTitle>User Profile Settings</DrawerTitle>
                        <DrawerDescription>
                            Manage your account settings and preferences
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody overflowY="auto">
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <Button
                                text="Open Modal"
                                onClick={() => {
                                    setIsModalOpen(!isModalOpen)
                                }}
                            />
                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => {
                                    setIsModalOpen(false)
                                }}
                                title="Modal Title"
                                subtitle="Modal Subtitle"
                            >
                                <div>
                                    <h1
                                        onClick={(e) => {
                                            console.log('hello------->>>')
                                            e.stopPropagation()
                                        }}
                                    >
                                        Modal Content
                                    </h1>
                                    <SingleSelect
                                        items={simpleItems}
                                        selected={basicIconSelected}
                                        onSelect={(value) => {
                                            setBasicIconSelected(value)
                                            addSnackbar({
                                                header: `Icon Selected: ${value}`,
                                            })
                                        }}
                                        placeholder="Select user"
                                        slot={<User size={16} />}
                                    />
                                </div>
                            </Modal>

                            <SingleSelect
                                label="User Selection"
                                items={simpleItems}
                                selected={basicIconSelected}
                                onSelect={(value) => {
                                    setBasicIconSelected(value)
                                    addSnackbar({
                                        header: `Icon Selected: ${value}`,
                                    })
                                }}
                                placeholder="Select user"
                                slot={<User size={16} />}
                            />
                            <MultiSelect
                                label="Technologies (Default Settings)"
                                sublabel="Search and action buttons enabled by default"
                                items={skillItems}
                                selectedValues={basicSimpleSelected}
                                onChange={handleMultiSelectChange(
                                    basicSimpleSelected,
                                    setBasicSimpleSelected
                                )}
                                placeholder="Start typing to search..."
                                selectionTagType={
                                    MultiSelectSelectionTagType.COUNT
                                }
                                useDrawerOnMobile={false}
                            />
                            <div>
                                <h4
                                    style={{
                                        margin: '0 0 8px 0',
                                        fontWeight: '600',
                                    }}
                                >
                                    Personal Information
                                </h4>
                                <p
                                    style={{
                                        margin: '0 0 16px 0',
                                        color: '#6b7280',
                                        fontSize: '14px',
                                    }}
                                >
                                    Update your personal details and contact
                                    information.
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="John Doe"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="john@example.com"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            defaultValue="+1 (555) 123-4567"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="123 Main Street"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="San Francisco"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="California"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="94102"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="United States"
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr
                                style={{
                                    border: 'none',
                                    borderTop: '1px solid #e5e7eb',
                                    margin: '8px 0',
                                }}
                            />

                            <div>
                                <h4
                                    style={{
                                        margin: '0 0 8px 0',
                                        fontWeight: '600',
                                    }}
                                >
                                    Notification Preferences
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input type="checkbox" defaultChecked />
                                        <span style={{ fontSize: '14px' }}>
                                            Email notifications
                                        </span>
                                    </label>
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input type="checkbox" defaultChecked />
                                        <span style={{ fontSize: '14px' }}>
                                            Push notifications
                                        </span>
                                    </label>
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <input type="checkbox" />
                                        <span style={{ fontSize: '14px' }}>
                                            SMS notifications
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </DrawerBody>
                    <DrawerFooter direction="right">
                        <DrawerClose>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#f3f4f6',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </DrawerClose>
                        <button
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Save Changes
                        </button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Left Side Drawer Example - Custom Content
export const LeftSideDrawerExample = () => {
    const [activeSection, setActiveSection] = useState('dashboard')

    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Left Drawer (Custom)
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction="left"
                    showHandle={false}
                    width="320px"
                    offSet="12px"
                >
                    {/* Custom content without using DrawerHeader/DrawerTitle */}
                    <div
                        style={{
                            padding: '20px',
                            borderBottom: '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#3b82f6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    JD
                                </span>
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '16px',
                                    }}
                                >
                                    John Doe
                                </div>
                                <div
                                    style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                    }}
                                >
                                    Administrator
                                </div>
                            </div>
                        </div>
                    </div>

                    <DrawerBody noPadding>
                        <nav style={{ padding: '16px 0' }}>
                            {[
                                {
                                    id: 'dashboard',
                                    label: 'Dashboard',
                                    icon: '📊',
                                },
                                { id: 'users', label: 'Users', icon: '👥' },
                                {
                                    id: 'analytics',
                                    label: 'Analytics',
                                    icon: '📈',
                                },
                                {
                                    id: 'settings',
                                    label: 'Settings',
                                    icon: '⚙️',
                                },
                                {
                                    id: 'help',
                                    label: 'Help & Support',
                                    icon: '❓',
                                },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 20px',
                                        border: 'none',
                                        backgroundColor:
                                            activeSection === item.id
                                                ? '#eff6ff'
                                                : 'transparent',
                                        color:
                                            activeSection === item.id
                                                ? '#2563eb'
                                                : '#374151',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        borderLeft:
                                            activeSection === item.id
                                                ? '3px solid #2563eb'
                                                : '3px solid transparent',
                                        transition: 'all 0.15s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (activeSection !== item.id) {
                                            e.currentTarget.style.backgroundColor =
                                                '#f3f4f6'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activeSection !== item.id) {
                                            e.currentTarget.style.backgroundColor =
                                                'transparent'
                                        }
                                    }}
                                >
                                    <span style={{ fontSize: '18px' }}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div
                            style={{
                                padding: '16px 20px',
                                borderTop: '1px solid #e5e7eb',
                                marginTop: 'auto',
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: '#fef3c7',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #fbbf24',
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        color: '#92400e',
                                        marginBottom: '4px',
                                    }}
                                >
                                    🎉 Pro Plan Available
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: '#92400e',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Upgrade to unlock advanced features
                                </div>
                                <button
                                    style={{
                                        width: '100%',
                                        padding: '6px 12px',
                                        backgroundColor: '#f59e0b',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Top Drawer Example
export const TopDrawerExample = () => {
    return (
        <Drawer direction="top">
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Top Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent direction="top" offSet="12px">
                    <DrawerHeader>
                        <DrawerTitle>Top Drawer</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>This drawer slides down from the top.</p>
                        <p>Great for notifications or quick actions.</p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Scrollable Drawer Example
export const ScrollableDrawerExample = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Scrollable Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Ira Glass on Taste</DrawerTitle>
                        <DrawerDescription>
                            A scrollable drawer with long content.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <p>
                                Nobody tells this to people who are beginners, I
                                wish someone told me. All of us who do creative
                                work, we get into it because we have good taste.
                            </p>
                            <p>
                                But there is this gap. For the first couple
                                years you make stuff, it's just not that good.
                                It's trying to be good, it has potential, but
                                it's not. But your taste, the thing that got you
                                into the game, is still killer. And your taste
                                is why your work disappoints you. A lot of
                                people never get past this phase, they quit.
                            </p>
                            <p>
                                Most people I know who do interesting, creative
                                work went through years of this. We know our
                                work doesn't have this special thing that we
                                want it to have. We all go through this. And if
                                you are just starting out or you are still in
                                this phase, you gotta know its normal and the
                                most important thing you can do is do a lot of
                                work
                            </p>
                            <p>
                                Put yourself on a deadline so that every week
                                you will finish one story. It is only by going
                                through a volume of work that you will close
                                that gap, and your work will be as good as your
                                ambitions. And I took longer to figure out how
                                to do this than anyone I've ever met. It's gonna
                                take awhile. It's normal to take awhile. You've
                                just gotta fight your way through.
                            </p>
                            <p>
                                Nobody tells this to people who are beginners, I
                                wish someone told me. All of us who do creative
                                work, we get into it because we have good taste.
                            </p>
                            <p>
                                But there is this gap. For the first couple
                                years you make stuff, it's just not that good.
                                It's trying to be good, it has potential, but
                                it's not. But your taste, the thing that got you
                                into the game, is still killer. And your taste
                                is why your work disappoints you. A lot of
                                people never get past this phase, they quit.
                            </p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Controlled Drawer Example
export const ControlledDrawerExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Controlled Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent offSet="12px">
                    <DrawerHeader>
                        <DrawerTitle>A controlled drawer.</DrawerTitle>
                        <DrawerDescription>
                            This drawer's state is controlled programmatically.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            This means that the drawer no longer manages its own
                            state. Instead, you can control it programmatically
                            from the outside.
                        </p>
                        <p>
                            But you can still let the drawer help you a bit by
                            passing the `onOpenChange` prop. This way, the
                            drawer will change your open state when the user
                            clicks outside of it, or when they press the escape
                            key for example.
                        </p>
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                marginTop: '16px',
                                padding: '8px 16px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Close Programmatically
                        </button>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Snap Points Example
export const SnapPointsDrawerExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
        >
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Snap Points Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    hasSnapPoints={true}
                    style={{ maxWidth: '448px', margin: '0 auto' }}
                >
                    <DrawerBody overflowY={snap === 1 ? 'auto' : 'hidden'}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                padding: '20px 0',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        style={{
                                            color: '#fbbf24',
                                            height: '20px',
                                            width: '20px',
                                        }}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <h3
                                style={{
                                    fontSize: '24px',
                                    margin: '8px 0',
                                    fontWeight: '500',
                                }}
                            >
                                The Hidden Details
                            </h3>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    margin: '4px 0 24px 0',
                                }}
                            >
                                40 videos, 20+ exercises
                            </p>
                            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                                The world of user interface design is an
                                intricate landscape filled with hidden details
                                and nuance. In this course, you will learn
                                something cool. To the untrained eye, a
                                beautifully designed UI.
                            </p>
                            <button
                                style={{
                                    backgroundColor: '#000',
                                    color: 'white',
                                    marginTop: '32px',
                                    borderRadius: '6px',
                                    height: '48px',
                                    border: 'none',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}
                            >
                                Buy for $199
                            </button>
                            <div style={{ marginTop: '48px' }}>
                                <h4
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        margin: '0 0 16px 0',
                                    }}
                                >
                                    Module 01. The Details
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Layers of UI
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            A basic introduction to Layers of
                                            Design.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Typography
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            The fundamentals of type.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            UI Animations
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Going through the right easings and
                                            durations.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '48px' }}>
                                <figure>
                                    <blockquote
                                        style={{
                                            fontStyle: 'italic',
                                            color: '#374151',
                                        }}
                                    >
                                        "I especially loved the hidden details
                                        video. That was so useful, learned a lot
                                        by just reading it. Can't wait for more
                                        course content!"
                                    </blockquote>
                                    <figcaption>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                color: '#6b7280',
                                                marginTop: '8px',
                                                display: 'block',
                                            }}
                                        >
                                            Yvonne Ray, Frontend Developer
                                        </span>
                                    </figcaption>
                                </figure>
                            </div>
                            <div style={{ marginTop: '48px' }}>
                                <h4
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        margin: '0 0 16px 0',
                                    }}
                                >
                                    Module 02. The Process
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Build
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Create cool components to practice.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            User Insight
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Find out what users think and
                                            fine-tune.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Putting it all together
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Let's build an app together and
                                            apply everything.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Non-Modal Snap Points Example
export const NonModalSnapPointsExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
            modal={false}
        >
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Non-Modal Snap Points
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    hasSnapPoints={true}
                    style={{ maxWidth: '448px', margin: '0 auto' }}
                >
                    <DrawerBody overflowY={snap === 1 ? 'auto' : 'hidden'}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginBottom: '16px',
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <svg
                                    key={i}
                                    style={{
                                        color: '#fbbf24',
                                        height: '20px',
                                        width: '20px',
                                    }}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                            <svg
                                style={{
                                    color: '#d1d5db',
                                    height: '20px',
                                    width: '20px',
                                }}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h3
                            style={{
                                fontSize: '24px',
                                margin: '8px 0',
                                fontWeight: '500',
                            }}
                        >
                            The Hidden Details
                        </h3>
                        <p
                            style={{
                                fontSize: '14px',
                                color: '#6b7280',
                                margin: '4px 0 24px 0',
                            }}
                        >
                            2 modules, 27 hours of video
                        </p>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                            This drawer combines snap points with non-modal
                            behavior. You can click on other elements on the
                            page while the drawer is open.
                        </p>
                        <p
                            style={{
                                color: '#6b7280',
                                lineHeight: '1.6',
                                marginTop: '16px',
                            }}
                        >
                            Try dragging the drawer to different snap points and
                            then clicking on other buttons on the page.
                        </p>
                        <button
                            style={{
                                backgroundColor: '#000',
                                color: 'white',
                                marginTop: '32px',
                                borderRadius: '6px',
                                height: '48px',
                                border: 'none',
                                fontWeight: '500',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            Buy for $199
                        </button>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Sequential Snap Points Example
export const SequentialSnapPointsExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
            snapToSequentialPoint
        >
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Sequential Snap Points
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent hasSnapPoints={true}>
                    <DrawerHeader>
                        <DrawerTitle>Sequential Snap Points</DrawerTitle>
                        <DrawerDescription>
                            This drawer snaps to points sequentially, ignoring
                            velocity.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            With sequential snap points enabled, the drawer will
                            always snap to the next/previous snap point
                            regardless of how fast you drag it.
                        </p>
                        <p>
                            This means you can't skip snap points even with a
                            fast swipe gesture.
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Custom Fade Index Example
export const CustomFadeIndexExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
            fadeFromIndex={1}
        >
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Custom Fade Index
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent hasSnapPoints={true}>
                    <DrawerHeader>
                        <DrawerTitle>Custom Fade Index</DrawerTitle>
                        <DrawerDescription>
                            This drawer starts fading from the second snap point
                            (index 1).
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            By setting fadeFromIndex to 1, the drawer will start
                            fading the overlay from the second snap point
                            instead of the last one.
                        </p>
                        <p>
                            Try dragging to different snap points to see the
                            fade effect.
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Non-Dismissible Example
export const NonDismissibleExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Drawer dismissible={false} open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Non-Dismissible Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Non-Dismissible Drawer</DrawerTitle>
                        <DrawerDescription>
                            This drawer can only be closed programmatically.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            This drawer cannot be dismissed by clicking outside,
                            pressing escape, or dragging down.
                        </p>
                        <p>You must use the close button below to close it.</p>
                    </DrawerBody>
                    <DrawerFooter direction="bottom">
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            Close Drawer
                        </button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Status Drawer Examples
export const StatusDrawerSuccessExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Success Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Are you sure you want to delete?"
                description="This will delete the entry. You might not be able to retrieve again ever."
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#ddd6fe',
                            borderRadius: '8px',
                            border: '2px dashed #8b5cf6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>🗑️</span>
                    </div>
                }
                secondaryButtonProps={{
                    buttonType: ButtonType.SECONDARY,
                    text: 'Cancel',
                    onClick: () => setOpen(false),
                }}
                primaryButtonProps={{
                    buttonType: ButtonType.DANGER,
                    text: 'Delete',
                    onClick: () => {
                        console.log('Item deleted!')
                        setOpen(false)
                    },
                }}
            />
        </>
    )
}

export const StatusDrawerErrorExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Error Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Connection Failed"
                description="Unable to connect to the server. Please check your internet connection and try again."
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#fecaca',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px', color: '#dc2626' }}>
                            ✕
                        </span>
                    </div>
                }
                primaryButtonProps={{
                    buttonType: ButtonType.PRIMARY,
                    text: 'Try Again',
                    onClick: () => setOpen(false),
                }}
            />
        </>
    )
}

export const StatusDrawerWarningExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Warning Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Storage Almost Full"
                description="You're running out of storage space. Consider upgrading your plan or deleting some files."
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#fef3c7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px', color: '#f59e0b' }}>
                            ⚠️
                        </span>
                    </div>
                }
                primaryButtonProps={{
                    buttonType: ButtonType.PRIMARY,
                    text: 'Upgrade Plan',
                    onClick: () => setOpen(false),
                }}
            />
        </>
    )
}

export const StatusDrawerInfoExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Info Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="New Feature Available"
                description="We've added a new feature that helps you organize your files better. Check it out!"
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#dbeafe',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px', color: '#3b82f6' }}>
                            ℹ️
                        </span>
                    </div>
                }
                primaryButtonProps={{
                    buttonType: ButtonType.PRIMARY,
                    text: 'Learn More',
                    onClick: () => setOpen(false),
                }}
            />
        </>
    )
}

// Multi-Select Drawer Example with Rich Data
export const MultiSelectDrawerExample = () => {
    const [open, setOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([
        'credit_card',
        'typescript',
        'figma',
    ])

    const menuItems = [
        {
            items: [
                {
                    value: 'credit_card',
                    label: 'Credit Card',
                    subLabel: 'Visa, Mastercard, Amex',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dbeafe',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            💳
                        </span>
                    ),
                },
                {
                    value: 'paypal',
                    label: 'PayPal',
                    subLabel: 'Pay with your PayPal account',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fef3c7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🅿️
                        </span>
                    ),
                },
                {
                    value: 'apple_pay',
                    label: 'Apple Pay',
                    subLabel: 'Touch ID or Face ID',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#f3f4f6',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🍎
                        </span>
                    ),
                },
                {
                    value: 'google_pay',
                    label: 'Google Pay',
                    subLabel: 'Pay with Google',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fecaca',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🔴
                        </span>
                    ),
                },
                {
                    value: 'bank_transfer',
                    label: 'Bank Transfer',
                    subLabel: 'Direct bank transfer',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dcfce7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🏦
                        </span>
                    ),
                },
                {
                    value: 'javascript',
                    label: 'JavaScript',
                    subLabel: 'Popular web language',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fef3c7',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#f59e0b',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            JS
                        </span>
                    ),
                },
                {
                    value: 'typescript',
                    label: 'TypeScript',
                    subLabel: 'Typed JavaScript',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dbeafe',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#3b82f6',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            TS
                        </span>
                    ),
                },
                {
                    value: 'python',
                    label: 'Python',
                    subLabel: 'Versatile language',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dcfce7',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#10b981',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            PY
                        </span>
                    ),
                },
                {
                    value: 'react',
                    label: 'React',
                    subLabel: 'UI library',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#e0f2fe',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            ⚛️
                        </span>
                    ),
                },
                {
                    value: 'vue',
                    label: 'Vue.js',
                    subLabel: 'Progressive framework',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dcfce7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🟢
                        </span>
                    ),
                },
                {
                    value: 'angular',
                    label: 'Angular',
                    subLabel: 'Full framework',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fecaca',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🅰️
                        </span>
                    ),
                },
                {
                    value: 'figma',
                    label: 'Figma',
                    subLabel: 'Design collaboration',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fdf2f8',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🎨
                        </span>
                    ),
                },
                {
                    value: 'sketch',
                    label: 'Sketch',
                    subLabel: 'Mac design tool',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fef3c7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            ✏️
                        </span>
                    ),
                },
                {
                    value: 'adobe_xd',
                    label: 'Adobe XD',
                    subLabel: 'Adobe design tool',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fdf2f8',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#ec4899',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            XD
                        </span>
                    ),
                },
                {
                    value: 'photoshop',
                    label: 'Photoshop',
                    subLabel: 'Image editing',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dbeafe',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#3b82f6',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            PS
                        </span>
                    ),
                },
            ],
        },
    ]

    const handleSelectionChange = (newSelection: string[]) => {
        setSelectedItems(newSelection)
    }

    const handleConfirm = () => {
        console.log('Selected items:', selectedItems)
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Multi-Select Drawer ({selectedItems.length} selected)
            </button>
            <MultiSelectDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Select Your Skills"
                description="Choose all the technologies and tools you're proficient in"
                rightSlot={
                    <div
                        style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#8b5cf6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'white' }}>
                            ✨
                        </span>
                    </div>
                }
                items={menuItems}
                selectedValues={selectedItems}
                onSelectionChange={handleSelectionChange}
                enableSearch={true}
                searchPlaceholder="Search skills..."
                cancelText="Clear All"
                confirmText="Save Selection"
                onConfirm={handleConfirm}
            />
        </>
    )
}

// Single-Select Drawer Example
export const SingleSelectDrawerExample = () => {
    const [open, setOpen] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState<string>('us')

    const countryItems = [
        {
            items: [
                {
                    value: 'us',
                    label: 'United States',
                    subLabel: 'North America',
                    slot1: <span style={{ fontSize: '20px' }}>🇺🇸</span>,
                },
                {
                    value: 'uk',
                    label: 'United Kingdom',
                    subLabel: 'Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇬🇧</span>,
                },
                {
                    value: 'ca',
                    label: 'Canada',
                    subLabel: 'North America',
                    slot1: <span style={{ fontSize: '20px' }}>🇨🇦</span>,
                },
                {
                    value: 'au',
                    label: 'Australia',
                    subLabel: 'Oceania',
                    slot1: <span style={{ fontSize: '20px' }}>🇦🇺</span>,
                },
                {
                    value: 'de',
                    label: 'Germany',
                    subLabel: 'Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇩🇪</span>,
                },
                {
                    value: 'jp',
                    label: 'Japan',
                    subLabel: 'East Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇯🇵</span>,
                },
                {
                    value: 'kr',
                    label: 'South Korea',
                    subLabel: 'East Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇰🇷</span>,
                },
                {
                    value: 'in',
                    label: 'India',
                    subLabel: 'South Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇮🇳</span>,
                },
                {
                    value: 'sg',
                    label: 'Singapore',
                    subLabel: 'Southeast Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇸🇬</span>,
                },
                {
                    value: 'cn',
                    label: 'China',
                    subLabel: 'East Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇨🇳</span>,
                },
                {
                    value: 'fr',
                    label: 'France',
                    subLabel: 'Western Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇫🇷</span>,
                },
                {
                    value: 'es',
                    label: 'Spain',
                    subLabel: 'Southern Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇪🇸</span>,
                },
                {
                    value: 'it',
                    label: 'Italy',
                    subLabel: 'Southern Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇮🇹</span>,
                },
                {
                    value: 'nl',
                    label: 'Netherlands',
                    subLabel: 'Western Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇳🇱</span>,
                },
                {
                    value: 'se',
                    label: 'Sweden',
                    subLabel: 'Northern Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇸🇪</span>,
                },
                {
                    value: 'br',
                    label: 'Brazil',
                    subLabel: 'South America',
                    slot1: <span style={{ fontSize: '20px' }}>🇧🇷</span>,
                },
                {
                    value: 'mx',
                    label: 'Mexico',
                    subLabel: 'North America',
                    slot1: <span style={{ fontSize: '20px' }}>🇲🇽</span>,
                },
                {
                    value: 'ar',
                    label: 'Argentina',
                    subLabel: 'South America',
                    slot1: <span style={{ fontSize: '20px' }}>🇦🇷</span>,
                },
                {
                    value: 'cl',
                    label: 'Chile',
                    subLabel: 'South America',
                    slot1: <span style={{ fontSize: '20px' }}>🇨🇱</span>,
                },
            ],
        },
    ]

    const handleValueChange = (value: string) => {
        setSelectedCountry(value)
    }

    const handleConfirm = () => {
        console.log('Selected country:', selectedCountry)
        setOpen(false)
    }

    const getSelectedCountryLabel = () => {
        for (const group of countryItems) {
            const item = group.items.find(
                (item) => item.value === selectedCountry
            )
            if (item) return item.label
        }
        return 'Select Country'
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Single-Select: {getSelectedCountryLabel()}
            </button>
            <SingleSelectDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Select Your Country"
                description="Choose your country of residence"
                rightSlot={
                    <div
                        style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#10b981',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'white' }}>
                            🌍
                        </span>
                    </div>
                }
                items={countryItems}
                selectedValue={selectedCountry}
                onValueChange={handleValueChange}
                enableSearch={true}
                searchPlaceholder="Search countries..."
                cancelText="Clear"
                confirmText="Select Country"
                onConfirm={handleConfirm}
            />
        </>
    )
}

// Nested Multi-Select Drawer Example
export const NestedMultiSelectDrawerExample = () => {
    const [open, setOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([
        'visa',
        'react',
        'figma',
    ])

    // Hierarchical data structure with nested items
    const nestedMenuItems = [
        {
            items: [
                {
                    value: 'payment_methods',
                    label: 'Payment Methods',
                    slot1: <span style={{ fontSize: '20px' }}>💳</span>,
                    nestedItems: [
                        {
                            groupLabel: 'Credit Cards',
                            items: [
                                {
                                    value: 'visa',
                                    label: 'Visa',
                                    subLabel: 'Most widely accepted',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            💳
                                        </span>
                                    ),
                                },
                                {
                                    value: 'mastercard',
                                    label: 'Mastercard',
                                    subLabel: 'Global acceptance',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            💳
                                        </span>
                                    ),
                                },
                                {
                                    value: 'amex',
                                    label: 'American Express',
                                    subLabel: 'Premium rewards',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            💳
                                        </span>
                                    ),
                                },
                            ],
                        },
                        {
                            groupLabel: 'Digital Wallets',
                            items: [
                                {
                                    value: 'apple_pay',
                                    label: 'Apple Pay',
                                    subLabel: 'Touch ID or Face ID',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🍎
                                        </span>
                                    ),
                                },
                                {
                                    value: 'google_pay',
                                    label: 'Google Pay',
                                    subLabel: 'Pay with Google',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🔴
                                        </span>
                                    ),
                                },
                                {
                                    value: 'paypal',
                                    label: 'PayPal',
                                    subLabel: 'Pay with your PayPal account',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🅿️
                                        </span>
                                    ),
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'technologies',
                    label: 'Technologies',
                    slot1: <span style={{ fontSize: '20px' }}>⚛️</span>,
                    nestedItems: [
                        {
                            groupLabel: 'Frontend Frameworks',
                            items: [
                                {
                                    value: 'react',
                                    label: 'React',
                                    subLabel: 'UI library by Facebook',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            ⚛️
                                        </span>
                                    ),
                                },
                                {
                                    value: 'vue',
                                    label: 'Vue.js',
                                    subLabel: 'Progressive framework',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🟢
                                        </span>
                                    ),
                                },
                                {
                                    value: 'angular',
                                    label: 'Angular',
                                    subLabel: 'Full framework by Google',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🅰️
                                        </span>
                                    ),
                                },
                                {
                                    value: 'svelte',
                                    label: 'Svelte',
                                    subLabel: 'Compile-time framework',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🔥
                                        </span>
                                    ),
                                },
                            ],
                        },
                        {
                            groupLabel: 'Backend Technologies',
                            items: [
                                {
                                    value: 'nodejs',
                                    label: 'Node.js',
                                    subLabel: 'JavaScript runtime',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🟢
                                        </span>
                                    ),
                                },
                                {
                                    value: 'python',
                                    label: 'Python',
                                    subLabel: 'Versatile language',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🐍
                                        </span>
                                    ),
                                },
                                {
                                    value: 'java',
                                    label: 'Java',
                                    subLabel: 'Enterprise language',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            ☕
                                        </span>
                                    ),
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'design_tools',
                    label: 'Design Tools',
                    slot1: <span style={{ fontSize: '20px' }}>🎨</span>,
                    nestedItems: [
                        {
                            items: [
                                {
                                    value: 'figma',
                                    label: 'Figma',
                                    subLabel: 'Design collaboration',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🎨
                                        </span>
                                    ),
                                },
                                {
                                    value: 'sketch',
                                    label: 'Sketch',
                                    subLabel: 'Mac design tool',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            ✏️
                                        </span>
                                    ),
                                },
                                {
                                    value: 'adobe_xd',
                                    label: 'Adobe XD',
                                    subLabel: 'Adobe design tool',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🔷
                                        </span>
                                    ),
                                },
                                {
                                    value: 'photoshop',
                                    label: 'Photoshop',
                                    subLabel: 'Image editing',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🖼️
                                        </span>
                                    ),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]

    const handleSelectionChange = (newSelection: string[]) => {
        setSelectedItems(newSelection)
    }

    const handleConfirm = () => {
        console.log('Selected nested items:', selectedItems)
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Nested Multi-Select ({selectedItems.length} selected)
            </button>
            <NestedMultiSelectDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Select Your Preferences"
                description="Navigate through categories to select your preferences"
                rightSlot={
                    <div
                        style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#8b5cf6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'white' }}>
                            🔗
                        </span>
                    </div>
                }
                items={nestedMenuItems}
                selectedValues={selectedItems}
                onSelectionChange={handleSelectionChange}
                enableSearch={true}
                searchPlaceholder="Search preferences..."
                cancelText="Clear All"
                confirmText="Save Preferences"
                onConfirm={handleConfirm}
            />
        </>
    )
}

// Nested Single-Select Drawer Example
export const NestedSingleSelectDrawerExample = () => {
    const [open, setOpen] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<string>('us_ca_sf')

    // Hierarchical location data
    const nestedLocationItems = [
        {
            items: [
                {
                    value: 'north_america',
                    label: 'North America',
                    slot1: <span style={{ fontSize: '20px' }}>🌎</span>,
                    nestedItems: [
                        {
                            groupLabel: 'United States',
                            items: [
                                {
                                    value: 'us_states',
                                    label: 'United States',
                                    subLabel: 'Select a state',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🇺🇸
                                        </span>
                                    ),
                                    nestedItems: [
                                        {
                                            items: [
                                                {
                                                    value: 'us_ca_sf',
                                                    label: 'San Francisco, CA',
                                                    subLabel: 'California',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🌉
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'us_ca_la',
                                                    label: 'Los Angeles, CA',
                                                    subLabel: 'California',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🌴
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'us_ny_nyc',
                                                    label: 'New York City, NY',
                                                    subLabel: 'New York',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🗽
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'us_tx_austin',
                                                    label: 'Austin, TX',
                                                    subLabel: 'Texas',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🤠
                                                        </span>
                                                    ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            groupLabel: 'Canada',
                            items: [
                                {
                                    value: 'ca_provinces',
                                    label: 'Canada',
                                    subLabel: 'Select a province',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🇨🇦
                                        </span>
                                    ),
                                    nestedItems: [
                                        {
                                            items: [
                                                {
                                                    value: 'ca_on_toronto',
                                                    label: 'Toronto, ON',
                                                    subLabel: 'Ontario',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏙️
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'ca_bc_vancouver',
                                                    label: 'Vancouver, BC',
                                                    subLabel:
                                                        'British Columbia',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏔️
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'ca_qc_montreal',
                                                    label: 'Montreal, QC',
                                                    subLabel: 'Quebec',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🍁
                                                        </span>
                                                    ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'europe',
                    label: 'Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🌍</span>,
                    nestedItems: [
                        {
                            items: [
                                {
                                    value: 'uk_cities',
                                    label: 'United Kingdom',
                                    subLabel: 'Select a city',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🇬🇧
                                        </span>
                                    ),
                                    nestedItems: [
                                        {
                                            items: [
                                                {
                                                    value: 'uk_london',
                                                    label: 'London',
                                                    subLabel: 'England',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏰
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'uk_manchester',
                                                    label: 'Manchester',
                                                    subLabel: 'England',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            ⚽
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'uk_edinburgh',
                                                    label: 'Edinburgh',
                                                    subLabel: 'Scotland',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏴󠁧󠁢󠁳󠁣󠁴󠁿
                                                        </span>
                                                    ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    value: 'de_cities',
                                    label: 'Germany',
                                    subLabel: 'Select a city',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🇩🇪
                                        </span>
                                    ),
                                    nestedItems: [
                                        {
                                            items: [
                                                {
                                                    value: 'de_berlin',
                                                    label: 'Berlin',
                                                    subLabel: 'Capital city',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏛️
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'de_munich',
                                                    label: 'Munich',
                                                    subLabel: 'Bavaria',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🍺
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'de_hamburg',
                                                    label: 'Hamburg',
                                                    subLabel: 'Port city',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            ⚓
                                                        </span>
                                                    ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'asia',
                    label: 'Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🌏</span>,
                    nestedItems: [
                        {
                            items: [
                                {
                                    value: 'jp_cities',
                                    label: 'Japan',
                                    subLabel: 'Select a city',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🇯🇵
                                        </span>
                                    ),
                                    nestedItems: [
                                        {
                                            items: [
                                                {
                                                    value: 'jp_tokyo',
                                                    label: 'Tokyo',
                                                    subLabel: 'Capital city',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🗼
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'jp_osaka',
                                                    label: 'Osaka',
                                                    subLabel: 'Kansai region',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏯
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'jp_kyoto',
                                                    label: 'Kyoto',
                                                    subLabel: 'Ancient capital',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            ⛩️
                                                        </span>
                                                    ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    value: 'in_cities',
                                    label: 'India',
                                    subLabel: 'Select a city',
                                    slot1: (
                                        <span style={{ fontSize: '16px' }}>
                                            🇮🇳
                                        </span>
                                    ),
                                    nestedItems: [
                                        {
                                            items: [
                                                {
                                                    value: 'in_mumbai',
                                                    label: 'Mumbai',
                                                    subLabel:
                                                        'Financial capital',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏙️
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'in_bangalore',
                                                    label: 'Bangalore',
                                                    subLabel:
                                                        'Silicon Valley of India',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            💻
                                                        </span>
                                                    ),
                                                },
                                                {
                                                    value: 'in_delhi',
                                                    label: 'New Delhi',
                                                    subLabel: 'Capital city',
                                                    slot1: (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            🏛️
                                                        </span>
                                                    ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]

    const handleValueChange = (value: string) => {
        setSelectedLocation(value)
    }

    const handleConfirm = () => {
        console.log('Selected location:', selectedLocation)
        setOpen(false)
    }

    const getSelectedLocationLabel = () => {
        // Helper function to recursively find the selected item
        const findItem = (items: any[]): any => {
            for (const group of items) {
                for (const item of group.items) {
                    if (item.value === selectedLocation) return item
                    if (item.nestedItems) {
                        const found = findItem(item.nestedItems)
                        if (found) return found
                    }
                }
            }
            return null
        }

        const item = findItem(nestedLocationItems)
        return item ? item.label : 'Select Location'
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Nested Single-Select: {getSelectedLocationLabel()}
            </button>
            <NestedSingleSelectDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Select Your Location"
                description="Navigate through regions to find your location"
                rightSlot={
                    <div
                        style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#10b981',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'white' }}>
                            📍
                        </span>
                    </div>
                }
                items={nestedLocationItems}
                selectedValue={selectedLocation}
                onValueChange={handleValueChange}
                enableSearch={true}
                searchPlaceholder="Search locations..."
                cancelText="Clear"
                confirmText="Select Location"
                onConfirm={handleConfirm}
            />
        </>
    )
}

// Custom Mobile Offset Example
// Wide Right Drawer Example
export const WideRightDrawerExample = () => {
    return (
        <Drawer direction="right" disableDrag={true}>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Wide Right Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent direction="right" width="600px" maxWidth="80vw">
                    {/* Custom content demonstrating wide drawer usage */}
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                padding: '20px',
                                borderBottom: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                            }}
                        >
                            <h2
                                style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    userSelect: 'all',
                                }}
                            >
                                Data Analytics Dashboard
                            </h2>
                            <p
                                style={{
                                    margin: '0',
                                    color: '#6b7280',
                                    fontSize: '14px',
                                    userSelect: 'all',
                                }}
                            >
                                Real-time insights and performance metrics
                            </p>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                overflow: 'auto',
                                padding: '20px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px',
                                    marginBottom: '24px',
                                }}
                            >
                                {[
                                    {
                                        title: 'Total Users',
                                        value: '12,549',
                                        change: '+12%',
                                        color: '#10b981',
                                    },
                                    {
                                        title: 'Revenue',
                                        value: '$45,231',
                                        change: '+8%',
                                        color: '#3b82f6',
                                    },
                                    {
                                        title: 'Conversion Rate',
                                        value: '3.24%',
                                        change: '-2%',
                                        color: '#ef4444',
                                    },
                                    {
                                        title: 'Active Sessions',
                                        value: '1,234',
                                        change: '+15%',
                                        color: '#8b5cf6',
                                    },
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: '#f9fafb',
                                            padding: '16px',
                                            borderRadius: '8px',
                                            border: '1px solid #e5e7eb',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                color: '#6b7280',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            {stat.title}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                color: stat.color,
                                                fontWeight: '500',
                                            }}
                                        >
                                            {stat.change} from last month
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                style={{
                                    backgroundColor: '#f9fafb',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                }}
                            >
                                <h3
                                    style={{
                                        margin: '0 0 16px 0',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Recent Activity
                                </h3>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    {[
                                        {
                                            user: 'Alice Johnson',
                                            action: 'completed purchase',
                                            time: '2 min ago',
                                        },
                                        {
                                            user: 'Bob Smith',
                                            action: 'signed up',
                                            time: '5 min ago',
                                        },
                                        {
                                            user: 'Carol Davis',
                                            action: 'viewed product',
                                            time: '8 min ago',
                                        },
                                        {
                                            user: 'David Wilson',
                                            action: 'left review',
                                            time: '12 min ago',
                                        },
                                        {
                                            user: 'Eva Brown',
                                            action: 'shared content',
                                            time: '15 min ago',
                                        },
                                    ].map((activity, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '8px 0',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        backgroundColor:
                                                            '#e5e7eb',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    {activity.user
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </div>
                                                <div>
                                                    <div
                                                        style={{
                                                            fontSize: '14px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {activity.user}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: '12px',
                                                            color: '#6b7280',
                                                        }}
                                                    >
                                                        {activity.action}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#9ca3af',
                                                }}
                                            >
                                                {activity.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Narrow Left Drawer Example
export const NarrowLeftDrawerExample = () => {
    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Narrow Left Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    direction="left"
                    width="250px"
                    showHandle={false}
                    offSet={'0px'}
                >
                    {/* Narrow drawer for quick actions */}
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#1f2937',
                            color: 'white',
                        }}
                    >
                        <div
                            style={{
                                padding: '20px',
                                borderBottom: '1px solid #374151',
                            }}
                        >
                            <h3
                                style={{
                                    margin: '0',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: 'white',
                                }}
                            >
                                Quick Actions
                            </h3>
                        </div>

                        <div style={{ flex: 1, padding: '16px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                {[
                                    {
                                        icon: '📧',
                                        label: 'New Message',
                                        color: '#3b82f6',
                                    },
                                    {
                                        icon: '📅',
                                        label: 'Schedule Event',
                                        color: '#10b981',
                                    },
                                    {
                                        icon: '📊',
                                        label: 'View Reports',
                                        color: '#f59e0b',
                                    },
                                    {
                                        icon: '👥',
                                        label: 'Manage Team',
                                        color: '#8b5cf6',
                                    },
                                    {
                                        icon: '⚙️',
                                        label: 'Settings',
                                        color: '#6b7280',
                                    },
                                ].map((action, index) => (
                                    <button
                                        key={index}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            transition:
                                                'background-color 0.15s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                '#374151'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                'transparent'
                                        }}
                                    >
                                        <span style={{ fontSize: '20px' }}>
                                            {action.icon}
                                        </span>
                                        <span>{action.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div
                                style={{
                                    marginTop: '24px',
                                    padding: '16px',
                                    backgroundColor: '#374151',
                                    borderRadius: '8px',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Storage Used
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#4b5563',
                                        height: '6px',
                                        borderRadius: '3px',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: '#3b82f6',
                                            height: '100%',
                                            width: '65%',
                                            borderRadius: '3px',
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: '#d1d5db',
                                    }}
                                >
                                    6.5 GB of 10 GB used
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                padding: '16px',
                                borderTop: '1px solid #374151',
                            }}
                        >
                            <button
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export const CustomMobileOffsetExample = () => {
    return (
        <Drawer
            mobileOffset={{
                top: '100px',
                bottom: '32px',
                left: '24px',
                right: '24px',
            }}
        >
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Custom Mobile Offset
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    mobileOffset={{
                        top: '100px',
                        bottom: '32px',
                        left: '24px',
                        right: '24px',
                    }}
                >
                    <DrawerHeader>
                        <DrawerTitle>Custom Mobile Offset</DrawerTitle>
                        <DrawerDescription>
                            This drawer has custom mobile offset values: top:
                            100px, bottom: 32px, left/right: 24px
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            You can customize the mobile offset by passing the
                            `mobileOffset` prop to both the Drawer and
                            DrawerContent components.
                        </p>
                        <p>
                            Default values are: top: 74px, bottom/left/right:
                            16px
                        </p>
                        <p>
                            This example uses larger offsets to demonstrate the
                            customization capability.
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Z-Index Test Example - Drawer with Tooltip and Popover
export const ZIndexTestDrawerExample = () => {
    const [popoverOpen, setPopoverOpen] = useState(false)

    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Z-Index Test Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Z-Index Hierarchy Test</DrawerTitle>
                        <DrawerDescription>
                            This drawer tests that tooltips and popovers appear
                            above the drawer content.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px',
                                padding: '20px 0',
                            }}
                        >
                            <div>
                                <h4
                                    style={{
                                        marginBottom: '16px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Tooltip Test
                                </h4>
                                <p
                                    style={{
                                        marginBottom: '16px',
                                        color: '#6b7280',
                                    }}
                                >
                                    Hover over the button below to see if the
                                    tooltip appears above the drawer:
                                </p>
                                <Tooltip content="This tooltip should appear above the drawer content with z-index 1000">
                                    <button
                                        style={{
                                            padding: '12px 24px',
                                            backgroundColor: '#3b82f6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Hover for Tooltip
                                    </button>
                                </Tooltip>
                            </div>

                            <div>
                                <h4
                                    style={{
                                        marginBottom: '16px',
                                        fontWeight: '600',
                                    }}
                                >
                                    Popover Test
                                </h4>
                                <p
                                    style={{
                                        marginBottom: '16px',
                                        color: '#6b7280',
                                    }}
                                >
                                    Click the button below to see if the popover
                                    appears above the drawer:
                                </p>
                                <Popover
                                    open={popoverOpen}
                                    onOpenChange={setPopoverOpen}
                                    trigger={
                                        <button
                                            style={{
                                                padding: '12px 24px',
                                                backgroundColor: '#10b981',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Click for Popover
                                        </button>
                                    }
                                    heading="Popover Test"
                                    description="This popover should appear above the drawer content with z-index 1000"
                                    secondaryAction={{
                                        text: 'Cancel',
                                        onClick: () => setPopoverOpen(false),
                                    }}
                                    primaryAction={{
                                        text: 'OK',
                                        onClick: () => setPopoverOpen(false),
                                    }}
                                >
                                    <div style={{ padding: '8px 0' }}>
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: '14px',
                                                color: '#6b7280',
                                            }}
                                        >
                                            This popover content should be
                                            visible above the drawer overlay and
                                            content.
                                        </p>
                                    </div>
                                </Popover>
                            </div>

                            <div
                                style={{
                                    backgroundColor: '#f9fafb',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                }}
                            >
                                <h5
                                    style={{
                                        margin: '0 0 8px 0',
                                        fontWeight: '600',
                                    }}
                                >
                                    Expected Z-Index Hierarchy:
                                </h5>
                                <ul
                                    style={{
                                        margin: '0',
                                        paddingLeft: '20px',
                                        color: '#6b7280',
                                    }}
                                >
                                    <li>Tooltip: z-index 1000 (highest)</li>
                                    <li>Popover: z-index 1000 (highest)</li>
                                    <li>
                                        Drawer Content: z-index 1200 (below
                                        tooltip/popover)
                                    </li>
                                    <li>
                                        Drawer Overlay: z-index 1100 (below
                                        content)
                                    </li>
                                </ul>
                                <p
                                    style={{
                                        margin: '12px 0 0 0',
                                        fontSize: '14px',
                                        color: '#6b7280',
                                    }}
                                >
                                    If you can see the tooltip and popover
                                    clearly above the drawer, the z-index
                                    hierarchy is working correctly!
                                </p>
                            </div>
                        </div>
                    </DrawerBody>
                    <DrawerFooter direction="bottom">
                        <DrawerClose>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#f3f4f6',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Close
                            </button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Mobile MultiSelect without Drawer Example
export const MobileMultiSelectNoDrawerExample = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([
        'react',
        'typescript',
    ])

    const menuItems = [
        {
            items: [
                {
                    value: 'javascript',
                    label: 'JavaScript',
                    subLabel: 'Popular web language',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fef3c7',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#f59e0b',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            JS
                        </span>
                    ),
                },
                {
                    value: 'typescript',
                    label: 'TypeScript',
                    subLabel: 'Typed JavaScript',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dbeafe',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#3b82f6',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            TS
                        </span>
                    ),
                },
                {
                    value: 'react',
                    label: 'React',
                    subLabel: 'UI library',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#e0f2fe',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            ⚛️
                        </span>
                    ),
                },
                {
                    value: 'vue',
                    label: 'Vue.js',
                    subLabel: 'Progressive framework',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dcfce7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🟢
                        </span>
                    ),
                },
                {
                    value: 'angular',
                    label: 'Angular',
                    subLabel: 'Full framework',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fecaca',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🅰️
                        </span>
                    ),
                },
                {
                    value: 'svelte',
                    label: 'Svelte',
                    subLabel: 'Compile-time framework',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fdf2f8',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🔥
                        </span>
                    ),
                },
            ],
        },
    ]

    const handleSelectionChange = (value: string) => {
        setSelectedItems((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '16px' }}>
                Mobile MultiSelect (No Drawer)
            </h3>
            <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                This MultiSelect component uses the normal dropdown even on
                mobile devices by setting `useDrawerOnMobile=false`. The trigger
                looks identical to the drawer version.
            </p>
            <MultiSelect
                selectedValues={selectedItems}
                onChange={handleSelectionChange}
                items={menuItems}
                label="Select Technologies"
                placeholder="Choose your tech stack"
                variant={MultiSelectVariant.CONTAINER}
                selectionTagType={MultiSelectSelectionTagType.COUNT}
                size={MultiSelectMenuSize.MEDIUM}
                enableSearch={true}
                searchPlaceholder="Search technologies..."
                enableSelectAll={true}
                selectAllText="Select All Technologies"
                useDrawerOnMobile={false} // This is the key prop!
                height={300}
            />
        </div>
    )
}

// Full Screen Drawer with Custom Close Icon and Primary CTA
const CustomCloseIcon = () => {
    return (
        <DrawerClose>
            <button
                style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 10,
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                aria-label="Close drawer"
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                }}
            >
                <X size={20} color="#6b7280" aria-hidden="true" />
            </button>
        </DrawerClose>
    )
}

export const FullScreenDrawerExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: 'flex',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    padding: '0 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                }}
            >
                Full Screen Drawer (All Features)
            </button>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerPortal>
                    <DrawerOverlay />
                    <DrawerContent fullScreen={true}>
                        <CustomCloseIcon />
                        <DrawerHeader>
                            <DrawerTitle>Full Screen Drawer</DrawerTitle>
                            <DrawerDescription>
                                This drawer takes full screen on mobile with no
                                border radius. It includes a custom close icon
                                at the top and a custom primary CTA at the
                                bottom.
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerBody>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    padding: '20px 0',
                                }}
                            >
                                <p>
                                    This drawer demonstrates all three features:
                                </p>
                                <ul
                                    style={{
                                        paddingLeft: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                    }}
                                >
                                    <li>
                                        <strong>fullScreen:</strong> Drawer
                                        takes full height and width with no
                                        border radius
                                    </li>
                                    <li>
                                        <strong>Custom Close Icon:</strong> Wrap
                                        your custom close button with{' '}
                                        <code>DrawerClose</code> component or
                                        use your own state management with{' '}
                                        <code>onOpenChange</code>
                                    </li>
                                    <li>
                                        <strong>Custom Primary CTA:</strong> Add
                                        your own primary button using{' '}
                                        <code>DrawerFooter</code> or place it
                                        anywhere in the content
                                    </li>
                                </ul>
                                <p>
                                    On mobile devices, this drawer will take the
                                    full screen with no rounded corners,
                                    providing a native app-like experience.
                                </p>
                                <div
                                    style={{
                                        backgroundColor: '#f3f4f6',
                                        padding: '16px',
                                        borderRadius: '8px',
                                        marginTop: '16px',
                                    }}
                                >
                                    <h4
                                        style={{
                                            margin: '0 0 8px 0',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Content Area
                                    </h4>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: '#6b7280',
                                            fontSize: '14px',
                                        }}
                                    >
                                        You can add any content here. The drawer
                                        will scroll if content exceeds the
                                        available height.
                                    </p>
                                </div>
                            </div>
                        </DrawerBody>
                        <DrawerFooter direction="bottom">
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Save & Close"
                                fullWidth
                                onClick={() => {
                                    console.log('Primary CTA clicked')
                                    setOpen(false)
                                }}
                            />
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>
        </>
    )
}

// All Examples Component
export const DrawerDemo = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '20px',
            }}
        >
            <div>
                <h2 style={{ marginBottom: '8px' }}>
                    New Features: Full Screen, Close Icon & Primary CTA
                </h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    New props for enhanced drawer functionality: fullScreen
                    (full height/width, no border radius), closeIcon (X icon at
                    top), and primaryCTA (primary button at bottom).
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <FullScreenDrawerExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Basic Drawer Examples</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <BasicDrawerExample />
                    <NestedDrawerExample />
                    <TopDrawerExample />
                    <ScrollableDrawerExample />
                    <ControlledDrawerExample />
                    <CustomMobileOffsetExample />
                    <ZIndexTestDrawerExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Side Drawer Examples</h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    Side drawers can be customized with different widths and
                    content patterns. They support both structured content
                    (using DrawerHeader/DrawerBody/DrawerFooter) and completely
                    custom content for maximum flexibility.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <SideDrawerExample />
                    <LeftSideDrawerExample />
                    <WideRightDrawerExample />
                    <NarrowLeftDrawerExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Snap Points Examples</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <SnapPointsDrawerExample />
                    <NonModalSnapPointsExample />
                    <SequentialSnapPointsExample />
                    <CustomFadeIndexExample />
                    <NonDismissibleExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Status Drawer Examples</h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    Status drawers are pre-built variants for displaying status
                    messages with an icon, heading, description, and action
                    button.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <StatusDrawerSuccessExample />
                    <StatusDrawerErrorExample />
                    <StatusDrawerWarningExample />
                    <StatusDrawerInfoExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Select Drawer Examples</h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    Select drawers are specialized for selection interfaces with
                    search functionality, scrollable content, and dual-action
                    buttons (Clear All / Confirm).
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <MultiSelectDrawerExample />
                    <SingleSelectDrawerExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>
                    Nested Select Drawer Examples
                </h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    Nested select drawers support hierarchical data structures
                    with navigation between levels. Features include back button
                    navigation, breadcrumb-like experience, and state
                    preservation across levels.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <NestedMultiSelectDrawerExample />
                    <NestedSingleSelectDrawerExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>
                    Responsive Select with Drawer
                </h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    These select components automatically switch to drawer mode
                    on mobile devices, using MenuItem components inside the
                    drawer for consistent styling.
                </p>
                <ResponsiveSelectDemo />
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>
                    Mobile MultiSelect without Drawer
                </h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    This example shows how the MultiSelect component can be used
                    on mobile without the drawer by setting
                    useDrawerOnMobile=false. The trigger looks identical in both
                    desktop and mobile modes.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <MobileMultiSelectNoDrawerExample />
                </div>
            </div>
        </div>
    )
}

export default DrawerDemo
