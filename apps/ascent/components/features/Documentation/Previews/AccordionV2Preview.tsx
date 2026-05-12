'use client'
import {
    AccordionV2,
    AccordionV2Item,
    AccordionV2Type,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const AccordionV2Preview = () => {
    const tsCode = `import { AccordionV2, AccordionV2Item, AccordionV2Type } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <AccordionV2
            accordionType={AccordionV2Type.BORDER}
            defaultValue="item-1"
        >
            <AccordionV2Item value="item-1" title="Getting Started">
                Learn the basics of using our platform.
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Advanced Features">
                Explore advanced capabilities and settings.
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="API Reference">
                Complete API documentation for developers.
            </AccordionV2Item>
        </AccordionV2>
    )
}`

    const reCode = `type accordionV2Type = [#border | #noBorder]

@react.component
let make = () => {
  <AccordionV2Binding accordionType=#border>
    <AccordionV2ItemBinding value="item-1" title="Getting Started">
      {React.string("Learn the basics of using our platform.")}
    </AccordionV2ItemBinding>
    <AccordionV2ItemBinding value="item-2" title="Advanced Features">
      {React.string("Explore advanced capabilities.")}
    </AccordionV2ItemBinding>
  </AccordionV2Binding>
}`

    const bindingCode = `@module("@juspay/blend-design-system")
external accordionV2: (
  ~accordionType: [#border | #noBorder]=?,
  ~defaultValue: string=?,
  ~value: string=?,
  ~isMultiple: bool=?,
  ~onValueChange: string => unit=?,
  ~children: React.element,
) => React.element = "AccordionV2"

@module("@juspay/blend-design-system")
external accordionV2Item: (
  ~value: string,
  ~title: string,
  ~subtext: string=?,
  ~leftSlot: React.element=?,
  ~rightSlot: React.element=?,
  ~isDisabled: bool=?,
  ~children: React.element,
) => React.element = "AccordionV2Item"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-md">
                <AccordionV2
                    accordionType={AccordionV2Type.BORDER}
                    defaultValue="item-1"
                >
                    <AccordionV2Item value="item-1" title="Getting Started">
                        Learn the basics of using our platform.
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Advanced Features">
                        Explore advanced capabilities and settings.
                    </AccordionV2Item>
                    <AccordionV2Item value="item-3" title="API Reference">
                        Complete API documentation for developers.
                    </AccordionV2Item>
                </AccordionV2>
            </div>
        </ComponentPreview>
    )
}

export default AccordionV2Preview
