import { useState } from 'react'
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
} from 'lucide-react'

const basicItems: MenuV2GroupType[] = [
    {
        items: [
            {
                label: 'Profile',
                slot: <User size={16} />,
                onClick: () => console.log('Profile clicked'),
            },
            {
                label: 'Settings',
                slot: <Settings size={16} />,
                onClick: () => console.log('Settings clicked'),
            },
            {
                label: 'Sign Out',
                slot: <LogOut size={16} />,
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
                label: 'Create New',
                subLabel: 'Start a new project',
                slot: <Plus size={16} />,
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
                label: 'United States',
                slot: <MapPin size={16} />,
                subMenu: [
                    {
                        label: 'California',
                        onClick: () => console.log('California'),
                    },
                    {
                        label: 'New York',
                        onClick: () => console.log('New York'),
                    },
                    { label: 'Texas', onClick: () => console.log('Texas') },
                ],
            },
            {
                label: 'Europe',
                slot: <MapPin size={16} />,
                subMenu: [
                    {
                        label: 'United Kingdom',
                        onClick: () => console.log('UK'),
                    },
                    { label: 'Germany', onClick: () => console.log('Germany') },
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
                label: 'Most Popular',
                slot: <Star size={16} />,
                onClick: () => {},
            },
            { label: 'Trending', slot: <Star size={16} />, onClick: () => {} },
        ],
    },
    {
        label: 'Security',
        items: [
            {
                label: 'Enterprise',
                slot: <Shield size={16} />,
                subLabel: 'Full feature set',
                onClick: () => {},
            },
        ],
    },
]

const MenuV2Demo = () => {
    const [lastAction, setLastAction] = useState<string>('')

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

    const withLog = (items: MenuV2GroupType[]): MenuV2GroupType[] =>
        items.map((group) => ({
            ...group,
            items: group.items.map((item) => ({
                ...item,
                onClick: item.onClick
                    ? () => {
                          item.onClick?.()
                          setLastAction(item.label)
                      }
                    : undefined,
                subMenu: item.subMenu?.map((sub: MenuV2ItemType) => ({
                    ...sub,
                    onClick: sub.onClick
                        ? () => {
                              sub.onClick?.()
                              setLastAction(`${item.label} → ${sub.label}`)
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
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50 p-8">
                    <div className="w-full max-w-md">
                        <MenuV2
                            trigger={
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    text={triggerLabel || 'Open menu'}
                                ></Button>
                            }
                            items={withLog(groupedItems)}
                            enableSearch={enableSearch}
                            searchPlaceholder="Search options..."
                            asModal={asModal}
                            maxHeight={
                                maxHeight.trim()
                                    ? Number.parseInt(maxHeight, 10) ||
                                      undefined
                                    : undefined
                            }
                            minWidth={
                                minWidth.trim()
                                    ? Number.parseInt(minWidth, 10) || undefined
                                    : undefined
                            }
                            maxWidth={
                                maxWidth.trim()
                                    ? Number.parseInt(maxWidth, 10) || undefined
                                    : undefined
                            }
                            alignment={alignment}
                            side={side}
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
                            items={withLog(groupedItems)}
                        />
                    </div>
                </div>
            </section>

            {lastAction && (
                <p className="text-sm text-gray-500">
                    Last action: <strong>{lastAction}</strong>
                </p>
            )}
        </div>
    )
}

export default MenuV2Demo
