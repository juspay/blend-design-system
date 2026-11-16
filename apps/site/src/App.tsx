import { useCallback, useEffect, useMemo, useState } from 'react'
import SidebarV2Demo from './demos/SidebarV2Demo'
import SidebarV3Demo from './demos/SidebarV3Demo'
import { CommandSearch } from './components/CommandSearch'
import { DEMOS } from './lib/registry'

function App() {
    const [showSidebarV3, setShowSidebarV3] = useState(
        () => window.location.hash === '#sidebarV3'
    )

    useEffect(() => {
        const onHashChange = () =>
            setShowSidebarV3(window.location.hash === '#sidebarV3')
        window.addEventListener('hashchange', onHashChange)
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

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
        <div className="w-full min-h-screen bg-gray-100 relative">
            {showSidebarV3 ? <SidebarV3Demo /> : <SidebarV2Demo />}
            {!showSidebarV3 && (
                <CommandSearch items={allDemos} onSelect={handleSelectDemo} />
            )}
        </div>
    )
}

export default App
