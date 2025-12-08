import { forwardRef, useState } from 'react'
import Avatar from '../Avatar'
import { AvatarSize, AvatarShape, AvatarOnlinePosition } from '../types'
import { avatarAccessibilityReport } from './AvatarAccessibilityReport'
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

export type AvatarAccessibilityProps = {
    className?: string
}

const AvatarAccessibility = forwardRef<
    HTMLDivElement,
    AvatarAccessibilityProps
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
                avatarAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `avatar-accessibility-report-${avatarAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                avatarAccessibilityReport,
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

    const report = avatarAccessibilityReport
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

    return (
        <div ref={ref} className={className}>
            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Avatar Accessibility Report
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
                                                avatarAccessibilityReport,
                                                {
                                                    format: 'html',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `avatar-accessibility-report-${avatarAccessibilityReport.reportDate}.html`
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
                                                avatarAccessibilityReport,
                                                {
                                                    format: 'markdown',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `avatar-accessibility-report-${avatarAccessibilityReport.reportDate}.md`
                                        downloadReport(
                                            content,
                                            filename,
                                            'text/markdown'
                                        )
                                    }}
                                />
                                <Button
                                    text="Download JSON"
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                avatarAccessibilityReport,
                                                {
                                                    format: 'json',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `avatar-accessibility-report-${avatarAccessibilityReport.reportDate}.json`
                                        downloadReport(
                                            content,
                                            filename,
                                            'application/json'
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
                            This demo showcases WCAG 2.0, 2.1, 2.2 Level AA
                            compliance features. Use screen readers to
                            experience accessibility features.
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
                                    Avatar with image and alt text
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <Avatar
                                        src="https://example.com/avatar.jpg"
                                        alt="John Doe"
                                        size={AvatarSize.MD}
                                    />
                                    <Avatar
                                        alt="Jane Smith"
                                        size={AvatarSize.MD}
                                    />
                                    <Avatar
                                        src="https://example.com/avatar.jpg"
                                        alt=""
                                        size={AvatarSize.MD}
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    1.3.1 Info and Relationships (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Semantic structure and data attributes
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <Avatar
                                        alt="User Profile"
                                        size={AvatarSize.MD}
                                        online={true}
                                    />
                                    <Avatar
                                        alt="User Profile"
                                        size={AvatarSize.MD}
                                        online={false}
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    1.4.1 Use of Color (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Online status indicated by both visual
                                    indicator and data attribute
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <Avatar
                                        alt="Online User"
                                        size={AvatarSize.MD}
                                        online={true}
                                    />
                                    <Avatar
                                        alt="Offline User"
                                        size={AvatarSize.MD}
                                        online={false}
                                    />
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
                                    Avatar is decorative and does not interfere
                                    with keyboard navigation
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <button>
                                        <Avatar
                                            alt="Clickable Avatar"
                                            size={AvatarSize.MD}
                                        />
                                    </button>
                                    <a href="/profile">
                                        <Avatar
                                            alt="Linked Avatar"
                                            size={AvatarSize.MD}
                                        />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    2.4.4 Link Purpose (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Alt text describes purpose when avatar is
                                    linked
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <a href="/profile">
                                        <Avatar
                                            alt="John Doe's Profile"
                                            size={AvatarSize.MD}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WCAG Principle 3: Understandable */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            3. Understandable
                        </h3>

                        <div className="border-l-4 border-purple-500 pl-6 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">
                                    3.2.4 Consistent Identification (Level AA)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Consistent structure across all sizes
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <Avatar
                                        alt="Test User"
                                        size={AvatarSize.SM}
                                    />
                                    <Avatar
                                        alt="Test User"
                                        size={AvatarSize.REGULAR}
                                    />
                                    <Avatar
                                        alt="Test User"
                                        size={AvatarSize.MD}
                                    />
                                    <Avatar
                                        alt="Test User"
                                        size={AvatarSize.LG}
                                    />
                                    <Avatar
                                        alt="Test User"
                                        size={AvatarSize.XL}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WCAG Principle 4: Robust */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">4. Robust</h3>

                        <div className="border-l-4 border-orange-500 pl-6 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">
                                    4.1.2 Name, Role, Value (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Accessible name via alt text and visually
                                    hidden span
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <Avatar
                                        alt="User Profile"
                                        size={AvatarSize.MD}
                                    />
                                    <Avatar
                                        src="invalid-url.jpg"
                                        alt="Fallback User"
                                        size={AvatarSize.MD}
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    4.1.3 Status Messages (Level AA)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Online status changes communicated via
                                    data-status attribute
                                </p>
                                <div className="flex gap-4 flex-wrap items-center">
                                    <Avatar
                                        alt="Status User"
                                        size={AvatarSize.MD}
                                        online={true}
                                    />
                                    <Avatar
                                        alt="Status User"
                                        size={AvatarSize.MD}
                                        online={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* All Sizes Demo */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            All Avatar Sizes
                        </h3>
                        <div className="flex gap-4 flex-wrap items-center">
                            <Avatar alt="Small Avatar" size={AvatarSize.SM} />
                            <Avatar
                                alt="Regular Avatar"
                                size={AvatarSize.REGULAR}
                            />
                            <Avatar alt="Medium Avatar" size={AvatarSize.MD} />
                            <Avatar alt="Large Avatar" size={AvatarSize.LG} />
                            <Avatar
                                alt="Extra Large Avatar"
                                size={AvatarSize.XL}
                            />
                        </div>
                    </div>

                    {/* All Shapes Demo */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            All Avatar Shapes
                        </h3>
                        <div className="flex gap-4 flex-wrap items-center">
                            <Avatar
                                alt="Circular Avatar"
                                size={AvatarSize.MD}
                                shape={AvatarShape.CIRCULAR}
                            />
                            <Avatar
                                alt="Rounded Avatar"
                                size={AvatarSize.MD}
                                shape={AvatarShape.ROUNDED}
                            />
                        </div>
                    </div>

                    {/* Online Position Demo */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            Online Indicator Positions
                        </h3>
                        <div className="flex gap-4 flex-wrap items-center">
                            <Avatar
                                alt="Top Position"
                                size={AvatarSize.MD}
                                online={true}
                                onlinePosition={AvatarOnlinePosition.TOP}
                            />
                            <Avatar
                                alt="Bottom Position"
                                size={AvatarSize.MD}
                                online={true}
                                onlinePosition={AvatarOnlinePosition.BOTTOM}
                            />
                        </div>
                    </div>

                    {/* Error Handling Demo */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            Error Handling
                        </h3>
                        <div className="flex gap-4 flex-wrap items-center">
                            <Avatar
                                src="invalid-url.jpg"
                                alt="Error Handling Avatar"
                                size={AvatarSize.MD}
                            />
                            <Avatar alt="" size={AvatarSize.MD} />
                        </div>
                    </div>

                    {/* Skeleton State Demo */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">
                            Skeleton State
                        </h3>
                        <div className="flex gap-4 flex-wrap items-center">
                            <Avatar
                                alt="Loading Avatar"
                                size={AvatarSize.MD}
                                skeleton={{ show: true, variant: 'pulse' }}
                            />
                        </div>
                    </div>
                </section>

                {/* WCAG Criteria Table */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        WCAG Success Criteria
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Criterion
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Level
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {report.criteria.map((criterion) => (
                                    <tr key={criterion.id}>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {criterion.id}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {criterion.title}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                                {criterion.level}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    criterion.status ===
                                                    'compliant'
                                                        ? 'bg-green-100 text-green-800'
                                                        : criterion.status ===
                                                            'non-compliant'
                                                          ? 'bg-red-100 text-red-800'
                                                          : criterion.status ===
                                                              'unsure'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {criterion.status
                                                    .replace('-', ' ')
                                                    .toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            {criterion.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
})

AvatarAccessibility.displayName = 'AvatarAccessibility'

export default AvatarAccessibility
