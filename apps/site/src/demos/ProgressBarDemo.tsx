import { useState } from 'react'
import {
    ProgressBar,
    ProgressBarSize,
    ProgressBarVariant,
    ProgressBarType,
} from '../../../../packages/blend/lib/components/ProgressBar'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const ProgressBarDemo = () => {
    // Playground state
    const [playgroundValue, setPlaygroundValue] = useState(65)
    const [playgroundSize, setPlaygroundSize] = useState<ProgressBarSize>(
        ProgressBarSize.MEDIUM
    )
    const [playgroundVariant, setPlaygroundVariant] =
        useState<ProgressBarVariant>(ProgressBarVariant.SOLID)
    const [showLabel, setShowLabel] = useState(true)

    // Options for selects
    const sizeOptions = [
        {
            value: ProgressBarSize.SMALL,
            label: 'Small (40px circular / 12px linear)',
        },
        {
            value: ProgressBarSize.MEDIUM,
            label: 'Medium (60px circular / 20px linear)',
        },
        {
            value: ProgressBarSize.LARGE,
            label: 'Large (80px circular / 24px linear)',
        },
    ]

    const variantOptions = [
        { value: ProgressBarVariant.SOLID, label: 'Solid' },
        { value: ProgressBarVariant.SEGMENTED, label: 'Segmented' },
        { value: ProgressBarVariant.CIRCULAR, label: 'Circular' },
    ]

    const typeOptions = [
        { value: ProgressBarType.SOLID, label: 'Solid' },
        { value: ProgressBarType.SEGMENTED, label: 'Segmented' },
    ]

    const [playgroundType, setPlaygroundType] = useState<ProgressBarType>(
        ProgressBarType.SOLID
    )

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
                                setPlaygroundSize(value as ProgressBarSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={playgroundVariant}
                            onSelect={(value) =>
                                setPlaygroundVariant(
                                    value as ProgressBarVariant
                                )
                            }
                            placeholder="Select variant"
                        />

                        {playgroundVariant === ProgressBarVariant.CIRCULAR && (
                            <SingleSelect
                                label="Type"
                                items={[{ items: typeOptions }]}
                                selected={playgroundType}
                                onSelect={(value) =>
                                    setPlaygroundType(value as ProgressBarType)
                                }
                                placeholder="Select type"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Show Label"
                            checked={showLabel}
                            onChange={() => setShowLabel(!showLabel)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8">
                        <div className="w-full max-w-md">
                            {playgroundVariant ===
                            ProgressBarVariant.CIRCULAR ? (
                                <div className="flex justify-center">
                                    <ProgressBar
                                        value={playgroundValue}
                                        size={playgroundSize}
                                        variant={playgroundVariant}
                                        type={playgroundType}
                                        showLabel={showLabel}
                                    />
                                </div>
                            ) : (
                                <ProgressBar
                                    value={playgroundValue}
                                    size={playgroundSize}
                                    variant={playgroundVariant}
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
                            <ProgressBar
                                value={25}
                                size={ProgressBarSize.SMALL}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={50}
                                size={ProgressBarSize.SMALL}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Medium (20px linear / 60px circular)
                        </h3>
                        <div className="space-y-4">
                            <ProgressBar
                                value={75}
                                size={ProgressBarSize.MEDIUM}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={90}
                                size={ProgressBarSize.MEDIUM}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Large (24px linear / 80px circular)
                        </h3>
                        <div className="space-y-4">
                            <ProgressBar
                                value={60}
                                size={ProgressBarSize.LARGE}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={85}
                                size={ProgressBarSize.LARGE}
                                variant={ProgressBarVariant.SEGMENTED}
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
                            <ProgressBar
                                value={20}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={45}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={80}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Segmented</h3>
                        <div className="space-y-4">
                            <ProgressBar
                                value={30}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={60}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={95}
                                variant={ProgressBarVariant.SEGMENTED}
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
                                        <ProgressBar
                                            value={25}
                                            variant={
                                                ProgressBarVariant.CIRCULAR
                                            }
                                            type={ProgressBarType.SOLID}
                                            size={ProgressBarSize.SMALL}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Small (40px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBar
                                            value={65}
                                            variant={
                                                ProgressBarVariant.CIRCULAR
                                            }
                                            type={ProgressBarType.SOLID}
                                            size={ProgressBarSize.MEDIUM}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Medium (60px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBar
                                            value={85}
                                            variant={
                                                ProgressBarVariant.CIRCULAR
                                            }
                                            type={ProgressBarType.SOLID}
                                            size={ProgressBarSize.LARGE}
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
                                        <ProgressBar
                                            value={40}
                                            variant={
                                                ProgressBarVariant.CIRCULAR
                                            }
                                            type={ProgressBarType.SEGMENTED}
                                            size={ProgressBarSize.SMALL}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Small (40px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBar
                                            value={70}
                                            variant={
                                                ProgressBarVariant.CIRCULAR
                                            }
                                            type={ProgressBarType.SEGMENTED}
                                            size={ProgressBarSize.MEDIUM}
                                            showLabel={true}
                                        />
                                        <p className="text-xs text-gray-600">
                                            Medium (60px)
                                        </p>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <ProgressBar
                                            value={90}
                                            variant={
                                                ProgressBarVariant.CIRCULAR
                                            }
                                            type={ProgressBarType.SEGMENTED}
                                            size={ProgressBarSize.LARGE}
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
                                <ProgressBar
                                    value={15}
                                    variant={ProgressBarVariant.CIRCULAR}
                                    type={ProgressBarType.SOLID}
                                    showLabel={true}
                                />
                                <p className="text-sm text-gray-600">
                                    Low Progress
                                </p>
                            </div>

                            <div className="text-center space-y-3">
                                <ProgressBar
                                    value={45}
                                    variant={ProgressBarVariant.CIRCULAR}
                                    type={ProgressBarType.SEGMENTED}
                                    showLabel={true}
                                />
                                <p className="text-sm text-gray-600">
                                    Medium Progress
                                </p>
                            </div>

                            <div className="text-center space-y-3">
                                <ProgressBar
                                    value={75}
                                    variant={ProgressBarVariant.CIRCULAR}
                                    type={ProgressBarType.SOLID}
                                    showLabel={true}
                                />
                                <p className="text-sm text-gray-600">
                                    High Progress
                                </p>
                            </div>

                            <div className="text-center space-y-3">
                                <ProgressBar
                                    value={100}
                                    variant={ProgressBarVariant.CIRCULAR}
                                    type={ProgressBarType.SEGMENTED}
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
                                    <ProgressBar
                                        value={60}
                                        variant={ProgressBarVariant.CIRCULAR}
                                        type={ProgressBarType.SOLID}
                                        showLabel={true}
                                    />
                                    <ProgressBar
                                        value={85}
                                        variant={ProgressBarVariant.CIRCULAR}
                                        type={ProgressBarType.SEGMENTED}
                                        showLabel={true}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Without Labels
                                </h4>
                                <div className="flex justify-center space-x-8">
                                    <ProgressBar
                                        value={60}
                                        variant={ProgressBarVariant.CIRCULAR}
                                        type={ProgressBarType.SOLID}
                                        showLabel={false}
                                    />
                                    <ProgressBar
                                        value={85}
                                        variant={ProgressBarVariant.CIRCULAR}
                                        type={ProgressBarType.SEGMENTED}
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
                            <ProgressBar
                                value={35}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                            <ProgressBar
                                value={70}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Without Labels
                        </h3>
                        <div className="space-y-4">
                            <ProgressBar
                                value={35}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={false}
                            />
                            <ProgressBar
                                value={70}
                                variant={ProgressBarVariant.SEGMENTED}
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
                        Different Progress Values
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">0% - Empty</p>
                            <ProgressBar
                                value={0}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                15% - Low Progress
                            </p>
                            <ProgressBar
                                value={15}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                40% - Medium Progress
                            </p>
                            <ProgressBar
                                value={40}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                75% - High Progress
                            </p>
                            <ProgressBar
                                value={75}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                100% - Complete
                            </p>
                            <ProgressBar
                                value={100}
                                variant={ProgressBarVariant.SOLID}
                                showLabel={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* All Combinations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All Combinations</h2>
                <div className="space-y-8">
                    {Object.values(ProgressBarSize).map((size) => (
                        <div key={size} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {size} Size
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.values(ProgressBarVariant).map(
                                    (variant) => (
                                        <div
                                            key={variant}
                                            className="space-y-4"
                                        >
                                            <h4 className="text-sm font-medium capitalize">
                                                {variant} Variant
                                            </h4>
                                            <div className="space-y-3">
                                                <ProgressBar
                                                    value={25}
                                                    size={size}
                                                    variant={variant}
                                                    showLabel={true}
                                                />
                                                <ProgressBar
                                                    value={50}
                                                    size={size}
                                                    variant={variant}
                                                    showLabel={true}
                                                />
                                                <ProgressBar
                                                    value={75}
                                                    size={size}
                                                    variant={variant}
                                                    showLabel={false}
                                                />
                                            </div>
                                        </div>
                                    )
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
                                <ProgressBar
                                    value={67}
                                    variant={ProgressBarVariant.SOLID}
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
                                <ProgressBar
                                    value={57}
                                    variant={ProgressBarVariant.SEGMENTED}
                                    showLabel={true}
                                />
                            </div>

                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">Profile Setup</h4>
                                <p className="text-sm text-gray-600">
                                    Complete your profile
                                </p>
                                <ProgressBar
                                    value={80}
                                    variant={ProgressBarVariant.SOLID}
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
                                <ProgressBar
                                    value={60}
                                    variant={ProgressBarVariant.SEGMENTED}
                                    showLabel={true}
                                />
                            </div>

                            <div className="p-4 border rounded-lg space-y-3">
                                <h4 className="font-semibold">Storage Usage</h4>
                                <p className="text-sm text-gray-600">
                                    4.2 GB of 10 GB used
                                </p>
                                <ProgressBar
                                    value={42}
                                    variant={ProgressBarVariant.SOLID}
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
                                <ProgressBar
                                    value={85}
                                    variant={ProgressBarVariant.SEGMENTED}
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

    const startAnimation = () => {
        if (isAnimating) return

        setIsAnimating(true)
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
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
                        <ProgressBar
                            value={progress}
                            variant={ProgressBarVariant.SOLID}
                            showLabel={true}
                        />
                        <ProgressBar
                            value={progress}
                            variant={ProgressBarVariant.SEGMENTED}
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
                            <ProgressBar
                                value={progress}
                                variant={ProgressBarVariant.CIRCULAR}
                                type={ProgressBarType.SOLID}
                                size={ProgressBarSize.SMALL}
                                showLabel={true}
                            />
                            <p className="text-xs text-gray-600">Small Solid</p>
                        </div>
                        <div className="text-center space-y-2">
                            <ProgressBar
                                value={progress}
                                variant={ProgressBarVariant.CIRCULAR}
                                type={ProgressBarType.SEGMENTED}
                                size={ProgressBarSize.SMALL}
                                showLabel={true}
                            />
                            <p className="text-xs text-gray-600">
                                Small Segmented
                            </p>
                        </div>
                        <div className="text-center space-y-2">
                            <ProgressBar
                                value={progress}
                                variant={ProgressBarVariant.CIRCULAR}
                                type={ProgressBarType.SOLID}
                                size={ProgressBarSize.MEDIUM}
                                showLabel={true}
                            />
                            <p className="text-xs text-gray-600">
                                Medium Solid
                            </p>
                        </div>
                        <div className="text-center space-y-2">
                            <ProgressBar
                                value={progress}
                                variant={ProgressBarVariant.CIRCULAR}
                                type={ProgressBarType.SEGMENTED}
                                size={ProgressBarSize.LARGE}
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

export default ProgressBarDemo
