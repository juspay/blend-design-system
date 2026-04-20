import Link from 'next/link'
import { EXTERNAL_LINKS } from '@/lib/constants'

export default function PageFooter() {
    return (
        <footer className="w-full border-t border-border">
            <div className="px-6 py-5">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-5 lg:gap-4 text-sm text-muted-foreground">
                    <p className="text-center lg:text-left leading-relaxed">
                        <span>Copyright &copy; 2024. Juspay Technologies.</span>
                        <br className="lg:hidden" />
                        <span>All rights reserved</span>
                    </p>

                    <div className="flex items-center gap-8">
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
            </div>
        </footer>
    )
}
