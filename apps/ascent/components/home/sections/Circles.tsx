import React from 'react'

export default function Circles() {
    return (
        <div className="h-full w-full relative flex items-center justify-center">
            <span className="w-full h-full absolute inset-0 bg-[repeating-linear-gradient(135deg,#E0E0E0_0px,#E0E0E0_0.5px,transparent_1px,transparent_16px)] dark:bg-[repeating-linear-gradient(135deg,#262626_0px,#262626_1px,transparent_1px,transparent_14px)]" />

            {/* Top semi-ellipse — clipped to bottom half */}
            <div className="absolute overflow-hidden w-100 h-30 top-[calc(50%-96px-119.5px)]">
                <div className="w-100 h-55 bg-background border border-border absolute bottom-0 rounded-[50%]" />
            </div>

            {/* Center full ellipse */}
            <div className="w-100 h-48.25 bg-[#fafafa] dark:bg-[#080809] border border-border relative z-10 rounded-[50%]" />

            {/* Bottom semi-ellipse — clipped to top half */}
            <div className="absolute overflow-hidden w-100 h-30 top-[calc(50%+96.5px)]">
                <div className="w-100 h-55 bg-background border border-border absolute top-0 rounded-[50%]" />
            </div>
        </div>
    )
}
