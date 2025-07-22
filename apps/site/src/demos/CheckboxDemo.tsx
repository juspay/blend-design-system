import {
    Checkbox,
    CheckboxSize,
} from '../../../../packages/blend/lib/components/Checkbox'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import {
    Heart,
    Star,
    Settings,
    User,
    Mail,
    Phone,
    Shield,
    Bell,
    Lock,
} from 'lucide-react'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const CheckboxDemo = () => {
    // Individual Checkbox playground state
    const [playgroundLabel, setPlaygroundLabel] = useState(
        'Accept terms and conditions'
    )
    const [playgroundSubtext, setPlaygroundSubtext] = useState(
        'By checking this box, you agree to our terms'
    )
    const [playgroundSize, setPlaygroundSize] = useState<CheckboxSize>(
        CheckboxSize.MEDIUM
    )
    const [playgroundChecked, setPlaygroundChecked] = useState<
        boolean | 'indeterminate'
    >(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [showSubtext, setShowSubtext] = useState(true)
    const [showSlot, setShowSlot] = useState(false)

    // Individual checkbox states for different sections
    const [sizeSmallBasic, setSizeSmallBasic] = useState(false)
    const [sizeSmallSubtext, setSizeSmallSubtext] = useState(false)
    const [sizeSmallSlot, setSizeSmallSlot] = useState(false)
    const [sizeMediumBasic, setSizeMediumBasic] = useState(false)
    const [sizeMediumSubtext, setSizeMediumSubtext] = useState(false)
    const [sizeMediumSlot, setSizeMediumSlot] = useState(false)

    // States section
    const [stateDefault, setStateDefault] = useState(false)
    const [stateChecked, setStateChecked] = useState(true)
    const [stateIndeterminate, setStateIndeterminate] = useState<
        boolean | 'indeterminate'
    >('indeterminate')
    const [stateError, setStateError] = useState(false)

    // Multi-selection examples
    const [features, setFeatures] = useState({
        notifications: true,
        darkMode: false,
        autoSave: true,
        analytics: false,
    })

    const [permissions, setPermissions] = useState({
        read: true,
        write: false,
        delete: false,
        admin: false,
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
        { value: CheckboxSize.SMALL, label: 'Small' },
        { value: CheckboxSize.MEDIUM, label: 'Medium' },
    ]

    const checkedStateOptions = [
        { value: 'unchecked', label: 'Unchecked' },
        { value: 'checked', label: 'Checked' },
        { value: 'indeterminate', label: 'Indeterminate' },
    ]

    const handlePlaygroundStateChange = (state: string) => {
        switch (state) {
            case 'checked':
                setPlaygroundChecked(true)
                break
            case 'unchecked':
                setPlaygroundChecked(false)
                break
            case 'indeterminate':
                setPlaygroundChecked('indeterminate')
                break
        }
    }

    const getPlaygroundStateValue = () => {
        if (playgroundChecked === 'indeterminate') return 'indeterminate'
        return playgroundChecked ? 'checked' : 'unchecked'
    }

    return (
        <div className="p-8 space-y-12">
            {/* Individual Checkbox Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Individual Checkbox Playground
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Label"
                            value={playgroundLabel}
                            onChange={(e) => setPlaygroundLabel(e.target.value)}
                            placeholder="Enter checkbox label"
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
                                setPlaygroundSize(value as CheckboxSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Checked State"
                            items={[{ items: checkedStateOptions }]}
                            selected={getPlaygroundStateValue()}
                            onSelect={(value) =>
                                handlePlaygroundStateChange(value as string)
                            }
                            placeholder="Select state"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Error"
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
                        <Checkbox
                            value="playground"
                            checked={playgroundChecked}
                            onCheckedChange={(checked) => {
                                setPlaygroundChecked(checked)
                                addSnackbar({
                                    header: `Checkbox ${checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}!`,
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
                                    <Heart size={16} className="text-red-500" />
                                ) : undefined
                            }
                            data-selected-checkbox="NotSelected"
                            data-checkbox-value="SUCCESS"
                            data-checkbox-status="enabled"
                        >
                            {playgroundLabel}
                        </Checkbox>
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
                            <Checkbox
                                value="basic"
                                size={CheckboxSize.SMALL}
                                checked={sizeSmallBasic}
                                onCheckedChange={(checked) => {
                                    setSizeSmallBasic(checked as boolean)
                                    addSnackbar({
                                        header: `Small checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                Basic Checkbox
                            </Checkbox>
                            <Checkbox
                                value="with-subtext"
                                size={CheckboxSize.SMALL}
                                subtext="This checkbox has additional information"
                                checked={sizeSmallSubtext}
                                onCheckedChange={(checked) => {
                                    setSizeSmallSubtext(checked as boolean)
                                    addSnackbar({
                                        header: `Small checkbox with subtext ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Subtext
                            </Checkbox>
                            <Checkbox
                                value="with-slot"
                                size={CheckboxSize.SMALL}
                                slot={
                                    <Settings
                                        size={14}
                                        className="text-blue-500"
                                    />
                                }
                                checked={sizeSmallSlot}
                                onCheckedChange={(checked) => {
                                    setSizeSmallSlot(checked as boolean)
                                    addSnackbar({
                                        header: `Small checkbox with slot ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Slot
                            </Checkbox>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium capitalize">
                            Medium
                        </h3>
                        <div className="space-y-3">
                            <Checkbox
                                value="basic"
                                size={CheckboxSize.MEDIUM}
                                checked={sizeMediumBasic}
                                onCheckedChange={(checked) => {
                                    setSizeMediumBasic(checked as boolean)
                                    addSnackbar({
                                        header: `Medium checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                Basic Checkbox
                            </Checkbox>
                            <Checkbox
                                value="with-subtext"
                                size={CheckboxSize.MEDIUM}
                                subtext="This checkbox has additional information"
                                checked={sizeMediumSubtext}
                                onCheckedChange={(checked) => {
                                    setSizeMediumSubtext(checked as boolean)
                                    addSnackbar({
                                        header: `Medium checkbox with subtext ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Subtext
                            </Checkbox>
                            <Checkbox
                                value="with-slot"
                                size={CheckboxSize.MEDIUM}
                                slot={
                                    <Settings
                                        size={16}
                                        className="text-blue-500"
                                    />
                                }
                                checked={sizeMediumSlot}
                                onCheckedChange={(checked) => {
                                    setSizeMediumSlot(checked as boolean)
                                    addSnackbar({
                                        header: `Medium checkbox with slot ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Slot
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>

            {/* States */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Default</h3>
                        <Checkbox
                            value="default"
                            checked={stateDefault}
                            onCheckedChange={(checked) => {
                                setStateDefault(checked as boolean)
                                addSnackbar({
                                    header: `Default checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                        >
                            Default
                        </Checkbox>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Checked</h3>
                        <Checkbox
                            value="checked"
                            checked={stateChecked}
                            onCheckedChange={(checked) => {
                                setStateChecked(checked as boolean)
                                addSnackbar({
                                    header: `Checked checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                        >
                            Checked
                        </Checkbox>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Indeterminate</h3>
                        <Checkbox
                            value="indeterminate"
                            checked={stateIndeterminate}
                            onCheckedChange={(checked) => {
                                setStateIndeterminate(checked)
                                addSnackbar({
                                    header: `Indeterminate checkbox ${checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                        >
                            Indeterminate
                        </Checkbox>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Disabled</h3>
                        <Checkbox value="disabled" disabled={true}>
                            Disabled
                        </Checkbox>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Error</h3>
                        <Checkbox
                            value="error"
                            error={true}
                            checked={stateError}
                            onCheckedChange={(checked) => {
                                setStateError(checked as boolean)
                                addSnackbar({
                                    header: `Error checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                        >
                            Error State
                        </Checkbox>
                    </div>
                </div>
            </div>

            {/* Multi-Selection Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Multi-Selection Examples</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">App Features</h3>
                        <div className="space-y-3">
                            <Checkbox
                                value="notifications"
                                checked={features.notifications}
                                onCheckedChange={(checked) => {
                                    setFeatures((prev) => ({
                                        ...prev,
                                        notifications: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Notifications ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                slot={
                                    <Bell size={16} className="text-blue-500" />
                                }
                                subtext="Receive push notifications"
                            >
                                Enable Notifications
                            </Checkbox>
                            <Checkbox
                                value="darkMode"
                                checked={features.darkMode}
                                onCheckedChange={(checked) => {
                                    setFeatures((prev) => ({
                                        ...prev,
                                        darkMode: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Dark mode ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                subtext="Use dark theme"
                            >
                                Dark Mode
                            </Checkbox>
                            <Checkbox
                                value="autoSave"
                                checked={features.autoSave}
                                onCheckedChange={(checked) => {
                                    setFeatures((prev) => ({
                                        ...prev,
                                        autoSave: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Auto-save ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                subtext="Automatically save changes"
                            >
                                Auto-save
                            </Checkbox>
                            <Checkbox
                                value="analytics"
                                checked={features.analytics}
                                onCheckedChange={(checked) => {
                                    setFeatures((prev) => ({
                                        ...prev,
                                        analytics: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Analytics ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                                subtext="Help improve the app"
                            >
                                Analytics
                            </Checkbox>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            User Permissions
                        </h3>
                        <div className="space-y-3">
                            <Checkbox
                                value="read"
                                checked={permissions.read}
                                onCheckedChange={(checked) => {
                                    setPermissions((prev) => ({
                                        ...prev,
                                        read: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Read permission ${checked ? 'granted' : 'revoked'}!`,
                                    })
                                }}
                                slot={
                                    <User
                                        size={16}
                                        className="text-green-500"
                                    />
                                }
                                subtext="View content and files"
                            >
                                Read Access
                            </Checkbox>
                            <Checkbox
                                value="write"
                                checked={permissions.write}
                                onCheckedChange={(checked) => {
                                    setPermissions((prev) => ({
                                        ...prev,
                                        write: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Write permission ${checked ? 'granted' : 'revoked'}!`,
                                    })
                                }}
                                subtext="Edit and create content"
                            >
                                Write Access
                            </Checkbox>
                            <Checkbox
                                value="delete"
                                checked={permissions.delete}
                                onCheckedChange={(checked) => {
                                    setPermissions((prev) => ({
                                        ...prev,
                                        delete: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Delete permission ${checked ? 'granted' : 'revoked'}!`,
                                    })
                                }}
                                subtext="Remove content and files"
                                error={permissions.delete && !permissions.write}
                            >
                                Delete Access
                            </Checkbox>
                            <Checkbox
                                value="admin"
                                checked={permissions.admin}
                                onCheckedChange={(checked) => {
                                    setPermissions((prev) => ({
                                        ...prev,
                                        admin: checked as boolean,
                                    }))
                                    addSnackbar({
                                        header: `Admin permission ${checked ? 'granted' : 'revoked'}!`,
                                    })
                                }}
                                slot={
                                    <Shield
                                        size={16}
                                        className="text-red-500"
                                    />
                                }
                                subtext="Full system access"
                            >
                                Admin Access
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg space-y-3">
                        <h3 className="font-semibold">Contact Preferences</h3>
                        <div className="space-y-2">
                            <Checkbox
                                value="email"
                                defaultChecked={true}
                                slot={
                                    <Mail size={16} className="text-blue-500" />
                                }
                                onCheckedChange={(checked) => {
                                    addSnackbar({
                                        header: `Email notifications ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            >
                                Email
                            </Checkbox>
                            <Checkbox
                                value="sms"
                                slot={
                                    <Phone
                                        size={16}
                                        className="text-green-500"
                                    />
                                }
                                onCheckedChange={(checked) => {
                                    addSnackbar({
                                        header: `SMS notifications ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            >
                                SMS
                            </Checkbox>
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-3">
                        <h3 className="font-semibold">Security Settings</h3>
                        <div className="space-y-2">
                            <Checkbox
                                value="2fa"
                                defaultChecked={true}
                                slot={
                                    <Lock
                                        size={16}
                                        className="text-orange-500"
                                    />
                                }
                                subtext="Recommended for security"
                                onCheckedChange={(checked) => {
                                    addSnackbar({
                                        header: `Two-factor auth ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            >
                                Two-Factor Authentication
                            </Checkbox>
                            <Checkbox
                                value="sessions"
                                subtext="End all other sessions"
                                onCheckedChange={(checked) => {
                                    addSnackbar({
                                        header: `Session management ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            >
                                Secure Sessions
                            </Checkbox>
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-3">
                        <h3 className="font-semibold">Privacy Options</h3>
                        <div className="space-y-2">
                            <Checkbox
                                value="profile"
                                defaultChecked={true}
                                subtext="Show to other users"
                                onCheckedChange={(checked) => {
                                    addSnackbar({
                                        header: `Public profile ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            >
                                Public Profile
                            </Checkbox>
                            <Checkbox
                                value="activity"
                                subtext="Share activity status"
                                onCheckedChange={(checked) => {
                                    addSnackbar({
                                        header: `Activity sharing ${checked ? 'enabled' : 'disabled'}!`,
                                    })
                                }}
                            >
                                Activity Status
                            </Checkbox>
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
                                <Checkbox
                                    value="basic"
                                    size={CheckboxSize.SMALL}
                                    checked={comboSmallBasic}
                                    onCheckedChange={(checked) => {
                                        setComboSmallBasic(checked as boolean)
                                        addSnackbar({
                                            header: `Small basic checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    Basic Option
                                </Checkbox>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Subtext
                                </h4>
                                <Checkbox
                                    value="subtext"
                                    size={CheckboxSize.SMALL}
                                    subtext="Additional information here"
                                    checked={comboSmallSubtext}
                                    onCheckedChange={(checked) => {
                                        setComboSmallSubtext(checked as boolean)
                                        addSnackbar({
                                            header: `Small subtext checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Description
                                </Checkbox>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Slot
                                </h4>
                                <Checkbox
                                    value="slot"
                                    size={CheckboxSize.SMALL}
                                    slot={
                                        <Star
                                            size={14}
                                            className="text-yellow-500"
                                        />
                                    }
                                    checked={comboSmallSlot}
                                    onCheckedChange={(checked) => {
                                        setComboSmallSlot(checked as boolean)
                                        addSnackbar({
                                            header: `Small slot checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Icon
                                </Checkbox>
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
                                <Checkbox
                                    value="basic"
                                    size={CheckboxSize.MEDIUM}
                                    checked={comboMediumBasic}
                                    onCheckedChange={(checked) => {
                                        setComboMediumBasic(checked as boolean)
                                        addSnackbar({
                                            header: `Medium basic checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    Basic Option
                                </Checkbox>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Subtext
                                </h4>
                                <Checkbox
                                    value="subtext"
                                    size={CheckboxSize.MEDIUM}
                                    subtext="Additional information here"
                                    checked={comboMediumSubtext}
                                    onCheckedChange={(checked) => {
                                        setComboMediumSubtext(
                                            checked as boolean
                                        )
                                        addSnackbar({
                                            header: `Medium subtext checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Description
                                </Checkbox>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Slot
                                </h4>
                                <Checkbox
                                    value="slot"
                                    size={CheckboxSize.MEDIUM}
                                    slot={
                                        <Star
                                            size={16}
                                            className="text-yellow-500"
                                        />
                                    }
                                    checked={comboMediumSlot}
                                    onCheckedChange={(checked) => {
                                        setComboMediumSlot(checked as boolean)
                                        addSnackbar({
                                            header: `Medium slot checkbox ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Icon
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckboxDemo
