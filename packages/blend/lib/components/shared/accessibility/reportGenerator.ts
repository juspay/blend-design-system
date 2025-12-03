/**
 * Accessibility Report Generator
 * Generates downloadable reports in various formats
 */

import type { AccessibilityReport } from '../../Button/accessibility/ButtonAccessibilityReport'

export type ReportFormat = 'json' | 'markdown' | 'html' | 'pdf'

type ReportGenerationOptions = {
    format: ReportFormat
    includeTestResults?: boolean
    includeRecommendations?: boolean
}

/**
 * Generate accessibility report in specified format
 */
export function generateAccessibilityReport(
    report: AccessibilityReport,
    options: ReportGenerationOptions = {
        format: 'markdown',
        includeTestResults: true,
        includeRecommendations: true,
    }
): string {
    switch (options.format) {
        case 'json':
            return generateJSONReport(report, options)
        case 'markdown':
            return generateMarkdownReport(report, options)
        case 'html':
            return generateHTMLReport(report, options)
        default:
            return generateMarkdownReport(report, options)
    }
}

/**
 * Generate JSON report
 */
function generateJSONReport(
    report: AccessibilityReport,
    options: ReportGenerationOptions
): string {
    const { ...reportWithoutRecommendations } = report
    const reportData = {
        ...(options.includeRecommendations
            ? report
            : reportWithoutRecommendations),
        criteria: options.includeTestResults
            ? report.criteria
            : report.criteria.map(({ ...rest }) => rest),
    }

    return JSON.stringify(reportData, null, 2)
}

/**
 * Generate Markdown report
 */
function generateMarkdownReport(
    report: AccessibilityReport,
    options: ReportGenerationOptions
): string {
    const statusEmoji = {
        compliant: '✅',
        'non-compliant': '❌',
        unsure: '⚠️',
        'not-applicable': '➖',
    }

    const levelBadge = {
        A: '[Level A]',
        AA: '[Level AA]',
        AAA: '[Level AAA]',
    }

    let markdown = `# ${report.componentName} Component Accessibility Report\n\n`
    markdown += `**WCAG Version:** ${report.wcagVersion}  \n`
    markdown += `**Report Date:** ${report.reportDate}  \n`
    markdown += `**Conformance Level:** ${report.conformanceLevel}  \n`
    markdown += `**Overall Status:** ${report.overallStatus.toUpperCase()}  \n\n`

    markdown += `## WCAG Guidelines Coverage\n\n`
    markdown += `This report evaluates criteria from WCAG 2.0, 2.1, and 2.2:\n\n`
    markdown += `### WCAG 2.0 (2008)\n`
    report.wcagVersions['2.0'].forEach((item) => {
        markdown += `- ${item}\n`
    })
    markdown += `\n### WCAG 2.1 (2018)\n`
    report.wcagVersions['2.1'].forEach((item) => {
        markdown += `- ${item}\n`
    })
    markdown += `\n### WCAG 2.2 (2023)\n`
    report.wcagVersions['2.2'].forEach((item) => {
        markdown += `- ${item}\n`
    })
    markdown += `\n`

    markdown += `## Executive Summary\n\n`
    markdown += `${report.summary}\n\n`

    markdown += `## WCAG Success Criteria\n\n`

    const criteriaByLevel = {
        A: report.criteria.filter((c) => c.level === 'A'),
        AA: report.criteria.filter((c) => c.level === 'AA'),
        AAA: report.criteria.filter((c) => c.level === 'AAA'),
    }

    for (const [level, criteria] of Object.entries(criteriaByLevel)) {
        if (criteria.length === 0) continue

        markdown += `### Level ${level} Criteria\n\n`

        for (const criterion of criteria) {
            markdown += `### ${statusEmoji[criterion.status]} ${criterion.id} ${criterion.title} ${levelBadge[criterion.level]}\n\n`
            markdown += `**Status:** ${criterion.status.toUpperCase()}  \n\n`
            markdown += `**Description:**\n${criterion.description}\n\n`
            markdown += `**Implementation:**\n${criterion.implementation}\n\n`

            if (options.includeTestResults && criterion.testResults) {
                markdown += `**Test Results:**\n${criterion.testResults}\n\n`
            }

            if (criterion.notes) {
                markdown += `**Notes:**\n${criterion.notes}\n\n`
            }

            markdown += `---\n\n`
        }
    }

    if (options.includeRecommendations && report.recommendations.length > 0) {
        markdown += `## Recommendations\n\n`
        for (const rec of report.recommendations) {
            markdown += `- ${rec}\n`
        }
        markdown += `\n`
    }

    markdown += `## Strengths\n\n`
    for (const strength of report.strengths) {
        markdown += `- ${strength}\n`
    }
    markdown += `\n`

    markdown += `## Test Methodology\n\n`
    markdown += `### Automated Testing\n\n`
    for (const test of report.testMethodology.automated) {
        markdown += `- ${test}\n`
    }
    markdown += `\n### Manual Testing\n\n`
    for (const test of report.testMethodology.manual) {
        markdown += `- ${test}\n`
    }
    markdown += `\n`

    const compliantCount = report.criteria.filter(
        (c) => c.status === 'compliant'
    ).length
    const totalCount = report.criteria.filter(
        (c) => c.status !== 'not-applicable'
    ).length
    const unsureCount = report.criteria.filter(
        (c) => c.status === 'unsure'
    ).length

    markdown += `## Summary Statistics\n\n`
    markdown += `- **Total Criteria:** ${report.criteria.length}\n`
    markdown += `- **Compliant:** ${compliantCount}\n`
    markdown += `- **Non-Compliant:** ${report.criteria.filter((c) => c.status === 'non-compliant').length}\n`
    markdown += `- **Unsure:** ${unsureCount}\n`
    markdown += `- **Not Applicable:** ${report.criteria.filter((c) => c.status === 'not-applicable').length}\n`
    markdown += `- **Compliance Rate:** ${totalCount > 0 ? Math.round((compliantCount / totalCount) * 100) : 0}%\n\n`

    if (unsureCount > 0) {
        markdown += `⚠️ **Note:** ${unsureCount} criterion/criteria marked as "unsure" require manual verification in application context.\n\n`
    }

    markdown += `---\n\n`
    markdown += `*Report generated on ${new Date().toLocaleString()}*\n`

    return markdown
}

/**
 * Generate HTML report
 */
function generateHTMLReport(
    report: AccessibilityReport,
    options: ReportGenerationOptions
): string {
    const statusColors: Record<
        AccessibilityReport['overallStatus'] | 'not-applicable',
        string
    > = {
        compliant: '#10b981',
        'non-compliant': '#ef4444',
        unsure: '#f59e0b',
        partial: '#3b82f6',
        'not-applicable': '#6b7280',
    }

    const statusEmoji = {
        compliant: '✅',
        'non-compliant': '❌',
        unsure: '⚠️',
        'not-applicable': '➖',
    }

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${report.componentName} Accessibility Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1 { color: #1f2937; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 40px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        h3 { color: #4b5563; margin-top: 30px; }
        h4 { color: #6b7280; margin-top: 20px; }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.875rem;
            margin-left: 8px;
        }
        .criterion {
            border-left: 4px solid #e5e7eb;
            padding-left: 16px;
            margin: 20px 0;
        }
        .criterion.compliant { border-left-color: ${statusColors.compliant}; }
        .criterion.non-compliant { border-left-color: ${statusColors['non-compliant']}; }
        .criterion.unsure { border-left-color: ${statusColors.unsure}; }
        .criterion.not-applicable { border-left-color: ${statusColors['not-applicable']}; }
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin: 20px 0;
        }
        .stat-card {
            background: #f9fafb;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #1f2937;
        }
        .stat-label {
            color: #6b7280;
            font-size: 0.875rem;
        }
        code {
            background: #f3f4f6;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.875rem;
        }
        ul { padding-left: 24px; }
        .warning-box {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
        }
        .wcag-versions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 16px;
            margin: 20px 0;
        }
        .version-card {
            background: #f9fafb;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .version-card.wcag20 { border-left: 4px solid #3b82f6; }
        .version-card.wcag21 { border-left: 4px solid #10b981; }
        .version-card.wcag22 { border-left: 4px solid #8b5cf6; }
    </style>
</head>
<body>
    <h1>${report.componentName} Component Accessibility Report</h1>
    
    <div style="margin: 20px 0;">
        <strong>WCAG Version:</strong> ${report.wcagVersion}<br>
        <strong>Report Date:</strong> ${report.reportDate}<br>
        <strong>Conformance Level:</strong> ${report.conformanceLevel}<br>
        <strong>Overall Status:</strong> 
        <span class="status-badge" style="background: ${statusColors[report.overallStatus]}; color: white;">
            ${report.overallStatus.toUpperCase()}
        </span>
    </div>

    <h2>WCAG Guidelines Coverage</h2>
    <p>This report evaluates criteria from WCAG 2.0, 2.1, and 2.2:</p>
    <div class="wcag-versions">
        <div class="version-card wcag20">
            <h3>WCAG 2.0 (2008)</h3>
            <p><strong>Foundation guidelines</strong></p>
            <ul>
                ${report.wcagVersions['2.0'].map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="version-card wcag21">
            <h3>WCAG 2.1 (2018)</h3>
            <p><strong>Current standard</strong></p>
            <ul>
                ${report.wcagVersions['2.1'].map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="version-card wcag22">
            <h3>WCAG 2.2 (2023)</h3>
            <p><strong>Latest updates</strong></p>
            <ul>
                ${report.wcagVersions['2.2'].map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    </div>

    <h2>Executive Summary</h2>
    <p>${report.summary}</p>

    <h2>Summary Statistics</h2>
    <div class="summary-stats">
        <div class="stat-card">
            <div class="stat-value">${report.criteria.length}</div>
            <div class="stat-label">Total Criteria</div>
        </div>
        <div class="stat-card">
            <div class="stat-value" style="color: ${statusColors.compliant}">
                ${report.criteria.filter((c) => c.status === 'compliant').length}
            </div>
            <div class="stat-label">Compliant</div>
        </div>
        <div class="stat-card">
            <div class="stat-value" style="color: ${statusColors['non-compliant']}">
                ${report.criteria.filter((c) => c.status === 'non-compliant').length}
            </div>
            <div class="stat-label">Non-Compliant</div>
        </div>
        <div class="stat-card">
            <div class="stat-value" style="color: ${statusColors.unsure}">
                ${report.criteria.filter((c) => c.status === 'unsure').length}
            </div>
            <div class="stat-label">Unsure</div>
        </div>
    </div>

    <h2>WCAG Success Criteria</h2>`

    const criteriaByLevel = {
        A: report.criteria.filter((c) => c.level === 'A'),
        AA: report.criteria.filter((c) => c.level === 'AA'),
        AAA: report.criteria.filter((c) => c.level === 'AAA'),
    }

    for (const [level, criteria] of Object.entries(criteriaByLevel)) {
        if (criteria.length === 0) continue

        html += `\n    <h3>Level ${level} Criteria</h3>\n`

        for (const criterion of criteria) {
            html += `
    <div class="criterion ${criterion.status}">
        <h4>${statusEmoji[criterion.status]} ${criterion.id} ${criterion.title} [Level ${criterion.level}]</h4>
        <p><strong>Status:</strong> <span class="status-badge" style="background: ${statusColors[criterion.status]}; color: white;">${criterion.status.toUpperCase()}</span></p>
        <p><strong>Description:</strong> ${criterion.description}</p>
        <p><strong>Implementation:</strong> ${criterion.implementation}</p>
        ${options.includeTestResults && criterion.testResults ? `<p><strong>Test Results:</strong> ${criterion.testResults}</p>` : ''}
        ${criterion.notes ? `<p><strong>Notes:</strong> ${criterion.notes}</p>` : ''}
    </div>`
        }
    }

    if (options.includeRecommendations && report.recommendations.length > 0) {
        html += `\n    <h2>Recommendations</h2>\n    <ul>\n`
        for (const rec of report.recommendations) {
            html += `        <li>${rec}</li>\n`
        }
        html += `    </ul>\n`
    }

    html += `
    <h2>Strengths</h2>
    <ul>
        ${report.strengths.map((s) => `        <li>${s}</li>`).join('\n')}
    </ul>

    <h2>Test Methodology</h2>
    <h3>Automated Testing</h3>
    <ul>
        ${report.testMethodology.automated.map((t) => `        <li>${t}</li>`).join('\n')}
    </ul>
    <h3>Manual Testing</h3>
    <ul>
        ${report.testMethodology.manual.map((t) => `        <li>${t}</li>`).join('\n')}
    </ul>
    <h3>Verification Tools</h3>
    <ul>
        ${report.testMethodology.verificationTools.map((t) => `        <li>${t}</li>`).join('\n')}
    </ul>
    <h3>WCAG Levels Evaluated</h3>
    <p><strong>Level A Criteria:</strong> ${report.testMethodology.wcagLevels.A.join(', ')}</p>
    <p><strong>Level AA Criteria:</strong> ${report.testMethodology.wcagLevels.AA.join(', ')}</p>
    <p><strong>Level AAA Criteria:</strong> ${report.testMethodology.wcagLevels.AAA.join(', ')}</p>

    ${
        report.criteria.filter((c) => c.status === 'unsure').length > 0
            ? `
    <div class="warning-box">
        <strong>⚠️ Note:</strong> ${report.criteria.filter((c) => c.status === 'unsure').length} criterion/criteria marked as "unsure" require manual verification in application context.
    </div>
    `
            : ''
    }

    <hr>
    <p style="color: #6b7280; font-size: 0.875rem;">
        Report generated on ${new Date().toLocaleString()}
    </p>
</body>
</html>`

    return html
}

/**
 * Download report as file
 */
export function downloadReport(
    content: string,
    filename: string,
    mimeType: string
): void {
    try {
        // Create blob with proper encoding
        const blob = new Blob([content], {
            type: mimeType + ';charset=utf-8',
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }, 100)
    } catch (error) {
        console.error('Download error:', error)
        // Fallback: open in new window for HTML
        if (mimeType === 'text/html') {
            const newWindow = window.open()
            if (newWindow) {
                newWindow.document.write(content)
                newWindow.document.close()
            }
        } else {
            throw error
        }
    }
}

/**
 * Get MIME type for report format
 */
export function getMimeType(format: ReportFormat): string {
    switch (format) {
        case 'json':
            return 'application/json'
        case 'markdown':
            return 'text/markdown'
        case 'html':
            return 'text/html'
        case 'pdf':
            return 'application/pdf'
        default:
            return 'text/plain'
    }
}

/**
 * Get file extension for report format
 */
export function getFileExtension(format: ReportFormat): string {
    switch (format) {
        case 'json':
            return 'json'
        case 'markdown':
            return 'md'
        case 'html':
            return 'html'
        case 'pdf':
            return 'pdf'
        default:
            return 'txt'
    }
}
