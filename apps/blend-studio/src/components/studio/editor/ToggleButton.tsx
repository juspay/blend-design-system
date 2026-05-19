import type { ReactNode } from 'react'

export type ToggleButtonProps = {
    icon: ReactNode
    onClick: () => void
    /** Visible tooltip and default accessible name. */
    title: string
    /** Overrides the accessible name when it should differ from `title`. */
    ariaLabel?: string
    /** When true, shows the active (raised) segment style. */
    selected?: boolean
    /** When true, removes the container styles. */
    noContainer?: boolean
    /** Extra classes when selected (e.g. `text-yellow-500`). */
    className?: string
}

export function ToggleButton({
    icon,
    onClick,
    title,
    ariaLabel,
    selected = false,
    className = '',
    noContainer = false,
}: ToggleButtonProps) {
    const accessibleLabel = ariaLabel ?? title

    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            {...{
                'aria-label': accessibleLabel,
                'aria-pressed': selected,
            }}
            className={[
                noContainer ? '' : 'rounded-lg p-1.5 transition-colors',
                'inline-flex items-center justify-center px-[12px] py-[6px] h-[30px]',
                selected
                    ? noContainer
                        ? 'text-black'
                        : 'bg-white shadow-sm text-black'
                    : 'text-gray-400 hover:text-gray-600',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <span aria-hidden="true" className="inline-flex">
                {icon}
            </span>
        </button>
    )
}
