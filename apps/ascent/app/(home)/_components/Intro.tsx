import { HeaderGradientAndSparkles } from '../_icons/HeaderGradientAndSparkles'
import Logo from '../_icons/Logo'
import { LogoText } from '../_icons/LogoText'
import { GradientHeadingBox } from './GradientHeadingBox'

export default function Intro() {
    return (
        <div className="flex flex-col relative w-full lg:mb-13 md:mb-8 mb-6">
            <div className=" w-full flex flex-col justify-center items-center relative overflow-hidden">
                <div className="flex flex-col justify-center w-full items-center gap-2 overflow-hidden">
                    <HeaderGradientAndSparkles />
                    <div className="mt-12 flex gap-2 items-center">
                        <Logo />
                        <LogoText />
                    </div>
                </div>

                <div className="flex flex-col lg:gap-21 md:gap-15 gap-10 w-full items-center justify-center text-[var(--intro-text-color)]">
                    <GradientHeadingBox
                        text="DESIGN SYSTEM ASSISTANCE"
                        classes="w-fit mt-28 tracking-[var(--tracking-half)] "
                    />
                    <div className="w-full flex items-center justify-center flex-col 2xl:text-[length:var(--main-heading-text)] xl:text-[length:var(--main-heading-text-xl)] lg:text-[length:var(--main-heading-text-lg)] md:text-[length:var(--main-heading-text-md)] sm:text-[length:var(--main-heading-text-sm)] xs:text-[35px] text-[30px] leading-none font-bold opacity-80 [background-image:var(--heading-gradient)] text-transparent bg-clip-text">
                        <div className="bg-clip-text text-transparent">
                            Blend,
                        </div>
                        <div className="text-transparent">
                            The Interface Engine.
                        </div>
                    </div>
                    <div className="2xl:text-[length:var(--subheading-font-size)] xl:text-[length:var(--subheading-font-size-xl)] lg:text-[length:var(--subheading-font-size-lg)] md:text-[length:var(--subheading-font-size-md)] sm:text-[length:var(--subheading-font-size-sm)] xs:text-[10px] text-[8px] flex flex-col items-center justify-center font-light opacity-80">
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
