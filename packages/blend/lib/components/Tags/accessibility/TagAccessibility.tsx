import { forwardRef, useState } from 'react'
import { Button } from '../../Button/index'
import { ButtonType, ButtonSize } from '../../Button/types'
import Tag from '../Tag'
import { TagColor, TagSize, TagVariant } from '../types'
import { tagAccessibilityReport } from './TagAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon, X, Check, Star, Heart } from 'lucide-react'

export type TagAccessibilityProps = {
    className?: string
}

const TagAccessibility = forwardRef<HTMLDivElement, TagAccessibilityProps>(
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
        const [selectedTags, setSelectedTags] = useState<string[]>(['react'])

        const handleDownload = () => {
            try {
                const content = generateAccessibilityReport(
                    tagAccessibilityReport,
                    {
                        format: selectedFormat,
                        includeTestResults,
                        includeRecommendations,
                    }
                )

                const filename = `tag-accessibility-report-${tagAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                    tagAccessibilityReport,
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

        const toggleTag = (tag: string) => {
            setSelectedTags((prev) =>
                prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
            )
        }

        const report = tagAccessibilityReport
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
                                    Tag Component Accessibility
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
                                            checked={
                                                selectedFormat === 'markdown'
                                            }
                                            onChange={(e) =>
                                                setSelectedFormat(
                                                    e.target
                                                        .value as ReportFormat
                                                )
                                            }
                                        />
                                        Markdown (.md)
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="format"
                                            value="html"
                                            checked={selectedFormat === 'html'}
                                            onChange={(e) =>
                                                setSelectedFormat(
                                                    e.target
                                                        .value as ReportFormat
                                                )
                                            }
                                        />
                                        HTML (.html)
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="format"
                                            value="json"
                                            checked={selectedFormat === 'json'}
                                            onChange={(e) =>
                                                setSelectedFormat(
                                                    e.target
                                                        .value as ReportFormat
                                                )
                                            }
                                        />
                                        JSON (.json)
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
                                        />
                                        Include test results
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
                                        />
                                        Include recommendations
                                    </label>
                                </div>

                                <Button
                                    text="Download Report"
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    leadingIcon={<DownloadIcon size={16} />}
                                    onClick={handleDownload}
                                />
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <iframe
                                    srcDoc={reportHtmlContent}
                                    className="w-full h-[600px] border-0"
                                    title="Accessibility Report"
                                />
                            </div>
                        </section>
                    )}

                    {/* Summary Section */}
                    <section className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {report.summary}
                        </p>
                    </section>

                    {/* Interactive Demo Section */}
                    <section className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Interactive Demo
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Test keyboard navigation (Tab, Shift+Tab, Enter,
                            Space), screen reader announcements, focus
                            indicators, and interactive tag behavior. All tags
                            have proper ARIA attributes, accessible labels, and
                            keyboard support.
                        </p>

                        <div className="space-y-6">
                            {/* Basic Tags */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Basic Tags (Non-Interactive)
                                </h3>
                                <div className="flex gap-2 flex-wrap">
                                    <Tag
                                        text="React"
                                        color={TagColor.PRIMARY}
                                    />
                                    <Tag
                                        text="TypeScript"
                                        color={TagColor.SUCCESS}
                                    />
                                    <Tag
                                        text="JavaScript"
                                        color={TagColor.WARNING}
                                    />
                                    <Tag text="CSS" color={TagColor.PURPLE} />
                                </div>
                            </div>

                            {/* Interactive Tags */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Interactive Tags (Keyboard Accessible)
                                </h3>
                                <p className="text-xs text-gray-500 mb-2">
                                    Use Tab to focus, Enter or Space to activate
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <Tag
                                        text="Selectable"
                                        color={TagColor.PRIMARY}
                                        variant={TagVariant.SUBTLE}
                                        onClick={() =>
                                            console.log('Tag selected')
                                        }
                                    />
                                    <Tag
                                        text="Removable"
                                        color={TagColor.ERROR}
                                        variant={TagVariant.SUBTLE}
                                        rightSlot={
                                            <X size={12} aria-hidden="true" />
                                        }
                                        onClick={() =>
                                            console.log('Tag removed')
                                        }
                                    />
                                    <Tag
                                        text="Toggle"
                                        color={TagColor.SUCCESS}
                                        variant={TagVariant.ATTENTIVE}
                                        onClick={() =>
                                            console.log('Tag toggled')
                                        }
                                    />
                                </div>
                            </div>

                            {/* Tags with Icons */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Tags with Icons (Properly Hidden)
                                </h3>
                                <p className="text-xs text-gray-500 mb-2">
                                    Decorative icons have aria-hidden="true"
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <Tag
                                        text="New Feature"
                                        color={TagColor.SUCCESS}
                                        leftSlot={
                                            <Star
                                                size={12}
                                                aria-hidden="true"
                                            />
                                        }
                                        onClick={() => {}}
                                    />
                                    <Tag
                                        text="Verified"
                                        color={TagColor.PRIMARY}
                                        rightSlot={
                                            <Check
                                                size={12}
                                                aria-hidden="true"
                                            />
                                        }
                                        onClick={() => {}}
                                    />
                                    <Tag
                                        text="Favorite"
                                        color={TagColor.ERROR}
                                        leftSlot={
                                            <Heart
                                                size={12}
                                                aria-hidden="true"
                                            />
                                        }
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>

                            {/* Different Sizes */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Size Variants (Touch Target Compliance)
                                </h3>
                                <p className="text-xs text-gray-500 mb-2">
                                    All interactive tags meet 24x24px minimum
                                    (AA)
                                </p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs text-gray-500 w-16">
                                            XS:
                                        </span>
                                        <Tag
                                            text="Extra Small"
                                            size={TagSize.XS}
                                            onClick={() => {}}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs text-gray-500 w-16">
                                            SM:
                                        </span>
                                        <Tag
                                            text="Small"
                                            size={TagSize.SM}
                                            onClick={() => {}}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs text-gray-500 w-16">
                                            MD:
                                        </span>
                                        <Tag
                                            text="Medium"
                                            size={TagSize.MD}
                                            onClick={() => {}}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs text-gray-500 w-16">
                                            LG:
                                        </span>
                                        <Tag
                                            text="Large"
                                            size={TagSize.LG}
                                            onClick={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* All Variants */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    All Variants (Accessible)
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="text-xs font-medium text-gray-600 mb-1">
                                            No Fill Variant
                                        </h4>
                                        <div className="flex gap-2 flex-wrap">
                                            <Tag
                                                text="Neutral"
                                                variant={TagVariant.NO_FILL}
                                                color={TagColor.NEUTRAL}
                                                onClick={() => {}}
                                            />
                                            <Tag
                                                text="Primary"
                                                variant={TagVariant.NO_FILL}
                                                color={TagColor.PRIMARY}
                                                onClick={() => {}}
                                            />
                                            <Tag
                                                text="Success"
                                                variant={TagVariant.NO_FILL}
                                                color={TagColor.SUCCESS}
                                                onClick={() => {}}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-medium text-gray-600 mb-1">
                                            Attentive Variant
                                        </h4>
                                        <div className="flex gap-2 flex-wrap">
                                            <Tag
                                                text="Neutral"
                                                variant={TagVariant.ATTENTIVE}
                                                color={TagColor.NEUTRAL}
                                                onClick={() => {}}
                                            />
                                            <Tag
                                                text="Primary"
                                                variant={TagVariant.ATTENTIVE}
                                                color={TagColor.PRIMARY}
                                                onClick={() => {}}
                                            />
                                            <Tag
                                                text="Success"
                                                variant={TagVariant.ATTENTIVE}
                                                color={TagColor.SUCCESS}
                                                onClick={() => {}}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-medium text-gray-600 mb-1">
                                            Subtle Variant
                                        </h4>
                                        <div className="flex gap-2 flex-wrap">
                                            <Tag
                                                text="Neutral"
                                                variant={TagVariant.SUBTLE}
                                                color={TagColor.NEUTRAL}
                                                onClick={() => {}}
                                            />
                                            <Tag
                                                text="Primary"
                                                variant={TagVariant.SUBTLE}
                                                color={TagColor.PRIMARY}
                                                onClick={() => {}}
                                            />
                                            <Tag
                                                text="Success"
                                                variant={TagVariant.SUBTLE}
                                                color={TagColor.SUCCESS}
                                                onClick={() => {}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Selection Demo */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Interactive Selection (Keyboard Accessible)
                                </h3>
                                <p className="text-xs text-gray-500 mb-2">
                                    Tab to focus tags, Enter or Space to select
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    {[
                                        'react',
                                        'typescript',
                                        'javascript',
                                        'css',
                                        'html',
                                    ].map((tag) => (
                                        <Tag
                                            key={tag}
                                            text={tag}
                                            variant={
                                                selectedTags.includes(tag)
                                                    ? TagVariant.ATTENTIVE
                                                    : TagVariant.NO_FILL
                                            }
                                            color={
                                                selectedTags.includes(tag)
                                                    ? TagColor.PRIMARY
                                                    : TagColor.NEUTRAL
                                            }
                                            leftSlot={
                                                selectedTags.includes(tag) ? (
                                                    <Check
                                                        size={12}
                                                        aria-hidden="true"
                                                    />
                                                ) : null
                                            }
                                            onClick={() => toggleTag(tag)}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Selected:{' '}
                                    {selectedTags.length > 0
                                        ? selectedTags.join(', ')
                                        : 'None'}
                                </p>
                            </div>

                            {/* Focus Indicators Demo */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Focus Indicators (Keyboard Navigation)
                                </h3>
                                <p className="text-xs text-gray-500 mb-2">
                                    Press Tab to see focus indicators
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <Tag
                                        text="Focusable Tag 1"
                                        color={TagColor.PRIMARY}
                                        onClick={() => {}}
                                    />
                                    <Tag
                                        text="Focusable Tag 2"
                                        color={TagColor.SUCCESS}
                                        onClick={() => {}}
                                    />
                                    <Tag
                                        text="Focusable Tag 3"
                                        color={TagColor.WARNING}
                                        onClick={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
)

TagAccessibility.displayName = 'TagAccessibility'

export default TagAccessibility
