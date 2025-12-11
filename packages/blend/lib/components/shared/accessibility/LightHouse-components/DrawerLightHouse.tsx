import { useState, useEffect } from 'react'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
} from '../../../Drawer/Drawer'
import { Button, ButtonType } from '../../../Button'
import { useId } from 'react'

const DrawerLightHouse = () => {
    const baseId = useId()
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)

    // Open basic drawer automatically after a short delay to ensure page content is painted first
    // This allows Lighthouse to audit the drawer's accessibility features when it's open
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen1(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex flex-col gap-4 p-8 min-h-screen">
            {/* Page Content - Visible to Lighthouse */}
            <main role="main">
                <h1>Drawer Accessibility Testing</h1>
                <p>
                    This page demonstrates the Drawer component for Lighthouse
                    accessibility auditing. The basic drawer will open
                    automatically and contains accessible elements.
                </p>
            </main>

            {/* Basic Drawer - Opens automatically for Testing */}
            <div style={{ padding: '20px' }}>
                <Drawer open={open1} onOpenChange={setOpen1}>
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Basic Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle id={`${baseId}-title-1`}>
                                    Basic Drawer
                                </DrawerTitle>
                                <DrawerDescription id={`${baseId}-desc-1`}>
                                    This is a basic drawer example with header,
                                    body, and footer sections.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p>Drawer content goes here.</p>
                            </DrawerBody>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Cancel"
                                    />
                                </DrawerClose>
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    text="Confirm"
                                    onClick={() => setOpen1(false)}
                                />
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>

            {/* Drawer with Right Direction */}
            <div style={{ padding: '20px' }}>
                <Drawer open={open2} onOpenChange={setOpen2} direction="right">
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Right Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent direction="right" width={400}>
                            <DrawerHeader>
                                <DrawerTitle id={`${baseId}-title-2`}>
                                    Right Drawer
                                </DrawerTitle>
                                <DrawerDescription id={`${baseId}-desc-2`}>
                                    This drawer slides in from the right side.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <p>Content for right drawer.</p>
                            </DrawerBody>
                            <DrawerFooter direction="right">
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Close"
                                    />
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>

            {/* Drawer with Form Elements */}
            <div style={{ padding: '20px' }}>
                <Drawer open={open3} onOpenChange={setOpen3}>
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Form Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle id={`${baseId}-title-3`}>
                                    Form Drawer
                                </DrawerTitle>
                                <DrawerDescription id={`${baseId}-desc-3`}>
                                    This drawer contains form elements for
                                    testing accessibility.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <form>
                                    <div className="mb-4">
                                        <label
                                            htmlFor={`${baseId}-name`}
                                            className="block text-sm font-medium mb-1"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id={`${baseId}-name`}
                                            type="text"
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            aria-required="true"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor={`${baseId}-email`}
                                            className="block text-sm font-medium mb-1"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id={`${baseId}-email`}
                                            type="email"
                                            className="border border-gray-300 rounded px-3 py-2 w-full"
                                            aria-required="true"
                                        />
                                    </div>
                                </form>
                            </DrawerBody>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Cancel"
                                    />
                                </DrawerClose>
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    text="Submit"
                                    onClick={() => setOpen3(false)}
                                />
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>

            {/* Drawer with Multiple Interactive Elements */}
            <div style={{ padding: '20px' }}>
                <Drawer open={open4} onOpenChange={setOpen4}>
                    <DrawerTrigger>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Interactive Drawer"
                        />
                    </DrawerTrigger>
                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle id={`${baseId}-title-4`}>
                                    Interactive Drawer
                                </DrawerTitle>
                                <DrawerDescription id={`${baseId}-desc-4`}>
                                    This drawer contains multiple interactive
                                    elements for testing keyboard navigation.
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerBody>
                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Button 1
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-green-500 text-white rounded"
                                    >
                                        Button 2
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Test input"
                                        aria-label="Test input field"
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                    />
                                </div>
                            </DrawerBody>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Close"
                                    />
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        </div>
    )
}

export default DrawerLightHouse
