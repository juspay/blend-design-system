import React from 'react'
import { ThemeProvider } from '@juspay/blend-design-system'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system/deprecated/button'
import {
    Alert,
    AlertVariant,
} from '@juspay/blend-design-system/deprecated/alert'

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
                    <Button text="Primary" />
                    <Button
                        text="Secondary"
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button text="Danger" buttonType={ButtonType.DANGER} />
                    <Button text="Success" buttonType={ButtonType.SUCCESS} />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button text="Small" size={ButtonSize.SMALL} />
                    <Button text="Medium" size={ButtonSize.MEDIUM} />
                    <Button text="Large" size={ButtonSize.LARGE} />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button text="Disabled" disabled />
                    <Button text="Loading" loading />
                </div>
            </div>
        </Section>
    )
}

function AlertSection() {
    return (
        <Section title="Alerts">
            <div className="space-y-3 max-w-lg">
                <Alert
                    heading="Primary"
                    description="This is a primary alert."
                    variant={AlertVariant.PRIMARY}
                />
                <Alert
                    heading="Success"
                    description="Your changes have been saved."
                    variant={AlertVariant.SUCCESS}
                />
                <Alert
                    heading="Warning"
                    description="Please review before continuing."
                    variant={AlertVariant.WARNING}
                />
                <Alert
                    heading="Error"
                    description="Something went wrong."
                    variant={AlertVariant.ERROR}
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
