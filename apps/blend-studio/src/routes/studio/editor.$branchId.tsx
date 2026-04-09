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
import { ArrowLeft, Sun, Moon, Play } from 'lucide-react'

export const Route = createFileRoute('/studio/editor/$branchId')({
    component: EditorPage,
})

function EditorPage() {
    const { branchId } = Route.useParams()

    const defaultBrand: BrandConfig = useMemo(
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
                    '500': '#2B7FFF',
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

    const [brand, setBrand] = useState<BrandConfig>(defaultBrand)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [primaryColor, setPrimaryColor] = useState('#2B7FFF')

    const componentTokens = useMemo(() => {
        return resolveBrandTokens(brand, theme)
    }, [brand, theme])

    const handlePrimaryChange = (hex: string) => {
        setPrimaryColor(hex)
        setBrand((prev) => ({
            ...prev,
            colors: {
                ...prev.colors,
                primary: {
                    '50': '#EFF6FF',
                    '100': '#DBEAFE',
                    '200': '#BFDBFE',
                    '300': '#93C5FD',
                    '400': '#60A5FA',
                    '500': hex,
                    '600': '#0561E2',
                    '700': '#004DB8',
                    '800': '#003D94',
                    '900': '#00327A',
                    '950': '#001F52',
                },
            },
        }))
    }

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

                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <Play className="w-4 h-4" />
                            Publish
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    <div className="w-1/2 border-r border-gray-200 overflow-y-auto p-6 bg-white">
                        <h2 className="text-lg font-semibold mb-4">
                            Brand Config
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Primary Color
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={primaryColor}
                                        onChange={(e) =>
                                            handlePrimaryChange(e.target.value)
                                        }
                                        className="w-10 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={primaryColor}
                                        onChange={(e) =>
                                            handlePrimaryChange(e.target.value)
                                        }
                                        className="px-3 py-2 border rounded font-mono text-sm flex-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand JSON
                                </label>
                                <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
                                    {JSON.stringify(brand, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 overflow-y-auto bg-gray-50">
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
                                    </div>
                                </div>
                            </div>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </RequireAuth>
    )
}
