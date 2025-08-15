import { useState } from 'react'
import { Popover } from '../../../../packages/blend/lib/components/Popover'
import { Button } from '../../../../packages/blend/lib/components/Button'
import {
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import { PopoverSize } from '../../../../packages/blend/lib/components/Popover/types'
import {
    Settings,
    Info,
    User,
    Bell,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Share,
    Download,
    ChevronDown,
} from 'lucide-react'

const PopoverDemo = () => {
    const [config, setConfig] = useState({
        heading: 'Popover Heading',
        description: 'One line description of the popover',
        primaryButtonText: 'Confirm',
        secondaryButtonText: 'Cancel',
        primaryButtonType: ButtonType.PRIMARY,
        secondaryButtonType: ButtonType.SECONDARY,
        showCloseButton: true,
        primaryButtonDisabled: false,
        secondaryButtonDisabled: false,
        showPrimaryButton: true,
        showSecondaryButton: true,
        contentType: 'basic',
        size: PopoverSize.MEDIUM,
        side: 'bottom' as 'top' | 'right' | 'bottom' | 'left',
        align: 'center' as 'start' | 'center' | 'end',
        shadow: 'lg' as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full',
        asModal: false,
        useDrawerOnMobile: true,
        sideOffset: 8,
        alignOffset: 0,
        minWidth: 300,
        maxWidth: 400,
    })

    const handleCheckboxChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: e.target.checked,
            })
        }

    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: e.target.value,
            })
        }

    const handleSelectChange =
        (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            setConfig({
                ...config,
                [field]: e.target.value,
            })
        }

    const handleNumberChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: parseInt(e.target.value) || 0,
            })
        }

    const renderPopoverContent = () => {
        switch (config.contentType) {
            case 'basic':
                return (
                    <div>
                        <p className="text-base text-gray-600">
                            This is a configurable popover for demonstration
                            purposes. You can adjust various settings using the
                            controls below.
                        </p>
                    </div>
                )
            case 'form':
                return (
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="notifications"
                                className="cursor-pointer"
                            />
                            <label
                                htmlFor="notifications"
                                className="text-sm text-gray-600 cursor-pointer"
                            >
                                Receive notifications
                            </label>
                        </div>
                    </div>
                )
            case 'menu':
                return (
                    <div className="py-2">
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                            <Edit size={16} />
                            <span className="text-sm">Edit</span>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                            <Share size={16} />
                            <span className="text-sm">Share</span>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                            <Download size={16} />
                            <span className="text-sm">Download</span>
                        </div>
                        <div className="border-t border-gray-200 my-1"></div>
                        <div className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-2 text-red-600">
                            <Trash2 size={16} />
                            <span className="text-sm">Delete</span>
                        </div>
                    </div>
                )
            case 'info':
                return (
                    <div className="p-4">
                        <div className="flex items-start gap-3">
                            <Info className="text-blue-500 mt-0.5" size={16} />
                            <div>
                                <p className="text-sm text-gray-700 font-medium mb-1">
                                    Information
                                </p>
                                <p className="text-sm text-gray-600">
                                    This is an informational popover that
                                    provides additional context or help text to
                                    users.
                                </p>
                            </div>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="p-4">
                        <p className="text-sm">Simple popover content</p>
                    </div>
                )
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    Popover Configuration Playground
                </h1>
                <p className="text-lg text-gray-600">
                    Customize the popover to see different configurations in
                    action
                </p>
            </div>

            <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Heading
                            </label>
                            <input
                                type="text"
                                value={config.heading}
                                onChange={handleInputChange('heading')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                value={config.description}
                                onChange={handleInputChange('description')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Content Type
                            </label>
                            <select
                                value={config.contentType}
                                onChange={handleSelectChange('contentType')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="basic">Basic</option>
                                <option value="form">Form</option>
                                <option value="menu">Menu</option>
                                <option value="info">Info</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Size
                            </label>
                            <select
                                value={config.size}
                                onChange={handleSelectChange('size')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                {Object.values(PopoverSize).map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Position (Side)
                            </label>
                            <select
                                value={config.side}
                                onChange={handleSelectChange('side')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="top">Top</option>
                                <option value="right">Right</option>
                                <option value="bottom">Bottom</option>
                                <option value="left">Left</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Alignment
                            </label>
                            <select
                                value={config.align}
                                onChange={handleSelectChange('align')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="start">Start</option>
                                <option value="center">Center</option>
                                <option value="end">End</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Shadow
                            </label>
                            <select
                                value={config.shadow}
                                onChange={handleSelectChange('shadow')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="xs">XS</option>
                                <option value="sm">SM</option>
                                <option value="md">MD</option>
                                <option value="lg">LG</option>
                                <option value="xl">XL</option>
                                <option value="2xl">2XL</option>
                                <option value="full">Full</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Side Offset
                            </label>
                            <input
                                type="number"
                                value={config.sideOffset}
                                onChange={handleNumberChange('sideOffset')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Primary Button Text
                            </label>
                            <input
                                type="text"
                                value={config.primaryButtonText}
                                onChange={handleInputChange(
                                    'primaryButtonText'
                                )}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Secondary Button Text
                            </label>
                            <input
                                type="text"
                                value={config.secondaryButtonText}
                                onChange={handleInputChange(
                                    'secondaryButtonText'
                                )}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.showCloseButton}
                                        onChange={handleCheckboxChange(
                                            'showCloseButton'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Close Button</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.asModal}
                                        onChange={handleCheckboxChange(
                                            'asModal'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>As Modal</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.useDrawerOnMobile}
                                        onChange={handleCheckboxChange(
                                            'useDrawerOnMobile'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Use Drawer on Mobile</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.showPrimaryButton}
                                        onChange={handleCheckboxChange(
                                            'showPrimaryButton'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Primary Button</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.showSecondaryButton}
                                        onChange={handleCheckboxChange(
                                            'showSecondaryButton'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Secondary Button</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Popover
                        heading={config.heading}
                        description={config.description}
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open Configured Popover"
                                size={ButtonSize.MEDIUM}
                                trailingIcon={<ChevronDown size={16} />}
                            />
                        }
                        primaryAction={
                            config.showPrimaryButton
                                ? {
                                      text: config.primaryButtonText,
                                      onClick: () =>
                                          alert('Primary action clicked!'),
                                      isDisabled: config.primaryButtonDisabled,
                                      buttonType: config.primaryButtonType,
                                  }
                                : undefined
                        }
                        secondaryAction={
                            config.showSecondaryButton
                                ? {
                                      text: config.secondaryButtonText,
                                      onClick: () =>
                                          alert('Secondary action clicked!'),
                                      isDisabled:
                                          config.secondaryButtonDisabled,
                                      buttonType: config.secondaryButtonType,
                                  }
                                : undefined
                        }
                        showCloseButton={config.showCloseButton}
                        size={config.size}
                        side={config.side}
                        align={config.align}
                        shadow={config.shadow}
                        asModal={config.asModal}
                        useDrawerOnMobile={config.useDrawerOnMobile}
                        sideOffset={config.sideOffset}
                        alignOffset={config.alignOffset}
                        minWidth={config.minWidth}
                        maxWidth={config.maxWidth}
                    >
                        {renderPopoverContent()}
                    </Popover>
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Popover Examples
                    </h2>
                    <p className="text-base text-gray-600 mb-6">
                        Pre-configured popover examples for common use cases
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Settings Popover
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Settings menu with form elements
                        </p>
                        <SettingsPopoverExample />
                    </div>

                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Actions Menu
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Context menu with action items
                        </p>
                        <ActionsMenuExample />
                    </div>

                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Info Popover
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Informational popover with help text
                        </p>
                        <InfoPopoverExample />
                    </div>

                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            User Profile
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            User profile card with actions
                        </p>
                        <UserProfileExample />
                    </div>

                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Notification Center
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Notifications list with actions
                        </p>
                        <NotificationCenterExample />
                    </div>

                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Filter Options
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Filter form with multiple options
                        </p>
                        <FilterOptionsExample />
                    </div>
                </div>
            </div>
        </div>
    )
}

const SettingsPopoverExample = () => {
    return (
        <Popover
            heading="Settings"
            description="Customize your preferences"
            trigger={
                <Button
                    text="Open Settings"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    leadingIcon={<Settings size={16} />}
                />
            }
            primaryAction={{
                text: 'Save',
                onClick: () => alert('Settings saved!'),
                buttonType: ButtonType.PRIMARY,
            }}
            secondaryAction={{
                text: 'Cancel',
                onClick: () => {},
                buttonType: ButtonType.SECONDARY,
            }}
            size={PopoverSize.MEDIUM}
            minWidth={320}
        >
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dark Mode</span>
                    <input type="checkbox" className="cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Notifications</span>
                    <input
                        type="checkbox"
                        defaultChecked
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Language</label>
                    <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                </div>
            </div>
        </Popover>
    )
}

const ActionsMenuExample = () => {
    return (
        <Popover
            trigger={
                <Button
                    text="Actions"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    trailingIcon={<MoreVertical size={16} />}
                />
            }
            side="bottom"
            align="end"
            showCloseButton={false}
            minWidth={180}
        >
            <div className="py-2">
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                    <Edit size={16} />
                    <span className="text-sm">Edit</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                    <Share size={16} />
                    <span className="text-sm">Share</span>
                </div>
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                    <Download size={16} />
                    <span className="text-sm">Download</span>
                </div>
                <div className="border-t border-gray-200 my-1"></div>
                <div className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-2 text-red-600">
                    <Trash2 size={16} />
                    <span className="text-sm">Delete</span>
                </div>
            </div>
        </Popover>
    )
}

const InfoPopoverExample = () => {
    return (
        <Popover
            heading="Help Information"
            trigger={
                <Button
                    text="Help"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    leadingIcon={<Info size={16} />}
                />
            }
            side="top"
            showCloseButton={false}
            minWidth={280}
        >
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <Info className="text-blue-500 mt-0.5" size={16} />
                    <div>
                        <p className="text-sm text-gray-700 font-medium mb-1">
                            Quick Tip
                        </p>
                        <p className="text-sm text-gray-600">
                            You can use keyboard shortcuts to navigate faster.
                            Press Ctrl+K to open the command palette.
                        </p>
                    </div>
                </div>
            </div>
        </Popover>
    )
}

const UserProfileExample = () => {
    return (
        <Popover
            trigger={
                <Button
                    text="Profile"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    leadingIcon={<User size={16} />}
                />
            }
            side="bottom"
            align="end"
            showCloseButton={false}
            minWidth={250}
        >
            <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">
                            john@example.com
                        </p>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="px-2 py-1 hover:bg-gray-50 cursor-pointer rounded text-sm">
                        View Profile
                    </div>
                    <div className="px-2 py-1 hover:bg-gray-50 cursor-pointer rounded text-sm">
                        Account Settings
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-2 py-1 hover:bg-gray-50 cursor-pointer rounded text-sm text-red-600">
                        Sign Out
                    </div>
                </div>
            </div>
        </Popover>
    )
}

const NotificationCenterExample = () => {
    return (
        <Popover
            heading="Notifications"
            trigger={
                <Button
                    text="Notifications"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    leadingIcon={<Bell size={16} />}
                />
            }
            side="bottom"
            align="end"
            minWidth={320}
            maxWidth={320}
        >
            <div className="max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">New message</p>
                            <p className="text-xs text-gray-500">
                                You have a new message from Sarah
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                2 min ago
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                Task completed
                            </p>
                            <p className="text-xs text-gray-500">
                                Your report has been generated
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                1 hour ago
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-3 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">System update</p>
                            <p className="text-xs text-gray-500">
                                New features are now available
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                1 day ago
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    )
}

const FilterOptionsExample = () => {
    return (
        <Popover
            heading="Filter Options"
            description="Customize your view"
            trigger={
                <Button
                    text="Filters"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.SMALL}
                    leadingIcon={<Filter size={16} />}
                />
            }
            primaryAction={{
                text: 'Apply',
                onClick: () => alert('Filters applied!'),
                buttonType: ButtonType.PRIMARY,
            }}
            secondaryAction={{
                text: 'Reset',
                onClick: () => alert('Filters reset!'),
                buttonType: ButtonType.SECONDARY,
            }}
            side="bottom"
            minWidth={280}
        >
            <div className="p-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Status
                    </label>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Active</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Inactive</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Pending</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Date Range
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Custom range</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                        <option>All categories</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Support</option>
                    </select>
                </div>
            </div>
        </Popover>
    )
}

export default PopoverDemo
