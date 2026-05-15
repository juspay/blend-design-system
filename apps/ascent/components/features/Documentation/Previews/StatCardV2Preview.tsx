'use client'
import {
    StatCardV2,
    StatCardV2Variant,
    StatCardV2ChangeType,
    StatCardV2ArrowDirection,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const StatCardV2Preview = () => {
    const tsCode = `import {
    StatCardV2,
    StatCardV2Variant,
    StatCardV2ChangeType,
    StatCardV2ArrowDirection,
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <StatCardV2
            title="Total Revenue"
            variant={StatCardV2Variant.CHART}
            value="$48,352"
            subtitle="Last 30 days"
            change={{
                value: '12.5%',
                changeType: StatCardV2ChangeType.INCREASE,
                arrowDirection: StatCardV2ArrowDirection.UP,
            }}
            options={{
                chart: { type: 'area' },
                series: [{
                    data: [10, 25, 18, 35, 42, 38, 55],
                    color: '#3b82f6',
                }],
            }}
        />
    )
}`

    const reCode = `type statCardV2Variant = [#chart | #progress | #number]
type statCardV2ChangeType = [#increase | #decrease]
type statCardV2ArrowDirection = [#up | #down]

@react.component
let make = () => {
  <StatCardV2Binding
    title="Total Revenue"
    variant=#chart
    value="$48,352"
    subtitle="Last 30 days"
    change={{
      value: "12.5%",
      changeType: #increase,
      arrowDirection: #up
    }}
    options={{
      chart: { type: "area" },
      series: [{ data: [10, 25, 18, 35, 42, 38, 55] }]
    }}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~title: string,
  ~variant: [#chart | #progress | #number]=?,
  ~value: string=?,
  ~change: {
    value: string,
    changeType: [#increase | #decrease],
    arrowDirection: [#up | #down]=?,
  }=?,
  ~subtitle: string=?,
  ~options: {..}=?,
) => React.element = "StatCardV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-sm">
                <StatCardV2
                    title="Total Revenue"
                    variant={StatCardV2Variant.CHART}
                    value="$48,352"
                    subtitle="Last 30 days"
                    change={{
                        value: '12.5%',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    }}
                    options={{
                        chart: { type: 'area', height: 80 },
                        series: [
                            {
                                type: 'area',
                                data: [10, 25, 18, 35, 42, 38, 55, 48, 62, 58],
                                color: '#3b82f6',
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1,
                                    },
                                    stops: [
                                        [0, 'rgba(59, 130, 246, 0.3)'],
                                        [1, 'rgba(59, 130, 246, 0.05)'],
                                    ],
                                },
                            },
                        ],
                    }}
                />
            </div>
        </ComponentPreview>
    )
}

export default StatCardV2Preview
