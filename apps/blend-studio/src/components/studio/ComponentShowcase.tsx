import {
    ThemeProvider,
    Button,
    ButtonType,
    Alert,
    AlertVariant,
    Tag,
} from '@juspay/blend-design-system'
import type { ComponentTokenType } from '@juspay/blend-design-system'

interface ComponentShowcaseProps {
    tokens: ComponentTokenType | null
    theme: 'light' | 'dark'
}

export function ComponentShowcase({ tokens, theme }: ComponentShowcaseProps) {
    if (!tokens) {
        return (
            <div className="p-8 text-center text-gray-500">
                Loading components...
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme} componentTokens={tokens}>
            <div className="p-8 space-y-8 max-w-6xl mx-auto">
                {/* Color Preview */}
                <PreviewSection title="Color Palette">
                    <ColorPreview />
                </PreviewSection>

                {/* Buttons */}
                <PreviewSection title="Buttons">
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                                Variants
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button text="Primary" />
                                <Button
                                    text="Secondary"
                                    buttonType={ButtonType.SECONDARY}
                                />
                                <Button
                                    text="Danger"
                                    buttonType={ButtonType.DANGER}
                                />
                                <Button
                                    text="Success"
                                    buttonType={ButtonType.SUCCESS}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                                States
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button text="Default" />
                                <Button text="Disabled" disabled />
                                <Button text="Loading" loading />
                            </div>
                        </div>
                    </div>
                </PreviewSection>

                {/* Tags */}
                <PreviewSection title="Tags & Badges">
                    <div className="flex flex-wrap gap-2">
                        <Tag text="Default" />
                        <Tag text="Primary" />
                        <Tag text="Highlight" />
                    </div>
                </PreviewSection>

                {/* Feedback */}
                <PreviewSection title="Feedback Components">
                    <div className="space-y-4">
                        <Alert
                            heading="Information"
                            description="This is a primary alert with helpful information."
                            variant={AlertVariant.PRIMARY}
                        />
                        <Alert
                            heading="Success"
                            description="Your changes have been saved successfully."
                            variant={AlertVariant.SUCCESS}
                        />
                        <Alert
                            heading="Warning"
                            description="Please review your settings before continuing."
                            variant={AlertVariant.WARNING}
                        />
                        <Alert
                            heading="Error"
                            description="Something went wrong. Please try again."
                            variant={AlertVariant.ERROR}
                        />
                    </div>
                </PreviewSection>
            </div>
        </ThemeProvider>
    )
}

function PreviewSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                {title}
            </h3>
            {children}
        </div>
    )
}

function ColorPreview() {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

    return (
        <div className="space-y-3">
            <div>
                <div className="text-xs text-gray-500 mb-2">Primary Colors</div>
                <div className="grid grid-cols-11 gap-1">
                    {shades.map((shade) => (
                        <div key={shade} className="text-center">
                            <div
                                className="aspect-square rounded"
                                style={{
                                    backgroundColor: `var(--blend-primary-${shade})`,
                                }}
                            />
                            <div className="text-[10px] text-gray-400 mt-1">
                                {shade}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
