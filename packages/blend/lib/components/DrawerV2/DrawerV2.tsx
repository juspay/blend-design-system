'use client'

import { forwardRef } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import type {
    DrawerV2BodyProps,
    DrawerV2BodyRef,
    DrawerV2CloseProps,
    DrawerV2CloseRef,
    DrawerV2ContentProps,
    DrawerV2ContentRef,
    DrawerV2DescriptionProps,
    DrawerV2DescriptionRef,
    DrawerV2FooterProps,
    DrawerV2FooterRef,
    DrawerV2HeaderProps,
    DrawerV2HeaderRef,
    DrawerV2NestedRootProps,
    DrawerV2NestedRootRef,
    DrawerV2OverlayProps,
    DrawerV2OverlayRef,
    DrawerV2PortalProps,
    DrawerV2PortalRef,
    DrawerV2RootProps,
    DrawerV2RootRef,
    DrawerV2TitleProps,
    DrawerV2TitleRef,
    DrawerV2TriggerProps,
    DrawerV2TriggerRef,
} from './types'

const DrawerV2 = forwardRef<DrawerV2RootRef, DrawerV2RootProps>(
    ({ ...props }, ref) => {
        void ref
        return <VaulDrawer.Root {...props} />
    }
)
DrawerV2.displayName = 'DrawerV2'

export const DrawerV2NestedRoot = forwardRef<
    DrawerV2NestedRootRef,
    DrawerV2NestedRootProps
>(({ ...props }, ref) => {
    void ref
    return <VaulDrawer.NestedRoot {...props} />
})
DrawerV2NestedRoot.displayName = 'DrawerV2NestedRoot'

export const DrawerV2Trigger = forwardRef<
    DrawerV2TriggerRef,
    DrawerV2TriggerProps
>(({ ...props }, ref) => {
    return <VaulDrawer.Trigger ref={ref} {...props} />
})
DrawerV2Trigger.displayName = 'DrawerV2Trigger'

export const DrawerV2Portal = forwardRef<
    DrawerV2PortalRef,
    DrawerV2PortalProps
>(({ ...props }, ref) => {
    void ref
    return <VaulDrawer.Portal {...props} />
})
DrawerV2Portal.displayName = 'DrawerV2Portal'

export const DrawerV2Overlay = forwardRef<
    DrawerV2OverlayRef,
    DrawerV2OverlayProps
>(({ ...props }, ref) => {
    return <VaulDrawer.Overlay ref={ref} {...props} />
})
DrawerV2Overlay.displayName = 'DrawerV2Overlay'

export const DrawerV2Content = forwardRef<
    DrawerV2ContentRef,
    DrawerV2ContentProps
>(({ ...props }, ref) => {
    return <VaulDrawer.Content ref={ref} {...props} />
})
DrawerV2Content.displayName = 'DrawerV2Content'

export const DrawerV2Title = forwardRef<DrawerV2TitleRef, DrawerV2TitleProps>(
    ({ ...props }, ref) => {
        return <VaulDrawer.Title ref={ref} {...props} />
    }
)
DrawerV2Title.displayName = 'DrawerV2Title'

export const DrawerV2Description = forwardRef<
    DrawerV2DescriptionRef,
    DrawerV2DescriptionProps
>(({ ...props }, ref) => {
    return <VaulDrawer.Description ref={ref} {...props} />
})
DrawerV2Description.displayName = 'DrawerV2Description'

export const DrawerV2Close = forwardRef<DrawerV2CloseRef, DrawerV2CloseProps>(
    ({ ...props }, ref) => {
        return <VaulDrawer.Close ref={ref} {...props} />
    }
)
DrawerV2Close.displayName = 'DrawerV2Close'

export const DrawerV2Header = forwardRef<
    DrawerV2HeaderRef,
    DrawerV2HeaderProps
>(({ ...props }, ref) => {
    return <div ref={ref} {...props} />
})
DrawerV2Header.displayName = 'DrawerV2Header'

export const DrawerV2Body = forwardRef<DrawerV2BodyRef, DrawerV2BodyProps>(
    ({ ...props }, ref) => {
        return <div ref={ref} {...props} />
    }
)
DrawerV2Body.displayName = 'DrawerV2Body'

export const DrawerV2Footer = forwardRef<
    DrawerV2FooterRef,
    DrawerV2FooterProps
>(({ ...props }, ref) => {
    return <div ref={ref} {...props} />
})
DrawerV2Footer.displayName = 'DrawerV2Footer'

export default DrawerV2
