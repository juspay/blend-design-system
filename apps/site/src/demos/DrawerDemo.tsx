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
    StatusDrawer,
    MultiSelectDrawer,
    SingleSelectDrawer,
} from '../../../../packages/blend/lib/components/Drawer'
import { ButtonType } from '../../../../packages/blend/lib/components/Button'
import ResponsiveSelectDemo from './ResponsiveSelectDemo'

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
                <DrawerContent hasSnapPoints={true}>
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

// Snap Points Example
export const SnapPointsDrawerExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
        >
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
                    Open Snap Points Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    hasSnapPoints={true}
                    style={{ maxWidth: '448px', margin: '0 auto' }}
                >
                    <DrawerBody overflowY={snap === 1 ? 'auto' : 'hidden'}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                padding: '20px 0',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        style={{
                                            color: '#fbbf24',
                                            height: '20px',
                                            width: '20px',
                                        }}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <h3
                                style={{
                                    fontSize: '24px',
                                    margin: '8px 0',
                                    fontWeight: '500',
                                }}
                            >
                                The Hidden Details
                            </h3>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    margin: '4px 0 24px 0',
                                }}
                            >
                                40 videos, 20+ exercises
                            </p>
                            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                                The world of user interface design is an
                                intricate landscape filled with hidden details
                                and nuance. In this course, you will learn
                                something cool. To the untrained eye, a
                                beautifully designed UI.
                            </p>
                            <button
                                style={{
                                    backgroundColor: '#000',
                                    color: 'white',
                                    marginTop: '32px',
                                    borderRadius: '6px',
                                    height: '48px',
                                    border: 'none',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}
                            >
                                Buy for $199
                            </button>
                            <div style={{ marginTop: '48px' }}>
                                <h4
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        margin: '0 0 16px 0',
                                    }}
                                >
                                    Module 01. The Details
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Layers of UI
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            A basic introduction to Layers of
                                            Design.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Typography
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            The fundamentals of type.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            UI Animations
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Going through the right easings and
                                            durations.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '48px' }}>
                                <figure>
                                    <blockquote
                                        style={{
                                            fontStyle: 'italic',
                                            color: '#374151',
                                        }}
                                    >
                                        "I especially loved the hidden details
                                        video. That was so useful, learned a lot
                                        by just reading it. Can't wait for more
                                        course content!"
                                    </blockquote>
                                    <figcaption>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                color: '#6b7280',
                                                marginTop: '8px',
                                                display: 'block',
                                            }}
                                        >
                                            Yvonne Ray, Frontend Developer
                                        </span>
                                    </figcaption>
                                </figure>
                            </div>
                            <div style={{ marginTop: '48px' }}>
                                <h4
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        margin: '0 0 16px 0',
                                    }}
                                >
                                    Module 02. The Process
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '16px',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Build
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Create cool components to practice.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            User Insight
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Find out what users think and
                                            fine-tune.
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                marginBottom: '4px',
                                            }}
                                        >
                                            Putting it all together
                                        </div>
                                        <div style={{ color: '#6b7280' }}>
                                            Let's build an app together and
                                            apply everything.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Non-Modal Snap Points Example
export const NonModalSnapPointsExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
            modal={false}
        >
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
                    Non-Modal Snap Points
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    hasSnapPoints={true}
                    style={{ maxWidth: '448px', margin: '0 auto' }}
                >
                    <DrawerBody overflowY={snap === 1 ? 'auto' : 'hidden'}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginBottom: '16px',
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <svg
                                    key={i}
                                    style={{
                                        color: '#fbbf24',
                                        height: '20px',
                                        width: '20px',
                                    }}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                            <svg
                                style={{
                                    color: '#d1d5db',
                                    height: '20px',
                                    width: '20px',
                                }}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h3
                            style={{
                                fontSize: '24px',
                                margin: '8px 0',
                                fontWeight: '500',
                            }}
                        >
                            The Hidden Details
                        </h3>
                        <p
                            style={{
                                fontSize: '14px',
                                color: '#6b7280',
                                margin: '4px 0 24px 0',
                            }}
                        >
                            2 modules, 27 hours of video
                        </p>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                            This drawer combines snap points with non-modal
                            behavior. You can click on other elements on the
                            page while the drawer is open.
                        </p>
                        <p
                            style={{
                                color: '#6b7280',
                                lineHeight: '1.6',
                                marginTop: '16px',
                            }}
                        >
                            Try dragging the drawer to different snap points and
                            then clicking on other buttons on the page.
                        </p>
                        <button
                            style={{
                                backgroundColor: '#000',
                                color: 'white',
                                marginTop: '32px',
                                borderRadius: '6px',
                                height: '48px',
                                border: 'none',
                                fontWeight: '500',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            Buy for $199
                        </button>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Sequential Snap Points Example
export const SequentialSnapPointsExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
            snapToSequentialPoint
        >
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
                    Sequential Snap Points
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent hasSnapPoints={true}>
                    <DrawerHeader>
                        <DrawerTitle>Sequential Snap Points</DrawerTitle>
                        <DrawerDescription>
                            This drawer snaps to points sequentially, ignoring
                            velocity.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            With sequential snap points enabled, the drawer will
                            always snap to the next/previous snap point
                            regardless of how fast you drag it.
                        </p>
                        <p>
                            This means you can't skip snap points even with a
                            fast swipe gesture.
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Custom Fade Index Example
export const CustomFadeIndexExample = () => {
    const snapPoints = ['148px', '355px', 1]
    const [snap, setSnap] = useState<number | string | null>(
        snapPoints[0] as string
    )

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            onSnapPointChange={setSnap}
            fadeFromIndex={1}
        >
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
                    Custom Fade Index
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent hasSnapPoints={true}>
                    <DrawerHeader>
                        <DrawerTitle>Custom Fade Index</DrawerTitle>
                        <DrawerDescription>
                            This drawer starts fading from the second snap point
                            (index 1).
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            By setting fadeFromIndex to 1, the drawer will start
                            fading the overlay from the second snap point
                            instead of the last one.
                        </p>
                        <p>
                            Try dragging to different snap points to see the
                            fade effect.
                        </p>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Non-Dismissible Example
export const NonDismissibleExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Drawer dismissible={false} open={isOpen} onOpenChange={setIsOpen}>
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
                    Non-Dismissible Drawer
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Non-Dismissible Drawer</DrawerTitle>
                        <DrawerDescription>
                            This drawer can only be closed programmatically.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            This drawer cannot be dismissed by clicking outside,
                            pressing escape, or dragging down.
                        </p>
                        <p>You must use the close button below to close it.</p>
                    </DrawerBody>
                    <DrawerFooter>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            Close Drawer
                        </button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

// Status Drawer Examples
export const StatusDrawerSuccessExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
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
                Success Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Are you sure you want to delete?"
                description="This will delete the entry. You might not be able to retrieve again ever."
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#ddd6fe',
                            borderRadius: '8px',
                            border: '2px dashed #8b5cf6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>🗑️</span>
                    </div>
                }
                secondaryButtonProps={{
                    buttonType: ButtonType.SECONDARY,
                    text: 'Cancel',
                    onClick: () => setOpen(false),
                }}
                primaryButtonProps={{
                    buttonType: ButtonType.DANGER,
                    text: 'Delete',
                    onClick: () => {
                        console.log('Item deleted!')
                        setOpen(false)
                    },
                }}
            />
        </>
    )
}

export const StatusDrawerErrorExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
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
                Error Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Connection Failed"
                description="Unable to connect to the server. Please check your internet connection and try again."
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#fecaca',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px', color: '#dc2626' }}>
                            ✕
                        </span>
                    </div>
                }
                primaryButtonProps={{
                    buttonType: ButtonType.PRIMARY,
                    text: 'Try Again',
                    onClick: () => setOpen(false),
                }}
            />
        </>
    )
}

export const StatusDrawerWarningExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
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
                Warning Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Storage Almost Full"
                description="You're running out of storage space. Consider upgrading your plan or deleting some files."
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#fef3c7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px', color: '#f59e0b' }}>
                            ⚠️
                        </span>
                    </div>
                }
                primaryButtonProps={{
                    buttonType: ButtonType.PRIMARY,
                    text: 'Upgrade Plan',
                    onClick: () => setOpen(false),
                }}
            />
        </>
    )
}

export const StatusDrawerInfoExample = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
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
                Info Status
            </button>
            <StatusDrawer
                open={open}
                onOpenChange={setOpen}
                heading="New Feature Available"
                description="We've added a new feature that helps you organize your files better. Check it out!"
                slot={
                    <div
                        style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#dbeafe',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '24px', color: '#3b82f6' }}>
                            ℹ️
                        </span>
                    </div>
                }
                primaryButtonProps={{
                    buttonType: ButtonType.PRIMARY,
                    text: 'Learn More',
                    onClick: () => setOpen(false),
                }}
            />
        </>
    )
}

// Multi-Select Drawer Example with Rich Data
export const MultiSelectDrawerExample = () => {
    const [open, setOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([
        'credit_card',
        'typescript',
        'figma',
    ])

    const menuItems = [
        {
            items: [
                {
                    value: 'credit_card',
                    label: 'Credit Card',
                    subLabel: 'Visa, Mastercard, Amex',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dbeafe',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            💳
                        </span>
                    ),
                },
                {
                    value: 'paypal',
                    label: 'PayPal',
                    subLabel: 'Pay with your PayPal account',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fef3c7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🅿️
                        </span>
                    ),
                },
                {
                    value: 'apple_pay',
                    label: 'Apple Pay',
                    subLabel: 'Touch ID or Face ID',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#f3f4f6',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🍎
                        </span>
                    ),
                },
                {
                    value: 'google_pay',
                    label: 'Google Pay',
                    subLabel: 'Pay with Google',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fecaca',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🔴
                        </span>
                    ),
                },
                {
                    value: 'bank_transfer',
                    label: 'Bank Transfer',
                    subLabel: 'Direct bank transfer',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dcfce7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🏦
                        </span>
                    ),
                },
                {
                    value: 'javascript',
                    label: 'JavaScript',
                    subLabel: 'Popular web language',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fef3c7',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#f59e0b',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            JS
                        </span>
                    ),
                },
                {
                    value: 'typescript',
                    label: 'TypeScript',
                    subLabel: 'Typed JavaScript',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dbeafe',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#3b82f6',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            TS
                        </span>
                    ),
                },
                {
                    value: 'python',
                    label: 'Python',
                    subLabel: 'Versatile language',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dcfce7',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#10b981',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            PY
                        </span>
                    ),
                },
                {
                    value: 'react',
                    label: 'React',
                    subLabel: 'UI library',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#e0f2fe',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            ⚛️
                        </span>
                    ),
                },
                {
                    value: 'vue',
                    label: 'Vue.js',
                    subLabel: 'Progressive framework',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dcfce7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🟢
                        </span>
                    ),
                },
                {
                    value: 'angular',
                    label: 'Angular',
                    subLabel: 'Full framework',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fecaca',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🅰️
                        </span>
                    ),
                },
                {
                    value: 'figma',
                    label: 'Figma',
                    subLabel: 'Design collaboration',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fdf2f8',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            🎨
                        </span>
                    ),
                },
                {
                    value: 'sketch',
                    label: 'Sketch',
                    subLabel: 'Mac design tool',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fef3c7',
                                padding: '6px',
                                borderRadius: '6px',
                                fontSize: '16px',
                            }}
                        >
                            ✏️
                        </span>
                    ),
                },
                {
                    value: 'adobe_xd',
                    label: 'Adobe XD',
                    subLabel: 'Adobe design tool',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#fdf2f8',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#ec4899',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            XD
                        </span>
                    ),
                },
                {
                    value: 'photoshop',
                    label: 'Photoshop',
                    subLabel: 'Image editing',
                    slot1: (
                        <span
                            style={{
                                backgroundColor: '#dbeafe',
                                padding: '6px',
                                borderRadius: '6px',
                                color: '#3b82f6',
                                fontWeight: 'bold',
                                fontSize: '12px',
                            }}
                        >
                            PS
                        </span>
                    ),
                },
            ],
        },
    ]

    const handleSelectionChange = (newSelection: string[]) => {
        setSelectedItems(newSelection)
    }

    const handleConfirm = () => {
        console.log('Selected items:', selectedItems)
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
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
                Multi-Select Drawer ({selectedItems.length} selected)
            </button>
            <MultiSelectDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Select Your Skills"
                description="Choose all the technologies and tools you're proficient in"
                rightSlot={
                    <div
                        style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#8b5cf6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'white' }}>
                            ✨
                        </span>
                    </div>
                }
                items={menuItems}
                selectedValues={selectedItems}
                onSelectionChange={handleSelectionChange}
                enableSearch={true}
                searchPlaceholder="Search skills..."
                cancelText="Clear All"
                confirmText="Save Selection"
                onConfirm={handleConfirm}
            />
        </>
    )
}

// Single-Select Drawer Example
export const SingleSelectDrawerExample = () => {
    const [open, setOpen] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState<string>('us')

    const countryItems = [
        {
            items: [
                {
                    value: 'us',
                    label: 'United States',
                    subLabel: 'North America',
                    slot1: <span style={{ fontSize: '20px' }}>🇺🇸</span>,
                },
                {
                    value: 'uk',
                    label: 'United Kingdom',
                    subLabel: 'Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇬🇧</span>,
                },
                {
                    value: 'ca',
                    label: 'Canada',
                    subLabel: 'North America',
                    slot1: <span style={{ fontSize: '20px' }}>🇨🇦</span>,
                },
                {
                    value: 'au',
                    label: 'Australia',
                    subLabel: 'Oceania',
                    slot1: <span style={{ fontSize: '20px' }}>🇦🇺</span>,
                },
                {
                    value: 'de',
                    label: 'Germany',
                    subLabel: 'Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇩🇪</span>,
                },
                {
                    value: 'jp',
                    label: 'Japan',
                    subLabel: 'East Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇯🇵</span>,
                },
                {
                    value: 'kr',
                    label: 'South Korea',
                    subLabel: 'East Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇰🇷</span>,
                },
                {
                    value: 'in',
                    label: 'India',
                    subLabel: 'South Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇮🇳</span>,
                },
                {
                    value: 'sg',
                    label: 'Singapore',
                    subLabel: 'Southeast Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇸🇬</span>,
                },
                {
                    value: 'cn',
                    label: 'China',
                    subLabel: 'East Asia',
                    slot1: <span style={{ fontSize: '20px' }}>🇨🇳</span>,
                },
                {
                    value: 'fr',
                    label: 'France',
                    subLabel: 'Western Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇫🇷</span>,
                },
                {
                    value: 'es',
                    label: 'Spain',
                    subLabel: 'Southern Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇪🇸</span>,
                },
                {
                    value: 'it',
                    label: 'Italy',
                    subLabel: 'Southern Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇮🇹</span>,
                },
                {
                    value: 'nl',
                    label: 'Netherlands',
                    subLabel: 'Western Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇳🇱</span>,
                },
                {
                    value: 'se',
                    label: 'Sweden',
                    subLabel: 'Northern Europe',
                    slot1: <span style={{ fontSize: '20px' }}>🇸🇪</span>,
                },
                {
                    value: 'br',
                    label: 'Brazil',
                    subLabel: 'South America',
                    slot1: <span style={{ fontSize: '20px' }}>🇧🇷</span>,
                },
                {
                    value: 'mx',
                    label: 'Mexico',
                    subLabel: 'North America',
                    slot1: <span style={{ fontSize: '20px' }}>🇲🇽</span>,
                },
                {
                    value: 'ar',
                    label: 'Argentina',
                    subLabel: 'South America',
                    slot1: <span style={{ fontSize: '20px' }}>🇦🇷</span>,
                },
                {
                    value: 'cl',
                    label: 'Chile',
                    subLabel: 'South America',
                    slot1: <span style={{ fontSize: '20px' }}>🇨🇱</span>,
                },
            ],
        },
    ]

    const handleValueChange = (value: string) => {
        setSelectedCountry(value)
    }

    const handleConfirm = () => {
        console.log('Selected country:', selectedCountry)
        setOpen(false)
    }

    const getSelectedCountryLabel = () => {
        for (const group of countryItems) {
            const item = group.items.find(
                (item) => item.value === selectedCountry
            )
            if (item) return item.label
        }
        return 'Select Country'
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
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
                Single-Select: {getSelectedCountryLabel()}
            </button>
            <SingleSelectDrawer
                open={open}
                onOpenChange={setOpen}
                heading="Select Your Country"
                description="Choose your country of residence"
                rightSlot={
                    <div
                        style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: '#10b981',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'white' }}>
                            🌍
                        </span>
                    </div>
                }
                items={countryItems}
                selectedValue={selectedCountry}
                onValueChange={handleValueChange}
                enableSearch={true}
                searchPlaceholder="Search countries..."
                cancelText="Clear"
                confirmText="Select Country"
                onConfirm={handleConfirm}
            />
        </>
    )
}

// Custom Mobile Offset Example
export const CustomMobileOffsetExample = () => {
    return (
        <Drawer
            mobileOffset={{
                top: '100px',
                bottom: '32px',
                left: '24px',
                right: '24px',
            }}
        >
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
                    Custom Mobile Offset
                </button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    mobileOffset={{
                        top: '100px',
                        bottom: '32px',
                        left: '24px',
                        right: '24px',
                    }}
                >
                    <DrawerHeader>
                        <DrawerTitle>Custom Mobile Offset</DrawerTitle>
                        <DrawerDescription>
                            This drawer has custom mobile offset values: top:
                            100px, bottom: 32px, left/right: 24px
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerBody>
                        <p>
                            You can customize the mobile offset by passing the
                            `mobileOffset` prop to both the Drawer and
                            DrawerContent components.
                        </p>
                        <p>
                            Default values are: top: 74px, bottom/left/right:
                            16px
                        </p>
                        <p>
                            This example uses larger offsets to demonstrate the
                            customization capability.
                        </p>
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
                gap: '24px',
                padding: '20px',
            }}
        >
            <div>
                <h2 style={{ marginBottom: '8px' }}>Basic Drawer Examples</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <BasicDrawerExample />
                    <NestedDrawerExample />
                    <SideDrawerExample />
                    <LeftSideDrawerExample />
                    <TopDrawerExample />
                    <ScrollableDrawerExample />
                    <ControlledDrawerExample />
                    <CustomMobileOffsetExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Snap Points Examples</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <SnapPointsDrawerExample />
                    <NonModalSnapPointsExample />
                    <SequentialSnapPointsExample />
                    <CustomFadeIndexExample />
                    <NonDismissibleExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Status Drawer Examples</h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    Status drawers are pre-built variants for displaying status
                    messages with an icon, heading, description, and action
                    button.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <StatusDrawerSuccessExample />
                    <StatusDrawerErrorExample />
                    <StatusDrawerWarningExample />
                    <StatusDrawerInfoExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>Select Drawer Examples</h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    Select drawers are specialized for selection interfaces with
                    search functionality, scrollable content, and dual-action
                    buttons (Clear All / Confirm).
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <MultiSelectDrawerExample />
                    <SingleSelectDrawerExample />
                </div>
            </div>

            <div>
                <h2 style={{ marginBottom: '8px' }}>
                    Responsive Select with Drawer
                </h2>
                <p style={{ marginBottom: '16px', color: '#6b7280' }}>
                    These select components automatically switch to drawer mode
                    on mobile devices, using MenuItem components inside the
                    drawer for consistent styling.
                </p>
                <ResponsiveSelectDemo />
            </div>
        </div>
    )
}

export default DrawerDemo
