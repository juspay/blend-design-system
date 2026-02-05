import { Info, Settings, Star, Hash, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import {
    KeyValuePair,
    KeyValuePairSize,
    KeyValuePairStateType,
    TextOverflowMode,
} from '../../../../packages/blend/lib/components/KeyValuePair'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'

const KeyValuePairDemo = () => {
    // Playground state
    const [playgroundKey, setPlaygroundKey] = useState('A very long Key')
    const [playgroundValue, setPlaygroundValue] = useState(
        'This is a very long value that demonstrates text overflow behavior'
    )
    const [playgroundSize, setPlaygroundSize] = useState<KeyValuePairSize>(
        KeyValuePairSize.MEDIUM
    )
    const [playgroundState, setPlaygroundState] =
        useState<KeyValuePairStateType>(KeyValuePairStateType.horizontal)
    const [showKeySlot, setShowKeySlot] = useState(false)
    const [showValueLeftSlot, setShowValueLeftSlot] = useState(false)
    const [showValueRightSlot, setShowValueRightSlot] = useState(false)
    const [textOverflow, setTextOverflow] =
        useState<TextOverflowMode>('truncate')
    const [maxLines, setMaxLines] = useState(2)
    const [showTooltip, setShowTooltip] = useState(true)

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

    const textOverflowOptions = [
        { value: 'truncate', label: 'Truncate' },
        { value: 'wrap', label: 'Wrap' },
        { value: 'wrap-clamp', label: 'Wrap-Clamp' },
    ]

    const maxLinesOptions = [
        { value: '1', label: '1 Line' },
        { value: '2', label: '2 Lines' },
        { value: '3', label: '3 Lines' },
        { value: '4', label: '4 Lines' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                        <SingleSelect
                            label="Text Overflow"
                            items={[{ items: textOverflowOptions }]}
                            selected={textOverflow}
                            onSelect={(value) =>
                                setTextOverflow(value as TextOverflowMode)
                            }
                            placeholder="Select overflow mode"
                        />

                        {textOverflow === 'wrap-clamp' && (
                            <SingleSelect
                                label="Max Lines"
                                items={[{ items: maxLinesOptions }]}
                                selected={maxLines.toString()}
                                onSelect={(value) =>
                                    setMaxLines(parseInt(value))
                                }
                                placeholder="Select max lines"
                            />
                        )}
                    </div>

                    {playgroundState === KeyValuePairStateType.horizontal && (
                        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-gray-100">
                            <strong>Note:</strong> Horizontal orientation uses a
                            fixed font size for the value, regardless of the
                            size prop.
                        </div>
                    )}

                    <div className="flex items-center gap-6 flex-wrap">
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
                        <Switch
                            label="Show Tooltip"
                            checked={showTooltip}
                            onChange={() => setShowTooltip(!showTooltip)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-gray-50">
                        <KeyValuePair
                            keyString={playgroundKey}
                            value={playgroundValue}
                            size={playgroundSize}
                            keyValuePairState={playgroundState}
                            textOverflow={textOverflow}
                            maxLines={maxLines}
                            showTooltipOnTruncate={showTooltip}
                            maxWidth="300px"
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

            {/* Key Wrapping Behavior */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Key Wrapping Behavior</h2>
                <p className="text-sm text-gray-600">
                    Keys always wrap to new lines when needed to ensure full
                    visibility. Values can be truncated, wrapped, or clamped
                    based on the textOverflow setting.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Short Key</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Status"
                                value="Active"
                                size={KeyValuePairSize.MEDIUM}
                                maxWidth="150px"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">Medium Key</h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Configuration Setting"
                                value="Enabled"
                                size={KeyValuePairSize.MEDIUM}
                                maxWidth="150px"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Long Key (Wraps)
                        </h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Very Long Configuration Setting Name"
                                value="Value"
                                size={KeyValuePairSize.MEDIUM}
                                maxWidth="150px"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Truncation Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Value Text Overflow Options
                </h2>
                <p className="text-sm text-gray-600">
                    Values can be truncated, wrapped, or clamped based on the
                    textOverflow setting.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium">
                            Long Key Text (Wraps)
                        </h3>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="This is a very long key that will wrap to multiple lines"
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
                                keyString="Very Long Configuration Setting Name That Will Wrap"
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

            {/* Text Overflow Modes Section - NEW */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Text Overflow Modes</h2>
                <p className="text-sm text-gray-600">
                    Choose how text should behave when it exceeds the container
                    width. This is especially useful for grid layouts where you
                    want to prevent overlapping.
                </p>

                {/* Truncate Mode (Default) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                            Truncate (Default)
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            textOverflow="truncate"
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Single line with ellipsis (...). Hover to see full text
                        in tooltip.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Description"
                                value="This is a very long description that will be truncated with ellipsis when it exceeds the maximum width"
                                textOverflow="truncate"
                                maxWidth="200px"
                            />
                        </div>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Email Address"
                                value="user@verylongdomainname.example.com"
                                textOverflow="truncate"
                                maxWidth="200px"
                            />
                        </div>
                        <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                            <KeyValuePair
                                keyString="Configuration Setting Name"
                                value="Advanced configuration value"
                                textOverflow="truncate"
                                maxWidth="200px"
                                keySlot={<Settings size={16} />}
                            />
                        </div>
                    </div>
                </div>

                {/* Wrap Mode */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">Wrap</h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            textOverflow="wrap"
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Allow natural text wrapping to multiple lines. Perfect
                        for grid layouts to prevent overlapping. No tooltips
                        needed as full text is always visible.
                    </p>

                    {/* Basic Wrapping Examples */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Basic Examples</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Description"
                                    value="This is a very long description that will wrap to multiple lines instead of being truncated"
                                    textOverflow="wrap"
                                    maxWidth="200px"
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Email Address"
                                    value="user@verylongdomainname.example.com"
                                    textOverflow="wrap"
                                    maxWidth="200px"
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Configuration Setting Name"
                                    value="Advanced configuration value that wraps"
                                    textOverflow="wrap"
                                    maxWidth="200px"
                                    keySlot={<Settings size={16} />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Long Content Wrapping */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                            Long Content Wrapping
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Full Address"
                                    value="1234 Very Long Street Name, Building A, Suite 567, City Name, State 12345, Country"
                                    textOverflow="wrap"
                                    maxWidth="250px"
                                    size={KeyValuePairSize.SMALL}
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Error Message"
                                    value="The requested operation could not be completed because the server encountered an unexpected error. Please try again later."
                                    textOverflow="wrap"
                                    maxWidth="250px"
                                    size={KeyValuePairSize.SMALL}
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Product Description"
                                    value="High-quality premium product with advanced features including automatic updates, cloud synchronization, and 24/7 customer support"
                                    textOverflow="wrap"
                                    maxWidth="250px"
                                    size={KeyValuePairSize.MEDIUM}
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Technical Specifications"
                                    value="Processor: Intel Core i7-12700K, RAM: 32GB DDR5, Storage: 1TB NVMe SSD, Graphics: NVIDIA RTX 4070"
                                    textOverflow="wrap"
                                    maxWidth="250px"
                                    size={KeyValuePairSize.SMALL}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Horizontal State with Wrapping */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                            Horizontal State with Wrapping
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Status Message"
                                    value="System is currently running and all services are operational"
                                    textOverflow="wrap"
                                    keyValuePairState={
                                        KeyValuePairStateType.horizontal
                                    }
                                    maxWidth="300px"
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Current Location"
                                    value="San Francisco, California, United States of America"
                                    textOverflow="wrap"
                                    keyValuePairState={
                                        KeyValuePairStateType.horizontal
                                    }
                                    maxWidth="300px"
                                    keySlot={<Info size={16} />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Different Width Demonstrations */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                            Same Text, Different Widths
                        </h4>
                        <p className="text-xs text-gray-500">
                            Shows how text wraps differently based on maxWidth
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <h5 className="text-xs text-gray-500 mb-2">
                                    maxWidth: 150px
                                </h5>
                                <KeyValuePair
                                    keyString="Comment"
                                    value="This feature request has been reviewed and approved for the next release cycle"
                                    textOverflow="wrap"
                                    maxWidth="150px"
                                    size={KeyValuePairSize.SMALL}
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <h5 className="text-xs text-gray-500 mb-2">
                                    maxWidth: 200px
                                </h5>
                                <KeyValuePair
                                    keyString="Comment"
                                    value="This feature request has been reviewed and approved for the next release cycle"
                                    textOverflow="wrap"
                                    maxWidth="200px"
                                    size={KeyValuePairSize.SMALL}
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <h5 className="text-xs text-gray-500 mb-2">
                                    maxWidth: 250px
                                </h5>
                                <KeyValuePair
                                    keyString="Comment"
                                    value="This feature request has been reviewed and approved for the next release cycle"
                                    textOverflow="wrap"
                                    maxWidth="250px"
                                    size={KeyValuePairSize.SMALL}
                                />
                            </div>
                        </div>
                    </div>

                    {/* With Slots and Wrapping */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                            With Slots and Wrapping
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Important Notification"
                                    value="Your subscription will be renewed automatically on the next billing date unless you cancel before then"
                                    textOverflow="wrap"
                                    maxWidth="250px"
                                    keySlot={<Info size={16} />}
                                    valueRightSlot={<ArrowRight size={16} />}
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Customer Review"
                                    value="Excellent product with great customer service. Highly recommended for professional use!"
                                    textOverflow="wrap"
                                    maxWidth="250px"
                                    valueLeftSlot={<Star size={16} />}
                                    size={KeyValuePairSize.MEDIUM}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wrap-Clamp Mode */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                            Wrap with Clamp
                        </h3>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            textOverflow="wrap-clamp"
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Wrap to a limited number of lines, then show ellipsis.
                        Best of both worlds - shows more text but keeps height
                        controlled.
                    </p>
                    <div className="text-xs text-gray-600 bg-purple-50 p-3 rounded-lg border border-purple-100">
                        <strong>Browser Support:</strong> Supported in Chrome,
                        Edge, Safari, and Firefox 68+. Older browsers will show
                        natural wrapping without line limit (graceful
                        degradation).
                    </div>

                    {/* 2 Lines Example */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                            2 Lines (maxLines=2)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Description"
                                    value="This is a very long description that will wrap up to 2 lines and then show ellipsis if there's more content"
                                    textOverflow="wrap-clamp"
                                    maxLines={2}
                                    maxWidth="200px"
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Notes"
                                    value="Multi-line notes with controlled height using line clamping feature"
                                    textOverflow="wrap-clamp"
                                    maxLines={2}
                                    maxWidth="200px"
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Address"
                                    value="1234 Very Long Street Name, Building A, Suite 567, City Name, State 12345"
                                    textOverflow="wrap-clamp"
                                    maxLines={2}
                                    maxWidth="200px"
                                    valueLeftSlot={<Info size={16} />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3 Lines Example */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                            3 Lines (maxLines=3)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Description"
                                    value="This is an even longer description that will wrap up to 3 lines before showing ellipsis. This gives more room for content while still maintaining a controlled height."
                                    textOverflow="wrap-clamp"
                                    maxLines={3}
                                    maxWidth="200px"
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Bio"
                                    value="Senior Software Engineer with 10+ years of experience in full-stack development, specializing in React, TypeScript, and Node.js technologies."
                                    textOverflow="wrap-clamp"
                                    maxLines={3}
                                    maxWidth="200px"
                                />
                            </div>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Comments"
                                    value="This feature request has been reviewed by the team and we've decided to implement it in the next sprint cycle after proper planning."
                                    textOverflow="wrap-clamp"
                                    maxLines={3}
                                    maxWidth="200px"
                                    keySlot={<Hash size={16} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Layout Comparison */}
                <div className="space-y-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                            Grid Layout Comparison
                        </h3>
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                            Solving the overlap issue
                        </span>
                    </div>
                    <p className="text-sm text-gray-700">
                        When using KeyValuePair in grid layouts, long values
                        with truncate mode can visually overlap. Use wrap or
                        wrap-clamp to prevent this.
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        {/* Problem: Truncate in tight grid */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-red-700">
                                ❌ Problem: Truncate in Tight Grid
                            </h4>
                            <div className="grid grid-cols-2 gap-2 p-4 border-2 border-red-300 rounded-lg bg-white">
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Name"
                                        value="Very Long Name Here"
                                        textOverflow="truncate"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Status"
                                        value="Active Status"
                                        textOverflow="truncate"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Email"
                                        value="user@longdomain.com"
                                        textOverflow="truncate"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Role"
                                        value="Administrator"
                                        textOverflow="truncate"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-600">
                                Fixed width can cause visual issues in
                                responsive grids
                            </p>
                        </div>

                        {/* Solution: Wrap mode */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-green-700">
                                ✅ Solution: Use Wrap Mode
                            </h4>
                            <div className="grid grid-cols-2 gap-2 p-4 border-2 border-green-300 rounded-lg bg-white">
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Name"
                                        value="Very Long Name Here"
                                        textOverflow="wrap"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Status"
                                        value="Active Status"
                                        textOverflow="wrap"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Email"
                                        value="user@longdomain.com"
                                        textOverflow="wrap"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                    <KeyValuePair
                                        keyString="Role"
                                        value="Administrator"
                                        textOverflow="wrap"
                                        size={KeyValuePairSize.SMALL}
                                        maxWidth="120px"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-600">
                                Text wraps naturally, no overlapping!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tooltip Control */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                            Tooltip Control
                        </h3>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            showTooltipOnTruncate
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Control whether tooltips appear on truncated text.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">
                                With Tooltip (Default)
                            </h4>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="Hover to see tooltip"
                                    value="This is a very long value that gets truncated"
                                    textOverflow="truncate"
                                    showTooltipOnTruncate={true}
                                    maxWidth="180px"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">
                                Without Tooltip
                            </h4>
                            <div className="p-4 border-gray-100 border rounded-lg bg-gray-50">
                                <KeyValuePair
                                    keyString="No tooltip on hover"
                                    value="This is a very long value that gets truncated"
                                    textOverflow="truncate"
                                    showTooltipOnTruncate={false}
                                    maxWidth="180px"
                                />
                            </div>
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
