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
    const [basicRange, setBasicRange] = useState<DateRange>({
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

    // Console logging functions for date changes
    const handlePlaygroundRangeChange = (range: DateRange) => {
        console.log('Playground Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate.toISOString(),
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate.toLocaleString(),
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
            endDate: range.endDate.toISOString(),
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate.toLocaleString(),
        })
        setBasicRange(range)
    }

    const handleFormatRangeChange = (range: DateRange) => {
        console.log('Format Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate.toISOString(),
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate.toLocaleString(),
        })
        setFormatRange(range)
    }

    const handleCustomRangeChange = (range: DateRange) => {
        console.log('Custom Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate.toISOString(),
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate.toLocaleString(),
        })
        setCustomRange(range)
    }

    const handleYesterdayRangeChange = (range: DateRange) => {
        console.log('Yesterday Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate.toISOString(),
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate.toLocaleString(),
        })
        setYesterdayRange(range)
    }

    const handleSingleDateRangeChange = (range: DateRange) => {
        console.log('Single Date Range Changed:', {
            startDate: range.startDate.toISOString(),
            endDate: range.endDate.toISOString(),
            formattedStart: range.startDate.toLocaleString(),
            formattedEnd: range.endDate.toLocaleString(),
            isSingleDay:
                range.startDate.toDateString() === range.endDate.toDateString(),
            isFullDay:
                range.startDate.getHours() === 0 &&
                range.startDate.getMinutes() === 0 &&
                range.endDate.getHours() === 23 &&
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
                                    customPresets={`[`}
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
                                <div className="text-gray-600">{`]}`}</div>
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
                                    customPresets={`[`}
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
                                <div className="text-gray-600">{`]}`}</div>
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
                                    customPresets={`[`}
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
                                <div className="text-gray-600">{`]}`}</div>
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
                        handles UI, formatting, and preset detection. You
                        control timezone conversion in your app logic.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DateRangePickerDemo
