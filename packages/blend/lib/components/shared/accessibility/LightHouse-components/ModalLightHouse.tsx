import { useState, useEffect } from 'react'
import Modal from '../../../Modal/Modal'
import { Button, ButtonType } from '../../../Button'

const ModalLightHouse = () => {
    const [isOpen, setIsOpen] = useState(false)

    // Open modal after a short delay to ensure page content is painted first
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
                <h1>Modal Accessibility Testing</h1>
                <p>
                    This page demonstrates the Modal component for Lighthouse
                    accessibility auditing. The modal will open automatically
                    and contains accessible elements.
                </p>
                <section>
                    <h2>Interactive Demo</h2>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Open Modal"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open modal for accessibility testing"
                    />
                </section>
            </main>

            {/* Controlled Modal - Opens automatically for Testing */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Modal for Lighthouse Testing"
                subtitle="This modal is used for accessibility auditing and demonstrates proper ARIA attributes, keyboard navigation, and focus management"
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
                        This modal demonstrates accessibility features for
                        Lighthouse testing.
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
                        This modal includes:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                        <li>
                            Proper ARIA attributes (role="dialog",
                            aria-modal="true")
                        </li>
                        <li>Accessible title via aria-labelledby</li>
                        <li>Accessible subtitle via aria-describedby</li>
                        <li>
                            Keyboard navigation support (Tab, Shift+Tab, Escape)
                        </li>
                        <li>Focus management (focus trap, focus return)</li>
                        <li>Labeled form elements</li>
                        <li>Accessible action buttons</li>
                    </ul>
                </div>
            </Modal>
        </div>
    )
}

export default ModalLightHouse
