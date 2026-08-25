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
        const endDate = range.endDate ? formatDate(range.endDate) : ''

        if (range.startDate?.getTime() === range.endDate?.getTime()) {
            return `Selected: ${startDate}`
        }

        return `Selected: ${startDate} - ${endDate}`
    }

    return (
        <ComponentPreview ts={tsCode}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: 'var(--surface)',
                    borderRadius: '8px',
                }}
            >
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
                        backgroundColor: dateRange
                            ? 'var(--success-bg)'
                            : 'var(--muted)',
                        border: `1px solid ${dateRange ? 'var(--success-border)' : 'var(--border)'}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        color: dateRange
                            ? 'var(--success-foreground)'
                            : 'var(--muted-foreground)',
                    }}
                >
                    {dateRange ? '✓' : 'ℹ'} {formatDateRange(dateRange)}
                </div>
            </div>
        </ComponentPreview>
    )
}

export default DateRangePickerPreview
