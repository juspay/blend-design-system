import { createFileRoute, Link } from '@tanstack/react-router'
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
import {
    useBranchWithMock,
    usePublishVersionWithMock,
    useCreateSnapshotWithMock,
    useVersionsWithMock,
    incrementVersion,
    validateVersion,
} from '@/frontend/hooks/use-studio'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'
import { useState, useMemo, useCallback, useEffect } from 'react'
import {
    ArrowLeft,
    Sun,
    Moon,
    Play,
    Save,
    History,
    Loader2,
} from 'lucide-react'

export const Route = createFileRoute('/studio/editor/$branchId')({
    component: EditorPage,
})

function EditorPage() {
    const { branchId } = Route.useParams()
    const {
        branch,
        loading: branchLoading,
        error: branchError,
        updateBranch,
    } = useBranchWithMock(branchId)
    const { publishVersion, loading: publishLoading } =
        usePublishVersionWithMock(branchId)
    const { createSnapshot } = useCreateSnapshotWithMock(branchId)
    const { versions } = useVersionsWithMock(branchId)

    const [brand, setBrand] = useState<BrandConfig | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [hasChanges, setHasChanges] = useState(false)
    const [saving, setSaving] = useState(false)
    const [showVersionModal, setShowVersionModal] = useState(false)
    const [versionInput, setVersionInput] = useState('')
    const [changelog, setChangelog] = useState('')
    const [activeTab, setActiveTab] = useState<
        'colors' | 'typography' | 'radius' | 'json'
    >('colors')

    useEffect(() => {
        if (branch?.brandConfig) {
            setBrand(branch.brandConfig)
        }
    }, [branch])

    const componentTokens = useMemo(() => {
        if (!brand) return null
        return resolveBrandTokens(brand, theme)
    }, [brand, theme])

    const handleBrandChange = useCallback(
        (updater: (prev: BrandConfig) => BrandConfig) => {
            setBrand((prev) => {
                if (!prev) return prev
                const updated = updater(prev)
                setHasChanges(true)
                return updated
            })
        },
        []
    )

    const handleSave = useCallback(async () => {
        if (!brand || !branchId) return
        setSaving(true)
        try {
            await updateBranch(branchId, { brandConfig: brand })
            await createSnapshot(brand, undefined, false)
            setHasChanges(false)
        } catch (err) {
            console.error('Save failed:', err)
        } finally {
            setSaving(false)
        }
    }, [brand, branchId, updateBranch, createSnapshot])

    const handlePublish = useCallback(async () => {
        if (!brand || !branchId) return

        const suggestedVersion = branch?.latestVersion
            ? incrementVersion(branch.latestVersion, 'patch')
            : '1.0.0'
        setVersionInput(suggestedVersion)
        setShowVersionModal(true)
    }, [brand, branchId, branch?.latestVersion])

    const confirmPublish = useCallback(async () => {
        if (!brand || !validateVersion(versionInput).valid) return

        try {
            await publishVersion({
                version: versionInput,
                brandConfig: brand,
                changelog,
            })
            setShowVersionModal(false)
            setChangelog('')
            setHasChanges(false)
        } catch (err) {
            console.error('Publish failed:', err)
        }
    }, [brand, versionInput, changelog, publishVersion])

    if (branchLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        )
    }

    if (branchError || !branch) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-2">Failed to load branch</p>
                    <p className="text-gray-500 text-sm">{branchError}</p>
                </div>
            </div>
        )
    }

    if (!brand) {
        return null
    }

    return (
        <RequireAuth>
            <div className="h-screen flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/studio"
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-semibold text-gray-900">
                                    {branch.name}
                                </h1>
                                {hasChanges && (
                                    <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                        Unsaved
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-mono">{branchId}</span>
                                {branch.latestVersion && (
                                    <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-blue-600">
                                            v{branch.latestVersion}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-2">
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

                        <button
                            onClick={handleSave}
                            disabled={saving || !hasChanges}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save
                        </button>

                        <button
                            onClick={handlePublish}
                            disabled={publishLoading}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {publishLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Play className="w-4 h-4" />
                            )}
                            Publish
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel - Editor */}
                    <div className="w-96 border-r border-gray-200 overflow-y-auto bg-white">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            {(
                                [
                                    'colors',
                                    'typography',
                                    'radius',
                                    'json',
                                ] as const
                            ).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 px-4 py-3 text-sm font-medium capitalize ${
                                        activeTab === tab
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 space-y-6">
                            {activeTab === 'colors' && (
                                <ColorEditor
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                            {activeTab === 'typography' && (
                                <TypographyEditor
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                            {activeTab === 'radius' && (
                                <RadiusEditor
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                            {activeTab === 'json' && (
                                <JsonEditor
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                        </div>

                        {/* Versions Section */}
                        <div className="border-t border-gray-200 p-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <History className="w-4 h-4" />
                                Version History
                            </h3>
                            <div className="space-y-2">
                                {versions.slice(0, 5).map((v) => (
                                    <div
                                        key={v.id}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="font-mono text-gray-600">
                                            v{v.version}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(
                                                v.publishedAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                                {versions.length === 0 && (
                                    <p className="text-sm text-gray-400 italic">
                                        No published versions yet
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="flex-1 overflow-y-auto bg-gray-50">
                        {componentTokens && (
                            <ThemeProvider
                                theme={theme}
                                componentTokens={componentTokens}
                            >
                                <div className="p-8 space-y-8 max-w-4xl mx-auto">
                                    <PreviewSection title="Buttons">
                                        <div className="flex flex-wrap gap-3">
                                            <Button text="Primary Button" />
                                            <Button
                                                text="Secondary"
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                            />
                                            <Button
                                                text="Danger"
                                                buttonType={ButtonType.DANGER}
                                            />
                                            <Button
                                                text="Success"
                                                buttonType={ButtonType.SUCCESS}
                                            />
                                            <Button
                                                text="Ghost"
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                            />
                                        </div>
                                    </PreviewSection>

                                    <PreviewSection title="Alerts">
                                        <div className="space-y-3">
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

                                    <PreviewSection title="Colors">
                                        <ColorPreview brand={brand} />
                                    </PreviewSection>
                                </div>
                            </ThemeProvider>
                        )}
                    </div>
                </div>

                {/* Publish Modal */}
                {showVersionModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-semibold mb-4">
                                Publish New Version
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Version
                                    </label>
                                    <input
                                        type="text"
                                        value={versionInput}
                                        onChange={(e) =>
                                            setVersionInput(e.target.value)
                                        }
                                        placeholder="1.0.0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {branch?.latestVersion && (
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() =>
                                                    setVersionInput(
                                                        incrementVersion(
                                                            branch.latestVersion!,
                                                            'patch'
                                                        )
                                                    )
                                                }
                                                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                            >
                                                Patch (+0.0.1)
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setVersionInput(
                                                        incrementVersion(
                                                            branch.latestVersion!,
                                                            'minor'
                                                        )
                                                    )
                                                }
                                                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                            >
                                                Minor (+0.1.0)
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setVersionInput(
                                                        incrementVersion(
                                                            branch.latestVersion!,
                                                            'major'
                                                        )
                                                    )
                                                }
                                                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                            >
                                                Major (+1.0.0)
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Changelog
                                    </label>
                                    <textarea
                                        value={changelog}
                                        onChange={(e) =>
                                            setChangelog(e.target.value)
                                        }
                                        placeholder="What's changed in this version?"
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowVersionModal(false)}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmPublish}
                                    disabled={
                                        !validateVersion(versionInput).valid
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    Publish v{versionInput}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </RequireAuth>
    )
}

// Sub-components
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

function ColorEditor({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (prev: BrandConfig) => BrandConfig) => void
}) {
    return (
        <div className="space-y-6">
            {/* Primary Color with Palette Generator */}
            <ColorPaletteGenerator
                label="Primary Brand Color"
                value={brand.colors?.primary || {}}
                onChange={(shades) =>
                    onChange((prev) => ({
                        ...prev,
                        colors: {
                            ...prev.colors,
                            primary: shades as Record<string, string>,
                        },
                    }))
                }
            />

            <hr className="border-gray-200" />

            {/* Gray/Secondary */}
            <ColorPaletteGenerator
                label="Gray Scale"
                value={brand.colors?.gray || {}}
                onChange={(shades) =>
                    onChange((prev) => ({
                        ...prev,
                        colors: {
                            ...prev.colors,
                            gray: shades as Record<string, string>,
                        },
                    }))
                }
            />

            <hr className="border-gray-200" />

            {/* Accent Colors */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danger Color
                    </label>
                    <input
                        type="color"
                        value={brand.colors?.red?.['500'] || '#EF4444'}
                        onChange={(e) =>
                            onChange((prev) => ({
                                ...prev,
                                colors: {
                                    ...prev.colors,
                                    red: { '500': e.target.value },
                                },
                            }))
                        }
                        className="w-full h-12 rounded-lg cursor-pointer border-0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Success Color
                    </label>
                    <input
                        type="color"
                        value={brand.colors?.green?.['500'] || '#10B981'}
                        onChange={(e) =>
                            onChange((prev) => ({
                                ...prev,
                                colors: {
                                    ...prev.colors,
                                    green: { '500': e.target.value },
                                },
                            }))
                        }
                        className="w-full h-12 rounded-lg cursor-pointer border-0"
                    />
                </div>
            </div>
        </div>
    )
}

function TypographyEditor({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (prev: BrandConfig) => BrandConfig) => void
}) {
    const fonts = ['Inter', 'Roboto', 'Open Sans', 'Poppins', 'System']

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                </label>
                <select
                    value={brand.font?.family || 'Inter'}
                    onChange={(e) =>
                        onChange((prev) => ({
                            ...prev,
                            font: {
                                ...prev.font,
                                family: e.target.value,
                            },
                        }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                    {fonts.map((f) => (
                        <option key={f} value={f}>
                            {f}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

function RadiusEditor({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (prev: BrandConfig) => BrandConfig) => void
}) {
    const presets = [
        { name: 'Sharp', value: '0px' },
        { name: 'Subtle', value: '4px' },
        { name: 'Standard', value: '8px' },
        { name: 'Rounded', value: '16px' },
        { name: 'Pill', value: '9999px' },
    ]

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius
                </label>
                <div className="grid grid-cols-5 gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() =>
                                onChange((prev) => ({
                                    ...prev,
                                    radius: { '8': preset.value },
                                }))
                            }
                            className={`p-3 border rounded-lg text-xs font-medium ${
                                (brand.radius?.['8'] || '8px') === preset.value
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div
                                className="w-full h-8 bg-blue-500 mb-2"
                                style={{ borderRadius: preset.value }}
                            />
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function JsonEditor({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (prev: BrandConfig) => BrandConfig) => void
}) {
    const [jsonText, setJsonText] = useState(() =>
        JSON.stringify(brand, null, 2)
    )
    const [isValid, setIsValid] = useState(true)

    const handleChange = (value: string) => {
        setJsonText(value)
        try {
            const parsed = JSON.parse(value)
            onChange(() => parsed)
            setIsValid(true)
        } catch {
            setIsValid(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                    Raw JSON
                </label>
                <span
                    className={`text-xs ${isValid ? 'text-green-600' : 'text-red-600'}`}
                >
                    {isValid ? 'Valid JSON' : 'Invalid JSON'}
                </span>
            </div>
            <textarea
                value={jsonText}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full h-96 px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs"
                spellCheck={false}
            />
        </div>
    )
}

function ColorPreview({ brand }: { brand: BrandConfig }) {
    const colors = [
        { name: 'Primary', shades: brand.colors?.primary },
        { name: 'Gray', shades: brand.colors?.gray },
    ]

    return (
        <div className="space-y-4">
            {colors.map(
                ({ name, shades }) =>
                    shades && (
                        <div key={name}>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                {name}
                            </p>
                            <div className="grid grid-cols-11 gap-1">
                                {[
                                    50, 100, 200, 300, 400, 500, 600, 700, 800,
                                    900, 950,
                                ].map((shade) => (
                                    <div
                                        key={shade}
                                        className="aspect-square rounded"
                                        style={{
                                            backgroundColor:
                                                shades[String(shade)],
                                        }}
                                        title={shades[String(shade)]}
                                    />
                                ))}
                            </div>
                        </div>
                    )
            )}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Red/Danger
                    </p>
                    <div
                        className="h-16 rounded-lg"
                        style={{ backgroundColor: brand.colors?.red?.['500'] }}
                    />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Green/Success
                    </p>
                    <div
                        className="h-16 rounded-lg"
                        style={{
                            backgroundColor: brand.colors?.green?.['500'],
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
