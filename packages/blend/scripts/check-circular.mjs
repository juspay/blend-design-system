// Circular-dependency gate for the component library.
//
// Fails (exit 1) on ANY circular dependency in `lib/`, EXCEPT a small allowlist
// of genuinely-recursive components that render each other (e.g. a menu item
// renders a submenu which renders menu items). Those cross-imports are benign at
// runtime and cannot be removed without contorting the components; they are also
// marked with a scoped `eslint-disable import-x/no-cycle` at the import site.
//
// To add a NEW allowed cycle you must justify it here — the default answer is
// "break the cycle", not "allowlist it".
import madge from 'madge'

const ALLOWLIST = [
    ['components/Menu/MenuItem.tsx', 'components/Menu/SubMenu.tsx'],
    [
        'components/MultiSelect/MultiSelectMenuItem.tsx',
        'components/MultiSelect/MultiSelectSubMenu.tsx',
    ],
    [
        'components/MultiSelectV2/MultiSelectV2MenuItem.tsx',
        'components/MultiSelectV2/MultiSelectV2SubMenu.tsx',
    ],
    // The DataTable pivot preview renders a nested DataTable (a pivot preview IS
    // a table), so DataTable <-> PivotTableModal is genuinely recursive.
    [
        'components/DataTable/DataTable.tsx',
        'components/DataTable/PivotTableModal/index.tsx',
        'components/DataTable/PivotTableModal/PivotPreviewPanel.tsx',
    ],
].map((cycle) => [...cycle].sort().join(' <-> '))

const res = await madge('lib', {
    fileExtensions: ['ts', 'tsx'],
    tsConfig: './tsconfig.json',
    excludeRegExp: [/\.(stories|test|spec)\.(ts|tsx)$/, /\/__tests__\//],
})

const cycles = res.circular()
const keyOf = (cycle) => [...cycle].sort().join(' <-> ')

const disallowed = cycles.filter((c) => !ALLOWLIST.includes(keyOf(c)))
const allowed = cycles.length - disallowed.length

if (disallowed.length > 0) {
    console.error(
        `\n✖ ${disallowed.length} disallowed circular dependency(ies) found:\n`
    )
    disallowed.forEach((c, i) => console.error(`  ${i + 1}) ${c.join(' > ')}`))
    console.error(
        '\nBreak the cycle (extract shared types to a leaf module, import concrete\n' +
            'paths instead of barrels, avoid importing the package root `main`).\n' +
            'Only for genuine mutual-recursion components, add the pair to ALLOWLIST\n' +
            'in scripts/check-circular.mjs with justification.\n'
    )
    process.exit(1)
}

console.log(
    `✔ No disallowed circular dependencies.` +
        (allowed
            ? ` (${allowed} documented intentional recursion${allowed > 1 ? 's' : ''} allowed.)`
            : '')
)
