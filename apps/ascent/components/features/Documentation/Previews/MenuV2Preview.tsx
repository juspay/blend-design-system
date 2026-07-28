'use client'
import { MenuV2, Button, ButtonType } from '@juspay/blend-design-system'
import { Gear, SignOut, User } from '@phosphor-icons/react'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const MenuV2Preview = () => {
    const tsCode = `import { MenuV2, Button } from '@juspay/blend-design-system'

function MyComponent() {
    const items = [
        {
            label: 'Account',
            items: [
                {
                    label: { text: 'Profile', leftSlot: <User /> },
                    onClick: () => console.log('Profile')
                },
                {
                    label: { text: 'Settings', leftSlot: <Gear /> },
                    onClick: () => console.log('Settings')
                },
                {
                    label: { text: 'Sign Out', leftSlot: <SignOut /> },
                    onClick: () => console.log('Sign Out')
                },
            ],
        },
    ]

    return (
        <MenuV2
            trigger={<Button text="Open Menu" />}
            items={items}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let items = [
    {
      label: "Account",
      items: [
        {label: {text: "Profile"}, onClick: () => ()},
        {label: {text: "Settings"}, onClick: () => ()}
      ]
    }
  ]

  <MenuV2Binding
    trigger={<ButtonBinding text="Open Menu" />}
    items={items}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~trigger: React.element,
  ~items: array<'a>=?,
  ~enableSearch: bool=?,
  ~open: bool=?,
  ~onOpenChange: bool => unit=?,
  ~alignment: [#start | #center | #end]=?,
  ~side: [#top | #left | #right | #bottom]=?,
) => React.element = "MenuV2"`

    const items = [
        {
            label: 'Account',
            items: [
                {
                    label: { text: 'Profile', leftSlot: <User size={16} /> },
                    onClick: () => console.log('Profile'),
                },
                {
                    label: { text: 'Settings', leftSlot: <Gear size={16} /> },
                    onClick: () => console.log('Settings'),
                },
                {
                    label: {
                        text: 'Sign Out',
                        leftSlot: <SignOut size={16} />,
                    },
                    onClick: () => console.log('Sign Out'),
                },
            ],
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <MenuV2
                trigger={
                    <Button text="Open Menu" buttonType={ButtonType.PRIMARY} />
                }
                items={items}
            />
        </ComponentPreview>
    )
}

export default MenuV2Preview
