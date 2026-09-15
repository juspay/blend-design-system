import { useCallback, useMemo } from 'react'
import SidebarV2Demo from './demos/SidebarV2Demo'
import { CommandSearch } from './components/CommandSearch'
import { DEMOS } from './lib/registry'

function App() {
    const allDemos = useMemo(
        () => DEMOS.map((d) => ({ ...d, version: 'v2' as const })),
        []
    )

    const handleSelectDemo = useCallback((demoId: string) => {
        window.dispatchEvent(
            new CustomEvent('select-demo', { detail: { demoId } })
        )
    }, [])

    return (
        <main className="w-full min-h-screen bg-gray-100 relative">
            <SidebarV2Demo />
            <CommandSearch items={allDemos} onSelect={handleSelectDemo} />
        </main>
    )
}

export default App
