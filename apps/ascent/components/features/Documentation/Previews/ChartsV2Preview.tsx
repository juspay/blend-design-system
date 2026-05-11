'use client'
import { ChartV2 } from '@juspay/blend-design-system'
import Highcharts from 'highcharts'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ChartsV2Preview = () => {
    const tsCode = `import { ChartV2 } from '@juspay/blend-design-system'
import Highcharts from 'highcharts'

function MyComponent() {
    const options = {
        title: { text: 'Monthly Sales' },
        series: [{
            type: 'line',
            name: 'Sales',
            data: [29, 71, 106, 129, 144]
        }]
    }

    return (
        <ChartV2
            highcharts={Highcharts}
            options={options}
            skeleton={{ show: false }}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let options = {
    "title": {"text": "Monthly Sales"},
    "series": [{
      "type": "line",
      "name": "Sales",
      "data": [29, 71, 106, 129, 144]
    }]
  }

  <ChartV2Binding
    highcharts={Highcharts.highcharts}
    options={options}
    skeleton={{show: false}}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~highcharts: 'a=?,
  ~options: 'b=?,
  ~skeleton: {show: bool, variant?: string, height?: int}=?,
  ~noData: {title?: string, subtitle?: string}=?,
  ~callback: 'c => unit=?,
) => React.element = "ChartV2"`

    const options = {
        title: { text: 'Monthly Sales' },
        series: [
            {
                type: 'line',
                name: 'Sales',
                data: [29, 71, 106, 129, 144],
            },
        ],
        credits: { enabled: false },
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-md">
                <ChartV2
                    highcharts={Highcharts}
                    options={options}
                    skeleton={{ show: false }}
                />
            </div>
        </ComponentPreview>
    )
}

export default ChartsV2Preview
