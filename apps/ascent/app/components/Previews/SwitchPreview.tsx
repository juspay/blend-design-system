'use client'
import { Switch, SwitchGroup, SwitchSize } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from './ComponentPreview'

const SwitchPreview = () => {
    const [notifications, setNotifications] = useState(false)
    const [darkMode, setDarkMode] = useState(true)
    const [autoSave, setAutoSave] = useState(true)
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
        'feature1',
        'feature3',
    ])
    const [emailSettings, setEmailSettings] = useState<string[]>([
        'marketing',
        'updates',
    ])

    const tsCode = `import { Switch, SwitchGroup, SwitchSize } from "@juspay/blend-design-system";

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      checked={isEnabled}
      onChange={setIsEnabled}
      label="Enable notifications"
      size={SwitchSize.MEDIUM}
    />
  );
}`

    const reCode = `type switchSize = [#sm | #md]

@react.component
let make = (
  ~id: option<string>=?,
  ~checked: option<bool>=?,
  ~defaultChecked: option<bool>=?,
  ~onChange: option<bool => unit>=?,
  ~disabled: option<bool>=?,
  ~required: option<bool>=?,
  ~error: option<bool>=?,
  ~size: option<switchSize>=?,
  ~label: option<React.element>=?,
  ~subtext: option<React.element>=?,
  ~slot: option<React.element>=?,
  ~name: option<string>=?,
  ~value: option<string>=?,
) => {
  <SwitchBinding
    ?id
    ?checked
    ?defaultChecked
    ?onChange
    ?disabled
    ?required
    ?error
    ?size
    ?label
    ?subtext
    ?slot
    ?name
    ?value
  />
}

@react.component
let makeGroup = (
  ~id: option<string>=?,
  ~label: option<string>=?,
  ~name: option<string>=?,
  ~children: React.element,
  ~disabled: option<bool>=?,
  ~value: option<array<string>>=?,
  ~defaultValue: option<array<string>>=?,
  ~onChange: option<array<string> => unit>=?,
) => {
  <SwitchGroupBinding
    ?id
    ?label
    ?name
    children
    ?disabled
    ?value
    ?defaultValue
    ?onChange
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~id: string=?,
  ~checked: bool=?,
  ~defaultChecked: bool=?,
  ~onChange: bool => unit=?,
  ~disabled: bool=?,
  ~required: bool=?,
  ~error: bool=?,
  ~size: [#sm | #md]=?,
  ~label: React.element=?,
  ~subtext: React.element=?,
  ~slot: React.element=?,
  ~name: string=?,
  ~value: string=?,
) => React.element = "Switch"

@module("@juspay/blend-design-system") @react.component
external makeGroup: (
  ~id: string=?,
  ~label: string=?,
  ~name: string=?,
  ~children: React.element,
  ~disabled: bool=?,
  ~value: array<string>=?,
  ~defaultValue: array<string>=?,
  ~onChange: array<string> => unit=?,
) => React.element = "SwitchGroup"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="m-4 min-w-100 space-y-8">
                {/* Basic Switch */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Switch</h3>
                    <Switch
                        checked={notifications}
                        onChange={setNotifications}
                        label="Enable notifications"
                    />
                </div>

                {/* Switch with Subtext */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Switch with Subtext
                    </h3>
                    <Switch
                        checked={darkMode}
                        onChange={setDarkMode}
                        label="Dark mode"
                        subtext="Use dark theme for better viewing in low light"
                    />
                </div>

                {/* Switch with Slot */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Switch with Slot
                    </h3>
                    <Switch
                        checked={autoSave}
                        onChange={setAutoSave}
                        label="Auto save"
                        slot={
                            <span className="text-green-500 text-sm">
                                Recommended
                            </span>
                        }
                    />
                </div>

                {/* Different Sizes */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Switch Sizes</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">Small Size</h4>
                            <Switch
                                checked={notifications}
                                onChange={setNotifications}
                                label="Small switch"
                                size={SwitchSize.SMALL}
                            />
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">
                                Medium Size (Default)
                            </h4>
                            <Switch
                                checked={notifications}
                                onChange={setNotifications}
                                label="Medium switch"
                                size={SwitchSize.MEDIUM}
                            />
                        </div>
                    </div>
                </div>

                {/* Switch States */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Switch States
                    </h3>
                    <div className="space-y-4">
                        <Switch
                            checked={true}
                            onChange={() => {}}
                            label="Normal state (checked)"
                        />

                        <Switch
                            checked={false}
                            onChange={() => {}}
                            label="Normal state (unchecked)"
                        />

                        <Switch
                            checked={true}
                            onChange={() => {}}
                            label="Required field"
                            required={true}
                        />

                        <Switch
                            checked={false}
                            onChange={() => {}}
                            label="Disabled switch"
                            disabled={true}
                        />

                        <Switch
                            checked={true}
                            onChange={() => {}}
                            label="Error state"
                            error={true}
                        />
                    </div>
                </div>

                {/* Switch Group */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Switch Group</h3>
                    <SwitchGroup
                        label="Feature toggles"
                        value={selectedFeatures}
                        onChange={setSelectedFeatures}
                    >
                        <Switch
                            value="feature1"
                            label="Real-time updates"
                            subtext="Get instant notifications when data changes"
                        />
                        <Switch
                            value="feature2"
                            label="Advanced analytics"
                            subtext="Access detailed performance metrics"
                        />
                        <Switch
                            value="feature3"
                            label="Dark mode"
                            subtext="Switch to dark theme"
                        />
                        <Switch
                            value="feature4"
                            label="Auto-sync"
                            subtext="Automatically sync data across devices"
                        />
                    </SwitchGroup>
                </div>

                {/* Complex Form Example */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Complex Form Example
                    </h3>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">
                            Email Preferences
                        </h4>

                        <SwitchGroup
                            label="Email notifications"
                            value={emailSettings}
                            onChange={setEmailSettings}
                        >
                            <Switch
                                value="marketing"
                                label="Marketing emails"
                                subtext="Receive promotional offers and updates"
                                slot={
                                    <span className="text-blue-500 text-sm">
                                        Weekly
                                    </span>
                                }
                            />

                            <Switch
                                value="updates"
                                label="Product updates"
                                subtext="Get notified about new features and improvements"
                                slot={
                                    <span className="text-green-500 text-sm">
                                        Important
                                    </span>
                                }
                            />

                            <Switch
                                value="security"
                                label="Security alerts"
                                subtext="Critical security notifications"
                                slot={
                                    <span className="text-red-500 text-sm">
                                        Critical
                                    </span>
                                }
                            />

                            <Switch
                                value="newsletter"
                                label="Newsletter"
                                subtext="Monthly newsletter with industry insights"
                            />
                        </SwitchGroup>
                    </div>
                </div>

                {/* Disabled Switch Group */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Disabled Switch Group
                    </h3>
                    <SwitchGroup
                        label="Disabled Options"
                        value={selectedFeatures}
                        onChange={setSelectedFeatures}
                        disabled={true}
                    >
                        <Switch
                            value="feature1"
                            label="Feature 1"
                            subtext="This feature is currently unavailable"
                        />
                        <Switch
                            value="feature2"
                            label="Feature 2"
                            subtext="Coming soon"
                        />
                        <Switch
                            value="feature3"
                            label="Feature 3"
                            subtext="Under maintenance"
                        />
                    </SwitchGroup>
                </div>

                {/* Individual Switches */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Individual Switches
                    </h3>
                    <div className="space-y-4">
                        <Switch
                            checked={notifications}
                            onChange={setNotifications}
                            label="Individual switch 1"
                            subtext="This is an individual switch control"
                        />

                        <Switch
                            checked={darkMode}
                            onChange={setDarkMode}
                            label="Individual switch 2"
                            slot={
                                <span className="text-purple-500 text-sm">
                                    Beta
                                </span>
                            }
                        />
                    </div>
                </div>

                {/* Controlled vs Uncontrolled */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Controlled vs Uncontrolled
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">
                                Controlled Switch
                            </h4>
                            <Switch
                                checked={notifications}
                                onChange={setNotifications}
                                label="Controlled switch"
                            />
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">
                                Uncontrolled Switch
                            </h4>
                            <Switch
                                defaultChecked={true}
                                label="Uncontrolled switch"
                            />
                        </div>
                    </div>
                </div>

                {/* Switch with Different Content */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Switch with Different Content
                    </h3>
                    <div className="space-y-4">
                        <Switch
                            checked={true}
                            onChange={() => {}}
                            label="Switch with icon"
                            slot={<span>🔔</span>}
                        />

                        <Switch
                            checked={false}
                            onChange={() => {}}
                            label="Switch with badge"
                            slot={
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    New
                                </span>
                            }
                        />

                        <Switch
                            checked={true}
                            onChange={() => {}}
                            label="Switch with status"
                            slot={
                                <span className="text-green-500 text-sm">
                                    Active
                                </span>
                            }
                            subtext="This feature is currently enabled"
                        />
                    </div>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default SwitchPreview
