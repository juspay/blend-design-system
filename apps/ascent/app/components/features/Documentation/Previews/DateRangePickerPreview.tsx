'use client'
import { DateRangePicker, DateRange } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const DateRangePickerPreview = () => {
    const tsCode = `import { DateRangePicker, DateRange } from "@juspay/blend-design-system";

function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    console.log('Selected date range:', range);
  };
  
  return (
    <DateRangePicker
      value={dateRange}
      onChange={handleDateRangeChange}
      showDateTimePicker={true}
      showPresets={true}
      allowSingleDateSelection={false}
      dateFormat="dd/MM/yyyy"
    />
  );
}`

    const reCode = `@react.component
let make = () => {
  let (dateRange, setDateRange) = React.useState(() => None)
  
  let handleDateRangeChange = range => {
    setDateRange(_ => Some(range))
    Js.log2("Selected date range:", range)
  }
  
  <DateRangePickerBinding
    value=?dateRange
    onChange=handleDateRangeChange
    showDateTimePicker=true
    showPresets=true
    allowSingleDateSelection=false
    dateFormat="dd/MM/yyyy"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: 'dateRange=?,
  ~onChange: 'dateRange => unit=?,
  ~showDateTimePicker: bool=?,
  ~showPresets: bool=?,
  ~placeholder: string=?,
  ~isDisabled: bool=?,
  ~icon: React.element=?,
  ~minDate: Js.Date.t=?,
  ~maxDate: Js.Date.t=?,
  ~dateFormat: string=?,
  ~allowSingleDateSelection: bool=?,
  ~disableFutureDates: bool=?,
  ~disablePastDates: bool=?,
  ~triggerElement: React.element=?,
  ~useDrawerOnMobile: bool=?,
  ~skipQuickFiltersOnMobile: bool=?,
) => React.element = "DateRangePicker"`

    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

    const handleDateRangeChange = (range: DateRange) => {
        setDateRange(range)
    }

    const formatDateRange = (range: DateRange | undefined): string => {
        if (!range) return 'No date range selected'

        const formatDate = (date: Date): string => {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
        }

        const startDate = formatDate(range.startDate)
        const endDate = formatDate(range.endDate)

        if (range.startDate.getTime() === range.endDate.getTime()) {
            return `Selected: ${startDate}`
        }

        return `Selected: ${startDate} - ${endDate}`
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                }}
            >
                <style>
                    {`
                    .date-range-picker-preview input {
                        color: #374151 !important;
                    }
                    .date-range-picker-preview input::placeholder {
                        color: #9CA3AF !important;
                    }
                `}
                </style>

                <div className="date-range-picker-preview">
                    <DateRangePicker
                        value={dateRange}
                        onChange={handleDateRangeChange}
                        showDateTimePicker={true}
                        showPresets={true}
                        allowSingleDateSelection={false}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>

                <div
                    style={{
                        padding: '12px',
                        backgroundColor: dateRange ? '#f0fdf4' : '#f9fafb',
                        border: `1px solid ${dateRange ? '#bbf7d0' : '#e5e7eb'}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        color: dateRange ? '#166534' : '#6b7280',
                    }}
                >
                    {dateRange ? '✓' : 'ℹ'} {formatDateRange(dateRange)}
                </div>
            </div>
        </ComponentPreview>
    )
}

export default DateRangePickerPreview
