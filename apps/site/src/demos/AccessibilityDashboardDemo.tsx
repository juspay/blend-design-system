import { useState } from 'react'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { Button } from '../../../../packages/blend/lib/components/Button'
import {
    ButtonType,
    ButtonSize,
} from '../../../../packages/blend/lib/components/Button/types'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import dashboardData from '../../../../docs/accessibility/dashboard.json'
import accordionMetrics from '../../../../scripts/accessibility/accordion-metrics.json'
import sidebarMetrics from '../../../../scripts/accessibility/sidebar-metrics.json'

const AccessibilityDashboardDemo = () => {
    const [selectedComponent, setSelectedComponent] =
        useState<string>('overview')

    const getScoreColor = (score: number) => {
        if (score >= 95) return FOUNDATION_THEME.colors.green[600]
        if (score >= 90) return FOUNDATION_THEME.colors.primary[600]
        if (score >= 85) return FOUNDATION_THEME.colors.red[600]
        return FOUNDATION_THEME.colors.red[600]
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical':
                return {
                    bg: FOUNDATION_THEME.colors.red[50],
                    text: FOUNDATION_THEME.colors.red[700],
                }
            case 'major':
                return {
                    bg: FOUNDATION_THEME.colors.orange[50],
                    text: FOUNDATION_THEME.colors.orange[700],
                }
            case 'minor':
                return {
                    bg: FOUNDATION_THEME.colors.yellow[50],
                    text: FOUNDATION_THEME.colors.yellow[700],
                }
            default:
                return {
                    bg: FOUNDATION_THEME.colors.gray[50],
                    text: FOUNDATION_THEME.colors.gray[700],
                }
        }
    }

    const renderOverview = () => (
        <Block>
            {/* Summary Cards */}
            <Block
                display="grid"
                gap={FOUNDATION_THEME.unit[16]}
                marginBottom={FOUNDATION_THEME.unit[24]}
            >
                <div>
                    <Text color={FOUNDATION_THEME.colors.gray[600]}>
                        Components Evaluated
                    </Text>
                    <Text
                        variant="heading.2xl"
                        fontWeight={700}
                        color={FOUNDATION_THEME.colors.gray[900]}
                    >
                        {dashboardData.summary.totalComponents}
                    </Text>
                </div>

                <div>
                    <Text color={FOUNDATION_THEME.colors.gray[600]}>
                        Average Score
                    </Text>
                    <Text
                        variant="heading.2xl"
                        fontWeight={700}
                        color={getScoreColor(
                            dashboardData.summary.averageScore
                        )}
                    >
                        {dashboardData.summary.averageScore}%
                    </Text>
                </div>

                <div
                // style={{
                //     padding: FOUNDATION_THEME.unit[20],
                //     border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                // }}
                >
                    <Text color={FOUNDATION_THEME.colors.gray[600]}>
                        Issues Found
                    </Text>
                    <Block
                        display="flex"
                        gap={FOUNDATION_THEME.unit[12]}
                        alignItems="center"
                    >
                        <Text
                            variant="heading.2xl"
                            fontWeight={700}
                            color={FOUNDATION_THEME.colors.red[600]}
                        >
                            {dashboardData.summary.criticalIssues}
                        </Text>
                        <Text
                            variant="heading.2xl"
                            fontWeight={700}
                            color={FOUNDATION_THEME.colors.orange[600]}
                        >
                            {dashboardData.summary.majorIssues}
                        </Text>
                        <Text
                            variant="heading.2xl"
                            fontWeight={700}
                            color={FOUNDATION_THEME.colors.yellow[600]}
                        >
                            {dashboardData.summary.minorIssues}
                        </Text>
                    </Block>
                    <Block
                        display="flex"
                        gap={FOUNDATION_THEME.unit[12]}
                        marginTop={FOUNDATION_THEME.unit[4]}
                    >
                        <Text color={FOUNDATION_THEME.colors.red[600]}>
                            Critical
                        </Text>
                        <Text color={FOUNDATION_THEME.colors.orange[600]}>
                            Major
                        </Text>
                        <Text color={FOUNDATION_THEME.colors.yellow[600]}>
                            Minor
                        </Text>
                    </Block>
                </div>
            </Block>

            {/* WCAG Compliance */}
            <div>
                <Text variant="heading.lg" fontWeight={600}>
                    WCAG 2.2 Compliance
                </Text>
                <Block display="grid" gap={FOUNDATION_THEME.unit[16]}>
                    {[
                        {
                            level: 'Level A',
                            score: dashboardData.summary.levelACompliance,
                        },
                        {
                            level: 'Level AA',
                            score: dashboardData.summary.levelAACompliance,
                        },
                        {
                            level: 'Level AAA',
                            score: dashboardData.summary.levelAAACompliance,
                        },
                    ].map(({ level, score }) => (
                        <Block key={level}>
                            <Block
                                display="flex"
                                justifyContent="space-between"
                                marginBottom={FOUNDATION_THEME.unit[8]}
                            >
                                <Text fontWeight={600}>{level}</Text>
                                <Text
                                    fontWeight={600}
                                    color={getScoreColor(score)}
                                >
                                    {score}%
                                </Text>
                            </Block>
                            <Block
                                height={FOUNDATION_THEME.unit[8]}
                                backgroundColor={
                                    FOUNDATION_THEME.colors.gray[200]
                                }
                                borderRadius={FOUNDATION_THEME.unit[4]}
                                overflow="hidden"
                            >
                                <Block
                                    height="100%"
                                    width={`${score}%`}
                                    backgroundColor={getScoreColor(score)}
                                    transition="width 0.3s ease"
                                />
                            </Block>
                        </Block>
                    ))}
                </Block>
            </div>

            {/* Components List */}
            <div>
                <Text variant="heading.lg" fontWeight={600}>
                    Components
                </Text>
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={FOUNDATION_THEME.unit[12]}
                >
                    {dashboardData.components.map((component) => (
                        <Block
                            key={component.componentName}
                            padding={FOUNDATION_THEME.unit[16]}
                            backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                            borderRadius={FOUNDATION_THEME.unit[8]}
                            cursor="pointer"
                            onClick={() =>
                                setSelectedComponent(component.componentName)
                            }
                            style={{
                                transition: 'all 0.2s',
                                border:
                                    selectedComponent ===
                                    component.componentName
                                        ? `2px solid ${FOUNDATION_THEME.colors.primary[500]}`
                                        : `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                            }}
                        >
                            <Block
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Text variant="body.md" fontWeight={600}>
                                    {component.componentName}
                                </Text>
                                <Block
                                    display="flex"
                                    gap={FOUNDATION_THEME.unit[16]}
                                    alignItems="center"
                                >
                                    <Text
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                    >
                                        A: {component.levelAScore}%
                                    </Text>
                                    <Text
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                    >
                                        AA: {component.levelAAScore}%
                                    </Text>
                                    <Text
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                    >
                                        AAA: {component.levelAAAScore}%
                                    </Text>
                                    <Text
                                        variant="heading.md"
                                        fontWeight={700}
                                        color={getScoreColor(
                                            component.overallScore
                                        )}
                                    >
                                        {component.overallScore}%
                                    </Text>
                                </Block>
                            </Block>
                        </Block>
                    ))}
                </Block>
            </div>
        </Block>
    )

    const renderComponentDetail = (componentName: string) => {
        const component = dashboardData.components.find(
            (c) => c.componentName === componentName
        )
        if (!component) return null

        // Load the actual metrics dynamically based on component name
        let metrics = null
        if (componentName === 'Accordion') {
            metrics = accordionMetrics
        } else if (componentName === 'Sidebar') {
            metrics = sidebarMetrics
        }
        // Add more components here as they're evaluated

        if (!metrics) {
            return (
                <Block padding={FOUNDATION_THEME.unit[32]} textAlign="center">
                    <Text variant="heading.lg">
                        Component Not Yet Evaluated
                    </Text>
                    <Text
                        variant="body.md"
                        color={FOUNDATION_THEME.colors.gray[600]}
                    >
                        {componentName} has not been evaluated yet. Please run
                        the accessibility evaluation first.
                    </Text>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => setSelectedComponent('overview')}
                    >
                        ← Back to Overview
                    </Button>
                </Block>
            )
        }

        return (
            <Block>
                {/* Header */}
                <Block marginBottom={FOUNDATION_THEME.unit[24]}>
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text variant="heading.xl" fontWeight={700}>
                            {componentName}
                        </Text>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            onClick={() => setSelectedComponent('overview')}
                        >
                            ← Back to Overview
                        </Button>
                    </Block>
                    <Text
                        variant="body.sm"
                        color={FOUNDATION_THEME.colors.gray[600]}
                    >
                        Version {metrics.version} • Evaluated{' '}
                        {new Date(metrics.evaluationDate).toLocaleDateString()}
                    </Text>
                </Block>

                {/* Score Summary */}
                <div>
                    <Text variant="heading.lg" fontWeight={600}>
                        Overall Score
                    </Text>
                    <Text
                        fontWeight={700}
                        color={getScoreColor(metrics.overallScore)}
                    >
                        {metrics.overallScore}%
                    </Text>
                    <Block
                        display="grid"
                        gap={FOUNDATION_THEME.unit[16]}
                        marginTop={FOUNDATION_THEME.unit[16]}
                    >
                        <Block>
                            <Text color={FOUNDATION_THEME.colors.gray[600]}>
                                Level A
                            </Text>
                            <Text fontWeight={600}>{metrics.levelAScore}%</Text>
                        </Block>
                        <Block>
                            <Text color={FOUNDATION_THEME.colors.gray[600]}>
                                Level AA
                            </Text>
                            <Text variant="heading.md" fontWeight={600}>
                                {metrics.levelAAScore}%
                            </Text>
                        </Block>
                        <Block>
                            <Text color={FOUNDATION_THEME.colors.gray[600]}>
                                Level AAA
                            </Text>
                            <Text variant="heading.md" fontWeight={600}>
                                {metrics.levelAAAScore}%
                            </Text>
                        </Block>
                    </Block>
                </div>

                {/* Category Scores */}
                <div>
                    <Text variant="heading.lg" fontWeight={600}>
                        Category Scores
                    </Text>
                    <Block display="grid" gap={FOUNDATION_THEME.unit[16]}>
                        {[
                            {
                                name: 'Keyboard Navigation',
                                score: metrics.keyboardNavigation.score,
                            },
                            {
                                name: 'Screen Reader Support',
                                score: metrics.screenReaderSupport.score,
                            },
                            {
                                name: 'Visual Accessibility',
                                score: metrics.visualAccessibility.score,
                            },
                            {
                                name: 'ARIA Compliance',
                                score: metrics.ariaCompliance.score,
                            },
                        ].map(({ name, score }) => (
                            <Block key={name}>
                                <Block
                                    display="flex"
                                    justifyContent="space-between"
                                    marginBottom={FOUNDATION_THEME.unit[8]}
                                >
                                    <Text variant="body.sm" fontWeight={500}>
                                        {name}
                                    </Text>
                                    <Text
                                        variant="body.sm"
                                        fontWeight={600}
                                        color={getScoreColor(score)}
                                    >
                                        {score}%
                                    </Text>
                                </Block>
                                <Block
                                    height={FOUNDATION_THEME.unit[8]}
                                    backgroundColor={
                                        FOUNDATION_THEME.colors.gray[200]
                                    }
                                    borderRadius={FOUNDATION_THEME.unit[4]}
                                    overflow="hidden"
                                >
                                    <Block
                                        height="100%"
                                        width={`${score}%`}
                                        backgroundColor={getScoreColor(score)}
                                    />
                                </Block>
                            </Block>
                        ))}
                    </Block>
                </div>

                {/* Strengths */}
                {metrics.strengths.length > 0 && (
                    <div>
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.green[800]}
                        >
                            ✨ Strengths
                        </Text>
                        <ul
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                                listStyle: 'disc',
                            }}
                        >
                            {metrics.strengths.map((strength, index) => (
                                <li
                                    key={index}
                                    style={{
                                        marginBottom: FOUNDATION_THEME.unit[8],
                                    }}
                                >
                                    <Text
                                        variant="body.sm"
                                        color={
                                            FOUNDATION_THEME.colors.green[900]
                                        }
                                    >
                                        {strength}
                                    </Text>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Issues */}
                {metrics.issuesFound.length > 0 && (
                    <div>
                        <Text variant="heading.md" fontWeight={600}>
                            Issues Found ({metrics.issuesFound.length})
                        </Text>
                        <Block
                            display="flex"
                            flexDirection="column"
                            gap={FOUNDATION_THEME.unit[12]}
                        >
                            {metrics.issuesFound.map((issue, index) => {
                                const colors = getSeverityColor(issue.severity)
                                return (
                                    <Block
                                        key={index}
                                        padding={FOUNDATION_THEME.unit[16]}
                                        backgroundColor={colors.bg}
                                        borderRadius={FOUNDATION_THEME.unit[8]}
                                        border={`1px solid ${colors.text}`}
                                    >
                                        <Block
                                            display="flex"
                                            justifyContent="space-between"
                                            marginBottom={
                                                FOUNDATION_THEME.unit[8]
                                            }
                                        >
                                            <Text
                                                fontWeight={600}
                                                color={colors.text}
                                                textTransform="uppercase"
                                            >
                                                {issue.severity}
                                            </Text>
                                            <Text
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[600]
                                                }
                                            >
                                                {issue.criterion}
                                            </Text>
                                        </Block>
                                        <Text
                                            variant="body.sm"
                                            fontWeight={600}
                                        >
                                            {issue.description}
                                        </Text>
                                        <Text
                                            variant="body.sm"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[700]
                                            }
                                        >
                                            <strong>Impact:</strong>{' '}
                                            {issue.impact}
                                        </Text>
                                        <Text
                                            variant="body.sm"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[700]
                                            }
                                        >
                                            <strong>Suggestion:</strong>{' '}
                                            {issue.suggestion}
                                        </Text>
                                        {issue.codeReference && (
                                            <Text
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[600]
                                                }
                                            >
                                                📍 {issue.codeReference}
                                            </Text>
                                        )}
                                    </Block>
                                )
                            })}
                        </Block>
                    </div>
                )}

                {/* Recommendations */}
                {metrics.recommendations.length > 0 && (
                    <div>
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.primary[800]}
                        >
                            💡 Recommendations
                        </Text>
                        <ol
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                            }}
                        >
                            {metrics.recommendations.map(
                                (recommendation, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            marginBottom:
                                                FOUNDATION_THEME.unit[8],
                                        }}
                                    >
                                        <Text
                                            variant="body.sm"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .blue[900]
                                            }
                                        >
                                            {recommendation}
                                        </Text>
                                    </li>
                                )
                            )}
                        </ol>
                    </div>
                )}
            </Block>
        )
    }

    return (
        <Block
            padding={FOUNDATION_THEME.unit[32]}
            backgroundColor={FOUNDATION_THEME.colors.gray[50]}
            minHeight="100vh"
        >
            <Block maxWidth="1200px" margin="0 auto">
                <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                    <Text variant="heading.2xl" fontWeight={700}>
                        Accessibility Dashboard
                    </Text>
                    <Text
                        variant="body.md"
                        color={FOUNDATION_THEME.colors.gray[600]}
                    >
                        WCAG 2.2 Level AAA Compliance Metrics
                    </Text>
                </Block>

                {selectedComponent === 'overview'
                    ? renderOverview()
                    : renderComponentDetail(selectedComponent)}
            </Block>
        </Block>
    )
}

export default AccessibilityDashboardDemo
