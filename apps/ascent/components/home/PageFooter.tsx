import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/lib/constants'

export default function PageFooter() {
    return (
        <footer className="w-full border-t border-border">
            <div className="px-6 pt-16 pb-11">
                <div className="flex flex-col items-start w-full justify-center md:justify-between gap-8 lg:gap-10 text-muted-foreground">
                    <div className="w-full flex items-center justify-center md:justify-between flex-col gap-7">
                        <div className="w-full flex flex-col md:flex-row items-center md:items-end  md:justify-between lg:gap-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-[32px] lg:text-8xl font-medium leading-27 md:tracking-[-3.84px] text-foreground">
                                    Blend UI
                                </span>
                                <span className="text-[16px] lg:text-lg text-muted-foreground">
                                    //juspay
                                </span>
                            </div>
                            <div className="flex items-baseline gap-x-12 gap-y-4 text-xs lg:text-sm text-center font-mono md:pb-1.5">
                                <Link
                                    href={EXTERNAL_LINKS.privacyPolicy}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href={EXTERNAL_LINKS.termsOfService}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs lg:text-sm text-center font-mono">
                                White Labelling - Tokenization - Scalability
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
