import { useState } from 'react'
import { DateRangePicker } from '../../../../packages/blend/lib/components/DateRangePicker'
import { DateRange } from '../../../../packages/blend/lib/components/DateRangePicker/types'

const DateRangePickerDemo = () => {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()

    const handleRangeChange = (range: DateRange) => {
        setSelectedRange(range)
        console.log('Selected range:', range)
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px' }}>
            <h2>DateRangePicker with Mobile Drawer</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>DateRangePicker with Presets (no header)</h3>
                <DateRangePicker
                    value={selectedRange}
                    onChange={handleRangeChange}
                    showPresets={true}
                    showTimePicker={false}
                    useDrawerOnMobile={true}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>
                    DateRangePicker with Time Picker and Presets (no header)
                </h3>
                <DateRangePicker
                    value={selectedRange}
                    onChange={handleRangeChange}
                    showPresets={true}
                    showTimePicker={true}
                    useDrawerOnMobile={true}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>DateRangePicker with Floating Tabs (Mobile)</h3>
                <DateRangePicker
                    value={selectedRange}
                    onChange={handleRangeChange}
                    showPresets={true}
                    showTimePicker={true}
                    useDrawerOnMobile={true}
                    skipQuickFiltersOnMobile={true}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>DateRangePicker without Drawer (always popover)</h3>
                <DateRangePicker
                    value={selectedRange}
                    onChange={handleRangeChange}
                    showPresets={true}
                    showTimePicker={false}
                    useDrawerOnMobile={false}
                />
            </div>

            {selectedRange && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '15px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                    }}
                >
                    <h4>Selected Range:</h4>
                    <p>
                        <strong>Start:</strong>{' '}
                        {selectedRange.startDate.toLocaleDateString()}
                    </p>
                    <p>
                        <strong>End:</strong>{' '}
                        {selectedRange.endDate.toLocaleDateString()}
                    </p>
                </div>
            )}

            <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
                <p>
                    <strong>Instructions:</strong>
                </p>
                <ul>
                    <li>
                        On mobile devices (width &lt; 1024px), the first two
                        pickers will open in a drawer
                    </li>
                    <li>On desktop, all pickers will open in a popover</li>
                    <li>
                        The third picker is configured to always use popover
                        (useDrawerOnMobile=false)
                    </li>
                    <li>
                        Try resizing your browser window to see the responsive
                        behavior
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DateRangePickerDemo
