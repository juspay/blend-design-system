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

    return (
        <ComponentPreview ts={tsCode}>
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
