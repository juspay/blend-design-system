import { forwardRef, useState } from 'react'
import { Button } from '../../../Button/index'
import { ButtonType, ButtonSize } from '../../../Button/types'
import TextArea from '../TextArea'
import { textAreaAccessibilityReport } from './TextAreaAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'

export type TextAreaAccessibilityProps = {
    className?: string
}

const TextAreaAccessibility = forwardRef<
    HTMLDivElement,
    TextAreaAccessibilityProps
>(({ className }, ref) => {
    const [selectedFormat, setSelectedFormat] =
        useState<ReportFormat>('markdown')
    const [includeTestResults, setIncludeTestResults] = useState(true)
    const [includeRecommendations, setIncludeRecommendations] = useState(true)
    const [reportHtmlContent, setReportHtmlContent] = useState<string | null>(
        null
    )
    const [showFullReport, setShowFullReport] = useState(false)

    // Demo state
    const [description, setDescription] = useState('')
    const [feedback, setFeedback] = useState('')
    const [disabledValue] = useState(
        'This field is disabled and cannot be edited'
    )
    const [keyboardText, setKeyboardText] = useState('')
    const [reviewNotes, setReviewNotes] = useState('')

    const descriptionError =
        description.length > 0 && description.length < 10
            ? 'Please enter at least 10 characters'
            : ''

    const handleDownload = () => {
        try {
            const content = generateAccessibilityReport(
                textAreaAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `textarea-accessibility-report-${textAreaAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                textAreaAccessibilityReport,
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

    const report = textAreaAccessibilityReport
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
                                TextArea Component Accessibility
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
                        Test keyboard navigation (Tab, Shift+Tab, standard text
                        editing shortcuts), screen reader announcements, error
                        states, and resize controls. All textareas have proper
                        ARIA attributes, accessible labels, and error handling.
                    </p>

                    <div className="space-y-6">
                        {/* Basic TextArea */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Basic TextArea
                            </h3>
                            <TextArea
                                label="Project Description"
                                sublabel="Provide a detailed overview of your project"
                                hintText="Enter at least 10 characters for a meaningful description"
                                placeholder="Describe your project..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                required
                            />
                        </div>

                        {/* Error State */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Error Messaging and Validation
                            </h3>
                            <TextArea
                                label="Feedback"
                                placeholder="Enter your feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                                error={!!descriptionError}
                                errorMessage={descriptionError}
                                hintText="Minimum 10 characters required"
                                required
                            />
                        </div>

                        {/* Disabled State */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Disabled State
                            </h3>
                            <TextArea
                                label="Disabled TextArea"
                                placeholder="This textarea is disabled and cannot be edited."
                                value={disabledValue}
                                onChange={() => {}}
                                rows={4}
                                disabled
                                hintText="Disabled fields are not focusable and do not submit values"
                            />
                        </div>

                        {/* Keyboard Navigation Demo */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Keyboard and Screen Reader Friendly Layout
                            </h3>
                            <TextArea
                                label="Comments"
                                sublabel="Use Tab to navigate, standard keyboard shortcuts for text editing"
                                hintText="You can use standard text editing shortcuts (Ctrl/Cmd+A, Ctrl/Cmd+C, etc.)"
                                placeholder="Enter your comments..."
                                value={keyboardText}
                                onChange={(e) =>
                                    setKeyboardText(e.target.value)
                                }
                                rows={5}
                                required
                                helpIconHintText="Keyboard shortcuts: Tab/Shift+Tab to navigate, standard text editing shortcuts work as expected"
                            />
                        </div>

                        {/* Character Count */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Character Count and Length Limits
                            </h3>
                            <TextArea
                                label="Review Notes"
                                sublabel="Maximum 500 characters"
                                hintText={`${reviewNotes.length}/500 characters`}
                                placeholder="Enter review notes..."
                                value={reviewNotes}
                                onChange={(e) => setReviewNotes(e.target.value)}
                                rows={4}
                                maxLength={500}
                                required
                            />
                        </div>

                        {/* Different Resize Options */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Different Resize Options
                            </h3>
                            <div className="space-y-4">
                                <TextArea
                                    label="No Resize"
                                    placeholder="This textarea cannot be resized..."
                                    value=""
                                    onChange={() => {}}
                                    rows={4}
                                    resize="none"
                                />
                                <TextArea
                                    label="Vertical Resize"
                                    placeholder="This textarea can be resized vertically..."
                                    value=""
                                    onChange={() => {}}
                                    rows={4}
                                    resize="vertical"
                                />
                                <TextArea
                                    label="Both Directions"
                                    placeholder="This textarea can be resized in both directions..."
                                    value=""
                                    onChange={() => {}}
                                    rows={4}
                                    resize="both"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

TextAreaAccessibility.displayName = 'TextAreaAccessibility'

export default TextAreaAccessibility
