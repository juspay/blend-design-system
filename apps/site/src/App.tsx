import { useState, useCallback, useMemo } from 'react'
import SidebarDemo from './demos/SidebarDemo'
import SidebarV2Demo from './demos/SidebarV2Demo'
import { CommandSearch } from './components/CommandSearch'
import { DEMOS } from './lib/registry'

function App() {
    const [isV2Components, setIsV2Components] = useState(() => {
        return localStorage.getItem('site:is-v2') === 'true'
    })

    const allDemos = useMemo(
        () => [
            ...DEMOS.map((d) => ({ ...d, version: 'v1' as const })),
            ...DEMOS.map((d) => ({ ...d, version: 'v2' as const })),
        ],
        []
    )

    const handleToggleV2 = (checked: boolean) => {
        setIsV2Components(checked)
        localStorage.setItem('site:is-v2', String(checked))
    }

    const handleSelectDemo = useCallback(
        (demoId: string, targetIsV2: boolean) => {
            if (targetIsV2 !== isV2Components) {
                window.location.hash = demoId
                setIsV2Components(targetIsV2)
                localStorage.setItem('site:is-v2', String(targetIsV2))
            } else {
                window.dispatchEvent(
                    new CustomEvent('select-demo', { detail: { demoId } })
                )
            }
        },
        [isV2Components]
    )

    const Demo = isV2Components ? SidebarV2Demo : SidebarDemo

    return (
        <main className="w-full min-h-screen bg-gray-100 relative">
            <div className="absolute top-16 right-4 z-50 bg-white p-2 rounded-lg shadow-md border border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={isV2Components}
                        onChange={(e) => handleToggleV2(e.target.checked)}
                        className="w-4 h-4 cursor-pointer"
                    />
                    Use Sidebar V2
                </label>
            </div>
            <Demo />
            <CommandSearch items={allDemos} onSelect={handleSelectDemo} />
        </main>
    )
}

export default App
