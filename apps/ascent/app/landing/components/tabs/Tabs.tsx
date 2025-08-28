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
            <div className="w-full h-full rounded-[var(--tab-bar-border-radius)] bg-black opacity-90">
                <div
                    className={`md:py-2.5 md:px-3 py-1 px-2 rounded-[var(--tabs-border-radius)] lg:text-[length:var(--tab-btn-font-size)] md:text-[length:var(--tab-btn-font-size-md)] sm:text-[length:var(--tab-btn-font-size-sm)] text-[length:var(--tab-btn-font-size-xs)] ${selected == label ? 'bg-[var(--tab-bg-color-selected)] text-[var(--tab-btn-text-color-selected)] ' : 'bg-transparent text-[var(--tab-btn-text-color)]'}`}
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
        <div className="text-[var(--design-system-heading-background)] opacity-80 lg:w-[var(--tabs-section-width)] md:w-[var(--tabs-section-width-md)] sm:w-[var(--tabs-section-width-sm)] w-[var(--tabs-section-width-xs)] flex justify-center relative backdrop-blur-md rounded-[var(--tab-bar-border-radius)] bg-[image:var(--landing-tabs-bar-gradient)] p-[var(--padding-1-pixel)] z-30">
            <div className="w-full h-full rounded-[var(--tab-bar-border-radius)] bg-black flex items-center  md:p-6 p-3 justify-between">
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
