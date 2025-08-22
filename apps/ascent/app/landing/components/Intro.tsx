import { HeaderGradientAndSparkles } from '../icons/HeaderGradientAndSparkles'
import Logo from '../icons/Logo'
import { LogoText } from '../icons/LogoText'
import { GradientHeadingBox } from './GradientHeadingBox'

export default function Intro() {
    return (
        <div className="flex flex-col relative w-full mb-13">
            <div className=" w-full flex flex-col justify-center items-center relative overflow-hidden">
                <div className="flex flex-col justify-center w-full items-center gap-2 overflow-hidden">
                    <HeaderGradientAndSparkles />
                    <div className="mt-12 flex gap-2 items-center">
                        <Logo />
                        <LogoText />
                    </div>
                </div>

                <div className="flex flex-col gap-21 w-full items-center justify-center text-[var(--intro-text-color)]">
                    <GradientHeadingBox
                        text="DESIGN SYSTEM ASSISTANCE"
                        classes="w-159 mt-28 tracking-[var(--tracking-half)] "
                    />
                    <div className="w-full flex items-center justify-center flex-col text-[length:var(--text-lg)] leading-none font-bold opacity-80 [background-image:var(--heading-gradient)] text-transparent bg-clip-text">
                        <div className="bg-clip-text text-transparent">
                            Blend,
                        </div>
                        <div className="text-transparent">
                            The Interface Engine.
                        </div>
                    </div>
                    <div className="text-[length:var(--subheading-font-size)] flex flex-col items-center justify-center font-light opacity-80">
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
