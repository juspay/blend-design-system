import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
    ThemeProvider,
    Button,
    ButtonType,
    ButtonSize,
    FOUNDATION_THEME,
    type ComponentTokenType,
    type ThemeType,
} from '@juspay/blend-design-system'

const meta: Meta<typeof ThemeProvider> = {
    title: 'Foundations/Theme Provider',
    component: ThemeProvider,
    parameters: {
        docsSubtitle:
            'Configure and customize themes for Blend Design System components.',
        docs: {
            description: {
                component: `
## Features

- Apply consistent theming across all components
- Customize foundation tokens (colors, typography, spacing)
- Override component-specific tokens
- Support for light/dark mode
- Full TypeScript support

## Usage

\`\`\`tsx
import { ThemeProvider } from '@juspay/blend-design-system'

function App() {
  return (
    <ThemeProvider>
      {/* Your application components */}
    </ThemeProvider>
  )
}
\`\`\``,
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const BasicSetup: Story = {
    render: () => (
        <div className="leading-relaxed flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">
                    Basic Theme Provider Setup
                </h2>
                <p className="font-manrope text-gray-500 tracking-wide">
                    Wrap your application with ThemeProvider to enable theme
                    support:
                </p>
            </div>

            <div className="border border-gray-200 p-5 rounded-lg mb-6 text-blue-500 text-sm">
                <pre className="m-0 whitespace-pre-wrap">{`import { ThemeProvider } from '@juspay/blend-design-system'

function App() {
  return (
    <ThemeProvider>
      {/* Your application components */}
      <YourComponents />
    </ThemeProvider>
  )
}`}</pre>
            </div>

            <h3 className="text-2xl font-medium">TypeScript Support</h3>
            <p className="font-manrope text-gray-500 tracking-wide">
                The ThemeProvider accepts the following props:
            </p>

            <div className="border border-gray-200 p-5 rounded-lg mb-6 text-purple-500 text-sm">
                <pre className="m-0 whitespace-pre-wrap">{`type ThemeProviderProps = {
  foundationTokens?: ThemeType      // Foundation design tokens
  componentTokens?: ComponentTokenType  // Component-specific tokens
  breakpoints?: BreakpointType      // Responsive breakpoints
  children: React.ReactNode         // Your app content
}`}</pre>
            </div>
        </div>
    ),
}

export const CustomFoundationTokens: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">
                    Customizing Foundation Tokens
                </h2>
                <p className="font-manrope text-gray-500 tracking-wide">
                    Override foundation tokens like colors, typography, spacing,
                    and shadows:
                </p>
            </div>

            <div className="border border-gray-200 p-5 rounded-lg mb-6 text-purple-500 text-sm">
                <pre className="m-0 whitespace-pre-wrap">{`import { ThemeProvider, FOUNDATION_THEME } from '@juspay/blend-design-system'

const customFoundationTokens = {
  ...FOUNDATION_THEME,
  colors: {
    ...FOUNDATION_THEME.colors,
    primary: {
      ...FOUNDATION_THEME.colors.primary,
      500: '#6366f1', // Custom primary color
      600: '#4f46e5',
    },
    brand: {
      ...FOUNDATION_THEME.colors.brand,
      primary: '#6366f1',
    }
  },
  font: {
    ...FOUNDATION_THEME.font,
    family: {
      ...FOUNDATION_THEME.font.family,
      heading: 'Inter, sans-serif', // Custom font family
    }
  }
}

function App() {
  return (
    <ThemeProvider foundationTokens={customFoundationTokens}>
      <YourComponents />
    </ThemeProvider>
  )
}`}</pre>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-medium ">
                    Available Foundation Token Categories
                </h3>
                <ul className="font-manrope tracking-wide text-gray-500 leading-7">
                    <li>
                        colors - Primary, secondary, success, warning, danger,
                        neutral colors
                    </li>
                    <li>
                        font - Font families, sizes, weights, line heights,
                        letter spacing
                    </li>
                    <li>
                        unit - Spacing scale (2, 4, 8, 12, 16, 20, 24, 32, 40,
                        48, 56, 64, 80, 96)
                    </li>
                    <li>shadows - Box shadow definitions for elevation</li>
                    <li>border - Border radius and width scales</li>
                    <li>opacity - Opacity scale for transparency effects</li>
                </ul>
            </div>
        </div>
    ),
}

export const CustomComponentTokens: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">
                    Customizing Component Tokens
                </h2>
                <p className="font-manrope text-gray-500 tracking-wide">
                    Override specific component styling while maintaining design
                    system consistency:
                </p>
            </div>

            <div className="border border-gray-200 p-5 rounded-lg mb-6 text-blue-500 text-sm">
                <pre className="m-0 whitespace-pre-wrap">{`import { ThemeProvider } from '@juspay/blend-design-system'

const customComponentTokens = {
  BUTTON: {
    // Override button tokens for all breakpoints
    sm: {
      backgroundColor: {
        primary: {
          default: {
            default: '#6366f1',
            hover: '#4f46e5',
            active: '#4338ca',
          }
        }
      },
      padding: {
        primary: {
          default: {
            default: {
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              paddingRight: '16px',
            }
          }
        }
      }
    }
  },
  ALERT: {
    sm: {
      backgroundColor: {
        success: {
          default: '#10b981',
        }
      }
    }
  }
}

function App() {
  return (
    <ThemeProvider componentTokens={customComponentTokens}>
      <YourComponents />
    </ThemeProvider>
  )
}`}</pre>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-medium">
                    Available Component Tokens
                </h3>
                <p className="font-manrope text-gray-500 tracking-wide">
                    You can customize tokens for these components:
                </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 mt-4">
                {[
                    'BUTTON',
                    'ALERT',
                    'TABS',
                    'MODAL',
                    'TOOLTIP',
                    'CHECKBOX',
                    'CHECKBOXV2',
                    'RADIO',
                    'RADIOV2',
                    'SWITCH',
                    'TEXT_INPUT',
                    'SEARCH_INPUT',
                    'TEXT_AREA',
                    'NUMBER_INPUT',
                    'OTP_INPUT',
                    'DROPDOWN_INPUT',
                    'MULTI_SELECT',
                    'SINGLE_SELECT',
                    'BREADCRUMB',
                    'POPOVER',
                    'MENU',
                    'TABLE',
                    'CALENDAR',
                    'ACCORDION',
                    'STAT_CARD',
                    'PROGRESS_BAR',
                    'DRAWER',
                    'CHARTS',
                    'SNACKBAR',
                    'CARD',
                    'SKELETON',
                    'AVATAR',
                    'SIDEBAR',
                    'TOOLTIPV2',
                    'PROGRESS_BARV2',
                ].map((component) => (
                    <code
                        key={component}
                        className="bg-gray-100 px-2 py-1 rounded text-xs"
                    >
                        {component}
                    </code>
                ))}
            </div>
        </div>
    ),
}

export const UsingThemeHook: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">
                    Using the useTheme Hook
                </h2>
                <p className="font-manrope text-gray-500 tracking-wide">
                    Access theme tokens programmatically in your components:
                </p>
            </div>

            <div className="border border-gray-200 p-5 rounded-lg mb-6 text-blue-500 text-sm">
                <pre className="m-0 whitespace-pre-wrap">{`import { useTheme } from '@juspay/blend-design-system'

function CustomComponent() {
  const { foundationTokens, componentTokens, breakpoints } = useTheme()
  
  return (
    <div
      style={{
        backgroundColor: foundationTokens.colors.primary[500],
        padding: foundationTokens.unit[16],
        borderRadius: foundationTokens.border.radius.md,
        color: foundationTokens.colors.neutral.white,
      }}
    >
      <h3>Custom Component</h3>
      <p>Primary color: {foundationTokens.colors.primary[500]}</p>
      <p>Button background: {componentTokens.BUTTON.sm.backgroundColor.primary.default.default}</p>
    </div>
  )
}`}</pre>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-medium">Theme Hook Returns</h3>
                <ul className="font-manrope tracking-wide text-gray-500 leading-7">
                    <li>
                        <strong>foundationTokens</strong> - All foundation
                        design tokens (colors, typography, spacing, etc.)
                    </li>
                    <li>
                        <strong>componentTokens</strong> - Computed component
                        tokens for all components
                    </li>
                    <li>
                        <strong>breakpoints</strong> - Responsive breakpoint
                        definitions
                    </li>
                </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-5 text-amber-800 text-sm font-manrope">
                <strong>⚠️ Important:</strong> The useTheme hook must be used
                within a component that's wrapped by ThemeProvider, or it will
                throw an error.
            </div>
        </div>
    ),
}

export const ResponsiveTokens: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-medium">
                    Responsive Token Structure
                </h2>
                <p className="font-manrope text-gray-500 tracking-wide">
                    Component tokens are structured by breakpoint for responsive
                    design:
                </p>
            </div>

            <div className="border border-gray-200 p-5 rounded-lg mb-6 text-blue-500 text-sm">
                <pre className="m-0 whitespace-pre-wrap">{`// Component tokens follow this structure:
componentTokens.COMPONENT_NAME = {
  sm: { /* tokens for small screens */ },
  md: { /* tokens for medium screens */ },
  lg: { /* tokens for large screens */ },
}

// Example: Button tokens
componentTokens.BUTTON = {
  sm: {
    backgroundColor: { primary: { default: { default: '#6366f1' } } },
    padding: { primary: { default: { default: { paddingX: '16px' } } } }
  },
  md: {
    backgroundColor: { primary: { default: { default: '#6366f1' } } },
    padding: { primary: { default: { default: { paddingX: '20px' } } } }
  },
  lg: {
    backgroundColor: { primary: { default: { default: '#6366f1' } } },
    padding: { primary: { default: { default: { paddingX: '24px' } } } }
  }
}`}</pre>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-medium">Breakpoint Definitions</h3>
            </div>
            <div className="border border-gray-200 p-5 rounded-lg mb-6 text-purple-500 text-sm">
                <pre className="m-0 whitespace-pre-wrap">{`const BREAKPOINTS = {
  sm: 640,   // Small screens (mobile)
  md: 768,   // Medium screens (tablet)
  lg: 1024,  // Large screens (desktop)
}`}</pre>
            </div>
        </div>
    ),
}

export const LiveExample: Story = {
    render: () => {
        // 1. Custom foundation tokens - this affects all components that use these foundation colors
        const customFoundationTokens: ThemeType = {
            ...FOUNDATION_THEME,
            colors: {
                ...FOUNDATION_THEME.colors,
                primary: {
                    ...FOUNDATION_THEME.colors.primary,
                    500: '#000000', // Black primary color
                    600: '#1a1a1a', // Darker black for gradients
                },
                gray: {
                    ...FOUNDATION_THEME.colors.gray,
                    0: '#ffffff', // White text color for primary buttons
                },
            },
            // Custom border radius for more rounded buttons
            border: {
                ...FOUNDATION_THEME.border,
                radius: {
                    ...FOUNDATION_THEME.border.radius,
                    10: '20px', // Override the default button border radius
                },
            },
        }

        // 2. Generate complete button tokens from our custom foundation tokens
        // This creates the full structure needed by the component
        const generateCompleteButtonTokens = (foundationTokens: ThemeType) => {
            // Generate default button tokens structure
            const baseTokens = {
                gap: foundationTokens.unit[6],
                slotMaxHeight: {
                    sm: foundationTokens.unit[16],
                    md: foundationTokens.unit[18],
                    lg: foundationTokens.unit[20],
                },
                backgroundColor: {
                    primary: {
                        default: {
                            default: `linear-gradient(180deg, ${foundationTokens.colors.primary[600]} -5%, ${foundationTokens.colors.primary[500]} 107.5%)`,
                            hover: foundationTokens.colors.primary[500],
                            active: `linear-gradient(180deg, ${foundationTokens.colors.primary[600]} -5%, ${foundationTokens.colors.primary[500]} 107.5%)`,
                            disabled: foundationTokens.colors.primary[300],
                        },
                        iconOnly: {
                            default: `linear-gradient(180deg, ${foundationTokens.colors.primary[600]} -5%, ${foundationTokens.colors.primary[500]} 107.5%)`,
                            hover: foundationTokens.colors.primary[500],
                            active: `linear-gradient(180deg, ${foundationTokens.colors.primary[600]} -5%, ${foundationTokens.colors.primary[500]} 107.5%)`,
                            disabled: foundationTokens.colors.primary[300],
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    secondary: {
                        default: {
                            default: foundationTokens.colors.gray[0],
                            hover: foundationTokens.colors.gray[50],
                            active: foundationTokens.colors.gray[0],
                            disabled: foundationTokens.colors.gray[150],
                        },
                        iconOnly: {
                            default: foundationTokens.colors.gray[0],
                            hover: foundationTokens.colors.gray[50],
                            active: foundationTokens.colors.gray[0],
                            disabled: foundationTokens.colors.gray[150],
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    danger: {
                        default: {
                            default: `linear-gradient(180deg, ${foundationTokens.colors.red[600]} 0%, ${foundationTokens.colors.red[500]} 93.75%)`,
                            hover: foundationTokens.colors.red[500],
                            active: foundationTokens.colors.red[500],
                            disabled: foundationTokens.colors.red[300],
                        },
                        iconOnly: {
                            default: `linear-gradient(180deg, ${foundationTokens.colors.red[600]} 0%, ${foundationTokens.colors.red[500]} 93.75%)`,
                            hover: foundationTokens.colors.red[500],
                            active: foundationTokens.colors.red[500],
                            disabled: foundationTokens.colors.red[300],
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    success: {
                        default: {
                            default: `linear-gradient(180deg, ${foundationTokens.colors.green[600]} 0%, ${foundationTokens.colors.green[500]} 100%)`,
                            hover: foundationTokens.colors.green[500],
                            active: foundationTokens.colors.green[600],
                            disabled: foundationTokens.colors.green[300],
                        },
                        iconOnly: {
                            default: `linear-gradient(180deg, ${foundationTokens.colors.green[600]} 0%, ${foundationTokens.colors.green[500]} 100%)`,
                            hover: foundationTokens.colors.green[500],
                            active: foundationTokens.colors.green[600],
                            disabled: foundationTokens.colors.green[300],
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                },
                borderRadius: {
                    sm: {
                        primary: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        secondary: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        danger: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        success: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                    },
                    md: {
                        primary: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        secondary: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        danger: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        success: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                    },
                    lg: {
                        primary: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        secondary: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        danger: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                        success: {
                            default: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            iconOnly: {
                                default: foundationTokens.border.radius[10],
                                hover: foundationTokens.border.radius[10],
                                active: foundationTokens.border.radius[10],
                                disabled: foundationTokens.border.radius[10],
                            },
                            inline: {
                                default: foundationTokens.border.radius[6],
                                hover: foundationTokens.border.radius[6],
                                active: foundationTokens.border.radius[6],
                                disabled: foundationTokens.border.radius[6],
                            },
                        },
                    },
                },
                padding: {
                    sm: {
                        primary: {
                            default: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            inline: {
                                x: foundationTokens.unit[4],
                                y: foundationTokens.unit[4],
                            },
                        },
                        secondary: {
                            default: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            inline: {
                                x: foundationTokens.unit[4],
                                y: foundationTokens.unit[4],
                            },
                        },
                        danger: {
                            default: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            inline: {
                                x: foundationTokens.unit[4],
                                y: foundationTokens.unit[4],
                            },
                        },
                        success: {
                            default: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                            inline: {
                                x: foundationTokens.unit[4],
                                y: foundationTokens.unit[4],
                            },
                        },
                    },
                    md: {
                        primary: {
                            default: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            inline: {
                                x: foundationTokens.unit[6],
                                y: foundationTokens.unit[6],
                            },
                        },
                        secondary: {
                            default: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            inline: {
                                x: foundationTokens.unit[6],
                                y: foundationTokens.unit[6],
                            },
                        },
                        danger: {
                            default: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            inline: {
                                x: foundationTokens.unit[6],
                                y: foundationTokens.unit[6],
                            },
                        },
                        success: {
                            default: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[12],
                                y: foundationTokens.unit[12],
                            },
                            inline: {
                                x: foundationTokens.unit[6],
                                y: foundationTokens.unit[6],
                            },
                        },
                    },
                    lg: {
                        primary: {
                            default: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            inline: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                        },
                        secondary: {
                            default: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            inline: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                        },
                        danger: {
                            default: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            inline: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                        },
                        success: {
                            default: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            iconOnly: {
                                x: foundationTokens.unit[16],
                                y: foundationTokens.unit[16],
                            },
                            inline: {
                                x: foundationTokens.unit[8],
                                y: foundationTokens.unit[8],
                            },
                        },
                    },
                },
                border: {
                    primary: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    secondary: {
                        default: {
                            default: `1px solid ${foundationTokens.colors.gray[300]}`,
                            hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                            active: `1px solid ${foundationTokens.colors.gray[300]}`,
                            disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                        },
                        iconOnly: {
                            default: `1px solid ${foundationTokens.colors.gray[300]}`,
                            hover: `1px solid ${foundationTokens.colors.gray[400]}`,
                            active: `1px solid ${foundationTokens.colors.gray[300]}`,
                            disabled: `1px solid ${foundationTokens.colors.gray[200]}`,
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    danger: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    success: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                },
                shadow: {
                    primary: {
                        default: {
                            default: '0 4px 12px rgba(0, 0, 0, 0.3)', // Custom shadow
                            hover: '0 6px 16px rgba(0, 0, 0, 0.4)',
                            active: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            hover: '0 6px 16px rgba(0, 0, 0, 0.4)',
                            active: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    secondary: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    danger: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    success: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                },
                outline: {
                    primary: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    secondary: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    danger: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                    success: {
                        default: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        iconOnly: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                        inline: {
                            default: 'none',
                            hover: 'none',
                            active: 'none',
                            disabled: 'none',
                        },
                    },
                },
                text: {
                    color: {
                        primary: {
                            default: {
                                default: foundationTokens.colors.gray[0],
                                hover: foundationTokens.colors.gray[0],
                                active: foundationTokens.colors.gray[0],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            iconOnly: {
                                default: foundationTokens.colors.gray[0],
                                hover: foundationTokens.colors.gray[0],
                                active: foundationTokens.colors.gray[0],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            inline: {
                                default: foundationTokens.colors.primary[500],
                                hover: foundationTokens.colors.primary[600],
                                active: foundationTokens.colors.primary[500],
                                disabled: foundationTokens.colors.gray[400],
                            },
                        },
                        secondary: {
                            default: {
                                default: foundationTokens.colors.gray[700],
                                hover: foundationTokens.colors.gray[800],
                                active: foundationTokens.colors.gray[700],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            iconOnly: {
                                default: foundationTokens.colors.gray[700],
                                hover: foundationTokens.colors.gray[800],
                                active: foundationTokens.colors.gray[700],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            inline: {
                                default: foundationTokens.colors.gray[700],
                                hover: foundationTokens.colors.gray[800],
                                active: foundationTokens.colors.gray[700],
                                disabled: foundationTokens.colors.gray[400],
                            },
                        },
                        danger: {
                            default: {
                                default: foundationTokens.colors.gray[0],
                                hover: foundationTokens.colors.gray[0],
                                active: foundationTokens.colors.gray[0],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            iconOnly: {
                                default: foundationTokens.colors.gray[0],
                                hover: foundationTokens.colors.gray[0],
                                active: foundationTokens.colors.gray[0],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            inline: {
                                default: foundationTokens.colors.red[500],
                                hover: foundationTokens.colors.red[600],
                                active: foundationTokens.colors.red[500],
                                disabled: foundationTokens.colors.gray[400],
                            },
                        },
                        success: {
                            default: {
                                default: foundationTokens.colors.gray[0],
                                hover: foundationTokens.colors.gray[0],
                                active: foundationTokens.colors.gray[0],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            iconOnly: {
                                default: foundationTokens.colors.gray[0],
                                hover: foundationTokens.colors.gray[0],
                                active: foundationTokens.colors.gray[0],
                                disabled: foundationTokens.colors.gray[400],
                            },
                            inline: {
                                default: foundationTokens.colors.green[500],
                                hover: foundationTokens.colors.green[600],
                                active: foundationTokens.colors.green[500],
                                disabled: foundationTokens.colors.gray[400],
                            },
                        },
                    },
                    fontSize: {
                        sm: foundationTokens.font.size.body.sm.fontSize,
                        md: foundationTokens.font.size.body.md.fontSize,
                        lg: foundationTokens.font.size.body.lg.fontSize,
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                },
            }
            return baseTokens
        }

        // 3. Custom component tokens with complete structure
        const customComponentTokens: ComponentTokenType = {
            BUTTON: {
                sm: generateCompleteButtonTokens(customFoundationTokens),
                lg: generateCompleteButtonTokens(customFoundationTokens),
            },
        }

        return (
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-medium">
                        Live Theme Customization Example
                    </h2>
                    <p className="font-manrope text-gray-500 tracking-wide">
                        Here's a live example showing default vs custom theme
                        with complete component token structure:
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-5">
                    <div>
                        <h3 className="text-xl font-medium mb-3">
                            Default Theme
                        </h3>
                        <ThemeProvider>
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Default Button"
                                />
                            </div>
                        </ThemeProvider>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium mb-3">
                            Custom Theme (Complete Component Tokens)
                        </h3>
                        <ThemeProvider
                            foundationTokens={customFoundationTokens}
                            componentTokens={customComponentTokens}
                        >
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Custom Button"
                                />
                            </div>
                        </ThemeProvider>
                    </div>
                </div>

                <div className="border border-gray-200 p-5 rounded-lg mt-6 text-blue-500 text-sm">
                    <pre className="m-0 whitespace-pre-wrap">{`import { 
  ThemeProvider, 
  Button, 
  FOUNDATION_THEME,
  type ComponentTokenType,
  type ThemeType
} from '@juspay/blend-design-system'

// Step 1: Customize foundation tokens (affects all components)
const customFoundationTokens: ThemeType = {
  ...FOUNDATION_THEME,
  colors: {
    ...FOUNDATION_THEME.colors,
    primary: {
      ...FOUNDATION_THEME.colors.primary,
      500: '#000000', // Black primary color
      600: '#1a1a1a', // Darker black for gradients
    },
    gray: {
      ...FOUNDATION_THEME.colors.gray,
      0: '#ffffff', // White text color
    },
  },
  border: {
    ...FOUNDATION_THEME.border,
    radius: {
      ...FOUNDATION_THEME.border.radius,
      10: '20px', // More rounded buttons
    }
  }
}

// Step 2: Generate complete component tokens with customizations
const generateCompleteButtonTokens = (foundationTokens: ThemeType) => {
  // Full button token structure with custom shadows for primary buttons
  return {
    gap: foundationTokens.unit[6],
    backgroundColor: {
      primary: {
        default: {
          default: \`linear-gradient(180deg, \${foundationTokens.colors.primary[600]} -5%, \${foundationTokens.colors.primary[500]} 107.5%)\`,
          hover: foundationTokens.colors.primary[500],
          active: \`linear-gradient(180deg, \${foundationTokens.colors.primary[600]} -5%, \${foundationTokens.colors.primary[500]} 107.5%)\`,
          disabled: foundationTokens.colors.primary[300],
        },
        // ... other variants (secondary, danger, success)
      },
      // ... other color variants
    },
    shadow: {
      primary: {
        default: {
          default: '0 4px 12px rgba(0, 0, 0, 0.3)', // Custom shadow
          hover: '0 6px 16px rgba(0, 0, 0, 0.4)',
          active: '0 2px 8px rgba(0, 0, 0, 0.2)',
          disabled: 'none',
        }
      }
    },
    // ... all other required properties (borderRadius, padding, border, outline, text, etc.)
  }
}

const customComponentTokens: ComponentTokenType = {
  BUTTON: {
    sm: generateCompleteButtonTokens(customFoundationTokens),
    lg: generateCompleteButtonTokens(customFoundationTokens),
  }
}

// Step 3: Apply both foundation and component customizations
<ThemeProvider 
  foundationTokens={customFoundationTokens}
  componentTokens={customComponentTokens}
>
  <Button variant="primary" size="md">Custom Button</Button>
</ThemeProvider>`}</pre>
                </div>
            </div>
        )
    },
}
