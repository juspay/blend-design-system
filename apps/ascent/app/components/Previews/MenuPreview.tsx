'use client'
import {
    Menu,
    MenuAlignment,
    MenuSide,
    MenuItemV2Variant,
    MenuItemV2ActionType,
} from 'blend-v1'
import React from 'react'
import ComponentPreview from './ComponentPreview'
import { ButtonV2, ButtonTypeV2 } from 'blend-v1'
import { Settings, User, LogOut, ChevronDown } from 'lucide-react'

const MenuPreview = () => {
    const tsCode = `import { Menu, MenuAlignment, MenuSide, MenuItemV2Variant, MenuItemV2ActionType } from "blend-v1";
import { ButtonV2, ButtonTypeV2 } from "blend-v1";
import { Settings, User, LogOut, ChevronDown } from "lucide-react";

function MyComponent() {
  const menuItems = [
    {
      label: "Profile",
      slot1: <User size={16} />,
      onClick: () => console.log("Profile clicked"),
    },
    {
      label: "Settings",
      slot1: <Settings size={16} />,
      onClick: () => console.log("Settings clicked"),
    },
    {
      label: "Logout",
      slot1: <LogOut size={16} />,
      variant: MenuItemV2Variant.ACTION,
      actionType: MenuItemV2ActionType.DANGER,
      onClick: () => console.log("Logout clicked"),
    },
  ];

  return (
    <Menu
      trigger={<ButtonV2 text="Open Menu" buttonType={ButtonTypeV2.SECONDARY} trailingIcon={<ChevronDown size={16} />} />}
      items={[{ items: menuItems }]}
      alignment={MenuAlignment.CENTER}
      side={MenuSide.BOTTOM}
    />
  );
}`

    const reCode = `type menuAlignment = [#start | #center | #end]
type menuSide = [#top | #left | #right | #bottom]
type menuItemVariant = [#default | #action]
type menuItemActionType = [#primary | #danger]

type menuItem = {
  label: string,
  subLabel: option<string>,
  slot1: option<React.element>,
  slot2: option<React.element>,
  slot3: option<React.element>,
  slot4: option<React.element>,
  variant: option<menuItemVariant>,
  actionType: option<menuItemActionType>,
  disabled: option<bool>,
  onClick: option<unit => unit>,
  subMenu: option<array<menuItem>>,
}

type menuGroup = {
  label: option<string>,
  items: array<menuItem>,
  showSeparator: option<bool>,
}

@react.component
let make = () => {
  let menuItems = [
    {
      label: "Profile",
      slot1: Some(<User size=16 />),
      onClick: Some(() => Js.log("Profile clicked")),
    },
    {
      label: "Settings",
      slot1: Some(<Settings size=16 />),
      onClick: Some(() => Js.log("Settings clicked")),
    },
    {
      label: "Logout",
      slot1: Some(<LogOut size=16 />),
      variant: Some(#action),
      actionType: Some(#danger),
      onClick: Some(() => Js.log("Logout clicked")),
    },
  ]

  <Menu
    trigger={<ButtonV2 text="Open Menu" buttonType=#secondary trailingIcon=Some(<ChevronDown size=16 />) />}
    items=[{items: menuItems}]
    alignment=#center
    side=#bottom
  />
}`

    const bindingCode = `@module("blend-v1") @react.component
external make: (
  ~trigger: React.element,
  ~items: option<array<menuGroup>>=?,
  ~maxHeight: option<int>=?,
  ~minHeight: option<int>=?,
  ~maxWidth: option<int>=?,
  ~minWidth: option<int>=?,
  ~enableSearch: option<bool>=?,
  ~searchPlaceholder: option<string>=?,
  ~open: option<bool>=?,
  ~onOpenChange: option<bool => unit>=?,
  ~asModal: option<bool>=?,
  ~alignment: option<menuAlignment>=?,
  ~side: option<menuSide>=?,
  ~sideOffset: option<int>=?,
  ~alignOffset: option<int>=?,
  ~collisonBoundaryRef: option<Dom.element>=?,
) => React.element = "Menu"`

    const menuItems = [
        {
            label: 'Profile',
            slot1: <User size={16} />,
            onClick: () => console.log('Profile clicked'),
        },
        {
            label: 'Settings',
            slot1: <Settings size={16} />,
            onClick: () => console.log('Settings clicked'),
        },
        {
            label: 'Logout',
            slot1: <LogOut size={16} />,
            variant: MenuItemV2Variant.ACTION,
            actionType: MenuItemV2ActionType.DANGER,
            onClick: () => console.log('Logout clicked'),
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <Menu
                trigger={
                    <ButtonV2
                        text="Open Menu"
                        buttonType={ButtonTypeV2.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={[{ items: menuItems }]}
                alignment={MenuAlignment.CENTER}
                side={MenuSide.BOTTOM}
            />
        </ComponentPreview>
    )
}

export default MenuPreview
