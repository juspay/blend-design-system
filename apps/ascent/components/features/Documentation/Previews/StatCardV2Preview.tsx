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
    StatCardV2ChangeType
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <StatCardV2
            title="Total Revenue"
            variant={StatCardV2Variant.NUMBER}
            value="$48,352"
            change={{
                value: "12.5%",
                changeType: StatCardV2ChangeType.INCREASE,
                arrowDirection: StatCardV2ArrowDirection.UP,
            }}
        />
    )
}`

    const reCode = `type statCardV2Variant = [#chart | #progress | #number]
type statCardV2ChangeType = [#increase | #decrease]

@react.component
let make = () => {
  <StatCardV2Binding
    title="Total Revenue"
    variant=#number
    value="$48,352"
    change={{
      value: "12.5%",
      changeType: #increase,
      arrowDirection: #up
    }}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~title: string,
  ~variant: [#chart | #progress | #number]=?,
  ~value: string=?,
  ~change: {value: string, changeType: [#increase | #decrease], arrowDirection: [#up | #down]}=?,
  ~subtitle: string=?,
) => React.element = "StatCardV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-xs">
                <StatCardV2
                    title="Total Revenue"
                    variant={StatCardV2Variant.NUMBER}
                    value="$48,352"
                    subtitle="Last 30 days"
                    change={{
                        value: '12.5%',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    }}
                />
            </div>
        </ComponentPreview>
    )
}

export default StatCardV2Preview
