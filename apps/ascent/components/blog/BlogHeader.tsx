import Image from 'next/image'

export function BlogHeader() {
    return (
        <div className="flex flex-col md:flex-row h-auto md:h-70 items-stretch relative">
            {/* Left: Title panel */}
            <div className="flex flex-1 flex-col justify-center gap-4 border-b md:border-b-0 md:border-r border-border px-6 md:px-12 py-12 md:py-0">
                <h1 className="font-manrope text-5xl sm:text-6xl md:text-[86px] font-medium leading-[1.1] tracking-[-0.04em] md:tracking-[-3.44px] text-blog-ink text-primary">
                    Blogs
                </h1>
                <p className="text-[16px] font-normal tracking-[-0.32px] text-foreground">
                    {`// Juspay Design`}
                </p>
            </div>

            {/* Right: Decorative image panel */}
            <div className="flex w-full md:w-1/2 shrink-0 items-center justify-center overflow-hidden bg-surface dark:bg-black px-[14%] py-8 md:py-2 min-h-50 md:min-h-0">
                <div className="relative aspect-square w-full max-w-50 md:max-w-none">
                    <Image
                        src="/images/blog-header-graphic.png"
                        alt="Blog's hero image"
                        fill
                        priority
                        className="object-contain opacity-40 dark:invert"
                        aria-hidden
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    )
}
