#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * Enhanced changelog generator with proper conventional commit parsing
 * Generates descriptive and categorized changelogs for both beta and stable releases
 */

const COMMIT_TYPES = {
    feat: { title: '🚀 Features', priority: 1 },
    fix: { title: '🐛 Bug Fixes', priority: 2 },
    perf: { title: '⚡ Performance Improvements', priority: 3 },
    refactor: { title: '♻️ Code Refactoring', priority: 4 },
    style: { title: '💄 Styles', priority: 5 },
    docs: { title: '📚 Documentation', priority: 6 },
    test: { title: '🧪 Tests', priority: 7 },
    build: { title: '📦 Build System', priority: 8 },
    ci: { title: '👷 CI/CD', priority: 9 },
    chore: { title: '🔧 Chores', priority: 10 },
    revert: { title: '⏪ Reverts', priority: 11 },
}

const BREAKING_CHANGE_INDICATORS = ['BREAKING CHANGE', 'BREAKING-CHANGE', '!']

function execCommand(command) {
    try {
        return execSync(command, { encoding: 'utf-8' }).trim()
    } catch (error) {
        console.error(`Error executing command: ${command}`)
        console.error(error.message)
        return ''
    }
}

function parseCommitMessage(message, hash) {
    if (!message) {
        console.warn(`Empty message for commit ${hash}`)
        return {
            type: 'chore',
            scope: null,
            description: 'Empty commit message',
            isBreaking: false,
            hash,
            fullMessage: message || '',
        }
    }

    const lines = message.split('\n')
    const firstLine = lines[0]

    // Parse conventional commit format: type(scope): description
    const conventionalMatch = firstLine.match(/^(\w+)(\(.+\))?(!?):\s*(.+)$/)

    if (conventionalMatch) {
        const [, type, scope, breaking, description] = conventionalMatch
        const isBreaking =
            breaking === '!' ||
            lines.some((line) =>
                BREAKING_CHANGE_INDICATORS.some((indicator) =>
                    line.includes(indicator)
                )
            )

        return {
            type: type.toLowerCase(),
            scope: scope ? scope.slice(1, -1) : null, // Remove parentheses
            description: description.trim(),
            isBreaking,
            hash,
            fullMessage: message,
        }
    }

    // Fallback for non-conventional commits
    return {
        type: 'chore',
        scope: null,
        description: firstLine,
        isBreaking: false,
        hash,
        fullMessage: message,
    }
}

function getCommitsSinceTag(fromTag, toRef = 'HEAD') {
    let command
    if (fromTag) {
        command = `git log ${fromTag}..${toRef} --pretty=format:"%H|||%s|||%b"`
    } else {
        // If no previous tag, get last 50 commits
        command = `git log -50 ${toRef} --pretty=format:"%H|||%s|||%b"`
    }

    const output = execCommand(command)
    if (!output) return []

    return output
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => {
            const parts = line.split('|||')
            if (parts.length < 2) {
                console.warn(`Skipping malformed commit line: ${line}`)
                return null
            }

            const [hash, subject, body] = parts
            if (!hash || !subject) {
                console.warn(
                    `Skipping commit with missing hash or subject: ${line}`
                )
                return null
            }

            const fullMessage = body ? `${subject}\n${body}` : subject
            return parseCommitMessage(fullMessage, hash.substring(0, 7))
        })
        .filter((commit) => {
            if (!commit) return false
            // Filter out merge commits and release commits
            return (
                !commit.description.toLowerCase().includes('merge') &&
                !commit.description.toLowerCase().includes('chore(release)')
            )
        })
}

function getLastTag(isBeta = false) {
    try {
        let command
        if (isBeta) {
            // For beta, get the last tag (could be beta or stable)
            command = 'git describe --tags --abbrev=0'
        } else {
            // For stable, get the last stable tag (no beta suffix)
            command =
                'git tag -l | grep -v beta | grep -E "^v[0-9]+\\.[0-9]+\\.[0-9]+$" | sort -V | tail -1'
        }

        const result = execCommand(command)
        return result || null
    } catch (error) {
        return null
    }
}

function categorizeCommits(commits) {
    const categories = {}
    const breakingChanges = []

    commits.forEach((commit) => {
        if (commit.isBreaking) {
            breakingChanges.push(commit)
        }

        const type = commit.type
        const typeInfo = COMMIT_TYPES[type] || COMMIT_TYPES.chore

        if (!categories[type]) {
            categories[type] = {
                title: typeInfo.title,
                priority: typeInfo.priority,
                commits: [],
            }
        }

        categories[type].commits.push(commit)
    })

    return { categories, breakingChanges }
}

function formatCommit(commit) {
    const scope = commit.scope ? `**${commit.scope}**: ` : ''
    const breaking = commit.isBreaking ? ' ⚠️ **BREAKING**' : ''
    return `- ${scope}${commit.description}${breaking} ([${commit.hash}](../../commit/${commit.hash}))`
}

function generateChangelog(version, isBeta = false, fromTag = null) {
    const commits = getCommitsSinceTag(fromTag)

    if (commits.length === 0) {
        return generateEmptyChangelog(version, isBeta)
    }

    const { categories, breakingChanges } = categorizeCommits(commits)

    let changelog = `# Changelog for v${version}${isBeta ? ' (Beta)' : ''}\n\n`

    // Add release type description
    if (isBeta) {
        changelog += `> **Beta Release** - This is a pre-release version from the staging branch for testing purposes.\n\n`
    } else {
        changelog += `> **Stable Release** - This version is production-ready and recommended for general use.\n\n`
    }

    // Add breaking changes section if any
    if (breakingChanges.length > 0) {
        changelog += `## ⚠️ BREAKING CHANGES\n\n`
        breakingChanges.forEach((commit) => {
            changelog += formatCommit(commit) + '\n'
        })
        changelog += '\n'
    }

    // Add categorized changes
    const sortedCategories = Object.keys(categories).sort(
        (a, b) =>
            (COMMIT_TYPES[a]?.priority || 99) -
            (COMMIT_TYPES[b]?.priority || 99)
    )

    sortedCategories.forEach((type) => {
        const category = categories[type]
        changelog += `## ${category.title}\n\n`
        category.commits.forEach((commit) => {
            changelog += formatCommit(commit) + '\n'
        })
        changelog += '\n'
    })

    // Add metadata
    changelog += `---\n\n`
    changelog += `**Release Date**: ${new Date().toISOString().split('T')[0]}\n`
    changelog += `**Commit Range**: ${fromTag || 'start'}..HEAD\n`
    changelog += `**Total Changes**: ${commits.length} commits\n\n`

    // Add installation instructions
    if (!isBeta) {
        changelog += `## Installation\n\n`
        changelog += `\`\`\`bash\n`
        changelog += `npm install @juspay/blend-design-system@latest\n`
        changelog += `# or specific version\n`
        changelog += `npm install @juspay/blend-design-system@${version}\n`
        changelog += `\`\`\`\n\n`
    } else {
        changelog += `## Beta Installation\n\n`
        changelog += `\`\`\`bash\n`
        changelog += `npm install @juspay/blend-design-system@beta\n`
        changelog += `# or specific beta version\n`
        changelog += `npm install @juspay/blend-design-system@${version}\n`
        changelog += `\`\`\`\n\n`
        changelog += `> **Note**: Beta versions are for testing only. Use stable versions in production.\n\n`
    }

    return changelog
}

function generateEmptyChangelog(version, isBeta = false) {
    let changelog = `# Changelog for v${version}${isBeta ? ' (Beta)' : ''}\n\n`

    if (isBeta) {
        changelog += `> **Beta Release** - This is a pre-release version from the staging branch.\n\n`
    } else {
        changelog += `> **Stable Release** - This version is production-ready.\n\n`
    }

    changelog += `## 📝 No Changes\n\n`
    changelog += `No significant changes since the last release.\n\n`

    changelog += `---\n\n`
    changelog += `**Release Date**: ${new Date().toISOString().split('T')[0]}\n\n`

    return changelog
}

function main() {
    const args = process.argv.slice(2)
    const version = args[0]
    const isBeta = args[1] === 'beta'
    const outputPath = args[2] || 'docs/CHANGELOG.md'

    if (!version) {
        console.error(
            'Usage: node generate-changelog.js <version> [beta] [output-path]'
        )
        process.exit(1)
    }

    console.log(
        `Generating changelog for v${version}${isBeta ? ' (beta)' : ' (stable)'}...`
    )

    // Get the appropriate last tag
    const lastTag = getLastTag(isBeta)
    console.log(`Last tag: ${lastTag || 'none'}`)

    // Generate changelog
    const changelog = generateChangelog(version, isBeta, lastTag)

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write changelog
    fs.writeFileSync(outputPath, changelog)

    console.log(`✅ Changelog generated: ${outputPath}`)
    console.log(`📝 Total content length: ${changelog.length} characters`)

    // Preview first few lines
    const preview = changelog.split('\n').slice(0, 10).join('\n')
    console.log('\n📋 Preview:')
    console.log(preview)
    console.log('...\n')
}

if (require.main === module) {
    main()
}

module.exports = {
    generateChangelog,
    getCommitsSinceTag,
    categorizeCommits,
    parseCommitMessage,
}
