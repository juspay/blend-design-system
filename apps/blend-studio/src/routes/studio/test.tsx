import { createFileRoute } from '@tanstack/react-router'
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
import { useAuth } from '@/contexts/AuthContext'

export const Route = createFileRoute('/studio/test')({
    component: TestPage,
})

const defaultBrand: BrandConfig = {
    brandId: 'test/demo',
    name: 'Test Brand',
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
}

function TestPage() {
    const { isConfigured, user } = useAuth()
    const [brand, setBrand] = useState<BrandConfig>(defaultBrand)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [primaryColor, setPrimaryColor] = useState('#2B7FFF')
    const [health, setHealth] = useState<string | null>(null)
    const [branchesResult, setBranchesResult] = useState<string | null>(null)

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
        <ThemeProvider theme={theme} componentTokens={componentTokens}>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Token Studio Test
                        </h1>
                        <p className="text-gray-600">
                            Test token resolution and component rendering
                        </p>
                        <div className="mt-4">
                            <Alert
                                heading="Auth status"
                                description={
                                    isConfigured
                                        ? user
                                            ? `Signed in as ${user.email ?? user.uid}`
                                            : 'Firebase configured, but you are not signed in. Studio routes will redirect to /login.'
                                        : 'Firebase not configured (demo mode). Studio routes are open; API calls requiring auth will 401/403.'
                                }
                                variant={AlertVariant.PRIMARY}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Controls</h2>
                        <div className="flex flex-wrap gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Theme
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`px-4 py-2 rounded ${
                                            theme === 'light'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        Light
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`px-4 py-2 rounded ${
                                            theme === 'dark'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        Dark
                                    </button>
                                </div>
                            </div>

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
                                        className="px-3 py-2 border rounded font-mono text-sm w-28"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Backend smoke test
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={async () => {
                                            setHealth(null)
                                            const res =
                                                await fetch('/api/health')
                                            const json = await res.json()
                                            setHealth(
                                                JSON.stringify(
                                                    {
                                                        status: res.status,
                                                        json,
                                                    },
                                                    null,
                                                    2
                                                )
                                            )
                                        }}
                                        className="px-4 py-2 rounded bg-gray-900 text-white"
                                    >
                                        GET /api/health
                                    </button>
                                    <button
                                        onClick={async () => {
                                            setBranchesResult(null)
                                            const res = await fetch(
                                                '/api/studio/branches'
                                            )
                                            const json = await res.json()
                                            setBranchesResult(
                                                JSON.stringify(
                                                    {
                                                        status: res.status,
                                                        json,
                                                    },
                                                    null,
                                                    2
                                                )
                                            )
                                        }}
                                        className="px-4 py-2 rounded bg-gray-200"
                                    >
                                        GET /api/studio/branches (no auth)
                                    </button>
                                </div>
                            </div>
                        </div>
                        {(health || branchesResult) && (
                            <pre className="mt-4 text-xs bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto max-h-64">
                                {health ?? branchesResult}
                            </pre>
                        )}
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">
                            Components
                        </h2>
                        <div className="space-y-6">
                            <div>
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

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">
                                    Alerts
                                </h3>
                                <div className="space-y-3 max-w-lg">
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
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">
                            Resolved tokens (debug)
                        </h2>
                        <pre className="text-xs bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto max-h-96">
                            {JSON.stringify(componentTokens, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
