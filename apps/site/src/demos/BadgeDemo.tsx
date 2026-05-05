import { useState } from 'react'
import {
    Badge,
    BadgeSize,
    BadgeColor,
} from '../../../../packages/blend/lib/components/Badge'
import { Button } from '../../../../packages/blend/lib/components/Button'
import {
    Bell,
    Mail,
    ShoppingCart,
    MessageCircle,
    Heart,
    User,
    Home,
    Settings,
    Bookmark,
} from 'lucide-react'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { NotificationIcon } from '@phosphor-icons/react'

const BadgeDemo = () => {
    const [count, setCount] = useState<number>(5)
    const [maxCount, setMaxCount] = useState<number>(99)
    const [size, setSize] = useState<BadgeSize>(BadgeSize.MD)
    const [color, setColor] = useState<BadgeColor>(BadgeColor.ALERT)
    const [position, setPosition] = useState<
        'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    >('top-right')
    const [customText, setCustomText] = useState<string>('')
    const [showBadge, setShowBadge] = useState<boolean>(true)
    const [showZero, setShowZero] = useState<boolean>(false)

    const sizes: BadgeSize[] = [BadgeSize.SM, BadgeSize.MD, BadgeSize.LG]
    const colors: BadgeColor[] = [
        BadgeColor.ALERT,
        BadgeColor.NEUTRAL,
        BadgeColor.WARNING,
        BadgeColor.PRIMARY,
        BadgeColor.SUCCESS,
    ]
    const positions: Array<
        'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    > = ['top-right', 'top-left', 'bottom-right', 'bottom-left']

    // Tab items with notification badges
    const tabsWithBadges = [
        { id: 'all', label: 'All Messages', count: 12 },
        { id: 'unread', label: 'Unread', count: 5 },
        { id: 'mentions', label: 'Mentions', count: 0 },
        { id: 'archived', label: 'Archived', count: 0 },
    ]

    const [activeTab, setActiveTab] = useState('all')

    return (
        <>
            <div className="p-8 min-h-screen">
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <Text as="h1" variant="heading.xl" fontWeight={700}>
                        Badge Playground
                    </Text>
                    <div style={{ marginTop: '8px' }}>
                        <Text variant="body.md" color="gray">
                            Badge automatically renders as dot when no content,
                            pill when count or text is provided
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
                        {/* Variant Display */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-3">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Variant (Automatic)
                                </Text>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    • No content → <strong>Dot</strong>
                                </p>
                                <p>
                                    • Count or Text → <strong>Pill</strong>
                                </p>
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
                                {sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`px-3 py-2 rounded-lg border text-sm uppercase ${
                                            size === s
                                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-3">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Color
                                </Text>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {colors.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`px-3 py-2 rounded-lg border text-sm capitalize ${
                                            color === c
                                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Settings */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-4">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Content Settings
                                </Text>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-600 block mb-2">
                                        Count: {count}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="150"
                                        value={count}
                                        onChange={(e) =>
                                            setCount(Number(e.target.value))
                                        }
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 block mb-2">
                                        Max Count: {maxCount}
                                    </label>
                                    <input
                                        type="range"
                                        min="9"
                                        max="999"
                                        value={maxCount}
                                        onChange={(e) =>
                                            setMaxCount(Number(e.target.value))
                                        }
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600 block mb-2">
                                        Custom Text (overrides count)
                                    </label>
                                    <input
                                        type="text"
                                        value={customText}
                                        onChange={(e) =>
                                            setCustomText(e.target.value)
                                        }
                                        placeholder="e.g. NEW, HOT"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Position Selection */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-white">
                            <div className="mb-3">
                                <Text
                                    as="h3"
                                    variant="heading.sm"
                                    fontWeight={600}
                                >
                                    Position (on elements)
                                </Text>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {positions.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPosition(p)}
                                        className={`px-2 py-2 rounded-lg border text-xs capitalize ${
                                            position === p
                                                ? 'bg-primary-100 border-primary-500 text-primary-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {p.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
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
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={showBadge}
                                        onChange={(e) =>
                                            setShowBadge(e.target.checked)
                                        }
                                        className="w-4 h-4"
                                    />
                                    Show Badge
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={showZero}
                                        onChange={(e) =>
                                            setShowZero(e.target.checked)
                                        }
                                        className="w-4 h-4"
                                    />
                                    Show Zero (show "0" when count is 0)
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
                                    Live Preview
                                </Text>
                            </div>

                            {/* Main Preview */}
                            <div className="flex flex-col items-center justify-center min-h-50 p-12 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl space-y-8">
                                {/* Dot Preview */}
                                <div className="text-center">
                                    <Text
                                        variant="body.sm"
                                        color="gray"
                                        className="mb-4"
                                    >
                                        Dot (no content)
                                    </Text>
                                    <Badge
                                        size={size}
                                        color={color}
                                        showBadge={showBadge}
                                    />
                                </div>

                                {/* Pill Preview */}
                                <div className="text-center">
                                    <Text
                                        variant="body.sm"
                                        color="gray"
                                        className="mb-4"
                                    >
                                        Pill with{' '}
                                        {customText ? 'text' : 'count'}
                                    </Text>
                                    <Badge
                                        count={customText ? undefined : count}
                                        maxCount={maxCount}
                                        text={customText || undefined}
                                        size={size}
                                        color={color}
                                        showBadge={showBadge}
                                        showZero={showZero}
                                    />
                                </div>
                            </div>

                            {/* Real World Examples Section */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="mb-6">
                                    <Text
                                        as="h4"
                                        variant="body.md"
                                        fontWeight={600}
                                    >
                                        Real World Examples
                                    </Text>
                                </div>

                                {/* Example 1: Icon Buttons with Badges */}
                                <div className="mb-8">
                                    <Text
                                        as="h5"
                                        variant="body.sm"
                                        fontWeight={600}
                                        className="mb-4 text-gray-500"
                                    >
                                        Icon Buttons
                                    </Text>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <Badge
                                            count={5}
                                            color={BadgeColor.ALERT}
                                            position={position}
                                        >
                                            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                                                <Bell className="w-5 h-5 text-gray-700" />
                                            </button>
                                        </Badge>
                                        <Badge
                                            count={12}
                                            color={BadgeColor.PRIMARY}
                                            position={position}
                                        >
                                            <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <Mail className="w-5 h-5 text-gray-700" />
                                            </button>
                                        </Badge>
                                        <Badge
                                            color={BadgeColor.SUCCESS}
                                            position={position}
                                            size={BadgeSize.LG}
                                            isCircular
                                        >
                                            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                                                <ShoppingCart className="w-5 h-5 text-gray-700" />
                                            </button>
                                        </Badge>
                                        <Badge
                                            count={99}
                                            color={BadgeColor.WARNING}
                                            position={position}
                                        >
                                            <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <Heart className="w-5 h-5 text-gray-700" />
                                            </button>
                                        </Badge>
                                    </div>
                                </div>
                                {/* Example 2: Circle Shapes */}
                                <div className="mb-8">
                                    <Text
                                        as="h5"
                                        variant="body.sm"
                                        fontWeight={600}
                                        className="mb-4 text-gray-500"
                                    >
                                        Circular Avatars with Badges
                                    </Text>
                                    <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                                        <Badge
                                            count={12}
                                            color={BadgeColor.PRIMARY}
                                            position="top-left"
                                            isCircular
                                        >
                                            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold"></div>
                                        </Badge>
                                        <Badge
                                            color={BadgeColor.WARNING}
                                            position="bottom-left"
                                            isCircular
                                            size={BadgeSize.LG}
                                        >
                                            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold"></div>
                                        </Badge>
                                        <Badge
                                            count={99}
                                            color={BadgeColor.NEUTRAL}
                                            position="top-right"
                                            isCircular
                                        >
                                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                                <User className="w-6 h-6" />
                                            </div>
                                        </Badge>
                                    </div>
                                </div>

                                {/* Example 3: Inline Badge Pills */}
                                <div className="mb-8">
                                    <Text
                                        as="h5"
                                        variant="body.sm"
                                        fontWeight={600}
                                        className="mb-4 text-gray-500"
                                    >
                                        Inline Badge Pills (Badge beside text)
                                    </Text>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg flex-wrap">
                                        {/* This is the pattern you want */}
                                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200">
                                            <span className="text-gray-800 font-medium">
                                                Messages
                                            </span>
                                            <Badge
                                                count={3}
                                                color={BadgeColor.ALERT}
                                                size={BadgeSize.MD}
                                            />
                                        </div>
                                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200">
                                            <span className="text-gray-800 font-medium">
                                                Notifications
                                            </span>
                                            <Badge
                                                count={12}
                                                color={BadgeColor.PRIMARY}
                                                size={BadgeSize.MD}
                                            />
                                        </div>
                                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200">
                                            <span className="text-gray-800 font-medium">
                                                Saved
                                            </span>
                                            <Badge
                                                text="NEW"
                                                color={BadgeColor.SUCCESS}
                                                size={BadgeSize.SM}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Example 4: Action Buttons with Overlay Badges */}
                                <div className="mb-8">
                                    <Text
                                        as="h5"
                                        variant="body.sm"
                                        fontWeight={600}
                                        className="mb-4 text-gray-500"
                                    >
                                        Overlay Badges (Badge on top of content)
                                    </Text>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <Badge
                                            count={3}
                                            color={BadgeColor.ALERT}
                                            position="top-right"
                                        >
                                            <Button>
                                                <span className="flex items-center gap-2">
                                                    <MessageCircle className="w-4 h-4" />
                                                    Messages
                                                </span>
                                            </Button>
                                        </Badge>
                                        <Badge
                                            text="NEW"
                                            color={BadgeColor.SUCCESS}
                                            position="top-right"
                                        >
                                            <Button>
                                                <span className="flex items-center gap-2">
                                                    <Bookmark className="w-4 h-4" />
                                                    Saved
                                                </span>
                                            </Button>
                                        </Badge>
                                        <Badge
                                            count={8}
                                            color={BadgeColor.PRIMARY}
                                            position="top-right"
                                        >
                                            <Button>
                                                <span className="flex items-center gap-2">
                                                    <NotificationIcon className="w-4 h-4" />
                                                    Alerts
                                                </span>
                                            </Button>
                                        </Badge>
                                    </div>
                                </div>

                                {/* Example 5: Navigation Items */}
                                <div className="mb-8">
                                    <Text
                                        as="h5"
                                        variant="body.sm"
                                        fontWeight={600}
                                        className="mb-4 text-gray-500"
                                    >
                                        Navigation with Notifications
                                    </Text>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <nav className="flex gap-2">
                                            {[
                                                {
                                                    icon: Home,
                                                    label: 'Home',
                                                    count: 0,
                                                },
                                                {
                                                    icon: MessageCircle,
                                                    label: 'Messages',
                                                    count: 5,
                                                },
                                                {
                                                    icon: Bell,
                                                    label: 'Notifications',
                                                    count: 12,
                                                },
                                                {
                                                    icon: User,
                                                    label: 'Profile',
                                                    count: 0,
                                                },
                                                {
                                                    icon: Settings,
                                                    label: 'Settings',
                                                    count: 1,
                                                },
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition-colors"
                                                >
                                                    {item.count > 0 ? (
                                                        <Badge
                                                            size={BadgeSize.SM}
                                                            count={item.count}
                                                            color={
                                                                BadgeColor.ALERT
                                                            }
                                                        >
                                                            <item.icon className="w-6 h-6 text-gray-700" />
                                                        </Badge>
                                                    ) : (
                                                        <item.icon className="w-5 h-5 text-gray-700" />
                                                    )}
                                                    <span className="text-sm text-gray-700">
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>

                                {/* Example 6: Cards with Feature Badges */}
                                <div className="mb-8">
                                    <Text
                                        as="h5"
                                        variant="body.sm"
                                        fontWeight={600}
                                        className="mb-4 text-gray-500"
                                    >
                                        Cards with Feature Badges
                                    </Text>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="relative p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                            <div className="absolute top-2 right-2">
                                                <Badge
                                                    text="POPULAR"
                                                    color={BadgeColor.WARNING}
                                                />
                                            </div>
                                            <div className="pt-6">
                                                <Text
                                                    variant="heading.sm"
                                                    fontWeight={600}
                                                >
                                                    Pro Plan
                                                </Text>
                                                <Text
                                                    variant="body.sm"
                                                    color="gray"
                                                    className="mt-2"
                                                >
                                                    Most popular choice for
                                                    teams
                                                </Text>
                                            </div>
                                        </div>
                                        <div className="relative p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                            <div className="absolute top-2 right-2">
                                                <Badge
                                                    text="NEW"
                                                    color={BadgeColor.SUCCESS}
                                                />
                                            </div>
                                            <div className="pt-6">
                                                <Text
                                                    variant="heading.sm"
                                                    fontWeight={600}
                                                >
                                                    Enterprise
                                                </Text>
                                                <Text
                                                    variant="body.sm"
                                                    color="gray"
                                                    className="mt-2"
                                                >
                                                    Advanced features for large
                                                    orgs
                                                </Text>
                                            </div>
                                        </div>
                                        <div className="relative p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                            <div className="absolute top-2 right-2">
                                                <Badge
                                                    text="-20%"
                                                    color={BadgeColor.PRIMARY}
                                                />
                                            </div>
                                            <div className="pt-6">
                                                <Text
                                                    variant="heading.sm"
                                                    fontWeight={600}
                                                >
                                                    Starter
                                                </Text>
                                                <Text
                                                    variant="body.sm"
                                                    color="gray"
                                                    className="mt-2"
                                                >
                                                    Perfect for getting started
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Example 7: Tab Navigation with Badges */}
                                <div>
                                    <Text
                                        as="h5"
                                        variant="body.sm"
                                        fontWeight={600}
                                        className="mb-4 text-gray-500"
                                    >
                                        Tab Navigation with Counts
                                    </Text>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex border-b border-gray-200">
                                            {tabsWithBadges.map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() =>
                                                        setActiveTab(tab.id)
                                                    }
                                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                                        activeTab === tab.id
                                                            ? 'border-primary-500 text-primary-600'
                                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    {tab.label}
                                                    {tab.count > 0 && (
                                                        <Badge
                                                            count={tab.count}
                                                            size={BadgeSize.SM}
                                                            color={
                                                                activeTab ===
                                                                tab.id
                                                                    ? BadgeColor.PRIMARY
                                                                    : BadgeColor.NEUTRAL
                                                            }
                                                        />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="p-4">
                                            <Text
                                                variant="body.sm"
                                                color="gray"
                                            >
                                                Active tab:{' '}
                                                {
                                                    tabsWithBadges.find(
                                                        (t) =>
                                                            t.id === activeTab
                                                    )?.label
                                                }
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BadgeDemo
