import Image from 'next/image'

export function BlogHeader() {
    return (
        <div className="flex h-70 items-stretch relative">
            {/* Left: Title panel */}
            <div className="flex flex-1 flex-col justify-center gap-4 border-r border-border px-12">
                <h1 className="font-manrope text-[86px] font-medium leading-[1.1] tracking-[-3.44px] text-blog-ink text-primary">
                    Blogs
                </h1>
                <p className="text-[16px] font-normal tracking-[-0.32px] text-foreground">
                    {`// Juspay Design`}
                </p>
            </div>

            {/* Right: Decorative image panel */}
            <div className="flex w-1/2 shrink-0 items-center justify-center overflow-hidden bg-surface px-[14%] py-2">
                <div className="relative aspect-square w-full">
                    <Image
                        src="/images/blog-header-graphic.png"
                        alt="Blog's hero image"
                        fill
                        priority
                        className="object-contain opacity-40"
                        aria-hidden
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    )
}
