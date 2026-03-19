import Image from 'next/image'

export function BlogHeader() {
    return (
        <div className="flex h-[267px] items-stretch border border-[#e1e4ea] bg-white">
            {/* Left: Title panel */}
            <div className="flex flex-1 flex-col justify-center gap-4 border-r border-[#e1e4ea] px-12">
                <p
                    className="text-[86px] font-medium leading-[1.1] tracking-[-3.44px] text-[#202020]"
                    style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                >
                    Blogs
                </p>
                <p
                    className="text-[16px] font-normal tracking-[-0.32px] text-[#525866]"
                    style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
                >
                    {`// Juspay Design`}
                </p>
            </div>

            {/* Right: Decorative image panel */}
            <div className="flex w-1/2 shrink-0 items-center justify-center overflow-hidden bg-[#fcfcfd] px-[14%] py-[7px]">
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
