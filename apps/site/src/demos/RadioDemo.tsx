import {
    Radio,
    RadioGroup,
    RadioSize,
} from '../../../../packages/blend/lib/components/Radio'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Heart, Star, Settings, User, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const RadioDemo = () => {
    // Individual Radio playground state
    const [playgroundLabel, setPlaygroundLabel] = useState('Option 1')
    const [playgroundSubtext, setPlaygroundSubtext] = useState(
        'This is a description'
    )
    const [playgroundSize, setPlaygroundSize] = useState<RadioSize>(
        RadioSize.MEDIUM
    )
    const [playgroundChecked, setPlaygroundChecked] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [showSubtext, setShowSubtext] = useState(true)
    const [showSlot, setShowSlot] = useState(false)

    // RadioGroup playground state
    const [groupLabel, setGroupLabel] = useState('Select an option')
    const [groupValue, setGroupValue] = useState('option1')
    const [groupDisabled, setGroupDisabled] = useState(false)

    // Individual radio states for different sections
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

    // RadioGroup states
    const [paymentMethod, setPaymentMethod] = useState('credit')
    const [subscriptionPlan, setSubscriptionPlan] = useState('pro')
    const [contactMethod, setContactMethod] = useState('email')
    const [notificationFreq, setNotificationFreq] = useState('weekly')

    // All combinations states
    const [comboSmallBasic, setComboSmallBasic] = useState(false)
    const [comboSmallSubtext, setComboSmallSubtext] = useState(false)
    const [comboSmallSlot, setComboSmallSlot] = useState(false)
    const [comboMediumBasic, setComboMediumBasic] = useState(false)
    const [comboMediumSubtext, setComboMediumSubtext] = useState(false)
    const [comboMediumSlot, setComboMediumSlot] = useState(false)

    // Options for selects
    const sizeOptions = [
        { value: RadioSize.SMALL, label: 'Small' },
        { value: RadioSize.MEDIUM, label: 'Medium' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Individual Radio Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Individual Radio Playground
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Label"
                            value={playgroundLabel}
                            onChange={(e) => setPlaygroundLabel(e.target.value)}
                            placeholder="Enter radio label"
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
                                setPlaygroundSize(value as RadioSize)
                            }
                            placeholder="Select size"
                        />
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
                        <Radio
                            name="playground-radio"
                            value="playground"
                            checked={playgroundChecked}
                            onChange={(checked) => {
                                setPlaygroundChecked(checked)
                                addSnackbar({
                                    header: `Radio ${checked ? 'checked' : 'unchecked'}!`,
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
                            data-radio="false"
                            data-radio-enabled="true"
                        >
                            {playgroundLabel}
                        </Radio>
                    </div>
                </div>
            </div>

            {/* RadioGroup Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">RadioGroup Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="Group Label"
                            value={groupLabel}
                            onChange={(e) => setGroupLabel(e.target.value)}
                            placeholder="Enter group label"
                        />
                        <div className="flex items-center gap-6">
                            <Switch
                                label="Group Disabled"
                                checked={groupDisabled}
                                onChange={() =>
                                    setGroupDisabled(!groupDisabled)
                                }
                            />
                        </div>
                    </div>

                    <div className="min-h-60 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-gray-50">
                        <RadioGroup
                            name="playground-group"
                            label={groupLabel}
                            value={groupValue}
                            onChange={(value) => {
                                setGroupValue(value)
                                addSnackbar({
                                    header: `Selected: ${value}`,
                                })
                            }}
                            disabled={groupDisabled}
                        >
                            <Radio value="option1" size={RadioSize.MEDIUM}>
                                Option 1
                            </Radio>
                            <Radio
                                value="option2"
                                size={RadioSize.MEDIUM}
                                subtext="This option has a description"
                            >
                                Option 2
                            </Radio>
                            <Radio
                                value="option3"
                                size={RadioSize.MEDIUM}
                                slot={
                                    <Star
                                        size={16}
                                        className="text-yellow-500"
                                    />
                                }
                            >
                                Option 3 with slot
                            </Radio>
                        </RadioGroup>
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
                            <Radio
                                name="size-small-basic"
                                value="basic"
                                size={RadioSize.SMALL}
                                checked={sizeSmallBasic}
                                onChange={(checked) => {
                                    setSizeSmallBasic(checked)
                                    addSnackbar({
                                        header: `Small radio ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                Basic Radio
                            </Radio>
                            <Radio
                                name="size-small-subtext"
                                value="with-subtext"
                                size={RadioSize.SMALL}
                                subtext="This radio has additional information"
                                checked={sizeSmallSubtext}
                                onChange={(checked) => {
                                    setSizeSmallSubtext(checked)
                                    addSnackbar({
                                        header: `Small radio with subtext ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Subtext
                            </Radio>
                            <Radio
                                name="size-small-slot"
                                value="with-slot"
                                size={RadioSize.SMALL}
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
                                        header: `Small radio with slot ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Slot
                            </Radio>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium capitalize">
                            Medium
                        </h3>
                        <div className="space-y-3">
                            <Radio
                                name="size-medium-basic"
                                value="basic"
                                size={RadioSize.MEDIUM}
                                checked={sizeMediumBasic}
                                onChange={(checked) => {
                                    setSizeMediumBasic(checked)
                                    addSnackbar({
                                        header: `Medium radio ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                Basic Radio
                            </Radio>
                            <Radio
                                name="size-medium-subtext"
                                value="with-subtext"
                                size={RadioSize.MEDIUM}
                                subtext="This radio has additional information"
                                checked={sizeMediumSubtext}
                                onChange={(checked) => {
                                    setSizeMediumSubtext(checked)
                                    addSnackbar({
                                        header: `Medium radio with subtext ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Subtext
                            </Radio>
                            <Radio
                                name="size-medium-slot"
                                value="with-slot"
                                size={RadioSize.MEDIUM}
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
                                        header: `Medium radio with slot ${checked ? 'checked' : 'unchecked'}!`,
                                    })
                                }}
                            >
                                With Slot
                            </Radio>
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
                        <Radio
                            name="state-default"
                            value="default"
                            checked={stateDefault}
                            onChange={(checked) => {
                                setStateDefault(checked)
                                addSnackbar({
                                    header: `Default radio ${checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                        >
                            Default
                        </Radio>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Checked</h3>
                        <Radio
                            name="state-checked"
                            value="checked"
                            checked={stateChecked}
                            onChange={(checked) => {
                                setStateChecked(checked)
                                addSnackbar({
                                    header: `Checked radio ${checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                        >
                            Checked
                        </Radio>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Disabled</h3>
                        <Radio
                            name="state-disabled"
                            value="disabled"
                            disabled={true}
                        >
                            Disabled
                        </Radio>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Error</h3>
                        <Radio
                            name="state-error"
                            value="error"
                            error={true}
                            checked={stateError}
                            onChange={(checked) => {
                                setStateError(checked)
                                addSnackbar({
                                    header: `Error radio ${checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                        >
                            Error State
                        </Radio>
                    </div>
                </div>
            </div>

            {/* RadioGroup Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">RadioGroup Examples</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Payment Method
                        </h3>
                        <RadioGroup
                            name="payment"
                            label="Select Payment Method"
                            value={paymentMethod}
                            onChange={(value) => {
                                setPaymentMethod(value)
                                addSnackbar({
                                    header: `Payment method: ${value}`,
                                })
                            }}
                        >
                            <Radio value="credit" size={RadioSize.MEDIUM}>
                                Credit Card
                            </Radio>
                            <Radio
                                value="debit"
                                size={RadioSize.MEDIUM}
                                subtext="Direct bank transfer"
                            >
                                Debit Card
                            </Radio>
                            <Radio
                                value="paypal"
                                size={RadioSize.MEDIUM}
                                slot={
                                    <Mail size={16} className="text-blue-600" />
                                }
                            >
                                PayPal
                            </Radio>
                            <Radio
                                value="crypto"
                                size={RadioSize.MEDIUM}
                                subtext="Bitcoin, Ethereum, etc."
                            >
                                Cryptocurrency
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Subscription Plan
                        </h3>
                        <RadioGroup
                            name="plan"
                            label="Choose Your Plan"
                            value={subscriptionPlan}
                            onChange={(value) => {
                                setSubscriptionPlan(value)
                                addSnackbar({
                                    header: `Plan selected: ${value}`,
                                })
                            }}
                        >
                            <Radio
                                value="free"
                                size={RadioSize.MEDIUM}
                                subtext="Basic features, limited usage"
                            >
                                Free
                            </Radio>
                            <Radio
                                value="pro"
                                size={RadioSize.MEDIUM}
                                subtext="All features, unlimited usage"
                                slot={
                                    <Star
                                        size={16}
                                        className="text-yellow-500"
                                    />
                                }
                            >
                                Pro
                            </Radio>
                            <Radio
                                value="enterprise"
                                size={RadioSize.MEDIUM}
                                subtext="Custom solutions, priority support"
                            >
                                Enterprise
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            {/* Contact Method Example */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Contact Preferences</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Preferred Contact Method
                        </h3>
                        <RadioGroup
                            name="contact"
                            label="How would you like to be contacted?"
                            value={contactMethod}
                            onChange={(value) => {
                                setContactMethod(value)
                                addSnackbar({
                                    header: `Contact method: ${value}`,
                                })
                            }}
                        >
                            <Radio
                                value="email"
                                size={RadioSize.MEDIUM}
                                slot={
                                    <Mail size={16} className="text-blue-500" />
                                }
                                subtext="We'll send updates to your email"
                            >
                                Email
                            </Radio>
                            <Radio
                                value="phone"
                                size={RadioSize.MEDIUM}
                                slot={
                                    <Phone
                                        size={16}
                                        className="text-green-500"
                                    />
                                }
                                subtext="We'll call you during business hours"
                            >
                                Phone
                            </Radio>
                            <Radio
                                value="none"
                                size={RadioSize.MEDIUM}
                                slot={
                                    <User size={16} className="text-gray-500" />
                                }
                                subtext="No contact needed"
                            >
                                No Contact
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Notification Settings
                        </h3>
                        <RadioGroup
                            name="notifications"
                            label="Notification Frequency"
                            value={notificationFreq}
                            onChange={(value) => {
                                setNotificationFreq(value)
                                addSnackbar({
                                    header: `Notification frequency: ${value}`,
                                })
                            }}
                        >
                            <Radio
                                value="daily"
                                size={RadioSize.MEDIUM}
                                subtext="Receive daily updates"
                            >
                                Daily
                            </Radio>
                            <Radio
                                value="weekly"
                                size={RadioSize.MEDIUM}
                                subtext="Weekly digest"
                            >
                                Weekly
                            </Radio>
                            <Radio
                                value="monthly"
                                size={RadioSize.MEDIUM}
                                subtext="Monthly summary"
                            >
                                Monthly
                            </Radio>
                            <Radio
                                value="never"
                                size={RadioSize.MEDIUM}
                                subtext="No notifications"
                            >
                                Never
                            </Radio>
                        </RadioGroup>
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
                                <Radio
                                    name="combo-small-basic"
                                    value="basic"
                                    size={RadioSize.SMALL}
                                    checked={comboSmallBasic}
                                    onChange={(checked) => {
                                        setComboSmallBasic(checked)
                                        addSnackbar({
                                            header: `Small basic radio ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    Basic Option
                                </Radio>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Subtext
                                </h4>
                                <Radio
                                    name="combo-small-subtext"
                                    value="subtext"
                                    size={RadioSize.SMALL}
                                    subtext="Additional information here"
                                    checked={comboSmallSubtext}
                                    onChange={(checked) => {
                                        setComboSmallSubtext(checked)
                                        addSnackbar({
                                            header: `Small subtext radio ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Description
                                </Radio>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Slot
                                </h4>
                                <Radio
                                    name="combo-small-slot"
                                    value="slot"
                                    size={RadioSize.SMALL}
                                    slot={
                                        <Heart
                                            size={14}
                                            className="text-red-500"
                                        />
                                    }
                                    checked={comboSmallSlot}
                                    onChange={(checked) => {
                                        setComboSmallSlot(checked)
                                        addSnackbar({
                                            header: `Small slot radio ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Icon
                                </Radio>
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
                                <Radio
                                    name="combo-medium-basic"
                                    value="basic"
                                    size={RadioSize.MEDIUM}
                                    checked={comboMediumBasic}
                                    onChange={(checked) => {
                                        setComboMediumBasic(checked)
                                        addSnackbar({
                                            header: `Medium basic radio ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    Basic Option
                                </Radio>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Subtext
                                </h4>
                                <Radio
                                    name="combo-medium-subtext"
                                    value="subtext"
                                    size={RadioSize.MEDIUM}
                                    subtext="Additional information here"
                                    checked={comboMediumSubtext}
                                    onChange={(checked) => {
                                        setComboMediumSubtext(checked)
                                        addSnackbar({
                                            header: `Medium subtext radio ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Description
                                </Radio>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">
                                    With Slot
                                </h4>
                                <Radio
                                    name="combo-medium-slot"
                                    value="slot"
                                    size={RadioSize.MEDIUM}
                                    slot={
                                        <Heart
                                            size={16}
                                            className="text-red-500"
                                        />
                                    }
                                    checked={comboMediumSlot}
                                    onChange={(checked) => {
                                        setComboMediumSlot(checked)
                                        addSnackbar({
                                            header: `Medium slot radio ${checked ? 'checked' : 'unchecked'}!`,
                                        })
                                    }}
                                >
                                    With Icon
                                </Radio>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RadioDemo
