'use client'

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
            className={`cursor-pointer`}
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
            <div className="w-full h-full rounded-[83px] bg-black opacity-[0.9] ">
                <div
                    className={`py-2.5 px-3 rounded-[50px] text-[18px] ${selected == label ? 'bg-[#FFFFFF2E] text-[#E3E3E3] ' : 'bg-transparent text-[#B3B3B3]'}`}
                >
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

export const Tabs = ({
    selectedTab,
    handleTabSelection,
}: {
    selectedTab: string
    handleTabSelection: (label: string) => void
}) => {
    return (
        <div
            className="text-[var(--design-system-heading-background)] opacity-[0.5] w-[636.975px] py-3 flex justify-center relative"
            style={{
                borderRadius: '83px',
                background:
                    'linear-gradient(90deg, rgba(153, 153, 153, 0.5), rgba(255, 255, 255, 0.5), rgba(153, 153, 153, 0.5))',
                padding: '1px',
            }}
        >
            <div className="w-full h-full rounded-[83px] bg-black flex items-center  py-6 px-6 justify-between">
                <TabButtons
                    label="tokenizer"
                    selected={selectedTab}
                    text="Tokenizer"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="components"
                    selected={selectedTab}
                    text="Components"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="documentation"
                    selected={selectedTab}
                    text="Documentation"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="playground"
                    selected={selectedTab}
                    text="Playground"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="blogs"
                    selected={selectedTab}
                    text="Blogs"
                    handleTabSelection={handleTabSelection}
                />
            </div>
        </div>
    )
}
