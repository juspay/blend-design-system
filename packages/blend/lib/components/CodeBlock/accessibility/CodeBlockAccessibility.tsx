import { forwardRef, useState } from 'react'
import CodeBlock from '../CodeBlock'
import { CodeBlockVariant, DiffLineType } from '../types'
import { codeBlockAccessibilityReport } from './CodeBlockAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { Button, ButtonType, ButtonSize } from '../../Button'

export type CodeBlockAccessibilityProps = {
    className?: string
}

const CodeBlockAccessibility = forwardRef<
    HTMLDivElement,
    CodeBlockAccessibilityProps
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
                codeBlockAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `codeblock-accessibility-report-${codeBlockAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                codeBlockAccessibilityReport,
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

    const report = codeBlockAccessibilityReport
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
                                CodeBlock Component Accessibility
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
                                    Basic CodeBlock
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    <CodeBlock
                                        code={`function greet(name) {
    console.log("Hello, " + name + "!");
}`}
                                        header="example.js"
                                        showLineNumbers
                                        showCopyButton
                                        language="javascript"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Basic code block with line numbers, header,
                                    and copy button. All interactive elements
                                    are keyboard accessible.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    CodeBlock without Line Numbers
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    <CodeBlock
                                        code={`const x = 10;
const y = 20;
const sum = x + y;`}
                                        header="math.js"
                                        showLineNumbers={false}
                                        showCopyButton
                                        language="javascript"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Code block without line numbers. Line number
                                    gutters are hidden from screen readers with
                                    aria-hidden="true".
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    CodeBlock without Header
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    <CodeBlock
                                        code={`{
  "name": "example",
  "version": "1.0.0"
}`}
                                        showHeader={false}
                                        showCopyButton
                                        language="json"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Code block without header. The main region
                                    has aria-label describing the code block.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    Diff View
                                </h3>
                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    <CodeBlock
                                        code=""
                                        variant={CodeBlockVariant.DIFF}
                                        diffLines={[
                                            {
                                                content: 'const old = 1;',
                                                type: DiffLineType.REMOVED,
                                            },
                                            {
                                                content: 'const new = 2;',
                                                type: DiffLineType.ADDED,
                                            },
                                            {
                                                content: 'const unchanged = 3;',
                                                type: DiffLineType.UNCHANGED,
                                            },
                                        ]}
                                        header="version.diff"
                                        showLineNumbers
                                        showCopyButton
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Diff view showing removed, added, and
                                    unchanged lines. Each side has proper
                                    role="group" with aria-label.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-3">
                                    Multiple Languages
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">
                                            TypeScript
                                        </h4>
                                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                                            <CodeBlock
                                                code={`interface User {
  name: string;
  age: number;
}`}
                                                header="types.ts"
                                                language="typescript"
                                                showLineNumbers
                                                showCopyButton
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">
                                            Python
                                        </h4>
                                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                                            <CodeBlock
                                                code={`def greet(name):
    print(f"Hello, {name}!")`}
                                                header="main.py"
                                                language="python"
                                                showLineNumbers
                                                showCopyButton
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Code blocks support syntax highlighting for
                                    various programming languages. All variants
                                    maintain accessibility standards.
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
                                <strong>Copy Button:</strong>
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                                    <li>
                                        <strong>Tab</strong>: Navigate to copy
                                        button
                                    </li>
                                    <li>
                                        <strong>Enter/Space</strong>: Copy code
                                        to clipboard
                                    </li>
                                    <li>
                                        <strong>Tab</strong>: Move focus away
                                        from code block
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <strong>Code Content:</strong>
                                <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-gray-700">
                                    <li>
                                        <strong>Tab</strong>: Focus code content
                                        for scrolling and selection
                                    </li>
                                    <li>
                                        <strong>Arrow Keys</strong>: Navigate
                                        through code content
                                    </li>
                                    <li>
                                        <strong>Mouse</strong>: Select and copy
                                        code text
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

CodeBlockAccessibility.displayName = 'CodeBlockAccessibility'

export default CodeBlockAccessibility
