import { forwardRef, useState } from 'react'
import { Switch } from '../index'
import { switchAccessibilityReport } from './SwitchAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon, Check } from 'lucide-react'
import Button from '../../Button/Button'
import { ButtonSize } from '../../Button/types'

export interface SwitchAccessibilityProps {
    className?: string
}

const SwitchAccessibility = forwardRef<
    HTMLDivElement,
    SwitchAccessibilityProps
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
        checked: false,
        required: false,
        error: false,
    })

    const handleDownload = () => {
        try {
            const content = generateAccessibilityReport(
                switchAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `switch-accessibility-report-${switchAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                switchAccessibilityReport,
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

    const report = switchAccessibilityReport
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
                                Switch Accessibility Report
                            </h1>
                            <p className="text-gray-600 mt-2">
                                WCAG 2.1 Level AA Compliance Analysis
                            </p>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-700">
                                {compliantCount}
                            </div>
                            <div className="text-sm text-green-600">
                                Compliant
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-red-700">
                                {nonCompliantCount}
                            </div>
                            <div className="text-sm text-red-600">
                                Non-Compliant
                            </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-yellow-700">
                                {unsureCount}
                            </div>
                            <div className="text-sm text-yellow-600">
                                Requires Verification
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-700">
                                {complianceRate}%
                            </div>
                            <div className="text-sm text-blue-600">
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
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                switchAccessibilityReport,
                                                {
                                                    format: 'html',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `switch-accessibility-report-${switchAccessibilityReport.reportDate}.html`
                                        downloadReport(
                                            content,
                                            filename,
                                            'text/html'
                                        )
                                    }}
                                />
                                <Button
                                    text="Download Markdown"
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                switchAccessibilityReport,
                                                {
                                                    format: 'markdown',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `switch-accessibility-report-${switchAccessibilityReport.reportDate}.md`
                                        downloadReport(
                                            content,
                                            filename,
                                            'text/markdown'
                                        )
                                    }}
                                />
                                <Button
                                    text="Download JSON"
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        const content =
                                            generateAccessibilityReport(
                                                switchAccessibilityReport,
                                                {
                                                    format: 'json',
                                                    includeTestResults,
                                                    includeRecommendations,
                                                }
                                            )
                                        const filename = `switch-accessibility-report-${switchAccessibilityReport.reportDate}.json`
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
                            This demo showcases WCAG 2.1 Level AA compliance
                            features. Use keyboard navigation (Tab, Space,
                            Enter) and screen readers to experience
                            accessibility features.
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
                                    Switch controls with proper label
                                    association
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Switch
                                        checked={demoStates.checked}
                                        onChange={(checked) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                checked,
                                            }))
                                        }
                                        label="Enable dark mode"
                                    />
                                    <Switch
                                        checked={false}
                                        onChange={() => {}}
                                        label="Enable notifications"
                                        subtext="This switch demonstrates proper label association"
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
                                    All functionality available via keyboard
                                    (Tab, Space, Enter)
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Switch
                                        checked={false}
                                        onChange={() => {}}
                                        label="Tab to focus me, then press Space or Enter"
                                    />
                                    <Switch
                                        checked={false}
                                        onChange={() => {}}
                                        label="Keyboard navigation works"
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    2.4.7 Focus Visible (Level AA)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Visible focus indicators
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Switch
                                        checked={false}
                                        onChange={() => {}}
                                        label="Focus me with Tab"
                                    />
                                    <Switch
                                        checked={false}
                                        onChange={() => {}}
                                        label="Then this one"
                                    />
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
                                    3.3.2 Labels or Instructions (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Clear labels and instructions
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Switch
                                        checked={false}
                                        onChange={() => {}}
                                        label="Enable auto-save"
                                        subtext="Automatically save your work every 5 minutes"
                                    />
                                    <Switch
                                        required={demoStates.required}
                                        checked={false}
                                        onChange={(checked) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                required: checked,
                                            }))
                                        }
                                        label="Required field (indicated with asterisk)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WCAG Principle 4: Robust */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">4. Robust</h3>

                        <div className="border-l-4 border-red-500 pl-6 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">
                                    4.1.2 Name, Role, Value (Level A)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Switch state with aria-checked attribute
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Switch
                                        checked={demoStates.checked}
                                        onChange={(checked) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                checked,
                                            }))
                                        }
                                        label="Checked state (aria-checked='true')"
                                    />
                                    <Switch
                                        checked={false}
                                        onChange={() => {}}
                                        label="Unchecked state (aria-checked='false')"
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold">
                                    4.1.3 Status Messages (Level AA)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Error state and required field indicators
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Switch
                                        required={demoStates.required}
                                        checked={false}
                                        onChange={(checked) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                required: checked,
                                            }))
                                        }
                                        label="Required field (indicated with asterisk)"
                                    />
                                    <Switch
                                        error={demoStates.error}
                                        checked={false}
                                        onChange={(checked) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                error: checked,
                                            }))
                                        }
                                        subtext="This field has an error"
                                        label="Error state switch"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
                                Latest updates
                            </p>
                            <ul className="text-xs text-purple-700 space-y-1">
                                {report.wcagVersions['2.2'].map((item, idx) => (
                                    <li key={idx}>• {item}</li>
                                ))}
                            </ul>
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
                                Level A Criteria (15 evaluated)
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
                                Level AA Criteria (8 evaluated)
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
                                Level AAA Criteria (9 evaluated)
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Highest level of accessibility (partial
                                compliance).
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

                {/* Strengths & Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <section className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600" />
                            Strengths
                        </h2>
                        <ul className="space-y-2">
                            {report.strengths.map((strength, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-gray-700"
                                >
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Recommendations
                        </h2>
                        <ul className="space-y-2">
                            {report.recommendations.map((rec, idx) => (
                                <li
                                    key={idx}
                                    className="text-sm text-gray-700 list-disc list-inside"
                                >
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Test Methodology */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Testing Methodology & Verification
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Automated Testing
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                {report.testMethodology.automated.map(
                                    (item, idx) => (
                                        <li key={idx}>{item}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Manual Testing (REQUIRED)
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                {report.testMethodology.manual.map(
                                    (item, idx) => (
                                        <li key={idx}>{item}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Verification Tools
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                {report.testMethodology.verificationTools.map(
                                    (tool, idx) => (
                                        <li key={idx}>{tool}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Touch Target Size Verification */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        Touch Target Size Verification
                    </h2>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-700">
                            WCAG 2.5.5 Target Size (Level AAA) requires a
                            minimum interactive target area of 44×44px. The
                            switch component has padding: 0px, so the
                            interactive area equals the visible size.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-900 mb-2">
                                How to Verify Touch Target Size:
                            </h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
                                <li>
                                    Open browser DevTools (F12 or Right-click →
                                    Inspect)
                                </li>
                                <li>
                                    Select the switch element in the Elements
                                    panel
                                </li>
                                <li>
                                    Check the Computed styles for width and
                                    height
                                </li>
                                <li>
                                    Verify that the total interactive area
                                    (including padding) meets 44×44px for AAA
                                    compliance
                                </li>
                                <li>
                                    Note: Small (18px at sm, 12px at lg) and
                                    Medium (20px at sm, 16px at lg) switches do
                                    not meet AAA requirement
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

SwitchAccessibility.displayName = 'SwitchAccessibility'

export default SwitchAccessibility
