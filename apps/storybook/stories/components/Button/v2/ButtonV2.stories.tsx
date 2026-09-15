import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import {
    ArrowRight,
    Check,
    Download,
    ExternalLink,
    Settings,
} from 'lucide-react'
import {
    ButtonGroupV2,
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    IconButton,
    LinkButton,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const handleClick = fn()

const meta: Meta<typeof ButtonV2> = {
    title: 'Components/Button/ButtonV2',
    component: ButtonV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'Token-driven button actions with four types, three sizes, three subtypes, slots, loading, skeleton, and grouped variants.',
        docs: {
            description: {
                component: `
## Usage

\`ButtonV2\` uses structured slots for leading and trailing content:

\`\`\`tsx
import { ButtonV2, ButtonV2Type } from '@juspay/blend-design-system'

<ButtonV2
    buttonType={ButtonV2Type.PRIMARY}
    text="Continue"
    leftSlot={{ slot: <UploadIcon /> }}
    onClick={handleContinue}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        buttonType: {
            control: 'select',
            options: Object.values(ButtonV2Type),
        },
        size: {
            control: 'select',
            options: Object.values(ButtonV2Size),
        },
        subType: {
            control: 'select',
            options: Object.values(ButtonV2SubType),
        },
        text: { control: 'text' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        width: { control: 'text' },
        justifyContent: {
            control: 'select',
            options: ['flex-start', 'center', 'flex-end', 'space-between'],
        },
        leftSlot: { control: false },
        rightSlot: { control: false },
        skeleton: { control: false },
        onClick: { action: 'clicked' },
    },
    args: {
        buttonType: ButtonV2Type.PRIMARY,
        size: ButtonV2Size.SMALL,
        subType: ButtonV2SubType.DEFAULT,
        text: 'Continue',
        onClick: handleClick,
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ButtonV2>

const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: 12,
}

export const Default: Story = {
    args: {
        leftSlot: { slot: <Download size={16} aria-hidden="true" /> },
        rightSlot: { slot: <ArrowRight size={16} aria-hidden="true" /> },
    },
}

export const ButtonTypes: Story = {
    render: () => (
        <div style={rowStyle}>
            <ButtonV2 text="Primary" buttonType={ButtonV2Type.PRIMARY} />
            <ButtonV2 text="Secondary" buttonType={ButtonV2Type.SECONDARY} />
            <ButtonV2 text="Danger" buttonType={ButtonV2Type.DANGER} />
            <ButtonV2 text="Success" buttonType={ButtonV2Type.SUCCESS} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All four semantic button types: primary, secondary, danger, and success.',
            },
        },
    },
}

export const ButtonSizes: Story = {
    render: () => (
        <div style={rowStyle}>
            <ButtonV2 text="Small" size={ButtonV2Size.SMALL} />
            <ButtonV2 text="Medium" size={ButtonV2Size.MEDIUM} />
            <ButtonV2 text="Large" size={ButtonV2Size.LARGE} />
        </div>
    ),
}

export const ButtonSubTypes: Story = {
    render: () => (
        <div style={rowStyle}>
            <ButtonV2
                text="Default"
                subType={ButtonV2SubType.DEFAULT}
                leftSlot={{ slot: <Check size={16} aria-hidden="true" /> }}
            />
            <ButtonV2
                subType={ButtonV2SubType.ICON_ONLY}
                leftSlot={{ slot: <Settings size={18} aria-hidden="true" /> }}
                aria-label="Open settings"
            />
            <ButtonV2 text="Inline" subType={ButtonV2SubType.INLINE} />
        </div>
    ),
}

export const States: Story = {
    render: () => (
        <div style={rowStyle}>
            <ButtonV2 text="Loading" loading />
            <ButtonV2 text="Disabled" disabled />
            <ButtonV2
                text="Skeleton"
                skeleton={{ showSkeleton: true, skeletonVariant: 'wave' }}
            />
        </div>
    ),
}

export const Slots: Story = {
    render: () => (
        <ButtonV2
            text="Download report"
            leftSlot={{ slot: <Download size={16} aria-hidden="true" /> }}
            rightSlot={{ slot: <ArrowRight size={16} aria-hidden="true" /> }}
            onClick={handleClick}
        />
    ),
}

export const Grouped: Story = {
    render: () => (
        <ButtonGroupV2 gap={8}>
            <ButtonV2
                text="Back"
                buttonType={ButtonV2Type.SECONDARY}
                onClick={handleClick}
            />
            <ButtonV2
                text="Continue"
                buttonType={ButtonV2Type.PRIMARY}
                rightSlot={{
                    slot: <ArrowRight size={16} aria-hidden="true" />,
                }}
                onClick={handleClick}
            />
        </ButtonGroupV2>
    ),
}

export const IconButtons: Story = {
    render: () => (
        <div style={rowStyle}>
            <IconButton
                icon={<Settings size={16} aria-hidden="true" />}
                aria-label="Settings"
                size={ButtonV2Size.SMALL}
            />
            <IconButton
                icon={<Download size={18} aria-hidden="true" />}
                aria-label="Download"
                size={ButtonV2Size.MEDIUM}
                buttonType={ButtonV2Type.SECONDARY}
            />
            <IconButton
                icon={<Check size={20} aria-hidden="true" />}
                aria-label="Confirm"
                size={ButtonV2Size.LARGE}
                buttonType={ButtonV2Type.SUCCESS}
            />
        </div>
    ),
}

export const LinkButtons: Story = {
    render: () => (
        <div style={rowStyle}>
            <LinkButton
                href="#button-v2"
                text="View details"
                rightSlot={{
                    slot: <ExternalLink size={16} aria-hidden="true" />,
                }}
                onClick={(event) => event.preventDefault()}
            />
            <LinkButton
                href="#button-v2-disabled"
                text="Unavailable"
                disabled
            />
        </div>
    ),
}
