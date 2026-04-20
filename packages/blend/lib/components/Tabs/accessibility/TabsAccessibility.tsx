import { forwardRef, useState } from 'react'
import Tabs from '../Tabs'
import TabsList from '../TabsList'
import TabsTrigger from '../TabsTrigger'
import TabsContent from '../TabsContent'
import { Button, ButtonType, ButtonSize } from '../../Button'
import { tabsAccessibilityReport } from './TabsAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { TabsVariant } from '../types'

export type TabsAccessibilityProps = {
    className?: string
}

const TabsAccessibility = forwardRef<HTMLDivElement, TabsAccessibilityProps>(
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
        const [activeTab, setActiveTab] = useState('tab1')

        const handleDownload = () => {
            try {
                const content = generateAccessibilityReport(
                    tabsAccessibilityReport,
                    {
                        format: selectedFormat,
                        includeTestResults,
                        includeRecommendations,
                    }
                )

                const filename = `tabs-accessibility-report-${tabsAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                    tabsAccessibilityReport,
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

        const report = tabsAccessibilityReport
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
                                    Tabs Accessibility Report
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    WCAG 2.0, 2.1, 2.2 Compliance Analysis -
                                    Level AA
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Report Date: {report.reportDate}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    value={selectedFormat}
                                    onChange={(e) =>
                                        setSelectedFormat(
                                            e.target.value as ReportFormat
                                        )
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="markdown">Markdown</option>
                                    <option value="html">HTML</option>
                                    <option value="json">JSON</option>
                                </select>
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    onClick={handleDownload}
                                    leadingIcon={<DownloadIcon size={16} />}
                                    text="Download Report"
                                />
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    onClick={handleViewReport}
                                    text="View Full Report"
                                />
                            </div>
                        </div>

                        {/* Summary Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="text-2xl font-bold text-green-700">
                                    {compliantCount}
                                </div>
                                <div className="text-sm text-green-600">
                                    Compliant Criteria
                                </div>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="text-2xl font-bold text-red-700">
                                    {nonCompliantCount}
                                </div>
                                <div className="text-sm text-red-600">
                                    Non-Compliant Criteria
                                </div>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="text-2xl font-bold text-yellow-700">
                                    {unsureCount}
                                </div>
                                <div className="text-sm text-yellow-600">
                                    Unsure Criteria
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

                        {/* Overall Status */}
                        <div
                            className={`p-4 rounded-lg border ${
                                report.overallStatus === 'compliant'
                                    ? 'bg-green-50 border-green-200'
                                    : report.overallStatus === 'partial'
                                      ? 'bg-yellow-50 border-yellow-200'
                                      : 'bg-red-50 border-red-200'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                    Overall Status:
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        report.overallStatus === 'compliant'
                                            ? 'bg-green-100 text-green-800'
                                            : report.overallStatus === 'partial'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {report.overallStatus.toUpperCase()}
                                </span>
                                <span className="text-sm text-gray-600">
                                    ({report.conformanceLevel})
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">
                                {report.summary}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2">
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
                                    <span className="text-sm text-gray-700">
                                        Include Test Results
                                    </span>
                                </label>
                                <label className="flex items-center gap-2">
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
                                    <span className="text-sm text-gray-700">
                                        Include Recommendations
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Full Report Viewer */}
                    {showFullReport && reportHtmlContent && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">
                                    Full Accessibility Report
                                </h2>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={() => {
                                        setShowFullReport(false)
                                        setReportHtmlContent(null)
                                    }}
                                    text="Close"
                                />
                            </div>
                            <iframe
                                srcDoc={reportHtmlContent}
                                className="w-full border border-gray-200 rounded-lg"
                                style={{ height: '800px' }}
                                title="Accessibility Report"
                            />
                        </div>
                    )}

                    {/* WCAG Criteria Breakdown */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            WCAG Criteria Breakdown
                        </h2>

                        {/* Level A */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Level A Criteria
                            </h3>
                            <div className="space-y-3">
                                {report.criteria
                                    .filter((c) => c.level === 'A')
                                    .map((criterion) => (
                                        <div
                                            key={criterion.id}
                                            className="bg-white border border-gray-200 rounded-lg p-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-mono text-sm font-semibold text-gray-600">
                                                            {criterion.id}
                                                        </span>
                                                        <span className="font-semibold text-gray-900">
                                                            {criterion.title}
                                                        </span>
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                                criterion.status ===
                                                                'compliant'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : criterion.status ===
                                                                        'non-compliant'
                                                                      ? 'bg-red-100 text-red-800'
                                                                      : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                        >
                                                            {criterion.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {criterion.description}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mb-1">
                                                        <strong>
                                                            Implementation:
                                                        </strong>{' '}
                                                        {
                                                            criterion.implementation
                                                        }
                                                    </p>
                                                    {includeTestResults &&
                                                        criterion.testResults && (
                                                            <p className="text-sm text-gray-700">
                                                                <strong>
                                                                    Test
                                                                    Results:
                                                                </strong>{' '}
                                                                {
                                                                    criterion.testResults
                                                                }
                                                            </p>
                                                        )}
                                                    {criterion.notes && (
                                                        <p className="text-sm text-yellow-700 mt-2 italic">
                                                            <strong>
                                                                Note:
                                                            </strong>{' '}
                                                            {criterion.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Level AA */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Level AA Criteria
                            </h3>
                            <div className="space-y-3">
                                {report.criteria
                                    .filter((c) => c.level === 'AA')
                                    .map((criterion) => (
                                        <div
                                            key={criterion.id}
                                            className="bg-white border border-gray-200 rounded-lg p-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-mono text-sm font-semibold text-gray-600">
                                                            {criterion.id}
                                                        </span>
                                                        <span className="font-semibold text-gray-900">
                                                            {criterion.title}
                                                        </span>
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                                criterion.status ===
                                                                'compliant'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : criterion.status ===
                                                                        'non-compliant'
                                                                      ? 'bg-red-100 text-red-800'
                                                                      : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                        >
                                                            {criterion.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {criterion.description}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mb-1">
                                                        <strong>
                                                            Implementation:
                                                        </strong>{' '}
                                                        {
                                                            criterion.implementation
                                                        }
                                                    </p>
                                                    {includeTestResults &&
                                                        criterion.testResults && (
                                                            <p className="text-sm text-gray-700">
                                                                <strong>
                                                                    Test
                                                                    Results:
                                                                </strong>{' '}
                                                                {
                                                                    criterion.testResults
                                                                }
                                                            </p>
                                                        )}
                                                    {criterion.notes && (
                                                        <p className="text-sm text-yellow-700 mt-2 italic">
                                                            <strong>
                                                                Note:
                                                            </strong>{' '}
                                                            {criterion.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Level AAA */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Level AAA Criteria
                            </h3>
                            <div className="space-y-3">
                                {report.criteria
                                    .filter((c) => c.level === 'AAA')
                                    .map((criterion) => (
                                        <div
                                            key={criterion.id}
                                            className="bg-white border border-gray-200 rounded-lg p-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-mono text-sm font-semibold text-gray-600">
                                                            {criterion.id}
                                                        </span>
                                                        <span className="font-semibold text-gray-900">
                                                            {criterion.title}
                                                        </span>
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                                criterion.status ===
                                                                'compliant'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : criterion.status ===
                                                                        'non-compliant'
                                                                      ? 'bg-red-100 text-red-800'
                                                                      : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                        >
                                                            {criterion.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {criterion.description}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mb-1">
                                                        <strong>
                                                            Implementation:
                                                        </strong>{' '}
                                                        {
                                                            criterion.implementation
                                                        }
                                                    </p>
                                                    {includeTestResults &&
                                                        criterion.testResults && (
                                                            <p className="text-sm text-gray-700">
                                                                <strong>
                                                                    Test
                                                                    Results:
                                                                </strong>{' '}
                                                                {
                                                                    criterion.testResults
                                                                }
                                                            </p>
                                                        )}
                                                    {criterion.notes && (
                                                        <p className="text-sm text-yellow-700 mt-2 italic">
                                                            <strong>
                                                                Note:
                                                            </strong>{' '}
                                                            {criterion.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Strengths and Recommendations */}
                    {includeRecommendations && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-900 mb-4">
                                    Strengths
                                </h3>
                                <ul className="space-y-2">
                                    {report.strengths.map((strength, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-green-800 flex items-start gap-2"
                                        >
                                            <span className="text-green-600 mt-1">
                                                ✓
                                            </span>
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                    Recommendations
                                </h3>
                                <ul className="space-y-2">
                                    {report.recommendations.map(
                                        (recommendation, index) => (
                                            <li
                                                key={index}
                                                className="text-sm text-blue-800 flex items-start gap-2"
                                            >
                                                <span className="text-blue-600 mt-1">
                                                    →
                                                </span>
                                                <span>{recommendation}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Interactive Demo */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Interactive Demo
                        </h2>
                        <div className="space-y-6">
                            {/* Basic Tabs */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Basic Tabs
                                </h3>
                                <Tabs
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                    items={[
                                        {
                                            value: 'tab1',
                                            label: 'Tab 1',
                                            content: (
                                                <div className="p-4">
                                                    Content for Tab 1
                                                </div>
                                            ),
                                        },
                                        {
                                            value: 'tab2',
                                            label: 'Tab 2',
                                            content: (
                                                <div className="p-4">
                                                    Content for Tab 2
                                                </div>
                                            ),
                                        },
                                        {
                                            value: 'tab3',
                                            label: 'Tab 3',
                                            content: (
                                                <div className="p-4">
                                                    Content for Tab 3
                                                </div>
                                            ),
                                        },
                                    ]}
                                />
                            </div>

                            {/* Tabs with Close Button */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Tabs with Close Button
                                </h3>
                                <Tabs
                                    defaultValue="tab1"
                                    items={[
                                        {
                                            value: 'tab1',
                                            label: 'Closable Tab 1',
                                            content: (
                                                <div className="p-4">
                                                    This tab can be closed
                                                </div>
                                            ),
                                            newItem: true,
                                        },
                                        {
                                            value: 'tab2',
                                            label: 'Closable Tab 2',
                                            content: (
                                                <div className="p-4">
                                                    This tab can also be closed
                                                </div>
                                            ),
                                            newItem: true,
                                        },
                                    ]}
                                    onTabClose={(value) => {
                                        console.log('Tab closed:', value)
                                    }}
                                />
                            </div>

                            {/* Different Variants */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Different Variants
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Underline Variant
                                        </p>
                                        <Tabs
                                            defaultValue="tab1"
                                            items={[
                                                {
                                                    value: 'tab1',
                                                    label: 'Tab 1',
                                                    content: (
                                                        <div className="p-4">
                                                            Underline variant
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        >
                                            <TabsList
                                                variant={TabsVariant.UNDERLINE}
                                            >
                                                <TabsTrigger value="tab1">
                                                    Tab 1
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="tab1">
                                                Content
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Boxed Variant
                                        </p>
                                        <Tabs
                                            defaultValue="tab1"
                                            items={[
                                                {
                                                    value: 'tab1',
                                                    label: 'Tab 1',
                                                    content: (
                                                        <div className="p-4">
                                                            Boxed variant
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        >
                                            <TabsList
                                                variant={TabsVariant.BOXED}
                                            >
                                                <TabsTrigger value="tab1">
                                                    Tab 1
                                                </TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="tab1">
                                                Content
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>

                            {/* Disabled Tab */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Disabled Tab
                                </h3>
                                <Tabs
                                    defaultValue="tab1"
                                    items={[
                                        {
                                            value: 'tab1',
                                            label: 'Enabled Tab',
                                            content: (
                                                <div className="p-4">
                                                    This tab is enabled
                                                </div>
                                            ),
                                        },
                                        {
                                            value: 'tab2',
                                            label: 'Disabled Tab',
                                            content: (
                                                <div className="p-4">
                                                    This tab is disabled
                                                </div>
                                            ),
                                            disable: true,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

TabsAccessibility.displayName = 'TabsAccessibility'

export default TabsAccessibility
