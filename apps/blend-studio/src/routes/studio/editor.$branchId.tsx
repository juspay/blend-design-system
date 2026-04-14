/**
 * Token Editor Page
 *
 * Main editor screen for customizing brand tokens. Split into two panels:
 * - Left: Editor tabs (Colors, Typography, Radius, Shadows, JSON)
 * - Right: Preview/Diff/History/Export panels
 *
 * The editor resolves brand config into component tokens using the token engine
 * and renders a live preview via ThemeProvider.
 */

import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { ThemeProvider } from '@juspay/blend-design-system'
import {
    resolveBrandTokens,
    diffBrandConfigs,
    validateBrandConfig,
    PRESET_BLEND_DEFAULT,
    type BrandConfig,
    type TokenDiff,
    type ValidationResult,
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
import { ComponentShowcase } from '@/components/studio/ComponentShowcase'
import {
    ColorsTab,
    TypographyTab,
    RadiusTab,
    ShadowsTab,
    JsonTab,
    DiffPanel,
    HistoryPanel,
    ExportPanel,
    type EditorTabId,
    type EditorPanelId,
} from '@/components/studio/editor'
import { UserMenu } from '@/components/layout/UserMenu'
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
    X,
    GitBranch,
} from 'lucide-react'

export const Route = createFileRoute('/studio/editor/$branchId')({
    component: EditorPage,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TabConfig {
    id: EditorTabId
    icon: React.ComponentType<{ className?: string }>
    label: string
}

interface PanelConfig {
    id: EditorPanelId
    icon: React.ComponentType<{ className?: string }>
    label: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EDITOR_TABS: TabConfig[] = [
    { id: 'colors', icon: Palette, label: 'Colors' },
    { id: 'typography', icon: Type, label: 'Type' },
    { id: 'radius', icon: Sliders, label: 'Radius' },
    { id: 'shadows', icon: Layers, label: 'Shadows' },
    { id: 'json', icon: Code, label: 'JSON' },
]

/** Auto-save debounce interval in milliseconds. */
const AUTO_SAVE_DELAY_MS = 1_000

// ---------------------------------------------------------------------------
// Main Editor Page
// ---------------------------------------------------------------------------

function EditorPage() {
    const { branchId } = Route.useParams()
    const navigate = useNavigate()

    // Data hooks
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

    // Editor state
    const [brand, setBrand] = useState<BrandConfig | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [hasChanges, setHasChanges] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [activeTab, setActiveTab] = useState<EditorTabId>('colors')
    const [activePanel, setActivePanel] = useState<EditorPanelId>('preview')
    const [showPublishModal, setShowPublishModal] = useState(false)
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Sync brand from branch on load
    useEffect(() => {
        if (branch?.brandConfig && !brand) {
            setBrand(branch.brandConfig)
        }
    }, [branch, brand])

    // Auto-save when there are changes
    useEffect(() => {
        if (!hasChanges || !brand) return

        if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)

        autoSaveTimer.current = setTimeout(async () => {
            await createSnapshot(brand, 'Auto-save', true)
        }, AUTO_SAVE_DELAY_MS)

        return () => {
            if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
        }
    }, [hasChanges, brand, createSnapshot])

    // Derived state
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

    const validation = useMemo<ValidationResult | null>(() => {
        if (!brand) return null
        try {
            return validateBrandConfig(brand)
        } catch {
            return null
        }
    }, [brand])

    // Build panel config with dynamic diff count
    const editorPanels: PanelConfig[] = useMemo(
        () => [
            { id: 'preview', icon: Eye, label: 'Preview' },
            {
                id: 'diff',
                icon: GitCompare,
                label: `Diff${diffs.length > 0 ? ` (${diffs.length})` : ''}`,
            },
            { id: 'history', icon: History, label: 'History' },
            { id: 'export', icon: Download, label: 'Export' },
        ],
        [diffs.length]
    )

    // Handlers
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

    // Loading state
    if (branchLoading) {
        return <LoadingScreen message="Loading branch..." />
    }

    // Error state
    if (branchError || !branch) {
        return (
            <ErrorScreen
                message={branchError || 'Branch not found'}
                onBack={() => navigate({ to: '/studio' })}
            />
        )
    }

    if (!brand) return null

    return (
        <RequireAuth>
            <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
                {/* Top Bar */}
                <EditorHeader
                    branchId={branchId}
                    branchName={branch.name}
                    latestVersion={branch.latestVersion}
                    theme={theme}
                    onThemeChange={setTheme}
                    hasChanges={hasChanges}
                    saveSuccess={saveSuccess}
                    saving={saving}
                    onSave={handleSave}
                    publishLoading={publishLoading}
                    onPublish={() => setShowPublishModal(true)}
                    validation={validation}
                />

                {/* Body: Editor + Preview */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Editor Tabs */}
                    <div className="w-[420px] shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
                        {/* Tab bar */}
                        <div className="flex border-b border-gray-200 shrink-0 overflow-x-auto">
                            {EDITOR_TABS.map(({ id, icon: Icon, label }) => (
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

                    {/* Right: Panels */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Panel switcher */}
                        <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-gray-200 shrink-0">
                            {editorPanels.map(({ id, icon: Icon, label }) => (
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

                        {/* Panel content */}
                        <div className="flex-1 overflow-y-auto">
                            {activePanel === 'preview' && componentTokens && (
                                <ThemeProvider
                                    theme={theme}
                                    componentTokens={componentTokens}
                                >
                                    <div
                                        className={`min-h-full ${
                                            theme === 'dark'
                                                ? 'bg-gray-900'
                                                : 'bg-gray-50'
                                        } p-6`}
                                    >
                                        <ComponentShowcase theme={theme} />
                                    </div>
                                </ThemeProvider>
                            )}
                            {activePanel === 'preview' && !componentTokens && (
                                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                    Resolving tokens...
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

                {/* Publish Modal */}
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

// ---------------------------------------------------------------------------
// Editor Header
// ---------------------------------------------------------------------------

interface EditorHeaderProps {
    branchId: string
    branchName: string
    latestVersion: string | null | undefined
    theme: 'light' | 'dark'
    onThemeChange: (theme: 'light' | 'dark') => void
    hasChanges: boolean
    saveSuccess: boolean
    saving: boolean
    onSave: () => void
    publishLoading: boolean
    onPublish: () => void
    validation: ValidationResult | null
}

function EditorHeader({
    branchId,
    branchName,
    latestVersion,
    theme,
    onThemeChange,
    hasChanges,
    saveSuccess,
    saving,
    onSave,
    publishLoading,
    onPublish,
    validation,
}: EditorHeaderProps) {
    return (
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
                        {branchName}
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
                {latestVersion && (
                    <span className="px-2 py-0.5 text-xs font-mono bg-blue-50 text-blue-700 rounded-full">
                        v{latestVersion}
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
                <ThemeToggle theme={theme} onThemeChange={onThemeChange} />

                <Link
                    to="/studio/preview/$branchId"
                    params={{ branchId }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </Link>

                <button
                    onClick={onSave}
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
                    onClick={onPublish}
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

                <UserMenu />
            </div>
        </header>
    )
}

// ---------------------------------------------------------------------------
// Theme Toggle
// ---------------------------------------------------------------------------

function ThemeToggle({
    theme,
    onThemeChange,
}: {
    theme: 'light' | 'dark'
    onThemeChange: (theme: 'light' | 'dark') => void
}) {
    return (
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
                onClick={() => onThemeChange('light')}
                className={`p-1.5 rounded-md transition-colors ${
                    theme === 'light'
                        ? 'bg-white shadow-sm text-yellow-500'
                        : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Light mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => onThemeChange('dark')}
                className={`p-1.5 rounded-md transition-colors ${
                    theme === 'dark'
                        ? 'bg-white shadow-sm text-blue-500'
                        : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Dark mode"
            >
                <Moon className="w-4 h-4" />
            </button>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Publish Modal
// ---------------------------------------------------------------------------

interface PublishModalProps {
    latestVersion: string | null | undefined
    onClose: () => void
    onPublish: (
        version: string,
        changelog: string,
        isBreaking: boolean,
        isPrerelease: boolean
    ) => void
    loading: boolean
}

function PublishModal({
    latestVersion,
    onClose,
    onPublish,
    loading,
}: PublishModalProps) {
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
                {/* Header */}
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

                {/* Body */}
                <div className="p-6 space-y-4">
                    {/* Version input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Version
                        </label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            placeholder="1.0.0"
                            className={`w-full px-3 py-2 text-sm font-mono border rounded-lg focus:outline-none focus:ring-2 ${
                                vValid.valid
                                    ? 'border-gray-300 focus:ring-blue-500'
                                    : 'border-red-300 focus:ring-red-400'
                            }`}
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

                    {/* Changelog */}
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

                    {/* Flags */}
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

                {/* Footer */}
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

// ---------------------------------------------------------------------------
// Loading & Error Screens
// ---------------------------------------------------------------------------

function LoadingScreen({ message }: { message: string }) {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">{message}</p>
            </div>
        </div>
    )
}

function ErrorScreen({
    message,
    onBack,
}: {
    message: string
    onBack: () => void
}) {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 mb-1">
                    Failed to load branch
                </p>
                <p className="text-sm text-gray-500 mb-4">{message}</p>
                <button
                    onClick={onBack}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Back to Studio
                </button>
            </div>
        </div>
    )
}
