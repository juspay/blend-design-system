const DateBadge = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="border-[length:var(--pixel)] border-[var(--grey-400)] bg-[var(--date-card-badge-color)] text-[var(--grey-300)] p-3 rounded-[var(--rounded-46)] w-fit">
            {children}
        </span>
    )
}

export default DateBadge
