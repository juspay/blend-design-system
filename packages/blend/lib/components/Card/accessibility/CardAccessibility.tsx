import { forwardRef, useState } from 'react'
import Card from '../Card'
import { CardVariant, CardAlignment } from '../types'
import { cardAccessibilityReport } from './CardAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon, Settings, TrendingUp } from 'lucide-react'
import Button from '../../Button/Button'
import { ButtonType, ButtonSize } from '../../Button/types'
import { Tag, TagColor, TagVariant, TagSize } from '../../Tags'

export type CardAccessibilityProps = {
    className?: string
}

const CardAccessibility = forwardRef<HTMLDivElement, CardAccessibilityProps>(
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

        const handleDownload = () => {
            try {
                const content = generateAccessibilityReport(
                    cardAccessibilityReport,
                    {
                        format: selectedFormat,
                        includeTestResults,
                        includeRecommendations,
                    }
                )

                const filename = `card-accessibility-report-${cardAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                    cardAccessibilityReport,
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

        const report = cardAccessibilityReport
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
                                    Card Component Accessibility
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
                                                className="rounded border-gray-300"
                                            />
                                            <span>Include Test Results</span>
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
                                                className="rounded border-gray-300"
                                            />
                                            <span>Include Recommendations</span>
                                        </label>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            text="Download Report"
                                            buttonType={ButtonType.PRIMARY}
                                            size={ButtonSize.SMALL}
                                            leadingIcon={
                                                <DownloadIcon size={16} />
                                            }
                                            onClick={handleDownload}
                                        />
                                        <Button
                                            text="View Full Report"
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.SMALL}
                                            onClick={handleViewReport}
                                        />
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
                                                        {criterion.id} -{' '}
                                                        {criterion.title}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                            criterion.level ===
                                                            'A'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : criterion.level ===
                                                                    'AA'
                                                                  ? 'bg-purple-100 text-purple-700'
                                                                  : 'bg-pink-100 text-pink-700'
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
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        {criterion.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            criterion.status.slice(
                                                                1
                                                            )}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {criterion.description}
                                                </p>
                                                <div className="text-xs text-gray-500 space-y-1">
                                                    <p>
                                                        <strong>
                                                            Implementation:
                                                        </strong>{' '}
                                                        {
                                                            criterion.implementation
                                                        }
                                                    </p>
                                                    {criterion.testResults && (
                                                        <p>
                                                            <strong>
                                                                Test Results:
                                                            </strong>{' '}
                                                            {
                                                                criterion.testResults
                                                            }
                                                        </p>
                                                    )}
                                                    {criterion.notes && (
                                                        <p>
                                                            <strong>
                                                                Notes:
                                                            </strong>{' '}
                                                            {criterion.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Strengths
                                </h2>
                                <ul className="space-y-2">
                                    {report.strengths.map((strength, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm text-gray-700"
                                        >
                                            <span className="text-green-600 mt-0.5">
                                                ✓
                                            </span>
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Recommendations
                                </h2>
                                <ul className="space-y-2">
                                    {report.recommendations.map(
                                        (recommendation, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-2 text-sm text-gray-700"
                                            >
                                                <span className="text-blue-600 mt-0.5">
                                                    →
                                                </span>
                                                <span>{recommendation}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                WCAG Versions Covered
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">
                                        WCAG 2.0
                                    </h3>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        {report.wcagVersions['2.0'].map(
                                            (item, index) => (
                                                <li key={index}>• {item}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">
                                        WCAG 2.1
                                    </h3>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        {report.wcagVersions['2.1'].map(
                                            (item, index) => (
                                                <li key={index}>• {item}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">
                                        WCAG 2.2
                                    </h3>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        {report.wcagVersions['2.2'].length >
                                        0 ? (
                                            report.wcagVersions['2.2'].map(
                                                (item, index) => (
                                                    <li key={index}>
                                                        • {item}
                                                    </li>
                                                )
                                            )
                                        ) : (
                                            <li className="text-gray-400">
                                                No new criteria
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Interactive Examples
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">
                                        Default Card
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card
                                            headerSlot1={
                                                <div
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        backgroundColor:
                                                            '#3b82f6',
                                                        borderRadius: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                    aria-label="Analytics icon"
                                                >
                                                    <TrendingUp
                                                        size={14}
                                                        color="white"
                                                    />
                                                </div>
                                            }
                                            headerTitle="Analytics Dashboard"
                                            headerTag={
                                                <Tag
                                                    text="Pro"
                                                    variant={
                                                        TagVariant.ATTENTIVE
                                                    }
                                                    color={TagColor.SUCCESS}
                                                    size={TagSize.SM}
                                                />
                                            }
                                            headerSlot2={
                                                <Button
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
                                                    size={ButtonSize.SMALL}
                                                    leadingIcon={
                                                        <Settings size={16} />
                                                    }
                                                    aria-label="Open dashboard settings"
                                                />
                                            }
                                            subHeader="Real-time performance metrics and insights"
                                            bodyTitle="Monthly Summary"
                                            content="Track your key metrics and performance indicators with comprehensive analytics and real-time data visualization."
                                            actionButton={{
                                                text: 'View Full Report',
                                                buttonType: ButtonType.PRIMARY,
                                                size: ButtonSize.SMALL,
                                            }}
                                        />
                                        <Card
                                            headerTitle="User Management"
                                            headerTag={
                                                <Tag
                                                    text="Active"
                                                    variant={
                                                        TagVariant.ATTENTIVE
                                                    }
                                                    color={TagColor.SUCCESS}
                                                    size={TagSize.SM}
                                                />
                                            }
                                            headerSlot2={
                                                <Button
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
                                                    size={ButtonSize.SMALL}
                                                    leadingIcon={
                                                        <Settings size={16} />
                                                    }
                                                    aria-label="More options"
                                                />
                                            }
                                            subHeader="Manage users and permissions"
                                            bodyTitle="Active Users"
                                            content="Currently 142 active users with various permission levels. Manage access and roles from this dashboard."
                                            actionButton={{
                                                text: 'Manage Users',
                                                buttonType: ButtonType.PRIMARY,
                                                size: ButtonSize.SMALL,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">
                                        Aligned Card
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card
                                            variant={CardVariant.ALIGNED}
                                            alignment={CardAlignment.VERTICAL}
                                            centerAlign={true}
                                            cardSlot={
                                                <div
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        borderRadius: '50%',
                                                        background:
                                                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        color: 'white',
                                                        fontSize: '24px',
                                                        fontWeight: '600',
                                                    }}
                                                    role="img"
                                                    aria-label="User avatar for John Doe"
                                                >
                                                    JD
                                                </div>
                                            }
                                            headerTitle="John Doe"
                                            headerTag={
                                                <Tag
                                                    text="Premium"
                                                    variant={
                                                        TagVariant.ATTENTIVE
                                                    }
                                                    color={TagColor.SUCCESS}
                                                    size={TagSize.SM}
                                                />
                                            }
                                            subHeader="Senior Developer"
                                            bodyTitle="Profile Information"
                                            content="Senior Developer with expertise in React and Node.js. 5+ years of experience building scalable web applications."
                                            actionButton={{
                                                text: 'View Profile',
                                                buttonType:
                                                    ButtonType.SECONDARY,
                                                size: ButtonSize.SMALL,
                                            }}
                                        />
                                        <Card
                                            variant={CardVariant.ALIGNED}
                                            alignment={CardAlignment.HORIZONTAL}
                                            centerAlign={false}
                                            cardSlot={
                                                <div
                                                    style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        background: '#f0f9ff',
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        border: '1px solid #e0f2fe',
                                                    }}
                                                    role="img"
                                                    aria-label="New feature icon"
                                                >
                                                    <TrendingUp
                                                        size={16}
                                                        color="#0ea5e9"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            }
                                            headerTitle="New App Launch"
                                            headerSlot2={
                                                <Button
                                                    buttonType={
                                                        ButtonType.SECONDARY
                                                    }
                                                    size={ButtonSize.SMALL}
                                                    leadingIcon={
                                                        <Settings size={16} />
                                                    }
                                                    aria-label="More options"
                                                />
                                            }
                                            subHeader="Latest feature release"
                                            bodyTitle="Feature Details"
                                            content="Introducing our new dashboard with enhanced analytics and real-time data visualization capabilities."
                                            actionButton={{
                                                text: 'Learn More',
                                                buttonType: ButtonType.PRIMARY,
                                                size: ButtonSize.SMALL,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">
                                        Custom Card
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card variant={CardVariant.CUSTOM}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '16px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <h3
                                                        style={{
                                                            margin: 0,
                                                            fontSize: '18px',
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        Custom Dashboard
                                                    </h3>
                                                    <Button
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                        leadingIcon={
                                                            <Settings
                                                                size={16}
                                                            />
                                                        }
                                                        aria-label="Settings"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns:
                                                            '1fr 1fr',
                                                        gap: '12px',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            textAlign: 'center',
                                                            padding: '16px',
                                                            backgroundColor:
                                                                '#f0f9ff',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    '24px',
                                                                fontWeight:
                                                                    '700',
                                                                color: '#3b82f6',
                                                            }}
                                                        >
                                                            142
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                                color: '#666',
                                                            }}
                                                        >
                                                            Total Users
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            textAlign: 'center',
                                                            padding: '16px',
                                                            backgroundColor:
                                                                '#f0fdf4',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    '24px',
                                                                fontWeight:
                                                                    '700',
                                                                color: '#10b981',
                                                            }}
                                                        >
                                                            89%
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                                color: '#666',
                                                            }}
                                                        >
                                                            Success Rate
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    text="View Analytics"
                                                    buttonType={
                                                        ButtonType.PRIMARY
                                                    }
                                                    size={ButtonSize.SMALL}
                                                />
                                            </div>
                                        </Card>
                                        <Card variant={CardVariant.CUSTOM}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '16px',
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '18px',
                                                        fontWeight: '600',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    Quick Actions
                                                </h3>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '12px',
                                                    }}
                                                >
                                                    <Button
                                                        text="Download Report"
                                                        buttonType={
                                                            ButtonType.PRIMARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                    />
                                                    <Button
                                                        text="Share Dashboard"
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                    />
                                                    <Button
                                                        text="Edit Settings"
                                                        buttonType={
                                                            ButtonType.SECONDARY
                                                        }
                                                        size={ButtonSize.SMALL}
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

CardAccessibility.displayName = 'CardAccessibility'

export default CardAccessibility
