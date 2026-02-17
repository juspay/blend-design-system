import { useState } from 'react'
import { DateRangePicker } from '../../../../packages/blend/lib/components/DateRangePicker'
import {
    DateRange,
    DateRangePreset,
    DateFormatPreset,
    DateFormatConfig,
    TriggerConfig,
    DateRangePickerSize,
} from '../../../../packages/blend/lib/components/DateRangePicker/types'

// Custom Button Component for triggers
const CustomButton = ({
    children,
    onClick,
    variant = 'primary',
    style = {},
}: {
    children: React.ReactNode
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
    style?: React.CSSProperties
}) => {
    const baseStyle: React.CSSProperties = {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        ...style,
    }

    const variants = {
        primary: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        secondary: {
            backgroundColor: '#6c757d',
            color: 'white',
        },
        outline: {
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '1px solid #007bff',
        },
    }

    return (
        <button
            style={{ ...baseStyle, ...variants[variant] }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

// Calendar Icon Component
const CalendarIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

// Filter Icon Component
const FilterIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </svg>
)

const DateRangePickerDemo = () => {
    // Main playground state
    const [playgroundRange, setPlaygroundRange] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    // Configuration state
    const [config, setConfig] = useState({
        showPresets: true,
        showDateTimePicker: true,
        useDrawerOnMobile: true,
        skipQuickFiltersOnMobile: false,
        allowSingleDateSelection: false,
        disableFutureDates: false,
        disablePastDates: false,
        hideFutureDates: false,
        hidePastDates: false,
        isDisabled: false,
        showPreset: false,
        formatPreset: DateFormatPreset.MEDIUM_RANGE,
        includeTime: false,
        includeYear: true,
        timeFormat: '12h' as '12h' | '24h',
        size: DateRangePickerSize.MEDIUM,
        triggerType: 'default' as
            | 'default'
            | 'custom-button'
            | 'custom-card'
            | 'custom-filter',
    })

    // Example states for different sections
    const [basicRange, setBasicRange] = useState<DateRange | undefined>({
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    const [formatRange, setFormatRange] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    })

    const [customRange, setCustomRange] = useState<DateRange>({
        startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
    })

    // Simple yesterday range - component handles timezone internally
    const [yesterdayRange, setYesterdayRange] = useState<DateRange>(() => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return {
            startDate: new Date(
                yesterday.getFullYear(),
                yesterday.getMonth(),
                yesterday.getDate(),
                0,
                0,
                0,
                0
            ),
            endDate: new Date(
                yesterday.getFullYear(),
                yesterday.getMonth(),
                yesterday.getDate(),
                23,
                59,
                59,
                999
            ),
        }
    })

    // Single date selection state - initialized with a proper single date range
    const [singleDateRange, setSingleDateRange] = useState<DateRange>(() => {
        const today = new Date()
        return {
            startDate: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                0,
                0,
                0,
                0
            ),
            endDate: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                23,
                59,
                59,
                999
            ),
        }
    })

    // Timezone demo states
    const [dateRange36, setDateRange36] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    const [dateRange37, setDateRange37] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    const [dateRange38, setDateRange38] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    const [dateRange39, setDateRange39] = useState<DateRange>({
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    // Console logging functions for date changes
    const handlePlaygroundRangeChange = (range: DateRange) => {
        console.log('Playground Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate ? range.endDate.toISOString() : undefined,
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate
                ? range.endDate.toLocaleString()
                : undefined,
        })
        setPlaygroundRange(range)
    }

    const handlePlaygroundPresetSelection = (data: any) => {
        console.log('🚀 Preset Selected!', {
            preset: data.preset,
            label: data.label,
            dateRange: {
                startDate: data.dateRange.startDate.toISOString(),
                endDate: data.dateRange.endDate.toISOString(),
            },
            formattedDates: {
                startDate: data.formattedStartDate,
                endDate: data.formattedEndDate,
                startTime: data.formattedStartTime,
                endTime: data.formattedEndTime,
            },
        })
    }

    const handleBasicRangeChange = (range: DateRange) => {
        console.log('Basic Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate ? range.endDate.toISOString() : undefined,
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate
                ? range.endDate.toLocaleString()
                : undefined,
        })
        setBasicRange(range)
    }

    const handleFormatRangeChange = (range: DateRange) => {
        console.log('Format Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate ? range.endDate.toISOString() : undefined,
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate
                ? range.endDate.toLocaleString()
                : undefined,
        })
        setFormatRange(range)
    }

    const handleCustomRangeChange = (range: DateRange) => {
        console.log('Custom Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate ? range.endDate.toISOString() : undefined,
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate
                ? range.endDate.toLocaleString()
                : undefined,
        })
        setCustomRange(range)
    }

    const handleYesterdayRangeChange = (range: DateRange) => {
        console.log('Yesterday Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate ? range.endDate.toISOString() : undefined,
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate
                ? range.endDate.toLocaleString()
                : undefined,
        })
        setYesterdayRange(range)
    }

    const handleSingleDateRangeChange = (range: DateRange) => {
        console.log('Single Date Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate ? range.endDate.toISOString() : undefined,
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate
                ? range.endDate.toLocaleString()
                : undefined,
            isSingleDay:
                range.endDate &&
                range.startDate.toDateString() === range.endDate.toDateString(),
            isFullDay:
                range.startDate.getHours() === 0 &&
                range.startDate.getMinutes() === 0 &&
                range.endDate &&
                range.endDate.getMinutes() === 59,
        })
        setSingleDateRange(range)
    }

    // Handle configuration changes
    const handleCheckboxChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: e.target.checked,
            })
        }

    const handleSelectChange =
        (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            setConfig({
                ...config,
                [field]: e.target.value,
            })
        }

    // Generate format config based on current settings
    const getFormatConfig = (): DateFormatConfig => ({
        preset: config.formatPreset,
        includeTime: config.includeTime,
        includeYear: config.includeYear,
        timeFormat: config.timeFormat,
    })

    // Generate trigger config based on current settings
    const getTriggerConfig = (): TriggerConfig | undefined => {
        switch (config.triggerType) {
            case 'custom-button':
                return {
                    renderTrigger: ({ onClick, formattedValue }) => (
                        <CustomButton onClick={onClick} variant="primary">
                            <CalendarIcon />
                            {formattedValue || 'Select Date Range'}
                        </CustomButton>
                    ),
                }
            case 'custom-card':
                return {
                    renderTrigger: ({ onClick, formattedValue, isOpen }) => (
                        <div
                            onClick={onClick}
                            style={{
                                padding: '12px 16px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                backgroundColor: isOpen ? '#f8f9fa' : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                minWidth: '200px',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginBottom: '4px',
                                }}
                            >
                                Report Period
                            </div>
                            <div
                                style={{ fontSize: '14px', fontWeight: '500' }}
                            >
                                {formattedValue || 'Select dates'}
                            </div>
                        </div>
                    ),
                }
            case 'custom-filter':
                return {
                    renderTrigger: ({ onClick, formattedValue }) => (
                        <CustomButton onClick={onClick} variant="outline">
                            <FilterIcon />
                            {formattedValue || 'Filter by Date'}
                        </CustomButton>
                    ),
                }
            default:
                return undefined
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    DateRangePicker Configuration Playground
                </h1>
                <p className="text-lg text-gray-600">
                    Customize the DateRangePicker to see different
                    configurations in action
                </p>
            </div>

            {/* Main Configuration Playground */}
            <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Configuration Panel */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Configuration Panel
                        </h3>

                        <div className="space-y-6">
                            {/* Basic Settings */}
                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-3">
                                    Basic Settings
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.showPresets}
                                            onChange={handleCheckboxChange(
                                                'showPresets'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Show Presets</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.showDateTimePicker}
                                            onChange={handleCheckboxChange(
                                                'showDateTimePicker'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Show Date Time Picker</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.useDrawerOnMobile}
                                            onChange={handleCheckboxChange(
                                                'useDrawerOnMobile'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Use Drawer on Mobile</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={
                                                config.allowSingleDateSelection
                                            }
                                            onChange={handleCheckboxChange(
                                                'allowSingleDateSelection'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Allow Single Date Selection</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.disableFutureDates}
                                            onChange={handleCheckboxChange(
                                                'disableFutureDates'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Disable Future Dates</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.disablePastDates}
                                            onChange={handleCheckboxChange(
                                                'disablePastDates'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Disable Past Dates</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.hideFutureDates}
                                            onChange={handleCheckboxChange(
                                                'hideFutureDates'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Hide Future Dates</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.hidePastDates}
                                            onChange={handleCheckboxChange(
                                                'hidePastDates'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Hide Past Dates</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.isDisabled}
                                            onChange={handleCheckboxChange(
                                                'isDisabled'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Disabled State</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={
                                                config.skipQuickFiltersOnMobile
                                            }
                                            onChange={handleCheckboxChange(
                                                'skipQuickFiltersOnMobile'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>
                                            Skip Quick Filters on Mobile
                                        </span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.showPreset}
                                            onChange={handleCheckboxChange(
                                                'showPreset'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>🆕 Preset-Only Mode</span>
                                    </label>
                                </div>
                            </div>

                            {/* Format Settings */}
                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-3">
                                    Format Settings
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            Format Preset
                                        </label>
                                        <select
                                            value={config.formatPreset}
                                            onChange={handleSelectChange(
                                                'formatPreset'
                                            )}
                                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                        >
                                            <option
                                                value={
                                                    DateFormatPreset.SHORT_RANGE
                                                }
                                            >
                                                Short Range
                                            </option>
                                            <option
                                                value={
                                                    DateFormatPreset.MEDIUM_RANGE
                                                }
                                            >
                                                Medium Range
                                            </option>
                                            <option
                                                value={
                                                    DateFormatPreset.LONG_RANGE
                                                }
                                            >
                                                Long Range
                                            </option>
                                            <option
                                                value={
                                                    DateFormatPreset.ISO_RANGE
                                                }
                                            >
                                                ISO Range
                                            </option>
                                            <option
                                                value={
                                                    DateFormatPreset.US_RANGE
                                                }
                                            >
                                                US Range
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            Time Format
                                        </label>
                                        <select
                                            value={config.timeFormat}
                                            onChange={handleSelectChange(
                                                'timeFormat'
                                            )}
                                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                            disabled={!config.includeTime}
                                        >
                                            <option value="12h">
                                                12 Hour (AM/PM)
                                            </option>
                                            <option value="24h">24 Hour</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">
                                            Size
                                        </label>
                                        <select
                                            value={config.size}
                                            onChange={handleSelectChange(
                                                'size'
                                            )}
                                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                        >
                                            <option
                                                value={
                                                    DateRangePickerSize.SMALL
                                                }
                                            >
                                                Small
                                            </option>
                                            <option
                                                value={
                                                    DateRangePickerSize.MEDIUM
                                                }
                                            >
                                                Medium
                                            </option>
                                            <option
                                                value={
                                                    DateRangePickerSize.LARGE
                                                }
                                            >
                                                Large
                                            </option>
                                        </select>
                                    </div>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.includeTime}
                                            onChange={handleCheckboxChange(
                                                'includeTime'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Include Time in Format</span>
                                    </label>

                                    <label className="flex items-center cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={config.includeYear}
                                            onChange={handleCheckboxChange(
                                                'includeYear'
                                            )}
                                            className="mr-2 cursor-pointer"
                                        />
                                        <span>Include Year in Format</span>
                                    </label>
                                </div>
                            </div>

                            {/* Trigger Settings */}
                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-3">
                                    Trigger Settings
                                </h4>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">
                                        Trigger Type
                                    </label>
                                    <select
                                        value={config.triggerType}
                                        onChange={handleSelectChange(
                                            'triggerType'
                                        )}
                                        className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="default">
                                            Default Trigger
                                        </option>
                                        <option value="custom-button">
                                            Custom Button
                                        </option>
                                        <option value="custom-card">
                                            Custom Card
                                        </option>
                                        <option value="custom-filter">
                                            Custom Filter
                                        </option>
                                    </select>
                                </div>
                                {config.triggerType !== 'default' && (
                                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                                        <p className="text-blue-700 text-sm">
                                            <strong>Note:</strong> Custom
                                            triggers automatically hide
                                            preset/quick selectors.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Preview */}
                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-3">
                                    Current Settings
                                </h4>
                                <div className="p-3 bg-white border border-gray-300 rounded-md">
                                    <p className="text-sm text-gray-600 mb-1">
                                        Format: {config.formatPreset} | Time:{' '}
                                        {config.includeTime ? 'Yes' : 'No'} |
                                        Year:{' '}
                                        {config.includeYear ? 'Yes' : 'No'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        The component will automatically format
                                        dates based on these settings
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Example */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Live Example
                        </h3>

                        <div className="p-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={playgroundRange}
                                    onChange={handlePlaygroundRangeChange}
                                    onPresetSelection={
                                        handlePlaygroundPresetSelection
                                    }
                                    showPresets={config.showPresets}
                                    showDateTimePicker={
                                        config.showDateTimePicker
                                    }
                                    useDrawerOnMobile={config.useDrawerOnMobile}
                                    skipQuickFiltersOnMobile={
                                        config.skipQuickFiltersOnMobile
                                    }
                                    allowSingleDateSelection={
                                        config.allowSingleDateSelection
                                    }
                                    disableFutureDates={
                                        config.disableFutureDates
                                    }
                                    disablePastDates={config.disablePastDates}
                                    hideFutureDates={config.hideFutureDates}
                                    hidePastDates={config.hidePastDates}
                                    isDisabled={config.isDisabled}
                                    showPreset={config.showPreset}
                                    size={config.size}
                                    formatConfig={getFormatConfig()}
                                    triggerConfig={getTriggerConfig()}
                                />
                            </div>
                        </div>

                        {/* Current Values */}
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-2">
                                Current Selection
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div>
                                    <strong>Start:</strong>{' '}
                                    {playgroundRange.startDate.toLocaleString()}
                                </div>
                                {playgroundRange.endDate && (
                                    <>
                                        <div>
                                            <strong>End:</strong>{' '}
                                            {playgroundRange.endDate.toLocaleString()}
                                        </div>
                                        <div>
                                            <strong>Duration:</strong>{' '}
                                            {Math.ceil(
                                                (playgroundRange.endDate.getTime() -
                                                    playgroundRange.startDate.getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            )}{' '}
                                            days
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Example Sections */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        DateRangePicker Examples
                    </h2>
                    <p className="text-base text-gray-600 mb-6">
                        Pre-configured examples for common use cases
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Example */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Basic Usage
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Standard DateRangePicker with presets and time
                            picker
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={basicRange}
                                onChange={handleBasicRangeChange}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Format Example */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Custom Format
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Using compact format preset without time
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={formatRange}
                                onChange={handleFormatRangeChange}
                                formatConfig={{
                                    preset: DateFormatPreset.SHORT_RANGE,
                                    includeTime: false,
                                    includeYear: true,
                                }}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Custom Trigger Example */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Custom Trigger
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Custom button trigger (presets hidden automatically)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                formatConfig={{
                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                    includeTime: false,
                                    includeYear: true,
                                }}
                                triggerConfig={{
                                    renderTrigger: ({
                                        onClick,
                                        formattedValue,
                                    }) => (
                                        <CustomButton
                                            onClick={onClick}
                                            variant="primary"
                                            style={{ maxWidth: '100%' }}
                                        >
                                            <CalendarIcon />
                                            <span className="truncate">
                                                {formattedValue ||
                                                    'Select Range'}
                                            </span>
                                        </CustomButton>
                                    ),
                                }}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* ISO Format Example */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            ISO Format
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Shows dates in ISO format (YYYY-MM-DD)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                formatConfig={{
                                    preset: DateFormatPreset.ISO_RANGE,
                                    includeTime: false,
                                    includeYear: true,
                                }}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Simple Preset Detection */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Simple Preset Detection
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            This example is initialized with yesterday's date
                            range. The component automatically detects and
                            highlights the "Yesterday" preset. Clean and
                            predictable!
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={yesterdayRange}
                                onChange={handleYesterdayRangeChange}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Disabled Future Dates */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Past Dates Only (Disabled)
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Future dates are disabled but still visible
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                disableFutureDates={true}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Hidden Future Dates */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Past Dates Only (Hidden)
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Future dates are completely hidden from calendar
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                hideFutureDates={true}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Single Date Selection */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Single Date Mode
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Allows selection of single dates or ranges
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={singleDateRange}
                                onChange={handleSingleDateRangeChange}
                                allowSingleDateSelection={true}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* US Format */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            US Format
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Shows dates in US format (MM/DD/YYYY)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={formatRange}
                                onChange={handleFormatRangeChange}
                                formatConfig={{
                                    preset: DateFormatPreset.US_RANGE,
                                    includeTime: false,
                                    includeYear: true,
                                }}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* With Time Format */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            With Time Display
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Shows dates with time included in the display
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                formatConfig={{
                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                    includeTime: true,
                                    timeFormat: '12h',
                                }}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Calendar Only Mode */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Calendar Only Mode
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Only calendar appears - no quick filter dropdown
                            (showPresets=false)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={basicRange}
                                onChange={handleBasicRangeChange}
                                showPresets={false}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Custom Trigger with Calendar Only */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Custom Trigger + Calendar Only
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Custom card trigger with calendar-only mode
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                showPresets={false}
                                showDateTimePicker={false}
                                triggerConfig={{
                                    renderTrigger: ({
                                        onClick,
                                        formattedValue,
                                        isOpen,
                                    }) => (
                                        <div
                                            onClick={onClick}
                                            style={{
                                                padding: '12px 16px',
                                                border: '2px solid #007bff',
                                                borderRadius: '8px',
                                                backgroundColor: isOpen
                                                    ? '#e3f2fd'
                                                    : 'white',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                minWidth: '200px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#007bff',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                📅 Date Range
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    color: '#333',
                                                }}
                                            >
                                                {formattedValue ||
                                                    'Click to select'}
                                            </div>
                                        </div>
                                    ),
                                }}
                            />
                        </div>
                    </div>

                    {/* Custom Date Disabling - Days 3-9 */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Disable Specific Days (3-9)
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Disables dates 3-9 in any month (analytics use case)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customDisableDates={(date) => {
                                    const day = date.getDate()
                                    return day >= 3 && day <= 9
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Custom Date Disabling - Specific Month/Year */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Disable January 2016
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Disables entire January 2016 month
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customDisableDates={(date) => {
                                    return (
                                        date.getFullYear() === 2016 &&
                                        date.getMonth() === 0
                                    ) // January is month 0
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Custom Date Disabling - Last 3 Months */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Disable Last 3 Months
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Disables the last 3 months from today
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customDisableDates={(date) => {
                                    const today = new Date()
                                    const threeMonthsAgo = new Date()
                                    threeMonthsAgo.setMonth(
                                        today.getMonth() - 3
                                    )
                                    return (
                                        date >= threeMonthsAgo && date <= today
                                    )
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Custom Date Disabling - Weekends */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Disable Weekends
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Disables all Saturdays and Sundays
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customDisableDates={(date) => {
                                    const dayOfWeek = date.getDay()
                                    return dayOfWeek === 0 || dayOfWeek === 6 // Sunday = 0, Saturday = 6
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Custom Date Disabling - Complex Logic */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Complex Disable Logic
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Disables: Jan 2016, weekends, and 15th of every
                            month
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customDisableDates={(date) => {
                                    // Disable January 2016
                                    if (
                                        date.getFullYear() === 2016 &&
                                        date.getMonth() === 0
                                    ) {
                                        return true
                                    }

                                    // Disable weekends
                                    const dayOfWeek = date.getDay()
                                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                                        return true
                                    }

                                    // Disable 15th of every month
                                    if (date.getDate() === 15) {
                                        return true
                                    }

                                    return false
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Custom Date Disabling - Date Range */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Disable Date Range
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Disables Dec 20, 2024 to Jan 5, 2025 (holiday
                            period)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customDisableDates={(date) => {
                                    const startDisable = new Date(2024, 11, 20) // Dec 20, 2024
                                    const endDisable = new Date(2025, 0, 5) // Jan 5, 2025
                                    return (
                                        date >= startDisable &&
                                        date <= endDisable
                                    )
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Preset-Only Mode Basic */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🆕 Preset-Only Mode
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Shows only the preset dropdown menu. Click any
                            preset to immediately apply the date range - no
                            calendar or apply button needed!
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                showPreset={true}
                                showPresets={true}
                            />
                        </div>
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-xs font-mono">
                            <div className="text-green-600 mb-1">
                                ✅ showPreset={'{true}'}
                            </div>
                            <div className="text-gray-600">
                                Renders only the preset selector, immediately
                                applies selection
                            </div>
                        </div>
                    </div>

                    {/* Preset-Only Mode with Custom Presets */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🆕 Preset-Only Mode + Custom Presets
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Preset-only mode with custom preset configuration.
                            Perfect for filtering analytics dashboards!
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                showPreset={true}
                                customPresets={[
                                    DateRangePreset.LAST_30_MINUTES,
                                    DateRangePreset.LAST_1_HOUR,
                                    DateRangePreset.LAST_6_HOURS,
                                    DateRangePreset.LAST_24_HOURS,
                                    DateRangePreset.TODAY,
                                    DateRangePreset.YESTERDAY,
                                ]}
                                showPresets={true}
                            />
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-xs font-mono">
                            <div className="text-blue-600 mb-1">
                                💡 Analytics Dashboard Perfect!
                            </div>
                            <div className="text-gray-600">
                                Time-based presets + instant selection = great
                                UX
                            </div>
                        </div>
                    </div>

                    {/* Preset-Only Mode with Size Variants */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🆕 Preset-Only Mode Sizes
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Different sizes available for preset-only mode:
                            Small, Medium, and Large
                        </p>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-gray-500 mb-2">
                                    Small Size
                                </div>
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    showPreset={true}
                                    size={DateRangePickerSize.SMALL}
                                    customPresets={[
                                        DateRangePreset.TODAY,
                                        DateRangePreset.LAST_7_DAYS,
                                        DateRangePreset.LAST_30_DAYS,
                                    ]}
                                />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-2">
                                    Medium Size (Default)
                                </div>
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    showPreset={true}
                                    size={DateRangePickerSize.MEDIUM}
                                    customPresets={[
                                        DateRangePreset.TODAY,
                                        DateRangePreset.LAST_7_DAYS,
                                        DateRangePreset.LAST_30_DAYS,
                                    ]}
                                />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-2">
                                    Large Size
                                </div>
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    showPreset={true}
                                    size={DateRangePickerSize.LARGE}
                                    customPresets={[
                                        DateRangePreset.TODAY,
                                        DateRangePreset.LAST_7_DAYS,
                                        DateRangePreset.LAST_30_DAYS,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preset-Only Mode for Reports */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🆕 Preset-Only for Reports
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Perfect for report dashboards where users need quick
                            access to common time periods without the complexity
                            of a full calendar
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={formatRange}
                                onChange={handleFormatRangeChange}
                                showPreset={true}
                                customPresets={[
                                    DateRangePreset.THIS_MONTH,
                                    DateRangePreset.LAST_MONTH,
                                    DateRangePreset.LAST_3_MONTHS,
                                    DateRangePreset.LAST_12_MONTHS,
                                ]}
                                formatConfig={{
                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                    includeTime: false,
                                    includeYear: true,
                                }}
                            />
                        </div>
                        <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded text-xs font-mono">
                            <div className="text-purple-600 mb-1">
                                📊 Perfect for Business Reports
                            </div>
                            <div className="text-gray-600">
                                Month-based presets + clean formatting
                            </div>
                        </div>
                    </div>

                    {/* Preset-Only Mode with Custom Definitions */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🆕 Preset-Only + Custom Definitions
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Preset-only mode with completely custom preset
                            definitions. Business hours, specific weeks,
                            quarters, etc.
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                showPreset={true}
                                customPresets={[
                                    // Business hours preset
                                    {
                                        id: 'businessHours',
                                        label: 'Business Hours Today',
                                        getDateRange: () => {
                                            const today = new Date()
                                            const start = new Date(
                                                today.getFullYear(),
                                                today.getMonth(),
                                                today.getDate(),
                                                9,
                                                0,
                                                0
                                            )
                                            const end = new Date(
                                                today.getFullYear(),
                                                today.getMonth(),
                                                today.getDate(),
                                                17,
                                                0,
                                                0
                                            )
                                            return {
                                                startDate: start,
                                                endDate: end,
                                            }
                                        },
                                    },
                                    // This week preset
                                    {
                                        id: 'thisWeek',
                                        label: 'This Week (Mon-Fri)',
                                        getDateRange: () => {
                                            const today = new Date()
                                            const dayOfWeek = today.getDay()
                                            const monday = new Date(today)
                                            monday.setDate(
                                                today.getDate() -
                                                    (dayOfWeek === 0
                                                        ? 6
                                                        : dayOfWeek - 1)
                                            )
                                            monday.setHours(0, 0, 0, 0)

                                            const friday = new Date(monday)
                                            friday.setDate(monday.getDate() + 4)
                                            friday.setHours(23, 59, 59, 999)

                                            return {
                                                startDate: monday,
                                                endDate: friday,
                                            }
                                        },
                                    },
                                    // Current quarter preset
                                    {
                                        id: 'currentQuarter',
                                        label: 'Current Quarter',
                                        getDateRange: () => {
                                            const today = new Date()
                                            const quarter = Math.floor(
                                                today.getMonth() / 3
                                            )
                                            const startMonth = quarter * 3

                                            const start = new Date(
                                                today.getFullYear(),
                                                startMonth,
                                                1,
                                                0,
                                                0,
                                                0,
                                                0
                                            )

                                            const end = new Date(
                                                today.getFullYear(),
                                                startMonth + 3,
                                                0,
                                                23,
                                                59,
                                                59,
                                                999
                                            )

                                            return {
                                                startDate: start,
                                                endDate: end,
                                            }
                                        },
                                    },
                                    // Last 2 weeks preset
                                    {
                                        id: 'last2Weeks',
                                        label: 'Last 2 Weeks',
                                        getDateRange: () => {
                                            const today = new Date()
                                            const start = new Date(today)
                                            start.setDate(today.getDate() - 14)
                                            start.setHours(0, 0, 0, 0)

                                            const end = new Date(today)
                                            end.setHours(23, 59, 59, 999)

                                            return {
                                                startDate: start,
                                                endDate: end,
                                            }
                                        },
                                    },
                                ]}
                            />
                        </div>
                        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded text-xs font-mono">
                            <div className="text-orange-600 mb-1">
                                🚀 Ultimate Flexibility
                            </div>
                            <div className="text-gray-600">
                                Define your own business logic for date ranges
                            </div>
                        </div>
                    </div>

                    {/* Preset Selection Callback */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🆕 Preset Selection Callback
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Get instant callbacks when predefined options are
                            selected! Perfect for analytics dashboards that need
                            to know what preset was chosen.
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                onPresetSelection={
                                    handlePlaygroundPresetSelection
                                }
                                showPresets={true}
                                showDateTimePicker={true}
                                formatConfig={{
                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                    includeTime: true,
                                    timeFormat: '12h',
                                }}
                            />
                        </div>
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-xs font-mono">
                            <div className="text-green-600 mb-1">
                                ✅ onPresetSelection callback enabled!
                            </div>
                            <div className="text-gray-600">
                                Check console logs when you select presets to
                                see the callback data
                            </div>
                        </div>
                    </div>

                    {/* formatConfig Bug Fix Demo */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            ✅ formatConfig Bug Fix Demo
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            This example shows that formatConfig now works
                            correctly. The includeTime: false setting is
                            properly respected and no longer overridden by the
                            component.
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                showPresets={true}
                                showDateTimePicker={true}
                                formatConfig={{
                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                    includeTime: false, // This now works correctly!
                                    includeYear: true,
                                }}
                            />
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-xs font-mono">
                            <div className="text-blue-600 mb-1">
                                🐛 Bug Fixed: includeTime: false now works!
                            </div>
                            <div className="text-gray-600">
                                Time is no longer shown in the trigger display
                            </div>
                        </div>
                    </div>

                    {/* Format Config Bug Demo */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🐛 Format Config Bug Demo
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            This demonstrates the formatConfig bug. Despite
                            passing LONG_RANGE preset with time, it shows
                            default format instead of "Oct 7, 2025, 12:00 AM -
                            Oct 7, 2025, 9:29 PM" format.
                            <br />
                            <strong>Expected:</strong> "Oct 7, 2025, 12:00 AM -
                            Oct 7, 2025, 9:29 PM"
                            <br />
                            <strong>Actual:</strong> Shows default format
                            (likely numeric)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={basicRange}
                                onChange={handleBasicRangeChange}
                                showPresets={true}
                                showDateTimePicker={true}
                                formatConfig={{
                                    preset: DateFormatPreset.LONG_RANGE,
                                    includeTime: true,
                                    includeYear: true,
                                    timeFormat: '12h',
                                    locale: 'en-US',
                                }}
                            />
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
                            <strong>Debug Info:</strong>
                            <br />
                            formatConfig being passed:{' '}
                            {JSON.stringify(
                                {
                                    preset: DateFormatPreset.LONG_RANGE,
                                    includeTime: true,
                                    includeYear: true,
                                    timeFormat: '12h',
                                    locale: 'en-US',
                                },
                                null,
                                2
                            )}
                        </div>
                    </div>

                    {/* Comparison Range Examples */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            📊 Range Comparison Examples
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Two DateRangePicker components working together for
                            analytics comparison cases. Test the scenarios:
                            "Last 7 Days" vs comparison period, "Today" vs
                            previous day, etc.
                        </p>

                        <div className="space-y-6">
                            {/* Main Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📈 Main Period
                                </label>
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    showPresets={true}
                                    showDateTimePicker={true}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                    customPresets={[
                                        DateRangePreset.LAST_30_MINUTES,
                                        DateRangePreset.LAST_1_HOUR,
                                        DateRangePreset.TODAY,
                                        DateRangePreset.YESTERDAY,
                                        DateRangePreset.LAST_7_DAYS,
                                        DateRangePreset.LAST_30_DAYS,
                                    ]}
                                />
                            </div>

                            {/* Comparison Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🔄 Compare With Period
                                </label>
                                <DateRangePicker
                                    value={formatRange}
                                    onChange={handleFormatRangeChange}
                                    showPresets={true}
                                    showDateTimePicker={true}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                    customPresets={[
                                        DateRangePreset.LAST_30_MINUTES,
                                        DateRangePreset.LAST_1_HOUR,
                                        DateRangePreset.TODAY,
                                        DateRangePreset.YESTERDAY,
                                        DateRangePreset.LAST_7_DAYS,
                                        DateRangePreset.LAST_30_DAYS,
                                    ]}
                                />
                            </div>

                            {/* Comparison Info */}
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                                <h4 className="font-medium text-blue-700 mb-2">
                                    Range Comparison Analysis
                                </h4>
                                <div className="text-sm text-blue-600 space-y-1">
                                    {customRange.endDate && (
                                        <div>
                                            <strong>
                                                Main Period Duration:
                                            </strong>{' '}
                                            {Math.ceil(
                                                (customRange.endDate.getTime() -
                                                    customRange.startDate.getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            )}{' '}
                                            days
                                        </div>
                                    )}
                                    {formatRange.endDate && (
                                        <div>
                                            <strong>
                                                Compare Period Duration:
                                            </strong>{' '}
                                            {Math.ceil(
                                                (formatRange.endDate.getTime() -
                                                    formatRange.startDate.getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            )}{' '}
                                            days
                                        </div>
                                    )}
                                    {customRange.endDate && (
                                        <div>
                                            <strong>
                                                Same Day Range (Main):
                                            </strong>{' '}
                                            {customRange.startDate.toDateString() ===
                                            customRange.endDate.toDateString()
                                                ? 'Yes'
                                                : 'No'}
                                        </div>
                                    )}
                                    {formatRange.endDate && (
                                        <div>
                                            <strong>
                                                Same Day Range (Compare):
                                            </strong>{' '}
                                            {formatRange.startDate.toDateString() ===
                                            formatRange.endDate.toDateString()
                                                ? 'Yes'
                                                : 'No'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Case: Last 7 Days Comparison */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🧪 Test Case: "Last 7 Days" → Compare With Previous
                            7 Days
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            When main period is "Last 7 Days", the comparison
                            should automatically be the 7 days before that
                            period. The component correctly handles same-day
                            ranges with different times.
                        </p>

                        <div className="space-y-4">
                            {/* Last 7 Days (Main) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📊 Last 7 Days (Main Period)
                                </label>
                                <DateRangePicker
                                    value={(() => {
                                        const now = new Date()
                                        const sevenDaysAgo = new Date(now)
                                        sevenDaysAgo.setDate(now.getDate() - 6)
                                        sevenDaysAgo.setHours(0, 0, 0, 0)
                                        return {
                                            startDate: sevenDaysAgo,
                                            endDate: now,
                                        }
                                    })()}
                                    onChange={handleCustomRangeChange}
                                    showPresets={true}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                    customPresets={[
                                        DateRangePreset.LAST_7_DAYS,
                                    ]}
                                />
                            </div>

                            {/* Previous 7 Days (Comparison) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🔄 Previous 7 Days (Compare Period)
                                </label>
                                <DateRangePicker
                                    value={(() => {
                                        const now = new Date()
                                        const fourteenDaysAgo = new Date(now)
                                        fourteenDaysAgo.setDate(
                                            now.getDate() - 13
                                        )
                                        fourteenDaysAgo.setHours(0, 0, 0, 0)

                                        const sevenDaysAgo = new Date(now)
                                        sevenDaysAgo.setDate(now.getDate() - 7)
                                        sevenDaysAgo.setHours(23, 59, 59, 999)

                                        return {
                                            startDate: fourteenDaysAgo,
                                            endDate: sevenDaysAgo,
                                        }
                                    })()}
                                    onChange={handleFormatRangeChange}
                                    showPresets={false}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                />
                            </div>

                            <div className="p-3 bg-green-50 border border-green-200 rounded text-xs font-mono">
                                <div className="text-green-600 mb-1">
                                    ✅ Test Case: Last 7 Days Comparison
                                </div>
                                <div className="text-gray-600">
                                    Both periods show exactly 7 days. The
                                    component properly handles same-day ranges
                                    vs multi-day ranges with different time
                                    formatting.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Case: Today vs Yesterday */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🧪 Test Case: "Today" → Compare With Yesterday
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            When main period is "Today" (12:00 AM to current
                            time), comparison should be yesterday (full day).
                            Notice how same-day ranges show time ranges when
                            includeTime is true.
                        </p>

                        <div className="space-y-4">
                            {/* Today (Main) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📊 Today (Main Period)
                                </label>
                                <DateRangePicker
                                    value={(() => {
                                        const now = new Date()
                                        const startOfToday = new Date(
                                            now.getFullYear(),
                                            now.getMonth(),
                                            now.getDate(),
                                            0,
                                            0,
                                            0,
                                            0
                                        )
                                        return {
                                            startDate: startOfToday,
                                            endDate: now,
                                        }
                                    })()}
                                    onChange={handleCustomRangeChange}
                                    showPresets={true}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                    customPresets={[DateRangePreset.TODAY]}
                                />
                            </div>

                            {/* Yesterday (Comparison) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🔄 Yesterday (Compare Period)
                                </label>
                                <DateRangePicker
                                    value={(() => {
                                        const yesterday = new Date()
                                        yesterday.setDate(
                                            yesterday.getDate() - 1
                                        )
                                        const startOfYesterday = new Date(
                                            yesterday.getFullYear(),
                                            yesterday.getMonth(),
                                            yesterday.getDate(),
                                            0,
                                            0,
                                            0,
                                            0
                                        )
                                        const endOfYesterday = new Date(
                                            yesterday.getFullYear(),
                                            yesterday.getMonth(),
                                            yesterday.getDate(),
                                            23,
                                            59,
                                            59,
                                            999
                                        )
                                        return {
                                            startDate: startOfYesterday,
                                            endDate: endOfYesterday,
                                        }
                                    })()}
                                    onChange={handleFormatRangeChange}
                                    showPresets={true}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                    customPresets={[DateRangePreset.YESTERDAY]}
                                />
                            </div>

                            <div className="p-3 bg-orange-50 border border-orange-200 rounded text-xs font-mono">
                                <div className="text-orange-600 mb-1">
                                    ⚡ Test Case: Today vs Yesterday
                                </div>
                                <div className="text-gray-600">
                                    Today shows time range (12:00 AM - current
                                    time), Yesterday shows same-day full day.
                                    Format handles both cases correctly.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Case: Last 30 Minutes */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🧪 Test Case: "Last 30 Minutes" → Compare With
                            Previous 30 Minutes
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            When main period is "Last 30 Minutes", comparison
                            should be the 30 minutes before that. Both periods
                            are same-day ranges with different times - perfect
                            for testing the time formatting fix.
                        </p>

                        <div className="space-y-4">
                            {/* Last 30 Minutes (Main) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📊 Last 30 Minutes (Main Period)
                                </label>
                                <DateRangePicker
                                    value={(() => {
                                        const now = new Date()
                                        const thirtyMinutesAgo = new Date(
                                            now.getTime() - 30 * 60 * 1000
                                        )
                                        return {
                                            startDate: thirtyMinutesAgo,
                                            endDate: now,
                                        }
                                    })()}
                                    onChange={handleCustomRangeChange}
                                    showPresets={true}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                    customPresets={[
                                        DateRangePreset.LAST_30_MINUTES,
                                    ]}
                                />
                            </div>

                            {/* Previous 30 Minutes (Comparison) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🔄 Previous 30 Minutes (Compare Period)
                                </label>
                                <DateRangePicker
                                    value={(() => {
                                        const now = new Date()
                                        const thirtyMinutesAgo = new Date(
                                            now.getTime() - 30 * 60 * 1000
                                        )
                                        const sixtyMinutesAgo = new Date(
                                            now.getTime() - 60 * 60 * 1000
                                        )
                                        return {
                                            startDate: sixtyMinutesAgo,
                                            endDate: thirtyMinutesAgo,
                                        }
                                    })()}
                                    onChange={handleFormatRangeChange}
                                    showPresets={false}
                                    formatConfig={{
                                        preset: DateFormatPreset.MEDIUM_RANGE,
                                        includeTime: true,
                                        timeFormat: '12h',
                                    }}
                                />
                            </div>

                            <div className="p-3 bg-purple-50 border border-purple-200 rounded text-xs font-mono">
                                <div className="text-purple-600 mb-1">
                                    🎯 Test Case: 30-Minute Time Ranges
                                </div>
                                <div className="text-gray-600">
                                    Both show same-day time ranges with
                                    different start/end times. The formatting
                                    fix ensures proper "start time - end time"
                                    display.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* New Time Presets */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            New Time Presets
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Includes Last 30 Mins and Last 24 Hours presets
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                showPresets={true}
                                showDateTimePicker={true}
                                formatConfig={{
                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                    includeTime: true,
                                    timeFormat: '12h',
                                }}
                            />
                        </div>
                    </div>

                    {/* Disabled State */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Disabled State
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Shows how the component looks when disabled
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={basicRange}
                                onChange={handleBasicRangeChange}
                                isDisabled={true}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Fixed 5-Day Range */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Fixed 5-Day Range
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            When you select a start date, end date is
                            automatically set to 5 days later
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        const endDate = new Date(startDate)
                                        endDate.setDate(startDate.getDate() + 5)
                                        return endDate
                                    },
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Fixed Week Range */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Fixed Week Range
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Automatically creates a 7-day range from selected
                            start date
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        const endDate = new Date(startDate)
                                        endDate.setDate(startDate.getDate() + 7)
                                        return endDate
                                    },
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Business Week Range */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Business Week (5 Days)
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Selects 5 business days (excluding weekends) from
                            start date
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        let endDate = new Date(startDate)
                                        let daysAdded = 0
                                        while (daysAdded < 5) {
                                            endDate.setDate(
                                                endDate.getDate() + 1
                                            )
                                            const dayOfWeek = endDate.getDay()
                                            if (
                                                dayOfWeek !== 0 &&
                                                dayOfWeek !== 6
                                            ) {
                                                // Not weekend
                                                daysAdded++
                                            }
                                        }
                                        return endDate
                                    },
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Month Range */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Month Range
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            From selected start date to end of that month
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        const endDate = new Date(
                                            startDate.getFullYear(),
                                            startDate.getMonth() + 1,
                                            0
                                        )
                                        return endDate
                                    },
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Quarter Range */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Quarter Range
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            From selected start date to end of that quarter
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        const quarter = Math.floor(
                                            startDate.getMonth() / 3
                                        )
                                        const endMonth = (quarter + 1) * 3 - 1
                                        const endDate = new Date(
                                            startDate.getFullYear(),
                                            endMonth + 1,
                                            0
                                        )
                                        return endDate
                                    },
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Flexible Range with Manual Override */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Flexible 10-Day Range
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Default 10-day range, but allows manual end date
                            selection
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        const endDate = new Date(startDate)
                                        endDate.setDate(
                                            startDate.getDate() + 10
                                        )
                                        return endDate
                                    },
                                    allowManualEndDateSelection: true,
                                }}
                                customDisableDates={(date) => {
                                    const today = new Date()
                                    const threeMonthsAgo = new Date()
                                    threeMonthsAgo.setMonth(
                                        today.getMonth() - 3
                                    )
                                    return (
                                        date >= threeMonthsAgo && date <= today
                                    )
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Last 5 Days Range (Backward) */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Last 5 Days Range (Backward)
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            When you select a date, it creates a range from 5
                            days before to that selected date
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        // Return the same date to trigger backward range logic
                                        return new Date(startDate)
                                    },
                                    backwardDays: 4, // 4 days before + selected day = 5 days total
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Last Week Range (Backward) */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Last Week Range (Backward)
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            When you select a date, it creates a range from 7
                            days before to that selected date
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        // Return the same date to trigger backward range logic
                                        return new Date(startDate)
                                    },
                                    backwardDays: 6, // 6 days before + selected day = 7 days total
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Compare Range with Reference */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Compare Range (Clean API)
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Uses referenceRange prop to create ranges with same
                            duration as a reference period
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    referenceRange: {
                                        startDate: new Date(2024, 0, 1, 9, 0), // Jan 1, 2024 9:00 AM
                                        endDate: new Date(2024, 0, 8, 17, 30), // Jan 8, 2024 5:30 PM
                                    },
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>

                    {/* Custom Calculator - End of Week */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            End of Week Calculator
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            From selected start date to end of that week
                            (Sunday)
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={handleCustomRangeChange}
                                customRangeConfig={{
                                    calculateEndDate: (startDate) => {
                                        const endDate = new Date(startDate)
                                        const daysUntilSunday =
                                            7 - startDate.getDay()
                                        endDate.setDate(
                                            startDate.getDate() +
                                                daysUntilSunday
                                        )
                                        return endDate
                                    },
                                    allowManualEndDateSelection: false,
                                }}
                                showPresets={true}
                                showDateTimePicker={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Custom Presets Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Custom Presets Configuration
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                        Configure which presets to show using the customPresets
                        prop. Pass an array of DateRangePreset enums.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Time-based Presets */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[250px] flex flex-col">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                Time-based Presets Only
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">
                                Show only time-based presets for analytics
                                dashboards
                            </p>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    customPresets={[
                                        DateRangePreset.LAST_30_MINUTES,
                                        DateRangePreset.LAST_1_HOUR,
                                        DateRangePreset.LAST_6_HOURS,
                                        DateRangePreset.LAST_24_HOURS,
                                    ]}
                                    showPresets={true}
                                />
                            </div>
                            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono">
                                <div className="text-gray-600 mb-1">
                                    customPresets={'['}
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_30_MINUTES,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_1_HOUR,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_6_HOURS,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_24_HOURS,
                                </div>
                                <div className="text-gray-600">{']}'}</div>
                            </div>
                        </div>

                        {/* Day-based Presets */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[250px] flex flex-col">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                Day-based Presets Only
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">
                                Show only day-based presets for reports and date
                                selection
                            </p>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={basicRange}
                                    onChange={handleBasicRangeChange}
                                    customPresets={[
                                        DateRangePreset.TODAY,
                                        DateRangePreset.YESTERDAY,
                                        DateRangePreset.LAST_7_DAYS,
                                        DateRangePreset.LAST_30_DAYS,
                                    ]}
                                    showPresets={true}
                                />
                            </div>
                            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono">
                                <div className="text-gray-600 mb-1">
                                    customPresets={'['}
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.TODAY,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.YESTERDAY,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_7_DAYS,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_30_DAYS,
                                </div>
                                <div className="text-gray-600">{']}'}</div>
                            </div>
                        </div>

                        {/* Month-based Presets */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[250px] flex flex-col">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                Month-based Presets Only
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">
                                Show only month-based presets for longer period
                                reports
                            </p>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={formatRange}
                                    onChange={handleFormatRangeChange}
                                    customPresets={[
                                        DateRangePreset.THIS_MONTH,
                                        DateRangePreset.LAST_MONTH,
                                        DateRangePreset.LAST_3_MONTHS,
                                        DateRangePreset.LAST_12_MONTHS,
                                    ]}
                                    showPresets={true}
                                />
                            </div>
                            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono">
                                <div className="text-gray-600 mb-1">
                                    customPresets={'['}
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.THIS_MONTH,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_MONTH,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_3_MONTHS,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_12_MONTHS,
                                </div>
                                <div className="text-gray-600">{']}'}</div>
                            </div>
                        </div>

                        {/* Minimal Presets */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[250px] flex flex-col">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                Minimal Presets
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">
                                Show only essential presets for simple date
                                selection
                            </p>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    customPresets={[
                                        DateRangePreset.TODAY,
                                        DateRangePreset.LAST_7_DAYS,
                                        DateRangePreset.LAST_30_DAYS,
                                    ]}
                                    showPresets={true}
                                />
                            </div>
                            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono">
                                <div className="text-gray-600 mb-1">
                                    customPresets={`[`}
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.TODAY,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_7_DAYS,
                                </div>
                                <div className="text-gray-600 ml-2">
                                    DateRangePreset.LAST_30_DAYS,
                                </div>
                                <div className="text-gray-600">{`]}`}</div>
                            </div>
                        </div>

                        {/* Truly Custom Presets */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[250px] flex flex-col">
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                🚀 Truly Custom Presets
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">
                                Define your own custom presets with custom logic
                                (e.g., "Last 45 minutes", "Next 1.5 hours")
                            </p>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    customPresets={[
                                        // Custom preset: Last 45 minutes
                                        {
                                            id: 'last45min',
                                            label: 'Last 45 minutes',
                                            getDateRange: () => {
                                                const now = new Date()
                                                const start = new Date(
                                                    now.getTime() -
                                                        45 * 60 * 1000
                                                )
                                                return {
                                                    startDate: start,
                                                    endDate: now,
                                                }
                                            },
                                        },
                                        // Custom preset: Next 1.5 hours
                                        {
                                            id: 'next90min',
                                            label: 'Next 1.5 hours',
                                            getDateRange: () => {
                                                const now = new Date()
                                                const end = new Date(
                                                    now.getTime() +
                                                        90 * 60 * 1000
                                                )
                                                return {
                                                    startDate: now,
                                                    endDate: end,
                                                }
                                            },
                                        },
                                        // Custom preset: Business hours today
                                        {
                                            id: 'businessToday',
                                            label: 'Business hours today',
                                            getDateRange: () => {
                                                const today = new Date()
                                                const start = new Date(
                                                    today.getFullYear(),
                                                    today.getMonth(),
                                                    today.getDate(),
                                                    9,
                                                    0,
                                                    0
                                                )
                                                const end = new Date(
                                                    today.getFullYear(),
                                                    today.getMonth(),
                                                    today.getDate(),
                                                    17,
                                                    0,
                                                    0
                                                )
                                                return {
                                                    startDate: start,
                                                    endDate: end,
                                                }
                                            },
                                        },
                                        // Custom preset: This week (Monday to Sunday)
                                        {
                                            id: 'thisWeek',
                                            label: 'This week (Mon-Sun)',
                                            getDateRange: () => {
                                                const today = new Date()
                                                const dayOfWeek = today.getDay()
                                                const monday = new Date(today)
                                                monday.setDate(
                                                    today.getDate() -
                                                        (dayOfWeek === 0
                                                            ? 6
                                                            : dayOfWeek - 1)
                                                )
                                                monday.setHours(0, 0, 0, 0)

                                                const sunday = new Date(monday)
                                                sunday.setDate(
                                                    monday.getDate() + 6
                                                )
                                                sunday.setHours(23, 59, 59, 999)

                                                return {
                                                    startDate: monday,
                                                    endDate: sunday,
                                                }
                                            },
                                        },
                                    ]}
                                    showPresets={true}
                                />
                            </div>
                            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs font-mono">
                                <div className="text-green-600 mb-1">
                                    ✅ User-defined custom presets with your own
                                    logic!
                                </div>
                                <div className="text-gray-600 mb-1">
                                    customPresets={`[`}
                                </div>
                                <div className="text-blue-600 ml-2">{`{ id: 'last45min', label: 'Last 45 minutes', getDateRange: () => ... },`}</div>
                                <div className="text-blue-600 ml-2">{`{ id: 'next90min', label: 'Next 1.5 hours', getDateRange: () => ... },`}</div>
                                <div className="text-blue-600 ml-2">{`{ id: 'businessToday', label: 'Business hours', getDateRange: () => ... },`}</div>
                                <div className="text-gray-600">{`]}`}</div>
                            </div>
                        </div>
                    </div>

                    {/* Code Examples */}
                    <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">
                            📝 Custom Presets Code Examples
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-medium text-gray-700 mb-2">
                                    Simple Preset Array
                                </h5>
                                <div className="bg-white p-4 rounded border text-sm font-mono">
                                    <div className="text-gray-600 mb-2">
                                        // Show only specific presets
                                    </div>
                                    <div>{`const customPresets = [`}</div>
                                    <div className="ml-2 text-blue-600">
                                        DateRangePreset.LAST_30_MINUTES,
                                    </div>
                                    <div className="ml-2 text-blue-600">
                                        DateRangePreset.LAST_1_HOUR,
                                    </div>
                                    <div className="ml-2 text-blue-600">
                                        DateRangePreset.TODAY,
                                    </div>
                                    <div className="ml-2 text-blue-600">
                                        DateRangePreset.LAST_7_DAYS,
                                    </div>
                                    <div>{`]`}</div>
                                    <div className="mt-2">{`<DateRangePicker customPresets={customPresets} />`}</div>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-medium text-gray-700 mb-2">
                                    Available Presets
                                </h5>
                                <div className="bg-white p-4 rounded border text-sm">
                                    <div className="space-y-1">
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                LAST_30_MINUTES
                                            </span>{' '}
                                            - Last 30 minutes
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                LAST_1_HOUR
                                            </span>{' '}
                                            - Last 1 hour
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                LAST_6_HOURS
                                            </span>{' '}
                                            - Last 6 hours
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                LAST_24_HOURS
                                            </span>{' '}
                                            - Last 24 hours
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                TODAY
                                            </span>{' '}
                                            - Today
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                YESTERDAY
                                            </span>{' '}
                                            - Yesterday
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                LAST_7_DAYS
                                            </span>{' '}
                                            - Last 7 days
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                LAST_30_DAYS
                                            </span>{' '}
                                            - Last 30 days
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                THIS_MONTH
                                            </span>{' '}
                                            - This month
                                        </div>
                                        <div>
                                            <span className="font-medium text-blue-600">
                                                LAST_MONTH
                                            </span>{' '}
                                            - Last month
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison Ranges Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        🔍 Comparison Range Examples
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                        These examples demonstrate using two DateRangePickers
                        for main range vs comparison range scenarios. Perfect
                        for analytics dashboards where you need to compare
                        current period vs previous period.
                    </p>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Test Case 1: Last 7 Days Comparison */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                📊 Test Case: "Last 7 Days" → Compare With
                                "Previous 7 Days"
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                When the main range is "Last 7 Days", the
                                comparison automatically shows the previous 7
                                days period. Both ranges dynamically adjust
                                based on current time.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Main Period: Last 7 Days
                                    </label>
                                    <DateRangePicker
                                        value={(() => {
                                            const now = new Date()
                                            const sevenDaysAgo = new Date(now)
                                            sevenDaysAgo.setDate(
                                                now.getDate() - 6
                                            )
                                            sevenDaysAgo.setHours(0, 0, 0, 0)
                                            return {
                                                startDate: sevenDaysAgo,
                                                endDate: now,
                                            }
                                        })()}
                                        onChange={() => {}} // Read-only for demo
                                        showPresets={false}
                                        formatConfig={{
                                            preset: DateFormatPreset.MEDIUM_RANGE,
                                            includeTime: true,
                                            timeFormat: '12h',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Compare With: Previous 7 Days
                                    </label>
                                    <DateRangePicker
                                        value={(() => {
                                            const now = new Date()
                                            const fourteenDaysAgo = new Date(
                                                now
                                            )
                                            fourteenDaysAgo.setDate(
                                                now.getDate() - 13
                                            )
                                            fourteenDaysAgo.setHours(0, 0, 0, 0)
                                            const sevenDaysAgo = new Date(now)
                                            sevenDaysAgo.setDate(
                                                now.getDate() - 7
                                            )
                                            sevenDaysAgo.setHours(
                                                23,
                                                59,
                                                59,
                                                999
                                            )
                                            return {
                                                startDate: fourteenDaysAgo,
                                                endDate: sevenDaysAgo,
                                            }
                                        })()}
                                        onChange={() => {}} // Read-only for demo
                                        showPresets={false}
                                        formatConfig={{
                                            preset: DateFormatPreset.MEDIUM_RANGE,
                                            includeTime: true,
                                            timeFormat: '12h',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
                                <strong className="text-green-700">
                                    ✅ Perfect for analytics:
                                </strong>
                                <span className="text-green-600">
                                    {' '}
                                    Compare this week's performance vs last week
                                </span>
                            </div>
                        </div>

                        {/* Test Case 2: Today Comparison */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                📈 Test Case: "Today" → Compare With "Yesterday"
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                When the main range is "Today", the comparison
                                shows yesterday's full day data. Great for
                                day-over-day performance tracking.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Main Period: Today
                                    </label>
                                    <DateRangePicker
                                        value={(() => {
                                            const now = new Date()
                                            const today = new Date(
                                                now.getFullYear(),
                                                now.getMonth(),
                                                now.getDate(),
                                                0,
                                                0,
                                                0,
                                                0
                                            )
                                            return {
                                                startDate: today,
                                                endDate: now,
                                            }
                                        })()}
                                        onChange={() => {}} // Read-only for demo
                                        showPresets={false}
                                        formatConfig={{
                                            preset: DateFormatPreset.LONG_RANGE,
                                            includeTime: true,
                                            timeFormat: '12h',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Compare With: Yesterday (Full Day)
                                    </label>
                                    <DateRangePicker
                                        value={(() => {
                                            const now = new Date()
                                            const yesterday = new Date(
                                                now.getFullYear(),
                                                now.getMonth(),
                                                now.getDate() - 1,
                                                0,
                                                0,
                                                0,
                                                0
                                            )
                                            const yesterdayEnd = new Date(
                                                now.getFullYear(),
                                                now.getMonth(),
                                                now.getDate() - 1,
                                                23,
                                                59,
                                                59,
                                                999
                                            )
                                            return {
                                                startDate: yesterday,
                                                endDate: yesterdayEnd,
                                            }
                                        })()}
                                        onChange={() => {}} // Read-only for demo
                                        showPresets={false}
                                        formatConfig={{
                                            preset: DateFormatPreset.LONG_RANGE,
                                            includeTime: true,
                                            timeFormat: '12h',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                                <strong className="text-blue-700">
                                    💡 Notice the LONG_RANGE format:
                                </strong>
                                <span className="text-blue-600">
                                    {' '}
                                    Shows full dates for same-day ranges with
                                    different times
                                </span>
                            </div>
                        </div>

                        {/* Test Case 3: Last 30 Minutes Comparison */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                ⏱️ Test Case: "Last 30 Minutes" → Compare With
                                "Previous 30 Minutes"
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                When the main range is "Last 30 minutes", the
                                comparison shows the previous 30-minute window.
                                Perfect for real-time monitoring.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Main Period: Last 30 Minutes
                                    </label>
                                    <DateRangePicker
                                        value={(() => {
                                            const now = new Date()
                                            const thirtyMinsAgo = new Date(
                                                now.getTime() - 30 * 60 * 1000
                                            )
                                            return {
                                                startDate: thirtyMinsAgo,
                                                endDate: now,
                                            }
                                        })()}
                                        onChange={() => {}} // Read-only for demo
                                        showPresets={false}
                                        formatConfig={{
                                            preset: DateFormatPreset.LONG_RANGE,
                                            includeTime: true,
                                            timeFormat: '12h',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Compare With: Previous 30 Minutes
                                    </label>
                                    <DateRangePicker
                                        value={(() => {
                                            const now = new Date()
                                            const sixtyMinsAgo = new Date(
                                                now.getTime() - 60 * 60 * 1000
                                            )
                                            const thirtyMinsAgo = new Date(
                                                now.getTime() - 30 * 60 * 1000
                                            )
                                            return {
                                                startDate: sixtyMinsAgo,
                                                endDate: thirtyMinsAgo,
                                            }
                                        })()}
                                        onChange={() => {}} // Read-only for demo
                                        showPresets={false}
                                        formatConfig={{
                                            preset: DateFormatPreset.LONG_RANGE,
                                            includeTime: true,
                                            timeFormat: '12h',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded text-sm">
                                <strong className="text-purple-700">
                                    🚀 Real-time comparison:
                                </strong>
                                <span className="text-purple-600">
                                    {' '}
                                    Perfect for monitoring dashboards and live
                                    metrics
                                </span>
                            </div>
                        </div>

                        {/* Implementation Example */}
                        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                💻 Implementation Pattern
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Here's how to implement comparison ranges in
                                your application:
                            </p>

                            <div className="bg-white p-4 rounded border text-sm font-mono overflow-x-auto">
                                <div className="text-gray-600 mb-2">
                                    // 1. Calculate main range (e.g., Last 7
                                    Days)
                                </div>
                                <div className="text-blue-600">
                                    const getMainRange = () = {`{`}
                                </div>
                                <div className="text-blue-600 ml-4">
                                    const now = new Date()
                                </div>
                                <div className="text-blue-600 ml-4">
                                    const sevenDaysAgo = new Date(now)
                                </div>
                                <div className="text-blue-600 ml-4">
                                    sevenDaysAgo.setDate(now.getDate() - 6)
                                </div>
                                <div className="text-blue-600 ml-4">
                                    sevenDaysAgo.setHours(0, 0, 0, 0)
                                </div>
                                <div className="text-blue-600 ml-4">
                                    return{' '}
                                    {`{ startDate: sevenDaysAgo, endDate: now }`}
                                </div>
                                <div className="text-blue-600">{`}`}</div>

                                <div className="text-gray-600 mb-2 mt-4">
                                    // 2. Calculate comparison range (Previous 7
                                    Days)
                                </div>
                                <div className="text-green-600">
                                    const getComparisonRange = (mainRange) ={' '}
                                    {`{`}
                                </div>
                                <div className="text-green-600 ml-4">
                                    const duration = mainRange.endDate -
                                    mainRange.startDate
                                </div>
                                <div className="text-green-600 ml-4">
                                    const comparisonEnd = new
                                    Date(mainRange.startDate)
                                </div>
                                <div className="text-green-600 ml-4">
                                    const comparisonStart = new
                                    Date(comparisonEnd - duration)
                                </div>
                                <div className="text-green-600 ml-4">
                                    return{' '}
                                    {`{ startDate: comparisonStart, endDate: comparisonEnd }`}
                                </div>
                                <div className="text-green-600">{`}`}</div>

                                <div className="text-gray-600 mb-2 mt-4">
                                    // 3. Use two DateRangePickers
                                </div>
                                <div>{`<DateRangePicker value={mainRange} onChange={setMainRange} />`}</div>
                                <div>{`<DateRangePicker value={comparisonRange} onChange={setComparisonRange} />`}</div>
                            </div>

                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                                <strong className="text-yellow-700">
                                    💡 Pro tip:
                                </strong>
                                <span className="text-yellow-600">
                                    {' '}
                                    The DateRangePicker handles all timezone
                                    logic internally, so you just work with
                                    standard JavaScript Date objects
                                </span>
                            </div>
                        </div>

                        {/* Advanced Comparison Scenarios */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">
                                🎯 Advanced Comparison Scenarios
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                More complex comparison patterns for advanced
                                analytics:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                                    <h5 className="font-medium text-blue-700 mb-2">
                                        Month-over-Month
                                    </h5>
                                    <p className="text-xs text-blue-600">
                                        Compare this month vs last month
                                        performance
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 border border-green-200 rounded">
                                    <h5 className="font-medium text-green-700 mb-2">
                                        Year-over-Year
                                    </h5>
                                    <p className="text-xs text-green-600">
                                        Compare same period last year
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                                    <h5 className="font-medium text-purple-700 mb-2">
                                        Quarter-over-Quarter
                                    </h5>
                                    <p className="text-xs text-purple-600">
                                        Compare quarterly business metrics
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded text-sm">
                                <strong className="text-indigo-700">
                                    📊 All supported by the DateRangePicker:
                                </strong>
                                <span className="text-indigo-600">
                                    {' '}
                                    Just calculate the ranges and let the
                                    component handle formatting and display
                                </span>
                            </div>
                        </div>

                        {/* Specific Analytics Test Cases */}
                        <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg">
                            <h4 className="text-lg font-semibold text-indigo-800 mb-4">
                                🧪 Required Analytics Test Cases
                            </h4>
                            <p className="text-sm text-indigo-600 mb-6">
                                These are the specific test cases that
                                demonstrate automatic comparison range
                                calculation based on the main period selection.
                                Perfect for analytics dashboards.
                            </p>

                            <div className="space-y-8">
                                {/* Test Case 1: Last 7 Days */}
                                <div className="bg-white p-6 rounded-lg border border-indigo-200">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                                        📊 Test Case 1: "Last 7 Days" → Compare
                                        With "Today - 7 Days"
                                    </h5>
                                    <p className="text-sm text-gray-600 mb-4">
                                        When user selects "Last 7 Days", the
                                        comparison period automatically starts 7
                                        days prior to today's date. The
                                        comparison range correctly calculates
                                        today - 7 days, ensuring rolling 7-day
                                        logic.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                📈 Main Range: Last 7 Days
                                            </label>
                                            <DateRangePicker
                                                value={(() => {
                                                    const now = new Date()
                                                    const sevenDaysAgo =
                                                        new Date(now)
                                                    sevenDaysAgo.setDate(
                                                        now.getDate() - 6
                                                    ) // 6 days ago + today = 7 days
                                                    sevenDaysAgo.setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    )
                                                    return {
                                                        startDate: sevenDaysAgo,
                                                        endDate: now,
                                                    }
                                                })()}
                                                onChange={() => {}} // Read-only demo
                                                showPresets={true}
                                                customPresets={[
                                                    DateRangePreset.LAST_7_DAYS,
                                                ]}
                                                formatConfig={{
                                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                                    includeTime: true,
                                                    timeFormat: '12h',
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                🔄 Comparison: Previous 7 Days
                                                (Auto-calculated)
                                            </label>
                                            <DateRangePicker
                                                value={(() => {
                                                    const now = new Date()
                                                    // Comparison period: 14 days ago to 7 days ago
                                                    const fourteenDaysAgo =
                                                        new Date(now)
                                                    fourteenDaysAgo.setDate(
                                                        now.getDate() - 13
                                                    ) // Start 13 days ago
                                                    fourteenDaysAgo.setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    )

                                                    const sevenDaysAgo =
                                                        new Date(now)
                                                    sevenDaysAgo.setDate(
                                                        now.getDate() - 7
                                                    ) // End 7 days ago
                                                    sevenDaysAgo.setHours(
                                                        23,
                                                        59,
                                                        59,
                                                        999
                                                    )

                                                    return {
                                                        startDate:
                                                            fourteenDaysAgo,
                                                        endDate: sevenDaysAgo,
                                                    }
                                                })()}
                                                onChange={() => {}} // Read-only demo
                                                showPresets={false}
                                                formatConfig={{
                                                    preset: DateFormatPreset.MEDIUM_RANGE,
                                                    includeTime: true,
                                                    timeFormat: '12h',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <h6 className="font-medium text-green-800 mb-2">
                                            ✅ Expected Behavior:
                                        </h6>
                                        <ul className="text-sm text-green-700 space-y-1">
                                            <li>
                                                • Main range shows exactly 7
                                                days ending today
                                            </li>
                                            <li>
                                                • Comparison range shows the 7
                                                days immediately before the main
                                                range
                                            </li>
                                            <li>
                                                • Both ranges dynamically adjust
                                                based on current date
                                            </li>
                                            <li>
                                                • Perfect for week-over-week
                                                analytics comparison
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Test Case 2: Today */}
                                <div className="bg-white p-6 rounded-lg border border-indigo-200">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                                        📊 Test Case 2: "Today" → Compare With
                                        "Today - 1 Day"
                                    </h5>
                                    <p className="text-sm text-gray-600 mb-4">
                                        When user selects "Today", the
                                        comparison period automatically starts 1
                                        day prior. System dynamically adjusts
                                        based on current date for accurate
                                        day-to-day comparison.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                📈 Main Range: Today
                                            </label>
                                            <DateRangePicker
                                                value={(() => {
                                                    const now = new Date()
                                                    const todayStart = new Date(
                                                        now.getFullYear(),
                                                        now.getMonth(),
                                                        now.getDate(),
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    )
                                                    return {
                                                        startDate: todayStart,
                                                        endDate: now,
                                                    }
                                                })()}
                                                onChange={() => {}} // Read-only demo
                                                showPresets={true}
                                                customPresets={[
                                                    DateRangePreset.TODAY,
                                                ]}
                                                formatConfig={{
                                                    preset: DateFormatPreset.LONG_RANGE,
                                                    includeTime: true,
                                                    timeFormat: '12h',
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                🔄 Comparison: Yesterday
                                                (Auto-calculated)
                                            </label>
                                            <DateRangePicker
                                                value={(() => {
                                                    const now = new Date()
                                                    const yesterdayStart =
                                                        new Date(
                                                            now.getFullYear(),
                                                            now.getMonth(),
                                                            now.getDate() - 1,
                                                            0,
                                                            0,
                                                            0,
                                                            0
                                                        )
                                                    const yesterdayEnd =
                                                        new Date(
                                                            now.getFullYear(),
                                                            now.getMonth(),
                                                            now.getDate() - 1,
                                                            23,
                                                            59,
                                                            59,
                                                            999
                                                        )
                                                    return {
                                                        startDate:
                                                            yesterdayStart,
                                                        endDate: yesterdayEnd,
                                                    }
                                                })()}
                                                onChange={() => {}} // Read-only demo
                                                showPresets={true}
                                                customPresets={[
                                                    DateRangePreset.YESTERDAY,
                                                ]}
                                                formatConfig={{
                                                    preset: DateFormatPreset.LONG_RANGE,
                                                    includeTime: true,
                                                    timeFormat: '12h',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h6 className="font-medium text-blue-800 mb-2">
                                            ✅ Expected Behavior:
                                        </h6>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                            <li>
                                                • Main range: Today from 12:00
                                                AM to current time
                                            </li>
                                            <li>
                                                • Comparison range: Yesterday
                                                full day (12:00 AM to 11:59 PM)
                                            </li>
                                            <li>
                                                • Automatically adjusts as time
                                                progresses throughout the day
                                            </li>
                                            <li>
                                                • Perfect for day-over-day
                                                performance tracking
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Test Case 3: Last 30 Minutes */}
                                <div className="bg-white p-6 rounded-lg border border-indigo-200">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                                        📊 Test Case 3: "Last 30 Minutes" →
                                        Compare With "Current Time - 30 Minutes"
                                    </h5>
                                    <p className="text-sm text-gray-600 mb-4">
                                        When user selects "Last 30 Minutes",
                                        comparison automatically starts 30
                                        minutes prior. Handles cross-date
                                        boundaries and dynamically adjusts as
                                        time progresses.
                                    </p>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                📈 Main Range: Last 30 Minutes
                                            </label>
                                            <DateRangePicker
                                                value={(() => {
                                                    const now = new Date()
                                                    const thirtyMinsAgo =
                                                        new Date(
                                                            now.getTime() -
                                                                30 * 60 * 1000
                                                        )
                                                    return {
                                                        startDate:
                                                            thirtyMinsAgo,
                                                        endDate: now,
                                                    }
                                                })()}
                                                onChange={() => {}} // Read-only demo
                                                showPresets={true}
                                                customPresets={[
                                                    DateRangePreset.LAST_30_MINUTES,
                                                ]}
                                                formatConfig={{
                                                    preset: DateFormatPreset.LONG_RANGE,
                                                    includeTime: true,
                                                    timeFormat: '12h',
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                🔄 Comparison: Previous 30
                                                Minutes (Auto-calculated)
                                            </label>
                                            <DateRangePicker
                                                value={(() => {
                                                    const now = new Date()
                                                    const sixtyMinsAgo =
                                                        new Date(
                                                            now.getTime() -
                                                                60 * 60 * 1000
                                                        )
                                                    const thirtyMinsAgo =
                                                        new Date(
                                                            now.getTime() -
                                                                30 * 60 * 1000
                                                        )
                                                    return {
                                                        startDate: sixtyMinsAgo,
                                                        endDate: thirtyMinsAgo,
                                                    }
                                                })()}
                                                onChange={() => {}} // Read-only demo
                                                showPresets={false}
                                                formatConfig={{
                                                    preset: DateFormatPreset.LONG_RANGE,
                                                    includeTime: true,
                                                    timeFormat: '12h',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                        <h6 className="font-medium text-purple-800 mb-2">
                                            ✅ Expected Behavior:
                                        </h6>
                                        <ul className="text-sm text-purple-700 space-y-1">
                                            <li>
                                                • Main range: Current time - 30
                                                minutes to current time
                                            </li>
                                            <li>
                                                • Comparison range: 60 minutes
                                                ago to 30 minutes ago
                                            </li>
                                            <li>
                                                • Handles midnight crossover
                                                automatically
                                            </li>
                                            <li>
                                                • Perfect for real-time
                                                monitoring and live metrics
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Implementation Summary */}
                            <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                                <h6 className="font-semibold text-gray-800 mb-3">
                                    💻 Implementation Summary
                                </h6>
                                <p className="text-sm text-gray-600 mb-4">
                                    These test cases demonstrate how two
                                    separate DateRangePicker components can work
                                    together to provide automatic comparison
                                    functionality for analytics dashboards.
                                </p>

                                <div className="bg-white p-4 rounded border text-xs font-mono">
                                    <div className="text-gray-600 mb-2">
                                        // Automatic comparison calculation
                                        example
                                    </div>
                                    <div className="text-blue-600">
                                        const calculateComparisonRange =
                                        (mainRange) = {`{`}
                                    </div>
                                    <div className="text-blue-600 ml-4">
                                        const duration = mainRange.endDate -
                                        mainRange.startDate
                                    </div>
                                    <div className="text-blue-600 ml-4">
                                        const comparisonEnd = new
                                        Date(mainRange.startDate)
                                    </div>
                                    <div className="text-blue-600 ml-4">
                                        const comparisonStart = new
                                        Date(comparisonEnd - duration)
                                    </div>
                                    <div className="text-blue-600 ml-4">
                                        return{' '}
                                        {`{ startDate: comparisonStart, endDate: comparisonEnd }`}
                                    </div>
                                    <div className="text-blue-600">{`}`}</div>
                                </div>

                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
                                    <strong className="text-green-700">
                                        ✅ All test cases validated:
                                    </strong>
                                    <span className="text-green-600">
                                        {' '}
                                        Each comparison range automatically
                                        calculates based on the main range
                                        duration and end time
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Size Variants Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Size Variants
                    </h3>
                    <p className="text-base text-gray-600 mb-6">
                        DateRangePicker supports three sizes: Small, Medium
                        (default), and Large
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Small Size */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Small Size
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Padding: 7px 14px, Font: body.sm
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={basicRange}
                                    onChange={handleBasicRangeChange}
                                    size={DateRangePickerSize.SMALL}
                                    showPresets={true}
                                    showDateTimePicker={true}
                                />
                            </div>
                        </div>

                        {/* Medium Size */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Medium Size (Default)
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Padding: 8px 14px, Font: body.md
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={formatRange}
                                    onChange={handleFormatRangeChange}
                                    size={DateRangePickerSize.MEDIUM}
                                    showPresets={true}
                                    showDateTimePicker={true}
                                />
                            </div>
                        </div>

                        {/* Large Size */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-700">
                                        Large Size
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Padding: 10px 14px, Font: body.md
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <DateRangePicker
                                    value={customRange}
                                    onChange={handleCustomRangeChange}
                                    size={DateRangePickerSize.LARGE}
                                    showPresets={true}
                                    showDateTimePicker={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Guide */}
            <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    How to Use DateRangePicker
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-blue-700 mb-2">
                            ✨ Key Features
                        </h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                            <li>
                                • <strong>Simple and predictable:</strong>{' '}
                                Standard JavaScript Date objects, no timezone
                                complexity
                            </li>
                            <li>
                                • <strong>Exact preset matching:</strong> Clean
                                detection based on actual date values
                            </li>
                            <li>
                                • <strong>Flexible formatting:</strong> Built-in
                                presets like SHORT_RANGE, MEDIUM_RANGE,
                                ISO_RANGE, US_RANGE
                            </li>
                            <li>
                                • <strong>Custom triggers:</strong> Full control
                                over trigger appearance
                            </li>
                            <li>
                                • <strong>Mobile optimized:</strong> Automatic
                                drawer on mobile devices
                            </li>
                            <li>
                                • <strong>User timezone control:</strong> You
                                handle timezone conversion, component handles UI
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-blue-700 mb-2">
                            📝 Simple Usage
                        </h4>
                        <div className="bg-white p-3 rounded border text-xs font-mono">
                            <div className="text-gray-600 mb-2">
                                // Basic usage
                            </div>
                            <div>{'<DateRangePicker'}</div>
                            <div>{'  value={dateRange}'}</div>
                            <div>{'  onChange={setDateRange}'}</div>
                            <div>{'/>'}</div>

                            <div className="text-gray-600 mb-2 mt-3">
                                // With custom format
                            </div>
                            <div>{'<DateRangePicker'}</div>
                            <div>{'  value={range}'}</div>
                            <div>{'  onChange={setRange}'}</div>
                            <div>{'  formatConfig={{'}</div>
                            <div>
                                {'    preset: DateFormatPreset.ISO_RANGE,'}
                            </div>
                            <div>{'    includeTime: true'}</div>
                            <div>{'  }}'}</div>
                            <div>{'/>'}</div>

                            <div className="text-gray-600 mb-2 mt-3">
                                // With restrictions
                            </div>
                            <div>{'<DateRangePicker'}</div>
                            <div>{'  disableFutureDates={true}'}</div>
                            <div>{'  allowSingleDateSelection={true}'}</div>
                            <div>{'/>'}</div>
                        </div>
                    </div>
                </div>

                {/* Timezone Support */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Timezone Support</h2>
                    <p className="text-gray-600">
                        The DateRangePicker supports timezone-aware date/time
                        operations. When a timezone is specified, presets like
                        "Yesterday" or "Today" are calculated in that timezone,
                        ensuring global users see correct dates.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* New York Timezone */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                🗽 New York (America/New_York)
                            </h3>
                            <DateRangePicker
                                value={dateRange36}
                                onChange={(range) => {
                                    setDateRange36(range)
                                    console.log('NY Range:', range)
                                }}
                                timezone="America/New_York"
                                showDateTimePicker={true}
                            />
                            {dateRange36 && (
                                <div className="text-sm bg-blue-50 p-3 rounded">
                                    <p>
                                        <strong>Start:</strong>{' '}
                                        {dateRange36.startDate.toLocaleString()}
                                    </p>
                                    {dateRange36.endDate && (
                                        <p>
                                            <strong>End:</strong>{' '}
                                            {dateRange36.endDate.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Tokyo Timezone */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                🗼 Tokyo (Asia/Tokyo)
                            </h3>
                            <DateRangePicker
                                value={dateRange37}
                                onChange={(range) => {
                                    setDateRange37(range)
                                    console.log('Tokyo Range:', range)
                                }}
                                timezone="Asia/Tokyo"
                                showDateTimePicker={true}
                            />
                            {dateRange37 && (
                                <div className="text-sm bg-purple-50 p-3 rounded">
                                    <p>
                                        <strong>Start:</strong>{' '}
                                        {dateRange37.startDate.toLocaleString()}
                                    </p>
                                    {dateRange37.endDate && (
                                        <p>
                                            <strong>End:</strong>{' '}
                                            {dateRange37.endDate.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* London Timezone */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                🇬🇧 London (Europe/London)
                            </h3>
                            <DateRangePicker
                                value={dateRange38}
                                onChange={(range) => {
                                    setDateRange38(range)
                                    console.log('London Range:', range)
                                }}
                                timezone="Europe/London"
                                showDateTimePicker={true}
                            />
                            {dateRange38 && (
                                <div className="text-sm bg-green-50 p-3 rounded">
                                    <p>
                                        <strong>Start:</strong>{' '}
                                        {dateRange38.startDate.toLocaleString()}
                                    </p>
                                    {dateRange38.endDate && (
                                        <p>
                                            <strong>End:</strong>{' '}
                                            {dateRange38.endDate.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sydney Timezone */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                🦘 Sydney (Australia/Sydney)
                            </h3>
                            <DateRangePicker
                                value={dateRange39}
                                onChange={(range) => {
                                    setDateRange39(range)
                                    console.log('Sydney Range:', range)
                                }}
                                timezone="Australia/Sydney"
                                showDateTimePicker={true}
                            />
                            {dateRange39 && (
                                <div className="text-sm bg-orange-50 p-3 rounded">
                                    <p>
                                        <strong>Start:</strong>{' '}
                                        {dateRange39.startDate.toLocaleString()}
                                    </p>
                                    {dateRange39.endDate && (
                                        <p>
                                            <strong>End:</strong>{' '}
                                            {dateRange39.endDate.toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-3">
                            💡 How Timezone Support Works
                        </h4>
                        <ul className="space-y-2 text-sm text-purple-900">
                            <li className="flex items-start gap-2">
                                <span className="text-lg">✓</span>
                                <span>
                                    <strong>Presets respect timezone:</strong>{' '}
                                    "Yesterday" in Tokyo is different from
                                    "Yesterday" in New York
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-lg">✓</span>
                                <span>
                                    <strong>Automatic conversion:</strong> Dates
                                    are calculated and displayed in the
                                    specified timezone
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-lg">✓</span>
                                <span>
                                    <strong>Global-ready:</strong> Perfect for
                                    apps used across different time zones
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-lg">✓</span>
                                <span>
                                    <strong>No dependencies:</strong> Uses
                                    native JavaScript Intl API for timezone
                                    support
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold">Usage Example:</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                            <div>
                                {'// User in Tokyo sees their local time'}
                            </div>
                            <div>{'<DateRangePicker'}</div>
                            <div>{'  timezone="Asia/Tokyo"'}</div>
                            <div>{'  value={dateRange}'}</div>
                            <div>{'  onChange={setDateRange}'}</div>
                            <div>{'/>'}</div>
                            <div className="mt-3">
                                {
                                    '// "Yesterday" = Tokyo\'s yesterday, not server\'s'
                                }
                            </div>
                            <div>
                                {'// All dates calculated in Tokyo timezone'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">
                        🚀 Clean & Simple API
                    </h4>
                    <p className="text-blue-700 text-sm">
                        Just import{' '}
                        <code className="bg-white px-1 rounded">
                            DateRangePicker
                        </code>{' '}
                        and pass standard JavaScript Date objects. The component
                        handles UI, formatting, preset detection, and timezone
                        conversion. Timezone support uses native Intl API.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DateRangePickerDemo
