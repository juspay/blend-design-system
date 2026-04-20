import { Info, Star, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import {
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
    TextOverflowMode,
} from '../../../../packages/blend/lib/components/KeyValuePairV2/keyValuePairV2.types'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { KeyValuePairV2 } from '../../../../packages/blend/lib/components/KeyValuePairV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'

const KeyValuePairV2Demo = () => {
    const { theme } = useTheme()
    // Playground state
    const [playgroundKey, setPlaygroundKey] = useState('A very long Key')
    const [playgroundValue, setPlaygroundValue] = useState(
        'This is a very long value that demonstrates text overflow behavior'
    )
    const [playgroundSize, setPlaygroundSize] = useState<KeyValuePairV2Size>(
        KeyValuePairV2Size.MD
    )
    const [playgroundState, setPlaygroundState] =
        useState<KeyValuePairV2StateType>(KeyValuePairV2StateType.vertical)
    const [showKeySlot, setShowKeySlot] = useState(false)
    const [showValueLeftSlot, setShowValueLeftSlot] = useState(false)
    const [showValueRightSlot, setShowValueRightSlot] = useState(false)
    const [textOverflow, setTextOverflow] =
        useState<TextOverflowMode>('truncate')
    const [maxLines, setMaxLines] = useState(2)
    const [showTooltip, setShowTooltip] = useState(true)

    // Options for selects
    const sizeOptions = [
        { value: KeyValuePairV2Size.SM as string, label: 'Small' },
        { value: KeyValuePairV2Size.MD as string, label: 'Medium' },
        { value: KeyValuePairV2Size.LG as string, label: 'Large' },
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
                <h2 className="text-2xl font-bold">
                    🔀 KeyValuePairV2 Playground
                </h2>
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

                        {playgroundState ===
                            KeyValuePairV2StateType.vertical && (
                            <SingleSelect
                                label="Size"
                                items={[{ items: sizeOptions }]}
                                selected={playgroundSize}
                                onSelect={(value) =>
                                    setPlaygroundSize(
                                        value as KeyValuePairV2Size
                                    )
                                }
                                placeholder="Select size"
                            />
                        )}

                        <SingleSelect
                            label="State"
                            items={[{ items: stateOptions }]}
                            selected={
                                playgroundState ===
                                KeyValuePairV2StateType.vertical
                                    ? 'vertical'
                                    : 'horizontal'
                            }
                            onSelect={(value) =>
                                setPlaygroundState(
                                    value === 'vertical'
                                        ? KeyValuePairV2StateType.vertical
                                        : KeyValuePairV2StateType.horizontal
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

                    {playgroundState === KeyValuePairV2StateType.horizontal && (
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

                    <div
                        className={`min-h-32 p-8 rounded-xl flex justify-center items-center border-2 border-dashed ${
                            theme === Theme.DARK
                                ? 'border-gray-700 bg-gray-900'
                                : 'border-gray-300 bg-gray-50'
                        }`}
                    >
                        {' '}
                        <KeyValuePairV2
                            keyString={playgroundKey}
                            value={playgroundValue}
                            size={playgroundSize}
                            keyValuePairState={playgroundState}
                            textOverflow={textOverflow}
                            maxLines={maxLines}
                            showTooltipOnTruncate={showTooltip}
                            maxWidth="300px"
                            slots={{
                                key: showKeySlot ? (
                                    <Info size={16} />
                                ) : undefined,
                                value: {
                                    left: showValueLeftSlot ? (
                                        <Star size={16} />
                                    ) : undefined,
                                    right: showValueRightSlot ? (
                                        <ArrowRight size={16} />
                                    ) : undefined,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeyValuePairV2Demo
