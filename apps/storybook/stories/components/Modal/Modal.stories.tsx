import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Modal,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import {
    Trash2,
    AlertTriangle,
    CheckCircle,
    X,
    Settings,
    Mail,
    FileText,
    Info,
    Star,
    Heart,
    Share2,
    Copy,
    ExternalLink,
    Image,
    User,
    Camera,
    Upload,
    Edit,
    Save,
    Download,
    Calendar,
    Clock,
    MapPin,
    Phone,
    Lock,
    Unlock,
    Eye,
    EyeOff,
    Bell,
    Shield,
    CreditCard,
    Key,
    Globe,
    Zap,
    Gift,
    Award,
    Target,
    TrendingUp,
    BarChart3,
    PieChart,
    LineChart,
    Folder,
    FolderPlus,
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
        docs: {
            story: {
                inline: false,
                iframeHeight: '600px',
            },
            description: {
                component: `
A flexible modal dialog component for displaying content in an overlay with customizable header, footer, and action buttons.

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

## Usage

\`\`\`tsx
import { Modal, Button, ButtonType } from '@juspay/blend-design-system';

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
            description: 'Skeleton props for the modal',
            table: {
                type: { summary: 'ModalSkeletonProps' },
                category: 'Appearance',
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
            <div style={{ padding: '20px' }}>
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

// Confirmation Dialog
export const ConfirmationDialog: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div style={{ padding: '20px' }}>
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '16px',
                        }}
                    >
                        <AlertTriangle size={24} color="#f59e0b" />
                        <div>
                            <p style={{ margin: 0, fontWeight: '500' }}>
                                Are you sure you want to delete this item?
                            </p>
                            <p
                                style={{
                                    margin: '4px 0 0 0',
                                    fontSize: '14px',
                                    color: '#6b7280',
                                }}
                            >
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
            <div style={{ padding: '20px' }}>
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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '4px',
                                    fontWeight: '500',
                                }}
                            >
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
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                }}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '4px',
                                    fontWeight: '500',
                                }}
                            >
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
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                }}
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '4px',
                                    fontWeight: '500',
                                }}
                            >
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
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                }}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '4px',
                                    fontWeight: '500',
                                }}
                            >
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
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    minHeight: '80px',
                                    resize: 'vertical',
                                }}
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

// Success Notification
export const SuccessNotification: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div style={{ padding: '20px' }}>
                <Button
                    buttonType={ButtonType.SUCCESS}
                    text="Complete Action"
                    leadingIcon={<CheckCircle size={16} />}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Success!"
                    subtitle="Your action has been completed successfully"
                    primaryAction={{
                        text: 'Continue',
                        onClick: () => setIsOpen(false),
                    }}
                    showCloseButton={false}
                    showDivider
                >
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <CheckCircle
                            size={64}
                            color="#10b981"
                            style={{ marginBottom: '16px' }}
                        />
                        <h3 style={{ margin: '0 0 8px 0', color: '#10b981' }}>
                            Operation Completed
                        </h3>
                        <p style={{ margin: 0, color: '#6b7280' }}>
                            Your request has been processed successfully. You
                            can now continue with your workflow.
                        </p>
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Success notification modal without close button. Centered content with icon.',
            },
        },
    },
}

// Settings Modal with Header Slot
export const SettingsModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)
        const [activeTab, setActiveTab] = useState('general')

        const tabs = [
            { id: 'general', label: 'General', icon: Settings },
            { id: 'privacy', label: 'Privacy', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'billing', label: 'Billing', icon: CreditCard },
        ]

        return (
            <div style={{ padding: '20px' }}>
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Open Settings"
                    leadingIcon={<Settings size={16} />}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Settings"
                    subtitle="Configure your preferences"
                    headerRightSlot={
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Export"
                                leadingIcon={<Download size={14} />}
                            />
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text="Reset"
                                leadingIcon={<X size={14} />}
                            />
                        </div>
                    }
                    primaryAction={{
                        text: 'Save Changes',
                        onClick: () => {
                            alert('Settings saved!')
                            setIsOpen(false)
                        },
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: () => setIsOpen(false),
                    }}
                    minWidth="600px"
                    showDivider
                >
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ width: '150px' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: 'none',
                                        background:
                                            activeTab === tab.id
                                                ? '#f3f4f6'
                                                : 'transparent',
                                        textAlign: 'left',
                                        borderRadius: '6px',
                                        marginBottom: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ marginTop: 0 }}>
                                {
                                    tabs.find((tab) => tab.id === activeTab)
                                        ?.label
                                }{' '}
                                Settings
                            </h4>
                            <p style={{ color: '#6b7280' }}>
                                Configure your {activeTab} preferences here.
                                Changes will be applied immediately.
                            </p>
                            {/* Placeholder content for different tabs */}
                            <div style={{ marginTop: '20px' }}>
                                {activeTab === 'general' && (
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: '8px' }}
                                            />
                                            Enable dark mode
                                        </label>
                                        <label
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: '8px' }}
                                            />
                                            Show tooltips
                                        </label>
                                    </div>
                                )}
                                {activeTab === 'privacy' && (
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: '8px' }}
                                            />
                                            Make profile public
                                        </label>
                                        <label
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: '8px' }}
                                            />
                                            Allow data collection
                                        </label>
                                    </div>
                                )}
                                {activeTab === 'notifications' && (
                                    <div>
                                        <label
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: '8px' }}
                                            />
                                            Email notifications
                                        </label>
                                        <label
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: '8px' }}
                                            />
                                            Push notifications
                                        </label>
                                    </div>
                                )}
                                {activeTab === 'billing' && (
                                    <div>
                                        <p>
                                            Current plan:{' '}
                                            <strong>Pro Plan</strong>
                                        </p>
                                        <p>
                                            Next billing date:{' '}
                                            <strong>March 15, 2024</strong>
                                        </p>
                                    </div>
                                )}
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
                story: 'Settings modal with header right slot, tabs navigation, and complex content layout.',
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
            <div style={{ padding: '20px' }}>
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
                        <div style={{ display: 'flex', gap: '8px' }}>
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
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={images[currentImage].src}
                            alt={images[currentImage].title}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                marginBottom: '16px',
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        background:
                                            index === currentImage
                                                ? '#3b82f6'
                                                : '#d1d5db',
                                        cursor: 'pointer',
                                    }}
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

// Custom Header and Footer
export const CustomHeaderFooter: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)
        const [step, setStep] = useState(1)
        const totalSteps = 3

        const customHeader = (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: '1px solid #e5e7eb',
                    background:
                        'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                }}
            >
                <div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>
                        Setup Wizard
                    </h3>
                    <p
                        style={{
                            margin: '4px 0 0 0',
                            fontSize: '14px',
                            opacity: 0.9,
                        }}
                    >
                        Step {step} of {totalSteps}
                    </p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <div
                        style={{
                            width: '100px',
                            height: '4px',
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '2px',
                        }}
                    >
                        <div
                            style={{
                                width: `${(step / totalSteps) * 100}%`,
                                height: '100%',
                                background: 'white',
                                borderRadius: '2px',
                                transition: 'width 0.3s ease',
                            }}
                        />
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '4px',
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        )

        const customFooter = (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderTop: '1px solid #e5e7eb',
                    background: '#f9fafb',
                }}
            >
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Need help?{' '}
                    <a href="#" style={{ color: '#3b82f6' }}>
                        Contact Support
                    </a>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {step > 1 && (
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="Previous"
                            onClick={() => setStep((prev) => prev - 1)}
                        />
                    )}
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text={step === totalSteps ? 'Finish' : 'Next'}
                        onClick={() => {
                            if (step === totalSteps) {
                                alert('Setup completed!')
                                setIsOpen(false)
                                setStep(1)
                            } else {
                                setStep((prev) => prev + 1)
                            }
                        }}
                    />
                </div>
            </div>
        )

        return (
            <div style={{ padding: '20px' }}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Start Setup Wizard"
                    leadingIcon={<Zap size={16} />}
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    customHeader={customHeader}
                    customFooter={customFooter}
                    minWidth="500px"
                >
                    <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                        {step === 1 && (
                            <div>
                                <User
                                    size={48}
                                    color="#3b82f6"
                                    style={{ marginBottom: '16px' }}
                                />
                                <h3>Welcome to the Setup</h3>
                                <p>
                                    We'll help you get started with your new
                                    account. This should only take a few
                                    minutes.
                                </p>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <Settings
                                    size={48}
                                    color="#3b82f6"
                                    style={{ marginBottom: '16px' }}
                                />
                                <h3>Configure Your Preferences</h3>
                                <p>
                                    Let's set up your basic preferences to
                                    personalize your experience.
                                </p>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <CheckCircle
                                    size={48}
                                    color="#10b981"
                                    style={{ marginBottom: '16px' }}
                                />
                                <h3>You're All Set!</h3>
                                <p>
                                    Your account has been configured
                                    successfully. You can now start using all
                                    features.
                                </p>
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal with completely custom header and footer. Demonstrates wizard-style progression.',
            },
        },
    },
}

// No Header/Footer Modal
export const MinimalModal: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div style={{ padding: '20px' }}>
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Open Minimal Modal"
                    onClick={() => setIsOpen(true)}
                />

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    showHeader={false}
                    showFooter={false}
                    minWidth="400px"
                >
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Gift
                            size={64}
                            color="#f59e0b"
                            style={{ marginBottom: '24px' }}
                        />
                        <h2 style={{ margin: '0 0 16px 0', color: '#1f2937' }}>
                            🎉 Congratulations!
                        </h2>
                        <p
                            style={{
                                margin: '0 0 24px 0',
                                color: '#6b7280',
                                lineHeight: 1.6,
                            }}
                        >
                            You've unlocked a special reward! Your dedication
                            and hard work have paid off.
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Claim Reward"
                                onClick={() => {
                                    alert('Reward claimed!')
                                    setIsOpen(false)
                                }}
                            />
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Close"
                                onClick={() => setIsOpen(false)}
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
                story: 'Minimal modal without header and footer. All content and actions are custom.',
            },
        },
    },
}

// Mobile Drawer Mode
export const MobileDrawerMode: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div style={{ padding: '20px' }}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Open Mobile Drawer"
                    onClick={() => setIsOpen(true)}
                />
                <p
                    style={{
                        marginTop: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    This modal will display as a drawer on mobile devices
                </p>

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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <p>
                            This modal automatically switches to a drawer layout
                            on mobile devices for better usability and screen
                            real estate.
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                background: '#f3f4f6',
                                borderRadius: '8px',
                            }}
                        >
                            <Phone size={20} color="#3b82f6" />
                            <div>
                                <p style={{ margin: 0, fontWeight: '500' }}>
                                    Mobile Optimized
                                </p>
                                <p
                                    style={{
                                        margin: '4px 0 0 0',
                                        fontSize: '14px',
                                        color: '#6b7280',
                                    }}
                                >
                                    Drawer style on small screens
                                </p>
                            </div>
                        </div>
                        <div style={{ padding: '16px 0' }}>
                            <h4>Features</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
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
            <div style={{ padding: '20px' }}>
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                        }}
                    >
                        <Info
                            size={24}
                            color="#3b82f6"
                            style={{ marginTop: '2px', flexShrink: 0 }}
                        />
                        <div>
                            <h4 style={{ margin: '0 0 8px 0' }}>
                                Terms and Conditions Update
                            </h4>
                            <p
                                style={{
                                    margin: '0 0 16px 0',
                                    lineHeight: 1.6,
                                }}
                            >
                                We've updated our terms and conditions. Please
                                review the changes before continuing. This modal
                                cannot be closed by clicking the backdrop - you
                                must use the button or close icon.
                            </p>
                            <div
                                style={{
                                    background: '#fef3c7',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    border: '1px solid #f59e0b',
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        color: '#92400e',
                                    }}
                                >
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
            <div style={{ padding: '20px' }}>
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
                    <div
                        style={{
                            maxHeight: '400px',
                            overflow: 'auto',
                            padding: '0 4px',
                        }}
                    >
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

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating WCAG 2.1 Level A, AA, and AAA compliance
 */
export const Accessibility: Story = {
    render: () => {
        const AccessibilityDemo = () => {
            const [basicOpen, setBasicOpen] = useState(false)
            const [keyboardOpen, setKeyboardOpen] = useState(false)
            const [focusOpen, setFocusOpen] = useState(false)
            const [ariaOpen, setAriaOpen] = useState(false)
            const [escapeOpen, setEscapeOpen] = useState(false)
            const [scrollOpen, setScrollOpen] = useState(false)

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                        maxWidth: '800px',
                        padding: '20px',
                    }}
                >
                    {/* Basic Accessible Modal */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Basic Accessible Modal
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Modal with proper ARIA attributes, role="dialog",
                            aria-modal="true", and aria-labelledby.
                        </p>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Accessible Modal"
                            onClick={() => setBasicOpen(true)}
                        />
                        <Modal
                            isOpen={basicOpen}
                            onClose={() => setBasicOpen(false)}
                            title="Accessible Modal"
                            subtitle="This modal has proper ARIA attributes"
                            primaryAction={{
                                text: 'Save',
                                onClick: () => setBasicOpen(false),
                            }}
                            secondaryAction={{
                                text: 'Cancel',
                                onClick: () => setBasicOpen(false),
                            }}
                        >
                            <p>
                                This modal demonstrates proper accessibility
                                features including role="dialog",
                                aria-modal="true", and aria-labelledby linking
                                to the title.
                            </p>
                        </Modal>
                    </div>

                    {/* Keyboard Accessible Modal */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Keyboard Accessible Modal
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Modal is fully keyboard accessible. Tab to navigate,
                            Escape to close, focus is trapped within modal.
                        </p>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Keyboard Modal"
                            onClick={() => setKeyboardOpen(true)}
                        />
                        <Modal
                            isOpen={keyboardOpen}
                            onClose={() => setKeyboardOpen(false)}
                            title="Keyboard Accessible Modal"
                            subtitle="Use Tab, Shift+Tab, and Escape to navigate"
                            primaryAction={{
                                text: 'Confirm',
                                onClick: () => setKeyboardOpen(false),
                            }}
                            secondaryAction={{
                                text: 'Cancel',
                                onClick: () => setKeyboardOpen(false),
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                }}
                            >
                                <p>
                                    <strong>Keyboard Navigation:</strong>
                                </p>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li>
                                        Tab - Navigate forward through elements
                                    </li>
                                    <li>Shift+Tab - Navigate backward</li>
                                    <li>Escape - Close modal</li>
                                    <li>Enter/Space - Activate buttons</li>
                                </ul>
                                <p style={{ marginTop: '12px' }}>
                                    Focus is trapped within the modal when open.
                                </p>
                            </div>
                        </Modal>
                    </div>

                    {/* Focus Management */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Focus Management (Keyboard Navigation)
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Focus is trapped within modal and returns to trigger
                            when closed.
                        </p>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Test Focus Management"
                            onClick={() => setFocusOpen(true)}
                        />
                        <Modal
                            isOpen={focusOpen}
                            onClose={() => setFocusOpen(false)}
                            title="Focus Management Test"
                            subtitle="Focus is trapped within modal"
                            primaryAction={{
                                text: 'Close',
                                onClick: () => setFocusOpen(false),
                            }}
                        >
                            <p>
                                When this modal opens, focus moves to the first
                                focusable element (close button or primary
                                action). Focus is trapped within the modal until
                                it is closed. When closed, focus returns to the
                                trigger button.
                            </p>
                        </Modal>
                    </div>

                    {/* ARIA Attributes */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            ARIA Attributes (Screen Reader Support)
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Modal has proper ARIA attributes for screen readers.
                        </p>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Test ARIA Attributes"
                            onClick={() => setAriaOpen(true)}
                        />
                        <Modal
                            isOpen={ariaOpen}
                            onClose={() => setAriaOpen(false)}
                            title="ARIA Attributes Modal"
                            subtitle="Screen reader friendly"
                            primaryAction={{
                                text: 'Continue',
                                onClick: () => setAriaOpen(false),
                            }}
                        >
                            <p>This modal has:</p>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li>role="dialog"</li>
                                <li>aria-modal="true"</li>
                                <li>aria-labelledby="modal-title"</li>
                                <li>Backdrop with aria-hidden="true"</li>
                            </ul>
                            <p style={{ marginTop: '12px' }}>
                                Screen readers will announce the modal title and
                                indicate it is a modal dialog.
                            </p>
                        </Modal>
                    </div>

                    {/* Escape Key */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Escape Key Support
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Press Escape to close the modal.
                        </p>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Escape Test Modal"
                            onClick={() => setEscapeOpen(true)}
                        />
                        <Modal
                            isOpen={escapeOpen}
                            onClose={() => setEscapeOpen(false)}
                            title="Escape Key Test"
                            subtitle="Press Escape to close"
                            primaryAction={{
                                text: 'Close',
                                onClick: () => setEscapeOpen(false),
                            }}
                        >
                            <p>
                                Press the <strong>Escape</strong> key to close
                                this modal. This is a standard keyboard shortcut
                                for dismissing dialogs.
                            </p>
                        </Modal>
                    </div>

                    {/* Scroll Locking */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Scroll Locking (Focus Management)
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Background scrolling is locked when modal is open.
                        </p>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Test Scroll Locking"
                            onClick={() => setScrollOpen(true)}
                        />
                        <Modal
                            isOpen={scrollOpen}
                            onClose={() => setScrollOpen(false)}
                            title="Scroll Locking Test"
                            subtitle="Background scroll is disabled"
                            primaryAction={{
                                text: 'Close',
                                onClick: () => setScrollOpen(false),
                            }}
                        >
                            <p>
                                When this modal is open, the background content
                                is locked and cannot be scrolled. This prevents
                                users from accidentally scrolling the page
                                behind the modal.
                            </p>
                            <div
                                style={{
                                    height: '200px',
                                    padding: '20px',
                                    background: '#f3f4f6',
                                    borderRadius: '8px',
                                    marginTop: '16px',
                                }}
                            >
                                <p>
                                    Modal content area is scrollable if needed.
                                </p>
                            </div>
                        </Modal>
                    </div>

                    {/* Backdrop Accessibility */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Backdrop Accessibility
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Backdrop is properly hidden from screen readers.
                        </p>
                        <p style={{ fontSize: '12px', color: '#999' }}>
                            The modal backdrop has aria-hidden="true" and
                            role="presentation" to ensure it is not announced by
                            screen readers. Only the modal content is
                            accessible.
                        </p>
                    </div>

                    {/* Close Button Accessibility */}
                    <div>
                        <h3
                            style={{
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Close Button Accessibility
                        </h3>
                        <p
                            style={{
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            Close button is keyboard accessible and has proper
                            accessible name.
                        </p>
                        <p style={{ fontSize: '12px', color: '#999' }}>
                            The close button (X icon) in the header is keyboard
                            accessible and should have an accessible name. It
                            can be activated with Enter or Space keys.
                        </p>
                    </div>
                </div>
            )
        }
        return <AccessibilityDemo />
    },
    parameters: {
        docs: {
            description: {
                story: `
## Accessibility Testing

This story demonstrates WCAG 2.1 Level A, AA, and AAA compliance features of the Modal component.

### Testing Checklist

1. **Keyboard Navigation**:
   - Tab to navigate through modal elements
   - Shift+Tab to navigate backward
   - Escape to close modal
   - Enter/Space to activate buttons
   - Verify focus is trapped within modal

2. **Screen Reader Testing**:
   - Use VoiceOver (macOS) or NVDA (Windows)
   - Verify modal title is announced
   - Verify role="dialog" is announced
   - Verify backdrop is not announced (aria-hidden)
   - Verify modal content is accessible

3. **Focus Management**:
   - Verify focus moves to modal when opened
   - Verify focus is trapped within modal
   - Verify focus returns to trigger when closed
   - Verify focus order is logical

4. **ARIA Attributes**:
   - Verify role="dialog" is present
   - Verify aria-modal="true" is present
   - Verify aria-labelledby links to title
   - Verify backdrop has aria-hidden="true"

5. **Scroll Locking**:
   - Verify background content cannot be scrolled when modal is open
   - Verify modal content area is scrollable if needed

6. **Color Contrast**:
   - Use WebAIM Contrast Checker or similar tool
   - Verify modal text meets 4.5:1 contrast ratio (AA)
   - For AAA compliance, verify 7:1 contrast ratio

### Automated Testing

- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression testing for modal states and interactions
- **Manual**: Screen reader and keyboard testing required

### WCAG Compliance Summary

- ✅ **Level A**: Fully Compliant
- ✅ **Level AA**: Fully Compliant
- ⚠️ **Level AAA**: Partial Compliance (3/4 applicable criteria)
  - Compliant: Visual Presentation (1.4.8), Keyboard No Exception (2.1.3), Change on Request (3.2.5)
  - Non-Compliant: Contrast Enhanced (1.4.6) - requires 7:1 ratio

For detailed compliance report, see Accessibility Dashboard.
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('interactive'),
        // Extended delay for Chromatic to capture modal states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
