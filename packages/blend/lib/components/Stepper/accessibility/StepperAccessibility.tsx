import { forwardRef, useState } from 'react'
import Stepper from '../Stepper'
import { StepperType, StepState } from '../types'
import { stepperAccessibilityReport } from './StepperAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { Button, ButtonType, ButtonSize } from '../../Button'

export type StepperAccessibilityProps = {
    className?: string
}

const StepperAccessibility = forwardRef<
    HTMLDivElement,
    StepperAccessibilityProps
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
                stepperAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `stepper-accessibility-report-${stepperAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                stepperAccessibilityReport,
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

    const report = stepperAccessibilityReport
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

    // Example step data
    const horizontalSteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
        },
    ]

    const verticalSteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
            description: 'First step description',
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
            description: 'Second step description',
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
        },
    ]

    const stepsWithSubsteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
            substeps: [
                { id: 1, title: 'Substep 1.1' },
                { id: 2, title: 'Substep 1.2' },
            ],
            isExpanded: true,
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
        },
    ]

    const clickableSteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
        },
    ]

    return (
        <div ref={ref} className={className}>
            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-1 text-gray-900">
                                Stepper Component Accessibility
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
                                        className="rounded border-gray-300"
                                    />
                                    <span>Markdown</span>
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
                                        className="rounded border-gray-300"
                                    />
                                    <span>HTML</span>
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
                                        className="rounded border-gray-300"
                                    />
                                    <span>JSON</span>
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
                                        className="rounded border-gray-300"
                                    />
                                    <span>Include Test Results</span>
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
                                        className="rounded border-gray-300"
                                    />
                                    <span>Include Recommendations</span>
                                </label>
                            </div>
                            <Button
                                text="Download Report"
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.SMALL}
                                leadingIcon={<DownloadIcon size={16} />}
                                onClick={handleDownload}
                            />
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
                                Quick Stats
                            </h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Total Criteria:
                                    </span>
                                    <span className="font-medium">
                                        {report.criteria.length}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Level A:
                                    </span>
                                    <span className="font-medium">
                                        {
                                            report.criteria.filter(
                                                (c) => c.level === 'A'
                                            ).length
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Level AA:
                                    </span>
                                    <span className="font-medium">
                                        {
                                            report.criteria.filter(
                                                (c) => c.level === 'AA'
                                            ).length
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Level AAA:
                                    </span>
                                    <span className="font-medium">
                                        {
                                            report.criteria.filter(
                                                (c) => c.level === 'AAA'
                                            ).length
                                        }
                                    </span>
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
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-gray-900">
                                                    {criterion.id}:{' '}
                                                    {criterion.title}
                                                </span>
                                                <span
                                                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                        criterion.level === 'A'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : criterion.level ===
                                                                'AA'
                                                              ? 'bg-purple-100 text-purple-700'
                                                              : 'bg-indigo-100 text-indigo-700'
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
                                                                ? 'bg-orange-100 text-orange-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {criterion.status ===
                                                    'compliant'
                                                        ? '✅ Compliant'
                                                        : criterion.status ===
                                                            'non-compliant'
                                                          ? '❌ Non-Compliant'
                                                          : criterion.status ===
                                                              'unsure'
                                                            ? '⚠️ Unsure'
                                                            : 'N/A'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {criterion.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">
                                                Implementation:
                                            </span>
                                            <p className="text-gray-600 mt-1">
                                                {criterion.implementation}
                                            </p>
                                        </div>
                                        {criterion.testResults && (
                                            <div>
                                                <span className="font-medium text-gray-700">
                                                    Test Results:
                                                </span>
                                                <p className="text-gray-600 mt-1">
                                                    {criterion.testResults}
                                                </p>
                                            </div>
                                        )}
                                        {criterion.notes && (
                                            <div>
                                                <span className="font-medium text-gray-700">
                                                    Notes:
                                                </span>
                                                <p className="text-gray-600 mt-1">
                                                    {criterion.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Strengths
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                            {report.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                            ))}
                        </ul>
                    </div>

                    {report.recommendations.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Recommendations
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                {report.recommendations.map(
                                    (recommendation, index) => (
                                        <li key={index}>{recommendation}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Component Examples
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    Horizontal Stepper
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden p-6">
                                    <Stepper
                                        steps={horizontalSteps}
                                        stepperType={StepperType.HORIZONTAL}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Basic horizontal stepper with three steps
                                    showing completed, current, and pending
                                    states.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    Vertical Stepper
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden p-6">
                                    <Stepper
                                        steps={verticalSteps}
                                        stepperType={StepperType.VERTICAL}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Vertical stepper with step descriptions and
                                    proper semantic structure.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    Stepper with Substeps
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden p-6">
                                    <Stepper
                                        steps={stepsWithSubsteps}
                                        stepperType={StepperType.VERTICAL}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Vertical stepper with expandable substeps.
                                    Substeps are properly grouped and accessible
                                    via keyboard navigation.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    Clickable Stepper
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden p-6">
                                    <Stepper
                                        steps={clickableSteps}
                                        clickable={true}
                                        onStepClick={(index) => {
                                            console.log('Step clicked:', index)
                                        }}
                                        stepperType={StepperType.HORIZONTAL}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Clickable horizontal stepper. Steps can be
                                    activated via mouse click, Enter, or Space
                                    key. Arrow keys navigate between steps.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Keyboard Navigation
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <strong>Horizontal Stepper:</strong>
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                                    <li>
                                        <strong>ArrowLeft/ArrowRight</strong>:
                                        Navigate between steps
                                    </li>
                                    <li>
                                        <strong>Home</strong>: Navigate to first
                                        step
                                    </li>
                                    <li>
                                        <strong>End</strong>: Navigate to last
                                        step
                                    </li>
                                    <li>
                                        <strong>Tab</strong>: Navigate to
                                        interactive elements
                                    </li>
                                    <li>
                                        <strong>Enter/Space</strong>: Activate
                                        step (when clickable)
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <strong>Vertical Stepper:</strong>
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                                    <li>
                                        <strong>ArrowUp/ArrowDown</strong>:
                                        Navigate between steps
                                    </li>
                                    <li>
                                        <strong>ArrowRight</strong>: Expand
                                        substeps or move into substeps
                                    </li>
                                    <li>
                                        <strong>ArrowLeft</strong>: Move back to
                                        parent step from substeps
                                    </li>
                                    <li>
                                        <strong>Home</strong>: Navigate to first
                                        step
                                    </li>
                                    <li>
                                        <strong>End</strong>: Navigate to last
                                        step
                                    </li>
                                    <li>
                                        <strong>Tab</strong>: Navigate to
                                        interactive elements
                                    </li>
                                    <li>
                                        <strong>Enter/Space</strong>: Activate
                                        step or substep (when clickable)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

StepperAccessibility.displayName = 'StepperAccessibility'

export default StepperAccessibility
