// Main component exports - Clean imports for the entire component library

// UI Components - Reusable components
export * from './ui'

// Layout Components - Layout-specific components
export * from './layout'

// Feature Components - Feature-specific components
export * from './features'

// Legacy exports for backward compatibility (can be removed after migration)
// These will help during the transition period
export { SearchBar, SearchProvider } from './ui/SearchBar'
export { default as CodeBlock } from './ui/CodeBlock'
export { default as Tooltip } from './ui/Tooltip'
export { default as ThemeToggle } from './ui/ThemeToggle'
export { default as FloatingShortcutsButton } from './ui/FloatingShortcutsButton'
export { Sidebar, SidebarDrawer } from './layout/Sidebar'
export {
    GlobalKeyboardNavigationProvider,
    NavigationZone,
    useNavigation,
    useNavigable,
    TableOfContents,
} from './layout/Navigation'
export {
    DocArticle,
    DocsTypeTable,
    Preview,
    PreviewWrapper,
} from './features/Documentation'
