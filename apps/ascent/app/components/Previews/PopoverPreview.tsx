'use client'
import { Popover, PopoverSize, ButtonTypeV2, ButtonSizeV2 } from 'blend-v1'
import React, { useState } from 'react'
import ComponentPreview from './ComponentPreview'

const PopoverPreview = () => {
    const [, setOpen] = useState(false)

    const tsCode = `import { Popover, PopoverSize, ButtonTypeV2, ButtonSizeV2 } from "blend-v1";

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      heading="Settings"
      description="Configure your preferences"
      trigger={<button>Open Popover</button>}
      size={PopoverSize.MEDIUM}
      showCloseButton={true}
      onOpenChange={setOpen}
      primaryAction={{
        text: "Save",
        buttonType: ButtonTypeV2.PRIMARY,
        size: ButtonSizeV2.SMALL,
        onClick: () => console.log("Saved"),
      }}
      secondaryAction={{
        text: "Cancel",
        buttonType: ButtonTypeV2.SECONDARY,
        size: ButtonSizeV2.SMALL,
        onClick: () => setOpen(false),
      }}
    >
      <div>Your popover content goes here</div>
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

    const bindingCode = `@module("blend-v1") @react.component
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
            <div className="m-4 min-w-100 space-y-8">
                {/* Basic Popover */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Basic Popover
                    </h3>
                    <Popover
                        heading="Basic Popover"
                        description="This is a simple popover with basic content"
                        trigger={
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Open Basic Popover
                            </button>
                        }
                        showCloseButton={true}
                        onOpenChange={setOpen}
                        primaryAction={{
                            text: 'Confirm',
                            buttonType: ButtonTypeV2.PRIMARY,
                            size: ButtonSizeV2.SMALL,
                            onClick: () => console.log('Confirmed'),
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            buttonType: ButtonTypeV2.SECONDARY,
                            size: ButtonSizeV2.SMALL,
                            onClick: () => setOpen(false),
                        }}
                    >
                        <div className="p-4">
                            <p className="text-gray-700">
                                This is the content area of the popover. You can
                                put any content here.
                            </p>
                        </div>
                    </Popover>
                </div>

                {/* Small Popover */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Small Popover
                    </h3>
                    <Popover
                        heading="Small Popover"
                        description="A smaller variant of the popover"
                        trigger={
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Open Small Popover
                            </button>
                        }
                        size={PopoverSize.SMALL}
                        showCloseButton={true}
                        primaryAction={{
                            text: 'Save',
                            buttonType: ButtonTypeV2.PRIMARY,
                            size: ButtonSizeV2.SMALL,
                            onClick: () => console.log('Saved'),
                        }}
                    >
                        <div className="p-4">
                            <p className="text-gray-700 text-sm">
                                This is a small popover with compact styling.
                            </p>
                        </div>
                    </Popover>
                </div>

                {/* Popover without Actions */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Popover without Actions
                    </h3>
                    <Popover
                        heading="Information"
                        description="This popover has no action buttons"
                        trigger={
                            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                                Open Info Popover
                            </button>
                        }
                        showCloseButton={true}
                    >
                        <div className="p-4">
                            <p className="text-gray-700">
                                This popover is for informational purposes only.
                                It has no action buttons.
                            </p>
                        </div>
                    </Popover>
                </div>

                {/* Popover with Custom Positioning */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Custom Positioning
                    </h3>
                    <Popover
                        heading="Top Positioned"
                        description="This popover appears on top"
                        trigger={
                            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                                Open Top Popover
                            </button>
                        }
                        side="top"
                        align="center"
                        showCloseButton={true}
                        primaryAction={{
                            text: 'OK',
                            buttonType: ButtonTypeV2.PRIMARY,
                            size: ButtonSizeV2.SMALL,
                            onClick: () => console.log('OK clicked'),
                        }}
                    >
                        <div className="p-4">
                            <p className="text-gray-700">
                                This popover is positioned on top of the trigger
                                element.
                            </p>
                        </div>
                    </Popover>
                </div>

                {/* Popover with Rich Content */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Rich Content Popover
                    </h3>
                    <Popover
                        heading="Settings"
                        description="Configure your application preferences"
                        trigger={
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Open Settings
                            </button>
                        }
                        showCloseButton={true}
                        primaryAction={{
                            text: 'Apply',
                            buttonType: ButtonTypeV2.PRIMARY,
                            size: ButtonSizeV2.SMALL,
                            onClick: () => console.log('Settings applied'),
                        }}
                        secondaryAction={{
                            text: 'Reset',
                            buttonType: ButtonTypeV2.SECONDARY,
                            size: ButtonSizeV2.SMALL,
                            onClick: () => console.log('Settings reset'),
                        }}
                    >
                        <div className="p-4 space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Theme
                                </h4>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value="light"
                                            className="mr-2"
                                        />
                                        Light
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value="dark"
                                            className="mr-2"
                                        />
                                        Dark
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Notifications
                                </h4>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    Enable notifications
                                </label>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default PopoverPreview
