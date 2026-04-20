import { forwardRef, useState } from 'react'
import { Button } from '../../Button'
import { ButtonType, ButtonSize } from '../../Button/types'
import { Upload, UploadState } from '../index'
import { uploadAccessibilityReport } from './UploadAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon, FileUp, X, CheckCircle2 } from 'lucide-react'

export type UploadAccessibilityProps = {
    className?: string
}

const UploadAccessibility = forwardRef<
    HTMLDivElement,
    UploadAccessibilityProps
>(({ className }, ref) => {
    const [selectedFormat, setSelectedFormat] =
        useState<ReportFormat>('markdown')
    const [includeTestResults, setIncludeTestResults] = useState(true)
    const [includeRecommendations, setIncludeRecommendations] = useState(true)
    const [reportHtmlContent, setReportHtmlContent] = useState<string | null>(
        null
    )
    const [showFullReport, setShowFullReport] = useState(false)

    const handleViewReport = () => {
        try {
            const htmlContent = generateAccessibilityReport(
                uploadAccessibilityReport,
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

    const report = uploadAccessibilityReport
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
                            <h1 className="text-3xl font-bold mb-1">
                                Upload Component Accessibility
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
                                Verification Needed ⚠️
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Manual testing required
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

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900">
                            {report.summary}
                        </p>
                    </div>
                </div>

                {/* Component Demo */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Component Demo</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Default Upload
                            </h3>
                            <Upload
                                label="Upload File"
                                description=".pdf, .doc, .docx | Max size 5MB"
                                onDrop={() => {}}
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Multiple Files Upload
                            </h3>
                            <Upload
                                label="Upload Files"
                                description="Multiple files allowed"
                                multiple
                                maxFiles={5}
                                onDrop={() => {}}
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Upload with Error State
                            </h3>
                            <Upload
                                label="Upload File"
                                errorText="File upload failed. Please try again."
                                state={UploadState.ERROR}
                                failedFiles={[
                                    {
                                        file: new File([''], 'test.txt'),
                                        id: '1',
                                        status: 'error',
                                        error: 'File too large',
                                    },
                                ]}
                                onDrop={() => {}}
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Upload with Success State
                            </h3>
                            <Upload
                                label="Upload File"
                                state={UploadState.SUCCESS}
                                uploadedFiles={[
                                    {
                                        file: new File([''], 'document.pdf'),
                                        id: '1',
                                        status: 'success',
                                    },
                                ]}
                                onDrop={() => {}}
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Disabled Upload
                            </h3>
                            <Upload
                                label="Upload File"
                                disabled
                                onDrop={() => {}}
                            />
                        </div>
                    </div>
                </section>

                {/* WCAG Criteria Overview */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        WCAG Success Criteria Evaluation
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Level A Criteria (
                                {report.testMethodology.wcagLevels.A.length}{' '}
                                evaluated)
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Minimum requirements for basic accessibility.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                <p className="text-xs font-medium text-blue-900 mb-1">
                                    Criteria:
                                </p>
                                <p className="text-xs text-blue-800">
                                    {report.testMethodology.wcagLevels.A.join(
                                        ', '
                                    )}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Level AA Criteria (
                                {report.testMethodology.wcagLevels.AA.length}{' '}
                                evaluated)
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Enhanced accessibility requirements.
                            </p>
                            <div className="bg-green-50 border border-green-200 rounded p-3">
                                <p className="text-xs font-medium text-green-900 mb-1">
                                    Criteria:
                                </p>
                                <p className="text-xs text-green-800">
                                    {report.testMethodology.wcagLevels.AA.join(
                                        ', '
                                    )}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Level AAA Criteria (
                                {report.testMethodology.wcagLevels.AAA.length}{' '}
                                evaluated)
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Highest level of accessibility (optional).
                            </p>
                            <div className="bg-purple-50 border border-purple-200 rounded p-3">
                                <p className="text-xs font-medium text-purple-900 mb-1">
                                    Criteria:
                                </p>
                                <p className="text-xs text-purple-800">
                                    {report.testMethodology.wcagLevels.AAA.join(
                                        ', '
                                    )}
                                </p>
                            </div>
                        </div>
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
                                <CheckCircle2
                                    size={16}
                                    className="text-green-600 mt-0.5 flex-shrink-0"
                                />
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
                                <span className="text-blue-600 font-semibold mt-0.5 flex-shrink-0">
                                    {index + 1}.
                                </span>
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Report Download */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Download Accessibility Report
                    </h2>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Format
                                </label>
                                <select
                                    value={selectedFormat}
                                    onChange={(e) =>
                                        setSelectedFormat(
                                            e.target.value as ReportFormat
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="markdown">Markdown</option>
                                    <option value="html">HTML</option>
                                    <option value="json">JSON</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={includeTestResults}
                                    onChange={(e) =>
                                        setIncludeTestResults(e.target.checked)
                                    }
                                    className="rounded border-gray-300"
                                />
                                Include Test Results
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
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
                                Include Recommendations
                            </label>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                                Report generated on{' '}
                                {new Date().toLocaleString()}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    text="View Full Report"
                                    leadingIcon={<FileUp size={14} />}
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                    onClick={handleViewReport}
                                />
                                <Button
                                    text="Download HTML"
                                    leadingIcon={<DownloadIcon size={14} />}
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                uploadAccessibilityReport,
                                                {
                                                    format: 'html',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `upload-accessibility-report-${uploadAccessibilityReport.reportDate}.html`
                                        downloadReport(
                                            content,
                                            filename,
                                            'text/html'
                                        )
                                    }}
                                />
                                <Button
                                    text="Download Markdown"
                                    leadingIcon={<DownloadIcon size={14} />}
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                uploadAccessibilityReport,
                                                {
                                                    format: 'markdown',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `upload-accessibility-report-${uploadAccessibilityReport.reportDate}.md`
                                        downloadReport(
                                            content,
                                            filename,
                                            'text/markdown'
                                        )
                                    }}
                                />
                                <Button
                                    text="Download JSON"
                                    leadingIcon={<DownloadIcon size={14} />}
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                uploadAccessibilityReport,
                                                {
                                                    format: 'json',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `upload-accessibility-report-${uploadAccessibilityReport.reportDate}.json`
                                        downloadReport(
                                            content,
                                            filename,
                                            'application/json'
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Full Report View */}
                {showFullReport && reportHtmlContent && (
                    <section className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Full Report</h2>
                            <Button
                                text="Close"
                                leadingIcon={<X size={14} />}
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                onClick={() => {
                                    setShowFullReport(false)
                                    setReportHtmlContent(null)
                                }}
                            />
                        </div>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <iframe
                                srcDoc={reportHtmlContent}
                                className="w-full h-[800px] border-0"
                                title="Upload Accessibility Report"
                            />
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
})

UploadAccessibility.displayName = 'UploadAccessibility'

export default UploadAccessibility
