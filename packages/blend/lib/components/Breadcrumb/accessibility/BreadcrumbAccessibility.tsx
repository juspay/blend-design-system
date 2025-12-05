import { forwardRef, useState } from 'react'
import Breadcrumb from '../Breadcrumb'
import { Button } from '../../Button'
import { ButtonType, ButtonSize } from '../../Button/types'
import { Home, FileText, Settings, ChevronRight } from 'lucide-react'
import { breadcrumbAccessibilityReport } from './BreadcrumbAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import type { BreadcrumbItemType } from '../types'

export type BreadcrumbAccessibilityProps = {
    className?: string
}

const BreadcrumbAccessibility = forwardRef<
    HTMLDivElement,
    BreadcrumbAccessibilityProps
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
                breadcrumbAccessibilityReport as any,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `breadcrumb-accessibility-report-${breadcrumbAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                breadcrumbAccessibilityReport as any,
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

    const report = breadcrumbAccessibilityReport
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

    const basicBreadcrumbItems: BreadcrumbItemType[] = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
    ]

    const breadcrumbWithSlots: BreadcrumbItemType[] = [
        {
            label: 'Home',
            href: '/',
            leftSlot: <Home size={16} />,
        },
        {
            label: 'Documents',
            href: '/documents',
            leftSlot: <FileText size={16} />,
        },
        {
            label: 'Settings',
            href: '/settings',
            leftSlot: <Settings size={16} />,
        },
    ]

    const breadcrumbWithOverflow: BreadcrumbItemType[] = [
        { label: 'Home', href: '/' },
        { label: 'Category 1', href: '/cat1' },
        { label: 'Category 2', href: '/cat2' },
        { label: 'Category 3', href: '/cat3' },
        { label: 'Category 4', href: '/cat4' },
        { label: 'Category 5', href: '/cat5' },
        { label: 'Category 6', href: '/cat6' },
        { label: 'Current Page', href: '/current' },
    ]

    return (
        <div ref={ref} className={className}>
            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">
                                Breadcrumb Component Accessibility
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
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="text-2xl font-bold text-green-700">
                                {compliantCount}
                            </div>
                            <div className="text-xs text-green-600">
                                Compliant
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <div className="text-2xl font-bold text-red-700">
                                {nonCompliantCount}
                            </div>
                            <div className="text-xs text-red-600">
                                Non-Compliant
                            </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="text-2xl font-bold text-yellow-700">
                                {unsureCount}
                            </div>
                            <div className="text-xs text-yellow-600">
                                Requires Verification
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="text-2xl font-bold text-blue-700">
                                {complianceRate}%
                            </div>
                            <div className="text-xs text-blue-600">
                                Compliance Rate
                            </div>
                        </div>
                    </div>

                    {/* Summary & Download */}
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
                                            className="w-3.5 h-3.5"
                                        />
                                        <span className="text-gray-700">
                                            Test Results
                                        </span>
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
                                            className="w-3.5 h-3.5"
                                        />
                                        <span className="text-gray-700">
                                            Recommendations
                                        </span>
                                    </label>
                                </div>
                                <div className="space-y-2">
                                    <Button
                                        text="Download"
                                        leadingIcon={<DownloadIcon size={14} />}
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.SMALL}
                                        onClick={handleDownload}
                                        fullWidth
                                    />
                                    <Button
                                        text={
                                            showFullReport
                                                ? 'Hide Full Report'
                                                : 'View Full Report'
                                        }
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.SMALL}
                                        onClick={handleViewReport}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Report Viewer */}
                {showFullReport && reportHtmlContent && (
                    <section className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Full Accessibility Report
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Interactive HTML report (same as downloaded
                                    version)
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowFullReport(false)
                                    setReportHtmlContent(null)
                                }}
                                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Close
                            </button>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                            <iframe
                                srcDoc={reportHtmlContent}
                                className="w-full"
                                style={{
                                    height: '700px',
                                    border: 'none',
                                }}
                                title="Accessibility Report"
                                sandbox="allow-same-origin"
                            />
                        </div>
                    </section>
                )}

                {/* Interactive Demo Section */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            Interactive Accessibility Demo
                        </h2>
                        <p className="text-gray-600">
                            This demo showcases WCAG 2.0, 2.1, 2.2 Level AAA
                            compliance features. Use keyboard navigation (Tab,
                            Enter) and screen readers to experience
                            accessibility features.
                        </p>
                    </div>

                    {/* WCAG Principle 1: Perceivable */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            1. Perceivable
                        </h3>

                        <div className="border-l-4 border-blue-500 pl-6 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">
                                    1.1.1 Non-text Content (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Decorative slots and separators properly
                                    marked with aria-hidden
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb items={breadcrumbWithSlots} />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    1.3.1 Info and Relationships (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Semantic HTML structure with nav, ol, li
                                    elements
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb items={basicBreadcrumbItems} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WCAG Principle 2: Operable */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">2. Operable</h3>

                        <div className="border-l-4 border-green-500 pl-6 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">
                                    2.1.1 Keyboard (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    All functionality available via keyboard
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb items={basicBreadcrumbItems} />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Try: Tab to navigate, Enter to activate
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    2.4.7 Focus Visible (Level AA)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Visible focus indicators on all interactive
                                    elements
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb items={basicBreadcrumbItems} />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Tab to see focus indicators
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    2.4.8 Location (Level AAA)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Clear location context with
                                    aria-current="page"
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb items={basicBreadcrumbItems} />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Active item marked with aria-current
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    2.5.5 Target Size (Enhanced) (Level AAA)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    All interactive elements meet 44x44px
                                    minimum touch target
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb items={basicBreadcrumbItems} />
                                    <p className="text-xs text-gray-500 mt-2">
                                        All links and buttons are 44x44px
                                        minimum
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WCAG Principle 4: Robust */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">4. Robust</h3>

                        <div className="border-l-4 border-red-500 pl-6 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">
                                    4.1.2 Name, Role, Value (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Proper ARIA labels and roles for all
                                    elements
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb items={basicBreadcrumbItems} />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Check: nav role, aria-label,
                                        aria-current
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Overflow Demo */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            Overflow Handling
                        </h3>
                        <div className="border-l-4 border-purple-500 pl-6 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">
                                    Ellipsis Button Accessibility
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Overflow button with proper aria-label and
                                    keyboard support
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Breadcrumb
                                        items={breadcrumbWithOverflow}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Ellipsis button has aria-label with
                                        count
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WCAG Guidelines Coverage */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        WCAG Guidelines Coverage
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-2">
                                WCAG 2.0 (2008)
                            </h3>
                            <p className="text-xs text-blue-800 mb-2">
                                Foundation guidelines
                            </p>
                            <ul className="text-xs text-blue-700 space-y-1">
                                {report.wcagVersions['2.0'].map((item, idx) => (
                                    <li key={idx}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="font-semibold text-green-900 mb-2">
                                WCAG 2.1 (2018)
                            </h3>
                            <p className="text-xs text-green-800 mb-2">
                                Current standard
                            </p>
                            <ul className="text-xs text-green-700 space-y-1">
                                {report.wcagVersions['2.1'].map((item, idx) => (
                                    <li key={idx}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h3 className="font-semibold text-purple-900 mb-2">
                                WCAG 2.2 (2023)
                            </h3>
                            <p className="text-xs text-purple-800 mb-2">
                                Latest updates
                            </p>
                            <ul className="text-xs text-purple-700 space-y-1">
                                {report.wcagVersions['2.2'].length > 0 ? (
                                    report.wcagVersions['2.2'].map(
                                        (item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        )
                                    )
                                ) : (
                                    <li className="text-gray-500">
                                        No new criteria
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Strengths and Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-green-900">
                            Strengths
                        </h2>
                        <ul className="space-y-2">
                            {report.strengths.map((strength, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-green-800"
                                >
                                    <span className="text-green-600 mt-0.5">
                                        ✓
                                    </span>
                                    <span>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-yellow-900">
                            Recommendations
                        </h2>
                        <ul className="space-y-2">
                            {report.recommendations.map((rec, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-yellow-800"
                                >
                                    <span className="text-yellow-600 mt-0.5">
                                        →
                                    </span>
                                    <span>{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
})

BreadcrumbAccessibility.displayName = 'BreadcrumbAccessibility'

export default BreadcrumbAccessibility
