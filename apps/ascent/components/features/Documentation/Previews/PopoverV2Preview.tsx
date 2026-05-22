'use client'

import React from 'react'
import { PopoverV2, Button, ButtonType } from '@juspay/blend-design-system'

import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const PopoverV2Preview = () => {
    const tsCode = `import {
    PopoverV2,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <PopoverV2
            trigger={
                <Button
                    text="Open Popover"
                    buttonType={ButtonType.PRIMARY}
                />
            }
        >
            <div className="flex flex-col gap-4 p-2">
                <div>
                    <h3 className="text-lg font-semibold">
                        Confirm Action
                    </h3>

                    <p className="text-sm text-gray-500">
                        Are you sure you want to proceed with this action?
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        text="Confirm"
                        buttonType={ButtonType.PRIMARY}
                        onClick={() => console.log('Confirmed')}
                    />

                    <Button
                        text="Cancel"
                        buttonType={ButtonType.SECONDARY}
                        onClick={() => console.log('Cancelled')}
                    />
                </div>
            </div>
        </PopoverV2>
    )
}`

    const reCode = `@react.component
let make = () => {
  <PopoverV2Binding
    trigger={
      <ButtonBinding
        text="Open Popover"
      />
    }>
    <div className="flex flex-col gap-4 p-2">
      <div>
        <h3 className="text-lg font-semibold">
          {"Confirm Action"->React.string}
        </h3>

        <p className="text-sm text-gray-500">
          {"Are you sure you want to proceed?"->React.string}
        </p>
      </div>

      <div className="flex gap-2">
        <ButtonBinding
          text="Confirm"
        />

        <ButtonBinding
          text="Cancel"
        />
      </div>
    </div>
  </PopoverV2Binding>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~trigger: React.element,
  ~children: React.element,
  ~heading: string=?,
  ~description: string=?,
  ~showCloseButton: bool=?,
  ~open: bool=?,
  ~onOpenChange: bool => unit=?,
  ~onClose: unit => unit=?,
  ~asModal: bool=?,
  ~primaryAction: {text: string, onClick: ReactEvent.Mouse.t => unit, ...}=?,
  ~secondaryAction: {text: string, onClick: ReactEvent.Mouse.t => unit, ...}=?,
  ~size: [#sm | #md | #lg]=?,
  ~side: [#top | #right | #bottom | #left]=?,
  ~align: [#start | #center | #end]=?,
  ~sideOffset: int=?,
  ~alignOffset: int=?,
  ~useDrawerOnMobile: bool=?,
  ~avoidCollisions: bool=?,
  ~skeleton: {show?: bool, variant?: [#pulse | #wave], bodySkeletonProps?: {show?: bool, width?: string, height?: string}}=?,
  ~width: int=?,
  ~maxWidth: int=?,
  ~minWidth: int=?,
  ~height: int=?,
  ~minHeight: int=?,
  ~maxHeight: int=?,
) => React.element = "PopoverV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <PopoverV2
                trigger={
                    <Button
                        text="Open Popover"
                        buttonType={ButtonType.PRIMARY}
                    />
                }
            >
                <div className="flex flex-col gap-4 p-2">
                    <div>
                        <h3 className="text-lg font-semibold">
                            Confirm Action
                        </h3>

                        <p className="text-sm text-gray-500">
                            Are you sure you want to proceed with this action?
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            text="Confirm"
                            buttonType={ButtonType.PRIMARY}
                            onClick={() => console.log('Confirmed')}
                        />

                        <Button
                            text="Cancel"
                            buttonType={ButtonType.SECONDARY}
                            onClick={() => console.log('Cancelled')}
                        />
                    </div>
                </div>
            </PopoverV2>
        </ComponentPreview>
    )
}

export default PopoverV2Preview
