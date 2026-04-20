import { forwardRef, useState } from 'react'
import { Button } from '../../Button/index'
import { ButtonType, ButtonSize } from '../../Button/types'
import Popover from '../Popover'
import { popoverAccessibilityReport } from './PopoverAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'

export type PopoverAccessibilityProps = {
    className?: string
}

const PopoverAccessibility = forwardRef<
    HTMLDivElement,
    PopoverAccessibilityProps
>(({ className }, ref) => {
    const [selectedFormat, setSelectedFormat] =
        useState<ReportFormat>('markdown')
    const [includeTestResults, setIncludeTestResults] = useState(true)
    const [includeRecommendations, setIncludeRecommendations] = useState(true)
    const [reportHtmlContent, setReportHtmlContent] = useState<string | null>(
        null
    )
    const [showFullReport, setShowFullReport] = useState(false)
    const [basicPopoverOpen, setBasicPopoverOpen] = useState(false)
    const [keyboardPopoverOpen, setKeyboardPopoverOpen] = useState(false)
    const [focusPopoverOpen, setFocusPopoverOpen] = useState(false)
    const [actionsPopoverOpen, setActionsPopoverOpen] = useState(false)
    const [descriptionPopoverOpen, setDescriptionPopoverOpen] = useState(false)
    const [modalPopoverOpen, setModalPopoverOpen] = useState(false)

    const handleDownload = () => {
        try {
            const content = generateAccessibilityReport(
                popoverAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `popover-accessibility-report-${popoverAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                popoverAccessibilityReport,
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

    const report = popoverAccessibilityReport
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
                                Popover Component Accessibility
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
                        Test keyboard navigation (Tab to navigate, Escape to
                        close), screen reader announcements, focus management
                        (focus trap in modal mode, focus return), and popover
                        behavior. All popovers have proper ARIA attributes,
                        accessible content, and keyboard support.
                    </p>

                    <div className="space-y-6">
                        {/* Basic Popover */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Basic Popover (Keyboard Accessible)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Tab to navigate, Escape to close
                            </p>
                            <Popover
                                trigger={
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Basic Popover"
                                    />
                                }
                                heading="Basic Popover"
                                open={basicPopoverOpen}
                                onOpenChange={setBasicPopoverOpen}
                            >
                                <p>
                                    This is a basic popover with keyboard
                                    support.
                                </p>
                                <p className="mt-2">
                                    Press Tab to navigate, Escape to close.
                                </p>
                            </Popover>
                        </div>

                        {/* Keyboard Navigation */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Keyboard Navigation (Tab, Escape)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Use Tab to navigate, Escape to close
                            </p>
                            <Popover
                                trigger={
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Keyboard Test Popover"
                                    />
                                }
                                heading="Keyboard Test"
                                open={keyboardPopoverOpen}
                                onOpenChange={setKeyboardPopoverOpen}
                                primaryAction={{
                                    text: 'Save',
                                    onClick: () =>
                                        setKeyboardPopoverOpen(false),
                                }}
                                secondaryAction={{
                                    text: 'Cancel',
                                    onClick: () =>
                                        setKeyboardPopoverOpen(false),
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Tab to this input"
                                    className="w-full p-2 border rounded"
                                />
                                <p className="mt-2 text-sm text-gray-600">
                                    Press Escape to close or use Tab to navigate
                                    between elements.
                                </p>
                            </Popover>
                        </div>

                        {/* Focus Management */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Focus Management (Focus Trap in Modal Mode)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Focus is trapped within popover when modal,
                                returns to trigger when closed
                            </p>
                            <Popover
                                trigger={
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Focus Test Popover"
                                    />
                                }
                                heading="Focus Trap Test"
                                open={focusPopoverOpen}
                                onOpenChange={setFocusPopoverOpen}
                                asModal={true}
                                primaryAction={{
                                    text: 'OK',
                                    onClick: () => setFocusPopoverOpen(false),
                                }}
                            >
                                <p>
                                    Focus is trapped within this popover (modal
                                    mode). Try pressing Tab multiple times -
                                    focus will wrap from last to first element.
                                </p>
                                <input
                                    type="text"
                                    placeholder="Input 1"
                                    className="w-full p-2 border rounded mt-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Input 2"
                                    className="w-full p-2 border rounded mt-2"
                                />
                            </Popover>
                        </div>

                        {/* Popover with Actions */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Popover with Actions (Accessible Buttons)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Action buttons have accessible names
                            </p>
                            <Popover
                                trigger={
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Actions Popover"
                                    />
                                }
                                heading="Actions Popover"
                                open={actionsPopoverOpen}
                                onOpenChange={setActionsPopoverOpen}
                                primaryAction={{
                                    text: 'Save Changes',
                                    onClick: () => setActionsPopoverOpen(false),
                                }}
                                secondaryAction={{
                                    text: 'Cancel',
                                    onClick: () => setActionsPopoverOpen(false),
                                }}
                            >
                                <p>
                                    This popover demonstrates accessible action
                                    buttons with clear labels.
                                </p>
                            </Popover>
                        </div>

                        {/* Popover with Description */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Popover with Description (ARIA Describedby)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Description is linked via aria-describedby
                            </p>
                            <Popover
                                trigger={
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Description Popover"
                                    />
                                }
                                heading="Popover with Description"
                                description="This description is programmatically associated with the popover via aria-describedby"
                                open={descriptionPopoverOpen}
                                onOpenChange={setDescriptionPopoverOpen}
                                primaryAction={{
                                    text: 'OK',
                                    onClick: () =>
                                        setDescriptionPopoverOpen(false),
                                }}
                            >
                                <p>
                                    Screen readers will announce both the
                                    heading and description when this popover
                                    opens.
                                </p>
                            </Popover>
                        </div>

                        {/* Modal Popover */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Modal Popover (Focus Trap Enabled)
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Modal mode with focus trap and role="dialog"
                            </p>
                            <Popover
                                trigger={
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Open Modal Popover"
                                    />
                                }
                                heading="Modal Popover"
                                description="This popover is in modal mode with focus trap enabled"
                                open={modalPopoverOpen}
                                onOpenChange={setModalPopoverOpen}
                                asModal={true}
                                primaryAction={{
                                    text: 'OK',
                                    onClick: () => setModalPopoverOpen(false),
                                }}
                            >
                                <p>
                                    This popover demonstrates modal behavior
                                    with focus trap. Focus cannot escape the
                                    popover until it is closed.
                                </p>
                            </Popover>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

PopoverAccessibility.displayName = 'PopoverAccessibility'

export default PopoverAccessibility
