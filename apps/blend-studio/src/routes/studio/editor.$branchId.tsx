import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { ThemeProvider } from '@juspay/blend-design-system'
import {
    resolveBrandTokens,
    diffBrandConfigs,
    validateBrandConfig,
    PRESET_BLEND_DEFAULT,
    listPresets,
    getPreset,
    type BrandConfig,
    type TokenDiff,
} from '@blend-design/token-engine'
import {
    useBranchWithMock,
    usePublishVersionWithMock,
    useCreateSnapshotWithMock,
    useVersionsWithMock,
    useSnapshotsWithMock,
    incrementVersion,
    validateVersion,
} from '@/frontend/hooks/use-studio'
import { ColorPaletteGenerator } from '@/components/studio/ColorPaletteGenerator'
import { ComponentShowcase } from '@/components/studio/ComponentShowcase'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import {
    ArrowLeft,
    Sun,
    Moon,
    Save,
    Play,
    History,
    Loader2,
    GitCompare,
    Download,
    Layers,
    Eye,
    Code,
    Palette,
    Type,
    Sliders,
    CheckCircle,
    AlertCircle,
    Clock,
    ChevronDown,
    ChevronRight,
    X,
    RefreshCw,
    Copy,
    Check,
    GitBranch,
    Package,
} from 'lucide-react'

export const Route = createFileRoute('/studio/editor/$branchId')({
    component: EditorPage,
})

// ─── Radius keys that map to the design system ───────────────────────────────
const RADIUS_KEYS = [
    '0',
    '2',
    '4',
    '6',
    '8',
    '10',
    '12',
    '16',
    '20',
    'full',
] as const
const RADIUS_PRESETS = [
    {
        name: 'Sharp',
        values: {
            '0': '0px',
            '2': '0px',
            '4': '0px',
            '6': '0px',
            '8': '0px',
            '10': '0px',
            '12': '0px',
            '16': '0px',
            '20': '0px',
            full: '0px',
        },
    },
    {
        name: 'Subtle',
        values: {
            '0': '0px',
            '2': '2px',
            '4': '4px',
            '6': '4px',
            '8': '4px',
            '10': '4px',
            '12': '6px',
            '16': '6px',
            '20': '8px',
            full: '9999px',
        },
    },
    {
        name: 'Default',
        values: {
            '0': '0px',
            '2': '2px',
            '4': '4px',
            '6': '6px',
            '8': '8px',
            '10': '10px',
            '12': '12px',
            '16': '16px',
            '20': '20px',
            full: '9999px',
        },
    },
    {
        name: 'Rounded',
        values: {
            '0': '0px',
            '2': '4px',
            '4': '8px',
            '6': '12px',
            '8': '16px',
            '10': '20px',
            '12': '24px',
            '16': '32px',
            '20': '40px',
            full: '9999px',
        },
    },
    {
        name: 'Pill',
        values: {
            '0': '0px',
            '2': '8px',
            '4': '12px',
            '6': '16px',
            '8': '24px',
            '10': '32px',
            '12': '40px',
            '16': '9999px',
            '20': '9999px',
            full: '9999px',
        },
    },
]
const COLOR_GROUPS = [
    'primary',
    'gray',
    'red',
    'green',
    'yellow',
    'orange',
    'purple',
] as const
const FONT_FAMILIES = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Lato',
    'Nunito',
    'DM Sans',
    'System UI',
]
type TabId = 'colors' | 'typography' | 'radius' | 'shadows' | 'json'
type PanelId = 'editor' | 'preview' | 'diff' | 'export' | 'history'

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
function EditorPage() {
    const { branchId } = Route.useParams()
    const navigate = useNavigate()
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
    const { snapshots, refetch: refetchSnapshots } =
        useSnapshotsWithMock(branchId)

    const [brand, setBrand] = useState<BrandConfig | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [hasChanges, setHasChanges] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [activeTab, setActiveTab] = useState<TabId>('colors')
    const [activePanel, setActivePanel] = useState<PanelId>('preview')
    const [showPublishModal, setShowPublishModal] = useState(false)
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Sync brand from branch on load
    useEffect(() => {
        if (branch?.brandConfig && !brand) {
            setBrand(branch.brandConfig)
        }
    }, [branch, brand])

    // Auto-save every 30s when there are changes
    useEffect(() => {
        if (!hasChanges || !brand) return
        if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
        autoSaveTimer.current = setTimeout(async () => {
            await createSnapshot(brand, 'Auto-save', true)
        }, 30_000)
        return () => {
            if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
        }
    }, [hasChanges, brand, createSnapshot])

    const componentTokens = useMemo(() => {
        if (!brand) return null
        try {
            return resolveBrandTokens(brand, theme)
        } catch {
            return null
        }
    }, [brand, theme])

    const diffs = useMemo<TokenDiff[]>(() => {
        if (!brand) return []
        try {
            return diffBrandConfigs(PRESET_BLEND_DEFAULT, brand)
        } catch {
            return []
        }
    }, [brand])

    const validation = useMemo(() => {
        if (!brand) return null
        try {
            return validateBrandConfig(brand)
        } catch {
            return null
        }
    }, [brand])

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
            await createSnapshot(brand, 'Manual save', false)
            setHasChanges(false)
            setSaveSuccess(true)
            refetchSnapshots()
            setTimeout(() => setSaveSuccess(false), 2000)
        } catch (err) {
            console.error('Save failed:', err)
        } finally {
            setSaving(false)
        }
    }, [brand, branchId, updateBranch, createSnapshot, refetchSnapshots])

    const handleRestoreSnapshot = useCallback((snapshotBrand: BrandConfig) => {
        setBrand(snapshotBrand)
        setHasChanges(true)
    }, [])

    if (branchLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading branch…</p>
                </div>
            </div>
        )
    }

    if (branchError || !branch) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="font-medium text-gray-900 mb-1">
                        Failed to load branch
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        {branchError || 'Branch not found'}
                    </p>
                    <button
                        onClick={() => navigate({ to: '/studio' })}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← Back to Studio
                    </button>
                </div>
            </div>
        )
    }

    if (!brand) return null

    return (
        <RequireAuth>
            <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
                {/* ── Top Bar ── */}
                <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 shrink-0">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/studio"
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="w-px h-5 bg-gray-200" />
                        <div className="flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-mono text-gray-500">
                                {branchId}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                                {branch.name}
                            </span>
                            {hasChanges && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                                    Unsaved
                                </span>
                            )}
                            {saveSuccess && (
                                <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                    <CheckCircle className="w-3 h-3" /> Saved
                                </span>
                            )}
                        </div>
                        {branch.latestVersion && (
                            <span className="px-2 py-0.5 text-xs font-mono bg-blue-50 text-blue-700 rounded-full">
                                v{branch.latestVersion}
                            </span>
                        )}
                        {validation && !validation.valid && (
                            <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                <AlertCircle className="w-3 h-3" />
                                {validation.errors.length} error
                                {validation.errors.length !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-yellow-500' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Light mode"
                            >
                                <Sun className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white shadow-sm text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Dark mode"
                            >
                                <Moon className="w-4 h-4" />
                            </button>
                        </div>

                        <Link
                            to="/studio/preview/$branchId"
                            params={{ branchId }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Eye className="w-4 h-4" />
                            Preview
                        </Link>

                        <button
                            onClick={handleSave}
                            disabled={saving || !hasChanges}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save
                        </button>

                        <button
                            onClick={() => setShowPublishModal(true)}
                            disabled={
                                publishLoading ||
                                (validation ? !validation.valid : false)
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors"
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

                {/* ── Body: Editor + Preview ── */}
                <div className="flex-1 flex overflow-hidden">
                    {/* ── Left: Editor Panel ── */}
                    <div className="w-[420px] shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
                        {/* Tab bar */}
                        <div className="flex border-b border-gray-200 shrink-0 overflow-x-auto">
                            {(
                                [
                                    {
                                        id: 'colors',
                                        icon: Palette,
                                        label: 'Colors',
                                    },
                                    {
                                        id: 'typography',
                                        icon: Type,
                                        label: 'Type',
                                    },
                                    {
                                        id: 'radius',
                                        icon: Sliders,
                                        label: 'Radius',
                                    },
                                    {
                                        id: 'shadows',
                                        icon: Layers,
                                        label: 'Shadows',
                                    },
                                    { id: 'json', icon: Code, label: 'JSON' },
                                ] as {
                                    id: TabId
                                    icon: React.FC<{ className?: string }>
                                    label: string
                                }[]
                            ).map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                                        activeTab === id
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {activeTab === 'colors' && (
                                <ColorsTab
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                            {activeTab === 'typography' && (
                                <TypographyTab
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                            {activeTab === 'radius' && (
                                <RadiusTab
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                            {activeTab === 'shadows' && (
                                <ShadowsTab
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                            {activeTab === 'json' && (
                                <JsonTab
                                    brand={brand}
                                    onChange={handleBrandChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* ── Right: Preview/Diff/History/Export ── */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Panel switcher */}
                        <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-gray-200 shrink-0">
                            {(
                                [
                                    {
                                        id: 'preview',
                                        icon: Eye,
                                        label: 'Preview',
                                    },
                                    {
                                        id: 'diff',
                                        icon: GitCompare,
                                        label: `Diff${diffs.length > 0 ? ` (${diffs.length})` : ''}`,
                                    },
                                    {
                                        id: 'history',
                                        icon: History,
                                        label: `History`,
                                    },
                                    {
                                        id: 'export',
                                        icon: Download,
                                        label: 'Export',
                                    },
                                ] as {
                                    id: PanelId
                                    icon: React.FC<{ className?: string }>
                                    label: string
                                }[]
                            ).map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setActivePanel(id)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                        activePanel === id
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {activePanel === 'preview' && componentTokens && (
                                <ThemeProvider
                                    theme={theme}
                                    componentTokens={componentTokens}
                                >
                                    <div
                                        className={`min-h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6`}
                                    >
                                        <ComponentShowcase theme={theme} />
                                    </div>
                                </ThemeProvider>
                            )}
                            {activePanel === 'preview' && !componentTokens && (
                                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                    Resolving tokens…
                                </div>
                            )}
                            {activePanel === 'diff' && (
                                <DiffPanel diffs={diffs} />
                            )}
                            {activePanel === 'history' && (
                                <HistoryPanel
                                    versions={versions}
                                    snapshots={snapshots}
                                    onRestore={handleRestoreSnapshot}
                                />
                            )}
                            {activePanel === 'export' && (
                                <ExportPanel
                                    brand={brand}
                                    branchId={branchId}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Publish Modal ── */}
                {showPublishModal && (
                    <PublishModal
                        latestVersion={branch.latestVersion}
                        onClose={() => setShowPublishModal(false)}
                        onPublish={async (
                            version,
                            changelog,
                            isBreaking,
                            isPrerelease
                        ) => {
                            const v = await publishVersion({
                                version,
                                brandConfig: brand,
                                changelog,
                                isBreaking,
                                isPrerelease,
                            })
                            if (v) {
                                setShowPublishModal(false)
                                setHasChanges(false)
                            }
                        }}
                        loading={publishLoading}
                    />
                )}
            </div>
        </RequireAuth>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Colors Tab
// ─────────────────────────────────────────────────────────────────────────────
function ColorsTab({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (p: BrandConfig) => BrandConfig) => void
}) {
    const presets = listPresets()
    const [expandedGroup, setExpandedGroup] = useState<string>('primary')

    const applyPreset = (presetName: string) => {
        const presetConfig = getPreset(presetName)
        if (!presetConfig) return
        onChange((prev) => ({
            ...prev,
            colors: { ...prev.colors, ...presetConfig.colors },
            radius: presetConfig.radius
                ? { ...prev.radius, ...presetConfig.radius }
                : prev.radius,
        }))
    }

    return (
        <div className="space-y-5">
            {/* Brand Presets */}
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Brand Presets
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => applyPreset(preset.name)}
                            className="flex items-center gap-2.5 p-2.5 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                        >
                            <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm shrink-0"
                                style={{
                                    backgroundColor:
                                        getPreset(preset.name)?.colors
                                            ?.primary?.['500'] || '#3B82F6',
                                }}
                            />
                            <span className="text-xs font-medium text-gray-700 capitalize">
                                {preset.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Color Groups */}
            {COLOR_GROUPS.map((group) => {
                const isExpanded = expandedGroup === group
                const currentColor = brand.colors?.[group]?.['500']
                return (
                    <div
                        key={group}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() =>
                                setExpandedGroup(isExpanded ? '' : group)
                            }
                            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="w-5 h-5 rounded-md border border-black/10"
                                    style={{
                                        backgroundColor:
                                            currentColor || '#E5E7EB',
                                    }}
                                />
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                    {group}
                                </span>
                                {brand.colors?.[group] && (
                                    <span className="text-xs text-gray-400 font-mono">
                                        {currentColor}
                                    </span>
                                )}
                            </div>
                            {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                        </button>

                        {isExpanded && (
                            <div className="p-3 border-t border-gray-100">
                                <ColorPaletteGenerator
                                    label={`${group.charAt(0).toUpperCase() + group.slice(1)} Color Scale`}
                                    value={
                                        (brand.colors?.[group] as Record<
                                            string,
                                            string
                                        >) || {}
                                    }
                                    onChange={(shades) =>
                                        onChange((prev) => ({
                                            ...prev,
                                            colors: {
                                                ...prev.colors,
                                                [group]: shades,
                                            },
                                        }))
                                    }
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Typography Tab
// ─────────────────────────────────────────────────────────────────────────────
function TypographyTab({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (p: BrandConfig) => BrandConfig) => void
}) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Font Family
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {FONT_FAMILIES.map((font) => (
                        <button
                            key={font}
                            onClick={() =>
                                onChange((prev) => ({
                                    ...prev,
                                    font: { ...prev.font, family: font },
                                }))
                            }
                            className={`p-3 rounded-lg border text-left transition-colors ${
                                brand.font?.family === font
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            <div
                                className="text-base font-medium text-gray-800"
                                style={{ fontFamily: font }}
                            >
                                Aa
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {font}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Custom Font
                </h3>
                <input
                    type="text"
                    value={brand.font?.family || ''}
                    onChange={(e) =>
                        onChange((prev) => ({
                            ...prev,
                            font: { ...prev.font, family: e.target.value },
                        }))
                    }
                    placeholder="Enter font family name…"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                    Make sure the font is loaded in your app (Google Fonts,
                    etc.)
                </p>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Preview
                </h3>
                <div
                    className="p-4 border border-gray-200 rounded-xl bg-gray-50"
                    style={{ fontFamily: brand.font?.family || 'Inter' }}
                >
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                        The quick brown fox
                    </div>
                    <div className="text-base text-gray-600 mb-1">
                        jumps over the lazy dog
                    </div>
                    <div className="text-sm text-gray-400">
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Radius Tab  (Fixed — sets ALL keys)
// ─────────────────────────────────────────────────────────────────────────────
function RadiusTab({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (p: BrandConfig) => BrandConfig) => void
}) {
    const applyPreset = (preset: (typeof RADIUS_PRESETS)[number]) => {
        onChange((prev) => ({
            ...prev,
            radius: { ...prev.radius, ...preset.values },
        }))
    }

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Presets
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    {RADIUS_PRESETS.map((preset) => {
                        const r = preset.values['8']
                        const current8 = brand.radius?.['8'] || '8px'
                        return (
                            <button
                                key={preset.name}
                                onClick={() => applyPreset(preset)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-xs font-medium transition-colors ${
                                    current8 === r
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div
                                    className="w-8 h-8 bg-blue-400"
                                    style={{ borderRadius: r }}
                                />
                                {preset.name}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Fine-tune
                </h3>
                <div className="space-y-2">
                    {RADIUS_KEYS.map((key) => (
                        <div key={key} className="flex items-center gap-3">
                            <div className="w-8 text-xs font-mono text-gray-500 text-right">
                                {key}
                            </div>
                            <div
                                className="w-8 h-8 bg-blue-400 shrink-0"
                                style={{
                                    borderRadius: brand.radius?.[key] || '0px',
                                }}
                            />
                            <input
                                type="text"
                                value={brand.radius?.[key] || ''}
                                onChange={(e) =>
                                    onChange((prev) => ({
                                        ...prev,
                                        radius: {
                                            ...prev.radius,
                                            [key]: e.target.value,
                                        },
                                    }))
                                }
                                placeholder={`${key}px`}
                                className="flex-1 px-2 py-1.5 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Shadows Tab
// ─────────────────────────────────────────────────────────────────────────────
const SHADOW_KEYS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
const SHADOW_DEFAULTS: Record<string, string> = {
    xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
    sm: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
    '2xl': '0 25px 50px -12px rgba(0,0,0,0.25)',
}

function ShadowsTab({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (p: BrandConfig) => BrandConfig) => void
}) {
    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-500">
                Customize shadow values used across all components. Uses CSS
                box-shadow syntax.
            </p>
            {SHADOW_KEYS.map((key) => (
                <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-medium text-gray-600">
                            {key}
                        </label>
                        <button
                            onClick={() =>
                                onChange((prev) => ({
                                    ...prev,
                                    shadows: {
                                        ...prev.shadows,
                                        [key]: SHADOW_DEFAULTS[key],
                                    },
                                }))
                            }
                            className="text-xs text-gray-400 hover:text-gray-600"
                        >
                            Reset
                        </button>
                    </div>
                    <div
                        className="w-full h-10 bg-white rounded-lg mb-1"
                        style={{
                            boxShadow:
                                brand.shadows?.[key] || SHADOW_DEFAULTS[key],
                        }}
                    />
                    <input
                        type="text"
                        value={brand.shadows?.[key] || ''}
                        onChange={(e) =>
                            onChange((prev) => ({
                                ...prev,
                                shadows: {
                                    ...prev.shadows,
                                    [key]: e.target.value,
                                },
                            }))
                        }
                        placeholder={SHADOW_DEFAULTS[key]}
                        className="w-full px-2 py-1.5 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON Tab
// ─────────────────────────────────────────────────────────────────────────────
function JsonTab({
    brand,
    onChange,
}: {
    brand: BrandConfig
    onChange: (fn: (p: BrandConfig) => BrandConfig) => void
}) {
    const [text, setText] = useState(() => JSON.stringify(brand, null, 2))
    const [isValid, setIsValid] = useState(true)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setText(JSON.stringify(brand, null, 2))
    }, [brand])

    const handleChange = (value: string) => {
        setText(value)
        try {
            const parsed = JSON.parse(value)
            onChange(() => parsed)
            setIsValid(true)
        } catch {
            setIsValid(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span
                    className={`text-xs font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}
                >
                    {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
                </span>
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                >
                    {copied ? (
                        <Check className="w-3 h-3 text-green-600" />
                    ) : (
                        <Copy className="w-3 h-3" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <textarea
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                spellCheck={false}
                className={`w-full h-[calc(100vh-280px)] min-h-64 px-3 py-2 text-xs font-mono border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    isValid
                        ? 'border-gray-200 focus:ring-blue-500'
                        : 'border-red-300 focus:ring-red-400'
                }`}
            />
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Diff Panel
// ─────────────────────────────────────────────────────────────────────────────
function DiffPanel({ diffs }: { diffs: TokenDiff[] }) {
    if (diffs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <CheckCircle className="w-12 h-12 text-green-400 mb-3" />
                <p className="font-medium text-gray-700">
                    No changes from default
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Your tokens match the Blend default preset
                </p>
            </div>
        )
    }

    const grouped = diffs.reduce<Record<string, TokenDiff[]>>((acc, d) => {
        const group = d.path.split('.')[0]
        if (!acc[group]) acc[group] = []
        acc[group].push(d)
        return acc
    }, {})

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                    Changes from Default
                </h3>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    {diffs.length} change{diffs.length !== 1 ? 's' : ''}
                </span>
            </div>

            {Object.entries(grouped).map(([group, groupDiffs]) => (
                <div
                    key={group}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                >
                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                        <span className="text-xs font-semibold text-gray-600 capitalize">
                            {group}
                        </span>
                        <span className="ml-2 text-xs text-gray-400">
                            {groupDiffs.length} change
                            {groupDiffs.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {groupDiffs.map((diff, i) => (
                            <div key={i} className="px-4 py-2.5 text-xs">
                                <div className="font-mono text-gray-500 mb-1.5">
                                    {diff.path}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        {/^#[0-9A-Fa-f]{3,6}$/.test(
                                            diff.oldValue
                                        ) && (
                                            <div
                                                className="w-3.5 h-3.5 rounded border border-black/10"
                                                style={{
                                                    backgroundColor:
                                                        diff.oldValue,
                                                }}
                                            />
                                        )}
                                        <span className="line-through text-red-500 font-mono">
                                            {diff.oldValue}
                                        </span>
                                    </div>
                                    <span className="text-gray-400">→</span>
                                    <div className="flex items-center gap-1.5">
                                        {/^#[0-9A-Fa-f]{3,6}$/.test(
                                            diff.newValue
                                        ) && (
                                            <div
                                                className="w-3.5 h-3.5 rounded border border-black/10"
                                                style={{
                                                    backgroundColor:
                                                        diff.newValue,
                                                }}
                                            />
                                        )}
                                        <span className="text-green-600 font-mono">
                                            {diff.newValue}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// History Panel
// ─────────────────────────────────────────────────────────────────────────────
function HistoryPanel({
    versions,
    snapshots,
    onRestore,
}: {
    versions: ReturnType<typeof useVersionsWithMock>['versions']
    snapshots: ReturnType<typeof useSnapshotsWithMock>['snapshots']
    onRestore: (config: BrandConfig) => void
}) {
    const [activeTab, setActiveTab] = useState<'versions' | 'snapshots'>(
        'versions'
    )
    return (
        <div className="flex flex-col h-full">
            <div className="flex border-b border-gray-200 shrink-0">
                <button
                    onClick={() => setActiveTab('versions')}
                    className={`flex-1 py-2.5 text-xs font-medium transition-colors ${activeTab === 'versions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Published ({versions.length})
                </button>
                <button
                    onClick={() => setActiveTab('snapshots')}
                    className={`flex-1 py-2.5 text-xs font-medium transition-colors ${activeTab === 'snapshots' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Snapshots ({snapshots.length})
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === 'versions' &&
                    (versions.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No published versions yet</p>
                        </div>
                    ) : (
                        versions.map((v) => (
                            <div
                                key={v.id}
                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono font-semibold text-gray-900">
                                            v{v.version}
                                        </span>
                                        {v.isBreaking && (
                                            <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-600 rounded">
                                                breaking
                                            </span>
                                        )}
                                        {v.isPrerelease && (
                                            <span className="px-1.5 py-0.5 text-xs bg-purple-100 text-purple-600 rounded">
                                                pre
                                            </span>
                                        )}
                                    </div>
                                    {v.changelog && (
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                            {v.changelog}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(
                                            v.publishedAt
                                        ).toLocaleDateString()}{' '}
                                        · {v.publishedByName}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onRestore(v.brandConfig)}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Restore this version"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ))}
                {activeTab === 'snapshots' &&
                    (snapshots.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No snapshots yet</p>
                            <p className="text-xs mt-1">
                                Snapshots are created on save
                            </p>
                        </div>
                    ) : (
                        snapshots.map((s) => (
                            <div
                                key={s.id}
                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-800">
                                            {s.label || 'Snapshot'}
                                        </span>
                                        {s.isAutoSave && (
                                            <span className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                                                auto
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(s.savedAt).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onRestore(s.brandConfig)}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Restore this snapshot"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ))}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Export Panel
// ─────────────────────────────────────────────────────────────────────────────
function ExportPanel({
    brand,
    branchId,
}: {
    brand: BrandConfig
    branchId: string
}) {
    const [copied, setCopied] = useState<string | null>(null)

    const cliPull = `npx blend-token-studio pull ${branchId}`
    const cliBrand = `npx blend-token-studio brand --preset ${brand.brandId || branchId.split('/')[0]}`
    const brandJson = JSON.stringify(brand, null, 2)
    const providerCode = `// Auto-generated by Blend Token Studio
import { BlendProvider } from './blend/provider'

export function App() {
  return (
    <BlendProvider>
      {/* your app */}
    </BlendProvider>
  )
}`

    const copy = (text: string, key: string) => {
        navigator.clipboard.writeText(text)
        setCopied(key)
        setTimeout(() => setCopied(null), 2000)
    }

    const download = (filename: string, content: string) => {
        const blob = new Blob([content], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="p-4 space-y-5">
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    CLI Commands
                </h3>
                <div className="space-y-2">
                    <ExportCodeBlock
                        label="Pull latest version"
                        code={cliPull}
                        onCopy={() => copy(cliPull, 'pull')}
                        copied={copied === 'pull'}
                    />
                    <ExportCodeBlock
                        label="Apply preset locally"
                        code={cliBrand}
                        onCopy={() => copy(cliBrand, 'brand')}
                        copied={copied === 'brand'}
                    />
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Provider Usage
                </h3>
                <ExportCodeBlock
                    label="App.tsx"
                    code={providerCode}
                    onCopy={() => copy(providerCode, 'provider')}
                    copied={copied === 'provider'}
                    multiline
                />
            </div>

            <div className="h-px bg-gray-100" />

            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Download Files
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => download('brand.json', brandJson)}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm text-gray-700"
                    >
                        <Download className="w-4 h-4 text-gray-400" />
                        brand.json
                    </button>
                    <button
                        onClick={() => copy(brandJson, 'json')}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm text-gray-700"
                    >
                        {copied === 'json' ? (
                            <Check className="w-4 h-4 text-green-600" />
                        ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                        )}
                        Copy JSON
                    </button>
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Quick Setup
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                    Initialize a new project with this brand in 30 seconds:
                </p>
                <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono text-green-400 space-y-1">
                    <div>
                        <span className="text-gray-500"># 1.</span> npx
                        blend-token-studio init
                    </div>
                    <div>
                        <span className="text-gray-500"># 2.</span> npx
                        blend-token-studio pull {branchId}
                    </div>
                    <div>
                        <span className="text-gray-500"># 3.</span>{' '}
                        {'<BlendProvider>{/* app */}</BlendProvider>'}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ExportCodeBlock({
    label,
    code,
    onCopy,
    copied,
    multiline,
}: {
    label: string
    code: string
    onCopy: () => void
    copied: boolean
    multiline?: boolean
}) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-xs text-gray-500">{label}</span>
                <button
                    onClick={onCopy}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                >
                    {copied ? (
                        <Check className="w-3 h-3 text-green-600" />
                    ) : (
                        <Copy className="w-3 h-3" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            {multiline ? (
                <pre className="p-3 text-xs font-mono text-gray-800 overflow-x-auto bg-white max-h-48 overflow-y-auto">
                    {code}
                </pre>
            ) : (
                <div className="px-3 py-2 font-mono text-xs text-gray-800 bg-white">
                    {code}
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Publish Modal
// ─────────────────────────────────────────────────────────────────────────────
function PublishModal({
    latestVersion,
    onClose,
    onPublish,
    loading,
}: {
    latestVersion: string | null | undefined
    onClose: () => void
    onPublish: (
        version: string,
        changelog: string,
        isBreaking: boolean,
        isPrerelease: boolean
    ) => void
    loading: boolean
}) {
    const suggested = latestVersion
        ? incrementVersion(latestVersion, 'patch')
        : '1.0.0'
    const [version, setVersion] = useState(suggested)
    const [changelog, setChangelog] = useState('')
    const [isBreaking, setIsBreaking] = useState(false)
    const [isPrerelease, setIsPrerelease] = useState(false)
    const vValid = validateVersion(version)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Publish Version
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Make this token branch available to teams
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Version
                        </label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            placeholder="1.0.0"
                            className={`w-full px-3 py-2 text-sm font-mono border rounded-lg focus:outline-none focus:ring-2 ${vValid.valid ? 'border-gray-300 focus:ring-blue-500' : 'border-red-300 focus:ring-red-400'}`}
                        />
                        {!vValid.valid && (
                            <p className="text-xs text-red-500 mt-1">
                                {vValid.error}
                            </p>
                        )}

                        {latestVersion && (
                            <div className="flex gap-2 mt-2">
                                {(['patch', 'minor', 'major'] as const).map(
                                    (bump) => (
                                        <button
                                            key={bump}
                                            onClick={() =>
                                                setVersion(
                                                    incrementVersion(
                                                        latestVersion,
                                                        bump
                                                    )
                                                )
                                            }
                                            className="px-2 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600 capitalize"
                                        >
                                            {bump} (
                                            {incrementVersion(
                                                latestVersion,
                                                bump
                                            )}
                                            )
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Changelog
                        </label>
                        <textarea
                            value={changelog}
                            onChange={(e) => setChangelog(e.target.value)}
                            placeholder="What's changed in this version?"
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isBreaking}
                                onChange={(e) =>
                                    setIsBreaking(e.target.checked)
                                }
                                className="w-4 h-4 rounded text-red-600"
                            />
                            <span className="text-sm text-gray-700">
                                Breaking change
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPrerelease}
                                onChange={(e) =>
                                    setIsPrerelease(e.target.checked)
                                }
                                className="w-4 h-4 rounded text-purple-600"
                            />
                            <span className="text-sm text-gray-700">
                                Pre-release
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            onPublish(
                                version,
                                changelog,
                                isBreaking,
                                isPrerelease
                            )
                        }
                        disabled={loading || !vValid.valid}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Play className="w-4 h-4" />
                        )}
                        Publish v{version}
                    </button>
                </div>
            </div>
        </div>
    )
}
