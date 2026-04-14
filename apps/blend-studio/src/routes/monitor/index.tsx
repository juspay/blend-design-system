/**
 * Monitor Dashboard
 *
 * Admin-only page showing Blend package analytics, user management,
 * and deployment monitoring. Accessible only to admin/superadmin roles.
 */

import { createFileRoute, Link } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { usePermissions } from '@/frontend/components/auth/PermissionGuard'
import { UserMenu } from '@/components/layout/UserMenu'
import {
    ArrowLeft,
    Package,
    Users,
    BarChart3,
    Activity,
    Download,
    Clock,
    AlertCircle,
} from 'lucide-react'

export const Route = createFileRoute('/monitor/')({
    component: MonitorPage,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
    change?: string
    trend?: 'up' | 'down' | 'neutral'
}

// ---------------------------------------------------------------------------
// Monitor Page
// ---------------------------------------------------------------------------

function MonitorPage() {
    const { isAdmin } = usePermissions()

    // Redirect non-admins
    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="font-medium text-gray-900 mb-1">
                        Access Denied
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        You need admin privileges to view this page.
                    </p>
                    <Link
                        to="/studio"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Back to Token Studio
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <RequireAuth>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/"
                                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                                <div className="w-px h-5 bg-gray-200" />
                                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                                    <Activity className="w-4 h-4 text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Monitor Dashboard
                                </h1>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                    Admin Only
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    to="/studio"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Package className="w-4 h-4" />
                                    Token Studio
                                </Link>
                                <UserMenu />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            icon={Download}
                            label="NPM Downloads"
                            value="124,847"
                            change="+12.5%"
                            trend="up"
                        />
                        <StatCard
                            icon={Users}
                            label="Active Teams"
                            value="23"
                            change="+3"
                            trend="up"
                        />
                        <StatCard
                            icon={Package}
                            label="Published Branches"
                            value="89"
                            change="+7"
                            trend="up"
                        />
                        <StatCard
                            icon={Activity}
                            label="API Requests (24h)"
                            value="8,234"
                            change="-2.1%"
                            trend="down"
                        />
                    </div>

                    {/* Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <Section title="Recent Activity">
                            <div className="space-y-3">
                                <ActivityItem
                                    action="Published branch"
                                    target="hdfc/retail v2.1.0"
                                    user="Design Team"
                                    time="2 hours ago"
                                />
                                <ActivityItem
                                    action="Created branch"
                                    target="neobank/dark"
                                    user="John Doe"
                                    time="5 hours ago"
                                />
                                <ActivityItem
                                    action="Forked branch"
                                    target="fintech/app from hdfc/retail"
                                    user="Jane Smith"
                                    time="1 day ago"
                                />
                                <ActivityItem
                                    action="User joined"
                                    target="alex@company.com"
                                    user="System"
                                    time="2 days ago"
                                />
                            </div>
                        </Section>

                        {/* Quick Actions */}
                        <Section title="Quick Actions">
                            <div className="grid grid-cols-2 gap-3">
                                <QuickAction
                                    icon={Users}
                                    label="Manage Users"
                                    description="Add, remove, or update user roles"
                                />
                                <QuickAction
                                    icon={Package}
                                    label="NPM Stats"
                                    description="View download trends and versions"
                                />
                                <QuickAction
                                    icon={BarChart3}
                                    label="Analytics"
                                    description="Branch usage and API metrics"
                                />
                                <QuickAction
                                    icon={Activity}
                                    label="System Health"
                                    description="API status and error logs"
                                />
                            </div>
                        </Section>
                    </div>

                    {/* Placeholder Notice */}
                    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-start gap-3">
                            <Activity className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                                    Monitor Dashboard (Coming Soon)
                                </h3>
                                <p className="text-sm text-blue-700">
                                    This admin dashboard will show real-time NPM
                                    download stats, user management, deployment
                                    monitoring, and system health metrics. For
                                    now, manage users directly in your database
                                    or auth provider.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RequireAuth>
    )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({ icon: Icon, label, value, change, trend }: StatCardProps) {
    const trendColor =
        trend === 'up'
            ? 'text-green-600'
            : trend === 'down'
              ? 'text-red-600'
              : 'text-gray-500'

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">{label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {change && (
                <div className={`text-xs font-medium mt-1 ${trendColor}`}>
                    {change}
                </div>
            )}
        </div>
    )
}

function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
                {title}
            </h2>
            {children}
        </div>
    )
}

function ActivityItem({
    action,
    target,
    user,
    time,
}: {
    action: string
    target: string
    user: string
    time: string
}) {
    return (
        <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">
                    <span className="font-medium">{action}</span>{' '}
                    <span className="text-gray-500">{target}</span>
                </p>
                <p className="text-xs text-gray-400">
                    {user} · {time}
                </p>
            </div>
        </div>
    )
}

function QuickAction({
    icon: Icon,
    label,
    description,
}: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    description: string
}) {
    return (
        <button className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-gray-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </button>
    )
}
