import { DocumentationCardType } from '../types/documentation-card-type'

export const DocumentationCardData: DocumentationCardType[] = [
    {
        heading: 'Foundation',
        content:
            'The foundations of the Blend Design System define core primitives like color, typography, spacing, borders, and shadows. These tokens act as the visual DNA, ensuring consistency, scalability, and easy theming across all components.',
        link: 'https://juspay.design/docs/',
    },
    {
        heading: 'Theme Provider',
        content:
            'The Blend Design System uses a two-tier token architecture with a ThemeProvider to ensure scalable, consistent, and semantic theming. Foundation tokens define primitives, while component tokens map them to UI parts for responsive, customizable, and type-safe styling.',
        link: 'https://juspay.design/blog/theme-provider-token-architecture/',
    },
    {
        heading: 'Blend MCP Server',
        content:
            'The Blend MCP Server connects AI assistants with the Blend design system to generate React components, scaffold UI patterns, and access live documentation. It accelerates UI development while ensuring consistency, standardization, and AI-assisted learning.',
        link: 'https://juspay.design/blend-mcp-server-documentation/',
    },
]
