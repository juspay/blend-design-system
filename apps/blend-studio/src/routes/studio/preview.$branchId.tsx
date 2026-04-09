import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import {
    ThemeProvider,
    Button,
    ButtonType,
    Alert,
    AlertVariant,
} from '@juspay/blend-design-system'
import {
    resolveBrandTokens,
    type BrandConfig,
} from '@blend-design/token-engine'
import { useState, useMemo } from 'react'
import { ArrowLeft, Sun, Moon } from 'lucide-react'

export const Route = createFileRoute('/studio/preview/$branchId')({
    component: PreviewPage,
})

function PreviewPage() {
    const { branchId } = Route.useParams()

    const brand: BrandConfig = useMemo(
        () => ({
            brandId: branchId,
            name: branchId.split('/')[1] || 'Brand',
            version: '1.0.0',
            colors: {
                primary: {
                    '50': '#EFF6FF',
                    '100': '#DBEAFE',
                    '200': '#BFDBFE',
                    '300': '#93C5FD',
                    '400': '#60A5FA',
                    '500': '#E31837',
                    '600': '#0561E2',
                    '700': '#004DB8',
                    '800': '#003D94',
                    '900': '#00327A',
                    '950': '#001F52',
                },
            },
        }),
        [branchId]
    )

    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const componentTokens = useMemo(() => {
        return resolveBrandTokens(brand, theme)
    }, [brand, theme])

    return (
        <RequireAuth>
            <div className="h-screen flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-4">
                        <a
                            href="/studio"
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </a>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">
                                {brand.name}
                            </h1>
                            <p className="text-sm text-gray-500 font-mono">
                                {branchId}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-1.5 rounded ${theme === 'light' ? 'bg-white shadow-sm' : ''}`}
                            >
                                <Sun className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-1.5 rounded ${theme === 'dark' ? 'bg-white shadow-sm' : ''}`}
                            >
                                <Moon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <ThemeProvider
                        theme={theme}
                        componentTokens={componentTokens}
                    >
                        <div className="p-6 space-y-8">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 mb-3">
                                    Buttons
                                </h3>
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

                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 mb-3">
                                    Alerts
                                </h3>
                                <div className="space-y-3">
                                    <Alert
                                        heading="Primary"
                                        description="This is a primary alert."
                                        variant={AlertVariant.PRIMARY}
                                    />
                                    <Alert
                                        heading="Success"
                                        description="Changes saved."
                                        variant={AlertVariant.SUCCESS}
                                    />
                                    <Alert
                                        heading="Warning"
                                        description="Please review."
                                        variant={AlertVariant.WARNING}
                                    />
                                    <Alert
                                        heading="Error"
                                        description="Something went wrong."
                                        variant={AlertVariant.ERROR}
                                    />
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </div>
            </div>
        </RequireAuth>
    )
}
