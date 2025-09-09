import { Info, Settings, Star, Hash, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import {
    KeyValuePair,
    KeyValuePairSize,
    KeyValuePairStateType,
} from '../../../../packages/blend/lib/components/KeyValuePair'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'

const KeyValuePairDemo = () => {
    // Playground state
    const [playgroundKey, setPlaygroundKey] = useState('A very long Key')
    const [playgroundValue, setPlaygroundValue] = useState('Value')
    const [playgroundSize, setPlaygroundSize] = useState<KeyValuePairSize>(
        KeyValuePairSize.MEDIUM
    )
    const [playgroundState, setPlaygroundState] =
        useState<KeyValuePairStateType>(KeyValuePairStateType.vertical)
    const [showKeySlot, setShowKeySlot] = useState(false)
    const [showValueLeftSlot, setShowValueLeftSlot] = useState(false)
    const [showValueRightSlot, setShowValueRightSlot] = useState(false)

    // Options for selects
    const sizeOptions = [
        { value: KeyValuePairSize.SMALL as string, label: 'Small' },
        { value: KeyValuePairSize.MEDIUM as string, label: 'Medium' },
        { value: KeyValuePairSize.LARGE as string, label: 'Large' },
    ]

    const stateOptions = [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 ${playgroundState === KeyValuePairStateType.vertical ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}
                    >
                        <TextInput
                            label="Key String"
                            value={playgroundKey}
                            onChange={(e) => setPlaygroundKey(e.target.value)}
                            placeholder="Enter key text"
                        />

                        <TextInput
                            label="Value"
                            value={playgroundValue}
                            onChange={(e) => setPlaygroundValue(e.target.value)}
                            placeholder="Enter value text"
                        />

                        {playgroundState === KeyValuePairStateType.vertical && (
                            <SingleSelect
                                label="Size"
                                items={[{ items: sizeOptions }]}
                                selected={playgroundSize}
                                onSelect={(value) =>
                                    setPlaygroundSize(value as KeyValuePairSize)
                                }
                                placeholder="Select size"
                            />
                        )}

                        <SingleSelect
                            label="State"
                            items={[{ items: stateOptions }]}
                            selected={
                                playgroundState ===
                                KeyValuePairStateType.vertical
                                    ? 'vertical'
                                    : 'horizontal'
                            }
                            onSelect={(value) =>
                                setPlaygroundState(
                                    value === 'vertical'
                                        ? KeyValuePairStateType.vertical
                                        : KeyValuePairStateType.horizontal
                                )
                            }
                            placeholder="Select state"
                        />
                    </div>

                    {playgroundState === KeyValuePairStateType.horizontal && (
                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-gray-100">
                            <strong>Note:</strong> Horizontal orientation uses a
                            fixed font size for the value, regardless of the
                            size prop.
                        </div>
                    )}

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Key Slot"
                            checked={showKeySlot}
                            onChange={() => setShowKeySlot(!showKeySlot)}
                        />
                        <Switch
                            label="Value Left Slot"
                            checked={showValueLeftSlot}
                            onChange={() =>
                                setShowValueLeftSlot(!showValueLeftSlot)
                            }
                        />
                        <Switch
                            label="Value Right Slot"
                            checked={showValueRightSlot}
                            onChange={() =>
                                setShowValueRightSlot(!showValueRightSlot)
                            }
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-gray-50">
                        <KeyValuePair
                            keyString={playgroundKey}
                            value={playgroundValue}
                            size={playgroundSize}
                            keyValuePairState={playgroundState}
                            keySlot={
                                showKeySlot ? <Info size={16} /> : undefined
                            }
                            valueLeftSlot={
                                showValueLeftSlot ? (
                                    <Star size={16} />
                                ) : undefined
                            }
                            valueRightSlot={
                                showValueRightSlot ? (
                                    <ArrowRight size={16} />
                                ) : undefined
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Sizes Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="space-y-8">
                    {/* Vertical Orientation */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Vertical</h3>
                        <p className="text-sm text-gray-600">
                            Vertical Key Value Pair that has 3 different sizes
                            (sm, md, lg)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.values(KeyValuePairSize).map((size) => (
                                <div key={size} className="space-y-3">
                                    <h4 className="text-sm font-medium capitalize">
                                        {size}
                                    </h4>
                                    <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                        <KeyValuePair
                                            keyString="A very long Key"
                                            value="Value"
                                            size={size}
                                            keyValuePairState={
                                                KeyValuePairStateType.vertical
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Horizontal Orientation */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Horizontal</h3>
                        <p className="text-sm text-gray-600">
                            Horizontal Key Value Pair that's only have one size
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.values(KeyValuePairSize).map((size) => (
                                <div key={size} className="space-y-3">
                                    <h4 className="text-sm font-medium capitalize">
                                        {size} (Fixed)
                                    </h4>
                                    <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                        <KeyValuePair
                                            keyString="A very long Key"
                                            value="Value"
                                            size={size}
                                            keyValuePairState={
                                                KeyValuePairStateType.horizontal
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* States Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Vertical</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Status"
                                value="Active"
                                keyValuePairState={
                                    KeyValuePairStateType.vertical
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Horizontal</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Status"
                                value="Active"
                                keyValuePairState={
                                    KeyValuePairStateType.horizontal
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* With Slots Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">With Slots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Key Slot Only</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Information"
                                value="Important data"
                                keySlot={<Info size={16} />}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Value Left Slot</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Rating"
                                value="5.0"
                                valueLeftSlot={<Star size={16} />}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Value Right Slot
                        </h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Action"
                                value="Continue"
                                valueRightSlot={<ArrowRight size={16} />}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Multiple Slots</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Settings"
                                value="Configured"
                                keySlot={<Settings size={16} />}
                                valueLeftSlot={<Hash size={16} />}
                                valueRightSlot={<ArrowRight size={16} />}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Horizontal with Slots
                        </h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Status"
                                value="Online"
                                keySlot={<Info size={16} />}
                                valueRightSlot={<ArrowRight size={16} />}
                                keyValuePairState={
                                    KeyValuePairStateType.horizontal
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Truncation Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Text Truncation with Tooltips
                </h2>
                <p className="text-sm text-gray-600">
                    When text exceeds the container width, it gets truncated and
                    shows a tooltip on hover.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Long Key Text</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="This is a very long key that should definitely be truncated"
                                value="Short Value"
                                size={KeyValuePairSize.MEDIUM}
                                maxWidth="150px"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Long Value Text</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Status"
                                value="This is a very long value text that should be truncated and show tooltip"
                                size={KeyValuePairSize.MEDIUM}
                                maxWidth="150px"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Both Long Texts</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Very Long Configuration Setting Name"
                                value="This is an extremely long configuration value that definitely needs truncation"
                                size={KeyValuePairSize.MEDIUM}
                                maxWidth="150px"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Horizontal Long Text
                        </h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Configuration Name"
                                value="Very long configuration value text"
                                keyValuePairState={
                                    KeyValuePairStateType.horizontal
                                }
                                maxWidth="180px"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            With Slots + Long Text
                        </h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="System Configuration Settings"
                                value="Advanced system configuration with multiple parameters"
                                size={KeyValuePairSize.MEDIUM}
                                keySlot={<Settings size={16} />}
                                valueRightSlot={<ArrowRight size={16} />}
                                maxWidth="150px"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Email Example</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Email Address"
                                value="user@verylongdomainname.example.com"
                                size={KeyValuePairSize.SMALL}
                                maxWidth="120px"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Real World Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Real World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">User Profile</h3>
                        <div className="space-y-3 p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Name"
                                value="John Doe"
                                size={KeyValuePairSize.MEDIUM}
                            />
                            <KeyValuePair
                                keyString="Email"
                                value="john@example.com"
                                size={KeyValuePairSize.SMALL}
                            />
                            <KeyValuePair
                                keyString="Role"
                                value="Administrator"
                                size={KeyValuePairSize.SMALL}
                                valueRightSlot={<Settings size={16} />}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Product Details
                        </h3>
                        <div className="space-y-3 p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Price"
                                value="$99.99"
                                size={KeyValuePairSize.LARGE}
                            />
                            <KeyValuePair
                                keyString="Rating"
                                value="4.8"
                                size={KeyValuePairSize.MEDIUM}
                                valueLeftSlot={<Star size={16} />}
                            />
                            <KeyValuePair
                                keyString="In Stock"
                                value="Yes"
                                size={KeyValuePairSize.SMALL}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">System Info</h3>
                        <div className="space-y-3 p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Status"
                                value="Online"
                                keyValuePairState={
                                    KeyValuePairStateType.horizontal
                                }
                                keySlot={<Info size={16} />}
                            />
                            <KeyValuePair
                                keyString="Uptime"
                                value="99.9%"
                                keyValuePairState={
                                    KeyValuePairStateType.horizontal
                                }
                            />
                            <KeyValuePair
                                keyString="Last Updated"
                                value="2 min ago"
                                keyValuePairState={
                                    KeyValuePairStateType.horizontal
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* All Combinations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All Combinations</h2>
                <div className="space-y-8">
                    {[
                        KeyValuePairStateType.vertical,
                        KeyValuePairStateType.horizontal,
                    ].map((state) => (
                        <div key={state} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {state === KeyValuePairStateType.vertical
                                    ? 'Vertical'
                                    : 'Horizontal'}{' '}
                                State
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    KeyValuePairSize.SMALL,
                                    KeyValuePairSize.MEDIUM,
                                    KeyValuePairSize.LARGE,
                                ].map((size) => (
                                    <div key={size} className="space-y-2">
                                        <h4 className="text-xs font-medium capitalize text-gray-600">
                                            {size} Size
                                        </h4>
                                        <div className="space-y-2 p-3 border-gray-100 border rounded bg-gray-50">
                                            <KeyValuePair
                                                keyString="Simple"
                                                value="Value"
                                                size={size}
                                                keyValuePairState={state}
                                            />
                                            <KeyValuePair
                                                keyString="With Icon"
                                                value="Data"
                                                size={size}
                                                keyValuePairState={state}
                                                keySlot={<Info size={16} />}
                                            />
                                            <KeyValuePair
                                                keyString="Full"
                                                value="Complete"
                                                size={size}
                                                keyValuePairState={state}
                                                keySlot={<Settings size={16} />}
                                                valueRightSlot={
                                                    <ArrowRight size={16} />
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KeyValuePairDemo
