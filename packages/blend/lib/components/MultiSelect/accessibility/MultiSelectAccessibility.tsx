import { forwardRef, useState } from 'react'
import MultiSelect from '../MultiSelect'
import { Button } from '../../Button'
import { ButtonType, ButtonSize } from '../../Button/types'
import { multiSelectAccessibilityReport } from './MultiSelectAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon, Check } from 'lucide-react'
import { MultiSelectMenuSize, MultiSelectVariant } from '../types'

export interface MultiSelectAccessibilityProps {
    className?: string
}

const MultiSelectAccessibility = forwardRef<
    HTMLDivElement,
    MultiSelectAccessibilityProps
>(({ className }, ref) => {
    const [selectedFormat, setSelectedFormat] =
        useState<ReportFormat>('markdown')
    const [includeTestResults, setIncludeTestResults] = useState(true)
    const [includeRecommendations, setIncludeRecommendations] = useState(true)
    const [reportHtmlContent, setReportHtmlContent] = useState<string | null>(
        null
    )
    const [showFullReport, setShowFullReport] = useState(false)
    const [demoStates, setDemoStates] = useState({
        selectedValues: [] as string[],
        required: false,
        error: false,
    })

    const handleDownload = () => {
        try {
            if (!multiSelectAccessibilityReport) {
                console.error('Report data is missing')
                alert('Report data is not available. Please refresh the page.')
                return
            }

            const content = generateAccessibilityReport(
                multiSelectAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            if (!content) {
                console.error('Generated report content is empty')
                alert('Failed to generate report content. Please try again.')
                return
            }

            const filename = `multiselect-accessibility-report-${multiSelectAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
            const mimeType = getMimeType(selectedFormat)

            downloadReport(content, filename, mimeType)
        } catch (error) {
            console.error('Error generating report:', error)
            alert(
                `Failed to generate report: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the console for details.`
            )
        }
    }

    const handleViewReport = () => {
        try {
            const htmlContent = generateAccessibilityReport(
                multiSelectAccessibilityReport,
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

    const report = multiSelectAccessibilityReport
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

    const demoItems = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
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
                                MultiSelect Component Accessibility
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
                                Needs attention
                            </div>
                        </div>
                        <div className="bg-white border-2 border-yellow-200 rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold mb-1 text-yellow-600">
                                {unsureCount}
                            </div>
                            <div className="text-xs font-medium text-gray-700">
                                Verification ⚠️
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Manual check needed
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
                                {compliantCount}/{totalApplicable} criteria
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

                    {/* Full Report Viewer */}
                    {showFullReport && reportHtmlContent && (
                        <section className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Full Accessibility Report
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Interactive HTML report (same as
                                        downloaded version)
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
                                                    multiSelectAccessibilityReport,
                                                    {
                                                        format: 'html',
                                                        includeTestResults,
                                                        includeRecommendations,
                                                    }
                                                )
                                            const filename = `multiselect-accessibility-report-${multiSelectAccessibilityReport.reportDate}.html`
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
                                                    multiSelectAccessibilityReport,
                                                    {
                                                        format: 'markdown',
                                                        includeTestResults,
                                                        includeRecommendations,
                                                    }
                                                )
                                            const filename = `multiselect-accessibility-report-${multiSelectAccessibilityReport.reportDate}.md`
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
                                                    multiSelectAccessibilityReport,
                                                    {
                                                        format: 'json',
                                                        includeTestResults,
                                                        includeRecommendations,
                                                    }
                                                )
                                            const filename = `multiselect-accessibility-report-${multiSelectAccessibilityReport.reportDate}.json`
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

                    {/* WCAG Criteria Evaluation */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            WCAG Success Criteria Evaluation
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
                                                    {criterion.id}
                                                </span>
                                                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                                    Level {criterion.level}
                                                </span>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded font-medium ${
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
                                                        .replace('-', ' ')
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            <h3 className="font-medium text-sm mb-1">
                                                {criterion.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 mb-2">
                                                {criterion.description}
                                            </p>
                                            <div className="text-xs text-gray-700 space-y-1">
                                                <div>
                                                    <strong>
                                                        Implementation:
                                                    </strong>{' '}
                                                    {criterion.implementation}
                                                </div>
                                                {criterion.testResults && (
                                                    <div>
                                                        <strong>
                                                            Test Results:
                                                        </strong>{' '}
                                                        {criterion.testResults}
                                                    </div>
                                                )}
                                                {criterion.notes && (
                                                    <div className="text-yellow-700 bg-yellow-50 p-2 rounded mt-2">
                                                        <strong>Notes:</strong>{' '}
                                                        {criterion.notes}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strengths */}
                    {report.strengths.length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4 text-green-800">
                                Strengths
                            </h2>
                            <ul className="space-y-2">
                                {report.strengths.map((strength, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-green-700"
                                    >
                                        <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Recommendations */}
                    {report.recommendations.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4 text-yellow-800">
                                Recommendations
                            </h2>
                            <ul className="space-y-2">
                                {report.recommendations.map(
                                    (recommendation, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm text-yellow-700"
                                        >
                                            <span className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5">
                                                •
                                            </span>
                                            <span>{recommendation}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Interactive Demos */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Interactive Examples
                        </h2>
                        <div className="space-y-6">
                            {/* Perceivable */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                    Perceivable
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <MultiSelect
                                            label="Default MultiSelect"
                                            placeholder="Choose options"
                                            items={demoItems}
                                            selectedValues={
                                                demoStates.selectedValues
                                            }
                                            onChange={(value) => {
                                                if (
                                                    demoStates.selectedValues.includes(
                                                        value
                                                    )
                                                ) {
                                                    setDemoStates((prev) => ({
                                                        ...prev,
                                                        selectedValues:
                                                            prev.selectedValues.filter(
                                                                (v) =>
                                                                    v !== value
                                                            ),
                                                    }))
                                                } else {
                                                    setDemoStates((prev) => ({
                                                        ...prev,
                                                        selectedValues: [
                                                            ...prev.selectedValues,
                                                            value,
                                                        ],
                                                    }))
                                                }
                                            }}
                                            size={MultiSelectMenuSize.MEDIUM}
                                            variant={
                                                MultiSelectVariant.CONTAINER
                                            }
                                        />
                                    </div>
                                    <div>
                                        <MultiSelect
                                            label="Required MultiSelect"
                                            placeholder="Choose options"
                                            items={demoItems}
                                            selectedValues={
                                                demoStates.selectedValues
                                            }
                                            onChange={(value) => {
                                                if (
                                                    demoStates.selectedValues.includes(
                                                        value
                                                    )
                                                ) {
                                                    setDemoStates((prev) => ({
                                                        ...prev,
                                                        selectedValues:
                                                            prev.selectedValues.filter(
                                                                (v) =>
                                                                    v !== value
                                                            ),
                                                    }))
                                                } else {
                                                    setDemoStates((prev) => ({
                                                        ...prev,
                                                        selectedValues: [
                                                            ...prev.selectedValues,
                                                            value,
                                                        ],
                                                    }))
                                                }
                                            }}
                                            required={true}
                                            hintText="Select at least one option"
                                            size={MultiSelectMenuSize.MEDIUM}
                                            variant={
                                                MultiSelectVariant.CONTAINER
                                            }
                                        />
                                    </div>
                                    <div>
                                        <MultiSelect
                                            label="Error State MultiSelect"
                                            placeholder="Choose options"
                                            items={demoItems}
                                            selectedValues={
                                                demoStates.selectedValues
                                            }
                                            onChange={(value) => {
                                                if (
                                                    demoStates.selectedValues.includes(
                                                        value
                                                    )
                                                ) {
                                                    setDemoStates((prev) => ({
                                                        ...prev,
                                                        selectedValues:
                                                            prev.selectedValues.filter(
                                                                (v) =>
                                                                    v !== value
                                                            ),
                                                    }))
                                                } else {
                                                    setDemoStates((prev) => ({
                                                        ...prev,
                                                        selectedValues: [
                                                            ...prev.selectedValues,
                                                            value,
                                                        ],
                                                    }))
                                                }
                                            }}
                                            error={demoStates.error}
                                            errorMessage={
                                                demoStates.error
                                                    ? 'Please select at least one option'
                                                    : undefined
                                            }
                                            size={MultiSelectMenuSize.MEDIUM}
                                            variant={
                                                MultiSelectVariant.CONTAINER
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Methodology */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Testing Methodology & Verification
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-800">
                                    Automated Testing
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                    {report.testMethodology.automated.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-800">
                                    Manual Testing
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                    {report.testMethodology.manual.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-800">
                                    Verification Tools
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                    {report.testMethodology.verificationTools.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

MultiSelectAccessibility.displayName = 'MultiSelectAccessibility'

export default MultiSelectAccessibility
