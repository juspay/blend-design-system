# 📋 Changelog Quick Reference

## 🚀 Quick Release Process

### 1. Create Changeset

```bash
pnpm changeset
```

### 2. Update CHANGELOG.md

Add new entry at top of `packages/blend/CHANGELOG.md`:

```markdown
## [1.3.0] - 2024-01-25

### New Feature Release

#### Brief description of what's new

**🎨 New Components**

- **Component Name**: Description

**✨ Enhancements**

- Improvement description

**🐛 Bug Fixes**

- Fix description

---
```

### 3. Update Version

```json
// packages/blend/package.json
{
    "version": "1.3.0"
}
```

### 4. Build & Test

```bash
pnpm build:blend
cd apps/ascent && pnpm run dev
# Visit http://localhost:3000/docs/changelog
```

### 5. Commit & Push

```bash
git add .
git commit -m "feat: release v1.3.0"
git push origin main
```

## 🎨 Change Categories

| Emoji | Category        | Use For                  |
| ----- | --------------- | ------------------------ |
| 🎨    | New Component   | New components           |
| ✨    | Enhancement     | Improvements             |
| 🐛    | Bug Fix         | Bug fixes                |
| 💥    | Breaking Change | Breaking changes         |
| 🔒    | Security        | Security updates         |
| ⚡    | Performance     | Performance improvements |
| 📚    | Documentation   | Docs updates             |
| 🔧    | Design Tokens   | Token changes            |

## 📝 Markdown Examples

### Images

```markdown
![Alt Text](https://example.com/image.jpg)
_Caption text_
```

### Videos

```markdown
<video controls poster="poster.jpg">
  <source src="/videos/demo.mp4" type="video/mp4">
</video>
*Video caption*
```

### Code Blocks

````markdown
```bash
npm install @package@version
```
````

````

### Breaking Changes
```markdown
> **Important**: Breaking change description

- Old API → New API
- Migration steps
````

## 🔧 Common Commands

```bash
# Build package
pnpm build:blend

# Start dev server
cd apps/ascent && pnpm run dev

# Clear cache
rm -rf apps/ascent/.next

# Check for errors
pnpm type-check
```

## 📋 Quality Checklist

- [ ] Version number updated
- [ ] Changelog entry added
- [ ] Images/videos load correctly
- [ ] Build passes
- [ ] UI renders properly
- [ ] Migration guide included (if breaking changes)

## 🆘 Troubleshooting

### Changelog Not Updating

```bash
rm -rf apps/ascent/.next
cd apps/ascent && pnpm run dev
```

### Build Errors

```bash
pnpm build:blend
pnpm type-check
```

### Import Issues

```bash
rm -rf node_modules
pnpm install
```

## 📞 Need Help?

1. Check the full [Release Guide](RELEASE_GUIDE.md)
2. Review console errors
3. Verify markdown syntax
4. Test with simple entry first
