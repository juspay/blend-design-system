export const TabButtons = ({
    text,
    selected,
    label,
    handleTabSelection,
}: {
    text: string
    selected: string
    label: string
    handleTabSelection: (label: string) => void
}) => {
    return (
        <div
            className={`rounded-[50px] cursor-pointer`}
            style={{
                borderRadius: '83px',
                background:
                    selected === label
                        ? 'linear-gradient(180deg, #FEFEFE, #37373B, rgba(153, 153, 153, 0.5))'
                        : 'transparent',
                padding: '1px',
            }}
            onClick={() => {
                handleTabSelection(label)
            }}
        >
            <div className="w-full h-full rounded-[83px] bg-black opacity-[0.9]">
                <div
                    className={`py-[10px] px-3 rounded-[50px] ${selected == label ? 'bg-[#FFFFFF2E] text-[#E3E3E3] ' : 'bg-transparent text-[#B3B3B3]'}`}
                >
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}
