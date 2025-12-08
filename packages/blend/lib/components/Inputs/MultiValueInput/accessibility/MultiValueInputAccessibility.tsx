import { forwardRef, useState } from 'react'
import { Button } from '../../../Button/index'
import { ButtonType, ButtonSize } from '../../../Button/types'
import MultiValueInput from '../MultiValueInput'
import { multiValueInputAccessibilityReport } from './MultiValueInputAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { TextInputSize } from '../../TextInput/types'

export type MultiValueInputAccessibilityProps = {
    className?: string
}

const MultiValueInputAccessibility = forwardRef<
    HTMLDivElement,
    MultiValueInputAccessibilityProps
>(({ className }, ref) => {
    const [selectedFormat, setSelectedFormat] =
        useState<ReportFormat>('markdown')
    const [includeTestResults, setIncludeTestResults] = useState(true)
    const [includeRecommendations, setIncludeRecommendations] = useState(true)
    const [reportHtmlContent, setReportHtmlContent] = useState<string | null>(
        null
    )
    const [showFullReport, setShowFullReport] = useState(false)

    // Demo state
    const [keywords, setKeywords] = useState<string[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [skills, setSkills] = useState<string[]>(['react', 'typescript'])
    const [disabledTags] = useState(['readonly', 'tags'])
    const [inputValue, setInputValue] = useState('')

    const keywordsError =
        keywords.length === 0 ? 'At least one keyword is required' : ''

    const handleDownload = () => {
        try {
            const content = generateAccessibilityReport(
                multiValueInputAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `multivalueinput-accessibility-report-${multiValueInputAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                multiValueInputAccessibilityReport,
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

    const report = multiValueInputAccessibilityReport
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
                                MultiValueInput Component Accessibility
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
                                                e.target.value as ReportFormat
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
                                                e.target.value as ReportFormat
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
                        Test keyboard navigation (Tab, Shift+Tab, Enter to add
                        tags, Backspace to remove tags), screen reader
                        announcements, error states, and tag removal buttons.
                        All inputs have proper ARIA attributes, accessible
                        labels, error handling, and keyboard-accessible tag
                        removal.
                    </p>

                    <div className="space-y-6">
                        {/* Basic MultiValueInput */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Basic MultiValueInput
                            </h3>
                            <MultiValueInput
                                label="Keywords"
                                sublabel="Add relevant keywords for searchability"
                                hintText="Press Enter to add a keyword"
                                placeholder="Type and press Enter..."
                                value={inputValue}
                                onChange={setInputValue}
                                tags={keywords}
                                onTagAdd={(tag) => {
                                    setKeywords((prev) => [...prev, tag])
                                    setInputValue('')
                                }}
                                onTagRemove={(tag) =>
                                    setKeywords((prev) =>
                                        prev.filter((t) => t !== tag)
                                    )
                                }
                                required
                            />
                        </div>

                        {/* Error State */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Error Messaging and Validation
                            </h3>
                            <MultiValueInput
                                label="Categories"
                                placeholder="Add category..."
                                value=""
                                onChange={() => {}}
                                tags={categories}
                                onTagAdd={(tag) =>
                                    setCategories((prev) => [...prev, tag])
                                }
                                onTagRemove={(tag) =>
                                    setCategories((prev) =>
                                        prev.filter((t) => t !== tag)
                                    )
                                }
                                error={categories.length === 0}
                                errorMessage={keywordsError}
                                hintText="At least one category is required"
                                required
                            />
                        </div>

                        {/* Disabled State */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Disabled State
                            </h3>
                            <MultiValueInput
                                label="Disabled MultiValueInput"
                                tags={disabledTags}
                                onTagAdd={() => {}}
                                onTagRemove={() => {}}
                                placeholder="This input is disabled"
                                value=""
                                onChange={() => {}}
                                disabled
                                hintText="Disabled fields are not focusable and do not submit values"
                            />
                        </div>

                        {/* Keyboard Navigation Demo */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Keyboard and Screen Reader Friendly Layout
                            </h3>
                            <MultiValueInput
                                label="Skills"
                                sublabel="Add your technical skills"
                                hintText="Press Enter to add, Backspace on empty input to remove last tag"
                                helpIconHintText="Use keyboard: Tab to focus, Enter to add tags, Backspace to remove last tag, Enter/Space on tag remove buttons"
                                placeholder="e.g., JavaScript, TypeScript, React..."
                                value=""
                                onChange={() => {}}
                                tags={skills}
                                onTagAdd={(tag) =>
                                    setSkills((prev) => [...prev, tag])
                                }
                                onTagRemove={(tag) =>
                                    setSkills((prev) =>
                                        prev.filter((t) => t !== tag)
                                    )
                                }
                                required
                            />
                        </div>

                        {/* Tag Removal with Keyboard */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Tag Removal with Keyboard
                            </h3>
                            <MultiValueInput
                                label="Tags with Keyboard Removal"
                                hintText="Focus a tag remove button and press Enter or Space to remove it"
                                tags={skills}
                                onTagAdd={(tag) =>
                                    setSkills((prev) => [...prev, tag])
                                }
                                onTagRemove={(tag) =>
                                    setSkills((prev) =>
                                        prev.filter((t) => t !== tag)
                                    )
                                }
                                placeholder="Add tag..."
                                value=""
                                onChange={() => {}}
                            />
                        </div>

                        {/* Different Sizes */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Different Sizes
                            </h3>
                            <div className="space-y-4">
                                <MultiValueInput
                                    label="Small Size"
                                    placeholder="Add tag..."
                                    value=""
                                    onChange={() => {}}
                                    tags={[]}
                                    onTagAdd={() => {}}
                                    onTagRemove={() => {}}
                                    size={TextInputSize.SMALL}
                                />
                                <MultiValueInput
                                    label="Medium Size"
                                    placeholder="Add tag..."
                                    value=""
                                    onChange={() => {}}
                                    tags={[]}
                                    onTagAdd={() => {}}
                                    onTagRemove={() => {}}
                                    size={TextInputSize.MEDIUM}
                                />
                                <MultiValueInput
                                    label="Large Size"
                                    placeholder="Add tag..."
                                    value=""
                                    onChange={() => {}}
                                    tags={[]}
                                    onTagAdd={() => {}}
                                    onTagRemove={() => {}}
                                    size={TextInputSize.LARGE}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

MultiValueInputAccessibility.displayName = 'MultiValueInputAccessibility'

export default MultiValueInputAccessibility
