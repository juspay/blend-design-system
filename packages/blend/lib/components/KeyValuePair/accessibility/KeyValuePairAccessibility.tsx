import { forwardRef, useState } from 'react'
import KeyValuePair from '../KeyValuePair'
import { KeyValuePairSize, KeyValuePairStateType } from '../types'
import { Button, ButtonType, ButtonSize } from '../../Button'
import { keyValuePairAccessibilityReport } from './KeyValuePairAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { Info, Star, ArrowRight, CheckCircle } from 'lucide-react'

export type KeyValuePairAccessibilityProps = {
    className?: string
}

const KeyValuePairAccessibility = forwardRef<
    HTMLDivElement,
    KeyValuePairAccessibilityProps
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
                keyValuePairAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `keyvaluepair-accessibility-report-${keyValuePairAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                keyValuePairAccessibilityReport,
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

    const report = keyValuePairAccessibilityReport
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
                                KeyValuePair Accessibility Report
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
                            <div className="text-sm text-gray-600">Unsure</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-gray-700">
                                {complianceRate}%
                            </div>
                            <div className="text-sm text-gray-600">
                                Compliance Rate
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {report.summary}
                        </p>
                    </div>

                    {/* Download Options */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Download Report
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Format:
                                </label>
                                <select
                                    value={selectedFormat}
                                    onChange={(e) =>
                                        setSelectedFormat(
                                            e.target.value as ReportFormat
                                        )
                                    }
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                                >
                                    <option value="markdown">Markdown</option>
                                    <option value="html">HTML</option>
                                    <option value="json">JSON</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeTestResults}
                                        onChange={(e) =>
                                            setIncludeTestResults(
                                                e.target.checked
                                            )
                                        }
                                        className="rounded"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Include Test Results
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={includeRecommendations}
                                        onChange={(e) =>
                                            setIncludeRecommendations(
                                                e.target.checked
                                            )
                                        }
                                        className="rounded"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Include Recommendations
                                    </span>
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    onClick={handleDownload}
                                    leadingIcon={<DownloadIcon size={16} />}
                                    text="Download Report"
                                />
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    onClick={handleViewReport}
                                    text="View Full Report"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Full Report Viewer */}
                    {showFullReport && reportHtmlContent && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Full Report
                                </h2>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        setShowFullReport(false)
                                        setReportHtmlContent(null)
                                    }}
                                    text="Close"
                                />
                            </div>
                            <iframe
                                srcDoc={reportHtmlContent}
                                className="w-full h-[600px] border border-gray-300 rounded"
                                title="Accessibility Report"
                            />
                        </div>
                    )}

                    {/* WCAG Criteria */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            WCAG Success Criteria
                        </h2>
                        <div className="space-y-4">
                            {report.criteria.map((criterion) => (
                                <div
                                    key={criterion.id}
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {criterion.id} -{' '}
                                                {criterion.title} (Level{' '}
                                                {criterion.level})
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {criterion.description}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                                criterion.status === 'compliant'
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
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Implementation:
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {criterion.implementation}
                                            </p>
                                        </div>
                                        {criterion.testResults && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Test Results:
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {criterion.testResults}
                                                </p>
                                            </div>
                                        )}
                                        {criterion.notes && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Notes:
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {criterion.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Demos */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Interactive Examples
                        </h2>
                        <div className="space-y-6">
                            {/* Basic KeyValuePair */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Basic KeyValuePair
                                </h3>
                                <div className="space-y-2">
                                    <KeyValuePair
                                        keyString="Name"
                                        value="John Doe"
                                        size={KeyValuePairSize.MEDIUM}
                                    />
                                    <KeyValuePair
                                        keyString="Email"
                                        value="john.doe@example.com"
                                        size={KeyValuePairSize.MEDIUM}
                                    />
                                </div>
                            </div>

                            {/* With Slots */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    With Decorative Icons (aria-hidden="true")
                                </h3>
                                <div className="space-y-2">
                                    <KeyValuePair
                                        keyString="Rating"
                                        value="4.5"
                                        size={KeyValuePairSize.MEDIUM}
                                        keySlot={
                                            <Info
                                                size={16}
                                                aria-hidden="true"
                                            />
                                        }
                                        valueLeftSlot={
                                            <Star
                                                size={16}
                                                aria-hidden="true"
                                            />
                                        }
                                    />
                                    <KeyValuePair
                                        keyString="Status"
                                        value="Active"
                                        size={KeyValuePairSize.MEDIUM}
                                        valueRightSlot={
                                            <CheckCircle
                                                size={16}
                                                aria-hidden="true"
                                            />
                                        }
                                    />
                                </div>
                            </div>

                            {/* With Interactive Elements */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    With Interactive Elements (Buttons)
                                </h3>
                                <div className="space-y-2">
                                    <KeyValuePair
                                        keyString="Action"
                                        value="Continue"
                                        size={KeyValuePairSize.MEDIUM}
                                        valueRightSlot={
                                            <button
                                                aria-label="Continue to next step"
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <ArrowRight
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        }
                                    />
                                </div>
                            </div>

                            {/* Different Layouts */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Different Layouts
                                </h3>
                                <div className="space-y-2">
                                    <KeyValuePair
                                        keyString="Vertical Layout"
                                        value="Key above value"
                                        keyValuePairState={
                                            KeyValuePairStateType.vertical
                                        }
                                    />
                                    <KeyValuePair
                                        keyString="Horizontal Layout"
                                        value="Key beside value"
                                        keyValuePairState={
                                            KeyValuePairStateType.horizontal
                                        }
                                    />
                                </div>
                            </div>

                            {/* Different Sizes */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Different Sizes
                                </h3>
                                <div className="space-y-2">
                                    <KeyValuePair
                                        keyString="Small"
                                        value="Small size"
                                        size={KeyValuePairSize.SMALL}
                                    />
                                    <KeyValuePair
                                        keyString="Medium"
                                        value="Medium size"
                                        size={KeyValuePairSize.MEDIUM}
                                    />
                                    <KeyValuePair
                                        keyString="Large"
                                        value="Large size"
                                        size={KeyValuePairSize.LARGE}
                                    />
                                </div>
                            </div>

                            {/* Text Overflow */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Text Overflow Modes
                                </h3>
                                <div className="space-y-2">
                                    <KeyValuePair
                                        keyString="Truncate"
                                        value="This is a very long value that will be truncated with ellipsis"
                                        textOverflow="truncate"
                                        maxWidth="200px"
                                        showTooltipOnTruncate={true}
                                    />
                                    <KeyValuePair
                                        keyString="Wrap"
                                        value="This is a very long value that will wrap naturally across multiple lines"
                                        textOverflow="wrap"
                                        maxWidth="200px"
                                    />
                                    <KeyValuePair
                                        keyString="Wrap-Clamp"
                                        value="This is a very long value that will wrap up to a maximum number of lines and then truncate with ellipsis"
                                        textOverflow="wrap-clamp"
                                        maxLines={2}
                                        maxWidth="200px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

KeyValuePairAccessibility.displayName = 'KeyValuePairAccessibility'

export default KeyValuePairAccessibility
