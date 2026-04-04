import type { VersionHeaderProps } from '@/lib/types'

export const VersionHeader = ({
    version,
    date,
    status,
    children,
}: VersionHeaderProps) => {
    return (
        <div className="pb-6">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-[32px] font-medium text-primary font-manrope leading-[110%] tracking-[-1.28px]">
                        {version}
                    </h1>
                    <span className="px-2 py-0.5 text-xs rounded-sm bg-primary text-secondary">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>
                <p className="text-foreground tracking-[-0.32px]">
                    {new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
            {children && (
                <div className="text-foreground py-8 text-justify tracking-[-0.32px] text-base">
                    {children}
                </div>
            )}
        </div>
    )
}
