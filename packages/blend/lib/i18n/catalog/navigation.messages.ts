/**
 * Strings for the application shell: Sidebar, SidebarV2, Topbar and TopbarV2
 * (including SidebarMobile and SidebarV2MobileNavigation).
 *
 * `navigation.*` holds the sentences both the sidebars and the topbars render
 * (the merchant and tenant switchers, the landmark labels). `sidebar.*` and
 * `topbar.*` hold what only one of them renders. They share one fragment
 * because the shell components are almost always rendered together.
 *
 * Collapse and expand are separate whole sentences rather than an
 * `{action} sidebar` template: word order and the verb's form both change by
 * language.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const NAVIGATION_MESSAGES = {
    'navigation.placeholder.select-merchant': 'Select Merchant',
    'navigation.a11y.select-merchant': 'Select merchant: {name}',
    'navigation.a11y.select-tenant': 'Select tenant: {name}',
    'navigation.a11y.select-tenant-unnamed': 'Select tenant: tenant',
    'navigation.a11y.main-content': 'Main content',
    'navigation.a11y.navigation-menu': 'Navigation menu',

    'sidebar.action.collapse': 'Collapse sidebar',
    'sidebar.action.expand': 'Expand sidebar',
    'sidebar.label.collapse-shortcut': 'Collapse sidebar ({shortcut})',
    'sidebar.label.expand-shortcut': 'Expand sidebar ({shortcut})',
    'sidebar.a11y.collapse-toggle':
        'Collapse sidebar. Press {shortcut} to toggle.',
    'sidebar.a11y.expand-toggle': 'Expand sidebar. Press {shortcut} to toggle.',
    'sidebar.status.expanded': 'Sidebar expanded',
    'sidebar.status.collapsed': 'Sidebar collapsed',
    'sidebar.label.more': 'More',
    'sidebar.a11y.more-options': 'More options',
    'sidebar.a11y.primary-action': 'Primary action',
    'sidebar.a11y.app-navigation': 'App navigation',
    'sidebar.a11y.more-navigation-options': 'More navigation options',
    'sidebar.a11y.more-tenants': 'More tenants',
    'sidebar.placeholder.search-tenants': 'Search tenants...',

    'topbar.a11y.go-back': 'Go back',
} as const
