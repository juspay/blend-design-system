import { forwardRef, useState, useMemo } from 'react'
import type { AccessibilityReport } from '../../Button/accessibility/ButtonAccessibilityReport'
import { buttonAccessibilityReport } from '../../Button/accessibility/ButtonAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from './reportGenerator'
import { Download } from 'lucide-react'
import { Button, ButtonType, ButtonSize } from '../../Button'
import { SingleSelect } from '../../SingleSelect'
import { SelectMenuVariant, SelectMenuAlignment } from '../../SingleSelect'
import { FOUNDATION_THEME } from '../../../tokens'

export interface ComponentAccessibilityInfo {
    name: string
    displayName: string
    report: AccessibilityReport
    testFile?: string
    storybookFile?: string
}

// Component registry - import all accessibility components here
const componentRegistry: ComponentAccessibilityInfo[] = [
    {
        name: 'Button',
        displayName: 'Button',
        report: buttonAccessibilityReport,
        testFile:
            'packages/blend/__tests__/components/Button/Button.accessibility.test.tsx',
        storybookFile:
            'apps/storybook/stories/components/Button/Button.stories.tsx',
    },
    // Add more components here as they are added
    // Example:
    // {
    //     name: 'Input',
    //     displayName: 'Text Input',
    //     report: inputAccessibilityReport, // Import from Input/accessibility/
    //     testFile: 'packages/blend/__tests__/components/Input/Input.accessibility.test.tsx',
    //     storybookFile: 'apps/storybook/stories/components/Input/Input.stories.tsx',
    // },
]

export interface AccessibilityDashboardProps {
    report?: AccessibilityReport
    className?: string
    defaultComponent?: string
    showComponentSelector?: boolean
}

const AccessibilityDashboard = forwardRef<
    HTMLDivElement,
    AccessibilityDashboardProps
>(
    (
        {
            report: providedReport,
            className,
            defaultComponent = 'Button',
            showComponentSelector = true,
        },
        ref
    ) => {
        const [selectedComponent, setSelectedComponent] =
            useState<string>(defaultComponent)
        const [selectedFormat, setSelectedFormat] =
            useState<ReportFormat>('markdown')
        const [includeTestResults, setIncludeTestResults] = useState(true)
        const [includeRecommendations, setIncludeRecommendations] =
            useState(true)

        // Use provided report or get from registry
        const selectedComponentInfo = useMemo(() => {
            if (providedReport) {
                return null // Using provided report directly
            }
            return (
                componentRegistry.find((c) => c.name === selectedComponent) ||
                componentRegistry[0]
            )
        }, [providedReport, selectedComponent])

        const report = useMemo(() => {
            return providedReport || selectedComponentInfo?.report
        }, [providedReport, selectedComponentInfo])

        const componentOptions = useMemo(() => {
            return componentRegistry.map((component) => ({
                value: component.name,
                label: component.displayName,
            }))
        }, [])

        if (!report) {
            return (
                <div ref={ref} className={className}>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                        <p className="text-yellow-800 font-semibold mb-2">
                            No accessibility report available
                        </p>
                        <p className="text-yellow-700 text-sm">
                            Please select a component with an accessibility
                            report.
                        </p>
                    </div>
                </div>
            )
        }

        const handleDownload = () => {
            try {
                const content = generateAccessibilityReport(report, {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                })

                const filename = `${report.componentName.toLowerCase()}-accessibility-report-${report.reportDate}.${getFileExtension(selectedFormat)}`
                const mimeType = getMimeType(selectedFormat)

                downloadReport(content, filename, mimeType)
            } catch (error) {
                console.error('Error generating report:', error)
                alert('Failed to generate report. Please try again.')
            }
        }

        const statusColors: Record<
            AccessibilityReport['overallStatus'] | 'not-applicable',
            string
        > = {
            compliant: String(FOUNDATION_THEME.colors.green[600] ?? '#10b981'),
            'non-compliant': String(
                FOUNDATION_THEME.colors.red[600] ?? '#ef4444'
            ),
            unsure: String(FOUNDATION_THEME.colors.orange[600] ?? '#f59e0b'),
            partial: String(FOUNDATION_THEME.colors.primary[600] ?? '#3b82f6'),
            'not-applicable': String(
                FOUNDATION_THEME.colors.gray[400] ?? '#6b7280'
            ),
        }

        const statusEmoji = {
            compliant: '✅',
            'non-compliant': '❌',
            unsure: '⚠️',
            'not-applicable': '➖',
        }

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
        const totalApplicable = report.criteria.length - notApplicableCount
        const complianceRate =
            totalApplicable > 0
                ? Math.round((compliantCount / totalApplicable) * 100)
                : 0

        const criteriaByLevel = {
            A: report.criteria.filter((c) => c.level === 'A'),
            AA: report.criteria.filter((c) => c.level === 'AA'),
            AAA: report.criteria.filter((c) => c.level === 'AAA'),
        }

        return (
            <div ref={ref} className={className}>
                <div className="space-y-8">
                    {/* Component Selector (if enabled and no report provided) */}
                    {showComponentSelector && !providedReport && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    Component Accessibility
                                </h2>
                                {componentRegistry.length > 1 && (
                                    <div className="w-64">
                                        <SingleSelect
                                            placeholder="Select Component"
                                            variant={
                                                SelectMenuVariant.NO_CONTAINER
                                            }
                                            alignment={SelectMenuAlignment.END}
                                            selected={selectedComponent}
                                            onSelect={(value) =>
                                                setSelectedComponent(value)
                                            }
                                            items={[
                                                {
                                                    items: componentOptions,
                                                },
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">
                                {report.componentName} Accessibility Report
                            </h1>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>WCAG {report.wcagVersion}</span>
                                <span>•</span>
                                <span>{report.conformanceLevel}</span>
                                <span>•</span>
                                <span>{report.reportDate}</span>
                            </div>
                        </div>
                        <div
                            className="px-3 py-1.5 rounded-md font-semibold text-sm text-white"
                            style={{
                                backgroundColor:
                                    statusColors[report.overallStatus],
                            }}
                        >
                            {report.overallStatus.toUpperCase()}
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div
                                className="text-2xl font-bold mb-1"
                                style={{ color: statusColors.compliant }}
                            >
                                {compliantCount}
                            </div>
                            <div className="text-xs text-gray-600">
                                Compliant
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div
                                className="text-2xl font-bold mb-1"
                                style={{ color: statusColors['non-compliant'] }}
                            >
                                {nonCompliantCount}
                            </div>
                            <div className="text-xs text-gray-600">
                                Non-Compliant
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div
                                className="text-2xl font-bold mb-1"
                                style={{ color: statusColors.unsure }}
                            >
                                {unsureCount}
                            </div>
                            <div className="text-xs text-gray-600">Unsure</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-2xl font-bold mb-1">
                                {complianceRate}%
                            </div>
                            <div className="text-xs text-gray-600">
                                Compliance
                            </div>
                        </div>
                    </div>

                    {/* Executive Summary & Download */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Executive Summary */}
                        <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h2 className="text-lg font-semibold mb-2">
                                Summary
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {report.summary}
                            </p>
                        </div>

                        {/* Download Report */}
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
                                <Button
                                    text="Download"
                                    leadingIcon={<Download size={14} />}
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.SMALL}
                                    onClick={handleDownload}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </div>

                    {/* WCAG Criteria */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                WCAG Success Criteria
                            </h2>
                            <span className="text-sm text-gray-500">
                                {report.criteria.length} total criteria
                            </span>
                        </div>

                        {Object.entries(criteriaByLevel).map(
                            ([level, criteria]) => {
                                if (criteria.length === 0) return null

                                return (
                                    <div key={level} className="space-y-2">
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                            Level {level} ({criteria.length})
                                        </h3>
                                        <div className="space-y-2">
                                            {criteria.map((criterion) => (
                                                <div
                                                    key={criterion.id}
                                                    className="bg-white border-l-2 rounded p-3 border shadow-sm hover:shadow-md transition-shadow"
                                                    style={{
                                                        borderLeftColor:
                                                            statusColors[
                                                                criterion.status
                                                            ],
                                                    }}
                                                >
                                                    <div className="flex items-start gap-2 mb-1">
                                                        <span className="text-lg">
                                                            {
                                                                statusEmoji[
                                                                    criterion
                                                                        .status
                                                                ]
                                                            }
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <h4 className="text-sm font-semibold">
                                                                    {
                                                                        criterion.id
                                                                    }{' '}
                                                                    {
                                                                        criterion.title
                                                                    }
                                                                </h4>
                                                                <span
                                                                    className="px-1.5 py-0.5 rounded text-xs font-medium text-white"
                                                                    style={{
                                                                        backgroundColor:
                                                                            statusColors[
                                                                                criterion
                                                                                    .status
                                                                            ],
                                                                    }}
                                                                >
                                                                    {criterion.status.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 mt-1">
                                                                {
                                                                    criterion.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>

                    {/* Additional Info - Collapsible */}
                    <details className="bg-white border border-gray-200 rounded-lg">
                        <summary className="px-4 py-3 cursor-pointer font-semibold text-sm hover:bg-gray-50">
                            View Details
                        </summary>
                        <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
                            {/* Strengths */}
                            {report.strengths.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold mb-2 text-gray-700">
                                        Strengths
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                                        {report.strengths.map(
                                            (strength, index) => (
                                                <li key={index}>{strength}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Recommendations */}
                            {includeRecommendations &&
                                report.recommendations.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2 text-gray-700">
                                            Recommendations
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                                            {report.recommendations.map(
                                                (rec, index) => (
                                                    <li key={index}>{rec}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}

                            {/* Test Methodology */}
                            <div>
                                <h3 className="text-sm font-semibold mb-2 text-gray-700">
                                    Test Methodology
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
                                    <div>
                                        <p className="font-medium mb-1">
                                            Automated:
                                        </p>
                                        <ul className="list-disc list-inside space-y-0.5">
                                            {report.testMethodology.automated.map(
                                                (test, index) => (
                                                    <li key={index}>{test}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">
                                            Manual:
                                        </p>
                                        <ul className="list-disc list-inside space-y-0.5">
                                            {report.testMethodology.manual.map(
                                                (test, index) => (
                                                    <li key={index}>{test}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </details>

                    {/* Warning for Unsure Items */}
                    {unsureCount > 0 && (
                        <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <h3 className="font-semibold text-orange-900 mb-1">
                                        Manual Verification Required
                                    </h3>
                                    <p className="text-orange-800 text-sm">
                                        {unsureCount} criterion/criteria marked
                                        as "unsure" require manual verification
                                        in application context. These items
                                        depend on how the component is used
                                        within your specific application.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
)

AccessibilityDashboard.displayName = 'AccessibilityDashboard'

export default AccessibilityDashboard
