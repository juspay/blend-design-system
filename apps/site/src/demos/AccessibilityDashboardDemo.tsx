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
import buttonMetrics from './accesiblity/button-metrics.json'
import tabsMetrics from './accesiblity/tabs-metrics.json'
import modalMetrics from './accesiblity/modal-metrics.json'
import textinputMetrics from './accesiblity/textinput-metrics.json'
import searchinputMetrics from './accesiblity/searchinput-metrics.json'
import numberinputMetrics from './accesiblity/numberinput-metrics.json'

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

    const renderValidationGuide = () => (
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
                        Accessibility Metrics Validation Guide
                    </Text>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        onClick={() => setSelectedComponent('overview')}
                        text="← Back to Overview"
                    />
                </Block>
                <Text
                    variant="body.md"
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Understanding how our accessibility scores are calculated
                    and validated
                </Text>
            </Block>

            {/* Important Warning */}
            <Block
                padding={FOUNDATION_THEME.unit[20]}
                backgroundColor={FOUNDATION_THEME.colors.orange[50]}
                borderRadius={FOUNDATION_THEME.unit[8]}
                border={`2px solid ${FOUNDATION_THEME.colors.orange[200]}`}
                marginBottom={FOUNDATION_THEME.unit[24]}
            >
                <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.orange[900]}
                    >
                        ⚠️ Current Limitations
                    </Text>
                </Block>
                <Text
                    variant="body.md"
                    color={FOUNDATION_THEME.colors.orange[900]}
                >
                    The accessibility scores in these reports are based on code
                    analysis and automated testing. They MUST be validated with
                    real testing before being considered accurate.
                </Text>
            </Block>

            {/* What Reports Are Based On */}
            <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                    <Text variant="heading.lg" fontWeight={600}>
                        What the Reports Are Based On
                    </Text>
                </Block>
                <Block display="grid" gap={FOUNDATION_THEME.unit[12]}>
                    {[
                        {
                            text: 'Code review - Component implementation analysis',
                            validated: true,
                        },
                        {
                            text: 'Automated tests - jest-axe test results',
                            validated: true,
                        },
                        {
                            text: 'WCAG mapping - Theoretical compliance based on features',
                            validated: true,
                        },
                        {
                            text: 'NOT based on actual screen reader testing',
                            validated: false,
                        },
                        {
                            text: 'NOT based on real user testing',
                            validated: false,
                        },
                        {
                            text: 'NOT validated by accessibility experts',
                            validated: false,
                        },
                    ].map((item, index) => (
                        <Block
                            key={index}
                            display="flex"
                            alignItems="center"
                            gap={FOUNDATION_THEME.unit[12]}
                            padding={FOUNDATION_THEME.unit[12]}
                            backgroundColor={
                                item.validated
                                    ? FOUNDATION_THEME.colors.green[50]
                                    : FOUNDATION_THEME.colors.red[50]
                            }
                            borderRadius={FOUNDATION_THEME.unit[6]}
                        >
                            <Text
                                variant="heading.md"
                                color={
                                    item.validated
                                        ? FOUNDATION_THEME.colors.green[700]
                                        : FOUNDATION_THEME.colors.red[700]
                                }
                            >
                                {item.validated ? '✅' : '❌'}
                            </Text>
                            <Text
                                variant="body.md"
                                color={
                                    item.validated
                                        ? FOUNDATION_THEME.colors.green[900]
                                        : FOUNDATION_THEME.colors.red[900]
                                }
                            >
                                {item.text}
                            </Text>
                        </Block>
                    ))}
                </Block>
            </Block>

            {/* Confidence Levels */}
            <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                    <Text variant="heading.lg" fontWeight={600}>
                        Confidence Levels
                    </Text>
                </Block>
                <Block display="grid" gap={FOUNDATION_THEME.unit[12]}>
                    {[
                        {
                            category: 'Automated tests (jest-axe)',
                            level: 'HIGH',
                            description: 'Actually run',
                        },
                        {
                            category: 'Code-based evaluation',
                            level: 'MEDIUM',
                            description: 'Theoretical',
                        },
                        {
                            category: 'Screen reader support',
                            level: 'LOW',
                            description: 'NOT tested',
                        },
                        {
                            category: 'Color contrast',
                            level: 'LOW',
                            description: 'NOT measured',
                        },
                        {
                            category: 'Touch targets',
                            level: 'LOW',
                            description: 'NOT measured',
                        },
                    ].map((item, index) => {
                        const levelBgColor =
                            item.level === 'HIGH'
                                ? FOUNDATION_THEME.colors.green[100]
                                : item.level === 'MEDIUM'
                                  ? FOUNDATION_THEME.colors.yellow[100]
                                  : FOUNDATION_THEME.colors.red[100]
                        const levelTextColor =
                            item.level === 'HIGH'
                                ? FOUNDATION_THEME.colors.green[700]
                                : item.level === 'MEDIUM'
                                  ? FOUNDATION_THEME.colors.yellow[700]
                                  : FOUNDATION_THEME.colors.red[700]
                        return (
                            <Block
                                key={index}
                                padding={FOUNDATION_THEME.unit[16]}
                                backgroundColor={
                                    FOUNDATION_THEME.colors.gray[50]
                                }
                                borderRadius={FOUNDATION_THEME.unit[8]}
                                border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                            >
                                <Block
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    marginBottom={FOUNDATION_THEME.unit[8]}
                                >
                                    <Text variant="body.md" fontWeight={600}>
                                        {item.category}
                                    </Text>
                                    <Block
                                        padding={`${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[12]}`}
                                        backgroundColor={levelBgColor}
                                        borderRadius={FOUNDATION_THEME.unit[4]}
                                    >
                                        <Text
                                            variant="body.sm"
                                            fontWeight={700}
                                            color={levelTextColor}
                                        >
                                            {item.level}
                                        </Text>
                                    </Block>
                                </Block>
                                <Text
                                    variant="body.sm"
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                >
                                    {item.description}
                                </Text>
                            </Block>
                        )
                    })}
                </Block>
            </Block>

            {/* Validation Phases */}
            <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                    <Text variant="heading.lg" fontWeight={600}>
                        🧪 Validation Checklist
                    </Text>
                </Block>

                {/* Phase 1: Automated */}
                <Block marginBottom={FOUNDATION_THEME.unit[24]}>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.primary[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.primary[900]}
                        >
                            Phase 1: Automated Validation (Do This First)
                        </Text>
                    </Block>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                    >
                        <ul
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                            }}
                        >
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Run Existing Tests:</strong> Execute
                                    component accessibility tests (jest-axe)
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Color Contrast Validation:</strong>{' '}
                                    Use WebAIM Contrast Checker, Stark Plugin,
                                    or Chrome DevTools to verify 4.5:1 (AA) or
                                    7:1 (AAA) ratios
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Touch Target Measurements:</strong>{' '}
                                    Use Chrome/Firefox DevTools to verify
                                    24×24px (AA) or 44×44px (AAA) minimum sizes
                                </Text>
                            </li>
                        </ul>
                    </Block>
                </Block>

                {/* Phase 2: Screen Reader */}
                <Block marginBottom={FOUNDATION_THEME.unit[24]}>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.primary[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.primary[900]}
                        >
                            Phase 2: Screen Reader Testing (Critical)
                        </Text>
                    </Block>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                    >
                        <Block display="grid" gap={FOUNDATION_THEME.unit[12]}>
                            {[
                                {
                                    name: 'NVDA (Windows - Free)',
                                    url: 'https://www.nvaccess.org/download/',
                                    notes: 'Most popular free screen reader',
                                },
                                {
                                    name: 'JAWS (Windows - Paid)',
                                    url: 'https://www.freedomscientific.com/products/software/jaws/',
                                    notes: 'Industry standard, enterprise use',
                                },
                                {
                                    name: 'VoiceOver (macOS/iOS - Built-in)',
                                    url: 'Cmd + F5 to activate',
                                    notes: 'Apple ecosystem testing',
                                },
                                {
                                    name: 'TalkBack (Android - Built-in)',
                                    url: 'Settings > Accessibility',
                                    notes: 'Mobile Android testing',
                                },
                            ].map((sr, index) => (
                                <Block
                                    key={index}
                                    padding={FOUNDATION_THEME.unit[12]}
                                    backgroundColor="#FFFFFF"
                                    borderRadius={FOUNDATION_THEME.unit[6]}
                                    border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                >
                                    <Block
                                        marginBottom={FOUNDATION_THEME.unit[4]}
                                    >
                                        <Text
                                            variant="body.md"
                                            fontWeight={600}
                                        >
                                            {sr.name}
                                        </Text>
                                    </Block>
                                    <Block
                                        marginBottom={FOUNDATION_THEME.unit[4]}
                                    >
                                        <Text
                                            variant="body.sm"
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[600]
                                            }
                                        >
                                            {sr.notes}
                                        </Text>
                                    </Block>
                                    <Text
                                        variant="body.xs"
                                        color={
                                            FOUNDATION_THEME.colors.primary[600]
                                        }
                                    >
                                        {sr.url}
                                    </Text>
                                </Block>
                            ))}
                        </Block>
                    </Block>
                </Block>

                {/* Phase 3: Browser Testing */}
                <Block marginBottom={FOUNDATION_THEME.unit[24]}>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.primary[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.primary[900]}
                        >
                            Phase 3: Browser Testing
                        </Text>
                    </Block>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                    >
                        <ul
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                            }}
                        >
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Keyboard Navigation:</strong> Test
                                    Tab, Enter, Space in Chrome, Firefox,
                                    Safari, Edge
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>High Contrast Mode:</strong> Windows
                                    High Contrast Mode (Alt + Left Shift + Print
                                    Screen)
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Zoom Testing:</strong> Verify 100%,
                                    200%, 400% zoom levels
                                </Text>
                            </li>
                        </ul>
                    </Block>
                </Block>

                {/* Phase 4: Real User Testing */}
                <Block marginBottom={FOUNDATION_THEME.unit[24]}>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.green[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.green[900]}
                        >
                            Phase 4: Real User Testing (Gold Standard)
                        </Text>
                    </Block>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                    >
                        <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                            <Text variant="body.md">
                                Test with at least 2-3 participants from each
                                group:
                            </Text>
                        </Block>
                        <ul
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                            }}
                        >
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Screen reader users:</strong> Blind
                                    users who rely on screen readers
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Low vision users:</strong> Users who
                                    need magnification or have color blindness
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Motor disability users:</strong>{' '}
                                    Keyboard-only or switch control users
                                </Text>
                            </li>
                        </ul>
                    </Block>
                </Block>
            </Block>

            {/* Important Reminder */}
            <Block
                padding={FOUNDATION_THEME.unit[20]}
                backgroundColor={FOUNDATION_THEME.colors.primary[50]}
                borderRadius={FOUNDATION_THEME.unit[8]}
                border={`2px solid ${FOUNDATION_THEME.colors.primary[200]}`}
            >
                <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.primary[900]}
                    >
                        📝 Remember
                    </Text>
                </Block>
                <Text
                    variant="body.md"
                    color={FOUNDATION_THEME.colors.primary[900]}
                >
                    A 96% score is only meaningful if validated. An honest 80%
                    validated score is better than an inflated 96% unvalidated
                    score.
                </Text>
            </Block>
        </Block>
    )

    const renderMethodology = () => (
        <Block>
            <Block marginBottom={FOUNDATION_THEME.unit[24]}>
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={FOUNDATION_THEME.unit[12]}
                >
                    <Text variant="heading.xl" fontWeight={700}>
                        Methodology & Accuracy
                    </Text>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        onClick={() => setSelectedComponent('overview')}
                        text="← Back to Overview"
                    />
                </Block>
                <Text
                    variant="body.md"
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    How accessibility reports are generated and what to expect
                </Text>
            </Block>

            <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                    <Text variant="heading.lg" fontWeight={600}>
                        📋 How Reports Are Generated
                    </Text>
                </Block>
                <Block display="grid" gap={FOUNDATION_THEME.unit[16]}>
                    {[
                        {
                            title: 'Code Analysis',
                            description:
                                'Automated analysis of component source code to identify semantic HTML, ARIA attributes, keyboard handlers, and focus management',
                            confidence: 'Primary method',
                        },
                        {
                            title: 'WCAG 2.2 Criteria Mapping',
                            description:
                                'Systematic check of all 73 WCAG criteria (25 Level A, 20 Level AA, 28 Level AAA) against component implementation',
                            confidence: 'Comprehensive',
                        },
                        {
                            title: 'WAI-ARIA Pattern Recognition',
                            description:
                                'Comparison against official WAI-ARIA design patterns (Dialog, Accordion, Tabs, Text Input, etc.)',
                            confidence: 'Pattern-based',
                        },
                        {
                            title: 'Issue Classification',
                            description:
                                'Categorization by severity (Critical/Major/Minor), impact, WCAG criterion, and exact code location',
                            confidence: 'Detailed',
                        },
                    ].map((item, index) => (
                        <Block
                            key={index}
                            padding={FOUNDATION_THEME.unit[16]}
                            backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                            borderRadius={FOUNDATION_THEME.unit[8]}
                            border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                        >
                            <Block marginBottom={FOUNDATION_THEME.unit[8]}>
                                <Text variant="body.md" fontWeight={600}>
                                    {item.title}
                                </Text>
                            </Block>
                            <Block marginBottom={FOUNDATION_THEME.unit[8]}>
                                <Text
                                    variant="body.sm"
                                    color={FOUNDATION_THEME.colors.gray[700]}
                                >
                                    {item.description}
                                </Text>
                            </Block>
                            <Text
                                variant="body.xs"
                                color={FOUNDATION_THEME.colors.primary[600]}
                                fontWeight={600}
                            >
                                {item.confidence}
                            </Text>
                        </Block>
                    ))}
                </Block>
            </Block>

            <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                    <Text variant="heading.lg" fontWeight={600}>
                        🎯 Accuracy Levels
                    </Text>
                </Block>

                <Block marginBottom={FOUNDATION_THEME.unit[20]}>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.green[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.green[900]}
                        >
                            HIGH Confidence (90-95% accurate)
                        </Text>
                    </Block>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor="#FFFFFF"
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        border={`1px solid ${FOUNDATION_THEME.colors.green[200]}`}
                    >
                        <ul
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                            }}
                        >
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Semantic HTML:</strong> Whether
                                    label, input, button elements are used
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>ARIA Attributes:</strong> Presence
                                    of aria-label, aria-describedby, role, etc.
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Keyboard Support:</strong> Tab
                                    order, keyboard event handlers
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Focus Management:</strong> Whether
                                    focus is trapped, returned, or managed
                                </Text>
                            </li>
                        </ul>
                    </Block>
                </Block>

                <Block marginBottom={FOUNDATION_THEME.unit[20]}>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.yellow[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.yellow[900]}
                        >
                            MEDIUM Confidence (70-80% accurate)
                        </Text>
                    </Block>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor="#FFFFFF"
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        border={`1px solid ${FOUNDATION_THEME.colors.yellow[200]}`}
                    >
                        <ul
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                            }}
                        >
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Visual Styling:</strong> Can see CSS
                                    values but cannot visually render
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Animation Behavior:</strong> Can see
                                    animations but cannot verify
                                    prefers-reduced-motion
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Responsive Behavior:</strong> Can
                                    see breakpoint logic but cannot verify
                                    rendering
                                </Text>
                            </li>
                        </ul>
                    </Block>
                </Block>

                <Block marginBottom={FOUNDATION_THEME.unit[20]}>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor={FOUNDATION_THEME.colors.red[50]}
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        marginBottom={FOUNDATION_THEME.unit[12]}
                    >
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.red[900]}
                        >
                            LOW Confidence (40-60% accurate)
                        </Text>
                    </Block>
                    <Block
                        padding={FOUNDATION_THEME.unit[16]}
                        backgroundColor="#FFFFFF"
                        borderRadius={FOUNDATION_THEME.unit[8]}
                        border={`1px solid ${FOUNDATION_THEME.colors.red[200]}`}
                    >
                        <ul
                            style={{
                                paddingLeft: FOUNDATION_THEME.unit[20],
                                margin: 0,
                            }}
                        >
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>
                                        Screen Reader Announcements:
                                    </strong>{' '}
                                    Cannot test with NVDA, JAWS, VoiceOver
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Color Contrast Ratios:</strong>{' '}
                                    Cannot calculate exact 4.5:1 or 7:1 ratios
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Touch Target Sizes:</strong> Cannot
                                    measure rendered pixel dimensions
                                </Text>
                            </li>
                            <li
                                style={{
                                    marginBottom: FOUNDATION_THEME.unit[8],
                                }}
                            >
                                <Text variant="body.md">
                                    <strong>Browser Compatibility:</strong>{' '}
                                    Cannot test across different browsers and
                                    modes
                                </Text>
                            </li>
                        </ul>
                    </Block>
                </Block>
            </Block>

            <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                    <Text variant="heading.lg" fontWeight={600}>
                        📊 How Scores Are Calculated
                    </Text>
                </Block>
                <Block
                    padding={FOUNDATION_THEME.unit[20]}
                    backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                    borderRadius={FOUNDATION_THEME.unit[8]}
                    border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                >
                    <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                        <Text variant="body.md" fontWeight={600}>
                            Overall Component Score
                        </Text>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Average of: Keyboard Navigation (25%) + Screen
                            Reader Support (25%) + Visual Accessibility (25%) +
                            ARIA Compliance (25%)
                        </Text>
                    </Block>
                    <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                        <Text variant="body.md" fontWeight={600}>
                            WCAG Level Scores
                        </Text>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Level A: (Passing A criteria ÷ Total A criteria) ×
                            100
                        </Text>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Level AA: (Passing AA criteria ÷ Total AA criteria)
                            × 100
                        </Text>
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Level AAA: (Passing AAA criteria ÷ Total AAA
                            criteria) × 100
                        </Text>
                    </Block>
                </Block>
            </Block>

            {/* What To Do Next */}
            <Block marginBottom={FOUNDATION_THEME.unit[32]}>
                <Block marginBottom={FOUNDATION_THEME.unit[16]}>
                    <Text variant="heading.lg" fontWeight={600}>
                        ✅ What To Do Next
                    </Text>
                </Block>

                <Block
                    padding={FOUNDATION_THEME.unit[20]}
                    backgroundColor={FOUNDATION_THEME.colors.primary[50]}
                    borderRadius={FOUNDATION_THEME.unit[8]}
                    border={`2px solid ${FOUNDATION_THEME.colors.primary[200]}`}
                    marginBottom={FOUNDATION_THEME.unit[16]}
                >
                    <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.primary[900]}
                        >
                            Trust These Reports For:
                        </Text>
                    </Block>
                    <ul
                        style={{
                            paddingLeft: FOUNDATION_THEME.unit[20],
                            margin: 0,
                        }}
                    >
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.primary[900]}
                            >
                                Code structure issues (missing ARIA, no labels,
                                wrong elements)
                            </Text>
                        </li>
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.primary[900]}
                            >
                                API design flaws (props that should exist but
                                don't)
                            </Text>
                        </li>
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.primary[900]}
                            >
                                Pattern violations (not following WAI-ARIA
                                patterns)
                            </Text>
                        </li>
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.primary[900]}
                            >
                                Issue prioritization (which issues are most
                                critical)
                            </Text>
                        </li>
                    </ul>
                </Block>

                <Block
                    padding={FOUNDATION_THEME.unit[20]}
                    backgroundColor={FOUNDATION_THEME.colors.orange[50]}
                    borderRadius={FOUNDATION_THEME.unit[8]}
                    border={`2px solid ${FOUNDATION_THEME.colors.orange[200]}`}
                    marginBottom={FOUNDATION_THEME.unit[16]}
                >
                    <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                        <Text
                            variant="heading.md"
                            fontWeight={600}
                            color={FOUNDATION_THEME.colors.orange[900]}
                        >
                            Do NOT Trust For:
                        </Text>
                    </Block>
                    <ul
                        style={{
                            paddingLeft: FOUNDATION_THEME.unit[20],
                            margin: 0,
                        }}
                    >
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.orange[900]}
                            >
                                Final verification (always test with real screen
                                readers)
                            </Text>
                        </li>
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.orange[900]}
                            >
                                Exact contrast ratios (use WebAIM Contrast
                                Checker)
                            </Text>
                        </li>
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.orange[900]}
                            >
                                User experience (test with actual users with
                                disabilities)
                            </Text>
                        </li>
                        <li style={{ marginBottom: FOUNDATION_THEME.unit[8] }}>
                            <Text
                                variant="body.md"
                                color={FOUNDATION_THEME.colors.orange[900]}
                            >
                                Browser-specific issues (test across all
                                browsers)
                            </Text>
                        </li>
                    </ul>
                </Block>
            </Block>

            {/* Expected Accuracy */}
            <Block
                padding={FOUNDATION_THEME.unit[20]}
                backgroundColor={FOUNDATION_THEME.colors.primary[50]}
                borderRadius={FOUNDATION_THEME.unit[8]}
                border={`2px solid ${FOUNDATION_THEME.colors.primary[200]}`}
            >
                <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                    <Text
                        variant="heading.md"
                        fontWeight={600}
                        color={FOUNDATION_THEME.colors.primary[900]}
                    >
                        📈 Expected Accuracy
                    </Text>
                </Block>
                <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                    <Text
                        variant="body.md"
                        color={FOUNDATION_THEME.colors.primary[900]}
                    >
                        <strong>Overall Confidence: 70-75%</strong> - These
                        reports catch 70-80% of accessibility issues through
                        code analysis alone.
                    </Text>
                </Block>
                <Block marginBottom={FOUNDATION_THEME.unit[12]}>
                    <Text
                        variant="body.md"
                        color={FOUNDATION_THEME.colors.primary[900]}
                    >
                        <strong>Scores may drop 5-10%</strong> after real screen
                        reader testing and user validation. This is normal and
                        expected.
                    </Text>
                </Block>
                <Text
                    variant="body.md"
                    color={FOUNDATION_THEME.colors.primary[900]}
                >
                    Think of these reports as{' '}
                    <strong>"Phase 0: Code Review"</strong> that identifies
                    major blockers before you even start manual testing.
                    Remaining issues require human testing with assistive
                    technology.
                </Text>
            </Block>
        </Block>
    )

    const renderOverview = () => (
        <Block>
            {/* Validation Guide Banner */}
            <Block
                padding={FOUNDATION_THEME.unit[20]}
                backgroundColor={FOUNDATION_THEME.colors.red[50]}
                borderRadius={FOUNDATION_THEME.unit[12]}
                border={`2px solid ${FOUNDATION_THEME.colors.red[200]}`}
                marginBottom={FOUNDATION_THEME.unit[24]}
                cursor="pointer"
                onClick={() => setSelectedComponent('validation-guide')}
                style={{
                    transition: 'all 0.2s',
                }}
            >
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Block>
                        <Block marginBottom={FOUNDATION_THEME.unit[8]}>
                            <Text
                                variant="heading.lg"
                                fontWeight={700}
                                color={FOUNDATION_THEME.colors.orange[900]}
                            >
                                ⚠️ Validation Required
                            </Text>
                        </Block>
                        <Text
                            variant="body.md"
                            color={FOUNDATION_THEME.colors.orange[800]}
                        >
                            These scores are based on code analysis only. Click
                            here to learn how to validate with real testing.
                        </Text>
                    </Block>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => setSelectedComponent('validation-guide')}
                        text="View Guide →"
                    />
                </Block>
            </Block>

            {/* Methodology Banner */}
            <Block
                padding={FOUNDATION_THEME.unit[20]}
                backgroundColor={FOUNDATION_THEME.colors.primary[50]}
                borderRadius={FOUNDATION_THEME.unit[12]}
                border={`2px solid ${FOUNDATION_THEME.colors.primary[200]}`}
                marginBottom={FOUNDATION_THEME.unit[24]}
                cursor="pointer"
                onClick={() => setSelectedComponent('methodology')}
                style={{
                    transition: 'all 0.2s',
                }}
            >
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Block>
                        <Block marginBottom={FOUNDATION_THEME.unit[8]}>
                            <Text
                                variant="heading.lg"
                                fontWeight={700}
                                color={FOUNDATION_THEME.colors.primary[900]}
                            >
                                📊 How Reports Are Generated
                            </Text>
                        </Block>
                        <Text
                            variant="body.md"
                            color={FOUNDATION_THEME.colors.primary[800]}
                        >
                            Learn how accessibility scores are calculated and
                            what accuracy to expect.
                        </Text>
                    </Block>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => setSelectedComponent('methodology')}
                        text="View Methodology →"
                    />
                </Block>
            </Block>

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
        } else if (componentName === 'Button') {
            metrics = buttonMetrics
        } else if (componentName === 'Tabs') {
            metrics = tabsMetrics
        } else if (componentName === 'Modal') {
            metrics = modalMetrics
        } else if (componentName === 'TextInput') {
            metrics = textinputMetrics
        } else if (componentName === 'SearchInput') {
            metrics = searchinputMetrics
        } else if (componentName === 'NumberInput') {
            metrics = numberinputMetrics
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
                        text="← Back to Overview"
                    />
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
                            text="← Back to Overview"
                        />
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
                                                    .primary[900]
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
                    : selectedComponent === 'validation-guide'
                      ? renderValidationGuide()
                      : selectedComponent === 'methodology'
                        ? renderMethodology()
                        : renderComponentDetail(selectedComponent)}
            </Block>
        </Block>
    )
}

export default AccessibilityDashboardDemo
