export enum WCAGLevel {
    A = 'A',
    AA = 'AA',
    AAA = 'AAA',
}

export enum WCAGPrinciple {
    PERCEIVABLE = 'Perceivable',
    OPERABLE = 'Operable',
    UNDERSTANDABLE = 'Understandable',
    ROBUST = 'Robust',
}

export enum ComplianceStatus {
    PASS = 'pass',
    FAIL = 'fail',
    PARTIAL = 'partial',
    NOT_APPLICABLE = 'not-applicable',
    NEEDS_REVIEW = 'needs-review',
}

export interface WCAGCriterion {
    id: string
    number: string
    name: string
    level: WCAGLevel
    principle: WCAGPrinciple
    description: string
    wcagUrl: string
    checkpoints: string[]
}

export interface CriterionEvaluation {
    criterionId: string
    status: ComplianceStatus
    notes: string
    evidence?: string[]
    codeReferences?: string[]
}

export interface ComponentAccessibilityMetrics {
    componentName: string
    version: string
    evaluationDate: string
    evaluator?: string
    overallScore: number
    levelAScore: number
    levelAAScore: number
    levelAAAScore: number
    evaluations: CriterionEvaluation[]
    keyboardNavigation: KeyboardNavigationMetrics
    screenReaderSupport: ScreenReaderMetrics
    visualAccessibility: VisualAccessibilityMetrics
    ariaCompliance: ARIAComplianceMetrics
    recommendations: string[]
    strengths: string[]
    issuesFound: AccessibilityIssue[]
}

export interface KeyboardNavigationMetrics {
    score: number
    tabOrder: ComplianceStatus
    focusManagement: ComplianceStatus
    keyboardShortcuts: ComplianceStatus
    trapFocus: ComplianceStatus
    escapeKey: ComplianceStatus
    notes: string[]
}

export interface ScreenReaderMetrics {
    score: number
    ariaLabels: ComplianceStatus
    ariaDescriptions: ComplianceStatus
    roleUsage: ComplianceStatus
    liveRegions: ComplianceStatus
    semanticHTML: ComplianceStatus
    announcements: ComplianceStatus
    notes: string[]
}

export interface VisualAccessibilityMetrics {
    score: number
    colorContrast: ComplianceStatus
    fontSize: ComplianceStatus
    focusIndicators: ComplianceStatus
    reducedMotion: ComplianceStatus
    highContrast: ComplianceStatus
    textSpacing: ComplianceStatus
    notes: string[]
}

export interface ARIAComplianceMetrics {
    score: number
    ariaRoles: ComplianceStatus
    ariaStates: ComplianceStatus
    ariaProperties: ComplianceStatus
    designPattern: ComplianceStatus
    landmarkRegions: ComplianceStatus
    notes: string[]
}

export interface AccessibilityIssue {
    severity: 'critical' | 'major' | 'minor'
    criterion: string
    description: string
    impact: string
    suggestion: string
    codeReference?: string
}

export interface DashboardData {
    generatedDate: string
    components: ComponentAccessibilityMetrics[]
    summary: {
        totalComponents: number
        averageScore: number
        levelACompliance: number
        levelAACompliance: number
        levelAAACompliance: number
        criticalIssues: number
        majorIssues: number
        minorIssues: number
    }
}
