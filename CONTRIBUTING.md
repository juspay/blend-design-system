# Contributing to Blend Design System

We welcome contributions from the community! Whether you're fixing bugs, adding new components, improving documentation, or proposing new features, your contributions help make Blend better for everyone.

---

## Before You Start

### Getting Help

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features

---

## Development Setup

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended package manager)
- **Git** for version control

---

### Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/blend-design-system.git
cd blend-design-system

# Add upstream remote
git remote add upstream https://github.com/juspay/blend-design-system.git
```

---

### Install Dependencies

```bash
pnpm install

# Build the design system
pnpm build

# Start development mode
pnpm dev
```

---

### Development Workflow

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Build to ensure everything works
pnpm build
```

---

## Project Structure

Understanding the monorepo structure:

```
blend-design-system/
├── packages/
│   └── blend/                 # Main design system package
│       ├── lib/
│       │   ├── components/    # React components
│       │   ├── tokens/        # Design tokens
│       │   ├── hooks/         # Custom hooks
│       │   └── context/       # Theme context and providers
├── apps/
│   ├── ascent/               # Documentation site
│   ├── storybook/            # Component playground
│   ├── site/                 # Marketing / main site
│   └── blend-monitor/        # Monitoring / analytics app
```

---

## Types of Contributions

### Bug Fixes

1. **Check existing issues** before creating new ones
2. **Include reproduction steps** and expected vs actual behavior
3. **Update documentation** if needed

**Example Bug Fix Process:**

```bash
git checkout -b fix/button-disabled-state

# Make your fix
# Update docs if needed

git commit -m "fix: button disabled state styling"
git push origin fix/button-disabled-state
```

---

### Documentation

Documentation improvements are always welcome:

- Improve existing component documentation
- Add usage examples and best practices
- Update getting started guides
- Fix typos and improve clarity

---

### Design Tokens

When proposing design token changes:

1. **Create an issue first** to discuss the change
2. **Ensure backward compatibility** where possible
3. **Update all affected components**
4. **Include design rationale** and use cases

---

## Documentation Standards

### Component Documentation

Each component should include:

- **API Reference**
- **Usage Examples**
- **Accessibility**
- **Do’s and Don’ts**

---

### Code Comments

- Document complex logic and business rules
- Explain design decisions and trade-offs
- Link to relevant design specifications

---

## Submission Guidelines

### Before Submitting

1. **Build successfully**: `pnpm build`
2. **Run relevant tests**: for example, `pnpm test:blend` for Blend package changes
3. **Run lint checks**: `pnpm lint`
4. **Run formatting checks**: `pnpm format:check`
5. **Update documentation** if needed

---

## Pull Request Guidelines

### PR Title Format

```
type(scope): brief description

Examples:
feat(button): add loading state
fix(modal): resolve focus trap issue
docs(getting-started): update installation guide
```

---

### PR Description Template

```markdown
### Summary

<!-- Write a brief summary of your changes -->

### Issue Ticket

Closes #[issue_number] or Related to #[issue_number]
```

---

### Review Process

1. Automated checks must pass
2. Design team review for UI changes
3. Code review by maintainers
4. Documentation review if applicable
5. Final approval and merge

---

## Testing an Open PR

Every pull request to `main` or `dev` automatically publishes an ephemeral preview build of `@juspay/blend-design-system` via [pkg.pr.new](https://pkg.pr.new). You do **not** need to clone the repo, run a local build, or use `yalc` to test someone else's PR.

Look for the sticky comment from the `pkg-pr-new` bot near the top of the PR. It contains a one-line install command you can paste into any consumer app:

```bash
pnpm add https://pkg.pr.new/@juspay/blend-design-system@<commit-sha>
```

The URL is immutable and tied to the exact commit. Force-pushing the PR branch updates the sticky comment in place with a new URL.

---

## Release Process

### Versioning & Changesets

This repository uses **Changesets** to manage versions and release notes.

If your change affects published packages, you **must add a changeset**:

```bash
pnpm changeset
```

This will prompt you to:

- Select affected packages
- Choose patch / minor / major
- Write a summary for the changelog

Commit the generated file along with your changes.

---

### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features (backward compatible)
- **Major** (2.0.0): Breaking changes

---

### Release Notes

Release notes are generated from Changesets and include:

- Bug fixes and improvements
- New features and components
- Breaking changes
- Contributor acknowledgements

---

## Troubleshooting

### Common Development Issues

**Build failures:**

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

**TypeScript errors:**

- Check exports in `index.ts`
- Verify type definitions
- Ensure imports are typed

---

### Getting Unstuck

1. Check documentation and issues
2. Ask in GitHub Discussions
3. Reach out to maintainers

---

## Resources

### Development Tools

- Storybook
- TypeScript
- ESLint

---

### Design Resources

- Figma
- Design Tokens

---

### Learning Materials

- React
- TypeScript

---

## Thank You

Thank you for contributing to Blend Design System!

Every contribution—big or small—helps improve the ecosystem for everyone.

Welcome to the community! 🎉
