/**
 * Test Results Parser
 * Parses accessibility test files to extract test coverage information
 */

export interface TestCoverageInfo {
    totalTests: number
    testCategories: string[]
    testDescriptions: string[]
    wcagCriteriaTested: string[]
}

/**
 * Parse test file to extract coverage information
 * This is a simplified parser - in a real implementation, you might use AST parsing
 */
export function parseTestFile(testFileContent: string): TestCoverageInfo {
    const testCategories: string[] = []
    const testDescriptions: string[] = []
    const wcagCriteriaTested: string[] = []

    // Extract describe blocks (test categories)
    const describeMatches = testFileContent.matchAll(
        /describe\(['"]([^'"]+)['"]/g
    )
    for (const match of describeMatches) {
        if (match[1] && !match[1].includes('Button Accessibility')) {
            testCategories.push(match[1])
        }
    }

    // Extract it blocks (test descriptions)
    const itMatches = testFileContent.matchAll(/it\(['"]([^'"]+)['"]/g)
    for (const match of itMatches) {
        if (match[1]) {
            testDescriptions.push(match[1])
        }
    }

    // Extract WCAG criteria mentions
    const wcagMatches = testFileContent.matchAll(/(\d+\.\d+\.\d+)/g)
    for (const match of wcagMatches) {
        if (match[1] && !wcagCriteriaTested.includes(match[1])) {
            wcagCriteriaTested.push(match[1])
        }
    }

    return {
        totalTests: testDescriptions.length,
        testCategories,
        testDescriptions,
        wcagCriteriaTested,
    }
}

/**
 * Get test coverage summary for display
 */
export function getTestCoverageSummary(testInfo: TestCoverageInfo): {
    summary: string
    details: string[]
} {
    const details: string[] = []

    details.push(`Total Tests: ${testInfo.totalTests}`)
    details.push(`Test Categories: ${testInfo.testCategories.length}`)
    details.push(
        `WCAG Criteria Tested: ${testInfo.wcagCriteriaTested.length} (${testInfo.wcagCriteriaTested.join(', ')})`
    )

    return {
        summary: `${testInfo.totalTests} automated tests covering ${testInfo.testCategories.length} categories`,
        details,
    }
}
