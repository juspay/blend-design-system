import { useState } from 'react'
import { Snackbar } from '../../../packages/blend/lib/main'
import SidebarDemo from './demos/SidebarDemo'
import SidebarV2Demo from './demos/SidebarV2Demo'

function App() {
    const [isV2Components, setIsV2Components] = useState(false)

    const Demo = isV2Components ? SidebarV2Demo : SidebarDemo

    return (
        <main className="w-screen min-h-screen bg-gray-100">
            <Snackbar />
            <Demo />
        </main>
    )
}
export default App
