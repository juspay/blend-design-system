import Image from 'next/image'
import { Inter } from 'next/font/google'
import Logo from '../icons/Logo'
import { LogoText } from '../icons/LogoText'
import { BgEllipseEffect } from '../icons/BgEllipseEffect'
import { Tabs } from './Tabs'

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

                <div className="flex flex-col gap-[84px] w-full items-center justify-center text-[#A3A3A3]">
                    <div
                        className="mt-[112px] text-[var(--design-system-heading-background)] opacity-[0.5] w-[636.975px] py-3 flex justify-center relative"
                        style={{
                            borderRadius: '83px',
                            background:
                                'linear-gradient(90deg, rgba(153, 153, 153, 0.5), rgba(255, 255, 255, 0.5), rgba(153, 153, 153, 0.5))',
                            padding: '1px',
                        }}
                    >
                        <div
                            className="w-full h-full rounded-[83px] bg-black flex items-center justify-center opacity-[0.8]"
                            style={{ padding: '8px' }}
                        >
                            <p>DESIGN SYSTEM ASSISTANCE</p>
                        </div>
                    </div>
                    <div
                        className="w-full flex items-center justify-center flex-col text-[132px] leading-[1] font-bold opacity-[0.8]"
                        style={{
                            background:
                                'linear-gradient(90deg, #4B4B4B 0%, #F5F5F5 53.37%, #4B4B4B 100%)',
                            backgroundClip: 'text',
                        }}
                    >
                        <div className="bg-clip-text text-transparent">
                            Blend,
                        </div>
                        <div className="bg-clip-text text-transparent">
                            The Interface Engine.
                        </div>
                    </div>
                    <div className="text-[32px] flex flex-col items-center justify-cente font-light opacity-[0.8]">
                        <p>
                            Blend simplifies collaboration by offering a single
                            source of truth for UI
                        </p>
                        <p>— from Figma to production-ready code.</p>
                    </div>
                    <Tabs />
                </div>
            </div>
        </div>
    )
}
