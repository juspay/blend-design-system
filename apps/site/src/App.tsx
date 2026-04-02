import { useState } from 'react'
import SidebarDemo from './demos/SidebarDemo'
import SidebarV2Demo from './demos/SidebarV2Demo'

function App() {
    const [isV2Components, setIsV2Components] = useState(false)

    const Demo = isV2Components ? SidebarV2Demo : SidebarDemo

    return (
        <main className="w-full min-h-screen bg-gray-100 relative">
            <div className="absolute top-16 right-4 z-9999 bg-white p-2 rounded-lg shadow-md border border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        checked={isV2Components}
                        onChange={(e) => setIsV2Components(e.target.checked)}
                        className="w-4 h-4 cursor-pointer"
                    />
                    Use Sidebar V2
                </label>
            </div>
            <Demo />
        </main>
    )
}
export default App
