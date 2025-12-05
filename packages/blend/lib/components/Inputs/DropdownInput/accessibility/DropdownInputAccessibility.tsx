import { forwardRef, useState } from 'react'
import { Button } from '../../../Button'
import { ButtonType, ButtonSize } from '../../../Button/types'
import DropdownInput from '../DropdownInput'
import { DropdownPosition } from '../types'
import { dropdownInputAccessibilityReport } from './DropdownInputAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon, Globe, MapPin, Phone } from 'lucide-react'
import { TextInputSize } from '../../TextInput'

// Sample dropdown data
const countryData = [
    {
        groupLabel: 'Popular',
        items: [
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'UK' },
            { label: 'Canada', value: 'CA' },
        ],
    },
    {
        groupLabel: 'All Countries',
        items: [
            { label: 'Australia', value: 'AU' },
            { label: 'France', value: 'FR' },
            { label: 'Germany', value: 'DE' },
            { label: 'India', value: 'IN' },
            { label: 'Japan', value: 'JP' },
        ],
    },
]

const currencyData = [
    {
        groupLabel: 'Major Currencies',
        items: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'GBP', value: 'GBP' },
        ],
    },
]

const phoneCodeData = [
    {
        groupLabel: 'Country Codes',
        items: [
            { label: '+1', value: '+1' },
            { label: '+44', value: '+44' },
            { label: '+91', value: '+91' },
        ],
    },
]

export type DropdownInputAccessibilityProps = {
    className?: string
}

const DropdownInputAccessibility = forwardRef<
    HTMLDivElement,
    DropdownInputAccessibilityProps
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
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [currency, setCurrency] = useState('')
    const [disabledValue] = useState('This field is disabled')
    const [disabledDropdown] = useState('')

    const phoneError =
        phoneNumber.length > 0 && phoneNumber.length < 10
            ? 'Please enter a valid phone number (at least 10 digits)'
            : ''

    const handleDownload = () => {
        try {
            const content = generateAccessibilityReport(
                dropdownInputAccessibilityReport,
                {
                    format: selectedFormat,
                    includeTestResults,
                    includeRecommendations,
                }
            )

            const filename = `dropdowninput-accessibility-report-${dropdownInputAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                dropdownInputAccessibilityReport,
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

    const report = dropdownInputAccessibilityReport
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
                                DropdownInput Component Accessibility
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

                    {/* Download Options */}
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
                    </section>
                )}

                {/* Interactive Demo */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Interactive Accessibility Demo
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Test keyboard navigation (Tab, Shift+Tab), screen reader
                        announcements, dropdown interactions, and error states.
                        All inputs have proper label associations, ARIA
                        attributes, and error handling.
                    </p>

                    <div className="space-y-6 max-w-2xl">
                        {/* Phone number with country code dropdown */}
                        <DropdownInput
                            label="Phone Number"
                            sublabel="Include country code"
                            hintText="Enter your phone number"
                            placeholder="1234567890"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            slot={<Phone size={16} aria-hidden="true" />}
                            dropdownPosition={DropdownPosition.LEFT}
                            dropDownItems={phoneCodeData}
                            dropDownValue={countryCode}
                            onDropDownChange={(value) => setCountryCode(value)}
                            dropdownName="Country Code"
                            error={!!phoneError}
                            errorMessage={phoneError}
                            required
                        />

                        {/* Address with country dropdown */}
                        <DropdownInput
                            label="Street Address"
                            placeholder="Enter your street address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            slot={<MapPin size={16} aria-hidden="true" />}
                            dropdownPosition={DropdownPosition.RIGHT}
                            dropDownItems={countryData}
                            dropDownValue={country}
                            onDropDownChange={(value) => setCountry(value)}
                            dropdownName="Country"
                            hintText="Select your country from the dropdown"
                            required
                        />

                        {/* Currency with dropdown */}
                        <DropdownInput
                            label="Currency"
                            placeholder="Enter amount"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            slot={<Globe size={16} aria-hidden="true" />}
                            dropdownPosition={DropdownPosition.LEFT}
                            dropDownItems={currencyData}
                            dropDownValue={currency}
                            onDropDownChange={(value) => setCurrency(value)}
                            dropdownName="Currency"
                            hintText="Select currency and enter amount"
                        />

                        {/* Disabled State */}
                        <DropdownInput
                            label="Disabled Input"
                            value={disabledValue}
                            onChange={() => {}}
                            disabled
                            dropDownItems={countryData}
                            dropDownValue={disabledDropdown}
                            onDropDownChange={() => {}}
                            dropdownName="Country"
                            hintText="Disabled fields are not focusable and do not submit values"
                        />

                        {/* Different Sizes */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-900">
                                Size Variants
                            </h3>
                            <DropdownInput
                                label="Small Size"
                                placeholder="Small input"
                                size={TextInputSize.SMALL}
                                value=""
                                onChange={() => {}}
                                dropDownItems={currencyData}
                                dropDownValue=""
                                onDropDownChange={() => {}}
                                dropdownName="Currency"
                            />
                            <DropdownInput
                                label="Medium Size"
                                placeholder="Medium input"
                                size={TextInputSize.MEDIUM}
                                value=""
                                onChange={() => {}}
                                dropDownItems={currencyData}
                                dropDownValue=""
                                onDropDownChange={() => {}}
                                dropdownName="Currency"
                            />
                            <DropdownInput
                                label="Large Size"
                                placeholder="Large input"
                                size={TextInputSize.LARGE}
                                value=""
                                onChange={() => {}}
                                dropDownItems={currencyData}
                                dropDownValue=""
                                onDropDownChange={() => {}}
                                dropdownName="Currency"
                            />
                        </div>

                        {/* Dropdown Positions */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-900">
                                Dropdown Positions
                            </h3>
                            <DropdownInput
                                label="Dropdown on Left"
                                placeholder="Enter value"
                                value=""
                                onChange={() => {}}
                                dropdownPosition={DropdownPosition.LEFT}
                                dropDownItems={phoneCodeData}
                                dropDownValue=""
                                onDropDownChange={() => {}}
                                dropdownName="Code"
                            />
                            <DropdownInput
                                label="Dropdown on Right"
                                placeholder="Enter value"
                                value=""
                                onChange={() => {}}
                                dropdownPosition={DropdownPosition.RIGHT}
                                dropDownItems={currencyData}
                                dropDownValue=""
                                onDropDownChange={() => {}}
                                dropdownName="Currency"
                            />
                        </div>
                    </div>
                </div>

                {/* Key Accessibility Features */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Key Accessibility Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.strengths.map((strength, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-2 text-sm"
                            >
                                <span className="text-green-600 mt-0.5">✓</span>
                                <span className="text-gray-700">
                                    {strength}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* WCAG Compliance Breakdown */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        WCAG Compliance Breakdown
                    </h2>
                    <div className="space-y-4">
                        {/* Level A */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                                Level A (Essential)
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {report.testMethodology.wcagLevels.A.map(
                                    (criterion, index) => {
                                        const criterionData =
                                            report.criteria.find((c) =>
                                                criterion.startsWith(c.id)
                                            )
                                        const statusColor =
                                            criterionData?.status ===
                                            'compliant'
                                                ? 'bg-green-100 text-green-800'
                                                : criterionData?.status ===
                                                    'non-compliant'
                                                  ? 'bg-red-100 text-red-800'
                                                  : criterionData?.status ===
                                                      'unsure'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                        return (
                                            <span
                                                key={index}
                                                className={`text-xs px-2 py-1 rounded ${statusColor}`}
                                            >
                                                {criterion.split(' ')[0]}
                                            </span>
                                        )
                                    }
                                )}
                            </div>
                        </div>

                        {/* Level AA */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                                Level AA (Recommended)
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {report.testMethodology.wcagLevels.AA.map(
                                    (criterion, index) => {
                                        const criterionData =
                                            report.criteria.find((c) =>
                                                criterion.startsWith(c.id)
                                            )
                                        const statusColor =
                                            criterionData?.status ===
                                            'compliant'
                                                ? 'bg-green-100 text-green-800'
                                                : criterionData?.status ===
                                                    'non-compliant'
                                                  ? 'bg-red-100 text-red-800'
                                                  : criterionData?.status ===
                                                      'unsure'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                        return (
                                            <span
                                                key={index}
                                                className={`text-xs px-2 py-1 rounded ${statusColor}`}
                                            >
                                                {criterion.split(' ')[0]}
                                            </span>
                                        )
                                    }
                                )}
                            </div>
                        </div>

                        {/* Level AAA */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                                Level AAA (Enhanced)
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {report.testMethodology.wcagLevels.AAA.map(
                                    (criterion, index) => {
                                        const criterionData =
                                            report.criteria.find((c) =>
                                                criterion.startsWith(c.id)
                                            )
                                        const statusColor =
                                            criterionData?.status ===
                                            'compliant'
                                                ? 'bg-green-100 text-green-800'
                                                : criterionData?.status ===
                                                    'non-compliant'
                                                  ? 'bg-red-100 text-red-800'
                                                  : criterionData?.status ===
                                                      'unsure'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                        return (
                                            <span
                                                key={index}
                                                className={`text-xs px-2 py-1 rounded ${statusColor}`}
                                            >
                                                {criterion.split(' ')[0]}
                                            </span>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Recommendations
                    </h2>
                    <div className="space-y-3">
                        {report.recommendations.map((recommendation, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-2 text-sm"
                            >
                                <span className="text-blue-600 mt-0.5">→</span>
                                <span className="text-gray-700">
                                    {recommendation}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
})

DropdownInputAccessibility.displayName = 'DropdownInputAccessibility'

export default DropdownInputAccessibility
