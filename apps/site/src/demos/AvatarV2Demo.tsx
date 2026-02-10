import { useState } from 'react'
import { AvatarV2 } from '../../../../packages/blend/lib/components/AvatarV2'
import {
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition,
} from '../../../../packages/blend/lib/components/AvatarV2'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { User, Mail, Phone, Camera } from 'lucide-react'
import { ThemeProvider, Theme } from '../../../../packages/blend/lib/context'

const AvatarV2Demo = () => {
    const [selectedSize, setSelectedSize] = useState<AvatarV2Size>(
        AvatarV2Size.MD
    )
    const [selectedShape, setSelectedShape] = useState<AvatarV2Shape>(
        AvatarV2Shape.CIRCLE
    )
    const [selectedStatus, setSelectedStatus] = useState<AvatarV2Status>(
        AvatarV2Status.ONLINE
    )
    const [selectedStatusPosition, setSelectedStatusPosition] =
        useState<AvatarV2StatusPosition>(AvatarV2StatusPosition.TOP_RIGHT)
    const [imageUrl, setImageUrl] = useState(
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    )
    const [altText, setAltText] = useState('John Doe')
    const [useCustomFallback, setUseCustomFallback] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [showLeadingSlot, setShowLeadingSlot] = useState(false)
    const [showTrailingSlot, setShowTrailingSlot] = useState(false)
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

    const sizes: AvatarV2Size[] = [
        AvatarV2Size.XS,
        AvatarV2Size.SM,
        AvatarV2Size.MD,
        AvatarV2Size.LG,
        AvatarV2Size.XL,
        AvatarV2Size.XXL,
    ]
    const shapes: AvatarV2Shape[] = [
        AvatarV2Shape.CIRCLE,
        AvatarV2Shape.ROUNDED,
        AvatarV2Shape.SQUARE,
    ]
    const statuses: AvatarV2Status[] = [
        AvatarV2Status.NONE,
        AvatarV2Status.ONLINE,
        AvatarV2Status.OFFLINE,
        AvatarV2Status.AWAY,
        AvatarV2Status.BUSY,
    ]
    const statusPositions: AvatarV2StatusPosition[] = [
        AvatarV2StatusPosition.TOP_RIGHT,
        AvatarV2StatusPosition.TOP_LEFT,
        AvatarV2StatusPosition.BOTTOM_RIGHT,
        AvatarV2StatusPosition.BOTTOM_LEFT,
    ]

    return (
        <ThemeProvider theme={theme}>
            <div className="p-8 min-h-screen">
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <Text as="h1" variant="heading.xl" fontWeight={700}>
                        AvatarV2 Playground
                    </Text>
                    <div style={{ marginTop: '8px' }}>
                        <Text variant="body.md" color="gray">
                            Adjust the controls to see different AvatarV2
                            configurations
                        </Text>
                    </div>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '350px 1fr',
                        gap: '48px',
                        alignItems: 'start',
                    }}
                >
                    {/* Controls Panel */}
                    <div className="space-y-6">
                        {/* Theme Toggle */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-3">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Theme
                                </Text>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setTheme(Theme.LIGHT)}
                                    className={`px-4 py-2 rounded-lg border ${
                                        theme === Theme.LIGHT
                                            ? 'bg-primary-100 border-primary-500 text-primary-700'
                                            : 'bg-white border-gray-200 text-gray-700'
                                    }`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => setTheme(Theme.DARK)}
                                    className={`px-4 py-2 rounded-lg border ${
                                        theme === Theme.DARK
                                            ? 'bg-primary-100 border-primary-500 text-primary-700'
                                            : 'bg-white border-gray-200 text-gray-700'
                                    }`}
                                >
                                    Dark
                                </button>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-3">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Size
                                </Text>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 py-2 rounded-lg border text-sm ${
                                            selectedSize === size
                                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Shape Selection */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-3">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Shape
                                </Text>
                            </div>
                            <div className="flex gap-2">
                                {shapes.map((shape) => (
                                    <button
                                        key={shape}
                                        onClick={() => setSelectedShape(shape)}
                                        className={`flex-1 px-4 py-2 rounded-lg border capitalize ${
                                            selectedShape === shape
                                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {shape}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status Selection */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-3">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Status
                                </Text>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() =>
                                            setSelectedStatus(status)
                                        }
                                        className={`px-2 py-2 rounded-lg border text-xs capitalize ${
                                            selectedStatus === status
                                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {status.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>

                            {selectedStatus !== AvatarV2Status.NONE && (
                                <div className="mt-3">
                                    <div className="mb-2">
                                        <Text variant="body.sm">Position</Text>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {statusPositions.map((position) => (
                                            <button
                                                key={position}
                                                onClick={() =>
                                                    setSelectedStatusPosition(
                                                        position
                                                    )
                                                }
                                                className={`px-2 py-1 rounded-lg border text-xs capitalize ${
                                                    selectedStatusPosition ===
                                                    position
                                                        ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {position
                                                    .replace('_', ' ')
                                                    .replace('Right', '')
                                                    .replace('Left', '')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-4">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Content
                                </Text>
                            </div>

                            <div className="mb-4">
                                <label className="text-sm text-gray-600 block mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) =>
                                        setImageUrl(e.target.value)
                                    }
                                    placeholder="Leave empty for fallback"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="text-sm text-gray-600 block mb-2">
                                    Alt Text
                                </label>
                                <input
                                    type="text"
                                    value={altText}
                                    onChange={(e) => setAltText(e.target.value)}
                                    placeholder="Used for initials"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>

                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={useCustomFallback}
                                    onChange={(e) =>
                                        setUseCustomFallback(e.target.checked)
                                    }
                                    id="custom-fallback"
                                    className="w-4 h-4"
                                />
                                <label htmlFor="custom-fallback">
                                    Custom fallback (icon)
                                </label>
                            </label>
                        </div>

                        {/* Options */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-4">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Options
                                </Text>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={showSkeleton}
                                        onChange={(e) =>
                                            setShowSkeleton(e.target.checked)
                                        }
                                        id="show-skeleton"
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="show-skeleton">
                                        Show skeleton
                                    </label>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={showLeadingSlot}
                                        onChange={(e) =>
                                            setShowLeadingSlot(e.target.checked)
                                        }
                                        id="show-leading-slot"
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="show-leading-slot">
                                        left slot
                                    </label>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={showTrailingSlot}
                                        onChange={(e) =>
                                            setShowTrailingSlot(
                                                e.target.checked
                                            )
                                        }
                                        id="show-trailing-slot"
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="show-trailing-slot">
                                        right slot
                                    </label>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="flex-1">
                        <div className="p-6 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-6">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Preview
                                </Text>
                            </div>

                            <div className="flex items-center justify-center min-h-[300px] p-12 from-gray-50 to-gray-100 rounded-xl">
                                <AvatarV2
                                    src={imageUrl}
                                    alt={altText}
                                    fallback={
                                        useCustomFallback ? (
                                            <Camera size={20} />
                                        ) : undefined
                                    }
                                    size={selectedSize}
                                    shape={selectedShape}
                                    status={{
                                        type: selectedStatus,
                                        position: selectedStatusPosition,
                                    }}
                                    skeleton={
                                        showSkeleton
                                            ? { show: true }
                                            : undefined
                                    }
                                    leftSlot={
                                        showLeadingSlot ? (
                                            <Mail size={16} />
                                        ) : undefined
                                    }
                                    rightSlot={
                                        showTrailingSlot ? (
                                            <Phone size={16} />
                                        ) : undefined
                                    }
                                />
                            </div>

                            {/* Example Combinations */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="mb-4">
                                    <Text
                                        as="h4"
                                        variant="body.md"
                                        fontWeight={600}
                                    >
                                        Example Combinations
                                    </Text>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <AvatarV2
                                            src={imageUrl}
                                            alt="Jane"
                                            size={AvatarV2Size.SM}
                                            status={{
                                                type: AvatarV2Status.ONLINE,
                                                position:
                                                    AvatarV2StatusPosition.TOP_RIGHT,
                                            }}
                                        />
                                        <Text variant="body.xs">
                                            With online
                                        </Text>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <AvatarV2
                                            alt="Bob"
                                            fallback={<User size={20} />}
                                            size={AvatarV2Size.SM}
                                            shape={AvatarV2Shape.ROUNDED}
                                            status={{
                                                type: AvatarV2Status.AWAY,
                                                position:
                                                    AvatarV2StatusPosition.BOTTOM_RIGHT,
                                            }}
                                        />
                                        <Text variant="body.xs">
                                            Away + rounded
                                        </Text>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <AvatarV2
                                            alt="Alice"
                                            fallback="AI"
                                            size={AvatarV2Size.SM}
                                            status={{
                                                type: AvatarV2Status.BUSY,
                                                position:
                                                    AvatarV2StatusPosition.TOP_LEFT,
                                            }}
                                        />
                                        <Text variant="body.xs">
                                            Busy + initials
                                        </Text>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <AvatarV2
                                            alt="Team"
                                            fallback="TM"
                                            size={AvatarV2Size.SM}
                                            shape={AvatarV2Shape.SQUARE}
                                        />
                                        <Text variant="body.xs">
                                            Square + initials
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default AvatarV2Demo
