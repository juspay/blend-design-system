import type { ReactNode } from 'react'

export type ToggleButtonProps = {
    icon: ReactNode
    onClick: () => void
    title: string
    /** When true, shows the active (raised) segment style. */
    selected?: boolean
    /** When true, removes the container styles. */
    noConatiner?: boolean
    /** Extra classes when selected (e.g. `text-yellow-500`). */
    className?: string
}

export function ToggleButton({
    icon,
    onClick,
    title,
    selected = false,
    className = '',
    noConatiner = false,
}: ToggleButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={[
                noConatiner ? '' : 'rounded-lg p-1.5 transition-colors',
                'px-[12px] py-[6px] h-[30px]',
                selected
                    ? noConatiner
                        ? ''
                        : `bg-white shadow-sm black`
                    : 'text-gray-400 hover:text-gray-600',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {icon}
        </button>
    )
}
