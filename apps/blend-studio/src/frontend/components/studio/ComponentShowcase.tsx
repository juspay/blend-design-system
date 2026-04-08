'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const ThemeProvider = dynamic(
    () =>
        import('@juspay/blend-design-system').then((mod) => ({
            default: mod.ThemeProvider,
        })),
    { ssr: false }
)

const ButtonV2 = dynamic(
    () =>
        import('@juspay/blend-design-system').then((mod) => ({
            default: mod.ButtonV2,
        })),
    { ssr: false }
)

interface ComponentShowcaseProps {
    componentTokens: Record<string, unknown> | null
    theme?: 'light' | 'dark'
}

export function ComponentShowcase({
    componentTokens,
    theme = 'light',
}: ComponentShowcaseProps) {
    if (!componentTokens) {
        return (
            <div className="p-8 text-center text-gray-500">
                <p>No tokens loaded. Configure your brand to see a preview.</p>
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme} componentTokens={componentTokens}>
            <div className="p-6 space-y-8 bg-gray-50 min-h-full">
                <ButtonSection />
                <InputSection />
                <TagSection />
                <AlertSection />
            </div>
        </ThemeProvider>
    )
}

function ButtonSection() {
    return (
        <Section title="Buttons">
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <ButtonV2 text="Primary" />
                    <ButtonV2 text="Secondary" buttonType="SECONDARY" />
                    <ButtonV2 text="Danger" buttonType="DANGER" />
                    <ButtonV2 text="Success" buttonType="SUCCESS" />
                    <ButtonV2 text="Ghost" buttonType="GHOST" />
                </div>

                <div className="flex flex-wrap gap-2">
                    <ButtonV2 text="Small" size="SMALL" />
                    <ButtonV2 text="Medium" size="MEDIUM" />
                    <ButtonV2 text="Large" size="LARGE" />
                </div>

                <div className="flex flex-wrap gap-2">
                    <ButtonV2 text="Disabled" isDisabled />
                    <ButtonV2 text="Loading" isLoading />
                </div>
            </div>
        </Section>
    )
}

function InputSection() {
    const TextInputV2 = dynamic(
        () =>
            import('@juspay/blend-design-system').then((mod) => ({
                default: mod.TextInputV2,
            })),
        { ssr: false }
    )

    return (
        <Section title="Text Inputs">
            <div className="space-y-4 max-w-md">
                <TextInputV2
                    label="Default Input"
                    placeholder="Enter text..."
                />
                <TextInputV2 label="With Value" value="Hello World" />
                <TextInputV2
                    label="Error State"
                    placeholder="Enter email"
                    error={{ show: true, message: 'Invalid email format' }}
                />
                <TextInputV2
                    label="Disabled"
                    placeholder="Cannot edit"
                    isDisabled
                />
            </div>
        </Section>
    )
}

function TagSection() {
    const TagV2 = dynamic(
        () =>
            import('@juspay/blend-design-system').then((mod) => ({
                default: mod.TagV2,
            })),
        { ssr: false }
    )

    return (
        <Section title="Tags">
            <div className="flex flex-wrap gap-2">
                <TagV2 text="Default" />
                <TagV2 text="Primary" type="PRIMARY" />
                <TagV2 text="Success" type="SUCCESS" />
                <TagV2 text="Warning" type="WARNING" />
                <TagV2 text="Error" type="ERROR" />
            </div>
        </Section>
    )
}

function AlertSection() {
    const AlertV2 = dynamic(
        () =>
            import('@juspay/blend-design-system').then((mod) => ({
                default: mod.AlertV2,
            })),
        { ssr: false }
    )

    return (
        <Section title="Alerts">
            <div className="space-y-3 max-w-lg">
                <AlertV2
                    title="Information"
                    description="This is an informational alert."
                    type="INFO"
                />
                <AlertV2
                    title="Success"
                    description="Your changes have been saved."
                    type="SUCCESS"
                />
                <AlertV2
                    title="Warning"
                    description="Please review before continuing."
                    type="WARNING"
                />
                <AlertV2
                    title="Error"
                    description="Something went wrong."
                    type="ERROR"
                />
            </div>
        </Section>
    )
}

function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                {title}
            </h3>
            {children}
        </section>
    )
}
