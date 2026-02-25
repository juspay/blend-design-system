'use client'
import {
    Slider,
    SliderVariant,
    SliderSize,
    SliderValueType,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SliderPreview = () => {
    const [value, setValue] = useState([25])

    const tsCode = `import { 
  Slider, 
  SliderVariant, 
  SliderSize, 
  SliderValueType 
} from "@juspay/blend-design-system";
import { useState } from "react";

function MyComponent() {
  const [value, setValue] = useState([25]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Volume: {value[0]}%
        </label>
        <Slider
          variant={SliderVariant.PRIMARY}
          size={SliderSize.MEDIUM}
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={1}
          showValueLabels={true}
          labelPosition="top"
          valueFormat={{
            type: SliderValueType.NUMBER,
            suffix: '%'
          }}
        />
      </div>
    </div>
  );
}`

    const reCode = `type sliderVariant = [#primary | #secondary]
type sliderSize = [#sm | #md | #lg]
type sliderValueType = [#number | #percentage | #decimal]

@react.component
let make = (
  ~variant: option<sliderVariant>=?,
  ~size: option<sliderSize>=?,
  ~value: option<array<float>>=?,
  ~defaultValue: option<array<float>>=?,
  ~onValueChange: option<array<float> => unit>=?,
  ~min: option<float>=?,
  ~max: option<float>=?,
  ~step: option<float>=?,
  ~showValueLabels: option<bool>=?,
  ~labelPosition: option<[#top | #bottom | #inline]>=?,
  ~valueFormat: option<{
    "type": sliderValueType,
    "decimalPlaces": option<int>,
    "prefix": option<string>,
    "suffix": option<string>,
    "formatter": option<float => string>
  }>=?,
  ~disabled: option<bool>=?,
  ~orientation: option<[#horizontal | #vertical]>=?,
  ~className: option<string>=?,
) => {
  <SliderBinding
    ?variant
    ?size
    ?value
    ?defaultValue
    ?onValueChange
    ?min
    ?max
    ?step
    ?showValueLabels
    ?labelPosition
    ?valueFormat
    ?disabled
    ?orientation
    ?className
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~variant: [#primary | #secondary]=?,
  ~size: [#sm | #md | #lg]=?,
  ~value: array<float>=?,
  ~defaultValue: array<float>=?,
  ~onValueChange: array<float> => unit=?,
  ~min: float=?,
  ~max: float=?,
  ~step: float=?,
  ~showValueLabels: bool=?,
  ~labelPosition: [#top | #bottom | #inline]=?,
  ~valueFormat: {
    "type": [#number | #percentage | #decimal],
    "decimalPlaces": int=?,
    "prefix": string=?,
    "suffix": string=?,
    "formatter": float => string=?
  }=?,
  ~disabled: bool=?,
  ~orientation: [#horizontal | #vertical]=?,
  ~className: string=?,
) => React.element = "Slider"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div style={{ minWidth: '300px', padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Slider
                        variant={SliderVariant.PRIMARY}
                        size={SliderSize.MEDIUM}
                        value={value}
                        onValueChange={setValue}
                        min={0}
                        max={100}
                        step={1}
                        showValueLabels={true}
                        labelPosition="top"
                        valueFormat={{
                            type: SliderValueType.NUMBER,
                            suffix: '%',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <Slider
                        variant={SliderVariant.SECONDARY}
                        size={SliderSize.MEDIUM}
                        defaultValue={[200, 800]}
                        min={0}
                        max={1000}
                        step={10}
                        showValueLabels={false}
                        valueFormat={{
                            type: SliderValueType.NUMBER,
                            prefix: '$',
                        }}
                    />
                </div>
            </div>
        </ComponentPreview>
    )
}

export default SliderPreview
