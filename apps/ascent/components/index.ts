// Main component exports - Clean imports for the entire component library
// UI Components - Reusable components
export * from './ui'

// Layout Components - Layout-specific components
export * from './layout'

// Feature Components - Feature-specific components
export * from './features'

// Docs Components
export * from './docs'

// Blog Components
export * from './blog'

// Legacy exports for backward compatibility (can be removed after migration)
// These will help during the transition period
export { default as CodeBlock } from './ui/CodeBlock'
export { default as Tooltip } from './ui/Tooltip'
export { default as ThemeToggle } from './ui/ThemeToggle'
export {
    GlobalKeyboardNavigationProvider,
    NavigationZone,
    useNavigation,
    useNavigable,
    TableOfContents,
    PageBreadcrumb,
    Navbar,
} from './Navigation'

export {
    DocsTypeTable,
    Preview,
    PreviewWrapper,
} from './features/Documentation'

export { GoogleAnalytics } from './googleAnalytics/GoogleAnalytics'
