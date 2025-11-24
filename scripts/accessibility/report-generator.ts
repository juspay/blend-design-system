import * as fs from 'fs'
import * as path from 'path'
import {
    ComponentAccessibilityMetrics,
    DashboardData,
    ComplianceStatus,
    WCAGLevel,
} from './types'
import { WCAG_CRITERIA } from './wcag-criteria'

export class AccessibilityReportGenerator {
    private outputDir: string
    private componentsData: ComponentAccessibilityMetrics[] = []

    constructor(outputDir: string = './docs/accessibility') {
        this.outputDir = outputDir
        this.ensureOutputDirectory()
    }

    private ensureOutputDirectory(): void {
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true })
        }
        const componentsDir = path.join(this.outputDir, 'components')
        if (!fs.existsSync(componentsDir)) {
            fs.mkdirSync(componentsDir, { recursive: true })
        }
    }

    loadComponentMetrics(metricsPath: string): void {
        const data = fs.readFileSync(metricsPath, 'utf-8')
        const metrics: ComponentAccessibilityMetrics = JSON.parse(data)
        this.componentsData.push(metrics)
    }

    loadAllMetrics(metricsDir: string): void {
        const files = fs.readdirSync(metricsDir)
        files
            .filter((file) => file.endsWith('-metrics.json'))
            .forEach((file) => {
                const filePath = path.join(metricsDir, file)
                this.loadComponentMetrics(filePath)
            })
    }

    private calculateSummary(): DashboardData['summary'] {
        const totalComponents = this.componentsData.length
        if (totalComponents === 0) {
            return {
                totalComponents: 0,
                averageScore: 0,
                levelACompliance: 0,
                levelAACompliance: 0,
                levelAAACompliance: 0,
                criticalIssues: 0,
                majorIssues: 0,
                minorIssues: 0,
            }
        }

        const averageScore =
            this.componentsData.reduce((sum, c) => sum + c.overallScore, 0) /
            totalComponents

        const levelACompliance =
            this.componentsData.reduce((sum, c) => sum + c.levelAScore, 0) /
            totalComponents

        const levelAACompliance =
            this.componentsData.reduce((sum, c) => sum + c.levelAAScore, 0) /
            totalComponents

        const levelAAACompliance =
            this.componentsData.reduce((sum, c) => sum + c.levelAAAScore, 0) /
            totalComponents

        const criticalIssues = this.componentsData.reduce(
            (sum, c) =>
                sum +
                c.issuesFound.filter((i) => i.severity === 'critical').length,
            0
        )

        const majorIssues = this.componentsData.reduce(
            (sum, c) =>
                sum +
                c.issuesFound.filter((i) => i.severity === 'major').length,
            0
        )

        const minorIssues = this.componentsData.reduce(
            (sum, c) =>
                sum +
                c.issuesFound.filter((i) => i.severity === 'minor').length,
            0
        )

        return {
            totalComponents,
            averageScore: Math.round(averageScore),
            levelACompliance: Math.round(levelACompliance),
            levelAACompliance: Math.round(levelAACompliance),
            levelAAACompliance: Math.round(levelAAACompliance),
            criticalIssues,
            majorIssues,
            minorIssues,
        }
    }

    generateDashboard(): void {
        const summary = this.calculateSummary()
        const dashboardData: DashboardData = {
            generatedDate: new Date().toISOString(),
            components: this.componentsData,
            summary,
        }

        const markdown = this.generateDashboardMarkdown(dashboardData)
        const dashboardPath = path.join(this.outputDir, 'dashboard.md')
        fs.writeFileSync(dashboardPath, markdown)

        const jsonPath = path.join(this.outputDir, 'dashboard.json')
        fs.writeFileSync(jsonPath, JSON.stringify(dashboardData, null, 2))

        console.log(`✅ Dashboard generated at: ${dashboardPath}`)
        console.log(`✅ Dashboard data saved at: ${jsonPath}`)
    }

    private generateDashboardMarkdown(data: DashboardData): string {
        const { summary } = data

        let markdown = `# Accessibility Dashboard\n\n`
        markdown += `**Generated:** ${new Date(data.generatedDate).toLocaleString()}\n\n`

        markdown += `## Summary\n\n`
        markdown += `| Metric | Value |\n`
        markdown += `|--------|-------|\n`
        markdown += `| Total Components Evaluated | ${summary.totalComponents} |\n`
        markdown += `| Average Accessibility Score | ${summary.averageScore}% |\n`
        markdown += `| WCAG Level A Compliance | ${summary.levelACompliance}% |\n`
        markdown += `| WCAG Level AA Compliance | ${summary.levelAACompliance}% |\n`
        markdown += `| WCAG Level AAA Compliance | ${summary.levelAAACompliance}% |\n`
        markdown += `| Critical Issues | ${summary.criticalIssues} 🔴 |\n`
        markdown += `| Major Issues | ${summary.majorIssues} 🟠 |\n`
        markdown += `| Minor Issues | ${summary.minorIssues} 🟡 |\n\n`

        markdown += `## Compliance by Level\n\n`
        markdown += `\`\`\`\n`
        markdown += `Level A:   ${'█'.repeat(Math.floor(summary.levelACompliance / 5))} ${summary.levelACompliance}%\n`
        markdown += `Level AA:  ${'█'.repeat(Math.floor(summary.levelAACompliance / 5))} ${summary.levelAACompliance}%\n`
        markdown += `Level AAA: ${'█'.repeat(Math.floor(summary.levelAAACompliance / 5))} ${summary.levelAAACompliance}%\n`
        markdown += `\`\`\`\n\n`

        markdown += `## Components Overview\n\n`
        markdown += `| Component | Overall Score | Level A | Level AA | Level AAA | Issues |\n`
        markdown += `|-----------|---------------|---------|----------|-----------|--------|\n`

        data.components
            .sort((a, b) => b.overallScore - a.overallScore)
            .forEach((component) => {
                const issuesCount = component.issuesFound.length
                const issuesEmoji =
                    issuesCount === 0 ? '✅' : `⚠️ ${issuesCount}`
                markdown += `| [${component.componentName}](./components/${component.componentName}.md) | ${component.overallScore}% | ${component.levelAScore}% | ${component.levelAAScore}% | ${component.levelAAAScore}% | ${issuesEmoji} |\n`
            })

        markdown += `\n## Issues Breakdown\n\n`

        const allIssues = data.components.flatMap((c) =>
            c.issuesFound.map((issue) => ({
                component: c.componentName,
                ...issue,
            }))
        )

        if (allIssues.length === 0) {
            markdown += `✨ **No issues found!** All components meet accessibility standards.\n\n`
        } else {
            const critical = allIssues.filter((i) => i.severity === 'critical')
            const major = allIssues.filter((i) => i.severity === 'major')
            const minor = allIssues.filter((i) => i.severity === 'minor')

            if (critical.length > 0) {
                markdown += `### 🔴 Critical Issues (${critical.length})\n\n`
                critical.forEach((issue, index) => {
                    markdown += `${index + 1}. **${issue.component}** - ${issue.criterion}\n`
                    markdown += `   - ${issue.description}\n`
                    markdown += `   - Impact: ${issue.impact}\n`
                    markdown += `   - Suggestion: ${issue.suggestion}\n\n`
                })
            }

            if (major.length > 0) {
                markdown += `### 🟠 Major Issues (${major.length})\n\n`
                major.forEach((issue, index) => {
                    markdown += `${index + 1}. **${issue.component}** - ${issue.criterion}\n`
                    markdown += `   - ${issue.description}\n`
                    markdown += `   - Impact: ${issue.impact}\n`
                    markdown += `   - Suggestion: ${issue.suggestion}\n\n`
                })
            }

            if (minor.length > 0) {
                markdown += `### 🟡 Minor Issues (${minor.length})\n\n`
                minor.forEach((issue, index) => {
                    markdown += `${index + 1}. **${issue.component}** - ${issue.criterion}\n`
                    markdown += `   - ${issue.description}\n`
                    markdown += `   - Impact: ${issue.impact}\n`
                    markdown += `   - Suggestion: ${issue.suggestion}\n\n`
                })
            }
        }

        markdown += `## Top Performing Components\n\n`
        const topPerformers = data.components
            .sort((a, b) => b.overallScore - a.overallScore)
            .slice(0, 5)

        topPerformers.forEach((component, index) => {
            markdown += `${index + 1}. **${component.componentName}** - ${component.overallScore}% overall score\n`
        })

        markdown += `\n## Areas for Improvement\n\n`
        const needsImprovement = data.components
            .filter((c) => c.overallScore < 90)
            .sort((a, b) => a.overallScore - b.overallScore)

        if (needsImprovement.length === 0) {
            markdown += `✨ All components score above 90%!\n\n`
        } else {
            needsImprovement.forEach((component) => {
                markdown += `- **${component.componentName}** (${component.overallScore}%): `
                const mainIssues = component.issuesFound
                    .slice(0, 2)
                    .map((i) => i.criterion)
                    .join(', ')
                markdown += `${mainIssues}\n`
            })
        }

        markdown += `\n---\n\n`
        markdown += `For detailed accessibility reports, see individual component documentation:\n\n`
        data.components.forEach((component) => {
            markdown += `- [${component.componentName}](./components/${component.componentName}.md)\n`
        })

        return markdown
    }

    generateComponentDocs(): void {
        this.componentsData.forEach((component) => {
            const markdown = this.generateComponentDocMarkdown(component)
            const docPath = path.join(
                this.outputDir,
                'components',
                `${component.componentName}.md`
            )
            fs.writeFileSync(docPath, markdown)
            console.log(
                `✅ Component documentation generated for: ${component.componentName}`
            )
        })
    }

    private getStatusEmoji(status: ComplianceStatus): string {
        switch (status) {
            case ComplianceStatus.PASS:
                return '✅'
            case ComplianceStatus.FAIL:
                return '❌'
            case ComplianceStatus.PARTIAL:
                return '⚠️'
            case ComplianceStatus.NOT_APPLICABLE:
                return '➖'
            case ComplianceStatus.NEEDS_REVIEW:
                return '🔍'
            default:
                return '❓'
        }
    }

    private generateComponentDocMarkdown(
        component: ComponentAccessibilityMetrics
    ): string {
        let markdown = `# ${component.componentName} - Accessibility Report\n\n`

        markdown += `**Version:** ${component.version}\n`
        markdown += `**Evaluation Date:** ${new Date(component.evaluationDate).toLocaleDateString()}\n`
        if (component.evaluator) {
            markdown += `**Evaluator:** ${component.evaluator}\n`
        }
        markdown += `\n`

        markdown += `## Overall Score: ${component.overallScore}%\n\n`
        markdown += `\`\`\`\n`
        markdown += `Overall:    ${'█'.repeat(Math.floor(component.overallScore / 5))} ${component.overallScore}%\n`
        markdown += `Level A:    ${'█'.repeat(Math.floor(component.levelAScore / 5))} ${component.levelAScore}%\n`
        markdown += `Level AA:   ${'█'.repeat(Math.floor(component.levelAAScore / 5))} ${component.levelAAScore}%\n`
        markdown += `Level AAA:  ${'█'.repeat(Math.floor(component.levelAAAScore / 5))} ${component.levelAAAScore}%\n`
        markdown += `\`\`\`\n\n`

        markdown += `## Quick Summary\n\n`
        markdown += `| Category | Score | Status |\n`
        markdown += `|----------|-------|--------|\n`
        markdown += `| Keyboard Navigation | ${component.keyboardNavigation.score}% | ${this.getStatusEmoji(component.keyboardNavigation.tabOrder)} |\n`
        markdown += `| Screen Reader Support | ${component.screenReaderSupport.score}% | ${this.getStatusEmoji(component.screenReaderSupport.ariaLabels)} |\n`
        markdown += `| Visual Accessibility | ${component.visualAccessibility.score}% | ${this.getStatusEmoji(component.visualAccessibility.colorContrast)} |\n`
        markdown += `| ARIA Compliance | ${component.ariaCompliance.score}% | ${this.getStatusEmoji(component.ariaCompliance.ariaRoles)} |\n\n`

        if (component.strengths.length > 0) {
            markdown += `## ✨ Strengths\n\n`
            component.strengths.forEach((strength) => {
                markdown += `- ${strength}\n`
            })
            markdown += `\n`
        }

        if (component.issuesFound.length > 0) {
            markdown += `## ⚠️ Issues Found\n\n`
            const critical = component.issuesFound.filter(
                (i) => i.severity === 'critical'
            )
            const major = component.issuesFound.filter(
                (i) => i.severity === 'major'
            )
            const minor = component.issuesFound.filter(
                (i) => i.severity === 'minor'
            )

            if (critical.length > 0) {
                markdown += `### 🔴 Critical (${critical.length})\n\n`
                critical.forEach((issue, index) => {
                    markdown += `${index + 1}. **${issue.criterion}**: ${issue.description}\n`
                    markdown += `   - **Impact:** ${issue.impact}\n`
                    markdown += `   - **Suggestion:** ${issue.suggestion}\n`
                    if (issue.codeReference) {
                        markdown += `   - **Code:** \`${issue.codeReference}\`\n`
                    }
                    markdown += `\n`
                })
            }

            if (major.length > 0) {
                markdown += `### 🟠 Major (${major.length})\n\n`
                major.forEach((issue, index) => {
                    markdown += `${index + 1}. **${issue.criterion}**: ${issue.description}\n`
                    markdown += `   - **Impact:** ${issue.impact}\n`
                    markdown += `   - **Suggestion:** ${issue.suggestion}\n`
                    if (issue.codeReference) {
                        markdown += `   - **Code:** \`${issue.codeReference}\`\n`
                    }
                    markdown += `\n`
                })
            }

            if (minor.length > 0) {
                markdown += `### 🟡 Minor (${minor.length})\n\n`
                minor.forEach((issue, index) => {
                    markdown += `${index + 1}. **${issue.criterion}**: ${issue.description}\n`
                    markdown += `   - **Impact:** ${issue.impact}\n`
                    markdown += `   - **Suggestion:** ${issue.suggestion}\n`
                    if (issue.codeReference) {
                        markdown += `   - **Code:** \`${issue.codeReference}\`\n`
                    }
                    markdown += `\n`
                })
            }
        } else {
            markdown += `## ✅ No Issues Found\n\nThis component meets all evaluated accessibility criteria!\n\n`
        }

        if (component.recommendations.length > 0) {
            markdown += `## 💡 Recommendations\n\n`
            component.recommendations.forEach((recommendation, index) => {
                markdown += `${index + 1}. ${recommendation}\n`
            })
            markdown += `\n`
        }

        markdown += `## Detailed Evaluation\n\n`

        markdown += `### Keyboard Navigation (${component.keyboardNavigation.score}%)\n\n`
        markdown += `| Aspect | Status |\n`
        markdown += `|--------|--------|\n`
        markdown += `| Tab Order | ${this.getStatusEmoji(component.keyboardNavigation.tabOrder)} ${component.keyboardNavigation.tabOrder} |\n`
        markdown += `| Focus Management | ${this.getStatusEmoji(component.keyboardNavigation.focusManagement)} ${component.keyboardNavigation.focusManagement} |\n`
        markdown += `| Keyboard Shortcuts | ${this.getStatusEmoji(component.keyboardNavigation.keyboardShortcuts)} ${component.keyboardNavigation.keyboardShortcuts} |\n`
        markdown += `| Trap Focus | ${this.getStatusEmoji(component.keyboardNavigation.trapFocus)} ${component.keyboardNavigation.trapFocus} |\n`
        markdown += `| Escape Key | ${this.getStatusEmoji(component.keyboardNavigation.escapeKey)} ${component.keyboardNavigation.escapeKey} |\n\n`
        if (component.keyboardNavigation.notes.length > 0) {
            markdown += `**Notes:**\n`
            component.keyboardNavigation.notes.forEach((note) => {
                markdown += `- ${note}\n`
            })
            markdown += `\n`
        }

        markdown += `### Screen Reader Support (${component.screenReaderSupport.score}%)\n\n`
        markdown += `| Aspect | Status |\n`
        markdown += `|--------|--------|\n`
        markdown += `| ARIA Labels | ${this.getStatusEmoji(component.screenReaderSupport.ariaLabels)} ${component.screenReaderSupport.ariaLabels} |\n`
        markdown += `| ARIA Descriptions | ${this.getStatusEmoji(component.screenReaderSupport.ariaDescriptions)} ${component.screenReaderSupport.ariaDescriptions} |\n`
        markdown += `| Role Usage | ${this.getStatusEmoji(component.screenReaderSupport.roleUsage)} ${component.screenReaderSupport.roleUsage} |\n`
        markdown += `| Live Regions | ${this.getStatusEmoji(component.screenReaderSupport.liveRegions)} ${component.screenReaderSupport.liveRegions} |\n`
        markdown += `| Semantic HTML | ${this.getStatusEmoji(component.screenReaderSupport.semanticHTML)} ${component.screenReaderSupport.semanticHTML} |\n`
        markdown += `| Announcements | ${this.getStatusEmoji(component.screenReaderSupport.announcements)} ${component.screenReaderSupport.announcements} |\n\n`
        if (component.screenReaderSupport.notes.length > 0) {
            markdown += `**Notes:**\n`
            component.screenReaderSupport.notes.forEach((note) => {
                markdown += `- ${note}\n`
            })
            markdown += `\n`
        }

        markdown += `### Visual Accessibility (${component.visualAccessibility.score}%)\n\n`
        markdown += `| Aspect | Status |\n`
        markdown += `|--------|--------|\n`
        markdown += `| Color Contrast | ${this.getStatusEmoji(component.visualAccessibility.colorContrast)} ${component.visualAccessibility.colorContrast} |\n`
        markdown += `| Font Size | ${this.getStatusEmoji(component.visualAccessibility.fontSize)} ${component.visualAccessibility.fontSize} |\n`
        markdown += `| Focus Indicators | ${this.getStatusEmoji(component.visualAccessibility.focusIndicators)} ${component.visualAccessibility.focusIndicators} |\n`
        markdown += `| Reduced Motion | ${this.getStatusEmoji(component.visualAccessibility.reducedMotion)} ${component.visualAccessibility.reducedMotion} |\n`
        markdown += `| High Contrast | ${this.getStatusEmoji(component.visualAccessibility.highContrast)} ${component.visualAccessibility.highContrast} |\n`
        markdown += `| Text Spacing | ${this.getStatusEmoji(component.visualAccessibility.textSpacing)} ${component.visualAccessibility.textSpacing} |\n\n`
        if (component.visualAccessibility.notes.length > 0) {
            markdown += `**Notes:**\n`
            component.visualAccessibility.notes.forEach((note) => {
                markdown += `- ${note}\n`
            })
            markdown += `\n`
        }

        markdown += `### ARIA Compliance (${component.ariaCompliance.score}%)\n\n`
        markdown += `| Aspect | Status |\n`
        markdown += `|--------|--------|\n`
        markdown += `| ARIA Roles | ${this.getStatusEmoji(component.ariaCompliance.ariaRoles)} ${component.ariaCompliance.ariaRoles} |\n`
        markdown += `| ARIA States | ${this.getStatusEmoji(component.ariaCompliance.ariaStates)} ${component.ariaCompliance.ariaStates} |\n`
        markdown += `| ARIA Properties | ${this.getStatusEmoji(component.ariaCompliance.ariaProperties)} ${component.ariaCompliance.ariaProperties} |\n`
        markdown += `| Design Pattern | ${this.getStatusEmoji(component.ariaCompliance.designPattern)} ${component.ariaCompliance.designPattern} |\n`
        markdown += `| Landmark Regions | ${this.getStatusEmoji(component.ariaCompliance.landmarkRegions)} ${component.ariaCompliance.landmarkRegions} |\n\n`
        if (component.ariaCompliance.notes.length > 0) {
            markdown += `**Notes:**\n`
            component.ariaCompliance.notes.forEach((note) => {
                markdown += `- ${note}\n`
            })
            markdown += `\n`
        }

        markdown += `## WCAG Criteria Evaluation\n\n`

        const evaluationsByLevel = {
            [WCAGLevel.A]: component.evaluations.filter((e) => {
                const criterion = WCAG_CRITERIA.find(
                    (c) => c.id === e.criterionId
                )
                return criterion?.level === WCAGLevel.A
            }),
            [WCAGLevel.AA]: component.evaluations.filter((e) => {
                const criterion = WCAG_CRITERIA.find(
                    (c) => c.id === e.criterionId
                )
                return criterion?.level === WCAGLevel.AA
            }),
            [WCAGLevel.AAA]: component.evaluations.filter((e) => {
                const criterion = WCAG_CRITERIA.find(
                    (c) => c.id === e.criterionId
                )
                return criterion?.level === WCAGLevel.AAA
            }),
        }

        Object.entries(evaluationsByLevel).forEach(([level, evaluations]) => {
            markdown += `### Level ${level}\n\n`
            markdown += `| Criterion | Name | Status | Notes |\n`
            markdown += `|-----------|------|--------|-------|\n`

            evaluations.forEach((evaluation) => {
                const criterion = WCAG_CRITERIA.find(
                    (c) => c.id === evaluation.criterionId
                )
                if (criterion) {
                    const statusEmoji = this.getStatusEmoji(evaluation.status)
                    markdown += `| [${criterion.number}](${criterion.wcagUrl}) | ${criterion.name} | ${statusEmoji} ${evaluation.status} | ${evaluation.notes} |\n`
                }
            })
            markdown += `\n`
        })

        markdown += `---\n\n`
        markdown += `[← Back to Dashboard](../dashboard.md)\n`

        return markdown
    }

    generateAll(): void {
        this.generateDashboard()
        this.generateComponentDocs()
        console.log(
            `\n✅ All accessibility reports generated in: ${this.outputDir}\n`
        )
    }
}
