import { ModalV2 } from '../../../../packages/blend/lib/components/ModalV2'
import { ButtonV2 } from '../../../../packages/blend/lib/components/ButtonV2'
import {
    ButtonV2Type,
    ButtonV2Size,
} from '../../../../packages/blend/lib/components/ButtonV2'
import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import {
    Menu,
    MultiSelect,
    Popover,
    SingleSelect,
} from '../../../../packages/blend/lib/main'
import {
    AlertTriangle,
    CheckCircle2,
    CreditCard,
    LogOut,
    Search,
    Settings,
    ShieldCheck,
    User,
} from 'lucide-react'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import TagV2 from '../../../../packages/blend/lib/components/TagV2/TagV2'
import {
    TagV2Color,
    TagV2Size,
} from '../../../../packages/blend/lib/components/TagV2/TagV2.types'

const DemoCard = ({
    title,
    description,
    children,
}: {
    title: string
    description: string
    children: ReactNode
}) => (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        {children}
    </div>
)

const StatusRow = ({
    label,
    value,
    color = TagV2Color.NEUTRAL,
}: {
    label: string
    value: string
    color?: TagV2Color
}) => (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-b-0">
        <span className="text-sm text-gray-600">{label}</span>
        <TagV2 text={value} color={color} size={TagV2Size.SM} />
    </div>
)

const ModalV2Demo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)
    // Configuration state
    const [config, setConfig] = useState({
        title: 'Modal Heading',
        subtitle: 'One line description of the modal',
        primaryButtonText: 'Confirm',
        secondaryButtonText: 'Cancel',
        primaryButtonType: ButtonV2Type.PRIMARY,
        secondaryButtonType: ButtonV2Type.SECONDARY,
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
        (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: e.target.checked,
            })
        }

    const handleInputChange =
        (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
            setConfig({
                ...config,
                [field]: e.target.value,
            })
        }

    const handleSelectChange =
        (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
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
                        <p className="text-base text-gray-600">
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
            case 'status':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[560px]">
                        <div className="rounded-md border border-gray-200 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck
                                    size={18}
                                    className="text-green-600"
                                />
                                <h4 className="text-sm font-semibold text-gray-700">
                                    Review Summary
                                </h4>
                            </div>
                            <StatusRow
                                label="Risk score"
                                value="Low"
                                color={TagV2Color.SUCCESS}
                            />
                            <StatusRow
                                label="Verification"
                                value="Passed"
                                color={TagV2Color.SUCCESS}
                            />
                            <StatusRow
                                label="Manual review"
                                value="Needed"
                                color={TagV2Color.WARNING}
                            />
                        </div>
                        <div className="rounded-md border border-gray-200 p-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                Metadata
                            </h4>
                            <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                                <dt className="text-gray-500">Owner</dt>
                                <dd className="text-gray-700">Risk Ops</dd>
                                <dt className="text-gray-500">Updated</dt>
                                <dd className="text-gray-700">Today</dd>
                                <dt className="text-gray-500">Queue</dt>
                                <dd className="text-gray-700">Priority</dd>
                            </dl>
                        </div>
                    </div>
                )
            case 'controls':
                return (
                    <div className="flex flex-col gap-4 min-w-[520px]">
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="search"
                                placeholder="Search team members"
                                className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center gap-2 rounded-md border border-gray-200 p-3 text-sm text-gray-700">
                                <input type="checkbox" defaultChecked />
                                Send email update
                            </label>
                            <label className="flex items-center gap-2 rounded-md border border-gray-200 p-3 text-sm text-gray-700">
                                <input type="checkbox" />
                                Require approval
                            </label>
                        </div>
                        <div className="rounded-md border border-gray-200 p-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Access level
                            </p>
                            <div className="flex gap-2">
                                {['Viewer', 'Editor', 'Admin'].map(
                                    (item, index) => (
                                        <label
                                            key={item}
                                            className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700"
                                        >
                                            <input
                                                name="access-level"
                                                type="radio"
                                                defaultChecked={index === 1}
                                            />
                                            {item}
                                        </label>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )
            case 'empty':
                return (
                    <div className="flex min-w-[420px] flex-col items-center justify-center gap-3 py-8 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-blue-50">
                            <CheckCircle2 size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-gray-700">
                                No pending tasks
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                                This is useful for empty or success-state modal
                                content.
                            </p>
                        </div>
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
                                <option value="status">Status Grid</option>
                                <option value="controls">
                                    Interactive Controls
                                </option>
                                <option value="empty">Empty State</option>
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
                                {Object.values(ButtonV2Type).map((type) => (
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
                                {Object.values(ButtonV2Type).map((type) => (
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
                                        checked={showSkeleton}
                                        onChange={() =>
                                            setShowSkeleton(!showSkeleton)
                                        }
                                        className="mr-2 cursor-pointer"
                                    />
                                    <span>Show Skeleton</span>
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
                    <ButtonV2
                        buttonType={ButtonV2Type.PRIMARY}
                        text="Open Configured Modal"
                        onClick={() => setIsModalOpen(true)}
                        size={ButtonV2Size.MEDIUM}
                    />
                </div>
            </div>

            <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-blue-700" />
                    <h2 className="text-lg font-semibold text-blue-900">
                        V1 parity coverage
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm text-blue-900 md:grid-cols-2">
                    <div className="rounded-md bg-white/70 p-3">
                        <p className="font-medium">Header overflow guard</p>
                        <p className="mt-1 text-blue-700">
                            Long title, subtitle, and header slot content should
                            scroll inside the header instead of stretching the
                            modal.
                        </p>
                    </div>
                    <div className="rounded-md bg-white/70 p-3">
                        <p className="font-medium">Mobile drawer parity</p>
                        <p className="mt-1 text-blue-700">
                            Resize below 1024px to check the bottom-sheet
                            handle, content-driven height, and footer-aware body
                            spacing.
                        </p>
                    </div>
                    <div className="rounded-md bg-white/70 p-3">
                        <p className="font-medium">Tokenized close control</p>
                        <p className="mt-1 text-blue-700">
                            The close icon now uses ModalV2 close-button tokens
                            for size and color.
                        </p>
                    </div>
                    <div className="rounded-md bg-white/70 p-3">
                        <p className="font-medium">Footer-aware body radius</p>
                        <p className="mt-1 text-blue-700">
                            Body corners should resolve correctly with and
                            without footer actions, especially in drawer mode.
                        </p>
                    </div>
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
                    <DemoCard
                        title="Confirmation Modal"
                        description="Standard confirmation dialog with primary and secondary actions"
                    >
                        <ConfirmationModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Form Modal"
                        description="Modal containing form elements, popover, select, multiselect, and menu"
                    >
                        <FormModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Info Modal"
                        description="Simple informational modal with single action"
                    >
                        <InfoModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Warning Modal"
                        description="Warning modal with danger action styling"
                    >
                        <WarningModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Scrollable Content"
                        description="Modal with long content that requires scrolling"
                    >
                        <LongContentModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Disabled Action Modal"
                        description="Modal with a disabled footer action for state checks"
                    >
                        <NoActionsModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Nested Modal"
                        description="Modal that opens another modal from primary button"
                    >
                        <NestedModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Custom Header/Footer"
                        description="Uses customHeader, customFooter, and custom layout content"
                    >
                        <CustomChromeModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Headerless Modal"
                        description="Uses showHeader=false with an accessible title fallback"
                    >
                        <HeaderlessModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Footerless Modal"
                        description="Uses showFooter=false for passive content"
                    >
                        <FooterlessModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Dense Data Modal"
                        description="Wide modal with table-like content and constrained height"
                    >
                        <DenseDataModalExample />
                    </DemoCard>

                    <DemoCard
                        title="No Divider Modal"
                        description="Checks the modal with both header and footer dividers removed"
                    >
                        <NoDividerModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Long Header Guard"
                        description="Stress-tests the 20vh header cap with long title, subtitle, and header slot"
                    >
                        <LongHeaderGuardModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Mobile Drawer Parity"
                        description="Resize below 1024px to check handle, content-driven height, and scroll behavior"
                    >
                        <MobileParityModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Footer-Aware Body"
                        description="Compares footerless body rounding against a footer action modal"
                    >
                        <FooterAwareBodyModalExample />
                    </DemoCard>

                    <DemoCard
                        title="Tokenized Close Icon"
                        description="Verifies close icon sizing/color comes from ModalV2 closeButton tokens"
                    >
                        <TokenizedCloseModalExample />
                    </DemoCard>
                </div>
            </div>

            {/* Modal with current configuration */}
            <ModalV2
                headerSlot={<TagV2 text="New" color={TagV2Color.PRIMARY} />}
                skeleton={{
                    show: showSkeleton,
                    bodySkeletonProps: {
                        show: true,
                        width: '900px',
                        // height: '100%',
                    },
                    variant: 'pulse',
                }}
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
            </ModalV2>
        </div>
    )
}

// Example Modal Components
const ConfirmationModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Confirmation"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
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
                    buttonType: ButtonV2Type.DANGER,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            >
                <p className="text-gray-600">
                    This will permanently remove the item from your account. All
                    associated data will be lost.
                </p>
            </ModalV2>
        </>
    )
}

const FormModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Form"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
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
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            >
                <form
                    onSubmit={(e) => {
                        e.stopPropagation()
                        console.log('submitted')
                    }}
                    className="space-y-4 h-30 overflow-y-auto position-relative z-0 w-[500px]"
                >
                    <Popover
                        trigger={
                            <ButtonV2
                                text="Open Popover"
                                buttonType={ButtonV2Type.PRIMARY}
                                size={ButtonV2Size.SMALL}
                            />
                        }
                    >
                        <div className=" flex flex-col gap-4 p-4">
                            <SingleSelect
                                fullWidth={true}
                                label="Category"
                                items={[
                                    {
                                        groupLabel: undefined,
                                        items: [
                                            {
                                                label: 'Web Development',
                                                value: 'web-development',
                                            },
                                            {
                                                label: 'Mobile App',
                                                value: 'mobile-app',
                                            },
                                            {
                                                label: 'Design',
                                                value: 'design',
                                            },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                            { label: 'Other', value: 'other' },
                                        ],
                                    },
                                ]}
                                selected="web-development"
                                onSelect={(value) => console.log(value)}
                                placeholder="Select category"
                                maxMenuHeight={100}
                            />
                            <MultiSelect
                                fullWidth={true}
                                label="Category"
                                items={[
                                    {
                                        groupLabel: undefined,
                                        items: [
                                            {
                                                label: 'Web Development',
                                                value: 'web-development',
                                            },
                                            {
                                                label: 'Mobile App',
                                                value: 'mobile-app',
                                            },
                                            {
                                                label: 'Design',
                                                value: 'design',
                                            },
                                            { label: 'Other', value: 'other' },
                                        ],
                                    },
                                ]}
                                selectedValues={['web-development']}
                                onChange={(value) => console.log(value)}
                                placeholder="Select category"
                                maxMenuHeight={100}
                            />
                            <Menu
                                trigger={
                                    <ButtonV2
                                        text="Open Menu"
                                        buttonType={ButtonV2Type.PRIMARY}
                                        size={ButtonV2Size.SMALL}
                                    />
                                }
                                items={[
                                    {
                                        items: [
                                            {
                                                label: 'Profile',
                                                slot1: <User size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Profile clicked'
                                                    ),
                                            },
                                            {
                                                label: 'Settings',
                                                slot1: <Settings size={16} />,
                                                slot2: (
                                                    <Text
                                                        fontSize={12}
                                                        color="gray"
                                                    >
                                                        ⌘,
                                                    </Text>
                                                ),
                                                onClick: () =>
                                                    console.log(
                                                        'Settings clicked'
                                                    ),
                                            },
                                            {
                                                label: 'Sign Out',
                                                slot1: <LogOut size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Sign out clicked'
                                                    ),
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </div>
                    </Popover>

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
            </ModalV2>
        </>
    )
}

const InfoModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Show Info"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Welcome to the Platform"
                subtitle="Here's what you need to know to get started"
                primaryAction={{
                    text: 'Got it',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
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
            </ModalV2>
        </>
    )
}

const WarningModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Show Warning"
                buttonType={ButtonV2Type.DANGER}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
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
                    buttonType: ButtonV2Type.DANGER,
                }}
                secondaryAction={{
                    text: 'Dismiss',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
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
            </ModalV2>
        </>
    )
}

const LongContentModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Show Long Content"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
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
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Decline',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
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
            </ModalV2>
        </>
    )
}

const NoActionsModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Show Info Only"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="System Status"
                subtitle="Current system information"
                primaryAction={{
                    text: 'Close',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
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
            </ModalV2>
        </>
    )
}

const NestedModalExample = () => {
    const [isFirstOpen, setIsFirstOpen] = useState(false)
    const [isSecondOpen, setIsSecondOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Nested Modal"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsFirstOpen(true)}
            />

            {/* First Modal */}
            <ModalV2
                isOpen={isFirstOpen}
                onClose={() => setIsFirstOpen(false)}
                title="First Modal"
                subtitle="This modal will open another modal when you click 'Open Second Modal'"
                primaryAction={{
                    text: 'Open Second Modal',
                    onClick: () => setIsSecondOpen(true),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Close',
                    onClick: () => setIsFirstOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
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
            </ModalV2>

            {/* Second Modal */}
            <ModalV2
                isOpen={isSecondOpen}
                onClose={() => setIsSecondOpen(false)}
                title="Second Modal"
                subtitle="This modal opened on top of the first modal"
                primaryAction={{
                    text: 'Got it!',
                    onClick: () => setIsSecondOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Close Both',
                    onClick: () => {
                        setIsSecondOpen(false)
                        setIsFirstOpen(false)
                    },
                    buttonType: ButtonV2Type.SECONDARY,
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
            </ModalV2>
        </>
    )
}

const CustomChromeModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Custom"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                showDivider={false}
                customHeader={
                    <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-semibold text-gray-800">
                                        Payment Review
                                    </h3>
                                    <TagV2
                                        text="High value"
                                        color={TagV2Color.WARNING}
                                        size={TagV2Size.SM}
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    Custom header with icon, tag, and close
                                    action handled by footer controls
                                </p>
                            </div>
                        </div>
                    </div>
                }
                customFooter={
                    <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-5 py-4">
                        <p className="text-sm text-gray-500">
                            Last reviewed 4 minutes ago
                        </p>
                        <div className="flex gap-2">
                            <ButtonV2
                                text="Close"
                                buttonType={ButtonV2Type.SECONDARY}
                                size={ButtonV2Size.SMALL}
                                onClick={() => setIsOpen(false)}
                            />
                            <ButtonV2
                                text="Approve"
                                buttonType={ButtonV2Type.SUCCESS}
                                size={ButtonV2Size.SMALL}
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                }
            >
                <div className="grid min-w-[620px] grid-cols-[1fr_220px] gap-5">
                    <div className="space-y-3">
                        <div className="rounded-md border border-gray-200 p-4">
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-800">
                                INR 2,48,000
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <StatusRow label="Customer" value="Verified" />
                            <StatusRow
                                label="Risk"
                                value="Medium"
                                color={TagV2Color.WARNING}
                            />
                            <StatusRow
                                label="Method"
                                value="Card"
                                color={TagV2Color.PRIMARY}
                            />
                            <StatusRow
                                label="Rules"
                                value="2 flags"
                                color={TagV2Color.ERROR}
                            />
                        </div>
                    </div>
                    <div className="rounded-md bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-700">
                            Timeline
                        </p>
                        <ol className="mt-3 space-y-3 text-sm text-gray-600">
                            <li>Created by checkout</li>
                            <li>Risk rule matched</li>
                            <li>Manual review opened</li>
                        </ol>
                    </div>
                </div>
            </ModalV2>
        </>
    )
}

const HeaderlessModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Headerless"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Quick action"
                showHeader={false}
                primaryAction={{
                    text: 'Run action',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            >
                <div className="flex min-w-[360px] items-start gap-3">
                    <AlertTriangle size={22} className="mt-1 text-amber-600" />
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">
                            Run reconciliation now?
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            This modal intentionally hides the generated header
                            while keeping an accessible dialog label.
                        </p>
                    </div>
                </div>
            </ModalV2>
        </>
    )
}

const FooterlessModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Footerless"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Activity Details"
                subtitle="A passive modal with no footer region"
                showFooter={false}
            >
                <div className="min-w-[420px] space-y-3">
                    {[
                        'User invited two teammates',
                        'Billing address updated',
                        'API key rotated',
                    ].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 rounded-md border border-gray-200 p-3"
                        >
                            <CheckCircle2
                                size={18}
                                className="text-green-600"
                            />
                            <span className="text-sm text-gray-700">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </ModalV2>
        </>
    )
}

const DenseDataModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)
    const rows = [
        ['ORD-1001', 'Captured', 'INR 4,320', 'Low'],
        ['ORD-1002', 'Pending', 'INR 8,120', 'Medium'],
        ['ORD-1003', 'Refunded', 'INR 1,999', 'Low'],
        ['ORD-1004', 'Failed', 'INR 2,500', 'High'],
        ['ORD-1005', 'Captured', 'INR 9,700', 'Low'],
        ['ORD-1006', 'Review', 'INR 12,300', 'Medium'],
    ]

    return (
        <>
            <ButtonV2
                text="Open Dense"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Settlement Batch"
                subtitle="Dense table-style content with horizontal and vertical scanning"
                dimensions={{ maxWidth: '860px' }}
                primaryAction={{
                    text: 'Export',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Close',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            >
                <div className="max-h-[360px] min-w-[760px] overflow-auto">
                    <table className="w-full border-collapse text-left text-sm">
                        <thead className="sticky top-0 bg-white">
                            <tr className="border-b border-gray-200 text-gray-500">
                                <th className="py-2 pr-4 font-medium">Order</th>
                                <th className="py-2 pr-4 font-medium">
                                    Status
                                </th>
                                <th className="py-2 pr-4 font-medium">
                                    Amount
                                </th>
                                <th className="py-2 pr-4 font-medium">Risk</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(([order, status, amount, risk]) => (
                                <tr
                                    key={order}
                                    className="border-b border-gray-100 last:border-b-0"
                                >
                                    <td className="py-3 pr-4 font-medium text-gray-700">
                                        {order}
                                    </td>
                                    <td className="py-3 pr-4 text-gray-600">
                                        {status}
                                    </td>
                                    <td className="py-3 pr-4 text-gray-600">
                                        {amount}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <TagV2
                                            text={risk}
                                            color={
                                                risk === 'High'
                                                    ? TagV2Color.ERROR
                                                    : risk === 'Medium'
                                                      ? TagV2Color.WARNING
                                                      : TagV2Color.SUCCESS
                                            }
                                            size={TagV2Size.SM}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ModalV2>
        </>
    )
}

const NoDividerModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open No Divider"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Soft Confirmation"
                subtitle="Header and footer dividers are disabled"
                showDivider={false}
                primaryAction={{
                    text: 'Continue',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Back',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            >
                <div className="min-w-[420px] rounded-md bg-gray-50 p-4 text-sm text-gray-600">
                    This case checks spacing when the modal has no visual
                    dividers between header, body, and footer.
                </div>
            </ModalV2>
        </>
    )
}

const LongHeaderGuardModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)
    const longTitle =
        'Quarterly settlement review for enterprise merchants with several pending exception queues and regional compliance notes'
    const longSubtitle =
        'This intentionally long subtitle validates that the generated header has a maximum height and scrolls internally instead of forcing the whole modal to become unusably tall.'

    return (
        <>
            <ButtonV2
                text="Open Long Header"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={longTitle}
                subtitle={longSubtitle}
                headerSlot={
                    <div className="flex max-w-[280px] flex-wrap gap-2">
                        <TagV2
                            text="Priority"
                            color={TagV2Color.ERROR}
                            size={TagV2Size.SM}
                        />
                        <TagV2
                            text="Manual review"
                            color={TagV2Color.WARNING}
                            size={TagV2Size.SM}
                        />
                        <TagV2
                            text="Cross-border"
                            color={TagV2Color.PRIMARY}
                            size={TagV2Size.SM}
                        />
                    </div>
                }
                primaryAction={{
                    text: 'Approve',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            >
                <div className="min-w-[520px] space-y-3 text-sm text-gray-600">
                    <p>
                        The header should remain bounded even with verbose
                        title, subtitle, and multiple tags.
                    </p>
                    <div className="rounded-md border border-gray-200 p-3">
                        <StatusRow
                            label="Expected header behavior"
                            value="Capped"
                            color={TagV2Color.SUCCESS}
                        />
                        <StatusRow
                            label="Overflow"
                            value="Scrollable"
                            color={TagV2Color.PRIMARY}
                        />
                    </div>
                </div>
            </ModalV2>
        </>
    )
}

const MobileParityModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Mobile Check"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Mobile Drawer Behavior"
                subtitle="Resize below 1024px to inspect drawer parity"
                useDrawerOnMobile={true}
                primaryAction={{
                    text: 'Done',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            >
                <div className="space-y-3 text-sm text-gray-600 md:min-w-[480px]">
                    <p>
                        On mobile, this should open as a bottom sheet with a
                        visible handle and content-driven height.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            'Sheet handle is visible',
                            'Content height hugs the body',
                            'Footer actions stay separated',
                            'Body scrolls when content grows',
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-2 rounded-md bg-gray-50 p-2"
                            >
                                <CheckCircle2
                                    size={16}
                                    className="text-green-600"
                                />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </ModalV2>
        </>
    )
}

const FooterAwareBodyModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [withFooter, setWithFooter] = useState(false)

    return (
        <>
            <div className="flex flex-wrap gap-2">
                <ButtonV2
                    text="No Footer"
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.SMALL}
                    onClick={() => {
                        setWithFooter(false)
                        setIsOpen(true)
                    }}
                />
                <ButtonV2
                    text="With Footer"
                    buttonType={ButtonV2Type.PRIMARY}
                    size={ButtonV2Size.SMALL}
                    onClick={() => {
                        setWithFooter(true)
                        setIsOpen(true)
                    }}
                />
            </div>
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={
                    withFooter
                        ? 'Body With Footer Actions'
                        : 'Footerless Body Rounding'
                }
                subtitle="Checks the footer-aware body radius and spacing path"
                showFooter={withFooter}
                primaryAction={
                    withFooter
                        ? {
                              text: 'Confirm',
                              onClick: () => setIsOpen(false),
                              buttonType: ButtonV2Type.PRIMARY,
                          }
                        : undefined
                }
                secondaryAction={
                    withFooter
                        ? {
                              text: 'Cancel',
                              onClick: () => setIsOpen(false),
                              buttonType: ButtonV2Type.SECONDARY,
                          }
                        : undefined
                }
            >
                <div className="min-w-[420px] rounded-md bg-gray-50 p-4 text-sm text-gray-600">
                    {withFooter
                        ? 'Footer actions are present, so the footer owns the lower modal radius.'
                        : 'No footer is rendered, so the body owns the lower modal radius.'}
                </div>
            </ModalV2>
        </>
    )
}

const TokenizedCloseModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Close Token"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.SMALL}
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Tokenized Close Control"
                subtitle="The close icon should follow ModalV2 closeButton token size and color"
                headerSlot={
                    <TagV2
                        text="Token check"
                        color={TagV2Color.PURPLE}
                        size={TagV2Size.SM}
                    />
                }
                primaryAction={{
                    text: 'Close',
                    onClick: () => setIsOpen(false),
                    buttonType: ButtonV2Type.PRIMARY,
                }}
            >
                <div className="min-w-[420px] space-y-3 text-sm text-gray-600">
                    <p>
                        This case keeps the default generated header and close
                        button visible so token-driven icon size/color can be
                        inspected.
                    </p>
                    <div className="rounded-md border border-gray-200 p-3">
                        <StatusRow
                            label="Icon source"
                            value="closeButton token"
                            color={TagV2Color.PRIMARY}
                        />
                        <StatusRow
                            label="Header slot"
                            value="Visible"
                            color={TagV2Color.SUCCESS}
                        />
                    </div>
                </div>
            </ModalV2>
        </>
    )
}

export default ModalV2Demo
