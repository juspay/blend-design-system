import { useState } from 'react'
import {
    StatCard,
    StatCardVariant,
    ChangeType,
    StatCardDirection,
    StatCardArrowDirection,
} from '../../../../packages/blend/lib/components/StatCard'
import { AxisType } from '../../../../packages/blend/lib/components/Charts'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'

import {
    DollarSign,
    Users,
    TrendingUp,
    TrendingDown,
    BarChart3,
    Settings,
    Download,
    Upload,
    Activity,
    Target,
    Star,
    Info,
    EllipsisVertical,
} from 'lucide-react'
import { Popover } from '../../../../packages/blend/lib/main'

const StatCardDemo = () => {
    // Playground state
    const [playgroundVariant, setPlaygroundVariant] = useState<StatCardVariant>(
        StatCardVariant.NUMBER
    )
    const [playgroundTitle, setPlaygroundTitle] = useState('Authorization Rate')
    const [playgroundValue, setPlaygroundValue] = useState('83.24%')
    const [playgroundSubtitle, setPlaygroundSubtitle] = useState('Last 7 days')
    const [showChange, setShowChange] = useState(true)
    const [changeType, setChangeType] = useState<ChangeType>(
        ChangeType.INCREASE
    )
    const [changeValue, setChangeValue] = useState(23.45)
    const [showTitleIcon, setShowTitleIcon] = useState(true)
    const [showActionIcon, setShowActionIcon] = useState(false)
    const [showHelpIcon, setShowHelpIcon] = useState(false)
    const [progressValue, setProgressValue] = useState(75)
    const [dropdownValue, setDropdownValue] = useState('INR')
    const [arrowDirection, setArrowDirection] =
        useState<StatCardArrowDirection>(StatCardArrowDirection.UP)

    const [showSkeleton, setShowSkeleton] = useState(false)

    const [dataDisplay, setDataDisplay] = useState(true)
    // Sample chart data
    const sampleLineData = [
        { value: 100, name: 'JAN' },
        { value: 120, name: 'FEB' },
        { value: 110, name: 'MAR' },
        { value: 140, name: 'APR' },
        { value: 130, name: 'MAY' },
        { value: 160, name: 'JUN' },
        { value: 150, name: 'JUL' },
    ]

    const sampleBarData = [
        { value: 80, name: 'MON' },
        { value: 95, name: 'TUE' },
        { value: 70, name: 'WED' },
        { value: 110, name: 'THU' },
        { value: 85, name: 'FRI' },
        { value: 120, name: 'SAT' },
        { value: 90, name: 'SUN' },
    ]

    // Options for selects
    const variantOptions = [
        { value: StatCardVariant.NUMBER, label: 'Number' },
        { value: StatCardVariant.LINE, label: 'Line Chart' },
        { value: StatCardVariant.BAR, label: 'Bar Chart' },
        { value: StatCardVariant.PROGRESS_BAR, label: 'Progress Bar' },
    ]

    const changeTypeOptions = [
        { value: ChangeType.INCREASE, label: 'Increase' },
        { value: ChangeType.DECREASE, label: 'Decrease' },
    ]

    const getIconForVariant = (variant: StatCardVariant) => {
        switch (variant) {
            case StatCardVariant.LINE:
                return <TrendingUp size={16} />
            case StatCardVariant.BAR:
                return <BarChart3 size={16} />
            case StatCardVariant.PROGRESS_BAR:
                return <Target size={16} />
            default:
                return <DollarSign size={16} />
        }
    }

    const getActionIcon = () => {
        return <Settings size={16} />
    }

    const handleDropdownSelect = (value: string) => {
        setDropdownValue(value)
    }

    const handleArrowDirectionChange = (value: StatCardArrowDirection) => {
        setArrowDirection(value)
    }

    const InfoPopoverExample = () => {
        return (
            <Popover
                heading="Help Information"
                trigger={<span>+4 more</span>}
                side="top"
                showCloseButton={false}
                minWidth={280}
            >
                <div className="p-4">
                    <div className="flex items-start gap-3">
                        <Info className="text-blue-500 mt-0.5" size={16} />
                        <div>
                            <p className="text-sm text-gray-700 font-medium mb-1">
                                Quick Tip
                            </p>
                            <p className="text-sm text-gray-600">
                                You can use keyboard shortcuts to navigate
                                faster. Press Ctrl+K to open the command
                                palette.
                            </p>
                        </div>
                    </div>
                </div>
            </Popover>
        )
    }

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={playgroundVariant}
                            onSelect={(value) =>
                                setPlaygroundVariant(value as StatCardVariant)
                            }
                            placeholder="Select variant"
                        />

                        <TextInput
                            label="Title"
                            value={playgroundTitle}
                            onChange={(e) => setPlaygroundTitle(e.target.value)}
                            placeholder="Enter title"
                        />

                        <TextInput
                            label="Value"
                            value={playgroundValue}
                            onChange={(e) => setPlaygroundValue(e.target.value)}
                            placeholder="Enter value"
                        />
                        <SingleSelect
                            label="Arrow Direction"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Up',
                                            value: StatCardArrowDirection.UP,
                                        },
                                        {
                                            label: 'Down',
                                            value: StatCardArrowDirection.DOWN,
                                        },
                                    ],
                                },
                            ]}
                            selected={arrowDirection}
                            onSelect={(value) =>
                                handleArrowDirectionChange(
                                    value as StatCardArrowDirection
                                )
                            }
                            placeholder="Select arrow direction"
                        />

                        <TextInput
                            label="Subtitle"
                            value={playgroundSubtitle}
                            onChange={(e) =>
                                setPlaygroundSubtitle(e.target.value)
                            }
                            placeholder="Enter subtitle"
                        />

                        <SingleSelect
                            label="Change Type"
                            items={[{ items: changeTypeOptions }]}
                            selected={changeType}
                            onSelect={(value) =>
                                setChangeType(value as ChangeType)
                            }
                            placeholder="Select change type"
                        />

                        <TextInput
                            label="Change Value"
                            value={changeValue.toString()}
                            onChange={(e) =>
                                setChangeValue(parseFloat(e.target.value) || 0)
                            }
                            placeholder="Enter change value"
                            type="number"
                        />

                        {playgroundVariant === StatCardVariant.PROGRESS_BAR && (
                            <TextInput
                                label="Progress Value"
                                value={progressValue.toString()}
                                onChange={(e) =>
                                    setProgressValue(
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                placeholder="Enter progress value"
                                type="number"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Show Change"
                            checked={showChange}
                            onChange={() => setShowChange(!showChange)}
                        />
                        <Switch
                            label="Show Title Icon"
                            checked={showTitleIcon}
                            onChange={() => setShowTitleIcon(!showTitleIcon)}
                        />
                        <Switch
                            label="Show Action Icon"
                            checked={showActionIcon}
                            onChange={() => setShowActionIcon(!showActionIcon)}
                        />
                        <Switch
                            label="Show Help Icon"
                            checked={showHelpIcon}
                            onChange={() => setShowHelpIcon(!showHelpIcon)}
                        />
                        <Switch
                            label="Show Skeleton"
                            checked={showSkeleton}
                            onChange={() => setShowSkeleton(!showSkeleton)}
                        />
                        <Switch
                            label="Show Data Display"
                            checked={dataDisplay}
                            onChange={() => setDataDisplay(!dataDisplay)}
                        />
                    </div>
                    <div className="w-[350px]">
                        <StatCard
                            skeleton={{
                                show: showSkeleton,
                                variant: 'pulse',
                            }}
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title={playgroundTitle}
                            value={playgroundValue}
                            valueTooltip={<code>This is a value tooltip</code>}
                            subtitle={playgroundSubtitle}
                            variant={playgroundVariant}
                            change={
                                showChange
                                    ? {
                                          value: changeValue,
                                          valueType: changeType,
                                          arrowDirection: arrowDirection,
                                          tooltip: (
                                              <code>
                                                  This is a delta tooltip
                                              </code>
                                          ),
                                      }
                                    : undefined
                            }
                            titleIcon={
                                showTitleIcon
                                    ? getIconForVariant(playgroundVariant)
                                    : undefined
                            }
                            actionIcon={
                                showActionIcon ? getActionIcon() : undefined
                            }
                            helpIconText={
                                showHelpIcon
                                    ? 'This metric shows the total revenue generated over the selected period.'
                                    : undefined
                            }
                            chartData={
                                playgroundVariant === StatCardVariant.LINE
                                    ? sampleLineData
                                    : playgroundVariant === StatCardVariant.BAR
                                      ? sampleBarData
                                      : undefined
                            }
                            dataDisplay={dataDisplay}
                            progressValue={
                                playgroundVariant ===
                                StatCardVariant.PROGRESS_BAR
                                    ? progressValue
                                    : undefined
                            }
                        />
                    </div>
                </div>
            </div>

            {/* StatCard Variants */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">StatCard Variants</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Number Variant
                        </h3>
                        <StatCard
                            actionIcon={<EllipsisVertical size={16} />}
                            height="250px"
                            title="Total Revenue"
                            value="$12,345"
                            subtitle="vs last month"
                            variant={StatCardVariant.NUMBER}
                            change={{
                                value: 12.5,
                                valueType: ChangeType.INCREASE,
                                arrowDirection: StatCardArrowDirection.DOWN,
                            }}
                            titleIcon={<DollarSign size={16} />}
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            chartData={sampleLineData}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Line Chart</h3>
                        <StatCard
                            direction={StatCardDirection.HORIZONTAL}
                            // height="200px"
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="GMV Trend "
                            value="$8,234"
                            subtitle="last 7 days"
                            variant={StatCardVariant.LINE}
                            change={{
                                value: 8.2,
                                valueType: ChangeType.INCREASE,
                            }}
                            helpIconText="This is a help icon"
                            titleIcon={<TrendingUp size={16} />}
                            chartData={sampleLineData}
                            actionIcon={<InfoPopoverExample />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Bar Chart</h3>
                        <StatCard
                            height="190px"
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Daily Sales"
                            value="$1,234"
                            subtitle="today's sales"
                            variant={StatCardVariant.BAR}
                            change={{
                                value: -2.1,
                                valueType: ChangeType.DECREASE,
                            }}
                            titleIcon={<BarChart3 size={16} />}
                            chartData={sampleBarData}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Progress Bar</h3>
                        <StatCard
                            height="190px"
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Goal Progress"
                            value="75%"
                            subtitle="target: 100%"
                            variant={StatCardVariant.PROGRESS_BAR}
                            titleIcon={<Target size={16} />}
                            progressValue={75}
                        />
                    </div>
                </div>
            </div>

            {/* Change Indicators */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Change Indicators</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Positive Change
                        </h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Active Users"
                            value="2,847"
                            subtitle="vs last week"
                            variant={StatCardVariant.NUMBER}
                            change={{
                                value: 15.3,
                                valueType: ChangeType.INCREASE,
                            }}
                            titleIcon={<Users size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Negative Change
                        </h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Bounce Rate"
                            value="23.4%"
                            subtitle="vs last week"
                            variant={StatCardVariant.NUMBER}
                            change={{
                                value: 5.2,
                                valueType: ChangeType.DECREASE,
                            }}
                            titleIcon={<TrendingDown size={16} />}
                        />
                    </div>
                </div>
            </div>

            {/* With Icons */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">With Icons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Title Icon Only
                        </h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Downloads"
                            value="1,234"
                            subtitle="this month"
                            variant={StatCardVariant.NUMBER}
                            change={{
                                value: 8.7,
                                valueType: ChangeType.INCREASE,
                            }}
                            titleIcon={<Download size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Action Icon</h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Uploads"
                            value="567"
                            subtitle="this month"
                            variant={StatCardVariant.NUMBER}
                            change={{
                                value: 12.1,
                                valueType: ChangeType.INCREASE,
                            }}
                            titleIcon={<Upload size={16} />}
                            actionIcon={<Settings size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Help Icon</h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Conversion Rate"
                            value="3.2%"
                            subtitle="vs last month"
                            variant={StatCardVariant.NUMBER}
                            change={{
                                value: 0.5,
                                valueType: ChangeType.INCREASE,
                            }}
                            titleIcon={<Activity size={16} />}
                            helpIconText="Conversion rate is the percentage of visitors who complete a desired action."
                        />
                    </div>
                </div>
            </div>

            {/* Chart Variants with Data */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Chart Variants</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Line Chart - Trending Up
                        </h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Revenue Growth"
                            value="$45,678"
                            subtitle="last 30 days"
                            variant={StatCardVariant.LINE}
                            change={{
                                value: 23.4,
                                valueType: ChangeType.INCREASE,
                            }}
                            titleIcon={<TrendingUp size={16} />}
                            chartData={sampleLineData}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Bar Chart - Daily Metrics
                        </h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Daily Orders"
                            value="234"
                            subtitle="today's orders"
                            variant={StatCardVariant.BAR}
                            change={{
                                value: 12.8,
                                valueType: ChangeType.INCREASE,
                            }}
                            titleIcon={<BarChart3 size={16} />}
                            chartData={sampleBarData}
                        />
                    </div>
                </div>
            </div>

            {/* Progress Variants */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Progress Variants</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Low Progress</h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Task Completion"
                            value="25%"
                            subtitle="4 of 16 tasks"
                            variant={StatCardVariant.PROGRESS_BAR}
                            titleIcon={<Target size={16} />}
                            progressValue={25}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Medium Progress
                        </h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Project Milestone"
                            value="60%"
                            subtitle="3 of 5 phases"
                            variant={StatCardVariant.PROGRESS_BAR}
                            titleIcon={<Star size={16} />}
                            progressValue={60}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">High Progress</h3>
                        <StatCard
                            dropdownProps={{
                                label: 'Currency',
                                placeholder: 'Currency',
                                items: [
                                    {
                                        items: [
                                            { label: 'USD', value: 'USD' },
                                            { label: 'EUR', value: 'EUR' },
                                            { label: 'GBP', value: 'GBP' },
                                            { label: 'INR', value: 'INR' },
                                        ],
                                    },
                                ],
                                selected: dropdownValue,
                                onSelect: handleDropdownSelect,
                            }}
                            title="Sales Target"
                            value="90%"
                            subtitle="$9,000 of $10,000"
                            variant={StatCardVariant.PROGRESS_BAR}
                            titleIcon={<DollarSign size={16} />}
                            progressValue={90}
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Dashboard Overview
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            <StatCard
                                dropdownProps={{
                                    label: 'Currency',
                                    placeholder: 'Currency',
                                    items: [
                                        {
                                            items: [
                                                { label: 'USD', value: 'USD' },
                                                { label: 'EUR', value: 'EUR' },
                                                { label: 'GBP', value: 'GBP' },
                                                { label: 'INR', value: 'INR' },
                                            ],
                                        },
                                    ],
                                    selected: dropdownValue,
                                    onSelect: handleDropdownSelect,
                                }}
                                title="Total Revenue"
                                value="$124,567"
                                subtitle="this quarter"
                                variant={StatCardVariant.NUMBER}
                                change={{
                                    value: 18.7,
                                    valueType: ChangeType.INCREASE,
                                }}
                                titleIcon={<DollarSign size={16} />}
                                actionIcon={<Settings size={16} />}
                            />

                            <StatCard
                                dropdownProps={{
                                    label: 'Currency',
                                    placeholder: 'Currency',
                                    items: [
                                        {
                                            items: [
                                                { label: 'USD', value: 'USD' },
                                                { label: 'EUR', value: 'EUR' },
                                                { label: 'GBP', value: 'GBP' },
                                                { label: 'INR', value: 'INR' },
                                            ],
                                        },
                                    ],
                                    selected: dropdownValue,
                                    onSelect: handleDropdownSelect,
                                }}
                                title="Active Users"
                                value="12,847"
                                subtitle="current users"
                                variant={StatCardVariant.LINE}
                                change={{
                                    value: 12.3,
                                    valueType: ChangeType.INCREASE,
                                }}
                                titleIcon={<Users size={16} />}
                                chartData={sampleLineData}
                            />

                            <StatCard
                                dropdownProps={{
                                    label: 'Currency',
                                    placeholder: 'Currency',
                                    items: [
                                        {
                                            items: [
                                                { label: 'USD', value: 'USD' },
                                                { label: 'EUR', value: 'EUR' },
                                                { label: 'GBP', value: 'GBP' },
                                                { label: 'INR', value: 'INR' },
                                            ],
                                        },
                                    ],
                                    selected: dropdownValue,
                                    onSelect: handleDropdownSelect,
                                }}
                                title="Conversion Rate"
                                value="3.8%"
                                subtitle="vs last month"
                                variant={StatCardVariant.NUMBER}
                                change={{
                                    value: 0.4,
                                    valueType: ChangeType.INCREASE,
                                }}
                                titleIcon={<Activity size={16} />}
                                helpIconText="Percentage of visitors who complete a purchase."
                            />

                            <StatCard
                                dropdownProps={{
                                    label: 'Currency',
                                    placeholder: 'Currency',
                                    items: [
                                        {
                                            items: [
                                                { label: 'USD', value: 'USD' },
                                                { label: 'EUR', value: 'EUR' },
                                                { label: 'GBP', value: 'GBP' },
                                                { label: 'INR', value: 'INR' },
                                            ],
                                        },
                                    ],
                                    selected: dropdownValue,
                                    onSelect: handleDropdownSelect,
                                }}
                                title="Monthly Goal"
                                value="85%"
                                subtitle="$85,000 of $100,000"
                                variant={StatCardVariant.PROGRESS_BAR}
                                titleIcon={<Target size={16} />}
                                progressValue={85}
                            />
                        </div>
                    </div>
                </div>

                {/* AxisType Formatting Examples */}
                <div>
                    <h3 className="text-xl font-bold mb-6">
                        🎯 AxisType Formatting Examples
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                        StatCard now supports the same AxisType formatting as
                        Charts! Format main values, tooltip labels, and tooltip
                        values with currency, percentage, number, and date/time
                        formatters.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Currency Formatting */}
                        <StatCard
                            title="Monthly Revenue"
                            value={125000}
                            valueFormatter={AxisType.CURRENCY}
                            subtitle="Last 30 days"
                            variant={StatCardVariant.LINE}
                            titleIcon={<DollarSign size={16} />}
                            chartData={[
                                { value: 89000, name: '1693036800' },
                                { value: 95000, name: '1693123200' },
                                { value: 102000, name: '1693209600' },
                                { value: 125000, name: '1693296000' },
                            ]}
                            xAxis={{
                                type: AxisType.DATE_TIME,
                                dateOnly: true,
                            }}
                            yAxis={{
                                type: AxisType.CURRENCY,
                            }}
                            change={{
                                value: 12.5,
                                valueType: ChangeType.INCREASE,
                                tooltip:
                                    'Revenue increased by 12.5% this month',
                            }}
                        />

                        {/* Percentage Formatting */}
                        <StatCard
                            title="Conversion Rate"
                            value={87.5}
                            valueFormatter={AxisType.PERCENTAGE}
                            subtitle="Success rate"
                            variant={StatCardVariant.BAR}
                            titleIcon={<Target size={16} />}
                            chartData={[
                                { value: 82.1, name: 'Week 1' },
                                { value: 85.3, name: 'Week 2' },
                                { value: 84.7, name: 'Week 3' },
                                { value: 87.5, name: 'Week 4' },
                            ]}
                            yAxis={{
                                type: AxisType.PERCENTAGE,
                            }}
                            change={{
                                value: 3.2,
                                valueType: ChangeType.INCREASE,
                                tooltip: 'Conversion rate improved by 3.2%',
                            }}
                        />

                        {/* Number Formatting */}
                        <StatCard
                            title="Active Users"
                            value={1250000}
                            valueFormatter={AxisType.NUMBER}
                            subtitle="Total registered"
                            variant={StatCardVariant.LINE}
                            titleIcon={<Users size={16} />}
                            chartData={[
                                { value: 890000, name: 'Jan' },
                                { value: 950000, name: 'Feb' },
                                { value: 1100000, name: 'Mar' },
                                { value: 1250000, name: 'Apr' },
                            ]}
                            yAxis={{
                                type: AxisType.NUMBER,
                            }}
                            change={{
                                value: 18.7,
                                valueType: ChangeType.INCREASE,
                                tooltip: 'User base grew by 18.7% this quarter',
                            }}
                        />

                        {/* Date/Time Formatting */}
                        <StatCard
                            title="Last Transaction"
                            value="Latest Activity"
                            subtitle="Real-time data"
                            variant={StatCardVariant.BAR}
                            titleIcon={<Activity size={16} />}
                            chartData={[
                                { value: 450, name: '1693065600' },
                                { value: 520, name: '1693069200' },
                                { value: 380, name: '1693072800' },
                                { value: 610, name: '1693076400' },
                            ]}
                            xAxis={{
                                type: AxisType.DATE_TIME,
                            }}
                            yAxis={{
                                type: AxisType.NUMBER,
                            }}
                        />

                        {/* Custom Formatters */}
                        <StatCard
                            title="Custom Formatting"
                            value={42}
                            subtitle="With custom formatters"
                            variant={StatCardVariant.LINE}
                            titleIcon={<Settings size={16} />}
                            chartData={[
                                { value: 35, name: 'Q1' },
                                { value: 38, name: 'Q2' },
                                { value: 40, name: 'Q3' },
                                { value: 42, name: 'Q4' },
                            ]}
                            xAxis={{
                                tickFormatter: (value) => `Period ${value}`,
                            }}
                            yAxis={{
                                tickFormatter: (value) => `${value} units`,
                            }}
                        />

                        {/* Smart Date/Time */}
                        <StatCard
                            title="Hourly Analytics"
                            value="Smart Dates"
                            subtitle="Same day = time only"
                            variant={StatCardVariant.LINE}
                            titleIcon={<TrendingUp size={16} />}
                            chartData={[
                                { value: 3494, name: '1756400400000' },
                                { value: 197707.27, name: '1756396800000' },
                                { value: 85205.24, name: '1756393200000' },
                                { value: 109079.03, name: '1756389600000' },
                                { value: 2733949.17, name: '1756386000000' },
                                { value: 1626232.61, name: '1756382400000' },
                                { value: 2543610.48, name: '1756378800000' },
                                { value: 1145698.64, name: '1756375200000' },
                                { value: 14400, name: '1756371600000' },
                                { value: 21696, name: '1756368000000' },
                                { value: 7298, name: '1756364400000' },
                                { value: 0, name: '1756360800000' },
                                { value: 0, name: '1756357200000' },
                                { value: 0, name: '1756353600000' },
                                { value: 0, name: '1756350000000' },
                                { value: 0, name: '1756346400000' },
                                { value: 0, name: '1756342800000' },
                                { value: 0, name: '1756339200000' },
                            ]}
                            xAxis={{
                                type: AxisType.NUMBER,
                            }}
                            yAxis={{
                                type: AxisType.DATE_TIME,
                            }}
                        />
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-blue-800 font-semibold mb-2">
                            🚀 New StatCard Formatting Features:
                        </h4>
                        <div className="text-sm text-blue-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <strong>Main Value Formatting:</strong>
                                <ul className="ml-4 mt-1 space-y-1">
                                    <li>
                                        •{' '}
                                        <code>
                                            valueFormatter={AxisType.CURRENCY}
                                        </code>
                                    </li>
                                    <li>
                                        •{' '}
                                        <code>
                                            valueFormatter={AxisType.PERCENTAGE}
                                        </code>
                                    </li>
                                    <li>
                                        •{' '}
                                        <code>
                                            valueFormatter={AxisType.NUMBER}
                                        </code>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <strong>Tooltip Formatting:</strong>
                                <ul className="ml-4 mt-1 space-y-1">
                                    <li>
                                        •{' '}
                                        <code>
                                            xAxis={`{type: AxisType.DATE_TIME}`}
                                        </code>
                                    </li>
                                    <li>
                                        •{' '}
                                        <code>
                                            yAxis={`{type: AxisType.CURRENCY}`}
                                        </code>
                                    </li>
                                    <li>
                                        • <code>dateOnly: true</code>,{' '}
                                        <code>smart: true</code>
                                    </li>
                                    <li>
                                        • Custom <code>tickFormatter</code>{' '}
                                        functions
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatCardDemo
