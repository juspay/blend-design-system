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

const meta: Meta = {
    title: 'Foundations/Theme Provider',
    parameters: {
        docs: {
            description: {
                component:
                    'Configure and customize themes for Blend Design System components',
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const BasicSetup: Story = {
    render: () => (
        <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
            <h2>Basic Theme Provider Setup</h2>
            <p>
                Wrap your application with ThemeProvider to enable theme
                support:
            </p>

            <div
                style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                }}
            >
                <pre
                    style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                >{`import { ThemeProvider } from '@juspay/blend-design-system'

function App() {
  return (
    <ThemeProvider>
      {/* Your application components */}
      <YourComponents />
    </ThemeProvider>
  )
}`}</pre>
            </div>

            <h3>TypeScript Support</h3>
            <p>The ThemeProvider accepts the following props:</p>

            <div
                style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                <pre
                    style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                >{`type ThemeProviderProps = {
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
        <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
            <h2>Customizing Foundation Tokens</h2>
            <p>
                Override foundation tokens like colors, typography, spacing, and
                shadows:
            </p>

            <div
                style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                }}
            >
                <pre
                    style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                >{`import { ThemeProvider, FOUNDATION_THEME } from '@juspay/blend-design-system'

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

            <h3>Available Foundation Token Categories</h3>
            <ul>
                <li>
                    <strong>colors</strong> - Primary, secondary, success,
                    warning, danger, neutral colors
                </li>
                <li>
                    <strong>font</strong> - Font families, sizes, weights, line
                    heights, letter spacing
                </li>
                <li>
                    <strong>unit</strong> - Spacing scale (2, 4, 8, 12, 16, 20,
                    24, 32, 40, 48, 56, 64, 80, 96)
                </li>
                <li>
                    <strong>shadows</strong> - Box shadow definitions for
                    elevation
                </li>
                <li>
                    <strong>border</strong> - Border radius and width scales
                </li>
                <li>
                    <strong>opacity</strong> - Opacity scale for transparency
                    effects
                </li>
            </ul>
        </div>
    ),
}

export const CustomComponentTokens: Story = {
    render: () => (
        <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
            <h2>Customizing Component Tokens</h2>
            <p>
                Override specific component styling while maintaining design
                system consistency:
            </p>

            <div
                style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                }}
            >
                <pre
                    style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                >{`import { ThemeProvider } from '@juspay/blend-design-system'

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

            <h3>Available Component Tokens</h3>
            <p>You can customize tokens for these components:</p>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '8px',
                    marginTop: '16px',
                }}
            >
                {[
                    'BUTTON',
                    'ALERT',
                    'TABS',
                    'MODAL',
                    'TOOLTIP',
                    'CHECKBOX',
                    'RADIO',
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
                ].map((component) => (
                    <code
                        key={component}
                        style={{
                            backgroundColor: '#f3f4f6',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                        }}
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
        <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
            <h2>Using the useTheme Hook</h2>
            <p>Access theme tokens programmatically in your components:</p>

            <div
                style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                }}
            >
                <pre
                    style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                >{`import { useTheme } from '@juspay/blend-design-system'

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

            <h3>Theme Hook Returns</h3>
            <ul>
                <li>
                    <strong>foundationTokens</strong> - All foundation design
                    tokens (colors, typography, spacing, etc.)
                </li>
                <li>
                    <strong>componentTokens</strong> - Computed component tokens
                    for all components
                </li>
                <li>
                    <strong>breakpoints</strong> - Responsive breakpoint
                    definitions
                </li>
            </ul>

            <div
                style={{
                    backgroundColor: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '20px',
                }}
            >
                <strong>⚠️ Important:</strong> The useTheme hook must be used
                within a component that's wrapped by ThemeProvider, or it will
                throw an error.
            </div>
        </div>
    ),
}

export const ResponsiveTokens: Story = {
    render: () => (
        <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
            <h2>Responsive Token Structure</h2>
            <p>
                Component tokens are structured by breakpoint for responsive
                design:
            </p>

            <div
                style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                }}
            >
                <pre
                    style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                >{`// Component tokens follow this structure:
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

            <h3>Breakpoint Definitions</h3>
            <div
                style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                <pre
                    style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                >{`const BREAKPOINTS = {
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
                            default: foundationTokens.unit[8],
                            iconOnly: foundationTokens.unit[8],
                            inline: foundationTokens.unit[4],
                        },
                        secondary: {
                            default: foundationTokens.unit[8],
                            iconOnly: foundationTokens.unit[8],
                            inline: foundationTokens.unit[4],
                        },
                        danger: {
                            default: foundationTokens.unit[8],
                            iconOnly: foundationTokens.unit[8],
                            inline: foundationTokens.unit[4],
                        },
                        success: {
                            default: foundationTokens.unit[8],
                            iconOnly: foundationTokens.unit[8],
                            inline: foundationTokens.unit[4],
                        },
                    },
                    md: {
                        primary: {
                            default: foundationTokens.unit[12],
                            iconOnly: foundationTokens.unit[12],
                            inline: foundationTokens.unit[6],
                        },
                        secondary: {
                            default: foundationTokens.unit[12],
                            iconOnly: foundationTokens.unit[12],
                            inline: foundationTokens.unit[6],
                        },
                        danger: {
                            default: foundationTokens.unit[12],
                            iconOnly: foundationTokens.unit[12],
                            inline: foundationTokens.unit[6],
                        },
                        success: {
                            default: foundationTokens.unit[12],
                            iconOnly: foundationTokens.unit[12],
                            inline: foundationTokens.unit[6],
                        },
                    },
                    lg: {
                        primary: {
                            default: foundationTokens.unit[16],
                            iconOnly: foundationTokens.unit[16],
                            inline: foundationTokens.unit[8],
                        },
                        secondary: {
                            default: foundationTokens.unit[16],
                            iconOnly: foundationTokens.unit[16],
                            inline: foundationTokens.unit[8],
                        },
                        danger: {
                            default: foundationTokens.unit[16],
                            iconOnly: foundationTokens.unit[16],
                            inline: foundationTokens.unit[8],
                        },
                        success: {
                            default: foundationTokens.unit[16],
                            iconOnly: foundationTokens.unit[16],
                            inline: foundationTokens.unit[8],
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
            <div style={{ fontFamily: 'monospace', lineHeight: '1.6' }}>
                <h2>Live Theme Customization Example</h2>
                <p>
                    Here's a live example showing default vs custom theme with
                    complete component token structure:
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <h3>Default Theme</h3>
                        <ThemeProvider>
                            <div
                                style={{
                                    padding: '16px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            >
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Default Button"
                                />
                            </div>
                        </ThemeProvider>
                    </div>

                    <div>
                        <h3>Custom Theme (Complete Component Tokens)</h3>
                        <ThemeProvider
                            foundationTokens={customFoundationTokens}
                            componentTokens={customComponentTokens}
                        >
                            <div
                                style={{
                                    padding: '16px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            >
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    text="Custom Button"
                                />
                            </div>
                        </ThemeProvider>
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: '#1e1e1e',
                        color: '#d4d4d4',
                        padding: '20px',
                        borderRadius: '8px',
                        marginTop: '24px',
                    }}
                >
                    <pre
                        style={{ margin: 0, whiteSpace: 'pre-wrap' }}
                    >{`import { 
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
