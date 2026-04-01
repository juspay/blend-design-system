import { useEffect, useRef, useState } from 'react'
import {
    ProgressBarV2,
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '../../../../packages/blend/lib/components/ProgressBarV2'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'

const ProgressBarV2Demo = () => {
    const { theme } = useTheme()
    // Playground state
    const [playgroundValue, setPlaygroundValue] = useState(65)
    const [playgroundSize, setPlaygroundSize] = useState<ProgressBarV2Size>(
        ProgressBarV2Size.MD
    )
    const [playgroundVariant, setPlaygroundVariant] =
        useState<ProgressBarV2Variant>(ProgressBarV2Variant.LINEAR)
    const [playgroundAppearance, setPlaygroundAppearance] =
        useState<ProgressBarV2Appearance>(ProgressBarV2Appearance.SOLID)
    const [showLabel, setShowLabel] = useState(true)

    // Options for selects
    const sizeOptions = [
        {
            value: ProgressBarV2Size.SM,
            label: 'Small (40px circular / 12px linear)',
        },
        {
            value: ProgressBarV2Size.MD,
            label: 'Medium (60px circular / 20px linear)',
        },
        {
            value: ProgressBarV2Size.LG,
            label: 'Large (80px circular / 24px linear)',
        },
    ]

    const variantOptions = [
        { value: ProgressBarV2Variant.LINEAR, label: 'Linear' },
        { value: ProgressBarV2Variant.CIRCULAR, label: 'Circular' },
    ]

    const appearanceOptions = [
        { value: ProgressBarV2Appearance.SOLID, label: 'Solid' },
        { value: ProgressBarV2Appearance.SEGMENTED, label: 'Segmented' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Progress Value (%)"
                            value={playgroundValue.toString()}
                            onChange={(e) => {
                                const value = Math.max(
                                    0,
                                    Math.min(100, parseInt(e.target.value) || 0)
                                )
                                setPlaygroundValue(value)
                            }}
                            placeholder="Enter progress value (0-100)"
                            type="number"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as ProgressBarV2Size)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Variant (shape)"
                            items={[{ items: variantOptions }]}
                            selected={playgroundVariant}
                            onSelect={(value) =>
                                setPlaygroundVariant(
                                    value as ProgressBarV2Variant
                                )
                            }
                            placeholder="Select variant"
                        />

                        <SingleSelect
                            label="Appearance"
                            items={[{ items: appearanceOptions }]}
                            selected={playgroundAppearance}
                            onSelect={(value) =>
                                setPlaygroundAppearance(
                                    value as ProgressBarV2Appearance
                                )
                            }
                            placeholder="Select appearance"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Show Label"
                            checked={showLabel}
                            onChange={() => setShowLabel(!showLabel)}
                        />
                    </div>

                    <div
                        className={`min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8 ${
                            theme === Theme.DARK ? 'bg-gray-900' : 'bg-gray-50'
                        }`}
                    >
                        <div className="w-full max-w-md">
                            {playgroundVariant ===
                            ProgressBarV2Variant.CIRCULAR ? (
                                <div className="flex justify-center">
                                    <ProgressBarV2
                                        value={playgroundValue}
                                        size={playgroundSize}
                                        variant={playgroundVariant}
                                        appearance={playgroundAppearance}
                                        showLabel={showLabel}
                                    />
                                </div>
                            ) : (
                                <ProgressBarV2
                                    value={playgroundValue}
                                    size={playgroundSize}
                                    variant={playgroundVariant}
                                    appearance={playgroundAppearance}
                                    showLabel={showLabel}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Small (12px linear / 40px circular)
                        </h3>
                        <div className="space-y-4">
                            <ProgressBarV2
                                value={25}
                                size={ProgressBarV2Size.SM}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={50}
                                size={ProgressBarV2Size.SM}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Medium (20px linear / 60px circular)
                        </h3>
                        <div className="space-y-4">
                            <ProgressBarV2
                                value={75}
                                size={ProgressBarV2Size.MD}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={90}
                                size={ProgressBarV2Size.MD}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Large (24px linear / 80px circular)
                        </h3>
                        <div className="space-y-4">
                            <ProgressBarV2
                                value={60}
                                size={ProgressBarV2Size.LG}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={85}
                                size={ProgressBarV2Size.LG}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Variants */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Solid</h3>
                        <div className="space-y-4">
                            <ProgressBarV2
                                value={20}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={45}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={80}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Segmented</h3>
                        <div className="space-y-4">
                            <ProgressBarV2
                                value={30}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={60}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={95}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Circular Progress Bars */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Circular Progress Bars</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Circular Types
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Solid Circular
                                </h4>
                                <div className="flex justify-center space-x-6">
                                    <div className="text-center space-y-2">
                                        <ProgressBarV2
                                            value={25}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            size={ProgressBarV2Size.SM}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Small (40px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBarV2
                                            value={65}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            size={ProgressBarV2Size.MD}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Medium (60px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBarV2
                                            value={85}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            size={ProgressBarV2Size.LG}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Large (80px)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Segmented Circular
                                </h4>
                                <div className="flex justify-center space-x-6">
                                    <div className="text-center space-y-2">
                                        <ProgressBarV2
                                            value={40}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            appearance={
                                                ProgressBarV2Appearance.SEGMENTED
                                            }
                                            size={ProgressBarV2Size.SM}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Small (40px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBarV2
                                            value={70}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            appearance={
                                                ProgressBarV2Appearance.SEGMENTED
                                            }
                                            size={ProgressBarV2Size.MD}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Medium (60px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBarV2
                                            value={90}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            appearance={
                                                ProgressBarV2Appearance.SEGMENTED
                                            }
                                            size={ProgressBarV2Size.LG}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Large (80px)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Circular Progress Examples
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center space-y-3">
                                <ProgressBarV2
                                    value={15}
                                    variant={ProgressBarV2Variant.CIRCULAR}
                                    showLabel={true}
                                />
                                <p className="text-sm text-gray-600">
                                    Low Progress
                                </p>
                            </div>

                            <div className="text-center space-y-3">
                                <ProgressBarV2
                                    value={45}
                                    variant={ProgressBarV2Variant.CIRCULAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                />
                                <p className="text-sm text-gray-600">
                                    Medium Progress
                                </p>
                            </div>

                            <div className="text-center space-y-3">
                                <ProgressBarV2
                                    value={75}
                                    variant={ProgressBarV2Variant.CIRCULAR}
                                    showLabel={true}
                                />
                                <p className="text-sm text-gray-600">
                                    High Progress
                                </p>
                            </div>

                            <div className="text-center space-y-3">
                                <ProgressBarV2
                                    value={100}
                                    variant={ProgressBarV2Variant.CIRCULAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                />
                                <p className="text-sm text-gray-600">
                                    Complete
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Circular with Different Labels
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    With Labels
                                </h4>
                                <div className="flex justify-center space-x-8">
                                    <ProgressBarV2
                                        value={60}
                                        variant={ProgressBarV2Variant.CIRCULAR}
                                        showLabel={true}
                                    />
                                    <ProgressBarV2
                                        value={85}
                                        variant={ProgressBarV2Variant.CIRCULAR}
                                        appearance={
                                            ProgressBarV2Appearance.SEGMENTED
                                        }
                                        showLabel={true}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Without Labels
                                </h4>
                                <div className="flex justify-center space-x-8">
                                    <ProgressBarV2
                                        value={60}
                                        variant={ProgressBarV2Variant.CIRCULAR}
                                        showLabel={false}
                                    />
                                    <ProgressBarV2
                                        value={85}
                                        variant={ProgressBarV2Variant.CIRCULAR}
                                        appearance={
                                            ProgressBarV2Appearance.SEGMENTED
                                        }
                                        showLabel={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* With and Without Labels */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Label Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">With Labels</h3>
                        <div className="space-y-4">
                            <ProgressBarV2
                                value={35}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                            <ProgressBarV2
                                value={70}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Without Labels
                        </h3>
                        <div className="space-y-4">
                            <ProgressBarV2
                                value={35}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={false}
                            />
                            <ProgressBarV2
                                value={70}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={false}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Ranges */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Progress Ranges</h2>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Different Progress Values (0-100)
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">0% - Empty</p>
                            <ProgressBarV2
                                value={0}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                15% - Low Progress
                            </p>
                            <ProgressBarV2
                                value={15}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                40% - Medium Progress
                            </p>
                            <ProgressBarV2
                                value={40}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                75% - High Progress
                            </p>
                            <ProgressBarV2
                                value={75}
                                variant={ProgressBarV2Variant.LINEAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                100% - Complete
                            </p>
                            <ProgressBarV2
                                value={100}
                                variant={ProgressBarV2Variant.LINEAR}
                                showLabel={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Min/Max Ranges */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Custom Min/Max Ranges</h2>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Why use min/max?
                        </h3>
                        <p className="text-sm text-gray-600">
                            Use custom{' '}
                            <code className="px-1 py-0.5 bg-gray-100 rounded">
                                min
                            </code>{' '}
                            and{' '}
                            <code className="px-1 py-0.5 bg-gray-100 rounded">
                                max
                            </code>{' '}
                            props when your progress value doesn't represent a
                            percentage (0-100). For example: file sizes, item
                            counts, or custom scales.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Example: File Upload (0-200 MB)
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    50 MB of 200 MB (25%)
                                </p>
                                <ProgressBarV2
                                    value={50}
                                    min={0}
                                    max={200}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    showLabel={true}
                                    aria-label="File upload: 50 of 200 MB"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    150 MB of 200 MB (75%)
                                </p>
                                <ProgressBarV2
                                    value={150}
                                    min={0}
                                    max={200}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                    aria-label="File upload: 150 of 200 MB"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Example: Task Completion (0-10 tasks)
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    3 of 10 tasks completed (30%)
                                </p>
                                <ProgressBarV2
                                    value={3}
                                    min={0}
                                    max={10}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    showLabel={true}
                                    aria-label="Task progress: 3 of 10 completed"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    7 of 10 tasks completed (70%)
                                </p>
                                <ProgressBarV2
                                    value={7}
                                    min={0}
                                    max={10}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                    aria-label="Task progress: 7 of 10 completed"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Example: Storage Usage (0-1000 GB)
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    250 GB of 1000 GB (25%)
                                </p>
                                <ProgressBarV2
                                    value={250}
                                    min={0}
                                    max={1000}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    showLabel={true}
                                    aria-label="Storage: 250 of 1000 GB used"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    750 GB of 1000 GB (75%)
                                </p>
                                <ProgressBarV2
                                    value={750}
                                    min={0}
                                    max={1000}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                    aria-label="Storage: 750 of 1000 GB used"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Example: Custom Scale (20-80 range)
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Value 30 in range 20-80 (16.7%)
                                </p>
                                <ProgressBarV2
                                    value={30}
                                    min={20}
                                    max={80}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    showLabel={true}
                                    aria-label="Progress: 30 of 80 (starting from 20)"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Value 65 in range 20-80 (75%)
                                </p>
                                <ProgressBarV2
                                    value={65}
                                    min={20}
                                    max={80}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                    aria-label="Progress: 65 of 80 (starting from 20)"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Circular Progress with Custom Ranges
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">
                                        15 of 50 items (30%)
                                    </p>
                                    <div className="flex justify-center">
                                        <ProgressBarV2
                                            value={15}
                                            min={0}
                                            max={50}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            showLabel={true}
                                            aria-label="Items: 15 of 50"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">
                                        40 of 50 items (80%)
                                    </p>
                                    <div className="flex justify-center">
                                        <ProgressBarV2
                                            value={40}
                                            min={0}
                                            max={50}
                                            variant={
                                                ProgressBarV2Variant.CIRCULAR
                                            }
                                            appearance={
                                                ProgressBarV2Appearance.SEGMENTED
                                            }
                                            showLabel={true}
                                            aria-label="Items: 40 of 50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Combinations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All Combinations</h2>
                <div className="space-y-8">
                    {Object.values(ProgressBarV2Size).map((size) => (
                        <div key={size} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {size} Size
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {Object.values(ProgressBarV2Variant).flatMap(
                                    (variant) =>
                                        Object.values(
                                            ProgressBarV2Appearance
                                        ).map((appearance) => (
                                            <div
                                                key={`${variant}-${appearance}`}
                                                className="space-y-4"
                                            >
                                                <h4 className="text-sm font-medium capitalize">
                                                    {variant} · {appearance}
                                                </h4>
                                                <div className="space-y-3">
                                                    <ProgressBarV2
                                                        value={25}
                                                        size={size}
                                                        variant={variant}
                                                        appearance={appearance}
                                                        showLabel={true}
                                                    />
                                                    <ProgressBarV2
                                                        value={50}
                                                        size={size}
                                                        variant={variant}
                                                        appearance={appearance}
                                                        showLabel={true}
                                                    />
                                                    <ProgressBarV2
                                                        value={75}
                                                        size={size}
                                                        variant={variant}
                                                        appearance={appearance}
                                                        showLabel={false}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Real-world Use Cases
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">File Upload</h4>
                                <p className="text-sm text-gray-600">
                                    Uploading document.pdf
                                </p>
                                <ProgressBarV2
                                    value={67}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    showLabel={true}
                                />
                            </div>

                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">
                                    Task Completion
                                </h4>
                                <p className="text-sm text-gray-600">
                                    4 of 7 tasks completed
                                </p>
                                <ProgressBarV2
                                    value={57}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                />
                            </div>

                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">Profile Setup</h4>
                                <p className="text-sm text-gray-600">
                                    Complete your profile
                                </p>
                                <ProgressBarV2
                                    value={80}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    showLabel={true}
                                />
                            </div>

                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">
                                    Course Progress
                                </h4>
                                <p className="text-sm text-gray-600">
                                    12 of 20 lessons
                                </p>
                                <ProgressBarV2
                                    value={60}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                />
                            </div>

                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">Storage Usage</h4>
                                <p className="text-sm text-gray-600">
                                    4.2 GB of 10 GB used
                                </p>
                                <ProgressBarV2
                                    value={42}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    showLabel={true}
                                />
                            </div>

                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">
                                    Goal Achievement
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Monthly target
                                </p>
                                <ProgressBarV2
                                    value={85}
                                    variant={ProgressBarV2Variant.LINEAR}
                                    appearance={
                                        ProgressBarV2Appearance.SEGMENTED
                                    }
                                    showLabel={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Animated Progress
                        </h3>
                        <p className="text-sm text-gray-600">
                            Click the button to simulate progress animation
                        </p>
                        <AnimatedProgressExample />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Animated progress example component
const AnimatedProgressExample = () => {
    const [progress, setProgress] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const clearAnimationInterval = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [])

    const startAnimation = () => {
        if (isAnimating) return

        clearAnimationInterval()
        setIsAnimating(true)
        setProgress(0)

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearAnimationInterval()
                    setIsAnimating(false)
                    addSnackbar({
                        header: 'Progress Complete!',
                        description: 'Animation finished successfully.',
                    })
                    return 100
                }
                return prev + 2
            })
        }, 100)
    }

    const resetProgress = () => {
        clearAnimationInterval()
        setProgress(0)
        setIsAnimating(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <button
                    onClick={startAnimation}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isAnimating ? 'Animating...' : 'Start Animation'}
                </button>
                <button
                    onClick={resetProgress}
                    disabled={isAnimating}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">
                        Linear Progress Bars
                    </h4>
                    <div className="space-y-2">
                        <ProgressBarV2
                            value={progress}
                            variant={ProgressBarV2Variant.LINEAR}
                            showLabel={true}
                        />
                        <ProgressBarV2
                            value={progress}
                            variant={ProgressBarV2Variant.LINEAR}
                            appearance={ProgressBarV2Appearance.SEGMENTED}
                            showLabel={true}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-sm font-medium">
                        Circular Progress Bars
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                        <div className="text-center space-y-2">
                            <ProgressBarV2
                                value={progress}
                                variant={ProgressBarV2Variant.CIRCULAR}
                                size={ProgressBarV2Size.SM}
                                showLabel={true}
                            />
                            <p className="text-xs text-gray-600">Small Solid</p>
                        </div>
                        <div className="text-center space-y-2">
                            <ProgressBarV2
                                value={progress}
                                variant={ProgressBarV2Variant.CIRCULAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                size={ProgressBarV2Size.SM}
                                showLabel={true}
                            />
                            <p className="text-xs text-gray-600">
                                Small Segmented
                            </p>
                        </div>
                        <div className="text-center space-y-2">
                            <ProgressBarV2
                                value={progress}
                                variant={ProgressBarV2Variant.CIRCULAR}
                                size={ProgressBarV2Size.MD}
                                showLabel={true}
                            />
                            <p className="text-xs text-gray-600">
                                Medium Solid
                            </p>
                        </div>
                        <div className="text-center space-y-2">
                            <ProgressBarV2
                                value={progress}
                                variant={ProgressBarV2Variant.CIRCULAR}
                                appearance={ProgressBarV2Appearance.SEGMENTED}
                                size={ProgressBarV2Size.LG}
                                showLabel={true}
                            />
                            <p className="text-xs text-gray-600">
                                Large Segmented
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBarV2Demo
