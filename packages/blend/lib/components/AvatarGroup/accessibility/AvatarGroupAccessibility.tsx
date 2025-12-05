import { forwardRef, useState } from 'react'
import AvatarGroup from '../AvatarGroup'
import { AvatarSize } from '../../Avatar/types'
import { avatarGroupAccessibilityReport } from './AvatarGroupAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { Button } from '../../Button'
import { ButtonType, ButtonSize } from '../../Button/types'

export type AvatarGroupAccessibilityProps = {
    className?: string
}

const AvatarGroupAccessibility = forwardRef<
    HTMLDivElement,
    AvatarGroupAccessibilityProps
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
                avatarGroupAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `avatargroup-accessibility-report-${avatarGroupAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                avatarGroupAccessibilityReport,
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

    const report = avatarGroupAccessibilityReport
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

    const mockAvatars = [
        {
            id: 1,
            alt: 'John Doe',
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        },
        {
            id: 2,
            alt: 'Jane Smith',
            src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        },
        { id: 3, alt: 'Mike Johnson' },
        { id: 4, alt: 'Sarah Wilson', fallback: 'SW' },
        { id: 5, alt: 'Alex Brown' },
        { id: 6, alt: 'Emma Davis' },
    ]

    return (
        <div ref={ref} className={className}>
            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                AvatarGroup Accessibility Report
                            </h1>
                            <p className="text-gray-600 mt-2">
                                WCAG 2.0, 2.1, 2.2 Compliance Analysis - Level
                                AA
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Report Date: {report.reportDate}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    report.overallStatus === 'compliant'
                                        ? 'bg-green-100 text-green-800'
                                        : report.overallStatus === 'partial'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : report.overallStatus === 'unsure'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {report.overallStatus.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Compliance Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600">
                                {compliantCount}
                            </div>
                            <div className="text-sm text-gray-600">
                                Compliant
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-red-600">
                                {nonCompliantCount}
                            </div>
                            <div className="text-sm text-gray-600">
                                Non-Compliant
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600">
                                {unsureCount}
                            </div>
                            <div className="text-sm text-gray-600">
                                Requires Verification
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-gray-800">
                                {complianceRate}%
                            </div>
                            <div className="text-sm text-gray-600">
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
                        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                                Report generated on{' '}
                                {new Date().toLocaleString()}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    text="Download HTML"
                                    leadingIcon={<DownloadIcon size={14} />}
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                avatarGroupAccessibilityReport,
                                                {
                                                    format: 'html',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `avatargroup-accessibility-report-${avatarGroupAccessibilityReport.reportDate}.html`
                                        downloadReport(
                                            content,
                                            filename,
                                            'text/html'
                                        )
                                    }}
                                />
                                <Button
                                    text="Download Markdown"
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                avatarGroupAccessibilityReport,
                                                {
                                                    format: 'markdown',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `avatargroup-accessibility-report-${avatarGroupAccessibilityReport.reportDate}.md`
                                        downloadReport(
                                            content,
                                            filename,
                                            'text/markdown'
                                        )
                                    }}
                                />
                            </div>
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
                            These examples demonstrate WCAG 2.0, 2.1, 2.2 Level
                            AA compliance features of the AvatarGroup component.
                        </p>
                    </div>

                    {/* WCAG 2.1.1 Keyboard */}
                    <div className="border-l-4 border-blue-500 pl-6 space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold">
                                2.1.1 Keyboard (Level A)
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                All avatars are keyboard accessible. Use Tab to
                                navigate, Enter or Space to select/deselect.
                            </p>
                            <AvatarGroup
                                avatars={mockAvatars.slice(0, 5)}
                                maxCount={5}
                                size={AvatarSize.MD}
                            />
                        </div>
                    </div>

                    {/* WCAG 1.3.1 Info and Relationships */}
                    <div className="border-l-4 border-green-500 pl-6 space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold">
                                1.3.1 Info and Relationships (Level A)
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Proper semantic structure with role="group" and
                                role="button". Selection state communicated via
                                aria-pressed.
                            </p>
                            <AvatarGroup
                                avatars={mockAvatars.slice(0, 4)}
                                maxCount={3}
                                size={AvatarSize.LG}
                                selectedAvatarIds={[1, 2]}
                            />
                        </div>
                    </div>

                    {/* WCAG 4.1.2 Name, Role, Value */}
                    <div className="border-l-4 border-purple-500 pl-6 space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold">
                                4.1.2 Name, Role, Value (Level A)
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Each avatar button has an accessible name via
                                aria-label, proper role="button", and
                                aria-pressed value.
                            </p>
                            <AvatarGroup
                                avatars={mockAvatars.slice(0, 3)}
                                maxCount={3}
                                size={AvatarSize.MD}
                            />
                        </div>
                    </div>

                    {/* WCAG 4.1.3 Status Messages */}
                    <div className="border-l-4 border-orange-500 pl-6 space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold">
                                4.1.3 Status Messages (Level AA)
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Selection changes are announced via
                                aria-live="polite" region. Group aria-label
                                updates to reflect selection count.
                            </p>
                            <AvatarGroup
                                avatars={mockAvatars.slice(0, 5)}
                                maxCount={5}
                                size={AvatarSize.MD}
                            />
                        </div>
                    </div>

                    {/* WCAG 2.4.7 Focus Visible */}
                    <div className="border-l-4 border-teal-500 pl-6 space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold">
                                2.4.7 Focus Visible (Level AA)
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Focus indicators are clearly visible with
                                sufficient contrast.
                            </p>
                            <AvatarGroup
                                avatars={mockAvatars.slice(0, 4)}
                                maxCount={4}
                                size={AvatarSize.LG}
                            />
                        </div>
                    </div>

                    {/* Overflow Menu Accessibility */}
                    <div className="border-l-4 border-indigo-500 pl-6 space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold">
                                Overflow Menu Accessibility
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Overflow button has proper ARIA attributes
                                (aria-haspopup, aria-expanded) and descriptive
                                label.
                            </p>
                            <AvatarGroup
                                avatars={mockAvatars}
                                maxCount={3}
                                size={AvatarSize.MD}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

AvatarGroupAccessibility.displayName = 'AvatarGroupAccessibility'

export default AvatarGroupAccessibility
