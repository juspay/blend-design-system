import { forwardRef, useState } from 'react'
import { Radio, RadioGroup, RadioSize } from '../index'
import { radioAccessibilityReport } from './RadioAccessibilityReport'
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

export interface RadioAccessibilityProps {
    className?: string
}

const RadioAccessibility = forwardRef<HTMLDivElement, RadioAccessibilityProps>(
    ({ className }, ref) => {
        const [selectedFormat, setSelectedFormat] =
            useState<ReportFormat>('markdown')
        const [includeTestResults, setIncludeTestResults] = useState(true)
        const [includeRecommendations, setIncludeRecommendations] =
            useState(true)
        const [reportHtmlContent, setReportHtmlContent] = useState<
            string | null
        >(null)
        const [showFullReport, setShowFullReport] = useState(false)
        const [demoStates, setDemoStates] = useState({
            selectedValue: 'option1',
            required: false,
            error: false,
        })

        const handleDownload = () => {
            try {
                const content = generateAccessibilityReport(
                    radioAccessibilityReport,
                    {
                        format: selectedFormat,
                        includeTestResults,
                        includeRecommendations,
                    }
                )

                const filename = `radio-accessibility-report-${radioAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                    radioAccessibilityReport,
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

        const report = radioAccessibilityReport
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
                                    Radio Component Accessibility
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

                        {/* Unsure Items Warning */}
                        {unsureCount > 0 && (
                            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">⚠️</span>
                                    <div>
                                        <h3 className="font-semibold text-orange-900 mb-1">
                                            Manual Verification Required
                                        </h3>
                                        <p className="text-orange-800 text-sm">
                                            {unsureCount} criterion/criteria
                                            marked as "unsure" require manual
                                            verification. These items need
                                            testing with contrast checkers,
                                            screen readers, or depend on
                                            application context. See
                                            verification instructions below.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                                    setSelectedFormat(
                                                        'markdown'
                                                    )
                                                }
                                                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                                                    selectedFormat ===
                                                    'markdown'
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
                                            leadingIcon={
                                                <DownloadIcon size={14} />
                                            }
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
                                        size={ButtonSize.SMALL}
                                        onClick={() => {
                                            const content =
                                                generateAccessibilityReport(
                                                    radioAccessibilityReport,
                                                    {
                                                        format: 'html',
                                                        includeTestResults,
                                                        includeRecommendations,
                                                    }
                                                )
                                            const filename = `radio-accessibility-report-${radioAccessibilityReport.reportDate}.html`
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
                                                    radioAccessibilityReport,
                                                    {
                                                        format: 'markdown',
                                                        includeTestResults,
                                                        includeRecommendations,
                                                    }
                                                )
                                            const filename = `radio-accessibility-report-${radioAccessibilityReport.reportDate}.md`
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
                                                    radioAccessibilityReport,
                                                    {
                                                        format: 'json',
                                                        includeTestResults,
                                                        includeRecommendations,
                                                    }
                                                )
                                            const filename = `radio-accessibility-report-${radioAccessibilityReport.reportDate}.json`
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
                                features. Use keyboard navigation (Tab, Arrow
                                keys, Space) and screen readers to experience
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
                                        Radio indicators with proper label
                                        association
                                    </p>
                                    <RadioGroup
                                        name="demo-perceivable"
                                        label="Select an option"
                                        value={demoStates.selectedValue}
                                        onChange={(value) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                selectedValue: value,
                                            }))
                                        }
                                    >
                                        <Radio value="option1">Option 1</Radio>
                                        <Radio
                                            value="option2"
                                            subtext="This radio demonstrates proper label association"
                                        >
                                            Option 2 with subtext
                                        </Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        {/* WCAG Principle 2: Operable */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">
                                2. Operable
                            </h3>

                            <div className="border-l-4 border-green-500 pl-6 space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold">
                                        2.1.1 Keyboard (Level A)
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        All functionality available via keyboard
                                        (Tab, Arrow keys, Space, Enter)
                                    </p>
                                    <RadioGroup
                                        name="demo-operable"
                                        label="Keyboard Navigation Demo"
                                        value={demoStates.selectedValue}
                                        onChange={(value) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                selectedValue: value,
                                            }))
                                        }
                                    >
                                        <Radio value="option1">
                                            Tab to focus me, then use Arrow keys
                                        </Radio>
                                        <Radio value="option2">
                                            Arrow keys navigate between radios
                                        </Radio>
                                        <Radio value="option3">
                                            Space or Enter to select
                                        </Radio>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">
                                        2.4.7 Focus Visible (Level AA)
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Visible focus indicators
                                    </p>
                                    <RadioGroup
                                        name="demo-focus"
                                        label="Focus Indicator Demo"
                                        value={demoStates.selectedValue}
                                        onChange={(value) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                selectedValue: value,
                                            }))
                                        }
                                    >
                                        <Radio value="option1">
                                            Focus me with Tab
                                        </Radio>
                                        <Radio value="option2">
                                            Then this one
                                        </Radio>
                                    </RadioGroup>
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
                                        Radio state with native checked property
                                    </p>
                                    <RadioGroup
                                        name="demo-robust"
                                        label="State Demo"
                                        value={demoStates.selectedValue}
                                        onChange={(value) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                selectedValue: value,
                                            }))
                                        }
                                    >
                                        <Radio value="option1">
                                            Checked state (native checked
                                            property)
                                        </Radio>
                                        <Radio value="option2">
                                            Unchecked state
                                        </Radio>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">
                                        4.1.3 Status Messages (Level AA)
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Error state and required field
                                        indicators
                                    </p>
                                    <RadioGroup
                                        name="demo-status"
                                        label="Status Messages Demo"
                                        value={demoStates.selectedValue}
                                        onChange={(value) =>
                                            setDemoStates((prev) => ({
                                                ...prev,
                                                selectedValue: value,
                                            }))
                                        }
                                        required={demoStates.required}
                                        error={demoStates.error}
                                    >
                                        <Radio value="option1">
                                            Required field (indicated with
                                            asterisk)
                                        </Radio>
                                        <Radio
                                            value="option2"
                                            subtext="This field has an error"
                                        >
                                            Error state radio
                                        </Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
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
                                    {report.wcagVersions['2.0'].map(
                                        (item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        )
                                    )}
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
                                    {report.wcagVersions['2.1'].map(
                                        (item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        )
                                    )}
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
                                    {report.wcagVersions['2.2'].map(
                                        (item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        )
                                    )}
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
                                    Minimum requirements for basic
                                    accessibility.
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
                                    Enhanced accessibility requirements.
                                    Currently partially compliant - see issues
                                    below.
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
                                    <p className="text-xs text-purple-700 mt-2 italic">
                                        Note: Level AAA is not required for
                                        Level AA conformance. To achieve full
                                        AAA compliance, see recommendations
                                        section for required changes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testing Methodology */}
                    <section className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Testing Methodology & Verification
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    Automated Testing
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                        {report.testMethodology.automated.map(
                                            (test, index) => (
                                                <li key={index}>{test}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-blue-600">✓</span>
                                    Manual Testing
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                        {report.testMethodology.manual.map(
                                            (test, index) => (
                                                <li key={index}>{test}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-purple-600">🔧</span>
                                    Verification Tools
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                        {report.testMethodology.verificationTools.map(
                                            (tool, index) => (
                                                <li key={index}>{tool}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Verification Instructions */}
                    <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">
                            How to Verify Compliance
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    1. Color Contrast Verification (1.4.3,
                                    1.4.11)
                                </h3>
                                <ol className="list-decimal list-inside space-y-1 text-blue-800 ml-2">
                                    <li>
                                        Open WebAIM Contrast Checker:
                                        https://webaim.org/resources/contrastchecker/
                                    </li>
                                    <li>
                                        Test each radio state:
                                        <ul className="list-disc list-inside ml-4 mt-1">
                                            <li>
                                                Label text: #2B303B on #FFFFFF
                                                (should be ≥4.5:1)
                                            </li>
                                            <li>
                                                Subtext: #99A0AE on #FFFFFF
                                                (should be ≥4.5:1)
                                            </li>
                                            <li>
                                                Radio indicator dot: #2B7FFF
                                                (should be ≥4.5:1)
                                            </li>
                                            <li>
                                                Disabled states: Verify lighter
                                                colors meet 4.5:1
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Test focus indicators: Outline colors
                                        against radio backgrounds (should be
                                        ≥3:1)
                                    </li>
                                    <li>
                                        Document results and update report
                                        status
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    2. Keyboard Navigation Verification (2.1.1,
                                    2.4.7)
                                </h3>
                                <ol className="list-decimal list-inside space-y-1 text-blue-800 ml-2">
                                    <li>
                                        Navigate to page with radios using only
                                        keyboard (Tab key)
                                    </li>
                                    <li>
                                        Verify all radios receive focus in
                                        logical order
                                    </li>
                                    <li>
                                        Verify disabled radios are skipped in
                                        tab order
                                    </li>
                                    <li>
                                        Press Arrow keys (Up/Down/Left/Right)
                                        within RadioGroup - verify navigation
                                    </li>
                                    <li>
                                        Press Space or Enter on focused radio -
                                        verify selection
                                    </li>
                                    <li>
                                        Verify focus indicator is clearly
                                        visible (outline with offset)
                                    </li>
                                    <li>
                                        Test Shift+Tab for reverse navigation
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    3. Screen Reader Verification (4.1.2, 4.1.3)
                                </h3>
                                <ol className="list-decimal list-inside space-y-1 text-blue-800 ml-2">
                                    <li>
                                        Enable screen reader
                                        (NVDA/JAWS/VoiceOver)
                                    </li>
                                    <li>
                                        Navigate to radios using screen reader
                                        navigation
                                    </li>
                                    <li>
                                        Verify radios announce: "Radio name,
                                        radio, unchecked" or "checked"
                                    </li>
                                    <li>
                                        Verify RadioGroup announces group label
                                        and number of options
                                    </li>
                                    <li>
                                        Verify required radios announce required
                                        state
                                    </li>
                                    <li>
                                        Verify error state announces error
                                        information
                                    </li>
                                    <li>
                                        Verify subtext is announced via
                                        aria-describedby
                                    </li>
                                    <li>Verify clicking label selects radio</li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    4. Touch Target Size Verification (WCAG
                                    2.5.5 AAA, 2.5.8 AA)
                                </h3>
                                <p className="text-sm text-blue-800 mb-2">
                                    <strong>How to Test:</strong> Use browser
                                    DevTools to measure the clickable area
                                    (including padding).
                                </p>
                                <ol className="list-decimal list-inside space-y-1 text-blue-800 ml-2">
                                    <li>
                                        <strong>Open Browser DevTools</strong>{' '}
                                        (F12 or Right-click → Inspect)
                                    </li>
                                    <li>
                                        <strong>
                                            Select the radio element
                                        </strong>{' '}
                                        in the Elements panel
                                    </li>
                                    <li>
                                        <strong>Check Computed Styles:</strong>{' '}
                                        Look for padding-top, padding-bottom,
                                        padding-left, padding-right
                                    </li>
                                    <li>
                                        <strong>
                                            Calculate Clickable Area:
                                        </strong>
                                        <ul className="list-disc list-inside ml-4 mt-1">
                                            <li>
                                                Clickable Height = element
                                                height + padding-top +
                                                padding-bottom
                                            </li>
                                            <li>
                                                Clickable Width = element width
                                                + padding-left + padding-right
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Verify Requirements:</strong>
                                        <ul className="list-disc list-inside ml-4 mt-1">
                                            <li>
                                                Level AA (WCAG 2.5.8): Minimum
                                                24x24px
                                            </li>
                                            <li>
                                                Level AAA (WCAG 2.5.5): Minimum
                                                44x44px
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>
                                            Alternative Method - Console:
                                        </strong>
                                        <pre className="bg-blue-100 p-2 rounded mt-2 text-xs overflow-x-auto">
                                            {`const radio = document.querySelector('input[type="radio"]');
const styles = window.getComputedStyle(radio);
const rect = radio.getBoundingClientRect();
const clickableHeight = rect.height + 
  parseFloat(styles.paddingTop) + 
  parseFloat(styles.paddingBottom);
console.log('Clickable Height:', clickableHeight);
// Should be ≥44px for AAA, ≥24px for AA`}
                                        </pre>
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    5. Automated Testing with axe-core
                                </h3>
                                <ol className="list-decimal list-inside space-y-1 text-blue-800 ml-2">
                                    <li>
                                        Run: npm test
                                        Radio.accessibility.test.tsx
                                    </li>
                                    <li>Review axe-core violations</li>
                                    <li>
                                        Verify all rules pass: radio-name,
                                        keyboard-navigation,
                                        aria-required-attributes
                                    </li>
                                    <li>
                                        Check color-contrast warnings (may
                                        require manual verification)
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Testing Checklist */}
                    <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Accessibility Testing Checklist
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Keyboard Navigation:</strong> All
                                    radios reachable and activatable with
                                    keyboard (Tab, Arrow keys, Space, Enter)
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Screen Reader:</strong> Radios
                                    announced with accessible name, role, and
                                    state
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Label Association:</strong> Labels
                                    properly associated with radios (htmlFor/id)
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>RadioGroup:</strong> Proper
                                    radiogroup role with keyboard navigation
                                    (Arrow keys)
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Focus Indicators:</strong> Clear,
                                    visible focus outline (VERIFY: contrast
                                    ratio ≥3:1)
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Color Contrast:</strong> Text meets
                                    WCAG AA standards (VERIFY: ≥4.5:1 for normal
                                    text)
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Touch Targets:</strong> Small
                                    (16px at sm, 14px at lg) and Medium (20px at
                                    sm, 16px at lg) do not meet Level AAA
                                    (44x44px minimum). Radio has padding: 0px,
                                    so interactive area equals visible size.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Required State:</strong> Indicated
                                    with asterisk and aria-required="true"
                                    attribute
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Error State:</strong> Communicated
                                    via aria-invalid="true" attribute (WCAG
                                    4.1.3) and visual styling (red border and
                                    label color)
                                </span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Disabled State:</strong> Removed
                                    from tab order and clearly indicated
                                </span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        )
    }
)

RadioAccessibility.displayName = 'RadioAccessibility'

export default RadioAccessibility
