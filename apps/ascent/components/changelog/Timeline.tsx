import { Children } from 'react'

interface TimelineProps {
    children: React.ReactNode
}

export const Timeline = ({ children }: TimelineProps) => {
    const count = Children.count(children)

    return (
        <div className="relative">
            {count > 1 && (
                <div className="absolute left-2.25 top-1.5 bottom-1.5 w-px bg-green-600/30 hidden sm:block" />
            )}
            <div className="space-y-0">
                {Children.map(children, (child, index) => {
                    const isFirst = index === 0
                    const isLast = index === count - 1

                    return (
                        <div
                            key={index}
                            className="flex items-start gap-x-4 py-3"
                        >
                            <div className="w-5 shrink-0 hidden sm:flex flex-col items-center relative mt-4">
                                {isFirst && (
                                    <div className="absolute -top-10 h-12 bottom-1/2 w-3 bg-background z-10" />
                                )}
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full relative z-20 mt-1" />
                                {isLast && (
                                    <div className="absolute top-1/2 -bottom-3 w-3 bg-background z-10 h-96" />
                                )}
                            </div>
                            <div className="flex-1">{child}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
