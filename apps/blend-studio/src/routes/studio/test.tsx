import { createFileRoute } from '@tanstack/react-router'
import {
    ThemeProvider,
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    AlertV2,
    AlertV2Type,
    AlertV2SubType,
    TextInputV2,
    CheckboxV2,
    SwitchV2,
    TagV2,
    TagV2Color,
    StatCardV2,
    StatCardV2ChangeType,
    StatCardV2ArrowDirection,
    Slider,
    SliderSize,
    SliderVariant,
} from '@juspay/blend-design-system'
import {
    resolveBrandTokens,
    type BrandConfig,
    validateBrandConfig,
    type ValidationResult,
} from '@blend-design/token-engine'
import { useState, useMemo, useCallback } from 'react'
import {
    Palette,
    Code,
    Layout,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Download,
    Copy,
    Check,
} from 'lucide-react'

export const Route = createFileRoute('/studio/test')({
    component: DevTestPage,
})

const defaultBrand: BrandConfig = {
    brandId: 'demo/brand',
    name: 'Demo Brand',
    version: '1.0.0',
    colors: {
        primary: {
            '50': '#EFF6FF',
            '100': '#DBEAFE',
            '200': '#BFDBFE',
            '300': '#93C5FD',
            '400': '#60A5FA',
            '500': '#3B82F6',
            '600': '#2563EB',
            '700': '#1D4ED8',
            '800': '#1E40AF',
            '900': '#1E3A8A',
            '950': '#172554',
        },
        gray: {
            '50': '#F9FAFB',
            '100': '#F3F4F6',
            '200': '#E5E7EB',
            '300': '#D1D5DB',
            '400': '#9CA3AF',
            '500': '#6B7280',
            '600': '#4B5563',
            '700': '#374151',
            '800': '#1F2937',
            '900': '#111827',
            '950': '#030712',
        },
        red: { '500': '#EF4444' },
        green: { '500': '#10B981' },
    },
    radius: {
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        full: '9999px',
    },
}

function DevTestPage() {
    // Dev test page - always accessible, no auth required
    // This page is for testing token engine and components
    return <DevTestContent />
}

function DevTestContent() {
    const [brand, setBrand] = useState<BrandConfig>(defaultBrand)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [primaryColor, setPrimaryColor] = useState('#3B82F6')
    const [radius, setRadius] = useState('10px')
    const [activeTab, setActiveTab] = useState('editor')
    const [copied, setCopied] = useState(false)
    const [validationResult, setValidationResult] =
        useState<ValidationResult | null>(null)

    // Resolve tokens safely
    const componentTokens = useMemo((): Record<string, unknown> => {
        try {
            return resolveBrandTokens(brand, theme) || {}
        } catch (err) {
            console.error('Token resolution error:', err)
            return {}
        }
    }, [brand, theme])

    // Validate config
    const validateConfig = useCallback(() => {
        const result = validateBrandConfig(brand)
        setValidationResult(result)
        return result.valid
    }, [brand])

    // Handle primary color change
    const handlePrimaryChange = (hex: string) => {
        setPrimaryColor(hex)
        setBrand((prev) => ({
            ...prev,
            colors: {
                ...prev.colors,
                primary: generateColorScale(hex),
            },
        }))
    }

    // Handle radius change
    const handleRadiusChange = (value: string) => {
        setRadius(value)
        setBrand((prev) => ({
            ...prev,
            radius: {
                ...prev.radius,
                '8': value,
                '10': value,
                '12': value,
            },
        }))
    }

    // Copy brand config
    const copyConfig = () => {
        navigator.clipboard.writeText(JSON.stringify(brand, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Download brand config
    const downloadConfig = () => {
        const blob = new Blob([JSON.stringify(brand, null, 2)], {
            type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${brand.brandId.replace('/', '-')}-brand.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    // Reset to default
    const resetToDefault = () => {
        setBrand(defaultBrand)
        setPrimaryColor('#3B82F6')
        setRadius('10px')
    }

    const tokenKeys = useMemo(() => {
        return componentTokens ? Object.keys(componentTokens) : []
    }, [componentTokens])

    const tokenSize = useMemo(() => {
        return componentTokens
            ? JSON.stringify(componentTokens).length.toLocaleString()
            : '0'
    }, [componentTokens])

    return (
        <ThemeProvider theme={theme} componentTokens={componentTokens}>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Palette className="w-6 h-6 text-blue-600" />
                                Blend Token Studio - Dev Mode
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Test and validate design tokens before
                                production.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() =>
                                    setTheme(
                                        theme === 'light' ? 'dark' : 'light'
                                    )
                                }
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                            >
                                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                            </button>
                            <button
                                onClick={validateConfig}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Validate
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Tabs */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="flex border-b border-gray-200">
                                {[
                                    {
                                        id: 'editor',
                                        label: '🎨 Token Editor',
                                        icon: Palette,
                                    },
                                    {
                                        id: 'preview',
                                        label: '👁️ Live Preview',
                                        icon: Layout,
                                    },
                                    {
                                        id: 'export',
                                        label: '💾 Export',
                                        icon: Code,
                                    },
                                    {
                                        id: 'about',
                                        label: 'ℹ️ About',
                                        icon: AlertCircle,
                                    },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                                            activeTab === tab.id
                                                ? 'border-blue-600 text-blue-600 bg-blue-50'
                                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {activeTab === 'editor' && (
                                    <TokenEditorTab
                                        brand={brand}
                                        primaryColor={primaryColor}
                                        radius={radius}
                                        onPrimaryChange={handlePrimaryChange}
                                        onRadiusChange={handleRadiusChange}
                                        validationResult={validationResult}
                                    />
                                )}

                                {activeTab === 'preview' && (
                                    <LivePreviewTab tokenKeys={tokenKeys} />
                                )}

                                {activeTab === 'export' && (
                                    <ExportTab
                                        brand={brand}
                                        componentTokens={componentTokens}
                                        tokenSize={tokenSize}
                                        copied={copied}
                                        onCopy={copyConfig}
                                        onDownload={downloadConfig}
                                        onReset={resetToDefault}
                                    />
                                )}

                                {activeTab === 'about' && <AboutTab />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

// Token Editor Tab
function TokenEditorTab({
    brand,
    primaryColor,
    radius,
    onPrimaryChange,
    onRadiusChange,
    validationResult,
}: {
    brand: BrandConfig
    primaryColor: string
    radius: string
    onPrimaryChange: (hex: string) => void
    onRadiusChange: (value: string) => void
    validationResult: ValidationResult | null
}) {
    return (
        <div className="space-y-6">
            {validationResult && (
                <div
                    className={`p-4 rounded-lg border ${
                        validationResult.valid
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                >
                    <div className="flex items-center gap-2 font-medium">
                        {validationResult.valid ? (
                            <CheckCircle2 className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        {validationResult.valid
                            ? 'Valid Brand Configuration'
                            : 'Validation Errors'}
                    </div>
                    {validationResult.errors.length > 0 && (
                        <ul className="mt-2 ml-7 text-sm list-disc">
                            {validationResult.errors.map((err, i) => (
                                <li key={i}>
                                    {err.path}: {err.message}
                                </li>
                            ))}
                        </ul>
                    )}
                    {validationResult.warnings.length > 0 && (
                        <ul className="mt-2 ml-7 text-sm list-disc text-amber-700">
                            {validationResult.warnings.map((warn, i) => (
                                <li key={i}>
                                    {warn.path}: {warn.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Primary Color */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Primary Brand Color
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) =>
                                    onPrimaryChange(e.target.value)
                                }
                                className="w-16 h-16 rounded-lg cursor-pointer border-0"
                            />
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hex Value
                                </label>
                                <input
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e) =>
                                        onPrimaryChange(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                                    placeholder="#3B82F6"
                                />
                            </div>
                        </div>

                        {/* Color Scale Preview */}
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Generated Color Scale
                            </p>
                            <div className="grid grid-cols-11 gap-1">
                                {[
                                    '50',
                                    '100',
                                    '200',
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900',
                                    '950',
                                ].map((shade) => (
                                    <div key={shade} className="text-center">
                                        <div
                                            className="aspect-square rounded"
                                            style={{
                                                backgroundColor:
                                                    brand.colors?.primary?.[
                                                        shade
                                                    ] || '#ccc',
                                            }}
                                            title={`${shade}: ${brand.colors?.primary?.[shade]}`}
                                        />
                                        <span className="text-[10px] text-gray-500">
                                            {shade}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Border Radius */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Layout className="w-5 h-5" />
                        Border Radius
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Base Radius: {radius}
                            </label>
                            <Slider
                                variant={SliderVariant.PRIMARY}
                                size={SliderSize.MEDIUM}
                                value={[parseInt(radius)]}
                                min={0}
                                max={32}
                                step={1}
                                onValueChange={(vals) => {
                                    if (vals.length > 0)
                                        onRadiusChange(`${vals[0]}px`)
                                }}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0px (Sharp)</span>
                                <span>16px (Rounded)</span>
                                <span>32px (Pill)</span>
                            </div>
                        </div>

                        {/* Radius Preview */}
                        <div className="grid grid-cols-4 gap-3 pt-4">
                            {[
                                '0px',
                                '4px',
                                '8px',
                                '16px',
                                '20px',
                                '24px',
                                '9999px',
                            ].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => onRadiusChange(r)}
                                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                                        radius === r
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div
                                        className="w-full h-8 bg-blue-500 mb-2"
                                        style={{ borderRadius: r }}
                                    />
                                    <span className="text-xs font-medium">
                                        {r}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Live Preview Tab
function LivePreviewTab({ tokenKeys }: { tokenKeys: string[] }) {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>Live Preview:</strong> All components below are
                    rendered using your brand tokens. Changes in the Token
                    Editor are reflected here in real-time.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Buttons */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Buttons
                    </h3>
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            <ButtonV2 text="Primary" />
                            <ButtonV2
                                text="Secondary"
                                buttonType={ButtonV2Type.SECONDARY}
                            />
                            <ButtonV2
                                text="Danger"
                                buttonType={ButtonV2Type.DANGER}
                            />
                            <ButtonV2
                                text="Success"
                                buttonType={ButtonV2Type.SUCCESS}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <ButtonV2 text="Small" size={ButtonV2Size.SMALL} />
                            <ButtonV2
                                text="Medium"
                                size={ButtonV2Size.MEDIUM}
                            />
                            <ButtonV2 text="Large" size={ButtonV2Size.LARGE} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <ButtonV2 text="Disabled" disabled />
                            <ButtonV2 text="Loading" loading />
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Alerts
                    </h3>
                    <div className="space-y-3">
                        <AlertV2
                            type={AlertV2Type.PRIMARY}
                            subType={AlertV2SubType.SUBTLE}
                            heading="Primary Alert"
                            description="This uses your primary brand color."
                        />
                        <AlertV2
                            type={AlertV2Type.SUCCESS}
                            subType={AlertV2SubType.SUBTLE}
                            heading="Success"
                            description="Your brand tokens are working!"
                        />
                    </div>
                </div>

                {/* Form Elements */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Form Inputs
                    </h3>
                    <div className="space-y-4">
                        <TextInputV2
                            label="Text Input"
                            placeholder="Enter text..."
                            value="Sample text"
                            onChange={() => {}}
                        />
                        <CheckboxV2
                            label="Subscribe to newsletter"
                            checked={false}
                            onCheckedChange={() => {}}
                        />
                        <SwitchV2
                            label="Enable notifications"
                            checked={true}
                            onCheckedChange={() => {}}
                        />
                    </div>
                </div>

                {/* Tags & Stats */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Tags & Stats
                    </h3>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <TagV2 text="Default" />
                            <TagV2 text="Primary" color={TagV2Color.PRIMARY} />
                            <TagV2 text="Success" color={TagV2Color.SUCCESS} />
                        </div>
                        <StatCardV2
                            title="Total Revenue"
                            value="2.4M"
                            change={{
                                value: '12',
                                changeType: StatCardV2ChangeType.INCREASE,
                                arrowDirection: StatCardV2ArrowDirection.UP,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Token Debug Info */}
            <div className="bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Resolved Token Keys ({tokenKeys.length} components)
                </h3>
                <div className="text-xs text-gray-400 font-mono">
                    {tokenKeys.map((key) => (
                        <span
                            key={key}
                            className="inline-block bg-gray-800 rounded px-2 py-1 m-1"
                        >
                            {key}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Export Tab
function ExportTab({
    brand,
    componentTokens,
    tokenSize,
    copied,
    onCopy,
    onDownload,
    onReset,
}: {
    brand: BrandConfig
    componentTokens: Record<string, unknown>
    tokenSize: string
    copied: boolean
    onCopy: () => void
    onDownload: () => void
    onReset: () => void
}) {
    const sampleToken = componentTokens ? Object.keys(componentTokens)[0] : null

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Brand Config */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Brand Configuration
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={onCopy}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                                onClick={onDownload}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                        {JSON.stringify(brand, null, 2)}
                    </pre>
                </div>

                {/* Resolved Tokens Preview */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Resolved Component Tokens (Sample)
                    </h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                        {JSON.stringify(
                            {
                                _note: 'Full tokens are very large. Showing first component only.',
                                sample: sampleToken
                                    ? {
                                          key: sampleToken,
                                          value: componentTokens[sampleToken],
                                      }
                                    : 'No tokens resolved',
                            },
                            null,
                            2
                        )}
                    </pre>
                </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                    <RefreshCw className="w-4 h-4" />
                    Reset to Defaults
                </button>
                <p className="text-sm text-gray-500">
                    Total tokens: ~{tokenSize} characters
                </p>
            </div>
        </div>
    )
}

// About Tab
function AboutTab() {
    return (
        <div className="prose prose-blue max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                About Blend Token Studio
            </h3>

            <div className="space-y-6 text-gray-600">
                <section>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                        What is this?
                    </h4>
                    <p>
                        Blend Token Studio is a design token management system
                        that allows you to customize the appearance of Blend
                        Design System components without touching any code.
                    </p>
                </section>

                <section>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                        How it works
                    </h4>
                    <ol className="list-decimal ml-5 space-y-2">
                        <li>
                            <strong>Brand Config</strong> - Define your brand
                            colors, border radius, and foundation tokens
                        </li>
                        <li>
                            <strong>Token Resolution</strong> - The Token Engine
                            generates component-specific tokens for all 26+
                            components
                        </li>
                        <li>
                            <strong>Live Preview</strong> - See changes
                            instantly
                        </li>
                        <li>
                            <strong>Export & Use</strong> - Download brand.json
                            and use in your app
                        </li>
                    </ol>
                </section>

                <section>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                        Integration Steps
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div>
                            <p className="font-medium text-gray-900">
                                1. Install CLI (once)
                            </p>
                            <code className="text-sm bg-gray-800 text-gray-100 px-2 py-1 rounded">
                                npm install -g blend-token-studio
                            </code>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                2. Initialize in your project
                            </p>
                            <code className="text-sm bg-gray-800 text-gray-100 px-2 py-1 rounded">
                                npx blend-token-studio init
                            </code>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                3. Apply your brand
                            </p>
                            <code className="text-sm bg-gray-800 text-gray-100 px-2 py-1 rounded">
                                npx blend-token-studio brand --primary "#E31837"
                            </code>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                4. Use in React
                            </p>
                            <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded mt-1">
                                {`import { BlendProvider } from './blend/provider'

<BlendProvider>
  <App />
</BlendProvider>`}
                            </pre>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

// Helper function to generate color scale
function generateColorScale(baseHex: string): Record<string, string> {
    const scale: Record<string, string> = {}
    const shades = [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '950',
    ]

    shades.forEach((shade, index) => {
        if (shade === '500') {
            scale[shade] = baseHex
        } else {
            const factor = index < 5 ? (5 - index) * 0.15 : (index - 5) * -0.15
            scale[shade] = adjustColorBrightness(baseHex, factor)
        }
    })

    return scale
}

// Helper to adjust color brightness
function adjustColorBrightness(hex: string, factor: number): string {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.min(255, Math.max(0, (num >> 16) + factor * 255))
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + factor * 255))
    const b = Math.min(255, Math.max(0, (num & 0x00ff) + factor * 255))
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
