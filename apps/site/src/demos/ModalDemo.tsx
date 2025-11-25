import { Modal } from '../../../../packages/blend/lib/components/Modal'
import { Button } from '../../../../packages/blend/lib/components/Button'
import {
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button'
import { useState } from 'react'
import { TextInput } from '../../../../packages/blend/lib/main'

const ModalDemo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Configuration state
    const [config, setConfig] = useState({
        title: 'Modal Heading',
        subtitle: 'One line description of the modal',
        primaryButtonText: 'Confirm',
        secondaryButtonText: 'Cancel',
        primaryButtonType: ButtonType.PRIMARY,
        secondaryButtonType: ButtonType.SECONDARY,
        showCloseButton: true,
        showDivider: true,
        closeOnBackdropClick: true,
        primaryButtonDisabled: false,
        secondaryButtonDisabled: false,
        showPrimaryButton: true,
        showSecondaryButton: true,
        contentType: 'basic',
    })

    const handleCheckboxChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: e.target.checked,
            })
        }

    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: e.target.value,
            })
        }

    const handleSelectChange =
        (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            setConfig({
                ...config,
                [field]: e.target.value,
            })
        }

    const renderModalContent = () => {
        switch (config.contentType) {
            case 'basic':
                return (
                    <div>
                        <p
                            className="text-base text-gray-600"
                            data-description-text="popUp Confirmation"
                        >
                            This is a configurable modal for demonstration
                            purposes. You can adjust various settings using the
                            controls.
                        </p>
                    </div>
                )
            case 'form':
                return (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-base font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="notifications"
                                className="cursor-pointer"
                            />
                            <label
                                htmlFor="notifications"
                                className="text-base text-gray-600 cursor-pointer"
                            >
                                Receive email notifications
                            </label>
                        </div>
                    </div>
                )
            case 'long':
                return (
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 rounded-lg"
                            >
                                <p className="text-base text-gray-700">
                                    Section {index + 1}: Lorem ipsum dolor sit
                                    amet, consectetur adipiscing elit. Nullam
                                    auctor, nisl eget ultricies tincidunt, nisl
                                    nisl aliquam nisl, eget ultricies nisl nisl
                                    eget nisl. Nullam auctor, nisl eget
                                    ultricies tincidunt, nisl nisl aliquam nisl,
                                    eget ultricies nisl nisl eget nisl.
                                </p>
                            </div>
                        ))}
                    </div>
                )
            default:
                return <p className="text-base">Simple modal content</p>
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    Modal Configuration Playground
                </h1>
                <p className="text-lg text-gray-600">
                    Customize the modal to see different configurations in
                    action
                </p>
            </div>

            <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Left Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={config.title}
                                onChange={handleInputChange('title')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={config.subtitle}
                                onChange={handleInputChange('subtitle')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Primary Button Text
                            </label>
                            <input
                                type="text"
                                value={config.primaryButtonText}
                                onChange={handleInputChange(
                                    'primaryButtonText'
                                )}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Secondary Button Text
                            </label>
                            <input
                                type="text"
                                value={config.secondaryButtonText}
                                onChange={handleInputChange(
                                    'secondaryButtonText'
                                )}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Content Type
                            </label>
                            <select
                                value={config.contentType}
                                onChange={handleSelectChange('contentType')}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="basic">Basic</option>
                                <option value="form">Form</option>
                                <option value="long">Long Content</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Primary Button Type
                            </label>
                            <select
                                value={config.primaryButtonType}
                                onChange={handleSelectChange(
                                    'primaryButtonType'
                                )}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                {Object.values(ButtonType).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Secondary Button Type
                            </label>
                            <select
                                value={config.secondaryButtonType}
                                onChange={handleSelectChange(
                                    'secondaryButtonType'
                                )}
                                className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white focus:border-blue-500 focus:outline-none"
                            >
                                {Object.values(ButtonType).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.showCloseButton}
                                        onChange={handleCheckboxChange(
                                            'showCloseButton'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Close Button</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.closeOnBackdropClick}
                                        onChange={handleCheckboxChange(
                                            'closeOnBackdropClick'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Close on Backdrop Click</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.showPrimaryButton}
                                        onChange={handleCheckboxChange(
                                            'showPrimaryButton'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Primary Button</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.showSecondaryButton}
                                        onChange={handleCheckboxChange(
                                            'showSecondaryButton'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Secondary Button</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.primaryButtonDisabled}
                                        onChange={handleCheckboxChange(
                                            'primaryButtonDisabled'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Primary Button Disabled</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.secondaryButtonDisabled}
                                        onChange={handleCheckboxChange(
                                            'secondaryButtonDisabled'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Secondary Button Disabled</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center cursor-pointer text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={config.showDivider}
                                        onChange={handleCheckboxChange(
                                            'showDivider'
                                        )}
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Dividers</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Open Configured Modal"
                        onClick={() => setIsModalOpen(true)}
                        size={ButtonSize.MEDIUM}
                    />
                </div>
            </div>

            {/* Example Modals Section */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Modal Examples
                    </h2>
                    <p className="text-base text-gray-600 mb-6">
                        Pre-configured modal examples for common use cases
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Confirmation Modal */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Confirmation Modal
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Standard confirmation dialog with primary and
                            secondary actions
                        </p>
                        <ConfirmationModalExample />
                    </div>

                    {/* Form Modal */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Form Modal
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Modal containing form elements for data input
                        </p>
                        <FormModalExample />
                    </div>

                    {/* Info Modal */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Info Modal
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Simple informational modal with single action
                        </p>
                        <InfoModalExample />
                    </div>

                    {/* Warning Modal */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Warning Modal
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Warning modal with danger action styling
                        </p>
                        <WarningModalExample />
                    </div>

                    {/* Long Content Modal */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Scrollable Content
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Modal with long content that requires scrolling
                        </p>
                        <LongContentModalExample />
                    </div>

                    {/* No Actions Modal */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            No Actions Modal
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Modal without action buttons, close button only
                        </p>
                        <NoActionsModalExample />
                    </div>

                    {/* Nested Modal */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Nested Modal
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Modal that opens another modal from primary button
                        </p>
                        <NestedModalExample />
                    </div>
                </div>
            </div>

            {/* Modal with current configuration */}
            <Modal
                data-component="popUpConfirm Some PopUp6"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={config.title}
                subtitle={config.subtitle}
                primaryAction={
                    config.showPrimaryButton
                        ? {
                              text: config.primaryButtonText,
                              onClick: () => alert('Primary action clicked!'),
                              disabled: config.primaryButtonDisabled,
                              buttonType: config.primaryButtonType,
                          }
                        : undefined
                }
                secondaryAction={
                    config.showSecondaryButton
                        ? {
                              text: config.secondaryButtonText,
                              onClick: () => alert('Secondary action clicked!'),
                              disabled: config.secondaryButtonDisabled,
                              buttonType: config.secondaryButtonType,
                          }
                        : undefined
                }
                showCloseButton={config.showCloseButton}
                closeOnBackdropClick={config.closeOnBackdropClick}
                showDivider={config.showDivider}
            >
                {renderModalContent()}
            </Modal>
        </div>
    )
}

// Example Modal Components
const ConfirmationModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                text="Open Confirmation"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Delete Item"
                subtitle="Are you sure you want to delete this item? This action cannot be undone."
                primaryAction={{
                    text: 'Delete',
                    onClick: () => {
                        alert('Item deleted!')
                        setIsOpen(false)
                    },
                    buttonType: ButtonType.DANGER,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <p className="text-gray-600">
                    This will permanently remove the item from your account. All
                    associated data will be lost.
                </p>
            </Modal>
        </>
    )
}

const FormModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [projectName, setProjectName] = useState('')

    return (
        <>
            <Button
                text="Open Form"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create New Project"
                subtitle="Fill in the details to create a new project"
                primaryAction={{
                    text: 'Create Project',
                    onClick: () => {
                        alert('Project created!')
                        setIsOpen(false)
                    },
                    buttonType: ButtonType.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <form
                    onSubmit={(e) => {
                        e.stopPropagation()
                        console.log('submitted')
                    }}
                    className="space-y-4"
                >
                    <div>
                        <TextInput
                            label="Project Name"
                            value={projectName}
                            onChange={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setProjectName(e.target.value)
                            }}
                            placeholder="Enter project name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            placeholder="Enter project description"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Web Development</option>
                            <option>Mobile App</option>
                            <option>Design</option>
                            <option>Other</option>
                        </select>
                    </div>
                </form>
            </Modal>
        </>
    )
}

const InfoModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                text="Show Info"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Welcome to the Platform"
                subtitle="Here's what you need to know to get started"
                primaryAction={{
                    text: 'Got it',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonType.PRIMARY,
                }}
            >
                <div className="space-y-3">
                    <p className="text-gray-600">
                        Welcome to our platform! Here are some key features to
                        help you get started:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Create and manage projects</li>
                        <li>Collaborate with team members</li>
                        <li>Track progress and milestones</li>
                        <li>Generate reports and analytics</li>
                    </ul>
                </div>
            </Modal>
        </>
    )
}

const WarningModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                text="Show Warning"
                buttonType={ButtonType.DANGER}
                size={ButtonSize.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Account Suspension Warning"
                subtitle="Your account is at risk of being suspended"
                primaryAction={{
                    text: 'Take Action',
                    onClick: () => {
                        alert('Redirecting to account settings...')
                        setIsOpen(false)
                    },
                    buttonType: ButtonType.DANGER,
                }}
                secondaryAction={{
                    text: 'Dismiss',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <div className="space-y-3">
                    <p className="text-gray-600">
                        We've detected unusual activity on your account. Please
                        review and update your security settings to prevent
                        suspension.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <p className="text-red-700 text-sm">
                            <strong>Action Required:</strong> Update your
                            password and enable two-factor authentication within
                            24 hours.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const LongContentModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                text="Show Long Content"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Terms and Conditions"
                subtitle="Please read our terms and conditions carefully"
                primaryAction={{
                    text: 'Accept',
                    onClick: () => {
                        alert('Terms accepted!')
                        setIsOpen(false)
                    },
                    buttonType: ButtonType.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Decline',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div key={index} className="space-y-2">
                            <h4 className="font-semibold text-gray-700">
                                Section {index + 1}
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    )
}

const NoActionsModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                text="Show Info Only"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="System Status"
                subtitle="Current system information"
                primaryAction={{
                    text: 'Close',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonType.PRIMARY,
                    disabled: true,
                }}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-md p-3">
                            <p className="text-green-700 text-sm font-medium">
                                Server Status
                            </p>
                            <p className="text-green-600 text-sm">Online</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <p className="text-blue-700 text-sm font-medium">
                                Database
                            </p>
                            <p className="text-blue-600 text-sm">Connected</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                            <p className="text-yellow-700 text-sm font-medium">
                                API Response
                            </p>
                            <p className="text-yellow-600 text-sm">125ms</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
                            <p className="text-purple-700 text-sm font-medium">
                                Uptime
                            </p>
                            <p className="text-purple-600 text-sm">99.9%</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const NestedModalExample = () => {
    const [isFirstOpen, setIsFirstOpen] = useState(false)
    const [isSecondOpen, setIsSecondOpen] = useState(false)

    return (
        <>
            <Button
                text="Open Nested Modal"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                onClick={() => setIsFirstOpen(true)}
            />

            {/* First Modal */}
            <Modal
                isOpen={isFirstOpen}
                onClose={() => setIsFirstOpen(false)}
                title="First Modal"
                subtitle="This modal will open another modal when you click 'Open Second Modal'"
                primaryAction={{
                    text: 'Open Second Modal',
                    onClick: () => setIsSecondOpen(true),
                    buttonType: ButtonType.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Close',
                    onClick: () => setIsFirstOpen(false),
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        This demonstrates how our portal system handles multiple
                        modals. Click the primary button to open a second modal
                        on top of this one.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-blue-700 text-sm">
                            <strong>Portal Advantage:</strong> Each modal
                            renders in its own portal container, ensuring proper
                            z-index stacking and no interference between modals.
                        </p>
                    </div>
                </div>
            </Modal>

            {/* Second Modal */}
            <Modal
                isOpen={isSecondOpen}
                onClose={() => setIsSecondOpen(false)}
                title="Second Modal"
                subtitle="This modal opened on top of the first modal"
                primaryAction={{
                    text: 'Got it!',
                    onClick: () => setIsSecondOpen(false),
                    buttonType: ButtonType.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Close Both',
                    onClick: () => {
                        setIsSecondOpen(false)
                        setIsFirstOpen(false)
                    },
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Perfect! This second modal is rendered on top of the
                        first modal. Both modals are handled independently by
                        our portal system.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                        <p className="text-green-700 text-sm">
                            <strong>Portal Benefits Demonstrated:</strong>
                        </p>
                        <ul className="text-green-600 text-sm mt-2 space-y-1">
                            <li>• No z-index conflicts between modals</li>
                            <li>• Independent event handling</li>
                            <li>• Proper stacking order</li>
                            <li>• Clean DOM separation</li>
                        </ul>
                    </div>
                    <p className="text-sm text-gray-500">
                        Try closing this modal first, then the first modal, or
                        use "Close Both" to close them in sequence.
                    </p>
                </div>
            </Modal>
        </>
    )
}

export default ModalDemo
