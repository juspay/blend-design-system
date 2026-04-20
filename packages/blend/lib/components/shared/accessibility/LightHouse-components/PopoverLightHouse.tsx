import { useState, useEffect } from 'react'
import Popover from '../../../Popover/Popover'
import { Button, ButtonType } from '../../../Button'

const PopoverLightHouse = () => {
    const [isOpen, setIsOpen] = useState(false)

    // Open popover after a short delay to ensure page content is painted first
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex flex-col gap-4 p-8 min-h-screen">
            {/* Page Content - Visible to Lighthouse */}
            <main role="main">
                <h1>Popover Accessibility Testing</h1>
                <p>
                    This page demonstrates the Popover component for Lighthouse
                    accessibility auditing. The popover will open automatically
                    and contains accessible elements.
                </p>
                <section>
                    <h2>Interactive Demo</h2>
                    <Popover
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open Popover"
                            />
                        }
                        heading="Popover for Lighthouse Testing"
                        description="This popover is used for accessibility auditing and demonstrates proper ARIA attributes, keyboard navigation, and focus management"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <div>
                            <p>
                                This popover demonstrates accessibility features
                                for Lighthouse testing.
                            </p>
                            <label
                                htmlFor="test-input"
                                className="block mt-4 mb-2 font-medium"
                            >
                                Test Input Field
                            </label>
                            <input
                                id="test-input"
                                type="text"
                                placeholder="Test input"
                                className="w-full p-2 border rounded"
                                aria-label="Test input field for accessibility testing"
                            />
                            <p className="mt-4 text-sm font-medium">
                                This popover includes:
                            </p>
                            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                                <li>
                                    Proper ARIA attributes (role="dialog" when
                                    modal, aria-labelledby, aria-describedby)
                                </li>
                                <li>Accessible heading via aria-labelledby</li>
                                <li>
                                    Accessible description via aria-describedby
                                </li>
                                <li>
                                    Keyboard navigation support (Tab, Shift+Tab,
                                    Escape)
                                </li>
                                <li>
                                    Focus management (focus trap in modal mode,
                                    focus return)
                                </li>
                                <li>Labeled form elements</li>
                                <li>Accessible action buttons</li>
                            </ul>
                        </div>
                    </Popover>
                </section>
            </main>
        </div>
    )
}

export default PopoverLightHouse
