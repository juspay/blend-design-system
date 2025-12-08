import { forwardRef, useState } from 'react'
import Alert from '../Alert'
import { Button } from '../../Button'
import { ButtonType, ButtonSize } from '../../Button/types'
import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import {
    alertAccessibilityReport,
    type AccessibilityReport,
} from './AlertAccessibilityReport'
import {
    generateAccessibilityReport,
    downloadReport,
    getMimeType,
    getFileExtension,
    type ReportFormat,
} from '../../shared/accessibility/reportGenerator'
import { Download as DownloadIcon } from 'lucide-react'
import { AlertVariant, AlertActionPlacement } from '../types'

export type AlertAccessibilityProps = {
    className?: string
}

const AlertAccessibility = forwardRef<HTMLDivElement, AlertAccessibilityProps>(
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
                    alertAccessibilityReport as AccessibilityReport,
                    {
                        format: selectedFormat,
                        includeTestResults,
                        includeRecommendations,
                    }
                )

                const filename = `alert-accessibility-report-${alertAccessibilityReport.reportDate}.${getFileExtension(selectedFormat)}`
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
                    alertAccessibilityReport as AccessibilityReport,
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

        const handleCloseReport = () => {
            setShowFullReport(false)
            setReportHtmlContent(null)
        }

        const report = alertAccessibilityReport

        return (
            <div ref={ref} className={className}>
                <h1 className="text-3xl font-bold mb-8">
                    {report.componentName} Accessibility Report
                </h1>

                {/* Report Summary */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">Summary</h2>
                    <p className="text-gray-700 mb-4">{report.summary}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900">
                                WCAG Version
                            </h3>
                            <p className="text-2xl font-bold text-blue-600">
                                {report.wcagVersion}
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h3 className="font-semibold text-green-900">
                                Conformance Level
                            </h3>
                            <p className="text-2xl font-bold text-green-600">
                                {report.conformanceLevel}
                            </p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h3 className="font-semibold text-purple-900">
                                Overall Status
                            </h3>
                            <p className="text-2xl font-bold text-purple-600 capitalize">
                                {report.overallStatus}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={includeTestResults}
                                onChange={(e) =>
                                    setIncludeTestResults(e.target.checked)
                                }
                                className="form-checkbox"
                            />
                            <span>Include Test Results</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={includeRecommendations}
                                onChange={(e) =>
                                    setIncludeRecommendations(e.target.checked)
                                }
                                className="form-checkbox"
                            />
                            <span>Include Recommendations</span>
                        </label>
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                            <label htmlFor="report-format">Format:</label>
                            <select
                                id="report-format"
                                value={selectedFormat}
                                onChange={(e) =>
                                    setSelectedFormat(
                                        e.target.value as ReportFormat
                                    )
                                }
                                className="form-select border-gray-300 rounded-md"
                            >
                                <option value="markdown">Markdown</option>
                                <option value="html">HTML</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            text="Download Report"
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                            onClick={handleDownload}
                            leadingIcon={<DownloadIcon size={16} />}
                        />
                        <Button
                            text="View Full Report (HTML)"
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            onClick={handleViewReport}
                        />
                    </div>

                    {showFullReport && reportHtmlContent && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
                                <div className="flex justify-between items-center border-b p-4">
                                    <h3 className="text-lg font-bold">
                                        Full Accessibility Report
                                    </h3>
                                    <Button
                                        text="Close"
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.SMALL}
                                        onClick={handleCloseReport}
                                    />
                                </div>
                                <div
                                    className="flex-grow p-4 overflow-auto"
                                    dangerouslySetInnerHTML={{
                                        __html: reportHtmlContent,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </section>

                {/* Strengths and Recommendations */}
                <section className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Strengths & Recommendations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-green-700 mb-2">
                                Strengths
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {report.strengths.map((strength, index) => (
                                    <li key={index}>{strength}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                                Recommendations
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {report.recommendations.map(
                                    (recommendation, index) => (
                                        <li key={index}>{recommendation}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Interactive Demo Section */}
                <section className="space-y-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Interactive Accessibility Demo
                    </h2>
                    <p className="text-gray-700">
                        This section demonstrates key accessibility features of
                        the {report.componentName} component. Use keyboard
                        navigation (Tab, Enter, Space) and screen readers to
                        experience these features.
                    </p>

                    {/* ARIA Roles */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">
                            1. ARIA Roles (WCAG 4.1.2, 4.1.3)
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Error Alert (role="alert" - Assertive)
                                </h4>
                                <Alert
                                    heading="Error Alert"
                                    description="This alert uses role='alert' for immediate attention. Screen readers will announce this assertively."
                                    variant={AlertVariant.ERROR}
                                    icon={<AlertTriangle size={16} />}
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Warning Alert (role="alert" - Assertive)
                                </h4>
                                <Alert
                                    heading="Warning Alert"
                                    description="This alert uses role='alert' for immediate attention."
                                    variant={AlertVariant.WARNING}
                                    icon={<AlertTriangle size={16} />}
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Success Alert (role="status" - Polite)
                                </h4>
                                <Alert
                                    heading="Success Alert"
                                    description="This alert uses role='status' for polite announcements. Screen readers will announce this when they finish current announcements."
                                    variant={AlertVariant.SUCCESS}
                                    icon={<CheckCircle size={16} />}
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Info Alert (role="status" - Polite)
                                </h4>
                                <Alert
                                    heading="Info Alert"
                                    description="This alert uses role='status' for polite announcements."
                                    variant={AlertVariant.PRIMARY}
                                    icon={<Info size={16} />}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Semantic HTML */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">
                            2. Semantic HTML Structure (WCAG 1.3.1)
                        </h3>
                        <Alert
                            heading="Semantic Structure"
                            description="This alert uses semantic HTML: h3 for heading and p for description. The structure is programmatically determinable."
                            variant={AlertVariant.PRIMARY}
                        />
                    </section>

                    {/* ARIA Relationships */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">
                            3. ARIA Relationships (WCAG 4.1.2)
                        </h3>
                        <Alert
                            heading="ARIA Relationships"
                            description="This alert uses aria-labelledby to link the heading and aria-describedby to link the description. Screen readers can properly associate the heading and description with the alert container."
                            variant={AlertVariant.PRIMARY}
                        />
                    </section>

                    {/* Keyboard Navigation */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">
                            4. Keyboard Navigation (WCAG 2.1.1)
                        </h3>
                        <Alert
                            heading="Keyboard Accessible"
                            description="All buttons in this alert are keyboard accessible. Press Tab to navigate, Enter or Space to activate."
                            variant={AlertVariant.PRIMARY}
                            primaryAction={{
                                label: 'Primary Action',
                                onClick: () => alert('Primary action clicked'),
                            }}
                            secondaryAction={{
                                label: 'Secondary Action',
                                onClick: () =>
                                    alert('Secondary action clicked'),
                            }}
                            onClose={() => alert('Close clicked')}
                        />
                    </section>

                    {/* Focus Indicators */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">
                            5. Focus Visible Indicators (WCAG 2.4.7)
                        </h3>
                        <Alert
                            heading="Focus Indicators"
                            description="All interactive elements have visible focus indicators. Tab through the buttons to see the focus outlines."
                            variant={AlertVariant.PRIMARY}
                            primaryAction={{
                                label: 'Focus Me',
                                onClick: () => {},
                            }}
                            onClose={() => {}}
                        />
                    </section>

                    {/* Decorative Content */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">
                            6. Decorative Content Handling (WCAG 1.1.1)
                        </h3>
                        <Alert
                            heading="Decorative Icons"
                            description="Icons in alerts are marked with aria-hidden='true' to prevent screen reader announcements. The text provides all necessary information."
                            variant={AlertVariant.PRIMARY}
                            icon={<Info size={16} />}
                        />
                    </section>

                    {/* Action Placement */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4">
                            7. Action Placement
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Actions on Right
                                </h4>
                                <Alert
                                    heading="Right Placement"
                                    description="Actions are placed on the right side of the alert."
                                    variant={AlertVariant.PRIMARY}
                                    primaryAction={{
                                        label: 'Action',
                                        onClick: () => {},
                                    }}
                                    onClose={() => {}}
                                    actionPlacement={AlertActionPlacement.RIGHT}
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-2">
                                    Actions on Bottom
                                </h4>
                                <Alert
                                    heading="Bottom Placement"
                                    description="Actions are placed at the bottom of the alert."
                                    variant={AlertVariant.PRIMARY}
                                    primaryAction={{
                                        label: 'Action',
                                        onClick: () => {},
                                    }}
                                    onClose={() => {}}
                                    actionPlacement={
                                        AlertActionPlacement.BOTTOM
                                    }
                                />
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        )
    }
)

AlertAccessibility.displayName = 'AlertAccessibility'

export default AlertAccessibility
