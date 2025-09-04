'use client'
import {
    Popover,
    PopoverSize,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const PopoverPreview = () => {
    const [open, setOpen] = useState(false)

    const tsCode = `import { Popover, PopoverSize, Button, ButtonType, ButtonSize } from "@juspay/blend-design-system";

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      heading="Account Settings"
      description="Manage your account preferences"
      trigger={
        <Button
          text="Settings"
          buttonType={ButtonType.SECONDARY}
        />
      }
      open={open}
      onOpenChange={setOpen}
      size={PopoverSize.MEDIUM}
      primaryAction={{
        text: "Save Changes",
        buttonType: ButtonType.PRIMARY,
        onClick: () => {
          console.log("Settings saved");
          setOpen(false);
        },
      }}
      secondaryAction={{
        text: "Cancel",
        buttonType: ButtonType.SECONDARY,
        onClick: () => setOpen(false),
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">
            Display Name
          </label>
          <input
            type="text"
            placeholder="Enter your display name"
            className="w-full px-3 py-2 border rounded-md text-gray-900"
          />
        </div>
        <div>
          <label className="flex items-center text-gray-900">
            <input type="checkbox" className="mr-2" />
            Enable email notifications
          </label>
        </div>
      </div>
    </Popover>
  );
}`

    const reCode = `type popoverSize = [#small | #medium]
type buttonTypeV2 = [#primary | #secondary | #danger | #success]
type buttonSizeV2 = [#small | #medium | #large]

@react.component
let make = (
  ~heading: option<string>=?,
  ~description: option<string>=?,
  ~trigger: React.element,
  ~children: React.element,
  ~showCloseButton: option<bool>=?,
  ~onOpenChange: option<bool => unit>=?,
  ~open: option<bool>=?,
  ~asModal: option<bool>=?,
  ~primaryAction: option<{text: string, buttonType: buttonTypeV2, size: buttonSizeV2, onClick: unit => unit}>=?,
  ~secondaryAction: option<{text: string, buttonType: buttonTypeV2, size: buttonSizeV2, onClick: unit => unit}>=?,
  ~sideOffset: option<int>=?,
  ~side: option<[#top | #right | #bottom | #left]>=?,
  ~align: option<[#start | #center | #end]>=?,
  ~alignOffset: option<int>=?,
  ~width: option<int>=?,
  ~minWidth: option<int>=?,
  ~maxWidth: option<int>=?,
  ~height: option<int>=?,
  ~minHeight: option<int>=?,
  ~maxHeight: option<int>=?,
  ~zIndex: option<int>=?,
  ~size: option<popoverSize>=?,
  ~onClose: option<unit => unit>=?,
) => {
  <PopoverBinding
    ?heading
    ?description
    trigger
    children
    ?showCloseButton
    ?onOpenChange
    ?open
    ?asModal
    ?primaryAction
    ?secondaryAction
    ?sideOffset
    ?side
    ?align
    ?alignOffset
    ?width
    ?minWidth
    ?maxWidth
    ?height
    ?minHeight
    ?maxHeight
    ?zIndex
    ?size
    ?onClose
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~heading: string=?,
  ~description: string=?,
  ~trigger: React.element,
  ~children: React.element,
  ~showCloseButton: bool=?,
  ~onOpenChange: bool => unit=?,
  ~open: bool=?,
  ~asModal: bool=?,
  ~primaryAction: {text: string, buttonType: [#primary | #secondary | #danger | #success], size: [#small | #medium | #large], onClick: unit => unit}=?,
  ~secondaryAction: {text: string, buttonType: [#primary | #secondary | #danger | #success], size: [#small | #medium | #large], onClick: unit => unit}=?,
  ~sideOffset: int=?,
  ~side: [#top | #right | #bottom | #left]=?,
  ~align: [#start | #center | #end]=?,
  ~alignOffset: int=?,
  ~width: int=?,
  ~minWidth: int=?,
  ~maxWidth: int=?,
  ~height: int=?,
  ~minHeight: int=?,
  ~maxHeight: int=?,
  ~zIndex: int=?,
  ~size: [#small | #medium]=?,
  ~onClose: unit => unit=?,
) => React.element = "Popover"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <Popover
                heading="Account Settings"
                description="Manage your account preferences and settings"
                trigger={
                    <Button text="Settings" buttonType={ButtonType.SECONDARY} />
                }
                open={open}
                onOpenChange={setOpen}
                size={PopoverSize.MEDIUM}
                side="bottom"
                align="center"
                primaryAction={{
                    text: 'Save Changes',
                    buttonType: ButtonType.PRIMARY,
                    onClick: () => {
                        console.log('Settings saved')
                        setOpen(false)
                    },
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonType.SECONDARY,
                    onClick: () => setOpen(false),
                }}
                showCloseButton={true}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900">
                            Display Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your display name"
                            className="w-full px-3 py-2 border rounded-md text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="flex items-center text-gray-900">
                            <input type="checkbox" className="mr-2" />
                            Enable email notifications
                        </label>
                    </div>
                </div>
            </Popover>
        </ComponentPreview>
    )
}

export default PopoverPreview
