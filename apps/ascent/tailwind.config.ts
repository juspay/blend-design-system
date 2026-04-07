import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './mdx-components.tsx',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'InterDisplay',
                    'var(--font-geist-sans)',
                    'system-ui',
                    'sans-serif',
                ],
                mono: [
                    'var(--font-geist-mono)',
                    'Menlo',
                    'Monaco',
                    'monospace',
                ],
                heading: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                inter: ['var(--font-inter-display)', 'InterDisplay'],
                manrope: ['var(--font-manrope)', 'sans-serif'],
            },
            colors: {
                blog: {
                    // Text
                    ink: '#202020',
                    heading: '#111827',
                    body: '#374151',
                    secondary: '#525866',
                    tertiary: '#717784',
                    muted: '#7d7d7d',
                    label: '#99a0ae',
                    subtle: '#adadad',
                    // Borders
                    border: '#e1e4ea',
                    'border-muted': '#c8cdd6',
                    separator: '#e5e7eb',
                    // Surfaces
                    surface: '#fcfcfd',
                    'surface-subtle': '#fafafa',
                    'surface-raised': '#f4f5f7',
                    code: '#f3f4f6',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },

            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fadeIn 0.2s ease-out',
            },
        },
    },
    plugins: [],
}

export default config
