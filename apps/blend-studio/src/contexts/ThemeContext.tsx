import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
    resolvedTheme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Check localStorage first
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('blend-theme') as Theme
            if (saved === 'dark' || saved === 'light') {
                return saved
            }
            // Check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark'
            }
        }
        return 'light'
    })

    const [resolvedTheme, setResolvedTheme] = useState<Theme>(theme)

    useEffect(() => {
        const root = document.documentElement
        const isDark = theme === 'dark'

        // Apply dark class to enable Tailwind dark mode
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }

        // Save to localStorage
        localStorage.setItem('blend-theme', theme)
        setResolvedTheme(theme)
    }, [theme])

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            // Only auto-switch if user hasn't manually set a preference
            const saved = localStorage.getItem('blend-theme')
            if (!saved) {
                setThemeState(e.matches ? 'dark' : 'light')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = () => {
        setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    return (
        <ThemeContext.Provider
            value={{ theme, toggleTheme, setTheme, resolvedTheme }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export type { ThemeContextType }
export default ThemeContext
