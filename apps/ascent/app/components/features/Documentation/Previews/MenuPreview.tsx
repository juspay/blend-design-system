'use client'
import {
    Menu,
    MenuAlignment,
    MenuSide,
    MenuItemVariant,
    MenuItemActionType,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'
import { Button, ButtonType } from '@juspay/blend-design-system'
import { Settings, User, LogOut, ChevronDown } from 'lucide-react'

const MenuPreview = () => {
    const tsCode = `import { Menu, MenuAlignment, MenuSide, MenuItemVariant, MenuItemActionType } from "@juspay/blend-design-system";
import { Button, ButtonType } from "@juspay/blend-design-system";
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
      variant: MenuItemVariant.ACTION,
      actionType: MenuItemActionType.DANGER,
      onClick: () => console.log("Logout clicked"),
    },
  ];

  return (
    <Menu
      trigger={<Button text="Open Menu" buttonType={ButtonType.SECONDARY} trailingIcon={<ChevronDown size={16} />} />}
      items={[{ items: menuItems }]}
      alignment={MenuAlignment.CENTER}
      side={MenuSide.BOTTOM}
    />
  );
}`

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
            variant: MenuItemVariant.ACTION,
            actionType: MenuItemActionType.DANGER,
            onClick: () => console.log('Logout clicked'),
        },
    ]

    return (
        <ComponentPreview ts={tsCode}>
            <Menu
                trigger={
                    <Button
                        text="Open Menu"
                        buttonType={ButtonType.SECONDARY}
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
