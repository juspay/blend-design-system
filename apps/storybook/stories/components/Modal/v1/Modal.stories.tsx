import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Modal } from '@juspay/blend-design-system/deprecated/modal'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system/deprecated/button'
import { Theme, ThemeProvider } from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import {
    Trash2,
    AlertTriangle,
    Mail,
    FileText,
    Info,
    Share2,
    Image,
    Download,
    Phone,
} from 'lucide-react'

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A flexible modal dialog component for displaying content in an overlay with customizable header, footer, and action buttons.',
        docs: {
            story: {
                inline: false,
                iframeHeight: '600px',
            },
            description: {
                component: `
## Usage

\`\`\`tsx
import { Modal, Button, ButtonType } from '@juspay/blend-design-system/deprecated/modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  subtitle="Optional subtitle"
  primaryAction={{
    text: 'Save',
    onClick: handleSave,
  }}
  secondaryAction={{
    text: 'Cancel',
    onClick: () => setIsOpen(false),
  }}
>
  <p>Modal content goes here</p>
</Modal>
\`\`\`

## Features
- Customizable header with title and subtitle
- Flexible content area for any React content
- Configurable action buttons (primary and secondary)
- Optional close button and backdrop click handling
- Custom header and footer support
- Header right slot for additional actions
- Divider and styling options
- Accessible keyboard navigation
- Focus management and scroll locking
- Mobile drawer mode for responsive design
- Minimum width configuration
- Portal-based rendering for z-index management

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Shift+Tab, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (role="dialog", aria-modal="true", aria-labelledby)
- Focus management (focus trapped in modal, returns to trigger on close)
- Scroll locking prevents background scrolling
- Backdrop properly hidden from screen readers (aria-hidden="true", role="presentation")
- Close button accessible via keyboard
- Color contrast ratios meet WCAG 2.1 Level AA standards (4.5:1 for normal text, 3:1 for large text)

**Level AAA Compliance**: ⚠️ Partial (3 out of 4 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA)
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Accessibility Features**:
- Modal has proper role="dialog" and aria-modal="true" attributes
- Modal title linked via aria-labelledby="modal-title"
- Backdrop is properly hidden from screen readers (aria-hidden="true", role="presentation")
- Focus is trapped within modal when open (keyboard navigation stays within modal)
- Focus returns to trigger element when modal closes
- Escape key closes modal
- Scroll locking prevents background content from scrolling
- Close button is keyboard accessible
- Action buttons are keyboard accessible
- Portal rendering ensures proper DOM hierarchy for screen readers

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Keyboard Testing**: Tab through modal, Escape to close, verify focus trapping
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Use Cases
- Confirmation dialogs
- Form submissions and editing
- Content creation and editing
- Information display and details
- User notifications and alerts
- Settings and configuration panels
- Image galleries and media viewers
- Multi-step workflows and wizards
- User onboarding flows
- Data import/export interfaces

        `,
            },
        },
    },
    argTypes: {
        isOpen: {
            control: { type: 'boolean' },
            description: 'Controls whether the modal is visible',
            table: {
                type: { summary: 'boolean' },
                category: 'State',
            },
        },
        onClose: {
            action: 'modal-closed',
            description: 'Callback fired when the modal should be closed',
            table: {
                type: { summary: '() => void' },
                category: 'Events',
            },
        },
        title: {
            control: { type: 'text' },
            description: 'Main title displayed in the modal header',
            table: {
                type: { summary: 'string' },
                category: 'Header',
            },
        },
        subtitle: {
            control: { type: 'text' },
            description: 'Subtitle displayed below the main title',
            table: {
                type: { summary: 'string' },
                category: 'Header',
            },
        },
        children: {
            control: false,
            description: 'Main content of the modal',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Content',
            },
        },
        primaryAction: {
            control: false,
            description: 'Primary action button configuration',
            table: {
                type: { summary: 'ModalButtonAction' },
                category: 'Actions',
            },
        },
        secondaryAction: {
            control: false,
            description: 'Secondary action button configuration',
            table: {
                type: { summary: 'ModalButtonAction' },
                category: 'Actions',
            },
        },
        showCloseButton: {
            control: { type: 'boolean' },
            description: 'Whether to show the close (X) button in the header',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Header',
            },
        },
        showHeader: {
            control: { type: 'boolean' },
            description: 'Whether to show the modal header',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Layout',
            },
        },
        showFooter: {
            control: { type: 'boolean' },
            description: 'Whether to show the modal footer with action buttons',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Layout',
            },
        },
        closeOnBackdropClick: {
            control: { type: 'boolean' },
            description: 'Whether clicking the backdrop closes the modal',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Behavior',
            },
        },
        customHeader: {
            control: false,
            description: 'Custom header content to replace default header',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Customization',
            },
        },
        customFooter: {
            control: false,
            description: 'Custom footer content to replace default footer',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Customization',
            },
        },
        isCustom: {
            control: { type: 'boolean' },
            description: 'Whether the modal is custom',
            table: {
                type: { summary: 'boolean' },
                category: 'Customization',
            },
        },
        headerRightSlot: {
            control: false,
            description: 'Content displayed on the right side of the header',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Header',
            },
        },
        showDivider: {
            control: { type: 'boolean' },
            description: 'Whether to show a divider between header and content',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Styling',
            },
        },
        minWidth: {
            control: { type: 'text' },
            description: 'Minimum width of the modal (CSS value)',
            table: {
                type: { summary: 'string' },
                category: 'Layout',
            },
        },
        useDrawerOnMobile: {
            control: { type: 'boolean' },
            description: 'Whether to use drawer-style layout on mobile devices',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Responsive',
            },
        },
        skeleton: {
            control: { type: 'object' },
            description: 'Skeleton loading state configuration for the modal',
            table: {
                type: {
                    summary: 'ModalSkeletonProps',
                    detail: `{
  show?: boolean;              // Whether to show skeleton loading
  variant?: 'pulse' | 'wave';  // Animation variant (default: 'pulse')
  bodySkeletonProps?: {        // Additional body skeleton config
    show?: boolean;
    width?: string;
    height?: string;
  }
}`,
                },
                category: 'State',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

// Basic Modal
export const Default: Story = {
    render: function DefaultModal(args) {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div className="px-5 pt-60 w-full flex items-center justify-center">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Open Modal"
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    primaryAction={{
                        text: 'Save',
                        onClick: () => {
                            alert('Saved!')
                            setIsOpen(false)
                        },
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: () => setIsOpen(false),
                    }}
                >
                    <p>
                        This is the modal content. You can put any React content
                        here. The modal provides a flexible overlay for
                        displaying information, forms, or interactive elements.
                    </p>
                </Modal>
            </div>
        )
    },
    args: {
        title: 'Basic Modal',
        subtitle: 'This is a simple modal example',
        showCloseButton: true,
        showHeader: true,
        showFooter: true,
        closeOnBackdropClick: true,
        showDivider: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic modal with title, subtitle, content, and action buttons.',
            },
        },
    },
}

export const DarkTheme: Story = {
    render: () => (
        <ThemeProvider theme={Theme.DARK}>
            <div
                style={{
                    minHeight: '100vh',
                    padding: 32,
                    backgroundColor: '#171a1f',
                }}
            >
                <Modal
                    isOpen={true}
                    onClose={() => {}}
                    title="Dark theme modal"
                    subtitle="Existing modal slots resolved through ThemeProvider"
                    useDrawerOnMobile={false}
                    primaryAction={{ text: 'Continue', onClick: () => {} }}
                    secondaryAction={{ text: 'Cancel', onClick: () => {} }}
                    showDivider
                >
                    <div style={{ color: '#e5e7eb', lineHeight: 1.6 }}>
                        The overlay, container, header, footer, and close
                        affordance use the dark Modal token set.
                    </div>
                </Modal>
            </div>
        </ThemeProvider>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Modal surface rendered with the dark theme token set.',
            },
        },
    },
}

// Confirmation Dialog
export const ConfirmationDialog: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div className="px-5 py-32 w-full flex items-center justify-center">
                <Button
                    buttonType={ButtonType.DANGER}
                    text="Delete Item"
                    leadingIcon={<Trash2 size={16} />}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Confirm Deletion"
                    subtitle="This action cannot be undone"
                    primaryAction={{
                        text: 'Delete',
                        buttonType: ButtonType.DANGER,
                        onClick: () => {
                            alert('Item deleted!')
                            setIsOpen(false)
                        },
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: () => setIsOpen(false),
                    }}
                    showDivider
                >
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle size={24} color="#f59e0b" />
                        <div>
                            <p className="m-0 font-medium">
                                Are you sure you want to delete this item?
                            </p>
                            <p className="mt-1 m-0 text-sm text-gray-500">
                                This will permanently remove the item from your
                                account.
                            </p>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Confirmation dialog for destructive actions with warning styling and danger button.',
            },
        },
    },
}

// Form Modal
export const FormModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            phone: '',
            message: '',
        })

        const handleSubmit = () => {
            if (!formData.name || !formData.email) {
                alert('Please fill in required fields')
                return
            }
            alert('Form submitted successfully!')
            setIsOpen(false)
            setFormData({ name: '', email: '', phone: '', message: '' })
        }

        return (
            <div className="px-5 py-32 w-full flex items-center justify-center">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Contact Us"
                    leadingIcon={<Mail size={16} />}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Contact Information"
                    subtitle="Send us a message and we'll get back to you"
                    primaryAction={{
                        text: 'Send Message',
                        onClick: handleSubmit,
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: () => setIsOpen(false),
                    }}
                    minWidth="500px"
                    showDivider
                >
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-1 font-medium">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Phone (Optional)
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        phone: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Message
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        message: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-20 resize-y"
                                placeholder="Tell us how we can help you..."
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Form modal with validation and input fields. Demonstrates minimum width and form handling.',
            },
        },
    },
}

// Image Gallery Modal
export const ImageGalleryModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)
        const [currentImage, setCurrentImage] = useState(0)

        const images = [
            {
                src: 'https://picsum.photos/800/600?random=1',
                title: 'Landscape Photo 1',
            },
            {
                src: 'https://picsum.photos/800/600?random=2',
                title: 'Landscape Photo 2',
            },
            {
                src: 'https://picsum.photos/800/600?random=3',
                title: 'Landscape Photo 3',
            },
        ]

        return (
            <div className="px-5 py-32 w-full flex items-center justify-center">
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="View Gallery"
                    leadingIcon={<Image size={16} />}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={images[currentImage].title}
                    subtitle={`Image ${currentImage + 1} of ${images.length}`}
                    headerRightSlot={
                        <div className="flex gap-2">
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Share"
                                leadingIcon={<Share2 size={14} />}
                            />
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Download"
                                leadingIcon={<Download size={14} />}
                            />
                        </div>
                    }
                    primaryAction={{
                        text:
                            currentImage < images.length - 1 ? 'Next' : 'Close',
                        onClick: () => {
                            if (currentImage < images.length - 1) {
                                setCurrentImage((prev) => prev + 1)
                            } else {
                                setIsOpen(false)
                                setCurrentImage(0)
                            }
                        },
                    }}
                    secondaryAction={
                        currentImage > 0
                            ? {
                                  text: 'Previous',
                                  onClick: () =>
                                      setCurrentImage((prev) => prev - 1),
                              }
                            : undefined
                    }
                    minWidth="700px"
                    showDivider
                >
                    <div className="text-center">
                        <img
                            src={images[currentImage].src}
                            alt={images[currentImage].title}
                            className="max-w-full h-auto rounded-lg mb-4"
                        />
                        <div className="flex justify-center gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`w-2 h-2 rounded-full border-none cursor-pointer ${
                                        index === currentImage
                                            ? 'bg-blue-500'
                                            : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Image gallery modal with navigation, dynamic title/subtitle, and header actions.',
            },
        },
    },
}

// Mobile Drawer Mode
export const MobileDrawerMode: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div className="px-5 py-32 w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Open Mobile Drawer"
                        onClick={() => setIsOpen(true)}
                    />
                    <p className="mt-3 text-sm text-gray-500">
                        This modal will display as a drawer on mobile devices
                    </p>
                </div>

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Mobile Optimized"
                    subtitle="This modal adapts to mobile screens"
                    useDrawerOnMobile
                    primaryAction={{
                        text: 'Save',
                        onClick: () => {
                            alert('Saved!')
                            setIsOpen(false)
                        },
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: () => setIsOpen(false),
                    }}
                    showDivider
                >
                    <div className="flex flex-col gap-4">
                        <p>
                            This modal automatically switches to a drawer layout
                            on mobile devices for better usability and screen
                            real estate.
                        </p>
                        <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                            <Phone size={20} color="#3b82f6" />
                            <div>
                                <p className="m-0 font-medium">
                                    Mobile Optimized
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Drawer style on small screens
                                </p>
                            </div>
                        </div>
                        <div className="py-4">
                            <h4>Features</h4>
                            <ul className="m-0 pl-5">
                                <li>Slides up from bottom on mobile</li>
                                <li>Full width utilization</li>
                                <li>Touch-friendly interactions</li>
                                <li>Responsive design patterns</li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal that automatically switches to drawer mode on mobile devices for better UX.',
            },
        },
    },
}

// No Backdrop Click Close
export const NoBackdropClose: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div className="px-5 py-32 w-full flex items-center justify-center">
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Open Persistent Modal"
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Important Notice"
                    subtitle="Please read this information carefully"
                    closeOnBackdropClick={false}
                    primaryAction={{
                        text: 'I Understand',
                        onClick: () => setIsOpen(false),
                    }}
                    showDivider
                >
                    <div className="flex items-start gap-3">
                        <Info
                            size={24}
                            color="#3b82f6"
                            className="mt-0.5 shrink-0"
                        />
                        <div>
                            <h4 className="m-0 mb-2">
                                Terms and Conditions Update
                            </h4>
                            <p className="m-0 mb-4 leading-relaxed">
                                We've updated our terms and conditions. Please
                                review the changes before continuing. This modal
                                cannot be closed by clicking the backdrop - you
                                must use the button or close icon.
                            </p>
                            <div className="bg-amber-100 p-3 rounded-md border border-amber-500">
                                <p className="m-0 text-sm text-amber-800">
                                    <strong>Note:</strong> Backdrop clicks are
                                    disabled for this modal to ensure you
                                    acknowledge this important information.
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal that cannot be closed by clicking the backdrop, only through explicit actions.',
            },
        },
    },
}

// Large Content Modal
export const LargeContentModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div className="px-5 py-32 w-full flex items-center justify-center">
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="View Document"
                    leadingIcon={<FileText size={16} />}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Terms of Service"
                    subtitle="Last updated: January 2024"
                    headerRightSlot={
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            text="Print"
                            leadingIcon={<FileText size={14} />}
                        />
                    }
                    primaryAction={{
                        text: 'Accept',
                        onClick: () => {
                            alert('Terms accepted!')
                            setIsOpen(false)
                        },
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: () => setIsOpen(false),
                    }}
                    minWidth="700px"
                    showDivider
                >
                    <div className="max-h-100 overflow-auto px-1">
                        <h3>1. Introduction</h3>
                        <p>
                            Welcome to our service. These terms and conditions
                            outline the rules and regulations for the use of our
                            platform. By accessing this service, we assume you
                            accept these terms and conditions in full.
                        </p>

                        <h3>2. User Accounts</h3>
                        <p>
                            When you create an account with us, you guarantee
                            that the information you provide is accurate,
                            complete, and current at all times. You are
                            responsible for safeguarding the password and for
                            all activities that occur under your account.
                        </p>

                        <h3>3. Privacy Policy</h3>
                        <p>
                            Your privacy is important to us. Our Privacy Policy
                            explains how we collect, use, and protect
                            information about you when you use our service. By
                            using our service, you agree to the collection and
                            use of information in accordance with our Privacy
                            Policy.
                        </p>

                        <h3>4. Content and Conduct</h3>
                        <p>
                            You are responsible for any content you post and the
                            consequences of posting it. You agree not to post
                            content that is illegal, harmful, threatening,
                            abusive, harassing, tortious, defamatory, vulgar,
                            obscene, or invasive of another's privacy.
                        </p>

                        <h3>5. Intellectual Property</h3>
                        <p>
                            The service and its original content, features, and
                            functionality are and will remain the exclusive
                            property of our company and its licensors. The
                            service is protected by copyright, trademark, and
                            other laws.
                        </p>

                        <h3>6. Termination</h3>
                        <p>
                            We may terminate or suspend your account and bar
                            access to the service immediately, without prior
                            notice or liability, under our sole discretion, for
                            any reason whatsoever and without limitation,
                            including but not limited to a breach of the terms.
                        </p>

                        <h3>7. Changes to Terms</h3>
                        <p>
                            We reserve the right to modify or replace these
                            terms at any time. If a revision is material, we
                            will provide at least 30 days notice prior to any
                            new terms taking effect.
                        </p>

                        <h3>8. Contact Information</h3>
                        <p>
                            If you have any questions about these Terms and
                            Conditions, please contact us at legal@company.com
                            or through our support portal.
                        </p>
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal with large scrollable content. Demonstrates handling of lengthy documents.',
            },
        },
    },
}
