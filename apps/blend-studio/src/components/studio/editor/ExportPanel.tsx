/**
 * ExportPanel
 *
 * Shows export options, CLI commands, and comprehensive usage instructions
 * for integrating the published branch tokens into a React project.
 */

import { useState } from 'react'
import { Download, Copy, Check, CheckCircle } from 'lucide-react'
import type { ExportPanelProps } from './types'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ExportPanel({ brand, branchId }: ExportPanelProps) {
    const [copied, setCopied] = useState<string | null>(null)

    const brandJson = JSON.stringify(brand, null, 2)

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
        <div className="p-4 space-y-6">
            {/* Quick Setup */}
            <Section
                title="Quick Setup"
                subtitle="Get this branch running in your project in 30 seconds"
            >
                <div className="bg-gray-900 rounded-xl p-5 text-xs font-mono space-y-2">
                    <CodeLine comment="1. Initialize (one-time)" />
                    <CodeLine code="npx blend-token-studio init" />
                    <CodeLine comment="2. Pull this branch" className="mt-3" />
                    <CodeLine
                        code={`npx blend-token-studio pull ${branchId}`}
                    />
                    <CodeLine comment="3. Wrap your app" className="mt-3" />
                    <CodeLine
                        code="import { BlendProvider } from './blend/provider'"
                        color="blue"
                    />
                    <CodeLine
                        code="<BlendProvider>{children}</BlendProvider>"
                        color="blue"
                    />
                </div>
            </Section>

            <Divider />

            {/* CLI Commands */}
            <Section title="CLI Commands">
                <div className="space-y-2">
                    <CliCommandRow
                        label="Pull this branch"
                        command={`npx blend-token-studio pull ${branchId}`}
                        onCopy={() =>
                            copy(
                                `npx blend-token-studio pull ${branchId}`,
                                'pull'
                            )
                        }
                        isCopied={copied === 'pull'}
                    />
                    <CliCommandRow
                        label="Apply as local preset"
                        command={`npx blend-token-studio brand --preset ${brand.brandId || branchId.split('/')[0]}`}
                        onCopy={() =>
                            copy(
                                `npx blend-token-studio brand --preset ${brand.brandId || branchId.split('/')[0]}`,
                                'brand'
                            )
                        }
                        isCopied={copied === 'brand'}
                    />
                    <CliCommandRow
                        label="Diff vs defaults"
                        command="npx blend-token-studio diff"
                        onCopy={() =>
                            copy('npx blend-token-studio diff', 'diff')
                        }
                        isCopied={copied === 'diff'}
                    />
                </div>
            </Section>

            <Divider />

            {/* Switching Branches */}
            <Section
                title="Switching Branches"
                subtitle="Change brands by pulling a different branch. Your app code stays the same."
            >
                <div className="bg-gray-900 rounded-xl p-4 text-xs font-mono space-y-2">
                    <CodeLine comment="Switch to this branch" />
                    <CodeLine
                        code={`npx blend-token-studio pull ${branchId}`}
                    />
                    <CodeLine
                        comment="Switch to another branch"
                        className="mt-2"
                    />
                    <CodeLine code="npx blend-token-studio pull neobank/light" />
                    <CodeLine
                        comment="Your BlendProvider stays the same!"
                        className="mt-2"
                    />
                </div>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                        When you pull a different branch, only{' '}
                        <code className="bg-blue-100 px-1 rounded">
                            src/blend/tokens.ts
                        </code>{' '}
                        and{' '}
                        <code className="bg-blue-100 px-1 rounded">
                            src/blend/brand.json
                        </code>{' '}
                        change. Your provider and component code stays
                        untouched.
                    </p>
                </div>
            </Section>

            <Divider />

            {/* What Gets Generated */}
            <Section title="What Gets Generated">
                <div className="space-y-2">
                    <GeneratedFileRow
                        filename="src/blend/provider.tsx"
                        description="Pre-wired BlendProvider - wrap your app with this"
                        badge="Safe to edit"
                        badgeColor="green"
                    />
                    <GeneratedFileRow
                        filename="src/blend/tokens.ts"
                        description="Resolved tokens for all 26 V2 components (light + dark)"
                        badge="Auto-generated"
                        badgeColor="blue"
                    />
                    <GeneratedFileRow
                        filename="src/blend/brand.json"
                        description="The brand config JSON - commit this to version control"
                        badge="Commit this"
                        badgeColor="purple"
                    />
                    <GeneratedFileRow
                        filename="blend.config.json"
                        description="Tracks which branch you're using"
                        badge="Root config"
                        badgeColor="gray"
                    />
                </div>
            </Section>

            <Divider />

            {/* Provider Usage */}
            <Section title="Provider Usage">
                <CliCommandRow
                    label="App.tsx"
                    command={PROVIDER_CODE}
                    onCopy={() => copy(PROVIDER_CODE, 'provider')}
                    isCopied={copied === 'provider'}
                    multiline
                />
            </Section>

            <Divider />

            {/* Download Files */}
            <Section title="Download">
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
            </Section>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PROVIDER_CODE = `// Auto-generated by Blend Token Studio
import { BlendProvider } from './blend/provider'

export function App() {
  return (
    <BlendProvider>
      {/* your app */}
    </BlendProvider>
  )
}`

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Section({
    title,
    subtitle,
    children,
}: {
    title: string
    subtitle?: string
    children: React.ReactNode
}) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {title}
            </h3>
            {subtitle && (
                <p className="text-xs text-gray-500 mb-3">{subtitle}</p>
            )}
            {!subtitle && <div className="mb-3" />}
            {children}
        </div>
    )
}

function Divider() {
    return <div className="h-px bg-gray-100" />
}

function CodeLine({
    code,
    comment,
    color = 'green',
    className,
}: {
    code?: string
    comment?: string
    color?: 'green' | 'blue'
    className?: string
}) {
    if (comment) {
        return (
            <div className={`text-gray-500 ${className || ''}`}>
                # {comment}
            </div>
        )
    }

    const colorClass = color === 'blue' ? 'text-blue-300' : 'text-green-400'
    return <div className={`${colorClass} ${className || ''}`}>{code}</div>
}

function CliCommandRow({
    label,
    command,
    onCopy,
    isCopied,
    multiline,
}: {
    label: string
    command: string
    onCopy: () => void
    isCopied: boolean
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
                    {isCopied ? (
                        <Check className="w-3 h-3 text-green-600" />
                    ) : (
                        <Copy className="w-3 h-3" />
                    )}
                    {isCopied ? 'Copied' : 'Copy'}
                </button>
            </div>
            {multiline ? (
                <pre className="p-3 text-xs font-mono text-gray-800 overflow-x-auto bg-white max-h-48 overflow-y-auto">
                    {command}
                </pre>
            ) : (
                <div className="px-3 py-2 font-mono text-xs text-gray-800 bg-white">
                    {command}
                </div>
            )}
        </div>
    )
}

function GeneratedFileRow({
    filename,
    description,
    badge,
    badgeColor,
}: {
    filename: string
    description: string
    badge: string
    badgeColor: 'green' | 'blue' | 'purple' | 'gray'
}) {
    const badgeColorClasses: Record<string, string> = {
        green: 'bg-green-100 text-green-700',
        blue: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700',
        gray: 'bg-gray-100 text-gray-600',
    }

    return (
        <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl">
            <CheckCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-gray-800">
                        {filename}
                    </code>
                    <span
                        className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${badgeColorClasses[badgeColor]}`}
                    >
                        {badge}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
        </div>
    )
}
