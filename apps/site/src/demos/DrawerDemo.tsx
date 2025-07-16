'use client'

import { useState } from 'react'

import {
    Drawer,
    DrawerTrigger,
    DrawerBody,
    DrawerPortal,
    DrawerDescription,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from '../../../../packages/blend/lib/components/Drawer'

export const BasicDrawerExample = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Drawer for React.</DrawerTitle>
                        <DrawerDescription>
                            This component can be used as a Dialog replacement
                            on mobile and tablet devices.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            This component can be used as a Dialog replacement
                            on mobile and tablet devices. You can read about why
                            and how it was built{' '}
                            <a
                                target="_blank"
                                href="https://emilkowal.ski/ui/building-a-drawer-component"
                                style={{ textDecoration: 'underline' }}
                            >
                                here
                            </a>
                            .
                        </p>
                        <p>
                            This one specifically is the most simplest setup you
                            can have, just a simple drawer with a trigger.
                        </p>
                    </DrawerBody>
                    <DrawerFooter>
                        <DrawerClose>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#f3f4f6',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </DrawerClose>
                        <DrawerClose>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                Submit
                            </button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Nested Drawer Example
export const NestedDrawerExample = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Nested Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Nested Drawers.</DrawerTitle>
                        <DrawerDescription>
                            Nesting drawers creates a Sonner-like stacking
                            effect.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            Nesting drawers creates a{' '}
                            <a
                                href="https://sonner.emilkowal.ski/"
                                target="_blank"
                                style={{ textDecoration: 'underline' }}
                            >
                                Sonner-like
                            </a>{' '}
                            stacking effect.
                        </p>
                        <p>
                            You can nest as many drawers as you want. All you
                            need to do is add a nested drawer component.
                        </p>

                        <Drawer nested>
                            <DrawerTrigger>
                                <button
                                    style={{
                                        marginTop: '16px',
                                        width: '100%',
                                        backgroundColor: '#1f2937',
                                        padding: '10px 14px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: 'white',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Open Second Drawer
                                </button>
                            </DrawerTrigger>
                            <DrawerPortal>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>
                                            This drawer is nested.
                                        </DrawerTitle>
                                        <DrawerDescription>
                                            If you pull this drawer down a bit,
                                            it'll scale the drawer underneath it
                                            as well.
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerBody>
                                        <p>
                                            If you pull this drawer down a bit,
                                            it'll scale the drawer underneath it
                                            as well.
                                        </p>
                                    </DrawerBody>
                                </DrawerContent>
                            </DrawerPortal>
                        </Drawer>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Side Drawer Example (Right)
export const SideDrawerExample = () => {
    return (
        <Drawer direction="right">
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Side Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent direction="right">
                    <DrawerHeader>
                        <DrawerTitle>It supports all directions.</DrawerTitle>
                        <DrawerDescription>
                            This one specifically is not touching the edge of
                            the screen, but that's not required for a side
                            drawer.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            This one specifically is not touching the edge of
                            the screen, but that's not required for a side
                            drawer.
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Left Side Drawer Example
export const LeftSideDrawerExample = () => {
    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Left Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent direction="left" showHandle={false}>
                    <DrawerHeader>
                        <DrawerTitle>Left Side Drawer</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>This drawer slides in from the left side.</p>
                        <p>Perfect for navigation menus or side panels.</p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Top Drawer Example
export const TopDrawerExample = () => {
    return (
        <Drawer direction="top">
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Top Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent direction="top">
                    <DrawerHeader>
                        <DrawerTitle>Top Drawer</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>This drawer slides down from the top.</p>
                        <p>Great for notifications or quick actions.</p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Scrollable Drawer Example
export const ScrollableDrawerExample = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Scrollable Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Ira Glass on Taste</DrawerTitle>
                        <DrawerDescription>
                            A scrollable drawer with long content.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            <p>
                                Nobody tells this to people who are beginners, I
                                wish someone told me. All of us who do creative
                                work, we get into it because we have good taste.
                            </p>
                            <p>
                                But there is this gap. For the first couple
                                years you make stuff, it's just not that good.
                                It's trying to be good, it has potential, but
                                it's not. But your taste, the thing that got you
                                into the game, is still killer. And your taste
                                is why your work disappoints you. A lot of
                                people never get past this phase, they quit.
                            </p>
                            <p>
                                Most people I know who do interesting, creative
                                work went through years of this. We know our
                                work doesn't have this special thing that we
                                want it to have. We all go through this. And if
                                you are just starting out or you are still in
                                this phase, you gotta know its normal and the
                                most important thing you can do is do a lot of
                                work
                            </p>
                            <p>
                                Put yourself on a deadline so that every week
                                you will finish one story. It is only by going
                                through a volume of work that you will close
                                that gap, and your work will be as good as your
                                ambitions. And I took longer to figure out how
                                to do this than anyone I've ever met. It's gonna
                                take awhile. It's normal to take awhile. You've
                                just gotta fight your way through.
                            </p>
                            <p>
                                Nobody tells this to people who are beginners, I
                                wish someone told me. All of us who do creative
                                work, we get into it because we have good taste.
                            </p>
                            <p>
                                But there is this gap. For the first couple
                                years you make stuff, it's just not that good.
                                It's trying to be good, it has potential, but
                                it's not. But your taste, the thing that got you
                                into the game, is still killer. And your taste
                                is why your work disappoints you. A lot of
                                people never get past this phase, they quit.
                            </p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Controlled Drawer Example
export const ControlledDrawerExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>
                <button
                    style={{
                        display: 'flex',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '0 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                    }}
                >
                    Open Controlled Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>A controlled drawer.</DrawerTitle>
                        <DrawerDescription>
                            This drawer's state is controlled programmatically.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            This means that the drawer no longer manages its own
                            state. Instead, you can control it programmatically
                            from the outside.
                        </p>
                        <p>
                            But you can still let the drawer help you a bit by
                            passing the `onOpenChange` prop. This way, the
                            drawer will change your open state when the user
                            clicks outside of it, or when they press the escape
                            key for example.
                        </p>
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                marginTop: '16px',
                                padding: '8px 16px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Close Programmatically
                        </button>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// All Examples Component
export const DrawerDemo = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '20px',
            }}
        >
            <h2>Drawer Examples</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <BasicDrawerExample />
                <NestedDrawerExample />
                <SideDrawerExample />
                <LeftSideDrawerExample />
                <TopDrawerExample />
                <ScrollableDrawerExample />
                <ControlledDrawerExample />
            </div>
        </div>
    )
}

export default DrawerDemo
