const DateBadge = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="border-[length:var(--pixel)] border-[var(--grey-400)] bg-transparent text-[var(--grey-300)] lg:p-3 md:p-2 p-1 lg:text-base sm:text-sm text-xs rounded-[var(--rounded-46)] w-fit">
            {children}
        </span>
    )
}

export default DateBadge
