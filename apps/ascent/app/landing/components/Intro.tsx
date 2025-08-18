import Logo from '../icons/Logo'
import { LogoText } from '../icons/LogoText'
import { BgEllipseEffect } from '../icons/BgEllipseEffect'

export default function Intro() {
    return (
        <div className="flex flex-col relative w-full min-h-screen ">
            <div className=" w-full flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center w-full items-center gap-2">
                    <BgEllipseEffect />
                    <div className=" mt-12 flex gap-2 items-center">
                        <Logo />
                        <LogoText />
                    </div>
                </div>

                <div className="flex flex-col gap-21 w-full items-center justify-center text-[var(--intro-text-color)]">
                    <div
                        className="mt-28 text-[var(--design-system-heading-background)] w-159 py-3 flex justify-center relative"
                        style={{
                            borderRadius: '83px',
                            background: 'var(--design-system-heading-border)',
                            padding: '1px',
                        }}
                    >
                        <div className="w-full h-full rounded-[83px] bg-black flex items-center justify-center opacity-80 p-2 tracking-[12px]">
                            <p>DESIGN SYSTEM ASSISTANCE</p>
                        </div>
                    </div>
                    <div
                        className="w-full flex items-center justify-center flex-col text-[132px] leading-[1] font-bold opacity-80"
                        style={{
                            background:
                                'linear-gradient(90deg, #4B4B4B 0%, #F5F5F5 53.37%, #4B4B4B 100%)',
                            backgroundClip: 'text',
                        }}
                    >
                        <div className="bg-clip-text text-transparent">
                            Blend,
                        </div>
                        <div className=" text-transparent">
                            The Interface Engine.
                        </div>
                    </div>
                    <div className="text-[32px] flex flex-col items-center justify-center font-light opacity-80">
                        <p>
                            Blend simplifies collaboration by offering a single
                            source of truth for UI
                        </p>
                        <p>— from Figma to production-ready code.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
