import type React from 'react'
import type { Drawer as VaulDrawer } from 'vaul'

export type DrawerV2RootRef = unknown
export type DrawerV2RootProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Root
>

export type DrawerV2NestedRootRef = unknown
export type DrawerV2NestedRootProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.NestedRoot
>

export type DrawerV2TriggerRef = React.ComponentRef<typeof VaulDrawer.Trigger>
export type DrawerV2TriggerProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Trigger
>

export type DrawerV2PortalRef = unknown
export type DrawerV2PortalProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Portal
>

export type DrawerV2OverlayRef = React.ElementRef<typeof VaulDrawer.Overlay>
export type DrawerV2OverlayProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Overlay
>

export type DrawerV2ContentRef = React.ComponentRef<typeof VaulDrawer.Content>
export type DrawerV2ContentProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Content
>

export type DrawerV2TitleRef = React.ComponentRef<typeof VaulDrawer.Title>
export type DrawerV2TitleProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Title
>

export type DrawerV2DescriptionRef = React.ComponentRef<
    typeof VaulDrawer.Description
>
export type DrawerV2DescriptionProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Description
>

export type DrawerV2CloseRef = React.ComponentRef<typeof VaulDrawer.Close>
export type DrawerV2CloseProps = React.ComponentPropsWithoutRef<
    typeof VaulDrawer.Close
>

export type DrawerV2HeaderRef = HTMLDivElement
export type DrawerV2HeaderProps = React.HTMLAttributes<HTMLDivElement>

export type DrawerV2BodyRef = HTMLDivElement
export type DrawerV2BodyProps = React.HTMLAttributes<HTMLDivElement>

export type DrawerV2FooterRef = HTMLDivElement
export type DrawerV2FooterProps = React.HTMLAttributes<HTMLDivElement>
