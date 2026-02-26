'use client'
import {
    Charts,
    ChartType,
    ChartLegendPosition,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ChartPreview = () => {
    const sampleData = [
        {
            name: 'Jan',
            data: {
                sales: { primary: { label: 'Sales', val: 400 } },
                revenue: { primary: { label: 'Revenue', val: 240 } },
            },
        },
        {
            name: 'Feb',
            data: {
                sales: { primary: { label: 'Sales', val: 300 } },
                revenue: { primary: { label: 'Revenue', val: 139 } },
            },
        },
        {
            name: 'Mar',
            data: {
                sales: { primary: { label: 'Sales', val: 200 } },
                revenue: { primary: { label: 'Revenue', val: 980 } },
            },
        },
        {
            name: 'Apr',
            data: {
                sales: { primary: { label: 'Sales', val: 278 } },
                revenue: { primary: { label: 'Revenue', val: 390 } },
            },
        },
    ]

    const tsCode = `import { Charts, ChartType, ChartLegendPosition } from "@juspay/blend-design-system";

function MyComponent() {
  const data = [
    {
      name: "Jan",
      data: {
        sales: { primary: { label: "Sales", val: 400 } },
        revenue: { primary: { label: "Revenue", val: 240 } },
      },
    },
    // ... more data points
  ];

  return (
    <Charts
      chartType={ChartType.LINE}
      data={data}
      xAxis={{ label: "Month" }}
      yAxis={{ label: "Value" }}
      legendPosition={ChartLegendPosition.TOP}
      chartHeaderSlot={<div>Monthly Performance</div>}
    />
  );
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div className="w-full p-6">
                <Charts
                    chartType={ChartType.LINE}
                    data={sampleData}
                    xAxis={{ label: 'Month' }}
                    yAxis={{ label: 'Value' }}
                    legendPosition={ChartLegendPosition.TOP}
                    chartHeaderSlot={
                        <div className="text-black">Monthly Performance</div>
                    }
                />
            </div>
        </ComponentPreview>
    )
}

export default ChartPreview
