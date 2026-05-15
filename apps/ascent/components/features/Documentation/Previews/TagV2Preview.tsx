'use client'
import {
    TagV2,
    TagV2Size,
    TagV2Type,
    TagV2Color,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TagV2Preview = () => {
    const tsCode = `import {
    TagV2,
    TagV2Size,
    TagV2Type,
    TagV2Color
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <>
            <TagV2
                text="Active"
                size={TagV2Size.MD}
                type={TagV2Type.SUBTLE}
                color={TagV2Color.SUCCESS}
            />
            <TagV2
                text="Pending"
                size={TagV2Size.SM}
                type={TagV2Type.NO_FILL}
                color={TagV2Color.WARNING}
            />
        </>
    )
}`

    const reCode = `type tagV2Size = [#xs | #sm | #md | #lg]
type tagV2Type = [#noFill | #attentive | #subtle]
type tagV2Color = [#neutral | #primary | #success | #error | #warning | #purple]

@react.component
let make = () => {
  <>
    <TagV2Binding
      text="Active"
      size=#md
      type=#subtle
      color=#success
    />
    <TagV2Binding
      text="Pending"
      size=#sm
      type=#noFill
      color=#warning
    />
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~text: string,
  ~size: [#xs | #sm | #md | #lg]=?,
  ~type_: [#noFill | #attentive | #subtle]=?,
  ~subType: [#rounded | #squarical]=?,
  ~color: [#neutral | #primary | #success | #error | #warning | #purple]=?,
  ~leftSlot: {slot: React.element, maxHeight?: string}=?,
  ~rightSlot: {slot: React.element, maxHeight?: string}=?,
  ~skeleton: {showSkeleton?: bool, skeletonVariant?: [#pulse | #wave]}=?,
  ~tagGroupPosition: [#center | #left | #right]=?,
) => React.element = "TagV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-wrap gap-2">
                <TagV2
                    text="Active"
                    size={TagV2Size.MD}
                    type={TagV2Type.SUBTLE}
                    color={TagV2Color.SUCCESS}
                />
                <TagV2
                    text="Pending"
                    size={TagV2Size.SM}
                    type={TagV2Type.NO_FILL}
                    color={TagV2Color.WARNING}
                />
                <TagV2
                    text="Error"
                    size={TagV2Size.SM}
                    type={TagV2Type.ATTENTIVE}
                    color={TagV2Color.ERROR}
                />
                <TagV2
                    text="Primary"
                    size={TagV2Size.MD}
                    type={TagV2Type.SUBTLE}
                    color={TagV2Color.PRIMARY}
                />
            </div>
        </ComponentPreview>
    )
}

export default TagV2Preview
