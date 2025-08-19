import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-[calc(100vh-var(--navbar-height))] overflow-y-auto">
            {children}
        </div>
    )
}

export default layout
