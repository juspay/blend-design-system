import { TabsList } from '../../data/tabs-list'

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
            className={`cursor-pointer rounded-[var(--tab-bar-border-radius)] ${selected === label ? 'bg-[image:var(--tab-buttons-gradient)]' : 'bg-transparent'} p-[var(--padding-1-pixel)]`}
            onClick={() => {
                handleTabSelection(label)
            }}
        >
            <div className="w-full h-full rounded-[var(--tab-bar-border-radius)] bg-black opacity-90 ">
                <div
                    className={`py-2.5 px-3 rounded-[var(--tabs-border-radius)] text-[18px] ${selected == label ? 'bg-[var(--tab-bg-color-selected)] text-[var(--tab-btn-text-color-selected)] ' : 'bg-transparent text-[var(--tab-btn-text-color)]'}`}
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
        <div className="text-[var(--design-system-heading-background)] opacity-80 w-[var(--tabs-section-width)] flex justify-center relative backdrop-blur-md rounded-[var(--tab-bar-border-radius)] bg-[image:var(--landing-tabs-bar-gradient)] p-[var(--padding-1-pixel)]">
            <div className="w-full h-full rounded-[var(--tab-bar-border-radius)] bg-black flex items-center  py-6 px-6 justify-between">
                {TabsList.map((tab, key) => (
                    <TabButtons
                        key={key}
                        label={tab.label}
                        text={tab.text}
                        selected={selectedTab}
                        handleTabSelection={handleTabSelection}
                    />
                ))}
            </div>
        </div>
    )
}
