import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Switch, SwitchGroup, SwitchSize } from '@juspay/blend-design-system'
import {
    Settings,
    Wifi,
    Bluetooth,
    Bell,
    Moon,
    Star,
    Info,
    Shield,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const getSlotContent = (
    slotValue: string | React.ReactNode | undefined
): React.ReactNode => {
    if (typeof slotValue !== 'string') {
        return slotValue
    }

    if (!slotValue || slotValue === 'none') {
        return undefined
    }

    switch (slotValue) {
        case 'star':
            return <Star size={16} color="#ffd700" />
        case 'info':
            return <Info size={16} color="#0ea5e9" />
        case 'settings':
            return <Settings size={16} color="#6b7280" />
        case 'wifi':
            return <Wifi size={16} color="#10b981" />
        case 'bluetooth':
            return <Bluetooth size={16} color="#3b82f6" />
        case 'bell':
            return <Bell size={16} color="#f59e0b" />
        case 'moon':
            return <Moon size={16} color="#6366f1" />
        case 'shield':
            return <Shield size={16} color="#ef4444" />
        default:
            return undefined
    }
}

const meta: Meta<typeof Switch> = {
    title: 'Components/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A toggle switch component for binary on/off states with support for controlled and uncontrolled modes, multiple sizes, and comprehensive form integration capabilities.

## Features
- Controlled and uncontrolled modes
- Two sizes (Small, Medium)
- Error state handling
- Required field indication
- Label and subtext support
- Custom slot for additional content
- Disabled state support
- Switch group functionality
- Accessible design with proper ARIA attributes
- Form integration ready

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Space, Enter)
- Screen reader support (VoiceOver/NVDA)
- Proper label association via htmlFor/id
- Error state support with visual and programmatic indicators (aria-invalid="true")
- Required state indicated with asterisk and aria-required="true" attribute
- Disabled state properly handled with aria-disabled="true" and native disabled attribute
- Subtext support for additional context via aria-describedby
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial (4 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size (WCAG 2.5.8) - Small/Medium switches need 44x44px minimum interactive area
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires confirmation patterns for critical actions
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Touch Target Sizes**:
- Small switches: 18px height at sm breakpoint, 12px at lg breakpoint (meets AA 24px, does not meet AAA 44px)
- Medium switches: 20px height at sm breakpoint, 16px at lg breakpoint (meets AA 24px, does not meet AAA 44px)
- Note: Switch has padding: 0px, so interactive area equals visible size

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Switch.accessibility\` (automated tests covering WCAG 2.1 criteria)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Switch, SwitchGroup, SwitchSize } from '@juspay/blend-design-system';

<Switch 
  size={SwitchSize.MEDIUM}
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
  subtext="Get alerts about new messages"
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'Unique identifier for the switch element',
        },
        checked: {
            control: 'boolean',
            description: 'Controlled checked state of the switch',
        },
        defaultChecked: {
            control: 'boolean',
            description: 'Default checked state for uncontrolled mode',
        },
        size: {
            control: 'select',
            options: Object.values(SwitchSize),
            description: 'Size variant of the switch',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the switch is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Whether the switch is required (shows asterisk)',
        },
        error: {
            control: 'boolean',
            description: 'Whether the switch is in error state',
        },
        label: {
            control: 'text',
            description: 'Label content for the switch',
        },
        subtext: {
            control: 'text',
            description: 'Additional descriptive text below the switch',
        },
        value: {
            control: 'text',
            description: 'Value attribute for the switch input',
        },
        name: {
            control: 'text',
            description: 'Name attribute for form submission',
        },
        slot: {
            control: 'select',
            options: [
                'none',
                'star',
                'info',
                'settings',
                'wifi',
                'bluetooth',
                'bell',
                'moon',
                'shield',
            ],
            description: 'Additional content slot displayed next to the label',
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the switch state changes',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switch>

// Default story
export const Default: Story = {
    render: function DefaultSwitch(args: Story['args']) {
        const [checked, setChecked] = useState(args?.defaultChecked || false)

        return (
            <Switch
                {...args}
                checked={checked}
                onChange={(newChecked) => setChecked(newChecked)}
                slot={getSlotContent(args?.slot)}
            />
        )
    },
    args: {
        label: 'Default switch',
        size: SwitchSize.MEDIUM,
        defaultChecked: false,
        disabled: false,
        required: false,
        error: false,
        id: '',
        value: '',
        name: '',
        slot: 'none',
    },
}

// Switch sizes
export const SwitchSizes: Story = {
    render: () => {
        const SwitchSizesComponent = () => {
            const [sizes, setSizes] = useState({
                small: false,
                medium: true,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Switch
                        size={SwitchSize.SMALL}
                        checked={sizes.small}
                        onChange={(checked) =>
                            setSizes((prev) => ({ ...prev, small: checked }))
                        }
                        label="Small switch"
                    />
                    <Switch
                        size={SwitchSize.MEDIUM}
                        checked={sizes.medium}
                        onChange={(checked) =>
                            setSizes((prev) => ({ ...prev, medium: checked }))
                        }
                        label="Medium switch"
                    />
                </div>
            )
        }
        return <SwitchSizesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Different switch sizes: Small and Medium. Click to toggle each switch.',
            },
        },
    },
}

// Switch states
export const SwitchStates: Story = {
    render: () => {
        const SwitchStatesComponent = () => {
            const [states, setStates] = useState({
                off: false,
                on: true,
                disabledOff: false,
                disabledOn: true,
                error: false,
                required: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            marginBottom: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                        }}
                    >
                        Interactive States:
                    </div>
                    <Switch
                        checked={states.off}
                        onChange={(checked) =>
                            setStates((prev) => ({ ...prev, off: checked }))
                        }
                        label="Off state (Click to turn on)"
                    />
                    <Switch
                        checked={states.on}
                        onChange={(checked) =>
                            setStates((prev) => ({ ...prev, on: checked }))
                        }
                        label="On state (Click to turn off)"
                    />

                    <div
                        style={{
                            marginTop: '16px',
                            marginBottom: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                        }}
                    >
                        Disabled States:
                    </div>
                    <Switch
                        disabled={true}
                        defaultChecked={false}
                        label="Disabled off"
                    />
                    <Switch
                        disabled={true}
                        defaultChecked={true}
                        label="Disabled on"
                    />

                    <div
                        style={{
                            marginTop: '16px',
                            marginBottom: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                        }}
                    >
                        Other States:
                    </div>
                    <Switch
                        error={true}
                        checked={states.error}
                        onChange={(checked) =>
                            setStates((prev) => ({ ...prev, error: checked }))
                        }
                        label="Error state"
                    />
                    <Switch
                        required={true}
                        checked={states.required}
                        onChange={(checked) =>
                            setStates((prev) => ({
                                ...prev,
                                required: checked,
                            }))
                        }
                        label="Required field"
                    />
                </div>
            )
        }
        return <SwitchStatesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Different switch states: interactive toggles, disabled variants, error states, and required fields.',
            },
        },
    },
}

// Controlled switch
export const ControlledSwitch: Story = {
    render: () => {
        const ControlledSwitchComponent = () => {
            const [isEnabled, setIsEnabled] = useState(false)

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Switch
                        checked={isEnabled}
                        onChange={setIsEnabled}
                        size={SwitchSize.MEDIUM}
                        label="Dark mode"
                        subtext="Toggle between light and dark themes"
                    />
                    <div style={{ fontSize: '14px', color: '#666' }}>
                        Current mode: {isEnabled ? 'Dark' : 'Light'}
                    </div>
                </div>
            )
        }
        return <ControlledSwitchComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled switch with state management and visual feedback.',
            },
        },
    },
}

// Switch with subtext
export const WithSubtext: Story = {
    render: () => {
        const WithSubtextComponent = () => {
            const [subtextStates, setSubtextStates] = useState({
                notifications: true,
                sync: false,
                privacy: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <Switch
                        size={SwitchSize.MEDIUM}
                        label="Push notifications"
                        subtext="Get notified about important updates and messages"
                        checked={subtextStates.notifications}
                        onChange={(checked) =>
                            setSubtextStates((prev) => ({
                                ...prev,
                                notifications: checked,
                            }))
                        }
                    />
                    <Switch
                        size={SwitchSize.SMALL}
                        label="Auto-sync data"
                        subtext="Automatically sync your data across all devices"
                        checked={subtextStates.sync}
                        onChange={(checked) =>
                            setSubtextStates((prev) => ({
                                ...prev,
                                sync: checked,
                            }))
                        }
                    />
                    <Switch
                        error={true}
                        label="Enhanced privacy"
                        subtext="This setting requires premium subscription"
                        checked={subtextStates.privacy}
                        onChange={(checked) =>
                            setSubtextStates((prev) => ({
                                ...prev,
                                privacy: checked,
                            }))
                        }
                    />
                </div>
            )
        }
        return <WithSubtextComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switches with additional descriptive subtext. Click to toggle each switch.',
            },
        },
    },
}

export const WithSlots: Story = {
    render: () => {
        const WithSlotsComponent = () => {
            const [slotStates, setSlotStates] = useState({
                wifi: true,
                bluetooth: false,
                premium: true,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Switch
                        size={SwitchSize.MEDIUM}
                        label="Wi-Fi"
                        slot={
                            <Wifi
                                size={16}
                                color={slotStates.wifi ? '#10b981' : '#6b7280'}
                            />
                        }
                        subtext="Connect to wireless networks"
                        checked={slotStates.wifi}
                        onChange={(checked) =>
                            setSlotStates((prev) => ({
                                ...prev,
                                wifi: checked,
                            }))
                        }
                    />
                    <Switch
                        size={SwitchSize.MEDIUM}
                        label="Bluetooth"
                        slot={
                            <Bluetooth
                                size={16}
                                color={
                                    slotStates.bluetooth ? '#3b82f6' : '#6b7280'
                                }
                            />
                        }
                        subtext="Connect to Bluetooth devices"
                        checked={slotStates.bluetooth}
                        onChange={(checked) =>
                            setSlotStates((prev) => ({
                                ...prev,
                                bluetooth: checked,
                            }))
                        }
                    />
                    <Switch
                        size={SwitchSize.MEDIUM}
                        label="Premium features"
                        slot={
                            <Star
                                size={16}
                                color={
                                    slotStates.premium ? '#fbbf24' : '#6b7280'
                                }
                            />
                        }
                        subtext="Access advanced functionality"
                        checked={slotStates.premium}
                        onChange={(checked) =>
                            setSlotStates((prev) => ({
                                ...prev,
                                premium: checked,
                            }))
                        }
                    />
                </div>
            )
        }
        return <WithSlotsComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switches with custom content slots (icons) for visual enhancement. Click to toggle each switch.',
            },
        },
    },
}

// Error and validation states
export const ErrorAndValidation: Story = {
    render: () => {
        const ErrorAndValidationComponent = () => {
            const [errorStates, setErrorStates] = useState({
                required: false,
                error: false,
                requiredError: false,
                terms: false,
            })
            const [showError, setShowError] = useState(false)

            const handleSubmit = () => {
                if (!errorStates.terms) {
                    setShowError(true)
                } else {
                    setShowError(false)
                    alert('Terms accepted successfully!')
                }
            }

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Switch
                        required={true}
                        label="Required setting"
                        checked={errorStates.required}
                        onChange={(checked) =>
                            setErrorStates((prev) => ({
                                ...prev,
                                required: checked,
                            }))
                        }
                    />
                    <Switch
                        error={true}
                        label="Error state"
                        checked={errorStates.error}
                        onChange={(checked) =>
                            setErrorStates((prev) => ({
                                ...prev,
                                error: checked,
                            }))
                        }
                    />
                    <Switch
                        required={true}
                        error={true}
                        label="Required with error"
                        checked={errorStates.requiredError}
                        onChange={(checked) =>
                            setErrorStates((prev) => ({
                                ...prev,
                                requiredError: checked,
                            }))
                        }
                    />
                    <Switch
                        required={true}
                        error={showError}
                        label="Accept terms and conditions"
                        subtext={
                            showError
                                ? 'You must accept the terms to continue'
                                : 'Please read our terms of service'
                        }
                        checked={errorStates.terms}
                        onChange={(checked) => {
                            setErrorStates((prev) => ({
                                ...prev,
                                terms: checked,
                            }))
                            if (checked) setShowError(false)
                        }}
                    />

                    <button
                        onClick={handleSubmit}
                        style={{
                            marginTop: '8px',
                            padding: '8px 16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                </div>
            )
        }
        return <ErrorAndValidationComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switches with required indicators, error states, and form validation.',
            },
        },
    },
}

// Switch Group examples
export const SwitchGroupExamples: Story = {
    render: () => {
        const SwitchGroupExamplesComponent = () => {
            const [groupStates, setGroupStates] = useState({
                basicGroup: ['wifi'],
                settingsGroup: ['notifications', 'sync'],
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                    }}
                >
                    <SwitchGroup
                        label="Network Settings"
                        name="network"
                        value={groupStates.basicGroup}
                        onChange={(values) =>
                            setGroupStates((prev) => ({
                                ...prev,
                                basicGroup: values,
                            }))
                        }
                    >
                        <Switch
                            value="wifi"
                            label="Wi-Fi"
                            subtext="Connect to wireless networks"
                            slot={<Wifi size={16} color="#10b981" />}
                        />
                        <Switch
                            value="bluetooth"
                            label="Bluetooth"
                            subtext="Connect to Bluetooth devices"
                            slot={<Bluetooth size={16} color="#3b82f6" />}
                        />
                        <Switch
                            value="cellular"
                            label="Cellular Data"
                            subtext="Use cellular network for internet"
                        />
                    </SwitchGroup>

                    <SwitchGroup
                        label="App Preferences"
                        name="preferences"
                        value={groupStates.settingsGroup}
                        onChange={(values) =>
                            setGroupStates((prev) => ({
                                ...prev,
                                settingsGroup: values,
                            }))
                        }
                    >
                        <Switch
                            value="notifications"
                            label="Push Notifications"
                            subtext="Receive app notifications"
                            slot={<Bell size={16} color="#f59e0b" />}
                        />
                        <Switch
                            value="sync"
                            label="Auto Sync"
                            subtext="Automatically sync data"
                        />
                        <Switch
                            value="analytics"
                            label="Usage Analytics"
                            subtext="Help improve the app"
                        />
                        <Switch
                            value="darkmode"
                            label="Dark Mode"
                            subtext="Use dark theme"
                            slot={<Moon size={16} color="#6366f1" />}
                        />
                    </SwitchGroup>

                    <div
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            padding: '12px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '6px',
                        }}
                    >
                        <strong>Selected values:</strong>
                        <br />
                        Network: {groupStates.basicGroup.join(', ') || 'None'}
                        <br />
                        Preferences:{' '}
                        {groupStates.settingsGroup.join(', ') || 'None'}
                    </div>
                </div>
            )
        }
        return <SwitchGroupExamplesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switch groups for managing multiple related switches with coordinated state. Click to toggle individual switches.',
            },
        },
    },
}

// Uncontrolled switch
export const UncontrolledSwitch: Story = {
    render: () => {
        const UncontrolledSwitchComponent = () => {
            const [uncontrolledStates, setUncontrolledStates] = useState({
                defaultOff: false,
                defaultOn: true,
                selfManaged: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div>
                        <Switch
                            checked={uncontrolledStates.defaultOff}
                            onChange={(checked) =>
                                setUncontrolledStates((prev) => ({
                                    ...prev,
                                    defaultOff: checked,
                                }))
                            }
                            size={SwitchSize.MEDIUM}
                            label={`Started off (now ${uncontrolledStates.defaultOff ? 'on' : 'off'})`}
                        />
                    </div>
                    <div>
                        <Switch
                            checked={uncontrolledStates.defaultOn}
                            onChange={(checked) =>
                                setUncontrolledStates((prev) => ({
                                    ...prev,
                                    defaultOn: checked,
                                }))
                            }
                            size={SwitchSize.MEDIUM}
                            label={`Started on (now ${uncontrolledStates.defaultOn ? 'on' : 'off'})`}
                        />
                    </div>
                    <div>
                        <Switch
                            checked={uncontrolledStates.selfManaged}
                            onChange={(checked) =>
                                setUncontrolledStates((prev) => ({
                                    ...prev,
                                    selfManaged: checked,
                                }))
                            }
                            size={SwitchSize.SMALL}
                            label="Self-managed switch"
                            subtext={`Current state: ${uncontrolledStates.selfManaged ? 'enabled' : 'disabled'}`}
                            slot={
                                <Settings
                                    size={14}
                                    color={
                                        uncontrolledStates.selfManaged
                                            ? '#10b981'
                                            : '#6b7280'
                                    }
                                />
                            }
                        />
                    </div>
                </div>
            )
        }
        return <UncontrolledSwitchComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates switches with different initial states but full interactivity. Click to toggle - the labels show current state values.',
            },
        },
    },
}

export const WithoutLabel: Story = {
    render: () => {
        const WithoutLabelComponent = () => {
            const [noLabelStates, setNoLabelStates] = useState({
                ariaLabel: false,
                ariaLabelWithSubtext: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Switch
                        checked={noLabelStates.ariaLabel}
                        onChange={(checked) =>
                            setNoLabelStates((prev) => ({
                                ...prev,
                                ariaLabel: checked,
                            }))
                        }
                        aria-label="Enable dark mode"
                    />
                    <Switch
                        checked={noLabelStates.ariaLabelWithSubtext}
                        onChange={(checked) =>
                            setNoLabelStates((prev) => ({
                                ...prev,
                                ariaLabelWithSubtext: checked,
                            }))
                        }
                        subtext="Toggle dark mode on or off"
                        aria-label="Dark mode toggle"
                    />
                </div>
            )
        }
        return <WithoutLabelComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switches without visible labels, using aria-label for accessibility. Useful for compact UIs where space is limited.',
            },
        },
    },
}

export const TextTruncation: Story = {
    render: () => {
        const TextTruncationComponent = () => {
            const [truncationStates, setTruncationStates] = useState({
                longLabel: false,
                longSubtext: false,
                both: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxWidth: '300px',
                    }}
                >
                    <Switch
                        checked={truncationStates.longLabel}
                        onChange={(checked) =>
                            setTruncationStates((prev) => ({
                                ...prev,
                                longLabel: checked,
                            }))
                        }
                        label="This is a very long label that will be truncated when it exceeds the maximum length"
                        maxLength={{ label: 30 }}
                    />
                    <Switch
                        checked={truncationStates.longSubtext}
                        onChange={(checked) =>
                            setTruncationStates((prev) => ({
                                ...prev,
                                longSubtext: checked,
                            }))
                        }
                        label="Switch with long subtext"
                        subtext="This is a very long subtext description that will be truncated when it exceeds the maximum length specified in the maxLength prop"
                        maxLength={{ subtext: 50 }}
                    />
                    <Switch
                        checked={truncationStates.both}
                        onChange={(checked) =>
                            setTruncationStates((prev) => ({
                                ...prev,
                                both: checked,
                            }))
                        }
                        label="Both label and subtext truncated"
                        subtext="This subtext will also be truncated along with the label above"
                        maxLength={{ label: 25, subtext: 40 }}
                    />
                </div>
            )
        }
        return <TextTruncationComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switches with text truncation using maxLength prop. Hover over truncated text to see full content in tooltip.',
            },
        },
    },
}

export const CombinedStates: Story = {
    render: () => {
        const CombinedStatesComponent = () => {
            const [combinedStates, setCombinedStates] = useState({
                disabledError: false,
                disabledRequired: false,
                errorRequired: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Switch
                        disabled={true}
                        error={true}
                        checked={combinedStates.disabledError}
                        onChange={(checked) =>
                            setCombinedStates((prev) => ({
                                ...prev,
                                disabledError: checked,
                            }))
                        }
                        label="Disabled with error"
                        subtext="This switch is disabled and has an error state"
                    />
                    <Switch
                        disabled={true}
                        required={true}
                        checked={combinedStates.disabledRequired}
                        onChange={(checked) =>
                            setCombinedStates((prev) => ({
                                ...prev,
                                disabledRequired: checked,
                            }))
                        }
                        label="Disabled and required"
                        subtext="This switch is disabled but still marked as required"
                    />
                    <Switch
                        error={true}
                        required={true}
                        checked={combinedStates.errorRequired}
                        onChange={(checked) =>
                            setCombinedStates((prev) => ({
                                ...prev,
                                errorRequired: checked,
                            }))
                        }
                        label="Error and required"
                        subtext="This switch has both error and required states"
                    />
                </div>
            )
        }
        return <CombinedStatesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switches with combined states: disabled + error, disabled + required, and error + required.',
            },
        },
    },
}

export const SwitchGroupWithStates: Story = {
    render: () => {
        const SwitchGroupWithStatesComponent = () => {
            const [groupStates, setGroupStates] = useState({
                errorGroup: ['option1'],
                requiredGroup: ['option2'],
                disabledGroup: ['option1'],
                mixedSizes: ['small'],
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                    }}
                >
                    <SwitchGroup
                        label="Settings Group"
                        name="error-group"
                        value={groupStates.errorGroup}
                        onChange={(values) =>
                            setGroupStates((prev) => ({
                                ...prev,
                                errorGroup: values,
                            }))
                        }
                    >
                        <Switch value="option1" label="Option 1" error={true} />
                        <Switch value="option2" label="Option 2" />
                        <Switch value="option3" label="Option 3" />
                    </SwitchGroup>

                    <SwitchGroup
                        label="Required Settings"
                        name="required-group"
                        value={groupStates.requiredGroup}
                        onChange={(values) =>
                            setGroupStates((prev) => ({
                                ...prev,
                                requiredGroup: values,
                            }))
                        }
                    >
                        <Switch
                            value="option1"
                            label="Option 1"
                            required={true}
                        />
                        <Switch
                            value="option2"
                            label="Option 2"
                            required={true}
                        />
                        <Switch value="option3" label="Option 3" />
                    </SwitchGroup>

                    <SwitchGroup
                        label="Disabled Group"
                        name="disabled-group"
                        value={groupStates.disabledGroup}
                        onChange={(values) =>
                            setGroupStates((prev) => ({
                                ...prev,
                                disabledGroup: values,
                            }))
                        }
                        disabled={true}
                    >
                        <Switch value="option1" label="Option 1" />
                        <Switch value="option2" label="Option 2" />
                        <Switch value="option3" label="Option 3" />
                    </SwitchGroup>

                    <SwitchGroup
                        label="Mixed Sizes"
                        name="mixed-sizes"
                        value={groupStates.mixedSizes}
                        onChange={(values) =>
                            setGroupStates((prev) => ({
                                ...prev,
                                mixedSizes: values,
                            }))
                        }
                    >
                        <Switch
                            value="small"
                            size={SwitchSize.SMALL}
                            label="Small switch"
                        />
                        <Switch
                            value="medium"
                            size={SwitchSize.MEDIUM}
                            label="Medium switch"
                        />
                    </SwitchGroup>
                </div>
            )
        }
        return <SwitchGroupWithStatesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switch groups with error, required, disabled states, and mixed sizes.',
            },
        },
    },
}

export const FormIntegration: Story = {
    render: () => {
        const FormIntegrationComponent = () => {
            const [formData, setFormData] = useState({
                notifications: false,
                marketing: false,
                analytics: true,
            })

            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const formDataObj = new FormData(form)
                const values: Record<string, string> = {}
                formDataObj.forEach((value, key) => {
                    values[key] = value as string
                })
                alert(
                    `Form submitted with values: ${JSON.stringify(values, null, 2)}`
                )
            }

            return (
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            padding: '20px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            maxWidth: '400px',
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: '600',
                            }}
                        >
                            Notification Preferences
                        </h3>

                        <Switch
                            name="notifications"
                            value="enabled"
                            checked={formData.notifications}
                            onChange={(checked) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    notifications: checked,
                                }))
                            }
                            label="Email Notifications"
                            subtext="Receive email updates about your account"
                        />

                        <Switch
                            name="marketing"
                            value="enabled"
                            checked={formData.marketing}
                            onChange={(checked) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    marketing: checked,
                                }))
                            }
                            label="Marketing Emails"
                            subtext="Receive promotional content and offers"
                        />

                        <Switch
                            name="analytics"
                            value="enabled"
                            checked={formData.analytics}
                            onChange={(checked) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    analytics: checked,
                                }))
                            }
                            label="Usage Analytics"
                            subtext="Help us improve by sharing usage data"
                        />

                        <button
                            type="submit"
                            style={{
                                marginTop: '16px',
                                padding: '10px 20px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Save Preferences
                        </button>
                    </div>
                </form>
            )
        }
        return <FormIntegrationComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Switch components integrated into a form with name and value attributes for form submission.',
            },
        },
    },
}

export const Interactive: Story = {
    render: function InteractiveSwitch(args: Story['args']) {
        const [checked, setChecked] = useState(args?.defaultChecked || false)

        return (
            <Switch
                {...args}
                checked={checked}
                onChange={(newChecked) => setChecked(newChecked)}
                slot={getSlotContent(args?.slot)}
            />
        )
    },
    args: {
        label: 'Interactive switch playground',
        size: SwitchSize.MEDIUM,
        defaultChecked: false,
        disabled: false,
        required: false,
        error: false,
        subtext: 'Customize all props using controls',
        id: 'interactive-switch',
        value: 'interactive-value',
        name: 'interactive-group',
        slot: 'none',
    },
    parameters: {
        a11y: getA11yConfig('interactive'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
        docs: {
            description: {
                story: 'Interactive playground to test all switch props and combinations. Use the controls panel to modify any property.',
            },
        },
    },
}
