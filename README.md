# Blend Design System

![Version](https://img.shields.io/npm/v/@juspay/blend-design-system) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Downloads](https://img.shields.io/npm/dm/@juspay/blend-design-system) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

A production-ready React design system that powers Juspay's financial technology products. Built with performance, accessibility, and developer experience at its core, Blend provides a comprehensive suite of components and design tokens for building modern web applications.

**[Blend Design System Landing Page](https://blend.juspay.design)** • **[Library Storybook](https://blend.juspay.design/storybook)** • **[Component Documentation](https://blend.juspay.design/docs)** • **[Changelogs](https://github.com/juspay/blend-design-system/releases)** • **[Blend Blogs](https://blend.juspay.design/blog)**




https://github.com/user-attachments/assets/10aeddb5-6211-4a48-b2ed-afff33f28185


---

## 🎯 The Blend Design System

### Architecture & Philosophy

Blend is architected as a modern design system that combines the power of **styled-components** with **Radix UI primitives** to deliver exceptional developer experience and runtime performance. The system is built on three foundational pillars: **consistency**, **flexibility**, and **accessibility**.

### Styled-Components Integration

At its core, Blend leverages styled-components for dynamic styling, enabling powerful theming capabilities and optimal CSS-in-JS performance. Every component is built with a sophisticated styling layer that supports design token interpolation, responsive breakpoints, and theme switching without compromising bundle size or runtime performance.

### Theme Provider System

The Blend Theme Provider orchestrates a comprehensive theming system that manages foundation tokens, component-specific tokens, and responsive breakpoints. This centralized approach ensures consistent design language across applications while providing granular customization capabilities for different brand requirements and user preferences.

### Token Architecture

Blend's design token system is structured in a hierarchical manner with **foundation tokens** serving as the base layer. These include color palettes spanning seven semantic colors (gray, primary, purple, orange, red, green, yellow) with multiple shade variations, typography scales covering display through body text sizes, spacing systems, shadow definitions, border radius values, and opacity scales. Component tokens build upon these foundations to create cohesive, theme-aware styling patterns.

### Responsive Design System

The responsive architecture operates on a carefully crafted breakpoint system with **small screens at 320px** and **large screens at 1024px**. The `useResponsiveTokens` hook enables components to automatically adapt their styling based on the current viewport, ensuring optimal mobile-web experiences. This system allows components to have different visual presentations and behaviors across breakpoints while maintaining design consistency.

### Component Ecosystem

The design system encompasses **over 30 production-ready components** organized into logical categories:

**Form Components** include essential input elements like Button, ButtonGroup, Checkbox, Radio, Switch, and comprehensive input variants including TextInput, NumberInput, OTPInput, SearchInput, TextArea, UnitInput, DropdownInput, and MultiValueInput. Advanced form components include Select, MultiSelect, and DateRangePicker for complex data entry scenarios.

**Layout Components** provide structural elements such as Accordion, Alert, Avatar, AvatarGroup, Breadcrumb, Modal, Popover, Sidebar, and Tabs. The sophisticated DataTable component offers advanced features for data presentation, while Directory components handle hierarchical navigation.

**Display Components** focus on data visualization and content presentation, including Charts powered by Recharts, StatCard for metrics display, Tags and SplitTag for categorization, Text components with comprehensive typography support, Tooltip for contextual information, and specialized components like GradientBlur for visual effects.

**Navigation Components** encompass Menu systems and interactive elements that facilitate user movement through applications.

**Feedback Components** like Snackbar provide user communication patterns for notifications, alerts, and status updates.

### Performance Optimization

Blend is engineered for optimal performance with **tree-shaking support** ensuring only imported components are included in final bundles. The styled-components implementation includes optimized CSS generation, minimal runtime overhead, and efficient re-rendering patterns. Components are designed with React best practices including proper memoization, efficient prop handling, and minimal DOM manipulation.

### Accessibility Foundation

Built on Radix UI primitives, every Blend component adheres to **WCAG accessibility standards** with comprehensive keyboard navigation, screen reader support, focus management, and ARIA attribute implementation. The design system includes extensive accessibility testing and documentation to ensure inclusive user experiences.

---

## 🏗️ Monorepo Structure

This monorepo is built with **Turborepo** and **pnpm workspaces**, providing optimized build caching, parallel execution, and efficient dependency management across all packages and applications.

### 📦 Core Packages

**`packages/blend`** houses the complete design system library published as `@juspay/blend-design-system`. This package includes all React components with full TypeScript definitions, comprehensive styling systems, custom hooks for responsive behavior and theme management, design tokens and foundation systems, accessibility features, and performance optimizations.

**`packages/eslint-config`** provides shared ESLint configurations ensuring consistent code quality and style across the entire monorepo.

**`packages/typescript-config`** contains shared TypeScript configurations with optimized compiler settings for both development and production builds.

**`packages/mcp`** includes meta content processing utilities that support documentation generation, component analysis, and development tooling.

### 🚀 Application Ecosystem

**`apps/ascent`** serves as the primary documentation platform built with **Next.js 15** and the App Router. This application features comprehensive component documentation with live examples, MDX-based content management supporting interactive code examples, advanced search functionality with real-time indexing, blog system for design system updates and best practices, changelog management for version tracking, and static site generation optimized for performance and SEO. The site is deployed to Firebase Hosting with custom domain support.

**`apps/storybook`** provides an interactive component development and testing environment. This application includes comprehensive component stories covering all states and variants, interactive controls for real-time prop manipulation, visual testing capabilities for design validation, accessibility testing integration, responsive preview modes, and comprehensive documentation integration. Stories are organized by component categories with extensive examples for different use cases.

**`apps/site`** offers a demo application showcasing real-world usage patterns built with **Vite and React**. This application demonstrates complete component implementations, integration patterns, theming examples, responsive behavior demonstrations, and performance benchmarks. It serves as a reference implementation for developers adopting the design system.

**`apps/blend-monitor`** provides analytics and monitoring capabilities for design system adoption. This Next.js application tracks component usage patterns, monitors NPM download statistics, provides insights into design system health, tracks integration success metrics, and offers administrative tools for design system maintenance. The application includes PostgreSQL integration for data persistence and Firebase authentication for secure access.

---

## 🛠️ Development Ecosystem

### Prerequisites & Setup

The development environment requires **Node.js version 18 or higher** and **pnpm version 10.12.4 or higher** for optimal package management and workspace handling. The monorepo structure leverages pnpm's efficient dependency management and Turborepo's intelligent caching for enhanced development experience.

**Quick Setup:**

1. Clone the repository and navigate to the project directory
2. Install all dependencies across the monorepo using **pnpm install**
3. Start all development servers simultaneously with **pnpm dev**
4. Access the documentation site at localhost:3000, Storybook at localhost:6006, and demo applications at their respective ports

This streamlined setup process gets the entire development environment running within minutes, allowing immediate access to all applications, component documentation, and interactive examples for comprehensive development and testing.

### Development Workflow

The development workflow is optimized for both individual component development and full-system integration testing. Developers can start all development servers simultaneously for comprehensive testing, focus on specific applications for targeted development, or work on the core design system in isolation while seeing real-time updates across documentation and demo applications.

### Available Development Scripts

**Development Commands** include starting all development servers simultaneously, launching individual applications like the documentation site or Storybook, and running the core package in development mode with hot reloading.

**Build Commands** encompass building all packages and applications for production, creating individual application builds for deployment, generating the core design system package for distribution, and preparing static assets for hosting platforms.

**Quality Assurance Commands** include comprehensive linting across all packages, type checking with TypeScript, running test suites with coverage reporting, and cleaning build artifacts for fresh starts.

**Deployment Commands** handle staging environment deployments, production releases, and package publishing to NPM with proper versioning and changelog generation.

**Package Management Commands** facilitate creating changesets for version management, automated version bumping based on semantic versioning, and coordinated package releases across the monorepo.

---

## 🎨 Design System Features

### Accessibility Excellence

Blend prioritizes accessibility with **WCAG 2.1 AA compliance** across all components. Every component includes proper semantic markup, comprehensive keyboard navigation support, screen reader optimization, focus management, high contrast mode support, and reduced motion preferences. Accessibility testing is integrated into the development workflow with automated checks and manual testing protocols.

### TypeScript Integration

The design system provides **comprehensive TypeScript support** with strict type definitions, intelligent autocompletion, compile-time error detection, and extensive type inference. All component props, theme tokens, and utility functions include detailed type documentation for enhanced developer experience.

### Performance Optimization

Blend is engineered for **optimal runtime performance** with tree-shaking support for minimal bundle sizes, efficient CSS-in-JS implementation, optimized re-rendering patterns, lazy loading capabilities for large component sets, and comprehensive performance monitoring. Bundle analysis tools are integrated into the build process to ensure optimal asset delivery.

### Responsive Design

The responsive design system operates on **mobile-first principles** with carefully crafted breakpoint management, automatic component adaptation, flexible layout systems, and touch-optimized interactions. Components intelligently adapt their behavior and appearance based on viewport characteristics while maintaining consistent functionality across devices.

### Theming Flexibility

The theming system supports **extensive customization capabilities** with hierarchical token organization, runtime theme switching, brand-specific adaptations, and custom component styling. Organizations can implement their brand identity while maintaining the structural integrity and accessibility features of the design system.

### Developer Experience

Blend emphasizes **exceptional developer experience** with comprehensive documentation, interactive examples, detailed API references, migration guides, best practice recommendations, and extensive tooling support. The development workflow includes hot reloading, error boundaries, debugging utilities, and performance profiling tools.

---

## 📚 Documentation & Resources

### Component Documentation

The comprehensive component documentation at **juspay.design** includes detailed API references, interactive examples, accessibility guidelines, implementation patterns, customization options, and best practice recommendations. Each component page provides complete usage information with real-world examples and integration guidance.

### Interactive Playground

The Storybook environment at **juspay.design/storybook** offers hands-on component exploration with interactive controls, state management examples, responsive testing capabilities, accessibility validation, and comprehensive story collections covering all component variants and use cases.

### Demo Applications

Live demo applications showcase **real-world implementation patterns** with complete integration examples, theming demonstrations, responsive behavior showcases, performance optimizations, and accessibility implementations. These demos serve as reference implementations for teams adopting the design system.

### Migration & Integration Guides

Comprehensive guides support **seamless adoption** with step-by-step migration instructions, integration patterns for popular frameworks, customization strategies, performance optimization techniques, and troubleshooting resources for common implementation challenges.

---

## 🌍 Browser Support & Compatibility

Blend supports **modern browsers** including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. The design system includes progressive enhancement strategies for older browsers while maintaining optimal performance and functionality in modern environments. Polyfills and fallback strategies are documented for teams requiring extended browser support.

---

## 🔒 Security & Vulnerability Reporting

Security is paramount in financial technology applications. Blend follows **strict security practices** with regular dependency audits, automated vulnerability scanning, secure coding practices, and responsible disclosure protocols. Security vulnerabilities should be reported through designated channels with appropriate escalation procedures for critical issues.

---

## 🤝 Contributing & Community

### Contributing Guidelines

Contributions are welcomed through **structured processes** including comprehensive contribution guidelines, code review standards, testing requirements, documentation expectations, and community code of conduct. The project maintains high standards for code quality, accessibility, and performance across all contributions.

### Community Support

The Blend community includes **active support channels** with dedicated discussion forums, regular office hours, community showcases, and collaborative development opportunities. The team provides guidance for complex implementations, architectural decisions, and advanced customization requirements.

### Governance & Roadmap

The design system follows **transparent governance** with public roadmap planning, community input mechanisms, regular release cycles, breaking change communications, and long-term support commitments. Major decisions involve community consultation and careful consideration of impact on existing implementations.

---

## 📄 License & Legal

Blend Design System is released under the **MIT License**, providing broad usage rights while maintaining attribution requirements. The license covers all packages, documentation, and associated resources within the monorepo. Organizations should review license terms for compliance requirements in commercial applications.

---

**Built with ❤️ by the Juspay Engineering Team**
