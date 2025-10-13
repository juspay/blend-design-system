import {
    EllipsisVertical,
    TrendingUp,
    Users,
    Activity,
    LoaderCircle,
    ChartBar,
} from 'lucide-react'
import {
    Charts,
    CoreChart,
    ChartContainer,
    ChartLegends,
    ChartType,
    ChartLegendPosition,
    Menu,
    NewNestedDataPoint,
    SingleSelect,
    FOUNDATION_THEME,
    ChartHeader,
} from '../../../../packages/blend/lib/main'
import React from 'react'
import { useState } from 'react'
import { SelectMenuVariant } from '../../../../packages/blend/lib/components/Select'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import {
    LegendsChangeType,
    AxisType,
    AxisIntervalType,
} from '../../../../packages/blend/lib/components/Charts/types'
import {
    last1hour15minsData,
    last1hour5minsData,
    last24hours15minsData,
    last24hours30minsData,
    last24hoursHourlyData,
    last30DaysDailyData,
    last7daysDailyData,
    last7daysHourlyData,
} from './ChartsData'

const TimezoneDemo = () => {
    const [selectedTimezone, setSelectedTimezone] = useState('UTC')
    const [use12HourFormat, setUse12HourFormat] = useState(false)

    const timezoneData: NewNestedDataPoint[] = [
        {
            name: '1756252800000', // Aug 27, 2025, 00:00 UTC
            data: {
                activity: {
                    primary: { label: 'User Activity', val: 150 },
                    aux: [
                        {
                            label: 'Sessions',
                            val: 45000,
                        },
                    ],
                },
            },
        },
        {
            name: '1756256400000', // Aug 27, 2025, 01:00 UTC
            data: {
                activity: {
                    primary: { label: 'User Activity', val: 180 },
                    aux: [
                        {
                            label: 'Sessions',
                            val: 52,
                            type: AxisType.PERCENTAGE,
                        },
                    ],
                },
            },
        },
        {
            name: '1756260000000', // Aug 27, 2025, 02:00 UTCAM
            data: {
                activity: {
                    primary: { label: 'User Activity', val: 220 },
                    aux: [{ label: 'Sessions', val: 68 }],
                },
            },
        },
        {
            name: '1756263600000', // Aug 27, 2025, 03:00 UTC
            data: {
                activity: {
                    primary: { label: 'User Activity', val: 195 },
                    aux: [{ label: 'Sessions', val: 59 }],
                },
            },
        },
        {
            name: '1756267200000', // Aug 27, 2025, 04:00 UTC
            data: {
                activity: {
                    primary: { label: 'User Activity', val: 165 },
                    aux: [{ label: 'Sessions', val: 43 }],
                },
            },
        },
    ]

    const timezoneOptions = [
        { label: 'UTC (Default)', value: 'UTC' },
        { label: 'New York (EDT)', value: 'America/New_York' },
        { label: 'London (BST)', value: 'Europe/London' },
        { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
        { label: 'Mumbai (IST)', value: 'Asia/Kolkata' },
        { label: 'Los Angeles (PDT)', value: 'America/Los_Angeles' },
        { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
    ]

    return (
        <div className="flex flex-col gap-8">
            {/* Timezone Selector */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <label className="block mb-2 font-medium text-gray-700">
                    Select Timezone:
                </label>
                <SingleSelect
                    label=""
                    placeholder="Choose timezone"
                    items={[{ items: timezoneOptions }]}
                    selected={selectedTimezone}
                    onSelect={(value) => setSelectedTimezone(value as string)}
                />
                <div className="mt-2 text-sm text-gray-600">
                    Selected:{' '}
                    {
                        timezoneOptions.find(
                            (tz) => tz.value === selectedTimezone
                        )?.label
                    }
                </div>

                {/* Hour Format Toggle */}
                <div className="mt-4 p-3 bg-white border border-gray-200 rounded">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={use12HourFormat}
                            onChange={(e) =>
                                setUse12HourFormat(e.target.checked)
                            }
                            className="mr-2 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            Use 12-hour format (AM/PM)
                        </span>
                    </label>
                    <div className="mt-1 text-xs text-gray-500">
                        {use12HourFormat
                            ? 'Display: "08:00 PM"'
                            : 'Display: "20:00"'}
                    </div>
                </div>
            </div>

            {/* Chart with Selected Timezone */}
            <Charts
                data={timezoneData}
                chartType={ChartType.LINE}
                colors={['#3b82f6', '#10b981']}
                xAxis={{
                    label: `Time (${timezoneOptions.find((tz) => tz.value === selectedTimezone)?.label})`,
                    type: AxisType.DATE_TIME,
                }}
                yAxis={{
                    label: 'Activity Level',
                    type: AxisType.PERCENTAGE,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            🌍 Same Data, Different Timezones
                        </h4>
                    </div>
                }
            />

            {/* Comparison Table */}
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-3">
                    🕒 Timezone Comparison for "1756252800000":
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    {timezoneOptions.map(({ label, value }) => {
                        const date = new Date(1756252800000)
                        const formatted = date.toLocaleString('en-US', {
                            timeZone: value,
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: use12HourFormat,
                        })
                        return (
                            <div
                                key={value}
                                className={`p-2 rounded ${
                                    value === selectedTimezone
                                        ? 'bg-blue-100 border border-blue-300'
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                <div className="font-medium text-gray-700">
                                    {label}:
                                </div>
                                <div className="text-gray-600">{formatted}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Code Example */}
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">
                    💡 Usage Example:
                </h5>
                <pre className="text-xs text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
                    {`<Charts
  data={timestampData}
  xAxis={{
    type: AxisType.DATE_TIME,
    timeZone: "${selectedTimezone}", // 🌍 Any IANA timezone!
    hour12: ${use12HourFormat}, // 🕐 12-hour or 24-hour format!
  }}
  yAxis={{
    type: AxisType.NUMBER
  }}
/>`}
                </pre>
                <div className="mt-2 text-xs text-green-600">
                    <strong>💡 Tip:</strong> Defaults to UTC timezone and
                    24-hour format. Tooltips automatically use the same timezone
                    and hour format as the axis!
                </div>
            </div>
        </div>
    )
}

const GranularChartsDemo = () => {
    // Sample data for different chart panels
    const dashboardData: NewNestedDataPoint[] = [
        {
            name: '1756944000000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 76.47,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 76.47,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
                VISA: {
                    primary: {
                        label: 'VISA',
                        val: 0,
                    },
                },
                AMEX: {
                    primary: {
                        label: 'AMEX',
                        val: 0,
                    },
                },
                DISCOVER: {
                    primary: {
                        label: 'DISCOVER',
                        val: 0,
                    },
                },
                JCB: {
                    primary: {
                        label: 'JCB',
                        val: 0,
                    },
                },
                UNIONPAY: {
                    primary: {
                        label: 'UNIONPAY',
                        val: 0,
                    },
                },
                MAESTRO: {
                    primary: {
                        label: 'MAESTRO',
                        val: 0,
                    },
                },
                DINERS: {
                    primary: {
                        label: 'DINERS',
                        val: 0,
                    },
                },
                RUPAY: {
                    primary: {
                        label: 'RUPAY',
                        val: 0,
                    },
                },
                PAYPAL: {
                    primary: {
                        label: 'PAYPAL',
                        val: 0,
                    },
                },
                APPLE_PAY: {
                    primary: {
                        label: 'APPLE_PAY',
                        val: 0,
                    },
                },
                GOOGLE_PAY: {
                    primary: {
                        label: 'GOOGLE_PAY',
                        val: 0,
                    },
                },
                PHONE_PAY: {
                    primary: {
                        label: 'PHONE_PAY',
                        val: 0,
                    },
                },
                ZELLE: {
                    primary: {
                        label: 'ZELLE',
                        val: 0,
                    },
                },
                VENMO: {
                    primary: {
                        label: 'VENMO',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756947600000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 66.67,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 66.67,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756954800000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 100,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 100,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756958400000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 100,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 100,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756962000000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 0,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 0,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756965600000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 0,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 0,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756969200000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 40,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 40,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756972800000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 7.14,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 7.14,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756976400000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 49.35,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 49.35,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756980000000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 89.86,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 89.86,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756983600000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 79.15,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 80.29,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756987200000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 70.96,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 71.91,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756990800000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 92.36,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 92.44,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756994400000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 97.1,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 97.1,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
        {
            name: '1756998000000',
            data: {
                Overall: {
                    primary: {
                        label: 'Overall',
                        val: 90.83,
                    },
                },
                Unknown: {
                    primary: {
                        label: 'Unknown',
                        val: 90.93,
                    },
                },
                MASTERCARD: {
                    primary: {
                        label: 'MASTERCARD',
                        val: 0,
                    },
                },
            },
        },
    ]

    const chartColors = [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#8b5cf6',
        '#ec4899',
        '#f43f5e',
        '#ef4444',
        '#ff7300',
        '#ff0077',
        '#00d492',
        '#008236',
        '#016630',
        '#0d542b',
        '#052e16',
    ] // Blue, Green, Amber, Purple, Pink, Red, Orange, Orange, Red, Green, Green, Green, Green, Green

    const [hoveredKey, setHoveredKey] = useState<string | null>(null)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const chartContainerRef = React.useRef<HTMLDivElement>(null!)

    const lineKeys =
        dashboardData.length > 0 ? Object.keys(dashboardData[0].data) : []
    const activeKeys = selectedKeys.length > 0 ? selectedKeys : lineKeys

    const handleLegendClick = (key: string) => {
        setSelectedKeys((prevSelected) => {
            const isCurrentlySelected = prevSelected.includes(key)
            if (isCurrentlySelected) {
                const newSelection = prevSelected.filter((k) => k !== key)
                return newSelection.length === 0
                    ? lineKeys.filter((k) => k !== key)
                    : newSelection
            } else {
                return prevSelected.length === 0
                    ? [key]
                    : [...prevSelected, key]
            }
        })
    }

    const handleLegendEnter = (key: string) => {
        setHoveredKey(key)
    }

    const handleLegendLeave = () => {
        setHoveredKey(null)
    }

    return (
        <div className="space-y-8">
            <div>
                <h4 className="text-lg font-semibold mb-4">
                    🔗 Level 4: Custom Dashboard with Shared State
                </h4>
                <ChartContainer>
                    <div className="">
                        {/* Header */}
                        <ChartHeader
                            slot1={<p className="text-xs">Slot 1</p>}
                            slot2={<p className="text-xs">Slot 2</p>}
                            slot3={<p className="text-xs">Slot 3</p>}
                            chartHeaderSlot={
                                <p className="text-xs">Chart Header Slot</p>
                            }
                            onFullscreen={() => {}}
                            isExpanded={true}
                            setIsExpanded={() => {}}
                            isFullscreen={false}
                        />

                        {/* Interactive Shared Legends */}
                        <div className="mb-6 p-4">
                            <ChartLegends
                                chartContainerRef={chartContainerRef}
                                keys={lineKeys}
                                colors={chartColors}
                                handleLegendClick={handleLegendClick}
                                handleLegendEnter={handleLegendEnter}
                                handleLegendLeave={handleLegendLeave}
                                selectedKeys={activeKeys}
                                setSelectedKeys={setSelectedKeys}
                                hoveredKey={hoveredKey}
                                activeKeys={activeKeys}
                            />
                        </div>

                        {/* Interactive Charts Grid */}
                        <div
                            ref={chartContainerRef}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 "
                        >
                            {[
                                { title: 'MOTO', type: ChartType.LINE },
                                { title: 'THREE_DS', type: ChartType.LINE },
                                { title: 'Unknown', type: ChartType.LINE },
                                {
                                    title: 'Orders with Transaction(s)',
                                    type: ChartType.LINE,
                                },
                                {
                                    title: 'Additional Metric 1',
                                    type: ChartType.LINE,
                                },
                                {
                                    title: 'Additional Metric 2',
                                    type: ChartType.LINE,
                                },
                                {
                                    title: 'Additional Metric 3',
                                    type: ChartType.LINE,
                                },
                                {
                                    title: 'Additional Metric 4',
                                    type: ChartType.LINE,
                                },
                            ].map((panel, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 items-center justify-center h-full w-full"
                                >
                                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-4">
                                        {panel.title}
                                    </h4>
                                    <div className="h-68 w-full">
                                        <CoreChart
                                            data={dashboardData}
                                            chartType={panel.type}
                                            colors={chartColors}
                                            hoveredKey={hoveredKey}
                                            onHoveredKeyChange={setHoveredKey}
                                            selectedKeys={selectedKeys}
                                            enableHover={true}
                                            xAxis={{
                                                type: AxisType.DATE_TIME,
                                                maxTicks: 3,
                                            }}
                                            yAxis={{
                                                show: true,
                                                showLabel: false,
                                                type: AxisType.PERCENTAGE,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ChartContainer>
                <p className="text-sm text-gray-600 mt-2">
                    ↑ Complete interactive dashboard! Shared legend controls all
                    charts. Hover over legend or any chart to highlight across
                    all panels.
                </p>
            </div>

            {/* Benefits Summary */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                    ✨ Interactive Component Levels:
                </h4>
                <div className="text-sm text-green-700 space-y-2">
                    <div>
                        <strong>🎯 CoreChart:</strong> Pure chart rendering,
                        optional hover effects
                    </div>
                    <div>
                        <strong>🖱️ CoreChart + enableHover:</strong> Basic hover
                        interactions
                    </div>
                    <div>
                        <strong>🎨 InteractiveChart:</strong> All-in-one with
                        legends and interactions
                    </div>
                    <div>
                        <strong>🔗 Custom Dashboard:</strong> Multiple charts
                        with shared interactive state
                    </div>
                    <div>
                        <strong>📊 Charts:</strong> Full-featured component
                        (backward compatibility)
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChartDemo = () => {
    const financialData: NewNestedDataPoint[] = [
        {
            name: 'Jan',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 40000 },
                    aux: [{ label: 'Growth', val: 12 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 2400 },
                    aux: [{ label: 'Margin', val: 24 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 15000 },
                    aux: [{ label: 'Change', val: 8 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 3.2 },
                    aux: [{ label: 'Change', val: 0.5 }],
                },
            },
        },
        {
            name: 'Feb',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 3000 },
                    aux: [{ label: 'Growth', val: -25 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 1398 },
                    aux: [{ label: 'Margin', val: 19 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 13000 },
                    aux: [{ label: 'Change', val: -13 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 2.8 },
                    aux: [{ label: 'Change', val: -0.4 }],
                },
            },
        },
        {
            name: 'Mar',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 2000 },
                    aux: [{ label: 'Growth', val: -33 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 9800 },
                    aux: [{ label: 'Margin', val: 32 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 17000 },
                    aux: [{ label: 'Change', val: 30 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 3.5 },
                    aux: [{ label: 'Change', val: 0.7 }],
                },
            },
        },
        {
            name: 'Apr',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 2780 },
                    aux: [{ label: 'Growth', val: 39 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 3908 },
                    aux: [{ label: 'Margin', val: 28 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 19500 },
                    aux: [{ label: 'Change', val: 15 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 4.1 },
                    aux: [{ label: 'Change', val: 0.6 }],
                },
            },
        },
        {
            name: 'May',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 3490 },
                    aux: [{ label: 'Growth', val: 25 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 4300 },
                    aux: [{ label: 'Margin', val: 31 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 21000 },
                    aux: [{ label: 'Change', val: 8 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 3.9 },
                    aux: [{ label: 'Change', val: -0.2 }],
                },
            },
        },
        {
            name: 'Jun',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 3200 },
                    aux: [{ label: 'Growth', val: -8 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 3800 },
                    aux: [{ label: 'Margin', val: 29 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 18500 },
                    aux: [{ label: 'Change', val: -12 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 4.2 },
                    aux: [{ label: 'Change', val: 0.3 }],
                },
            },
        },
    ]

    // Performance dataset
    const performanceData: NewNestedDataPoint[] = [
        {
            name: 'Q1',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 186 },
                    aux: [{ label: 'Target', val: 200 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 305 },
                    aux: [{ label: 'Converted', val: 45 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 14.7 },
                    aux: [{ label: 'Goal', val: 15 }],
                },
            },
        },
        {
            name: 'Q2',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 305 },
                    aux: [{ label: 'Target', val: 250 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 400 },
                    aux: [{ label: 'Converted', val: 76 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 19.0 },
                    aux: [{ label: 'Goal', val: 18 }],
                },
            },
        },
        {
            name: 'Q3',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 237 },
                    aux: [{ label: 'Target', val: 280 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 375 },
                    aux: [{ label: 'Converted', val: 59 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 15.7 },
                    aux: [{ label: 'Goal', val: 16 }],
                },
            },
        },
        {
            name: 'Q4',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 420 },
                    aux: [{ label: 'Target', val: 350 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 520 },
                    aux: [{ label: 'Converted', val: 104 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 20.0 },
                    aux: [{ label: 'Goal', val: 20 }],
                },
            },
        },
    ]

    // User analytics dataset
    const analyticsData: NewNestedDataPoint[] = [
        {
            name: 'Desktop',
            data: {
                users: {
                    primary: { label: 'Users', val: 45 },
                    aux: [{ label: 'Sessions', val: 67 }],
                },
            },
        },
        {
            name: 'Mobile',
            data: {
                users: {
                    primary: { label: 'Users', val: 35 },
                    aux: [{ label: 'Sessions', val: 42 }],
                },
            },
        },
        {
            name: 'Tablet',
            data: {
                users: {
                    primary: { label: 'Users', val: 15 },
                    aux: [{ label: 'Sessions', val: 18 }],
                },
            },
        },
        {
            name: 'Other',
            data: {
                users: {
                    primary: { label: 'Users', val: 5 },
                    aux: [{ label: 'Sessions', val: 6 }],
                },
            },
        },
    ]

    const basicMenuItems = [
        {
            label: 'Export CSV',
            value: 'export_csv',
            items: [{ label: 'Export CSV', value: 'export_csv' }],
        },
        {
            label: 'Export PDF',
            value: 'export_pdf',
            items: [{ label: 'Export PDF', value: 'export_pdf' }],
        },
        {
            label: 'Share',
            value: 'share',
            items: [{ label: 'Share', value: 'share' }],
        },
        {
            label: 'Dataset',
            value: 'dataset',
            items: [
                {
                    label: 'Financial Data',
                    value: 'financial',
                    onClick: () => {
                        setSelectedDataset('financial')
                    },
                },
                {
                    label: 'Performance Metrics',
                    value: 'performance',
                    onClick: () => {
                        setSelectedDataset('performance')
                    },
                },
                {
                    label: 'User Analytics',
                    value: 'analytics',
                    onClick: () => {
                        setSelectedDataset('analytics')
                    },
                },
            ],
        },
        {
            label: 'Legend Position',
            value: 'legend_position',
            items: [
                {
                    label: 'Top Legend',
                    value: ChartLegendPosition.TOP,
                    onClick: () => {
                        setSelectedLegendPosition(ChartLegendPosition.TOP)
                    },
                },
                {
                    label: 'Right Legend',
                    value: ChartLegendPosition.RIGHT,
                    onClick: () => {
                        setSelectedLegendPosition(ChartLegendPosition.RIGHT)
                    },
                },
            ],
        },
    ]

    const dateTimeData: NewNestedDataPoint[] = [
        {
            name: '2024-01-15T10:00:00Z',
            data: {
                value: { primary: { label: 'Value', val: 1200 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 85 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 15000 },
                    aux: [],
                },
            },
        },
        {
            name: '2024-02-15T10:00:00Z',
            data: {
                value: { primary: { label: 'Value', val: 1400 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 92 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 18000 },
                    aux: [],
                },
            },
        },
        {
            name: '2024-03-15T10:00:00Z',
            data: {
                value: { primary: { label: 'Value', val: 1100 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 78 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 12000 },
                    aux: [],
                },
            },
        },
        {
            name: '2024-04-15T10:00:00Z',
            data: {
                value: { primary: { label: 'Value', val: 1600 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 95 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 22000 },
                    aux: [],
                },
            },
        },
        {
            name: '2024-05-15T10:00:00Z',
            data: {
                value: { primary: { label: 'Value', val: 1350 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 88 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 19500 },
                    aux: [],
                },
            },
        },
        {
            name: '2024-06-15T10:00:00Z',
            data: {
                value: { primary: { label: 'Value', val: 1750 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 97 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 25000 },
                    aux: [],
                },
            },
        },
    ]

    const timestampData: NewNestedDataPoint[] = [
        {
            name: '1705311600000',
            data: {
                value: { primary: { label: 'Value', val: 850 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 72 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 8500 },
                    aux: [],
                },
            },
        },
        {
            name: '1707990000000',
            data: {
                value: { primary: { label: 'Value', val: 920 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 78 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 9200 },
                    aux: [],
                },
            },
        },
        {
            name: '1710496800000',
            data: {
                value: { primary: { label: 'Value', val: 780 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 65 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 7800 },
                    aux: [],
                },
            },
        },
        {
            name: '1713175200000',
            data: {
                value: { primary: { label: 'Value', val: 1150 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 89 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 11500 },
                    aux: [],
                },
            },
        },
        {
            name: '1715767200000',
            data: {
                value: { primary: { label: 'Value', val: 1020 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 82 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 10200 },
                    aux: [],
                },
            },
        },
        {
            name: '1718445600000',
            data: {
                value: { primary: { label: 'Value', val: 1280 }, aux: [] },
                percentage: {
                    primary: { label: 'Percentage', val: 93 },
                    aux: [],
                },
                currency: {
                    primary: { label: 'Currency', val: 12800 },
                    aux: [],
                },
            },
        },
    ]

    // Sample data with time-based intervals spanning multiple days
    const timeSeriesData: NewNestedDataPoint[] = [
        // Day 1 - August 25th
        {
            name: '2024-08-25T06:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 18 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 12 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T08:30:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 22 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 28 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T12:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 28 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 45 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T15:30:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 31 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 52 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T18:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 26 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 38 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T21:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 21 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 22 }, aux: [] },
            },
        },

        // Day 2 - August 26th
        {
            name: '2024-08-26T06:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 17 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 15 }, aux: [] },
            },
        },
        {
            name: '2024-08-26T09:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 24 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 32 }, aux: [] },
            },
        },
        {
            name: '2024-08-26T12:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 29 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 48 }, aux: [] },
            },
        },
        {
            name: '2024-08-26T16:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 33 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 55 }, aux: [] },
            },
        },
        {
            name: '2024-08-26T18:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 27 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 41 }, aux: [] },
            },
        },

        // Day 3 - August 27th
        {
            name: '2024-08-27T07:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 19 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 18 }, aux: [] },
            },
        },
        {
            name: '2024-08-27T11:30:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 26 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 35 }, aux: [] },
            },
        },
        {
            name: '2024-08-27T14:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 30 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 49 }, aux: [] },
            },
        },
        {
            name: '2024-08-27T17:30:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 28 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 44 }, aux: [] },
            },
        },
        {
            name: '2024-08-27T20:00:00Z',
            data: {
                value: { primary: { label: 'Temperature', val: 23 }, aux: [] },
                activity: { primary: { label: 'Activity', val: 29 }, aux: [] },
            },
        },
    ]

    const timeData = [
        {
            name: '1756425600000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 42 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 1 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 709 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 3609 },
                    aux: [],
                },
            },
        },
        {
            name: '1756429200000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 3 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 719 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 150 },
                    aux: [],
                },
            },
        },
        {
            name: '1756432800000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 0 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 721 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 0 },
                    aux: [],
                },
            },
        },
        {
            name: '1756440000000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 0 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 720 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 0 },
                    aux: [],
                },
            },
        },
        {
            name: '1756443600000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 0 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 719 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 0 },
                    aux: [],
                },
            },
        },
        {
            name: '1756447200000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 5 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 3 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 720 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 0 },
                    aux: [],
                },
            },
        },
        {
            name: '1756450800000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 0 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 0 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 3 },
                    aux: [],
                },
            },
        },
        {
            name: '1756454400000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 0 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 720 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 4 },
                    aux: [],
                },
            },
        },
        {
            name: '1756458000000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 0 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 720 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 13 },
                    aux: [],
                },
            },
        },
        {
            name: '1756461600000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 420 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 32 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 721 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 2 },
                    aux: [],
                },
            },
        },
        {
            name: '1756465200000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 472 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 5 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 720 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 1 },
                    aux: [],
                },
            },
        },
        {
            name: '1756468800000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 356 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 0 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 719 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 236 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 2 },
                    aux: [],
                },
            },
        },
        {
            name: '1756472400000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 13 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 45 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 721 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 805 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 2 },
                    aux: [],
                },
            },
        },
        {
            name: '1756476000000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 1 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 83 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 719 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 73 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 1 },
                    aux: [],
                },
            },
        },
        {
            name: '1756479600000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 8 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 155 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 722 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 8 },
                    aux: [],
                },
            },
        },
        {
            name: '1756483200000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 19 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 565 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 720 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 0 },
                    aux: [],
                },
            },
        },
        {
            name: '1756486800000',
            data: {
                azhar_test: {
                    primary: { label: 'azhar_test', val: 7 },
                    aux: [],
                },
                eulerqa_sandbox: {
                    primary: { label: 'eulerqa_sandbox', val: 386 },
                    aux: [],
                },
                juspayhyderabad: {
                    primary: { label: 'juspayhyderabad', val: 610 },
                    aux: [],
                },
                tul_pprod: {
                    primary: { label: 'tul_pprod', val: 0 },
                    aux: [],
                },
                zee5_beta: {
                    primary: { label: 'zee5_beta', val: 0 },
                    aux: [],
                },
            },
        },
    ]

    const utcFormatData: NewNestedDataPoint[] = [
        // Various UTC format variations
        {
            name: '2024-08-25T00:00:00Z',
            data: {
                value: { primary: { label: 'Requests', val: 1200 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T06:00:00+00:00',
            data: {
                value: { primary: { label: 'Requests', val: 1450 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T12:00:00.000Z',
            data: {
                value: { primary: { label: 'Requests', val: 1680 }, aux: [] },
            },
        },
        {
            name: '2024-08-25T18:00:00.000+00:00',
            data: {
                value: { primary: { label: 'Requests', val: 1520 }, aux: [] },
            },
        },
        {
            name: '2024-08-26T00:00:00Z',
            data: {
                value: { primary: { label: 'Requests', val: 1100 }, aux: [] },
            },
        },
    ]

    // Custom formatter for time/date display
    const createTimeAndDateFormatter = () => {
        let lastDisplayedDate: string | null = null

        return (value: string | number) => {
            const date = new Date(value)
            if (isNaN(date.getTime())) return value.toString()

            const currentDate = date
                .toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                })
                .replace(' ', '') // "25Aug"

            const time = date.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }) // "06:00"

            // Show date if it's the first occurrence of this date
            if (lastDisplayedDate !== currentDate) {
                lastDisplayedDate = currentDate
                return currentDate
            }

            return time
        }
    }

    // State for playground controls
    const [selectedChartType, setSelectedChartType] = useState(ChartType.LINE)
    const [selectedDataset, setSelectedDataset] = useState('financial')
    const [selectedLegendPosition, setSelectedLegendPosition] = useState(
        ChartLegendPosition.TOP
    )
    const [selectedDateRange, setSelectedDateRange] = useState('last_6_months')
    const [selectedFilters, setSelectedFilters] = useState('all_metrics')
    const [showLimitedMetrics, setShowLimitedMetrics] = useState(false)

    // Helper functions
    const getCurrentData = () => {
        switch (selectedDataset) {
            case 'financial':
                return financialData
            case 'performance':
                return performanceData
            case 'analytics':
                return analyticsData
            default:
                return financialData
        }
    }

    const getColors = () => {
        switch (selectedChartType) {
            case ChartType.LINE:
                return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
            case ChartType.BAR:
                return ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444']
            case ChartType.PIE:
                return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
            default:
                return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
        }
    }

    const stackedLegendsData = [
        { value: 50.21, delta: 20.1, changeType: LegendsChangeType.INCREASE },
        { value: 30.21, delta: 10.1, changeType: LegendsChangeType.DECREASE },
        { value: 20.21, delta: 5.1, changeType: LegendsChangeType.INCREASE },
        { value: 10.21, delta: 2.1, changeType: LegendsChangeType.DECREASE },
    ]

    return (
        <div className="p-8 gap-12 flex flex-col ">
            <h5 className="text-xl font-bold">
                Charts Playground - All Variations
            </h5>

            {/* Smart Date/Time Format Feature */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-emerald-300 rounded-lg shadow-sm mb-6">
                <h4 className="text-emerald-900 font-bold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Smart Date/Time Format (Like Highcharts!)
                </h4>
                <p className="text-emerald-800 text-sm mb-3">
                    <strong>Enabled by default</strong> - Ticks now
                    intelligently alternate between showing dates and times:
                </p>
                <ul className="ml-6 space-y-2 text-emerald-700 text-sm">
                    <li>
                        ✅ Shows <strong>date</strong> (e.g., "1. Oct") when the
                        day changes
                    </li>
                    <li>
                        ✅ Shows <strong>time</strong> (e.g., "12:00") for
                        intermediate ticks on the same day
                    </li>
                    <li>
                        ✅ Provides both date and time context without
                        cluttering the axis
                    </li>
                    <li>
                        ✅ Works automatically with consistent tick intervals
                    </li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded border border-emerald-200">
                    <p className="text-xs text-emerald-600 font-semibold mb-2">
                        📊 Example tick pattern:
                    </p>
                    <div className="text-sm font-mono text-gray-800">
                        <span className="text-emerald-700 font-bold">
                            1. Oct
                        </span>
                        {' → '}
                        <span>08:00</span>
                        {' → '}
                        <span>16:00</span>
                        {' → '}
                        <span className="text-emerald-700 font-bold">
                            2. Oct
                        </span>
                        {' → '}
                        <span>08:00</span>
                        {' → '}
                        <span>16:00</span>
                        {' → '}
                        <span className="text-emerald-700 font-bold">
                            3. Oct
                        </span>
                    </div>
                </div>
                <div className="mt-3 text-xs text-emerald-600">
                    <strong>💡 Tip:</strong> Use{' '}
                    <code className="bg-emerald-100 px-1.5 py-0.5 rounded">
                        timeOnly: true
                    </code>{' '}
                    or{' '}
                    <code className="bg-emerald-100 px-1.5 py-0.5 rounded">
                        dateOnly: true
                    </code>{' '}
                    to override this behavior.
                </div>
            </div>

            <Charts
                showHeader={false}
                data={last1hour5minsData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date & Time Together',
                    show: true,
                    type: AxisType.DATE_TIME,
                    smartDateTimeFormat: false,
                    showYear: true,
                    maxTicks: last1hour5minsData.length / 2,
                    showLabel: true,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    type: AxisType.CURRENCY,
                    showLabel: true,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Smart Date/Time Ticks (Like Highcharts!)
                        </h4>
                    </div>
                }
            />

            <Charts
                data={last1hour15minsData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date (Timestamp)',
                    show: true,
                    showLabel: true,
                    type: AxisType.DATE_TIME,
                    // dateOnly: true,
                    // timeOnly: true,
                    // showYear: true,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    showLabel: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Last 1 Hour 15 Mins Data (Euler)
                        </h4>
                    </div>
                }
            />

            <Charts
                data={last24hours15minsData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date (Timestamp)',
                    show: true,
                    type: AxisType.DATE_TIME,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Last 24 Hours 15 Mins Data (Euler)
                        </h4>
                    </div>
                }
            />

            <Charts
                data={last24hours30minsData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date (Timestamp)',
                    show: true,
                    type: AxisType.DATE_TIME,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Last 24 Hours 30 Mins Data (Euler)
                        </h4>
                    </div>
                }
            />

            <Charts
                data={last24hoursHourlyData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date (Timestamp)',
                    show: true,
                    type: AxisType.DATE_TIME,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Last 24 Hours Hourly Data (Euler)
                        </h4>
                    </div>
                }
            />

            <Charts
                data={last7daysHourlyData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date (Timestamp)',
                    show: true,
                    type: AxisType.DATE_TIME,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Last 7 Days Hourly Data (Euler)
                        </h4>
                    </div>
                }
            />

            <Charts
                data={last7daysDailyData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date (Timestamp)',
                    show: true,
                    type: AxisType.DATE_TIME,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Last 7 Days Daily Data (Euler)
                        </h4>
                    </div>
                }
            />

            <Charts
                data={last30DaysDailyData}
                chartType={ChartType.LINE}
                xAxis={{
                    label: 'Date (Timestamp)',
                    show: true,
                    type: AxisType.DATE_TIME,
                    // maxTicks: 10,
                }}
                yAxis={{
                    label: 'Currency',
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div className="chart-header">
                        <Activity size={16} className="text-green-600" />
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                            Last 30 Days Daily Data (Euler)
                        </h4>
                    </div>
                }
            />

            {/* Granular Chart Components Demo */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    🧩 Granular Chart Components (New!)
                </h3>
                <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="text-purple-800 font-semibold mb-2">
                        ✨ Maximum Flexibility: Use Just What You Need
                    </h4>
                    <p className="text-purple-700 text-sm">
                        Break down charts into granular pieces. Use CoreChart
                        for pure chart rendering without any wrappers, or
                        combine with optional container/header/legend components
                        for complete customization. Perfect for building custom
                        dashboard layouts.
                    </p>
                </div>
                <GranularChartsDemo />

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                        📋 Component Hierarchy:
                    </h4>
                    <div className="text-sm text-blue-700 space-y-3">
                        <div className="font-mono text-xs bg-blue-100 p-3 rounded">
                            {`// Level 1: Pure chart (no interaction)
<CoreChart 
  data={data} 
  chartType={ChartType.LINE} 
  colors={colors}
/>

// Level 2: Chart with hover effects
<CoreChart 
  data={data} 
  enableHover={true}
  chartType={ChartType.BAR} 
/>

// Level 3: All-in-one interactive chart
<InteractiveChart
  data={data}
  chartType={ChartType.LINE}
  showLegends={true}
  enableHover={true}
  enableLegendClick={true}
/>

// Level 4: Custom dashboard with shared state
const [hoveredKey, setHoveredKey] = useState(null)
const [selectedKeys, setSelectedKeys] = useState([])

<ChartContainer>
  <ChartLegends 
    keys={lineKeys} 
    colors={colors}
    handleLegendClick={handleLegendClick}
    selectedKeys={selectedKeys}
    hoveredKey={hoveredKey}
  />
  <div className="grid">
    {panels.map(panel => (
      <CoreChart 
        key={panel.id}
        data={panel.data}
        hoveredKey={hoveredKey}
        onHoveredKeyChange={setHoveredKey}
        selectedKeys={selectedKeys}
        enableHover={true}
      />
    ))}
  </div>
</ChartContainer>

// Level 5: Full-featured (backward compatibility)
<Charts 
  data={data} 
  chartHeaderSlot={<h3>Title</h3>}
  stackedLegends={true}
/>`}
                        </div>
                        <div>
                            <strong>🎯 Choose Your Level:</strong>
                            <ul className="ml-4 mt-1 space-y-1">
                                <li>
                                    • <code>CoreChart</code> → Pure chart
                                    rendering, optional hover
                                </li>
                                <li>
                                    • <code>CoreChart + enableHover</code> → Add
                                    hover effects
                                </li>
                                <li>
                                    • <code>InteractiveChart</code> → All-in-one
                                    with legends & interactions
                                </li>
                                <li>
                                    • <code>Custom Dashboard</code> → Multiple
                                    charts with shared state
                                </li>
                                <li>
                                    • <code>Charts</code> → Full-featured
                                    (backward compatibility)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Interactive Chart */}
            <div className="chart-example-container mb-12">
                <Charts
                    stackedLegends={true}
                    stackedLegendsData={stackedLegendsData}
                    data={getCurrentData()}
                    chartType={selectedChartType}
                    legendPosition={selectedLegendPosition}
                    colors={getColors()}
                    xAxis={{
                        label:
                            selectedDataset === 'analytics'
                                ? 'Device Type'
                                : 'Period',
                        // show: false,
                        showLabel: true,
                    }}
                    yAxis={{
                        label:
                            selectedDataset === 'financial'
                                ? 'Amount ($)'
                                : 'Value',
                        // show: false,
                        showLabel: true,
                    }}
                    chartHeaderSlot={
                        <SingleSelect
                            label=""
                            variant={SelectMenuVariant.NO_CONTAINER}
                            placeholder="Chart Type"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Line Chart',
                                            value: ChartType.LINE,
                                        },
                                        {
                                            label: 'Bar Chart',
                                            value: ChartType.BAR,
                                        },
                                        {
                                            label: 'Pie Chart',
                                            value: ChartType.PIE,
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedChartType}
                            onSelect={(value) => {
                                setSelectedChartType(value as ChartType)
                            }}
                        />
                    }
                    slot1={
                        <SingleSelect
                            label=""
                            variant={SelectMenuVariant.NO_CONTAINER}
                            placeholder="Dataset"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Financial Data',
                                            value: 'financial',
                                        },
                                        {
                                            label: 'Performance Metrics',
                                            value: 'performance',
                                        },
                                        {
                                            label: 'User Analytics',
                                            value: 'analytics',
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedDataset}
                            onSelect={(value) => {
                                setSelectedDataset(value as string)
                            }}
                        />
                    }
                    slot2={
                        <SingleSelect
                            label=""
                            variant={SelectMenuVariant.NO_CONTAINER}
                            placeholder="Legend Position"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Top Legend',
                                            value: ChartLegendPosition.TOP,
                                        },
                                        {
                                            label: 'Right Legend',
                                            value: ChartLegendPosition.RIGHT,
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedLegendPosition}
                            onSelect={(value) => {
                                setSelectedLegendPosition(
                                    value as ChartLegendPosition
                                )
                            }}
                        />
                    }
                    slot3={
                        <Menu
                            trigger={
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width={FOUNDATION_THEME.unit[24]}
                                    cursor="pointer"
                                >
                                    <EllipsisVertical
                                        size={20}
                                        className="text-gray-500"
                                    />
                                </Block>
                            }
                            items={basicMenuItems}
                        />
                    }
                />
            </div>

            {/* Playground Controls */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-4">Playground Controls</h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                            }}
                        >
                            Date Range
                        </label>
                        <SingleSelect
                            label=""
                            placeholder="Date Range"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Last 6 months',
                                            value: 'last_6_months',
                                        },
                                        {
                                            label: 'Last year',
                                            value: 'last_year',
                                        },
                                        {
                                            label: 'Last 2 years',
                                            value: 'last_2_years',
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedDateRange}
                            onSelect={(value) => {
                                setSelectedDateRange(value as string)
                            }}
                        />
                    </div>

                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                            }}
                        >
                            Metrics Filter
                        </label>
                        <SingleSelect
                            label=""
                            placeholder="Metrics"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'All Metrics',
                                            value: 'all_metrics',
                                        },
                                        {
                                            label: 'Limited Metrics',
                                            value: 'limited_metrics',
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedFilters}
                            onSelect={(value) => {
                                setSelectedFilters(value as string)
                                setShowLimitedMetrics(
                                    value === 'limited_metrics'
                                )
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Chart Variations Grid */}
            <div className="chart-example-container">
                <h3 className="text-xl font-bold mb-6">
                    Chart Type Variations
                </h3>
                <div className="flex flex-col gap-8">
                    {/* Line Chart Example */}
                    <Charts
                        data={financialData}
                        chartType={ChartType.LINE}
                        colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <TrendingUp
                                    size={16}
                                    className="text-blue-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Line Chart
                                </h4>
                            </div>
                        }
                        xAxis={{
                            label: 'Performance Metrics',
                            // show: true,
                            // showLabel: true,
                        }}
                        yAxis={{
                            label: 'Score',
                            // show: true,
                            // showLabel: true,
                        }}
                    />

                    {/* Bar Chart Example */}

                    <Charts
                        data={performanceData}
                        chartType={ChartType.BAR}
                        colors={['#8b5cf6', '#06b6d4', '#f59e0b']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity
                                    size={16}
                                    className="text-purple-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Bar Chart
                                </h4>
                            </div>
                        }
                    />

                    {/* Pie Chart Example */}

                    <Charts
                        data={analyticsData}
                        chartType={ChartType.PIE}
                        legendPosition={ChartLegendPosition.RIGHT}
                        colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Users size={16} className="text-green-600" />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Pie Chart
                                </h4>
                            </div>
                        }
                    />

                    {/* Scatter Chart Example */}

                    <Charts
                        data={[
                            {
                                name: 'Dataset 1',
                                data: {
                                    revenueSeries: {
                                        primary: {
                                            label: 'Revenue vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 10 },
                                            { label: 'y', val: 20 },
                                        ],
                                    },
                                    profitSeries: {
                                        primary: {
                                            label: 'Profit vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 12 },
                                            { label: 'y', val: 15 },
                                        ],
                                    },
                                },
                            },
                            {
                                name: 'Dataset 2',
                                data: {
                                    revenueSeries: {
                                        primary: {
                                            label: 'Revenue vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 25 },
                                            { label: 'y', val: 45 },
                                        ],
                                    },
                                    profitSeries: {
                                        primary: {
                                            label: 'Profit vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 27 },
                                            { label: 'y', val: 35 },
                                        ],
                                    },
                                },
                            },
                            {
                                name: 'Dataset 3',
                                data: {
                                    revenueSeries: {
                                        primary: {
                                            label: 'Revenue vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 40 },
                                            { label: 'y', val: 75 },
                                        ],
                                    },
                                    profitSeries: {
                                        primary: {
                                            label: 'Profit vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 42 },
                                            { label: 'y', val: 60 },
                                        ],
                                    },
                                },
                            },
                            {
                                name: 'Dataset 4',
                                data: {
                                    revenueSeries: {
                                        primary: {
                                            label: 'Revenue vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 50 },
                                            { label: 'y', val: 85 },
                                        ],
                                    },
                                    profitSeries: {
                                        primary: {
                                            label: 'Profit vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 48 },
                                            { label: 'y', val: 70 },
                                        ],
                                    },
                                },
                            },
                            {
                                name: 'Dataset 5',
                                data: {
                                    revenueSeries: {
                                        primary: {
                                            label: 'Revenue vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 65 },
                                            { label: 'y', val: 110 },
                                        ],
                                    },
                                    profitSeries: {
                                        primary: {
                                            label: 'Profit vs Marketing Spend',
                                            val: 0,
                                        },
                                        aux: [
                                            { label: 'x', val: 62 },
                                            { label: 'y', val: 90 },
                                        ],
                                    },
                                },
                            },
                        ]}
                        chartType={ChartType.SCATTER}
                        colors={['#3b82f6', '#10b981']}
                        xAxis={{
                            label: 'Marketing Spend ($K)',
                            type: AxisType.CURRENCY,
                        }}
                        yAxis={{
                            label: 'Revenue ($K)',
                            type: AxisType.CURRENCY,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity size={16} className="text-blue-600" />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Scatter Chart
                                </h4>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Timezone Selection Demo */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    🌍 Timezone Selection Support
                </h3>
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-blue-800 font-semibold mb-2">
                        ✨ New Feature: User-Selectable Timezones & Hour
                        Formats!
                    </h4>
                    <p className="text-blue-700 text-sm">
                        Charts now support displaying dates/times in any
                        timezone with both 12-hour (AM/PM) and 24-hour formats.
                        Defaults to UTC and 24-hour format for consistent
                        behavior. Perfect for global applications!
                    </p>
                </div>
                <TimezoneDemo />
            </div>

            {/* Date Only & Time Only Formatting Demo */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    📅 Date Only & Time Only Formatting
                </h3>
                <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <h4 className="text-indigo-800 font-semibold mb-2">
                        ✨ New Feature: Flexible DateTime Display Options!
                    </h4>
                    <p className="text-indigo-700 text-sm">
                        Choose exactly what you want to show: dates only, times
                        only, or full date+time. Perfect for daily reports,
                        hourly metrics, or any custom visualization needs!
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Date Only WITHOUT Year */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            📅 Date Only (Without Year)
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            Perfect for current year data or when year context
                            is clear. Shows: "1. Oct" "2. Oct" "3. Oct"
                        </p>
                        <Charts
                            data={[
                                {
                                    name: '1696118400000', // Oct 1, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales',
                                                val: 12500,
                                            },
                                            aux: [{ label: 'Orders', val: 45 }],
                                        },
                                    },
                                },
                                {
                                    name: '1696204800000', // Oct 2, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales',
                                                val: 15300,
                                            },
                                            aux: [{ label: 'Orders', val: 52 }],
                                        },
                                    },
                                },
                                {
                                    name: '1696291200000', // Oct 3, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales',
                                                val: 18750,
                                            },
                                            aux: [{ label: 'Orders', val: 63 }],
                                        },
                                    },
                                },
                                {
                                    name: '1696377600000', // Oct 4, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales',
                                                val: 21200,
                                            },
                                            aux: [{ label: 'Orders', val: 71 }],
                                        },
                                    },
                                },
                                {
                                    name: '1696464000000', // Oct 5, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales',
                                                val: 19800,
                                            },
                                            aux: [{ label: 'Orders', val: 67 }],
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.BAR}
                            colors={['#3b82f6']}
                            xAxis={{
                                label: 'Date',
                                type: AxisType.DATE_TIME,
                                dateOnly: true, // 📅 Date only without year
                            }}
                            yAxis={{
                                label: 'Sales ($)',
                                type: AxisType.CURRENCY,
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <Activity
                                        size={16}
                                        className="text-blue-600"
                                    />
                                    <h4 style={{ margin: 0, fontSize: '14px' }}>
                                        Daily Sales - October
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500 bg-blue-50 p-2 rounded">
                            <strong>Code:</strong>{' '}
                            <code>
                                xAxis=&#123;&#123; type: AxisType.DATE_TIME,
                                dateOnly: true &#125;&#125;
                            </code>
                        </div>
                    </div>

                    {/* Date Only WITH Year */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            📅 Date Only (With Year)
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            Ideal for historical data or multi-year comparisons.
                            Shows: "1. Oct 2023" "2. Oct 2023" "3. Oct 2023"
                        </p>
                        <Charts
                            data={[
                                {
                                    name: '1672531200000', // Jan 1, 2023
                                    data: {
                                        revenue: {
                                            primary: {
                                                label: 'Revenue',
                                                val: 125000,
                                            },
                                            aux: [{ label: 'Growth', val: 15 }],
                                        },
                                    },
                                },
                                {
                                    name: '1675209600000', // Feb 1, 2023
                                    data: {
                                        revenue: {
                                            primary: {
                                                label: 'Revenue',
                                                val: 142000,
                                            },
                                            aux: [{ label: 'Growth', val: 18 }],
                                        },
                                    },
                                },
                                {
                                    name: '1677628800000', // Mar 1, 2023
                                    data: {
                                        revenue: {
                                            primary: {
                                                label: 'Revenue',
                                                val: 138000,
                                            },
                                            aux: [{ label: 'Growth', val: 12 }],
                                        },
                                    },
                                },
                                {
                                    name: '1680307200000', // Apr 1, 2023
                                    data: {
                                        revenue: {
                                            primary: {
                                                label: 'Revenue',
                                                val: 165000,
                                            },
                                            aux: [{ label: 'Growth', val: 22 }],
                                        },
                                    },
                                },
                                {
                                    name: '1682899200000', // May 1, 2023
                                    data: {
                                        revenue: {
                                            primary: {
                                                label: 'Revenue',
                                                val: 178000,
                                            },
                                            aux: [{ label: 'Growth', val: 25 }],
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.LINE}
                            colors={['#10b981']}
                            xAxis={{
                                label: 'Date',
                                type: AxisType.DATE_TIME,
                                dateOnly: true, // 📅 Date only
                                showYear: true, // 📆 Include year
                            }}
                            yAxis={{
                                label: 'Revenue',
                                type: AxisType.CURRENCY,
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <TrendingUp
                                        size={16}
                                        className="text-green-600"
                                    />
                                    <h4 style={{ margin: 0, fontSize: '14px' }}>
                                        Monthly Revenue - 2023
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500 bg-green-50 p-2 rounded">
                            <strong>Code:</strong>{' '}
                            <code>
                                xAxis=&#123;&#123; type: AxisType.DATE_TIME,
                                dateOnly: true, showYear: true &#125;&#125;
                            </code>
                        </div>
                    </div>

                    {/* Time Only */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            🕐 Time Only (24-Hour Format)
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            Perfect for intraday metrics or hourly data within a
                            single day. Shows: "00:00" "06:00" "12:00" "18:00"
                        </p>
                        <Charts
                            data={[
                                {
                                    name: '1696118400000', // Oct 1, 2023, 00:00
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 120,
                                            },
                                            aux: [
                                                { label: 'Sessions', val: 45 },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1696140000000', // Oct 1, 2023, 06:00
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 280,
                                            },
                                            aux: [
                                                { label: 'Sessions', val: 92 },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1696161600000', // Oct 1, 2023, 12:00
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 450,
                                            },
                                            aux: [
                                                { label: 'Sessions', val: 156 },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1696183200000', // Oct 1, 2023, 18:00
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 380,
                                            },
                                            aux: [
                                                { label: 'Sessions', val: 128 },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1696204800000', // Oct 2, 2023, 00:00
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 95,
                                            },
                                            aux: [
                                                { label: 'Sessions', val: 34 },
                                            ],
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.LINE}
                            colors={['#f59e0b']}
                            xAxis={{
                                label: 'Time',
                                type: AxisType.DATE_TIME,
                                timeOnly: true, // 🕐 Time only
                            }}
                            yAxis={{
                                label: 'Activity Level',
                                type: AxisType.NUMBER,
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <Activity
                                        size={16}
                                        className="text-amber-600"
                                    />
                                    <h4 style={{ margin: 0, fontSize: '14px' }}>
                                        Hourly User Activity
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500 bg-amber-50 p-2 rounded">
                            <strong>Code:</strong>{' '}
                            <code>
                                xAxis=&#123;&#123; type: AxisType.DATE_TIME,
                                timeOnly: true &#125;&#125;
                            </code>
                        </div>
                    </div>

                    {/* Comparison: Default vs Date Only vs Time Only */}
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="text-purple-800 font-semibold mb-3">
                            🔄 Side-by-Side Comparison
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-700">
                            <div className="bg-white p-3 rounded border border-purple-200">
                                <div className="font-semibold mb-2">
                                    📅 Date Only
                                </div>
                                <div className="text-xs space-y-1">
                                    <div>• "1. Oct"</div>
                                    <div>• "2. Oct"</div>
                                    <div>• "3. Oct"</div>
                                </div>
                                <div className="mt-2 text-xs">
                                    <code className="bg-purple-100 px-1 rounded">
                                        dateOnly: true
                                    </code>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded border border-purple-200">
                                <div className="font-semibold mb-2">
                                    🕐 Time Only
                                </div>
                                <div className="text-xs space-y-1">
                                    <div>• "00:00"</div>
                                    <div>• "06:00"</div>
                                    <div>• "12:00"</div>
                                </div>
                                <div className="mt-2 text-xs">
                                    <code className="bg-purple-100 px-1 rounded">
                                        timeOnly: true
                                    </code>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded border border-purple-200">
                                <div className="font-semibold mb-2">
                                    📅🕐 Default (Both)
                                </div>
                                <div className="text-xs space-y-1">
                                    <div>• "1 Oct, 12:00"</div>
                                    <div>• "2 Oct, 14:30"</div>
                                    <div>• "3 Oct, 09:15"</div>
                                </div>
                                <div className="mt-2 text-xs">
                                    <code className="bg-purple-100 px-1 rounded">
                                        Default behavior
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Reference */}
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">
                        📚 API Reference: DateTime Formatting Options
                    </h4>
                    <div className="text-sm text-gray-700 space-y-4">
                        <div>
                            <strong>Basic Usage:</strong>
                            <pre className="text-xs mt-1 bg-gray-100 p-3 rounded overflow-x-auto">
                                {`xAxis={{
  type: AxisType.DATE_TIME,
  dateOnly: boolean,    // Show only dates
  timeOnly: boolean,    // Show only times
  showYear: boolean,    // Include year (works with dateOnly and default)
  useUTC: boolean,      // Use UTC timezone (default: true)
}}`}
                            </pre>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <strong>📅 Date Only Options:</strong>
                                <div className="text-xs mt-2 space-y-2">
                                    <div className="bg-white p-2 rounded border">
                                        <code>dateOnly: true</code>
                                        <div className="text-gray-600 mt-1">
                                            → "1. Oct" "2. Oct"
                                        </div>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <code>
                                            dateOnly: true, showYear: true
                                        </code>
                                        <div className="text-gray-600 mt-1">
                                            → "1. Oct 2024"
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <strong>🕐 Time Only Options:</strong>
                                <div className="text-xs mt-2 space-y-2">
                                    <div className="bg-white p-2 rounded border">
                                        <code>timeOnly: true</code>
                                        <div className="text-gray-600 mt-1">
                                            → "12:00" "14:30"
                                        </div>
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                        <code className="text-gray-500">
                                            showYear ignored in timeOnly
                                        </code>
                                        <div className="text-gray-600 mt-1">
                                            Time only, no year
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <strong>💡 Use Cases:</strong>
                            <ul className="ml-4 mt-2 space-y-1 text-xs">
                                <li>
                                    • <strong>dateOnly:</strong> Daily reports,
                                    weekly summaries, monthly trends
                                </li>
                                <li>
                                    • <strong>timeOnly:</strong> Hourly metrics,
                                    intraday activity, real-time dashboards
                                </li>
                                <li>
                                    • <strong>showYear:</strong> Historical
                                    data, year-over-year comparisons
                                </li>
                                <li>
                                    • <strong>Default (both):</strong> Full
                                    timestamp context needed
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* POSIX and UTC Format Support */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    ⏰ POSIX Time & UTC Format Support
                </h3>
                <div className="flex flex-col gap-8">
                    {/* POSIX Time (Unix Timestamp in Seconds) */}
                    <Charts
                        data={timeData}
                        chartType={ChartType.BAR}
                        colors={['#ef4444']}
                        xAxis={{
                            label: 'POSIX Time (seconds)',
                            show: true,
                            type: AxisType.DATE_TIME,
                        }}
                        yAxis={{
                            label: 'CPU Usage (%)',
                            show: true,
                            type: AxisType.NUMBER,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity size={16} className="text-red-600" />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    ✅ POSIX Time: 1693036800 → "Aug 26, 2023"
                                </h4>
                            </div>
                        }
                    />

                    {/* UTC Format Variations */}
                    <Charts
                        data={utcFormatData}
                        chartType={ChartType.LINE}
                        colors={['#8b5cf6']}
                        xAxis={{
                            label: 'UTC Formats',
                            show: true,
                            type: AxisType.DATE_TIME,
                        }}
                        yAxis={{
                            label: 'Requests',
                            show: true,
                            type: AxisType.NUMBER,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <TrendingUp
                                    size={16}
                                    className="text-violet-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    ✅ UTC Formats: Z, +00:00, .000Z, .000+00:00
                                </h4>
                            </div>
                        }
                    />
                </div>

                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                        ✅ Supported Time Formats:
                    </h4>
                    <div className="text-sm text-green-700 space-y-3">
                        <div>
                            <strong>🕒 POSIX Time (Unix Seconds):</strong>
                            <ul className="ml-4 mt-1 space-y-1">
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        1693036800
                                    </code>{' '}
                                    → "Aug 26, 2023"
                                </li>
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        '1693036800'
                                    </code>{' '}
                                    → "Aug 26, 2023"
                                </li>
                                <li>
                                    • Auto-detected and converted from seconds
                                    to milliseconds
                                </li>
                            </ul>
                        </div>
                        <div>
                            <strong>🌍 UTC Formats (ISO 8601):</strong>
                            <ul className="ml-4 mt-1 space-y-1">
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        2024-08-25T00:00:00Z
                                    </code>{' '}
                                    → "Aug 25, 2024"
                                </li>
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        2024-08-25T06:00:00+00:00
                                    </code>{' '}
                                    → "Aug 25, 2024"
                                </li>
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        2024-08-25T12:00:00.000Z
                                    </code>{' '}
                                    → "Aug 25, 2024"
                                </li>
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        2024-08-25T18:00:00.000+00:00
                                    </code>{' '}
                                    → "Aug 25, 2024"
                                </li>
                            </ul>
                        </div>
                        <div>
                            <strong>⚡ JavaScript Timestamps:</strong>
                            <ul className="ml-4 mt-1 space-y-1">
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        1693036800000
                                    </code>{' '}
                                    → "Aug 26, 2023" (milliseconds)
                                </li>
                                <li>
                                    •{' '}
                                    <code className="bg-green-100 px-1 rounded">
                                        '1693036800000'
                                    </code>{' '}
                                    → "Aug 26, 2023"
                                </li>
                            </ul>
                        </div>
                        <div>
                            <strong>🔧 Smart Detection:</strong>
                            <ul className="ml-4 mt-1 space-y-1">
                                <li>
                                    • Values &lt; 946684800000 (year 2000)
                                    treated as POSIX seconds
                                </li>
                                <li>
                                    • Values &ge; 946684800000 treated as
                                    JavaScript milliseconds
                                </li>
                                <li>• Graceful fallback for invalid formats</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Time and Date Display */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    🕐 Time & Date Display Example
                </h3>
                <div className="flex flex-col gap-8">
                    {/* Time Series with Custom Date/Time Formatting */}
                    <Charts
                        data={timeSeriesData}
                        chartType={ChartType.LINE}
                        colors={['#3b82f6', '#10b981']}
                        xAxis={{
                            label: 'Time & Date',
                            show: true,
                            tickFormatter: createTimeAndDateFormatter(),
                            interval: AxisIntervalType.PRESERVE_START_END, // Show all ticks to see the pattern
                        }}
                        yAxis={{
                            label: 'Temperature (°C)',
                            show: true,
                            type: AxisType.NUMBER,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <TrendingUp
                                    size={16}
                                    className="text-blue-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Custom Time & Date: 06:00, 08:30, 25Aug,
                                    12:00, 18:00, 26Aug
                                </h4>
                            </div>
                        }
                    />

                    {/* Same data with default DATE_TIME formatting for comparison */}
                    <Charts
                        data={timeSeriesData}
                        chartType={ChartType.BAR}
                        colors={['#f59e0b']}
                        xAxis={{
                            label: 'Date (Standard Format)',
                            show: true,
                            type: AxisType.DATE_TIME,
                            interval: 2, // Show fewer ticks for cleaner display
                        }}
                        yAxis={{
                            label: 'Activity Level',
                            show: true,
                            type: AxisType.NUMBER,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity
                                    size={16}
                                    className="text-amber-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Standard Date Format (for comparison)
                                </h4>
                            </div>
                        }
                    />
                </div>

                <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">
                        🕐 Custom Time & Date Formatter:
                    </h4>
                    <div className="text-sm text-indigo-700 space-y-2">
                        <pre className="bg-indigo-100 p-2 rounded text-xs overflow-x-auto">
                            {`const createTimeAndDateFormatter = () => {
    let lastDisplayedDate = null
    
    return (value) => {
        const date = new Date(value)
        const currentDate = date.toLocaleDateString('en-GB', { 
            day: '2-digit', month: 'short' 
        }).replace(' ', '') // "25Aug"
        
        const time = date.toLocaleTimeString('en-GB', { 
            hour: '2-digit', minute: '2-digit', hour12: false 
        }) // "06:00"
        
        // Show date on first occurrence of new day
        if (lastDisplayedDate !== currentDate) {
            lastDisplayedDate = currentDate
            return currentDate
        }
        
        return time
    }
}

// Usage
xAxis={{ 
    tickFormatter: createTimeAndDateFormatter(),
    interval: 0  // Show all ticks
}}`}
                        </pre>
                        <div>
                            <strong>📊 Pattern:</strong> Shows time (06:00,
                            08:30) throughout the day, then date (25Aug) when
                            day changes
                        </div>
                        <div>
                            <strong>💡 Use Case:</strong> Perfect for hourly
                            data spanning multiple days, IoT sensor readings,
                            activity tracking
                        </div>
                    </div>
                </div>
            </div>

            {/* Automatic Type-Based Formatting */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    🚀 Automatic Type-Based Formatting
                </h3>
                <div className="flex flex-col gap-8">
                    {/* DateTime ISO String */}
                    <Charts
                        data={dateTimeData}
                        chartType={ChartType.LINE}
                        colors={['#3b82f6']}
                        xAxis={{
                            label: 'Date (ISO Format)',
                            show: true,
                            type: AxisType.DATE_TIME,
                        }}
                        yAxis={{
                            label: 'Value',
                            show: true,
                            type: AxisType.NUMBER,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <TrendingUp
                                    size={16}
                                    className="text-blue-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Auto DateTime (ISO) + Number Formatting
                                </h4>
                            </div>
                        }
                    />

                    {/* Timestamp Numbers */}
                    <Charts
                        data={timestampData}
                        chartType={ChartType.BAR}
                        colors={['#10b981']}
                        xAxis={{
                            label: 'Date (Timestamp)',
                            show: true,
                            type: AxisType.DATE_TIME,
                        }}
                        yAxis={{
                            label: 'Currency',
                            show: true,
                            type: AxisType.CURRENCY,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity
                                    size={16}
                                    className="text-green-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Auto DateTime (Timestamp) + Currency
                                    Formatting
                                </h4>
                            </div>
                        }
                    />

                    {/* Percentage Formatting */}
                    <Charts
                        data={dateTimeData}
                        chartType={ChartType.BAR}
                        colors={['#f59e0b']}
                        xAxis={{
                            label: 'Date',
                            show: true,
                            type: AxisType.DATE_TIME,
                        }}
                        yAxis={{
                            label: 'Completion Rate',
                            show: true,
                            type: AxisType.PERCENTAGE,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity
                                    size={16}
                                    className="text-amber-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Auto DateTime + Percentage Formatting
                                </h4>
                            </div>
                        }
                    />
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                        🎯 Automatic Formatting (Super Easy!):
                    </h4>
                    <div className="text-sm text-blue-700 space-y-2">
                        <pre className="bg-blue-100 p-2 rounded text-xs overflow-x-auto">
                            {`<Charts
  xAxis={{
    type: AxisType.DATE_TIME  // Automatic date formatting
  }}
  yAxis={{
    type: AxisType.CURRENCY   // Automatic $1.5K formatting
  }}
/>`}
                        </pre>
                        <div>
                            <strong>✅ Available Types:</strong>
                        </div>
                        <ul className="ml-4 space-y-1">
                            <li>
                                •{' '}
                                <code className="bg-blue-100 px-1 rounded">
                                    AxisType.DATE_TIME
                                </code>{' '}
                                - ISO dates & timestamps → "Jan 15, 2024"
                            </li>
                            <li>
                                •{' '}
                                <code className="bg-blue-100 px-1 rounded">
                                    AxisType.CURRENCY
                                </code>{' '}
                                - Numbers → "$1.5K", "$2.3M"
                            </li>
                            <li>
                                •{' '}
                                <code className="bg-blue-100 px-1 rounded">
                                    AxisType.PERCENTAGE
                                </code>{' '}
                                - Numbers → "85%", "12%"
                            </li>
                            <li>
                                •{' '}
                                <code className="bg-blue-100 px-1 rounded">
                                    AxisType.NUMBER
                                </code>{' '}
                                - Large numbers → "1.5K", "2.3M"
                            </li>
                        </ul>
                        <div>
                            <strong>🎯 Priority:</strong> customTick →
                            tickFormatter → type → default
                        </div>
                    </div>
                </div>
            </div>

            {/* Tick Formatting Options */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    📝 Simple Tick Formatting (Callbacks)
                </h3>
                <div className="flex flex-col gap-8">
                    {/* Simple X-Axis Formatter */}
                    <Charts
                        data={financialData}
                        chartType={ChartType.BAR}
                        colors={['#10b981']}
                        xAxis={{
                            label: 'Months',
                            show: true,
                            tickFormatter: (value) =>
                                `${value.toString().toUpperCase()}`,
                        }}
                        yAxis={{
                            label: 'Revenue',
                            show: true,
                            tickFormatter: (value) =>
                                `$${Number(value) / 1000}K`,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity
                                    size={16}
                                    className="text-green-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Simple Formatters: Uppercase Months + K
                                    Values
                                </h4>
                            </div>
                        }
                    />

                    {/* Date Formatting */}
                    <Charts
                        data={performanceData}
                        chartType={ChartType.LINE}
                        colors={['#3b82f6']}
                        xAxis={{
                            label: 'Performance Metrics',
                            show: true,
                            tickFormatter: (value) =>
                                value.toString().substring(0, 8) + '...',
                            showLabel: false,
                        }}
                        yAxis={{
                            label: 'Score',
                            show: true,
                            tickFormatter: (value) => `${value} years`,
                            showLabel: false,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <TrendingUp
                                    size={16}
                                    className="text-blue-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Truncated Labels + Percentage Values
                                </h4>
                            </div>
                        }
                    />
                </div>

                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                        ✅ Simple Formatting (Recommended for most cases):
                    </h4>
                    <div className="text-sm text-green-700 space-y-2">
                        <pre className="bg-green-100 p-2 rounded text-xs overflow-x-auto">
                            {`<Charts
  xAxis={{
    tickFormatter: (value) => \`\${value.toString().toUpperCase()}\`
  }}
  yAxis={{
    tickFormatter: (value) => \`$\${Number(value) / 1000}K\`
  }}
/>`}
                        </pre>
                        <div>
                            <strong>✅ Use when:</strong> You only need to
                            format text (currency, dates, percentages)
                        </div>
                        <div>
                            <strong>✅ Pros:</strong> Simple, clean, type-safe,
                            performant
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Tick Components */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    🎨 Advanced Tick Components (Full Control)
                </h3>
                <div className="flex flex-col gap-8">
                    {/* Custom X-Axis Tick */}
                    <Charts
                        data={financialData}
                        chartType={ChartType.BAR}
                        colors={['#3b82f6']}
                        xAxis={{
                            label: 'Custom Month Ticks',
                            show: true,
                            showLabel: true,
                            customTick: ({ x, y, payload }) => (
                                <g transform={`translate(${x},${y})`}>
                                    {/* <rect
                                        x={-15}
                                        y={-8}
                                        width={30}
                                        height={16}
                                        // fill="#e3f2fd"
                                        // stroke="#1976d2"
                                        rx={8}
                                    /> */}
                                    <text
                                        x={0}
                                        y={4}
                                        textAnchor="middle"
                                        fill="#1976d2"
                                        fontSize={12}
                                        fontWeight="bold"
                                    >
                                        {payload?.value}
                                    </text>
                                </g>
                            ),
                        }}
                        yAxis={{
                            label: 'Revenue ($)',
                            show: true,
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity size={16} className="text-blue-600" />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Custom X-Axis Ticks (Rounded Boxes)
                                </h4>
                            </div>
                        }
                    />

                    {/* Custom Y-Axis Tick */}
                    <Charts
                        data={performanceData}
                        chartType={ChartType.LINE}
                        colors={['#10b981']}
                        xAxis={{
                            label: 'Performance Metrics',
                            show: true,
                        }}
                        yAxis={{
                            label: 'Custom Value Ticks',
                            show: true,
                            customTick: ({ x, y, payload }) => (
                                <g transform={`translate(${x},${y})`}>
                                    <circle
                                        cx={0}
                                        cy={0}
                                        r={12}
                                        fill="#dcfce7"
                                        stroke="#16a34a"
                                        strokeWidth={2}
                                    />
                                    <text
                                        x={0}
                                        y={4}
                                        textAnchor="middle"
                                        fill="#16a34a"
                                        fontSize={10}
                                        fontWeight="bold"
                                    >
                                        {payload?.value}
                                    </text>
                                </g>
                            ),
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <TrendingUp
                                    size={16}
                                    className="text-green-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Custom Y-Axis Ticks (Circle Badges)
                                </h4>
                            </div>
                        }
                    />

                    {/* Custom Both Axes */}
                    <Charts
                        data={analyticsData}
                        chartType={ChartType.BAR}
                        colors={['#f59e0b']}
                        xAxis={{
                            label: 'Device Categories',
                            show: true,
                            customTick: ({ x, y, payload }) => (
                                <g transform={`translate(${x},${y})`}>
                                    <polygon
                                        points="-12,8 0,-8 12,8"
                                        fill="orange"
                                        stroke="orange"
                                    />
                                    <text
                                        x={0}
                                        y={2}
                                        textAnchor="middle"
                                        fill="orange"
                                        fontSize={10}
                                        fontWeight="bold"
                                    >
                                        {String(payload?.value).substring(0, 3)}
                                    </text>
                                </g>
                            ),
                        }}
                        yAxis={{
                            label: 'User Count',
                            show: true,
                            customTick: ({ x, y, payload }) => (
                                <g transform={`translate(${x},${y})`}>
                                    <rect
                                        x={-20}
                                        y={-6}
                                        width={40}
                                        height={12}
                                        fill="#fef3c7"
                                        stroke="#d97706"
                                        rx={6}
                                    />
                                    <text
                                        x={0}
                                        y={3}
                                        textAnchor="middle"
                                        fill="#d97706"
                                        fontSize={10}
                                        fontWeight="bold"
                                    >
                                        {payload?.value}K
                                    </text>
                                </g>
                            ),
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity
                                    size={16}
                                    className="text-amber-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Both Axes Custom (Triangles + Rounded
                                    Rectangles)
                                </h4>
                            </div>
                        }
                    />
                </div>

                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">
                        🎨 Advanced Components (Use when you need visual
                        customization):
                    </h4>
                    <div className="text-sm text-purple-700 space-y-2">
                        <div>
                            <strong>Usage:</strong>
                        </div>
                        <pre className="bg-purple-100 p-2 rounded text-xs overflow-x-auto">
                            {`<Charts
  xAxis={{
    customTick: ({ x, y, payload }) => (
      <g transform={\`translate(\${x},\${y})\`}>
        <rect x={-15} y={-8} width={30} height={16} 
              fill="#e3f2fd" stroke="#1976d2" rx={8} />
        <text x={0} y={4} textAnchor="middle" 
              fill="#1976d2" fontSize={12}>
          {payload.value}
        </text>
      </g>
    )
  }}
  yAxis={{
    customTick: ({ x, y, payload }) => (
      // Custom Y-axis tick component
    )
  }}
/>`}
                        </pre>
                        <div>
                            <strong>🚀 Use when:</strong> You need shapes,
                            colors, backgrounds, interactivity
                        </div>
                        <div>
                            <strong>⚠️ Cons:</strong> More complex, requires SVG
                            knowledge
                        </div>
                        <div>
                            <strong>Props Available:</strong>
                        </div>
                        <ul className="ml-4 space-y-1">
                            <li>
                                •{' '}
                                <code className="bg-purple-100 px-1 rounded">
                                    x, y
                                </code>{' '}
                                - Position coordinates
                            </li>
                            <li>
                                •{' '}
                                <code className="bg-purple-100 px-1 rounded">
                                    payload.value
                                </code>{' '}
                                - The tick value
                            </li>
                            <li>
                                •{' '}
                                <code className="bg-purple-100 px-1 rounded">
                                    payload.index
                                </code>{' '}
                                - Tick index
                            </li>
                            <li>
                                •{' '}
                                <code className="bg-purple-100 px-1 rounded">
                                    payload.coordinate
                                </code>{' '}
                                - Coordinate info
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Decision Matrix */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">
                    🤔 Which Approach Should You Use?
                </h3>

                <div className="flex flex-col gap-8">
                    {/* Simple Formatter */}
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-4">
                            <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                            <h4 className="font-bold text-green-800">
                                tickFormatter (Recommended)
                            </h4>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div>
                                <strong className="text-green-700">
                                    ✅ Use for:
                                </strong>
                                <ul className="ml-4 mt-1 space-y-1 text-green-600">
                                    <li>• Currency formatting ($1,000)</li>
                                    <li>• Percentage values (85%)</li>
                                    <li>• Date/time formatting</li>
                                    <li>• Unit conversions (1K, 1M)</li>
                                    <li>• Text transformations</li>
                                </ul>
                            </div>

                            <div>
                                <strong className="text-green-700">
                                    💚 Pros:
                                </strong>
                                <ul className="ml-4 mt-1 space-y-1 text-green-600">
                                    <li>• Simple one-liner</li>
                                    <li>• Type-safe</li>
                                    <li>• Performant</li>
                                    <li>• Easy to maintain</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-green-100 rounded">
                            <code className="text-xs text-green-800">
                                {`tickFormatter: (v) => \`$\${v}K\``}
                            </code>
                        </div>
                    </div>

                    {/* Custom Component */}
                    <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center mb-4">
                            <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                            <h4 className="font-bold text-purple-800">
                                customTick (Advanced)
                            </h4>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div>
                                <strong className="text-purple-700">
                                    🚀 Use for:
                                </strong>
                                <ul className="ml-4 mt-1 space-y-1 text-purple-600">
                                    <li>• Custom shapes & backgrounds</li>
                                    <li>• Color-coded indicators</li>
                                    <li>• Interactive elements</li>
                                    <li>• Brand-specific designs</li>
                                    <li>• Complex visual layouts</li>
                                </ul>
                            </div>

                            <div>
                                <strong className="text-purple-700">
                                    ⚠️ Consider:
                                </strong>
                                <ul className="ml-4 mt-1 space-y-1 text-purple-600">
                                    <li>• Requires SVG knowledge</li>
                                    <li>• More complex code</li>
                                    <li>• Manual positioning</li>
                                    <li>• Harder to maintain</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-purple-100 rounded">
                            <code className="text-xs text-purple-800">
                                {`customTick: Component with <rect>, <circle>, etc.`}
                            </code>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                        💡 Quick Decision Guide:
                    </h4>
                    <div className="text-sm text-blue-700 flex flex-col gap-4">
                        <div>
                            <strong>Start with tickFormatter if:</strong>
                            <ul className="ml-4 mt-1 space-y-1">
                                <li>• You only need text changes</li>
                                <li>• You want a quick solution</li>
                                <li>• Performance is critical</li>
                            </ul>
                        </div>
                        <div>
                            <strong>Upgrade to customTick when:</strong>
                            <ul className="ml-4 mt-1 space-y-1">
                                <li>• You need visual styling</li>
                                <li>• You want interactivity</li>
                                <li>• You have complex designs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Showcase */}
            <div className="chart-example-container mb-12">
                <h3 className="text-xl font-bold mb-6">Feature Showcase</h3>
                <div className="flex flex-col gap-8">
                    {/* Limited Metrics Example */}

                    <Charts
                        data={financialData}
                        chartType={ChartType.LINE}
                        xAxis={{
                            label: 'Month',
                        }}
                        yAxis={{
                            label: 'Amount ($)',
                        }}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <h4 style={{ margin: 0 }}>
                                    Limited Metrics (Revenue & Profit Only)
                                </h4>
                            </div>
                        }
                    />

                    {/* Custom Colors Example */}

                    <Charts
                        data={performanceData}
                        chartType={ChartType.BAR}
                        colors={['#dc2626', '#059669', '#7c3aed']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <h4 style={{ margin: 0 }}>
                                    Custom Color Scheme
                                </h4>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Tooltip Formatting Examples */}
            <div className="chart-example-container mb-12">
                <h3 className="chart-header-title mb-6">
                    🎯 Smart Tooltip Formatting
                </h3>
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="text-green-800 font-semibold mb-2">
                        ✅ What's New: Tooltips Respect Axis Formatting!
                    </h4>
                    <p className="text-green-700 text-sm">
                        Tooltips now automatically apply the same formatting as
                        your axes. No more raw POSIX timestamps or unformatted
                        currency values in tooltips!
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {/* Date/Time Tooltip Example */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            📅 Date & Time Formatting
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            <strong>Hover over points:</strong> X-axis shows
                            formatted dates + times, Y-axis shows formatted
                            currency. Raw data contains POSIX timestamps but
                            tooltips show human-readable dates and times!
                        </p>
                        <Charts
                            data={[
                                {
                                    name: '1693065600', // POSIX: Aug 26, 2023, 8:00 AM
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales Revenue',
                                                val: 12500.75,
                                            },
                                            aux: [
                                                {
                                                    label: 'Growth Rate',
                                                    val: 8.5,
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1693130400', // POSIX: Aug 27, 2023, 2:00 PM
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales Revenue',
                                                val: 15300.25,
                                            },
                                            aux: [
                                                {
                                                    label: 'Growth Rate',
                                                    val: 12.3,
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1693245600', // POSIX: Aug 28, 2023, 6:00 PM
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Sales Revenue',
                                                val: 18750.5,
                                            },
                                            aux: [
                                                {
                                                    label: 'Growth Rate',
                                                    val: 15.7,
                                                },
                                            ],
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.LINE}
                            xAxis={{
                                label: 'Date',
                                type: AxisType.DATE_TIME,
                            }}
                            yAxis={{
                                label: 'Revenue',
                                type: AxisType.CURRENCY,
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <h4 style={{ margin: 0 }}>
                                        Smart Date & Currency Tooltips
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            💡 Raw data: X = POSIX timestamps, Y = raw numbers •
                            Tooltip: X = "Aug 26, 2023, 8:00 AM", Y = "$12.5K"
                        </div>
                    </div>

                    {/* Custom Formatter Tooltip Example */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            🛠️ Custom Formatter Tooltips
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            <strong>Hover over bars:</strong> Custom X-axis
                            formatter shows "Month: Jan" and Y-axis shows
                            percentage with % symbol.
                        </p>
                        <Charts
                            data={[
                                {
                                    name: 'January',
                                    data: {
                                        efficiency: {
                                            primary: {
                                                label: 'Team Efficiency',
                                                val: 85.5,
                                            },
                                        },
                                    },
                                },
                                {
                                    name: 'February',
                                    data: {
                                        efficiency: {
                                            primary: {
                                                label: 'Team Efficiency',
                                                val: 92.3,
                                            },
                                        },
                                    },
                                },
                                {
                                    name: 'March',
                                    data: {
                                        efficiency: {
                                            primary: {
                                                label: 'Team Efficiency',
                                                val: 78.9,
                                            },
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.BAR}
                            xAxis={{
                                label: 'Month',
                                tickFormatter: (value) =>
                                    `Month: ${String(value).substring(0, 3)}`, // 🎯 Custom X formatting
                            }}
                            yAxis={{
                                label: 'Efficiency (%)',
                                type: AxisType.PERCENTAGE, // 🎯 Y-axis as percentage
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <h4 style={{ margin: 0 }}>
                                        Custom Formatter + Percentage Tooltips
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            🎯 Tooltip shows: "Month: Jan" (custom) + "85.5%"
                            (auto %)
                        </div>
                    </div>

                    {/* Date Only Example */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            📅 Date-Only Formatting
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            <strong>Hover over bars:</strong> Perfect for daily
                            data! Shows only dates without time for cleaner
                            daily/weekly/monthly charts.
                        </p>
                        <Charts
                            data={[
                                {
                                    name: '1693036800', // Aug 26, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Daily Sales',
                                                val: 12500,
                                            },
                                            aux: [{ label: 'Orders', val: 45 }],
                                        },
                                    },
                                },
                                {
                                    name: '1693123200', // Aug 27, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Daily Sales',
                                                val: 15300,
                                            },
                                            aux: [{ label: 'Orders', val: 52 }],
                                        },
                                    },
                                },
                                {
                                    name: '1693209600', // Aug 28, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Daily Sales',
                                                val: 18750,
                                            },
                                            aux: [{ label: 'Orders', val: 63 }],
                                        },
                                    },
                                },
                                {
                                    name: '1693296000', // Aug 29, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Daily Sales',
                                                val: 21200,
                                            },
                                            aux: [{ label: 'Orders', val: 71 }],
                                        },
                                    },
                                },
                                {
                                    name: '1693382400', // Aug 30, 2023
                                    data: {
                                        sales: {
                                            primary: {
                                                label: 'Daily Sales',
                                                val: 19800,
                                            },
                                            aux: [{ label: 'Orders', val: 67 }],
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.BAR}
                            xAxis={{
                                label: 'Date',
                                type: AxisType.DATE_TIME,
                                dateOnly: true, // 📅 Shows date only!
                            }}
                            yAxis={{
                                label: 'Sales ($)',
                                type: AxisType.CURRENCY,
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <h4 style={{ margin: 0 }}>
                                        Daily Sales Report
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            📅 X-axis: "Aug 26, 2023" • "Aug 27, 2023" • "Aug
                            28, 2023" (dates only, no time)
                        </div>
                    </div>

                    {/* Smart Date/Time Example */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            🧠 Smart Date/Time Formatting
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            <strong>Hover over points:</strong> Smart formatting
                            shows full date only when date changes! Same day =
                            time only ("8:00 AM"), new day = full date + time
                            ("Aug 27, 2023, 6:00 PM")
                        </p>
                        <Charts
                            data={[
                                {
                                    name: '1693065600', // Aug 26, 2023, 8:00 AM
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 150,
                                            },
                                        },
                                    },
                                },
                                {
                                    name: '1693072800', // Aug 26, 2023, 10:00 AM (same day)
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 180,
                                            },
                                        },
                                    },
                                },
                                {
                                    name: '1693080000', // Aug 26, 2023, 12:00 PM (same day)
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 220,
                                            },
                                        },
                                    },
                                },
                                {
                                    name: '1693152000', // Aug 27, 2023, 8:00 AM (NEW DAY)
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 165,
                                            },
                                        },
                                    },
                                },
                                {
                                    name: '1693159200', // Aug 27, 2023, 10:00 AM (same day)
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 195,
                                            },
                                        },
                                    },
                                },
                                {
                                    name: '1693238400', // Aug 28, 2023, 8:00 AM (NEW DAY)
                                    data: {
                                        activity: {
                                            primary: {
                                                label: 'User Activity',
                                                val: 175,
                                            },
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.LINE}
                            xAxis={{
                                label: 'Time',
                                type: AxisType.DATE_TIME,
                            }}
                            yAxis={{
                                label: 'Activity Level',
                                type: AxisType.NUMBER,
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <h4 style={{ margin: 0 }}>
                                        Smart Date/Time Display
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            🧠 X-axis: "Aug 26, 2023, 8:00 AM" → "10:00 AM" →
                            "12:00 PM" → "Aug 27, 2023, 8:00 AM" → "10:00 AM"
                        </div>
                    </div>

                    {/* Consolidated Date/Time API Demo */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            🎯 Unified Date/Time API
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            <strong>
                                One AxisType.DATE_TIME with options:
                            </strong>{' '}
                            Choose your formatting style with simple boolean
                            flags. Clean, flexible, and powerful!
                        </p>
                        <div className="flex flex-col gap-8">
                            {/* Date Only */}
                            <div>
                                <h5 className="text-sm font-semibold mb-2">
                                    📅 Date Only
                                </h5>
                                <Charts
                                    data={[
                                        {
                                            name: '1693036800',
                                            data: {
                                                sales: {
                                                    primary: {
                                                        label: 'Sales',
                                                        val: 12500,
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            name: '1693123200',
                                            data: {
                                                sales: {
                                                    primary: {
                                                        label: 'Sales',
                                                        val: 15300,
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            name: '1693209600',
                                            data: {
                                                sales: {
                                                    primary: {
                                                        label: 'Sales',
                                                        val: 18750,
                                                    },
                                                },
                                            },
                                        },
                                    ]}
                                    chartType={ChartType.BAR}
                                    xAxis={{
                                        type: AxisType.DATE_TIME,
                                        dateOnly: true, // 📅 Just dates
                                    }}
                                    yAxis={{ type: AxisType.CURRENCY }}
                                    chartHeaderSlot={<div />}
                                />
                                <div className="mt-1 text-xs text-gray-500">
                                    <code>dateOnly: true</code>
                                </div>
                            </div>

                            {/* Date + Time */}
                            <div>
                                <h5 className="text-sm font-semibold mb-2">
                                    ⏰ Date + Time
                                </h5>
                                <Charts
                                    data={[
                                        {
                                            name: '1693065600',
                                            data: {
                                                sales: {
                                                    primary: {
                                                        label: 'Sales',
                                                        val: 12500,
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            name: '1693072800',
                                            data: {
                                                sales: {
                                                    primary: {
                                                        label: 'Sales',
                                                        val: 15300,
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            name: '1693080000',
                                            data: {
                                                sales: {
                                                    primary: {
                                                        label: 'Sales',
                                                        val: 18750,
                                                    },
                                                },
                                            },
                                        },
                                    ]}
                                    chartType={ChartType.LINE}
                                    xAxis={{
                                        type: AxisType.DATE_TIME,
                                        // Default: shows date + time
                                    }}
                                    yAxis={{ type: AxisType.CURRENCY }}
                                    chartHeaderSlot={<div />}
                                />
                                <div className="mt-1 text-xs text-gray-500">
                                    <code>Default behavior</code>
                                </div>
                            </div>

                            {/* Smart Date/Time */}
                            <div>
                                <h5 className="text-sm font-semibold mb-2">
                                    🧠 Smart Date/Time
                                </h5>
                                <Charts
                                    data={[
                                        {
                                            name: '1693065600',
                                            data: {
                                                activity: {
                                                    primary: {
                                                        label: 'Activity',
                                                        val: 150,
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            name: '1693072800',
                                            data: {
                                                activity: {
                                                    primary: {
                                                        label: 'Activity',
                                                        val: 180,
                                                    },
                                                },
                                            },
                                        },
                                        {
                                            name: '1693152000',
                                            data: {
                                                activity: {
                                                    primary: {
                                                        label: 'Activity',
                                                        val: 165,
                                                    },
                                                },
                                            },
                                        },
                                    ]}
                                    chartType={ChartType.LINE}
                                    xAxis={{
                                        type: AxisType.DATE_TIME,
                                    }}
                                    yAxis={{ type: AxisType.NUMBER }}
                                    chartHeaderSlot={<div />}
                                />
                                <div className="mt-1 text-xs text-gray-500">
                                    <code>smart: true</code>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <h5 className="text-blue-800 font-semibold mb-2">
                                ✨ New Unified API:
                            </h5>
                            <div className="text-sm text-blue-700 flex flex-col gap-6">
                                <div>
                                    <strong>📅 Date Only:</strong>
                                    <pre className="text-xs mt-1 bg-blue-100 p-2 rounded">
                                        {`xAxis={{
  type: AxisType.DATE_TIME,
  dateOnly: true
}}`}
                                    </pre>
                                </div>
                                <div>
                                    <strong>⏰ Date + Time:</strong>
                                    <pre className="text-xs mt-1 bg-blue-100 p-2 rounded">
                                        {`xAxis={{
  type: AxisType.DATE_TIME
  // Default behavior
}}`}
                                    </pre>
                                </div>
                                <div>
                                    <strong>🧠 Smart:</strong>
                                    <pre className="text-xs mt-1 bg-blue-100 p-2 rounded">
                                        {`xAxis={{
  type: AxisType.DATE_TIME,
  smart: true
}}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mixed Format Tooltip Example */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">
                            🎨 Mixed Formats & UTC Support
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            <strong>Hover over points:</strong> X-axis handles
                            UTC format, Y-axis formats large numbers. Raw UTC
                            strings become readable dates + times in tooltips!
                        </p>
                        <Charts
                            data={[
                                {
                                    name: '1756252800000', // UTC format
                                    data: {
                                        users: {
                                            primary: {
                                                label: 'Active Users',
                                                val: 1250000,
                                            },
                                            aux: [
                                                {
                                                    label: 'Daily Growth',
                                                    val: 2500,
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1756256400000', // UTC format
                                    data: {
                                        users: {
                                            primary: {
                                                label: 'Active Users',
                                                val: 1387500,
                                            },
                                            aux: [
                                                {
                                                    label: 'Daily Growth',
                                                    val: 3200,
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    name: '1756260000000', // UTC format
                                    data: {
                                        users: {
                                            primary: {
                                                label: 'Active Users',
                                                val: 1523750,
                                            },
                                            aux: [
                                                {
                                                    label: 'Daily Growth',
                                                    val: 4100,
                                                },
                                            ],
                                        },
                                    },
                                },
                            ]}
                            chartType={ChartType.LINE}
                            xAxis={{
                                label: 'Timestamp',
                                type: AxisType.DATE_TIME,
                            }}
                            yAxis={{
                                label: 'Users',
                                type: AxisType.NUMBER,
                            }}
                            chartHeaderSlot={
                                <div className="chart-header">
                                    <h4 style={{ margin: 0 }}>
                                        UTC Dates + Large Number Tooltips
                                    </h4>
                                </div>
                            }
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            ⚡ Raw: "2024-08-25T14:30:00Z" + 1250000 • Tooltip:
                            "Aug 25, 2024, 2:30 PM" + "1.25M"
                        </div>
                    </div>

                    {/* Before/After Comparison */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-3 text-red-600">
                                ❌ Before: Raw Data in Tooltips
                            </h4>
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm">
                                <strong>Tooltip showed:</strong>
                                <ul className="mt-2 space-y-1 text-red-700">
                                    <li>• X-axis: "1693036800" (raw POSIX)</li>
                                    <li>• Y-axis: "12500.75" (raw number)</li>
                                    <li>
                                        • Currency: "$12500.75" (no K/M
                                        formatting)
                                    </li>
                                    <li>
                                        • Dates: "2024-08-25T14:30:00Z" (raw
                                        UTC)
                                    </li>
                                </ul>
                                <div className="mt-3 text-xs text-red-600">
                                    😞 User Experience: Confusing and hard to
                                    read
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-3 text-green-600">
                                ✅ After: Smart Formatted Tooltips
                            </h4>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
                                <strong>Tooltip now shows:</strong>
                                <ul className="mt-2 space-y-1 text-green-700">
                                    <li>
                                        • X-axis: "Aug 26, 2023, 8:00 AM"
                                        (formatted date + time)
                                    </li>
                                    <li>
                                        • Y-axis: "$12.5K" (formatted currency)
                                    </li>
                                    <li>
                                        • Large numbers: "1.25M users" (K/M
                                        format)
                                    </li>
                                    <li>
                                        • Percentages: "85.5%" (with % symbol)
                                    </li>
                                </ul>
                                <div className="mt-3 text-xs text-green-600">
                                    🎉 User Experience: Clean, readable, and
                                    professional
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-blue-800 font-semibold mb-2">
                            🚀 Key Features:
                        </h4>
                        <div className="text-sm text-blue-700 flex flex-col gap-6">
                            <div>
                                <strong>Automatic Formatting:</strong>
                                <ul className="ml-4 mt-1 space-y-1">
                                    <li>• Same formatting as axes</li>
                                    <li>• Respects `type` settings</li>
                                    <li>• Honors custom formatters</li>
                                    <li>
                                        • 🎯 Unified DATE_TIME type with options
                                    </li>
                                    <li>• 📅 Date-only (dateOnly: true)</li>
                                    <li>• ⏰ Date + time (default behavior)</li>
                                    <li>• 🧠 Smart formatting (smart: true)</li>
                                </ul>
                            </div>
                            <div>
                                <strong>Zero Configuration:</strong>
                                <ul className="ml-4 mt-1 space-y-1">
                                    <li>
                                        • Set `xAxis.type` → tooltip formats
                                        automatically
                                    </li>
                                    <li>
                                        • Works with LINE, BAR, and PIE charts
                                    </li>
                                    <li>
                                        • Formats both primary and aux values
                                    </li>
                                    <li>• Backwards compatible</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configuration Summary */}
            <div className="chart-example-container mb-12">
                <h3 className="chart-header-title mb-6">
                    Current Configuration
                </h3>
                <div className="flex flex-col gap-4 text-sm bg-gray-50 p-6 rounded-lg">
                    <div>
                        <strong>Chart Type:</strong> {selectedChartType}
                    </div>
                    <div>
                        <strong>Dataset:</strong> {selectedDataset}
                    </div>
                    <div>
                        <strong>Legend Position:</strong>{' '}
                        {selectedLegendPosition}
                    </div>
                    <div>
                        <strong>Date Range:</strong> {selectedDateRange}
                    </div>
                    <div>
                        <strong>Metrics:</strong>{' '}
                        {showLimitedMetrics ? 'Limited' : 'All'}
                    </div>
                    <div>
                        <strong>Data Points:</strong> {getCurrentData().length}
                    </div>
                </div>

                {/* Empty State Examples */}
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        📊 Empty State Examples
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Demonstrating how charts handle no-data scenarios with
                        professional empty states
                    </p>

                    <div className="flex flex-col gap-6">
                        {/* Empty Line Chart */}
                        <div className="">
                            <h3 className="text-lg font-semibold mb-2 text-gray-700">
                                Empty Line Chart
                            </h3>
                            <div className="">
                                <Charts
                                    data={[]} // Empty data array
                                    chartType={ChartType.LINE}
                                    colors={['#3b82f6', '#10b981', '#f59e0b']}
                                    chartHeaderSlot={null}
                                    xAxis={{
                                        label: 'Time Period',
                                        show: true,
                                        type: AxisType.DATE_TIME,
                                    }}
                                    yAxis={{
                                        label: 'Performance (%)',
                                        show: true,
                                        type: AxisType.PERCENTAGE,
                                    }}
                                    noData={{
                                        title: 'Empty data',
                                        subtitle: 'Add data to see it here',
                                        button: {
                                            text: 'Add data',
                                            onClick: () => {},
                                            leadingIcon: (
                                                <LoaderCircle className=" text-gray-400" />
                                            ),
                                        },
                                        slot: (
                                            <ChartBar className="w-8 h-8 text-gray-400" />
                                        ),
                                    }}
                                />
                            </div>
                        </div>

                        {/* Empty Bar Chart */}
                        <div className="">
                            <h3 className="text-lg font-semibold mb-2 text-gray-700">
                                Empty Bar Chart
                            </h3>
                            <div className="">
                                <Charts
                                    data={[]} // Empty data array for cleaner demo
                                    chartType={ChartType.BAR}
                                    colors={['#ef4444', '#8b5cf6']}
                                    chartHeaderSlot={null}
                                    xAxis={{
                                        label: 'Categories',
                                        show: true,
                                    }}
                                    yAxis={{
                                        label: 'Revenue ($)',
                                        show: true,
                                        type: AxisType.CURRENCY,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Empty Pie Chart */}
                        <div className="">
                            <h3 className="text-lg font-semibold mb-2 text-gray-700">
                                Empty Pie Chart
                            </h3>
                            <div className="">
                                <Charts
                                    data={[]} // Empty data array
                                    chartType={ChartType.PIE}
                                    colors={['#f97316', '#06b6d4', '#84cc16']}
                                    chartHeaderSlot={null}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Code Examples */}
                    <div className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono">
                        <div className="text-white mb-2">
                            💡 <strong>Usage Examples:</strong>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <span className="text-blue-300">
                                    // Empty array:
                                </span>
                                <div className="text-gray-300">
                                    {
                                        '<Charts data={[]} chartType={ChartType.LINE} />'
                                    }
                                </div>
                            </div>
                            <div>
                                <span className="text-blue-300">
                                    // Missing chartHeaderSlot:
                                </span>
                                <div className="text-gray-300">
                                    {'chartHeaderSlot={null}'}
                                </div>
                            </div>
                            <div>
                                <span className="text-blue-300">
                                    // Any chart type:
                                </span>
                                <div className="text-gray-300">
                                    {'chartType={ChartType.LINE | BAR | PIE}'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartDemo
