import Image from 'next/image'

export function BlogHeader() {
    return (
        <div className="flex h-[267px] items-stretch border border-blog-border bg-white">
            {/* Left: Title panel */}
            <div className="flex flex-1 flex-col justify-center gap-4 border-r border-blog-border px-12">
                <h1 className="font-manrope text-[86px] font-medium leading-[1.1] tracking-[-3.44px] text-blog-ink">
                    Blogs
                </h1>
                <p className="text-[16px] font-normal tracking-[-0.32px] text-blog-secondary">
                    {`// Juspay Design`}
                </p>
            </div>

            {/* Right: Decorative image panel */}
            <div className="flex w-1/2 shrink-0 items-center justify-center overflow-hidden bg-blog-surface px-[14%] py-[7px]">
                <div className="relative aspect-square w-full">
                    <Image
                        src="/images/blog-header-graphic.png"
                        alt=""
                        fill
                        className="object-contain opacity-40"
                        aria-hidden
                    />
                </div>
            </div>
        </div>
    )
}
