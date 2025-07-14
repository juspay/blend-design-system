import React, { useState } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

type TooltipProps = {
    children: React.ReactNode
    content: string | React.ReactNode
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
    alignOffset?: number
}

const Tooltip = ({
    children,
    content,
    side = 'top',
    align = 'center',
    sideOffset = 4,
    alignOffset = 0,
}: TooltipProps) => {
    const [open, setOpen] = useState(false)
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root open={open} onOpenChange={setOpen}>
                <RadixTooltip.Trigger asChild onClick={() => setOpen(true)}>
                    {children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Content
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    className={
                        typeof content === 'string'
                            ? 'bg-black dark:bg-white text-white dark:text-black rounded-xl py-1 px-3 shadow-md max-w-60 md:max-w-100'
                            : ''
                    }
                >
                    {content}
                    <RadixTooltip.Arrow className="fill-black dark:fill-white" />
                </RadixTooltip.Content>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}
export default Tooltip
