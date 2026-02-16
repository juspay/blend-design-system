import { JuspayLogo } from '../icons/JuspayLogo'

export default function BrandingDivider() {
    return (
        <div className="flex items-center justify-center gap-4 py-5 px-7 border-t border-gray-200">
            <div className="w-7 h-[1.4px] bg-[linear-gradient(270deg,#C9CBCF_0%,rgba(201,203,207,0)_100%)]" />

            <span className="text-sm text-gray-500 font-mono whitespace-nowrap flex items-center gap-2 font-normal">
                Designed &amp; Engineered by
                <span className="flex items-center gap-1 font-semibold text-gray-900 tracking-wide">
                    <JuspayLogo width={14} height={14} />
                    JUSPAY
                </span>
            </span>

            <div className="w-7 h-[1.4px] bg-[linear-gradient(90deg,#C9CBCF_0%,rgba(201,203,207,0)_100%)]" />
        </div>
    )
}
