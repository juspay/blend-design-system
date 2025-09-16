import { useState } from 'react'
import { DateRangePicker } from '../../../../packages/blend/lib/components/DateRangePicker'
import {
    DateRange,
    DateFormatPreset,
    DateFormatConfig,
    TriggerConfig,
} from '../../../../packages/blend/lib/components/DateRangePicker/types'
import {
    FORMAT_PRESETS,
    CUSTOM_FORMAT_EXAMPLES,
    formatTriggerDisplay,
} from '../../../../packages/blend/lib/components/DateRangePicker/utils'

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
        isDisabled: false,
        formatPreset: DateFormatPreset.MEDIUM_RANGE,
        includeTime: false,
        includeYear: true,
        timeFormat: '12h' as '12h' | '24h',
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
                                </div>
                            </div>

                            {/* Format Settings */}
                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-3">
                                    Format Settings
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    Format Preview
                                </h4>
                                <div className="p-3 bg-white border border-gray-300 rounded-md">
                                    <p className="text-sm text-gray-600 mb-1">
                                        Current format output:
                                    </p>
                                    <p className="font-mono text-sm">
                                        {formatTriggerDisplay(
                                            playgroundRange,
                                            getFormatConfig(),
                                            'Select date range'
                                        )}
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
                                    onChange={setPlaygroundRange}
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
                                    isDisabled={config.isDisabled}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                onChange={setBasicRange}
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
                                onChange={setFormatRange}
                                formatConfig={FORMAT_PRESETS.COMPACT_NO_TIME}
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
                                onChange={setCustomRange}
                                formatConfig={FORMAT_PRESETS.MEDIUM_NO_TIME}
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

                    {/* Relative Format Example */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Relative Format
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Shows relative dates like "3 days ago - today"
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={setCustomRange}
                                formatConfig={CUSTOM_FORMAT_EXAMPLES.RELATIVE}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Disabled Future Dates */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Past Dates Only
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Useful for analytics and reporting
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={setCustomRange}
                                disableFutureDates={true}
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
                                value={basicRange}
                                onChange={setBasicRange}
                                allowSingleDateSelection={true}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Minimal Format */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Minimal Format
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Compact display format "3-5 Sep"
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={formatRange}
                                onChange={setFormatRange}
                                formatConfig={CUSTOM_FORMAT_EXAMPLES.MINIMAL}
                                showPresets={true}
                            />
                        </div>
                    </div>

                    {/* Business Format */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg min-h-[200px] flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Business Format
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                            Shows quarters and business periods
                        </p>
                        <div className="overflow-hidden">
                            <DateRangePicker
                                value={customRange}
                                onChange={setCustomRange}
                                formatConfig={CUSTOM_FORMAT_EXAMPLES.BUSINESS}
                                showPresets={true}
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
                                onChange={setBasicRange}
                                isDisabled={true}
                                showPresets={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Instructions */}
            <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Key Features & Best Practices
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-blue-700 mb-2">
                            ✨ New Features
                        </h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                            <li>
                                • <strong>Different background colors:</strong>{' '}
                                Quick selector (gray) vs trigger (white)
                            </li>
                            <li>
                                • <strong>Auto-hide presets:</strong> Custom
                                triggers automatically hide quick selectors
                            </li>
                            <li>
                                • <strong>Max height dropdown:</strong> Quick
                                selectors have 200px max height with scroll
                            </li>
                            <li>
                                • <strong>Enhanced formatting:</strong> Multiple
                                preset formats and custom functions
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-blue-700 mb-2">
                            🎯 Best Practices
                        </h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                            <li>
                                • Use FORMAT_PRESETS for common formatting needs
                            </li>
                            <li>
                                • Implement custom triggers for better UX
                                integration
                            </li>
                            <li>
                                • Consider mobile experience with
                                useDrawerOnMobile
                            </li>
                            <li>
                                • Test different format presets to match design
                                requirements
                            </li>
                            <li>
                                • Use custom format functions for complex
                                business logic
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateRangePickerDemo
