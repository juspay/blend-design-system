import { forwardRef, useState } from 'react'
import Sidebar from '../Sidebar'
import { sidebarAccessibilityReport } from './SidebarAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import {
    Download as DownloadIcon,
    Package,
    Home,
    Users,
    Settings,
    FileText,
    BarChart3,
    CreditCard,
    ShoppingCart,
    Building,
    DollarSign,
    Cpu,
    Search,
    Bell,
    LogOut,
} from 'lucide-react'
import Button from '../../Button/Button'
import { ButtonType, ButtonSize } from '../../Button/types'
import { Avatar, AvatarSize, AvatarShape } from '../../Avatar'
import type { DirectoryData } from '../../Directory/types'

export type SidebarAccessibilityProps = {
    className?: string
}

const SidebarAccessibility = forwardRef<
    HTMLDivElement,
    SidebarAccessibilityProps
>(({ className }, ref) => {
    const [selectedFormat, setSelectedFormat] =
        useState<ReportFormat>('markdown')
    const [includeTestResults, setIncludeTestResults] = useState(true)
    const [includeRecommendations, setIncludeRecommendations] = useState(true)
    const [reportHtmlContent, setReportHtmlContent] = useState<string | null>(
        null
    )
    const [showFullReport, setShowFullReport] = useState(false)

    const handleDownload = () => {
        try {
            const content = generateAccessibilityReport(
                sidebarAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `sidebar-accessibility-report-${sidebarAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
            const mimeType = getMimeType(selectedFormat)

            downloadReport(content, filename, mimeType)
        } catch (error) {
            console.error('Error generating report:', error)
            alert('Failed to generate report. Please try again.')
        }
    }

    const handleViewReport = () => {
        try {
            const htmlContent = generateAccessibilityReport(
                sidebarAccessibilityReport,
                {
                    format: 'html',
                    includeTestResults,
                    includeRecommendations,
                }
            )
            setReportHtmlContent(htmlContent)
            setShowFullReport(true)
        } catch (error) {
            console.error('Error generating report:', error)
            alert('Failed to generate report. Please try again.')
        }
    }

    const report = sidebarAccessibilityReport
    const compliantCount = report.criteria.filter(
        (c) => c.status === 'compliant'
    ).length
    const nonCompliantCount = report.criteria.filter(
        (c) => c.status === 'non-compliant'
    ).length
    const unsureCount = report.criteria.filter(
        (c) => c.status === 'unsure'
    ).length
    const totalApplicable = report.criteria.filter(
        (c) => c.status !== 'not-applicable'
    ).length
    const complianceRate =
        totalApplicable > 0
            ? Math.round((compliantCount / totalApplicable) * 100)
            : 0

    const sampleNavigationData: DirectoryData[] = [
        {
            label: 'Main',
            items: [
                {
                    label: 'Dashboard',
                    leftSlot: <Home size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Analytics',
                    leftSlot: <BarChart3 size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Reports',
                    leftSlot: <FileText size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
            ],
        },
        {
            label: 'Commerce',
            items: [
                {
                    label: 'Products',
                    leftSlot: <Package size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Orders',
                    leftSlot: <ShoppingCart size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Customers',
                    leftSlot: <Users size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
            ],
        },
        {
            label: 'Settings',
            items: [
                {
                    label: 'General',
                    leftSlot: <Settings size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
                {
                    label: 'Billing',
                    leftSlot: <CreditCard size={16} aria-hidden="true" />,
                    onClick: () => {},
                },
            ],
        },
    ]

    return (
        <div ref={ref} className={className}>
            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">
                                Sidebar Component Accessibility
                            </h1>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                <span>WCAG {report.wcagVersion}</span>
                                <span>•</span>
                                <span>{report.conformanceLevel}</span>
                                <span>•</span>
                                <span>{report.reportDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>Evaluates: WCAG 2.0, 2.1, 2.2</span>
                            </div>
                        </div>
                        <div
                            className={`px-3 py-1.5 rounded-md font-semibold text-sm text-white ${
                                report.overallStatus === 'compliant'
                                    ? 'bg-green-600'
                                    : report.overallStatus === 'partial'
                                      ? 'bg-orange-600'
                                      : report.overallStatus === 'unsure'
                                        ? 'bg-yellow-600'
                                        : 'bg-red-600'
                            }`}
                        >
                            {report.overallStatus.toUpperCase()}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold mb-1 text-green-600">
                                {compliantCount}
                            </div>
                            <div className="text-xs font-medium text-gray-700">
                                Compliant ✅
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Verified & tested
                            </div>
                        </div>
                        <div className="bg-white border-2 border-red-200 rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold mb-1 text-red-600">
                                {nonCompliantCount}
                            </div>
                            <div className="text-xs font-medium text-gray-700">
                                Non-Compliant ❌
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Issues found
                            </div>
                        </div>
                        <div className="bg-white border-2 border-orange-200 rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold mb-1 text-orange-600">
                                {unsureCount}
                            </div>
                            <div className="text-xs font-medium text-gray-700">
                                Unsure ⚠️
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Needs verification
                            </div>
                        </div>
                        <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold mb-1 text-blue-600">
                                {complianceRate}%
                            </div>
                            <div className="text-xs font-medium text-gray-700">
                                Compliance Rate
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Based on verified items
                            </div>
                        </div>
                    </div>

                    {unsureCount > 0 && (
                        <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <h3 className="font-semibold text-orange-900 mb-1">
                                        Manual Verification Required
                                    </h3>
                                    <p className="text-orange-800 text-sm">
                                        {unsureCount} criterion/criteria marked
                                        as "unsure" require manual verification.
                                        These items need testing with contrast
                                        checkers, screen readers, or depend on
                                        application context.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-2">
                                Summary
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {report.summary}
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-3">
                                Download Report
                            </h2>
                            <div className="space-y-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-medium text-gray-700">
                                        Format
                                    </label>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() =>
                                                setSelectedFormat('markdown')
                                            }
                                            className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                                                selectedFormat === 'markdown'
                                                    ? 'bg-primary-100 text-primary-700 border border-primary-300'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            MD
                                        </button>
                                        <button
                                            onClick={() =>
                                                setSelectedFormat('html')
                                            }
                                            className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                                                selectedFormat === 'html'
                                                    ? 'bg-primary-100 text-primary-700 border border-primary-300'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            HTML
                                        </button>
                                        <button
                                            onClick={() =>
                                                setSelectedFormat('json')
                                            }
                                            className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                                                selectedFormat === 'json'
                                                    ? 'bg-primary-100 text-primary-700 border border-primary-300'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            JSON
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs">
                                        <input
                                            type="checkbox"
                                            checked={includeTestResults}
                                            onChange={(e) =>
                                                setIncludeTestResults(
                                                    e.target.checked
                                                )
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span>Include Test Results</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-xs">
                                        <input
                                            type="checkbox"
                                            checked={includeRecommendations}
                                            onChange={(e) =>
                                                setIncludeRecommendations(
                                                    e.target.checked
                                                )
                                            }
                                            className="rounded border-gray-300"
                                        />
                                        <span>Include Recommendations</span>
                                    </label>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        text="Download Report"
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.SMALL}
                                        leadingIcon={<DownloadIcon size={16} />}
                                        onClick={handleDownload}
                                    />
                                    <Button
                                        text="View Full Report"
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.SMALL}
                                        onClick={handleViewReport}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {showFullReport && reportHtmlContent && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">
                                    Full Accessibility Report
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowFullReport(false)
                                        setReportHtmlContent(null)
                                    }}
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Close
                                </button>
                            </div>
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: reportHtmlContent,
                                }}
                            />
                        </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            WCAG Criteria Breakdown
                        </h2>
                        <div className="space-y-4">
                            {report.criteria.map((criterion) => (
                                <div
                                    key={criterion.id}
                                    className="border-l-4 pl-4 py-2"
                                    style={{
                                        borderColor:
                                            criterion.status === 'compliant'
                                                ? '#10b981'
                                                : criterion.status ===
                                                    'non-compliant'
                                                  ? '#ef4444'
                                                  : criterion.status ===
                                                      'unsure'
                                                    ? '#f59e0b'
                                                    : '#9ca3af',
                                    }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-sm">
                                                    {criterion.id} -{' '}
                                                    {criterion.title}
                                                </span>
                                                <span
                                                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                        criterion.level === 'A'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : criterion.level ===
                                                                'AA'
                                                              ? 'bg-purple-100 text-purple-700'
                                                              : 'bg-pink-100 text-pink-700'
                                                    }`}
                                                >
                                                    Level {criterion.level}
                                                </span>
                                                <span
                                                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                        criterion.status ===
                                                        'compliant'
                                                            ? 'bg-green-100 text-green-700'
                                                            : criterion.status ===
                                                                'non-compliant'
                                                              ? 'bg-red-100 text-red-700'
                                                              : criterion.status ===
                                                                  'unsure'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {criterion.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        criterion.status.slice(
                                                            1
                                                        )}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {criterion.description}
                                            </p>
                                            <div className="text-xs text-gray-500 space-y-1">
                                                <p>
                                                    <strong>
                                                        Implementation:
                                                    </strong>{' '}
                                                    {criterion.implementation}
                                                </p>
                                                {criterion.testResults && (
                                                    <p>
                                                        <strong>
                                                            Test Results:
                                                        </strong>{' '}
                                                        {criterion.testResults}
                                                    </p>
                                                )}
                                                {criterion.notes && (
                                                    <p>
                                                        <strong>Notes:</strong>{' '}
                                                        {criterion.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Strengths
                            </h2>
                            <ul className="space-y-2">
                                {report.strengths.map((strength, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-gray-700"
                                    >
                                        <span className="text-green-600 mt-0.5">
                                            ✓
                                        </span>
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Recommendations
                            </h2>
                            <ul className="space-y-2">
                                {report.recommendations.map(
                                    (recommendation, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm text-gray-700"
                                        >
                                            <span className="text-blue-600 mt-0.5">
                                                →
                                            </span>
                                            <span>{recommendation}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Component Example */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Component Example
                        </h2>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <div style={{ height: '600px', display: 'flex' }}>
                                <Sidebar
                                    data={sampleNavigationData}
                                    topbar={
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                width: '100%',
                                            }}
                                            role="search"
                                            aria-label="Global search"
                                        >
                                            <div
                                                style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '8px 16px',
                                                    backgroundColor: '#f3f4f6',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <Search
                                                    size={16}
                                                    color="#6b7280"
                                                    aria-hidden="true"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    aria-label="Search input"
                                                    style={{
                                                        border: 'none',
                                                        outline: 'none',
                                                        backgroundColor:
                                                            'transparent',
                                                        width: '100%',
                                                    }}
                                                />
                                            </div>
                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                size={ButtonSize.SMALL}
                                                leadingIcon={
                                                    <Bell aria-hidden="true" />
                                                }
                                                aria-label="Notifications"
                                            />
                                            <Avatar
                                                src="https://i.pravatar.cc/150?img=1"
                                                alt="User profile"
                                                size={AvatarSize.SM}
                                                shape={AvatarShape.ROUNDED}
                                            />
                                        </div>
                                    }
                                    leftPanel={{
                                        items: [
                                            {
                                                label: 'Retail Corp',
                                                icon: (
                                                    <Building
                                                        size={16}
                                                        color="#3b82f6"
                                                        aria-hidden="true"
                                                    />
                                                ),
                                            },
                                            {
                                                label: 'Tech Inc',
                                                icon: (
                                                    <Cpu
                                                        size={16}
                                                        color="#8b5cf6"
                                                        aria-hidden="true"
                                                    />
                                                ),
                                            },
                                            {
                                                label: 'Finance Ltd',
                                                icon: (
                                                    <DollarSign
                                                        size={16}
                                                        color="#10b981"
                                                        aria-hidden="true"
                                                    />
                                                ),
                                            },
                                        ],
                                        selected: 'Retail Corp',
                                        onSelect: () => {},
                                    }}
                                    footer={
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                width: '100%',
                                            }}
                                        >
                                            <Avatar
                                                src="https://i.pravatar.cc/150?img=1"
                                                alt="John Doe profile"
                                                size={AvatarSize.SM}
                                                shape={AvatarShape.CIRCULAR}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    John Doe
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: '12px',
                                                        color: '#6b7280',
                                                    }}
                                                >
                                                    john@example.com
                                                </div>
                                            </div>
                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                size={ButtonSize.SMALL}
                                                leadingIcon={
                                                    <LogOut aria-hidden="true" />
                                                }
                                                aria-label="Log out"
                                            />
                                        </div>
                                    }
                                    isExpanded={true}
                                >
                                    <div style={{ padding: '32px' }}>
                                        <h1
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: 600,
                                                marginBottom: '16px',
                                            }}
                                        >
                                            Dashboard
                                        </h1>
                                        <p style={{ color: '#6b7280' }}>
                                            This is the main content area. The
                                            Sidebar component provides
                                            accessible navigation with keyboard
                                            support, screen reader
                                            compatibility, and proper ARIA
                                            attributes.
                                        </p>
                                    </div>
                                </Sidebar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

SidebarAccessibility.displayName = 'SidebarAccessibility'

export default SidebarAccessibility
