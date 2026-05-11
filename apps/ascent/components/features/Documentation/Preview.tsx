import React from 'react'

const Preview = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-80 border-code-border border rounded-md p-4 mt-4 flex items-center justify-center">
            {children}
        </div>
    )
}

export default Preview
