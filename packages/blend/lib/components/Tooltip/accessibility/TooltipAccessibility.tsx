import { forwardRef, useState } from 'react'
import { Button } from '../../Button/index'
import { ButtonType, ButtonSize } from '../../Button/types'
import { Tooltip } from '../Tooltip'
import {
    TooltipAlign,
    TooltipSide,
    TooltipSize,
    TooltipSlotDirection,
} from '../types'
import { tooltipAccessibilityReport } from './TooltipAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon, Info, HelpCircle } from 'lucide-react'

export type TooltipAccessibilityProps = {
    className?: string
}

const TooltipAccessibility = forwardRef<
    HTMLDivElement,
    TooltipAccessibilityProps
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
                tooltipAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `tooltip-accessibility-report-${tooltipAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                tooltipAccessibilityReport,
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

    const report = tooltipAccessibilityReport
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
                            <h1 className="text-3xl font-bold mb-1 text-gray-900">
                                Tooltip Component Accessibility
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
                        <div className="flex gap-2">
                            <Button
                                text={
                                    showFullReport
                                        ? 'Hide Full Report'
                                        : 'View Full Report'
                                }
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.SMALL}
                                onClick={handleViewReport}
                            />
                            <Button
                                text="Download"
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<DownloadIcon size={16} />}
                                onClick={handleDownload}
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Download Report
                        </h2>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="format"
                                        value="markdown"
                                        checked={selectedFormat === 'markdown'}
                                        onChange={(e) =>
                                            setSelectedFormat(
                                                e.target.value as ReportFormat
                                            )
                                        }
                                    />
                                    Markdown (.md)
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="format"
                                        value="html"
                                        checked={selectedFormat === 'html'}
                                        onChange={(e) =>
                                            setSelectedFormat(
                                                e.target.value as ReportFormat
                                            )
                                        }
                                    />
                                    HTML (.html)
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="format"
                                        value="json"
                                        checked={selectedFormat === 'json'}
                                        onChange={(e) =>
                                            setSelectedFormat(
                                                e.target.value as ReportFormat
                                            )
                                        }
                                    />
                                    JSON (.json)
                                </label>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={includeTestResults}
                                        onChange={(e) =>
                                            setIncludeTestResults(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Include test results
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={includeRecommendations}
                                        onChange={(e) =>
                                            setIncludeRecommendations(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Include recommendations
                                </label>
                            </div>

                            <Button
                                text="Download Report"
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                leadingIcon={<DownloadIcon size={16} />}
                                onClick={handleDownload}
                            />
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <iframe
                                srcDoc={reportHtmlContent}
                                className="w-full h-[600px] border-0"
                                title="Accessibility Report"
                            />
                        </div>
                    </section>
                )}

                {/* Summary Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {report.summary}
                    </p>
                </section>

                {/* Interactive Demo Section */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Interactive Demo
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Test keyboard navigation (Tab to focus, Escape to
                        dismiss), screen reader announcements, focus indicators,
                        and tooltip behavior. All tooltips have proper ARIA
                        attributes, accessible content, and keyboard support.
                    </p>

                    <div className="space-y-6">
                        {/* Basic Tooltips */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Basic Tooltips (Keyboard Accessible)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Tab to focus buttons, tooltip appears on focus
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Tooltip content="This is a helpful tooltip">
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Hover or Focus Me"
                                    />
                                </Tooltip>
                                <Tooltip content="Tooltip with more detailed information">
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Detailed Tooltip"
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* Keyboard Navigation */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Keyboard Navigation (Tab, Escape)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Use Tab to focus, Escape to dismiss
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Tooltip content="Press Escape to close">
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Escape Test"
                                    />
                                </Tooltip>
                                <Tooltip content="Keyboard accessible tooltip">
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Keyboard Test"
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* Tooltips with Icons */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Tooltips with Icons (Properly Hidden)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Decorative icons have aria-hidden="true"
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Tooltip
                                    content="Information tooltip with icon"
                                    slot={<Info size={16} aria-hidden="true" />}
                                    slotDirection={TooltipSlotDirection.LEFT}
                                >
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Info Tooltip"
                                        leadingIcon={<Info size={16} />}
                                    />
                                </Tooltip>
                                <Tooltip
                                    content="Help tooltip with icon"
                                    slot={
                                        <HelpCircle
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    }
                                    slotDirection={TooltipSlotDirection.RIGHT}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Help Tooltip"
                                        leadingIcon={<HelpCircle size={16} />}
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* Different Sizes */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Size Variants (Accessible)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                All sizes maintain accessibility standards
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Tooltip
                                    content="Small tooltip with concise information"
                                    size={TooltipSize.SMALL}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Small Tooltip"
                                    />
                                </Tooltip>
                                <Tooltip
                                    content="Large tooltip with more detailed information and additional context that can span multiple lines while remaining accessible"
                                    size={TooltipSize.LARGE}
                                >
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Large Tooltip"
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* All Positions */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                All Positions (Keyboard Accessible)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Tooltips work in all positions
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <Tooltip
                                    content="Top tooltip"
                                    side={TooltipSide.TOP}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Top"
                                    />
                                </Tooltip>
                                <Tooltip
                                    content="Right tooltip"
                                    side={TooltipSide.RIGHT}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Right"
                                    />
                                </Tooltip>
                                <Tooltip
                                    content="Bottom tooltip"
                                    side={TooltipSide.BOTTOM}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Bottom"
                                    />
                                </Tooltip>
                                <Tooltip
                                    content="Left tooltip"
                                    side={TooltipSide.LEFT}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Left"
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* All Alignments */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                All Alignments (Accessible)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Different alignment options
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Tooltip
                                    content="Start aligned tooltip"
                                    align={TooltipAlign.START}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Start"
                                    />
                                </Tooltip>
                                <Tooltip
                                    content="Center aligned tooltip"
                                    align={TooltipAlign.CENTER}
                                >
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Center"
                                    />
                                </Tooltip>
                                <Tooltip
                                    content="End aligned tooltip"
                                    align={TooltipAlign.END}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="End"
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* Rich Content */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Rich Content (Accessible)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Tooltips with structured content
                            </p>
                            <Tooltip
                                content={
                                    <div>
                                        <strong>Accessible Rich Content</strong>
                                        <br />
                                        This tooltip contains structured
                                        information that screen readers can
                                        navigate properly.
                                    </div>
                                }
                                size={TooltipSize.LARGE}
                            >
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    text="Rich Content Tooltip"
                                    leadingIcon={<Info size={16} />}
                                />
                            </Tooltip>
                        </div>

                        {/* Focus Management */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Focus Management (Keyboard Navigation)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Press Tab to see focus indicators
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Tooltip content="Focus this button to see the tooltip">
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Focus Me"
                                    />
                                </Tooltip>
                                <Tooltip content="Tooltip appears on focus for keyboard users">
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        text="Keyboard Accessible"
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

TooltipAccessibility.displayName = 'TooltipAccessibility'

export default TooltipAccessibility
