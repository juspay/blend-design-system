import { forwardRef, useState } from 'react'
import { ProgressBar } from '../index'
import { ProgressBarVariant, ProgressBarType } from '../types'
import { progressBarAccessibilityReport } from './ProgressBarAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { Button, ButtonType, ButtonSize } from '../../Button'

export type ProgressBarAccessibilityProps = {
    className?: string
}

const ProgressBarAccessibility = forwardRef<
    HTMLDivElement,
    ProgressBarAccessibilityProps
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
                progressBarAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `progressbar-accessibility-report-${progressBarAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                progressBarAccessibilityReport,
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

    const report = progressBarAccessibilityReport
    const compliantCount = report.criteria.filter(
        (c) => c.status === 'compliant'
    ).length
    const nonCompliantCount = report.criteria.filter(
        (c) => c.status === 'non-compliant'
    ).length
    const unsureCount = report.criteria.filter(
        (c) => c.status === 'unsure'
    ).length
    const notApplicableCount = report.criteria.filter(
        (c) => c.status === 'not-applicable'
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
                                ProgressBar Accessibility Report
                            </h1>
                            <p className="text-gray-600 mt-2">
                                WCAG 2.0, 2.1, 2.2 Compliance Analysis
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    report.overallStatus === 'compliant'
                                        ? 'bg-green-100 text-green-800'
                                        : report.overallStatus === 'partial'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : report.overallStatus ===
                                              'non-compliant'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {report.overallStatus === 'compliant'
                                    ? '✅ Compliant'
                                    : report.overallStatus === 'partial'
                                      ? '⚠️ Partial'
                                      : report.overallStatus === 'non-compliant'
                                        ? '❌ Non-Compliant'
                                        : '❓ Unsure'}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {report.conformanceLevel}
                            </span>
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
                                                progressBarAccessibilityReport,
                                                {
                                                    format: 'html',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `progressbar-accessibility-report-${progressBarAccessibilityReport.reportDate}.html`
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
                                                progressBarAccessibilityReport,
                                                {
                                                    format: 'markdown',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `progressbar-accessibility-report-${progressBarAccessibilityReport.reportDate}.md`
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

                {/* Statistics */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Compliance Statistics
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-700">
                                {compliantCount}
                            </div>
                            <div className="text-sm text-green-600 mt-1">
                                Compliant
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-red-700">
                                {nonCompliantCount}
                            </div>
                            <div className="text-sm text-red-600 mt-1">
                                Non-Compliant
                            </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-yellow-700">
                                {unsureCount}
                            </div>
                            <div className="text-sm text-yellow-600 mt-1">
                                Unsure
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-gray-700">
                                {notApplicableCount}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                N/A
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-700">
                                {complianceRate}%
                            </div>
                            <div className="text-sm text-blue-600 mt-1">
                                Compliance Rate
                            </div>
                        </div>
                    </div>
                </section>

                {/* WCAG Criteria */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        WCAG Success Criteria
                    </h2>
                    <div className="space-y-3">
                        {report.criteria.map((criterion, index) => (
                            <div
                                key={index}
                                className={`border rounded-lg p-4 ${
                                    criterion.status === 'compliant'
                                        ? 'bg-green-50 border-green-200'
                                        : criterion.status === 'non-compliant'
                                          ? 'bg-red-50 border-red-200'
                                          : criterion.status === 'unsure'
                                            ? 'bg-yellow-50 border-yellow-200'
                                            : 'bg-gray-50 border-gray-200'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-gray-900">
                                                {criterion.id} -{' '}
                                                {criterion.title}
                                            </span>
                                            <span
                                                className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                    criterion.level === 'A'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : criterion.level ===
                                                            'AA'
                                                          ? 'bg-purple-100 text-purple-800'
                                                          : 'bg-indigo-100 text-indigo-800'
                                                }`}
                                            >
                                                Level {criterion.level}
                                            </span>
                                            <span
                                                className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                    criterion.status ===
                                                    'compliant'
                                                        ? 'bg-green-100 text-green-800'
                                                        : criterion.status ===
                                                            'non-compliant'
                                                          ? 'bg-red-100 text-red-800'
                                                          : criterion.status ===
                                                              'unsure'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
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
                                        <p className="text-sm text-gray-700 mb-2">
                                            {criterion.description}
                                        </p>
                                        <p className="text-xs text-gray-600 mb-1">
                                            <strong>Implementation:</strong>{' '}
                                            {criterion.implementation}
                                        </p>
                                        {criterion.testResults && (
                                            <p className="text-xs text-gray-600 mb-1">
                                                <strong>Test Results:</strong>{' '}
                                                {criterion.testResults}
                                            </p>
                                        )}
                                        {criterion.notes && (
                                            <p className="text-xs text-yellow-700 mt-2 italic">
                                                <strong>Note:</strong>{' '}
                                                {criterion.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Strengths */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Strengths</h2>
                    <ul className="space-y-2">
                        {report.strengths.map((strength, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-700"
                            >
                                <span className="text-green-600 mt-0.5">✓</span>
                                <span>{strength}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Recommendations */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Recommendations</h2>
                    <ul className="space-y-2">
                        {report.recommendations.map((rec, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-700"
                            >
                                <span className="text-blue-600 mt-0.5">→</span>
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
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
                                Latest version
                            </p>
                            <ul className="text-xs text-purple-700 space-y-1">
                                {report.wcagVersions['2.2'].map((item, idx) => (
                                    <li key={idx}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Testing Methodology */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Testing Methodology
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Automated Testing
                            </h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                                {report.testMethodology.automated.map(
                                    (item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-blue-600 mt-0.5">
                                                •
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Manual Testing
                            </h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                                {report.testMethodology.manual.map(
                                    (item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-green-600 mt-0.5">
                                                •
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Verification Tools
                            </h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                                {report.testMethodology.verificationTools.map(
                                    (item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-purple-600 mt-0.5">
                                                •
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Component Examples */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Component Examples
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Basic Progress Bars
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Linear Solid (50%)
                                    </p>
                                    <ProgressBar
                                        value={50}
                                        variant={ProgressBarVariant.SOLID}
                                        showLabel={true}
                                        aria-label="Progress: 50%"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Linear Segmented (75%)
                                    </p>
                                    <ProgressBar
                                        value={75}
                                        variant={ProgressBarVariant.SEGMENTED}
                                        showLabel={true}
                                        aria-label="Progress: 75%"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Circular Solid (60%)
                                    </p>
                                    <div className="flex justify-center">
                                        <ProgressBar
                                            value={60}
                                            variant={
                                                ProgressBarVariant.CIRCULAR
                                            }
                                            type={ProgressBarType.SOLID}
                                            showLabel={true}
                                            aria-label="Progress: 60%"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Custom Ranges
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        File Upload (50 of 200 MB)
                                    </p>
                                    <ProgressBar
                                        value={50}
                                        min={0}
                                        max={200}
                                        variant={ProgressBarVariant.SOLID}
                                        showLabel={true}
                                        aria-label="File upload: 50 of 200 MB"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Task Completion (3 of 10 tasks)
                                    </p>
                                    <ProgressBar
                                        value={3}
                                        min={0}
                                        max={10}
                                        variant={ProgressBarVariant.SEGMENTED}
                                        showLabel={true}
                                        aria-label="Task progress: 3 of 10 completed"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Default aria-label Generation
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Without aria-label (default generated)
                                    </p>
                                    <ProgressBar
                                        value={45}
                                        variant={ProgressBarVariant.SOLID}
                                        showLabel={true}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        With custom aria-label
                                    </p>
                                    <ProgressBar
                                        value={80}
                                        variant={ProgressBarVariant.SOLID}
                                        showLabel={true}
                                        aria-label="Custom progress label"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

ProgressBarAccessibility.displayName = 'ProgressBarAccessibility'

export default ProgressBarAccessibility
