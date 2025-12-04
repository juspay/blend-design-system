import {
    Switch,
    SwitchSize,
} from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import {
    Wifi,
    Bluetooth,
    Volume2,
    Bell,
    Moon,
    Shield,
    Zap,
    Eye,
    Lock,
    Globe,
    Smartphone,
    Monitor,
    Settings,
    User,
} from 'lucide-react'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const SwitchDemo = () => {
    // Individual Switch playground state
    const [playgroundLabel, setPlaygroundLabel] = useState(
        'Enable notifications'
    )
    const [playgroundSubtext, setPlaygroundSubtext] = useState(
        'Receive push notifications on your device'
    )
    const [playgroundSize, setPlaygroundSize] = useState<SwitchSize>(
        SwitchSize.MEDIUM
    )
    const [playgroundChecked, setPlaygroundChecked] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [showSubtext, setShowSubtext] = useState(true)
    const [showSlot, setShowSlot] = useState(false)

    // Individual switch states for different sections
    const [sizeSmallBasic, setSizeSmallBasic] = useState(false)
    const [sizeSmallSubtext, setSizeSmallSubtext] = useState(false)
    const [sizeSmallSlot, setSizeSmallSlot] = useState(false)
    const [sizeMediumBasic, setSizeMediumBasic] = useState(false)
    const [sizeMediumSubtext, setSizeMediumSubtext] = useState(false)
    const [sizeMediumSlot, setSizeMediumSlot] = useState(false)

    // States section
    const [stateDefault, setStateDefault] = useState(false)
    const [stateChecked, setStateChecked] = useState(true)
    const [stateError, setStateError] = useState(false)

    // System settings states
    const [systemSettings, setSystemSettings] = useState({
        wifi: true,
        bluetooth: false,
        notifications: true,
        darkMode: false,
        autoUpdate: true,
        location: false,
    })

    // Privacy settings states
    const [privacySettings, setPrivacySettings] = useState({
        analytics: false,
        cookies: true,
        tracking: false,
        dataSharing: false,
    })

    // All combinations states
    const [comboSmallBasic, setComboSmallBasic] = useState(false)
    const [comboSmallSubtext, setComboSmallSubtext] = useState(false)
    const [comboSmallSlot, setComboSmallSlot] = useState(false)
    const [comboMediumBasic, setComboMediumBasic] = useState(false)
    const [comboMediumSubtext, setComboMediumSubtext] = useState(false)
    const [comboMediumSlot, setComboMediumSlot] = useState(false)

    // Options for selects
    const sizeOptions = [
        { value: SwitchSize.SMALL, label: 'Small' },
        { value: SwitchSize.MEDIUM, label: 'Medium' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Individual Switch Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Individual Switch Playground
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Label"
                            value={playgroundLabel}
                            onChange={(e) => setPlaygroundLabel(e.target.value)}
                            placeholder="Enter switch label"
                        />

                        <TextInput
                            label="Subtext"
                            value={playgroundSubtext}
                            onChange={(e) =>
                                setPlaygroundSubtext(e.target.value)
                            }
                            placeholder="Enter subtext"
                            disabled={!showSubtext}
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as SwitchSize)
                            }
                            placeholder="Select size"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <Switch
                            label="Checked"
                            checked={playgroundChecked}
                            onChange={() =>
                                setPlaygroundChecked(!playgroundChecked)
                            }
                        />
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Error"
                            subtext="This is an error message"
                            checked={playgroundError}
                            onChange={() =>
                                setPlaygroundError(!playgroundError)
                            }
                        />
                        <Switch
                            label="Required"
                            checked={playgroundRequired}
                            onChange={() =>
                                setPlaygroundRequired(!playgroundRequired)
                            }
                        />
                        <Switch
                            label="Show Subtext"
                            checked={showSubtext}
                            onChange={() => setShowSubtext(!showSubtext)}
                        />
                        <Switch
                            label="Show Slot"
                            checked={showSlot}
                            onChange={() => setShowSlot(!showSlot)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-gray-50">
                        <Switch
                            maxLength={{ label: 3, subtext: 3 }}
                            label={playgroundLabel}
                            checked={playgroundChecked}
                            onChange={() => {
                                setPlaygroundChecked(!playgroundChecked)
                                addSnackbar({
                                    header: `Switch ${!playgroundChecked ? 'enabled' : 'disabled'}!`,
                                })
                            }}
                            size={playgroundSize}
                            disabled={playgroundDisabled}
                            error={playgroundError}
                            required={playgroundRequired}
                            subtext={
                                showSubtext ? playgroundSubtext : undefined
                            }
                            slot={
                                showSlot ? (
                                    <Bell size={16} className="text-blue-500" />
                                ) : undefined
                            }
                            data-element="switch"
                            data-id={
                                playgroundDisabled
                                    ? 'Disabled notifications'
                                    : 'Enable notifications'
                            }
                            data-status={
                                playgroundChecked
                                    ? 'enabled-selected'
                                    : 'disabled-selected'
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium capitalize">
                            Small
                        </h3>
                        <div className="space-y-3">
                            <Switch
                                label="Basic Switch"
                                size={SwitchSize.SMALL}
                                checked={sizeSmallBasic}
                                onChange={(checked) => {
                                    setSizeSmallBasic(checked)
                                    addSnackbar({
                                        header: `Small switch ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                data-id="Enable notifications"
                                data-status="enabled-selected"
                            />
                            <Switch
                                label="With Subtext"
                                size={SwitchSize.SMALL}
                                subtext="This switch has additional information"
                                checked={sizeSmallSubtext}
                                onChange={(checked) => {
                                    setSizeSmallSubtext(checked)
                                    addSnackbar({
                                        header: `Small switch with subtext ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                            <Switch
                                label="With Slot"
                                size={SwitchSize.SMALL}
                                slot={
                                    <Settings
                                        size={14}
                                        className="text-blue-500"
                                    />
                                }
                                checked={sizeSmallSlot}
                                onChange={(checked) => {
                                    setSizeSmallSlot(checked)
                                    addSnackbar({
                                        header: `Small switch with slot ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium capitalize">
                            Medium
                        </h3>
                        <div className="space-y-3">
                            <Switch
                                label="Basic Switch"
                                size={SwitchSize.MEDIUM}
                                checked={sizeMediumBasic}
                                onChange={(checked) => {
                                    setSizeMediumBasic(checked)
                                    addSnackbar({
                                        header: `Medium switch ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                            <Switch
                                label="With Subtext"
                                size={SwitchSize.MEDIUM}
                                subtext="This switch has additional information"
                                checked={sizeMediumSubtext}
                                onChange={(checked) => {
                                    setSizeMediumSubtext(checked)
                                    addSnackbar({
                                        header: `Medium switch with subtext ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                            <Switch
                                label="With Slot"
                                size={SwitchSize.MEDIUM}
                                slot={
                                    <Settings
                                        size={16}
                                        className="text-blue-500"
                                    />
                                }
                                checked={sizeMediumSlot}
                                onChange={(checked) => {
                                    setSizeMediumSlot(checked)
                                    addSnackbar({
                                        header: `Medium switch with slot ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* States */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Default</h3>
                        <Switch
                            label="Default"
                            checked={stateDefault}
                            onChange={(checked) => {
                                setStateDefault(checked)
                                addSnackbar({
                                    header: `Default switch ${checked ? 'enabled' : 'disabled'}!`,
                                })
                            }}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Checked</h3>
                        <Switch
                            label="Checked"
                            checked={stateChecked}
                            onChange={(checked) => {
                                setStateChecked(checked)
                                addSnackbar({
                                    header: `Checked switch ${checked ? 'enabled' : 'disabled'}!`,
                                })
                            }}
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Disabled</h3>
                        <Switch label="Disabled" disabled={true} />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Error</h3>
                        <Switch
                            label="Error State"
                            error={true}
                            checked={stateError}
                            onChange={(checked) => {
                                setStateError(checked)
                                addSnackbar({
                                    header: `Error switch ${checked ? 'enabled' : 'disabled'}!`,
                                })
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* System Settings Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">System Settings Examples</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Connectivity</h3>
                        <div className="space-y-3">
                            <Switch
                                label="Wi-Fi"
                                checked={systemSettings.wifi}
                                onChange={(checked) => {
                                    setSystemSettings((prev) => ({
                                        ...prev,
                                        wifi: checked,
                                    }))
                                    addSnackbar({
                                        header: `Wi-Fi ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Wifi size={16} className="text-blue-500" />
                                }
                                subtext="Connect to wireless networks"
                            />
                            <Switch
                                label="Bluetooth"
                                checked={systemSettings.bluetooth}
                                onChange={(checked) => {
                                    setSystemSettings((prev) => ({
                                        ...prev,
                                        bluetooth: checked,
                                    }))
                                    addSnackbar({
                                        header: `Bluetooth ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Bluetooth
                                        size={16}
                                        className="text-purple-500"
                                    />
                                }
                                subtext="Connect to nearby devices"
                            />
                            <Switch
                                label="Location Services"
                                checked={systemSettings.location}
                                onChange={(checked) => {
                                    setSystemSettings((prev) => ({
                                        ...prev,
                                        location: checked,
                                    }))
                                    addSnackbar({
                                        header: `Location ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Globe
                                        size={16}
                                        className="text-green-500"
                                    />
                                }
                                subtext="Allow apps to access your location"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Preferences</h3>
                        <div className="space-y-3">
                            <Switch
                                label="Notifications"
                                checked={systemSettings.notifications}
                                onChange={(checked) => {
                                    setSystemSettings((prev) => ({
                                        ...prev,
                                        notifications: checked,
                                    }))
                                    addSnackbar({
                                        header: `Notifications ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Bell
                                        size={16}
                                        className="text-yellow-500"
                                    />
                                }
                                subtext="Receive push notifications"
                            />
                            <Switch
                                label="Dark Mode"
                                checked={systemSettings.darkMode}
                                onChange={(checked) => {
                                    setSystemSettings((prev) => ({
                                        ...prev,
                                        darkMode: checked,
                                    }))
                                    addSnackbar({
                                        header: `Dark mode ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Moon
                                        size={16}
                                        className="text-indigo-500"
                                    />
                                }
                                subtext="Use dark theme"
                            />
                            <Switch
                                label="Auto Update"
                                checked={systemSettings.autoUpdate}
                                onChange={(checked) => {
                                    setSystemSettings((prev) => ({
                                        ...prev,
                                        autoUpdate: checked,
                                    }))
                                    addSnackbar({
                                        header: `Auto update ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Zap
                                        size={16}
                                        className="text-orange-500"
                                    />
                                }
                                subtext="Automatically install updates"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Settings Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Privacy Settings Examples
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Data & Analytics
                        </h3>
                        <div className="space-y-3">
                            <Switch
                                label="Analytics"
                                checked={privacySettings.analytics}
                                onChange={(checked) => {
                                    setPrivacySettings((prev) => ({
                                        ...prev,
                                        analytics: checked,
                                    }))
                                    addSnackbar({
                                        header: `Analytics ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Eye size={16} className="text-gray-500" />
                                }
                                subtext="Help improve the app with usage data"
                            />
                            <Switch
                                label="Data Sharing"
                                checked={privacySettings.dataSharing}
                                onChange={(checked) => {
                                    setPrivacySettings((prev) => ({
                                        ...prev,
                                        dataSharing: checked,
                                    }))
                                    addSnackbar({
                                        header: `Data sharing ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Shield
                                        size={16}
                                        className="text-red-500"
                                    />
                                }
                                subtext="Share data with third parties"
                                error={
                                    privacySettings.dataSharing &&
                                    !privacySettings.cookies
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Tracking & Cookies
                        </h3>
                        <div className="space-y-3">
                            <Switch
                                label="Cookies"
                                checked={privacySettings.cookies}
                                onChange={(checked) => {
                                    setPrivacySettings((prev) => ({
                                        ...prev,
                                        cookies: checked,
                                    }))
                                    addSnackbar({
                                        header: `Cookies ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Lock size={16} className="text-blue-500" />
                                }
                                subtext="Allow cookies for better experience"
                            />
                            <Switch
                                label="Ad Tracking"
                                checked={privacySettings.tracking}
                                onChange={(checked) => {
                                    setPrivacySettings((prev) => ({
                                        ...prev,
                                        tracking: checked,
                                    }))
                                    addSnackbar({
                                        header: `Ad tracking ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                subtext="Allow personalized advertisements"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg space-y-3">
                        <h3 className="font-semibold">Device Settings</h3>
                        <div className="space-y-2">
                            <Switch
                                label="Mobile Data"
                                defaultChecked={true}
                                slot={
                                    <Smartphone
                                        size={16}
                                        className="text-green-500"
                                    />
                                }
                                onChange={(checked) => {
                                    addSnackbar({
                                        header: `Mobile data ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                            <Switch
                                label="Airplane Mode"
                                slot={
                                    <Volume2
                                        size={16}
                                        className="text-gray-500"
                                    />
                                }
                                onChange={(checked) => {
                                    addSnackbar({
                                        header: `Airplane mode ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-3">
                        <h3 className="font-semibold">Display Settings</h3>
                        <div className="space-y-2">
                            <Switch
                                label="Auto Brightness"
                                defaultChecked={true}
                                slot={
                                    <Monitor
                                        size={16}
                                        className="text-yellow-500"
                                    />
                                }
                                subtext="Adjust brightness automatically"
                                onChange={(checked) => {
                                    addSnackbar({
                                        header: `Auto brightness ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                            <Switch
                                label="Night Mode"
                                subtext="Reduce blue light"
                                onChange={(checked) => {
                                    addSnackbar({
                                        header: `Night mode ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-3">
                        <h3 className="font-semibold">Account Settings</h3>
                        <div className="space-y-2">
                            <Switch
                                label="Profile Visibility"
                                defaultChecked={true}
                                slot={
                                    <User size={16} className="text-blue-500" />
                                }
                                subtext="Show profile to others"
                                onChange={(checked) => {
                                    addSnackbar({
                                        header: `Profile visibility ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                            <Switch
                                label="Activity Status"
                                subtext="Show when you're online"
                                onChange={(checked) => {
                                    addSnackbar({
                                        header: `Activity status ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* All Size Combinations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All Size Combinations</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold capitalize">
                            Small Size
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">Basic</h4>
                                <Switch
                                    label="Basic Option"
                                    size={SwitchSize.SMALL}
                                    checked={comboSmallBasic}
                                    onChange={(checked) => {
                                        setComboSmallBasic(checked)
                                        addSnackbar({
                                            header: `Small basic switch ${checked ? 'enabled' : 'disabled'}!`,
                                        })
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Subtext
                                </h4>
                                <Switch
                                    label="With Description"
                                    size={SwitchSize.SMALL}
                                    subtext="Additional information here"
                                    checked={comboSmallSubtext}
                                    onChange={(checked) => {
                                        setComboSmallSubtext(checked)
                                        addSnackbar({
                                            header: `Small subtext switch ${checked ? 'enabled' : 'disabled'}!`,
                                        })
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Slot
                                </h4>
                                <Switch
                                    label="With Icon"
                                    size={SwitchSize.SMALL}
                                    slot={
                                        <Zap
                                            size={14}
                                            className="text-yellow-500"
                                        />
                                    }
                                    checked={comboSmallSlot}
                                    onChange={(checked) => {
                                        setComboSmallSlot(checked)
                                        addSnackbar({
                                            header: `Small slot switch ${checked ? 'enabled' : 'disabled'}!`,
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold capitalize">
                            Medium Size
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">Basic</h4>
                                <Switch
                                    label="Basic Option"
                                    size={SwitchSize.MEDIUM}
                                    checked={comboMediumBasic}
                                    onChange={(checked) => {
                                        setComboMediumBasic(checked)
                                        addSnackbar({
                                            header: `Medium basic switch ${checked ? 'enabled' : 'disabled'}!`,
                                        })
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Subtext
                                </h4>
                                <Switch
                                    label="With Description"
                                    size={SwitchSize.MEDIUM}
                                    subtext="Additional information here"
                                    checked={comboMediumSubtext}
                                    onChange={(checked) => {
                                        setComboMediumSubtext(checked)
                                        addSnackbar({
                                            header: `Medium subtext switch ${checked ? 'enabled' : 'disabled'}!`,
                                        })
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Slot
                                </h4>
                                <Switch
                                    label="With Icon"
                                    size={SwitchSize.MEDIUM}
                                    slot={
                                        <Zap
                                            size={16}
                                            className="text-yellow-500"
                                        />
                                    }
                                    checked={comboMediumSlot}
                                    onChange={(checked) => {
                                        setComboMediumSlot(checked)
                                        addSnackbar({
                                            header: `Medium slot switch ${checked ? 'enabled' : 'disabled'}!`,
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwitchDemo
