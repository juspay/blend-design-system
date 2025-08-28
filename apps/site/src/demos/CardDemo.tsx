import { useState } from 'react'
import {
    Card,
    CardHeaderVariant,
} from '../../../../packages/blend/lib/components/Card'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { TextArea } from '../../../../packages/blend/lib/components/Inputs/TextArea'
import {
    Button,
    ButtonSize,
    ButtonType,
} from '../../../../packages/blend/lib/components/Button'

import {
    Download,
    Share,
    Heart,
    Star,
    Search,
    Bell,
    User,
    Shield,
    Calendar,
    FileText,
    BarChart3,
    TrendingUp,
    DollarSign,
} from 'lucide-react'

const CardDemo = () => {
    // Playground state
    const [playgroundHeaderVariant, setPlaygroundHeaderVariant] =
        useState<CardHeaderVariant>(CardHeaderVariant.DEFAULT)
    const [playgroundTitle, _setPlaygroundTitle] = useState('Card Title')
    const [playgroundSubtitle, _setPlaygroundSubtitle] =
        useState('This is a subtitle')
    const [playgroundContent, setPlaygroundContent] = useState(
        'This is the main content of the card. You can put any content here including text, images, buttons, and other components.'
    )
    const [playgroundMaxWidth, _setPlaygroundMaxWidth] = useState('400px')
    const [showHeader, setShowHeader] = useState(true)
    const [showTitle, setShowTitle] = useState(true)
    const [showSubtitle, setShowSubtitle] = useState(true)
    const [showActions, setShowActions] = useState(true)
    const [useHeaderSlot, setUseHeaderSlot] = useState(false)

    // Options for selects
    const headerVariantOptions = [
        { value: CardHeaderVariant.DEFAULT, label: 'Default' },
        { value: CardHeaderVariant.BORDERED, label: 'Bordered' },
        { value: CardHeaderVariant.ELEVATED, label: 'Elevated' },
    ]

    const getHeaderActions = () => (
        <div className="flex items-center gap-2">
            <Button
                size={ButtonSize.SMALL}
                buttonType={ButtonType.SECONDARY}
                text="Edit"
            />
            <Button
                size={ButtonSize.SMALL}
                buttonType={ButtonType.SECONDARY}
                text="More"
            />
        </div>
    )

    const getCustomHeaderSlot = () => (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">
                        Custom Header
                    </h3>
                    <p className="text-sm text-gray-600">With custom styling</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    size={ButtonSize.SMALL}
                    buttonType={ButtonType.PRIMARY}
                    text="Action"
                />
            </div>
        </div>
    )

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <SingleSelect
                            label="Header Variant"
                            items={[{ items: headerVariantOptions }]}
                            selected={playgroundHeaderVariant}
                            onSelect={(value) =>
                                setPlaygroundHeaderVariant(
                                    value as CardHeaderVariant
                                )
                            }
                            placeholder="Select header variant"
                        />
                    </div>

                    <div>
                        <TextArea
                            label="Content"
                            value={playgroundContent}
                            onChange={(e) =>
                                setPlaygroundContent(e.target.value)
                            }
                            placeholder="Enter card content"
                            rows={3}
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Show Header"
                            checked={showHeader}
                            onChange={() => setShowHeader(!showHeader)}
                        />
                        <Switch
                            label="Show Title"
                            checked={showTitle}
                            onChange={() => setShowTitle(!showTitle)}
                        />
                        <Switch
                            label="Show Subtitle"
                            checked={showSubtitle}
                            onChange={() => setShowSubtitle(!showSubtitle)}
                        />
                        <Switch
                            label="Show Actions"
                            checked={showActions}
                            onChange={() => setShowActions(!showActions)}
                        />
                        <Switch
                            label="Use Header Slot"
                            checked={useHeaderSlot}
                            onChange={() => setUseHeaderSlot(!useHeaderSlot)}
                        />
                    </div>

                    <div className="w-full max-w-2xl">
                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                        <Card
                            maxWidth={playgroundMaxWidth}
                            header={
                                showHeader && !useHeaderSlot
                                    ? {
                                          variant: playgroundHeaderVariant,
                                          title: showTitle
                                              ? playgroundTitle
                                              : undefined,
                                          subtitle: showSubtitle
                                              ? playgroundSubtitle
                                              : undefined,
                                          actions: showActions
                                              ? getHeaderActions()
                                              : undefined,
                                      }
                                    : undefined
                            }
                            headerSlot={
                                useHeaderSlot
                                    ? getCustomHeaderSlot()
                                    : undefined
                            }
                        >
                            <div className="space-y-4">
                                <p className="text-gray-700">
                                    {playgroundContent}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        size={ButtonSize.SMALL}
                                        buttonType={ButtonType.PRIMARY}
                                        text="Primary Action"
                                    />
                                    <Button
                                        size={ButtonSize.SMALL}
                                        buttonType={ButtonType.SECONDARY}
                                        text="Secondary"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Header Variants Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Header Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        maxWidth="350px"
                        header={{
                            variant: CardHeaderVariant.DEFAULT,
                            title: 'Default Header',
                            subtitle: 'Clean and minimal',
                            actions: (
                                <Button
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.SECONDARY}
                                    text="Settings"
                                />
                            ),
                        }}
                    >
                        <p className="text-gray-600">
                            This card uses the default header style with no
                            border or background.
                        </p>
                    </Card>

                    <Card
                        maxWidth="350px"
                        header={{
                            variant: CardHeaderVariant.BORDERED,
                            title: 'Bordered Header',
                            subtitle: 'With bottom border',
                            actions: (
                                <Button
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.SECONDARY}
                                    text="More"
                                />
                            ),
                        }}
                    >
                        <p className="text-gray-600">
                            This card has a bordered header that separates the
                            header from content.
                        </p>
                    </Card>

                    <Card
                        maxWidth="350px"
                        header={{
                            variant: CardHeaderVariant.ELEVATED,
                            title: 'Elevated Header',
                            subtitle: 'With background color',
                            actions: (
                                <Button
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.SECONDARY}
                                    text="Share"
                                />
                            ),
                        }}
                    >
                        <p className="text-gray-600">
                            This card has an elevated header with a background
                            color.
                        </p>
                    </Card>
                </div>
            </div>

            {/* Custom Header Slot Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Custom Header Slot</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                        maxWidth="400px"
                        headerSlot={
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                        <DollarSign
                                            size={24}
                                            className="text-white"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">
                                            Revenue
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Monthly statistics
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-600">
                                        $24,500
                                    </p>
                                    <p className="text-sm text-green-500 flex items-center gap-1">
                                        <TrendingUp size={14} />
                                        +12.5%
                                    </p>
                                </div>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        This Week
                                    </p>
                                    <p className="text-lg font-semibold">
                                        $6,200
                                    </p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        Last Week
                                    </p>
                                    <p className="text-lg font-semibold">
                                        $5,800
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card
                        maxWidth="400px"
                        headerSlot={
                            <div className="flex items-center gap-4 p-4 border-l-4 border-blue-500 bg-blue-50">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Bell size={20} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">
                                        Notification Center
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        3 new updates
                                    </p>
                                </div>
                                <Button
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.PRIMARY}
                                >
                                    View All
                                </Button>
                            </div>
                        }
                    >
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Shield size={16} className="text-blue-500" />
                                <span className="text-sm">
                                    Security update available
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <FileText
                                    size={16}
                                    className="text-green-500"
                                />
                                <span className="text-sm">
                                    New report generated
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <User size={16} className="text-purple-500" />
                                <span className="text-sm">
                                    Team member added
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Different Content Types Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Different Content Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Simple Text Card */}
                    <Card
                        maxWidth="300px"
                        header={{
                            title: 'Simple Text Card',
                            subtitle: 'Basic content',
                        }}
                    >
                        <p className="text-gray-700 leading-relaxed">
                            This is a simple card with just text content.
                            Perfect for displaying information, descriptions, or
                            simple messages.
                        </p>
                    </Card>

                    {/* Form Card */}
                    <Card
                        maxWidth="300px"
                        header={{
                            title: 'Contact Form',
                            subtitle: 'Get in touch',
                            variant: CardHeaderVariant.BORDERED,
                        }}
                    >
                        <div className="space-y-4">
                            {/* <TextInput
                                placeholder="Your name"
                                size="sm"
                            />
                            <TextInput
                                placeholder="Email address"
                                type="email"
                                size="sm"
                            />
                            <TextArea
                                placeholder="Your message"
                                rows={3}
                            /> */}
                            <Button
                                size={ButtonSize.SMALL}
                                buttonType={ButtonType.PRIMARY}
                                text="Send Message"
                            />
                        </div>
                    </Card>

                    {/* Statistics Card */}
                    <Card
                        maxWidth="300px"
                        header={{
                            title: 'Analytics',
                            subtitle: 'Last 30 days',
                            variant: CardHeaderVariant.ELEVATED,
                            actions: (
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                >
                                    <BarChart3 size={16} />
                                </Button>
                            ),
                        }}
                    >
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">
                                        1,247
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Visitors
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">
                                        89%
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Success Rate
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: '89%' }}
                                ></div>
                            </div>
                        </div>
                    </Card>

                    {/* Action Card */}
                    <Card
                        maxWidth="300px"
                        header={{
                            title: 'Quick Actions',
                            subtitle: 'Commonly used',
                        }}
                    >
                        <div className="space-y-3">
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Download Report"
                            >
                                <Download size={16} className="mr-2" />
                            </Button>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Schedule Meeting"
                            >
                                <Calendar size={16} className="mr-2" />
                            </Button>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Share Document"
                            >
                                <Share size={16} className="mr-2" />
                            </Button>
                        </div>
                    </Card>

                    {/* Profile Card */}
                    <Card
                        maxWidth="300px"
                        header={{
                            title: 'Team Member',
                            subtitle: 'Frontend Developer',
                            variant: CardHeaderVariant.BORDERED,
                        }}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                    <User size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        Sarah Wilson
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        sarah@company.com
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.PRIMARY}
                                    text="Message"
                                />
                                <Button
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.SECONDARY}
                                    text="View Profile"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Empty State Card */}
                    <Card
                        maxWidth="300px"
                        header={{
                            title: 'No Content',
                            subtitle: 'Nothing to show',
                        }}
                    >
                        <div className="text-center py-8 space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">
                                    No items found
                                </p>
                                <p className="text-gray-400 text-xs">
                                    Try adjusting your search criteria
                                </p>
                            </div>
                            <Button
                                size={ButtonSize.SMALL}
                                buttonType={ButtonType.PRIMARY}
                                text="Reset Filters"
                            />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Max Width Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Max Width Examples</h2>
                <div className="space-y-6">
                    <Card
                        maxWidth="200px"
                        header={{
                            title: 'Small Card',
                            subtitle: '200px width',
                        }}
                    >
                        <p className="text-sm text-gray-600">
                            This card has a maximum width of 200px.
                        </p>
                    </Card>

                    <Card
                        maxWidth="500px"
                        header={{
                            title: 'Medium Card',
                            subtitle: '500px width',
                            variant: CardHeaderVariant.BORDERED,
                        }}
                    >
                        <p className="text-gray-600">
                            This card has a maximum width of 500px, making it
                            suitable for more content.
                        </p>
                    </Card>

                    <Card
                        maxWidth="800px"
                        header={{
                            title: 'Large Card',
                            subtitle: '800px width',
                            variant: CardHeaderVariant.ELEVATED,
                            actions: (
                                <div className="flex gap-2">
                                    <Button
                                        size={ButtonSize.SMALL}
                                        buttonType={ButtonType.SECONDARY}
                                    >
                                        <Heart size={16} />
                                    </Button>
                                    <Button
                                        size={ButtonSize.SMALL}
                                        buttonType={ButtonType.SECONDARY}
                                    >
                                        <Star size={16} />
                                    </Button>
                                </div>
                            ),
                        }}
                    >
                        <p className="text-gray-600">
                            This card has a maximum width of 800px, perfect for
                            dashboard widgets or detailed content sections that
                            need more horizontal space.
                        </p>
                    </Card>

                    <Card
                        header={{
                            title: 'Full Width Card',
                            subtitle: 'No max width constraint',
                        }}
                    >
                        <p className="text-gray-600">
                            This card has no maximum width constraint and will
                            expand to fill its container, making it perfect for
                            full-width layouts.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CardDemo
