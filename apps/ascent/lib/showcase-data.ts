export interface ShowcaseItem {
    id: string
    image: string
    title: string
    description: string
    components: string[]
    category: string
}

export const showcaseData: ShowcaseItem[] = [
    {
        id: 'homepage',
        image: '/showcase/homepage.webp',
        title: 'Homepage',
        description:
            'The personalised home dashboard showing account-level payment summary, transaction volume trends, and quick-access overviews across key modules.',
        components: ['Card', 'Button', 'Chart', 'Menu', 'Tabs'],
        category: 'Analytics',
    },
    {
        id: 'order-management',
        image: '/showcase/order-management.webp',
        title: 'Order Management',
        description:
            'A paginated list view of all orders with transaction IDs, customer details, payment types, amounts, and statuses. Supports filtering and bulk actions for operational workflows.',
        components: [
            'DataTable',
            'Card',
            'Button',
            'SearchInput',
            'Tabs',
            'Tag',
        ],
        category: 'Payments',
    },
    {
        id: 'order-management-refund-pending',
        image: '/showcase/order-management-refund-pending.webp',
        title: 'Order Management - Refund Pending',
        description:
            'An expanded order detail view surfacing a refund-pending state. Shows the order timeline, refund summary, and available resolution actions alongside transaction metadata.',
        components: ['DataTable', 'Card', 'Button', 'Tag', 'Alert', 'Modal'],
        category: 'Payments',
    },
    {
        id: 'order-management-mandate-payment',
        image: '/showcase/order-management-mandate-payment.webp',
        title: 'Order Management - Mandate Payment',
        description:
            'Order detail view in the context of a mandate payment. Highlights payment status, mandate reference details, and the associated order timeline with relevant action controls.',
        components: [
            'Button',
            'TextInput',
            'Modal',
            'Stepper',
            'Card',
            'Alert',
        ],
        category: 'Payments',
    },
    {
        id: 'order-management-mandate-payment-details',
        image: '/showcase/order-management-mandate-details-payment.webp',
        title: 'Order Management - Mandate Payment Details',
        description:
            'Order detail view with an expanded payment breakdown panel. Surfaces mandate-linked payment metadata, refund summary, and itemised transaction details in a side drawer layout.',
        components: ['DataTable', 'Card', 'Button', 'Tabs', 'KeyValuePair'],
        category: 'Payments',
    },
    {
        id: 'order-management-chargeback',
        image: '/showcase/order-management-chargeback.webp',
        title: 'Order Management - Chargeback',
        description:
            'Order detail view in a chargeback context. Includes a "Create Chargeback" modal overlay with reason selection and supporting fields to initiate a dispute against the transaction.',
        components: ['DataTable', 'Card', 'Button', 'Modal', 'Tag', 'Alert'],
        category: 'Payments',
    },
    {
        id: 'transaction-analytics',
        image: '/showcase/transaction-analytics.webp',
        title: 'Transaction Analytics',
        description:
            'Displays a comprehensive view of transaction performance metrics, including key insights, success rates, and trend lines across payment methods and time periods.',
        components: [
            'Chart',
            'Card',
            'Button',
            'Tabs',
            'DateRangePicker',
            'DataTable',
        ],
        category: 'Analytics',
    },
    {
        id: 'frm-manager-routing',
        image: '/showcase/frm-manager-routing.webp',
        title: 'Fraud and Risk Management - Routing',
        description:
            'Displays the active FRM routing configuration alongside a list of all fraud policies. Each policy entry includes trigger conditions, transaction thresholds, and current status.',
        components: ['DataTable', 'Card', 'Button', 'Tag', 'Modal', 'Menu'],
        category: 'Fraud & Risk',
    },
    {
        id: 'frm-manager-routing-grid-view',
        image: '/showcase/frm-manager-routing-grid-view.webp',
        title: 'Fraud and Risk Management - Routing Grid View',
        description:
            'An alternate grid layout of the FRM Manager, presenting fraud policies as scannable cards. Highlights high-value and high-risk transaction rules with threshold values and last-updated context.',
        components: ['Card', 'Button', 'Tag', 'DataTable'],
        category: 'Fraud & Risk',
    },
    {
        id: 'ai-assistant-question',
        image: '/showcase/genius-ai.webp',
        title: 'AI Assistant - Question',
        description:
            'AI assistant interface where users can ask questions about transaction data. Returns structured insights, metric breakdowns, and contextual recommendations inline.',
        components: ['ChatInput', 'Card', 'Button', 'Avatar', 'Textarea'],
        category: 'AI',
    },
    {
        id: 'ai-assistant-onboarding',
        image: '/showcase/ai-assistant-onboarding.webp',
        title: 'AI Assistant - Onboarding',
        description:
            'AI-assisted onboarding flow that walks users through setup steps - integration configuration, checkout setup, and go-live readiness with contextual guidance at each stage.',
        components: [
            'ChatInput',
            'Card',
            'Button',
            'Stepper',
            'Avatar',
            'Textarea',
            'Modal',
            'SingleSelect',
            'TextInput',
            'Switch',
            'Checkbox',
        ],
        category: 'AI',
    },
    {
        id: 'ai-assistant-transaction-analytics',
        image: '/showcase/ai-assistant-transaction-analytics.webp',
        title: 'AI Assistant - Transaction Analytics',
        description:
            'AI-generated analytics report view within the Genius AI panel. Surfaces auto-summarised transaction trends, charts, and a natural language narrative alongside the visual data.',
        components: [
            'Chart',
            'Card',
            'Button',
            'Tabs',
            'ChatInput',
            'DataTable',
        ],
        category: 'AI',
    },
    {
        id: 'rule-builder-default-view',
        image: '/showcase/rule-builder-default-view.webp',
        title: 'Rule Builder (Default View)',
        description:
            'Default canvas view when a rule is first created, it shows the Start node in selected state with editable title and description in the properties panel.',
        components: ['Card', 'Button', 'Tabs', 'Modal', 'Sidebar', 'Menu'],
        category: 'Rules',
    },
    {
        id: 'rule-builder-adding-new-block',
        image: '/showcase/rule-builder-adding-new-block.webp',
        title: 'Adding New Node Block',
        description:
            'Node selection popover that appears when a user drags from an existing node and releases on an empty canvas area — select a node type to add and auto-connect it to the flow.',
        components: ['Card', 'Button', 'Modal'],
        category: 'Rules',
    },
    {
        id: 'rule-builder-configuring-action-node',
        image: '/showcase/rule-builder-configuring-action-node.webp',
        title: 'Configuring Action Node Block',
        description:
            'Action node selected state where users configure the action label and choose an action type (Basic Action, Add Conditions, or Split Traffic) from the properties panel to determine the next step in the rule flow.',
        components: ['Card', 'Button', 'TextInput', 'Modal'],
        category: 'Rules',
    },
    {
        id: 'rule-builder-complete-rule-flow-in-play-mode',
        image: '/showcase/rule-builder-complete-rule-flow-in-play-mode.webp',
        title: 'Complete Rule Flow in Play Mode',
        description:
            'An interactive simulation view of a fully constructed rule flow. Users can select any node block to trace the logic path from start to end, validating decision branches and action sequences before publishing. Highlights the active traversal path and surfaces intermediate outputs at each step for debugging and verification.',
        components: ['Card', 'Button', 'Tabs', 'Modal'],
        category: 'Rules',
    },
    {
        id: 'rule-builder-error-detected',
        image: '/showcase/rule-builder-error-detected.webp',
        title: 'Rule Builder Error Detected',
        description:
            'During simulation, the flow highlights the active path in green and flags nodes with configuration errors, helping users identify and fix issues before the rule goes live.',
        components: ['Card', 'Button', 'Alert', 'Tag'],
        category: 'Rules',
    },
    {
        id: 'stp-sign-in-page',
        image: '/showcase/sign-in-page.webp',
        title: 'Straight Through Processing (STP) Sign In Page',
        description:
            'A clean and minimal sign-in page for the STP workspace. Features email and password fields with validation, a remember-me checkbox, and a primary call-to-action. Designed for quick authentication with clear error states and password recovery links.',
        components: ['TextInput', 'Button', 'Card', 'Checkbox'],
        category: 'Authentication',
    },
    {
        id: 'onboarding-page',
        image: '/showcase/onboarding-page.webp',
        title: 'Onboarding Page',
        description:
            'A step-by-step guided onboarding checklist that helps users complete their integration setup and get started quickly. Tracks overall progress with a visual indicator, breaks setup into manageable stages, and surfaces contextual tips at each step. Users can resume interrupted flows and see which tasks are pending, in-progress, or completed.',
        components: ['Stepper', 'Card', 'Button', 'ProgressBar', 'Checkbox'],
        category: 'Integration',
    },
    {
        id: 'email-integration-setup',
        image: '/showcase/email-intregation-setup.webp',
        title: 'Email Integration Setup',
        description:
            'Users select their preferred email provider and grant access permission to enable automated OTA booking email capture.',
        components: [
            'Stepper',
            'Card',
            'Button',
            'TextInput',
            'SingleSelect',
            'Modal',
        ],
        category: 'Integration',
    },
    {
        id: 'onboarding-completed',
        image: '/showcase/onboarding-completed.webp',
        title: 'Onboarding Completed',
        description:
            'The final confirmation screen of the onboarding journey, celebrating completion with a clear success state. Summarises configured integrations, highlights next steps, and offers quick-action buttons to jump into the workspace or review settings. Reinforces user confidence that the environment is live-ready.',
        components: ['Card', 'Button', 'Stepper', 'Alert'],
        category: 'Integration',
    },
    {
        id: 'channel-integration-connected-emails',
        image: '/showcase/channel-integration-connected-emails.webp',
        title: 'Channel Integration — Connected Emails',
        description:
            'A centralised management view for all integrated email channels after initial setup. Displays connection health, sync status, provider details, and last-sync timestamps in a sortable list. Users can add new channels, reconnect broken ones, revoke access, and drill into per-channel configuration from a single unified interface.',
        components: ['DataTable', 'Card', 'Button', 'Tag', 'Modal'],
        category: 'Integration',
    },
    {
        id: 'grid-sign-in-page',
        image: '/showcase/login.webp',
        title: 'Grid Sign In Page',
        description:
            'A streamlined sign-in page for the Grid workspace. Presents a focused form with email and password inputs, a primary submit button, and helpful links for account recovery. Uses a card-based layout to keep the interface clean and approachable with clear validation feedback.',
        components: ['TextInput', 'Button', 'Card'],
        category: 'Authentication',
    },
    {
        id: 'grid-landing-page',
        image: '/showcase/creating-api-key.webp',
        title: 'Grid Landing Page',
        description:
            'A step-by-step guide for creating and securely storing an API key to authenticate requests from coding agents like Claude Code, OpenCode, or Cline. Walks users through naming the key, selecting scopes, generating the secret, and copying it safely. Includes warnings about key exposure, tagging for organisation, and revocation controls.',
        components: ['Card', 'Button', 'TextInput', 'Modal', 'Tag'],
        category: 'Authentication',
    },
    {
        id: 'usage-guidelines',
        image: '/showcase/usage-guidelines.webp',
        title: 'Usage Guidelines',
        description:
            'A reference page that helps users pick the right model for their task — covering use cases like coding, parallel agents, IDE autocomplete, commit messages, and documentation. Presents recommendations in an accordion layout with expandable sections, code snippets for quick copy-paste integration, and side-by-side comparisons where relevant.',
        components: ['Card', 'Button', 'Accordion', 'CodeBlock'],
        category: 'Guidelines',
    },
    {
        id: 'gpu-utilisation-page',
        image: '/showcase/gpu-pulse.webp',
        title: 'GPU Utilisation Page',
        description:
            'A dashboard that tracks GPU utilization across the organization, showing total hours, unused capacity, overnight idle analysis, and usage broken down by team and individual users.',
        components: [
            'Chart',
            'Card',
            'Button',
            'Tabs',
            'DataTable',
            'ProgressBar',
        ],
        category: 'Analytics',
    },
    {
        id: 'basic-information-form',
        image: '/showcase/basic-details.webp',
        title: 'Basic Information Form',
        description:
            'Clean and simple form for capturing essential user and business information. Features intelligent field validation, auto-formatting for phone numbers and dates, and contextual help tooltips. Includes address autocomplete, business type categorization, and tax ID verification. Supports multi-step progressive disclosure for complex information, draft saving, and partial submission. Provides integration with business registries for data enrichment, duplicate detection, and compliance checks for regulated industries.',
        components: [
            'TextInput',
            'Button',
            'SingleSelect',
            'Card',
            'DateRangePicker',
        ],
        category: 'Layout & Forms',
    },
    {
        id: 'team-selection',
        image: '/showcase/select-team.webp',
        title: 'Team Selection',
        description:
            'Easy-to-use team picker for assigning tasks and managing collaboration. Features hierarchical team structures, role-based visibility controls, and recent team suggestions. Includes search and filter capabilities, team capability indicators, and workload balance information. Supports multi-team selection, permission previews, and integration with scheduling systems. The selector provides team performance metrics, availability status, and compliance with approval workflows for sensitive assignments.',
        components: ['Card', 'Button', 'SingleSelect', 'Avatar', 'Tag'],
        category: 'Layout & Forms',
    },
    {
        id: 'access-control-settings',
        image: '/showcase/who-can-join.webp',
        title: 'Access Control Settings',
        description:
            'Permission management interface for controlling who can join and access resources. Features role-based access control (RBAC) with custom role creation, permission inheritance, and scope limitations. Includes approval workflows for access requests, automatic access reviews, and expiration policies. Provides integration with corporate directories (LDAP, Active Directory), just-in-time access provisioning, and emergency access break-glass procedures. The interface supports fine-grained permissions at resource, action, and attribute levels with audit logging for all changes.',
        components: [
            'Card',
            'Button',
            'Switch',
            'TextInput',
            'SingleSelect',
            'Modal',
            'DataTable',
        ],
        category: 'Authentication',
    },
]

export const showcaseCategories = Array.from(
    new Set(showcaseData.map((d) => d.category))
)
