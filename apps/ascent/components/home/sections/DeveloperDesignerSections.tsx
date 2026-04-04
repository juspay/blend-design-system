import DeveloperSection from './DeveloperSection'
import DesignerSection from './DesignerSection'

export default function DeveloperDesignerSections() {
    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] mx-auto">
            <span className="lg:hidden absolute left-0 top-0 h-full w-6 border-r border-border bg-[repeating-linear-gradient(135deg,#E0E0E0_0px,#E0E0E0_1px,transparent_1px,transparent_14px)] dark:bg-[repeating-linear-gradient(135deg,#262626_0px,#262626_1px,transparent_1px,transparent_14px)]" />
            <span className="lg:hidden absolute right-0 top-0 h-full w-6 border-l border-border bg-[repeating-linear-gradient(135deg,#E0E0E0_0px,#E0E0E0_1px,transparent_1px,transparent_14px)] dark:bg-[repeating-linear-gradient(135deg,#262626_0px,#262626_1px,transparent_1px,transparent_14px)]" />

            <DeveloperSection />

            <span className="hidden lg:block w-12 h-full border-r border-border bg-[repeating-linear-gradient(135deg,#E0E0E0_0px,#E0E0E0_1px,transparent_1px,transparent_14px)] dark:bg-[repeating-linear-gradient(135deg,#262626_0px,#262626_1px,transparent_1px,transparent_14px)]" />

            <DesignerSection />
        </div>
    )
}
