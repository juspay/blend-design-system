import { useRef, useState } from 'react'
import { ThemeProvider, useTheme } from '../../../../packages/blend/lib/context'
import { Button } from '../../../../packages/blend/lib/components/Button'

const ThemeContextConsumer = () => {
    const renderCountRef = useRef(0)
    const contextRef = useRef<ReturnType<typeof useTheme> | null>(null)
    const theme = useTheme()

    renderCountRef.current += 1
    const isSameContext = contextRef.current === theme
    contextRef.current = theme

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2 text-sm">
            <p>
                <strong>Theme consumer render count:</strong>{' '}
                <span className="font-mono">{renderCountRef.current}</span>
            </p>
            <p>
                <strong>Context reference stable since last render:</strong>{' '}
                <span
                    className={
                        isSameContext || renderCountRef.current === 1
                            ? 'text-green-700'
                            : 'text-red-700'
                    }
                >
                    {renderCountRef.current === 1
                        ? 'initial'
                        : isSameContext
                          ? 'yes'
                          : 'no (new context object)'}
                </span>
            </p>
            <p className="text-gray-600">
                Theme mode: <span className="font-mono">{theme.theme}</span>
            </p>
            <Button text="Themed button (uses context)" />
        </div>
    )
}

const ThemeProviderDemo = () => {
    const [parentCounter, setParentCounter] = useState(0)

    return (
        <div className="p-8 space-y-8 max-w-3xl">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                    ThemeProvider render test
                </h2>
                <p className="text-sm text-gray-600">
                    Click <strong>Bump unrelated counter</strong> — the parent
                    re-renders but theme props are unchanged. After the fix, the
                    consumer render count should stay flat and context reference
                    should remain stable.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <button
                    type="button"
                    onClick={() => setParentCounter((count) => count + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Bump unrelated counter
                </button>
                <span className="text-sm text-gray-700">
                    Parent counter:{' '}
                    <span className="font-mono">{parentCounter}</span>
                </span>
            </div>

            <ThemeProvider>
                <ThemeContextConsumer />
            </ThemeProvider>

            <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 space-y-2">
                <p className="font-semibold">Expected (fixed)</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        Consumer render count does not increase on each bump
                    </li>
                    <li>Context reference stays stable (green “yes”)</li>
                    <li>No sluggish UI from rebuilding ~74 token maps</li>
                </ul>
                <p className="font-semibold pt-2">Before fix</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Consumer render count climbed every bump</li>
                    <li>Context reference showed “no (new context object)”</li>
                </ul>
            </div>
        </div>
    )
}

export default ThemeProviderDemo
