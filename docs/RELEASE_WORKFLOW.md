# 🚀 Release Workflow Guide

This document explains the improved release workflow for the Blend Design System NPM package. The workflow consists of 4 separate workflows that handle beta and stable releases with enhanced changelog generation.

## 📋 Overview

### Workflow Structure

1. **Create Beta Release** (`create-beta-release.yml`) - Creates beta releases from `staging` branch
2. **Publish Beta to NPM** (`publish-beta-npm.yml`) - Publishes beta versions to NPM
3. **Create Stable Release** (`create-stable-release.yml`) - Creates stable releases from `main` branch
4. **Publish Stable to NPM** (`publish-stable-npm.yml`) - Publishes stable versions to NPM

### Key Features

- ✅ **Enhanced Changelog Generation** - Categorized, descriptive changelogs with conventional commits
- ✅ **Proper Branch Strategy** - Clear separation between dev, staging, and main branches
- ✅ **Version Management** - Automatic beta/stable version handling
- ✅ **NPM Publishing** - Separate workflows for beta and stable publishing
- ✅ **Validation & Safety** - Multiple checks to prevent publishing errors
- ✅ **Detailed Release Notes** - Rich GitHub releases with installation instructions

## 🔄 Release Process

### Beta Release Process

1. **Trigger**: From `staging` branch
2. **Workflow**: `Create Beta Release`
3. **Action**: Creates GitHub release, updates changelog, creates PR to `dev`
4. **Next**: Manually trigger `Publish Beta to NPM` to publish to NPM

### Stable Release Process

1. **Trigger**: From `main` branch (after beta testing)
2. **Workflow**: `Create Stable Release`
3. **Action**: Converts beta to stable, creates GitHub release, creates PR to `dev`
4. **Next**: Manually trigger `Publish Stable to NPM` to publish to NPM

## 📁 Branch Strategy

```
main (stable releases) ←─── staging (beta releases) ←─── dev (development)
   ↓                              ↓                        ↓
   └── Create Stable Release      └── Create Beta Release  └── Development work
   └── Publish Stable NPM         └── Publish Beta NPM
```

### Branch Purposes

- **`dev`**: Active development, feature branches merge here
- **`staging`**: Beta releases, testing before production
- **`main`**: Stable releases, production-ready code

## 🛠 How to Use

### Creating a Beta Release

1. **Ensure your code is in `staging` branch**

    ```bash
    git checkout staging
    git pull origin staging
    ```

2. **Trigger the workflow**
    - Go to Actions → "Create Beta Release"
    - Click "Run workflow"
    - Select version bump type: `patch`, `minor`, or `major`
    - Click "Run workflow"

3. **Review the created PR**
    - The workflow creates a PR to `dev` branch
    - Review changelog and version changes
    - Merge the PR

4. **Publish to NPM** (separate step)
    - Go to Actions → "Publish Beta to NPM"
    - From `staging` branch, type "PUBLISH" to confirm
    - Click "Run workflow"

### Creating a Stable Release

1. **Ensure beta testing is complete and code is in `main`**

    ```bash
    git checkout main
    git pull origin main
    ```

2. **Trigger the workflow**
    - Go to Actions → "Create Stable Release"
    - Click "Run workflow"
    - Type "STABLE" to confirm
    - Click "Run workflow"

3. **Review the created PR**
    - The workflow creates a PR to `dev` branch
    - Review changelog and version changes
    - Merge the PR

4. **Publish to NPM** (separate step)
    - Go to Actions → "Publish Stable to NPM"
    - From `main` branch, type "PUBLISH" to confirm
    - Click "Run workflow"

## 📝 Enhanced Changelog

### Features

- **Conventional Commits**: Parses commit messages following conventional commit format
- **Categorization**: Groups changes by type (features, fixes, etc.)
- **Breaking Changes**: Highlights breaking changes prominently
- **Rich Formatting**: Includes emojis, links to commits, and proper sections
- **Installation Instructions**: Provides copy-paste installation commands

### Commit Message Format

For best changelog generation, use conventional commit format:

```
type(scope): description

# Examples:
feat(button): add new primary button variant
fix(accordion): resolve animation timing issue
docs(readme): update installation instructions
chore(deps): update dependencies
```

### Supported Types

| Type       | Description                 | Priority |
| ---------- | --------------------------- | -------- |
| `feat`     | 🚀 Features                 | 1        |
| `fix`      | 🐛 Bug Fixes                | 2        |
| `perf`     | ⚡ Performance Improvements | 3        |
| `refactor` | ♻️ Code Refactoring         | 4        |
| `style`    | 💄 Styles                   | 5        |
| `docs`     | 📚 Documentation            | 6        |
| `test`     | 🧪 Tests                    | 7        |
| `build`    | 📦 Build System             | 8        |
| `ci`       | 👷 CI/CD                    | 9        |
| `chore`    | 🔧 Chores                   | 10       |

## 🔒 Safety Features

### Version Validation

- Validates version format before processing
- Prevents publishing non-beta versions as beta
- Prevents publishing beta versions as stable
- Checks for existing versions on NPM

### Branch Protection

- Beta workflows only run from `staging` branch
- Stable workflows only run from `main` branch
- Requires manual confirmation for publishing

### Error Handling

- Comprehensive error messages
- Rollback capabilities for failed operations
- Detailed logging for debugging

## 🎯 Best Practices

### For Development

1. **Use Conventional Commits**: Ensures good changelog generation
2. **Test in Beta First**: Always release beta versions before stable
3. **Review PRs Carefully**: Auto-generated PRs contain important changes
4. **Follow Branch Strategy**: Keep dev, staging, and main in sync

### For Releases

1. **Test Beta Versions**: Install and test beta packages before promoting
2. **Update Documentation**: Ensure docs match the released version
3. **Communicate Changes**: Share release notes with team and users
4. **Monitor After Release**: Watch for issues after NPM publish

## 🐛 Troubleshooting

### Common Issues

#### "Version already exists on NPM"

- **Cause**: Trying to publish a version that already exists
- **Solution**: Check NPM, delete if necessary, or bump version

#### "Not a beta version" error

- **Cause**: Running beta workflow on stable version
- **Solution**: Ensure you're on the correct branch and version

#### "NPM authentication failed"

- **Cause**: Invalid or missing NPM token
- **Solution**: Check NPM_TOKEN secret in repository settings

### Debug Steps

1. **Check workflow logs**: Review the GitHub Actions logs for detailed errors
2. **Verify branch**: Ensure you're on the correct branch for the workflow
3. **Check version**: Verify the package.json version is as expected
4. **Test locally**: Run the changelog script locally to test

## 📞 Support

### Getting Help

- **Issues**: Create an issue in the repository
- **Questions**: Ask in team chat or during team meetings
- **Documentation**: Refer to this guide and workflow comments

### Contributing

- **Improvements**: Suggest workflow improvements via issues or PRs
- **Bug Reports**: Report workflow bugs with detailed steps to reproduce
- **Documentation**: Help improve this documentation

---

## 🎉 Quick Reference

### Beta Release Commands

```bash
# 1. Create beta release (GitHub Actions)
# 2. Review and merge PR to dev
# 3. Publish beta to NPM (GitHub Actions)
npm install @juspay/blend-design-system@beta
```

### Stable Release Commands

```bash
# 1. Create stable release (GitHub Actions)
# 2. Review and merge PR to dev
# 3. Publish stable to NPM (GitHub Actions)
npm install @juspay/blend-design-system@latest
```

### Manual Changelog Generation

```bash
# Generate beta changelog
node scripts/generate-changelog.js "1.2.3-beta" beta

# Generate stable changelog
node scripts/generate-changelog.js "1.2.3" stable
```

This improved workflow ensures reliable, consistent releases with detailed changelogs and proper version management. 🚀
