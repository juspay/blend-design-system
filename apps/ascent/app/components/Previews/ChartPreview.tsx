'use client'
import { Charts, ChartType, ChartLegendPosition } from 'blend-v1'
import React from 'react'
import ComponentPreview from './ComponentPreview'

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

    const tsCode = `import { Charts, ChartType, ChartLegendPosition } from "blend-v1";

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
      xAxisLabel="Month"
      yAxisLabel="Value"
      legendPosition={ChartLegendPosition.TOP}
      chartHeaderSlot={<div>Monthly Performance</div>}
    />
  );
}`

    const reCode = `type chartType = [#line | #bar | #pie]
type legendPosition = [#top | #right]

type dataPoint = {
  primary: {
    label: string,
    val: int,
  },
  aux: option<array<{label: string, val: int}>>,
}

type nestedDataPoint = {
  name: string,
  data: Js.Dict.t<dataPoint>,
}

@react.component
let make = (
  ~chartType: option<chartType>=?,
  ~data: array<nestedDataPoint>,
  ~xAxisLabel: option<string>=?,
  ~yAxisLabel: option<string>=?,
  ~colors: option<array<string>>=?,
  ~metrics: option<array<string>>=?,
  ~slot1: option<React.element>=?,
  ~slot2: option<React.element>=?,
  ~slot3: option<React.element>=?,
  ~legendPosition: option<legendPosition>=?,
  ~chartHeaderSlot: React.element,
) => {
  <ChartsBinding
    ?chartType
    data
    ?xAxisLabel
    ?yAxisLabel
    ?colors
    ?metrics
    ?slot1
    ?slot2
    ?slot3
    ?legendPosition
    chartHeaderSlot
  />
}`

    const bindingCode = `@module("blend-v1") @react.component
external make: (
  ~chartType: [#line | #bar | #pie]=?,
  ~data: array<nestedDataPoint>,
  ~xAxisLabel: string=?,
  ~yAxisLabel: string=?,
  ~colors: array<string>=?,
  ~metrics: array<string>=?,
  ~slot1: React.element=?,
  ~slot2: React.element=?,
  ~slot3: React.element=?,
  ~legendPosition: [#top | #right]=?,
  ~chartHeaderSlot: React.element,
) => React.element = "Charts"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full p-6">
                <Charts
                    chartType={ChartType.LINE}
                    data={sampleData}
                    xAxisLabel="Month"
                    yAxisLabel="Value"
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
