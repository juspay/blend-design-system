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
        id: 'modern-homepage-design',
        image: '/showcase/Homepage.png',
        title: 'Modern Homepage Design',
        description:
            "A clean and intuitive homepage layout designed for maximum user engagement and seamless navigation. Features a responsive hero section, dynamic content cards, and an organized menu structure that adapts to different screen sizes. The layout prioritizes user journey mapping with strategically placed call-to-action buttons and interactive elements that guide visitors through the platform's core offerings without overwhelming them.",
        components: ['Card', 'Button', 'Chart', 'Menu', 'Tabs'],
        category: 'Layout & Forms',
    },
    {
        id: 'mandate-payment-flow',
        image: '/showcase/Order management __ Mandate Payment (1).png',
        title: 'Mandate Payment Flow',
        description:
            'Streamlined payment authorization interface for managing recurring transactions securely. This flow guides users through mandate creation, validation, and activation with clear visual feedback at each step. Includes NACH mandate support, e-signature integration, and automated reminder systems. The interface provides real-time status updates, bank validation checks, and error recovery options to ensure a frictionless recurring payment setup experience for end-users.',
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
        id: 'payment-management-dashboard',
        image: '/showcase/Order management __ Mandate Payment.png',
        title: 'Payment Management Dashboard',
        description:
            'Comprehensive dashboard for tracking and managing all mandate-based payment operations. Provides real-time analytics on successful collections, failed transactions, and pending mandates. Features include advanced filtering by date range, payment status, and customer segments. The dashboard includes export capabilities for reports, bulk operation tools for mandate management, and visual charts that highlight collection efficiency and revenue recovery opportunities.',
        components: [
            'DataTable',
            'Chart',
            'Card',
            'Button',
            'Tabs',
            'SearchInput',
        ],
        category: 'Payments',
    },
    {
        id: 'refund-processing-view',
        image: '/showcase/Order management __ Refund Pending.png',
        title: 'Refund Processing View',
        description:
            'Detailed refund status interface showing pending returns and processing timelines. Displays comprehensive refund lifecycle tracking from initiation to completion, including bank processing times, approval workflows, and exception handling. Includes automated refund eligibility checks, partial refund support, and multi-payment method reconciliation. The interface provides merchants with clear visibility into refund queues, estimated completion dates, and historical refund patterns for better cash flow management.',
        components: ['DataTable', 'Card', 'Button', 'Tag', 'Alert', 'Modal'],
        category: 'Payments',
    },
    {
        id: 'order-management-center',
        image: '/showcase/Order management.png',
        title: 'Order Management Center',
        description:
            'Centralized hub for monitoring, processing, and fulfilling customer orders efficiently. Provides complete order lifecycle management from capture to delivery, including inventory allocation, payment verification, and shipment tracking. Features include bulk order processing, automated status updates, customer communication tools, and integration with major logistics partners. Includes exception handling for failed orders, returns processing, and real-time inventory sync with warehouse management systems.',
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
        id: 'product-line-configuration',
        image: '/showcase/PL Configured ( Full Page ) (1).png',
        title: 'Product Line Configuration',
        description:
            'Advanced product line setup interface with customizable options and real-time previews. Supports multi-tier product hierarchies, variant generation, pricing rules, and inventory tracking. Includes visual configuration tools for attribute mapping, bundle creation, and cross-sell logic. The interface provides real-time cost calculations, margin analysis, and compatibility checks. Features include version control for configurations, approval workflows for changes, and bulk editing capabilities for large product catalogs.',
        components: [
            'Card',
            'Button',
            'TextInput',
            'SingleSelect',
            'Modal',
            'Stepper',
        ],
        category: 'Product Configuration',
    },
    {
        id: 'configuration-workflow',
        image: '/showcase/PL Configured ( Full Page ) (2).png',
        title: 'Configuration Workflow',
        description:
            'Step-by-step product configuration wizard guiding users through complex setups. Each step validates inputs and provides contextual help, with conditional logic that shows or hides options based on previous selections. The workflow supports draft saving, progress persistence, and collaborative configuration sessions. Includes validation rules for business logic, dependency mapping between configuration options, and automatic suggestion generation based on best practices and historical configuration patterns.',
        components: ['Stepper', 'Card', 'Button', 'TextInput', 'Modal'],
        category: 'Product Configuration',
    },
    {
        id: 'full-page-layout-editor',
        image: '/showcase/PL Configured ( Full Page ) (3).png',
        title: 'Full Page Layout Editor',
        description:
            'Powerful drag-and-drop editor for creating stunning full-page product displays. Features include responsive grid systems, customizable templates, component libraries, and live preview modes. Supports version history, collaborative editing with role-based permissions, and publish workflows. Includes SEO optimization tools, accessibility compliance checks, and performance analytics. The editor enables rapid prototyping with reusable component patterns and integrates with asset management systems for media optimization.',
        components: ['Card', 'Button', 'Modal', 'Tabs', 'Sidebar', 'Menu'],
        category: 'Product Configuration',
    },
    {
        id: 'advanced-settings-panel',
        image: '/showcase/PL Configured ( Full Page ) (4).png',
        title: 'Advanced Settings Panel',
        description:
            'Granular control panel for fine-tuning every aspect of your product configuration. Provides access to advanced parameters including pricing algorithms, inventory rules, tax configurations, and shipping calculations. Features include environment-specific settings (dev/staging/production), audit logging for configuration changes, and rollback capabilities. Includes validation schemas, dependency management between settings, and automated testing tools for configuration changes before deployment.',
        components: [
            'Card',
            'Button',
            'Switch',
            'TextInput',
            'SingleSelect',
            'Tabs',
            'Accordion',
        ],
        category: 'Product Configuration',
    },
    {
        id: 'configuration-summary',
        image: '/showcase/PL Configured ( Full Page ) (5).png',
        title: 'Configuration Summary',
        description:
            'Comprehensive overview of all configured settings with easy editing capabilities. Displays complete product configuration in a structured format with collapsible sections, inline editing, and validation feedback. Includes impact analysis showing how changes affect pricing, inventory, and fulfillment. Features include configuration comparison tools, export functionality for documentation, and approval request workflows. The summary view provides quick-access shortcuts to modify specific settings without restarting the configuration process.',
        components: ['Card', 'Button', 'KeyValuePair', 'Tag', 'DataTable'],
        category: 'Product Configuration',
    },
    {
        id: 'complete-configuration-view',
        image: '/showcase/PL Configured ( Full Page ).png',
        title: 'Complete Configuration View',
        description:
            'Holistic view of the entire product line configuration in a single, organized interface. Combines all configuration aspects including pricing, inventory, fulfillment, and compliance settings. Features include search across configuration parameters, advanced filtering by category, and dependency visualization. Provides health checks for configuration completeness, validation status indicators, and performance impact predictions. Supports configuration cloning for rapid product line expansion and template management for standard configurations.',
        components: [
            'Card',
            'Button',
            'Tabs',
            'DataTable',
            'Chart',
            'KeyValuePair',
        ],
        category: 'Product Configuration',
    },
    {
        id: 'secure-sign-in',
        image: '/showcase/Sign In ( Filled ).png',
        title: 'Secure Sign In',
        description:
            'Elegant authentication screen with enhanced security features and user-friendly design. Supports multiple authentication methods including password, SSO, biometrics, and magic links. Includes rate limiting, brute force protection, and suspicious activity detection. Features password strength indicators, recovery options, and session management controls. The interface adapts to organizational security policies, supports MFA enrollment, and provides clear error messages while maintaining security best practices.',
        components: ['TextInput', 'Button', 'Card', 'Checkbox'],
        category: 'Authentication',
    },
    {
        id: 'transaction-insights',
        image: '/showcase/Transaction Analytics (1).png',
        title: 'Transaction Insights',
        description:
            'Deep dive into transaction patterns with advanced filtering and visualization tools. Provides granular analysis of payment success rates, decline reasons, and customer behavior patterns. Includes machine learning-powered anomaly detection, predictive analytics for payment failures, and actionable recommendations for optimization. Features include cohort analysis, geographic performance breakdowns, and payment method comparisons. Supports custom report generation, scheduled exports, and integration with business intelligence platforms.',
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
        id: 'analytics-dashboard',
        image: '/showcase/Transaction Analytics.png',
        title: 'Analytics Dashboard',
        description:
            'Real-time analytics dashboard displaying key transaction metrics and performance indicators. Provides live updates on transaction volumes, success rates, revenue totals, and customer acquisition costs. Includes customizable KPI widgets, trend analysis with forecasting, and anomaly alerts. Features include drill-down capabilities for root cause analysis, comparative period analysis, and goal tracking. The dashboard supports multi-currency views, team performance metrics, and automated insight generation for business decision-making.',
        components: [
            'Chart',
            'Card',
            'Button',
            'Tabs',
            'DataTable',
            'SearchInput',
        ],
        category: 'Analytics',
    },
    {
        id: 'platform-guidelines',
        image: '/showcase/Usage Guidelines.png',
        title: 'Platform Guidelines',
        description:
            'Clear and concise usage documentation to help users get the most out of the platform. Structured documentation with search functionality, code examples, video tutorials, and best practice recommendations. Includes interactive examples, API playground for testing, and downloadable resources. Features version-specific documentation, user-contributed tips, and integration guides for popular frameworks. The guidelines are organized by user role (developer, admin, end-user) with personalized recommendations based on usage patterns.',
        components: ['Card', 'Button', 'Accordion', 'CodeBlock'],
        category: 'Guidelines',
    },
    {
        id: 'email-integration-setup',
        image: '/showcase/User on the email scraping setup step.png',
        title: 'Email Integration Setup',
        description:
            'Guided setup process for connecting and configuring email scraping workflows. Supports major email providers (Gmail, Outlook, Exchange) with OAuth authentication. Includes mailbox connection testing, folder selection, and scraping rule configuration. Features include attachment handling, duplicate detection, and processing schedules. Provides validation for connection stability, error handling for rate limits, and monitoring dashboards for scraping health. Supports custom headers, proxy configurations, and email filtering rules for targeted data extraction.',
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
        id: 'basic-information-form',
        image: '/showcase/basic-details.png',
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
        id: 'api-key-generation',
        image: '/showcase/creating-api-key-2.png',
        title: 'API Key Generation',
        description:
            'Secure interface for generating and managing API keys with granular permissions. Supports multiple key types (production, development, testing) with role-based access controls. Includes key rotation scheduling, usage quotas, and IP whitelisting. Features detailed audit logging, expiration policies, and emergency revocation tools. The interface provides API key health monitoring, usage analytics, and integration with secret management services. Supports automatic key regeneration workflows for security compliance.',
        components: ['Card', 'Button', 'TextInput', 'Modal', 'Tag'],
        category: 'Authentication',
    },
    {
        id: 'developer-access-control',
        image: '/showcase/creating-api-key.png',
        title: 'Developer Access Control',
        description:
            'Comprehensive API management portal for developers and integration specialists. Provides complete API lifecycle management including key provisioning, scope configuration, and access review workflows. Features rate limit management, endpoint-specific permissions, and usage analytics dashboards. Includes documentation integration, SDK generation tools, and webhook configuration. Supports team-based access control, approval workflows for access requests, and automated access reviews for compliance with security standards.',
        components: [
            'DataTable',
            'Card',
            'Button',
            'Tag',
            'Modal',
            'SearchInput',
        ],
        category: 'Authentication',
    },
    {
        id: 'follow-up-query-interface',
        image: '/showcase/follow-up-question1.png',
        title: 'Follow-up Query Interface',
        description:
            'Interactive Q&A system for gathering additional information from users. Features dynamic question generation based on previous responses, conditional branching, and validation rules. Includes natural language processing for free-text responses, suggestion chips for common answers, and progress tracking. Supports multimedia responses (documents, images), collaborative answer editing, and integration with knowledge bases for automated suggestions. The interface adapts question complexity based on user expertise levels.',
        components: ['Card', 'Button', 'TextInput', 'ChatInput'],
        category: 'Layout & Forms',
    },
    {
        id: 'dynamic-question-flow',
        image: '/showcase/follow-up-questions.png',
        title: 'Dynamic Question Flow',
        description:
            'Adaptive questionnaire that evolves based on user responses and needs. Uses decision trees and business rules to determine question sequences, skip logic, and personalized follow-ups. Includes response validation, real-time scoring, and completion tracking. Features support for multiple response types (rating scales, rankings, matrices), conditional display of help content, and answer persistence across sessions. The flow adapts question ordering based on response patterns to optimize completion rates and data quality.',
        components: [
            'Card',
            'Button',
            'Radio',
            'Checkbox',
            'TextInput',
            'Stepper',
        ],
        category: 'Layout & Forms',
    },
    {
        id: 'frame-component',
        image: '/showcase/frame.png',
        title: 'Frame Component',
        description:
            'Versatile frame layout for consistent presentation of content across the application. Provides standardized spacing, responsive breakpoints, and accessibility features including ARIA landmarks. Supports multiple layout modes (sidebar, header-footer, full-width) with configurable regions. Includes lazy loading for content optimization, scroll management, and focus trapping for modals. The frame integrates with routing systems, supports dynamic title updates, and provides consistent navigation patterns throughout the application.',
        components: ['Card', 'Button'],
        category: 'Layout & Forms',
    },
    {
        id: 'enhanced-frame-layout',
        image: '/showcase/frame1.png',
        title: 'Enhanced Frame Layout',
        description:
            'Improved frame design with additional features and customization options. Adds advanced capabilities including collapsible sidebars, multiple header rows, and context-sensitive toolbars. Features include layout persistence across sessions, keyboard shortcut support for layout toggling, and customizable density modes (compact, comfortable, relaxed). Supports embedded help panels, notification centers, and user preference synchronization. Includes performance optimizations for rendering complex layouts and animation support for smooth transitions.',
        components: ['Card', 'Button', 'Tabs', 'Modal'],
        category: 'Layout & Forms',
    },
    {
        id: 'routing-manager',
        image: '/showcase/frm-manager-routing.png',
        title: 'Routing Manager',
        description:
            'Intelligent routing system for directing tasks and requests to appropriate teams. Uses rule-based assignment logic considering team skills, workload distribution, and priority levels. Includes escalation workflows, automatic retry scheduling, and SLA monitoring. Features round-robin assignment, skills-based matching, and geographic routing support. The manager provides real-time queue visibility, agent availability tracking, and routing performance analytics. Supports custom routing rules for different request types and business units.',
        components: ['DataTable', 'Card', 'Button', 'Tag', 'Modal', 'Menu'],
        category: 'Layout & Forms',
    },
    {
        id: 'ai-assistant-interface',
        image: '/showcase/genius-ai-1.png',
        title: 'AI Assistant Interface',
        description:
            'Smart AI-powered assistant for automating complex tasks and providing insights. Features natural language understanding for task execution, predictive suggestions, and contextual help. Includes conversation memory, preference learning, and integration with multiple data sources. Supports workflow automation, document analysis, and code generation. The assistant provides proactive notifications, anomaly detection alerts, and automated report generation. Includes customization options for tone, response length, and notification frequency.',
        components: ['ChatInput', 'Card', 'Button', 'Avatar', 'Textarea'],
        category: 'AI',
    },
    {
        id: 'genius-ai-dashboard',
        image: '/showcase/genius-ai.png',
        title: 'Genius AI Dashboard',
        description:
            'Central command center for managing AI-driven workflows and intelligent automation. Provides overview of active AI agents, task completion metrics, and resource utilization. Includes model performance monitoring, cost tracking, and accuracy analytics. Features A/B testing for model versions, training data management, and deployment controls. The dashboard supports custom AI pipeline configuration, integration with external ML platforms, and automated retraining schedules based on performance thresholds.',
        components: [
            'Chart',
            'Card',
            'Button',
            'Tabs',
            'DataTable',
            'ChatInput',
        ],
        category: 'AI',
    },
    {
        id: 'gpu-performance-monitor',
        image: '/showcase/gpu-pulse.png',
        title: 'GPU Performance Monitor',
        description:
            'Real-time GPU resource tracking and performance optimization dashboard. Displays metrics including utilization percentages, memory allocation, temperature readings, and power consumption. Features predictive scaling recommendations, workload distribution analysis, and bottleneck detection. Includes historical trend analysis, alert configuration for threshold breaches, and automated job scheduling optimization. The monitor provides integration with cloud providers for auto-scaling, cost optimization suggestions, and detailed performance profiling for ML training jobs.',
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
        id: 'grid-layout-display',
        image: '/showcase/grid-view.png',
        title: 'Grid Layout Display',
        description:
            'Organized grid view for browsing large datasets with sorting and filtering options. Features virtual scrolling for performance, customizable column visibility, and inline editing capabilities. Includes advanced filtering with saved views, column pinning, and row grouping. Supports bulk selection, export to multiple formats, and integration with dashboards. The grid provides responsive design for different screen sizes, keyboard navigation, accessibility features, and real-time data updates with optimistic UI patterns.',
        components: ['DataTable', 'Card', 'Button', 'SearchInput'],
        category: 'Analytics',
    },
    {
        id: 'authentication-portal',
        image: '/showcase/login.png',
        title: 'Authentication Portal',
        description:
            'Sleek and secure login page with multi-factor authentication support. Provides multiple authentication methods including password, biometric, hardware tokens, and authenticator apps. Features session management, device recognition, and risk-based authentication. Includes account recovery workflows, lockout protection, and suspicious activity notifications. The portal supports single sign-on integration with major identity providers, custom branding options, and compliance with security standards (SOC2, GDPR, HIPAA).',
        components: ['TextInput', 'Button', 'Card', 'Modal', 'OTPInput'],
        category: 'Authentication',
    },
    {
        id: 'chargeback-management',
        image: '/showcase/order-management-chargeback.png',
        title: 'Chargeback Management',
        description:
            'Dedicated interface for handling chargeback disputes and resolution tracking. Provides complete case management including evidence collection, response submission, and outcome tracking. Features automated reason code analysis, win probability prediction, and representment generation. Includes integration with payment gateways, real-time notifications for new chargebacks, and performance analytics. The interface supports bulk processing for high-volume merchants, template management for responses, and automated follow-up scheduling for pending cases.',
        components: ['DataTable', 'Card', 'Button', 'Modal', 'Tag', 'Alert'],
        category: 'Payments',
    },
    {
        id: 'modal-dialog',
        image: '/showcase/popup.png',
        title: 'Modal Dialog',
        description:
            'Responsive popup component for confirmations, alerts, and quick actions. Features multiple size variants (small, medium, large, fullscreen), customizable animations, and focus management for accessibility. Includes draggable support, backdrop interaction control, and nested modal handling. Provides action button configurations, loading states for async operations, and responsive positioning. The modal supports keyboard shortcuts (ESC to close, Enter to confirm), ARIA compliance, and integration with form validation systems.',
        components: ['Modal', 'Button', 'Card'],
        category: 'Layout & Forms',
    },
    {
        id: 'team-selection',
        image: '/showcase/selectTeam.png',
        title: 'Team Selection',
        description:
            'Easy-to-use team picker for assigning tasks and managing collaboration. Features hierarchical team structures, role-based visibility controls, and recent team suggestions. Includes search and filter capabilities, team capability indicators, and workload balance information. Supports multi-team selection, permission previews, and integration with scheduling systems. The selector provides team performance metrics, availability status, and compliance with approval workflows for sensitive assignments.',
        components: ['Card', 'Button', 'SingleSelect', 'Avatar', 'Tag'],
        category: 'Layout & Forms',
    },
    {
        id: 'integration-complete',
        image: '/showcase/when-integration-checklist-completed.png',
        title: 'Integration Complete',
        description:
            'Celebration screen marking successful completion of all integration steps. Provides visual confirmation of completed setup with summary statistics, next steps recommendations, and resource links. Includes API endpoint information, webhook configuration details, and testing tools for validation. Features performance benchmarks comparison, onboarding survey integration, and celebration animations. The screen provides quick access to monitoring dashboards, support channels, and documentation for advanced configuration.',
        components: ['Card', 'Button', 'Stepper', 'Alert'],
        category: 'Integration',
    },
    {
        id: 'integration-progress',
        image: '/showcase/when-integration-checklist.png',
        title: 'Integration Progress',
        description:
            'Step-by-step checklist tracking integration setup progress and pending tasks. Features visual progress indicators with estimated completion times for remaining steps. Includes contextual help for each task, dependency validation, and automatic detection of completed steps. Provides troubleshooting guides for common issues, rollback options for failed steps, and integration health checks. The interface supports parallel task execution tracking, team member assignment for steps, and automated verification of step completion.',
        components: ['Stepper', 'Card', 'Button', 'ProgressBar', 'Checkbox'],
        category: 'Integration',
    },
    {
        id: 'access-control-settings',
        image: '/showcase/who-can-join.png',
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
    {
        id: 'zepto-integration',
        image: '/showcase/zepto.png',
        title: 'Zepto Integration',
        description:
            'Seamless integration interface with Zepto for rapid delivery services. Provides real-time shipping rate calculations, delivery time estimates, and serviceability checks. Features automated label generation, shipment tracking integration, and return management. Includes address validation, package dimension optimization, and delivery preference selection. The interface supports bulk shipment processing, scheduled pickups, and integration with inventory systems. Provides analytics on shipping performance, cost optimization suggestions, and exception handling for delivery failures.',
        components: ['Card', 'Button', 'TextInput', 'Modal', 'Stepper'],
        category: 'Integration',
    },
    {
        id: 'zepto-configuration',
        image: '/showcase/zepto1.png',
        title: 'Zepto Configuration',
        description:
            'Advanced configuration options for customizing Zepto service integrations. Features service type selection (express, standard, scheduled), packaging rules, and delivery preference defaults. Includes rate table configuration, multi-warehouse mapping, and carrier fallback rules. Provides SLA configuration, cut-off time management, and holiday scheduling. The interface supports custom labeling requirements, notification templates for delivery updates, and integration with order management systems for automated carrier selection based on business rules.',
        components: [
            'Card',
            'Button',
            'TextInput',
            'SingleSelect',
            'Tabs',
            'Switch',
        ],
        category: 'Integration',
    },
]

export const showcaseCategories = Array.from(
    new Set(showcaseData.map((d) => d.category))
)
