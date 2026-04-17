import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { featureFlags } from '@/lib/feature-flags'
import { UserMenu } from '@/components/layout/UserMenu'
import {
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
} from '@juspay/blend-design-system'
import {
    Lightning,
    PaintBrush,
    GitBranch,
    ArrowRight,
    Terminal,
    Eye,
    Stack,
    CheckCircle,
    Package,
} from '@phosphor-icons/react'

export const Route = createFileRoute('/')({
    component: HomePage,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureCardProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}

interface WorkflowStepProps {
    step: number
    title: string
    description: string
    code?: string
}

interface CliCommandProps {
    command: string
    description: string
}

// ---------------------------------------------------------------------------
// Home Page
// ---------------------------------------------------------------------------

function HomePage() {
    const { user, loading } = useBackendAuth()
    const navigate = useNavigate()
    const flags = featureFlags.get()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading...</p>
                </div>
            </div>
        )
    }

    // If not authenticated and not in mock mode, redirect to login
    if (!user && !flags.useMockData) {
        navigate({ to: '/login', search: { from: undefined } })
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header Bar */}
            <TopHeader />

            {/* Hero Section */}
            <HeroSection />

            {/* What is Token Studio */}
            <WhatIsSection />

            {/* How It Works - Visual Workflow */}
            <WorkflowSection />

            {/* CLI Integration */}
            <CliSection />

            {/* Using in Your Repo */}
            <UsageSection />

            {/* CTA */}
            <CtaSection />
        </div>
    )
}

// ---------------------------------------------------------------------------
// Top Header
// ---------------------------------------------------------------------------

function TopHeader() {
    const flags = featureFlags.get()

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Lightning className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                        Blend
                    </span>
                    <span className="text-xs text-gray-400">Token Studio</span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {flags.useMockData && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                            Demo Mode
                        </span>
                    )}
                    <UserMenu />
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------

function HeroSection() {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex items-start justify-between">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <Lightning className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                Token Studio
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Customize Blend for your brand
                        </h1>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Token Studio is a visual dashboard for managing
                            design tokens. Pick colors, adjust border radius,
                            preview all 26 components live, publish, and pull
                            tokens into your React app with a single CLI
                            command.
                        </p>

                        <div className="flex items-center gap-3">
                            <Link to="/studio" className="inline-block">
                                <ButtonV2
                                    buttonType={ButtonV2Type.PRIMARY}
                                    size={ButtonV2Size.MEDIUM}
                                    leftSlot={{
                                        slot: <GitBranch className="w-4 h-4" />,
                                    }}
                                    text="Go to Branches"
                                />
                            </Link>
                            <a href="#how-it-works" className="inline-block">
                                <ButtonV2
                                    buttonType={ButtonV2Type.SECONDARY}
                                    size={ButtonV2Size.MEDIUM}
                                    text="Learn How It Works"
                                    rightSlot={{
                                        slot: (
                                            <ArrowRight className="w-4 h-4" />
                                        ),
                                    }}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="hidden lg:flex flex-col gap-3">
                        <QuickStat
                            icon={Stack}
                            label="26 Components"
                            sublabel="All V2 components supported"
                        />
                        <QuickStat
                            icon={PaintBrush}
                            label="Visual Editor"
                            sublabel="Colors, radius, shadows, fonts"
                        />
                        <QuickStat
                            icon={Terminal}
                            label="CLI Ready"
                            sublabel="npx blend-token-studio pull"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function QuickStat({
    icon: Icon,
    label,
    sublabel,
}: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    sublabel: string
}) {
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 min-w-[220px]">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                <Icon className="w-4 h-4 text-blue-600" />
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sublabel}</p>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// What Is Section
// ---------------------------------------------------------------------------

function WhatIsSection() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
                What is Token Studio?
            </h2>
            <p className="text-sm text-gray-600 mb-8 max-w-2xl">
                Previously, customizing Blend required cloning foundation
                tokens, spreading 11 color shades, calling 26 separate token
                functions, and wiring them into ThemeProvider manually. Token
                Studio reduces this to 3 steps.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FeatureCard
                    icon={PaintBrush}
                    title="Visual Token Editor"
                    description="Pick a primary color, and the system generates a full 50-950 color scale. Adjust border radius, shadows, and fonts with live preview of all components."
                />
                <FeatureCard
                    icon={GitBranch}
                    title="Branches & Versions"
                    description="Each branch is a complete brand configuration. Fork branches for variants. Publish versions with semver. Switch branches in your repo to use different tokens."
                />
                <FeatureCard
                    icon={Terminal}
                    title="CLI Integration"
                    description="Pull tokens into your project with one command. Change which branch you use to switch between different brand configurations instantly."
                />
            </div>
        </div>
    )
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
                {description}
            </p>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Workflow Section
// ---------------------------------------------------------------------------

function WorkflowSection() {
    return (
        <div id="how-it-works" className="bg-white border-y border-gray-200">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    How It Works
                </h2>
                <p className="text-sm text-gray-600 mb-8">
                    Two paths to brand your app. Both produce the same result.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Path A: Dashboard */}
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <Eye className="w-4 h-4 text-purple-600" />
                            <h3 className="text-sm font-bold text-gray-900">
                                Path A: Dashboard (for designers)
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <WorkflowStep
                                step={1}
                                title="Create a Branch"
                                description="Start from a preset or create a blank branch."
                            />
                            <WorkflowStep
                                step={2}
                                title="Customize Tokens"
                                description="Use the visual editor to pick colors, adjust radius, and preview all 26 components live."
                            />
                            <WorkflowStep
                                step={3}
                                title="Publish"
                                description="Publish a versioned snapshot. Developers can now pull this configuration."
                            />
                            <WorkflowStep
                                step={4}
                                title="Developer Pulls"
                                description="Developer runs one CLI command to pull the tokens into their project."
                                code="npx blend-token-studio pull juspay/default"
                            />
                        </div>
                    </div>

                    {/* Path B: CLI */}
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <Terminal className="w-4 h-4 text-green-600" />
                            <h3 className="text-sm font-bold text-gray-900">
                                Path B: CLI (for developers)
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <WorkflowStep
                                step={1}
                                title="Initialize Project"
                                description="Scaffolds BlendProvider, tokens file, and blend.config.json."
                                code="npx blend-token-studio init"
                            />
                            <WorkflowStep
                                step={2}
                                title="Apply Brand"
                                description="Choose a preset or provide a hex color. Generates tokens for all 26 components."
                                code='npx blend-token-studio brand --primary "#E31837"'
                            />
                            <WorkflowStep
                                step={3}
                                title="Use in App"
                                description="Wrap your app with BlendProvider. All V2 components render with your brand."
                                code="<BlendProvider>{children}</BlendProvider>"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function WorkflowStep({ step, title, description, code }: WorkflowStepProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                {step}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                {code && (
                    <code className="block mt-2 px-3 py-1.5 bg-gray-900 text-green-400 text-xs font-mono rounded-lg">
                        {code}
                    </code>
                )}
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// CLI Section
// ---------------------------------------------------------------------------

function CliSection() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
                CLI Commands
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                All commands available via{' '}
                <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">
                    npx blend-token-studio
                </code>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <CliCommand
                    command="init"
                    description="Scaffold project (provider + tokens + config)"
                />
                <CliCommand
                    command="brand --preset blend"
                    description="Apply a brand preset"
                />
                <CliCommand
                    command='brand --primary "#E31837"'
                    description="Generate tokens from a single hex color"
                />
                <CliCommand
                    command="pull juspay/default"
                    description="Pull published tokens from studio into your project"
                />
                <CliCommand
                    command="diff"
                    description="Compare local tokens vs Blend defaults"
                />
                <CliCommand
                    command="list"
                    description="List all available branches from studio"
                />
            </div>
        </div>
    )
}

function CliCommand({ command, description }: CliCommandProps) {
    return (
        <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
                <Terminal className="w-4 h-4 text-green-400" />
            </div>
            <div className="min-w-0">
                <code className="text-xs font-mono text-gray-800">
                    npx blend-token-studio {command}
                </code>
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Usage Section
// ---------------------------------------------------------------------------

function UsageSection() {
    return (
        <div className="bg-white border-y border-gray-200">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Using Tokens in Your Repo
                </h2>
                <p className="text-sm text-gray-600 mb-8">
                    After publishing a branch in Token Studio, here's how to use
                    it in your React project.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Setup */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="w-4 h-4 text-blue-600" />
                            One-Time Setup
                        </h3>
                        <div className="bg-gray-900 rounded-xl p-5 text-xs font-mono space-y-2">
                            <div className="text-gray-500">
                                # 1. Initialize (creates provider + config)
                            </div>
                            <div className="text-green-400">
                                npx blend-token-studio init
                            </div>
                            <div className="text-gray-500 mt-3">
                                # 2. Pull a published branch
                            </div>
                            <div className="text-green-400">
                                npx blend-token-studio pull juspay/default
                            </div>
                            <div className="text-gray-500 mt-3">
                                # 3. Wrap your app
                            </div>
                            <div className="text-blue-300">
                                {
                                    "import { BlendProvider } from './blend/provider'"
                                }
                            </div>
                            <div className="text-blue-300 mt-1">
                                {'<BlendProvider>{children}</BlendProvider>'}
                            </div>
                        </div>
                    </div>

                    {/* Switching branches */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-purple-600" />
                            Switching Branches
                        </h3>
                        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                            Each branch contains a different brand
                            configuration. To switch brands, pull a different
                            branch. The tokens file gets updated, and all
                            components automatically render with the new brand.
                        </p>
                        <div className="bg-gray-900 rounded-xl p-5 text-xs font-mono space-y-2">
                            <div className="text-gray-500">
                                # Switch to default brand
                            </div>
                            <div className="text-green-400">
                                npx blend-token-studio pull juspay/default
                            </div>
                            <div className="text-gray-500 mt-3">
                                # Switch to a custom brand
                            </div>
                            <div className="text-green-400">
                                npx blend-token-studio pull acme/light
                            </div>
                            <div className="text-gray-500 mt-3">
                                # Your app code stays the same!
                            </div>
                            <div className="text-gray-500">
                                # Only the tokens change.
                            </div>
                        </div>
                    </div>
                </div>

                {/* What changes */}
                <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">
                        What happens when you pull a branch?
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-blue-800">
                        <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>
                                <strong>src/blend/tokens.ts</strong> gets
                                updated with the resolved component tokens for
                                all 26 V2 components.
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>
                                <strong>src/blend/brand.json</strong> stores the
                                brand config. Commit this to version control.
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>
                                <strong>blend.config.json</strong> tracks which
                                branch you're using. The provider and component
                                code stays unchanged.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// CTA Section
// ---------------------------------------------------------------------------

function CtaSection() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
                Ready to customize?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Create your first branch and see live previews of all Blend
                components with your brand colors.
            </p>
            <Link to="/studio" className="inline-block">
                <ButtonV2
                    buttonType={ButtonV2Type.PRIMARY}
                    size={ButtonV2Size.LARGE}
                    leftSlot={{ slot: <GitBranch className="w-4 h-4" /> }}
                    text="Open Token Studio"
                    rightSlot={{ slot: <ArrowRight className="w-4 h-4" /> }}
                />
            </Link>
        </div>
    )
}
